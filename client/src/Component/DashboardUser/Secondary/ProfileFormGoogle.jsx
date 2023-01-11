import React from 'react';
import { TextField, Button, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { putProfileUser } from '../../../Redux/Actions/users';
import { getAuth, onAuthStateChanged,  } from 'firebase/auth';
import styles from './addressForm/AddressForm.module.css'
import UploadImage from './UploadImageGoogle';
import UploadImageGoogle from './UploadImageGoogle';



export default function ProfileFormGoogle(props) {
   
    
  return (
   <div className={styles.divCenter}>        
      <UploadImageGoogle
      currentPhoto={props.user.photoURL ? props.user.photoURL : ''}
      google={true} 
      disabled={props.disabled}
      phoneNumber={props.user.phoneNumber}
       idUser={props.user.uid} />
     
    </div>
  )
}
