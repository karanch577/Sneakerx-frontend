import React from "react";
import { setOrders } from "../redux/userSlice";
import UserOrder from "./UserOrder";
import useFetchList from "../utils/useFetchList"

function UserOrders() {
  const userOrderList = useFetchList("order/user/all")?.orders

  // const dispatch = useDispatch()
  // if(userOrderList) {
  //   dispatch(setOrders(userOrderList))
  // }
  return (
    <div className=" mx-3">
      {userOrderList?.length > 0 ? (
        <div>
          {userOrderList.map(order => <UserOrder key={order._id} order={order} />
          )}
        </div>
      ) : (
        <div className="mt-5">You don't have ordered anything</div>
      )}
    </div>
  );
}

export default UserOrders;
