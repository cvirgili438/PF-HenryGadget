import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { getProductById, clearProduct } from '../../Redux/Actions/products'
import { addReview } from '../../Redux/Actions/review';

import { Alert, Box, Button, Divider, Paper, Stack, Typography, Rating } from "@mui/material";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import StarIcon from '@mui/icons-material/Star'
import styles from './Review.module.css'
import noImage from '../../Assets/noImage.jpg';


const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };
  
function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const Review = () => {

    const auth = getAuth();
    const { id } = useParams();
    const user = useSelector(state => state.user)
    const productDetail = useSelector(state => state.productDetail);
    const dispatch = useDispatch();
    const history = useHistory();
    const [token, setToken] = useState('');
    const [ review, setReview ] = useState({
        score: 0,
        titleComment: "",
        comment: ""
    })
    const [errors, setErrors] = useState({});
    const [send, setSend] = useState(false);
    const [hover, setHover] = useState(-1);

    function validate(review) {
        let errors = {};
        if (!review.score || review.score === 0) {
          errors.score = 'Score your experience please';
        }else if (review.titleComment === "" || review.titleComment.length < 3) {
          errors.titleComment = 'A title is required';
        }else if(review.comment === "" || review.comment.length < 3){
          errors.comment = 'A comment is required';
        }
        return errors;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getProductById(id));

        onAuthStateChanged(auth, (user) => {
			if (user) {
				user.getIdToken().then((result) => {
					setToken(result);
				});
			}
		});

        return function() {
            dispatch(clearProduct())
        };
    }, [])

    useEffect(() => {
        setErrors(validate(review))
    }, [review]);

    let handleImg = (e) => {
        document.getElementById('mainImg').src = e.target.src
    }

    function handleChange(e) {
        setReview({
          ...review,
          [e.target.name]: e.target.value
        });
        
      };

    let handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(review))
        if (Object.keys(errors).length === 0) {
            let info = {
                idProduct: id,
                idUser: user.uid,
                reviewData:{
                    ...review
                }
            }
            dispatch(addReview({token, info}))
            setReview({
                score: 0,
                titleComment: "",
                comment: ""
            })
            setSend(true);
            setTimeout(() => {
                history.goBack();
            }, 3000);
        }
        return;
    }

  return (
    <Box className={styles.mainContainer}>
        <Box sx={{
            "display": 'flex',
            "justifyContent": 'center',
            "flexDirection": 'column',
            "borderRight": '1px solid #f6f6f6',
            "alignItems": 'center'
        }}>
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
                                    <Paper 
                                        sx={{
                                            "width": 100,
                                            "display": 'flex',
                                            "alignItems": 'center',
                                            "justifyContent": 'center'
                                        }} 
                                        key={i}>
                                        <img onClick={e => handleImg(e)} style={{ width: '5rem' }} src={e} alt={productDetail.name} />
                                    </Paper>)
                            })
                        }
                    </Stack>
        </Box>

        <div className={`col-xs-5 w-75`} style={{ border: '0px solid gray' }}>
            <Typography variant="h6" color="initial">We would like to hear about your experience getting this product so please give us a review</Typography>

            <Box
                sx={{
                    width: '40%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    margin: '10px auto'
                  }}
            >
                <Typography variant='body1' color="initial">Product: {productDetail.name}</Typography>
            </Box>

            <Box
                sx={{
                    width: '40%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginRight: 'auto', 
                    marginLeft: 'auto'
                  }}
            >
                <Typography variant='body1' color="initial">Score:</Typography>
                <Rating
                    sx={{
                        marginLeft: '20px'
                    }}
                    name="hover-feedback"
                    value={review.score}
                    size="large"
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                        setReview({...review, score: newValue});
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {review.score !== null && (
                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : review.score]}</Box>
                )}
            </Box>
                {errors.score && !send && (
                    <Alert severity="error" sx={{alignItems: 'center', width: 430, margin:'10px auto'}}>
                        <p className={`${styles.p}`}>{errors.score}</p>
                    </Alert>
                )}

            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        id="outlined-error"
                        label="Title"
                        value={review.titleComment}
                        name="titleComment"
                        onChange={handleChange}
                    />
                   
                </div>
                {errors.titleComment && !send && (
                    <Alert severity="error" sx={{alignItems: 'center', width: 430, margin:'10px auto'}}>
                        <p className={`${styles.p}`}>{errors.titleComment}</p>
                    </Alert>
                )}
                <div>
                    <TextField
                        id="outlined-multiline-static"
                        label="Tell us more about your experience"
                        multiline
                        rows={4}
                        name="comment"
                        onChange={handleChange}
                    />
                </div>
                {errors.comment && !send && (
                    <Alert severity="error" sx={{alignItems: 'center', width: 430, margin:'10px auto'}} >
                        <p className={`${styles.p}`}>{errors.comment}</p>
                    </Alert>
                )}
            </Box>

            <Box>
                <Button variant="contained" onClick={handleSubmit} endIcon={<SendIcon />}  disabled={Object.keys(errors).length > 0 || review.score === 0 ? true : false} >Send</Button>
                {send && (
                    <Alert severity="success" sx={{alignItems: 'center', width: 500, margin:'10px auto'}} >
                        <p className={`${styles.p}`}> Your review has been sent, you are going to be redirect to your order detail</p>
                    </Alert>
                )}
            </Box>
        </div>


    </Box>
  )
}

export default Review