import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: { videos: true },
    });
    return NextResponse.json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({                    
      success: false,
      message: "Error fetching courses",
    });
  }
}