import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: {
        params: {
            courseId: string,
            chapterId: string;
        }
    }
  ) {
    try {
       const { userId } = auth();
       if (!userId) {
          return new NextResponse("Unauthorized", { status: 401 })
       }

       const courseOwner = await db.course.findUnique({
        where: {
            id: params.courseId,
            userId
        }
        })
     
      if (!courseOwner) {
        return new NextResponse("Unauthorized", { status: 401 })
      }

      const unpulbishedChapter = await db.chapter.update({
        where: {
          id: params.chapterId,
          courseId: params.courseId,
       },
        data: {
          isPublished: false
       }
     });

       // Check if this chapter is the only published 
       const unpulbishedChaptersIncourse = await db.chapter.findMany({
         where: {
            courseId: params.chapterId
         }
       })

       if(!unpulbishedChaptersIncourse.length) {
         const unpublishCourse = await db.course.update({
            where: {
              id: params.chapterId
            },
            data: {
              isPublished: false
            }
         })
       }
      return NextResponse.json(unpulbishedChapter)
    } catch (error) {
        console.log("[CHAPTER_UNPUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}