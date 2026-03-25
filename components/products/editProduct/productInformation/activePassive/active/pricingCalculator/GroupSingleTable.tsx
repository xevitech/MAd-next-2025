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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  AddparameterCol,
  TableBox,
  AddparameterValue,
  EditParmeter,
  useStyles,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductCalculator,
  setAllSpecs,
  setProductCalculatorInfo,
  setVariationTableValues,
} from "@/hooks/PricingCalculatorReducer";
import CommonErrorMessage from "@/components/common/CommonErrorMessage";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { ThreeDots } from "react-loader-spinner";

export default function GroupSingleTable({
  data,
  expanded,
  updateData,
  headerName,
  allData,
  allGroups,
  groupIndex,
  specificationIndex,
  updateEquationsData,
}) {
  const [loader, setLoader] = useState(false);
  const [inputValues, setInputValues] = useState<any>({});
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("false");
  const [deleteElementState, setDeleteElementState] = useState<any>({});
  const [delParamConfirmation, setDelParamConfirmation] = useState(false);
  const [productCalculatorInfoClone, setProductCalculatorInfoClone] =
    useState<any>(null);
  const [editingId, setEditingId] = useState(null);

  const { allSpecs, variationTableValues, productCalculatorInfo } = useSelector(
    (state: any) => state?.PricingCalculator
  );

  const { specificationsList } = useSelector(
    (state: any) => state.calculatorData
  );

  const dispatch = useDispatch();
  const productId = getProductId();

  useEffect(() => {
    setProductCalculatorInfoClone(productCalculatorInfo);
  }, [productCalculatorInfo]);

  const handleValueChange = (e, price_matrix_id) => {
    const value = e?.target?.value;

    // Clone the data to avoid direct mutation
    const updatedProductCalculationData = productCalculatorInfoClone.map(
      (group, index) => {
        if (index === groupIndex) {
          return {
            ...group,
            levels: group.levels.map((level) => ({
              ...level,
              terms: level.terms.map((term) => ({
                ...term,
                price_matrix: term.price_matrix.map((priceMatrix) => {
                  if (priceMatrix.price_matrix_id === price_matrix_id) {
                    return { ...priceMatrix, value };
                  } else {
                    return priceMatrix;
                  }
                }),
              })),
            })),
          };
        } else {
          return group;
        }
      }
    );

    // Extracting data in the specified format
    const extractedData = updatedProductCalculationData.flatMap((group) =>
      group.levels.flatMap((level) =>
        level.terms.flatMap((term) =>
          term.price_matrix
            .filter((priceMatrix) => priceMatrix.value !== null) // Only include updated values
            .map(({ price_matrix_id, value }) => ({ price_matrix_id, value }))
        )
      )
    );
    // Assuming setProductCalculatorInfoClone is a state update function
    setProductCalculatorInfoClone(updatedProductCalculationData);
    dispatch(setProductCalculatorInfo(updatedProductCalculationData));
  };

  useEffect(() => {}, [variationTableValues]);

  let filterData = allGroups?.map((v) =>
    v.levels.filter((val) => {
      if (val.id == data.level) {
        return val;
      }
    })
  );

  const handleNewParameters = async (data, allData) => {
    setLoader(true);

    try {
      const response = await apiClient(
        "product/calculator/addnewparameters",
        "post",
        {
          body: {
            group_id: allData.id,
            product_id: productId,
            specification_id: data.id,
          },
        }
      );

      if (response.status === 200) {
        await dispatch(
          getProductCalculator({
            productId,
          })
        );

        // let newData = {
        //   id: response?.data?.id,
        //   name: response?.data?.name,
        //   tag: response?.data?.tag,
        // };

        // dispatch(setAllSpecs([...allSpecs, newData]));

        // let clone = [...productCalculatorInfo];
        // const termIndex = allData.newTerms.findIndex((v) => data.id === v.id);

        // if (termIndex !== -1) {
        //   let updatedTerm = {
        //     ...allData.newTerms[termIndex],
        //     newTerm: [
        //       ...(allData.newTerms[termIndex].newTerm || []),
        //       response.data,
        //     ],
        //   };
        //   let updatedTerms = [...allData.newTerms];
        //   updatedTerms[termIndex] = updatedTerm;

        //   let updatedAllData = {
        //     ...allData,
        //     newTerms: updatedTerms,
        //   };
        //   clone = clone.map((item) =>
        //     item.id === allData.id ? updatedAllData : item
        //   );

        //   dispatch(setProductCalculatorInfo(clone));
        // }

        setLoader(false);
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const handleEdit = (element) => {
    const { price_matrix_id, name } = element;
    setInputValues({ price_matrix_id, value: name });
    setEditingId(price_matrix_id);
  };

  const SubmitHandler = async (id) => {
    if (inputValues?.value === "") {
      setErrorText("please enter value");
      setShowError(true);
      return;
    }
    const { value } = inputValues;
    let response = await apiClient("product/update/specifications", "post", {
      body: { product_id: productId, id, name: value, published: 0 },
    });
    if (response.status === 200) {
      setInputValues({});
      setEditingId(null);
      await dispatch(
        getProductCalculator({
          productId,
        })
      );
      //TODO: need to check with this if its wroking for added newParaneter name change or not
      // const updatedData = productCalculatorInfo.map((group, index) => {
      //   if (groupIndex === index) {
      //     const newTerms = group.terms.map((term) => {
      //       if (term.id === data.id) {
      //         const newTerm = term.newTerm.map((subTerm) => {
      //           if (subTerm.id === id) {
      //             return {
      //               ...subTerm,
      //               name: value,
      //             };
      //           }
      //           return subTerm;
      //         });
      //         return {
      //           ...term,
      //           newTerm,
      //         };
      //       }
      //       return term;
      //     });
      //     return {
      //       ...group,
      //       newTerms,
      //     };
      //   }
      //   return group;
      // });

      // await dispatch(setProductCalculatorInfo(updatedData));
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
    if (!deleteElementState.parent_id) {
      return;
    }
    const response = await apiClient(
      "product/calculator/addnewparameters_delete/" +
        deleteElementState.parent_id,
      "delete"
    );
    // if (response.status === 200) {
    //   await deleteAllEquations();
    // }
    updateEquationsData([]);
    await dispatch(
      getProductCalculator({
        productId,
      })
    );
    setDelParamConfirmation(false);
  };

  const { classes } = useStyles();

  return (
    <>
      {delParamConfirmation && (
        <DeleteDialog
          open={delParamConfirmation}
          handleClose={setDelParamConfirmation}
          text="this parameter"
          onClickAction={handleDelete}
        />
      )}
      <TableContainer className={classes.paddingLeft16}>
        {data?.level == null ? (
          <AddparameterCol textAlign="right">
            <Button
              sx={{ padding: "4px 8px" }}
              className="addParameterBTN"
              onClick={() => {
                handleNewParameters(data, allData);
              }}
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
        {expanded && (
          <div
            style={{
              width: "24px",
              height: "72px",
              borderLeft: "1px solid #959595",
              borderBottom: "1px solid #959595",
              position: "absolute",
              top: "50px",
              zIndex: 999,
              background: "white",
              left: "20px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                background: "#959595",
                position: "relative",
                left: "-6px",
                top: "-8px",
              }}
            ></span>
          </div>
        )}
        {/* changes here new */}
        <Box className={`${classes.headingline}`}>
          <TableBox className={classes.multilevelTable}>
            <Table
              className={classes.tableFixed}
              sx={{
                minWidth: 300,
              }}
              aria-label="a dense table"
            >
              <TableHead
                style={{
                  background: "#FCC4C6",
                  height: "38px",
                }}
              >
                <TableRow>
                  <TableCell
                    className={classes.specificationHeading}
                    align="left"
                  >
                    {data?.specification_type == "MULTILEVEL"
                      ? specificationsList?.find(
                          (v) => v?.id == data?.parent_attribute_id
                        )?.name ?? "Specifications"
                      : "Terms/Options"}
                    {/* Specifications */}
                  </TableCell>

                  {data.terms?.length > 0 && (
                    <>
                      {data?.specification_type == "MULTILEVEL" ? (
                        <>
                          {data.terms[0].price_matrix?.map((term) => {
                            return (
                              <TableCell
                                align="left"
                                style={{
                                  padding: "4px 8px",
                                  height: "38px",
                                  // backgroundColor: "#fff",
                                }}
                              >
                                {term?.tag
                                  ? term?.tag?.replaceAll("_", " ")
                                  : term?.tag_name?.replaceAll("_", " ")}
                              </TableCell>
                            );
                          })}
                        </>
                      ) : (
                        <TableCell
                          align="left"
                          style={{
                            padding: "4px 8px",
                            height: "38px",
                            backgroundColor: "#fff",
                          }}
                        >
                          {/* {data.terms[0].price_matrix[0]?.tag} */}
                        </TableCell>
                      )}

                      {data.terms[0]?.price_matrix?.length > 0 &&
                        data.terms[0].price_matrix.map((term) => {
                          return (
                            <>
                              {editingId !== term.price_matrix_id &&
                              term?.is_parameter == true ? (
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
                                    {term?.name
                                      ? term?.name?.replaceAll("_", " ")
                                      : term?.tag?.replaceAll("_", " ")}
                                    <EditOutlinedIcon
                                      onClick={(e) => {
                                        handleEdit(term);
                                        setEditingId(term.price_matrix_id); // Activate edit section
                                      }}
                                    />
                                    <DeleteOutlineIcon
                                      onClick={(e) => {
                                        setDeleteElementState(term);
                                        setDelParamConfirmation(true);
                                      }}
                                    />
                                  </AddparameterValue>
                                </TableCell>
                              ) : editingId === term.price_matrix_id ? (
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
                                        if (showError) setShowError(false);
                                        if (errorText) setErrorText("");
                                      }}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter")
                                          SubmitHandler(term?.attribute_id);
                                      }}
                                      helperText={showError ? errorText : ""}
                                      error={showError}
                                    />
                                    <AddparameterValue
                                      style={{ marginLeft: "4px" }}
                                    >
                                      <CheckCircleOutlineOutlinedIcon
                                        onClick={() => {
                                          SubmitHandler(term?.attribute_id);
                                          setEditingId(null);
                                        }}
                                      />
                                      <CancelOutlinedIcon
                                        onClick={() => {
                                          setInputValues({});
                                          setEditingId(null); // Close edit section
                                        }}
                                      />
                                    </AddparameterValue>
                                  </EditParmeter>
                                </TableCell>
                              ) : null}
                            </>
                          );
                        })}
                      {/* </TableCell> */}
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody style={{ maxHeight: "360px", overflowY: "scroll" }}>
                {data?.terms?.map((heading, ParentIndex) => {
                  return (
                    <TableRow
                      key={ParentIndex}
                      style={{
                        background: 34 % 2 == 0 ? "white" : "#D2D2D2",
                      }}
                    >
                      <TableCell style={{ padding: "12px 8px" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          {" "}
                          {/* {serialNumForTerm(row?.id)}. */}
                          {ParentIndex + 1}. {heading.name.replaceAll("_", " ")}
                        </Box>
                      </TableCell>
                      {heading?.price_matrix?.map((priceValue) => {
                        return (
                          <TableCell style={{ padding: "4px 8px" }}>
                            <FormControl
                              sx={{
                                width: `${
                                  heading?.price_matrix?.length > 1
                                    ? "100%"
                                    : "50%"
                                }`,
                              }}
                            >
                              <TextField
                                inputProps={{
                                  style: {
                                    height: "12px",
                                    minWidth: "100px",
                                    color: "black",
                                  },
                                }}
                                value={priceValue?.value ?? ""}
                                onChange={(e) => {
                                  handleValueChange(
                                    e,
                                    priceValue?.price_matrix_id
                                  );
                                }}
                                type="number"
                                className="hideIcons"
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                      borderRadius: "4px",
                                    },
                                  },
                                }}
                                size="small"
                                variant="outlined"
                              ></TextField>
                            </FormControl>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableBox>
        </Box>
      </TableContainer>
    </>
  );
}
