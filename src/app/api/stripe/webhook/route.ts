import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "../../../../../prisma/client";

export const runtime = "nodejs";


async function readRawBody(req: NextRequest): Promise<Buffer> {
  const arrayBuffer = await req.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET not set");
    return NextResponse.json({ message: "Webhook secret not configured" }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    const body = await readRawBody(req);
    const signature = req.headers.get("stripe-signature") || "";
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error("⚠️ Webhook signature verification failed:", err?.message || err);
    return NextResponse.json({ message: `Webhook Error: ${err?.message || "invalid signature"}` }, { status: 400 });
  }

  try {

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      let userId = session.metadata?.userId as string | undefined;
      let courseId = session.metadata?.courseId as string | undefined;

      // defensive: if metadata is attached on the PaymentIntent, read from there
      if (!userId || !courseId) {
        const intent = (session.payment_intent as Stripe.PaymentIntent | string | null) ?? null;
        if (typeof intent !== "string" && intent?.metadata) {
          userId = userId || (intent.metadata["userId"] as string | undefined);
          courseId = courseId || (intent.metadata["courseId"] as string | undefined);
        }
      }

      if (!userId || !courseId) {
        console.warn("Missing userId or courseId in session metadata. Session id:", session.id);
      } else {
        // create Payment record (idempotent by stripeSessionId)
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
              rawEvent: event as any,
            },
          });
        } catch (e: any) {
          // if duplicate unique stripeSessionId, ignore
          if (e?.code === "P2002") {
            console.log("Payment already recorded for session:", session.id);
          } else {
            console.error("Error writing payment record:", e);
            throw e;
          }
        }

        // create enrollment if not exists
        const existing = await prisma.enrollment.findFirst({
          where: { userId, courseId },
        });

        if (!existing) {
          await prisma.enrollment.create({
            data: { userId, courseId, status: "active" },
          });
        }
      }
    }

    // You can handle other events (invoice.paid, payment_intent.succeeded) as needed

  } catch (error) {
    console.error("Webhook handling error:", error);
    // respond 200 to Stripe but include error flag so you can monitor logs; Stripe won't retry if 2xx returned,
    // if you want Stripe to retry, return a non-2xx status.
    return NextResponse.json({ received: true, error: true }, { status: 200 });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
