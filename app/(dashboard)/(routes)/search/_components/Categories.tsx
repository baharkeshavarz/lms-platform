"use client"

import { Category } from '@prisma/client';
import React from 'react'
import { IconType } from "react-icons"
import {
      FcEngineering,
      FcFilmReel,
      FcMultipleDevices,
      FcMusic, 
      FcPhone, 
      FcSalesPerformance,
      FcSportsMode 
    } from "react-icons/fc"
import CategoryItem from './CategoryItem';


interface CategoriesProps {
    items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
   "Accounting" : FcSalesPerformance,
   "Music": FcMusic,
   "Fitness": FcSportsMode,
   "Filming": FcFilmReel,
   "Engineering": FcEngineering,
   "Computer Science": FcMultipleDevices,
   "Photography": FcPhone,
}

const Categories = ({
    items
}: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto">
       {items.map(item =>
                        <CategoryItem 
                            key={item.id}
                            label={item.name}
                            value={item.id}
                            icon={iconMap[item.name]}
                        />
             )}
    </div>
  )
}

export default Categories;
