"use client"

import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { useEffect, useState } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import qs from "query-string"

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId")
  
  useEffect(() => {
    const url = qs.stringifyUrl({
        url: pathname,
        query: {
            categoryId: currentCategoryId,
            title: debouncedValue,
        }
    }, { skipEmptyString: true, skipNull: true})

    router.push(url)
  }, [debouncedValue, currentCategoryId, pathname, router])

  return (
    <div className="relative">
      <Search className="absolute top-3 left-2 w-4 h-4"/>
      <Input
         className="w-full pl-9 md:w-[300px] rounded-full bg-slate-100focus-visible:ring-slate-200"
         placeholder="Search for a course"   
         value={value}
         onChange={ e => setValue(e.target.value)}        
        />
    </div>
  )
}
