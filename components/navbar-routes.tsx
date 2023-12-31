"use client"

import React from 'react'
import { UserButton } from '@clerk/nextjs';
import { usePathname } from "next/navigation"
import { LogOut }  from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { SearchInput } from './search-input';

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeactherPage = pathname.startsWith("/teacher");
  const isPlayerPage = pathname.includes("/courses")
  const isSearchPage = pathname === "/search"
  return (
      <>
        {isSearchPage && (
           <div className="hidden md:block">
              <SearchInput/>
           </div>
        )}
      
         <div className="ml-auto flex items-center gap-x-2">
            { (isPlayerPage || isTeactherPage) ? (
                <Link href="/">
                  <Button>
                    <LogOut className="w-4 h-4"/>
                      Exit
                  </Button>
                </Link>
            ) : (
                <Link href="/teacher/courses">
                    <Button variant="ghost" size="sm">
                        Teacher Mode
                    </Button>
              </Link>
            )}
            <UserButton afterSignOutUrl="/" />
        </div>
      </>
  )
}

export default NavbarRoutes;
