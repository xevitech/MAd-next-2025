import React, { useEffect, useState } from "react";
import { BrowsingHeading, BrowsingSpanHeading } from "./browingStyle";
import { Box, Grid } from "@mui/material";
import ProductItem from "@/components/ProductsListing/ProductItem";
import { apiClient } from "../common/common";
import { AddProductDetail } from "@/hooks/productDetailsReducer";
import { useDispatch } from "react-redux";
import BrowsingHistorySkeleton from "./BrowsingHistorySkeleton";

export default function SuggestionForYou({list1 = [],load}) {
  const [loader, setLoader] = useState<boolean>(true);
  // useEffect(() => {
  //   const fetchAllProductsList = async () => {
  //     let userid = JSON.parse(localStorage.getItem("userData"))?.id;
  //     var body = {
  //       per_page: "5",
  //       page: 2,
  //       seller_id: "",
  //       user_id: userid ? userid : "",
  //     };
  //     let response = await apiClient("front/product/list", "post", { body });
  //     setLoader(true);
  //     const { data } = response;
  //     setData(data);
  //     setLoader(false);
  //     dispatch(AddProductDetail({ status: false, loader: false, data: {} }));
  //   };
  //   fetchAllProductsList();
  // }, []);
  // const [data, setData] = useState([]);
  // const dispatch = useDispatch();
  return (
    <>
      <BrowsingHeading>
        Suggestion For You
        <BrowsingSpanHeading>
          {" "}
          (Based on yours recent activities)
        </BrowsingSpanHeading>
      </BrowsingHeading>
      {load ? (
        <Box>
          <BrowsingHistorySkeleton />
        </Box>
      ) : (
        <Box mt={2}>
          <Grid container spacing={2}>
            {Array.isArray(list1) && list1.slice(0, 8)?.map((product, index) => (
              <Grid item xs={12} sm={12} md={3} lg={2.4} key={index}>
                <Box sx={{ height: "100%" }}>
                  <ProductItem data={product} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
}
