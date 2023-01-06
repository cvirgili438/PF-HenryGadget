import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { Container, Typography } from '@mui/material';
import AddressForm from './addressForm/AddressForm.jsx';
import Switch from '@mui/material/Switch';


const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));

function Addresses(props) {
const [edit,setEdit] =useState(false)

const user = useSelector(state => state.user)
const dispatch = useDispatch();
const token = props.token
const handleChange = (event) => {
    setEdit(event.target.checked);
  };

    return (
    <Container fixed>
        {/* {edit === false ? ( 
        <Root>        
            <Divider><Chip label={props.name} /></Divider>
            {props.region}
        </Root>):
        (
            <AddressForm id={props.id} token={props.token}/>
        )
        
        } */}
         <Root>        
            <Divider><Chip label={props.name} /></Divider>
                <Container sx={{
                    display:'flex',
                    direction:'row',
                    alignItems:'center',
                    justifyContent:'right'
                    
                }}>
                <Typography >Edit</Typography>
                <Switch
                     checked={edit}
                     onChange={handleChange}
                     inputProps={{ 'aria-label': 'controlled' }}
                />
                </Container>
            {edit === false ? (
                <Container fixed>
                {props.region}
                </Container>
            ) :
            (<AddressForm  
                name ={props.name}
                id={props.id}
                street={props.street}
                city={props.city}
                region={props.region}
                postalCode={props.postalCode}
                token={props.token}
            />) 
            }
        </Root>
       
    </Container>
   
    );
}

export default Addresses;