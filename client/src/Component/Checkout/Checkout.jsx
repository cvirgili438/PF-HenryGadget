import React, { useState, useEffect,useRef } from "react";
import {  Button, Modal } from "@mui/material";
import Steppers from './Stepper.jsx'
import Adress from "./Steps/Adress.jsx";
import Payment from "./Steps/Payment.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../../Redux/Actions/checkout";
import  CartPage from '../CartPage/CartPage.jsx'
import ModalRegister from '../ModalRegister/ModalRegister.jsx'
import ModalUser from "../ModalRegister/Modal.jsx";

export default function Checkout() {
  const [active,setActive]=useState(0)
  const user = useSelector(state => state.user)
  const address = useSelector(state=>state.adress)
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch()
  useEffect(()=>{
    setActive(active)
  },[user && user.uid])
  function verification (num){
    switch(num){
      case 0:
        return (<CartPage />);
      case 1 :
        return (<Adress />);     
      case 2 :
        return (<Payment />)
    }
  }
  function handleButton (e){
    e.preventDefault();
    if(active === 0 && !user){
      setActive(active)
     return setModalShow(true)
    }
    if(active === 0 && user){
      return setActive(active+1)
    }
    if(active === 1 ){
      dispatch(setAddress({idUser:user.uid,address:address}))
      return setActive(active+1)
    }
    return setActive(active+1)
    
  }

  return (
    <div >
      <Steppers  active={active}/>
      {verification(active)}
       <ModalUser 
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
      <Button  
       onClick={e =>setActive(active -1)}
       variant="contained" sx={{
         backgroundColor: 'black',
         color:'white'
       }} disabled={active === 0 ? true : false} 
      >
        Back
      </Button>
      <Button id="stepper-button"
      onClick={e =>handleButton(e)}
      variant="contained" sx={{
        backgroundColor: 'black',
        color:'white'
      }} disabled={active > 1 ? true : false} >{active > 1 ? 'Finish' : 'Next'}</Button>
    
    </div>
  );
}