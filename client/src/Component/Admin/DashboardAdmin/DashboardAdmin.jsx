import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import styles from './DashboardAdmin.module.css'

import logo from '../../../Assets/logo.png'

const DashboardAdmin = () => {


  return (
    <div className={ styles.container }>
      <Link to='/'><img src={logo} alt='logo' className={ styles.logo }/></Link>
      <div className={ styles.center }>
        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
          <Button component={Link} to="/admin/products" >Products</Button>
          <Button component={Link} to="/admin/orders" >Orders</Button>
          {/* <Button component={Link} to="/admin/mailing" >Mailing</Button> */}
          <Button component={Link} to="/admin/reviews" >Reviews</Button>
          <Button component={Link} to="/admin/users" >Users</Button>
        </ButtonGroup>
      </div>
      <div className={ styles.right }>
        <ButtonGroup>
          <Button component={Link} to="/" >To main</Button>
          <Button component={Link} to="/" >Logout</Button>
        </ButtonGroup>
     </div>
    </div>
  );
};
export default DashboardAdmin;