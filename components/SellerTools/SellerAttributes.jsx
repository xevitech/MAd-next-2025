import React, { useEffect, useState, useContext } from "react";
import { InputAdornment, Box, Tooltip, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useRouter } from "next/navigation";
import { MyAppContext } from "@/contextApi/appContext";
import attributestyle from "./categorystyle.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { ProfileHeader } from "../common/profileheader";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  CustomisedButton,
  EmptyDatagrid,
  AddListingBtnContainer,
  SpecificationDescription,
} from "./styles";
import {
  Header,
  OuterContainer,
  InnerContainer,
  Card,
  CardContent,
  MainGrid,
  CategoryGrid,
  SubGrid,
  InputField,
  GridSpan,
  DropDownGrid,
  SearchORCreate,
  ApprovedHeading,
  ApprovedCategoryUL,
  ApprovedCategoryLI,
  CategoryHeaderButton,
  SellerInnerspan,
  CardInn,
} from "./attribute";
import { apiClient } from "@/components/common/common";
import Image from "next/image";
import { AccessDenied } from "../common/AccessDenied";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import { useSelector } from "react-redux";
import Dashboard from "pages/dashboard";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SellerAttributes() {
  const router = useRouter();
  const { setCompleteScreenLoader } = useContext(MyAppContext);
  const [deleteData, setDeleteData] = useState({});
  const [approvedCategory, setApprovedCategory] = useState([]);
  const [savedCategory, setSavedCategory] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [allSpecifications, setAllSpecifications] = useState([]);
  const [options, setOptions] = useState([]);
  const [allOptions, setAllOptions] = useState([]);
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [specificationName, setSpecificationName] = useState("");
  const [specificationIcon, setSpecificationIcon] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [specificationId, setSpecificationId] = useState("");
  const [errorText, setErrorText] = useState("");
  const [optionErrorText, setOptionErrorText] = useState("");
  const [open, setOpen] = useState(false);
  const [responseType, setResponseType] = useState("success");
  const [responseMessage, setResponseMessage] = useState();
  const [optionValue, setOptionValue] = useState("");
  const [optionValueIcon, setOptionValueIcon] = useState(false);
  const { breakPoints } = useContext(MyAppContext);
  const { role } = useSelector((state) => state.userData);

  useEffect(() => {
    getApprovedCategory();
  }, []);

  const getApprovedCategory = async () => {
    setCompleteScreenLoader(true);
    let response = await apiClient("category/list", "post", {
      body: { fetch: "all" },
    });
    if (response.status === 200) {
      setApprovedCategory(response.data);
      setSavedCategory(response.data);
    }
    setCompleteScreenLoader(false);
  };

  const handleCategoryFilter = (events) => {
    if (events.target.value.length < 0) return;
    var filterData = savedCategory.filter((element) =>
      element.name.toLowerCase().includes(events.target.value.toLowerCase())
    );
    setApprovedCategory(filterData);
  };

  const handleAddSpecificationInputChange = (events) => {
    setSpecificationName(events.target.value);
    if (events.target.value.length < 0) return;
    var filterData = allSpecifications.filter((element) =>
      element.name.toLowerCase().includes(events.target.value.toLowerCase())
    );
    setSpecifications(filterData);
    setSpecificationIcon(false);
    if (filterData.length === 0) setSpecificationIcon(true);
  };

  const handleAddOptionsInputChange = (events) => {
    setOptionValue(events.target.value);
    if (events.target.value.length < 0) return;
    var filterData = allOptions.filter((element) =>
      element.name.toLowerCase().includes(events.target.value.toLowerCase())
    );
    setOptions(filterData);
    setOptionValueIcon(false);
    if (filterData.length === 0) setOptionValueIcon(true);
  };

  const handleCategoryClick = async (id) => {
    setCompleteScreenLoader(true);
    setParentCategoryId(id);
    setOptions([]);
    setAllOptions([]);
    setSpecificationId();
    let responseData = await apiClient("attributes/list", "post", {
      body: {
        category_id: id,
      },
    });

    if (responseData.status === 200) setSpecifications(responseData.data);
    setAllSpecifications(responseData.data);
    setCompleteScreenLoader(false);
  };

  const handleSpecificationClick = async (id) => {
    setCompleteScreenLoader(true);
    setSpecificationId(id);
    let responseData = await apiClient("attributes/list", "post", {
      body: {
        category_id: parentCategoryId,
        parent: id,
      },
    });

    if (responseData.status === 200) setOptions(responseData.data);
    setAllOptions(responseData.data);
    setCompleteScreenLoader(false);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleCreateSpecification = async () => {
    if (!specificationName) {
      setErrorText("Please enter specification name");
      return;
    }
    setCompleteScreenLoader(true);
    let payloads = {
      name: specificationName,
      category_id: parentCategoryId,
    };
    let response = await apiClient("attributes/create", "post", {
      body: payloads,
    });

    setOpen(true);
    setResponseType("success");
    setResponseMessage(response.message);
    if (response.status !== 200) {
      setResponseType("error");
    } else {
      setSpecificationName("");
    }
    setCompleteScreenLoader(false);
    handleCategoryClick(parentCategoryId);
  };

  const handleCreateOptions = async () => {
    if (!optionValue) {
      setOptionErrorText("Please enter option name");
      return;
    }
    setCompleteScreenLoader(true);
    let payloads = {
      name: optionValue,
      category_id: parentCategoryId,
      parent: specificationId,
    };

    let response = await apiClient("attributes/create", "post", {
      body: payloads,
    });

    setOpen(true);
    setResponseType("success");
    setResponseMessage(response.message);
    if (response.status !== 200) {
      setResponseType("error");
    } else {
      setOptionValue("");
    }
    setCompleteScreenLoader(false);
    handleSpecificationClick(specificationId);
  };

  const deleteSpecification = async () => {
    const { id, type } = deleteData;
    let responseData = await apiClient("attributes/delete", "post", {
      body: {
        id: id,
      },
    });
    if (responseData.status === 200)
      if (type === 0) {
        handleCategoryClick(parentCategoryId);
      } else {
        handleSpecificationClick(specificationId);
      }
    setDeleteConfirmation(false);
    setDeleteData({});
  };

  return (
    <>
      {deleteConfirmation && (
        <DeleteDialog
          open={deleteConfirmation}
          handleClose={() => setDeleteConfirmation(false)}
          text="Specification"
          onClickAction={deleteSpecification}
        />
      )}
      {role == "buyer" ? (
        <div className="full_page">
          <Grid container>
            <Grid item xs={12}>
              <OuterContainer>
                <InnerContainer className="AdvanceSearchBar">
                  <ProfileHeader text={""} />
                  {/* <AccessDenied /> */}
                  <Dashboard />
                </InnerContainer>
              </OuterContainer>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div className="full_page">
          <div className={attributestyle.delete_pop}>
            <Snackbar
              autoHIde={true}
              open={open}
              autoHideDuration={3000}
              onClose={handleCloseSnack}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert
                onClose={handleCloseSnack}
                severity={responseType}
                sx={{ width: "100%" }}
              >
                {responseMessage}
              </Alert>
            </Snackbar>
          </div>
          <Grid container>
            <Grid item xs={12}>
              <OuterContainer className={attributestyle.attribute_page}>
                <InnerContainer breakPoints={breakPoints}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                  >
                    <ProfileHeader text={"Specification Definition"} />
                    <Box sx={{ margin: "90px 0px 12px" }}>
                      <Tooltip
                        title="Here you will get the approved categories of the product and related specifications (attributes)."
                        arrow
                        componentsProps={{
                          tooltip: {
                            sx: {
                              fontSize: "12px",
                              width: "200px",
                              opacity: 1,
                            },
                          },
                        }}
                      >
                        <ContactSupportOutlinedIcon />
                      </Tooltip>
                    </Box>
                  </Box>
                  {approvedCategory?.length <= 0 ? (
                    <Header>
                      <Card>
                        <CardContent>
                          <EmptyDatagrid>
                            <div>
                              <GridViewOutlinedIcon
                                style={{
                                  color: "#7B7979cc",
                                  width: "100%",
                                  fontSize: "100px",
                                }}
                              />
                            </div>
                            <ApprovedHeading>
                              Categories and attributes are interconnected, if
                              you want to add specifications, first <br></br>
                              Create Categories.
                            </ApprovedHeading>
                            <center>
                              <AddListingBtnContainer>
                                {(role == "seller" ||
                                  (role == "subuser" &&
                                    permissions?.specification_definition?.add==true
                                    )) && (
                                  <CustomisedButton
                                    color="error"
                                    onClick={() => {
                                      router.push("/seller/categories");
                                    }}
                                    endIcon={
                                      <AddCircleOutlineIcon
                                        style={{ fontSize: "20px" }}
                                      />
                                    }
                                  >
                                    Add Category
                                  </CustomisedButton>
                                )}
                              </AddListingBtnContainer>
                            </center>
                          </EmptyDatagrid>
                        </CardContent>
                      </Card>
                    </Header>
                  ) : (
                    <Header style={{ border: "1px solid #ccc" }}>
                      <Card>
                        <CardInn breakPoints={breakPoints}>
                          <Grid
                            container
                            spacing={2}
                            style={{ borderBottom: "1px solid #E0E3E7" }}
                          >
                            <Grid item xs={4} sm={4} md={4} lg={4}>
                              <SubGrid>
                                <span>
                                  Select Main/Primary Category of the Product
                                </span>
                              </SubGrid>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4}>
                              <SubGrid>
                                <GridSpan>Specifications</GridSpan>
                              </SubGrid>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4}>
                              <SubGrid>
                                <GridSpan>Options/Terms </GridSpan>
                              </SubGrid>
                            </Grid>
                          </Grid>
                        </CardInn>

                        <CardContent>
                          <MainGrid>
                            <Grid
                              container
                              spacing={2}
                              style={{ border: "none" }}
                            >
                              <Grid item xs={12} sm={6} md={4}>
                                <DropDownGrid>
                                  <div>Select Category </div>
                                </DropDownGrid>
                                <CategoryGrid>
                                  <SearchORCreate>
                                    <InputField
                                      className="speciication_defination"
                                      size="small"
                                      placeholder="Search Category"
                                      onChange={(e) => {
                                        handleCategoryFilter(e);
                                      }}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <SearchOutlinedIcon />
                                          </InputAdornment>
                                        ),
                                        endAdornment: (
                                          <InputAdornment position="end"></InputAdornment>
                                        ),
                                      }}
                                      sx={{
                                        "& .mui-1o1iaix-MuiFormControl-root-MuiTextField-root:hover":
                                          {
                                            border: "none",
                                          },
                                      }}
                                    ></InputField>
                                    <ApprovedCategoryUL
                                      style={
                                        approvedCategory &&
                                        approvedCategory.length > 5
                                          ? { overflowY: "scroll" }
                                          : null
                                      }
                                    >
                                      {approvedCategory.length > 0 &&
                                        approvedCategory.map(
                                          (element, index) => (
                                            <ApprovedCategoryLI
                                              key={index}
                                              className={
                                                element?.id === parentCategoryId
                                                  ? "selected-list-children-li"
                                                  : ""
                                              }
                                              onClick={() => {
                                                handleCategoryClick(
                                                  element?.id
                                                );
                                              }}
                                            >
                                              <SellerInnerspan
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  gap: 5,
                                                }}
                                              >
                                                <span>
                                                  <Image
                                                    src={element?.icon}
                                                    width={15}
                                                    height={15}
                                                  />
                                                </span>
                                                <span>{element?.name}</span>
                                              </SellerInnerspan>
                                            </ApprovedCategoryLI>
                                          )
                                        )}
                                    </ApprovedCategoryUL>
                                  </SearchORCreate>
                                </CategoryGrid>
                                <Box sx={{ marginTop: "10px" }}>
                                  <SpecificationDescription>
                                    Select the parent category you assigned for
                                    your product.
                                  </SpecificationDescription>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4}>
                                <DropDownGrid>
                                  <div>Add Specifications</div>
                                </DropDownGrid>
                                <CategoryGrid>
                                  <SearchORCreate>
                                    <InputField
                                      helperText={errorText}
                                      error={errorText ? true : false}
                                      className="speciication_defination"
                                      size="small"
                                      placeholder="Search or Add"
                                      onChange={(e) => {
                                        handleAddSpecificationInputChange(e);
                                        if (errorText) setErrorText("");
                                      }}
                                      onKeyDown={(e) => {
                                        if (
                                          role == "seller" ||
                                          (role == "subuser" &&
                                            permissions?.specification_definition?.add==true 
                                           )
                                        ) {
                                          if (e.key == "Enter") {
                                            handleCreateSpecification();
                                          }
                                        }
                                      }}
                                      name="specificationName"
                                      value={specificationName}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <SearchOutlinedIcon />
                                          </InputAdornment>
                                        ),
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <CategoryHeaderButton
                                              onClick={() => {
                                                handleCreateSpecification();
                                              }}
                                            >
                                              {(role == "seller" ||
                                                (role == "subuser" &&
                                                  permissions?.specification_definition?.add==true 
                                                  )) && (
                                                <AddCircleOutlineOutlinedIcon
                                                  style={{
                                                    cursor: "pointer",
                                                  }}
                                                />
                                              )}
                                            </CategoryHeaderButton>
                                          </InputAdornment>
                                        ),
                                      }}
                                    ></InputField>
                                    <ApprovedCategoryUL
                                      style={
                                        specifications &&
                                        specifications.length > 5
                                          ? { overflowY: "scroll" }
                                          : null
                                      }
                                    >
                                      {specifications.length > 0 ? (
                                        specifications.map((element, index) => (
                                          <span key={index}>
                                            <ApprovedCategoryLI
                                              key={index}
                                              className={
                                                element?.id === specificationId
                                                  ? "selected-list-children-li"
                                                  : ""
                                              }
                                              onClick={() => {
                                                handleSpecificationClick(
                                                  element?.id
                                                );
                                              }}
                                            >
                                              {element?.name}
                                              {(role == "seller" ||
                                                (role == "subuser" &&
                                                  permissions.specification_definition.delete==true 
                                                  )) && (
                                                <DeleteTwoToneIcon
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    setDeleteConfirmation(true);
                                                    setDeleteData({
                                                      id: element?.id,
                                                      type: 0,
                                                    });
                                                  }}
                                                  style={{
                                                    float: "right",
                                                    width: "20px",
                                                    height: "20px",
                                                    color: "#D7282F",
                                                  }}
                                                />
                                              )}
                                            </ApprovedCategoryLI>
                                          </span>
                                        ))
                                      ) : (
                                        <div
                                          className={attributestyle.add_message}
                                        >
                                          <PlaylistAddOutlinedIcon
                                            className={
                                              attributestyle.no_dataicon
                                            }
                                          />
                                          <span>Please add Specifications</span>
                                        </div>
                                      )}
                                    </ApprovedCategoryUL>
                                  </SearchORCreate>
                                </CategoryGrid>
                                <Box sx={{ marginTop: "10px" }}>
                                  <SpecificationDescription>
                                    Add customized specifications to your
                                    category.
                                  </SpecificationDescription>
                                </Box>
                              </Grid>

                              <Grid item xs={12} sm={6} md={4}>
                                <DropDownGrid>
                                  <div>Add Options/Terms</div>
                                </DropDownGrid>
                                <CategoryGrid>
                                  <SearchORCreate>
                                    <InputField
                                      helperText={optionErrorText}
                                      error={optionErrorText ? true : false}
                                      className="speciication_defination"
                                      size="small"
                                      placeholder="Search or Add"
                                      value={optionValue}
                                      onChange={(e) => {
                                        handleAddOptionsInputChange(e);
                                        if (optionErrorText)
                                          setOptionErrorText("");
                                      }}
                                      onKeyDown={(e) => {
                                        if (
                                          role == "seller" ||
                                          (role == "subuser" &&
                                            permissions?.specification_definition?.add==true 
                                            )
                                        ) {
                                          if (e.key == "Enter") {
                                            handleCreateOptions();
                                          }
                                        }
                                      }}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <SearchOutlinedIcon />
                                          </InputAdornment>
                                        ),
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            {(role == "seller" ||
                                              (role == "subuser" &&
                                                permissions?.specification_definition?.add==true 
                                                )) && (
                                              <CategoryHeaderButton
                                                onClick={() => {
                                                  handleCreateOptions();
                                                }}
                                              >
                                                <AddCircleOutlineOutlinedIcon
                                                  style={{ cursor: "pointer" }}
                                                />
                                              </CategoryHeaderButton>
                                            )}
                                          </InputAdornment>
                                        ),
                                      }}
                                    ></InputField>
                                    <ApprovedCategoryUL
                                      style={
                                        options && options.length > 5
                                          ? { overflowY: "scroll" }
                                          : null
                                      }
                                    >
                                      {options.length > 0 ? (
                                        options.map((element, index) => (
                                          <span key={index}>
                                            <ApprovedCategoryLI key={index}>
                                              {element?.name}
                                              {(role == "seller" ||
                                                (role == "subuser" &&
                                                  permissions?.specification_definition?.delete==true 
                                                  )) && (
                                                <DeleteTwoToneIcon
                                                  onClick={() => {
                                                    e?.stopPropagation();
                                                    setDeleteConfirmation(true);
                                                    setDeleteData({
                                                      id: element?.id,
                                                      type: 1,
                                                    });
                                                  }}
                                                  style={{
                                                    float: "right",
                                                    width: "20px",
                                                    height: "20px",
                                                    color: "#D7282F",
                                                  }}
                                                />
                                              )}
                                            </ApprovedCategoryLI>
                                          </span>
                                        ))
                                      ) : (
                                        <div
                                          className={attributestyle.add_message}
                                        >
                                          <PlaylistAddOutlinedIcon
                                            className={
                                              attributestyle.no_dataicon
                                            }
                                          />
                                          <span>Please add Options/Terms</span>
                                        </div>
                                      )}
                                    </ApprovedCategoryUL>
                                  </SearchORCreate>
                                </CategoryGrid>
                                <Box sx={{ marginTop: "10px" }}>
                                  <SpecificationDescription>
                                    Modify your specifications by adding
                                    options/terms.
                                  </SpecificationDescription>
                                </Box>
                              </Grid>
                            </Grid>
                          </MainGrid>
                        </CardContent>
                      </Card>
                    </Header>
                  )}
                </InnerContainer>
              </OuterContainer>
            </Grid>
          </Grid>
          {/* <Grid container>
            <Grid item xs={12}>
              <OuterContainer>
                <InnerContainer>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                  >
                    <Skeleton animation="wave" variant="text" width={220} />

                  </Box>

                  <Header style={{ border: "1px solid #ccc" }}>
                    <Card>
                      <CardInn>
                        <Grid
                          container
                          spacing={2}
                          style={{ borderBottom: "1px solid #E0E3E7" }}
                        >
                          <Grid item xs={4} sm={4} md={4} lg={4}>
                            <SubGrid>

                              <Skeleton animation="wave" variant="text" width={220} />
                            </SubGrid>
                          </Grid>
                          <Grid item xs={4} sm={4} md={4} lg={4}>
                            <SubGrid>

                              <Skeleton animation="wave" variant="text" width={220} />
                            </SubGrid>
                          </Grid>
                          <Grid item xs={4} sm={4} md={4} lg={4}>
                            <SubGrid>

                              <Skeleton animation="wave" variant="text" width={200} />
                            </SubGrid>
                          </Grid>
                        </Grid>
                      </CardInn>

                      <CardContent>
                        <MainGrid>
                          <Grid
                            container
                            spacing={2}
                            style={{ border: "none" }}
                          >
                            <Grid item xs={12} sm={6} md={4}>
                              <DropDownGrid>
                                <Skeleton animation="wave" variant="text" width={220} />
                              </DropDownGrid>
                              <CategoryGrid>
                                <SearchORCreate>
                                  <Skeleton animation="wave" variant="rounded" width={480} height={40} />
                                </SearchORCreate>
                              </CategoryGrid>
                              <Box sx={{ marginTop: "10px" }}>
                                <SpecificationDescription>
                                  <Skeleton animation="wave" variant="text" width={280} />
                                </SpecificationDescription>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                              <DropDownGrid>
                                <Skeleton animation="wave" variant="text" width={220} />
                              </DropDownGrid>
                              <CategoryGrid>
                                <SearchORCreate>
                                  <Skeleton animation="wave" variant="rounded" width={480} height={40} />
                                </SearchORCreate>
                              </CategoryGrid>
                              <Box sx={{ marginTop: "10px" }}>
                                <SpecificationDescription>
                                  <Skeleton animation="wave" variant="text" width={220} />
                                </SpecificationDescription>
                              </Box>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                              <DropDownGrid>
                                <Skeleton animation="wave" variant="text" width={220} />
                              </DropDownGrid>
                              <CategoryGrid>
                                <SearchORCreate>
                                  <Skeleton animation="wave" variant="rounded" width={480} height={40} />
                                </SearchORCreate>
                              </CategoryGrid>
                              <Box sx={{ marginTop: "10px" }}>
                                <SpecificationDescription>
                                  <Skeleton animation="wave" variant="text" width={220} />
                                </SpecificationDescription>
                              </Box>
                            </Grid>
                          </Grid>
                        </MainGrid>
                      </CardContent>
                    </Card>
                  </Header>

                </InnerContainer>
              </OuterContainer>
            </Grid>
          </Grid> */}
        </div>
      )}
    </>
  );
}
