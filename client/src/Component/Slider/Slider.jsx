import React from "react";
import Carousel from 'react-bootstrap/Carousel'

import styles from './Slider.module.css'
import banner1 from '../../Assets/banner01.jpg'
import banner2 from '../../Assets/banner02.jpg'
import banner3 from '../../Assets/banner03.jpg'
import banner04 from '../../Assets/banner04.jpg'
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Slider() {
    return (
        <div className={styles.container}>

        <Carousel className={styles.carousel}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={ banner1 }
              alt="First slide"
            />
            {/* <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={ banner2 }
              alt="Second slide"
            />
    
            {/* <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={ banner3 }
              alt="Third slide"
            />
    
            {/* <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <Link to='/products'>
              <Button variant='contained' sx={{
                position:'absolute',
                marginTop:'10rem',
                fontSize:'2rem',
                backgroundColor:'#d8d11e',
                '&:hover':{
                  backgroundColor:'#c9c318'
                }
              }}>Buy Now</Button>
            </Link>
            <img
              className="d-block w-100"
              src={ banner04 }
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
