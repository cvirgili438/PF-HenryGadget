import React from 'react';
import styles from './addressForm/AddressForm.module.css'
import UploadImageGoogle from './UploadImageGoogle';

////// desechable 

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
