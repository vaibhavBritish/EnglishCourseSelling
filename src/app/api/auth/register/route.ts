import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";
import bcrypt from "bcryptjs";


export async function POST(Request: NextRequest) {
    const { username, email, password } = await Request.json();
    if (!username || !email || !password) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (existingUser) {
        return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password:hashedPassword
        }
    });

    return NextResponse.json({ message: "User registered successfully", user: newUser }, { status: 201 });
}