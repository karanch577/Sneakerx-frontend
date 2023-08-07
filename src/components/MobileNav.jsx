import React from 'react'
import { GrClose, GrNext } from "react-icons/gr"
import { useDispatch, useSelector } from 'react-redux'
import { hideMobileNav } from '../redux/navSlice'
import { Link } from 'react-router-dom'


function MobileNav() {
    const mobileScreen = useSelector((store) => store.navbar.mobileScreen)
    
const dispatch = useDispatch()
  return (
    <div className={`fixed top-0 min-h-screen w-screen backdrop-blur-sm left-0 z-10 sm:hidden transition duration-500 ${mobileScreen ? "translate-x-[0%]" : "translate-x-[100%]"}`}>
      <div className="absolute flex flex-col min-h-[100vh] bg-white w-[19rem] z-20 right-0 top-0 sm:hidden p-7">
        <GrClose onClick={() => dispatch(hideMobileNav())} className='text-xl self-end' />
        <div className='flex flex-col gap-4 mt-6 '>
        <Link className='font-[500] text-[24px] cursor-pointer flex items-center justify-between' to="/">Home <GrNext className='text-xl' /></Link>
        <Link className='font-[500] text-[24px] cursor-pointer flex items-center justify-between' to="/about">About <GrNext className='text-xl'/></Link>
        <Link className='font-[500] text-[24px] cursor-pointer flex items-center justify-between' to="/categories">Categories <GrNext className='text-xl'/></Link>
        <Link className='font-[500] text-[24px] cursor-pointer flex items-center justify-between' to="/contact">Contact <GrNext className='text-xl'/></Link>
        </div>
        {/* button start */}
        <div>
        <button>Join Us</button>
        <button>Sign In</button>
        </div>
        {/* button end */}
      </div>
      </div>
  )
}

export default MobileNav