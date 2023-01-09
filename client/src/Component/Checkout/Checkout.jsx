import React, { useState, useEffect,useRef } from "react";
import {  Button, Modal } from "@mui/material";
import Steppers from './Stepper.jsx'
import Adress from "./Steps/Adress.jsx";
import Payment from "./Steps/Payment.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../../Redux/Actions/checkout";
import  CartPage from '../CartPage/CartPage.jsx'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import ModalUser from "../ModalRegister/Modal.jsx";
import axios from "axios";

import { URL } from "../../Redux/Constants/index.js";


export default function Checkout() {
  const [active,setActive]=useState(0)
  const [token,setToken]= useState('')
  const [modalShow, setModalShow] = useState(false);
  const [addressUser, setAddressUser] = useState([])

  const user = useSelector(state => state.user)
  const address = useSelector(state=>state.adress)
  
  const dispatch = useDispatch()
  const auth = getAuth()


  useEffect(() => {
    axios(`${URL}/address?idUser=${user.uid}`)
         .then(res => {
            if(res.data.result.length === 0) return;

            setAddressUser([...addressUser, ...res.data.result]);
         })
         .catch(err => console.log(err))
  }, [active]);

  useEffect(()=>{
    setActive(active)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((result) => {
          setToken(result);
        });
      }
    }); 
  },[user && user.uid]);

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

    if(active === 1 && addressUser.length === 0){
      axios.post(`${URL}/address`, {idUser: user.uid, address})
           .then(res => console.log(res))
           .catch(err => console.log(err))

      axios.post(`${URL}/address`, {idUser: user.uid, address:{...address, type: 'billing'}})
           .then(res => setActive(active + 1))
           .catch(err => console.log(err))

      return;
    }

    if(active === 1 && addressUser.length > 0){
      return setActive(active + 1)
    }

    return setActive(active + 1)
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