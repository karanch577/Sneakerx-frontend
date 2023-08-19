import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { FcGoogle } from "react-icons/fc"
import { BsApple } from "react-icons/bs"
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'
import axios from 'axios'


export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();

  // Access the value of the 'checkout' query parameter
  const checkout = searchParams.get('checkout');

  const onSubmit = async (inputFields) => {
    try {
      const res = await axios.post(`/user/signin`, inputFields)

      const data = res.data

      // save the user in the store
      if(data.success) {
        dispatch(setUser(data.user))
        if(checkout) {
          navigate("/checkout")
        }else {
          navigate("/")
        }
      }
    } catch (error) {
      if(error.response && error.response.status === 400){
        setError("authError", {message: "Email and password doesn't match"})
      }
      console.log(error)
    }
  }
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
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
            {errors.authError && <p className='text-[13px] mb-2 text-red-500'>{errors.authError.message}</p>}
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
                    onChange={() => clearErrors("authError")}
                   />
                   {errors.email && <p className='text-red-500 text-[13px]'>Enter a valid email</p>}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                  <Link to="/forgotPassword" className="text-sm font-semibold text-black hover:underline">
                    {' '}
                    Forgot password?{' '}
                  </Link>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:border-black disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id='password'
                    {...register("password", { required: true, minLength: 6 })}
                    onChange={() => clearErrors("authError")}
                   />
                   {errors.password && <p className='text-red-500 text-[13px]'>Password must be at least 6 character long</p>}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Get started <AiOutlineArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
          {/* <div className="mt-3 space-y-3">
            <button
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            >
              <span className="mr-2 inline-block">
              <FcGoogle className='text-[17px]' />
              </span>
              Sign in with Google
            </button>
            
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default Login;