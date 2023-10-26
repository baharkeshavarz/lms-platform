"use client"

import { cn } from '@/lib/utils';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import React from 'react'
import { IconType } from 'react-icons';
import qs from "query-string";

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
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");
  const isSelected = currentCategoryId === value;

  const onClick = () => {
     const nextUrl = qs.stringifyUrl({
         url: pathname,
         query: {
           title: currentTitle,
           categoryId: isSelected ? null : value,
         }
      }, { skipEmptyString: true, skipNull: true,})
     router.push(nextUrl) 
  }

  return (
    <button
             onClick={onClick}
             className={cn(
                        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center hover:border-sky-700 transition gap-x-1"
                        ,  isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
                        )}
             type="button"           
       >
        {Icon && <Icon className="w-4 h-4"/>}
        {label}
    </button>
  )
}

export default CategoryItem;
