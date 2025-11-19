import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";
import { imageKit } from "@/lib/imageKit.js"
import slugify from "slugify";

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
  }

  const { title, description, price, category, imageBase64, duration } = body;

  if (!title || !description || !price || !category || !imageBase64 || !duration) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  try {
    const uploadResponse = await imageKit.upload({
      file: imageBase64,
      fileName: `${title.replace(/\s+/g, "_")}.jpg`,
      folder: "/courses",
      useUniqueFileName: true,
    });

    const slug = slugify(title,{
      lower:true,
      strict:true,
      trim:true
    })

    const course = await prisma.course.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        category,
        slug,
        duration: parseInt(duration),
        imageUrl: uploadResponse.url,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


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