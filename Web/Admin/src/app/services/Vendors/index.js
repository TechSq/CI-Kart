import React, { useEffect, useState } from "react";
import VendorsListing from "./VendorsListing";
import { getMethod } from "../../../helpers";
import Pagination from "../Pagination";

const Vendors = () => {
  const [vendorsList, setvendorsList] = useState([]);
  //pagination state and function
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = vendorsList?.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(vendorsList?.length / recordsPerPage);
  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const getVendorListing = async () => {
    try {
      let url = "vendors";
      let response = await getMethod({ url });
      if (response.success) {
        setvendorsList(response.data);
      } else {
        console.log("err");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getVendorListing();
  }, []);


  return (
    <div>
      <h4 className="fw-bold">Vendors ({vendorsList?.length})</h4>
      <VendorsListing data={currentRecords} />
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

export default Vendors;
