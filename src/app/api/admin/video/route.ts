import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";
import { imageKit } from "@/lib/imageKit";


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId"); 

    const videos = await prisma.video.findMany({
      where: courseId ? { courseId } : undefined,
      include: { course: true },
    });

    if (!videos.length) {
      return NextResponse.json(
        { success: false, message: "No videos found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, videos },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, videoBase64, duration, courseId } = await req.json();

    if (!title || !videoBase64 || !courseId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

  
    const uploadResponse = await imageKit.upload({
      file: videoBase64,
      fileName: `video_${Date.now()}.mp4`,
      folder: "/videos",
    });

   
    const video = await prisma.video.create({
      data: {
        title,
        videoUrl: uploadResponse.url,
        duration: duration ? Number(duration) : null,
        courseId,
      },
    });

    return NextResponse.json({ success: true, video }, { status: 201 });
  } catch (error) {
    console.error("Error uploading video:", error);
    return NextResponse.json(
      { success: false, message: "Error uploading video" },
      { status: 500 }
    );
  }
}
