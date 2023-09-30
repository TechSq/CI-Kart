import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomersListing from "./CustomersListing";
import { getMethod } from "../../../helpers";
import Pagination from "../Pagination";

const Customers = () => {
  const [usersList, setusersList] = useState([]);
  //pagination state and function
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = usersList?.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(usersList?.length / recordsPerPage);
  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  //pagination state and function

  const getCustomersList = async () => {
    try {
      let url = "users";
      let response = await getMethod({ url });
      if (response.success) {
        setusersList(response.data);
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
      <h4 className="fw-bold">Customers ({usersList?.length})</h4>
      <CustomersListing data={currentRecords} />
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
      />
    </div>
  );
};

export default Customers;
