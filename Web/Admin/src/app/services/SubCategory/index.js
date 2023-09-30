import React, { useEffect, useState } from "react";
import SubCategoryListing from "./SubCategoryListing";
import { getMethod } from "../../../helpers";
import Pagination from "../Pagination";

const SubCategory = () => {
  const [SubCategoryList, setSubCategoryList] = useState([]);
  const [CategoriesList, setCategoriesList] = useState([]);

  //pagination state and function
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const indexOfLastRecord = currentPage * recordsPerPage; // 5
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage; // 0
  const currentRecords = SubCategoryList?.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(SubCategoryList?.length / recordsPerPage); // 3
  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  //pagination state and function

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
      let response = await getMethod({ url,token});
      if (response.success) {
        setSubCategoryList(response.data);
      } else {
        console.log("err");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  useEffect(() => {
    getSubCategoryList();
  }, []);



  return (
    <div>
      <h4 className="fw-bold">Category - SubCategories ({SubCategoryList?.length})</h4>
      <SubCategoryListing data={currentRecords} CategoriesList={CategoriesList} getSubCategoryList={getSubCategoryList} />
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

export default SubCategory;
