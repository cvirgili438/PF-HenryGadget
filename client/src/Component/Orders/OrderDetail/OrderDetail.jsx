import React from 'react'
import { useSelector, } from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';

import styles from './OrderDetail.module.css'

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const OrderDetail = () => {

    const { id } = useParams();
    const history = useHistory();
    const order = useSelector(state => state.order)
    const info = order?.find(el => el.id === id);  

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      

  return (
    <Box className={styles.mainContainer}>
        <Button variant="contained" onClick={() => history.goBack()} className={styles.button}>Go Back</Button>
        
            <Typography variant='h3'>Order Number:</Typography>
            <Typography variant='h4'>{id}</Typography>
        
        

        <Box className={styles.tableContainer}>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 650, marginLeft: "auto", marginRight: "auto" , marginTop: "20px", marginBottom: "20px"}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Product</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell align="right">Model</StyledTableCell>
                            <StyledTableCell align="right">Cost ($)</StyledTableCell>
                            <StyledTableCell align="right">Discount (%)</StyledTableCell>
                            <StyledTableCell align="right">Units in the order</StyledTableCell>
                            <StyledTableCell align="right">Total (per product)</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {info.products?.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                   <Link to={`/product/${row.id}`}>{row.name}</Link>
                                </StyledTableCell>
                                <StyledTableCell align="right"><Link to={`/review/${row.id}`}>Make a review</Link></StyledTableCell>
                                <StyledTableCell align="right">{row.model}</StyledTableCell>
                                <StyledTableCell align="right">{row.price}</StyledTableCell>
                                <StyledTableCell align="right">{row.discount == null ? 0 : row.discount}</StyledTableCell>
                                <StyledTableCell align="right">{row.product_order.quantity}</StyledTableCell>
                                <StyledTableCell align="right">{row.price * row.product_order.quantity}</StyledTableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell colSpan={3} rowSpan={3} />
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">$ {info.total}</TableCell>
                        </TableRow>
                        
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">$ {info.total}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        
    </Box>
  )
}

export default OrderDetail