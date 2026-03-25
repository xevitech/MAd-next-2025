import React, { useEffect, useState } from "react";
import { LicenseInfo } from "@mui/x-license-pro";
import { apiClient } from "../common/common";
LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);
import * as Yup from "yup";
import { DataGridStyle } from "../common/commonStyle";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Drawer,
  FormControl,
  Grid,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { CustomTextField } from "../common/customTextField";
import { DataGridPro } from "@mui/x-data-grid-pro";
import {
  BoxText,
  Categories,
  DeleteIcon,
  DeletSelected,
  DrawerHeading,
  DrawerLabel,
  DrawerOuterBox,
  SelectedCategories,
  SellerCatgoryThName,
  SellerCatgoryValue,
} from "./styles";
import { setLoader } from "@/hooks/UseProductListContext";
import { useSelector } from "react-redux";
import { LightTooltip } from "../common/Tooltip/tooltip";
import Image from "next/image";
import {
  IconsStyle,
  SaveButtonContainer,
} from "../CompanySettings/CompanyDetail/commonStyles";
import MyCategorySkeleton from "./MyCategorySkeleton";
import MyCategorySkeleton2 from "./MyCategorySkeleton2";
import DeleteDialog from "../common/DeleteAlert/DeleteDialog";
import { Columnexport } from "../products/listProduct/styles";
import {
  Blackoutlinebtn,
  Redoutlinebtn,
} from "../common/buttons/ButtonsVariations";
const ProductApplicationComponent = () => {
  const [category, setCategory] = useState<string[]>([]);
  const [useCase, setRelateduseCase] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const handleCategory = (event, values) => {
    setCategory(values);
  };
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleAutocompleteChange = (event, values) => {
    setRelateduseCase(values);
  };
  const [applicationName, setApplicationName] = useState([]);
  const [inputError, setInputError] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleKeywordChange = (event, values) => {
    setKeywords(values);
  };
  const [pendingList, setPendingList] = useState([]);
  const [applicationId, setApplicationId] = useState([]);
  const { subSellerList, role } = useSelector((state: any) => state.userData);
  const permissions =
    subSellerList && subSellerList.length > 0 ? subSellerList[0] : null;
  const UseCasesList = async () => {
    setLoading(true);
    let response = await apiClient("use_cases/product_application_list", "get");
    if (response.status == 200) {
      setLoading(false);
      setPendingList(response.data);
    }
  };
  useEffect(() => {
    UseCasesList();
  }, []);

  const [multipleDeleteID, setMultipleDeleteID] = useState([]);
  const columns = [
    {
      field: "id",
      headerName: "Id",
      minWidth: 30,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderHeader: (params) => {
        return (
          <div
            style={{
              textAlign: "right",
            }}
          >
            <SellerCatgoryThName>
              {params?.colDef?.headerName}
            </SellerCatgoryThName>
          </div>
        );
      },
      renderCell: (cellValues) => {
        return (
          <>
            <div>
              <SellerCatgoryValue>{cellValues?.row?.id}</SellerCatgoryValue>
            </div>
          </>
        );
      },
    },
    {
      field: "product_name",
      headerName: "Application Name",
      flex: 1,
      minWidth: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderHeader: (params) => {
        return (
          <SellerCatgoryThName>
            {params?.colDef?.headerName}
          </SellerCatgoryThName>
        );
      },

      renderCell: (cellValues) => {
        return (
          <>
            <div>
              <SellerCatgoryValue>{cellValues?.row?.name}</SellerCatgoryValue>
            </div>
          </>
        );
      },
    },
    {
      field: "related_categories",
      headerName: "Link Category",
      flex: 1,
      minWidth: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderHeader: (params) => {
        return (
          <SellerCatgoryThName>
            {params?.colDef?.headerName}
          </SellerCatgoryThName>
        );
      },

      renderCell: (cellValues) => {
        return (
          <>
            <div>
              <SellerCatgoryValue>
                {cellValues?.row?.related_categories}
              </SellerCatgoryValue>
            </div>
          </>
        );
      },
    },
    // {
    //   field: "related use case",
    //   headerName: "Related use case",
    //   minWidth: 100,
    //   flex: 1,
    //   sortable: false,
    //   filterable: false,
    //   disableColumnMenu: true,
    //   renderHeader: (params) => {
    //     return (
    //       <SellerCatgoryThName>
    //         {params?.colDef?.headerName}
    //       </SellerCatgoryThName>
    //     );
    //   },
    //   renderCell: (cellValues) => {
    //     return (
    //       <>
    //         <div>
    //           <SellerCatgoryValue>
    //             {cellValues?.row?.related_use_cases}
    //           </SellerCatgoryValue>
    //         </div>
    //       </>
    //     );
    //   },
    // },
    {
      field: "keywords",
      headerName: "Keywords",
      minWidth: 80,
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderHeader: (params) => {
        return (
          <SellerCatgoryThName>
            {params?.colDef?.headerName}
          </SellerCatgoryThName>
        );
      },
      renderCell: (cellValues) => {
        return (
          <>
            <div
              style={{
                padding: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SellerCatgoryValue>
                {cellValues?.row?.keywords}
              </SellerCatgoryValue>
            </div>
          </>
        );
      },
    },
    {
      field: "description",
      headerName: "description",
      minWidth: 80,
      sortable: false,
      flex: 1,
      filterable: false,
      disableColumnMenu: true,
      renderHeader: (params) => {
        return (
          <SellerCatgoryThName>
            {params?.colDef?.headerName}
          </SellerCatgoryThName>
        );
      },
      renderCell: (cellValues) => {
        return (
          <>
            <div
              style={{
                padding: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span style={{ display: "inline-block", cursor: "pointer" }}>
                <SellerCatgoryValue>
                  {cellValues?.row?.description}
                </SellerCatgoryValue>
              </span>
            </div>
          </>
        );
      },
    },
    {
      field: "Action",
      headerName: "Action",
      minWidth: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderHeader: (params) => {
        return (
          <SellerCatgoryThName>
            {params?.colDef?.headerName}
          </SellerCatgoryThName>
        );
      },
      renderCell: (cellValues) => {
        return (
          <>
            <div
              style={{
                padding: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  cursor: "pointer",
                  alignItems: "center",
                  gap:'6px'
                }}
              >
                {(role == "seller" ||
                  (role == "subuser" &&
                    permissions?.product_application.edit == true)) && (
                  <LightTooltip
                    placement="top"
                    title="Edit"
                    arrow
                    disableInteractive
                  >
                    <Image
                      onClick={async (e) => {
                        e.stopPropagation();
                        toggleDrawer("right", true)(e);
                        setApplicationId([cellValues?.id]);
                        setApplicationName(cellValues?.row?.name);
                      }}
                      height={16}
                      width={15}
                      src={"/assets/EditPencil.svg"}
                      alt="editImage"
                    />
                  </LightTooltip>
                )}
                {(role == "seller" ||
                  (role == "subuser" &&
                    permissions?.product_application.delete == true)) && (
                  <LightTooltip
                    placement="top"
                    title="Delete"
                    arrow
                    disableInteractive
                  >
                    <DeleteOutlinedIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDialog(true);
                        setMultipleDeleteID([cellValues?.id]);
                      }}
                      sx={{
                        width: "20px",
                        height: "20px",
                        color: "#DD484E",
                        zIndex: "9999",
                      }}
                    />
                  </LightTooltip>
                )}
              </div>
            </div>
          </>
        );
      },
    },
  ];
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ padding: "16px 16px 16px 0px" }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const DeleteActionHandler = async () => {
    setLoading(true);
    const response = await apiClient(
      "use_cases/product_application_delete",
      "post",
      {
        body: { ids: multipleDeleteID && multipleDeleteID.join(",") },
      }
    );
    if (response.status == 200) {
      setLoading(false);
      setOpenDialog(false);
      UseCasesList();
    }
  };

  const EditActionHandler = async (e) => {
    setLoading(true);
    const response = await apiClient(
      "use_cases/product_application_update",
      "post",
      {
        body: {
          id: applicationId,
          name: applicationName,
        },
      }
    );
    if (response.status == 200) {
      setLoading(false);
      UseCasesList();
    }
    toggleDrawer("right", false)(e);
  };

  const validation = Yup.object().shape({
    productname: Yup.string().required("Please enter product name"),
    description: Yup.string().required("Please enter description"),
  });
  const formik: any = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues: {
      productname: "",
      description: "",
      category: [],
      useCase: [],
      keywords: [],
    },
    onSubmit: async (values, { resetForm }) => {
      const { productname, description } = values;
      let payload = {
        name: productname,
        related_categories: category.join(","),
        related_use_cases: useCase.join(","),
        keywords: keywords.join(","),
        description: description,
        type: "product_application",
      };
      setLoading(true);
      const response = await apiClient("use_cases/create", "post", {
        body: payload,
      });

      if (response.status === true || response.status == 200) {
        UseCasesList();
        setLoader(false);
        resetForm({
          productname: "",
          description: "",
          ...formik.initialValues,
        });
        setCategory([]);
        setRelateduseCase([]);
        setKeywords([]);
      }
    },
  });

  const handleInputChange = (event) => {
    const { value } = event?.target;

    if (value == "" || !value) {
      return;
    }
    setInputError(false);
    setApplicationName(value);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 350 }}
      role="presentation"
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <DrawerOuterBox>
        <Box>
          <DrawerHeading>Edit</DrawerHeading>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box>
              <DrawerLabel>Application Name</DrawerLabel>
              <TextField
                value={applicationName}
                size="small"
                fullWidth
                onChange={handleInputChange}
                error={inputError}
                helperText={
                  inputError ? <Typography>Please enter value</Typography> : " "
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider></Divider>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <SaveButtonContainer value={{ gap: 5 }}>
                <Blackoutlinebtn
                  borderRadius={"6px"}
                  height={"35px"}
                  onClick={(e) => {
                    toggleDrawer("right", false)(e);
                  }}
                >
                  Cancel
                </Blackoutlinebtn>
                <>
                  <Redoutlinebtn
                    type="submit"
                    borderRadius={"6px"}
                    height={"35px"}
                    onClick={EditActionHandler}
                  >
                    Update
                  </Redoutlinebtn>
                </>
              </SaveButtonContainer>
            </Box>
          </Grid>
        </Grid>
      </DrawerOuterBox>
    </Box>
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}

      {openDialog && (
        <DeleteDialog
          open={openDialog}
          handleClose={setOpenDialog}
          text={"Product Application"}
          onClickAction={DeleteActionHandler}
          loading={loading}
        />
      )}
      
      {loading ? (
        <MyCategorySkeleton2 />
      ) : (
        <>
          <Box
            sx={{
              border: "1px solid #dddddd",
              borderRadius: "8px",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#F4F4F4",
                borderRadius: "8px 8px 0 0",
                padding: "16px",
              }}
            >
              <Grid container>
                <Grid item md={3}>
                  <Box
                    sx={{
                      "& label": {
                        color: "#000000",
                        fontSize: "14px",
                        fontWeight: "600",
                        display: "block",
                        marginBottom: "6px",
                      },
                      "& .MuiFormControl-root": {
                        width: "100%",
                        "& .MuiInputBase-input": {
                          background: "#ffffff",
                        },
                      },
                    }}
                  >
                    <label>Product Applications Name</label>
                    <CustomTextField
                      name="Enter application name"
                      value={formik.values.productname}
                      handleChange={(e) =>
                        formik.setFieldValue("productname", e.target.value)
                      }
                      error={
                        formik.touched.productname &&
                        Boolean(formik.errors.productname)
                      }
                      errorText={
                        formik.touched.productname && formik.errors.productname
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                padding: "16px",
                marginTop: "8px",
              }}
            >
              <Grid container spacing={2} rowSpacing={3}>
                <Grid item xs={12} sm={12} md={4}>
                  <FormControl fullWidth>
                    <Autocomplete
                      size="small"
                      multiple
                      id="tags-filled"
                      options={[
                        "American",
                        "Bajaj",
                        "Emerson",
                        "Centrax",
                        "Epiron",
                        "GE Power",
                      ]}
                      value={category}
                      onChange={handleCategory}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            size="small"
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          label="Related Categories"
                          placeholder="Select Related Categories"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <FormControl fullWidth>
                    <Autocomplete
                      size="small"
                      multiple
                      id="tags-filled"
                      options={[
                        "Application 1",
                        "Application 2",
                        "Application 3",
                      ]}
                      value={useCase}
                      onChange={handleAutocompleteChange}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            size="small"
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          label="Related Use Cases"
                          placeholder="Select Related Use Cases"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <FormControl fullWidth>
                    <Autocomplete
                      size="small"
                      multiple
                      id="tags-filled"
                      options={["Gas Turbine"]}
                      value={keywords}
                      onChange={handleKeywordChange}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            size="small"
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          label={"Keywords"}
                          placeholder="Select Keywords"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Box
                    sx={{
                      "& textarea": {
                        width: "100%",
                        borderRadius: "4px",
                        padding: "6px 13px",
                        fontSize: "15px",
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        fontFamily: "open sans",
                        outline: "0",
                        "&:hover": {
                          borderColor: "rgba(0, 0, 0, 0.87)",
                        },
                        "&:focus": {
                          borderColor: "rgba(0, 0, 0, 0.87)",
                        },
                      },
                    }}
                  >
                    <CustomTextField
                      name="Enter description"
                      value={formik.values.description}
                      handleChange={(e) =>
                        formik.setFieldValue("description", e.target.value)
                      }
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      errorText={
                        formik.touched.description && formik.errors.description
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box>
            {(role == "seller" ||
              (role == "subuser" &&
                permissions?.product_application?.add == true)) && (
              <Button
                onClick={formik.handleSubmit}
                variant="outlined"
                size="small"
                color="error"
                style={{ marginTop: 10, textTransform: "none" }}
              >
                Add{" "}
              </Button>
            )}
          </Box>
        </>
      )}
      <CustomTabPanel>
        <div style={{ height: 400, width: "100%" }}>
          {loading ? (
            <MyCategorySkeleton />
          ) : (
            <DataGridPro
              sx={DataGridStyle}
              onSelectionModelChange={(newSelectionModel) =>
                setMultipleDeleteID(newSelectionModel)
              }
              rows={pendingList}
              selectionModel={multipleDeleteID}
              columns={columns}
              rowHeight={40}
              pagination
              pageSize={10}
              initialState={{
                pagination: {},
              }}
              checkboxSelection
              components={{
                Toolbar: () => (
                  <Columnexport
                    sx={{
                      margin: " 16px 16px 8px 0px !important",
                    }}
                  >
                    {multipleDeleteID.length > 0 && (
                      <SelectedCategories>
                        <Categories
                          sx={{
                            borderLeft: "none",
                            fontSize: "14px !important",
                            "@media screen and (max-width:600px)": {
                              fontSize: "12px",
                            },
                          }}
                        >
                          Selected Categories ({multipleDeleteID.length})
                        </Categories>
                        <BoxText
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDialog(true);
                          }}
                        >
                          <DeletSelected
                            sx={{
                              fontSize: "14px !important",
                              "@media screen and (max-width:600px)": {
                                fontSize: "12px",
                              },
                            }}
                          >
                            Delete Selected{" "}
                          </DeletSelected>
                          <DeleteIcon></DeleteIcon>
                        </BoxText>
                      </SelectedCategories>
                    )}
                  </Columnexport>
                ),
              }}
            />
          )}
        </div>
      </CustomTabPanel>
      {/* {loading && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <CircularProgress />

        </Box>

      )} */}
    </>
  );
};
export default ProductApplicationComponent;
