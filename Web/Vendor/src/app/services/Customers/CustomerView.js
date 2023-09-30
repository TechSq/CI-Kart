import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { ProgressBar,Tabs, Tab, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { getMethod } from '../../../helpers';

const CustomerView = () => {
    let history = useHistory();
    const {id} = useParams();

    const [user, setuser] = useState({});

    const getCustomersList = async () => {
      try {
        let url = "users";
        let response = await getMethod({ url });
        if (response.success) {
          let filtered = response.data.filter((item)=> item._id == id)
          setuser(filtered[0]);
        } else {
          console.log("err");
        }
      } catch (e) {
        console.log(e);
      }
    };
  
    useEffect(() => {
      getCustomersList();
    }, []);
    
  return (
    <div>
      <div className="row">
        <div className="col-12 d-flex justify-content-between align-items-center mb-4">
          <h4>Customers List - Customer View</h4>
          <div className='d-flex justify-content-between align-items-center'>
            <button type="button" onClick={()=>history.goBack()} className="btn mx-2 btn-outline-dark">Back</button>
            {/* <button type="button" className="btn mx-2 btn-outline-dark">Edit</button>
            <button type="button" className="btn mx-2 btn-dark">Deactivate</button> */}
          </div>
        </div>
        <div className="col-12 col-xl-12 mb-4 mb-xl-0 grid-margin home-tab" style={{border:".5px solid lightgray"}}>
            <Tabs defaultActiveKey="Profile" id="uncontrolled-tab-example">
              <Tab eventKey="Profile" title="Profile" className="test-tab">
                <div className='col-md-4'>
                <div className="row">
                  <div className="col-sm-12">
                    <h3 className='mb-4'>{user?.userName}</h3>
                    <p className='fw-bold mb-2'>Customer Details</p>
                    <div className='d-flex justify-content-between align-items-center mb-1'>
                        <p>Email</p>
                        <p>{user?.email}</p>
                    </div>
                    <div className='d-flex justify-content-between align-items-center mb-1'>
                        <p>Mobile</p>
                        <p>{user?.phoneNumber}</p>
                    </div>
                    <div className='d-flex justify-content-between align-items-center mb-1'>
                        <p>Gender</p>
                        <p>{user?.gender}</p>
                    </div>
                    <div className='d-flex justify-content-between align-items-center mb-1'>
                        <p>DOB</p>
                        <p>{user?.dob}</p>
                    </div>
                  </div>
                </div>
                </div>
                <div className='col-md-8'>
                    
                </div>
                
              </Tab>
              <Tab eventKey="Orders" title="Orders">
              <div className="row">
                  <div className="col-sm-12">
                  Orders
                  </div>
                </div>
              </Tab>
              {/* <Tab eventKey="Wishlist" title="Wishlist">
              <div className="row">
                  <div className="col-sm-12">
                  Wishlist
                  </div>
                </div>
                </Tab> */}
            </Tabs>
          </div>
      </div>
    </div>
  )
}

export default CustomerView