import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Alert, Box, Container, Divider, Paper, Stack, Grid, Typography, Rating, LinearProgress } from "@mui/material";
import { getProductById, clearProduct } from '../../Redux/Actions/products'
import { addProductCart, getQuantityProductCart } from "../../Utils/cart/cartCrud.js";
import { product_area, item_photo, img_mini } from "./UtilDetail";
import Separator from "../Separator/Separator";
import styles from "./Detail.module.css";
import noImage from '../../Assets/noImage.jpg';
import { AverageRating, IndexScore } from "../../Utils/Rating/controller";
import StarIcon from '@mui/icons-material/Star';
import RecipeReviewCard from "../ReviewCard/ReviewCard";

const Detail = () => {
    const { id } = useParams();
    const user = useSelector(state => state.user)
    const productDetail = useSelector(state => state.productDetail);
    const [input, setInput] = useState({ value: 1 })
    const [lowStock, setLowStock] = useState(false);
    const reviews = productDetail.reviews;

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getProductById(id));

        async function set() {
            setLowStock(input.value > (productDetail.stock - await getQuantityProductCart(productDetail.id, user && user.uid)));
            }
            set();

        return function () {
            dispatch(clearProduct())
        };
    }, []);

    useEffect(async () => {
        setLowStock(input.value > (productDetail.stock - await getQuantityProductCart(productDetail.id, user && user.uid)));
    }, [input]);


    let handleCart = async (e) => {
        await addProductCart(productDetail.id, user && user.uid, input.value);
    }

    let handleBuy = async (e) => {
        await addProductCart(productDetail.id, user && user.uid, input.value);
        history.push("/checkout");
    };

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
                    <h6 className={`${styles.title_price}`}><small>PRICE</small></h6>
                    <h3 style={{ margin: '0px' }}>${productDetail.price}</h3>

                    {/* <!-- Detalles especificos del producto --> */}

                    <div className={`${styles.section}`} style={{ padding: '5px' }}>
                        <h6 className="title-attr"><small>STORAGE</small></h6>
                        <div>
                            <div className={`${styles.attr2}`}>{!productDetail.storage ? '-n/a-' : productDetail.storage.size}</div>
                        </div >
                    </div >
                    <div className={`${styles.section}`} style={{ padding: '20px' }}>
                        <h6 className={`${styles.title_attr}`}><small>ITEMS</small></h6>
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
                        <button className={`${styles.btn_success} btn btn-success`} onClick={(e) => handleCart(e)} disabled={lowStock || input.value === ''} >Add to cart</button>
                        <button className={`${styles.btn_success} btn btn-outline-success`} disabled={lowStock || input.value === ''}>Buy Now</button>
                    </div>
                </div >
            </Box>

            <div>
                <Separator title='Features' />

                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <strong>Storage</strong>
                        <div className={`p-5`}><span><i className={`bi bi-sd-card`}></i></span>{!productDetail.storage ? '-n/a-' : productDetail.storage.size}</div>
                    </Grid>
                    <Grid item xs={4}>
                        <strong>Camera</strong>
                        <div className={`p-5`}><span><i className="bi bi-camera"></i></span>{!productDetail.camera ? '-n/a-' : productDetail.camera}</div>
                    </Grid>
                    <Grid item xs={4}>
                        <strong>Processor</strong>
                        <div className={`p-5`}><span><i className="bi bi-cpu"></i></span>{!productDetail.processor ? '-n/a-' : productDetail.processor}</div>
                    </Grid>
                </Grid>

                <Separator title='Description' />
                <div className={`container`}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis incidunt reiciendis hic possimus, architecto, id sapiente a nostrum consequatur doloribus nesciunt dolores. Repellendus, repudiandae quidem. Ut recusandae reprehenderit fuga saepe!</p>
                </div>

                <Separator title={'Product Reviews'} />
                {
                    reviews && reviews.length > 0 ?
                        <Grid container >
                            <Grid container item xs={4} sx={{ paddingBottom: '28rem' }}>
                                <Grid item xs={2}>
                                    <Typography
                                        fontSize={40}
                                        fontWeight={600}
                                        component="h1">{reviews ? AverageRating(reviews).toFixed(1) : '-n/a-'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Rating  //estrellas
                                        sx={{ padding: 'auto' }}
                                        name="read-only"
                                        value={reviews ? Number(AverageRating(reviews).toFixed(1)) : 1}
                                        precision={0.5}
                                        readOnly
                                    />
                                    <Grid item xs={12}>
                                        {`${reviews.length} Reviews`}
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    {IndexScore(reviews).map((e, i) => {
                                        return (<Grid key={i} item xs={10}>
                                            <Box sx={{ pt: 1 }}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={e}
                                                /> {i + 1} <StarIcon
                                                    fontSize="small"
                                                    sx={{ color: "#d1cfcb" }}
                                                />
                                            </Box>
                                        </Grid>)
                                    })}
                                </Grid>
                            </Grid>
                            <Grid item xs={8} sx={{ py: 3 }}>
                                {reviews.map(e => {
                                    return (
                                        <Box key={e.id} >
                                            <RecipeReviewCard key={e.id} review={e} />
                                        </Box>
                                        // <p key={e.id}>{e.comment}</p>
                                    )
                                })
                                
                                }

                            </Grid>
                        </Grid> :
                    <div style={{padding: '3rem', border: '2px dashed green'}}>No tenemos reviews de este producto, se el primero en comentar 😉</div>
                }
            </div>
        </Container >
    )
}


export default Detail