import axios from "axios";

import Steppers from './Stepper.jsx'
import Adress from "./Steps/Adress.jsx";
import Payment from "./Steps/Payment.jsx"
import  CartPage from '../CartPage/CartPage.jsx'
;
import {  Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

import { getAuth, onAuthStateChanged } from 'firebase/auth'
import ModalUser from "../ModalRegister/Modal.jsx";

import { URL } from "../../Redux/Constants/index.js";


export default function Checkout() {
  const [active,setActive]=useState(0)
  const [token,setToken]= useState('')
  const [modalShow, setModalShow] = useState(false);
  const [addressUser, setAddressUser] = useState([])

  const user = useSelector(state => state.user)
  const address = useSelector(state=>state.adress)
  const buttonIsDisabled = useSelector(state => state.buttonAddress)
  
  const auth = getAuth()


  
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

  useEffect(() => {
    if(user && user.uid){
      axios({
        url:`${URL}/address?idUser=${user.uid}`,
        method:'get',
        headers: {"Authorization":"Bearer " + token}
      })
         .then(res => {
            if(res.data.result.length === 0) return;

            setAddressUser([...addressUser, ...res.data.result]);
         })
         .catch(err => console.log(err))
    }
    
  }, [active]);


  function verification (num){
    switch(num){
      case 0:
        return (<CartPage />);
      case 1 :
        
        return (<Adress token={token} />);     
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
      axios({url:`${URL}/address`,
        data:{idUser: user.uid, address},
        method:'post',
        headers: {"Authorization":"Bearer " + token}  
      })
           .then(res => console.log(res))
           .catch(err => console.log(err))

      axios({url:`${URL}/address`,
        data:{idUser: user.uid, address:{...address, type: 'billing'}},
        method:'post',
        headers: {"Authorization":"Bearer " + token}
      })
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
        variant="contained" 
        sx={{
          backgroundColor: 'black',
          color:'white'
        }} 
        disabled={active === 0 ? true : false} 
      >
        Back
      </Button>
      <Button 
        id="stepper-button"
        onClick={e =>handleButton(e)}
        variant="contained" 
        sx={{
          backgroundColor: 'black',
          color:'white',
        }} 
        disabled={(buttonIsDisabled && active > 0) || active > 1}>

        {active > 1 ? 'Finish' : 'Next'}

      </Button>
    </div>
  );
}