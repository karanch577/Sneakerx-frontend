import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { emptyCart } from "../redux/cartSlice";

function Checkout() {
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentRes, SetPaymentRes] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user.user);
  const cart = useSelector((store) => store.cart.cartItems);
  const appliedCoupon = useSelector((store) => store.cart.appliedCoupon);

  let products = cart.map((ele) => ({
    productId: ele.product._id,
    count: ele.count,
    size: ele.size,
    price: ele.product.sellingPrice,
  }));

  const handlePayment = async (e) => {
    e.preventDefault();

    if (phoneNumber.length === 10 && address) {
      let dataToSend = {
        products,
        coupon: appliedCoupon,
        address,
        phoneNumber,
      };
      try {

        const {data: {key}} = await axios.get("/order/getkey")
        const {data: {order, userOrderId}} = await axios.post("/order/checkout", dataToSend)

        const options = {
          key,
          amount: order.amount,
          currency: "INR",
          name: "Phonezone",
          description: "Delivering quality",
          image:
            "https://learnyst-user-assets.s3.ap-south-1.amazonaws.com/school-assets/schools/2410/schoolLogo/1657573685244Custom%20Size%20%E2%80%93%201.png",
          order_id: order.id,
          handler: function (response) {
            axios
              .post("/order/paymentverification", {
                ...response,
                userOrderId,
              })
              .then(({ data }) => SetPaymentRes(data))
              .catch((err) => console.log(err));
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: "9000090000",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // navigate to homepage if the cart is empty

  useEffect(() => {
    if (!cart.length) {
      navigate("/");
    }

    if (paymentRes?.success) {
      navigate("/user/orders");
      dispatch(emptyCart())
    }
  }, [paymentRes]);

  return (
    <div>
      <Container>
        {/* send the user to signed in page if not signed in */}
        {!user ? (
          <div className="flex items-center flex-col justify-center my-10 h-[5 0vh]">
            <p className="text-red-500">
              *You must sign in to proceed to checkout
            </p>
            <Link to="/login?checkout=true">
              <Button text="Sign in" bg="black" className="py-2 w-24 mx-auto" />
            </Link>
          </div>
        ) : (
          <div className="w-full max-w-xl px-3 mx-auto mt-10 mb-16">
            <label
              className="text-lg font-[500] mb-1 md:mb-2 inline-block"
              htmlFor="address"
            >
              Delivery Address
            </label>
            <textarea
              onChange={(e) => setAddress(e.target.value)}
              className="border w-full p-2"
              name="address"
              placeholder="Enter your complete address"
              id="address"
              cols="auto"
              rows="5"
            ></textarea>

            <label
              className="text-lg font-[500] inline-block my-1"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              className="block w-full border mb-5 p-1 rounded"
              placeholder="Enter your phone number"
            />

            <Button
              onClick={handlePayment}
              text="Payment"
              bg="black"
              className="py-2.5 mt-10 md:text-xl"
            />
          </div>
        )}
      </Container>
    </div>
  );
}

export default Checkout;
