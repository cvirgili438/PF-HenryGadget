import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './ProfileOptions.module.css'
import { HiLogin } from 'react-icons/hi'
import { FaUserCog } from 'react-icons/fa'
import { FaKey } from 'react-icons/fa'
import { FaShoppingCart } from 'react-icons/fa'


function ProfileOptions(props) {
    const history = useHistory();

    const user = useSelector(state => state.user);

    const handleOpenCart = (event) => {
        props.setDisplayOptions(!props.displayOptions)
        history.push("/orders")
    };

    const handleOpenAdmin = (event) => {
        props.setDisplayOptions(!props.displayOptions)
        history.push("/admin/reviews")
    };

    return ( 
        <div className={styles.container}>
            {
                user && user.rol === 'admin' ?
                    <div className={styles.container_options}>
                        <FaKey/>
                        <span onClick={handleOpenAdmin} className={styles.container_options_span}>Admin</span>
                    </div>
                :
                <></>
            }
            <div className={styles.container_options}>
                <FaUserCog/>
                <span className={styles.container_options_span}>Account</span>
            </div>
            <div className={styles.container_options}>
                <FaShoppingCart/>
                <span onClick={handleOpenCart} className={styles.container_options_span}>Orders</span>
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