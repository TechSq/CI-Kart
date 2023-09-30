import React from "react";
import { useHistory } from "react-router-dom";

const types = [
    {
      title: "Customers",
      icon: require('../../assets/images/icons/customer.png'),
      route:"/customers"
    },
    {
      title: "Inventory",
      icon: require('../../assets/images/icons/inventory.png'),
      route:"/inventory"
    },
    {
      title: "Orders",
      icon: require('../../assets/images/icons/orders.png'),
      route:"/customers"
    },
    {
      title: "Others",
      icon: null,
      route:"/others"
    },
  ];


const Services = () => {
    let history = useHistory();

  return (
    <div className="row">
      {types.map((item,i) => {
        return (
          <div key={i} className="col-md-4 grid-margin stretch-card">
            <div className="card p-3" style={{backgroundColor: "#005FAC"}} onClick={()=> history.push(item.route)}>
              <div className="card-body d-flex justify-content-between">
                <h4>{item.title}</h4>
                {
                    item.icon && <img src={item.icon} style={{objectFit:"contain"}} alt="logo"/>
                }
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Services;
