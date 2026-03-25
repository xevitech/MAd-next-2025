import {
  alpha,
  Box,
  Button,
  Skeleton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {
  MiniSiteContainer,
  NavContactButtonMobile,
  NavTab,
  NavTabs,
  NavContactButtonGreen,
} from "../styled";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiClient } from "@/components/common/common";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { UpdateContactStatus } from "@/hooks/miniSite";
import Home from "../home";
import ReviewHome from "../Reviews/ReviewHome";
import MiniProducts from "../Products";
import CertificatesHome from "../CertificatesHome";
import MiniCompanyProfile from "../CompanyProfile";
import FactoryHome from "../FactoryHome";
import RDHome from "../R&DHome";
import { ThreeDots } from "react-loader-spinner";
import CustomTabContent from "../customTabContent";
import { getUTMParameter, removeSpaces } from "@/components/Helper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { getSessionFromCookies } from "@/utils/cookieUtils";
import { crmApiClient } from "@/utils/apiClient/crmApiClient";
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    padding: "5px 0",
    margin: "16px 0px 0 -14px",
    maxHeight: "300px",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "6px",
      height: "18px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#dedede",
      borderRadius: "4px",
    },
    borderRadius: 4,
    minWidth: 180,
    maxWidth: 230,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "6px 0",
    },
    "& .MuiMenuItem-root": {
      fontSize: "13px",
      fontWeight: "500",
      whiteSpace: "normal",
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));
const tabComponents = {
  home: Home,
  products: MiniProducts,
  review: ReviewHome,
  company_profile: MiniCompanyProfile,
  certificate: CertificatesHome,
  factory_tour: FactoryHome,
  research_development: RDHome,
  CustomTabContent: CustomTabContent,
};

const HeaderNav = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  let user_id = JSON.parse(localStorage.getItem("userData"))?.id;

  const { userID, minisiteUserID } = useSelector(
    (state: any) => state.miniSite
  );
  const { userInfo, headerData } = useSelector((state: any) => state.miniSite);
  const { query } = router;

  const [value, setValue] = React.useState(0);
  const [contactupdate, setcontactupdate] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(0);
  const [minisiteMenus, setMinisiteMenus] = useState(headerData?.minisiteMenus);
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [catalogProducts, setCatalogProductsd] = useState([]);
  const [allProductsData, setAllProductsData] = useState([]);

  useEffect(() => {
    setcontactupdate(headerData?.basic_information?.check_user);
  }, [userInfo?.basic_information?.check_user]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  let storeSlug = query?.id?.[0]?.toLowerCase();

  const refreshTimestamp =
    Array.isArray(router.query.id) && router.query.id.length > 0
      ? router.query.id[router.query.id.length - 1]
      : null;

  const pages = [
    {
      title: "Home",
      url: `/mini-site/${storeSlug}/home`,
    },
    {
      title: "Products",
      url: `/mini-site/${storeSlug}/products`,
    },
    {
      title: "Review",
      url: `/mini-site/${storeSlug}/reviews`,
    },
    {
      title: "Company Profile",
      url: `/mini-site/${storeSlug}/companyprofile`,
    },
    {
      title: "Certificates",
      url: `/mini-site/${storeSlug}/certificate`,
    },
    {
      title: "Factory Tour",
      url: `/mini-site/${storeSlug}/factory`,
    },
    {
      title: "R&D Management",
      url: `/mini-site/${storeSlug}/r&d`,
    },
  ];

  const NavigateHandler = async (route, id) => {
    // const queries =
    //   query && Object.keys(query).length > 0 ? JSON.stringify(query) : null;
    // let commonPayloads;

    // if (typeof window != "undefined") {
    //   commonPayloads = {
    //     ...(queries && { queries }),
    //     page_url: window?.location?.href ?? "",
    //     operating_system: window?.navigator.platform ?? "",
    //     browser_info: window?.navigator.userAgent ?? "",
    //     session_id: getSessionFromCookies() ?? "",
    //     utm_source: getUTMParameter("utm_source"),
    //     user_id: String(user_id),
    //     clicked_position_width: 0,
    //     clicked_position_height: 0,
    //     button_identity: `ministore_${id}`,
    //     click_time: Date.now(),
    //     // relatded_id: id ? id : "",
    //     hash: "",
    //     clicks: [{ x: 0, y: 0 }],
    //   };
    // }

    // try {
    //   const response = await crmApiClient(`create-click-tracking`, "post", {
    //     body: commonPayloads,
    //   });
    // } catch (err) {
    //   console.log("Error in common payloads", err);
    // }
    // window.location.href = `${route}`;
    router.query.page = id;
    router.push(route);
  };

  const activeRoute =
    router.asPath.includes("home") ||
    router.asPath == `/mini-site/${router?.query?.id?.[0]}`
      ? 0
      : pages
          .map((e) => e.url)
          .indexOf(router.asPath.replace("#", "?").split("?")[0]);

  const SaveSupplier = async () => {
    if (!JSON.parse(localStorage.getItem("userData"))?.id) {
      toast.error("Please login to add contact");
      router.push(`/user/signin?minisite=${router?.query?.id?.[0]}`);
    }
    setLoader(true);
    let response = await apiClient("front/save_seller_contact", "post", {
      body: {
        seller_id: minisiteUserID,
        user_id: JSON.parse(localStorage.getItem("userData"))?.id,
      },
    });

    if (response.status === 200) {
      dispatch(UpdateContactStatus(true));
    } else {
      dispatch(UpdateContactStatus(false));
    }
    setLoader(false);
  };

  useEffect(() => {
    const { asPath } = router;
    const splittedPath = asPath?.split("/");
    let tabType = splittedPath?.slice(3, 4)[0] || "";
    if (tabType.includes("?")) {
      tabType = tabType.split("?")[0];
    }
    const indexOfType = headerData?.minisiteMenus.findIndex((menu) => {
      const valueToCheck = menu?.page_url
        ? menu?.page_url
        : removeSpaces(menu?.name);
      return valueToCheck === tabType;
    });

    if (indexOfType != -1) setActiveTab(indexOfType);
  }, [refreshTimestamp]);

  const fetchCatalogList = async () => {
    setLoading(true);
    try {
      const currency_id = JSON.parse(localStorage.getItem("currency")) ?? 1;
      const response = await apiClient(
        `product/minisite_catalog_list?currency=${currency_id}&shop_slug=${userInfo?.basic_information?.slug}`,
        "get",
        {}
      );
      if (response.status === 200) {
        setCatalogs(response?.data || []);
      } else {
      }
    } catch (error) {
      console.error("Error fetching catalogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogList();
  }, []);

  const renderTabContent = () => {
    const tabItem = minisiteMenus[activeTab];

    if (tabItem?.type === "") {
      return (
        <CustomTabContent
          data={minisiteMenus[activeTab]}
          activeTab={activeTab}
          setMinisiteMenus={setMinisiteMenus}
        />
      );
    }

    const tabKeys = Object.keys(tabComponents);
    const TabComponent = tabComponents[tabItem?.type];

    const component = (
      <TabComponent
        catalog={catalogProducts}
        catalogs={catalogs}
        productData={allProductsData}
      />
    );
    return TabComponent ? component : null;
  };
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const open = Boolean(anchorEl);
  const handleMouseEnter = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMouseLeave = (event: any) => {
    setAnchorEl(null);
  };

  const handleCatalogClick = (id) => {
    setCatalogProductsd((prev) => {
      const filteredProducts = catalogs?.find((el) => el?.id === id);
      return filteredProducts?.products;
    });
    const indexValue = headerData?.minisiteMenus.findIndex(
      (menu) => menu?.type === "products"
    );
    if (catalogProducts) {
      setActiveTab(indexValue);
      NavigateHandler(
        `/mini-site/${
          userInfo?.basic_information?.slug ?? ""
        }/products?catalogIds=${id}`,
        "product"
      );

      // router.push(
      //   `/mini-site/${userInfo?.basic_information?.slug ?? ""}/products?catalogIds=${id}`
      // );
    } else {
      setActiveTab(indexValue);
      NavigateHandler(
        `/mini-site/${
          userInfo?.basic_information?.slug ?? ""
        }/products?catalogIds=1`,
        "product"
      );
    }
  };
  return (
    <Box>
      <Box
        bgcolor="white"
        sx={{
          position: "sticky",
          top: "0px",
          zIndex: "999",
          boxShadow:
            " rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
        }}
      >
        <MiniSiteContainer>
          <Stack
            className="NavBar"
            flexDirection="row"
            paddingX={{ xs: 2, lg: 0 }}
            alignItems="center"
            justifyContent="space-between"
          >
            <NavTabs
              variant="scrollable"
              value={activeTab}
              onChange={handleChange}
            >
              {headerData?.minisiteMenus?.map((item, index) => (
                <NavTab
                  active={index === activeTab ? true : false}
                  onClick={(e) => {
                    localStorage.setItem("activeMinisiteTab", index);
                    setActiveTab(index);
                    if (item.type === "home") {
                      NavigateHandler(`/mini-site/${storeSlug}/home`, "home");
                    } else if (item.type === "products") {
                      NavigateHandler(
                        `/mini-site/${storeSlug}/products`,
                        "product"
                      );
                    } else if (item.type === "review") {
                      NavigateHandler(
                        `/mini-site/${storeSlug}/reviews`,
                        "review"
                      );
                    } else if (item.type === "company_profile") {
                      NavigateHandler(
                        `/mini-site/${storeSlug}/companyprofile`,
                        "company"
                      );
                    } else if (item.type === "certificate") {
                      NavigateHandler(
                        `/mini-site/${storeSlug}/certificate`,
                        "certificates"
                      );
                    } else if (item.type === "factory_tour") {
                      NavigateHandler(
                        `/mini-site/${storeSlug}/factory`,
                        "factory"
                      );
                    } else if (item.type === "research_development") {
                      NavigateHandler(
                        `/mini-site/${storeSlug}/r&d`,
                        "research"
                      );
                    } else {
                      NavigateHandler(
                        `/mini-site/${storeSlug}/${removeSpaces(item?.name)}`,
                        "research"
                      );
                    }
                  }}
                  icon={
                    item.type === "products" && catalogs.length > 0 ? (
                      <KeyboardArrowDownIcon
                        onMouseEnter={(e) => {
                          if (item.type === "products") handleMouseEnter(e);
                        }}
                      />
                    ) : null
                  }
                  iconPosition={item.type === "products" ? "end" : null}
                  key={index}
                  label={
                    <Box
                      component={"span"}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      {item.name == "Certificate"
                        ? "Certificates"
                        : item.name == "Research Development"
                        ? "R&D Management"
                        : item.name}
                    </Box>
                  }
                />
              ))}
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleMouseLeave}
              >
                <Box
                  onMouseLeave={(e) => {
                    handleMouseLeave(e);
                  }}
                >
                  {loading
                    ? catalogs?.map((catalog) => {
                        return (
                          <MenuItem key={catalog?.id} disableRipple>
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={"100%"}
                            />
                          </MenuItem>
                        );
                      })
                    : catalogs?.map((catalog) => {
                        return (
                          <MenuItem
                            key={catalog?.id}
                            disableRipple
                            onClick={() => handleCatalogClick(catalog?.id)}
                          >
                            {catalog?.name}
                          </MenuItem>
                        );
                      })}
                  <MenuItem
                    disableRipple
                    onClick={() => {
                      if (catalogProducts) {
                        setCatalogProductsd(allProductsData);
                        const indexValue = headerData?.minisiteMenus.findIndex(
                          (menu) => menu?.type === "products"
                        );
                        setActiveTab(indexValue);
                        NavigateHandler(
                          `/mini-site/${userInfo?.basic_information?.slug}/products?catalogIds=All`,
                          "product"
                        );
                      } else {
                        router.push(
                          `/mini-site/${userInfo?.basic_information?.slug}/products?true`
                        );
                      }
                    }}
                  >
                    All Catalogs
                  </MenuItem>
                </Box>
              </StyledMenu>
            </NavTabs>
            {userID != minisiteUserID && (
              <Typography
                onClick={() => {
                  SaveSupplier();
                }}
                sx={{
                  "@media screen and (max-width:1100px)": {
                    display: "none",
                  },
                }}
              >
                {user_id !== minisiteUserID &&
                userInfo?.basic_information?.check_user ? (
                  <NavContactButtonGreen
                    sx={{
                      minWidth: "128.33px",
                      "@media screen and (max-width:767px)": { width: "auto" },
                    }}
                  >
                    {loader ? (
                      <ThreeDots
                        height="10"
                        width="40"
                        radius="9"
                        color="white"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                      />
                    ) : (
                      "Remove Contact"
                    )}
                  </NavContactButtonGreen>
                ) : (
                  <NavContactButtonMobile
                    sx={{
                      minWidth: "128.33px",
                      "@media screen and (max-width:767px)": { width: "auto" },
                    }}
                    data-tracking="add-to-contact"
                  >
                    {loader ? (
                      <ThreeDots
                        height="20"
                        width="40"
                        radius="2"
                        color="white"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                      />
                    ) : (
                      <>
                        Add to Contact
                        <AddCircleOutlineOutlinedIcon color="inherit" />
                      </>
                    )}
                  </NavContactButtonMobile>
                )}
              </Typography>
            )}
          </Stack>
        </MiniSiteContainer>
      </Box>

      {renderTabContent()}
    </Box>
  );
};

export default HeaderNav;
