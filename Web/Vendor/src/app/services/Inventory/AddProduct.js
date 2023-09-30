import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";
import { postMethod } from "../../../helpers";
import axios from "axios";

const AuthSchema = Yup.object().shape({
  subcategory: Yup.string().required("Sub category is Required"),
  productName: Yup.string().required("Product Name is Required"),
  description: Yup.string().required("Description is Required"),
  category: Yup.string().required("Select category"),
  productImg: Yup.string().required("productImg is Required"),
});

const companyLogo = require("../../../assets/images/company_logo.png");
const initialValues = {
  subcategory: "",
  category: "",
  productName: "",
  description: "",
  productImg: "",
};
const AddProduct = ({
  productShow,
  setProductShow,
  data,
  CategoriesList,
  getInventoryListing,
  SubCategoryList,
  getRequestedProduct
}) => {
  const [image, setImage] = useState({ preview: "", raw: "" });

  const onAddProduct = async (values) => {
    let vendorId = localStorage.getItem("@vendorDetail");
    let vUuid = JSON.parse(vendorId);
    try {
      let url = "products/add_product_by_vendor";
      let payload = {
        categoryUuid: values.category,
        subcategoryUuid: values.subcategory,
        productName: values.productName,
        description: values.description,
        vendorUuid: vUuid.vendorUuid,
        imageUrl: image?.raw,
      };
      let response = await postMethod({ url, payload });
      if (response.success) {
        setProductShow(false);
        getRequestedProduct();
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (e) {
      toast.error(e.response.message);
    }
  };

  const handleChangeImage = async (e) => {
    let url = `${process.env.REACT_APP_BACKEND_URL}common/upload/s3/product`;
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
            <div className="row m-0">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <Modal
                      size="md"
                      show={productShow}
                      onHide={() => setProductShow(false)}
                      aria-labelledby="example-modal-sizes-title-lg"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>New Product Request</Modal.Title>
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
                                    Product Logo
                                  </h5>
                                </>
                              )}
                            </label>
                            <input
                              type="file"
                              id="upload-button"
                              style={{ display: "none" }}
                              onChange={handleChangeImage}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-6">
                            <div className="form-group mb-0">
                              <label>Category</label>
                              <div className="input-group">
                                <select
                                  name="category"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="form-control form-control-lg"
                                >
                                  <option value="">--Select Category--</option>
                                  {CategoriesList.map((item) => (
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
                                <select
                                  name="subcategory"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="form-control form-control-lg border-left-0"
                                >
                                  <option value="">
                                    --Select SubCategory--
                                  </option>
                                  {SubCategoryList.map((item) => (
                                    <option value={item.subcategoryUuid}>
                                      {item.subcategoryName}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            {errors.subcategory && touched.subcategory && (
                              <div className="text-danger">
                                {errors.subcategory}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group mb-2">
                              <label>New Product</label>
                              <div className="input-group">
                                <input
                                  type="string"
                                  name="productName"
                                  className="form-control form-control-lg border-left-0"
                                  placeholder="Enter Product"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.productName}
                                />
                              </div>
                            </div>
                            {errors.productName && touched.productName && (
                              <div className="text-danger">
                                {errors.productName}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group mb-0">
                              <label>Description</label>
                              <div className="input-group">
                                <textarea
                                  type="string"
                                  name="description"
                                  className="form-control form-control-lg border-left-0"
                                  placeholder="Enter Description"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.description}
                                />
                              </div>
                            </div>
                            {errors.description && touched.description && (
                              <div className="text-danger">
                                {errors.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer className="d-flex justify-content-end">
                        <Button
                          variant="primary mx-auto w-25"
                          onClick={() => onAddProduct(values)}
                        >
                          Add
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
    </>
  );
};

export default AddProduct;
