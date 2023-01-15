/* :3 */

import React from 'react';
import axios from 'axios';
import { TextField,Box } from '@mui/material'
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setButtonActive } from '../../../Redux/Actions/checkout';
import styles from "./AddressBox.module.css";
import {MdLocationOn} from "react-icons/md";
import {BsCheckCircle} from "react-icons/bs";
import {IoAddCircleOutline} from "react-icons/io5";
import { URL } from '../../../Redux/Constants';

export default function AddressBox({name,token, street, region, city, postalCode, type, id, setFunction, principal}) {                        /* Inicializamos componente para cada address individual (cajita to show) */

  const [formActive, setFormActive] = useState(true);                                                                                   // Estado el cual nos servira para mostrar o no un form para la carta de " Add a different address"
  const [addressSettled, setAddressSettled] = useState(false)                                                                           // Estado local el cual nos hara saber si una vez utilizado el form la direccion propuesta se agerego correctamente como principal
  const [inputt,setInputt] = React.useState({region:'',city:'',postalCode:'',street:'',name:'', type: 'shipping', principal: true});    // Estado para controlar el form de la carta " Add a new address"
  
  const input = useRef({region:'',city:'',postalCode:'',street:'',name:'',type: 'shipping', principal: true});                          // Referencia para luego ser pasada al estado de redux y finalmente hacer un post a la DB con esa misma informacion (ya no se usa xd - solo para mostrar error class)

  const dispatch = useDispatch();

  const user = useSelector(state => state.user);                                                                                        // Nos traemos al usuario que inicio sesion para luego utilizar su uid y linkear las direccioness propuestas
  

  function handleInput(event){                                                                                                          // Funcion para ir manejando el form e ir actualziando el estado cadavez vez el usuario agrege un nuevo caracter
    event.preventDefault();
    setInputt({...inputt,
      [event.target.id]:event.target.value
    })  
  }  

  function setAddressAsPrincipal(){                                                                                                    // Esta funcion es para la carta " Add na new address " y cuya funcion que sera utilizada cuando querramos hacer el post de la direccion guardada en el estado local, la direccion tambien sera seteada como principal una vez se haya agregado
   // axios.post(`${URL}/address`, {idUser: user.uid, address: inputt})      
      axios({
        url:`${URL}/address`,
        method: 'post',
        data:{idUser: user.uid, address: inputt},
        headers: {"Authorization":"Bearer " + token}
      })                 // Creamos la nueva direccion pasando como valores el estado local
      .then(res => {
        const idAddress = res.data.result.id;

       // axios.put(`${URL}/address/principal`, {idUser: user.uid, idAddress: idAddress})  
        axios({
          url:`${URL}/address/principal`,
        method: 'put',
        data:{idUser: user.uid, idAddress: idAddress},
        headers: {"Authorization":"Bearer " + token}
        })   // Seteamos la direccion creada anteriormente como principal 
             .then(res => {setAddressSettled(true); dispatch(setButtonActive(false));})
             .catch(err => console.log(err));
      })
      .catch(err => console.log(err))

    axios({
      url:`${URL}/address`,
       data:{idUser: user.uid, address:{...inputt, type: 'billing'}},
       method: 'post',
       headers: {"Authorization":"Bearer " + token}
      })  // Seteamos la misma direccion como billing address (ya que no hay facturacion aun, no hay mucha logica relacionada este tipo de address)
      .then(res => {})
      .catch(err => console.log(err))

      return;
  }


  if(type === 'add'){                                                                        // Componente padre nos hara saber que tipo de AddressBox quiere crear, si es un "add" se generara esa carta " Add new address "
    return(
      <div>
        <div onClick={() => setFormActive(!formActive)} className={styles.divGlobal}>
          <div>
            {addressSettled
              ? <BsCheckCircle className={styles.icon}/>
              : <IoAddCircleOutline className={styles.icon}/>
            }
          </div>
          <div className={styles.divContent}>
            <div className={styles.divBody}>
              <span>Add a different address</span>
            </div>
          </div>
        </div>

        <div>
          <div className={formActive ? styles.divHidden : styles.divInputAddress}>
              <Box
                component={'form'}        
                sx={{        
                  display:'flex',
                  flexDirection:'column',
                  alignItems:'center',
                  flexWrap: 'wrap',
                  width: "80%",
                  marginTop: "20px",
                  marginLeft: "60px"
                }}
              >
                <TextField
                  error={input.current.name === '' ? true : false}
                  required
                  fullWidth
                  id="name"
                  label="Home or Work"  
                  variant="standard"
                  onChange={e => handleInput(e)}                   
                />
                <TextField
                  error={input.current.region === '' ? true : false}
                  required
                  fullWidth
                  id="street"
                  label="Street"          
                  variant="standard"
                  onChange={e => handleInput(e)}                   
                />
                <TextField
                  error={input.current.city === '' ? true : false}
                  required
                  fullWidth
                  id="city"
                  label="City"          
                  variant="standard"
                  onChange={e => handleInput(e)}                   
                />
                <TextField
                  error={input.current.postalCode === '' ? true : false}
                  required
                  fullWidth
                  id="postalCode"
                  label="Postal Code"          
                  variant="standard"
                  onChange={e => handleInput(e)}                   
                />
                <TextField
                  error={input.current.street === '' ? true : false}
                  required
                  fullWidth
                  id="region"
                  label="Country"          
                  variant='standard'
                  onChange={e => handleInput(e)}                   
                />
              </Box>
              <button disabled={addressSettled} onClick={() => setAddressAsPrincipal()} className={styles.addButton}>{addressSettled ? 'Address succesfully added' : 'Use as shipping address'}</button>
            </div> 
          </div>
        </div>
    )
  }
  if(type === 'address') {                                                                                                      // Mientras que el otro tipo de addressBox que se pueden generar sera ya la direccion en si mostrando sus propiedades recibidas desde componente padre
    return (
      <div onClick={() => {setFunction(id)}} className={principal ? styles.divGlobalActive : styles.divGlobal}>
        <div>
          <MdLocationOn className={styles.icon}/>
        </div>
        <div className={styles.divContent}>
          <div className={styles.divName}>
            <h4 className={styles.name}>{name}</h4>
          </div>
          <div className={styles.divBody}>
            <span>{street}</span>
            <span>{city}</span>
            <span>{postalCode}</span>
            <span>{region}</span>
          </div>
        </div>
      </div>
    )
  }
}
