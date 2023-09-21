import React, { useEffect } from "react";
import Container from "../components/Container";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserOrders from "../components/UserOrders";
import UserProfile from "../components/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeUser } from "../redux/userSlice";

function UserDashboard() {
  const { subpage } = useParams();
  const user = useSelector((store) => store.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function linkClasses(type = null) {
    let classes = "py-2 px-4 text-center rounded";
    if (type === subpage) {
      return `${classes} bg-black text-white`;
    } else {
      return classes;
    }
  }

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("/user/signout")
      console.log(data.success)
      if(data.success) {
        dispatch(removeUser())
      }
    } catch (error) {
      console.log("Error in signout")
      console.log(error)
    }
  };

  useEffect(() => {
    if(!user) {
        navigate("/")
    }
  }, [user]);

  return (
    <div>
      <Container>
        <div className="px-4 max-w-6xl mt-6 sm:mt-4 mx-auto sm:flex min-h-[60vh]">
          {/* only for small screen */}
          <section className="sm:hidden my-6">
            <Link className={linkClasses("profile")} to={"/user/profile"}>
              Profile
            </Link>
            <Link className={linkClasses("orders")} to={"/user/orders"}>
              Orders
            </Link>
          </section>

          <aside className="w-[200px] hidden sm:flex flex-col rounded p-[2px] bg-white h-auto border">
            <Link className={linkClasses("profile")} to={"/user/profile"}>
              Profile
            </Link>
            <Link className={linkClasses("orders")} to={"/user/orders"}>
              Orders
            </Link>
            <button className={linkClasses("signout")} onClick={handleLogout}>
              Logout
            </button>
          </aside>
          <main className="sm:ml-[20px] w-full sm:w-[calc(100%-250px)]">
            {subpage === "profile" && <UserProfile />}
            {subpage === "orders" && <UserOrders />}
          </main>
        </div>
      </Container>
    </div>
  );
}

export default UserDashboard;
