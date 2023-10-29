import NavbarRoutes from '@/components/navbar-routes';
import { auth } from '@clerk/nextjs';
import { Chapter, Course, UserProgress } from '@prisma/client'
import { redirect } from 'next/navigation';
import React from 'react'
import CourseMobileSidebar from './course-mobile-sidebar';

interface CourseNavbarProps {
    course: Course & { 
                     chapters: (Chapter & {
                        userProgress: UserProgress[] | null;
                      })[]
                    },
    progressCount: number,
}
const CourseNavbar = async({
    course,
    progressCount
}: CourseNavbarProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/")
  }
  return (
    <div className="p-4 border-b h-full flex items-center shadow-sm ">
        <CourseMobileSidebar
               course={course}
               progressCount={progressCount}
        />
        <NavbarRoutes/>      
    </div>
  )
}

export default CourseNavbar