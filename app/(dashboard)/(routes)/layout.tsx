import React from 'react'
import { Sidebar } from './_components/sidebar';
import NavBar from './_components/navbar';

const DashboardLayout = ( {children}: { children: React.ReactNode}) => {
  return (
    <div className="h-full">
       <div className="flex md:pl-56 h-20 z-50 fixed inset-y-0 w-full">
           <NavBar/>
        </div>
        <div className="hidden md:flex w-56 flex-col fixed inset-y-0 z-50">
           <Sidebar/>
        </div>
        <main className="md:pl-56 w-full pt-20">
          {children}
        </main>
    </div>
  )
}

export default DashboardLayout;
