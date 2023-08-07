import React from 'react'
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Container from './Container';

function Footer() {
  return (
    <div className='bg-black px-4 sm:px-6 xl:px-2 pt-6 md:pt-16'>
      <Container>
      <div className='flex flex-wrap'>
        <div className='text-white text-sm font-medium uppercase w-full md:w-[17%]'>
          <p><span className='cursor-pointer hover:text-white font-oswald inline-block my-1.5'>Find a store</span></p>
          <p><span className='cursor-pointer hover:text-white font-oswald inline-block my-1.5'>Become a partner</span></p>
          <p><span className='cursor-pointer hover:text-white font-oswald inline-block my-1.5'>Sign up for email</span></p>
          <p><span className='cursor-pointer hover:text-white font-oswald inline-block my-1.5'>Send us feedback</span></p>
          <p><span className='cursor-pointer hover:text-white font-oswald inline-block my-1.5'>Student discount</span></p>
        </div>

        <div className='text-sm w-[10rem] mt-6 md:mt-0 md:w-[17%]'>
          <p className='uppercase text-white'><span className='cursor-pointer font-oswald inline-block my-1.5'>Get help</span></p>
          <p className='text-white/50 '><span className='cursor-pointer hover:text-white inline-block my-1.5'>Order Status</span></p>
          <p className='text-white/50 '><span className='cursor-pointer hover:text-white inline-block my-1.5'>Delivery</span></p>
          <p className='text-white/50 '><span className='cursor-pointer hover:text-white inline-block my-1.5'>Returns</span></p>
          <p className='text-white/50 '><span className='cursor-pointer hover:text-white inline-block my-1.5'>payment Options</span></p>
          <p className='text-white/50 '><span className='cursor-pointer hover:text-white inline-block my-1.5'>Contact Us</span></p>
        </div>

        <div className='text-sm mt-6 md:mt-0 w-[35%] md:w-[17%]'>
          <p><span className='uppercase text-white cursor-pointer font-oswald inline-block my-1.5'>About Nike</span></p>
          <p className=' text-white/50 '><span className='cursor-pointer hover:text-white inline-block my-1.5'>News</span></p>
          <p className=' text-white/50 '><span className='cursor-pointer hover:text-white inline-block my-1.5'>Careers</span></p>
          <p className=' text-white/50 '><span className='cursor-pointer hover:text-white inline-block my-1.5'>Investors</span></p>
          <p className=' text-white/50 '><span className='cursor-pointer hover:text-white inline-block my-1.5'>Sustainibility</span></p>
        </div>

        {/* icon start */}
        <div className='flex gap-4 w-full md:w-[49%] md:items-start justify-center md:justify-end mt-2 md:mt-0'>
          <div className="facebook bg-white/50 hover:bg-white rounded-full p-1.5 cursor-pointer">
            <FaFacebookF className='text-lg'/>
          </div>
          <div className="twitter bg-white/50 hover:bg-white rounded-full p-1.5 cursor-pointer">
            <FaTwitter className='text-lg'/>
          </div>
          <div className="youtube bg-white/50 hover:bg-white rounded-full p-1.5 cursor-pointer">
            <FaYoutube className='text-lg'/>
          </div>
          <div className="instagram bg-white/50 hover:bg-white rounded-full p-1.5 cursor-pointer">
            <FaInstagram className='text-lg'/>
          </div>
        </div>
        {/* icon end */}
      </div>

      {/* copyright start */}
      <div className="copyright text-[12px] sm:text-sm pb-4 pt-4 md:pt-8 sm:flex justify-between">
        <p className='text-white/50  text-center'>© 2023 Nike, Inc. All Rights Reserved</p>
        <div className="right flex items-center justify-center gap-3">
          <p className='text-white/50 hover:text-white cursor-pointer'>Guides</p>
          <p className='text-white/50 hover:text-white cursor-pointer'>Terms of Sale</p>
          <p className='text-white/50 hover:text-white cursor-pointer'>Terms of Use</p>
          <p className='text-white/50 hover:text-white cursor-pointer'>privacy policy</p>
        </div>
      </div>
      {/* copywrite end */}
      </Container>
    </div>
  )
}

export default Footer