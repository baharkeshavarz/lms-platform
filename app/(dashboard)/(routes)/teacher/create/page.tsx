"use client"

import Link from "next/link"
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import * as z from "zod"
import { useForm } from "react-hook-form"
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel
   } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const formSchema = z.object({
   title: z.string().min(1, {
       message: "Title is required!"
   })
})

const CreatePage = () => {
 const router = useRouter(); 
 const form = useForm<z.infer<typeof formSchema>>({
   resolver: zodResolver(formSchema),
   defaultValues: {
     title: ""
   }
 })

 const { isSubmitting, isValid } = form.formState;

 const onSubmit = async (values: z.infer<typeof formSchema>) => {
   try {
      const response = await axios.post(`/api/courses`, values);
      toast.success("Course Created!")
      router.push(`/teacher/courses/${response.data.id}`)
   } catch (error) {
      toast.error("Something went wrong!")
   }
 }

  return (
     <div className="max-w-5xl mx-auto flex md:justify-center md:items-center h-full p-6">
          <div>
            <h1 className="text-2xl">Name your course</h1>
            <p className="text-sm text-slate-600">
              What would you like to name your course? Don&apost worry, you can change this anytime!
            </p>
           <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render= {({ field }) => (
                    <FormItem>
                       <FormLabel>
                            Course title
                       </FormLabel>
                       <FormControl>
                           <Input
                               disabled={isSubmitting}
                               placeholder="e.g 'Advanced web development'"
                               {...field}
                           />
                       </FormControl>
                       <FormDescription>
                          What would you teach in this course?
                       </FormDescription>
                    </FormItem>
                  )}       
                />

                <div className="flex justify-center items-center gap-x-2">
                    <Link href="/">
                      <Button variant="ghost">
                          Cancel
                      </Button>
                    </Link>

                   <Button 
                           type="submit"
                           disabled={isSubmitting || !isValid}
                         >
                      Continue
                   </Button>
                </div>
              </form>
           </Form>
         </div> 
    </div>
  )
}

export default CreatePage;
