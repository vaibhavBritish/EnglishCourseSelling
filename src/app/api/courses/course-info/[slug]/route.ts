import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/client";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    const course = await prisma.course.findFirst({
      where: { slug },
      // include: { videos: true }
    });

    return NextResponse.json({
      success: true,
      course,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching courses",
      },
      { status: 500 }
    );
  }
}
