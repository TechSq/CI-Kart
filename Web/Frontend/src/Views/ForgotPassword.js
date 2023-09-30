import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { postMethod } from '../helpers';

function ForgotPassword() {
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();

  const sendOTP = async (e) => {
    e.preventDefault()
    try {
      let url = "users/send-otp";
      var payload = {
        email: email,
        userType: 'User',
      };
      let response = await postMethod({ url, payload });
      if(response.success){
        localStorage.setItem('tempid', response?.data?._id);
        toast.success(response.message)
        navigate("/otpverification")
        setEmail("");
      }else{
        toast.error(response.message)
      }
    } catch (e) {
      console.log("api err",e);
      toast.error(e.response.message)
      setEmail("");
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
        <Row className='h-100 align-items-center'>
          <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
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
                <img
                  src={require('../assets/images/auth/blackbox.svg').default}
                />
                <h4 className='welcome_txt mt-3'>Forgot Passowrd</h4>
                <p className='hint_txt'>Reset your password</p>
                <div className='login_input'>
                  <input type='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email' />
                  <i className='fa-solid fa-envelope login_icons'></i>
                </div>

                {/* <Link className='signup_txt' to='/otpverification'> */}
                  <button onClick={sendOTP} className='common_blubtn mt-4'>Send OTP</button>
                {/* </Link> */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ForgotPassword;
