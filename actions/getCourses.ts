import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export async function getCourses () {
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