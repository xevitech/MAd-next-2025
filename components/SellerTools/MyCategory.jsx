import React, { useEffect, useState } from "react";
import { LicenseInfo } from "@mui/x-license-pro";
import DetailsIcon from "@mui/icons-material/Details";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  SellerCatgoryThName,
  SellerCatgoryValue,
  BoxText,
  SellerCatgoryStatus,
  CategoryTable,
  ParentCategoryBox,
  MainBox,
  MainBox1,
  SecondSkeletonBox,
  MainBox3,
  SellerCatgoryStatusBox,
  DrawerOuterBox,
  DrawerHeading,
  DrawerLabel,
} from "./styles";
import { ProfileHeader } from "../common/profileheader";
import { apiClient } from "../common/common";
import Auth from "@/auth/Auth";
LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);
import * as Yup from "yup";

import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  Grid,
  Button,
  Drawer,
  TextField,
  Divider,
} from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import {
  Mainbox,
  Tabtext,
  SelectedCategories,
  DeletSelected,
  DeleteIcon,
  Categories,
  Header1,
} from "./styles";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { DataGridStyle } from "../common/commonStyle";
import { useFormik } from "formik";
import ProductApplicationComponent from "./productApplicationComponent";
import ProductUseCaseComponent from "./productUseCase";
import { useSelector } from "react-redux";
import { LightTooltip } from "../common/Tooltip/tooltip";
import {
  IconsStyle,
  SaveButtonContainer,
} from "../CompanySettings/CompanyDetail/commonStyles";
import Image from "next/image";
import MyCategorySkeleton from "./MyCategorySkeleton";
import { Image1 } from "../guestLayout/landingPage/styles";
import {
  Blackoutlinebtn,
  Redoutlinebtn,
} from "../common/buttons/ButtonsVariations";
import { Columnexport } from "../products/listProduct/styles";
import { toast } from "react-toastify";
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
        <CategoryTable>
          <Typography>{children}</Typography>
        </CategoryTable>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
export default function MyCategory() {
  const [newCategory, setNewCategory] = useState([]);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const { role } = useSelector((state) => state.userData);
  const { subSellerList } = useSelector((state) => state.userData);
  const permissions =
    subSellerList && subSellerList.length > 0 ? subSellerList[0] : null;

  const [editCategory, setEditCategory] = useState({});
  const [categoryInputData, setCategoryInputData] = useState("");
  const [inputError, setInputError] = useState(false);
  const [isSuggestedCategory, setIsSuggestedCategory] = useState(false);

  useEffect(() => {
    const isDrawerOpen = Object.values(state).some(Boolean);
    if (isDrawerOpen == false) {
      setInputError(false);
      setCategoryInputData("");
      return;
    }
  }, [state]);

  const handleSetEditData = async (id) => {
    if (!id) return;
  
    try {
      const response = await apiClient(`category/editrejected/${id}`, "post");
      if (response?.status === 200) {
        const { category_lists, name, ...data } = response?.data || {};
        setIsSuggestedCategory(!!category_lists);
        setEditCategory(data);
        setCategoryInputData(name);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const columns = [
    {
      field: "serialNo",
      headerName: "Sr. No.",
      minWidth: 100,
      flex: 0.5,
      renderCell: (params) => {
        const rowIndex = params.rowIndex;
        const serialNumber = rowIndex + 1;
        return (
          <>
            <div>
              <SellerCatgoryValue>{params?.row?.idx+1}</SellerCatgoryValue>
            </div>
          </>
        );
      },
    },
    {
      field: "id",
      headerName: "Id",
      minWidth: 60,
      flex: 1,
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
      field: "sector",
      headerName: "Sector",
      minWidth: 200,
      flex: 1,
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
        let newParent = extractDataRecursive(cellValues?.row)
          ?.reverse()
          ?.find((ele) => ele.parent_name == null);
        return (
          <>
            <div>
              <img
                style={{
                  width: "20px",
                  height: "20px",
                  objectFit: "contain",
                  margin: "0 6px 0 0px",
                }}
                src={newParent?.icon}
              />
            </div>

            <div>
              <SellerCatgoryValue>{newParent?.name}</SellerCatgoryValue>
            </div>
          </>
        );
      },
    },
    {
      field: "parent_id",
      headerName: "Parent Category",
      minWidth: 500,
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
        let newParent = extractDataRecursive(cellValues?.row)?.reverse();
        return (
          <ParentCategoryBox>
            {newParent?.length > 0 &&
              newParent?.map(
                (ele, index) =>
                  ele?.parent_name != null && (
                    <>
                      <SellerCatgoryValue
                        style={{
                          color:
                            index == newParent.length - 1
                              ? "#34A853"
                              : "#231F20",
                        }}
                      >
                        {ele?.name}
                      </SellerCatgoryValue>
                      {index !== newParent.length - 1 && (
                        <i
                          class="icon-arrowRight"
                          style={{
                            fontSize: "10px",
                            padding: "0 4px",
                            margin: "1px 3px 0px",
                          }}
                        ></i>
                      )}
                    </>
                  )
              )}
          </ParentCategoryBox>
        );
      },
    },
    {
      field: "approval_status",
      headerName: "Status",
      minWidth: 100,
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
            <SellerCatgoryStatusBox>
              {(cellValues?.row?.approval_status == 0 || cellValues?.row?.approval_status == 3) ? (
                <SellerCatgoryStatus className="Statuspending">
                  Pending
                </SellerCatgoryStatus>
              ) : cellValues?.row?.approval_status == 1 ? (
                <SellerCatgoryStatus className="Statusapproved">
                  Approved
                </SellerCatgoryStatus>
              ) : cellValues?.row?.approval_status == 2 ?  (
                <SellerCatgoryStatus className="Statusrejected">
                  Rejected
                  <LightTooltip
                    title={cellValues?.row?.comments}
                    arrow
                    placement="top"
                    disableInteractive
                  >
                    <DetailsIcon
                      style={{
                        color: "#D7282F",
                        fontSize: "14px",
                        position: "relative",
                        top: "-1px",
                        marginLeft: "2px",
                      }}
                    />
                  </LightTooltip>
                </SellerCatgoryStatus>
              ) : null}
            </SellerCatgoryStatusBox>
          </>
        );
      },
    },
    {
      field: "action",
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
                  gap: "6px",
                }}
              >
                {(role == "seller" ||
                  (role == "subuser" &&
                    permissions?.category.edit == true)) && (
                  <>
                    <LightTooltip
                      placement="top"
                      title="Edit"
                      arrow
                      disableInteractive
                    >
                      <Image1
                        onClick={async (e) => {
                          e.stopPropagation();
                          await handleSetEditData(cellValues?.id);
                          toggleDrawer("right", true)(e);
                        }}
                        height={16}
                        width={15}
                        src="/assets/EditPencil.svg"
                        alt="editImage"
                      />
                    </LightTooltip>
                  </>
                )}
                {(role == "seller" ||
                  (role == "subuser" &&
                    permissions?.category.delete == true)) && (
                  <LightTooltip
                    arrow
                    placement="top"
                    title="Delete"
                    disableInteractive
                  >
                    <DeleteOutlinedIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDialog(true);
                        setMultipleDeleteID([cellValues?.id]);
                      }}
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#DD484E",
                        zIndex: "9999",
                        "& .MuiSvgIcon-root": {
                          marginTop: "10px",
                        },
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
  const [multipleDeleteID, setMultipleDeleteID] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [pendingList, setPendingList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [value, setValue] = React.useState(0);
  const [renderComponent, setRenderComponent] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [errorText, setErrorText] = useState([]);

  const handleChange = (even, newValue) => {
    setValue(newValue);
  };
  const PendingCategoryList = async () => {
    let response = await apiClient("category/pending_approval", "get");
    if (response.status == 201) {
      setPendingList(response.data);
    }
  };

  const UseCasesList = async () => {
    let response = await apiClient("use_cases/list", "get");
    if (response.status == 200) {
      setProductList(response.data);
    }
  };

  useEffect(() => {
    setRenderComponent(true);
    PendingCategoryList();
    getCategoryList();
    UseCasesList();
  }, []);
  const [description, setDescription] = useState("");
  const handleDescriptionChange = (event) => {
    const newValue = event.target.value;
    setDescription(newValue);
  };
  const [category, setCategory] = useState();
  const [useCase, setRelateduseCase] = useState();
  const [keywords, setKeywords] = useState();
  const [productname, setProductName] = useState();
  const handleCategory = (event, values) => {
    setCategory(values);
  };

  const validation = Yup.object().shape({
    productname: Yup.string().required("Please enter product name"),
    description: Yup.string().required("Please enter description"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues: {
      productname: productname,
      description: description,
    },
    onSubmit: async (values) => {
      const { productname, description } = values;
      let payload = {
        name: productname,
        related_categories: category,
        related_use_cases: useCase,
        keywords: keywords,
        description: description,
        type: "product application",
      };
      setLoader(true);
      const response = await apiClient("use_cases/create", "post", {
        body: payload,
      });

      if (response.status === true || response.status == 200) {
      }
    },
  });

  const getCategoryList = async (parentId = 0, level = 0, type = "new") => {
    setLoader(true);
    let response = await apiClient("category/list", "post", {
      body: { fetch: "all", parent: parentId, user_id: Auth?.userData()?.id },
    });
    if (response.status === 200) {
      setLoader(false);
      if (type === "update") {
        let index = categoryList.findIndex((v) => v.level === level);
        let list = [...categoryList];
        const updatedResponseData = response?.data?.map((item, index) =>{
          return {...item, idx:index};
        })
        list[index] = { level, data: updatedResponseData, parentId };
        setCategoryList(list);
        let selectedValue = updatedResponseData?.find(
          (v) => (v.name = newCategory[level - 1])
        );
        if (selectedValue) {
          SelectedOptionHandler(selectedValue.id, level, selectedValue.name);
        }
        setNewCategory([]);
        return;
      } else {
        let listExist = categoryList.filter((v) => v.level <= level);
        const updatedResponseData = response?.data?.map((item, index) =>{
          return {...item, idx:index};
        })
        let updateList = [
          ...listExist,
          { level: level + 1, data: updatedResponseData, parentId },
        ];
        setCategoryList(updateList);
      }
      return response;
    }
  };

  const deleteAfterC = (arr, index) => {
    if (index !== -1) {
      arr.splice(index + 1);
    }
    return arr;
  };

  const handleOptionChange = (event, newValue, index, level) => {
    setCategoryName((prev) => {
      let name = deleteAfterC([...prev], index);
      name[index] = newValue;
      return name;
    });
    if (newValue) {
      setErrorText([]);
      getCategoryList(newValue.value, level);
    }
  };

  const DeleteActionHandler = async () => {
    setLoader(true);
    await apiClient("category/delete", "post", {
      body: { id: multipleDeleteID },
    });
    setLoader(false);
    setOpenDialog(false);
    PendingCategoryList();
    getCategoryList();
  };

  const createNewCategory = async (index, level) => {
    if (newCategory[index]) {
      let index = categoryName.findIndex((v) => v.value == "new");
      let parentIndex = index <= 0 ? 0 : index - 1;
      let response = await apiClient("category/create", "post", {
        body: {
          parent_id: level > 1 ? categoryName[parentIndex].value : 0,
          name: newCategory[index],
          user_id: `${Auth?.userData()?.id}`,
        },
      });
      if (response.status === 200) {
        let list = [...categoryList];
        list[index].data = [
          ...list[index].data,
          {
            icon: "",
            id: response.data,
            level: 0,
            name: response.name,
            parent_id: 0,
            parent_name: "",
          },
        ];
        let indexCheck = categoryList.findIndex((v) => v.level == level + 1);
        if (indexCheck < 0) {
          setCategoryList([
            ...list,
            { level: level + 1, data: [], parentId: response.data },
          ]);
        } else {
          setCategoryList(list);
        }
        setCategoryName((prev) => {
          let name = [...prev];
          name[index].value = response.data;
          return name;
        });
        setNewCategory([]);
        PendingCategoryList();
      } else {
        setErrorText((prev) => {
          let error = [...prev];
          error[index] = response.message[0];
          return error;
        });
      }
    }
  };

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

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value1, setValue1] = React.useState(0);

  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };
  function extractParentNames(obj, result = []) {
    if (obj && typeof obj === "object") {
      if (obj.parent_name !== null) {
        result.push(obj.parent_name);
      }
      for (let key in obj) {
        extractParentNames(obj[key], result);
      }
    }
    return result;
  }

  function extractDataRecursive(data, result = []) {
    if (data && typeof data === "object") {
      result.push({
        id: data.id,
        name: data.name,
        parent_id: data.parent_id,
        parent_name: data.parent_name,
        icon: data.icon,
      });
      if (data.children_recursive) {
        extractDataRecursive(data.children_recursive, result);
      }
    }
    return result;
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleInputChange = (event) => {
    const { value } = event?.target;
    if (value == "" || !value) {
      return;
    }
    setInputError(false);
    setCategoryInputData(value);
  };

  const handleCategoryUpdate = async (e) => {
    if (!categoryInputData || (!categoryInputData && !editCategory?.id)) {
      setInputError(true);
      return;
    }
  
    setInputError(false);
  
    try {
      const endpoint = `category/editrejected/${editCategory?.id}`;
      const response = await apiClient(endpoint, "post", {
        body: { name: categoryInputData, approval_status: 0 },
      });
  
      if(response?.status === 200){
        await getCategoryList();
        toggleDrawer("right", false)(e);
        toast.success(response?.message || "Category updated successfully.")
        setEditCategory({});
        setCategoryInputData("");
      }else{
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      toggleDrawer("right", false)(e);
      setEditCategory({});
      setCategoryInputData("");
    }
  };
  

  const handleAcceptDeclineCategory = async (action, e) => {
    if (!isSuggestedCategory || !editCategory?.id) return;
  
    try {
      const endpoint = `category/replace_catlist/${editCategory?.id}/${editCategory?.user_id}/${editCategory?.product_id}`;
      const response = await apiClient(endpoint, "post", { body: { action } });
  
      if (response?.status === 200) {
        await getCategoryList();
        toggleDrawer("right", false)(e);
        toast.success(response?.message || "Category list updated successfully.");
        if (action === "yes") {
          // Redirect logic can be added here if needed
        }
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      toggleDrawer("right", false)(e);
      setEditCategory({});
      setCategoryInputData("");
    }
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
              <DrawerLabel>Category Name</DrawerLabel>
              <TextField
                value={categoryInputData}
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
                    setCategoryInputData("");
                    setInputError(false);
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
                    onClick={handleCategoryUpdate}
                  >
                    Update
                  </Redoutlinebtn>
                </>
              </SaveButtonContainer>
            </Box>
          </Grid>
          {isSuggestedCategory && (
            <>
              <Grid item xs={12}>
                <Divider></Divider>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Typography>Category suggested by admin:</Typography>
                  <Box>
                    {/* Tree comes here of suggestion */}
                    <Typography>{editCategory?.suggested_category}</Typography>
                  </Box>
                  <SaveButtonContainer value={{ gap: 5 }}>
                    <Blackoutlinebtn
                      borderRadius={"6px"}
                      height={"35px"}
                      onClick={(e) => handleAcceptDeclineCategory("no", e)}
                    >
                      Decline
                    </Blackoutlinebtn>
                    <>
                      <Redoutlinebtn
                        type="submit"
                        borderRadius={"6px"}
                        height={"35px"}
                        onClick={(e) => handleAcceptDeclineCategory("yes", e)}
                      >
                        Accept
                      </Redoutlinebtn>
                    </>
                  </SaveButtonContainer>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </DrawerOuterBox>
    </Box>
  );
  return (
    <>
      {["right"].map((anchor) => (
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
          text={"Category"}
          onClickAction={DeleteActionHandler}
          loading={loader}
        />
      )}
      <div className="full_page">
        <Box>
          <Header1>
            <ProfileHeader text={"My Categories"} />
          </Header1>
          {renderComponent ? (
            <Mainbox>
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value1}
                    onChange={handleChange1}
                    aria-label="basic tabs example"
                    sx={{
                      display: "flex",
                      "& .MuiTab-root.Mui-selected": {
                        color: "#d7282f",
                      },
                    }}
                    TabIndicatorProps={{
                      style: {
                        backgroundColor: "#D7282F",
                      },
                    }}
                  >
                    {(role == "seller" ||
                      (role == "subuser" &&
                        permissions?.category.view == true)) && (
                      <Tabtext label="All Categories" {...a11yProps(0)} />
                    )}
                    {(role == "seller" ||
                      (role == "subuser" &&
                        permissions?.product_application.view == true)) && (
                      <Tabtext label="Product Applications" {...a11yProps(1)} />
                    )}
                    {(role == "seller" ||
                      (role == "subuser" &&
                        permissions?.product_use_cases.view == true)) && (
                      <Tabtext label="Product Use Cases" {...a11yProps(2)} />
                    )}
                  </Tabs>
                </Box>
                {(role == "seller" ||
                  (role == "subuser" &&
                    permissions?.category.view == true)) && (
                  <CustomTabPanel value={value1} index={0}>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        borderBottom: 1,
                        borderColor: "divider",
                      }}
                    >
                      <Box sx={{}}>
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          aria-label="basic tabs example"
                          sx={{
                            display: "flex",
                            "& .MuiTab-root.Mui-selected": {
                              color: "#d7282f",
                            },
                          }}
                          TabIndicatorProps={{
                            style: {
                              backgroundColor: "#D7282F",
                            },
                          }}
                        >
                          <Tabtext label="My Categories" />
                          {/* {multipleDeleteID.length > 0 && (
                            <SelectedCategories>
                              <Categories>
                                Selected Categories ({multipleDeleteID.length})
                              </Categories>
                              <BoxText
                                style={{ cursor: "pointer" }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenDialog(true);
                                }}
                              >
                                <DeletSelected>Delete Selected </DeletSelected>
                                <DeleteIcon></DeleteIcon>
                              </BoxText>
                            </SelectedCategories>
                          )} */}
                        </Tabs>
                      </Box>
                    </Box>

                    <CustomTabPanel value={value} index={0}>
                      <div style={{ height: 400, width: "100%" }}>
                        {loader ? (
                          <MyCategorySkeleton />
                        ) : (
                          <DataGridPro
                            sx={DataGridStyle}
                            onSelectionModelChange={(newSelectionModel) =>
                              setMultipleDeleteID(newSelectionModel)
                            }
                            loading={loader}
                            localeText={{
                              columnMenuShowColumns: "Manage Columns",
                            }}
                            rows={categoryList?.[0]?.data || []}
                            selectionModel={multipleDeleteID}
                            columns={columns}
                            rowHeight={40}
                            pagination
                            pageSize={10}
                            initialState={{
                              pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                              },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection={
                              // ((role == "subuser" &&
                              //   permissions?.category?.edit == true) ===
                              //   permissions?.category?.delete) ==
                              true
                              //   ? permissions?.category?.delete == true
                              //   : false
                            }
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
                                          "@media screen and (max-width:600px)":
                                            { fontSize: "12px" },
                                        }}
                                      >
                                        Selected Categories (
                                        {multipleDeleteID.length})
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
                                            "@media screen and (max-width:600px)":
                                              { fontSize: "12px" },
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
                  </CustomTabPanel>
                )}
                {(role == "seller" ||
                  (role == "subuser" &&
                    permissions?.product_application.view == true)) && (
                  <CustomTabPanel value={value1} index={1}>
                    <ProductApplicationComponent />
                  </CustomTabPanel>
                )}
                {(role == "seller" ||
                  (role == "subuser" &&
                    permissions?.product_use_cases.view == true)) && (
                  <CustomTabPanel value={value1} index={2}>
                    <ProductUseCaseComponent />
                  </CustomTabPanel>
                )}
              </Box>
            </Mainbox>
          ) : (
            "loading"
          )}
        </Box>
      </div>
    </>
  );
}
