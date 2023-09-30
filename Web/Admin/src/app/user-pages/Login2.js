import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { postMethod } from '../../helpers';

const Login2 = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [errorMsg, setErrMsg] = useState("");
  const history = useHistory();

  const onLogin = async (e) => {
    try {
      let url = 'users/login';
      let payload = {
        emailOrPhoneNumber: userName,
        password: password,
        userType: 'Admin',
      };
      let response = await postMethod({ url, payload });
      if (response.success) {
        localStorage.setItem('@token', response.data.token);
        setUsername('');
        setPassword('');
        history.push('/dashboard');
      } else {
        toast.error(response.message);
      }
    } catch (e) {
      toast.error(e.response.message);
      // setErrMsg(e.response.data.message);
      console.log('api err=', e.response.message);
    }
  };
  return (
    <div>
      <Toaster
        position='bottom-center'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      <div className='d-flex align-items-stretch auth auth-img-bg h-100'>
        <div className='row flex-grow'>
          <div className='col-lg-6 d-flex align-items-center justify-content-center'>
            <div className='auth-form-transparent text-left p-3'>
              <div className='brand-logo'>
                <img
                  src={require('../../assets/images/logo-dark.png')}
                  alt='logo'
                />
              </div>
              <h4>Admin Login</h4>
              <h6 className='font-weight-light'>Happy to see you again!</h6>
              <form className='pt-3'>
                <div className='form-group'>
                  <label>Username</label>
                  <div className='input-group'>
                    {/* <div className="input-group-prepend bg-transparent">
                      <span className="input-group-text bg-transparent border-right-0">
                        <i className="ti-user text-primary"></i>
                      </span>
                    </div> */}
                    <input
                      type='string'
                      value={userName}
                      onChange={(e) => setUsername(e.target.value)}
                      className='form-control form-control-lg border-left-0'
                      id='exampleInputEmail'
                      placeholder='Username'
                      required
                    />
                  </div>
                </div>
                <div className='form-group mb-1'>
                  <label>Password</label>
                  <div className='input-group'>
                    {/* <div className="input-group-prepend bg-transparent">
                      <span className="input-group-text bg-transparent border-right-0">
                        <i className="ti-lock text-primary"></i>
                      </span>
                    </div> */}
                    <input
                      type='string'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='form-control form-control-lg border-left-0'
                      id='exampleInputPassword'
                      placeholder='Password'
                      required
                    />
                  </div>
                </div>
                {/* <div className="mb-2 d-flex justify-content-end align-items-center">
                  <a href="!#" className="auth-link text-black">
                    Forgot password?
                  </a>
                </div> */}
                <div className='my-3'>
                  <button
                    className='btn btn-primary btn-md text-white mb-0 me-0 w-50'
                    onClick={onLogin}
                    type='button'
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className='col-lg-6 login-half-bg d-flex flex-row'></div>
        </div>
      </div>
    </div>
  );
};

export default Login2;
