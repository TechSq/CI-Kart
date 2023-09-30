import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { postMethod } from "../../../helpers";
import axios from "axios";

const AuthSchema = Yup.object().shape({
  subcategory: Yup.string().required("Sub category is Required"),
  category: Yup.string().required("Select category"),
});
const companyLogo = require("../../../assets/images/company_logo.png");
const initialValues = {
  subcategory: "",
  category: "",
  categoryUuid: "",
};

const AddSubCategory = ({
  subcategoryShow,
  setsubcategoryShow,
  data,
  getSubCategoryList,
}) => {
  const [image, setImage] = useState({ preview: "", raw: "" });

  const onAddSubCategory = async (values, setFieldValue) => {
    console.log("inner img",image?.raw)
    try {
      let url = "subcategories/add_subcategory";
      let payload = {
        categoryUuid: values.category,
        subcategoryName: values.subcategory,
        gender: "",
        imageUrl: image?.raw,
      };
      let response = await postMethod({ url, payload });
      if (response.success) {
        setsubcategoryShow(false);
        getSubCategoryList();
        setFieldValue("subcategory", "");
        setImage({ preview: "", raw: "" })
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (e) {
      toast.error(e.response.message);
      console.log("api err=", e.response.message);
    }
  };

  const handleChangeImage = async (e) => {
    let url = `${process.env.REACT_APP_BACKEND_URL}common/upload/s3/subcategory`;
    if (e.target.files) {
      const token = localStorage.getItem("@token");
      let file = e.target.files[0];
      const formData = new FormData();
      formData.append("avatar", file);
      const resp = await axios.post(url, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: resp?.data?.data?.Location,
      });
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
      <Formik
        initialValues={initialValues}
        validationSchema={AuthSchema}
        onSubmit={(formData) => {}}
        enableReinitialize={false}
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
                <div className="card">
                  <div className="card-body">
                    <Modal
                      size="md"
                      show={subcategoryShow}
                      onHide={() => setsubcategoryShow(false)}
                      aria-labelledby="example-modal-sizes-title-lg"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>New Sub Category</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                      <div className="row">
                          <div className="form-group mb-0 d-flex justify-content-center">
                            <label htmlFor="upload-button">
                              {image.preview ? (
                                <img
                                  src={image.preview}
                                  alt="dummy"
                                  width="100"
                                  height="100"
                                />
                              ) : (
                                <>
                                  <img
                                    src={companyLogo}
                                    alt="dummy"
                                    width="100"
                                    height="100"
                                  />
                                  <h5 className="text-center mt-2">
                                    Add Image
                                  </h5>
                                </>
                              )}
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              id="upload-button"
                              style={{ display: "none" }}
                              onChange={handleChangeImage}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group mb-0">
                              <label>Category</label>
                              <div className="input-group">
                                <select
                                  name="category"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="form-control form-control-lg border-left-0"
                                >
                                  <option value="">--Select Category--</option>
                                  {data.map((item) => (
                                    <option value={item.categoryUuid}>
                                      {item.categoryName}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            {errors.category && touched.category && (
                              <div className="text-danger">
                                {errors.category}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6">
                            <div className="form-group mb-0">
                              <label>Sub Category</label>
                              <div className="input-group">
                                <input
                                  type="string"
                                  name="subcategory"
                                  className="form-control form-control-lg border-left-0"
                                  placeholder="Enter sub category"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.subcategory}
                                />
                              </div>
                            </div>
                            {errors.subcategory && touched.subcategory && (
                              <div className="text-danger">
                                {errors.subcategory}
                              </div>
                            )}
                          </div>
                        </div>
                        
                      </Modal.Body>
                      <Modal.Footer className="d-flex justify-content-end">
                        <Button
                          onClick={(e) =>
                            onAddSubCategory(values, setFieldValue)
                          }
                          variant="primary mx-auto w-25"
                        >
                          Add
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddSubCategory;
