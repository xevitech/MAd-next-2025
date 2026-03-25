import React, { useEffect, useState } from "react";
import { Box, Button, Typography, styled } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSelector } from "react-redux";
import { ConstantPrices } from "../productInformation/activePassive/active/constantPrices";
import { CustomSpecifications } from "../productInformation/activePassive/active/customSpecs/CustomSpecifications";
// import { ListOfGroupsAndLevels } from "../productInformation/activePassive/active/GroupsAndLevels";
import { GeneratedSpecificationMatrix } from "../productInformation/activePassive/active/specMatrix/GeneratedSpecificationMatrix";
import { ConstantPricesPlaceholder } from "./ConstantPricesPlaceholder";
import { CustomSpecificationsPlaceholder } from "./CustomSpecificationsPlaceholder";
import { ListOfGroupsAndLevelsPlaceholder } from "./ListOfGroupsAndLevelsPlaceholder";
import { GeneratedSpecificationMatrixPlaceholder } from "./GeneratedSpecificationMatrixPlaceholder";
import { apiClient, getProductId } from "@/components/common/common";
export const ActiveInformationPlaceholder = ({
  setCompletedFields,
  setCommercialBlock,
  setAccordianValue,
  category_lists,
  setPublished,
  productDetail,
  percentage,
}) => {
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const { matrixItems } = useSelector((state: any) => state.calculatorData);
  const [error, setError] = useState<any>("");
    const productId: string = getProductId();
      const { customSpecReduxState } = useSelector((state: any) => state.editProduct);
  const checkMandatoryFields = (customSpec) => {
    if (customSpec?.length == 0) {
      return [];
    }
    const emptyFields = customSpec?.filter((item) => {
      if (item?.mandatory_field?.toLowerCase() === "yes") {
        if (
          item.value === null ||
          item.value === undefined ||
          item.value === ""
        ) {
          return true;
        }
      }
      return false;
    });

    return emptyFields;
  };
  const SaveAndContinueHandler = async () => {
    const allPricesFilled = matrixItems?.every((item) => item?.price);
    const emptyFields = checkMandatoryFields(customSpecReduxState);
    // if (matrixItems?.length === 0) {
    //   setError(
    //     "Please generate the matrix and evaluate the price. Once this is done, you will be able to save the data."
    //   );
    //   return;
    // } else 
    
    if (!allPricesFilled && matrixItems?.lenght > 0) {
      setError("Please check all the prices. You may have missed some in the matrix.");
      return;
    } 
    
    // else if(emptyFields?.length > 0){
    //   setError(
    //     "Please fill all the manadatory fields in specification."
    //   );
    //   return;
    // }
    
    else {
      const formData = new FormData();
      formData.append("id", productId);
      formData.append("published", "0");
      setButtonLoader(true);
      let response = await apiClient(
        "product/view/single/update",
        "post",
        { body: formData },
        true,
        true
      );

      if (response?.status == 200) {
        setPublished("");
        // setTimeout(() => {
          setCompletedFields((prev) => ({ ...prev, specification: true }));
          setCommercialBlock({ disable: false, expanded: true });
          setAccordianValue("commercial");
          setButtonLoader(false);
        // }, 1000);
      }

    }
  };
  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  });
  useEffect(() => {
    if (matrixItems?.length === 0) return;
    const allPricesFilled = matrixItems?.every((item) => item?.price);
    const emptyFields = checkMandatoryFields(customSpecReduxState);
    if (allPricesFilled && emptyFields?.length == 0) {
      setCommercialBlock({ disable: false, expanded: true });
      setCompletedFields((prev) => ({ ...prev, specification: true }));
      return;
    }
    // else{
    setCommercialBlock({ disable: true, expanded: false });
    setCompletedFields((prev) => ({ ...prev, specification: false }));
    // }
    // if (productDetail?.description && productDetail?.brand_id) {
    //   setCommercialBlock({ disable: false, expanded: true });
    //   setCompletedFields((prev) => ({ ...prev, specification: true }));
    // }
  }, [matrixItems, customSpecReduxState]);

  const ButtonCol = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    paddingTop: "14px",
  });

  return (
    <>
      <ConstantPricesPlaceholder />
      <CustomSpecificationsPlaceholder
        setCompletedFields={(setCompletedFields) => console.log()}
        setCommercialBlock={(setCompletedFields) => console.log()}
        setAccordianValue={(setCompletedFields) => console.log()}
        category_lists={category_lists}
        percentage={percentage}
      />
      <ListOfGroupsAndLevelsPlaceholder />
      <GeneratedSpecificationMatrixPlaceholder
        setCompletedFields={(setCompletedFields) => console.log()}
        setCommercialBlock={(setCompletedFields) => console.log()}
      />

      <ButtonCol sx={{ position: "relative" }}>
        {error && (
          <Box
            sx={{
              display: "flex",
              gap: "4px",
              alignItems: "center",
              position: "absolute",
              padding: "10px",
              top: "-8px",
            }}
          >
            <img
              src="/assets/error-outline-red.svg"
              alt=""
              height={"10px"}
              width={"10px"}
            />
            <Typography
              sx={{
                fontSize: "13px",
                color: "#d7282f",
                fontWeight: "400",
              }}
            >
              {error}
            </Typography>
          </Box>
        )}
        <Button
          color="error"
          variant="outlined"
          size="small"
          style={{
            textTransform: "none",
            minWidth: "90px",
            height: "30.75px",
            marginTop: "10px",
          }}
          onClick={() => SaveAndContinueHandler()}
        >
          {buttonLoader ? (
            <ThreeDots
              height="14"
              width="107"
              radius="5"
              color="#d32f2f"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              visible={true}
            />
          ) : (
            " Save & Continue"
          )}
          <ArrowForwardIosIcon
            style={{ fontSize: "15px", marginLeft: "4px" }}
          ></ArrowForwardIosIcon>
        </Button>
      </ButtonCol>
    </>
  );
};
``;
