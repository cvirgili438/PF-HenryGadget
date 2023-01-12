import React from 'react'
import EffectCubes from './EffectCubes'
import 'aos/dist/aos.css'
import {Typography } from '@mui/material'
function FeaturedProducts() {
  return (
    <div  id='anchor-featured' data-aos='flip-down' data-aos-offset='-200' data-aos-duration='1300' data-aos-once='true'  style={{maxWidth:'100%',height:'auto',backgroundColor:'rgb(242,242,242)',paddingBottom: '2rem',marginBottom:'8rem'}}>
      {/* <h1 style={{margin:'2.5rem',fontSize:'5rem'}}>Feautered Products</h1> */}
      <Typography variant="h3" sx={{marginTop:'3.5rem'}} gutterBottom>
        Featured products
      </Typography>
      <div style={{width:'50%',margin:'auto'}}>
        <EffectCubes></EffectCubes>
      </div>
    </div>
  )
}

export default FeaturedProducts