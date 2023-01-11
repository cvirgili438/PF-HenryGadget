import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { validate } from '../../../Utils/validateProfileForm.js';
import { Box, Button, Stack, TextField } from "@mui/material";
import { TextareaAutosize } from '@mui/base';
import { Container } from '@mui/system';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../../Firebase/firebase.config.js';
import { setIsLoading } from '../../../Redux/Actions/index.js';
import Loader from '../../Loader/Loader'
import MiniCardCreateProduct from '../../MiniCardCreateProduct/MiniCardCreateProduct.jsx';
import { putProfileUser } from '../../../Redux/Actions/users.js';




export default function UploadImage(props) {

    const dispatch = useDispatch();
  const isLoading = useSelector(state=>state.loading)


  const [errors, setErrors] = useState({});
  const [msg,setMsg] = useState({
    error:'',
    success:''
  })

  const [progress,setProgress]= useState(null)
  const [input, setInput] = useState({
    idUser:props.idUser,
    google:props.google,
    name:'' ,
    phoneNumber:'',
    currentPhoto:props.currentPhoto,
    img:[]
  })

 
  useEffect(() => {
      setErrors(validate(input))
      
}, [input,props])

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
function onClick(e){
    e.preventDefault();
    if(props.disabled === false) {
        e.target.value=''
        setInput({...input,[e.target.name]:''})}
   
}
function handleSubmit(e) {
  e.preventDefault();
  setErrors(validate(input));
  
  if (Object.keys(errors).length === 0 && props.google === false) {
    console.log(props.user)
    dispatch(putProfileUser({
        token:props.token,
        google:false,
        idUser:props.idUser,
        phoneNumber:input.phoneNumber,
        displayName:input.name,
        photoURL:input.img}))               
      setTimeout(()=>{
       setMsg({...msg,success:'Product created successfully'})
      },2500)
      setInput({
        idUser:props.idUser,
        google:props.google,
        name:props.displayName ,
        phoneNumber:'',
        currentPhoto:props.currentPhoto,
        img:[]
      })
    }
  return;
}
  return (
    <Container sx={{display:'flex',flexDirection:'column',justifyContent:'space-between',mt:'1rem',width:'100%'}}>
      <Box sx={{display:'flex',flexDirection:'column'}}>
      <TextField        
        error={Object.keys(errors).length > 0 ? true : false}
        helperText={'Without spaces'}
        label="phoneNumber"
        name="phoneNumber"
        defaultValue={props.phoneNumber || 'Please fill this field' }
        onClick={onClick}
        variant="standard"
        disabled={props.disabled}
        onChange={handleChange}
      />
      <TextField  
        error={Object.keys(errors).length > 0 ? true : false}
        label="Name"
        name="name"
        onClick={e => onClick(e)}
        defaultValue={props.displayName || 'Please fill this field' }
        disabled={props.disabled}
        variant="standard"  
        onChange={handleChange}
      />
      
     
        <div style={{display:'flex'}}>
            {props.currentPhoto !== '' ?(
            <div>
                Your current photo < img src={props.currentPhoto} style={{width:'50px',height:'50px'}} alt='nothing to share' />
            </div>):(<h3 color='red'>You haven't a photo yet</h3>)}
          <Button 
          
          variant='contained'
          component="label"
          disabled={progress > 0 ? true : false || props.disabled}
          // sx={{margin:'0 auto 0 0'}}
          sx={{marginRight:'auto', backgroundColor: 'black',
          color:'white'}}
          color={errors.img &&  'error'}
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
      <Button variant='contained'onClick={handleSubmit} disabled={Object.keys(errors).length > 0 ? true : false} sx={{
        width:'50%',
        margin:'auto',
        backgroundColor: 'black',
        color:'white'}}>Submit</Button>
    </Container>

  )
}
