import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ProgressBar, Tabs, Tab, Dropdown } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { getMethod, putMethod } from "../../../helpers";

const VendorView = () => {
  let history = useHistory();
  const { id } = useParams();

  const [user, setuser] = useState({});

  const getVendorList = async () => {
    try {
      let url = "vendors";
      let response = await getMethod({ url });
      if (response.success) {
        let filtered = response.data.filter((item) => item._id == id);
        setuser(filtered[0]);
      } else {
        console.log("err");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const VendorApproval = async (value) => {
    try {
      let url = "vendors/status";
      let payload = {
        status: value,
        vendorUuid: user?.vendorUuid,
      };
      let response = await putMethod({ url, payload });
      if (response.success) {
        toast.success(response.data.message);
        getVendorList()
      }else{
        toast.error(response.message)
      }
    } catch (e) {
      console.log(e);
      toast.error(e.response.message)
    }
  };

  useEffect(() => {
    getVendorList();
  }, []);
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
      <div className="row">
        <div className="col-12 d-flex justify-content-between align-items-center mb-4">
          <h4>Vendors List - Vendor View</h4>
          <div className="d-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn mx-2 btn-outline-dark"
              disabled={user?.isActive}
              onClick={()=>VendorApproval("Approved")}
            >
              {user?.isActive ? "Approved" : "Approve"}
            </button>
            <button
              type="button"
              onClick={() => history.goBack()}
              className="btn mx-2 btn-outline-dark"
            >
              Back
            </button>
            <button type="button" className="btn mx-2 btn-outline-dark">
              Edit
            </button>
            <button type="button" onClick={()=>VendorApproval("Rejected")} className="btn mx-2 btn-dark">
              Deactivate
            </button>
          </div>
        </div>
        <div
          className="col-12 col-xl-12 mb-4 mb-xl-0 grid-margin home-tab"
          style={{ border: ".5px solid lightgray" }}
        >
          <Tabs defaultActiveKey="Profile" id="uncontrolled-tab-example">
            <Tab eventKey="Profile" title="Profile" className="test-tab">
            <h3 className="mb-4">{user?.userName}</h3>
              <div className="row">
              <div className="col-md-4">
                <div className="row">
                  <div className="">
                    <p className="fw-bold mb-2">Customer Details</p>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <p>First Name</p>
                      <p>{user?.firstName}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <p>Last Name</p>
                      <p>{user?.lastName}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <p>Email</p>
                      <p>{user?.email}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <p>Mobile</p>
                      <p>{user?.phoneNumber}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <p>Date of Birth</p>
                      <p>{user?.dob}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <p>Gender</p>
                      <p>{user?.gender}</p>
                    </div>
                    
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="">
                    <p className="fw-bold mb-2">Customer Bank Details</p>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <p>Account Name</p>
                      <p>{user?.bankName}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <p>Bank Account Number</p>
                      <p>{user?.bankAccountNumber}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <p>IFSC Code</p>
                      <p>{user?.IFSCCode}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="">
                    <p className="fw-bold mb-2">Company Details</p>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <p>Legal Name</p>
                      <p>{user?.legalName}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <p>Address Line 1</p>
                      <p>{user?.address1}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <p>Address Line 2</p>
                      <p>{user?.address2}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <p>City</p>
                      <p>{user?.city}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <p>District</p>
                      <p>{user?.district}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <p>State</p>
                      <p>{user?.state}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <p>Pincode</p>
                      <p>{user?.pincode}</p>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </Tab>
            <Tab eventKey="Orders" title="Orders">
              <div className="row">
                <div className="col-sm-12">Orders</div>
              </div>
            </Tab>
            <Tab eventKey="Inventory" title="Inventory">
              <div className="row">
                <div className="col-sm-12">Inventory</div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default VendorView;
