import React from "react";
import Newslatter from "../Newslatter/Newslatter";
import MoreInfo from "../MoreInfo/MoreInfo";
import styles from './Footer.module.css';
import { Link } from "react-router-dom";

const Footer = () => {

  return (
    <div>
      <div className={styles.separador}></div>
      <Newslatter />
      <MoreInfo />

      <div className={styles.container}>
        <div className={styles.column}>
          <div>
            Henry - Part Time 08 - Grupo 5
          </div>
          <div>
            Contact: <a href="mailto:proyectofinalhenrygadget@gmail.com">proyectofinalhenrygadget@gmail.com</a>
          </div>
        </div>
        <div className={styles.column}>
          <div>
            HenryGadget v1.0
          </div>
          <div>
            <a href="https://github.com/cvirgili438/PF-HenryGadget" target='_blank' rel='noreferrer' >github.com/cvirgili438/PF-HenryGadget</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;