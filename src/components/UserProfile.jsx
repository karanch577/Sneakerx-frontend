import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ChangePassword from './ChangePassword'
import { AiOutlineEdit } from "react-icons/ai"
import { MdDownloadDone } from "react-icons/md"
import { setUser } from '../redux/userSlice'
import axios from 'axios'

function UserProfile() {
  const [showEditName, setShowEditName] = useState(false)

  const [name, setName] = useState("")

  const {subpage2} = useParams()
  const user = useSelector(store => store.user.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  
  useEffect(() => {
    if(!user) {
        navigate("/")
    }
  }, [user]);

  // render the change password component

  if(subpage2 === "changePassword"){
    return(<ChangePassword />)
  }

  const handleNameChange = async (e) => {
    if(!name) {
      setShowEditName(false)
    }

    try {
      const { data } = await axios.patch("/user/profile/update", {
        property: "name",
        value: name
      })
      if(data.success) {
        dispatch(setUser(data.user))
        setShowEditName(false)
      }
    } catch (error) {
      console.log(error)
    }
    
  }

  
  return (
    <div className='p-3 text-lg md:w-9/12'>
        <div className='py-1'>
        Name:
          {showEditName ? <div className='flex justify-between items-center gap-8'>
            <input className='border w-full border-black' type="text" onChange={(e) => setName(e.target.value)} defaultValue={user?.name} placeholder="Enter the name" />
            <MdDownloadDone className='text-2xl cursor-pointer' onClick={handleNameChange}/>
          </div> 
          :
          <div className="flex justify-between items-center">{user?.name}<span onClick={() => setShowEditName(true)}><AiOutlineEdit className='text-2xl cursor-pointer' /></span></div>}
        </div>

        <div className='py-1 mb-4'>Email:
            <div className='w-full'>{user?.email}</div>
        </div>

        <Link className='bg-black text-white px-3 py-1 rounded' to="changePassword">Change password</Link>
    </div>
  )
}

export default UserProfile