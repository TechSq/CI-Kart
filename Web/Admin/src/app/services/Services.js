import React from "react";
import { useHistory } from "react-router-dom";

const types = [
  {
    title: "Customers",
    route:"/customers"
  },
  {
    title: "Vendors",
    route:"/vendors"
  },
  {
    title: "Affiliate",
    route:"/customers"
  },
  {
    title: "Coupons",
    route:"/customers"
  },
  {
    title: "Discounts",
    route:"/customers"
  },
  {
    title: "Inventory",
    route:"/customers"
  },
  {
    title: "Category",
    route:"/categories"
  },
  {
    title: "Orders",
    route:"/customers"
  },
  {
    title: "Third Party",
    route:"/customers"
  },
  {
    title: "Complaints",
    route:"/customers"
  },
  {
    title: "Ratings & Reviews",
    route:"/customers"
  },
  {
    title: "Products",
    route:"/product"
  },
];

const Services = () => {

  const history = useHistory()
  return (
    <div className="row">
      {types.map((item, i) => {
        return (
          <div key={i} className="col-md-4 grid-margin stretch-card" onClick={()=> history.push(item.route)}>
            <div className="card" style={{backgroundColor:"#005FAC"}}>
              <div className="card-body d-flex justify-content-center align-items-center">
                <h4>{item.title}</h4>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Services;
