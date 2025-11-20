import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../../prisma/client";

function getUserIdFromCookie(req: NextRequest): string | null {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    return decoded?.id ?? null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const userId = getUserIdFromCookie(req);

    const course = await prisma.course.findUnique({
      where: { id },
      include: { videos: true },
    });

    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    let hasAccess = false;
    if (userId) {
      const enrollment = await prisma.enrollment.findFirst({ where: { userId, courseId: id } });
      hasAccess = Boolean(enrollment);
    }

    const payload = {
      id: course.id,
      title: course.title,
      description: course.description,
      description_more: course.description_more,
      price: course.price,
      duration: course.duration,
      category: course.category,
      imageUrl: course.imageUrl,
      hasAccess,
      videos: hasAccess ? course.videos : [],
    };

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Error fetching course with access control:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
