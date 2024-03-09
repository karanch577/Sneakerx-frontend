import React from "react";
import { GrClose, GrNext } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { hideMobileNav } from "../redux/navSlice";
import { Link } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import { removeUser } from "../redux/userSlice";

function MobileNav() {
  const mobileScreen = useSelector((store) => store.navbar.mobileScreen);
  const user = useSelector(store => store.user.user)
  const categoryList = useSelector(store => store.navbar.categoryList)

  const dispatch = useDispatch();

  const toggleNav = () => {
    dispatch(hideMobileNav())
  }

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("/user/signout")
      if(data.success) {
        dispatch(removeUser())
        dispatch(hideMobileNav())
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div
      className={`fixed top-0 min-h-screen w-screen backdrop-blur-sm left-0 z-10 sm:hidden transition duration-500 ${
        mobileScreen ? "translate-x-[0%]" : "translate-x-[100%]"
      }`}
    >
      <div className="absolute flex flex-col min-h-[100vh] bg-white w-[19rem] z-20 right-0 top-0 sm:hidden p-7">
        <GrClose
          onClick={toggleNav}
          className="text-xl self-end cursor-pointer"
        />
        <div className="flex flex-col gap-4 mt-6 ">
          <Link
            onClick={toggleNav}
            className="font-[500] text-[24px] cursor-pointer flex items-center justify-between"
            to="/"
          >
            Home <GrNext className="text-xl" />
          </Link>
          <Link
            onClick={toggleNav}
            className="font-[500] text-[24px] cursor-pointer flex items-center justify-between"
            to="/#"
          >
            About <GrNext className="text-xl" />
          </Link>
          {categoryList?.length > 0 && categoryList?.map((el, i) =>
          <Link
            key={i}
            onClick={toggleNav}
            className="font-[500] text-[24px] cursor-pointer flex items-center justify-between"
            to={`/category/${el._id}`}
          >
            {el.name} <GrNext className="text-xl" />
          </Link>
          )}
          <Link
            onClick={toggleNav}
            className="font-[500] text-[24px] cursor-pointer flex items-center justify-between"
            to="/#"
          >
            Contact <GrNext className="text-xl" />
          </Link>
        </div>
        
        {/* button start */}
        {!user ?
        <div className="flex mt-16 gap-7">
          <Link onClick={toggleNav} className="w-full" to="/register">
            <Button className="py-2" bg="black" text="Join Us" />
          </Link>
          <Link onClick={toggleNav} className="w-full" to="/login">
            <Button className="py-2" text="Sign In" />
          </Link>
        </div>
        :
        <div>
        <div className="flex mt-16 gap-7">
          <Link onClick={toggleNav} className="w-full" to="/user/profile">
            <Button className="py-2" bg="black" text="Dashboard" />
          </Link>
          <Link onClick={toggleNav} className="w-full" to="/user/orders">
            <Button className="py-2" text="Orders" />
          </Link>

          {/* logout button */}
        </div>
          <button onClick={handleLogout} className="mt-12 border w-full py-2 rounded-lg hover:text-white hover:bg-black">Logout</button>
        </div>
        }
        {/* button end */}
      </div>
    </div>
  );
}

export default MobileNav;
