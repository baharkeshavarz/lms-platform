"use client"

import { Button } from '@/components/ui/button'
import { Chapter, Course } from '@prisma/client'
import { Loader2, PlusCircle } from 'lucide-react'
import React, { useState } from 'react'
import * as z from "zod";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { ChaptersList } from './chapters-list'
import { ChapterItem } from '@/types'

interface ChaptersFormProps {
    initialData: Course & { chapters: Chapter[] },
    courseId: string,
}

const formSchema = z.object({
   title: z.string().min(1, {
      message: "Title is required!"
   })
})

export const ChaptersForm = ({
    initialData,
    courseId
} : ChaptersFormProps) => {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const toggleCreating = () => setIsCreating(current => !current)

  // Form Management
  const form = useForm<z.infer<typeof formSchema>>({
     resolver: zodResolver(formSchema),
     defaultValues: {
         title: ""
     },
  })

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        await axios.post(`/api/courses/${courseId}/chapters`, values);
        toast.success("Your data has updated successfully!")
        toggleCreating();
        router.refresh();
      } catch {
        toast.error("Something went wrong");
      }
  }

  const onReorder = async (updateData: ChapterItem[]) => {
    try {
      setIsUpdating(true)
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
          list: updateData
      })
      toast.success("Your chapters have updated successfully!")
      setTimeout(() => {
        setIsUpdating(false)
      }, 3000)
   
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong")
      setIsUpdating(false)
    }
  }

  const onEdit = (id: string) => {
     router.push(`/teacher/courses/${courseId}/chapters/${id}`)
  }

  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4 relative">
          {isUpdating  && (
                <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 flex items-center justify-center rounded-md z-50">
                     <Loader2 className="w-6 h-6 animate-spin text-sky-700"/>
                </div>
           )}

         <div className="flex justify-between items-center">
             Course Chapters
             <Button
                  variant="ghost"
                  onClick={toggleCreating}
                  >
                {!isCreating ? (
                      <>
                        <PlusCircle className="w-4 h-4 mr-2"/>
                          Add a chapter
                      </>
                     ) : (
                         "Cancel"
                    )}
             </Button>
         </div>

         {isCreating && (
           <Form {...form}>
              <form
                  className="py-5"
                  onSubmit={form.handleSubmit(onSubmit)}>
                 <FormField 
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                       <FormItem>
                         <FormControl>
                           <Input 
                               disabled={isSubmitting}
                               placeholder="e.g. 'Introduction to the course'"
                               {...field}
                           />
                         </FormControl>
                         <FormMessage/>
                       </FormItem>
                    )
                    }
                 />
                <div className="py-2">
                  <Button 
                      disabled={ isSubmitting || !isValid}
                      type="submit">
                      Create
                  </Button>
                </div>
              </form>
           </Form>
         )}

         {!isCreating && (
             <p className={cn("text-sm pt-4",
                    !initialData.chapters.length && "text-slate-500 italic"
               )}>
              {!initialData.chapters.length && "No Chapters"} 
              <ChaptersList
                 onEdit={onEdit}
                 onReorder= {onReorder}
                 items={initialData.chapters || []}
              />
            </p>
         )}

         {!isCreating && (
            <p className="text-sm text-muted-foreground mt-4">
               Drag and drop to reorder the chapters
            </p>
         )}
    </div>
  )
}
