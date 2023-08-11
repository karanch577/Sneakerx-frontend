import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import useFetchList from '../utils/useFetchList';
import ProductCard from './ProductCard'

function RelatedProducts({ categoryId }) {
    let products;
    if(categoryId){
        products = useFetchList(`category/products/${categoryId}`).products;

    }
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1023, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 767, min: 0 },
            items: 1,
        },
    };

    if(products?.length === 0) {
        return <div>simmer ui</div>
    }

  return (
    <div className="mt-[50px] md:mt-[100px] mb-[100px] md:mb-0">
    <div className="text-2xl font-bold mb-5">You Might Also Like</div>
    {products?.length > 0 &&
    <Carousel
        responsive={responsive}
        containerClass="-mx-[10px]"
        itemClass="px-[10px]"
    >
        {products?.map((product) => (
            <ProductCard key={product?._id} product={product} />
        ))}
    </Carousel>
}
</div>
  )
}

export default RelatedProducts