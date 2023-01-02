import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom';
import { setOrder } from '../../Redux/Actions/order';

import { sendAutomatickEmail } from '../../Utils/SendAutomaticEmail/automaticEmail.js';
import {
  SUBJECT_PAYMENT,
  TEXT_PAYMENT
} from '../../Utils/SendAutomaticEmail/constantsAutomaticEmail';

export default function Payment() {
    const dispatch =useDispatch();
    const user = useSelector(state =>state.user)
    const history = useHistory()
    const {search} = useLocation()
    const query = new URLSearchParams(search);
    let payment = query.get('redirect_status')

    useEffect(()=>{
        if(payment === 'succeeded'){
            dispatch(setOrder(user.uid))
            sendAutomatickEmail(user && user.uid, SUBJECT_PAYMENT, TEXT_PAYMENT);
            setTimeout(()=>{history.push('/')},3000)
        }
    },[])

  return (
    <div >
        <h1 style={{padding: '7rem'}}>{ payment === 'succeeded' ? `Your payment was ${payment} you are going to be redirected to the main page`: ` You having problems with your paid,${payment}`}</h1>
    </div>
  )
}
