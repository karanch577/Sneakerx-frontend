import React from 'react'
import Container from './Container'

function ProductSimmer() {
  return (
    <div className='mt-12 md:mt-16 lg:mt-24'>
        <Container className={`px-4 sm:px-6 xl:px-2`}>
        <div className='lg:flex flex-row md:px-10 gap-[50px] lg:gap-[97px] lg:px-[4.5rem]'>
            <div className="left bg-[#F6F6F6] w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0 h-[54vh] lg:h-[70vw]"></div>
            <div className="right  flex-[1] mt-[30px] lg:mt-0 mb-6 py-3">
                <div className=' rounded-2xl bg-[#F6F6F6] w-[18rem] h-[3.5rem]'></div>
                <div className=' rounded-2xl bg-[#F6F6F6] my-2 w-[12rem] h-[2rem]'></div>
                <div className=' rounded-2xl bg-[#F6F6F6] w-[8rem] h-[1.5rem]'></div>
                
                <div className='flex flex-wrap mt-28 w-full justify-between'>
                {[...Array(12)].map((el, i) => <div className='w-[32%] h-[3.7rem] mt-2 rounded bg-[#f6f6f6]' key={i}></div>)}
                </div>
            </div>
        </div>
        
        </Container>
    </div>
  )
}

export default ProductSimmer