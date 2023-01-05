import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function BasicRating(props) {
  console.log('este es el value',props.valor)
  return (
    <Box
      sx={{
        '& > legend': { mt: 2,fontSize:'1.2rem' },
      }}
    >
      <Typography component="legend">Reviews</Typography>
      <Rating name="read-only" value={props.value} readOnly />
    </Box>
  );
}