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

       // We separate isPublished since we don't want user accidently update this field, it has its own url to update
       const { isPublished, ...values } = await req.json();
       const course = await db.chapter.update({
          where: {
            id: params.chapterId,
            courseId: params.courseId,
         },
         data: {
            ...values
         }
       });

       return NextResponse.json(course)
    } catch (error) {
        console.log("[CHAPTER_ID]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}