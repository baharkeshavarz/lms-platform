import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import IconBadge from '@/components/icon-badge'
import { BookOpen } from 'lucide-react'
import { formatPrice } from '@/lib/format'

interface CourseCardProps {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    chaptersLength: number,
    progress: number | null,
    category: string,
}

const CourseCard = ({
    id,
    title,
    price,
    imageUrl,
    chaptersLength,
    progress,
    category
} : CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
        <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
            <div className="relative w-full aspect-video rounded-md overflow-hidden">
                <Image
                    fill
                    className="object-cover"
                    alt={title}
                    src={imageUrl}
                />
            </div>
            <div className="flex flex-col pt-2">
                <div className="text-lg font-medium group-hover:text-sky-700 transition">
                  {title}
                </div>
                <p className="text-sm text-muted-foreground">
                    {category}
                </p>
                <div className="flex items-center gap-2 text-sm md:text-xs text-slate-500 pt-5">
                    <IconBadge size="sm" icon={BookOpen} />
                    <span>
                       {chaptersLength} {chaptersLength > 1 ? "Chapters" : "Chapter"}
                    </span>
                </div>
            </div>

            {progress ? (
                  <div>
                     progress
                   </div>
               ) : (
                 <p className="py-2 text-md md:text-sm text-slate-700 font-medium">
                    {formatPrice(price)}
                 </p>
               )}
            <div>

            </div>

        </div>
    </Link>
  )
}

export default CourseCard