import React from 'react'
import Skeleton from '@mui/material/Skeleton';

export default function SkeletonFilter() {
  return (
    <div>
        <Skeleton animation="wave" variant='text' width={256} sx={{
             border:'none',             
             ml:'auto',
             transition: 0.2,
             mt:'auto',
             mb:'auto',
        }} />
        <Skeleton animation="wave" variant='text' width='60%'/>
    </div>
  )
}
