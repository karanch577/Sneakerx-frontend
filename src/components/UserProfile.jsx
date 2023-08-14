import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function UserProfile() {
  const user = useSelector(store => store.user.user)
  

  
  return (
    <div className='p-3'>
        <div className='py-1'>Name: {user?.name}</div>
        <div className='py-1'>Email: {user?.email}</div>
    </div>
  )
}

export default UserProfile