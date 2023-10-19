import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params : { courseId: string}}
) {
    try {
      const { userId } = auth();
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 })
      }

      const { title } = await req.json();
      const courseOwner = await db.course.findUnique({
        where: {
            id: params.courseId,
            userId
        }
      })

      if (!courseOwner) {
        return new NextResponse("Unauthorized", { status: 401 })
      }

      // FInd the last chapter to find "position" of the last one
      const lastChapter = await db.chapter.findFirst({
        where: {
            courseId: params.courseId,
        },
        orderBy: {
            createdAt: "desc"
        }
      })

      const newPosition = lastChapter?.position ? lastChapter.position + 1 : 1
      const newChapter = await db.chapter.create({
        data: {
            courseId: params.courseId,
            title,
            position: newPosition,
        }
      })
  
      return NextResponse.json(newChapter)
    } catch (error) {
        console.log("[CHAPTERS]", error);
        return new NextResponse("Internal Error", { status: 500 }) 
    }
}