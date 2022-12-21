import React from "react"
import { Link } from "react-router-dom"

import styles from './MiniNav.module.css'

const MiniNav = () => {

    return (
        <nav>
            <ul className={styles.miniNav}>
                <Link to='/'>
                    <li>Inicio</li>
                </Link>

                <Link to='/home'>
                    <li>Products</li>
                </Link>
            </ul>
        </nav>

    )
}



export default MiniNav