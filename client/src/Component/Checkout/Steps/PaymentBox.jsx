import React from 'react';

import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { VscError } from "react-icons/vsc"
import {MdOutlinePayments} from "react-icons/md"

import styles from "./PaymentBox.module.css"

export default function PaymentBox({status, data}) {

    if(status === 'loading'){
        return (
            <div className={styles.divGlobalLoading}>
            <div className={styles.divIcon}>
                <MdOutlinePayments className={styles.icon}/>
            </div>
            <div className={styles.divSpan}>
                <span className={styles.span}> Loading... </span>
            </div>
          </div>  
        )
    }

    if(status === 'approved'){
        return (
          <div className={styles.divGlobal}>
            <div className={styles.divIcon}>
                <IoCheckmarkDoneCircleOutline className={styles.icon}/>
            </div>
            <div className={styles.divSpan}>
                <span className={styles.span}>The payment was approved with order ID: {data.orderID}</span>
            </div>
          </div>
        )
    }

    if(status === 'rejected'){
        return(
        <div className={styles.divGlobalError}>
            <div className={styles.divIcon}>
                <VscError className={styles.icon}/>
            </div>
            <div className={styles.divSpan}>
                <span className={styles.span}>The payment was rejected due an issue with your bank, please contact them for further assistance</span>
            </div>
          </div>
        )
    }
}
