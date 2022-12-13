import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../Button/Button';
import travolta from './../../Assets/pulp-fiction-john-travolta.gif';

import styles from './Page404.module.css';

function Page404() {
  
  return (
    <div className={ styles.container }>
      <span className={ styles.detail }>
      <div className={ styles.text404 }>
        404
      </div>
      <div>
        <img src={travolta} alt='John Travolta meme' className={ styles.image }/>
      </div>
      <div className={ styles.msg1 }>
        oops... you are in the wrong place... 
      </div>
      <div className={ styles.msg2 }>
        (page not found)
      </div>
      <div>
        <Link to='/'>
          <Button text="Back to products page..." />
        </Link>
      </div>
      </span>
    </div>
  );
}

export default Page404;