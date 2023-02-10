import React from 'react'
import { Button } from "@mui/material";
import styles from './MiniCardCreateProduct.module.css'



function MiniCardCreateProduct(props) {
  return (
    <div className={styles.container} >

            <div style={{width:'100%',display:'flex',height:'4rem'}}>
              <img src={props.img} alt='images uploaded' />
              {/* <p style={{width:'22rem',margin:'auto'}}>{props.name}</p> */}
              <div style={{width:'100%',display:'flex',justifyContent:'flex-end',height:'4rem'}}>
                <Button 
                sx={{height:'2rem',width:'1rem', marginTop:'1rem' ,marginRight:'1rem'}}
                variant='outlined'
                color='error'
                onClick={props.handleRemoveImg}
                id={props.img}
                disableElevation={true}
                >
                  Delete
                </Button>
              </div>
            </div>

          </div>
  )
}

export default MiniCardCreateProduct