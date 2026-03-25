import React, { useState, useEffect } from "react";
import { Box, FormControl, Grid, styled, useMediaQuery } from "@mui/material";
import { CustomTab } from "./subComponents/CustomTab";
import { CustomTextField } from "./subComponents/CustomTextField";
import { ProductListTable } from "./subComponents/ProductListTable";
import { AdvancedSearch } from "./subComponents/AdvancedSearch";
import { CreatePostModal } from "./subComponents/ProductListModals/CreatePostModal";
import {
  OuterContainer,
  Header,
  CreatePostButton,
  InnerContainer,
  AdvanceSearchBoxContainer,
  AdvanceSearchBoxHeader,
  ProductSearchFieldsContainer,
  ProductsSearchFieldInnerContainer,
  ButtonsContainer,
  ProductListContainer,
  ProductTopBarr,
  CreatePostBox,
  MyRedButtons,
  TabNestedProductList,
} from "./styles";
import ClearIcon from "@mui/icons-material/Clear";
import _debounce from "lodash/debounce";
import { ProfileHeader } from "@/components/common/profileheader";
import { useRouter } from "next/router";
import { AccessDenied } from "@/components/common/AccessDenied";
import { apiClient } from "@/components/common/common";
import { toast } from "react-toastify";
import Auth from "@/auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import PageSkelton from "./PageSkelton";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import { setCategoryList } from "@/hooks/CategoryReducer";
import Dashboard from "pages/dashboard";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { AdvancedSearch1 } from "./subComponents/AdvancedSearch1";
import { AdvancedSearch2 } from "./subComponents/AdvancedSearch2";

////////////////////////////////// Tabs Data
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ListProduct = () => {
  const { role } = useSelector((state: any) => state.userData);
  const { asPath } = useRouter();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [place, setPlace] = useState("")
  const [loader, setLoader] = useState(true);
  const [pageLoader, setPageLoader] = useState(true);
  const [productList, setProductList] = useState<any>([]);
  const [count, setCount] = useState<any>({});
  const [pageSize, setPageSize] = useState<any>(10);
  const [search, setSearch] = useState(false);
  const [productStatus, setProductStatus] = useState()
  const [activeButton, setActiveButton] = useState<string>("all");
  const [simpleSearch, setSimpleSearch] = useState<any>({
    product_name: "",
    model_no: "",
    unique_no: "",
  });
  const [dataLen, setDataLen] = useState()
  const [searchedValue, setSearchValue] = useState<any>(null);
  const [parentCategories, setParentCategories] = useState<any>([]);
  const [current_page, setCurrentPage] = useState<any>(0);
  const NavigateHandler = (route) => router.push(route);
  const dispatch = useDispatch();
  const handleClose = () => {
    setAnchorElPopper(null);
    setOpen((previousOpen) => !previousOpen);
  };
  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  const permissions =
    storedSubSellerList && storedSubSellerList.length > 0
      ? storedSubSellerList[0]
      : null;

  const delayedQuery = React.useRef(
    _debounce((q) => getProductsList([activeButton, q]), 500)
  ).current;

  const handleSimpleSearch = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const trimmedValue = value.trim();
    if (trimmedValue === "") {
      setSearch(false);
      setSimpleSearch((prev) => ({ ...prev, [name]: "" }));
      return;
    } else {
      setSearch(true);
      setSimpleSearch((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    const sess = sessionStorage.getItem("typeMax")
    const sess1 = sessionStorage.getItem("typeMax2")
    const sess3 = sessionStorage.getItem("tab")
    const searchParameters = [
      { key: "name", value: simpleSearch.product_name },
      { key: "model_number", value: simpleSearch.model_no },
      { key: "unique_number", value: simpleSearch.unique_no },
      { key: sess3?.split('=')[0], value: sess3?.split('=')[1] },
      { key: sess1?.split('=')[0], value: sess1?.split('=')[1] }

    ];
    delayedQuery(searchParameters);
    return () =>{
      sessionStorage.removeItem("typeMax2");
      sessionStorage.removeItem("tab");
    }
  }, [simpleSearch]);

  useEffect(() => {
    // Function to clear specific session storage items on reload
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("typeMax2");
      sessionStorage.removeItem("tab");
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleCloseModal = () => {
    setShowCreatePostModal(false);
    NavigateHandler("List");
  };

  const getParentCategoriesList = async () => {
    const payload = {
      parent: 0,
      user_id: Auth?.userData()?.id,
    };
    let response: any;
    try {
      response = await apiClient(
        "categoryList",
        "post",
        {
          body: payload,
        },
        false
      );

      if (response.status == 200) {
        const data = await response?.data;
        dispatch(setCategoryList(data));
        setParentCategories(
          data.map((ele: any) => ({ value: ele.id, view: ele?.name }))
        );
      }
    } catch (error) {
      toast.error(response?.message);
    }
  };


  useEffect(() => {
    getProductsList(["all", []]);
    getParentCategoriesList();
  }, []);

  useEffect(() => {
    if (asPath.includes("?add")) {
      setShowCreatePostModal(true);
    }
  }, [asPath]);

  const getPlaceholderList = async (type: string, fix: string) => {
    setPageLoader(true);
    setLoader(true);
    const typeMap = {
      all: "",
      listed: "place_holder_type=no",
      placeholder: "place_holder_type=yes",
      approved: "type=approved",
      pending: "type=pending",
      rejected: "type=rejected",
      draft: "type=draft",
      trashed: "type=trashed",
      expired: "type=expired",
    };
    let url = `product/list?per_page=10000&current_page=1`;



    if (typeMap[type]) {
      const conditions = {
        all: "",
        listed: "place_holder_type=no",
        placeholder: "place_holder_type=yes",
      };

      // Check if typeMax matches any of the conditions
      if (typeMap[type] == conditions.all || typeMap[type] == conditions.listed || typeMap[type] == conditions.placeholder) {
        sessionStorage.setItem('tab', "");
      }
      else { sessionStorage.setItem('typeMax2', typeMap[type]); }
      setProductStatus(typeMap[type])
      let tab = sessionStorage.getItem('tab')
      if (!tab) {
        tab = '';
      }
      url += `&${typeMap[type]}${tab}`;
    }
    try {
      const response = await apiClient(url, "get");
      if (response.status === 200) {
        setCount(response);
        setCurrentPage(0);
        setProductList(response.data);
      } else {
      }
    } catch (error) {
    } finally {
      setPageLoader(false);
      setLoader(false);
    }
  };

  const [filteredDataNotFound, setFilteredDataNotFound] = useState<boolean>(false);

  const getProductsList = async (payload) => {
    setLoader(true);
    //  const threetype = sessionStorage?.tab
    //   ? JSON.parse(sessionStorage?.tab):{}
    //  const threetype = sessionStorage?.tab
    //   ? (sessionStorage?.tab):{}
    const queryParams = payload[1].reduce((acc, item) => {
      return `${acc}&${item.key}=${encodeURIComponent(item.value)}`;
    }, '');
    const baseUrl = `product/list`;
    const url = baseUrl + (queryParams ? `?${queryParams.substring(1)}&${payload[0]} ` : '');
    let response = await apiClient(
      url,
      "get",
      // { body: formData },
      true
    );;
    if (response.status == 200) {
      setCount(response);
      // setCurrentPage(0);


      setProductList(response.data);
    }
    setPageLoader(false);
    setLoader(false);
    return response;

    return () => {
      localStorage.removeItem("tab")
    }
  };



  const PopoverContainer = styled(Box)(() => ({
    position: "relative",
    "& .FilterContainer": {
      maxWidth: "600px",
      width: "600px",
      padding: "10px",
      "@media (max-width:600px)": {
        maxWidth: "100%",
        width: "100%",
      },
      "& .MuiFormControl-root": {
        "& .MuiFormLabel-root": {
          fontSize: "13px",
        },
      },
    },
  }));

  const PopperContainer = styled(Box)(() => ({
    background: "#fff",
    width: "600px",
    position: "absolute",
    right: 0,
    top: "0",
    "@media (max-width:899px)": {
      left: "-50px",
      right: "auto"
    },
    boxShadow:
      "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
    "@media (max-width: 600px)": {
      width: "82svw",
      margin: "0 auto",
    },
  }));
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    sessionStorage.removeItem("filterProduct");
  }, []);

  const [open, setOpen] = React.useState(false);
  const [anchorElPopper, setAnchorElPopper] =
    React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElPopper(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  //////////////////// Tabs functions
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setOpen(false);
  };
  return (
    <>
      {showCreatePostModal && (
        <CreatePostModal
          open={showCreatePostModal}
          closeModal={handleCloseModal}
        />
      )}

      {role == "buyer" ? (
        <div className="full_page">
          <OuterContainer>
            <InnerContainer className="AdvanceSearchBar">
              <Header>
                <ProfileHeader text={""} />
              </Header>
              <ProductListContainer>
                {/* <AccessDenied /> */}
                <Dashboard />
              </ProductListContainer>
            </InnerContainer>
          </OuterContainer>
        </div>
      ) : (
        <div className="full_page">
          <OuterContainer>
            <InnerContainer className="AdvanceSearchBar">
              <ProductTopBarr>
                <Header>
                  <ProfileHeader text={"Product List"} />
                </Header>

                {(role == "seller" ||
                  (role == "subuser" && permissions.product.add == true)) && (
                    <CreatePostBox
                      sx={{
                        "@media screen and (max-width:1200px)": {
                          display: "none !important",
                        },
                      }}
                    >
                      <CreatePostButton
                        onClick={() => {
                          setShowCreatePostModal(true);
                        }}
                      >
                        Add New Product
                      </CreatePostButton>
                    </CreatePostBox>
                  )}
              </ProductTopBarr>
              {pageLoader ? (
                <PageSkelton />
              ) : (
                <>
                  <TabNestedProductList>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        aria-label="scrollable auto tabs example"
                      >
                        <Tab
                          label="All Products"
                          {...a11yProps(0)}
                          onClick={() => {
                            setCurrentPage(1);
                            setPageSize(10);
                            getPlaceholderList("all", "");
                            setActiveButton("all");
                            sessionStorage.setItem("tab", "")
                            sessionStorage.removeItem("typeMax2")
                            sessionStorage.removeItem("filterProduct");
                            setFilteredDataNotFound(false)
                            setSearchValue(null);
                          }}
                          disableRipple
                        />
                        <Tab
                          label="Listed Products"
                          {...a11yProps(1)}
                          onClick={() => {
                            setCurrentPage(1);
                            setPageSize(10);
                            getPlaceholderList("listed", "");
                            sessionStorage.removeItem("filterProduct");
                            setSearchValue(null);
                            setFilteredDataNotFound(false)
                            // getPlaceholderList(["listed", []]);
                            sessionStorage.setItem("tab", "&place_holder_type=no")
                            sessionStorage.removeItem("typeMax2")
                            setActiveButton("listed");
                          }}
                          disableRipple
                        />
                        <Tab
                          label="Placeholders "
                          {...a11yProps(2)}
                          onClick={() => {
                            setCurrentPage(1);
                            setPageSize(10);
                            getPlaceholderList("placeholder", "");
                            sessionStorage.removeItem("filterProduct");
                            setSearchValue(null);
                            sessionStorage.setItem("tab", "&place_holder_type=yes")
                            sessionStorage.removeItem("typeMax2")
                            // getPlaceholderList(["listed", []]);
                            setActiveButton("placeholder");
                          }}
                          disableRipple
                        />
                      </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                      <Box>
                        <AdvanceSearchBoxContainer>
                          <AdvanceSearchBoxHeader>
                            {" "}
                            {/* <CustomTab
                              active={activeButton === "all" ? true : false}
                              icon={"icon-all"}
                              backgroundColor="#44D600"
                              border="1px solid #44D600"
                              text="All"
                              value={count?.all_count ?? 0}
                              borderShadowColor="68, 214, 0, 0.35"
                              onClick={() => {
                                setCurrentPage(1);
                                setPageSize(10);
                                getProductsList(["all", []]);
                                setActiveButton("all");
                              }}
                            />{" "} */}
                            <CustomTab
                              active={
                                activeButton === "approved" ? true : false
                              }
                              icon={"icon-publlished-1"}
                              backgroundColor="#FF1A43"
                              borderShadowColor="255, 26, 67, 0.35"
                              border="1px solid #FF1A43"
                              text="Published"
                              value={count?.approved_count ?? 0}
                              onClick={() => {
                                setCurrentPage(1);
                                setPageSize(10);
                                getPlaceholderList("approved", "");
                                sessionStorage.removeItem(
                                  "filterProduct"
                                );
                                setSearchValue(null);
                                setFilteredDataNotFound(false)
                                // getProductsList(["approved", []]);
                                setActiveButton("approved");
                              }}
                            />{" "}
                            <CustomTab
                              active={activeButton === "pending" ? true : false}
                              icon={"icon-pending"}
                              backgroundColor="#1A75FF"
                              border="1px solid #1A75FF"
                              borderShadowColor="25, 117, 255, 0.35"
                              text="Pending"
                              value={count?.pending_count ?? 0}
                              onClick={() => {
                                setCurrentPage(1);
                                setPageSize(10);
                                sessionStorage.removeItem(
                                  "filterProduct"
                                );
                                setSearchValue(null);
                                setFilteredDataNotFound(false);
                                // getProductsList(["pending", []]);
                                getPlaceholderList("pending", "");
                                setActiveButton("pending");
                              }}
                            />{" "}
                            <CustomTab
                              active={activeButton === "draft" ? true : false}
                              icon={"icon-draft"}
                              backgroundColor="#FFA31A"
                              border="1px solid #FFA31A"
                              borderShadowColor="255, 163, 25, 0.35"
                              text="Draft"
                              value={count?.draft_count}
                              onClick={() => {
                                setCurrentPage(1);
                                setPageSize(10);
                                sessionStorage.removeItem(
                                  "filterProduct"
                                );
                                setSearchValue(null);
                                setFilteredDataNotFound(false);
                                getPlaceholderList("draft", "");
                                // getProductsList(["draft", []]);
                                setActiveButton("draft");
                              }}
                            />{" "}
                            <CustomTab
                              active={activeButton === "expired" ? true : false}
                              icon={"icon-expire-svgrepo-com-1"}
                              backgroundColor="#AD5504"
                              border="1px solid #AD5504"
                              borderShadowColor="173, 85, 4, 0.35"
                              text="Expired"
                              value={count?.expired_count ?? 0}
                              onClick={() => {
                                setCurrentPage(1);
                                setPageSize(10);
                                sessionStorage.removeItem(
                                  "filterProduct"
                                );
                                setSearchValue(null);
                                setFilteredDataNotFound(false);
                                getPlaceholderList("expired", "");
                                // getProductsList(["expired", []]);
                                setActiveButton("expired");
                              }}
                            />{" "}
                            <CustomTab
                              active={
                                activeButton === "rejected" ? true : false
                              }
                              icon={"icon-rejected_icon"}
                              backgroundColor="#AD5504"
                              border="1px solid #00A0B6"
                              borderShadowColor="0, 160, 182, 0.35"
                              text="Rejected"
                              value={count?.rejected_count ?? 0}
                              index={true}
                              onClick={() => {
                                setCurrentPage(1);
                                setPageSize(10);
                                sessionStorage.removeItem(
                                  "filterProduct"
                                );
                                setSearchValue(null);
                                setFilteredDataNotFound(false);
                                // getProductsList(["rejected", []]);
                                getPlaceholderList("rejected", "");
                                setActiveButton("rejected");
                              }}
                            />{" "}
                            <CustomTab
                              active={activeButton === "trashed" ? true : false}
                              icon={"icon-delete-file"}
                              backgroundColor="#AD5504"
                              border="1px solid #00A0B6"
                              borderShadowColor="0, 160, 182, 0.35"
                              text="Trash"
                              value={count?.trashed_count ?? 0}
                              index={true}
                              onClick={() => {
                                setCurrentPage(1);
                                setPageSize(10);
                                sessionStorage.removeItem(
                                  "filterProduct"
                                );
                                setSearchValue(null);
                                setFilteredDataNotFound(false);
                                // getProductsList(["trashed", []]);
                                getPlaceholderList("trashed", "");
                                setActiveButton("trashed");
                              }}
                            />{" "}
                          </AdvanceSearchBoxHeader>

                          <ProductSearchFieldsContainer
                            showBorder={showAdvancedSearch}
                          >
                            <ProductsSearchFieldInnerContainer>
                              {/* the three coloumn filter */}
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={4}>
                                  <FormControl
                                    sx={{ width: "100%", color: "red" }}
                                  >
                                    <CustomTextField
                                      handleChange={(e) =>
                                        handleSimpleSearch(e)
                                      }
                                      name={"product_name"}
                                      label={"Product Name"}
                                      value={simpleSearch?.product_name}
                                      size="small"
                                    ></CustomTextField>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                  <FormControl sx={{ width: "100%" }}>
                                    <CustomTextField
                                      handleChange={handleSimpleSearch}
                                      name={"model_no"}
                                      label={"Model No."}
                                      value={simpleSearch?.model_no}
                                      size="small"
                                    ></CustomTextField>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                  <FormControl sx={{ width: "100%" }}>
                                    <CustomTextField
                                      handleChange={handleSimpleSearch}
                                      name={"unique_no"}
                                      label={"Product ID"}
                                      value={simpleSearch?.unique_no}
                                      size="small"
                                    ></CustomTextField>
                                  </FormControl>
                                </Grid>
                              </Grid>

                              <ButtonsContainer>
                                <MyRedButtons
                                  onClick={(e: any) => {
                                    setAnchorElPopper(e.currentTarget);
                                    setOpen((previousOpen) => !previousOpen);
                                  }}
                                  size="small"
                                  variant="outlined"
                                  startIcon={<FilterAltOutlinedIcon />}
                                >
                                  Filters
                                </MyRedButtons>
                                {searchedValue && (
                                  <MyRedButtons
                                    onClick={(e: any) => {
                                      sessionStorage.removeItem(
                                        "filterProduct"
                                      ); handleClose();
                                      setSearchValue(null);
                                      setFilteredDataNotFound(false);
                                      getProductsList(["all", []]);
                                      setFilteredDataNotFound(false)
                                    }}
                                    size="small"
                                    variant="outlined"
                                    startIcon={<ClearIcon />}
                                  >
                                    Clear
                                  </MyRedButtons>
                                )}
                              </ButtonsContainer>
                              <PopoverContainer>
                                <Popper
                                  id={id}
                                  open={open}
                                  anchorEl={anchorElPopper}
                                  transition
                                  sx={{ zIndex: 1 }}
                                  placement="bottom-end"
                                >
                                  {({ TransitionProps }) => (
                                    <Fade {...TransitionProps} timeout={350}>
                                      <PopperContainer>
                                        <AdvancedSearch
                                          setFilteredDataNotFound={setFilteredDataNotFound}
                                          parentCategories={parentCategories}
                                          handleClose={handleClose}
                                          getProductsList={getProductsList}
                                          setSearchValue={setSearchValue}
                                        // placehold={getPlaceholderList}
                                        />
                                      </PopperContainer>
                                    </Fade>
                                  )}
                                </Popper>
                              </PopoverContainer>
                            </ProductsSearchFieldInnerContainer>
                          </ProductSearchFieldsContainer>
                        </AdvanceSearchBoxContainer>
                        <ProductListContainer>
                          <ProductListTable
                            filteredDataNotFound={filteredDataNotFound}
                            current_page={current_page}
                            setCurrentPage={setCurrentPage}
                            count={count}
                            products={productList}
                            simpleSearch={simpleSearch}
                            delayedQuery={delayedQuery}
                            loader={loader}
                            setLoader={setLoader}
                            search={search}
                            setSearch={setSearch}
                            getProductsLists={getProductsList}
                            openModal={setShowCreatePostModal}
                            setProductList={setProductList}
                            setCount={setCount}
                            activeButton={activeButton}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                            setActiveButton={setActiveButton}
                          />
                        </ProductListContainer>
                      </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                      <Box>
                        <AdvanceSearchBoxContainer>
                          <AdvanceSearchBoxHeader>
                            {" "}
                            {/* <CustomTab
                              active={activeButton === "all" ? true : false}
                              icon={"icon-all"}
                              backgroundColor="#44D600"
                              border="1px solid #44D600"
                              text="All"
                              value={count?.all_count ?? 0}
                              borderShadowColor="68, 214, 0, 0.35"
                              onClick={() => {
                                setCurrentPage(1);
                                setPageSize(10);
                                getProductsList(["all", []]);
                                setActiveButton("all");
                              }}
                            />{" "} */}
                            <CustomTab
                              active={
                                activeButton === "approved" ? true : false
                              }
                              // icon={"icon-approved"}
                              icon={"icon-publlished-1"}
                              backgroundColor="#FF1A43"
                              borderShadowColor="255, 26, 67, 0.35"
                              border="1px solid #FF1A43"
                              text="Published"
                              value={count?.approved_count ?? 0}
                              onClick={() => {
                                setCurrentPage(1);
                                setPageSize(10);
                                getPlaceholderList("approved", " place_holder_type: no");
                                sessionStorage.removeItem(
                                  "filterProduct"
                                );
                                setSearchValue(null);
                                setFilteredDataNotFound(false);
                                // getProductsList(["approved", []]);
                                setActiveButton("approved");
                              }}
                            />{" "}
                            <CustomTab
                              active={activeButton === "pending" ? true : false}
                              icon={"icon-pending"}
                              backgroundColor="#1A75FF"
                              border="1px solid #1A75FF"
                              borderShadowColor="25, 117, 255, 0.35"
                              text="Pending"
                              value={count?.pending_count ?? 0}
                              onClick={() => {
                                setCurrentPage(1);
                                setPageSize(10);
                                sessionStorage.removeItem(
                                  "filterProduct"
                                );
                                setSearchValue(null);
                                setFilteredDataNotFound(false);
                                // getProductsList(["pending", []]);
                                getPlaceholderList("pending", "place_holder_type=no");
                                setActiveButton("pending");
                              }}
                            />{" "}
                            <CustomTab
                              active={activeButton === "draft" ? true : false}
                              icon={"icon-draft"}
                              backgroundColor="#FFA31A"
                              border="1px solid #FFA31A"
                              borderShadowColor="255, 163, 25, 0.35"
                              text="Draft"
                              value={count?.draft_count}
                              onClick={() => {
                                setCurrentPage(1);
                                setPageSize(10);
                                sessionStorage.removeItem(
                                  "filterProduct"
                                );
                                setSearchValue(null);
                                setFilteredDataNotFound(false);
                                getPlaceholderList("draft", "place_holder_type=no");

                                setActiveButton("draft");
                              }}
                            />{" "}
                            <CustomTab
                              active={activeButton === "expired" ? true : false}
                              icon={"icon-expire-svgrepo-com-1"}
                              backgroundColor="#AD5504"
                              border="1px solid #AD5504"
                              borderShadowColor="173, 85, 4, 0.35"
                              text="Expired"
                              value={count?.expired_count ?? 0}
                              onClick={() => {
                                setCurrentPage(1);
                                setPageSize(10);
                                sessionStorage.removeItem(
                                  "filterProduct"
                                );
                                setSearchValue(null);
                                setFilteredDataNotFound(false);
                                // getProductsList(["expired", []]);
                                getPlaceholderList("expired", "place_holder_type=no");

                                setActiveButton("expired");
                              }}
                            />{" "}
                            <CustomTab
                              active={
                                activeButton === "rejected" ? true : false
                              }
                              icon={"icon-rejected_icon"}
                              backgroundColor="#AD5504"
                              border="1px solid #00A0B6"
                              borderShadowColor="0, 160, 182, 0.35"
                              text="Rejected"
                              value={count?.rejected_count ?? 0}
                              index={true}
                              onClick={() => {
                                setCurrentPage(1);
                                setPageSize(10);
                                sessionStorage.removeItem(
                                  "filterProduct"
                                );
                                setSearchValue(null);
                                setFilteredDataNotFound(false);
                                // getProductsList(["rejected", []]);
                                getPlaceholderList("rejected", " place_holder_type: no");

                                setActiveButton("rejected");
                              }}
                            />{" "}
                            <CustomTab
                              active={activeButton === "trashed" ? true : false}
                              icon={"icon-delete-file"}
                              backgroundColor="#AD5504"
                              border="1px solid #00A0B6"
                              borderShadowColor="0, 160, 182, 0.35"
                              text="Trash"
                              value={count?.trashed_count ?? 0}
                              index={true}
                              onClick={() => {
                                setCurrentPage(1);
                                setPageSize(10);
                                sessionStorage.removeItem(
                                  "filterProduct"
                                );
                                setSearchValue(null);
                                setFilteredDataNotFound(false);
                                // getProductsList(["trashed", []]);
                                getPlaceholderList("trashed", " place_holder_type: no");

                                setActiveButton("trashed");
                              }}
                            />{" "}
                          </AdvanceSearchBoxHeader>

                          <ProductSearchFieldsContainer
                            showBorder={showAdvancedSearch}
                          >
                            <ProductsSearchFieldInnerContainer>
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={4}>
                                  <FormControl
                                    sx={{ width: "100%", color: "red" }}
                                  >
                                    <CustomTextField
                                      handleChange={(e) =>
                                        handleSimpleSearch(e)
                                      }
                                      name={"product_name"}
                                      label={"Product Name"}
                                      value={simpleSearch?.product_name}
                                      size="small"
                                    ></CustomTextField>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                  <FormControl sx={{ width: "100%" }}>
                                    <CustomTextField
                                      handleChange={handleSimpleSearch}
                                      name={"model_no"}
                                      label={"Model No."}
                                      value={simpleSearch?.model_no}
                                      size="small"
                                    ></CustomTextField>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                  <FormControl sx={{ width: "100%" }}>
                                    <CustomTextField
                                      handleChange={handleSimpleSearch}
                                      name={"unique_no"}
                                      label={"Product ID"}
                                      value={simpleSearch?.unique_no}
                                      size="small"
                                    ></CustomTextField>
                                  </FormControl>
                                </Grid>
                              </Grid>

                              <ButtonsContainer>
                                <MyRedButtons
                                  onClick={(e: any) => {
                                    setAnchorElPopper(e.currentTarget);
                                    setOpen((previousOpen) => !previousOpen);
                                  }}
                                  size="small"
                                  variant="outlined"
                                  startIcon={<FilterAltOutlinedIcon />}
                                >
                                  Filters
                                </MyRedButtons>
                                {searchedValue && (
                                  <MyRedButtons
                                    onClick={(e: any) => {
                                      sessionStorage.removeItem(
                                        "filterProduct"
                                      );
                                      setSearchValue(null);
                                      setFilteredDataNotFound(false);
                                      getProductsList(["all", []]);
                                    }}
                                    size="small"
                                    variant="outlined"
                                    startIcon={<ClearIcon />}
                                  >
                                    Clear
                                  </MyRedButtons>
                                )}
                              </ButtonsContainer>
                              <PopoverContainer>
                                <Popper
                                  id={id}
                                  open={open}
                                  anchorEl={anchorElPopper}
                                  transition
                                  sx={{ zIndex: 1 }}
                                  placement="bottom-end"
                                >
                                  {({ TransitionProps }) => (
                                    <Fade {...TransitionProps} timeout={350}>
                                      <PopperContainer>
                                        <AdvancedSearch1
                                          parentCategories={parentCategories}
                                          handleClose={handleClose}
                                          getProductsList={getProductsList}
                                          // getProductsList={getProductsList}
                                          valuee={value}
                                          productStatus={productStatus}
                                          setSearchValue={setSearchValue}
                                        />
                                      </PopperContainer>
                                    </Fade>
                                  )}
                                </Popper>
                              </PopoverContainer>
                            </ProductsSearchFieldInnerContainer>
                          </ProductSearchFieldsContainer>
                        </AdvanceSearchBoxContainer>
                        <ProductListContainer>
                          <ProductListTable
                            filteredDataNotFound={filteredDataNotFound}
                            current_page={current_page}
                            setCurrentPage={setCurrentPage}
                            count={count}
                            products={productList}
                            simpleSearch={simpleSearch}
                            delayedQuery={delayedQuery}
                            loader={loader}
                            setLoader={setLoader}
                            search={search}
                            setSearch={setSearch}
                            getProductsLists={getProductsList}
                            openModal={setShowCreatePostModal}
                            setProductList={setProductList}
                            setCount={setCount}
                            activeButton={activeButton}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                            setActiveButton={setActiveButton}
                          />
                        </ProductListContainer>
                      </Box>
                    </CustomTabPanel>
                    {/* tab two */}
                    <CustomTabPanel value={value} index={2}>
                      <Box>
                        <AdvanceSearchBoxContainer>
                          <AdvanceSearchBoxHeader>
                            {" "}
                            {/* <CustomTab
                              active={activeButton === "all" ? true : false}
                              icon={"icon-all"}
                              backgroundColor="#44D600"
                              border="1px solid #44D600"
                              text="All"
                              value={count?.all_count ?? 0}
                              borderShadowColor="68, 214, 0, 0.35"
                              onClick={() => {
                                setCurrentPage(1);
                                setPageSize(10);
                                getProductsList(["all", []]);
                                setActiveButton("all");
                              }}
                            />{" "} */}
                            <CustomTab
                              active={
                                activeButton === "approved" ? true : false
                              }
                              // icon={"icon-approved"}
                              icon={"icon-publlished-1"}
                              backgroundColor="#FF1A43"
                              borderShadowColor="255, 26, 67, 0.35"
                              border="1px solid #FF1A43"
                              text="Published"
                              value={count?.approved_count ?? 0}
                              onClick={() => {
                                setCurrentPage(1);
                                setPageSize(10);
                                // getPlaceholderList("approved");
                                getPlaceholderList("approved", "place_holder_type=yes");
                                sessionStorage.removeItem(
                                  "filterProduct"
                                );
                                setSearchValue(null);
                                setFilteredDataNotFound(false);
                                // getProductsList(["approved", []]);
                                setActiveButton("approved");
                              }}
                            />{" "}
                            <CustomTab
                              active={activeButton === "pending" ? true : false}
                              icon={"icon-pending"}
                              backgroundColor="#1A75FF"
                              border="1px solid #1A75FF"
                              borderShadowColor="25, 117, 255, 0.35"
                              text="Pending"
                              value={count?.pending_count ?? 0}
                              onClick={() => {
                                setCurrentPage(1);
                                setPageSize(10);
                                sessionStorage.removeItem(
                                  "filterProduct"
                                );
                                setSearchValue(null);
                                setFilteredDataNotFound(false);
                                // getProductsList(["pending", []]);
                                // getPlaceholderList("pending");
                                getPlaceholderList("pending", "place_holder_type=yes");


                                setActiveButton("pending");
                              }}
                            />{" "}
                            <CustomTab
                              active={activeButton === "draft" ? true : false}
                              icon={"icon-draft"}
                              backgroundColor="#FFA31A"
                              border="1px solid #FFA31A"
                              borderShadowColor="255, 163, 25, 0.35"
                              text="Draft"
                              value={count?.draft_count}
                              onClick={() => {
                                setCurrentPage(1);
                                setPageSize(10);
                                sessionStorage.removeItem(
                                  "filterProduct"
                                );
                                setSearchValue(null);
                                setFilteredDataNotFound(false);
                                // getProductsList(["draft", []]);
                                getPlaceholderList("draft", "place_holder_type=yes");

                                setActiveButton("draft");
                              }}
                            />{" "}
                            <CustomTab
                              active={activeButton === "expired" ? true : false}
                              icon={"icon-expire-svgrepo-com-1"}
                              backgroundColor="#AD5504"
                              border="1px solid #AD5504"
                              borderShadowColor="173, 85, 4, 0.35"
                              text="Expired"
                              value={count?.expired_count ?? 0}
                              onClick={() => {
                                setCurrentPage(1);
                                setPageSize(10);
                                sessionStorage.removeItem(
                                  "filterProduct"
                                );
                                setSearchValue(null);
                                setFilteredDataNotFound(false);
                                // getProductsList(["expired", []]);
                                getPlaceholderList("expired", "place_holder_type=yes");

                                setActiveButton("expired");
                              }}
                            />{" "}
                            <CustomTab
                              active={
                                activeButton === "rejected" ? true : false
                              }
                              icon={"icon-rejected_icon"}
                              backgroundColor="#AD5504"
                              border="1px solid #00A0B6"
                              borderShadowColor="0, 160, 182, 0.35"
                              text="Rejected"
                              value={count?.rejected_count ?? 0}
                              index={true}
                              onClick={() => {
                                setCurrentPage(1);
                                setPageSize(10);
                                sessionStorage.removeItem(
                                  "filterProduct"
                                );
                                setSearchValue(null);
                                setFilteredDataNotFound(false);
                                // getProductsList(["rejected", []]);
                                getPlaceholderList("rejected", "place_holder_type=yes");

                                setActiveButton("rejected");
                              }}
                            />{" "}
                            <CustomTab
                              active={activeButton === "trashed" ? true : false}
                              icon={"icon-delete-file"}
                              backgroundColor="#AD5504"
                              border="1px solid #00A0B6"
                              borderShadowColor="0, 160, 182, 0.35"
                              text="Trash"
                              value={count?.trashed_count ?? 0}
                              index={true}
                              onClick={() => {
                                setCurrentPage(1);
                                setPageSize(10);
                                sessionStorage.removeItem(
                                  "filterProduct"
                                );
                                setSearchValue(null);
                                setFilteredDataNotFound(false);
                                // getProductsList(["trashed", []]);
                                getPlaceholderList("trashed", "place_holder_type=yes");

                                setActiveButton("trashed");
                              }}
                            />{" "}
                          </AdvanceSearchBoxHeader>

                          <ProductSearchFieldsContainer
                            showBorder={showAdvancedSearch}
                          >
                            <ProductsSearchFieldInnerContainer>
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={4}>
                                  <FormControl
                                    sx={{ width: "100%", color: "red" }}
                                  >
                                    <CustomTextField
                                      handleChange={(e) =>
                                        handleSimpleSearch(e)
                                      }
                                      name={"product_name"}
                                      label={"Product Name"}
                                      value={simpleSearch?.product_name}
                                      size="small"
                                    ></CustomTextField>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                  <FormControl sx={{ width: "100%" }}>
                                    <CustomTextField
                                      handleChange={handleSimpleSearch}
                                      name={"model_no"}
                                      label={"Model No."}
                                      value={simpleSearch?.model_no}
                                      size="small"
                                    ></CustomTextField>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                  <FormControl sx={{ width: "100%" }}>
                                    <CustomTextField
                                      handleChange={handleSimpleSearch}
                                      name={"unique_no"}
                                      label={"Product ID"}
                                      value={simpleSearch?.unique_no}
                                      size="small"
                                    ></CustomTextField>
                                  </FormControl>
                                </Grid>
                              </Grid>

                              <ButtonsContainer>
                                <MyRedButtons
                                  onClick={(e: any) => {
                                    setAnchorElPopper(e.currentTarget);
                                    setOpen((previousOpen) => !previousOpen);
                                  }}
                                  size="small"
                                  variant="outlined"
                                  startIcon={<FilterAltOutlinedIcon />}
                                >
                                  Filters
                                </MyRedButtons>
                                {searchedValue && (
                                  <MyRedButtons
                                    onClick={(e: any) => {
                                      sessionStorage.removeItem(
                                        "filterProduct"
                                      );
                                      setSearchValue(null);
                                      setFilteredDataNotFound(false);
                                      getProductsList(["all", []]);
                                    }}
                                    size="small"
                                    variant="outlined"
                                    startIcon={<ClearIcon />}
                                  >
                                    Clear
                                  </MyRedButtons>
                                )}
                              </ButtonsContainer>
                              <PopoverContainer>
                                <Popper
                                  id={id}
                                  open={open}
                                  anchorEl={anchorElPopper}
                                  transition
                                  sx={{ zIndex: 1 }}
                                  placement="bottom-end"
                                >
                                  {({ TransitionProps }) => (
                                    <Fade {...TransitionProps} timeout={350}>
                                      <PopperContainer>
                                        <AdvancedSearch2
                                          parentCategories={parentCategories}
                                          handleClose={handleClose}
                                          getProductsList={getProductsList}
                                          setSearchValue={setSearchValue}
                                          productStatus={productStatus}

                                        />
                                      </PopperContainer>
                                    </Fade>
                                  )}
                                </Popper>
                              </PopoverContainer>
                            </ProductsSearchFieldInnerContainer>
                          </ProductSearchFieldsContainer>
                        </AdvanceSearchBoxContainer>
                        <ProductListContainer>
                          <ProductListTable
                            filteredDataNotFound={filteredDataNotFound}
                            current_page={current_page}
                            setCurrentPage={setCurrentPage}
                            count={count}
                            products={productList}
                            simpleSearch={simpleSearch}
                            delayedQuery={delayedQuery}
                            loader={loader}
                            setLoader={setLoader}
                            search={search}
                            setSearch={setSearch}
                            getProductsLists={getProductsList}
                            openModal={setShowCreatePostModal}
                            setProductList={setProductList}
                            setCount={setCount}
                            activeButton={activeButton}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                            setActiveButton={setActiveButton}
                          />
                        </ProductListContainer>
                      </Box>
                    </CustomTabPanel>
                  </TabNestedProductList>
                </>
              )}
            </InnerContainer>
          </OuterContainer>
        </div>
      )}
    </>
  );
};

export default ListProduct;
