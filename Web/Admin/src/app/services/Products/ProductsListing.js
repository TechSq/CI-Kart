import React, { useState } from "react";
import AddProduct from "./AddProduct";
import { Tabs, Tab } from "react-bootstrap";
import moment from "moment";
import { putMethod } from "../../../helpers";
import toast, { Toaster } from "react-hot-toast";

const ProductsListing = ({
  data,
  CategoriesList,
  getProductList,
  SubCategoryList,
  RequestedList,
  getRequestedProduct
}) => {
  const [productShow, setProductShow] = useState(false);

  const vendorReqApproval = async (id,status) => {
    try {
      let url = "products/update_status";
      let payload = {
        id: id,
        status: status,
      };
      let response = await putMethod({ url, payload });
      if (response.success) {
        toast.success(response.message);
        getRequestedProduct()
      }else{
        toast.error(response.message)
      }
    } catch (e) {
      toast.error(e.response.message)
      console.log(e);
    }
  };
  return (
    <div>
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
          <div className="card p-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="card-title mb-0">Products List</h4>
                <div className="d-flex">
                  <button
                    onClick={() => setProductShow(true)}
                    type="button"
                    className="btn mx-2 btn-dark"
                  >
                    New Product
                  </button>
                </div>
              </div>
              <div
                className="col-12 col-xl-12 mb-4 mb-xl-0 grid-margin home-tab"
                style={{ border: ".5px solid lightgray" }}
              >
                <Tabs
                  defaultActiveKey="All"
                  id="uncontrolled-tab-example"
                  style={{ paddingLeft: "20px" }}
                >
                  <Tab eventKey="All" title="All" className="test-tab">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Created Date</th>
                            <th>Category ID</th>
                            <th>Category Name</th>
                            <th>Sub Category</th>
                            <th>Product Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item, i) => {
                            return (
                              <tr>
                                <td>{i + 1}</td>
                                <td>
                                  {moment(item.createdAt)
                                    .utc()
                                    .format("DD-MM-YYYY")}
                                </td>
                                <td>{item?.category?.categoryId}</td>
                                <td>{item?.category?.categoryName}</td>
                                <td>{item?.subcategory?.subcategoryName}</td>

                                <td>{item?.productName}</td>
                                <td>
                                  <label
                                    className={
                                      item.isActive
                                        ? `badge badge-primary`
                                        : `badge badge-secondary`
                                    }
                                  >
                                    {item.isActive ? "Active" : "Inactive"}
                                  </label>
                                </td>
                                <td>
                                  <button className="btn btn-dark mb-0">
                                    View
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </Tab>
                  <Tab
                    eventKey="Requested"
                    title="Requested"
                    className="test-tab"
                  >
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Created Date</th>
                            <th>Vendor Name</th>
                            <th>Category Name</th>
                            <th>Sub Category</th>
                            <th>Product Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {RequestedList.map((item, i) => {
                            return (
                              <tr>
                                <td>{i + 1}</td>
                                <td>
                                  {moment(item.createdAt)
                                    .utc()
                                    .format("DD-MM-YYYY")}
                                </td>
                                <td>{item?.vendor?.userName}</td>
                                <td>{item?.category?.categoryName}</td>
                                <td>{item?.subcategory?.subcategoryName}</td>
                                <td>{item?.productName}</td>
                                <td>
                                  <label
                                    className={
                                      item.status === "Requested"
                                        ? `badge badge-primary`
                                        : `badge badge-secondary`
                                    }
                                  >
                                    {item.status == "Requested"
                                      ? "Disapproved"
                                      : "Approved"}
                                  </label>
                                </td>
                                <td>
                                <button
                                   style={{cursor:"pointer"}}
                                    className="btn btn-dark mb-0">
                                    View
                                  </button>
                                  <label
                                   style={{cursor:"pointer"}}
                                    className={
                                      item.status == "Requested"
                                        ? `badge badge-secondary`
                                        : `badge badge-primary`
                                    }
                                    onClick={()=>vendorReqApproval(item._id, item.status == "Requested" ? "Approved" : "Requested")}
                                  >
                                    {item.status == "Requested"
                                      ? "Approve"
                                      : "Disapprove"}
                                  </label>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
      </div>
      <AddProduct
        productShow={productShow}
        setProductShow={setProductShow}
        data={data}
        CategoriesList={CategoriesList}
        getProductList={getProductList}
        SubCategoryList={SubCategoryList}
      />
    </div>
  );
};

export default ProductsListing;
