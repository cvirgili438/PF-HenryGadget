import { Box, Divider, IconButton, Link, ListItemAvatar, ListItemText, ListItem, Paper, Avatar, Stack, rgbToHex } from "@mui/material";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa"
import React from "react";

import Chip from '@mui/material/Chip';


const MoreInfo = () => {

    return (
        <div>
            <Box sx={{ 
                p: 4,
                // background: "rgb(251,97,63)",
                background: "radial-gradient(circle, rgba(251,97,63,1) 0%, rgba(252,250,70,1) 100%)",
                
             }}>
                <Stack direction={'row'} divider={<Divider orientation="vertical" flexItem />}  justifyContent="space-evenly" alignItems="center" spacing={5}>
                    <Box position={"relative"} >
                        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} justifyContent="space-evenly">
                            <a href="https://www.facebook.com/profile.php?id=100089485689501">
                                <IconButton color="success" size="large" sx={{ fontSize: "40px", '&:hover, &.Mui-focusVisible': { backgroundColor: 'lightgreen'}}}>
                                    <FaFacebook sx={{ fontSize: "40px" }} />
                                </IconButton>
                            </a>
                            <a href="https://twitter.com/Henry_Gadget">
                                <IconButton color="success" size="large" sx={{ fontSize: "40px", '&:hover, &.Mui-focusVisible': { backgroundColor: 'lightgreen'}}}>
                                    <FaTwitter sx={{ fontSize: "40px" }} />
                                </IconButton>
                            </a>
                        </Stack>
                                                
                        <a style={{textDecoration :'none'}} href="https://wa.me/5491157384737">
                            <Paper sx={{
                                backgroundColor:"#52ba638a",
                                border:"1px solid #52ba63",
                                "&:hover": {
                                    backgroundColor: '#52ba63'
                                }
                                
                            }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{
                                            backgroundColor: "whitesmoke"
                                        }}>
                                            <FaWhatsapp color="green" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="WhatsApp" secondary="click here!" />
                                </ListItem>
                            </Paper>
                        </a>
                    </Box>
                    <Box >
                        <h5>PT08-Group05</h5>
                        <Divider variant="inset" component="h4" />
                        {/* <Stack direction={"column"}> */}
                            <ListItem sx={{ flexWrap: 'wrap', justifyContent: 'center', maxWidth: 500 }}>
                            <Chip
                                avatar={<Avatar alt="Mijail" src="https://avatars.githubusercontent.com/u/94995763?v=4" />}
                                label="Mijail"
                                // variant="outlined"
                                size="large"
                                color="success"
                                sx={{ margin: 1}}
                            />
                            <Chip
                                avatar={<Avatar alt="Nicolas" src="https://avatars.githubusercontent.com/u/36341963?v=4" />}
                                label="Nicolás"
                                // variant="outlined"
                                size="large"
                                color="success"
                                sx={{ margin: 1}}
                                clickable='true'
                            />
                            <Chip
                                avatar={<Avatar alt="Carlos" src="https://avatars.githubusercontent.com/u/100769556?v=4" />}
                                label="Carlos"
                                // variant="outlined"
                                size="large"
                                color="success"
                                sx={{ margin: 1}}
                            />
                            <Chip
                                avatar={<Avatar alt="Fernando" src="https://avatars.githubusercontent.com/u/27827755?v=4" />}
                                label="Fernando"
                                // variant="outlined"
                                size="large"
                                color="success"
                                sx={{ margin: 1}}
                            />
                            <Chip
                                avatar={<Avatar alt="Sven" src="https://avatars.githubusercontent.com/u/104173746?v=4" />}
                                label="Sven"
                                // variant="outlined"
                                size="large"
                                color="success"
                                sx={{ margin: 1}}
                            />
                            <Chip
                                avatar={<Avatar alt="Moises" src="https://avatars.githubusercontent.com/u/97771089?v=4" />}
                                label="Moises"
                                // variant="outlined"
                                size="large"
                                color="success"
                                sx={{ margin: 1}}
                            />
                            <Chip
                                avatar={<Avatar alt="Leonardo" src="https://avatars.githubusercontent.com/u/85768834?v=4" />}
                                label="Leonardo"
                                // variant="outlined"
                                size="large"
                                color="success"
                                sx={{ margin: 1}}
                            />
                            </ListItem>
                        {/* </Stack> */}
                    </Box>
                    <Box sx={{ maxWidth: 500 }}>
                        <h5>More Information</h5>
                        <Divider variant="inset" component="h4" />
                        <Stack direction={"column"}>
                            <ListItem>
                               Final proyect for Henry bootcamp.
                            </ListItem>
                            <ListItem>
                                Tech used: react, redux, node.js, express, postgres, firebase, mui, bootstrap, and a lot of fun 😁 
                            </ListItem>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </div>
    )
}




export default MoreInfo