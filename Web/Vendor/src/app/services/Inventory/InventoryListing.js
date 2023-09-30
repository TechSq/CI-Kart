import React, { useState } from "react";
import AddProduct from "./AddProduct";
import { Tabs, Tab } from "react-bootstrap";
import moment from "moment";

const InventoryListing = ({
  data,
  CategoriesList,
  getInventoryListing,
  SubCategoryList,
  RequestedList,
  getRequestedProduct
}) => {
  const [productShow, setProductShow] = useState(false);
  return (
    <div>
          <div className="card p-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="card-title mb-0">Inventory List ({data?.length})</h4>
                <div className="d-flex">
                  <button
                    onClick={() => setProductShow(true)}
                    type="button"
                    className="btn mx-2 btn-dark"
                  >
                    New Product Request
                  </button>
                </div>
              </div>
              <div
                className="col-12 col-xl-12 mb-4 mb-xl-0 grid-margin home-tab"
                style={{ border: ".5px solid lightgray" }}
              >
                <Tabs
                  defaultActiveKey="MyInventory"
                  id="uncontrolled-tab-example"
                  style={{ paddingLeft: "20px" }}
                >
                  <Tab
                    eventKey="MyInventory"
                    title="My Inventory"
                    className="test-tab"
                  >
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Created Date</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Sub Category</th>
                            <th>MIQ</th>
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
                                <td>{item.productName}</td>
                                <td>{item?.category?.categoryName}</td>
                                <td>{item?.subcategory?.subcategoryName}</td>
                                <td>0</td>
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
                                  {/* <label className="badge badge-dark">
                                    View
                                  </label> */}
                                <button className="btn btn-dark btn-sm mb-0">
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
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {RequestedList?.map((item, i) => {
                            return (
                              <tr>
                                <td>{i + 1}</td>
                                <td>
                                  {moment(item.createdAt)
                                    .utc()
                                    .format("DD-MM-YYYY")}
                                </td>
                                <td>{item.productName}</td>
                                <td>{item?.category?.categoryName}</td>
                                <td>
                                  <label
                                    className={
                                      item.status == "Approved"
                                        ? `badge badge-primary`
                                        : `badge badge-secondary`
                                    }
                                  >
                                    {item.status}
                                  </label>
                                </td>
                                <td>
                                  {/* <label className="badge badge-dark">
                                    View
                                  </label> */}
                                  <button className="btn btn-dark btn-sm mb-0">
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
                  <Tab eventKey="All" title="All" className="test-tab">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Created Date</th>
                            <th>Product Name</th>
                            <th>Category</th>
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
                                <td>{item.productName}</td>
                                <td>{item?.category?.categoryName}</td>
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
                                  {/* <label className="badge badge-dark mx-2">
                                    View
                                  </label> */}
                                </td>
                                <td>
                                <button className="btn btn-dark btn-sm mb-0">
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
                </Tabs>
              </div>
        </div>
      </div>
      <AddProduct
        productShow={productShow}
        setProductShow={setProductShow}
        data={data}
        CategoriesList={CategoriesList}
        getInventoryListing={getInventoryListing}
        SubCategoryList={SubCategoryList}
        getRequestedProduct={getRequestedProduct}
      />
    </div>
  );
};

export default InventoryListing;
