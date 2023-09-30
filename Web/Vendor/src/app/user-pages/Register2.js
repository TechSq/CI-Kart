import React, { Component, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import AuthSchema from '../schema/AuthSchema';
import toast, { Toaster } from 'react-hot-toast';
import { postMethod } from '../../helpers';

const companyLogo = require('../../assets/images/company_logo.png');

const Register2 = () => {
  const history = useHistory();
  const [image, setImage] = useState({ preview: '', raw: '' });
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    dob: '',
    gender: '',
    password: '',
    confirmPassword: '',
    ifsc_code: '',
    account_name: '',
    account_number: '',
    businessPan: '',
    aadhaar: '',
    GSTN: '',
    panDoc: '',
    aadhaarDoc: '',
    GSTNDoc: '',
    legalName: '',
    address1: '',
    address2: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
  };

  const onRegister = async (values) => {
    try {
      let url = 'vendors';
      let payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.mobile,
        password: values.password,
        dob: values.dob,
        gender: values.gender,
        bankName: values.account_name,
        bankAccountNumber: values.account_number,
        IFSCCode: values.ifsc_code,
        legalName: values.legalName,
        address1: values.address1,
        address2: values.address2,
        city: values.city,
        district: values.district,
        state: values.state,
        pincode: values.pincode,
        PANNumber: values.pan,
        AADHARNumber: values.aadhaar,
        GSTNNumber: values.GSTN,
        businessPanDoc: values.panDoc,
        aadhaarDoc: values.aadhaarDoc,
        GSTNDoc: values.GSTNDoc,
      };
      let response = await postMethod({ url, payload });
      if (response.success) {
        toast.success(response.message);
        history.push('/login');
      } else {
        toast.error(response.message);
      }
    } catch (e) {
      toast.error(e.response.message);
    }
  };

  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image.raw);

    // await fetch("YOUR_URL", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "multipart/form-data"
    //   },
    //   body: formData
    // });
  };

  useEffect(() => {
    console.log('image', image);
  }, [image]);

  return (
    <div className='py-5'>
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
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className='auth auth-img-bg h-100'>
              <div className='mb-3'>
                <div className='brand-logo'>
                  <img
                    src={require('../../assets/images/logo-dark.png')}
                    alt='logo'
                  />
                </div>
                <h4>Create a New Account</h4>
                <h6 className='font-weight-light'>
                  Few Steps away from onboarding
                </h6>
              </div>
              <h5 className='fw-bold'>DOCUMENT UPLOAD</h5>
              <div className='row'>
                <div className='col-md-4'>
                  <div className='auth-form-transparent text-left pb-3'>
                    <form className='pt-3'>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label>Business PAN</label>
                          <div className='input-group'>
                            {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-user text-primary'></i>
                            </span>
                          </div> */}
                            <input
                              type='text'
                              name='businessPan'
                              className='form-control form-control-lg border-left-0'
                              placeholder='Enter PAN'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.businessPan}
                            />
                          </div>
                        </div>
                        {errors.businessPan && touched.businessPan && (
                          <div className='text-danger danger_text_align'>
                            {errors.businessPan}
                          </div>
                        )}
                      </div>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label>Aadhaar Details</label>
                          <div className='input-group'>
                            {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-user text-primary'></i>
                            </span>
                          </div> */}
                            <input
                              type='text'
                              name='aadhaar'
                              className='form-control form-control-lg border-left-0'
                              placeholder='Enter Aadhaar'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.aadhaar}
                            />
                          </div>
                        </div>
                        {errors.aadhaar && touched.aadhaar && (
                          <div className='text-danger danger_text_align'>
                            {errors.aadhaar}
                          </div>
                        )}
                      </div>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label>GSTN</label>
                          <div className='input-group'>
                            {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-user text-primary'></i>
                            </span>
                          </div> */}
                            <input
                              type='text'
                              name='GSTN'
                              className='form-control form-control-lg border-left-0'
                              placeholder='Enter GSTN'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.GSTN}
                            />
                          </div>
                        </div>
                        {errors.GSTN && touched.GSTN && (
                          <div className='text-danger danger_text_align'>
                            {errors.GSTN}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='auth-form-transparent text-left pb-3'>
                    <form className='pt-3'>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label></label>
                          <div className='input-group'>
                            <input
                              type='file'
                              name='panDoc'
                              accept='image/*'
                              className='form-control form-control-lg border-left-0'
                              placeholder='Upload PAN'
                              onChange={(e) => {
                                setFieldValue('panDoc', e.target.files[0]);
                                handleChange(e);
                              }}
                              onBlur={handleBlur}
                              value={values.panDoc}
                            />
                          </div>
                        </div>
                        {errors.panDoc && touched.panDoc && (
                          <div className='text-danger danger_text_align'>
                            {errors.panDoc}
                          </div>
                        )}
                      </div>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label></label>
                          <div className='input-group'>
                            <input
                              type='file'
                              name='aadhaarDoc'
                              accept='image/*'
                              className='form-control form-control-lg border-left-0'
                              placeholder='Upload Aadhaar'
                              onChange={(e) => {
                                setFieldValue('aadhaarDoc', e.target.files[0]);
                                handleChange(e);
                              }}
                              onBlur={handleBlur}
                              value={values.aadhaarDoc}
                            />
                          </div>
                        </div>
                        {errors.aadhaarDoc && touched.aadhaarDoc && (
                          <div className='text-danger danger_text_align'>
                            {errors.aadhaarDoc}
                          </div>
                        )}
                      </div>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label></label>
                          <div className='input-group'>
                            <input
                              type='file'
                              name='GSTNDoc'
                              accept='image/*'
                              className='form-control form-control-lg border-left-0'
                              placeholder='Upload GSTN'
                              onChange={(e) => {
                                setFieldValue('GSTNDoc', e.target.files[0]);
                                handleChange(e);
                              }}
                              onBlur={handleBlur}
                              value={values.GSTNDoc}
                            />
                          </div>
                        </div>
                        {errors.GSTNDoc && touched.GSTNDoc && (
                          <div className='text-danger danger_text_align'>
                            {errors.GSTNDoc}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                {/* <div className="col-md-4">
                  <div className="auth-form-transparent text-left pb-3">
                    <form className="pt-3">
                      <button type="button" className="btn mx-2 mt-4 btn-dark">Verify</button>
                    </form>
                  </div>
                  <div className="auth-form-transparent text-left pb-3">
                    <form className="pt-3">
                      <button type="button" className="btn mx-2 btn-dark">Verify</button>
                    </form>
                  </div>
                  <div className="auth-form-transparent text-left pb-3">
                    <form className="pt-3">
                      <button type="button" className="btn mx-2 btn-dark">Verify</button>
                    </form>
                  </div>
                </div> */}
              </div>
              <h5 className='fw-bold'>BANK INFORMATION</h5>
              <div className='row'>
                <div className='col-md-4'>
                  <div className='auth-form-transparent text-left pb-3'>
                    <form className='pt-3'>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label>Account Name</label>
                          <div className='input-group'>
                            {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-user text-primary'></i>
                            </span>
                          </div> */}
                            <input
                              type='text'
                              name='account_name'
                              className='form-control form-control-lg border-left-0'
                              placeholder='Enter Account Number'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.account_name}
                            />
                          </div>
                        </div>
                        {errors.account_name && touched.account_name && (
                          <div className='text-danger danger_text_align'>
                            {errors.account_name}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='auth-form-transparent text-left pb-3'>
                    <form className='pt-3'>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label>Bank Account Number</label>
                          <div className='input-group'>
                            {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-user text-primary'></i>
                            </span>
                          </div> */}
                            <input
                              type='text'
                              name='account_number'
                              className='form-control form-control-lg border-left-0'
                              placeholder='Enter Account Number'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.account_number}
                            />
                          </div>
                        </div>
                        {errors.account_number && touched.account_number && (
                          <div className='text-danger danger_text_align'>
                            {errors.account_number}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='auth-form-transparent text-left pb-3'>
                    <form className='pt-3'>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label>IFSC Code</label>
                          <div className='input-group'>
                            {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-user text-primary'></i>
                            </span>
                          </div> */}
                            <input
                              type='text'
                              name='ifsc_code'
                              className='form-control form-control-lg border-left-0'
                              placeholder='Enter IFSC'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.ifsc_code}
                            />
                          </div>
                        </div>
                        {errors.ifsc_code && touched.ifsc_code && (
                          <div className='text-danger danger_text_align'>
                            {errors.ifsc_code}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <h5 className='fw-bold'>BASIC INFORMATION</h5>
              <div className='row'>
                <div className='col-md-4'>
                  <div className='auth-form-transparent text-left pb-3'>
                    <form className='pt-3'>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label>First Name</label>
                          <div className='input-group'>
                            {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-user text-primary'></i>
                            </span>
                          </div> */}
                            <input
                              type='text'
                              name='firstName'
                              className='form-control form-control-lg border-left-0'
                              placeholder='First Name'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.firstName}
                            />
                          </div>
                        </div>
                        {errors.firstName && touched.firstName && (
                          <div className='text-danger danger_text_align'>
                            {errors.firstName}
                          </div>
                        )}
                      </div>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label>Email</label>
                          <div className='input-group'>
                            {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-email text-primary'></i>
                            </span>
                          </div> */}
                            <input
                              type='email'
                              name='email'
                              className='form-control form-control-lg border-left-0'
                              placeholder='Email'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                          </div>
                        </div>
                        {errors.email && touched.email && (
                          <div className='text-danger danger_text_align'>
                            {errors.email}
                          </div>
                        )}
                      </div>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label>Date of Birth</label>
                          <div className='input-group'>
                            {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-email text-primary'></i>
                            </span>
                          </div> */}
                            <input
                              type='date'
                              name='dob'
                              className='form-control form-control-lg border-left-0'
                              placeholder='DOB'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.dob}
                            />
                          </div>
                        </div>
                        {errors.dob && touched.dob && (
                          <div className='text-danger danger_text_align'>
                            {errors.dob}
                          </div>
                        )}
                      </div>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label>Password</label>
                          <div className='input-group'>
                            {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-lock text-primary'></i>
                            </span>
                          </div> */}
                            <input
                              type='password'
                              name='password'
                              className='form-control form-control-lg border-left-0'
                              placeholder='Password'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                            />
                          </div>
                        </div>
                        {errors.password && touched.password && (
                          <div className='text-danger danger_text_align'>
                            {errors.password}
                          </div>
                        )}
                      </div>
                      {/* <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>I agree to all Terms &
                        Conditions
                      </label>
                    </div>
                  </div> */}
                    </form>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='auth-form-transparent text-left pb-3'>
                    <form className='pt-3'>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label>Last Name</label>
                          <div className='input-group'>
                            {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-user text-primary'></i>
                            </span>
                          </div> */}
                            <input
                              type='text'
                              name='lastName'
                              className='form-control form-control-lg border-left-0'
                              placeholder='Last Name'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.lastName}
                            />
                          </div>
                        </div>
                        {errors.lastName && touched.lastName && (
                          <div className='text-danger danger_text_align'>
                            {errors.lastName}
                          </div>
                        )}
                      </div>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label>Mobile Number</label>
                          <div className='input-group'>
                            {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-user text-primary'></i>
                            </span>
                          </div> */}
                            <input
                              type='text'
                              inputMode='numeric'
                              name='mobile'
                              className='form-control form-control-lg border-left-0'
                              placeholder='Mobile Number'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.mobile}
                            />
                          </div>
                        </div>
                        {errors.mobile && touched.mobile && (
                          <div className='text-danger danger_text_align'>
                            {errors.mobile}
                          </div>
                        )}
                      </div>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label>Gender</label>
                          <div className='input-group'>
                            {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-email text-primary'></i>
                            </span>
                          </div> */}
                            <select
                              name='gender'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className='form-control form-control-lg border-left-0'
                            >
                              <option value=''>
                                --Please choose an gender--
                              </option>
                              <option value='Male'>Male</option>
                              <option value='Female'>Female</option>
                            </select>
                            {/* <input
                            type="text"
                            name="gender"
                            className="form-control form-control-lg border-left-0"
                            placeholder="Gender"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.gender}
                          /> */}
                          </div>
                        </div>
                        {errors.gender && touched.gender && (
                          <div className='text-danger danger_text_align'>
                            {errors.gender}
                          </div>
                        )}
                      </div>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label>Confirm Password</label>
                          <div className='input-group'>
                            {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-email text-primary'></i>
                            </span>
                          </div> */}
                            <input
                              type='password'
                              name='confirmPassword'
                              className='form-control form-control-lg border-left-0'
                              placeholder='Confirm Password'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.confirmPassword}
                            />
                          </div>
                        </div>
                        {errors.confirmPassword && touched.confirmPassword && (
                          <div className='text-danger danger_text_align'>
                            {errors.confirmPassword}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <div className='col-md-4 d-flex justify-content-center'>
                  <div className='auth-form-transparent text-left pb-3'>
                    <form className='pt-3'>
                      <label htmlFor='upload-button'>
                        {image.preview ? (
                          <img
                            src={image.preview}
                            alt='dummy'
                            width='300'
                            height='300'
                          />
                        ) : (
                          <>
                            <img
                              src={companyLogo}
                              alt='dummy'
                              width='250'
                              height='250'
                            />
                            <h5 className='text-center mt-2'>Company Logo</h5>
                          </>
                        )}
                      </label>
                      <input
                        type='file'
                        id='upload-button'
                        style={{ display: 'none' }}
                        onChange={handleChangeImage}
                      />
                    </form>
                  </div>
                </div>
              </div>
              <h5 className='fw-bold'>COMPANY INFORMATION</h5>
              <div className='row'>
                <div className='col-md-4'>
                  <div className='auth-form-transparent text-left pb-3'>
                    <form className='pt-3'>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label>Legal Name</label>
                          <div className='input-group'>
                            {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-user text-primary'></i>
                            </span>
                          </div> */}
                            <input
                              type='text'
                              name='legalName'
                              className='form-control form-control-lg border-left-0'
                              placeholder='Legal Name'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.legalName}
                            />
                          </div>
                        </div>
                        {errors.legalName && touched.legalName && (
                          <div className='text-danger danger_text_align'>
                            {errors.legalName}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-4'>
                  <div className='auth-form-transparent text-left pb-3'>
                    <form className='pt-3'>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label>Address Line 1</label>
                          <div className='input-group'>
                            {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-user text-primary'></i>
                            </span>
                          </div> */}
                            <input
                              type='text'
                              name='address1'
                              className='form-control form-control-lg border-left-0'
                              placeholder='Enter Address Line 1'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.address1}
                            />
                          </div>
                        </div>
                        {errors.address1 && touched.address1 && (
                          <div className='text-danger danger_text_align'>
                            {errors.address1}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='auth-form-transparent text-left pb-3'>
                    <form className='pt-3'>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label>Address Line 2</label>
                          <div className='input-group'>
                            {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-user text-primary'></i>
                            </span>
                          </div> */}
                            <input
                              type='text'
                              name='address2'
                              className='form-control form-control-lg border-left-0'
                              placeholder='Enter Address Line 2'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.address2}
                            />
                          </div>
                        </div>
                        {errors.address2 && touched.address2 && (
                          <div className='text-danger danger_text_align'>
                            {errors.address2}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='auth-form-transparent text-left pb-3'>
                    <form className='pt-3'>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label>City</label>
                          <div className='input-group'>
                            {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-user text-primary'></i>
                            </span>
                          </div> */}
                            <input
                              type='text'
                              name='city'
                              className='form-control form-control-lg border-left-0'
                              placeholder='Enter City'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.city}
                            />
                          </div>
                        </div>
                        {errors.city && touched.city && (
                          <div className='text-danger danger_text_align'>
                            {errors.city}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-4'>
                  <div className='auth-form-transparent text-left pb-3'>
                    <form className='pt-3'>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label>District</label>
                          <div className='input-group'>
                            {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-user text-primary'></i>
                            </span>
                          </div> */}
                            <input
                              type='text'
                              name='district'
                              className='form-control form-control-lg border-left-0'
                              placeholder='Enter District'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.district}
                            />
                          </div>
                        </div>
                        {errors.district && touched.district && (
                          <div className='text-danger danger_text_align'>
                            {errors.district}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='auth-form-transparent text-left pb-3'>
                    <form className='pt-3'>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label>State</label>
                          <div className='input-group'>
                            {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-user text-primary'></i>
                            </span>
                          </div> */}
                            <input
                              type='text'
                              name='state'
                              className='form-control form-control-lg border-left-0'
                              placeholder='Enter State'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.state}
                            />
                          </div>
                        </div>
                        {errors.state && touched.state && (
                          <div className='text-danger danger_text_align'>
                            {errors.state}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='auth-form-transparent text-left pb-3'>
                    <form className='pt-3'>
                      <div className='kr_forms_align'>
                        <div className='form-group mb-0'>
                          <label>Pincode</label>
                          <div className='input-group'>
                            {/* <div className='input-group-prepend bg-transparent'>
                            <span className='input-group-text bg-transparent border-right-0'>
                              <i className='ti-user text-primary'></i>
                            </span>
                          </div> */}
                            <input
                              type='text'
                              name='pincode'
                              className='form-control form-control-lg border-left-0'
                              placeholder='Enter Pincode'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.pincode}
                            />
                          </div>
                        </div>
                        {errors.pincode && touched.pincode && (
                          <div className='text-danger danger_text_align'>
                            {errors.pincode}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className='row d-flex justify-content-center'>
                <div className='col-md-4 mt-3'>
                  <button
                    className='btn btn-primary btn-md w-100 text-white mb-0 me-0 w-50'
                    onClick={() => onRegister(values)}
                    type='button'
                  >
                    Sign Up
                  </button>
                </div>
                <div className='text-center mt-4 font-weight-light'>
                  Already have an account?{' '}
                  <Link to='/login' className='text-primary'>
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register2;
