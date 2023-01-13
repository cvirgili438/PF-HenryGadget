import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./ModalRegister.module.css";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { app } from "../../Firebase/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { setUserInFrontState, checkUserStatus } from "../../Redux/Actions/users";
import { setIsLoading } from '../../Redux/Actions/index'
import { loginApp } from "../../Redux/Actions/users";
import ModalForgotPassword from "./ModalForgotPassword";
import ModalRegister from "./ModalRegister";
import ModalLogin from "./ModalLogin";
import ModalAccountSuspended from "./ModalAccountSuspended";
import validateRegister from "../../Utils/ValidateRegister/ValidateRegister";

import { logUserActivity } from "../../Redux/Actions/users";

function ModalUser(props) {
  const [displayRegisterModal, setDisplayRegisterModal] = useState(false);
  const isLoading = useSelector(state => state.loading)
  const [displayForgotPassword, setDisplayForgotPassword] = useState(false);
  const [displayAccountSuspended, setDisplayAccountSuspended] = useState(false);
  
  const dispatch = useDispatch();

  const firebaseAuth = getAuth(app);
  
  const provider = {
    google: new GoogleAuthProvider(),
    facebook: new FacebookAuthProvider(),
  };

  const initialState = {
    name:"",
    lastname:"",
    email:"",
    password:"",
    password_login:"",
    email_login:"",
    email_restore:""
  }


  const [input,setInput] = useState({
    name:"",
    lastname:"",
    email:"",
    password:"",
    confirmPassword:'',
    password_login:"",
    email_login:"",
    email_restore:""
  })
  
  const [userStatus, setUserStatus] = useState(null);

  const [errors,setErrors] = useState({})


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickConfrimPassword = ()=>setShowConfirmPassword((show)=> !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const login = async (e) => {
    
    if (e.target.id === "google") {
      const {
        user: { providerData, uid },
        _tokenResponse:{ idToken },
      } = await signInWithPopup(firebaseAuth, provider.google);
      dispatch(loginApp(idToken))
      .then(res=>{
        providerData[0].rol = res.result[0].rol
        providerData[0].uid = uid
        localStorage.setItem("user", JSON.stringify(providerData[0]));
        dispatch(setUserInFrontState(providerData[0]));
        dispatch(logUserActivity(providerData[0]));
      })
      .catch(e=>{
        setErrors({...errors,msg:e.message})
      })
      .finally(()=>props.onHide())
      
    }
    if (e.target.id === "facebook") {
      const {
        user: { providerData },
      } = await signInWithPopup(firebaseAuth, provider.facebook);
    }
  };

  const handleDisplayRegisterModal = () => {
    setDisplayRegisterModal(!displayRegisterModal);
    setInput(initialState)
  };

  const handleDisplayForgotPassword = ()=>{
    setDisplayForgotPassword(!displayForgotPassword)
    setInput({...input,email_restore:''})
    setErrors({})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const email = input.email;
    const name = input.name;
    const lastname = input.lastname;
    const password = input.password;
    dispatch(setIsLoading(!isLoading))
    try{
      createUserWithEmailAndPassword(firebaseAuth,email,password)
      .then((response)=>{
        if(response.user !== null)
        sendEmailVerification(firebaseAuth.currentUser)
        updateProfile(firebaseAuth.currentUser,{
          displayName:name
        })
    })
      dispatch(setIsLoading(!isLoading))
      .then(()=> 
        setTimeout(()=>{
        setDisplayRegisterModal(!displayRegisterModal);
        setErrors({...errors,msg:'Check your email to verify your account'})
        setInput(initialState=> ({...initialState,email_login:email,password_login:password}))
      },500))
     
    }catch(e){
      if(e.message === 'Firebase: Error (auth/email-already-in-use).')setErrors({...errors,email:'Email already in use'})
      dispatch(setIsLoading(!isLoading))
    } 
  }

  const handleLogin = async ()=>{
    const email = input.email_login
    const password = input.password_login
    try{

      if(!password || !email){
        if(!password){
          setErrors({...errors,msg_password:'Wrong password'})
        }
        if(!email){
          setErrors({...errors,msg_email:'Invalid email'})

        }
        return
      }
      
      dispatch(checkUserStatus(email))
      .then(res => {
        setUserStatus(res);
        })

      if(userStatus.forceNewPassword) {
        setDisplayForgotPassword(true);
      } else if (userStatus.active === false) {
        setDisplayAccountSuspended(true);
      } else {
        // const {user: {providerData, uid}, _tokenResponse:{idToken}} = await signInWithEmailAndPassword(firebaseAuth,email,password);
        const userDataFirebase = await signInWithEmailAndPassword(firebaseAuth,email,password);

        if(userDataFirebase.user.emailVerified){
          dispatch(setIsLoading(!isLoading))
          dispatch(loginApp(userDataFirebase.user.accessToken))
          .then(res=> {
            userDataFirebase.user.providerData[0].rol = res.result[0].rol
            userDataFirebase.user.providerData[0].uid = userDataFirebase.user.uid
            localStorage.setItem("user", JSON.stringify(userDataFirebase.user.providerData[0]));
            dispatch(setUserInFrontState(userDataFirebase.user.providerData[0]))
          }
          )
          .finally(()=>{
            dispatch(setIsLoading(!isLoading))
            setInput(initialState)
            setErrors({})
            props.onHide()
          })
        }else throw Error('Check your email to verify your account')
      }
    }catch(e){
      if(e.message === 'Firebase: Error (auth/invalid-email).')setErrors({...errors,msg_email:'Invalid email'})
      if(e.message === 'Firebase: Error (auth/wrong-password).')setErrors({...errors,msg_password:'Wrong Password'})
      if(e.message === 'Firebase: Error (auth/internal-error).')setErrors({...errors,msg:e.message})
      if (e.message === 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).')setErrors({...errors,msg:'Too many request, try again later or reset your password'})
      if(e.message === 'Check your email to verify your account')setErrors({...errors,msg:e.message})
      if(e.message === 'Firebase: Error (auth/user-not-found).')setErrors({...errors,msg_email:'User not found'})
      dispatch(setIsLoading(!isLoading))
    }
   
  }  


  const forgotPassword = (email)=> {

    sendPasswordResetEmail(firebaseAuth,email)
    .then(()=>{
      props.handleDisplayForgotPassword(!handleDisplayForgotPassword)
    })
    .catch((e)=>{
      if(e.message === 'Firebase: Error (auth/user-not-found).')setErrors({...errors,msg_password_restore:'Email not found'})
      if(e.message === 'Firebase: Error (auth/invalid-email).')setErrors({...errors,msg_password_restore:'Invalid email'})
    })
  }

  const handleInput = (e)=>{
    setInput({...input,[e.target.name]:e.target.value})
    setErrors(validateRegister({...input,[e.target.name]:e.target.value}))  
  }

  const handleDisplayAccountSuspended = () => {
    setDisplayAccountSuspended(!displayAccountSuspended)
  }

  return (
    <Modal
      {...props}
      size="m"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={styles.container}
    > 
      {
      displayAccountSuspended ?
      <ModalAccountSuspended handleDisplayAccountSuspended={handleDisplayAccountSuspended} errors={errors} ></ModalAccountSuspended>
      :
      displayForgotPassword 
      ? <ModalForgotPassword handleDisplayForgotPassword={handleDisplayForgotPassword} errors={errors} input={input} handleInput={handleInput} forgotPassword={forgotPassword} ></ModalForgotPassword>
      :
      !displayRegisterModal ? (
        <ModalLogin handleInput={handleInput} input={input} showPassword={showPassword} handleClickShowPassword={handleClickShowPassword}handleMouseDownPassword={handleMouseDownPassword} handleDisplayForgotPassword={handleDisplayForgotPassword} handleLogin={handleLogin} login={login} handleDisplayRegisterModal={handleDisplayRegisterModal} errors={errors} />
      ) : (
        <ModalRegister handleClickConfrimPassword={handleClickConfrimPassword} showConfirmPassword={showConfirmPassword} handleClickShowPassword={handleClickShowPassword} handleMouseDownPassword={handleMouseDownPassword} showPassword={showPassword} input={input} handleDisplayRegisterModal={handleDisplayRegisterModal} isLoading={isLoading} handleInput={handleInput} handleSubmit={handleSubmit} errors={errors} setErrors={setErrors}/>
      )}
    </Modal>
  );
}

export default ModalUser;
