import React from "react";

const Others = () => {
  const types = [
    {
      title: "Ratings & Review",
      icon: require('../../assets/images/icons/customer.png'),
    },
    {
      title: "Complaints",
      icon: require('../../assets/images/icons/inventory.png'),
    },
  ];
  return (
    <div className="row">
      {types.map((item,i) => {
        return (
          <div key={i} className="col-md-4 grid-margin stretch-card">
            <div className="card">
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

export default Others;
