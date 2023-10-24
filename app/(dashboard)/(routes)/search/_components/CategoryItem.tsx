"use client"

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react'
import { IconType } from 'react-icons';

interface CategoryItemProps {
    label: string,
    value?: string,
    icon?: IconType
}

const CategoryItem = ({
    label,
    value,
    icon: Icon
}: CategoryItemProps) => {
  return (
    <Button
             variant="ghost"
             className={cn(
                        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center hover:border-sky-700 transition gap-x-1"
                        , ""
                        )}
             type="button"           
       >
        {Icon && <Icon className="w-4 h-4"/>}
        {label}
    </Button>
  )
}

export default CategoryItem;
