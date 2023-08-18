import React from 'react'
import { Link } from 'react-router-dom';

function SearchResultProduct({product}) {
    const discount = Math.floor(((product.price - product.sellingPrice) / product.price) * 100);

  return (
    <Link to={`/product/${product._id}`} className='flex gap-7 border-b-2 py-4 max-w-4xl mx-auto'>
        <div className="left">
        <img
          className="w-40 aspect-square"
          src={product.photos[0].secure_url}
          alt="item"
        />
        </div>
        <div className="right w-full">
          <h3 className='font-[600] mb-1'>{product.name}</h3>
        <p className="opacity-50">{product.collectionId.name}</p>
        <p className="my-1 opacity-50">{product.colourShown}</p>
        <div className="pricing font-[600] flex flex-wrap items-center justify-between">
        <div className="flex gap-4">
          <p>₹{product.sellingPrice}</p>
          {product.sellingPrice !== product.price && (
            <del className="text-gray-400">₹{product.price}</del>
          )}
        </div>
        {product.sellingPrice !== product.price && (
          <p className="text-green-500">{discount}% off</p>
        )}
      </div>
        </div>
    </Link>
  )
}

export default SearchResultProduct