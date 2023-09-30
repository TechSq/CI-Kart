import React, { useEffect, useState } from "react";
import CategoriesListing from "./CategoriesListing";
import { getMethod } from "../../../helpers";

const Categories = () => {
  const [CategoriesList, setCategoriesList] = useState([]);

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

  useEffect(() => {
    getCategoriesList();
  }, []);

  return (
    <div>
      <h4 className="fw-bold">Categories ({CategoriesList?.length})</h4>
      <CategoriesListing data={CategoriesList} />
    </div>
  );
};

export default Categories;
