import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";

// import poststyle from "./style.module.css";
import {
  ContentDescription,
  ContentDescriptionHeader,
  ContentDescriptionText,
  ProductInfoTabStyle,
  TabsContainer,
} from "./styles";
// import useProductContext from "@/hooks/useProductContext";

import {
  ProductContentContainer,
  ProductSectionHeaderContainer,
} from "./styles";
import { InStock } from "./productAvailability/inStock";
import { ByOrder } from "./productAvailability/byOrder";
import EditProductFormik from "@/hooks/useEditProductFormik";

export const ProductInfo = ({
  setSpecificationBlock,
  accordionValue,
  HandlePercentage,
  setCompletedFields,
  setAccordianValue,
  productDetail,
  setPublished,
  availability,
  setProductAvailability,
  FetchProductDetail,
  percentage,
  category_lists,
}) => {
  // const { formik } = useProductContext();

  const { formik } = EditProductFormik();
  let category_id;
  if (category_lists?.length > 0) {
    category_id = category_lists.map((ele) => ele?.id);
  }

  // useEffect(() => {
  //   const { product_type } = formik.values;
  //   if (product_type === "simple") {
  //     HandlePercentage("availability", availability ? 5 : 0);
  //   } else {
  //     HandlePercentage("availability", availability ? 5 : 0);
  //   }
  // }, [availability]);

  return (
    <>
      <ProductContentContainer style={{ borderRadius: "6px" }}>
        <TabsContainer>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext
              value={
                productDetail?.product_type != "simple"
                  ? "by_order"
                  : availability || "in_stock"
              }
            >
              <Box
               sx={ProductInfoTabStyle}
              >
                {productDetail?.product_type == "simple" && (
                  <TabList
                    TabIndicatorProps={{
                      style: { background: "#DD484E" },
                    }}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      style={{
                        textTransform: "none",
                        color:
                          availability === "in_stock" ? "#DD484E" : "black",
                      }}
                      label="In Stock"
                      value="in_stock"
                      onClick={() => {
                        setProductAvailability("in_stock");
                        formik.setFieldValue("availability", "in_stock");
                        HandlePercentage("brand_id", 0);
                      }}
                    />
                    <Tab
                      style={{
                        textTransform: "none",
                        color:
                          availability === "by_order" ? "#DD484E" : "black",
                      }}
                      label="By Order"
                      value="by_order"
                      onClick={() => {
                        setProductAvailability("by_order");
                        formik.setFieldValue("availability", "by_order");
                        HandlePercentage(
                          "product_information_stock_validity",
                          0
                        );
                        HandlePercentage(
                          "product_information_stock_brand_id",
                          0
                        );
                        HandlePercentage(
                          "product_information_stock_manufacturer_year",
                          0
                        );
                        HandlePercentage(
                          "product_information_stock_model_number",
                          0
                        );
                        HandlePercentage(
                          "product_information_stock_condition",
                          0
                        );
                      }}
                    />
                  </TabList>
                )}
              </Box>

              {productDetail?.product_type == "simple" && (
                <TabPanel
                  style={{
                    textTransform: "none",
                    padding: "0px",
                    paddingTop: "30px",
                  }}
                  value="in_stock"
                >  
                  <InStock
                    setSpecificationBlock={setSpecificationBlock}
                    accordionValue={accordionValue}
                    setPublished={setPublished}
                    availability={availability}
                    HandlePercentage={HandlePercentage}
                    setCompletedFields={setCompletedFields}
                    setAccordianValue={setAccordianValue}
                    FetchProductDetail={FetchProductDetail}
                    percentage={percentage}
                    categoryIds = {category_id?.join(",")}
                  />
                </TabPanel>
              )}

              <TabPanel
                style={{
                  textTransform: "none",
                  padding: "0px",
                  paddingTop: "30px",
                }}
                value="by_order"
              >
                <ByOrder
                  setSpecificationBlock={setSpecificationBlock}
                  accordionValue={accordionValue}
                  availability={availability}
                  setPublished={setPublished}
                  HandlePercentage={HandlePercentage}
                  setCompletedFields={setCompletedFields}
                  setAccordianValue={setAccordianValue}
                  FetchProductDetail={FetchProductDetail}
                  percentage={percentage}
                  categoryIds = {category_id?.join(",")}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </TabsContainer>
      </ProductContentContainer>
    </>
  );
};
