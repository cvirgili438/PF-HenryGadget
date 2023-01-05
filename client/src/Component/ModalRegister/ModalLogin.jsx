import React from "react";
import Modal from "react-bootstrap/Modal";
import Separator from "../Separator/Separator";
import styles from "./ModalRegister.module.css";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { FormHelperText, Typography ,Button } from "@mui/material";
import { Button_contained_primary } from "../../Utils/MiuStyles/MiuStyles";

function ModalLogin({
  handleInput,
  input,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
  handleDisplayForgotPassword,
  handleLogin,
  login,
  handleDisplayRegisterModal,
  errors,
}) {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter to my account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.body_modal_container}>
          {errors.msg ? <p style={{ color: "orange",border:'2px solid orange',borderRadius:'8px',padding:'5px' }}>{errors.msg}</p> : null}
          <div className={styles.body_modal_container_inputs}>
            <FormControl sx={{ mt: "1rem" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
              <OutlinedInput
                id='"outlined-adornment-email"'
                type="email"
                onChange={handleInput}
                value={input.email_login}
                name="email_login"
                label="Email"
              />
              <FormHelperText sx={{ color: "orange" }}>
                {errors.msg_email ? errors.msg_email : " "}
              </FormHelperText>
            </FormControl>

            <FormControl sx={{ mt: "1rem" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id='"outlined-adornment-password"'
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                onChange={handleInput}
                value={input.password_login}
                name="password_login"
                label="Password"
              />
              <FormHelperText sx={{ color: "orange" }}>
                {errors.msg_password ? errors.msg_password : " "}
              </FormHelperText>
            </FormControl>
            <Typography
              onClick={handleDisplayForgotPassword}
              gutterBottom
              display="block"
              variant="caption"
              sx={{
                marginLeft: "6px",
                mt: "0.5rem",
                cursor: "pointer",
                alignSelf: "flex-end",
                fontSize: "14px",
              }}
              color="primary"
            >
              Forgot password?
            </Typography>
          </div>
          <Button
            variant='contained'
            sx={Button_contained_primary}
            onClick={handleLogin}
            className={styles.body_modal_button}
            style={{marginTop:'1rem'}}
          >
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
            sx={Button_contained_primary}
            size="lg"
            onClick={handleDisplayRegisterModal}
            variant='contained'
          >
            Register
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
}

export default ModalLogin;
