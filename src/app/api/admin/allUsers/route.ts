import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

export async function GET(_request: NextRequest) {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                isAdmin: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 });
    }
}