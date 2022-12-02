import React from "react";

import styles from './Footer.module.css';

const Footer = () => {

  return (
    <div className={ styles.container }>
      <div className={ styles.column }>
        Column<br />Contact info / mail / phone / social 
      </div>
      <div className={ styles.column }>
        Column<br />Legal notice / more info / etc 
      </div>
    </div>
  );
};

export default Footer;