import React, { useEffect } from "react";
import { PassiveInformation } from "./passive";
import { ActiveInformation } from "./active";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ProductContentContainer, TabsContainer } from "./styles";
// import useProductContext from "@/hooks/useProductContext";
import { useSelector, useDispatch } from "react-redux";
import { setInformationType } from "@/hooks/ProductReducers";
import { configProductScoreValues } from "@/components/common/common";
import { ProductInfoTabStyle } from "../styles";

export const ActivePassiveTab = ({
  setCommercialBlock,
  HandlePercentage,
  setCompletedFields,
  FetchProductDetail,
  setAccordianValue,
  category_lists,
  productDetail,
  setPublished,
  setProductDetail,
  percentage,
}) => {
  const dispatch = useDispatch();

  const { informationType } = useSelector((state: any) => state.editProduct);
  const { specificationsList } = useSelector(
    (state: any) => state.calculatorData
  );

  const productType: any = productDetail?.product_type;

  const handleInformationTypeChange = (e, value) => {
    if (value) {
      dispatch(setInformationType(value));
    }
  };

  useEffect(() => {
    if (productType == "configured" && informationType == "passive") {
      handleInformationTypeChange("", "active");
    }
  }, [productType]);
    const { matrixItems } = useSelector((state: any) => state.calculatorData);

  useEffect(() => {
    if (productDetail?.product_type === "simple") {
    } else if(productDetail?.product_type == "configured") {
      if(matrixItems?.length === 0) return;
      const allPricesFilled = matrixItems?.every((item) => item?.price);
      const { multiSpecifications, specifications } =
        configProductScoreValues?.productFeaturesAndCharacteristics
          ?.config_product_type;
      HandlePercentage(
        "config_product_features_multi_specification",
        specificationsList?.length > 0 && allPricesFilled  ? 4.282655246 : 0
      );
    }
  }, [specificationsList, matrixItems, productDetail]);

  return (
    <>
      <ProductContentContainer>
        {productType == "simple" ? (
          <TabsContainer>
            <PassiveInformation
            FetchProductDetail={FetchProductDetail}
              setCommercialBlock={setCommercialBlock}
              setPublished={setPublished}
              HandlePercentage={HandlePercentage}
              setCompletedFields={setCompletedFields}
              setAccordianValue={setAccordianValue}
              category_lists={category_lists}
              // productDetail={productDetail}
              setProductDetail={setProductDetail}
              percentage={percentage}
            />
          </TabsContainer>
        ) : (
          <TabsContainer>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={informationType}>
                <Box
                  sx={{...ProductInfoTabStyle,
                    borderBottom: 1,
                    borderColor: "divider",
                    fontFamily: "open sans",
                  }}

                >
                  <TabList
                    TabIndicatorProps={{
                      style: { background: "#DD484E" },
                    }}
                    onChange={handleInformationTypeChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      style={{
                        textTransform: "none",
                        color: informationType === "1" ? "#DD484E" : "black",
                      }}
                      label="Specifications"
                      value="passive"
                    />

                    {(productType === "configured" ||
                      productType === "variation") && (
                      <Tab
                        style={{
                          textTransform: "none",
                          color: informationType === "2" ? "#DD484E" : "black",
                        }}
                        label="Multi Specifications"
                        value="active"
                      />
                    )}
                  </TabList>
                </Box>
                <TabPanel
                  style={{
                    textTransform: "none",
                    padding: "0px",
                    paddingTop: "30px",
                  }}
                  value="passive"
                >
                  <PassiveInformation
                  FetchProductDetail={FetchProductDetail}
                    setCommercialBlock={setCommercialBlock}
                    setPublished={setPublished}
                    HandlePercentage={HandlePercentage}
                    setCompletedFields={setCompletedFields}
                    setAccordianValue={setAccordianValue}
                    category_lists={category_lists}
                    // productDetail={productDetail}
                    setProductDetail={setProductDetail}
                    percentage={percentage}
                  />
                </TabPanel>
                <TabPanel
                  style={{
                    textTransform: "none",
                    padding: "0px",
                    paddingTop: "30px",
                  }}
                  value="active"
                >
                  <>
                    <ActiveInformation
                      setCompletedFields={setCompletedFields}
                      setCommercialBlock={setCommercialBlock}
                      setPublished={setPublished}
                      setAccordianValue={setAccordianValue}
                      category_lists={category_lists}
                      productDetail={productDetail}
                      percentage={percentage}
                    />
                  </>
                </TabPanel>
              </TabContext>
            </Box>
          </TabsContainer>
        )}
      </ProductContentContainer>
    </>
  );
};
