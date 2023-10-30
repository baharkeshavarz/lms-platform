"use client"

import { useConfettiStore } from '@/hooks/use-confetti-store';
import { cn } from '@/lib/utils'
import MuxPlayer from "@mux/mux-player-react";
import axios from 'axios';
import { Loader2, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface VideoPlayerProps {
    chapterId: string,
    title: string,
    courseId: string,
    nextChapterId?: string,
    playbackId?: string,
    isLocked: boolean,
    completedOnEnd: boolean,
}

const VideoPlayer = ({
    chapterId,
    title,
    courseId,
    nextChapterId,
    playbackId,
    isLocked,
    completedOnEnd,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false)  
  const confetti = useConfettiStore();
  const router = useRouter()

  const onEnded = async() => {
     try {
        if (completedOnEnd) {
            axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                isCompleted: true,
            })

            if (!nextChapterId) {
                confetti.onOpen();
            }

            if (nextChapterId) {
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
            }
            toast.success("Progress updated")
            router.refresh();
        }
     } catch (error) {
        toast.error("Something went wrong")
     }
  }
  return (
    <div className="relative aspect-video">
        {!isLocked && !isReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
               <Loader2 className="w-8 h-8 animate-spin text-secondary"/>
            </div>
        )}

       {isLocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 text-secondary gap-y-2">
               <Lock className="w-8 h-8" />
               <p className="text-sm">
                  This chapter is locked!
               </p>
            </div>
        )}

        {!isLocked && (
            <MuxPlayer
                title={title}
                className={cn(!isReady && "hidden")}
                onCanPlay={() => setIsReady(true)}
                onEnded={onEnded}
                autoPlay
                playbackId={playbackId}
            />
        )}
    </div>
  )
}

export default VideoPlayer