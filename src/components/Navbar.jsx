import React, { useEffect, useState } from "react";
import logo from "/logo.svg";
import { Link, useNavigate } from "react-router-dom";

import { BsHeart, BsCart } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrNext } from "react-icons/gr";

import NavIconWrapper from "./NavIconWrapper";
import Container from "./Container";
import MobileNav from "./MobileNav";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryList, showMobileNav } from "../redux/navSlice";

import { GrDown } from "react-icons/gr";
import { IoMdArrowDropdown } from "react-icons/io";
import axios from "axios";
import { removeUser } from "../redux/userSlice";
import useFetchList from "../utils/useFetchList";
import { addSearchResult } from "../redux/searchSlice";


function Navbar() {
  const [isSecNavOpen, setIsSecNavOpen] = useState(false);
  const [inputValue, setInputValue] = useState("")
  const [isHover, setIsHover] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const user = useSelector((store) => store.user.user);
  const cart = useSelector((store) => store.cart.cartItems);
  const categoryList = useFetchList("category/all").collections

  
  useEffect(() => {
    dispatch(addCategoryList(categoryList))
    
  }, [categoryList?.length])


  const handleLogout = async () => {
    try {
      const { data } = await axios.get("/user/signout");
      if (data.success) {
        dispatch(removeUser());
        setIsSecNavOpen((prev) => !prev);
      }
    } catch (error) {
      console.log("Error in signout");
      console.log(error);
    }
  };

  // handling the category list on hover
  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(inputValue){
    try {
      const res = await axios.get(`/product/search?q=${inputValue}`)

      if(res.data.success){
        dispatch(addSearchResult(res.data.products))
        setInputValue("")
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      navigate("/searchResult")
    }
    }
  }


  return (
    <>
      <Container className="flex items-center h-[65px] pt-2 justify-between font-[500] px-4 sm:px-6 xl:px-2">
        <div className="logo w-[58px]">
          <Link to="/">
            <img className="w-full" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="hidden sm:flex items-center gap-6 relative min-[900px]:left-16">
          <Link to="/">Home</Link>
          <p className="cursor-pointer">About</p>
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative">
            <p className="cursor-pointer flex items-center gap-1">
              Categories <GrDown className={`transition ${isHover && "rotate-180"}`} />
            </p>
            {isHover && 
            <div className="absolute top-6 w-[10rem] -left-4">
              {categoryList.map((category) => <Link to={`/category/${category._id}`} className="my-1 hover:bg-gray-100 rounded cursor-pointer inline-block px-2" key={category._id}>{category.name}</Link>)}
            </div>}
          </div>
          <p className="cursor-pointer">Contact</p>
        </div>
        <div className="right flex items-center gap-3">
          <form
            onSubmit={handleSubmit}
            className="hidden min-[900px]:flex items-center gap-0 bg-gray-100 hover:bg-gray-200 rounded-3xl py-0.5"
          >
            <NavIconWrapper>
              <IoSearchOutline />
            </NavIconWrapper>
            <input
              className="bg-transparent border-none outline-none w-[140px]"
              type="text"
              placeholder="Search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </form>

          <div className="icons flex items-center">
            <NavIconWrapper visibility="hidden min-[900px]:block">
              <BsHeart />
            </NavIconWrapper>
            

            <Link to="/cart">
              <NavIconWrapper>
                <div className="relative">
                  <BsCart />
                  {cart.length > 0 && (
                    <span className="bg-red-500 text-white rounded-full absolute -top-1 -right-1 flex items-center justify-center text-[10px] w-4 h-4">
                      {cart?.length}
                    </span>
                  )}
                </div>
              </NavIconWrapper>
            </Link>

            <div className="relative">
              {user ? (
                <div className="hidden sm:block">
                  <button
                    onClick={() => setIsSecNavOpen((prev) => !prev)}
                    className="flex items-center text-lg"
                  >
                    {user.name.split(" ")[0]}
                    <IoMdArrowDropdown
                      className={`text-2xl relative top-[1px] transition ${
                        isSecNavOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                </div>
              ) : (
                <Link
                  className="hidden sm:block bg-black text-white rounded py-0.5 px-3 mx-2"
                  to="/login"
                >
                  Sign In
                </Link>
              )}

              {/* secondary nav start */}
              {isSecNavOpen && (
                <div className="absolute right-2 flex flex-col gap-2 bg-gray-300 rounded w-[10rem] z-40 py-5 px-3 mt-2">
                  <Link
                    onClick={() => setIsSecNavOpen((prev) => !prev)}
                    to="/user/profile"
                    className="flex items-center justify-between"
                  >
                    Profile <GrNext />
                  </Link>
                  <Link
                    onClick={() => setIsSecNavOpen((prev) => !prev)}
                    to="/user/orders"
                    className="flex items-center justify-between"
                  >
                    Orders <GrNext />
                  </Link>
                  <Link
                    onClick={handleLogout}
                    className="flex items-center justify-between"
                  >
                    Logout <GrNext />
                  </Link>
                </div>
              )}
              {/* secondary nav end */}
            </div>

            <div
              onClick={() => {
                dispatch(showMobileNav());
              }}
            >
              <NavIconWrapper visibility="sm:hidden">
                <RxHamburgerMenu />
              </NavIconWrapper>
            </div>

          </div>
        </div>

        <MobileNav />
      </Container>
      {/* mobile search input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-5 min-[900px]:hidden">
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="border w-full px-2 rounded py-0.5" type="text" placeholder="Search"/>
            <button>
            <IoSearchOutline className="text-2xl"/>
            </button>

      </form>
      {/* mobile search input end */}
    </>
  );
}

export default Navbar;
