import React from "react";
import styles from "./Detail.module.css";
import testJSON from '../Products/testJSON.json';
import MiniNav from '../MiniNav/MiniNav'




const Detail = () => {
    return (

        <div className="container">
            <MiniNav />
            <div className={`${styles.productArea}`}>
                <div className={`col-xs-4 ${styles.itemPhoto}`}>
                    <img className={styles.mainImg} src={testJSON[0].image} alt={testJSON.name} />
                </div>
                <div className={`col-xs-5`} style={{ border: '0px solid gray' }}>
                    {/* <!-- Datos del vendedor y titulo del producto --> */}
                    <h3>{testJSON[0].name}</h3>
                    <h5 style={{ color: '#337ab7' }}>Motorola</h5>

                    {/* <!-- Precios --> */}
                    <h6 className={`${styles.titlePrice}`}><small>PRECIO OFERTA</small></h6>
                    <h3 style={{ margin: '0px' }}>${testJSON[0].price}</h3>

                    {/* <!-- Detalles especificos del producto --> */}

                    <div className={`${styles.section}`} style={{ padding: '5px' }}>
                        <h6 className="title-attr"><small>CAPACIDAD</small></h6>
                        <div>
                            <div className={`${styles.attr2}`}>16 GB</div>
                        </div>
                    </div>
                    <div className={`${styles.section}`} style={{ padding: '20px' }}>
                        <h6 className={`${styles.titleAttr}`}><small>CANTIDAD</small></h6>
                        <div>
                            <div className={`${styles.btnMinus}`}><i className="bi bi-caret-left"></i></div>
                            <input value="1" />
                            
                            <div className={`${styles.btnPlus}`}><i className="bi bi-caret-right"></i></div>
                        </div>
                    </div>

                    {/* <!-- Botones de compra --> */}
                    <div className={`${styles.section}`} style={{ padding: '20px' }}>
                        <button className={`${styles.btnSuccess} btn btn-success`}>Agregar al carro</button>
                        <h6><span className="glyphicon glyphicon-heart-empty" style={{ cursor: 'pointer' }}></span> Agregar a lista de deseos</h6>
                    </div>
                </div>
            </div>
            <div>
                <div className="container mt-5 mb-5">
                    <div className="row d-flex align-items-center">
                        <div className="col">
                            <div className={`${styles.line}`}></div>
                        </div>
                        <div className="col-auto">
                            <h4>Descripcion</h4>
                        </div>
                        <div className="col">
                            <div className={`${styles.line}`}></div>
                        </div>
                    </div>
                </div>
                <div className={`row`}>
                    <div className={`col p-3`}>
                        Almacenamiento
                        <div><span><i className="bi bi-sd-card"></i></span>16GB</div>
                    </div>
                    <div className={`col p-3`}>
                        Camara
                        <div><span><i class="bi bi-camera"></i></span>16GB</div>
                        </div>
                    <div className={`col p-3`}>
                        Procesador
                        <div><span><i class="bi bi-cpu"></i></span>16GB</div>
                        </div>
                </div>
            </div>
        </div>


        // <div className={styles.container}>
        //     <nav>
        //         <ul className={styles.miniNav}>
        //             <li>Inicio</li>
        //             <li>Products</li>
        //         </ul>
        //     </nav>
        //     <div className={`${styles.productArea} `}>
        //         <div className={styles.producImgs}>
        //             <div className={styles.mainImg}>
        //                 <img src={testJSON[0].image} alt={testJSON.name} />
        //             </div>
        //             <ul>
        //                 <li className={styles.miniatura}><img src={testJSON[0].image} alt={testJSON[0].name} /></li>
        //                 <li className={styles.miniatura}><img src={testJSON[0].image} alt={testJSON[0].name} /></li>
        //                 <li className={styles.miniatura}><img src={testJSON[0].image} alt={testJSON[0].name} /></li>
        //                 <li className={styles.miniatura}><img src={testJSON[0].image} alt={testJSON[0].name} /></li>
        //             </ul>
        //         </div>
        //         <div className={`${styles.productDescription} col-xs-5`}>
        //             <div className={`${styles.nameArea} row-6`}>
        //                 <div className={`${styles.name} m-3`}>
        //                     <h3>
        //                         {testJSON[0].name}
        //                     </h3>
        //                 </div>
        //                 <div className={styles.fav}>
        //                     <button className="btn btn-light"><img className={styles.favorito} src={fav} alt="favorito" /></button>
        //                 </div>
        //             </div>
        //             <div className={`${styles.price} `}>
        //                 <h3>${testJSON[0].price}</h3>                        
        //             </div>
        //         </div>
        //     </div>

        // </div>
    )
}


export default Detail