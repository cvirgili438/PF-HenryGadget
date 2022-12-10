import React from "react";
import styles from './Newslatter.module.css'
import { Box, IconButton, Stack, TextField } from "@mui/material";
import { EmailIcon } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';


const Newslatter = () => {


    return(
        <div>
            <Box  sx={{
                p:6,
                bgcolor: 'rgb(244, 244, 244)',
                height: 75
            }}>
                <Stack direction={'row'}>
                    <div>
                        <EmailIcon />
                        <h1>Newslatter</h1>
                    </div>
                    {/* <div>
                        <p>Receive information about our products and promotions directly to your email.</p>
                    </div>
                    <div>
                        <TextField id="standard-basic" label="Email" variant="standard"></TextField>
                        <IconButton color="primary">
                            <SendIcon />
                        </IconButton>
                    </div> */}
                </Stack>
            </Box>
        </div>
    )
}



export default Newslatter
