import { Category, Chapter, Course } from "@prisma/client";

export type CourseWithProgressWithCategory = Course & {
    category: Category | null,
    chapters: { id: string }[],
    progress: number | null,
}

export type GetCourses = {
    userId: string,
    title?: string,
    categoryId?: string,
}

export type CourseWithChpaterProgressWithCategory = Course & {
    category: Category,
    chapters: Chapter[],
    progress: number | null,
}

export type DashboardCourses = {
    completedCourses: CourseWithChpaterProgressWithCategory[],
    courseInProgress: CourseWithChpaterProgressWithCategory[];
}
