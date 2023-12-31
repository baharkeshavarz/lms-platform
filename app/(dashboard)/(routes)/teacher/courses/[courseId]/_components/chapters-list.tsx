import { Chapter } from '@prisma/client'
import { useEffect, useState } from 'react'
import {
    DragDropContext,
    Draggable,
    DropResult,
    Droppable
} from "@hello-pangea/dnd"
import { cn } from '@/lib/utils'
import { Grip, Pencil } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ChapterItem } from '@/types/chapter'

interface ChaptersListProps{
    onEdit: (id: string) => void,
    onReorder: (updateData: ChapterItem[]) => void,
    items: Chapter[]
}

export const ChaptersList = ({
    onEdit,
    onReorder,
    items
} : ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false) ;
  const [chapters, setChapters] = useState(items)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setChapters(items)
  }, [items])

  if (!isMounted) {
    return null;
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    //result.source.index: element that is moving now
    //result.destination.index: the final place that moving elemet should go
    // First: we find the element and remove it from array
    // Then, we add it after the destination
    const items = chapters;
    const [reorderdItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderdItem)
    setChapters(items)

    // Here we just find the part that has changed(not all the array)
    const startIndex = Math.min(result.source.index, result.destination.index)
    const endIndex = Math.max(result.source.index, result.destination.index)
    const updatedChapters = items.slice(startIndex, endIndex + 1)
   // We find the position of each element in main array(items) and update it
    const bulkUpdateData = updatedChapters.map((chapter) => ({
        id: chapter.id,
        position: items.findIndex(item => item.id === chapter.id)
    }));

    onReorder(bulkUpdateData)
  }

  return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="chapters">
          {(provided) => (
             <div 
                  {...provided.droppableProps}
                   ref={provided.innerRef}
              >
                {chapters.map((chapter, index) => (
                    <Draggable
                      key={chapter.id}
                      draggableId={chapter.id}
                      index={index}
                    >
                       {(provided) => (
                         <div className={cn("flex items-center gap-x-2 my-3 bg-slate-200", 
                                             chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
                                         )}
                           ref={provided.innerRef}
                           {...provided.draggableProps}
                         >
                                <div className={cn("flex items-center gap-x-2 px-2 py-3 border-r-slate-200 hover:bg-slate-300 rounded-l-md transition", 
                                                    chapter.isPublished && "border-r-sky-200 hover:bg-sky-200"
                                                )}
                                                {...provided.dragHandleProps}
                                            >
                                            <Grip className="w-5 h-5" />           
                                            {chapter.title}
                                </div>
                                <div className="ml-auto pr-2 space-x-2 flex items-center">
                                   {chapter.isFree && <Badge>Free</Badge>}
                                   <Badge>
                                      {chapter.isPublished ? "published": "draft"}
                                   </Badge>
                                   <Pencil 
                                        onClick={() => onEdit(chapter.id)} 
                                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                                    />
                                </div>
                         </div>
                       )} 
                    </Draggable>
                ))}
                {provided.placeholder}
             </div>
          )}
        </Droppable>
     </DragDropContext>
  )
}
