import React from "react";
import styles from "./Detail.module.css"
import testJSON from '../Products/testJSON.json';
import fav from '../../Assets/estrella.png'

console.log(testJSON);

const Detail = () => {
    return (

        <div className={styles.container}>
            <nav>
                <ul className={styles.miniNav}>
                    <li>Inicio</li>
                    <li>Products</li>
                </ul>
            </nav>
            <div className={styles.productArea}>
                <div className={styles.producImgs}>
                    <div className={styles.mainImg}>
                        <img src={testJSON[0].image} alt={testJSON.name} />
                    </div>
                    <ul>
                        <li className={styles.miniatura}><img src={testJSON[0].image} alt={testJSON[0].name} /></li>
                        <li className={styles.miniatura}><img src={testJSON[0].image} alt={testJSON[0].name} /></li>
                        <li className={styles.miniatura}><img src={testJSON[0].image} alt={testJSON[0].name} /></li>
                        <li className={styles.miniatura}><img src={testJSON[0].image} alt={testJSON[0].name} /></li>
                    </ul>
                </div>
                <div className={styles.productDescription}>
                    <div className={styles.nameArea}>
                        <div className={styles.name}>
                            <h1>
                                {testJSON[0].name}
                            </h1>
                        </div>
                        <div className="fav">
                            <button><img className={styles.favorito} src={fav} alt="favorito" /></button>
                        </div>
                    </div>
                    <div className="price">

                    </div>
                </div>
            </div>

        </div>
    )
}


export default Detail