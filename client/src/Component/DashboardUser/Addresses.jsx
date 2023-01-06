import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { Container } from '@mui/material';
import AddressForm from './addressForm/AddressForm.jsx';


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


    return (
    <Container fixed>
        {edit === false ? ( <Root>        
            <Divider>{props.name}</Divider>
            {props.region}
        </Root>):
        (
            <AddressForm id={props.id} token={props.token}/>
        )
        
        }
       
    </Container>
   
    );
}

export default Addresses;