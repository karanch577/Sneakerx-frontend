import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function ProductDetailCarousel({photos}) {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
    <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
    >
        {photos?.map((img) => (
            <img
                key={img._id}
                src={img.secure_url}
                alt={img.secure_url}
            />
        ))}
    </Carousel>
</div>
  )
}

export default ProductDetailCarousel