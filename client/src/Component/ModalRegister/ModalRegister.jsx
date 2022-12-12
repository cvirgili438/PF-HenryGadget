import React, { useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Separator from "../Separator/Separator";
import styles from "./ModalRegister.module.css";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../Firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";  
import { GrFacebook } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { loginApp } from "../../Redux/Actions/users";
import { setIsLoading } from '../../Redux/Actions/index'

function ModalRegister(props) {
  const [displayRegisterModal, setDisplayRegisterModal] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const isLoading = useSelector(state => state.loading)
 
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
    email_login:""
  }

  const [input,setInput] = useState({
    name:"",
    lastname:"",
    email:"",
    password:"",
    password_login:"",
    email_login:""
  })

  const login = async (e) => {
    if (e.target.id === "google") {
      const {
        user: { providerData },
      } = await signInWithPopup(firebaseAuth, provider.google);
      console.log(providerData[0])
      dispatch(loginApp(providerData[0]));
      localStorage.setItem("user", JSON.stringify(providerData[0]));
      props.onHide();
    }
    if (e.target.id === "facebook") {
      const {
        user: { providerData },
      } = await signInWithPopup(firebaseAuth, provider.facebook);
    }
  };

  const handleDisplayRegisterModal = () => {
    setDisplayRegisterModal(!displayRegisterModal);
  };

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const email = input.email;
    const name = input.name;
    const lastname = input.lastname;
    const password = input.password;
    dispatch(setIsLoading(!isLoading))
    try{
      const {user: {providerData}} = await createUserWithEmailAndPassword(firebaseAuth,email,password)
      await updateProfile(firebaseAuth.currentUser,{
        displayName:name
      })
      localStorage.setItem("user", JSON.stringify(providerData[0]));
      dispatch(loginApp(providerData[0]))
      dispatch(setIsLoading(!isLoading)).then(()=> setTimeout(()=>{
        props.onHide()
        setDisplayRegisterModal(!displayRegisterModal);
        setInput(initialState)
      },1000))
    }catch(e){
      console.log(e.message)
      dispatch(setIsLoading(!isLoading))
    }
  }

  const handleLogin = async ()=>{
    dispatch(setIsLoading(!isLoading))
    const email = input.email_login
    const password = input.password_login
    try{
      const {user:{providerData}} = await signInWithEmailAndPassword(firebaseAuth,email,password);
      localStorage.setItem("user", JSON.stringify(providerData[0]));
      dispatch(loginApp(providerData[0]))
      dispatch(setIsLoading(!isLoading))
      setInput(initialState)
      props.onHide()
    }catch(e){
      console.log(e.message)
    }
   
  }

  const handleInput = (e)=>{
    setInput({...input,[e.target.name]:e.target.value})
    console.log(e.target.value)
  }

  return (
    <Modal
      {...props}
      size="m"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={styles.container}
    >
      {!displayRegisterModal ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
             Enter to my account
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={styles.body_modal_container}>
              <div className={styles.body_modal_container_inputs}>
                <label>Email</label>
                <input onChange={handleInput} value={input.email_login} name="email_login" type="email" />
                <label>Password</label>
                <input onChange={handleInput} value={input.password_login} name='password_login' type="password" />
              </div>
              <Button variant="primary" onClick={handleLogin} className={styles.body_modal_button}>
                Login
              </Button>
              <Separator title="Or sign in with" />
              <div className={styles.body_modal_thirdparties}>
                <FcGoogle
                  onClick={login}
                  className={styles.google_icon}
                  id="google"
                />
                <GrFacebook className={styles.facebook_icon} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className={styles.container_footer}>
              {/* <Button onClick={props.onHide}>Close</Button> */}
              <Button
                className={styles.container_footer_button}
                variant="primary"
                size="lg"
                onClick={handleDisplayRegisterModal}
              >
                Register
              </Button>
            </div>
          </Modal.Footer>
        </>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Create account
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form className={styles.register_body_modal_container}>
                <div className={styles.register_body_modal_container_nameInputs}>
                    <input className={styles.register_inputs} type="text" onChange={handleInput} name="name" value={input.name} placeholder="First name"/>
                    <input className={styles.register_inputs} type="text" onChange={handleInput} name="lastname" value={input.lastname} placeholder="Last name" />
                </div>
                <div className={styles.register_body_modal_container_inputs}>
                    <input className={styles.register_inputs} onChange={handleInput} name="email" type="email" value={input.email} placeholder="Email"/>
                    <input className={styles.register_inputs} onChange={handleInput} name="password" type='password' value={input.password} placeholder='Password'/>
                    <input className={styles.register_inputs} type="password" placeholder='Confirm password'/>
                </div>
              </form>
          </Modal.Body>
          <Modal.Footer>
            <div className={styles.register_container_footer}>
              {/* <Button onClick={props.onHide}>Close</Button> */}
              <Button
                className={styles.register_container_footer_button}
                variant="primary"
                size="lg"
                onClick={handleDisplayRegisterModal}
              >
                Back
              </Button>
              <Button
                className={styles.register_container_footer_button}
                variant="success"
                size="lg"
                onClick={!isLoading ? handleSubmit : null}
                disable={isLoading.toString()}
              >
                {isLoading ? 'Loading...' : 'Register'}
              </Button>
            </div>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}

export default ModalRegister;
