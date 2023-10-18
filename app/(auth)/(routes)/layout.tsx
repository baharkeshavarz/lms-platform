import React from 'react'

const AuthLayout = ( {children}: { children: React.ReactNode}) => {
  return (
    <div className="flex justify-center items-center h-full my-auto">
        {children}
    </div>
  )
}

export default AuthLayout;
