"use client"
import { Button } from '@/components/ui/button'
import { Course } from '@prisma/client'
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
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface DescriptionFormProps {
    initialData: Course,
    courseId: string,
}

const formSchema = z.object({
   description: z.string().min(1, {
      message: "Description is required!"
   })
})

export const DescriptionForm = ({
    initialData,
    courseId
} : DescriptionFormProps) => {
  const router = useRouter();
  const [ isEditting, setIsEditting ] = useState(false)
  const toggleEdit = () => setIsEditting(current => !current)

  // Form Management
  const form = useForm<z.infer<typeof formSchema>>({
     resolver: zodResolver(formSchema),
     defaultValues: {
        description: initialData?.description || ""
     },
  })

  const { isSubmitting, isValid } = form.formState;

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
             Course Description
             <Button
                  variant="ghost"
                  onClick={toggleEdit}
                  >
                {!isEditting ? (
                      <>
                        <Pencil className="w-4 h-4 mr-2"/>
                          Edit Description
                      </>
                     ) : (
                         "Cancel"
                    )}
             </Button>
         </div>

         {!isEditting && (
             <p className={cn(
                               "text-sm mt-2",
                               !initialData.description && "text-slate-500 italic"
                               )}>
              {initialData?.description || "No description"}
             </p>
         )}

         {isEditting && (
           <Form {...form}>
              <form
                  className="py-5"
                  onSubmit={form.handleSubmit(onSubmit)}>
                 <FormField 
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                       <FormItem>
                         <FormControl>
                           <Textarea 
                               disabled={isSubmitting}
                               placeholder="e.g. 'This course ia about...'"
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
