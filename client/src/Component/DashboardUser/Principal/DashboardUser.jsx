import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getAddresses } from '../../../Redux/Actions/adresses';
import { Container } from '@mui/material';
import BasicTabs from '../Secondary/Tabs.jsx';
import { setUserInFrontState } from '../../../Redux/Actions/users';
import { add } from 'dom7';
import axios from 'axios';
import { URL } from '../../../Redux/Constants';


export default function DashboardUser() {
  const [token,setToken] =useState('')
  const [providerUser,setProviderUser] =useState([])
  const dispatch = useDispatch()
  
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
          axios.get(`${URL}/users/${user.uid}`).then(r => {
           
            return setProviderUser({
            ...user.providerData[0],
            uid:user.uid,
            phoneNumber:r.data.result.phoneNumber
          })}
          )
          setUserInFrontState(providerUser)
          
          
          
          
			  }
	  	});
     
      
  },[adress])
  console.log(providerUser)
 


    
  return (
    <Container sx={{paddingTop: '10rem'}} fixed={true}>
      <BasicTabs user={providerUser} addresses={addresses} token={token}/>
    </Container>
  )
}
