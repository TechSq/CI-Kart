import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import {postMethod} from "../helpers/index";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Google from './auth/google';
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";

function Register() {
  const navigate = useNavigate();
  const [firstName, setfirstName] = React.useState('');
  const [lastName, setlastName] = React.useState('');
  const [email, setemail] = React.useState('');
  const [mobile, setmobile] = React.useState('');
  const [dob, setdob] = React.useState('');
  const [gender, setgender] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [cpassword, setcpassword] = React.useState('');
  const [checked, setChecked] = React.useState(false);

  const onRegister = async () => {
    try {
      let url = 'users/register';
      var payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        dob: dob,
        gender: gender,
        phoneNumber: mobile,
        password: password,
        concern:checked
      };
      let response = await postMethod({ url, payload });
      if(response.success){
        toast.success(response.message)
        navigate("/login");
        setfirstName("");
        setlastName("");
        setemail("");
        setdob("");
        setChecked("");
        setmobile("");
        setgender("");
        setpassword("");
        setcpassword("")
      }else{
        toast.success(response.error)
      }
    } catch (e) {
      console.log("register err",e);
      toast.success(e.response.message)
      setfirstName("");
      setlastName("");
      setemail("");
      setdob("");
      setChecked("");
      setmobile("");
      setgender("");
      setpassword("");
      setcpassword("")
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
            <img className='mb-1' src={require('../assets/images/auth/blackbox.svg').default} />
            <h4 className='welcome_txt text-center'>Register</h4>
            <p className='hint_txt text-center'>Create your Account</p>
            <Row>
              <Col xl={6} lg={6} md={6} sm={12} xs={12} className='mb-4'>
                <div className='reg_inputs'>
                  <input type='text' value={firstName} onChange={(e)=> setfirstName(e.target.value)} placeholder='First Name' />
                  <i className='fa-solid fa-envelope login_icons'></i>
                </div>
              </Col>
              <Col xl={6} lg={6} md={6} sm={12} xs={12} className='mb-4'>
                <div className='reg_inputs'>
                  <input type='text' value={lastName} onChange={(e)=> setlastName(e.target.value)} placeholder='Last Name' />
                  <i className='fa-solid fa-envelope login_icons'></i>
                </div>
              </Col>
              <Col xl={6} lg={6} md={6} sm={12} xs={12} className='mb-4'>
                <div className='reg_inputs'>
                  <input type='email' value={email} onChange={(e)=> setemail(e.target.value)} placeholder='Email' />
                  <i className='fa-solid fa-envelope login_icons'></i>
                </div>
              </Col>
              <Col xl={6} lg={6} md={6} sm={12} xs={12} className='mb-4'>
                <div className='reg_inputs'>
                  <input type='number' value={mobile} onChange={(e)=> setmobile(e.target.value)} placeholder='Mobile' />
                  <i className='fa-solid fa-envelope login_icons'></i>
                </div>
              </Col>

              <Col xl={6} lg={6} md={6} sm={12} xs={12} className='mb-4'>
                <div className='reg_inputs'>
                  <input type='date' placeholder='DOB' value={dob} onChange={(e)=> setdob(e.target.value)} />
                  {/* <i className='fa-solid fa-envelope login_icons'></i> */}
                </div>
              </Col>
              <Col xl={6} lg={6} md={6} sm={12} xs={12} className='mb-4'>
                <div className='reg_inputs'>
                  <select
                            name="gender"
                            onChange={(e)=> setgender(e.target.value)}
                            className="form-control form-control border-left-0"
                          >
                            <option value="">
                              --Please choose an gender--
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                  <i className='fa-solid fa-envelope login_icons'></i>
                </div>
              </Col>
              <Col xl={6} lg={6} md={6} sm={12} xs={12} className='mb-4'>
                <div className='reg_inputs'>
                  <input type='password' value={password} onChange={(e)=> setpassword(e.target.value)} placeholder='Password' />
                  <i className='fa-solid fa-eye login_icons'></i>
                </div>
              </Col>
              <Col xl={6} lg={6} md={6} sm={12} xs={12} className='mb-4'>
                <div className='reg_inputs'>
                  <input type='password' value={cpassword} onChange={(e)=> setcpassword(e.target.value)} placeholder='Confirm Password' />
                  <i className='fa-solid fa-eye login_icons'></i>
                </div>
              </Col>
            </Row>
            <form action='/action_page.php'>
              <input
                className='terms_check'
                type='checkbox'
                id='vehicle1'
                name='vehicle1'
                value={checked}
                onChange={(e)=> setChecked(e.target.value)}

              />
              <label for='vehicle1'>
                Accept Terms & Conditions & Privacy Policy
              </label>
            </form>
            <center>
              <button onClick={onRegister} className='register_btn mt-4'>Register</button>
            </center>
            <div className='login_opt_details reg_opt_dtls'>
              <hr className='login_hr' />
              <p>or Continue with</p>
            </div>

            <div className='secondary_logins mt-4'>
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
              <div className='google_icon reg_ggl_icon'>
              <GoogleOAuthProvider clientId="208119880030-qbtfoiblif77keiqk36nlmu3lsfr4ck4.apps.googleusercontent.com">
          <Google />
        </GoogleOAuthProvider>
              </div>
            </div>
            <p className='login_bottom_txt'>
              Already have an account ?
              <Link to='/' className='signup_txt'>
                Login
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
