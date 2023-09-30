import React, { Component, useState } from "react";
import {
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
  Modal,
  Image,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactSearchBox from "react-search-box";
import { postMethod } from "../helpers";
import toast, { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Google from "../Views/auth/google";
// import Facebook from "../Views/auth/Facebook";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";

const LoginModal = ({ showSignin, setShowSignin, handleClose, handleShow }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  // const [user,setUser]= useState({});
  let json = localStorage.getItem("@USER");
  let User = JSON.parse(json);
  // const [showSignin, setShowSignin] = useState(false);
  const [eyechange, setEyechange] = useState("password");

  // const handleClose = () => setShowSignin(false);
  // const handleShow = () => setShowSignin(true);

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      let url = "users/login";
      var payload = {
        emailOrPhoneNumber: email,
        password: password,
        userType: "User",
      };
      let response = await postMethod({ url, payload });
      if (response.success) {
        toast.success(response.message);
        localStorage.setItem("@token", response.data.token);
        let user = JSON.stringify(response.data.user);
        localStorage.setItem("@USER", user);
        handleClose();
        setEmail("");
        setPassword("");
      } else {
        toast.error(response.message);
      }
    } catch (e) {
      toast.error(e.response.error);
      setEmail("");
      setPassword("");
    }
  };
  return (
    <Modal
      show={showSignin}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Body>
        <div className="modal_closing">
          <i onClick={handleClose} className="fa-solid fa-xmark fa-shake"></i>
        </div>
        <div className="whole_signin_popup">
          <img
            className="mb-3"
            src={require("../assets/images/auth/blackbox.svg").default}
          />
          <h5 className="login_title_txt">Welcome to Box</h5>

          <div className=" mt-4">
            <label className="login_label">Email</label>
            <div className="login_input">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <i className="fa-solid fa-envelope login_icons"></i>
            </div>
            <div className=" mt-3">
              <label className="login_label">Password</label>
              <div className="login_input">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={eyechange == "password" ? "password" : "text"}
                  placeholder="Password"
                />
                <i
                  className={
                    eyechange == "password"
                      ? "fa-solid fa-eye login_icons"
                      : "fa-solid fa-eye-slash login_icons"
                  }
                  onClick={() =>
                    setEyechange(eyechange == "password" ? "text" : "password")
                  }
                ></i>
              </div>
            </div>
            <button onClick={onLogin} className="common_blubtn mt-4">
              Login
            </button>
            <div className="login_opt_details mt-4">
              <hr className="login_hr" />
              <p>or login with</p>
            </div>
            <LoginSocialFacebook
              appId="701626371815919"
              onResolve={(response) => {
                console.log("fb res=", response);
              }}
              onReject={(error) => {
                console.log(error);
              }}
            >
              <FacebookLoginButton/>
            </LoginSocialFacebook>
            <div className="my-3 w-100">
              <GoogleOAuthProvider clientId="208119880030-qbtfoiblif77keiqk36nlmu3lsfr4ck4.apps.googleusercontent.com">
                <Google handleClose={handleClose} />
              </GoogleOAuthProvider>
            </div>

            <p className="login_bottom_txt">
              Don't have account?
              <Link
                to="/register"
                onClick={handleClose}
                className="signup_txt ms-1"
              >
                Sign Up
              </Link>
            </p>

            <div className="gray_content mt-3">
              <p className="login_bottom_txt m-0">
                Forgot your password?
                <Link
                  onClick={handleClose}
                  to="/forgotpw"
                  className="signup_txt ms-1"
                >
                  Reset it
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
