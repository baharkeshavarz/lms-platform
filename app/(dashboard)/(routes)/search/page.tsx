import { getCategories } from '@/actions/get-categories';
import React from 'react'
import Categories from './_components/categories';
import { SearchInput } from '@/components/search-input';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { getCourses } from '@/actions/get-courses';
import CoursesList from '@/components/courses-list';

interface SearchProps {
  searchParams: {
    title: string,
    categoryId: string,
  }
}
const Search = async ({ searchParams } : SearchProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/")
  }

  // Get categories
  const categories = await getCategories();
  // Get courses
  const courses = await getCourses({ userId, ...searchParams })
  
  return (
    <>
      <div className="p-6 md:hidden block">
        <SearchInput/>
      </div>
     <div className="p-6 space-y-5">
        <Categories 
            items={categories}
        />
        <CoursesList items={courses}/>
    </div>
    </>
  )
}

export default Search