import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(Request: NextRequest) {
    const { name, email, subject, message } = await Request.json();
    if (!name || !email || !subject || !message) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    try {
        const infomation = await prisma.contactUs.create({
            data: {
                name,
                email,
                subject,
                message
            }
        })
        return NextResponse.json({ message: "Message Sent Successfully", infomation }, { status: 200 });
    } catch (error) {
        console.log(error)
    }
}