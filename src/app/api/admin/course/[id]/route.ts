import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/client";
import { imageKit } from "@/lib/imageKit.js"
import { ObjectId } from "mongodb";

export async function GET(Request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const course = await prisma.course.findUnique({
            where: { id: id }
        })
        return NextResponse.json(course);
    } catch (error) {
        console.log(error)
    }
}

export async function DELETE(Request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const course = await prisma.course.delete({
            where: { id: id }
        })
        return NextResponse.json(course);
    } catch (error) {
        console.log(error)
    }
}


export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
    }

    const body = await req.json();
    const { imageBase64, id: _, createdAt, updatedAt, ...rest } = body;

    let imageUrl = rest.imageUrl;

    if (imageBase64) {
      const uploadResponse = await imageKit.upload({
        file: imageBase64,
        fileName: `course_${id}.jpg`,
        folder: "/courses",
      });
      imageUrl = uploadResponse.url;
    }

    const course = await prisma.course.update({
      where: { id },
      data: {
        ...rest,
        imageUrl,
      },
    });

    return NextResponse.json(course);
  } catch (error: any) {
    console.error("Error updating course:", error);
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}
