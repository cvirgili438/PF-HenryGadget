import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useState } from 'react'
import {useSelector} from 'react-redux'

export default function DashboardUser() {

  const [token,setToken]=useState('')
  const user = useSelector(state=>state.user)
  const auth = getAuth()

  useEffect(() => {
    window.scrollTo(0, 0);
    onAuthStateChanged(auth, (user) => {
  if (user) {
    user.getIdToken().then((result) => {
      setToken(result);
    });
  }
});   
}, [])


    
  return (
    <div>DashboardUser</div>
  )
}
