import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios'


export function ChangePaasword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm()

  const navigate = useNavigate()

  const onSubmit = async (inputFields) => {
    try {
      const res = await axios.post(`/user/changePassword`, inputFields)

      const data = res.data

      // save the user in the store
      if(data.success) {
        navigate("/user/profile")
      }
    } catch (error) {
      if(error.response && error.response.status === 400){
        setError("authError", {message: "Password and Confirm Password doesn't match"})
      }
      console.log(error)
    }
  }
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          
          <form className="mt-7" onSubmit={handleSubmit(onSubmit)}>
            {errors.authError && <p className='text-[13px] mb-2 text-red-500'>{errors.authError.message}</p>}
            <div className="space-y-5">
             
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                  
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
                <div className="flex items-center justify-between">
                  <label htmlFor="confirmPassword" className="text-base font-medium text-gray-900">
                    {' '}
                    Confirm Password{' '}
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:border-black disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Confirm Password"
                    id='confirmPassword'
                    {...register("confirmPassword", { required: true, minLength: 6 })}
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
                  Change Password <AiOutlineArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
         
        </div>
      </div>
    </section>
  )
}

export default ChangePaasword;