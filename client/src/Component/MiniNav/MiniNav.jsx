import React from "react"
import styles from './MiniNav.module.css'
import { Link } from "react-router-dom"

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