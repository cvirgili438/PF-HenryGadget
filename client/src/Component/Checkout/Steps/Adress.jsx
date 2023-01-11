import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react'
import { TextField,Box } from '@mui/material'
import { setButtonActive, setLocalAdress } from '../../../Redux/Actions/checkout';

import styles from "./Address.module.css";
import AddressBox from './AddressBox.jsx';

import { URL } from '../../../Redux/Constants';
import Total from '../../CartPage/Total';

export default function Adress() {                                                                                                           /* Inicializaremos el componente utilizado en el segundo step (Address) donde se seteara la direccion deseada para enviar la orden */
  const [address, setAddress] = useState([]);                                                                                                // Renderizaremos dos tipos diferentes de componentes, uno donde el usuario no tenga ninguna direccion guardada (le mostraremos un form) y el caso donde el usuario ya tiene direcciones guardadas, lo sabremos guardandonos las direcciones del usuario en este estado.
  const [inputt,setInputt] = React.useState({region:'',city:'',postalCode:'',street:'',name:'', type: 'shipping', principal: true});         // Estado para ir guardando la direccion escrita en el caso del form donde el usaurio no tiene direcciones anteriores
  const [idActive, setIdActive] = useState('');                                                                                              // Desde este componente renderizaremos algunas cartas(direcciones) y una de esas cartas sera la direccion principal, necesitaremos especificar y renderizar esa carta con una informaicon diferente. (Para luego mostrarla con un estilo distinto)

  const input = useRef({region:'',city:'',postalCode:'',street:'',name:'',type: 'shipping', principal: true});                               // Este input guardara la informacion del form la cual ya sera enviada a la store de redux para guardarla y luego poder hacer un post de esta a la DB
  
  const dispatch = useDispatch();
  
  const user = useSelector(state => state.user);                                                                                              // Nos traemos al usuario con sesion iniciada para luego preguntar su uid
  
  useEffect(() => {                                                                                                                           // Antes de renderizar el componente vamos a preguntar las direcciones del usuario con el uid, estas posibles direcciones seran guardadas en el estado local, dependiendo de si hay o no direcciones, mostraremos un tipo de componente o otro.
    axios(`${URL}/address?idUser=${user.uid}`)
         .then(res => {
            if(res.data.result.length === 0) return;

            setAddress([...address, ...res.data.result]);
         })
         .catch(err => console.log(err));

  }, []);

  useEffect(() => {                                                                                                                           // Con este useEffect iremos validando cada vez que modifican el form para saber si ya esta completo, si lo esta desbloquear el boton de "Next" sino... pues no                                                                                                                                                                                                                                   
    const inputValidate = input.current

    if(inputValidate.name === '' || inputValidate.city === '' || inputValidate.region === '' || inputValidate.postalCode === '' || inputValidate.street === ''  ){
      dispatch(setButtonActive(true));
      return
    }

    dispatch(setButtonActive(false));
  }, [inputt])
  
  function handleInput(event){                                                                  // Input para validar cada letra escrita en el form e irla agregando al estado para luego pasarla con un post a la db
    event.preventDefault();
    setInputt({...inputt,
      [event.target.id]:event.target.value
    })
    input.current = {...input.current,[event.target.id]:event.target.value}
    dispatch(setLocalAdress(input.current))    
  }  
  
  function setAsPrincipal(addressId){                                                           // En el caso que el usuario tenga direcciones, las direcciones no principales recibiran como metodo una funcion para poder convertirse en direcciones principales ( esta funcion sera utilizada cuando el usuario haga clic sobre la carta )
    axios.put(`${URL}/address/principal`, {idUser: user.uid, idAddress: addressId});
    setIdActive(addressId);
    dispatch(setButtonActive(false));
  }

  function setNotPrincipal(addressId){                                                          // En el caso que el usuario tenga direcciones, la direccion principal recibira como metodo una funcion para dejar de ser direccion principal ( esta funcion sera utilizada cuando el usuario haga clic sobre la carta )
    axios.put(`${URL}/address`, {idUser: user.uid, address: {principal: false}, idAddress: addressId});
    setIdActive('');
    dispatch(setButtonActive(true))
  }

  return(
    <div className={styles.divGlobal}>
      <div className={styles.divTitle}>
        {address.length === 0               
          ? <h3>Please add your shipping address</h3>
          : <h3>Select your shipping address</h3>
        }
      </div>
      <hr className={styles.hr1}/>
      <div className={styles.divContent}> 
        <div>
        {address.length === 0 
          ?
          <div className={styles.divInputAddress}>
            <Box
              component={'form'}        
              sx={{        
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                flexWrap: 'wrap',
                marginLeft: "200px",
                marginTop: "20px"
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
          </div> 
          : address.map(a => {
              if(a.type === 'shipping' && a.id === idActive){
                return <AddressBox
                key={a.id}
                id={a.id}
                name={a.name}
                street={a.street}
                city={a.city}
                postalCode={a.postalCode}
                region={a.region}
                type='address'
                principal={true}
                setFunction={setNotPrincipal}
              />
              }

              if(a.type === 'shipping'){
                return <AddressBox
                  key={a.id}
                  id={a.id}
                  name={a.name}
                  street={a.street}
                  city={a.city}
                  postalCode={a.postalCode}
                  region={a.region}
                  type='address'
                  principal={false}
                  setFunction={setAsPrincipal}
                />
              }
            })
        }
        {address.length !== 0 && <AddressBox type='add'/>}
        <div>
          <label className={styles.checkbox} for="myCheckboxId">
            <input onClick={() => {/* Future code */}} className={styles.checkbox__input} type="checkbox" name="myCheckboxName" id="myCheckboxId"/>
            <div className={styles.checkbox__box}></div>
            Yes, I want to use my shipping address as billing address.
          </label>
        </div>
        </div>
        <div className={styles.divTotal}>
          <Total/>
        </div>
      </div>
    </div>
  )
}
