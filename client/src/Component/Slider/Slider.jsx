import React from "react";
import Carousel from 'react-bootstrap/Carousel'

import styles from './Slider.module.css'
import prueba from '../../Assets/prueba.jpg'
import {Button} from '@mui/material'
import { Link } from "react-router-dom";
export default function Slider() {
    return (
        <div className={styles.container}>

        <Carousel className={styles.carousel}>
          <Carousel.Item>
            <div style={{width:'100%',backgroundColor:'#19b2a6',positon:'relative'}}>
            <Link to='/products'>
              <Button variant='contained' color='primary' sx={{
                zIndex:'1',marginTop:'10rem',position:'absolute',border:'none',fontSize:'2.3rem',borderRadius:'10px'
              }}>Buy now</Button>
            </Link>
              <img
                className="d-block w-100"
                src={prueba}
                alt="Second slide"
                style={{objectFit:'contain'}}
              />
            </div>
    
            {/* <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <div style={{width:'100%',backgroundColor:'rgb(237,237,237)'}}>
              <img
                className="d-block w-100"
                src="https://www.tiendadiggit.com.ar/Pubs/Sites/Default/Banners/1514.jpg"
                alt="First slide"
                style={{objectFit:'contain'}}
              />

            </div>
            {/* <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          {/* <Carousel.Item>
            <div style={{width:'100%',backgroundColor:'#19b2a6',positon:'relative'}}>
            <Link to='/products'>
              <Button variant='contained' color='primary' sx={{
                zIndex:'1',marginTop:'10rem',position:'absolute',border:'none',fontSize:'2.3rem',borderRadius:'10px'
              }}>Buy now</Button>
            </Link>
              <img
                className="d-block w-100"
                src={prueba}
                alt="Second slide"
                style={{objectFit:'contain'}}
              />
            </div> */}
    
            {/* <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption> */}
          {/* </Carousel.Item> */}
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://zelucashdev.s3.sa-east-1.amazonaws.com/uploads/BANERS%20ZC/09_Septiembre/Samsung%20Linea%20A%20-%20Linea%20J.png"
              alt="Third slide"
            />
    
            {/* <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption> */}
          </Carousel.Item>
        </Carousel>
        </div>
      );
    }
