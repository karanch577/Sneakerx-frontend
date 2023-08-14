import React from 'react'
import useFetchProduct from "../utils/useFetchProduct"

function OrderedProduct({product}) {
    console.log(product)
    const productDetail = useFetchProduct(product.productId)
    console.log(productDetail)
  return (
    <div className='flex gap-5 my-4'>
        <div className="left w-2/12 aspect-square">
            <img className='w-40 aspect-square' src={productDetail?.photos[0].secure_url} alt="product" />
        </div>

        <div className="right">
        <h3>{productDetail?.name}</h3>
          <h3>₹{productDetail?.sellingPrice}</h3>
        <p className="opacity-50">{productDetail?.collectionId?.name}</p>
        <p className="my-1 opacity-50">{productDetail?.colourShown}</p>
        <div className='flex gap-6'>
            <p>Size: {product?.size}</p>
            <p>Quantity: {product?.count}</p>
        </div>
        </div>
    </div>
  )
}

export default OrderedProduct