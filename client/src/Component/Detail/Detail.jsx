import React, { useState } from "react";
import styles from "./Detail.module.css";
import testJSON from '../Products/testJSON.json';
import MiniNav from '../MiniNav/MiniNav'
import Separator from "../Separator/Separator";



const Detail = () => {
    const [input, setInput] = useState({value : 1})

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

        <div className="container">
            <MiniNav />
            <div className={`${styles.product_area}`}>
                <div className={`col-xs-4 ${styles.item_photo}`}>
                    <img className={styles.main_img} src={testJSON[0].image} alt={testJSON.name} />
                </div>
                <div className={`col-xs-5`} style={{ border: '0px solid gray' }}>
                    {/* <!-- Datos del vendedor y titulo del producto --> */}
                    <h3>{testJSON[0].name}</h3>
                    <h5 style={{ color: '#337ab7' }}>Motorola</h5>

                    {/* <!-- Precios --> */}
                    <h6 className={`${styles.title_price}`}><small>PRECIO OFERTA</small></h6>
                    <h3 style={{ margin: '0px' }}>${testJSON[0].price}</h3>

                    {/* <!-- Detalles especificos del producto --> */}

                    <div className={`${styles.section}`} style={{ padding: '5px' }}>
                        <h6 className="title-attr"><small>CAPACIDAD</small></h6>
                        <div>
                            <div className={`${styles.attr2}`}>16 GB</div>
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
                        <div className={`p-5`}><span><i className={`bi bi-sd-card`}></i></span>16GB</div>                        
                    </div>
                    <div className={`col p-3`}>
                        <strong>Camara</strong>
                        <div className={`p-5`}><span><i className="bi bi-camera"></i></span>16GB</div>                        
                    </div>
                    <div className={`col p-3`}>
                        <strong>Procesador</strong>
                        <div className={`p-5`}><span><i className="bi bi-cpu"></i></span>16GB</div>
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