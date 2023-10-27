import { db } from "@/lib/db"
import { CourseWithProgressWithCategory, GetCourses } from "@/types/course"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { getProgress } from "./get-progress"

// Show in data-table
export async function getCourseList() {
    const { userId } = auth()
    if(!userId) {
        return redirect("/")
    }

    const courses = await db.course.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return courses;
}

// Show in Search
export const getCourses = async({
    userId,
    categoryId,
    title
} : GetCourses) : Promise<CourseWithProgressWithCategory[]> => {
   try {
     const courses = await db.course.findMany({
        where: {
            isPublished: true,
            title: {
                contains: title,
            },
            categoryId
        },
        include: {
            category: true,
            chapters: {
                where: {
                    isPublished: true,
                },
                select: {
                    id: true
                }
            },
            purchases: {
                where: {
                    userId
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
     })

     const courseWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
         courses.map(async course => {
            if (course.purchases.length === 0) {
                return {
                    ...course,
                    progress: null,
                }
            }

            const porgressPercentage = await getProgress(userId, course.id)
            return {
                ...course,
                progress: porgressPercentage
            }
        })
     )

     return courseWithProgress;

   } catch (error) {
       console.log("GET_COURSES", error);
       return [];
   }
}