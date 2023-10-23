import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params } : { params: {courseId: string} }
) {
try {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const course = await db.course.findUnique({
      where: {
          id: params.courseId,
          userId
      },
      include: {
        chapters: {
          include: {
            muxData: true
          }
        }
      }
   })

  if (!course) {
     return new NextResponse("Course Not Found", { status: 404 })
  }  

  // Chekc if there has some published chapter
  // Each course must has one published chapter to be published for the students
  const hasPublishedChapter = course.chapters.some(chapter => chapter.isPublished)
  if (!course.title || !course.description || !course.imageUrl || !course.categoryId || !hasPublishedChapter) {
     return new NextResponse("Missing the required fields", { status: 404 })
  }

  const publishedCourse = await db.course.update({
     where: {
        id: params.courseId,
     },
     data: {
        isPublished: true,
     }
  })
   return NextResponse.json(publishedCourse);
  } catch (error) {
   console.log("[COURSE_PUBLISH]", error);
   return new NextResponse("Internal Error", { status: 500 })
}
}