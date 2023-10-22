import Mux from "@mux/mux-node"
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!,
)

export async function PATCH(
    req: Request,
    { params }: {
        params: {
            courseId: string,
            chapterId: string;
        }
    }
  ) {
    try {
       const { userId } = auth();
       if (!userId) {
          return new NextResponse("Unauthorized", { status: 401 })
       }

       const courseOwner = await db.course.findUnique({
        where: {
            id: params.courseId,
            userId
        }
      })

      if (!courseOwner) {
        return new NextResponse("Unauthorized", { status: 401 })
      }

       // We separate isPublished since we don't want user accidently update this field, it has its own url to update
       const { isPublished, ...values } = await req.json();
       const course = await db.chapter.update({
          where: {
            id: params.chapterId,
            courseId: params.courseId,
         },
         data: {
            ...values
         }
       });

      // Uplaod video
      if(values.videoUrl) {
         const existingMuxData = await db.muxData.findFirst({
           where: {
             chapterId: params.chapterId
           }
         })

         // In case that user changes the video(clean-up)
         if(existingMuxData) {
           await Video.Assets.del(existingMuxData.assetId)
           await db.muxData.delete({
              where:{
                id: existingMuxData.id
              }
            });
         }

         // add new assets
         const asset = await Video.Assets.create({
            input: values.videoUrl,
            playback_policy: "public",
            test: false,
         })

         await db.muxData.create({
           data: {
             chapterId: params.chapterId,
             assetId: asset.id,
             playbackId: asset.playback_ids?.[0]?.id,
           }
         })
      } 

       return NextResponse.json(course)
    } catch (error) {
        console.log("[CHAPTER_ID]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}