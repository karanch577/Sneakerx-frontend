import React from 'react'
import { Link } from 'react-router-dom';

function CategoryCard({ category }) {

  // in the public directory, we have static images for the category card as category.webp

  // in the backend the category name is saved as category sneakers
  // so we have to get the first name from the category name

  const imgName = category.name.split(" ")[0]

  return (
    <Link to={`/category/${category._id}`} className='relative'>
      <div className="img min-w-[9rem] md:w-full">
        <img className='w-full' src={`./${imgName}.webp`} alt="category" />
      </div>
      <button className='absolute bottom-6 left-6 bg-white rounded-3xl px-3 md:px-4 py-1 md:py-1.5 text-[12px] md:text-[16px] font-[500]'>{imgName}</button>
    </Link>
  )
}

export default CategoryCard;