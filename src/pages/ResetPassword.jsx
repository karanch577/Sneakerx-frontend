import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';


function ResetPassword() {
    const { resetToken } = useParams()
    const [successMessage, setSuccessMessage] = useState("")
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors
      } = useForm()
      const navigate = useNavigate()
      const dispatch = useDispatch()

      const onSubmit = async (input) => {
        console.log(input)
        setSuccessMessage("")
        // check if password and confirmPassword are same or not

        if(input.password === input.confirmPassword) {
            console.log("network call")
        try {
            const { data } = await axios.post(`/user/resetPassword/${resetToken}`, input)
            if(data.success) {
                setSuccessMessage("Password successfully changed. Redirecting to home page")
                dispatch(setUser(data.user))
                setTimeout(() => {
                    navigate("/")
                }, 3000)
            }
        } catch (error) {
            if(error.response && error.response.status === 404){
                setError("error", {message: "User is not registered"})
              }
              console.log(error)
        }
    } else {
        setError("error", {message: "Password and Confirm Password are not same"})
    }
      }
  return (
    <section>
    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Enter your new Password details
        </h2>
       
        <form className="mt-7" onSubmit={handleSubmit(onSubmit)}>
          {errors.error && <p className='text-[13px] mb-2 text-red-500'>{errors.error.message}</p>}

          { successMessage && <p className='text-green-500'>{successMessage}</p>}
          <div className="space-y-5">
            <div>
              <label htmlFor="password" className="text-base font-medium text-gray-900">
                {' '}
                Password{' '}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:border-black disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="password"
                  id='password'
                  {...register("password", { required: true, minLength: 6})}
                 />
                 {errors.password && <p className='text-red-500 text-[13px]'>Password must be atleast 6 character long</p>}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-base font-medium text-gray-900">
                {' '}
                Confirm Password{' '}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:border-black disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="Confirm Password"
                  id='confirmPassword'
                  {...register("confirmPassword", { required: true, minLength: 6 })}
                 />
                 {errors.confirmPassword && <p className='text-red-500 text-[13px]'></p>}
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
              >
                Reset Password <AiOutlineArrowRight className="ml-2" size={16} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
  )
}

export default ResetPassword