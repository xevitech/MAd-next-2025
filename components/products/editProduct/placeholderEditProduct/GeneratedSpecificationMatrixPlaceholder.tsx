import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { listMatrix, setMatrixItems } from "@/hooks/CalculatorReducer";
import {
  Box,
  Button,
  Collapse,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  keyframes,
} from "@mui/material";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import { getProductId } from "@/components/common/common";
import EditProductFormik from "@/hooks/useEditProductFormik";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { ArrowDropDown, ExpandMore } from "@mui/icons-material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { SelectPlaceholder } from "@/components/CompanySettings/CompanyDetail/FactoryDetails/style";
import {
  FilterButtons,
  MatrixContainer,
  MatrixScroll,
  MatrixSelectFilter,
  MatrixSelectFilterInn,
  MatrixTableHeader,
  MatrixTableHeaderInner,
  SelectFilterBox,
  SelectLable,
  SelectStatusDelete,
  ToggleFilterBtn,
} from "../productInformation/activePassive/active/specMatrix/styles";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { MatrixItemPlaceholder } from "./MatrixItemPlaceholder";
import { Container } from "../../editProduct/productInformation/activePassive/active/specMatrix/styles";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
const upDownAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(3px);
  }
`;
export const GeneratedSpecificationMatrixPlaceholder = ({
  setCompletedFields,
  setCommercialBlock,
}) => {
  // const { productId: id } = useProductContext();
  const { productId } = EditProductFormik();
  const id = productId;
  const AccordianHandle = () => {
    setCompletedFields((prev) => ({ ...prev, specification: true }));
    setCommercialBlock({ disable: false, expanded: true });
  };
  const { matrixItems, totalVariation, specificationsList } = useSelector(
    (state: any) => state.calculatorData
  );
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  // useEffect(() => {
  //   fetchList();
  // }, []);
  const dispatch = useDispatch();
  const fetchList = async () => {
    await dispatch(listMatrix({ productId: id }));

    if (matrixItems.length > 0) {
      AccordianHandle();
    }
  };
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const [selectedValues, setSelectedValues] = useState({});
  const [searchValues, setSearchValues] = useState("");

  useEffect(() => {
    setSearchValues(Object.values(selectedValues).join(","));
  }, [selectedValues]);

  const product_id = getProductId();

  const handleMultipleDelete = async () => {
    const selectedMatrix = matrixItems.filter((item) => {
      return item?.isSelected;
    });

    const matrixIds = selectedMatrix?.map((item) => item?.id);
    if (matrixIds?.length == 0) {
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/product/matrix/deleteMultipleMatrices`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: JSON.stringify({
            product_id: product_id,
            matrix_ids: matrixIds,
            published:0
          }),
        }
      );
      if (response?.ok) {
        await dispatch(listMatrix({ productId }));
        // const updatedMatrixToDefault = matrixItems?.map((item) => {
        //   return { ...item, isSelected: false };
        // });
        // dispatch(setMatrixItems(updatedMatrixToDefault));
      }
    } catch (error) {
    } finally {
      setDeleteConfirmation(false);
    }
  };

  const handleMultipleStatusChange = async (value = "Valid") => {
    const selectedMatrix = matrixItems.filter((item) => {
      return item?.isSelected;
    });

    const matrixIds = selectedMatrix?.map((item) => item?.id);
    if (matrixIds?.length == 0) {
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/product/matrix/updateMultipleMatrices`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: JSON.stringify({
            product_id: product_id,
            matrix_ids: matrixIds,
            status: value,
            published:0
          }),
        }
      );
      if (response?.ok) {
        await dispatch(listMatrix({ productId }));
        // const updatedMatrixToDefault = matrixItems?.map((item) => {
        //   return { ...item, isSelected: false };
        // });
        // dispatch(setMatrixItems(updatedMatrixToDefault));
      }
    } catch (error) {}
  };
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (specId, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [specId]: value,
    }));
  };
  return (
    <div>
      {deleteConfirmation && (
        <DeleteDialog
          open={deleteConfirmation}
          handleClose={setDeleteConfirmation}
          text="generated specification matrix"
          onClickAction={handleMultipleDelete}
        />
      )}

      {matrixItems?.length > 0 && (
        <Container>
          <MatrixTableHeader>
            <MatrixTableHeaderInner>
              <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
                Product Variation Matrix
              </Typography>
              <SelectFilterBox>
                <ToggleFilterBtn
                  size="small"
                  variant="contained"
                  onClick={handleToggle}
                  startIcon={
                    <ArrowDropDownRoundedIcon
                      sx={{
                        animation: `${upDownAnimation} 1.3s ease-in-out infinite`, // Apply the animation
                      }}
                    />
                  }
                >
                  Filter
                </ToggleFilterBtn>
                {matrixItems?.filter((item) => item?.isSelected).length > 0 && (
                  <SelectStatusDelete>
                    <FormControl size="small">
                      {/* <InputLabel><SelectLable>Status</SelectLable></InputLabel> */}
                      <Select
                        labelId="select-label"
                        defaultValue=""
                        size="small"
                        displayEmpty
                        onChange={(e) => {
                          handleMultipleStatusChange(e.target.value);
                        }}
                        renderValue={(selected) =>
                          selected ? (
                            selected
                          ) : (
                            <SelectPlaceholder>Status</SelectPlaceholder>
                          )
                        }
                      >
                        <MenuItem value="Valid">Valid</MenuItem>
                        <MenuItem value="Invalid">Invalid </MenuItem>
                      </Select>
                    </FormControl>
                    <span>
                      <LightTooltip arrow disableInteractive placement="top" title="Delete">
                        <DeleteOutlineOutlinedIcon
                          onClick={() => setDeleteConfirmation(true)}
                        />
                      </LightTooltip>
                    </span>
                  </SelectStatusDelete>
                )}

                <Box>
                  <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
                    Total Variations{" "}
                    <Box component={"span"} sx={{ color: "#000" }}>
                      (
                      <Box component={"span"} sx={{ color: "#d7282f" }}>
                        {totalVariation}
                      </Box>
                      )
                    </Box>
                  </Typography>
                </Box>
              </SelectFilterBox>
            </MatrixTableHeaderInner>
            <Collapse in={open}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={9}>
                  <MatrixSelectFilter>
                    <Typography>Select Filter:</Typography>
                    <MatrixSelectFilterInn>
                      {specificationsList?.length > 0 &&
                        specificationsList?.map((spec) => {
                          return (
                            <FormControl size="small">
                              <InputLabel>
                                <SelectLable> {spec?.name}</SelectLable>
                              </InputLabel>

                              <Select
                                defaultValue=""
                                size="small"
                                value={selectedValues[spec.id] || ""}
                                onChange={(e) =>
                                  handleChange(spec.id, e.target.value)
                                }
                              >
                                {spec?.children?.length > 0 &&
                                  spec?.children?.map((child) => {
                                    return (
                                      <MenuItem value={child?.name}>
                                        {child?.name.replace("_", " ")}
                                      </MenuItem>
                                    );
                                  })}
                              </Select>
                            </FormControl>
                          );
                        })}
                    </MatrixSelectFilterInn>
                  </MatrixSelectFilter>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <FilterButtons>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={async () => {
                        if (searchValues.length > 0) {
                          await dispatch(
                            listMatrix({
                              productId: id,
                              searchParams: searchValues,
                            })
                          );
                          return;
                        } else {
                          return;
                        }
                      }}
                    >
                      {" "}
                      Apply
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        setSelectedValues({});
                        dispatch(listMatrix({ productId }));
                      }}
                    >
                      {" "}
                      Reset All
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        setOpen(false);
                        setSelectedValues({});
                      }}
                    >
                      {" "}
                      Cancel
                    </Button>
                  </FilterButtons>
                </Grid>
              </Grid>
            </Collapse>
          </MatrixTableHeader>
          <MatrixContainer>
            <MatrixScroll>
              {matrixItems.length < 0 ? (
                <CircularProgress
                  style={{
                    color: "#D7282F",
                    height: "25px",
                    width: "25px",
                    display: "flex",
                    float: "right",
                    marginLeft: "40%",
                  }}
                />
              ) : (
                <MatrixItemPlaceholder productId={id}></MatrixItemPlaceholder>
              )}
            </MatrixScroll>
          </MatrixContainer>
        </Container>
      )}
    </div>
  );
};
