import { db } from "@/lib/db";

export const getProgress = async(
          userId: string,
          courseId: string,
      ): Promise<number> => {

        try {
            // Find published chapter ids
            const publishedChapters = await db.chapter.findMany({
                where: {
                    courseId: courseId,
                    isPublished: true,
                },
                select: {
                    id: true,
                }
            })
            const publishedChapterIds = publishedChapters.map(chapter => chapter.id);
            
            // Get the user progress
            const validCompletedChapters = await db.userProgress.count({
                where: {
                    userId: userId,
                    chapterId: {
                        in: publishedChapterIds,
                    },
                    isCompleted: true,
                }
            })

            const progressPercentage = (validCompletedChapters / publishedChapterIds.length) * 100;
            return progressPercentage;

        } catch (error) {
            console.log("[GET_PROGRESS]", error)
            return 0;
        }
}

/*
    In this specific context, the use of Promise<number> indicates that the function returns a promise that will eventually resolve to a number. Here's why this is beneficial:

    Asynchronous Operations: This function is likely interacting with a database (db), which often involves asynchronous operations. These operations may take some time to complete. By returning a Promise<number>, it allows the caller to handle the result once it's ready, rather than potentially blocking the execution of other code while waiting for the result.

    Non-Blocking: If this function was designed to return a plain number, it would imply that it's a synchronous operation. This would mean that any code calling this function would have to wait for the result before continuing execution. By returning a promise, other code can continue running while the progress calculation is being performed in the background.

    Error Handling with Promises: Promises also provide a structured way to handle both successful and failed outcomes of an asynchronous operation. The caller can use .then() and .catch() to handle the result or any potential errors.

    Compatibility with Async/Await: Using Promise<number> allows the function to be used with async/await, which is a modern way of dealing with asynchronous code in JavaScript and TypeScript. This makes it easier for developers to work with asynchronous code in a more synchronous-looking manner.
    */