import React from "react";
import styles from './Separator.module.css'


const Separator = ( {title}) => {
    return (
        <div className="container mt-5 mb-5">
            {title ? <div className="row d-flex align-items-center">
                <div className="col">
                    <div className={`${styles.line}`}></div>
                </div>
                <div className="col-auto">
                    <h4>{title}</h4>
                </div>
                <div className="col">
                    <div className={`${styles.line}`}></div>
                </div>
            </div> : <div className="row d-flex align-items-center">
                <div className={`${styles.line}`}></div>
            </div>
            }
        </div>
    )
}


export default Separator