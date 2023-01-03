import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.min.css";
import "swiper/modules/effect-cube/effect-cube.min.css";
import "swiper/modules/pagination/pagination.min.css";
import { EffectCube, Pagination } from "swiper";
import { useSelector } from 'react-redux';
import BasicRating from './BasicRating';
import Button from '@mui/material/Button';
import { Button_contained_primary } from '../../Utils/MiuStyles/MiuStyles';
import { Link } from 'react-router-dom'

function EffectCubes() {
  const products = useSelector(state=> state.products)
  
  let result = 0;
  return (
    <>
      <Swiper
        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: false,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={true}
        modules={[EffectCube, Pagination]}
        className="mySwiper"
      >
        {products.length > 0
        ? products.slice(2,8).map(e=>(
          <SwiperSlide key={e.id}>
            <div style={{display:'flex',flexDirection:'column',height:'40rem',cursor:'grab'}}>
              <div style={{margin:'auto',display:'flex'}}>
                <img src={e.img[0]} alt={e.name} style={{width:'30rem',height:'30rem',objectFit:'contain',margin:'auto'}}/>
                <div  style={{margin:'auto'}}>
                  <BasicRating valor={e.reviews.forEach((ele)=>{
                    console.log("Musetreee",ele.score)
                    let count= 0;
                    count = count++
                    result = result + ele.score
                    return result/count
                  })}/>
                  <p style={{fontSize:'2rem',marginTop:'3rem'}}>{e.name}</p>
                  <p style={{fontSize:'2rem',marginTop:'3rem'}}>${e.price}</p>
                  <Link to={`/product/${e.id}`} style={{textDecoration:'none'}}>
                    <Button variant='contained' sx={Button_contained_primary} >More info</Button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))
        :null}
        {/* <SwiperSlide>
          <img src={logo} alt='img'/>
          <p>Hola</p>
        </SwiperSlide>
        <SwiperSlide>
          <img style={{width:'20rem'}} src={noImage} alt='img'/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={shopping} alt='img'/>
        </SwiperSlide>
        <SwiperSlide>
          <img src='' alt='img'/>
        </SwiperSlide> */}
      </Swiper>
    </>
  )
}

export default EffectCubes