import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { addProduct } from '../../Redux/Actions/products.js';
import { validate } from '../../Utils/validateCreateForm.js';
import { Box, Button, Stack, TextField, Alert } from "@mui/material";
import { TextareaAutosize } from '@mui/base';
import { Container } from '@mui/system';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../Firebase/firebase.config.js';
import { setIsLoading } from '../../Redux/Actions/index.js';
import Loader from '../Loader/Loader'
import MiniCardCreateProduct from '../MiniCardCreateProduct/MiniCardCreateProduct.jsx';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { CLEAR_CREATE_PRODUCT } from '../../Redux/Constants/index.js';

function CreateProduct() {

  const products = useSelector(state => state.products)
  let productsName = products.map(e => e.name);
  const dispatch = useDispatch();
  const isLoading = useSelector(state=>state.loading)
  const created = useSelector(state => state.createdProduct);

  const [send, setSend] = useState(null);
  const [token, setToken] = useState('');
  const [errors, setErrors] = useState({});
  const [msg,setMsg] = useState({
    error:'',
    success:''
  })

  const [progress,setProgress]= useState(null)
  const [input, setInput] = useState({
    token: '',
    name: '',
    type: '',
    brand: '',
    price: '',
    model: '',
    stock: '',
    camera: '',
    description: '',
    storage: '',
    processor: '',
    ram: '',
    discount: '',
    productsName:productsName,
    img:[]
  })

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((result) => {
          setToken(result);
        });
      }
    });
    return () => {
      dispatch({ type: CLEAR_CREATE_PRODUCT });
    };
  }, []);

  useEffect(() => {
      setErrors(validate(input));
}, [input])

function handleChange(e) {
  setInput({
    ...input,
    [e.target.name]: e.target.value
  });
  setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
  }))
};

  function handleAlert(e) {
    setSend(null);
  };


const handleUpLoad = (e)=>{
    dispatch(setIsLoading())
    const file = e.target.files[0]
    const storageRef = ref(storage, `img/${Date.now()}-${file.name}`)
    const uploaded = uploadBytesResumable(storageRef,file)
    uploaded.on('state_changed',(snapshot)=>{
      const progressFirebase=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
      setProgress(progressFirebase)
    },
    (e)=>{
      setMsg({...msg,error:e.message})
      setTimeout(()=>{
        setMsg({...msg,error:''})
      },2500)
    },
    ()=>{
      getDownloadURL(uploaded.snapshot.ref)
        .then(downLoadUrl => {
          dispatch(setIsLoading())
          setInput(input => ({...input,img:input.img.concat(downLoadUrl)}))
          setErrors(validate({...input,img:downLoadUrl}))
          setMsg({...msg,success:'Image uploaded successfully'})
          setTimeout(()=>{
            setMsg({...msg,success:''})
          },2500)
          setProgress(null)
        })
    })
  }
  

const handleRemoveImg = (e)=>{
  let file = e.target.id
  const deleteRef = ref(storage, file);
  deleteObject(deleteRef)
  .then(()=>{
    let inputWithOutRemovedImg = input.img.filter(e=> e !== file)
    setInput(input => ({...input,img:inputWithOutRemovedImg}))
    setMsg({...msg,success:'Image removed'})
    setTimeout(()=>{
      setMsg({...msg,success:''})
    },2500)
  })
  .catch(e=>{
    setMsg({...msg,error:e.message})
    setTimeout(()=>{
      setMsg({...msg,error:''})
    },2500)
  })
}

function handleSubmit(e) {
  e.preventDefault();
  setErrors(validate(input));
  if (Object.keys(errors).length === 0) {
      dispatch(addProduct(input, token))
      setInput({
        name: '',
        type: '',
        brand: '',
        price: '',
        model: '',
        stock: '',
        productsName:productsName,
        img: []
      })
  }
  return;
}

  return (
    <div>
   <form style={{paddingTop:'10rem',paddingBottom:'10rem',display:'block'}}>
    <h1 style={{marginBottom:"2rem"}}>Create product</h1>
    <Box  sx={{
      display:'flex',
      margin:'auto',
      width:'100%',
      justifyContent:'space-evenly'
    }}>
      <Stack spacing={3} >

        <TextField autoComplete='off' color={!input.name || errors.name ? null: 'success'}  value={input.name} error={errors.name ? true : false} helperText={errors.name ? errors.name : ' '} name='name' label="Product name" variant="outlined" onChange={e => handleChange(e)}></TextField>

        <TextField autoComplete='off' color={!input.brand || errors.brand ? null: 'success'} value={input.brand} error={errors.brand ? true : false} helperText={errors.brand ? errors.brand : ' '} name='brand'label='Brand' variant='outlined' onChange={e => handleChange(e)}></TextField>

        <TextField autoComplete='off' color={!input.type || errors.type ? null: 'success'} value={input.type} error={errors.type ? true : false} helperText={errors.type ? errors.type : ' '} name='type' label='Product type' onChange={e => handleChange(e)}></TextField>

      </Stack>

      <Stack spacing={3} >

        <TextField autoComplete='off' color={!input.price || errors.price ? null: 'success'} error={errors.price ? true : false} helperText={errors.price ? errors.price : ' '} type="number" min={1} name='price' value={input.price} label='Product price'  onChange={e => handleChange(e)}></TextField>

        <TextField autoComplete='off' color={!input.model || errors.model ? null: 'success'} error={errors.model ? true : false} helperText={errors.model ? errors.model : ' '} value={input.model} name='model' label='Product model' onChange={e => handleChange(e)}></TextField>

        <TextField autoComplete='off' color={!input.stock || errors.stock ? null: 'success'} error={errors.stock ? true : false} helperText={errors.stock ? errors.stock : ' '} type="number" min={1} name='stock' value={input.stock} label='Product stock'  onChange={e => handleChange(e)}></TextField>

      </Stack>

      <Stack spacing={3} >
        <TextField autoComplete='off' helperText=' ' value={input.camera} name='camera' label='Product camera' onChange={e => handleChange(e)}></TextField>

        <TextField autoComplete='off' helperText=' ' value={input.storage} name='storage' label='Product storage' onChange={e => handleChange(e)}></TextField>

        <TextField autoComplete='off' helperText=' ' value={input.ram} name='ram' label='Product ram' onChange={e => handleChange(e)}></TextField>
      </Stack>

      <Stack spacing={3} >

        <TextField autoComplete='off' helperText=' ' value={input.processor} name='processor' label='Product processor' onChange={e => handleChange(e)}></TextField>

        <TextField autoComplete='off' helperText=' ' value={input.discount} name='discount' label='Product discount' onChange={e => handleChange(e)}></TextField>

        <TextareaAutosize autoComplete='off' placeholder='Description' minRows={2} value={input.description} name='description' onChange={e => handleChange(e)}></TextareaAutosize>
      </Stack>

    </Box>

    <Container sx={{display:'flex',justifyContent:'space-between',mt:'1rem',width:'100%'}}>
      <Box sx={{display:'flex',flexDirection:'column'}}>
        <div style={{display:'flex'}}>
          <Button 
          variant='contained'
          component="label"
          disabled={progress > 0 ? true : false}
          // sx={{margin:'0 auto 0 0'}}
          style={{marginRight:'auto'}}
          color={errors.img && 'error'}
          >
            {errors.img ? 'Image is required click to upload' : 'Upload images'}
            <input hidden accept="image/*"  type="file" onChange={handleUpLoad} />
          </Button>
          <div style={{width:'5rem' , height:'2rem'}}>
            {isLoading ? <Loader value={progress}/>:null}
          </div>
        </div>
        {input.img.length > 0
        ? input.img.map((e,indx)=>{
         return <MiniCardCreateProduct key={indx} handleRemoveImg={handleRemoveImg} img={e}/>
        })
        : null
        }
        
        
      </Box>
      <p style={{margin:'auto',width:'10rem'}}>{Object.values(msg).length > 0 ? (msg.success || msg.error) : ' '}</p>
      <Button variant='contained'onClick={handleSubmit} disabled={Object.keys(errors).length > 0 ? true : false} sx={{height:'3rem',margin:'0 0 0 auto'}}>Submit</Button>
    </Container>

   </form>
      {created != null ?
        created === true ?
          <Alert severity="success" onClose={e => handleAlert(e)} sx={{ alignItems: 'center' }}>
            <p>Product created satisfactorily.</p>
          </Alert> :
          <Alert severity="error" onClose={e => handleAlert(e)} sx={{ alignItems: 'center' }}>
            <p>An error has occurred. Try again in a moment, please.</p>
          </Alert> :
        null}
  </div>
  )
}

export default CreateProduct