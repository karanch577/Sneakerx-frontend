import React, { useState } from "react";
import Container from "../components/Container";
import ProductDetailCarousel from "../components/ProductDetailCarousel";
import { useParams } from "react-router-dom";
import useFetchProduct from "../utils/useFetchProduct";
import Button from "../components/Button";

import { AiOutlineHeart } from "react-icons/ai"
import RelatedProducts from "../components/RelatedProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import ProductSimmer from "../components/ProductSimmer";

function Product() {
  const [sizeSelected, setSizeSelected] = useState(null)

  const { id } = useParams();
  const product = useFetchProduct(id);
  const dispatch = useDispatch()

  if(product === null) return <ProductSimmer />

  const discount = Math.floor(((product.price - product.sellingPrice) / product.price) * 100);

  const handleAddToCart = () => {
    if(sizeSelected) {
    dispatch(addToCart({
      product,
      size: sizeSelected,
      count: 1
    }))
  }
  }

  return (
    <div className="mt-12 md:mt-16 lg:mt-24">
      <Container className={`px-4 sm:px-6 xl:px-2`}>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[97px] lg:px-[4.5rem]">
          {/* left column start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            {product && <ProductDetailCarousel photos={product.photos} />}
          </div>
          {/* left column end */}

          {/* right column start */}
          <div className="flex-[1] py-3">
            {/* PRODUCT TITLE */}
            <h2 className="text-[26px] font-semibold mb-2 leading-tight">
              {product?.name}
            </h2>
            
            {/* priciing start */}
            <div className="pricing text-[16px] sm:text-[18px] flex flex-wrap items-center justify-between mt-4">
        <div className="flex gap-4">
          <p>MRP : ₹{product.sellingPrice}</p>
          {product.sellingPrice !== product.price && (
            <del className="text-gray-400">₹{product.price}</del>
          )}
        </div>
        {product.sellingPrice !== product.price && (
          <p className="text-green-500">{discount}% off</p>
        )}
        </div>

        <p className="text-md font-medium text-black/[0.5]">
          incl. of taxes
        </p>
        <p className="text-md font-medium text-black/[0.5] mb-20">
          (Also includes all applicable duties)
        </p>
        {/* pricing end */}

        {/* size start */}
        <div>
          <div className="flex justify-between">
            <p>Select Size</p>
            <p>Size Guide</p>
          </div>

          {/* size grid start */}
          <ul className="flex flex-wrap justify-between my-2">
          {product.sizes?.map(obj => <li key={obj._id} onClick={() => setSizeSelected(obj.size)} className={`border cursor-pointer rounded px-4 py-3  text-center md:text-lg w-[32%] mt-1.5 ${Number(obj.quantity) === 0 ? "cursor-not-allowed pointer-events-none bg-black/[0.1] opacity-50" : "hover:border-black"} ${sizeSelected === obj.size ? "border-black" : ""}`}>{obj.size}</li>)}
          </ul>

    

        </div>
        {/* size end */}
        <Button onClick={handleAddToCart} className="py-4" text="Add to Bag" bg="black"/>
        <Button className="py-4" text={`Fovourite`} bg="white" icon={<AiOutlineHeart />}/>

        {/* description start */}
        <p className="mt-12 mb-10">{product.description}</p>
        <ul className="list-disc ml-4">
          <li className="my-2">{`Colour Shown: ${product.colourShown}`}</li>
          <li>{`Style: ${product.style}`}</li>
        </ul>

        </div>
          {/* right column end */}

        </div>
        <div className="mb-12">
          <RelatedProducts categoryId={product.collectionId._id}/>
        </div>
      </Container>
    </div>
  );
}

export default Product;
