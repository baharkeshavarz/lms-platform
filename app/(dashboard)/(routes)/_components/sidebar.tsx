import React from 'react'
import SidebarRoutes from './sidebar-routes'
import Logo from './logo'

export const Sidebar = () => {
  return (
    <div className="border-r overflew-y-auto h-full flex flex-col bg-white shadow-sm">
        <div className="p-6">
            <Logo/>
        </div>
        <div className="w-full">
            <SidebarRoutes/>
        </div>
    </div>
  )
}
