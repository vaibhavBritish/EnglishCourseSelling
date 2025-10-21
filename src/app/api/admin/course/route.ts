import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";
import {imageKit} from "@/lib/imageKit.js"

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
  }

  const { title, description, price, category, imageBase64 } = body;

  if (!title || !description || !price || !category || !imageBase64) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  try {
    const uploadResponse = await imageKit.upload({
      file: imageBase64,
      fileName: `${title.replace(/\s+/g, "_")}.jpg`,
      folder: "/courses",
      useUniqueFileName: true,
    });

    const course = await prisma.course.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        category,
        imageUrl: uploadResponse.url,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


export async function GET(Request:NextRequest){
    const courses = await prisma.course.findMany();
    return NextResponse.json({message:"All courses",courses},{status:200});
}