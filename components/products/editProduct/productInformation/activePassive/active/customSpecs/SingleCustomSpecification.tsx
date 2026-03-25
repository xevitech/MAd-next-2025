import { useState, useEffect, useRef } from "react";
import {
  FormControl,
  TextField,
  CircularProgress,
  InputAdornment,
  Box,
  Typography,
  Divider,
  Link,
  useTheme,
  useMediaQuery,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import { SingleSpecTerm } from "./SingleSpecTerm";
import poststyle from "components/products/editProduct/style.module.css";
import * as Yup from "yup";
import {
  AddNewTermContainer,
  HeaderCustomSpec,
  OuterContainerCustomSpec,
  SpecDeleteIconContainer,
  SpecNameContainer,
  CustomButtonCustomSpec,
  TextFieldSec,
  SaveCancelIconbox,
  CustomSpecification,
} from "./styles";
import { SimpleSelect } from "@/components/products/common/simpleSelect";
import { ThreeDots } from "react-loader-spinner";
import { Grid } from "@mui/material";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { useDispatch, useSelector } from "react-redux";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {
  addTermUnderSpec,
  deleteSpec,
  getSpecificationsList,
  getSpecsList,
  setAccordinIndex,
  setAddLoader,
  setSpecificationsList,
} from "@/hooks/CalculatorReducer";
import { useFormik } from "formik";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import { apiClient, specificationTextLength } from "@/components/common/common";
import { ErrorImage } from "../GroupsAndLevels/styles";
import CustomDialog from "@/components/common/customAlert/CustomDialogue1";
export const SingleCustomSpecification = (props: any) => {
  const dispatch = useDispatch();
  const [selectedUnit, setSelectedUnit] = useState("");
  const {
    name,
    children,
    productId,
    id: specId,
    expanded,
    unit,
    id,
  } = props?.data;
  const { singleIndex } = props;
  const { commercialInfoUnits, loader, specificationsList } = useSelector(
    (state: any) => state.calculatorData
  );
  const capitalizedUnits = (commercialInfoUnits || [])?.map((unit) => ({
    ...unit,
    view: unit.view.charAt(0).toUpperCase() + unit.view.slice(1),
  }));
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [editLoader, setEditLoader] = useState(false);
  const [deletespecId, setSpecId] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [error, setError] = useState("");
  useEffect(() => {
    setSelectedUnit(unit);
  }, [props?.data]);
  useEffect(() => {
    setError("");
  }, []);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const childRef = useRef<HTMLDivElement | null>(null);
  const [fillPercentage, setFillPercentage] = useState(0);
  const [parentWidth, setParentWidth] = useState<number | null>(0);
  const [childWidth, setChildWidth] = useState<number | null>(0);

  useEffect(() => {
    if (expanded) return;
    if (parentRef.current && childRef.current) {
      const parentWidthRef = parentRef.current.clientWidth;
      const childWidthRef = childRef.current.clientWidth;
      setParentWidth(parentWidthRef);
      setChildWidth(childWidthRef);
    }
  }, [parentRef, childRef, expanded]);

  useEffect(() => {
    if (parentWidth > 0) {
      setFillPercentage(Math.floor((childWidth / parentWidth) * 100));
    }
  }, [parentWidth, childWidth]);

  const updateSpecUnit = async (specId, newUnit) => {
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("published", "0");
    formData.append("id", specId);
    formData.append("unit", newUnit);
    try {
      const response = await apiClient(
        "product/update/specifications",
        "post",
        { body: formData },
        true
      );
    } catch (error) {}
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    setSelectedUnit(value);
    await updateSpecUnit(specId, value);
    await dispatch(getSpecificationsList({ id: productId }));
  };
  const showExpandedView = (specId) => {
    const cloneSpecification = [...specificationsList];
    const updatedSpecificationList = cloneSpecification.map((element) => {
      if (element?.id !== specId) {
        return {
          ...element,
          expanded: false,
        };
      } else {
        return { ...element, expanded: !element?.expanded };
      }
    });
    dispatch(setSpecificationsList(updatedSpecificationList));
  };

  const handleDeleteMatrix = async () => {
    try {
      await dispatch(deleteSpec({ deletespecId, productId }));
      setDeleteConfirmation(false);
    } catch {
      setDeleteConfirmation(false);
    }
  };

  const validation = Yup.object().shape({
    terms: Yup.string().required("Please enter options/terms"),
  });

  let formik: any = useFormik({
    initialValues: {
      terms: "",
    },
    validationSchema: validation,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      dispatch(setAddLoader(true));
      try {
        await handleAddNewTerm(
          specId,
          values?.terms?.trim(),
          productId,
          formik
        );
      } catch (error) {
        dispatch(setAddLoader(false));
      } finally {
        dispatch(setAddLoader(false));
      }
    },
  });

  const handleAddNewTerm = (specId, newTerm, productId, formik) => {
    try {
      dispatch(addTermUnderSpec({ specId, newTerm, productId, formik }));
    } catch {}
  };
  const EditName = async () => {
    setEditLoader(true);
    setError("");
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("id", specId);
    formData.append("name", editedName);
    formData.append("published", "0");
    try {
      const response = await fetch(
        `${BASE_URL}/product/update/specifications`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (response.status == 200) {
        setEditLoader(false);
        dispatch(getSpecificationsList({ id: productId }));
        dispatch(getSpecsList(productId));
        setIsEditMode(false);
      }
    } catch (error) {}
  };

  const handleSave = () => {
    const alreadyValue = specificationsList?.filter(
      (value) => value?.name === editedName && value?.id != id
    );
    if (alreadyValue.length > 0) {
      setError("Please enter a unique value for the specification name.");
      return;
    }

    if (!editedName.trim()) {
      setError("Please enter custom specification");
      return;
    }
    EditName();
  };
  useEffect(() => {
    if (formik.errors.terms) {
      const timer = setTimeout(() => {
        formik.setFieldError("terms", "");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [formik.errors.terms]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const deleteMessage = props?.data?.is_deleted_massage;
  return (
    <OuterContainerCustomSpec>
      {deleteConfirmation && (
        <CustomDialog
          submitButtonText="Delete"
          open={deleteConfirmation}
          handleClose={setDeleteConfirmation}
          text="constant specification"
          onClickAction={handleDeleteMatrix}
          componentText={deleteMessage}
        />
        // <DeleteDialog
        //   open={deleteConfirmation}
        //   handleClose={setDeleteConfirmation}
        //   text={deleteMessage}
        //   onClickAction={handleDeleteMatrix}
        // />
      )}
      <HeaderCustomSpec
        expanded={expanded}
        onClick={() => {
          dispatch(setAccordinIndex(singleIndex));
        }}
        sx={{
          position: "relative",
          height: "auto",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "space-between",
          "@media screen and (max-width:767px)": {
            display: "block",
            height: "auto",
          },
        }}
      >
        <Grid container rowSpacing={2} alignItems={"center"}>
          <Grid item xs={12} sm={12} md={6} lg={!expanded ? 10 : 6}>
            <SpecNameContainer className="typetext">
              <Box
                component={"span"}
                sx={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {expanded ? (
                  <ExpandLessOutlinedIcon
                    className="arrowicons"
                    onClick={() => showExpandedView(specId)}
                  />
                ) : (
                  <ExpandMoreOutlinedIcon
                    className="arrowicons"
                    onClick={() => showExpandedView(specId)}
                  />
                )}
              </Box>
              {isEditMode ? (
                <Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <TextFieldSec>
                      <TextField
                        size="small"
                        value={editedName}
                        onChange={(e) => {
                          if (
                            e?.target?.value.length > specificationTextLength
                          ) {
                            setError(
                              "The content is too long. Please limit it to 50 characters."
                            );
                          } else {
                            setEditedName(e.target.value);
                            setError("");
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSave();
                          }
                        }}
                        sx={{ backgroundColor: "#fff" }}
                      />{" "}
                      {editLoader && (
                        <CircularProgress
                          style={{
                            color: "#DD484E",
                            width: "25px",
                            height: "25px",
                            marginLeft: "10px",
                          }}
                        />
                      )}
                    </TextFieldSec>

                    <SaveCancelIconbox>
                      <LightTooltip
                        arrow
                        title="Save"
                        disableInteractive
                        placement="top"
                      >
                        <SaveOutlinedIcon
                          onClick={() => handleSave()}
                          sx={{ fontSize: "20px", cursor: "pointer" }}
                        />
                      </LightTooltip>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                        sx={{ margin: "1px 1px 1px 3px" }}
                      />
                      <LightTooltip
                        arrow
                        title="Cancel"
                        disableInteractive
                        placement="top"
                      >
                        <CloseOutlinedIcon
                          onClick={() => {
                            setIsEditMode(false);
                            setEditedName(name);
                            setError("");
                          }}
                          sx={{ fontSize: "20px", color: "#d7282f" }}
                        >
                          Cancel
                        </CloseOutlinedIcon>
                      </LightTooltip>
                    </SaveCancelIconbox>
                  </Box>
                  {isEditMode && (
                    <Typography
                      sx={{
                        color: "#D7282F",
                        fontSize: "10px",
                        margin: "4px 0 0 0",
                        textTransform: "none",
                      }}
                    >
                      {error && (
                        <ErrorImage
                          src="/assets/error-outline-red.svg"
                          alt=""
                          sx={{ height: "8px", width: "8px" }}
                        />
                      )}
                      {error}
                    </Typography>
                  )}
                </Box>
              ) : (
                <Box
                  ref={parentRef}
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    gap: "8px",
                    width: "100%",
                    position: "relative",
                    "& .arrowicons": {
                      whiteSpace: "nowrap",
                      width: "150px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "block",
                    },
                  }}
                  onClick={() => showExpandedView(specId)}
                >
                  {!isMobile ? (
                    <>
                      <LightTooltip
                        placement="top"
                        title={name.replaceAll("_", " ")}
                        arrow
                        disableInteractive
                        slotProps={{
                          popper: {
                            modifiers: [
                              {
                                name: "offset",
                                options: {
                                  offset: [-50, -9],
                                },
                              },
                            ],
                          },
                        }}
                      >
                        <Typography
                          className="arrowicons"
                          sx={{
                            fontSize: "13px",
                            color: "#231f20",
                            fontWeight: "500",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            cursor: "pointer",

                            "&:hover": {
                              "& .editicon": {
                                display: "block !important",
                              },
                            },
                          }}
                        >
                          {name.replaceAll("_", " ")}
                        </Typography>
                      </LightTooltip>
                      <Box sx={{ width: "100%", overflow: "visible" }}>
                        <Box
                          ref={childRef}
                          sx={{
                            display: "inline-block",
                            width: "auto",
                            maxWidth: "98%",
                            whiteSpace: "nowrap",
                            paddingRight: "30px",
                            marginRight: "30px",
                            overflow: "hidden",
                            position: "absolute",
                            "@media screen and (max-width:1400px)": {
                              maxWidth: "90%",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                            }}
                          >
                            {!expanded &&
                              children?.map((child, index) => {
                                return (
                                  <>
                                    <Typography
                                      title={child?.name.replaceAll("_", " ")}
                                      sx={{
                                        color: "#676767",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                      }}
                                    >
                                      {child?.name.replaceAll("_", " ")}
                                    </Typography>
                                    {index != children?.length - 1 && (
                                      <Divider
                                        variant="fullWidth"
                                        orientation="vertical"
                                        sx={{ height: "14px" }}
                                      />
                                    )}
                                  </>
                                );
                              })}
                          </Box>
                        </Box>
                        {fillPercentage >= 96 && !expanded && (
                          <Box
                            component={"span"}
                            sx={{
                              position: "absolute",
                              right: "-130px",
                              top: 0,
                              color: "#676767",
                              "@media screen and (max-width:1400px)": {
                                right: "-68px",
                              },
                              "@media screen and (max-width:1350px)": {
                                right: "-74px",
                              },
                              "@media screen and (max-width:1200px)": {
                                right: "-84px",
                              },
                            }}
                          >
                            ...
                          </Box>
                        )}
                      </Box>
                    </>
                  ) : (
                    <LightTooltip
                      arrow
                      title={name.replaceAll("_", " ")}
                      disableInteractive
                      placement="top"
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          color: "#231f20",
                          fontWeight: "500",

                          alignItems: "center",
                          gap: "8px",
                          cursor: "pointer",
                          width: "100px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          "&:hover": {
                            "& .editicon": {
                              display: "block !important",
                            },
                          },
                        }}
                      >
                        {name.replaceAll("_", " ")}
                      </Typography>
                    </LightTooltip>
                  )}
                </Box>
              )}
            </SpecNameContainer>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={!expanded ? 2 : 6}
            sx={{
              "@media screen and (max-width:900px)": {
                paddingTop: expanded ? "" : "0px !important",
              },
            }}
          >
            <SpecDeleteIconContainer>
              {expanded ? (
                <FormControl
                  sx={{
                    width: "40%",
                    "@media screen and (max-width:767px)": { width: "100%" },
                  }}
                  className={poststyle.value_input}
                >
                  <SimpleSelect
                    value={selectedUnit}
                    size="small"
                    options={capitalizedUnits || []}
                    handleChange={handleChange}
                    placeholder="Select unit"
                    error={false}
                  />
                </FormControl>
              ) : (
                ""
              )}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  margin: "0 1px 0 5px",
                  "@media screen and (max-width:900px)": {
                    position: "absolute",
                    right: "16px",
                    top: "12px",
                  },
                }}
              >
                {!isEditMode && (
                  <Link
                    onClick={() => {
                      setIsEditMode(true);
                    }}
                  >
                    <LightTooltip
                      arrow
                      title="Edit"
                      disableInteractive
                      placement="top"
                    >
                      <img
                        src="/assets/EditPencil.svg"
                        width={15}
                        height={15}
                        style={{ margin: "5px 0 0" }}
                      />
                    </LightTooltip>
                  </Link>
                )}

                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ margin: "5px 0" }}
                />
                {!isEditMode && (
                  <LightTooltip
                    title="Delete"
                    arrow
                    placement="top"
                    disableInteractive
                  >
                    <DeleteOutlineOutlinedIcon
                      style={{
                        cursor: "pointer",
                        color: "#DD484E",
                        fontSize: "20px",
                      }}
                      onClick={() => {
                        setDeleteConfirmation(true);
                        setSpecId(specId);
                      }}
                    />
                  </LightTooltip>
                )}
              </Box>
            </SpecDeleteIconContainer>
          </Grid>
        </Grid>
      </HeaderCustomSpec>
      {expanded && (
        <Box
          sx={{
            "@media screen and (max-width:1536px)": {
              width: "100%",
              overflowX: "scroll",
            },
          }}
        >
          <CustomSpecification>
            <TableContainer
              sx={{
                maxWidth: "100%",
                overflowX: "auto",

                "& .MuiTableCell-root": {
                  fontFamily: "Open Sans !important",
                },
              }}
            >
              <Table sx={{ minWidth: "1000px" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ flex: ".2", width: "200px" }}>
                      Options/Terms
                    </TableCell>
                    <TableCell sx={{ width: "500px" }} align="center">
                      Auxiliary Components
                    </TableCell>
                    <TableCell align="center">Uploaded Images</TableCell>
                    <TableCell className="ActionCol" align="center">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {children?.length > 0 && (
                    <>
                      {children?.map((element, index) => (
                        <SingleSpecTerm
                          key={index}
                          data={element}
                          children={children}
                        />
                      ))}
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <AddNewTermContainer
              sx={{
                paddingRight: "16px !important",
                paddingTop: "10px !important",
                paddingLeft: "0px !important",
                paddingBottom: "8px !important",
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <FormControl
                    sx={{
                      width: "30%",
                      "@media screen and (max-width:900px)": { width: "70%" },
                    }}
                  >
                    <TextField
                      id="customFieldSpec"
                      size="small"
                      placeholder="Add Options/Terms"
                      disabled={!loader}
                      sx={{
                        "& .MuiInputBase-root.MuiInput-root:after": {
                          display: "none",
                        },
                        "& .MuiInputBase-root.MuiInput-root:before": {
                          display: "none",
                        },
                        padding: "0 0 0 12px",
                      }}
                      value={formik.values.terms}
                      onChange={(e) => {
                        let value = e?.target?.value;

                        if (value.startsWith(" ")) {
                          value = value.trimStart();
                        }
                        if (value.length > specificationTextLength) {
                          formik.setFieldError(
                            "terms",
                            "The content is too long. Please limit it to 50 characters."
                          );
                        } else {
                          formik.setFieldValue("terms", value);
                          formik.setFieldError("terms", "");
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          formik.handleSubmit();
                        }
                      }}
                      error={formik.errors?.terms ? true : false}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <CustomButtonCustomSpec
                              sx={{
                                textTransform: "capitalize",
                                padding: "0px 3px",
                                minWidth: "50px !important",
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                formik.handleSubmit();
                              }}
                            >
                              {!loader ? (
                                <ThreeDots
                                  height="25"
                                  width="40"
                                  radius="9"
                                  color="white"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  visible={true}
                                />
                              ) : (
                                "Add"
                              )}
                            </CustomButtonCustomSpec>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {formik.errors?.terms && (
                      <Typography
                        sx={{
                          color: "#D7282F",
                          fontSize: "10px",
                          margin: "0 0 0 12px",
                        }}
                      >
                        <img
                          src="/assets/error-outline-red.svg"
                          alt=""
                          style={{
                            width: "8px",
                            height: "8px",
                            margin: "0 4px 0 0px",
                          }}
                        />
                        {formik.errors?.terms}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </AddNewTermContainer>
          </CustomSpecification>
        </Box>
      )}
    </OuterContainerCustomSpec>
  );
};
