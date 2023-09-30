import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import {postMethod} from "../helpers/index";
import { useNavigate } from 'react-router-dom';


function Login() {
  const [eyechange, setEyechange] = useState('password');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault()
    try {
      let url = "users/login";
      var payload = {
        emailOrPhoneNumber: email,
        password: password,
        userType: 'User',
      };
      let response = await postMethod({ url, payload });
      if(response.success){
        toast.success(response.message)
        navigate("/")
        setEmail("");
        setPassword("");
      }else{
        toast.error(response.message)
      }
    } catch (e) {
      toast.error(e.response.message)
      setEmail("");
      setPassword("");
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
      <Container className='custom_container'>
        <Row className='h-100 align-items-center'>
          <Col
            className='custom_col'
            xxl={6}
            xl={6}
            lg={6}
            md={12}
            sm={12}
            xs={12}
          >
            <div className='login_banner_img'></div>
            <div className='mobile_top_session mb-5'>
              <img src={require('../assets/images/auth/dummy_logo.png')} />
            </div>
            {/* <img
              className='img-fluid'
              src={require('../assets/images/auth/login-bg.jpg')}
            /> */}
          </Col>
          <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
            <div className='login_form_details'>
              <div className='log_details'>
                <div className='main_logo_align mb-3'>
                  <img
                    className='box_black mb-1'
                    src={require('../assets/images/auth/blackbox.svg').default}
                  />
                </div>
                <h4 className='welcome_txt'>Welcome back</h4>
                <p className='hint_txt'>Login to you account</p>
                <div className='login_input'>
                  <input type='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email' />
                  <i className='fa-solid fa-envelope login_icons'></i>
                </div>
                <div className='login_input mt-4'>
                  <input
                    type={eyechange == 'password' ? 'password' : 'text'}
                    placeholder='Passowrd'
                    value={password} onChange={(e)=> setPassword(e.target.value)}
                  />
                  <i
                    className={
                      eyechange == 'password'
                        ? 'fa-solid fa-eye login_icons'
                        : 'fa-solid fa-eye-slash login_icons'
                    }
                    onClick={() =>
                      setEyechange(
                        eyechange == 'password' ? 'text' : 'password'
                      )
                    }
                  ></i>
                </div>
                <div className='w-100 text-end'>
                  <p className='forgotpw_txt'>
                    <Link className='signup_txt' to='/forgotpw'>
                      Forgot Passowrd
                    </Link>
                  </p>
                </div>

                <button onClick={onLogin} className='common_blubtn mt-4'>Login</button>

                <div className='login_opt_details'>
                  <hr className='login_hr' />
                  <p>or login with</p>
                </div>

                <div className='secondary_logins mt-4'>
                  <img
                    className='facbook_img'
                    src={require('../assets/images/auth/facebook1.svg').default}
                  />
                  <div className='google_icon'>
                    <img
                      className='sep_google_img'
                      src={
                        require('../assets/images/auth/google_sep.svg').default
                      }
                    />
                    <img
                      className='google_back_icon'
                      src={require('../assets/images/auth/google.svg').default}
                    />
                  </div>
                </div>
                <p className='login_bottom_txt'>
                  Don't have account?
                  <Link to='/register' className='signup_txt'>
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
