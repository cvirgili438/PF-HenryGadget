import { Box, Divider, IconButton, Link, ListItemAvatar, ListItemText, ListItem, Paper, Avatar, Stack } from "@mui/material";
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaWhatsapp } from "react-icons/fa"
import React from "react";




const MoreInfo = () => {

    return (
        <div>
            <Box sx={{ 
                p: 6,
                background: "rgb(251,97,63)",
                background: "radial-gradient(circle, rgba(251,97,63,1) 0%, rgba(252,250,70,1) 100%)",
  

             }}>
                <Stack direction={'row'}>
                    <Box sx={{
                        widows: 300,
                        marginX: 6
                    }}>
                        <h5>Information of Interest</h5>
                        <Divider variant="inset" component="h4" />
                        <Stack direction={"column"}>
                            <ListItem>
                                <Link underline="hover" color="inherit" href="/">
                                    Promotions
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link underline="hover" color="inherit" href="/">
                                    Branch offices
                                </Link>
                            </ListItem>
                        </Stack>
                    </Box>
                    <Box sx={{
                        widows: 300,
                        marginX: 6
                    }}>
                        <h5>PT08-PF-Group05</h5>
                        <Divider variant="inset" component="h4" />
                        <Stack direction={"column"}>
                            <ListItem>
                                <Link underline="hover" color="inherit" href="/">
                                    About us
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link underline="hover" color="inherit" href="https://www.soyhenry.com/">
                                    Soy Henry
                                </Link>
                            </ListItem>
                        </Stack>
                    </Box>
                    <Box position={"relative"} right={"-450px"}>
                        <Stack
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem />}
                            spacing={2}
                        >
                            <ul>
                                <a href="#">
                                    <IconButton color="primary">
                                        <FaFacebook />
                                    </IconButton>
                                </a>
                                <a href="#">
                                    <IconButton color="primary">
                                        <FaInstagramSquare />
                                    </IconButton>
                                </a>
                                <a href="#">
                                    <IconButton color="primary">
                                        <FaLinkedin />
                                    </IconButton>
                                </a>
                            </ul>
                        </Stack>
                                                
                        <a style={{textDecoration :'none'}} href="#">
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
                                <ListItemText primary="Contact us" secondary="By whatsapp" />
                            </ListItem>
                        </Paper>
                        </a>
                    </Box>
                </Stack>

            </Box>

        </div>
    )
}




export default MoreInfo