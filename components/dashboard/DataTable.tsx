import React, { useState, useEffect } from "react";
import { apiClient } from "@/components/common/common";
import { ProductTable } from "./ProductTable";

const DataTable = () => {
  const [productsList, setProductsList] = useState<any>();
  const [search, setSearch] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);

  const getProductList = async (type = "all", searchParameters = []) => {
    try {
      setLoader(true);
      const formData = new FormData();
      if (searchParameters?.length > 0) {
        for (let i = 0; i < searchParameters?.length; i++) {
          formData.append(
            searchParameters[i].key,
            searchParameters[i].value?.toString()
          );
        }
      }

      formData?.append("type", type);
      formData.append("per_page", "10");
      formData.append("current_page", "2");

      const response = await apiClient(
        "product/list",
        "get",
        { body: formData },
        true
      );

      setLoader(false);
      setProductsList(response.data);
    } catch (error) {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProductList("approved", []);
  }, []);

  return (
    <>
      <ProductTable
        products={productsList}
        loader={loader}
        getProductsList={getProductList}
        search={search}
        setSearch={setSearch}
      />
    </>
  );
};

export default DataTable;
