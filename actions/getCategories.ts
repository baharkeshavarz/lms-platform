import { db } from "@/lib/db"

export async function getCategories () {
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    })

    return categories;
}