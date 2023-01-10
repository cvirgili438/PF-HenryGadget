import React from "react"
import { Link } from "react-router-dom"
import ButtonBorderEffect from "../Buttons/ButtonBorderEffect/ButtonBorderEffect"
import styles from './MiniNav.module.css'

const MiniNav = ({ pathname }) => {

    return (
        <div className={styles.main}>
            <Link to='/'>
                <span className={styles.separator}>
                    <ButtonBorderEffect text='Home' />
                </span>
            </Link>
            <Link to='/products'>
                <span className={styles.separator}>
                    <ButtonBorderEffect text='Store' />
                </span>
            </Link>
            {pathname === '/'
                ? (
                    <>
                        <a href="#anchor-services">
                            <span className={styles.separator}>
                                <ButtonBorderEffect text='Our services' />
                            </span>
                        </a>
                        <a href='#anchor-featured'>
                            <span className={styles.separator}>
                                <ButtonBorderEffect text='Featured products' />
                            </span>
                        </a>
                        <a href='#anchor-about'>
                            <span className={styles.separator}>
                                <ButtonBorderEffect text='About us' />
                            </span>
                        </a>
                    </>
                )
                :
                null
            }
        </div>

    )
}



export default MiniNav