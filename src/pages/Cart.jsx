import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";

function Cart() {
  const [total, setTotal] = useState(0);
  const [activeCouponList, setActiveCouponList] = useState([])

  const cart = useSelector((store) => store.cart.cartItems);


  useEffect(() => {
    if(cart.length) {
    const total = cart.reduce((acc, cur) => acc + cur?.product?.sellingPrice * cur?.count ,0)

    setTotal(total)
    } else {
      setTotal(0)
    }
  }, [cart])

  return (
    <div>
      <Container>
        <div className="flex mt-16 mx-28 gap-10 mb-5">
          <div className="left w-8/12 mb-6">
            <h2 className="text-2xl font-[500] mb-2">Bag</h2>
            {cart.length > 0 && cart.map(item => <CartItem key={item.product._id} item={item} />)}
          </div>

          <div className="right w-4/12">
            <h2 className="text-2xl font-[500] mb-6">Summary</h2>
            <div className="flex justify-between border-b-2 pb-2">
              <h3>Subtotal</h3>
              <p>₹{total}</p>
            </div>
            <p className="text-[14px] font-[300] mt-4">The subtotal reflects the total price of your order, including duties and taxes, before any applicable discounts. It does not include delivery costs and international transaction fees.</p>

            {/* coupon start */}
            <div className="coupon mt-3">
              <form className="flex gap-4">
                <input type="text" className="grow px-2 py-0.5 border-2 focus:border-black " placeholder="Enter Coupon" />
                <button className=" bg-black text-white py-0.5 px-3.5 rounded">Apply</button>
              </form>


            </div>
            {/* coupon end */}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Cart;
