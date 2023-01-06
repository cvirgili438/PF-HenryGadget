import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function BasicRating({valor}) {
  console.log('ferrrrrrrrr', valor, Number(valor).toFixed(1))
  return (
    <Box
      sx={{
        '& > legend': { mt: 2, fontSize: '1.2rem' },
      }}
    >
      <Typography component="legend">Reviews</Typography>
      <Rating
        name="read-only"
        value={Number(Number(valor).toFixed(1))}
        precision={0.5}
        readOnly />
    </Box>
  );
}