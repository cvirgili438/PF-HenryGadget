import React from 'react'
import styles from './ProfileOptions.module.css'
import { HiLogin } from 'react-icons/hi'
import { FaUserCog } from 'react-icons/fa'
import { FaShoppingCart } from 'react-icons/fa'


function ProfileOptions(props) {
    return ( 
        <div className={styles.container}>
            <div className={styles.container_options}>
                <FaUserCog/>
                <span className={styles.container_options_span}>My account</span>
            </div>
            <div className={styles.container_options}>
                <FaShoppingCart/>
                <span className={styles.container_options_span}>Mis compras</span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.container_options}>
               <HiLogin/>
               <span className={styles.container_options_span} onClick={props.logOut}>Log out</span>
            </div>
        </div>
      );
}

export default ProfileOptions