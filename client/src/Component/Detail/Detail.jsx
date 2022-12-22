import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Alert, Box, Container, Divider, Paper, Stack, Grid, Typography, Rating } from "@mui/material";
import { getProductById } from '../../Redux/Actions/products'
import { addProductCart, getQuantityProductCart } from "../../Utils/cart/cartCrud.js";
import { product_area, item_photo, img_mini } from "./UtilDetail";
import Separator from "../Separator/Separator";
import styles from "./Detail.module.css";
import noImage from '../../Assets/noImage.jpg';

const Detail = () => {
    const { id } = useParams();
    const user = useSelector(state => state.user)
    const [input, setInput] = useState({ value: 1 })
    const [lowStock, setLowStock] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductById(id));
    }, []);

    useEffect(async () => {
        setLowStock(input.value > (productDetail.stock - await getQuantityProductCart(productDetail.id, user && user.uid)));
    }, [input]);

    let productDetail = useSelector(state => state.productDetail);
    // let reviews = productDetail.reviews

    function averageProductRating(reviews) {
        let acu = 0;
        for (const review of reviews) {
            acu += parseInt(review.score)
        }
        return acu / reviews.length
    }

    function handleCart() {
        addProductCart(productDetail.id, user && user.uid, input.value);
    }

    let handleCount = (e) => {
        if (e.target.id === 'minus' || e.target.id === 'i-minus') {
            input.value === 1 ? setInput({ value: 1 })
                : setInput({ value: parseInt(input.value) - 1 })
        }
        else if (e.target.id === 'plus' || e.target.id === 'i-plus') {
            setInput({ value: parseInt(input.value) + 1 })
        }
    }

    let handlerChange = (e) => {
        if (!e.target.value.match(/^[1-9]\d*$/)) {
            e.target.value = '';
            setInput({ value: '' })
        }
        setInput({ value: e.target.value.toString() })
    }

    let handleImg = (e) => {
        document.getElementById('mainImg').src = e.target.src
    }

    return (

        <Container>
            <Box sx={product_area}>
                <Box sx={item_photo}>
                    {
                        !productDetail.img ?
                            <img className={styles.main_img} src={noImage} alt='Not available' />
                            :
                            productDetail.img.length === 0 ?
                                <img className={styles.main_img} src={noImage} alt='Not available' />
                                :
                                <img id="mainImg" className={styles.main_img} src={productDetail.img[0]} alt={productDetail.name} />
                    }
                    <Stack
                        mt={5}
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={1}>
                        {
                            productDetail.img && productDetail.img.map((e, i) => {
                                return (
                                    <Paper sx={img_mini} key={i}>
                                        <img onClick={e => handleImg(e)} style={{ width: '5rem' }} src={e} alt={productDetail.name} />
                                    </Paper>)
                            })
                        }
                    </Stack>
                </Box>
                <div className={`col-xs-5 w-75`} style={{ border: '0px solid gray' }}>
                    {/* <!-- Datos del vendedor y titulo del producto --> */}
                    <h3>{productDetail.name}</h3>
                    <h5 style={{ color: '#337ab7' }}>{productDetail.name}</h5>

                    {/* <!-- Precios --> */}
                    <h6 className={`${styles.title_price}`}><small>PRECIO OFERTA</small></h6>
                    <h3 style={{ margin: '0px' }}>${productDetail.price}</h3>

                    {/* <!-- Detalles especificos del producto --> */}

                    <div className={`${styles.section}`} style={{ padding: '5px' }}>
                        <h6 className="title-attr"><small>CAPACIDAD</small></h6>
                        <div>
                            <div className={`${styles.attr2}`}>{!productDetail.storage ? '-n/a-' : productDetail.storage.size}</div>
                        </div >
                    </div >
                    <div className={`${styles.section}`} style={{ padding: '20px' }}>
                        <h6 className={`${styles.title_attr}`}><small>CANTIDAD</small></h6>
                        <Box>
                            <button onClick={e => handleCount(e)} id="minus" className={`${styles.btn_minus}`}><i id="i-minus" className="bi bi-caret-left"></i></button>
                            <input onChange={e => handlerChange(e)} value={input.value} />
                            <button onClick={e => handleCount(e)} id="plus" className={`${styles.btn_plus}`}><i id="i-plus" className="bi bi-caret-right"></i></button>
                        </Box>
                        {lowStock && <Alert xs={{ width: 100 }}
                            variant="outlined" severity="error">
                            There is not enough stock!
                        </Alert>}

                        {input.value === '' && <Alert xs={{ width: 100 }}
                            variant="outlined" severity="error">
                            Stock must not be empty.
                        </Alert>}
                    </div>

                    {/* <!-- Botones de compra --> */}
                    <div className={`${styles.section}`} style={{ padding: '20px' }}>
                        <button className={`${styles.btn_success} btn btn-success`} onClick={handleCart} disabled={lowStock || input.value === ''} >Agregar al carro</button>
                        <button className={`${styles.btn_success} btn btn-outline-success`} disabled={lowStock || input.value === ''}>Comprar</button>
                    </div>
                </div >
            </Box>

            <div>
                <Separator title='Características' />

                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <strong>Almacenamiento</strong>
                        <div className={`p-5`}><span><i className={`bi bi-sd-card`}></i></span>{!productDetail.storage ? '-n/a-' : productDetail.storage.size}</div>
                    </Grid>
                    <Grid item xs={4}>
                        <strong>Camara</strong>
                        <div className={`p-5`}><span><i className="bi bi-camera"></i></span>{!productDetail.camera ? '-n/a-' : productDetail.camera}</div>
                    </Grid>
                    <Grid item xs={4}>
                        <strong>Procesador</strong>
                        <div className={`p-5`}><span><i className="bi bi-cpu"></i></span>{!productDetail.processor ? '-n/a-' : productDetail.processor}</div>
                    </Grid>
                </Grid>

                <Separator title='Descripción' />
                <div className={`container`}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis incidunt reiciendis hic possimus, architecto, id sapiente a nostrum consequatur doloribus nesciunt dolores. Repellendus, repudiandae quidem. Ut recusandae reprehenderit fuga saepe!</p>
                </div>

                <Separator title={'Opiniones del producto'} />
                <Grid container >
                    <Grid container xs={3}>
                        <Grid item xs={2}>
                            <Typography
                                component="h1">{averageProductRating(productDetail.reviews).toFixed(1)}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Rating
                                sx={{mt: 1}}
                                name="read-only"
                                value={averageProductRating(productDetail.reviews)}
                                precision={0.5}
                                readOnly
                            />
                        </Grid>

                    </Grid>
                    <Grid item xs={6}>
                        {productDetail.reviews.map(e => {
                            return(
                            <p key={e.id}>{e.comment}</p>)}    
                        )}
                        
                    </Grid>
                </Grid>
            </div>
        </Container >
    )
}


export default Detail