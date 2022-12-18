import React, { useEffect, useState } from 'react'
import styles from '../Checkout.module.css'
import suma from '../controllers/controller.js'
import { getAllCart } from '../../../Utils/cart/cartCrud'
import { useRef } from 'react'
import { useSelector } from 'react-redux'

export default  function Purchase() {
    const user = useSelector(state=>state.user)
    const total = useRef(0)
   useEffect(async()=>{
    const items = await getAllCart()
     total.current = suma(items)  
   },[])
   
  return (
    <div>
      <h3>in this moment, you will start a purchase by a amounth of{total.current}</h3>
      
    </div>
  )
}
