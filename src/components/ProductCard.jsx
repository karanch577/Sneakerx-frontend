import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const {name, price, sellingPrice, photos} = product

  // calculating the discount
  const discount = Math.floor(((price - sellingPrice) / price) * 100);

  const scrollToTop = () => {
    // setting the behaviour to smooth - when clicked on the related products - else normal
      window.scrollTo({
        top: 0,
        behavior: window.location.pathname.includes("/product") ? "smooth" : "instant"
      })
  }

  return (
    <Link to={`/product/${product._id}`} onClick={scrollToTop} className="w-[49%] md:w-[32%] mt-4">
      {/* simmer ui */}
      {!product && <div className="w-full h-[300px]"></div>}
      <div className="img aspect-square">
        <img className="object-cover w-full h-full" src={photos[0].secure_url} alt={name} />
      </div>
      <p className="text-[14px] sm:text-[18px] font-[600] mt-4 mx-4">{name}</p>
      <div className="pricing text-[14px] sm:text-[18px] flex flex-wrap items-center justify-between mx-4">
        <div className="flex gap-4">
          <p>₹{sellingPrice}</p>
          {sellingPrice !== price && (
            <del className="text-gray-400">₹{price}</del>
          )}
        </div>
        {sellingPrice !== price && (
          <p className="text-green-500">{discount}% off</p>
        )}
      </div>
    </Link>
  );
}

export default ProductCard;
