import React from "react";
import styles from './Newslatter.module.css'
import { useState } from "react";
import { Box, IconButton, Stack, TextField } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import { sendEmail } from "./controllerNewsLetter";
import Alert from 'react-bootstrap/Alert';

const Newslatter = () => {
    const [input, setInput] = useState("")
    const [send, setSend] = useState(null);

    const inputHandler = (e) => {
        setInput(e.target.value)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        let response = await sendEmail(input);
        if (response.includes('added successfully')) {
            setInput('');
            setSend(true);
        }
        else
            setSend(false);
    }

    return(
        <div>
            {send != null ?
                send === true ?
                    <Alert key={'warning'} variant={'warning'}>
                        Se ha enviado un mail a su casilla para confirmar su subscripción.
                    </Alert> :
                    <Alert key={'dark'} variant={'dark'}>
                        Un error ha ocurrido mientras intentaba subscribirse.
                    </Alert> :
                null}

            <Box  sx={{
                p:6,
                bgcolor: 'rgb(244, 244, 244)',
                height: 125,
                
                
            }}>
                <Stack direction={'row'} sx={{alignItems: 'center'}}>
                    <Stack direction={'row'} sx={{
                        alignItems: 'center',
                        pr:5
                        
                    }}>
                        <EmailIcon />
                        <h2>Newslatter</h2>
                    </Stack>
                    <Box sx={{
                        alignItems: 'center'
                    }}>
                        <p className={`${styles.p}`}>Receive information about our products and promotions directly to your email.</p>
                    </Box>
                    <div>
                        <TextField id="standard-basic" label="Email" variant="standard" onChange={e => inputHandler(e)} value={input}></TextField>
                        <IconButton onClick={e => submitHandler(e)} color="primary">
                            <SendIcon />
                        </IconButton>
                    </div>
                </Stack>
            </Box>
        </div>
    )
}



export default Newslatter
