import React from 'react'

function Button({className, text, bg, icon="", onClick }) {
  return (
    <div onClick={onClick} className={`my-3 border flex items-center justify-center gap-2 font-[500] rounded-[2rem] ${className} ${bg === "black" ? "bg-black text-white hover:bg-opacity-60" : "hover:border-black"}`}>{text} {icon}</div>
  )
}

export default Button