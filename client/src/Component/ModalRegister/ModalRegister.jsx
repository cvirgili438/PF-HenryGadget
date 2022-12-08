import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Separator from '../Separator/Separator';
import styles from './ModalRegister.module.css'
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider} from 'firebase/auth'
import { app } from '../../Firebase/firebase.config'
import { FcGoogle } from 'react-icons/fc'
import { GrFacebook } from 'react-icons/gr'
import { useDispatch } from 'react-redux'
import { setUser } from '../../Redux/Action';

function ModalRegister(props) { 
    
    const dispatch = useDispatch();
    const firebaseAuth = getAuth(app)
    const provider ={ 
        google: new GoogleAuthProvider(),
        facebook: new FacebookAuthProvider()
    }
    const login = async (e)=>{
        if(e.target.id === "google"){
            const {user:{providerData}} = await signInWithPopup(firebaseAuth,provider.google)
            dispatch(setUser(providerData[0]))
            localStorage.setItem('user', JSON.stringify(providerData[0]))
            props.onHide()
        }
        if(e.target.id === 'facebook'){
            const {user:{providerData}} = await signInWithPopup(firebaseAuth,provider.facebook)
        }
    }


    return (
        <Modal
          {...props}
          size="m"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className={styles.container}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Enter to my account
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={styles.body_modal_container}>
                <div className={styles.body_modal_container_inputs}>
                    <label>Email</label>
                    <input type="email" />
                    <label>Password</label>
                    <input type="password"/>
                </div>
                <Button className={styles.body_modal_button}>Login</Button>
                <Separator title="Or sign in with" />
                <div className={styles.body_modal_thirdparties}>
                    <FcGoogle onClick={login} className={styles.google_icon} id="google"/>
                    <GrFacebook className={styles.facebook_icon}/>
                </div>
            </div>
          </Modal.Body>
          <Modal.Footer  className={styles.container_footer}>
            <div>
             {/* <Button onClick={props.onHide}>Close</Button> */}
             <Button variant="dark" size='lg'>Register</Button>
            </div>
          </Modal.Footer>
        </Modal>
      );
    }


export default ModalRegister