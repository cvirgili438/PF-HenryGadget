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
                <span className={styles.container_options_span}>Account</span>
            </div>
            <div className={styles.container_options}>
                <FaShoppingCart/>
                <span className={styles.container_options_span}>Orders</span>
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