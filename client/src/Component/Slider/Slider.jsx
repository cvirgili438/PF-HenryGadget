import React from "react";
import Carousel from 'react-bootstrap/Carousel'
import styles from './Slider.module.css'

export default function Slider() {
    return (
        <div className={styles.container}>

        <Carousel className={styles.carousel}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.tiendadiggit.com.ar/Pubs/Sites/Default/Banners/1514.jpg"
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
              src="https://www.elit.com.ar/_next/image?url=https%3A%2F%2Felit-prod.s3.amazonaws.com%2Fbanners%2F638a4e403559f108582157b9%2Fdesktop.webp&w=1920&q=95"
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
