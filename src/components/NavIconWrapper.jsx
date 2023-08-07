import React from 'react'

function NavIconWrapper({children, visibility="block"}) {
  return (
    <div className={`hover:bg-gray-200 p-2 cursor-pointer text-xl rounded-full ${visibility}`}>
        {children}
    </div>
  )
}

export default NavIconWrapper