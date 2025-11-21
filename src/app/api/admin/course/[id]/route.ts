import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { imageKit } from "@/lib/imageKit";
import { ObjectId } from "mongodb";
import slugify from "slugify";

export async function GET(Request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const course = await prisma.course.findUnique({
      where: { id },
      include: { videos: true }
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error fetching course" }, { status: 500 });
  }
}

export async function DELETE(Request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
    }


    await prisma.video.deleteMany({
      where: { courseId: id },
    });

  
    const course = await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Course deleted successfully",
      course,
    });

  } catch (error) {
    console.log("DELETE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete course" },
      { status: 500 }
    );
  }
}


export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
    }

    const body = await req.json();

  
    const { imageBase64, id: _, createdAt, updatedAt, videos, slug, ...rest } = body;

    let imageUrl = rest.imageUrl;

    if (imageBase64) {
      const uploadResponse = await imageKit.upload({
        file: imageBase64,
        fileName: `course_${id}.jpg`,
        folder: "/courses",
      });
      imageUrl = uploadResponse.url;
    }

    
    const updatedSlug = rest.title
      ? slugify(rest.title, { lower: true, strict: true })
      : undefined;

    const course = await prisma.course.update({
      where: { id },
      data: {
        ...rest,
        imageUrl,
        ...(updatedSlug && { slug: updatedSlug }),
      },
    });

    return NextResponse.json(course);
  } catch (error: any) {
    console.error("Error updating course:", error);
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}
