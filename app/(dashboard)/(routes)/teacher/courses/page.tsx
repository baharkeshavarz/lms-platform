import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { getCourseList } from '@/actions/get-courses'
import { Button } from '@/components/ui/button';

const CoursePage = async() => {
   const courses = await getCourseList();
   return (
      <div className="container mx-auto py-10">
         <DataTable columns={columns} data={courses} />
      </div>
     )
}

export default CoursePage