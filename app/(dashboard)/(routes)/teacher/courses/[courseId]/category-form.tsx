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
import { Combobox } from '@/components/ui/combobox'

interface CategoryFormProps {
    initialData: Course,
    courseId: string,
    options: { label: string, value: string}[]
}

const formSchema = z.object({
   categoryId: z.string().min(1, {
      message: "Category is required!"
   })
})

export const CategoryForm = ({
    initialData,
    courseId,
    options
} : CategoryFormProps) => {
  const router = useRouter();
  const [ isEditting, setIsEditting ] = useState(false)
  const toggleEdit = () => setIsEditting(current => !current)
  const selectedOption = options.find(option => option.value === initialData?.categoryId)

  // Form Management
  const form = useForm<z.infer<typeof formSchema>>({
     resolver: zodResolver(formSchema),
     defaultValues: {
         categoryId: initialData?.categoryId || ""
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
             Course Category
             <Button
                  variant="ghost"
                  onClick={toggleEdit}
                  >
                {!isEditting ? (
                      <>
                        <Pencil className="w-4 h-4 mr-2"/>
                          Edit Category
                      </>
                     ) : (
                         "Cancel"
                    )}
             </Button>
         </div>

         {!isEditting && (
             <p className={cn(
                               "text-sm mt-2",
                               !initialData.categoryId && "text-slate-500 italic"
                               )}>
              {selectedOption?.label || "No category"}
             </p>
         )}

         {isEditting && (
           <Form {...form}>
              <form
                  className="py-5"
                  onSubmit={form.handleSubmit(onSubmit)}>
                 <FormField 
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                       <FormItem>
                         <FormControl>
                           <Combobox 
                               disabled={isSubmitting}
                               {...field}
                               options={options}
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
