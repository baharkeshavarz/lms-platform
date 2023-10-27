import { CourseWithProgressWithCategory } from '@/types/course'
import { Course } from '@prisma/client'
import React from 'react'
import CourseCard from './course-card'

interface CoursesListProps {
    items: CourseWithProgressWithCategory[]
}

const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
            {items.map(item => (
                <CourseCard
                   key={item.id}
                   id={item.id}
                   title={item.title}
                   price={item.price!}
                   imageUrl={item.imageUrl!}
                   chaptersLength={item.chapters.length}
                   progress={item.progress}
                   category={item.category?.name!}
                />
            ))}
        </div>
        {!items.length && (
            <div className="text-sm text-center text-muted-foreground mt-10">No courses found!</div>
        )}
    </div>
  )
}

export default CoursesList