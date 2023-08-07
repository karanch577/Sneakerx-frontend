import React from 'react'

function Container({children, className}) {
  return (
    <div className={`w-full max-w-[1300px] mx-auto ${className}`}>
        {children}
    </div>
  )
}

export default Container