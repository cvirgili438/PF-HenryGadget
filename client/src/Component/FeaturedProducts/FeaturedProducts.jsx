import React from 'react'
import EffectCubes from './EffectCubes'

function FeaturedProducts() {
  return (
    <section style={{width:'100%',height:'100vh',backgroundColor:'rgb(242,242,242)'}}>
      <h1 style={{margin:'2.5rem',fontSize:'5rem'}}>Feautered Products</h1>
      <div style={{width:'50%',margin:'auto'}}>
        <EffectCubes></EffectCubes>
      </div>
    </section>
  )
}

export default FeaturedProducts