
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "../../../../../prisma/client";


export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { courseId, userId } = body;

    if (!courseId || !userId) {
      return NextResponse.json({ message: "courseId and userId required" }, { status: 400 });
    }

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    const origin =
      process.env.NEXT_PUBLIC_APP_URL ||
      `${req.headers.get("x-forwarded-proto") || "http"}://${req.headers.get("host")}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: course.title,
              description: course.description ?? undefined,
            },
            unit_amount: Math.round((course.price ?? 0) * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/courses/${courseId}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/courses/${courseId}?payment=cancelled`,
      metadata: {
        userId: String(userId),
        courseId: String(courseId),
      },
      payment_intent_data: {
        metadata: {
          userId: String(userId),
          courseId: String(courseId),
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ message: "Checkout failed", error: (error as any).message }, { status: 500 });
  }
}
