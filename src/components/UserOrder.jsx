import React, { useState } from 'react'
import OrderedProduct from './OrderedProduct'
import { GrDown } from "react-icons/gr";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { cancelOrder } from '../redux/userSlice';


function UserOrder({order}) {
    const [showCancel,setShowCancel] = useState(false)
    const orderedDate = new Date(order.createdAt)

    const dispatch = useDispatch()

    const handleCancelOrder = async () => {
      try {
        const { data } = await axios.delete(`/order/cancel/${order._id}`)
        if(data.success) {
          setShowCancel(false)
          dispatch(cancelOrder())
        }
        
      } catch (error) {
        console.log("error in cancel order")
        console.log(error)
      }
    }

  return (
    <div className='border-b-2 mt-1'>
        <div className='flex justify-between'>
            <p>Ordered on: {orderedDate.getDate()}/{orderedDate.getMonth()}/{orderedDate.getFullYear()}</p>
            <p className='relative'>Status: <span className={`${order?.status === "CANCELLED" ? "bg-red-500 pointer-events-none": "bg-black"} text-white rounded px-2 py-0.5 mt-1 cursor-pointer`} onClick={() => setShowCancel(prev => !prev)}>{order.status} <GrDown className={`filter relative bottom-0.5 invert inline-block transition ${showCancel && "rotate-180"}`}/></span>
            {showCancel && <div className='absolute right-[3.25rem] hover:text-red-500 cursor-pointer' onClick={handleCancelOrder}>Cancel</div>}
            </p>

        </div>
        <div>
            {order.products && order.products.map(el => <OrderedProduct key={el._id} product={el} />)}
        </div>
    </div>
  )
}

export default UserOrder