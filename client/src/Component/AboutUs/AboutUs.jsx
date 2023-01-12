import { Box, Typography, Stack } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect }  from "react";
import Separator from "../Separator/Separator";
import logo from "../../Assets/logo.png"


const AboutUs = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container>
            <Separator title={'About Us'} />
            <Stack direction="row">
                <Box>

                    <h3>Grupo Part-Time 08-05</h3>
                    <br />
                    <Typography sx={
                        {
                            textAlign: 'start'
                        }
                    } variant="body1">
                        <p>Somos el grupo de proyecto final de Soy Henry de la cohorte Part-Time 08-05.</p>
                        <p>Arrancamos, creo que por abril, ya ni me acuerdo, con el sueño de convertirnos en programadores y así poder meternos en el hermoso mundo de la tecnología informática. Hoy tenemos este humilde pero bello sitio web que nos abre la puerta de ese sueño y que en el camino nos dejo un monton de conocimientos y habilidades pero tambien un excelente grupo de amigos y compañeros </p>
                        <p>Somos:</p>
                        <ul>
                            <li>Carlos Virgili</li>
                            <li>Fernando Becerra</li>
                            <li>Mijail Pulgar</li>
                            <li>Moises Plata</li>
                            <li>Nicolas Stabilini</li>
                            <li>Svens Clausz</li>
                            <li>Leonardo Meza</li>
                        </ul>
                        <p>Estamos muy orgullosos de este proyecto pero sobre todo de haberlo hecho juntos. </p>
                        <p>¡Esperamos que les guste!</p>
                    </Typography>
                </Box>
                <Box>
                    <img src={logo} alt="HenryGadget" />
                </Box>
            </Stack>

        </Container>
    )
}

export default AboutUs