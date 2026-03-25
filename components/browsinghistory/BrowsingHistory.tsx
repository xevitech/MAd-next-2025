import React, { useEffect, useState } from "react";
import {
  BrowsingButtonBox,
  BrowsingHeading,
  BrowsingLoadMore,
  BrowsingSpanHeading,
} from "./browingStyle";
import { Box, Button, Grid } from "@mui/material";
import ProductItem from "@/components/ProductsListing/ProductItem";
import { apiClient } from "../common/common";
import { AddProductDetail } from "@/hooks/productDetailsReducer";
import { useDispatch } from "react-redux";
import BrowsingHistorySkeleton from "./BrowsingHistorySkeleton";

export default function BrowsingHistory({ list0, load }) {
  const [loader, setLoader] = useState<boolean>(true);
  const [topItems, setTopItems] = useState([list0]);
  useEffect(() => {
  }, []);
  return (
    <>
      <BrowsingHeading>
        Browsing History{" "}
        <BrowsingSpanHeading>(last three months)</BrowsingSpanHeading>
      </BrowsingHeading>
      {load ? (
        <Box>
          <BrowsingHistorySkeleton />
        </Box>
      ) : (
        <Box mt={2}>
          <Grid container spacing={2}>
            {list0?.map((product) => {
              return (
                <Grid item xs={12} sm={12} md={3} lg={2.4} key={product.id}>
                  {" "}
                  <Box sx={{ height: "100%" }}>
                    <ProductItem data={product} />
                  </Box>
                </Grid>
              );
            })}
          </Grid>          
        </Box>
      )}
    </>
  );
}
