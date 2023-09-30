import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { Container, Col, Row } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { postMethod } from '../helpers';

function OtpVerification() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const verifyOTP = async (e) => {
    e.preventDefault()
    const value = await localStorage.getItem('tempid');
    try {
      let url = "users/verify-otp";
      var payload = {
        id: value,
        otp: otp,
      };
      let response = await postMethod({ url, payload });
      if(response.success){
        toast.success(response.message)
        navigate("/setnewpassword")
        setOtp("");
      }else{
        toast.error(response.message)
      }
    } catch (e) {
      console.log("api err",e);
      toast.error(e.response.message)
      setOtp("");
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
                <h4 className='welcome_txt'>OTP Verification</h4>
                <p className='hint_txt'>Reset your password</p>
                {/* <div className='login_input'>
                  <input type='number' placeholder='Enter OTP' />
                  <i className='fa-solid fa-envelope login_icons'></i>
                </div> */}
                <div className='common_otp_inputs'>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
                {/* <Link className='signup_txt' to='/setnewpassword'> */}
                  <button onClick={verifyOTP} className='common_blubtn mt-4'>Verify OTP</button>
                {/* </Link> */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default OtpVerification;
