"use client"
import { Button } from '@/components/ui/button'
import { Chapter } from '@prisma/client'
import { Pencil } from 'lucide-react'
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
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface ChapterTitleFormProps {
    initialData: Chapter,
    courseId: string,
    chapterId: string;
}

const formSchema = z.object({
   title: z.string().min(1, {
     message: "Title is required!"
   })
})

export const ChapterTitleForm = ({
    initialData,
    courseId,
    chapterId
} : ChapterTitleFormProps) => {
  const router = useRouter();
  const [ isEditting, setIsEditting ] = useState(false)
  const toggleEdit = () => setIsEditting(current => !current)

  // Form Management
  const form = useForm<z.infer<typeof formSchema>>({
     resolver: zodResolver(formSchema),
     defaultValues: initialData,
  })

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
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
             Chapter Title
             <Button
                  variant="ghost"
                  onClick={toggleEdit}
                  >
                {!isEditting ? (
                      <>
                        <Pencil className="w-4 h-4 mr-2"/>
                          Edit Title
                      </>
                     ) : (
                         "Cancel"
                    )}
             </Button>
         </div>

         {!isEditting && (
             <p className="text-sm mt-2">{initialData?.title}</p>
         )}

         {isEditting && (
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
                      Save
                  </Button>
                </div>
              </form>
           </Form>
         )}
    </div>
  )
}
