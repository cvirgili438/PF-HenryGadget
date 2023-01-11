import React from 'react';
import { Box } from '@mui/system';
import { Typography, Skeleton } from '@mui/material';

const NotFoundCards = () => {
    return (
        <div>
            <Box  sx={{
        mt:5,
        ml:50,              
        textAlign: 'center',
        width : 300,
        opacity:0.9,       
        mb: 32,
        p: 5
      }}>
         <Skeleton  variant='rectangular' width={200} height={250} sx={{
            borderRadius: 3
        }}/>
        <Box   sx={{
            alignContent: "center",
            mt: 'auto',
            width:200
        }}>
           
           <Typography variant='h5' sx={{
                mt:3,
                mb:3,
            }} >Products not found, try again with others filters</Typography>
             </Box>
            </Box>
        </div>
    );
};

export default NotFoundCards;