"use client"

import { ConfirmModal } from '@/components/modals/confirm-modal'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface ChapterActionsProps {
    disabled: boolean,
    courseId: string,
    chapterId: string,
    isPublished: boolean
}

function ChapterActions({
    disabled,
    courseId,
    chapterId,
    isPublished
}: ChapterActionsProps) {
  const router = useRouter()  
  const [isLoading, setIsLoading] = useState(false)

  const onDelete = async () => {
     try {
        setIsLoading(true)
        await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
        toast.success("Chapter was deleted!")
        router.refresh()
        router.push(`/teacher/courses/${courseId}`)
     } catch (error) {
        toast.error("Something went wrong!")
     } finally {
        setIsLoading(false)
     }
  }

  return (
    <div className="flex items-center gap-x-2">
        <Button
           disabled={disabled || isLoading}
           onClick={() => {}}
           variant="outline"
           size="sm"
         >
           {isPublished ? "unpublish" : "Publish"}
        </Button>

        <ConfirmModal onConfirm={onDelete}>
            <Button 
                 size="sm"
                 disabled={isLoading}
                >
                <Trash className="h-4 w-4"/>
            </Button>
        </ConfirmModal>
    </div>
  )
}

export default ChapterActions