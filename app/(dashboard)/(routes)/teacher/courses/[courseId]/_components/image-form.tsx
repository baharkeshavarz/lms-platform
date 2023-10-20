"use client"

import { Button } from '@/components/ui/button'
import { Course } from '@prisma/client'
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import React, { useState } from 'react'
import * as z from "zod";
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FileUpload } from '@/components/file-upload'

interface ImageFormProps {
    initialData: Course,
    courseId: string,
}

const formSchema = z.object({
    imageUrl: z.string().min(1, {
       message: "Image is required!"
   })
})

export const ImageForm = ({
    initialData,
    courseId
} : ImageFormProps) => {
  const router = useRouter();
  const [ isEditting, setIsEditting ] = useState(false)
  const toggleEdit = () => setIsEditting(current => !current)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        await axios.patch(`/api/courses/${courseId}`, values);
        toast.success("Your data has updated successfully!")
        toggleEdit();
        router.refresh();
      } catch {
        toast.error("Something went wrong");
      }
  }
  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4">
         <div className="flex justify-between items-center">
             Course Image
             <Button
                  variant="ghost"
                  onClick={toggleEdit}
                  >
                {isEditting && (
                   <>Cancel</>
                )}

               {!isEditting && !initialData.imageUrl && (
                  <>
                    <PlusCircle className="w-4 h-4 mr-2"/>
                      Add an image
                  </>
                 )}

                {!isEditting && initialData.imageUrl && (
                    <>
                      <Pencil className="w-4 h-4 mr-2"/>
                        Edit Image
                    </>
                )}
             </Button>
         </div>
         {!isEditting && (
              !initialData.imageUrl 
                ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                 ) : (
                      <div className="relative aspect-video mt-2">
                        <Image 
                            src={initialData.imageUrl}
                            alt="upload image"
                            fill
                            className="object-cover rounded-md"
                        />
                      </div>
                  )
          )}
         {isEditting && (
            <div>
               <FileUpload
                  endpoint="courseImage"
                  onChange={(url) => {
                    if (url) {
                       onSubmit({ imageUrl: url })
                    }
                  }}
               />
                <div className="text-xs text-muted-foreground mt-4">
                    16:9 aspect ratio recommended
                </div>
           </div>
         )}
    </div>
  )
}
