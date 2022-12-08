import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from './ModalRegister.module.css'

function ModalRegister(props) {
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
                <div className={styles.body_modal_thirdparties}>
                    
                </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }


export default ModalRegister