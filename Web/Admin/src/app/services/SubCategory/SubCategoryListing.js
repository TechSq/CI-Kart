import React, { useState } from "react";
// import AddProduct from "./AddProduct";
import AddSubCategory from "./AddSubCategory";
import moment from "moment";

const SubCategoryListing = ({ data,CategoriesList,getSubCategoryList }) => {
  const [subcategoryShow, setsubcategoryShow] = useState(false);
  const [productShow,setProductShow]= useState(false);
  return (
    <div>
          <div className="card mb-0 p-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
              <h4 className="card-title">Categories - SubCategories List</h4>
              <div className="d-flex">
                <button onClick={()=> setsubcategoryShow(true)} type="button" className="btn mx-2 btn-dark">New Sub Category</button>
                {/* <button onClick={()=> setProductShow(true)} type="button" className="btn mx-2 btn-dark">New Product</button> */}
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
                      <th>SubCategory Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item, i) => {
                      return (
                        <tr>
                          <td>{i+1}</td>
                          <td>{moment(item.createdAt).utc().format('DD-MM-YYYY')}</td>
                          <td>{item?.categories[0]?.categoryId}</td>
                          <td>{item?.categories[0]?.categoryName}</td>
                          <td>{item.subcategoryName}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
      </div>
      <AddSubCategory subcategoryShow={subcategoryShow} setsubcategoryShow={setsubcategoryShow} data={CategoriesList} getSubCategoryList={getSubCategoryList} />
      {/* <AddProduct productShow={productShow} setProductShow={setProductShow} data={data}/> */}
    </div>
  );
};

export default SubCategoryListing;
