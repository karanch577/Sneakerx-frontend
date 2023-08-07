import React from "react";
import logo from "/logo.svg";
import { Link } from "react-router-dom";

import { BsHeart, BsCart } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineUser } from "react-icons/ai"
import NavIconWrapper from "./NavIconWrapper";
import Container from "./Container";
import MobileNav from "./MobileNav";
import { useDispatch, useSelector } from "react-redux";
import { showMobileNav } from "../redux/navSlice";

import { GrDown } from "react-icons/gr"

const handleForm = (e) => {
  e.preventDefault();
};

function Navbar() {
  const mobileScreen = useSelector((store) => store.navbar.mobileScreen)
  const dispatch = useDispatch()

  return (
    <>
    <Container className="flex items-center h-[65px] pt-2 justify-between font-[500] px-4 sm:px-6 xl:px-2">
      <div className="logo w-[58px]">
        <Link to="/"><img className="w-full" src={logo} alt="logo" /></Link>
      </div>
      <div className="hidden sm:flex items-center gap-6 relative min-[830px]:left-16">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <p className="cursor-pointer flex items-center gap-1">Categories <GrDown /></p>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="right flex items-center gap-3">
        <form onSubmit={handleForm} className="hidden min-[830px]:flex items-center gap-0 bg-gray-100 hover:bg-gray-200 rounded-3xl py-0.5">
          <NavIconWrapper>
            <IoSearchOutline />
          </NavIconWrapper>
          <input className="bg-transparent border-none outline-none w-[140px]" type="text" placeholder="Search" />
        </form>

        <div className="icons flex items-center">
          <NavIconWrapper visibility="hidden min-[830px]:block">
            <BsHeart />
          </NavIconWrapper>
          <NavIconWrapper visibility="min-[830px]:hidden">
            <IoSearchOutline />
          </NavIconWrapper>
          <NavIconWrapper>
            <BsCart />
          </NavIconWrapper>
          <NavIconWrapper visibility="hidden sm:block">
            <AiOutlineUser />
          </NavIconWrapper>
          
          <div onClick={() => {dispatch(showMobileNav())}}>
          <NavIconWrapper visibility="sm:hidden">
            <RxHamburgerMenu />
          </NavIconWrapper>
          </div>
        </div>
      </div>

      <MobileNav />
    </Container>
    </>
  );
}

export default Navbar;
