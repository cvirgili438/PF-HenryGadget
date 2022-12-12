import React from "react";
import Newslatter from "../Newslatter/Newslatter";

import styles from './Footer.module.css';

const Footer = () => {

  return (
    <div>
      <Newslatter />

      <div className={styles.container}>
        <div className={styles.column}>
          HenryGadget v0.1<br />Contact: testmail@testmail.com<br />
        </div>
        <div className={styles.column}>
          Column<br />Legal notice / more info / etc
        </div>
      </div>
    </div>
  );
};

export default Footer;