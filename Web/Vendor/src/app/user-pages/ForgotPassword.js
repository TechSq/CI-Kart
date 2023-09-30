import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Modal, ToastContainer } from "react-bootstrap";
import AuthSchema from "../schema/AuthSchema";
import ResetPassword from "./ResetPassword";
import axios from "axios";
const initialValues = {
  email: "",
};
const url = 'http://localhost:5005/api/v1/users'

const ForgotPassword = ({ mdShow, setMdShow }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  
  const getOTP = async (values) => {
    try {
      values.userType = 'Vendor';
      const res = await axios.post(`${url}/send-otp`, values)
      if (res.status === 200) {
        console.log('res', res)
        setData(res.data.data)
        setMdShow(false);
        setShow(true);
      }else{
        alert('Something went wrong')
      }

    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
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
                      show={mdShow}
                      onHide={() => setMdShow(false)}
                      aria-labelledby="example-modal-sizes-title-lg"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Forgot Password</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <div className="form-group mb-1">
                          <label>Email</label>
                          <div className="input-group">
                            <div className="input-group-prepend bg-transparent">
                              <span className="input-group-text bg-transparent border-right-0">
                                <i className="ti-lock text-primary"></i>
                              </span>
                            </div>
                            <input
                              type="string"
                              name="email"
                              className="form-control form-control-lg border-left-0"
                              placeholder="Enter Email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                            />
                          </div>
                        </div>
                        {errors.email && touched.email && (
                          <div className="text-danger">{errors.email}</div>
                        )}
                      </Modal.Body>

                      <Modal.Footer className="flex-wrap">
                        <Button variant="primary mx-auto" onClick={() => getOTP(values)}>
                          Get OTP
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
      <ResetPassword show={show} data={data} setShow={setShow} />
    </>
  );
};

export default ForgotPassword;
