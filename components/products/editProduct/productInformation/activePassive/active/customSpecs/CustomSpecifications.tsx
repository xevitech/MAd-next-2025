import React, { useState, useEffect, useContext } from "react";
import {
  styled,
  Button,
  FormControl,
  TextField,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { EditableTextField } from "@/components/products/common/editableTextField";
import { SingleCustomSpecification } from "./SingleCustomSpecification";
import poststyle from "components/products/editProduct/style.module.css";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import {
  BtnContainer,
  CustomButtonCustomSpecs,
  CustomChip,
  CustomChipSelected,
  HeaderCustomSpecs,
  HeaderMainText,
  HeaderSubText,
  InputFieldContainer,
  OuterContainerCustomSpecs,
  SpecificationsListContainer,
  SpecLeftContainer,
  SpecRightContainer,
  SuggestedSpecContainer,
} from "./styles";
// import useProductContext from "@/hooks/useProductContext";
import Image from "next/image";
// import { BtnFilled } from "@/components/common/buttons/ButtonsVariations";
import { ThreeDots } from "react-loader-spinner";
import CircularProgress from "@mui/material/CircularProgress";
// import { setCategoryMetaData } from "@/hooks/CategoryReducer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import * as Yup from "yup";
import {
  addCustomSpec,
  checkTerms,
  getSpecificationsList,
  getSpecsList,
  // getSuggestedSpecificationsOrMeta,
  listMatrix,
  setAccordinIndex,
  setMatrixTableLoader,
  setSuggestedSpecifications,
  setUpdateLoader,
} from "@/hooks/CalculatorReducer";
import { apiClient, specificationTextLength } from "@/components/common/common";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import index from "@/components/ProductDetail/ProductComponents/Modal/QuickLoginModal";
export const CustomSpecifications = ({
  setCompletedFields,
  setCommercialBlock,
  setAccordianValue,
  category_lists,
  percentage,
}) => {
  // const { selectedCategories, productId } = useProductContext();

  // const { selectedCategories } = useSelector((state: any) => state.editProduct);

  const [specificationError, setSpecifiactionError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const {
    specificationsList,
    suggestedSpecifications,
    UpdateLoader,
    addNewLoader,
  } = useSelector((state: any) => state.calculatorData);
  const [specificationsLoader, setSpecificationsLoader] = useState(false);
  const [isActiveError, setIsActiveError] = useState(false);

  const term_ids = specificationsList
    ?.map((element) => element?.children)
    .filter((element) => element?.length > 0)
    .flat()
    .filter((element) => element?.type == "active")
    .map((element) => element?.id)
    .join(",");
  const dispatch = useDispatch();
  let percentageValueCal: number = percentage
    .map((v) => v.value)
    .reduce((a, b) => a + b);

  const percentageValue: any = Math.round(percentageValueCal);
  const { query }: any = useRouter();
  const productId: string = query.Id;
  useEffect(() => {
    try {
      dispatch(getSpecificationsList({ specEdited: false, id: query?.Id }));
    } catch {}
  }, []);

  useEffect(() => {
    productId && dispatch(listMatrix({ productId }));
  }, [UpdateLoader]);

  useEffect(() => {
    if (emptyError) {
      const timer = setTimeout(() => {
        setEmptyError(false);
      }, 5000);
      return () => clearTimeout(timer);
    } else if (isActiveError) {
      const timer = setTimeout(() => {
        setIsActiveError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [emptyError, isActiveError]);

  // do not remove this for now.

  // useEffect(() => {
  //   let category_id = category_lists.map((ele) => ele?.id);
  //   if (category_id?.length > 0) {
  //     dispatch(getSuggestedSpecificationsOrMeta(category_id?.join(",")));
  //   } else {
  //     dispatch(setCategoryMetaData(""));
  //   }
  // }, []);
  //TODO: cause of the infinite re-rendering.
  // }, [specificationsList]);

  useEffect(() => {
    if (specificationError) {
      const timer = setTimeout(() => {
        setSpecifiactionError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [specificationError]);

  const validation = Yup.object().shape({
    specValue: Yup.string().required("Please enter custom specifications"),
  });

  let formik: any = useFormik({
    initialValues: {
      specValue: "",
    },
    validationSchema: validation,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        await handleAddSpecification(productId, values?.specValue);
      } catch (error) {
        throw error;
      }
    },
  });

  const AccordianHandle = () => {
    setCompletedFields((prev) => ({ ...prev, specification: true }));
    setCommercialBlock({ disable: false, expanded: true });
    setAccordianValue("commercial");
  };
  const toggleSelectedSpec = (id) => {
    const toggledList = [...suggestedSpecifications];
    const updatedList = toggledList?.map((ele) => {
      if (ele?.id == id) {
        return { ...ele, selected: !ele?.selected };
      } else {
        return ele;
      }
    });
    dispatch(setSuggestedSpecifications(updatedList));
  };
  const submitGetSpecifications = async () => {
    const formData = new FormData();
    const idString = suggestedSpecifications
      ?.filter((ele) => ele?.selected)
      .map((ele) => ele?.id)
      .join(",");

    formData.append("ids", idString);
    formData.append("product_id", productId);
    formData.append("percentage", percentage);
    setSpecificationsLoader(true);
    let response = await apiClient(
      "product/get_specifications/submit",
      "post",
      { body: formData },
      true
    );
    if (response.status === 200) {
      await dispatch(
        getSpecificationsList({ specEdited: false, id: query?.Id })
      );
      await dispatch(getSpecsList(productId));
    } else {
      setSpecifiactionError(true);
      setSpecificationsLoader(false);
    }
    setSpecificationsLoader(false);
  };
  const handleAddSpecification = async (productId, name) => {
    try {
      await dispatch(addCustomSpec({ productId, name, formik }));
      await dispatch(getSpecificationsList());

      dispatch(getSpecsList(productId));
      dispatch(getSpecificationsList({ specEdited: false, id: query?.Id }));
    } catch {}
  };

  const generateProductMatrix = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to generate a matrix for the selected specification? This will delete the previous matrix and create a new one with blank prices.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, generate it!",
      cancelButtonText: "No, cancel!",
      didOpen: () => {
        const confirmButton = Swal.getConfirmButton();
        const cancelButton = Swal.getCancelButton();

        if (confirmButton) {
          confirmButton.style.backgroundColor = "#D7282F";
          confirmButton.style.color = "white";
          confirmButton.style.boxShadow = "none";
        }
        if (cancelButton) {
          cancelButton.style.backgroundColor = "gray";
          cancelButton.style.color = "white";
          cancelButton.style.boxShadow = "none";
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(setMatrixTableLoader(true));
        setEmptyError(false);
        const children = specificationsList.filter(
          (element) => element.parentboth.length > 0
        );
        let data = specificationsList?.map((element) => {
          return element.children;
        });

        let data1 = data?.map((child) => {
          return child?.map((ele) => {
            if (ele.type === "active") {
              return true;
            } else {
              return false;
            }
          });
        });
        const isActive = data1.map((ele) => ele.includes(true));
        const isNotEmpty = specificationsList.length === children.length;
        if (!isNotEmpty) {
          setEmptyError(true);
          setIsActiveError(false);
        } else if (isActive.includes(false)) {
          setIsActiveError(true);
          setEmptyError(false);
        } else {
          setEmptyError(false);
          setIsActiveError(false);
          dispatch(setUpdateLoader(true));
          await dispatch(
            checkTerms({ AccordianHandle, id: productId, term_ids })
          );
          setEmptyError(false);
        }
        dispatch(setMatrixTableLoader(false));
      }
    });
  };
  useEffect(() => {
    if (formik.errors.specValue) {
      const timer = setTimeout(() => {
        formik.setFieldError("specValue", "");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [formik.errors.specValue]);

  return (
    <OuterContainerCustomSpecs>
      <HeaderCustomSpecs>
        <HeaderMainText
          sx={{ color: "#231f20 !important", fontWeight: "600 !important" }}
        >
          List of Custom Specifications
        </HeaderMainText>
        <HeaderSubText sx={{ color: "#231f20" }}>
          Add custom product specification such as color, size, or more. Choose
          a maximum of 4/50 variant types.
        </HeaderSubText>
      </HeaderCustomSpecs>
      {/* {suggestedSpecifications?.length > 0 && (
        <SuggestedSpecContainer
          sx={{
            border: specificationError
              ? "1px solid #d7282f"
              : "1px solid #D2D2D2",
          }}
        >
          <SpecLeftContainer>
            {suggestedSpecifications?.map((ele, index) => {
              if (ele?.selected) {
                return (
                  <CustomChipSelected
                    key={index}
                    onClick={() => {
                      if (ele.id) {
                        setSpecifiactionError(false);
                      }
                      toggleSelectedSpec(ele.id);
                    }}
                  >
                    {ele?.name}
                    {
                      <Image
                        style={{ marginLeft: "5px" }}
                        src={"/assets/smallTick.svg"}
                        width={20}
                        height={10}
                        alt="tick-image"
                      />
                    }
                  </CustomChipSelected>
                );
              } else {
                return (
                  <CustomChip
                    sx={{
                      fontWeight: "500 !important",
                      margin: "4px 12px 4px 0",
                    }}
                    key={index}
                    onClick={() => {
                      if (ele.id) {
                        setSpecifiactionError(false);
                      }
                      toggleSelectedSpec(ele?.id);
                    }}
                  >
                    {ele?.name}
                  </CustomChip>
                );
              }
            })}
          </SpecLeftContainer>

          <SpecRightContainer>
            <BtnFilled
              width="160px"
              onClick={
                selectedCategories.length > 0
                  ? submitGetSpecifications
                  : setSpecifiactionError(true)
              }
              sx={{
                "@media screen and (max-width:480px)": { fontSize: "12px" },
              }}
            >
              {specificationsLoader ? (
                <ThreeDots
                  height="40"
                  width="40"
                  radius="9"
                  color="white"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              ) : (
                "Get Specifications"
              )}
            </BtnFilled>
          </SpecRightContainer>
        </SuggestedSpecContainer>
      )} */}
      {specificationError && (
        <Box sx={{ display: "flex", alignItems: "center", marginLeft: "15px" }}>
          <WarningAmberOutlinedIcon
            style={{
              fontSize: "9px",
              margin: "0px 4px 0 0",
              color: "#d7282f",
            }}
          />
          <Typography sx={{ fontSize: "10px", color: "#d7282f !important" }}>
            {"Please select specifications"}
          </Typography>
        </Box>
      )}
      {specificationsList?.length > 0 &&
        specificationsList?.map((element, index) => (
          <SpecificationsListContainer key={element.id}>
            <SingleCustomSpecification
              key={index}
              data={element}
              singleIndex={index}
            />
          </SpecificationsListContainer>
        ))}

      <div className={poststyle.custom_specification}>
        <InputFieldContainer>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "relative",
                  "@media screen and (max-width:767px)": {
                    display: "block",
                  },
                }}
              >
                <Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    border="1px solid #ddd"
                    borderRadius={"4px"}
                    width={"100%"}
                  >
                    <FormControl
                      sx={{
                        width: "250px",
                        "@media screen and (max-width:767px)": {
                          width: "100%",
                        },
                      }}
                    >
                      <TextField
                        size="small"
                        placeholder="Create Custom Specification"
                        value={formik.values.specValue}
                        onChange={(e) => {
                          let value = e?.target?.value;
                        
                          if (value.startsWith(" ")) {
                            value = value.trimStart();
                          }
                        
                          if (value?.length > specificationTextLength) {
                            formik.setFieldError(
                              "specValue",
                              "The content is too long. Please limit it to 50 characters."
                            );
                          } else {
                            formik.setFieldValue("specValue", value);
                            formik.setFieldError("specValue", "");
                          }
                          dispatch(setAccordinIndex(index));
                        }}
                        disabled={!addNewLoader}
                        error={formik.errors?.specValue ? true : false}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            formik.handleSubmit();
                            dispatch(setAccordinIndex(index));
                          }
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              border: "none",
                            },
                          },
                        }}
                      />
                    </FormControl>

                    <BtnContainer>
                      {" "}
                      <CustomButtonCustomSpecs
                        sx={{
                          "@media screen and (max-width:480px)": {
                            fontSize: "12px",
                          },
                        }}
                        onClick={formik.handleSubmit}
                      >
                        {!addNewLoader ? (
                          <ThreeDots
                            height="40"
                            width="40"
                            radius="9"
                            color="white"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            visible={true}
                          />
                        ) : (
                          "Create"
                        )}
                      </CustomButtonCustomSpecs>
                    </BtnContainer>
                  </Box>
                  {formik.errors?.specValue && (
                    <Typography sx={{ color: "#d7282f", fontSize: "10px" }}>
                      <img
                        src="/assets/error-outline-red.svg"
                        alt=""
                        style={{
                          width: "8px",
                          height: "8px",
                          margin: "0 4px 0 0",
                        }}
                      />

                      {formik.errors?.specValue}
                    </Typography>
                  )}
                </Box>
                {specificationsList?.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <CustomButtonCustomSpecs
                      sx={{
                        maxWidth: "250px",
                        "@media screen and (max-width:767px)": {
                          margin: "10px 0 0",
                        },
                        "@media screen and (max-width:480px)": {
                          fontSize: "12px",
                        },
                      }}
                      onClick={async () => {
                        const children = specificationsList.filter(
                          (element) => element.parentboth.length > 0
                        );
                        let data = specificationsList?.map((element) => {
                          return element.children;
                        });
                        const isNotEmpty =
                          specificationsList.length === children.length;
                        let data1 = data?.map((child) => {
                          return child?.map((ele) => {
                            if (ele.type === "active") {
                              return true;
                            } else {
                              return false;
                            }
                          });
                        });
                        const isActive = data1.map((ele) => ele.includes(true));
                        if (!isNotEmpty) {
                          setEmptyError(true);
                          setIsActiveError(false);
                        } else if (isActive.includes(false)) {
                          setIsActiveError(true);
                          setEmptyError(false);
                        } else {
                          generateProductMatrix();
                        }
                      }}
                      style={{
                        minWidth: "76px",
                        padding: "16px 8px",
                      }}
                      disabled={UpdateLoader ? true : false}
                    >
                      Generate Product Variations
                    </CustomButtonCustomSpecs>
                  </div>
                )}
              </Box>
              {emptyError && (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      position: "relative",
                      justifyContent: "flex-end",
                    }}
                  >
                    <img
                      src="/assets/error-outline-red.svg"
                      alt="Error icon"
                      height="12px"
                      width="12px"
                    />
                    <Typography
                      sx={{
                        color: "#d7282f",
                        fontSize: "13px",
                      }}
                    >
                      Please enter at least one option/term in all the custom
                      specifications.
                    </Typography>
                  </div>
                </>
              )}
              {isActiveError && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: "5px",
                  }}
                >
                  <img
                    src="/assets/error-outline-red.svg"
                    alt="Error icon"
                    height="12px"
                    width="12px"
                  />
                  <Typography
                    sx={{
                      color: "#d7282f",
                      fontSize: "13px",
                    }}
                  >
                    Please select at least one option/term in all the custom
                    specifications.
                  </Typography>
                </div>
              )}
              {UpdateLoader && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    // position: "absolute",
                    bottom: "-15px",
                  }}
                >
                  <CircularProgress
                    style={{
                      color: "#D7282F",
                      height: "25px",
                      width: "25px",
                      display: "flex",
                      float: "right",
                      marginRight: "10px",
                    }}
                  ></CircularProgress>
                  <span
                    style={{
                      color: "#D7282F",
                      fontSize: "12px",
                      margin: "0px 5px 5px 10px",
                      display: "flex",
                    }}
                  >
                    Please be patient while we generate product variations. This
                    process may take a couple of minutes.
                  </span>
                </Box>
              )}
            </Grid>
          </Grid>
        </InputFieldContainer>
      </div>
    </OuterContainerCustomSpecs>
  );
};
