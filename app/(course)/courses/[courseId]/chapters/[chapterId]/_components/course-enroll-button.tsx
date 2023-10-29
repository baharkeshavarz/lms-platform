import React from 'react'

interface CourseEnrollButtonProps {
    courseId: string,
    price: number,
}
const CourseEnrollButton = ({
    courseId,
    price
}: CourseEnrollButtonProps) => {
  return (
    <div>CourseEnrollButton</div>
  )
}

export default CourseEnrollButton