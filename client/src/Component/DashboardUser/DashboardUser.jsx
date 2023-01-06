import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getAddresses } from '../../Redux/Actions/adresses';


export default function DashboardUser() {
  const [token,setToken] =useState('')
  const dispatch = useDispatch()
  const user = useSelector(state =>state.user)
  const addresses = useSelector(state => state.addresses)
  const auth = getAuth()


  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
			  if (user) {
				  user.getIdToken().then((result) => {
				  	setToken(result);
			  	});
			  }
	  	});
      dispatch(getAddresses({idUser:user.uid,token:token}))
  },[])
 


    
  return (
    <div>DashboardUser</div>
  )
}
