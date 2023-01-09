import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getAddresses } from '../../../Redux/Actions/adresses';
import { Container } from '@mui/material';
import BasicTabs from '../Secondary/Tabs.jsx';
import { add } from 'dom7';


export default function DashboardUser() {
  const [token,setToken] =useState('')
  let [providerUser,setProviderUser] =useState([])
  const dispatch = useDispatch()
  const user = useSelector(state =>state.user)
  const addresses = useSelector(state => state.addresses)
  const auth = getAuth()

  
  const adress = useSelector(state => state.adress)
 

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
			  if (user) {
				  user.getIdToken().then((result) => {
            dispatch(getAddresses({idUser:user.uid,token:result}))
				  	setToken(result);
            
			  	});
          setProviderUser(user.providerData)
			  }
	  	});
     
      
  },[adress])
  console.log(providerUser)
 


    
  return (
    <Container sx={{paddingTop: '10rem'}} fixed={true}>
      <BasicTabs user={providerUser[0]} addresses={addresses} token={token}/>
    </Container>
  )
}
