import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteFromCart, updateCart } from "../redux/cartSlice";

import { FiHeart } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

function CartItem({ item }) {
  const dispatch = useDispatch()
  const availableSize = item.product.sizes.filter(item => item.quantity > 0)

  const handleUpdate = (e) => {
    dispatch(updateCart({
      productId: item.product._id,
      property: e.target.name,
      value: e.target.value
    }))
  }

  const removeItem = () => {
    dispatch(deleteFromCart({productId: item.product._id}))
  }

  return (
    <div className="flex gap-7 border-b-2 py-4">
      <div className="left">
        <img
          className="w-40 aspect-square"
          src={item.product.photos[0].secure_url}
          alt="item"
        />
      </div>
      <div className="right w-full">
        <div className="flex justify-between font-[600] mb-1">
          <h3>{item.product.name}</h3>
          <h3>₹{item.product.sellingPrice}</h3>
        </div>
        <p className="opacity-50">{item.product.collectionId.name}</p>
        <p className="my-1 opacity-50">{item.product.colourShown}</p>

        {/* options start */}
        <div className="flex gap-5 opacity-50">
        <div>
          <label htmlFor="size">Size</label>
          <select className="w-20" name="size" id="size" onChange={handleUpdate}>
            {availableSize.map(el => <option key={el.size} selected={item.size === el.size} value={el.size}>{el.size}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="quantity">Quantity</label>
          <select name="count" id="quantity" onChange={handleUpdate}>
            {[...Array(10)].map((_item, index) => <option key={index} selected={item.count === index + 1} value={index + 1}>{index + 1}</option>)}
          </select>
        </div>
        </div>

        <div className="icons flex gap-4 items-center mt-5">
          <FiHeart className="text-xl cursor-pointer"/>
          <RiDeleteBinLine onClick={removeItem} className="text-2xl cursor-pointer"/>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
