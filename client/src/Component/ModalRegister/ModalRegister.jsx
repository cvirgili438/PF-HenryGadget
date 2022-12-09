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
} from "firebase/auth";
import { app } from "../../Firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { loginWithThirdParties } from "../../Redux/Actions/users";

function ModalRegister(props) {
  const [register, setRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  const dispatch = useDispatch();
  const firebaseAuth = getAuth(app);
  const provider = {
    google: new GoogleAuthProvider(),
    facebook: new FacebookAuthProvider(),
  };

  const login = async (e) => {
    if (e.target.id === "google") {
      const {
        user: { providerData },
      } = await signInWithPopup(firebaseAuth, provider.google);
      dispatch(loginWithThirdParties(providerData[0]));
      localStorage.setItem("user", JSON.stringify(providerData[0]));
      props.onHide();
    }
    if (e.target.id === "facebook") {
      const {
        user: { providerData },
      } = await signInWithPopup(firebaseAuth, provider.facebook);
    }
  };

  const handleRegister = () => {
    setRegister(!register);
  };

  const handleSubmit = ()=>{
    setIsLoading(true)
  }

  return (
    <Modal
      {...props}
      size="m"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={styles.container}
    >
      {!register && !props.modalShow ? (
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
                <input type="email" />
                <label>Password</label>
                <input type="password" />
              </div>
              <Button variant="primary" className={styles.body_modal_button}>
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
                onClick={handleRegister}
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
              <div className={styles.register_body_modal_container}>
                <div className={styles.register_body_modal_container_nameInputs}>
                    <input className={styles.register_inputs} type="text" placeholder="First name"/>
                    <input className={styles.register_inputs} type="text" placeholder="Last name" />
                </div>
                <div className={styles.register_body_modal_container_inputs}>
                    <input className={styles.register_inputs} type="email" placeholder="Email"/>
                    <input className={styles.register_inputs} type='password' placeholder='Password'/>
                    <input className={styles.register_inputs} type="password" placeholder='Confirm password'/>
                </div>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <div className={styles.register_container_footer}>
              {/* <Button onClick={props.onHide}>Close</Button> */}
              <Button
                className={styles.register_container_footer_button}
                variant="primary"
                size="lg"
                onClick={handleRegister}
              >
                Back
              </Button>
              <Button
                className={styles.register_container_footer_button}
                variant="success"
                size="lg"
                onClick={!isLoading ? handleSubmit : null}
                disable={isLoading}
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
