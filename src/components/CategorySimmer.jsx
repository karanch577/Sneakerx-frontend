import React from 'react'

function CategorySimmer() {
  return (
    <>
    <div className='w-32 h-7 rounded my-5 bg-[#F6F6F6]'></div>
    <div className='flex flex-wrap justify-between mb-10'>
        {[...Array(9)].map((el, i) => <div className="w-[49%] md:w-[32%] bg-[#F6F6F6] h-[200px] min-[500px]:h-[250px] sm:h-[350px] mt-4" key={i}></div>)}
    </div>
    </>
  )
}

export default CategorySimmer