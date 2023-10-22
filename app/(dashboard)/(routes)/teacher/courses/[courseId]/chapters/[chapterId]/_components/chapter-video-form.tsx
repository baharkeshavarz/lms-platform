"use client"

import { Button } from '@/components/ui/button'
import { Chapter, MuxData } from '@prisma/client'
import { ImageIcon, Pencil, PlusCircle, Video, VideoIcon } from 'lucide-react'
import React, { useState } from 'react'
import * as z from "zod";
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FileUpload } from '@/components/file-upload'
import MuxPlayer from "@mux/mux-player-react"

interface ChapterVideoFormProps {
    initialData: Chapter & {muxData: MuxData | null},
    courseId: string,
    chapterId: string,
}

const formSchema = z.object({
    videoUrl: z.string().min(1, {
       message: "Video is required!"
   })
})

export const ChapterVideoForm = ({
    initialData,
    courseId,
    chapterId
} : ChapterVideoFormProps) => {
  const router = useRouter();
  const [ isEditting, setIsEditting ] = useState(false)
  const toggleEdit = () => setIsEditting(current => !current)

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
             Course Image
             <Button
                  variant="ghost"
                  onClick={toggleEdit}
                  >
                {isEditting && (
                   <>Cancel</>
                )}

               {!isEditting && !initialData.videoUrl && (
                  <>
                    <PlusCircle className="w-4 h-4 mr-2"/>
                      Add an video
                  </>
                 )}

                {!isEditting && initialData.videoUrl && (
                    <>
                      <Pencil className="w-4 h-4 mr-2"/>
                        Edit video
                    </>
                )}
             </Button>
         </div>
         {!isEditting && (
              !initialData.videoUrl 
                ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <Video className="h-10 w-10 text-slate-500" />
                    </div>
                 ) : (
                      <div className="relative aspect-video mt-2">
                         <MuxPlayer
                             playbackId={initialData?.muxData?.playbackId || ""}
                          />
                      </div>
                  )
          )}
         {isEditting && (
            <div>
               <FileUpload
                  endpoint="chapterVideo"
                  onChange={(url) => {
                    if (url) {
                       onSubmit({ videoUrl: url })
                    }
                  }}
               />
                <div className="text-xs text-muted-foreground mt-4">
                    upload this chapter&apos;s video
                </div>
           </div>
         )}
         {initialData.videoUrl && !isEditting && (
             <div className="text-xs text-muted-foreground mt-2">
               Videos can take a few minutes to porcess. Refresh
               the page if the video does not appear.
              </div>
         )}
    </div>
  )
}
