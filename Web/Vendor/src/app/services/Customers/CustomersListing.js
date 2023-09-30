import React from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";

const CustomersListing = ({ data }) => {
  const history = useHistory()
  return (
    <div>
          <div className="card p-3">
            <div className="card-body">
              <h4 className="card-title">List of Customers Registered</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Registered Date</th>
                      <th>Customer Name</th>
                      <th>Total Orders</th>
                      <th>Last Orders</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.reverse().map((item, i) => {
                      return (
                        <tr>
                          <td>{i+1}</td>
                          <td>{moment(item.createdAt).utc().format('DD-MM-YYYY')}</td>
                          <td>{item.userName}</td>
                          <td>0</td>
                          <td>{moment(item.updatedAt).utc().format('DD-MM-YYYY')}</td>
                          <td>
                            <label className={item.isActive ? `badge badge-primary` : `badge badge-secondary`}>{item.isActive ? "Active" : "Inactive"}</label>
                          </td>
                          <td>
                            {/* <label className="badge badge-dark" onClick={()=> history.push(`/customers/${item._id}`)}>
                              View
                            </label> */}
                            <button className="btn btn-dark btn-sm mb-0" onClick={()=> history.push(`/customers/${item._id}`)}>
                                    View
                              </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
      </div>
    </div>
  );
};

export default CustomersListing;
