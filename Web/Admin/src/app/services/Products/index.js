import React, { useEffect, useState } from "react";
import ProductListing from "./ProductsListing";
import { getMethod } from "../../../helpers";
import Pagination from "../Pagination";

const Product = () => {
  const [ProductList, setProductList] = useState([]);
  const [CategoriesList, setCategoriesList] = useState([]);
  const [SubCategoryList, setSubCategoryList] = useState([]);
  const [RequestedList, setRequestedList] = useState([]);

   //pagination state and function
   const [currentPage, setCurrentPage] = useState(1);
   const [recordsPerPage] = useState(5);
   const indexOfLastRecord = currentPage * recordsPerPage;
   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
   const currentRecords = ProductList?.slice(
     indexOfFirstRecord,
     indexOfLastRecord
   );
   const nPages = Math.ceil(ProductList?.length / recordsPerPage);
   const goToNextPage = () => {
     if (currentPage !== nPages) setCurrentPage(currentPage + 1);
   };
   const goToPrevPage = () => {
     if (currentPage !== 1) setCurrentPage(currentPage - 1);
   };
   //pagination state and function

  const getProductList = async () => {
    try {
      let url = "products/list_products";
      const token = localStorage.getItem("@token");
      let response = await getMethod({ url,token });
      console.log("res check=", response);
      if (response.success) {
        setProductList(response.data);
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
      const token = localStorage.getItem("@token");
      let response = await getMethod({ url,token });
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
    try {
      let url = "products/list_requested_products";
      const token = localStorage.getItem("@token");
      let response = await getMethod({ url,token });
      if (response.success) {
        setRequestedList(response.data);
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
    getProductList();
  }, []);

  useEffect(() => {
    getRequestedProduct();
  }, []);

  return (
    <div>
      <h4 className="fw-bold">Product ({ProductList?.length})</h4>
      <ProductListing
        data={currentRecords}
        CategoriesList={CategoriesList}
        SubCategoryList={SubCategoryList}
        getProductList={getProductList}
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

export default Product;
