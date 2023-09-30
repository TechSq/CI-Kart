import React, { useState } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";

const CategoriesListing = ({ data }) => {
  const history = useHistory()
  return (
    <div>
          <div className="card p-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
              <h4 className="card-title">Categories List</h4>
              <div className="d-flex">
                <button onClick={()=> history.push("/subcategory")} type="button" className="btn mx-2 btn-dark">Sub Category</button>
              </div>
              </div>
              
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Created Date</th>
                      <th>Category ID</th>
                      <th>Category Name</th>
                      <th>Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item, i) => {
                      return (
                        <tr>
                          <td>{i+1}</td>
                          <td>{moment(item.createdAt).utc().format('DD-MM-YYYY')}</td>
                          <td>{item.categoryId}</td>
                          <td>{item.categoryName}</td>
                          <td>{moment(item.updatedAt).utc().format('DD-MM-YYYY')}</td>
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

export default CategoriesListing;
