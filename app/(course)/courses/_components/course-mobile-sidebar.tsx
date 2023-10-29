import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { auth } from '@clerk/nextjs';
import { Chapter, Course, UserProgress } from '@prisma/client'
import { Menu } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react'
import CourseSidebar from './course-sidebar';

interface CourseMobileSidebarProps {
    course: Course & { 
                     chapters: (Chapter & {
                        userProgress: UserProgress[] | null;
                      })[]
                    },
    progressCount: number,
}
const CourseMobileSidebar = async({
    course,
    progressCount
}: CourseMobileSidebarProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/")
  }
  return (
   <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
           <Menu/>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-white w-72">
           <CourseSidebar
              course={course}
              progressCount={progressCount}
            />
        </SheetContent>
   </Sheet>
  )
}

export default CourseMobileSidebar