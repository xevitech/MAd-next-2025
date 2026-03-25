import { Typography } from "@mui/material";
import React, { useState } from "react";
import { Navigate } from "../common/common";
import { ProductListViewDes } from "./style";

function ProductListViewDescription({ element }) {
  return (
    <ProductListViewDes
      sx={{ cursor: "pointer" }}
      onClick={(e) => {
        e.stopPropagation();
        Navigate(element);
      }}
    >
      <Typography>{element.description}</Typography>
    </ProductListViewDes>
  );
}

export default ProductListViewDescription;
