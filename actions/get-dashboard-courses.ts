import { db } from "@/lib/db";
import { 
           CourseWithChpaterProgressWithCategory,
           DashboardCourses
        } from "@/types/course";
import { getProgress } from "./get-progress";

export const getDashboardCourses = async(userId: string) : Promise<DashboardCourses> => {
    try {
        const purchasedCourses = await db.purchase.findMany({
            where: {
                userId
            },
            select: {
                course:{
                    include: {
                        category: true,
                        chapters: {
                            where: {
                                isPublished: true
                            }
                        }
                    }
                }
            }
        })

        // Get courses
        const courses = purchasedCourses.map(purchase => purchase.course) as CourseWithChpaterProgressWithCategory[]
     
        // Get progress for courses
        for(let course of courses) {
            const progress = await getProgress(userId, course.id)
            course["progress"] = progress;
        }

        const completedCourses = courses.filter(course => course.progress === 100)
        const courseInProgress = courses.filter(course => (course.progress ?? 0) < 100)

        return {
            completedCourses,
            courseInProgress,
        }
    } catch (error) {
        console.log("GET_DASHBOARD_COURSES", error);
        return {
            completedCourses: [],
            courseInProgress: [],
        }
    }
}