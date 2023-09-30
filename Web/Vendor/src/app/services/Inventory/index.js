import React, { useEffect, useState } from "react";
import InventoryListing from "./InventoryListing";
import { getMethod } from "../../../helpers";
import Pagination from "../Pagination";

const Inventory = () => {
  const [InventoriesListing, setInventoriesListing] = useState([]);
  const [CategoriesList, setCategoriesList] = useState([]);
  const [SubCategoryList, setSubCategoryList] = useState([]);
  const [RequestedList, setRequestedList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = InventoriesListing?.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(InventoriesListing?.length / recordsPerPage);
  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const getInventoryListing = async () => {
    try {
      let url = "products/list_products";
      let response = await getMethod({ url });
      console.log("res check=",response)
      if (response.success) {
        setInventoriesListing(response.data);
      } else {
        console.log("err");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getCategoriesList = async () => {
    try {
      let url = "categories/get_categories";
      const token = localStorage.getItem("@token");
      let response = await getMethod({ url,token });
      if (response.success) {
        setCategoriesList(response.data);
      } else {
        console.log("err");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getSubCategoryList = async () => {
    try {
      let url = "subcategories/get_subcategories";
      let response = await getMethod({ url });
      if (response.success) {
        setSubCategoryList(response.data);
      } else {
        console.log("err");
      }
    } catch (e) {
      console.log(e);
    }
  };

  
  const getRequestedProduct = async () => {
    let vendorId = localStorage.getItem("@vendorDetail");
    let vUuid = JSON.parse(vendorId)
    try {
      let url = "products/list_requested_products";
      let response = await getMethod({ url });
      if (response.success) {
        let filtered = response.data.filter((item)=> item.vendorUuid == vUuid.vendorUuid);
        console.log("filtered result=",vUuid)
        setRequestedList(filtered);
      } else {
        console.log("err");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSubCategoryList();
  }, []);

  useEffect(() => {
    getCategoriesList();
  }, []);

  useEffect(() => {
    getInventoryListing();
  }, []);


  useEffect(() => {
    getRequestedProduct();
  }, []);

  return (
    <div>
      <h4 className="fw-bold">Inventory</h4>
      <InventoryListing
        data={currentRecords}
        CategoriesList={CategoriesList}
        getInventoryListing={getInventoryListing}
        SubCategoryList={SubCategoryList}
        RequestedList={RequestedList}
        getRequestedProduct={getRequestedProduct}
      />
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

export default Inventory;
