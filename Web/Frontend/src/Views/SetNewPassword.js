import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { postMethod } from "../helpers";

function SetNewPassword() {
  const [eyechange, setEyechange] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("password");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const navigate = useNavigate();

  const savePassword = async (e) => {
    e.preventDefault();
    const value = localStorage.getItem("tempid");
    if (password === cpassword) {
      try {
        let url = "users/reset-password";
        var payload = {
          id: value,
          password: password,
        };
        let response = await postMethod({ url, payload });
        if (response.success) {
          toast.success(response.message)
          navigate("/");
          setpassword("");
          setcpassword("");
        } else {
          toast.error(response.message)
        }
      } catch (e) {
        toast.error(e.response.message)
        setpassword("");
        setcpassword("");
      }
    } else {
      toast.error("Invalid Password")
    }
  };
  return (
    <>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <Container>
        <Row className="h-100 align-items-center">
          <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
            <div className="login_banner_img"></div>
            <div className="mobile_top_session mb-5">
              <img src={require("../assets/images/auth/dummy_logo.png")} />
            </div>
            {/* <img
              className='img-fluid'
              src={require('../assets/images/auth/login-bg.jpg')}
            /> */}
          </Col>
          
          <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
            <div className="login_form_details">
              <div className="log_details">
                <h4 className="welcome_txt">Set New Password</h4>
                <p className="hint_txt">Login to you account</p>
                <div className="login_input">
                  <input
                    type={eyechange == "password" ? "password" : "text"}
                    placeholder="New Password"
                    value={password} onChange={(e)=> setpassword(e.target.value)}
                  />
                  <i
                    className={
                      eyechange == "password"
                        ? "fa-solid fa-eye login_icons"
                        : "fa-solid fa-eye-slash login_icons"
                    }
                    onClick={() =>
                      setEyechange(
                        eyechange == "password" ? "text" : "password"
                      )
                    }
                  ></i>
                </div>
                <div className="login_input mt-4">
                  <input
                  value={cpassword} onChange={(e)=> setcpassword(e.target.value)}
                    type={confirmPassword == "password" ? "password" : "text"}
                    placeholder="Confirm Passowrd"
                  />
                  <i
                    className={
                      confirmPassword == "password"
                        ? "fa-solid fa-eye login_icons"
                        : "fa-solid fa-eye-slash login_icons"
                    }
                    onClick={() =>
                      setConfirmPassword(
                        confirmPassword == "password" ? "text" : "password"
                      )
                    }
                  ></i>
                </div>

                <button onClick={savePassword} className="common_blubtn mt-4">Save Passowrd</button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SetNewPassword;
