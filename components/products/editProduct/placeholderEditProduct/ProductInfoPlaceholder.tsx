import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import EditProductFormik from "@/hooks/useEditProductFormik";
import {
  ProductContentContainer,
  ProductInfoTabStyle,
  TabsContainer,
} from "../productInformation/styles";
import { InStockPlaceholder } from "./InStockPlaceholder";
import { ByOrderPlaceholder } from "./ByOrderPlaceholder";
export const ProductInfoPlaceholder = ({
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
  category_lists,
}) => {
  const { formik } = EditProductFormik();
  let category_id = category_lists.map((ele) => ele?.id);

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
                // sx={{
                //   borderBottom: 1,
                //   borderColor: "divider",
                // }}
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
                  <InStockPlaceholder
                    accordionValue={accordionValue}
                    setSpecificationBlock={setSpecificationBlock}
                    setPublished={setPublished}
                    availability={availability}
                    HandlePercentage={HandlePercentage}
                    setCompletedFields={setCompletedFields}
                    setAccordianValue={setAccordianValue}
                    FetchProductDetail={FetchProductDetail}
                    categoryIds={category_id?.join(",")}
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
                <ByOrderPlaceholder
                  accordionValue={accordionValue}
                  setSpecificationBlock={setSpecificationBlock}
                  availability={availability}
                  setPublished={setPublished}
                  HandlePercentage={HandlePercentage}
                  setCompletedFields={setCompletedFields}
                  setAccordianValue={setAccordianValue}
                  FetchProductDetail={FetchProductDetail}
                  categoryIds={category_id?.join(",")}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </TabsContainer>
      </ProductContentContainer>
    </>
  );
};
