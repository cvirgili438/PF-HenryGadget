import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getProductById } from '../../Redux/Actions/products'

import MiniNav from '../MiniNav/MiniNav'
import Separator from "../Separator/Separator";

import styles from "./Detail.module.css";

import noImage from '../../Assets/noImage.jpg';


const Detail = () => {
    const { id } = useParams();
    
    const user = useSelector(state => state.user)

    const [input, setInput] = useState({ value: 1 })    
   
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getProductById(id));
    }, [dispatch]);

    const details = useSelector(state => state.productDetail);  

    let productDetail = {}    
    
    if (details.result) {
        productDetail = details.result    
    }
    function handleCart(){
        let cart
        let storage = localStorage.getItem('cart')
        if(storage === null || storage === undefined){
            cart = [{
                idProduct: productDetail.id,
                name: productDetail.name,
                price:productDetail.price,
                img: productDetail.img[0],
                quantity : input.value
            }]
            let stringify = JSON.stringify(cart)
            localStorage.setItem('cart',stringify)            
            return alert('The products is add to you cart')
        }
        else{
            let parse= JSON.parse(storage)   
            let cart = {
                idProduct: productDetail.id,
                name: productDetail.name,
                price:productDetail.price,
                img: productDetail.img[0],              
            }
            let filter = parse.filter(e => e.name ===  cart.name)
            console.log('filter',filter)
            if(filter.length > 0 ){
                let index = parse.findIndex(e => e ===filter[0])
                console.log('index',index)                
                parse[index]={
                    ...parse[index],
                    quantity: filter[0].quantity + input.value
                }
                // let nuevo = {
                //     ...cart,
                //     quantity: cart.quantity+input.value
                // }
                // parse.push(nuevo)
                let stringyfy = JSON.stringify(parse)
                localStorage.setItem('cart', stringyfy)
                return alert('The products is add to you cart')
            }
            if(filter.length === 0 ){
                let nuevo = {
                    ...cart,
                    quantity:input.value
                }
                parse.push(nuevo)
                let stringyfy = JSON.stringify(parse)
                localStorage.setItem('cart', stringyfy)
                return alert('The products is add to you cart')
            }
                      
        }
    }
    
    let handleCount = (e) => {
        if (e.target.id === 'minus' || e.target.id === 'i-minus') {
            input.value === 0 ? setInput(
                {
                    value: 0
                }
            ) :
                setInput(
                    {
                        value: input.value - 1
                    }
                )
        }
        else if (e.target.id === 'plus' || e.target.id === 'i-plus') {
            setInput(
                {
                    value: input.value + 1
                }
            )
        }
        
    }

    let handleImg = (e) => {
        document.getElementById('mainImg').src = e.target.src
    }

    return (

        <div className={`container ${styles.container}`}>
            <MiniNav />
            <div className={`${styles.product_area}`}>
                <div className={`col-xs-4 ${styles.item_photo}`}>                    
                    {
                        !productDetail.img ?
                            <img className={styles.main_img} src={noImage} alt='Not available' />
                            :
                            productDetail.img.length === 0 ?
                                <img className={styles.main_img} src={noImage} alt='Not available' />
                                :
                                <img id="mainImg" className={styles.main_img} src={productDetail.img[0]} alt={productDetail.name} />
                    }
                    <div className={`d-inline-flex p-2`}>                        
                        {                        
                           productDetail.img && productDetail.img.map(e => {
                               return (<div className={`w-25 border`}>                                    
                                    <img onClick={e => handleImg(e)} className={`w-50`} src={e} alt={productDetail.name} />
                                </div>)
                            })
                        }

                    </div>
                </div>
                <div className={`col-xs-5`} style={{ border: '0px solid gray' }}>
                    {/* <!-- Datos del vendedor y titulo del producto --> */}
                    <h3>{productDetail.name}</h3>
                    <h5 style={{ color: '#337ab7' }}>{productDetail.name}</h5>

                    {/* <!-- Precios --> */}
                    <h6 className={`${styles.title_price}`}><small>PRECIO OFERTA</small></h6>
                    <h3 style={{ margin: '0px' }}>${productDetail.price}</h3>

                    {/* <!-- Detalles especificos del producto --> */}

                    <div className={`${styles.section}`} style={{ padding: '5px' }}>
                        <h6 className="title-attr"><small>CAPACIDAD</small></h6>
                        <div>
                            <div className={`${styles.attr2}`}>-n/a-</div>
                        </div>
                    </div>
                    <div className={`${styles.section}`} style={{ padding: '20px' }}>
                        <h6 className={`${styles.title_attr}`}><small>CANTIDAD</small></h6>
                        <div>
                            <button onClick={e => handleCount(e)} id="minus" className={`${styles.btn_minus}`}><i onClick={e => handleCount(e)} id="i-minus" className="bi bi-caret-left"></i></button>
                            <input value={input.value} />

                            <button onClick={e => handleCount(e)} id="plus" className={`${styles.btn_plus}`}><i onClick={e => handleCount(e)} id="i-plus" className="bi bi-caret-right"></i></button>
                        </div>
                    </div>

                    {/* <!-- Botones de compra --> */}
                    <div className={`${styles.section}`} style={{ padding: '20px' }}>
                        <button className={`${styles.btn_success} btn btn-success`} onClick={handleCart} >Agregar al carro</button>
                        <button className={`${styles.btn_success} btn btn-outline-success`}>Comprar</button>
                    </div>
                </div>
            </div>
            <div>
                <Separator title='Descripción' />

                <div className={`row`}>
                    <div className={`col p-3`}>
                        <strong>Almacenamiento</strong>
                        <div className={`p-5`}><span><i className={`bi bi-sd-card`}></i></span>{!productDetail.storage ? '-n/a-' : productDetail.storage.size}</div>
                    </div>
                    <div className={`col p-3`}>
                        <strong>Camara</strong>
                        <div className={`p-5`}><span><i className="bi bi-camera"></i></span>{!productDetail.camera ? '-n/a-' : productDetail.camera.size}</div>
                    </div>
                    <div className={`col p-3`}>
                        <strong>Procesador</strong>
                        <div className={`p-5`}><span><i className="bi bi-cpu"></i></span>{!productDetail.processor ? '-n/a-' : productDetail.processor.size}</div>
                    </div>
                </div>

                <Separator title='Comentarios' />
                <div className={`container`}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis incidunt reiciendis hic possimus, architecto, id sapiente a nostrum consequatur doloribus nesciunt dolores. Repellendus, repudiandae quidem. Ut recusandae reprehenderit fuga saepe!</p>
                </div>
            </div>
        </div>
    )
}


export default Detail