"use client"

import { Search } from "lucide-react"
import { Input } from "./ui/input"

export const SearchInput = () => {

  return (
    <div className="relative">
      <Search className="absolute top-3 left-2 w-4 h-4"/>
      <Input
         className="w-full pl-9 md:w-[300px] rounded-full bg-slate-100
                    focus-visible:ring-slate-200"
         placeholder="Search for a course"           
        />
    </div>
  )
}
