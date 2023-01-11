import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom';
import { setOrder } from '../../Redux/Actions/order';
import { sendAutomatickEmail } from '../../Utils/SendAutomaticEmail/automaticEmail.js';
import { SUBJECT_PAYMENT, TEXT_PAYMENT } from './constants/automaticEmail.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Payment() {
    const dispatch =useDispatch();
    const user = useSelector(state =>state.user)
    const history = useHistory()
    const {search} = useLocation()
    const query = new URLSearchParams(search);
    let payment = query.get('redirect_status')
    const auth = getAuth();

    useEffect(()=>{
        if(payment === 'succeeded'){
            dispatch(setOrder(user.uid))
            onAuthStateChanged(auth, (user) => { // Se obtiene el token y se envía el mail.
              if (user)
                user.getIdToken().then((token) => sendAutomatickEmail(user.uid, SUBJECT_PAYMENT, TEXT_PAYMENT, token));
            });
            setTimeout(()=>{history.push('/')},3000)
        }
    },[])

  return (
    <div >
        <h1 style={{padding: '7rem'}}>{ payment === 'succeeded' ? `Your payment was ${payment} you are going to be redirected to the main page`: ` You having problems with your paid,${payment}`}</h1>
    </div>
  )
}
