import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TextField } from "@mui/material";
import { FormControl } from "@mui/material";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { apiClient, getProductId } from "@/components/common/common";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  AddNewParameters,
  AddparameterCol,
  AddparameterValue,
  EditParmeter,
  TableBox,
  useStyles,
} from "./styles";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductCalculator,
  setAllSpecs,
  setProductCalculatorInfo,
  setVariationTableValues,
} from "@/hooks/PricingCalculatorReducer";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import CommonErrorMessage from "@/components/common/CommonErrorMessage";
import { ThreeDots } from "react-loader-spinner";

export default function SingleSpecTable({
  data, //from redux
  headerName, //from redux
  updateEquationsData, //not from context
}) {
  const productId = getProductId();
  const [loader, setLoader] = useState(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<any>({});
  const {
    productCalculatorInfo,
    allSpecs,
    variationTableValues,
    rowFields,
    allTerms,
  } = useSelector((state: any) => state?.PricingCalculator);

  const { specificationsList } = useSelector(
    (state: any) => state.calculatorData
  );

  const [delSpecConfirmation, setDelSpecConfimation] = useState(false);
  const [variationElement, setVariationElement] = useState<any>({});
  const [productCalculatorInfoClone, setProductCalculatorInfoClone] =
    useState<any>(null);
  const [priceMatrixPayload, setPriceMatrixPayload] = useState<any>([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (productCalculatorInfo?.length > 0) {
      setProductCalculatorInfoClone(productCalculatorInfo);
    }
  }, [productCalculatorInfo]);

  const dispatch = useDispatch();

  const serialNumForTerm = (id) => {
    return allTerms.find((element) => element?.id == id)?.serialNo;
  };

  // const handleValueChange = (e, termId, specId, header = headerName) => {
  //   const re = /^\d*\.?\d*$/;
  //   const { name, value } = e.target;
  //   if (header == "similar") {
  //     if (re.test(e?.target?.value)) {
  //       const updatedData = productCalculatorInfo?.map((element) => {
  //         if (element?.id == specId) {
  //           return {
  //             ...element,
  //             terms: element?.terms?.map((ele) => {
  //               if (ele?.id == termId) {
  //                 return { ...ele, attributes_values: e?.target?.value };
  //               }
  //               return ele;
  //             }),
  //           };
  //         }

  //         return {
  //           ...element,
  //           newTerm: element?.newTerm?.map((ele) => {
  //             return {
  //               ...ele,
  //               terms_list: ele?.terms_list?.map((terms) => {
  //                 if (terms?.id == specId) {
  //                   return { ...terms, attributes_values: e?.target?.value };
  //                 }
  //                 return terms;
  //               }),
  //             };
  //           }),
  //         };
  //       });
  //       dispatch(setProductCalculatorInfo(updatedData));
  //     }
  //   } else if (header == "multilevel") {
  //     if (re.test(e.target.value)) {
  //       const updatedValues = {
  //         ...variationTableValues,
  //         [name]: value,
  //       };
  //       dispatch(setVariationTableValues(updatedValues));
  //     }
  //   }
  // };

  //handle value change of price_matrix terms
  const handleValueChange = (e, price_matrix_id, term_id) => {
    const { value } = e?.target;
    const updatedProductCalculationData = productCalculatorInfoClone?.map(
      (calyData) => {
        if (calyData?.id === data?.id) {
          return {
            ...calyData,
            terms: calyData?.terms?.map((term) => {
              return {
                ...term,
                price_matrix: term?.price_matrix?.map((priceMatrix) => {
                  if (priceMatrix?.price_matrix_id === price_matrix_id) {
                    return { ...priceMatrix, value };
                  } else {
                    return priceMatrix;
                  }
                }),
              };
            }),
          };
        } else {
          return calyData;
        }
      }
    );
    dispatch(setProductCalculatorInfo(updatedProductCalculationData));
    const newValue = { price_matrix_id: price_matrix_id, price: value };

    setPriceMatrixPayload((prevPayload) => {
      // Filter out any entries with the same price_matrix_id
      const filteredPayload = prevPayload.filter(
        (item) => item.price_matrix_id !== price_matrix_id
      );

      // Add newValue to the filtered list, replacing any existing entry with the same ID
      return [...filteredPayload, newValue];
    });
  };

  useEffect(() => {}, [variationTableValues]);
  const handleNewParameters = async (specData) => {
    setLoader(true);
    const response = await apiClient(
      "product/calculator/addnewparameters",
      "post",
      { body: { product_id: productId, specification_id: specData?.id } }
    );
    if (response.status === 200) {
      
      await dispatch(
        getProductCalculator({
          productId,
        })
      );
      setLoader(false);

      // let newData = [
      //   {
      //     id: response?.data?.id,
      //     name: response?.data?.name,
      //     tag: response?.data?.tag,
      //   },
      // ];
      // dispatch(setAllSpecs([...allSpecs, ...newData]));
      // let clone = [...productCalculatorInfo];

      // const newClone = clone.map((ele, index) => {
      //   if (ele.id == specData?.id) {
      //     const newTermsArray = [...(ele.newTerm || []), response.data];
      //     return { ...ele, newTerm: newTermsArray };
      //   }
      //   return ele;
      // });
      // dispatch(setProductCalculatorInfo(newClone));
      // setLoader(false);
    } else {
      setLoader(false);
      toast.error("Something went wrong!");
    }
  };

  const handleNewParametersOld = async (specData) => {
    setLoader(true);
    const response = await apiClient(
      "product/calculator/addnewparameters",
      "post",
      { body: { product_id: productId, specification_id: specData?.id } }
    );
    if (response.status === 200) {
      setLoader(false);
      let newData = productCalculatorInfo[0].newTerm.map((element) => ({
        id: element?.id,
        name: productCalculatorInfo[0].name,
        tag: element?.tag,
      }));
      dispatch(setAllSpecs([...allSpecs, ...newData]));
      let clone = [...productCalculatorInfo];
      const list = {
        ...productCalculatorInfo[0],
        newTerm: [
          ...(productCalculatorInfo?.[0]?.newTerm ?? []),
          response.data,
        ],
      };
      clone[0] = { ...list };
      dispatch(setProductCalculatorInfo(clone));
      setLoader(false);
    } else {
      setLoader(false);
      toast.error("Something went wrong!");
    }
  };

  const deleteAllEquations = async () => {
    const formData = new FormData();
    formData.append("product_id", productId);
    const response = await apiClient(
      "product/calculator/equation/delete",
      "post",
      { body: formData },
      true
    );
  };

  const handleDelete = async () => {
    const response = await apiClient(
      "product/calculator/addnewparameters_delete/" + variationElement?.parent_id,
      "delete"
    );
    // if (response.status === 200) await deleteAllEquations();
    updateEquationsData([]);

    await dispatch(
      getProductCalculator({
        productId,
      })
    );
    setDelSpecConfimation(false);
  };

  const handleEdit = (element) => {
    const { price_matrix_id, name } = element;
    setInputValues({ price_matrix_id, value: name });
    // setShowInput(true);
    setEditingId(price_matrix_id);
  };

  const SubmitHandler = async (id) => {
    if (inputValues?.value === "") {
      setShowError(true);
      return;
    }
    const { value } = inputValues;
    // if (name === inputValues?.value) {
    //   setInputValues({});
    //   setShowInput(false);
    //   return;
    // }
    let response = await apiClient("product/update/specifications", "post", {
      body: { product_id: productId, id, name: value, published:0 },
    });
    if (response.status === 200) {

      setInputValues({});
      // setShowInput(false);
      setEditingId(null);

      await dispatch(
        getProductCalculator({
          productId,
        })
      );

      // const updatedData = productCalculatorInfo.map((prev) => {
      //   let values = { ...prev };
      //   if (values.id === data.id) {
      //     let newTermIndex = values.newTerm?.findIndex((v) => v.id == id);

      //     if (newTermIndex !== -1) {
      //       let updatedNewTermItem = {
      //         ...values.newTerm[newTermIndex],
      //         name: value,
      //       };

      //       let updatedNewTerm = [
      //         ...values.newTerm.slice(0, newTermIndex),
      //         updatedNewTermItem,
      //         ...values.newTerm.slice(newTermIndex + 1),
      //       ];

      //       values = {
      //         ...values,
      //         newTerm: updatedNewTerm,
      //       };
      //     }
      //   }
      //   return values;
      // });
      // dispatch(setProductCalculatorInfo(updatedData));


    }
  };

  // row-UD-4-Small-Apple
  // row-EK-2277-Apple
  const { classes } = useStyles();
  return (
    <>
      {delSpecConfirmation && (
        <DeleteDialog
          open={delSpecConfirmation}
          handleClose={setDelSpecConfimation}
          text="this parameter"
          onClickAction={handleDelete}
        />
      )}
      <TableContainer className={classes.paddingLeft16}>
        {data?.level == null ? (
          <AddparameterCol textAlign="right">
            <Button
              className="addParameterBTN"
              onClick={() => handleNewParameters(data)}
            >
              {loader ? (
                <ThreeDots
                  height="36"
                  width="36"
                  radius="9"
                  color="#fff"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              ) : (
                <>
                  <AddIcon />
                  Add New Parameters
                </>
              )}
            </Button>
          </AddparameterCol>
        ) : null}
        <Box className={`${classes.headingline}`}>
          <TableBox className={classes.multilevelTable}>
            <Table
              className={classes.tableFixed}
              sx={{
                minWidth: 120,
              }}
              aria-label="a dense table"
            >
              <TableHead
                sx={{
                  background: `${
                    data?.specification_type == "MULTILEVEL"
                      ? "inherit"
                      : "#fff !important"
                  }`,
                }}
                style={{
                  background: "#FCC4C6",
                  height: "38px",
                }}
              >
                <TableRow>
                  <TableCell
                    align="left"
                    style={{
                      padding: "4px 8px",
                      height: "38px",
                      width: "120px",
                    }}
                  >
                    {data?.specification_type == "MULTILEVEL"
                      ? specificationsList?.find(
                          (v) => v?.id == data?.parent_attribute_id
                        )?.name ?? "Terms/Options"
                      : "Terms/Options"}
                  </TableCell>

                  {data?.specification_type === "SIMILAR" ? (
                    <>
                      <TableCell
                        style={{
                          padding: "4px 8px",
                          height: "38px",
                        }}
                        align="left"
                      >
                        {`#${data?.tag}`}
                      </TableCell>
                    </>
                  ) : null}
                  {Array.isArray(data?.terms[0]?.price_matrix) &&  data?.terms[0]?.price_matrix?.map((matrix_item) => {
                    return (
                      <>
                        {data?.specification_type === "MULTILEVEL" ? (
                          <TableCell
                            style={{
                              padding: "4px 8px",
                              height: "38px",
                            }}
                            align="left"
                          >
                            {`${matrix_item?.tag_name?.replaceAll("_", " ")}`}
                          </TableCell>
                        ) : null}
                      </>
                    );
                  })}
                  { Array.isArray(data?.terms[0]?.price_matrix) && data.terms[0]?.price_matrix?.length > 0 &&
                    data.terms[0].price_matrix.map((term) => {
                      return (
                        <>
                          {term?.is_parameter === true && (
                            <>
                              {editingId !== term.price_matrix_id && term?.is_parameter === true ? (
                                <TableCell
                                  align="left"
                                  style={{
                                    padding: "4px 8px",
                                    height: "38px",
                                    backgroundColor: "#fff",
                                  }}
                                >
                                  <AddparameterValue>
                                    {/* TODO: term?.tag might not be present in the data */}
                                    {term?.name ? term?.name?.replaceAll("_", " ") : term?.tag?.replaceAll("_", " ")}
                                    <EditOutlinedIcon
                                      onClick={(e) => {
                                        handleEdit(term);
                                        // setShowInput(true); // Activate edit section
                                        setEditingId(term.price_matrix_id);
                                      }}
                                    />
                                    <DeleteOutlineIcon
                                      onClick={(e) => {
                                        setVariationElement(term);
                                        setDelSpecConfimation(true);
                                      }}
                                    />
                                  </AddparameterValue>
                                </TableCell>
                              ) : editingId === term.price_matrix_id  ? (
                                <TableCell
                                  align="left"
                                  style={{
                                    padding: "4px 8px",
                                    height: "38px",
                                    backgroundColor: "#fff",
                                  }}
                                >
                                  <EditParmeter>
                                    <TextField
                                      size="small"
                                      value={inputValues?.value ?? ""}
                                      onChange={(e) => {
                                        setInputValues((prev) => ({
                                          ...prev,
                                          value: e.target.value,
                                        }));
                                        // if (showError) setShowError(false);
                                        // if (errorText) setErrorText("");
                                      }}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter")
                                          SubmitHandler(term?.attribute_id);
                                      }}
                                      // helperText={showError ? errorText : ""}
                                      error={showError}
                                    />
                                    <AddparameterValue
                                      style={{ marginLeft: "4px" }}
                                    >
                                      <CheckCircleOutlineOutlinedIcon
                                        onClick={() =>{
                                          SubmitHandler(term?.attribute_id);
                                          setEditingId(null);
                                        }
                                        }
                                      />
                                      <CancelOutlinedIcon
                                        onClick={() => {
                                          setInputValues({});
                                          // setShowInput(false); // Close edit section
                                          setEditingId(null);
                                        }}
                                      />
                                    </AddparameterValue>
                                  </EditParmeter>
                                </TableCell>
                              ) : null}
                            </>
                          )}
                        </>
                      );
                    })}
                </TableRow>
              </TableHead>
              <TableBody style={{ maxHeight: "360px", overflowY: "scroll" }}>
                {data?.terms?.map((row, ParentIndex) => (
                  <TableRow key={ParentIndex}>
                    <TableCell style={{ width: "120px", padding: "12px 9px" }}>
                      <Box sx={{  left: "-16px" }}>
                        {" "}
                        {/* {serialNumForTerm(row?.id)}. */}
                        {ParentIndex + 1}.{" "}
                      {row.name?.replaceAll("_", " ")}
                      </Box>
                    </TableCell>
                    <>
                      {/* here code for changing values for specication */}

                      {row?.price_matrix?.map((price_terms, index) => {
                        return (
                          <TableCell style={{ padding: "4px 8px" }}>
                            <FormControl
                              sx={{
                                width: `${
                                  row?.price_matrix?.length > 1 ? "100%" : "50%"
                                }`,
                              }}
                            >
                              {/** TODO: check here in case of the no pareant case
                               *
                               * row-${v.tag}-${item.serialNo}-${item.value}
                               *
                               */}
                              <TextField
                                // name={`row-${data?.tag}-${serialNumForTerm(
                                //   row?.id
                                // )}-${row?.name}`}
                                style={{ background: "white", }}
                                inputProps={{
                                  style: {
                                    height: "12px",
                                    color: "black",
                                    minWidth: "100px",
                                  },
                                }}
                                type="number"
                                className="hideIcons"
                                value={
                                  price_terms?.value ?? ''
                                }
                                onChange={(e) => {
                                  handleValueChange(
                                    e,
                                    price_terms?.price_matrix_id,
                                    row?.id
                                  );
                                }}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                      borderRadius: "4px",
                                    },
                                  },
                                }}
                                size="small"
                                variant="outlined"
                              />
                            </FormControl>
                          </TableCell>
                        );
                      })}

                      {data.newTerm?.length > 0 &&
                        data.newTerm.map((element) => {
                          return (
                            <TableCell style={{ padding: "4px 8px" }}>
                              <FormControl sx={{ width: "50%" }}>
                                {
                                  <TextField
                                    name={`row-${element?.tag}-${element?.terms_list?.[ParentIndex]?.id}-${row?.name}`}
                                    style={{
                                      background: "white",
                                      width: "95px",
                                    }}
                                    inputProps={{
                                      style: {
                                        height: "12px",
                                        color: "black",
                                      },
                                    }}
                                    type="number"
                                    className="hideIcons"
                                    value={
                                      element?.terms_list[ParentIndex]
                                        ?.attributes_values
                                    }
                                    onChange={(e) => {
                                      // handleValueChange(
                                      //   e,
                                      //   row?.id,
                                      //   element?.terms_list?.[ParentIndex]?.id
                                      // );
                                    }}
                                    sx={{
                                      "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                          borderRadius: "4px",
                                        },
                                      },
                                    }}
                                    size="small"
                                    variant="outlined"
                                  />
                                }
                              </FormControl>
                            </TableCell>
                          );
                        })}
                    </>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableBox>
        </Box>
      </TableContainer>
    </>
  );
}
