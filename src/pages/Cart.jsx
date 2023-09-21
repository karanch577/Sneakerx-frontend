import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import useFetchList from "../utils/useFetchList";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { addCoupon } from "../redux/cartSlice";

function Cart() {
  const [total, setTotal] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [couponInput, setCouponInput] = useState("");
  const dispatch = useDispatch()

  const cart = useSelector((store) => store.cart.cartItems);

  const activeCoupons = useFetchList("coupon/active")?.coupons;

  const handleCoupon = (e) => {
    e.preventDefault();

    const appliedCoupon = activeCoupons.filter(
      (el) => couponInput.toUpperCase() === el.code
    );

    setFinalAmount((prev) => prev - (prev * appliedCoupon[0]?.discount) / 100);

    if(appliedCoupon.length) {
      dispatch(addCoupon(appliedCoupon[0]))
    }
  };

  useEffect(() => {
    if (cart.length) {
      const total = cart.reduce(
        (acc, cur) => acc + cur?.product?.sellingPrice * cur?.count,
        0
      );

      setTotal(total);
      setFinalAmount(total);
    } else {
      setTotal(0);
    }
  }, [cart]);

  return (
    <div>
      <Container>
        {cart.length === 0 ? (
          <div className="flex-[2] pt-36 flex flex-col items-center pb-[50px] md:-mt-14 mb-12">
            <img
              src="/empty-cart.jpg"
              width={300}
              height={300}
              className="w-[300px] md:w-[400px]"
            />
            <span className="text-xl font-bold">Your cart is empty</span>
            <span className="text-center mt-4">
              Looks like you have not added anything in your cart.
              <br />
              Go ahead and explore top categories.
            </span>
            <Link
              to="/"
              className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex mt-16 mx-28 gap-10 mb-5">
            <div className="left w-8/12 mb-6">
              <h2 className="text-2xl font-[500] mb-2">Bag</h2>
              {cart.length > 0 &&
                cart.map((item) => (
                  <CartItem key={item.product._id} item={item} />
                ))}
            </div>

            <div className="right w-4/12">
              <h2 className="text-2xl font-[500] mb-6">Summary</h2>
              <div className="flex justify-between border-b-2 pb-2">
                <h3>Subtotal</h3>
                <p>₹{total}</p>
              </div>
              <p className="text-[14px] font-[300] mt-4">
                The subtotal reflects the total price of your order, including
                duties and taxes, before any applicable discounts. It does not
                include delivery costs and international transaction fees.
              </p>

              {/* coupon start */}
              <div className="coupon mt-3">
                <form className="flex gap-4" onSubmit={handleCoupon}>
                  <input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    type="text"
                    className="grow px-2 py-0.5 border-2 focus:border-black "
                    placeholder="Enter Coupon"
                  />
                  <button className=" bg-black text-white py-0.5 px-3.5 rounded">
                    Apply
                  </button>
                </form>

                <ul className="my-2 p-2">
                  {activeCoupons?.length > 0 &&
                    activeCoupons.map((item) => (
                      <li
                        key={item._id}
                        className="flex justify-between py-1.5 border-b-2"
                      >
                        {item.code}
                        <span>{item.discount}% OFF</span>
                      </li>
                    ))}
                </ul>
              </div>
              {/* coupon end */}

              <p className="flex justify-between mt-6 border-b-2 pb-2">
                Total<span>₹{finalAmount}</span>
              </p>
              <Link to="/checkout">
                <Button className="py-2" text="Checkout" bg="black" />
              </Link>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Cart;
