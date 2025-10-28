import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "../../../../../prisma/client";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      return NextResponse.json({ message: "session_id required" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    if (session.payment_status !== "paid") {
      return NextResponse.json({ ok: true, paid: false });
    }

    let userId = session.metadata?.userId as string | undefined;
    let courseId = session.metadata?.courseId as string | undefined;

    const pi = session.payment_intent as Stripe.PaymentIntent | null;
    if ((!userId || !courseId) && pi && typeof pi !== "string" && pi.metadata) {
      userId = userId || (pi.metadata["userId"] as string | undefined);
      courseId = courseId || (pi.metadata["courseId"] as string | undefined);
    }

    if (!userId || !courseId) {
      return NextResponse.json({ message: "Missing metadata" }, { status: 400 });
    }

    // Idempotent write of Payment
    try {
      await prisma.payment.create({
        data: {
          userId,
          courseId,
          amount: (session.amount_total ?? 0) / 100,
          currency: session.currency ?? "usd",
          paymentStatus: session.payment_status ?? "paid",
          stripeSessionId: session.id,
          stripePaymentIntentId:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : (session.payment_intent as Stripe.PaymentIntent | null)?.id ?? null,
          rawEvent: null,
        },
      });
    } catch (e: any) {
      if (e?.code !== "P2002") throw e;
    }

    // Ensure enrollment exists
    const existing = await prisma.enrollment.findFirst({ where: { userId, courseId } });
    if (!existing) {
      await prisma.enrollment.create({ data: { userId, courseId, status: "active" } });
    }

    return NextResponse.json({ ok: true, paid: true });
  } catch (error) {
    console.error("Session confirm error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


