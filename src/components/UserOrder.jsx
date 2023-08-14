import React from 'react'
import OrderedProduct from './OrderedProduct'

function UserOrder({order}) {
    const orderedDate = new Date(order.createdAt)
    console.log(order.products)
  return (
    <div className='border-b-2'>
        <div className='flex justify-between'>
            <p>Ordered on: {orderedDate.getDate()}/{orderedDate.getMonth()}/{orderedDate.getFullYear()}</p>
            <p>Status: {order.status}</p>
        </div>
        <div>
            {order.products && order.products.map(el => <OrderedProduct key={el._id} product={el} />)}
        </div>
    </div>
  )
}

export default UserOrder