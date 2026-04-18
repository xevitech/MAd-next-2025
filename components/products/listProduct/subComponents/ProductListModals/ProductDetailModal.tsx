import {
  Avatar,
  AvatarGroup,
  Breadcrumbs,
  Button,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import {
  Biogas,
  Biogasflex,
  Shadowcontainer,
  AdvertisementContainer,
  AdvertisementText,
  Closebtn,
  Contentflex,
  GridRedcontent2,
  Gridcontent,
  Gridcontentblack,
  Heading,
  Mediaquery,
  Newsection,
  NewsectionText,
  Productid,
  Secondsection,
  SecondsectionHeading,
  SecondsectionTextonRight,
  SecondsectionTextonRightDate,
  Soundproof,
  Text,
  Text2,
  Textlink,
  Thirdsection,
  Thirdsection2,
  UpdateAndCreated,
  UpdateAndCreatedPadding,
  useStyles,
  Boxforgrid,
  TopGrid,
  Productbutn,
  ProuctTypeLine,
  CommercialSectionInfoInner,
  CommercialHeading,
  CWhiteBox,
  CommercialdesP,
  CommercialCheckValue,
  DevideInfoArea,
  CommercialInfoLft,
  SmallHeadingInn,
  PriceTermText,
  BoldCommonTypography,
  ShowHideView,
  IconWithText,
  HideShowtextImage,
  ShowHideViewText,
  FlyoutDescription,
  BadgeImage,
  ConfigSDatagrid,
  ConfigureMetrixTable,
  ConfigureMetrixTableInn,
  ProductBreadcrumbsStyle,
  IdProductColB,
  SKUNumberData,
  ConfigImgBox,
} from "./styles";
import Tabs from "@mui/material/Tabs";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tab from "@mui/material/Tab";
import { Grid } from "@mui/material";
import {
  CurrencySymbol,
  ReplaceSpaces,
  apiClient,
} from "@/components/common/common";
import Image from "next/image";
import moment from "moment";
import { capitalizeFirstLetter } from "@/utils/commonFunctions/other";
import Marquee from "react-fast-marquee";
import DetailSkeleton from "./ProductDetailSkeleton";
import {
  DataGridPro,
  GridToolbarContainer,
  GridColDef,
  GridFooterContainer,
  GridPagination,
} from "@mui/x-data-grid-pro";
import { DataGridStyle } from "@/components/common/commonStyle";
import { BreadcrumbsStyle } from "@/components/ProductDetail/style";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import {
  AboutDescription,
  CompanyProfileAAbout,
} from "@/components/profile/companyProfile/styles";
import { postValidityOptions } from "@/utils/AddProductPageSelectDropdownsData";
import EmptyPage from "@/components/common/EmptyPage";
import { ToastContainer, toast } from "react-toastify";
import ConfigureModal from "./ConfigureModal";
import { countriesList } from "@/utils/countriesphp";
import { countries } from "@/utils/countries";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { CustomPriceQuoteCol } from "@/components/ProductDetail/ProductComponents/Modal/style";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, LOCAL_PUBLIC_URL } from "@/utils/staticValues";
import { styled } from "@mui/system";
import {
  getSpecificationsList,
  listMatrix,
  setMatrixListPage,
  setMatrixTableLoader,
} from "@/hooks/CalculatorReducer";
import { HeaderCellText } from "../../styles";
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <Box sx={{ p: 1 }}>
        <Typography
          sx={{
            fontWeight: "600 !important",
            fontSize: "18px",
            color: "#231F20",
          }}
        >
          Visited Supplier
        </Typography>
      </Box>
    </GridToolbarContainer>
  );
}

export const PlaceHolderTag = styled("span")({
  background: 'url("/assets/ribon.svg") no-repeat center',
  color: "#ffffff",
  borderRadius: "6px",
  zIndex: 10,
  fontSize: "11px",
  width: "100px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  backgroundSize: "100%",
  position: "absolute",
  top: "-2px",
  // right: "0",
  right: "-32px",
  "& .MuiTypography-body1": {
    margin: "2px 0 0 20px",
    fontWeight: 600,
    textTransform: "capitalize",
    position: "relative",
    top: "-3px",
    fontSize: "12px",
    color: "#fff",
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const hideOptions = [
  {
    name: "<strong>Sign in to show price </strong> or contact us for pricing information.",
    value: 1,
  },
  {
    name: "<strong>Price Flexible: </strong> The price of this product is flexible and may vary depending on quantity and other factors. Please sign in to see price.",
    value: 2,
  },
  {
    name: "<strong>Price Negotiable Upon Request,</strong> Please contact us for pricing information. The price of this product may vary depending on quantity and other factors.",
    value: 3,
  },
  {
    name: "<strong>Price Subject to Negotiation </strong> The price of this product is negotiable upon request. Please contact us for more information.",
    value: 4,
  },
  {
    name: "<strong>Price Subject to Final Agreement:</strong> The price of this product is flexible and may vary depending on quantity and other factors. Please contact us to discuss pricing.",
    value: 5,
  },
];

function TabPanel(props: TabPanelProps) {
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
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export default function ProductDetailModal({
  productid,
  setModal,
  products,
}: any) {
  const [value, setValue] = React.useState(0);
  const [visitors, setVisitor] = React.useState([]);
  const [bigPostList, setBigPostList] = React.useState([]);
  const [productDetail, setproductDetail] = useState<any>();
  const [showSkleton, setSkelton] = useState(false);
  const [advertisement, setAdvertise] = useState<any>([]);
  const [productsIndex, setProductIndex] = useState<any>(-1);
  const [viewMore, setViewMore] = useState<boolean>(false);
  // const { unitList } = useSelector((state: any) => state.quoteDetails);
  const { modifiedCountriesList, territoryData } = useSelector(
    (state: any) => state?.editProduct
  );
  const dispatch = useDispatch();
  const {
    matrixItems,
    matrixListPage,
    totalVariation,
    matrixTableLoader,
    specificationsList,
  } = useSelector((state: any) => state.calculatorData);

  useEffect(() => {
    dispatch(listMatrix({ productId: productid }));
  }, [productid]);

  const [unitList, setUnitList] = useState<any>([]);
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    getVisitorsList(productid);
  }, []);

  const fetchProductDetail = async (Id: any) => {
    let user_id = localStorage?.userData
      ? JSON?.parse(localStorage?.userData)?.id
      : "";
    let response = await apiClient("front/single/view", "post", {
      body: { id: Id, user_id },
    });

    if (response.status === 200) {
      setproductDetail(response.data);
      setAdvertise(response.data.news);
      setSkelton(false);
    }
  };

  const getUnits = async () => {
    const response = await fetch(`${BASE_URL}/unit`);
    const data = await response.json();
    setUnitList(data.data);
  };

  useEffect(() => {
    if (productid) {
      fetchProductDetail(productid);
    }
    getUnits();
  }, []);

  const getVisitorsList = async (payload: any) => {
    const formData = new FormData();
    formData?.append("product_id", payload);
    let response = await apiClient(
      `product/product_list`,
      "post",
      { body: formData },
      true
    );
    response?.data?.forEach((item, index) => {
      item.serialNo = index + 1;
    });
    setVisitor(response.data);
    return response?.data;
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { classes } = useStyles();

  const rows = bigPostList;
  const columns = [
    {
      field: "serialNo",
      headerName: "Sr. No.",
      width: 100,
      text: "center",
      renderHeader: (params: any) => {
        return <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>;
      },
      renderCell: (cellValues: any) => {
        return (
          <>
            <Box>{cellValues?.row?.serialNo}</Box>
          </>
        );
      },
    },
    {
      field: "name",
      headerName: "User Name",
      width: 150,
      flex: 1,
      renderHeader: (params) => {
        return <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>;
      },

      renderCell: (cellValues) => {
        return (
          <>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Image
                src={
                  cellValues?.row?.profile_image == null
                    ? `${LOCAL_PUBLIC_URL}/assets/img/avatar-place.png`
                    : cellValues?.row?.profile_image
                }
                height={34}
                width={34}
                style={{ borderRadius: "50%", marginRight: 10 }}
                alt=""
              />
              {cellValues?.row?.userName == null
                ? "Guest User"
                : cellValues?.row?.userName}
            </div>
          </>
        );
      },
    },
    {
      field: "company_name",
      headerName: "Company Info",
      width: 150,
      flex: 1,
      renderHeader: (params: any) => {
        return <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>;
      },
      renderCell: (cellValues: any) => {
        return (
          <>
            {cellValues?.row?.company_name == null || ""
              ? "No record"
              : cellValues?.row?.company_name}
          </>
        );
      },
    },
    {
      field: "user_count",
      headerName: "Total Visits",
      width: 150,
      flex: 1,
      renderHeader: (params: any) => {
        return <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>;
      },
      renderCell: (cellValues: any) => {
        return <>{cellValues?.row?.total_view_count}</>;
      },
    },
  ];

  const fetchBigPostList = async () => {
    let response = await apiClient("product/bigger/list", "get");
    if (response.status === 200) {
      const { data } = response;
      setBigPostList(data);
    }
  };

  useEffect(() => {
    fetchBigPostList();
    const productIndex = products.findIndex(
      (item: any) => item.id === productid
    );
    setProductIndex(productIndex);
  }, []);

  const AddingColor = () => {
    if (advertisement.length > 0) {
      let advertise = [...advertisement];
      for (let i: any = 0; i < advertise.length; i++) {
        if (i === 0) {
          advertise[i] = {
            background: "#ECFBE6",
            color: "#3BB900",
            value: advertise[i],
          };
        } else if (i === 1) {
          advertise[i] = {
            color: "#D7282F",
            background: "#FFE8EC",
            value: advertise[i],
          };
        } else if (i === 2) {
          advertise[i] = {
            color: "#FFA31A",
            background: "#FFF6E8",
            value: advertise[i],
          };
        } else if (advertise[i - 1]?.color === "#FFA31A") {
          advertise[i] = {
            background: "#ECFBE6",
            color: "#3BB900",
            value: advertise[i],
          };
        } else if (advertise[i - 1]?.color === "#3BB900") {
          advertise[i] = {
            color: "#D7282F",
            background: "#FFE8EC",
            value: advertise[i],
          };
        } else {
          advertise[i] = {
            color: "#FFA31A",
            background: "#FFF6E8",
            value: advertise[i],
          };
        }
      }
      setAdvertise(advertise);
    }
  };

  useEffect(() => {
    AddingColor();
  }, [productDetail]);

  const NavigateHandler = (id: string) => {
    const { slug, category, user_id, company_details } = productDetail;
    if (category !== null) {
      window.open(
        `/productdetail/${ReplaceSpaces(category)}/${ReplaceSpaces(
          company_details?.slug ?? ""
        )}/${ReplaceSpaces(slug)}/${id}/${user_id}`,
        "_blank",
        "noreferrer"
      );
    } else {
      toast.error("Category missing !");
    }
  };

  const handleNextProduct = (product_index) => {
    if (product_index !== -1 && product_index !== products.length - 1) {
      const getPreviousId = products[product_index + 1].id;
      setProductIndex(product_index + 1);
      fetchProductDetail(getPreviousId);
      setSkelton(true);
    }
  };

  const [specificationData, setSpecificationData] = useState([]);
  const [customSpecificationData, setCustomSpecificationData] = useState([]);
  const [viewMoreSpecification, setViewMoreSpecification] = useState(false);
  useEffect(() => {
    if (productDetail?.choice_options) {
      try {
        const parsedData = JSON.parse(productDetail.choice_options);
        setSpecificationData(parsedData);
      } catch (error) {}
    }

    if (productDetail?.custom_specification?.length > 0) {
      const updatedData = productDetail?.custom_specification?.map((item) => {
        if (item?.value) {
          if (item?.title === "Date of manufacturing" && item?.value) {
            return {
              name: item?.title,
              values: moment(item?.value).format("DD/MM/YYYY"),
            };
          }
          return {
            name: item?.title,
            values: item?.value,
            unit_name: item?.unit_name,
          };
        }
      });
      const valuesThereOrNot = updatedData?.filter((item) => item);
      if (valuesThereOrNot?.length > 0) {
        setCustomSpecificationData(updatedData);
      } else if (valuesThereOrNot?.length == 0) {
        setCustomSpecificationData([]);
      }
    }
  }, [productDetail]);

  useEffect(() => {
    if ([...specificationData, customSpecificationData]?.length < 8) {
      setViewMoreSpecification(true);
    }
  }, [specificationData, customSpecificationData]);

  const handlePreviousProduct = (productIndex) => {
    if (productIndex !== 0) {
      const getPreviousId = products[productIndex - 1].id;
      setProductIndex(productIndex - 1);
      fetchProductDetail(getPreviousId);
      setSkelton(true);
    } else {
    }
  };

  let filterImage = productDetail?.photos?.filter(
    (v: any) => v.is_featured == "1"
  );
  let displayImage =
    filterImage?.length > 0 ? filterImage[0] : productDetail?.photos?.[0];
  let filterPaymentMethods = productDetail?.payment_methods;
  let delivery_time_value = productDetail?.delivery_time_value;
  let delivery_time_period = productDetail?.delivery_time_period;
  let dispatch_in = productDetail?.dispatch_in;
  let dispatch_day = productDetail?.dispatch_day;
  const regex = /<strong>(.*?)<\/strong>/;
  const match = productDetail?.case_label?.match(regex);

  let manufactured = null;
  if (match && match.length > 1) {
    manufactured = match[1];
  }

  const generateDynamicColumns = (matrixItems) => {
    if (!matrixItems || matrixItems.length === 0) return [];

    const uniqueKeys = new Set<any>();

    matrixItems.forEach((item) => {
      if (item.json && typeof item.json === "object") {
        Object.keys(item.json).forEach((key) => uniqueKeys.add(key));
      }
    });

    return Array.from(uniqueKeys).map((key) => ({
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1),
      minWidth: 100,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const value = params.row?.json?.[key];
        return <Typography>{value || "No Value"}</Typography>;
      },
    }));
  };

  const getColumns = (matrixItems) => {
    const staticColumns = [
      {
        field: "serialNo",
        headerName: "Serial No",
        minWidth: 100,
        flex: 1,
        headerAlign: "center",
        align: "center",
        valueGetter: (params) =>
          `${
            params.api.getRowIndex(params.id) + 1 + (matrixListPage - 1) * 10
          }`,
      },
      {
        field: "id",
        headerName: "ID",
        minWidth: 100,
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
          return <Typography>{params?.value || "N/A"}</Typography>;
        },
      },

      {
        field: "sku",
        headerName: "SKU Number",
        minWidth: 150,
        flex: 1,
        headerAlign: "center",
        align: "center",
        valueGetter: (params) => {
          return ` ${productDetail?.stock_keeping_unit}_${(
            params.api.getRowIndex(params.id) +
            1 +
            (matrixListPage - 1) * 10
          )
            .toString()
            .padStart(4, "0")}`;
        },
      },

      {
        field: "images",
        headerName: "Image",
        minWidth: 200,
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
          return (
            <>
              {params.row?.images?.length > 0 ? (
                <Box>
                  <AvatarGroup max={3}>
                    {params.row.images.map((image, index) => (
                      <Avatar
                        key={index}
                        alt={`Image ${index + 1}`}
                        src={image?.source}
                        sx={{ width: 24, height: 24 }}
                      />
                    ))}
                  </AvatarGroup>
                </Box>
              ) : (
                <Typography>No Images Available</Typography>
              )}
            </>
          );
        },
      },
      {
        field: "unitPrice",
        headerName: "Unit Price",
        minWidth: 100,
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
          return <Typography>{params?.row?.price || "N/A"}</Typography>;
        },
      },
    ];

    const dynamicColumns = generateDynamicColumns(matrixItems);

    return [
      staticColumns[0],
      staticColumns[1],
      ...dynamicColumns,
      staticColumns[2],
      staticColumns[3],
      staticColumns[4],
    ];
  };

  const Gridrows = matrixItems;

  const Gridcolumns: any = getColumns(Gridrows);

  useEffect(() => {
    dispatch(setMatrixListPage(1));
  }, []);

  const handlePageChange = async (page) => {
    dispatch(setMatrixTableLoader(true));
    await dispatch(setMatrixListPage(page + 1));
    setTimeout(() => {
      dispatch(setMatrixTableLoader(false));
    }, 1200);
  };

  useEffect(() => {
    dispatch(listMatrix({ productId: productid }));
  }, [matrixListPage]);

  const [page, setPage] = useState(0);

  useEffect(() => {
    try {
      dispatch(getSpecificationsList({ specEdited: false, id: productid }));
    } catch {}
  }, []);

  const processDataForGrid = (data) => {
    const maxRows = Math.max(...data.map((item) => item.parentboth.length));

    const rows = Array.from({ length: maxRows }, (_, rowIndex) => {
      const row = { id: rowIndex + 1, serial: rowIndex + 1 };
      data.forEach((item) => {
        row[item.name] = item.parentboth[rowIndex]?.name || "";
      });
      return row;
    });

    const columns = [
      {
        field: "serial",
        headerName: "Serial No",
        flex: 1,
        minWidth: 100,
        headerAlign: "center",
        align: "center",
      },
      ...data.map((item) => ({
        field: item.name,
        headerName: item.name.charAt(0).toUpperCase() + item.name.slice(1),
        flex: 1,
        minWidth: 100,
        headerAlign: "center",
        align: "center",
      })),
    ];

    return { rows, columns };
  };

  const { rows: specRows, columns: specColumns } =
    processDataForGrid(specificationsList);

  const [case3Label, setCase3Label] = useState<any>([]);

  useEffect(() => {
    const case3LabelData = productDetail?.case_label?.split("@@@@");
    setCase3Label(case3LabelData);
  }, [productDetail]);

  return (
    <>
      <Mediaquery>
        <ToastContainer autoClose={1000} />
        <Heading>
          <Contentflex>
            <Textlink>
              <Text2
                onClick={() => handlePreviousProduct(productsIndex)}
                style={{
                  color: `${productsIndex == 0 ? "#c0c0c0" : "#D7282F"}`,
                }}
              >
                <ArrowBackOutlinedIcon />
                Previous
              </Text2>
            </Textlink>
            <Divider orientation="vertical" flexItem />
            <Textlink>
              {" "}
              <Text
                onClick={() => {
                  handleNextProduct(productsIndex);
                }}
                style={{
                  color: `${
                    productsIndex == products.length - 1 ? "#c0c0c0" : "#D7282F"
                  }`,
                }}
              >
                Next
                <ArrowForwardOutlinedIcon />
              </Text>
            </Textlink>
          </Contentflex>
          <Closebtn
            onClick={() => {
              setModal(false);
            }}
          >
            <img src="/assets/crossimg.svg" alt="" />
          </Closebtn>
        </Heading>
        {productDetail && !showSkleton ? (
          <Box sx={{ padding: "8px 15px" }}>
            <Secondsection>
              <SecondsectionHeading>
                {productDetail?.name || "Loading..."}
                <Typography
                  component="span"
                  className={classes.headingspan}
                ></Typography>
              </SecondsectionHeading>

              <UpdateAndCreated>
                <UpdateAndCreatedPadding>
                  <SecondsectionTextonRight>
                    Created On
                  </SecondsectionTextonRight>
                  <SecondsectionTextonRightDate>
                    {moment(productDetail?.created_at).format("DD/MM/YYYY")}
                  </SecondsectionTextonRightDate>
                </UpdateAndCreatedPadding>
                <UpdateAndCreatedPadding sx={{}}>
                  <SecondsectionTextonRight>
                    Updated On
                  </SecondsectionTextonRight>
                  <SecondsectionTextonRightDate>
                    {moment(productDetail?.updated_at).format("DD/MM/YYYY")}
                  </SecondsectionTextonRightDate>
                </UpdateAndCreatedPadding>
                <UpdateAndCreatedPadding sx={{}}>
                  <BadgeImage>
                    {productDetail?.product_type == "simple" &&
                      productDetail?.is_placeholder == "no" && (
                        // <img src="/assets/simple_product.svg" alt=""></img>
                        <PlaceHolderTag sx={{ width: "80px" }}>
                          <Typography>Simple</Typography>
                        </PlaceHolderTag>
                      )}
                    {(productDetail?.product_type == "configured" ||
                      productDetail?.product_type == "variation") &&
                      productDetail?.is_placeholder == "no" && (
                        // <img src="/assets/configured_banner.svg" alt=""></img>
                        <PlaceHolderTag>
                          <Typography>Configured</Typography>
                        </PlaceHolderTag>
                      )}
                    {/* productDetail?.is_placeholder == "yes" && */}
                    {productDetail?.is_placeholder == "yes" && (
                      <PlaceHolderTag>
                        <Typography>Placeholder</Typography>
                      </PlaceHolderTag>
                    )}
                  </BadgeImage>
                </UpdateAndCreatedPadding>
              </UpdateAndCreated>
            </Secondsection>
            <ProductBreadcrumbsStyle>
              <Breadcrumbs
                aria-label="breadcrumb"
                style={{ color: "#223354", fontSize: "15px" }}
              >
                {Array?.isArray(productDetail?.breadcrumbs) &&
                  productDetail?.breadcrumbs?.map((v: any) => (
                    <Link key={v.id} style={{ cursor: "pointer" }}>
                      {v.name}
                    </Link>
                  ))}
              </Breadcrumbs>
            </ProductBreadcrumbsStyle>
            <Divider />
            <Box>
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    "& .MuiTabs-root": {
                      "& .MuiTabs-scroller": {
                        width: "100%",
                        "& .MuiTabs-flexContainer": {
                          maxWidth: "257px",
                        },
                      },
                    },
                    "@media screen and (max-width:600px)": {
                      display: "block",
                    },
                  }}
                >
                  <Tabs
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    sx={{
                      width: "65%",
                      "@media screen and (max-width:600px)": {
                        width: "100%",
                      },
                      "& .MuiTabs-scrollButtons": {
                        display: "flex",
                      },
                      "& .MuiTabs-indicator": { backgroundColor: "#D7282F" },
                      "& .MuiTab-root.Mui-selected": {
                        color: "black",
                      },
                    }}
                  >
                    <Tab
                      label="Product Detail"
                      {...a11yProps(0)}
                      sx={{
                        fontSize: "13px",
                        fontWeight: "600",
                        textTransform: "capitalize",
                      }}
                    />
                    <Tab
                      label="Visited Supplier"
                      {...a11yProps(1)}
                      sx={{
                        fontSize: "13px",
                        fontWeight: "600",
                        textTransform: "capitalize",
                      }}
                    />
                    <Tab
                      label="Quotes/Order & Invoice"
                      {...a11yProps(2)}
                      sx={{
                        fontSize: "13px",
                        fontWeight: "600",
                        textTransform: "capitalize",
                      }}
                    />
                  </Tabs>
                  <Box
                    sx={{
                      "@media screen and (max-width:600px)": {
                        display: "flex",
                        justifyContent: "end",
                      },
                    }}
                  >
                    <Productbutn
                      onClick={() => {
                        NavigateHandler(productDetail?.id);
                      }}
                    >
                      View Product
                    </Productbutn>
                  </Box>
                </Box>
                <Box sx={{ backgroundColor: "#F8F8F8", padding: "8px" }}>
                  <TabPanel value={value} index={0}>
                    <Box sx={{ backgroundColor: "#F8F8F8", marginX: "-10px" }}>
                      <TopGrid container spacing={2}>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          lg={2.2}
                          xl={2.2}
                          sx={{
                            position: "relative",
                            "@media screen and (max-width:800px)": {
                              paddingRight: "16px",
                            },
                          }}
                        >
                          {displayImage ? (
                            <img
                              src={
                                displayImage?.file_name ??
                                "/assets/productImage/defaultproductimage.png"
                              }
                              alt={displayImage?.alt_tag}
                              width="100%"
                              height="180px"
                            />
                          ) : (
                            <div
                              style={{
                                width: "100%",
                                height: "180px",
                                background: "rgb(201,201,201)",
                                textAlign: "center",
                              }}
                            >
                              <PhotoSizeSelectActualOutlinedIcon
                                style={{
                                  width: "130px",
                                  height: "130px",
                                  marginTop: "25px",
                                }}
                              />
                            </div>
                          )}
                          <IdProductColB>
                            <Typography>
                              {" "}
                              {productDetail?.unique_number}
                            </Typography>
                          </IdProductColB>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={8}
                          lg={9.8}
                          xl={9.8}
                          p={1}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              "@media screen and (max-width:600px)": {
                                display: "block",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                "@media screen and (max-width:600px)": {
                                  flexDirection: "column-reverse",
                                  alignItems: "flex-start",
                                  "& .MuiTypography-body1": {
                                    marginLeft: "0 !important",
                                  },
                                },
                              }}
                            >
                              <Biogas>{productDetail?.pre_title_name}</Biogas>
                            </Box>
                            {productDetail?.product_type == "simple" && (
                              <SKUNumberData>
                                <Typography>
                                  <span>SKU:</span>{" "}
                                  {productDetail?.stock_keeping_unit
                                    ? productDetail?.stock_keeping_unit
                                    : "N/A"}
                                </Typography>
                              </SKUNumberData>
                            )}
                          </Box>
                          <Box mb={1}>
                            <Soundproof
                              onClick={() => {
                                NavigateHandler(productid);
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              {productDetail?.name}
                            </Soundproof>
                            <Shadowcontainer>
                              <AdvertisementContainer>
                                <div style={{ display: "flex" }}>
                                  {advertisement?.map((v, i) => {
                                    const { background, color } = v;
                                    return (
                                      <AdvertisementText
                                        background={background}
                                        color={color}
                                        key={i}
                                      >
                                        <Typography>{v.value}</Typography>
                                      </AdvertisementText>
                                    );
                                  })}
                                </div>
                                {/* </Marquee> */}
                              </AdvertisementContainer>
                            </Shadowcontainer>
                            <CompanyProfileAAbout>
                              <span
                                className="quoteviewmore"
                                style={{
                                  lineHeight: "normal",
                                  alignItems: "center",
                                  paddingTop: "8px",
                                  flexDirection: "column",
                                  overflow: "hidden",
                                  fontSize: "13px",
                                }}
                              >
                                {viewMore ? (
                                  <>
                                    {productDetail?.description?.length > 0 && (
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            productDetail?.description.replaceAll(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {productDetail?.description?.length > 0 ? (
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            productDetail?.description.length >
                                            195
                                              ? productDetail?.description?.slice(
                                                  0,
                                                  195
                                                ) + "..."
                                              : productDetail?.description?.slice(
                                                  0,
                                                  195
                                                ),
                                        }}
                                      ></p>
                                    ) : (
                                      "N/A"
                                    )}
                                  </>
                                )}
                                <FlyoutDescription
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setViewMore((pre) => !pre);
                                  }}
                                >
                                  <span>
                                    {" "}
                                    {productDetail?.description?.length > 195 &&
                                      (viewMore ? "View less!" : "View more!")}
                                  </span>
                                </FlyoutDescription>
                              </span>
                            </CompanyProfileAAbout>
                          </Box>
                          <ProuctTypeLine>
                            <Typography>
                              This is{" "}
                              <span
                                className={
                                  productDetail?.availability === "in_stock"
                                    ? "in-stockp"
                                    : "by-orderp"
                                }
                              >
                                {productDetail?.availability === "in_stock"
                                  ? "In Stock"
                                  : "By Order"}
                              </span>{" "}
                              {productDetail?.hide_price == 1 &&
                              productDetail?.availability
                                ? ` ${
                                    productDetail?.quantity_based_list?.length >
                                      0 || productDetail?.unit_price
                                      ? "product, available for purchase at below listed price."
                                      : "product."
                                  }`
                                : "product."}
                            </Typography>
                          </ProuctTypeLine>
                          <Box>
                            <Grid container>
                              {productDetail?.quantity_based_list?.length > 0 &&
                                productDetail?.price_type == "quantity" &&
                                productDetail?.hide_price == 1 &&
                                productDetail?.quantity_based_list?.map(
                                  (row: any) => (
                                    <Grid item md="auto" sx={{ padding: " 0" }}>
                                      <Box
                                        sx={{
                                          border: "1px solid #dadada",
                                          padding: "3px 18px",
                                          margin: "0 6px 6px 0",
                                          borderRadius: "5px",
                                          textAlign: "center",
                                          "& .MuiTypography-h5": {
                                            fontSize: "16px",
                                            color: "#D82E34",
                                            fontWeight: 700,
                                          },
                                          "& .MuiTypography-body1": {
                                            fontSize: "12px",
                                            color: "#4A4A4A",
                                          },
                                        }}
                                      >
                                        <Typography variant="h5">
                                          {`${CurrencySymbol(
                                            +productDetail?.currency_id
                                          )}${row.price.toLocaleString()}`}
                                        </Typography>
                                        <Typography variant="body1">
                                          {row.max_qty > 0 ? (
                                            `${row.min_qty}-${row.max_qty} `
                                          ) : (
                                            <>&#8805; {row.min_qty}</>
                                          )}
                                          {`${
                                            unitList.find(
                                              (v) =>
                                                v.id ==
                                                (productDetail?.price_type ==
                                                "fixed"
                                                  ? productDetail?.unit
                                                  : productDetail?.qty_unit)
                                            )?.name ?? "N/A"
                                          }`}
                                        </Typography>
                                      </Box>
                                    </Grid>
                                  )
                                )}

                              {productDetail?.price_type == "fixed" &&
                                productDetail?.hide_price == 1 && (
                                  <Grid item md="auto" sx={{ padding: " 0" }}>
                                    <Box
                                      sx={{
                                        padding: "0px 8px 0 0",

                                        "& .MuiTypography-h5": {
                                          fontSize: "16px",
                                          color: "#D82E34",
                                          fontWeight: 700,
                                        },
                                        "& span": {
                                          fontSize: "12px",
                                          color: "#4A4A4A",
                                          fontWeight: 400,
                                        },
                                      }}
                                    >
                                      <Typography variant="h5">
                                        {`${CurrencySymbol(
                                          +productDetail?.currency_id
                                        )}${productDetail?.unit_price.toLocaleString()}`}
                                        <span>
                                          {`/${
                                            unitList.find(
                                              (v) =>
                                                v.id ==
                                                (productDetail?.price_type ==
                                                "fixed"
                                                  ? productDetail?.unit
                                                  : productDetail?.qty_unit)
                                            )?.name ?? "N/A"
                                          }`}
                                        </span>
                                      </Typography>
                                    </Box>
                                  </Grid>
                                )}

                              {productDetail?.price_term &&
                                productDetail?.hide_price == 1 && (
                                  <Grid
                                    item
                                    xs={12}
                                    sm="auto"
                                    md="auto"
                                    sx={{
                                      padding: "0",
                                      "@media (max-width: 900px)": {
                                        marginTop: "10px",
                                      },
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        height: "100%",
                                        justifyContent: "center",
                                        paddingLeft: "0px",
                                        paddingRight: "16px",
                                        position: "relative",
                                        "& .MuiSvgIcon-root": {
                                          fontSize: "15px",
                                          color: "#0AA133",
                                        },
                                        "@media (max-width: 600px)": {
                                          right: "0",
                                          backgroundColor: "#f3f3f3",
                                          borderColor: "#e3e3e3",
                                        },
                                      }}
                                    >
                                      <PriceTermText variant="h6">
                                        {productDetail?.price_term?.replaceAll(
                                          ",",
                                          ", "
                                        )}

                                        <InfoOutlinedIcon
                                          style={{
                                            marginLeft: "5px",
                                            color: "#0AA133",
                                          }}
                                        />
                                      </PriceTermText>
                                    </Box>
                                  </Grid>
                                )}

                              {productDetail?.product_type == "configured" && (
                                <Grid container spacing={2}>
                                  {productDetail?.brand_name && (
                                    <Grid
                                      item
                                      xs={12}
                                      sm={6}
                                      md={6}
                                      lg={3}
                                      xl={3}
                                    >
                                      <Thirdsection>
                                        Manufacturer/Brand
                                      </Thirdsection>
                                      <Thirdsection2>
                                        {productDetail?.brand_name
                                          ? productDetail?.brand_name
                                          : "N/A"}
                                      </Thirdsection2>
                                    </Grid>
                                  )}
                                  {productDetail?.model_number && (
                                    <Grid
                                      item
                                      xs={12}
                                      sm={6}
                                      md={6}
                                      lg={3}
                                      xl={3}
                                    >
                                      <Thirdsection>Model No.</Thirdsection>
                                      <Thirdsection2>
                                        {productDetail?.model_number}
                                      </Thirdsection2>
                                    </Grid>
                                  )}
                                </Grid>
                              )}
                            </Grid>
                            {/* Start Show hide View ------ */}
                            {productDetail?.hide_price == 0 && (
                              <Grid container spacing={1}>
                                <Grid item xs={12}>
                                  <ShowHideView
                                    sx={{ border: "none", margin: 0 }}
                                  >
                                    <HideShowtextImage>
                                      <Typography>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: hideOptions?.find(
                                              (option) => {
                                                return (
                                                  option.value ==
                                                  productDetail?.hide_price_condition
                                                );
                                              }
                                            )?.name,
                                          }}
                                        />
                                      </Typography>
                                    </HideShowtextImage>
                                  </ShowHideView>
                                </Grid>
                              </Grid>
                            )}
                            {productDetail?.negotiable_price == 1 &&
                              productDetail?.price_type == "fixed" && (
                                <IconWithText>
                                  <i className="icon-agreement">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                  </i>
                                  <BoldCommonTypography>
                                    The final price of this product will be
                                    subject to negotiation and mutual agreement.
                                  </BoldCommonTypography>
                                </IconWithText>
                              )}
                            {/* End Show hide View ------ */}
                          </Box>
                        </Grid>
                      </TopGrid>
                      {(productDetail?.product_type == "configured" ||
                        productDetail?.product_type == "variation") && (
                        <div>
                          <ConfigureMetrixTable>
                            <Newsection>
                              {" "}
                              Available Options of Configuration
                            </Newsection>
                            <ConfigureMetrixTableInn>
                              <CWhiteBox>
                                <DataGridPro
                                  rows={Gridrows}
                                  columns={Gridcolumns}
                                  rowCount={totalVariation}
                                  pageSize={10}
                                  sx={DataGridStyle}
                                  paginationMode="server"
                                  onPageChange={handlePageChange}
                                  //  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                  rowHeight={32}
                                  autoHeight
                                  loading={matrixTableLoader}
                                  pagination
                                />
                              </CWhiteBox>
                            </ConfigureMetrixTableInn>
                          </ConfigureMetrixTable>

                          {/* specification table starts here */}

                          <ConfigureMetrixTable>
                            <Newsection> Available Specifications</Newsection>
                            <ConfigureMetrixTableInn>
                              <CWhiteBox>
                                <DataGridPro
                                  rows={specRows}
                                  columns={specColumns}
                                  pageSize={5}
                                  page={page}
                                  paginationMode="client"
                                  onPageChange={(newPage) => setPage(newPage)}
                                  // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                  pagination
                                  autoHeight
                                  sx={DataGridStyle}
                                  rowHeight={32}
                                />
                              </CWhiteBox>
                            </ConfigureMetrixTableInn>
                          </ConfigureMetrixTable>

                          {specificationData.length > 0 && (
                            <Grid container spacing={2} marginTop="5px">
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <Newsection>Specifications</Newsection>
                              </Grid>
                            </Grid>
                          )}
                          {specificationData.length > 0 && (
                            <Boxforgrid>
                              <Grid container spacing={2}>
                                {specificationData.map((item, index) => (
                                  <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={3}
                                    lg={3}
                                    xl={3}
                                  >
                                    <Box>
                                      <Gridcontent>{item?.name}</Gridcontent>
                                      <GridRedcontent2>
                                        {item?.values}
                                      </GridRedcontent2>
                                    </Box>
                                  </Grid>
                                ))}
                              </Grid>
                            </Boxforgrid>
                          )}

                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <CommercialSectionInfoInner>
                                <Newsection>Commercial Information</Newsection>
                                <CommercialSectionInfoInner>
                                  <CWhiteBox>
                                    <CommercialHeading>
                                      Payment Methods
                                    </CommercialHeading>
                                    {filterPaymentMethods?.length > 0 ? (
                                      <CommercialdesP>
                                        <span>
                                          {filterPaymentMethods
                                            .split(",")
                                            ?.map((item, index) => (
                                              <span
                                                key={index}
                                                style={{
                                                  display: "inline-flex",
                                                  alignItems: "center",
                                                  fontSize: "13px",
                                                  marginRight: "10px",
                                                }}
                                              >
                                                {item}
                                                <LightTooltip
                                                  disableInteractive
                                                  arrow
                                                  placement="top"
                                                  title={
                                                    <div>
                                                      {" "}
                                                      The Seller's base price is
                                                      based on an{" "}
                                                      <strong>
                                                        {" "}
                                                        {item}
                                                      </strong>{" "}
                                                      delivery term
                                                    </div>
                                                  }
                                                  PopperProps={{
                                                    style: {
                                                      zIndex: 99999,
                                                      fontSize: "14px",
                                                    },
                                                  }}
                                                >
                                                  {item !== "" && (
                                                    <InfoOutlinedIcon
                                                      style={{
                                                        marginLeft: "5px",
                                                        color: "#0AA133",
                                                        fontSize: "14px",
                                                      }}
                                                    />
                                                  )}
                                                </LightTooltip>
                                              </span>
                                            ))}
                                        </span>
                                      </CommercialdesP>
                                    ) : (
                                      <CommercialdesP>N/A</CommercialdesP>
                                    )}
                                  </CWhiteBox>
                                  <CWhiteBox>
                                    <CommercialHeading>
                                      Country of Origin{" "}
                                      <Typography className="greysmallheading">
                                        <Typography className="greysmallheading">
                                          {" "}
                                          ({" "}
                                          {(productDetail?.case_type ==
                                            "case_1" &&
                                            "Case One") ||
                                            (productDetail?.case_type ==
                                              "case_2" &&
                                              "Case Two") ||
                                            (productDetail?.case_type ==
                                              "case_3" &&
                                              "Case Three")}{" "}
                                          Selected)
                                        </Typography>
                                      </Typography>
                                    </CommercialHeading>

                                    {productDetail?.case_type == "case_1" &&
                                      productDetail?.case_label && (
                                        <>
                                          <CommercialdesP
                                            dangerouslySetInnerHTML={{
                                              __html: productDetail.case_label,
                                            }}
                                          />
                                          {productDetail?.caseData &&
                                            JSON.parse(productDetail.caseData)
                                              ?.source_component_toggle &&
                                            JSON.parse(productDetail.caseData)
                                              ?.source_component_toggle ==
                                              1 && (
                                              <IconWithText>
                                                <i className="icon-globe"></i>
                                                <BoldCommonTypography>
                                                  Please note that some
                                                  components of this product may
                                                  be sourced from other
                                                  countries.
                                                </BoldCommonTypography>
                                              </IconWithText>
                                            )}
                                        </>
                                      )}

                                    {productDetail?.case_type == "case_2" &&
                                      productDetail?.case_label && (
                                        <>
                                          <CommercialdesP
                                            dangerouslySetInnerHTML={{
                                              __html: productDetail.case_label,
                                            }}
                                          />
                                        </>
                                      )}

                                    {productDetail?.case_type == "case_3" &&
                                      case3Label &&
                                      case3Label?.map((label) => {
                                        return (
                                          <CommercialdesP
                                            dangerouslySetInnerHTML={{
                                              __html: label,
                                            }}
                                          />
                                        );
                                      })}

                                    {!productDetail?.case_type && (
                                      <Typography className="emptyOrigin">
                                        N/A
                                      </Typography>
                                    )}
                                  </CWhiteBox>
                                  <CWhiteBox>
                                    <CommercialHeading>
                                      Shipping Options
                                    </CommercialHeading>
                                    <DevideInfoArea>
                                      <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={6}>
                                          <CommercialInfoLft>
                                            <SmallHeadingInn variant="h6">
                                              Production Capacity
                                            </SmallHeadingInn>
                                            <CommercialCheckValue
                                              sx={{ fontWeight: 400 }}
                                            >
                                              {productDetail?.in_house_production ||
                                              productDetail?.in_house_production_days ? (
                                                <div>
                                                  {" "}
                                                  {
                                                    productDetail?.in_house_production
                                                  }{" "}
                                                  {
                                                    productDetail?.in_house_production_days
                                                  }
                                                </div>
                                              ) : (
                                                <Typography
                                                  sx={{ fontSize: 14 }}
                                                >
                                                  N/A
                                                </Typography>
                                              )}
                                            </CommercialCheckValue>
                                          </CommercialInfoLft>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6}>
                                          <CommercialInfoLft
                                            sx={{
                                              borderLeft: "1px solid #ddd",
                                              padding: "3px 0 0 10px",
                                            }}
                                          >
                                            <SmallHeadingInn variant="h6">
                                              Delivery Time
                                            </SmallHeadingInn>
                                            <CommercialCheckValue
                                              sx={{ fontWeight: 400 }}
                                            >
                                              {productDetail?.delivery_time ||
                                              productDetail?.delivery_select ? (
                                                <div>
                                                  {" "}
                                                  {
                                                    productDetail?.delivery_time
                                                  }{" "}
                                                  {
                                                    productDetail?.delivery_select
                                                  }
                                                </div>
                                              ) : (
                                                <Typography
                                                  sx={{ fontSize: 14 }}
                                                >
                                                  N/A
                                                </Typography>
                                              )}
                                            </CommercialCheckValue>
                                          </CommercialInfoLft>
                                        </Grid>
                                      </Grid>
                                    </DevideInfoArea>
                                  </CWhiteBox>
                                  <CWhiteBox>
                                    <CommercialHeading>
                                      Pick-up Destination
                                    </CommercialHeading>
                                    <DevideInfoArea>
                                      <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={6}>
                                          <CommercialInfoLft>
                                            <SmallHeadingInn variant="h6">
                                              Nearby Airport
                                            </SmallHeadingInn>
                                            <CommercialCheckValue
                                              sx={{ fontWeight: 400 }}
                                            >
                                              {productDetail?.port_
                                                ? productDetail?.port_
                                                : "N/A"}
                                            </CommercialCheckValue>
                                          </CommercialInfoLft>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6}>
                                          <CommercialInfoLft
                                            sx={{
                                              borderLeft: "1px solid #ddd",
                                              padding: "3px 0 0 10px",
                                            }}
                                          >
                                            <SmallHeadingInn variant="h6">
                                              Nearby Seaport
                                            </SmallHeadingInn>
                                            <CommercialCheckValue
                                              sx={{ fontWeight: 400 }}
                                            >
                                              {productDetail?.sea_
                                                ? productDetail?.sea_
                                                : "N/A"}
                                            </CommercialCheckValue>
                                          </CommercialInfoLft>
                                        </Grid>
                                      </Grid>
                                    </DevideInfoArea>
                                  </CWhiteBox>

                                  {productDetail?.manufacturing_restrictions_country && (
                                    <CWhiteBox>
                                      <CommercialHeading>
                                        Product availability or manufacturing
                                        restrictions
                                      </CommercialHeading>

                                      <CommercialdesP>
                                        {productDetail?.manufacturing_restrictions_status ==
                                          "1" && (
                                          <span>
                                            This product {" "}
                                            {
                                              productDetail?.manufacturing_restrictions_availibility
                                            }{" "}
                                            manufactured to sell in{" "}
                                            {productDetail?.manufacturing_restrictions_country ? (
                                              <strong>
                                                {" "}
                                                {productDetail?.manufacturing_restrictions_country
                                                  .split(",")
                                                  .map((t) => {
                                                    return [
                                                      ...territoryData,
                                                      ...modifiedCountriesList,
                                                    ].find((c) => {
                                                      return c.value === t;
                                                    })?.view;
                                                  })
                                                  ?.join(", ")}
                                                .{" "}
                                              </strong>
                                            ) : (
                                              "N/A"
                                            )}
                                          </span>
                                        )}
                                      </CommercialdesP>
                                      {productDetail?.available_restrictions_status && (
                                        <CommercialdesP>
                                          {productDetail?.available_restrictions_status ==
                                            "1" && (
                                            <span>
                                              This product {" "}
                                              {
                                                productDetail?.available_restrictions_availibility
                                              }{" "}
                                              available to sell in{" "}
                                              {productDetail?.available_restrictions_country ? (
                                                <strong>
                                                  {productDetail?.available_restrictions_country
                                                    .split(",")
                                                    .map((t) => {
                                                      return [
                                                        ...territoryData,
                                                        ...modifiedCountriesList,
                                                      ].find((c) => {
                                                        return c.value === t;
                                                      })?.view;
                                                    })
                                                    ?.join(", ")}
                                                  .{" "}
                                                </strong>
                                              ) : (
                                                "N/A"
                                              )}
                                            </span>
                                          )}
                                        </CommercialdesP>
                                      )}
                                      <IconWithText>
                                        <i className="icon-globe"></i>
                                        <BoldCommonTypography>
                                          Please contact us for shipping
                                          restrictions to your specific
                                          location.
                                        </BoldCommonTypography>
                                      </IconWithText>
                                    </CWhiteBox>
                                  )}
                                </CommercialSectionInfoInner>
                              </CommercialSectionInfoInner>
                            </Grid>
                          </Grid>
                        </div>
                      )}

                      {productDetail?.product_type === "simple" && (
                        <div>
                          <Grid container spacing={2} marginTop="5px">
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                              <Box>
                                <Newsection>Overview</Newsection>
                              </Box>
                            </Grid>
                          </Grid>
                          <Boxforgrid>
                            {productDetail?.availability == "by_order" ? (
                              <>
                                <Grid container spacing={2}>
                                  {/* {productDetail?.brand_name && ( */}
                                  <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={6}
                                    lg={3}
                                    xl={3}
                                  >
                                    <Thirdsection>
                                      Manufacturer/Brand
                                    </Thirdsection>
                                    <Thirdsection2>
                                      {productDetail?.brand_name
                                        ? productDetail?.brand_name
                                        : "N/A"}
                                    </Thirdsection2>
                                  </Grid>
                                  {/* )} */}
                                  {/* {productDetail?.model_number && ( */}
                                  <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={6}
                                    lg={3}
                                    xl={3}
                                  >
                                    <Thirdsection>Model No.</Thirdsection>
                                    <Thirdsection2>
                                      {productDetail?.model_number
                                        ? productDetail?.model_number
                                        : "N/A"}
                                    </Thirdsection2>
                                  </Grid>
                                  {/* )} */}
                                </Grid>
                              </>
                            ) : (
                              <Grid container spacing={2}>
                                {/* {productDetail?.manufacturer_year && ( */}
                                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                                  <Thirdsection>
                                    Manufacturing Year
                                  </Thirdsection>
                                  <Thirdsection2>
                                    {productDetail?.manufacturer_year
                                      ? productDetail?.manufacturer_year
                                      : "N/A"}
                                  </Thirdsection2>
                                </Grid>
                                {/* )} */}
                                {/* {productDetail?.model_number && ( */}
                                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                                  <Thirdsection>Model No.</Thirdsection>
                                  <Thirdsection2>
                                    {productDetail?.model_number
                                      ? productDetail?.model_number
                                      : "N/A"}
                                  </Thirdsection2>
                                </Grid>
                                {/* )} */}
                                {/* {productDetail?.validity && ( */}
                                <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  md={6}
                                  // lg={2}
                                  // xl={2}
                                  lg={3}
                                  xl={3}
                                >
                                  <Thirdsection>Post Validity</Thirdsection>
                                  <Thirdsection2>
                                    {productDetail?.validity
                                      ? postValidityOptions.find(
                                          (v) =>
                                            v.value == productDetail?.validity
                                        )?.view
                                      : "N/A"}
                                  </Thirdsection2>
                                </Grid>
                                {/* )} */}
                                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                                  <Thirdsection>
                                    Manufacturer/Brand
                                  </Thirdsection>
                                  <Thirdsection2>
                                    {productDetail?.brand_name
                                      ? productDetail?.brand_name
                                      : "N/A"}
                                  </Thirdsection2>
                                </Grid>
                                {/* {productDetail?.condition && ( */}
                                <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                                  <Thirdsection>Condition</Thirdsection>
                                  <Thirdsection2>
                                    {productDetail?.condition
                                      ? productDetail?.condition
                                      : "N/A"}
                                  </Thirdsection2>
                                </Grid>
                                {/* )} */}
                              </Grid>
                            )}
                          </Boxforgrid>

                          {[...customSpecificationData, ...specificationData]
                            .length > 0 && (
                            <Grid container spacing={2} marginTop="5px">
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <Newsection>Specifications</Newsection>
                              </Grid>
                            </Grid>
                          )}
                          {(specificationData?.length > 0 ||
                            customSpecificationData?.length > 0) && (
                            <Boxforgrid>
                              {viewMoreSpecification ? (
                                <Grid container spacing={2}>
                                  {[
                                    ...customSpecificationData,
                                    ...specificationData,
                                  ]
                                    .splice(0, 8)
                                    .map((item) => (
                                      <>
                                        {item?.values && (
                                          <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={3}
                                            lg={3}
                                            xl={3}
                                          >
                                            <Box>
                                              <Gridcontent>
                                                {item?.name}
                                              </Gridcontent>
                                              <GridRedcontent2>
                                                {item?.values} {item?.unit_name}
                                              </GridRedcontent2>
                                            </Box>
                                          </Grid>
                                        )}
                                      </>
                                    ))}
                                </Grid>
                              ) : (
                                <Grid container spacing={2}>
                                  {[
                                    ...customSpecificationData,
                                    ...specificationData,
                                  ].map((item, index) => (
                                    <>
                                      {item?.values && (
                                        <Grid
                                          item
                                          xs={12}
                                          sm={6}
                                          md={3}
                                          lg={3}
                                          xl={3}
                                        >
                                          <Box>
                                            <Gridcontent>
                                              {item?.name}
                                            </Gridcontent>
                                            <GridRedcontent2>
                                              {item?.values} {item?.unit_name}
                                            </GridRedcontent2>
                                          </Box>
                                        </Grid>
                                      )}
                                    </>
                                  ))}
                                </Grid>
                              )}

                              <Box
                                sx={{
                                  position: "absolute",
                                  right: "16px",
                                  bottom: "16px",
                                }}
                              >
                                {[
                                  ...customSpecificationData,
                                  ...specificationData,
                                ].length > 8 && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Button
                                      sx={{
                                        backgroundColor: "#d7282f",
                                        color: "#fff",
                                        fontSize: "12px",
                                        border: "1px solid #d7282f",
                                        textTransform: "capitalize",
                                        padding: "2px 8px",
                                        "&:hover": {
                                          backgroundColor: "#fff",
                                          color: "#d7282f",
                                          border: "1px solid #d7282f",
                                        },
                                      }}
                                      onClick={() => {
                                        setViewMoreSpecification((pre) => !pre);
                                      }}
                                    >
                                      {viewMoreSpecification
                                        ? "View More"
                                        : "View Less"}
                                    </Button>
                                  </Box>
                                )}
                              </Box>
                            </Boxforgrid>
                          )}
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <CommercialSectionInfoInner>
                                <Newsection>Commercial Information</Newsection>
                                <CommercialSectionInfoInner>
                                  <CWhiteBox>
                                    <CommercialHeading>
                                      Payment Methods
                                    </CommercialHeading>
                                    {filterPaymentMethods ? (
                                      <CommercialdesP>
                                        {/* <span>
                                            {filterPaymentMethods
                                              .split(",")
                                              ?.map((item, index) => (
                                                <span
                                                  key={index}
                                                  style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    fontSize: "13px",
                                                    marginRight: "10px",
                                                  }}
                                                >
                                                  {item}
                                                  <LightTooltip
                                                    disableInteractive
                                                    arrow
                                                    placement="top"
                                                    title={
                                                      <div>
                                                        {" "}
                                                        The Seller's base price
                                                        is based on an{" "}
                                                        <strong>
                                                          {" "}
                                                          {item}
                                                        </strong>{" "}
                                                        delivery term
                                                      </div>
                                                    }
                                                    PopperProps={{
                                                      style: {
                                                        zIndex: 99999,
                                                        fontSize: "14px",
                                                      },
                                                    }}
                                                  >
                                                    {item !== "" && (
                                                      <InfoOutlinedIcon
                                                        style={{
                                                          marginLeft: "5px",
                                                          color: "#0AA133",
                                                          fontSize: "15px",
                                                        }}
                                                      />
                                                    )}
                                                  </LightTooltip>
                                                  
                                                </span>
                                              ))}
                                          </span> */}
                                        <span>
                                          {filterPaymentMethods
                                            .split(",")
                                            ?.map((item, index, array) => (
                                              <span
                                                key={index}
                                                style={{
                                                  display: "inline-flex",
                                                  alignItems: "center",
                                                  fontSize: "13px",
                                                  marginRight:
                                                    index === array.length - 1
                                                      ? "0"
                                                      : "10px",
                                                }}
                                              >
                                                {item}
                                                <LightTooltip
                                                  disableInteractive
                                                  arrow
                                                  placement="top"
                                                  title={
                                                    <div>
                                                      The Seller's base price is
                                                      based on an{" "}
                                                      <strong>{item}</strong>{" "}
                                                      delivery term
                                                    </div>
                                                  }
                                                  PopperProps={{
                                                    style: {
                                                      zIndex: 99999,
                                                      fontSize: "14px",
                                                    },
                                                  }}
                                                >
                                                  {item !== "" && (
                                                    <InfoOutlinedIcon
                                                      style={{
                                                        marginLeft: "5px",
                                                        color: "#0AA133",
                                                        fontSize: "15px",
                                                      }}
                                                    />
                                                  )}
                                                </LightTooltip>
                                                {index !== array.length - 1 &&
                                                  ","}
                                              </span>
                                            ))}
                                        </span>
                                      </CommercialdesP>
                                    ) : (
                                      <CommercialdesP>N/A</CommercialdesP>
                                    )}
                                  </CWhiteBox>

                                  <CWhiteBox>
                                    <CommercialHeading>
                                      Country of Origin{" "}
                                      <Typography className="greysmallheading">
                                        {" "}
                                        ({" "}
                                        {(productDetail?.case_type ==
                                          "case_1" &&
                                          "Case One") ||
                                          (productDetail?.case_type ==
                                            "case_2" &&
                                            "Case Two") ||
                                          (productDetail?.case_type ==
                                            "case_3" &&
                                            "Case Three")}{" "}
                                        Selected)
                                      </Typography>
                                    </CommercialHeading>

                                    {productDetail?.case_type == "case_1" &&
                                      productDetail?.case_label && (
                                        <>
                                          <CommercialdesP
                                            dangerouslySetInnerHTML={{
                                              __html: productDetail.case_label,
                                            }}
                                          />
                                          {productDetail?.caseData &&
                                            JSON.parse(productDetail.caseData)
                                              ?.source_component_toggle &&
                                            JSON.parse(productDetail.caseData)
                                              ?.source_component_toggle ==
                                              1 && (
                                              <IconWithText>
                                                <i className="icon-globe"></i>
                                                <BoldCommonTypography>
                                                  Please note that some
                                                  components of this product may
                                                  be sourced from other
                                                  countries.
                                                </BoldCommonTypography>
                                              </IconWithText>
                                            )}
                                        </>
                                      )}

                                    {productDetail?.case_type == "case_2" &&
                                      productDetail?.case_label && (
                                        <>
                                          <CommercialdesP
                                            dangerouslySetInnerHTML={{
                                              __html: productDetail.case_label,
                                            }}
                                          />
                                        </>
                                      )}

                                    {productDetail?.case_type == "case_3" &&
                                      case3Label &&
                                      case3Label?.map((label) => {
                                        return (
                                          <CommercialdesP
                                            dangerouslySetInnerHTML={{
                                              __html: label,
                                            }}
                                          />
                                        );
                                      })}

                                    {!productDetail?.case_type && (
                                      <Typography className="emptyOrigin">
                                        N/A
                                      </Typography>
                                    )}
                                  </CWhiteBox>
                                  <CWhiteBox>
                                    <CommercialHeading>
                                      Shipping Options
                                    </CommercialHeading>
                                    <DevideInfoArea>
                                      {productDetail?.availability ==
                                      "by_order" ? (
                                        <Grid container spacing={2}>
                                          <Grid item xs={12} sm={6} md={6}>
                                            <CommercialInfoLft>
                                              <SmallHeadingInn variant="h6">
                                                Production Capacity
                                              </SmallHeadingInn>
                                              <CommercialCheckValue
                                                sx={{ fontWeight: 400 }}
                                              >
                                                {productDetail?.in_house_production ||
                                                productDetail?.in_house_production_days ? (
                                                  <div>
                                                    {" "}
                                                    {
                                                      productDetail?.in_house_production
                                                    }{" "}
                                                    {productDetail?.production_unit &&
                                                      capitalizeFirstLetter(
                                                        `${
                                                          unitList.find(
                                                            (v) =>
                                                              v.id ==
                                                              productDetail?.production_unit
                                                          )?.name
                                                        }`
                                                      )}{" "}
                                                    {
                                                      productDetail?.in_house_production_days
                                                    }
                                                  </div>
                                                ) : (
                                                  <Typography
                                                    sx={{ fontSize: 14 }}
                                                  >
                                                    N/A
                                                  </Typography>
                                                )}
                                              </CommercialCheckValue>
                                            </CommercialInfoLft>
                                          </Grid>

                                          <Grid item xs={12} sm={6} md={6}>
                                            <CommercialInfoLft
                                              sx={{
                                                borderLeft: "1px solid #ddd",
                                                padding: "3px 0 0 10px",
                                              }}
                                            >
                                              <SmallHeadingInn variant="h6">
                                                Delivery Time
                                              </SmallHeadingInn>
                                              <CommercialCheckValue
                                                sx={{ fontWeight: 400 }}
                                              >
                                                {productDetail?.delivery_time ||
                                                productDetail?.delivery_select ? (
                                                  <div>
                                                    {" "}
                                                    {
                                                      productDetail?.delivery_time
                                                    }{" "}
                                                    {
                                                      productDetail?.delivery_select
                                                    }
                                                  </div>
                                                ) : (
                                                  <Typography
                                                    sx={{ fontSize: 14 }}
                                                  >
                                                    N/A
                                                  </Typography>
                                                )}
                                              </CommercialCheckValue>
                                            </CommercialInfoLft>
                                          </Grid>
                                        </Grid>
                                      ) : (
                                        <Grid container spacing={2}>
                                          <Grid item xs={12} sm={6} md={6}>
                                            <CommercialInfoLft>
                                              <SmallHeadingInn variant="h6">
                                                Order Preparation Time
                                                {/* Production Capacity Text will come in By Order Case */}
                                                {/* Production Capacity */}
                                              </SmallHeadingInn>
                                              <CommercialCheckValue
                                                sx={{ fontWeight: 400 }}
                                              >
                                                {dispatch_in && (
                                                  <>
                                                    {dispatch_in}
                                                    {"   "}
                                                  </>
                                                )}
                                                {dispatch_day && (
                                                  <>{dispatch_day}</>
                                                )}
                                                {!dispatch_in &&
                                                  !dispatch_day && <>N/A</>}
                                              </CommercialCheckValue>
                                            </CommercialInfoLft>
                                          </Grid>

                                          <Grid item xs={12} sm={6} md={6}>
                                            <CommercialInfoLft
                                              sx={{
                                                borderLeft: "1px solid #ddd",
                                                padding: "3px 0 0 10px",
                                              }}
                                            >
                                              <SmallHeadingInn variant="h6">
                                                Delivery Time Period
                                              </SmallHeadingInn>
                                              <CommercialCheckValue
                                                sx={{ fontWeight: 400 }}
                                              >
                                                {delivery_time_value && (
                                                  <>
                                                    {delivery_time_value}
                                                    {"  "}
                                                  </>
                                                )}
                                                {delivery_time_period && (
                                                  <>{delivery_time_period}</>
                                                )}
                                                {!delivery_time_value &&
                                                  !delivery_time_period && (
                                                    <>N/A</>
                                                  )}
                                              </CommercialCheckValue>
                                            </CommercialInfoLft>
                                          </Grid>
                                        </Grid>
                                      )}
                                    </DevideInfoArea>
                                  </CWhiteBox>
                                  <CWhiteBox>
                                    <CommercialHeading>
                                      {productDetail?.availability == "by_order"
                                        ? "Pick-up Destination"
                                        : "Current Existence Place"}
                                    </CommercialHeading>
                                    <DevideInfoArea>
                                      {productDetail?.availability ==
                                      "by_order" ? (
                                        <Grid container spacing={2}>
                                          <Grid item xs={12} sm={6} md={6}>
                                            <CommercialInfoLft>
                                              <SmallHeadingInn variant="h6">
                                                Nearby Airport
                                              </SmallHeadingInn>
                                              <CommercialCheckValue
                                                sx={{ fontWeight: 400 }}
                                              >
                                                {productDetail?.port_
                                                  ? productDetail?.port_
                                                  : "N/A"}
                                              </CommercialCheckValue>
                                            </CommercialInfoLft>
                                          </Grid>

                                          <Grid item xs={12} sm={6} md={6}>
                                            <CommercialInfoLft
                                              sx={{
                                                borderLeft: "1px solid #ddd",
                                                padding: "3px 0 0 10px",
                                              }}
                                            >
                                              <SmallHeadingInn variant="h6">
                                                Nearby Seaport
                                              </SmallHeadingInn>
                                              <CommercialCheckValue
                                                sx={{ fontWeight: 400 }}
                                              >
                                                {productDetail?.sea_
                                                  ? productDetail?.sea_
                                                  : "N/A"}
                                              </CommercialCheckValue>
                                            </CommercialInfoLft>
                                          </Grid>
                                        </Grid>
                                      ) : (
                                        <Grid container spacing={2}>
                                          <Grid item xs={12} sm={6} md={6}>
                                            <CommercialInfoLft>
                                              <SmallHeadingInn variant="h6">
                                                Nearby Airport
                                              </SmallHeadingInn>
                                              <CommercialCheckValue
                                                sx={{ fontWeight: 400 }}
                                              >
                                                {productDetail?.port_
                                                  ? productDetail?.port_
                                                  : "N/A"}
                                              </CommercialCheckValue>
                                            </CommercialInfoLft>
                                          </Grid>

                                          <Grid item xs={12} sm={6} md={6}>
                                            <CommercialInfoLft
                                              sx={{
                                                borderLeft: "1px solid #ddd",
                                                padding: "3px 0 0 10px",
                                              }}
                                            >
                                              <SmallHeadingInn variant="h6">
                                                Nearby Seaport
                                              </SmallHeadingInn>
                                              <CommercialCheckValue
                                                sx={{ fontWeight: 400 }}
                                              >
                                                {productDetail?.sea_
                                                  ? productDetail?.sea_
                                                  : "N/A"}
                                              </CommercialCheckValue>
                                            </CommercialInfoLft>
                                          </Grid>
                                        </Grid>
                                      )}
                                    </DevideInfoArea>
                                  </CWhiteBox>
                                  {(productDetail?.manufacturing_restrictions_country ||
                                    productDetail?.available_restrictions_country) && (
                                    <CWhiteBox>
                                      <CommercialHeading>
                                        Product availability or manufacturing
                                        restrictions
                                      </CommercialHeading>

                                      <CommercialdesP>
                                        {productDetail?.manufacturing_restrictions_status ==
                                          "1" && (
                                          <span>
                                            This product {" "}
                                            {
                                              productDetail?.manufacturing_restrictions_availibility
                                            }{" "}
                                            manufactured for{" "}
                                            {productDetail?.manufacturing_restrictions_country ? (
                                              <strong>
                                                {" "}
                                                {productDetail?.manufacturing_restrictions_country
                                                  .split(",")
                                                  .map((t) => {
                                                    return [
                                                      ...territoryData,
                                                      ...modifiedCountriesList,
                                                    ].find((c) => {
                                                      if (c?.value == t) {
                                                        return c?.value == t;
                                                      } else if (
                                                        c?.region == t
                                                      ) {
                                                        return c?.region == t;
                                                      }
                                                    })?.view;
                                                  })
                                                  ?.join(", ")}
                                                .{" "}
                                              </strong>
                                            ) : (
                                              "N/A"
                                            )}
                                          </span>
                                        )}
                                      </CommercialdesP>
                                      {productDetail?.available_restrictions_status && (
                                        <CommercialdesP>
                                          {productDetail?.available_restrictions_status ==
                                            "1" && (
                                            <span>
                                              This product {" "}
                                              {
                                                productDetail?.available_restrictions_availibility
                                              }{" "}
                                              available to sell in{" "}
                                              {productDetail?.available_restrictions_country ? (
                                                <strong>
                                                  {" "}
                                                  {productDetail?.available_restrictions_country
                                                    .split(",")
                                                    .map((t) => {
                                                      return [
                                                        ...territoryData,
                                                        ...modifiedCountriesList,
                                                      ].find((c) => {
                                                        if (c?.value == t) {
                                                          return c?.value == t;
                                                        } else if (
                                                          c?.region == t
                                                        ) {
                                                          return c?.region == t;
                                                        }
                                                      })?.view;
                                                    })
                                                    ?.join(", ")}
                                                  .{" "}
                                                </strong>
                                              ) : (
                                                "N/A"
                                              )}
                                            </span>
                                          )}
                                        </CommercialdesP>
                                      )}
                                      <IconWithText>
                                        <i className="icon-globe"></i>
                                        <BoldCommonTypography>
                                          Please contact us for shipping
                                          restrictions to your specific
                                          location.
                                        </BoldCommonTypography>
                                      </IconWithText>
                                    </CWhiteBox>
                                  )}
                                </CommercialSectionInfoInner>
                              </CommercialSectionInfoInner>
                            </Grid>
                          </Grid>
                        </div>
                      )}
                    </Box>
                  </TabPanel>
                </Box>
                <Box sx={{ backgroundColor: "#F8F8F8" }}>
                  <TabPanel value={value} index={1}>
                    {showSkleton ? (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height={400}
                      >
                        {/* <CircularProgress /> */}
                      </Box>
                    ) : visitors?.length > 0 ? (
                      <Box
                        style={{
                          height: 400,
                          width: "100%",
                          backgroundColor: "#fff",
                        }}
                      >
                        <DataGridPro
                          getRowId={(row) => row.serialNo}
                          rows={visitors}
                          columns={columns}
                          sx={DataGridStyle}
                          pagination
                          initialState={{
                            pagination: {
                              page: 0,
                              pageSize: 5,
                            },
                          }}
                          components={{ Toolbar: CustomToolbar }}
                        />
                      </Box>
                    ) : (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height={400}
                      >
                        <EmptyPage
                          text="Visited supplier"
                          logo="/assets/images/suppllier.svg"
                          actiontext={false}
                          type="visited"
                        />
                      </Box>
                    )}
                  </TabPanel>
                </Box>
                <TabPanel value={value} index={2}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <EmptyPage
                      text={"Order and Invoice"}
                      onClickHandler={() => {}}
                      logo="/assets/no-invoice.svg"
                      actiontext={false}
                    />
                  </Box>
                </TabPanel>
              </Box>
            </Box>
          </Box>
        ) : (
          <DetailSkeleton />
        )}
      </Mediaquery>
    </>
  );
}
