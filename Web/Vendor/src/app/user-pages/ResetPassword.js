import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
// import AuthSchema from "../schema/AuthSchema";
import * as Yup from "yup";
import axios from "axios";
const AuthSchema = Yup.object().shape({
  otp: Yup.string().required("OTP is Required"),
  password: Yup.string().required("Password is Required"),
  confirmPassword: Yup.string().required("Password is Required"),
});

const initialValues = {
  otp: "",
  password: "",
  confirm_password: ""
};

const ResetPassword = ({ show, setShow, data }) => {
  const history = useHistory()
  const url = 'http://localhost:5005/api/v1/users'

  const resetPassword = async (values) => {
    try {
      values.id = data._id;
      const res = await axios.post(`${url}/forgot-password`, values)
      if (res.status === 200) {
        console.log('res', res)
        // history.push('/login');
        window.location.reload()
      } else {
        alert('Something went wrong')
      }

    } catch (e) {
      console.log(e);
    }
  };
  console.log(data)
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AuthSchema}
      onSubmit={(formData) => { }}
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
          <div className="row">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <Modal
                    size="md"
                    show={show}
                    onHide={() => setShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Reset Password</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      <div className="form-group mb-1">
                        <label>OTP</label>
                        <div className="input-group">
                          <div className="input-group-prepend bg-transparent">
                            <span className="input-group-text bg-transparent border-right-0">
                              <i className="ti-lock text-primary"></i>
                            </span>
                          </div>
                          <input
                            type="string"
                            inputMode="numeric"
                            name="otp"
                            className="form-control form-control-lg border-left-0"
                            placeholder="Enter OTP"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.otp}
                          />
                        </div>
                      </div>
                      {errors.otp && touched.otp && (
                        <div className="text-danger">{errors.otp}</div>
                      )}
                      <div className="form-group mb-0">
                        <label>Password</label>
                        <div className="input-group">
                          <div className="input-group-prepend bg-transparent">
                            <span className="input-group-text bg-transparent border-right-0">
                              <i className="ti-lock text-primary"></i>
                            </span>
                          </div>
                          <input
                            type="password"
                            name="password"
                            className="form-control form-control-lg border-left-0"
                            placeholder="Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                        </div>
                      </div>
                      {errors.password && touched.password && (
                        <div className="text-danger">{errors.password}</div>
                      )}
                      <div className="form-group mb-0">
                        <label>Confirm Password</label>
                        <div className="input-group">
                          <div className="input-group-prepend bg-transparent">
                            <span className="input-group-text bg-transparent border-right-0">
                              <i className="ti-lock text-primary"></i>
                            </span>
                          </div>
                          <input
                            type="password"
                            name="confirm_password"
                            className="form-control form-control-lg border-left-0"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirm_password}
                          />
                        </div>
                      </div>
                      {errors.confirm_password && touched.confirm_password && (
                        <div className="text-danger">{errors.confirm_password}</div>
                      )}
                    </Modal.Body>

                    <Modal.Footer className="flex-wrap">
                      <Button variant="primary mx-auto" onClick={() => resetPassword(values)}>Reset</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ResetPassword;
