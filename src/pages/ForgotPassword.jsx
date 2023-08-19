import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai'
import axios from 'axios';


function ForgotPassword() {
    const [successMessage, setSuccessMessage] = useState("")
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors
      } = useForm()

      const onSubmit = async (input) => {
        setSuccessMessage("")
        try {
            const { data } = await axios.post("/user/forgotPassword", input)
            if(data.success) {
                setSuccessMessage("Reset link has been sent to your email")
            }
        } catch (error) {
            if(error.response && error.response.status === 404){
                setError("error", {message: "User is not registered"})
              }
              console.log(error)
        }
      }
  return (
    <section>
    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Enter your Registered Email address
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 ">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            title=""
            className="font-semibold text-black transition-all duration-200 hover:underline"
          >
            Create a free account
          </Link>
        </p>
        <form className="mt-7" onSubmit={handleSubmit(onSubmit)}>
          {errors.error && <p className='text-[13px] mb-2 text-red-500'>{errors.error.message}</p>}

          { successMessage && <p>{successMessage}</p>}
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="text-base font-medium text-gray-900">
                {' '}
                Email address{' '}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:border-black disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Email"
                  id='email'
                  {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                  onChange={() => clearErrors("error")}
                 />
                 {errors.email && <p className='text-red-500 text-[13px]'>Enter a valid email</p>}
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
              >
                Get link <AiOutlineArrowRight className="ml-2" size={16} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
  )
}

export default ForgotPassword