import React from "react";
import styles from './Newslatter.module.css'
import { useState } from "react";
import { Box, IconButton, Stack, TextField, Alert } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import { sendEmail } from "./controllers/newsLetterDB.js";
import { checkEmail } from "./controllers/check.js";

const Newslatter = () => {
    const [input, setInput] = useState("")
    const [send, setSend] = useState(null);
    const [errorInput, setErrorInput] = useState(false);

    const inputHandler = (e) => {
        setInput(e.target.value);

        if (e.target.value === '')
            setErrorInput(false);
        else if (checkEmail(e.target.value)) {
            setErrorInput(false);
        }
        else
            setErrorInput(true);
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

    function handleAlert(e){
        setSend(null);
    };

    return(
        <div>
            {/* Alerta para notificación sobre la subscripción. */}
            {send != null ?
                send === true ?
                    <Alert severity="success" onClose={e => handleAlert(e)} sx={{alignItems: 'center'}}>
                        <p className={`${styles.p}`}>An email has been sent to your inbox to confirm your subscription. </p>
                    </Alert> :
                    <Alert severity="error" onClose={e => handleAlert(e)} sx={{alignItems: 'center'}}>
                        <p className={`${styles.p}`}>An error has occurred while trying to subscribe. Try again in a moment, please.</p>
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
                        <h2>Newsletter</h2>
                    </Stack>
                    <Box sx={{
                        alignItems: 'center'
                    }}>
                        <p className={`${styles.p}`}>Receive information about our products and promotions directly to your email.</p>
                    </Box>
                    <div>
                        <TextField id="standard-basic" label="Email" variant="standard" onChange={e => inputHandler(e)} value={input}></TextField>
                        <IconButton disabled={errorInput || input === ''} onClick={e => submitHandler(e)} color="primary">
                            <SendIcon />
                        </IconButton>
                        {errorInput ?
                        <p className={`${styles.p}`}>Email not valid.</p> : null}
                    </div>
                </Stack>
            </Box>
        </div>
    )
}



export default Newslatter
