import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

export default function SkeletonCards() {
  return (
    <div>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        width : 300,
        opacity:0.9,       
        mb: 32,
        p: 5
      }}  >
        <Skeleton  variant='rectangular' width={200} height={250} sx={{
            borderRadius: 3
        }}/>
        <Box   sx={{
            alignContent: "center",
            mt: 'auto',
            width:200
        }}>
            <Skeleton variant='text' animation='wave' />
            <Skeleton variant='text' animation='wave' sx={{
                mt:3,
                mb:3,
            }}/>
            <Skeleton variant='text' animation='wave' />
        </Box>
      {/* {
       
      }
      
      <div className={ styles.detail }> */}
        {/* <div className={ styles.name }>{ name }</div>
        <div className={ styles.description }>{ description ? description.length > trim_text ? `${description.trim().slice(0, trim_text)}...` : description : null }</div>
        <div className={ styles.price }>$ { price.toLocaleString() }</div>
        <div className={ units_left > 5 ? `${styles.units_left}` : `${styles.units_left} ${styles.low_units_left}` }>
          { units_left === 0 ? `NO` : units_left } unit{ units_left > 1 || units_left === 0 ? `s` : null } left</div> */}
      {/* </div> */}
    
    </Box>
    </div>
  )
}
