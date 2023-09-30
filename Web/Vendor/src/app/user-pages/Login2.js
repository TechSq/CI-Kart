import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import AuthSchema from '../schema/AuthSchema';
import toast, { Toaster } from 'react-hot-toast';
import ForgotPassword from './ForgotPassword';
import { postMethod } from '../../helpers';

let url = `http://localhost:5005/api/v1/users/login`;
const Login2 = () => {
  const history = useHistory();
  const [mdShow, setMdShow] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const onLogin = async (values) => {
    try {
      let url = 'users/login';
      let payload = {
        emailOrPhoneNumber: values.email,
        password: values.password,
        userType: 'Vendor',
      };
      let response = await postMethod({ url, payload });
      if (response.success) {
        localStorage.setItem('@token', response.data.token);
        localStorage.setItem(
          '@vendorDetail',
          JSON.stringify(response.data.vendor)
        );
        history.push('/dashboard');
      } else {
        toast.error(response.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.response.message);
    }
  };

  return (
    <div className='vend_login_whole'>
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
      <Formik
        initialValues={initialValues}
        validationSchema={AuthSchema}
        onSubmit={(formData) => {}}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <div
              // style={{ height: '100vh' }}
              className='d-flex align-items-stretch auth auth-img-bg h-100 kr_height_align'
            >
              <div className='row flex-grow'>
                <div className='col-lg-6 d-flex align-items-center justify-content-center'>
                  <div className='auth-form-transparent w-75 text-left'>
                    <div className='brand-logo'>
                      <img
                        src={require('../../assets/images/logo-dark.png')}
                        alt='logo'
                      />
                    </div>
                    <h4>Welcome back!</h4>
                    <h6 className='font-weight-light'>
                      Happy to see you again!
                    </h6>
                    <form className='pt-3'>
                      <div className='form-group'>
                        <label>Username</label>
                        <div className='input-group'>
                          {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-user text-primary'></i>
                            </span>
                          </div> */}
                          <input
                            type='email'
                            name='email'
                            className='form-control form-control-lg border-left-0'
                            placeholder='Enter Email'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                        </div>
                      </div>
                      {errors.email && touched.email && (
                        <div className='text-danger'>{errors.email}</div>
                      )}
                      <div className='form-group mb-1'>
                        <label>Password</label>
                        <div className='input-group'>
                          {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-lock text-primary'></i>
                            </span>
                          </div> */}
                          <input
                            type='string'
                            name='password'
                            className='form-control form-control-lg border-left-0'
                            placeholder='Enter Password'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                        </div>
                      </div>
                      {errors.password && touched.password && (
                        <div className='text-danger'>{errors.password}</div>
                      )}
                      <div className='mb-2 d-flex justify-content-end align-items-center'>
                        <p
                          style={{ cursor: 'pointer' }}
                          onClick={() => setMdShow(true)}
                          className='auth-link text-black'
                        >
                          Forgot password?
                        </p>
                      </div>
                      <div className='my-3 text-center'>
                        <button
                          className='btn btn-primary btn-md text-white mb-0 me-0 w-50'
                          onClick={() => onLogin(values)}
                          type='button'
                        >
                          Login
                        </button>
                      </div>
                      <div className='text-center mt-4 font-weight-light'>
                        Don't have an account?{' '}
                        <Link to='/register' className='text-primary'>
                          Create
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='col-lg-6 login-half-bg d-flex h-100 flex-row'></div>
              </div>
            </div>
          </form>
        )}
      </Formik>
      <ForgotPassword mdShow={mdShow} setMdShow={setMdShow} />
    </div>
  );
};

export default Login2;
