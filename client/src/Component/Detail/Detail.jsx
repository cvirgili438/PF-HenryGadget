import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getProductById } from '../../Redux/Action/index.js'

import MiniNav from '../MiniNav/MiniNav'
import Separator from "../Separator/Separator";

import styles from "./Detail.module.css";

import noImage from '../../Assets/noImage.jpg';


const Detail = () => {
    const { id } = useParams();

    const [input, setInput] = useState({value : 1})

    const productDetail = useSelector(state => state.productDetail);

    const features = useSelector(state => state.filters);
    
    // console.log(features.storage);

    console.log(productDetail);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductById(id));        
    }, [dispatch, id]);

    let handleCount = (e) => {
        if (e.target.id === 'minus' || e.target.id === 'i-minus'  ) {
            input.value === 0 ? setInput(
                {
                    value : 0
                }
            ) :
            setInput(
                {
                    value : input.value - 1
                }            
            )    
        }
        else if(e.target.id === 'plus' || e.target.id === 'i-plus') {
            setInput(
                {
                   value : input.value + 1
                }
            )
        }       
        console.log(input.value);
    }
    return (

        <div className={`container ${styles.container}`}>
            <MiniNav />
            <div className={`${styles.product_area}`}>
                <div className={`col-xs-4 ${styles.item_photo}`}>
                    {
                        !productDetail.img ?
                            <img className={ styles.main_img } src={ noImage } alt='Not available' />
                        :
                            productDetail.img.length === 0 ?
                                <img className={ styles.main_img } src={ noImage } alt='Not available' />
                            :
                            <img className={styles.main_img} src={productDetail.img[0]} alt={productDetail.name} />
                    }
                </div>
                <div className={`col-xs-5`} style={{ border: '0px solid gray' }}>
                    {/* <!-- Datos del vendedor y titulo del producto --> */}
                    <h3>{productDetail.name}</h3>
                    <h5 style={{ color: '#337ab7' }}>{ productDetail.name }</h5>

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
                        <button className={`${styles.btn_success} btn btn-success`}>Agregar al carro</button>
                        <button className={`${styles.btn_success} btn btn-outline-success`}>Comprar</button>
                    </div>
                </div>
            </div>
            <div>
                <Separator title='Descripción'/>
                
                <div className={`row`}>
                    <div className={`col p-3`}>
                        <strong>Almacenamiento</strong>
                        <div className={`p-5`}><span><i className={`bi bi-sd-card`}></i></span>{!productDetail.storage ? '-n/a-' : productDetail.storage.size }</div>                        
                    </div>
                    <div className={`col p-3`}>
                        <strong>Camara</strong>
                        <div className={`p-5`}><span><i className="bi bi-camera"></i></span>{ !productDetail.camera ? '-n/a-' : productDetail.camera.size }</div>                        
                    </div>
                    <div className={`col p-3`}>
                        <strong>Procesador</strong>
                        <div className={`p-5`}><span><i className="bi bi-cpu"></i></span>{ !productDetail.processor ? '-n/a-' : productDetail.processor.size }</div>
                        </div>
                </div>

                <Separator title='Comentarios'/>
                <div className={`container`}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis incidunt reiciendis hic possimus, architecto, id sapiente a nostrum consequatur doloribus nesciunt dolores. Repellendus, repudiandae quidem. Ut recusandae reprehenderit fuga saepe!</p>
                </div>
            </div>
        </div>        
    )
}


export default Detail