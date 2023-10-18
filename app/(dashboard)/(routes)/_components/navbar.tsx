import React from 'react'
import MobileSidebar from './mobile-sidebar';
import NavbarRoutes from '@/components/navbar-routes';

const NavBar = () => {
  return (
    <div className="border-b w-full flex items-center shadow-sm h-full bg-white p-4">
        <MobileSidebar/>
         <NavbarRoutes/>
    </div>
  )
}

export default NavBar