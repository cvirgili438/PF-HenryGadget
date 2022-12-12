import React from "react";
import styles from './Newslatter.module.css'
import { Box, IconButton, Stack, TextField } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';


const Newslatter = () => {


    return(
        <div>
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
                        <TextField id="standard-basic" label="Email" variant="standard"></TextField>
                        <IconButton color="primary">
                            <SendIcon />
                        </IconButton>
                    </div>
                </Stack>
            </Box>
        </div>
    )
}



export default Newslatter
