import React, { useEffect, useMemo, useState } from "react";
import {
  FieldContainer,
  ScrollCol,
  SelectContainer,
  SelectLbl,
  SelectproductFeature,
  SelectProductText,
  ItemSelectRow,
  SelectFormControl,
  QuantityPriceRow,
  PriceColumn,
  BottomFixedPrice,
  StylingDatagrid,
  FlyoutBtn,
  FlyOutButtonArea,
  FlyOutTable,
  EnterQuantityBox,
  FlyoutCloseBtn,
  FlyOutTableButton,
} from "@/components/ProductDetail/style";
import {
  MenuItem,
  Select,
  Typography,
  Button,
  Grid,
  TextField,
  Tabs,
  AvatarGroup,
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setProductConfig } from "@/hooks/productDetailsReducer";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { ConfigTabsData, TabInnData } from "./style";
import ConfigueMoreInformation from "./ConfigueMoreInfomation";
import ConfigueRelatedProducts from "./ConfigueRelatedProducts";
import Carousel from "react-material-ui-carousel";
import CloseIcon from "@mui/icons-material/Close";
import { apiClient, CheckOs, randomStr } from "@/components/common/common";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import CustomiseRequestConfig from "./CustomiseRequestConfig";
import moment from "moment";
import { BASE_URL_CRM, BASE_URL_V2 } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import { getSessionFromCookies } from "@/utils/cookieUtils";
import Swal from "sweetalert2";
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
const ConfigureFlyOut = ({ toggleFlyout }) => {
  const dispatch = useDispatch();
  const { productConfig }: any = useSelector(
    (state: any) => state.productDetail
  );
  const [options, setOptions] = useState<any>([]);
  const { variation_options } = useSelector(
    (state: any) => state.productDetail.detail.data
  );
  const { quotedetails, getQuoteAtachment } = useSelector(
    (state: any) => state.quoteDetails
  );
  const { id } = useSelector((state: any) => state.productDetail.detail.data);
  const [searchData, setSearchData] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [value2, setValue2] = React.useState(0);
  const [loader, setLoader] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [moreInfoPayload, setMoreInfoPayload] = useState(null);
  const [customisePayload, setCustomisePayload] = useState(null);
  const [skelton, setSkeltonData] = useState(false);
  const [quantity, setQuantity] = useState("1");
  let user_id = JSON.parse(localStorage.getItem("userData"))?.id;
  const [selectedValue, setSelectedValue] = useState([]);
  const formattedPrice = isFinite(Number(totalPrice))
    ? Number(totalPrice).toFixed(2)
    : "";
  const [customiseRequest, setCustomiseRequestData] = useState<any>("");
  const ipAddress = localStorage.getItem("ipAddress");
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [relatedlist, setRelatedList] = useState([]);
  useEffect(() => {
    setFilterData([]);
    setValue2(0);
    fetchSingleProductDetails();
  }, []);
  const handleTabChange = (event, newValue) => {
    setValue2(newValue);
  };

  useEffect(() => {
    filterData.map((item) => item.matrix_id);
  }, [filterData]);

  useEffect(() => {
    setOptions(variation_options);
  }, [variation_options]);
  useEffect(() => {
    handleSaveData();
  });
  const handleSaveData = () => {
    const dataToSave = {
      formattedPrice,
      filterData,
      relatedlist,
    };
    sessionStorage.setItem("tabData", JSON.stringify(dataToSave));
  };
  const DropDownHandler = (e, parent, index) => {
    const { name, value } = e.target;
    setSelectedValue((prev) => {
      const existingIndex = prev.findIndex((rev) => rev?.name === name);

      if (existingIndex !== -1) {
        return prev.map((rev, index) =>
          index === existingIndex ? { name: name, value: value } : rev
        );
      }

      return [...prev, { name: name, value: value }];
    });

    const [parentID, childID, itemName] = value.split("$=$");
    let configuration = productConfig.filter((v) => v.parentID !== `${parent}`);
    let data = [
      ...configuration,
      { value: childID, name, parentID, itemName, index },
    ];
    const itemNames = data.map((item) => item.itemName).join(",");

    setSearchData(itemNames);

    dispatch(setProductConfig(data));
  };
  const filterVariations = async () => {
    if (!quantity) {
      toast.error("Please enter Quantity");
      return;
    }
    try {
      setLoader(true);
      const sanitizedSearchData = searchData
      .replace(/^,+/, "")
      .replace(/,+$/, "")
      .replace(/,{2,}/g, ",");
      let response = await apiClient(
        `front/matrix/list?search=${sanitizedSearchData}&product_id=${id}&product_type=configured`,
        "GET"
      );
      if (response.status === 200) {
        const newQuantity = response?.data.map((da) => {
          return { ...da, quantity: quantity };
        });
        setFilterData((prevData) => {
          const newData = [...prevData, ...newQuantity];
          if (
            newData.length !== prevData.length ||
            !newData.every((item, index) => item === prevData[index])
          ) {
            return newData;
          }
          return prevData;
        });
        fetchRelatedProducts();
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  const fetchRelatedProducts = async () => {
    let response = await apiClient(
      `front/quote_related_product?category_list=${customiseRequest?.category_lists}&seller_id=${customiseRequest?.user_id}&product_id=${id}&product_type=${quotedetails?.product_type}`,
      "get"
    );
    if (response.status === 200) {
      setRelatedList(response.data);
    }
  };

 
  const fetchSingleProductDetails = async () => {
    setSkeltonData(true);
    let response = await apiClient("front/single/view", "post", {
      body: { id: id },
    });
    if (response.status === 200) {
      setSkeltonData(true);
      setCustomiseRequestData(response?.data);
    }
  };
  const handleMoreInfoData = (data) => {
    setMoreInfoPayload(data);
  };
  const handleCustomiseRequest = (data) => {
    setCustomisePayload(data);
  };
  const [unique_session_id, setUniqueID] = useState<string>("");
  useEffect(() => {
    if (unique_session_id == "") setUniqueID(getSessionFromCookies());
  }, [unique_session_id]);

  const [tabData, setTabData] = useState(false);
  const SubmitQuotation = async () => {
      let quick_user_id;
        quick_user_id = localStorage?.userData
          ? JSON.parse(localStorage?.userData).id
          : "";
        if (quotedetails?.user_id === quick_user_id) {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "custom-btn cancel-button",
              cancelButton: "custom-btn remove-btn",
            },
            buttonsStyling: false,
          });
          swalWithBootstrapButtons.fire({
            title: "",
            html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot request a quotation <br> for your own products.</span>`,
            icon: undefined,
            showCancelButton: false,
            reverseButtons: true,
            imageUrl: "/assets/minisiteimages/blockquote.webp",
            imageWidth: 80,
            imageAlt: "alt",
          });
          return;
        }
    if (!customisePayload?.userPriceTerms) {
      toast.error("Please select delivery term");
      return;
    } else if (!customisePayload?.portCountry?.view) {
      toast.error("Please select port country");
      return;
    }
    // else if (!customisePayload?.userMessage) {
    //   toast.error("Please enter message");
    //   return;
    // }
    //  else if (!customisePayload?.attachment.length) {
    //   toast.error("Please upload attachment");
    //   return;
    // } else if (!moreInfoPayload?.projectName) {
    //   toast.error("Please enter project name");
    //   return;
    // } else if (!moreInfoPayload?.projectLocation) {
    //   toast.error("Please enter project location");
    //   return;
    // } else if (!moreInfoPayload?.competitor) {
    //   toast.error("Please enter competitor");
    //   return;
    // }
    else if (!moreInfoPayload?.productApplications) {
      toast.error("Please enter product applications");
      return;
    } else if (!moreInfoPayload?.statementOne) {
      toast.error("Please enter product applications");
      return;
    } else if (!moreInfoPayload?.purposeOfInquiry) {
      toast.error("Please enter purpose of Inquiry");
      return;
    }

    const formData = new FormData();
    formData.append(
      "message",
      `${customiseRequest?.seller_name}, We are interested in ( ${customiseRequest?.category})`
    );
    formData.append("country_name", customiseRequest?.countryName);
    formData.append("price_term", customisePayload?.userPriceTerms ?? "");
    formData.append("name", customiseRequest?.category);
    formData.append("industry", customiseRequest?.target_industry ?? "");
    formData.append("enquiry_type", "query");

    formData.append("related_product_ids", JSON.stringify(relatedProduct));
    formData.append("enquiry_user_id", quick_user_id);
    formData.append("product_id", id);
    formData.append("seller_user_id", customiseRequest?.user_id);
    formData.append("unique_session_id", unique_session_id ?? "");
    formData.append("ip", ipAddress ?? "");
    formData.append("quantity", quantity);
    formData.append("selectedOrigin", customisePayload?.countryName ?? "");

    // formData.append(
    //   "selectedOrigin",
    //   customiseRequest?.selectedOrigin &&
    //     customiseRequest?.selectedOrigin?.length > 0
    //     ? customiseRequest?.selectedOrigin?.join(",")
    //     : customiseRequest?.caseData !== undefined &&
    //         JSON?.parse(customiseRequest?.caseData)?.country
    // );

    formData.append("attachment", customisePayload?.attachment);
    formData.append("currency", customiseRequest?.currency_id);
    formData.append("price", formattedPrice);
    formData.append("userPriceTerms", customisePayload?.userPriceTerms);
    formData.append("shipingMethod", customisePayload?.shipingMethod ?? "");
    formData.append("portCountry", customisePayload?.portCountry?.view);
    formData.append("userMessage", customisePayload?.userMessage);
    formData.append(
      "destination_port",
      customisePayload?.destination_port ?? ""
    );
    formData.append(
      "purposeOfInquiry",
      moreInfoPayload?.purposeOfInquiry ?? ""
    );
    formData.append("projectName", moreInfoPayload?.projectName ?? "");
    formData.append("projectLocation", moreInfoPayload?.projectLocation ?? "");
    const cleanedCompetitor =
    String(moreInfoPayload?.competitor || "")
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item)
      .join(", ") || "";
    formData.append("competitor",cleanedCompetitor ?? "");
    formData.append(
      "productApplications",
      moreInfoPayload?.productApplications ?? ""
    );
    formData.append(
      "statementOne",
      JSON.stringify(moreInfoPayload?.statementOne)
    );
    formData.append(
      "statementTwo",
      JSON.stringify(moreInfoPayload?.statementTwo)
    );
    formData.append("system_info", CheckOs());
    formData.append(
      "country_name",
      JSON.parse(localStorage?.userData).mobile_country_code
    );
    formData.append("final_price", `${formattedPrice}`);
    formData.append("product_datetime", moment().format("YYYY-MM-DD hh:mm:ss"));
    formData.append("product_name", customiseRequest?.slug ?? "");
    formData.append("product_image", customiseRequest?.main_image ?? "");
    formData.append("pre_title_name", moreInfoPayload?.projectName ?? "");
    formData.append("type", "configured");
    formData.append(
      "matrix",
      filterData.map((item) => item.matrix_id).join(",")
    );
    
    // formData.append(
    //   "matrix",
    //   filterData.map((item) => item.matrix_id).join(",")
    // );
    formData.append(
      "json_data",
      JSON.stringify({
        seperate: [
          {
            price: formattedPrice,
            total: formattedPrice,
            matrix: filterData,
            quantity: quantity,
            product_name: customiseRequest?.slug ?? "",
            product_id: id,
            type: "configured",
            combinations: null,
          },
        ],
        product_id: id,
        total: formattedPrice,
        unit: "",
        unique_session_id: customiseRequest?.unique_session_id ?? "",
      })
    );
    formData.append("related_products", JSON.stringify(relatedProduct));
    setSubmitLoader(true);
    // let response = await apiClient(
    // "front/getQuery/submit",
    // "post",
    // {
    //   body: formData,
    // },
    // true
    // );
    try {
      const fetchData = await fetch(`${BASE_URL_CRM}/quotation/config-submit`, {
        method: "post",
        body: formData,
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
      });
      const response = await fetchData?.json();

      if (response?.status) {
        setSubmitLoader(false);
        toast.success("Quotation sent successfully");
        setFilterData([]);
        setSearchData("");
        toggleFlyout();
        setSelectedValue([]);
        setTabData(false);
        setQuantity("");
        setValue2(0);
      }
    } catch (error) {
      console.log(error);
    }
    // if (response?.status == 200 || response?.status == true) {
    //   setSubmitLoader(false);
    //   toast.success("Quotation sent successfully");
    //   setFilterData([]);
    //   setSearchData("");
    //   toggleFlyout();
    //   setSelectedValue([]);
    //   setTabData(false);
    //   setQuantity("");
    //   setValue2(0);
    // }
  };

  const handleChange2 = (event: React.SyntheticEvent, newValue2: number) => {
    setValue2(newValue2);
  };

  // const rows = useMemo(() => {
  //   return filterData?.map((item) => {
  //     const dynamicData = {};
  //     // Object.keys(item?.json).forEach((key) => {
  //     //   dynamicData[key] = item.json[key];
  //     // });
  //     return {
  //       id: item.id,
  //       price: item.price,
  //       quantity: item.quantity,
  //       images: item.images,
  //       attribute: item.value,
  //       // ...dynamicData,
  //     };
  //   });
  // }, [filterData]);
  const rows = useMemo(() => {
    return filterData?.map((item) => {
      const totalPrice = item.price * item.quantity;
      return {
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        images: item.images,
        attribute: item.value,
        totalPrice: totalPrice,
      };
    });
  }, [filterData]);
  const generateDynamicColumns = (json) => {
    return Object.keys(json).map((key) => ({
      field: key,
      headerName: key.toUpperCase(),
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const value = params.row[key];

        if (typeof value === "object") {
          return <span>{JSON.stringify(value)}</span>;
        }
        return <>{value}</>;
      },
    }));
  };

  const renderActionButtons = (item) => (
    <div
      key={item.matrix_id}
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "8px",
      }}
    >
      <span>{item.name}</span>
      <span
        onClick={() => handleDelete(item)}
        style={{
          color: "#d7282f",
          cursor: "pointer",
        }}
      >
        <DeleteOutlineRoundedIcon />
      </span>
    </div>
  );

  const staticColumns = [
    {
      field: "attribute",
      headerName: "Selected Variations",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 100,
      flex: 1,
      editable: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => <>{params.row.quantity}</>,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      minWidth: 100,
      flex: 1,
      editable: true,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "images",
      headerName: "Images",
      minWidth: 100,
      flex: 1,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => <ImagesColumn params={params} />,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 100,
      flex: 1,
      sortable: false,
      filterable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const item = params.row;
        return renderActionButtons(item);
      },
    },
  ];
  const columnsData: any = [...staticColumns];
  useEffect(() => {
    const { priceSum, quantitySum } = filterData?.reduce(
      (acc, item) => {
        const price = parseFloat(item.price?.replace(/,/g, "")) || 0;
        const quantity = item.quantity || 0;
        acc.priceSum += price;
        acc.quantitySum += quantity;

        return acc;
      },
      { priceSum: 0, quantitySum: 0 }
    ) || { priceSum: 0, quantitySum: 0 };

    const total = priceSum * quantitySum;

    if (total > 0) {
      setTotalPrice(total);
    } else {
      setTotalPrice(null);
    }
  }, [filterData]);
  const handleRelatedProductData = (data) => {
    setRelatedProduct(data);
  };

  const ImagesColumn = ({ params }: any) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setFilterData([]);
      setSearchData("");
      toggleFlyout();
      setSelectedValue([]);
      setTabData(false);
      setQuantity("");
      setValue2(0), setOpen(false);
    };
    const imageUrl = params.value;
    return (
      <>
        {imageUrl ? (
          <AvatarGroup
            max={3}
            // onClick={handleOpen}
            sx={{
              cursor: "pointer",
              "& .MuiAvatar-circular": {
                width: "30px",
                height: "30px",
              },
            }}
          >
            <Avatar src={imageUrl} alt="Image" />
          </AvatarGroup>
        ) : (
          "N/A"
        )}

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
                padding: 0,
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <Carousel>
              {params?.images?.map((image: any, index: number) => (
                <img
                  key={index}
                  src={image.source}
                  alt={`Image ${index}`}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              ))}
            </Carousel>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const handleDelete = (id) => {
    setFilterData((prevData) =>
      prevData.filter((item) => item.matrix_id !== id?.id)
    );
  };

  return (
    <>
      {options?.length > 0 && (
        <FieldContainer>
          {
            <>
              <SelectproductFeature>
                <ItemSelectRow className="flyouthederr">
                  <SelectProductText>
                    Select Product Features:{" "}
                    <span className="totalvariation">
                      Total variations:{" "}
                      <span className="itemcount">{filterData.length}</span>
                    </span>
                  </SelectProductText>
                  <CancelOutlinedIcon
                    sx={{ cursor: "pointer", "&:hover": { color: "#d7282f" } }}
                    onClick={() => {
                      toggleFlyout();
                      setFilterData([]);
                      
                      setSelectedValue([]);
                      setTabData(false);
                      setQuantity("");
                      setValue2(0);
                    }}
                  />
                </ItemSelectRow>
                <Box sx={{ padding: "1rem" }}>
                  <ScrollCol>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} md={8} lg={8}>
                        <Grid container spacing={1}>
                          {options?.map((val, i) => {
                            let index = productConfig.findIndex(
                              (v) => v.parentID == val.id
                            );
                            let value = index >= 0 ? productConfig[index] : "";
                            return (
                              <>
                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                  <SelectContainer
                                    className={value ? "active" : ""}
                                  >
                                    <SelectLbl>{val.name}</SelectLbl>
                                    <SelectFormControl size="small" fullWidth>
                                      <Select
                                        displayEmpty
                                        id="demo-simple-configure"
                                        size="small"
                                        value={
                                          selectedValue?.find(
                                            (item) => item.name === val.name
                                          )?.value || ""
                                        }
                                        name={val.name}
                                        onChange={(e) =>
                                          DropDownHandler(e, val.id, i)
                                        }
                                        inputProps={{
                                          "aria-label": "Without label",
                                        }}
                                        IconComponent={
                                          KeyboardArrowDownOutlinedIcon
                                        }
                                      >
                                        <MenuItem value="">
                                          Select {val.name}
                                        </MenuItem>

                                        {val.parents.map((item) => (
                                          <MenuItem
                                            key={item.id}
                                            value={`${val.id}$=$${item.id}$=$${item.name}`}
                                          >
                                            {item.name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </SelectFormControl>
                                  </SelectContainer>
                                </Grid>
                              </>
                            );
                          })}
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <SelectLbl>Quantity</SelectLbl>
                        <EnterQuantityBox>
                          <TextField
                                                     id="outlined-size-small"
                                                     size="small"
                                                     type="number"
                                                     placeholder="Enter Quantity"
                                                     value={quantity}
                                                     onChange={(e) => {
                                                       let newValue = e.target.value;
                         
                                                       if (
                                                         newValue.startsWith("0") &&
                                                         newValue.length > 1
                                                       ) {
                                                         newValue = newValue.slice(1);
                                                       }
                         
                                                       if (newValue === "" || Number(newValue) < 1) {
                                                         setQuantity("");
                                                       } else if (Number(newValue) > 100000000) {
                                                         setQuantity("100000000");
                                                       } else {
                                                         setQuantity(newValue);
                                                       }
                                                     }}
                                                     inputProps={{
                                                       inputMode: "numeric",
                                                       pattern: "[1-9]*",
                                                     }}
                                                   />
                        </EnterQuantityBox>
                      </Grid>
                    </Grid>
                    <FlyOutButtonArea>
                      <FlyoutBtn
                        onClick={() => {
                          if (searchData) {
                            filterVariations();
                          } else {
                            toast.error("Please select variations");
                            return;
                          }
                        }}
                        variant="outlined"
                        size="small"
                      >
                        {loader ? (
                          <ThreeDots
                            height="18"
                            width="40"
                            radius="9"
                            color="white"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            visible={true}
                          />
                        ) : (
                          "Filter Variations"
                        )}
                      </FlyoutBtn>
                    </FlyOutButtonArea>
                  </ScrollCol>
                  {filterData?.length > 0 && (
                    <>
                      <FlyOutTable sx={{ height: 400, width: "100%" }}>
                        <Typography variant="h3">
                          Selected Variations
                        </Typography>
                        <DataGridPro
                          rows={rows}
                          columns={columnsData}
                          pageSize={5}
                          sx={StylingDatagrid}
                          rowHeight={32}
                          autoHeight
                          loading={rows.length === 0}
                        />
                      </FlyOutTable>

                      <FlyOutTableButton>
                        <FlyoutCloseBtn
                          onClick={() => {
                            if (tabData) {
                              setTabData(false);
                            } else {
                              setFilterData([]);
                              setSearchData("");
                              toggleFlyout();
                              setSelectedValue([]);
                              setTabData(false);
                              setQuantity("");
                              setValue2(0);
                            }
                          }}
                          variant="outlined"
                          size="small"
                        >
                          Close
                        </FlyoutCloseBtn>
                        {/* <FlyoutBtn
                          onClick={() => {
                            fetchSingleProductDetails(), setTabData(true);
                          }}
                          variant="outlined"
                          size="small"
                        >
                          Proceed To Get A Quote
                        </FlyoutBtn> */}
                      </FlyOutTableButton>
                    </>
                  )}
                  {tabData && (
                    <>
                      <ConfigTabsData sx={{ width: "100%" }}>
                        <Box>
                          <Tabs
                            value={value2}
                            onChange={handleChange2}
                            aria-label="basic tabs example"
                          >
                            <Tab
                              label="Customize your Request"
                              {...a11yProps(0)}
                            />
                            <Tab label="More Information" {...a11yProps(1)} />
                            <Tab label="Related products" {...a11yProps(2)} />
                          </Tabs>
                        </Box>
                        <CustomTabPanel value={value2} index={0}>
                          <CustomiseRequestConfig
                            id={id}
                            totalPrice={formattedPrice}
                            filterData={filterData}
                            sendDataToParent={handleCustomiseRequest}
                            tabData={customisePayload}
                          />
                        </CustomTabPanel>

                        {/* Tab 2 */}
                        <CustomTabPanel value={value2} index={1}>
                          <TabInnData>
                            <ConfigueMoreInformation
                              sendDataToParent={handleMoreInfoData}
                              totalPrice={formattedPrice}
                              tabData={moreInfoPayload}
                            />
                          </TabInnData>
                        </CustomTabPanel>
                        <CustomTabPanel value={value2} index={2}>
                          <TabInnData>
                            <ConfigueRelatedProducts
                              totalPrice={formattedPrice}
                              id={id}
                              onSendRelatedData={handleRelatedProductData}
                              relatedlist={relatedlist}
                              fetchRelatedProducts={fetchRelatedProducts}
                            />
                          </TabInnData>
                        </CustomTabPanel>
                      </ConfigTabsData>
                      <BottomFixedPrice>
                        <QuantityPriceRow className="fixed-priceBottom">
                          <PriceColumn>
                            <Typography>
                              {" "}
                              <span className="BoldColor">
                                US${formattedPrice}
                              </span>
                            </Typography>
                          </PriceColumn>
                        </QuantityPriceRow>
                      </BottomFixedPrice>
                    </>
                  )}
                </Box>
              </SelectproductFeature>
              {/* {tabData && filterData.length > 0 && ( */}
              <FlyOutButtonArea>
                <FlyoutBtn
                  onClick={() => {
                    SubmitQuotation();
                  }}
                  variant="outlined"
                  size="small"
                >
                  {submitLoader ? (
                    <ThreeDots
                      height="18"
                      width="40"
                      radius="9"
                      color="white"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      visible={true}
                    />
                  ) : (
                    "Submit"
                  )}
                </FlyoutBtn>
              </FlyOutButtonArea>
              {/* )} */}
            </>
          }
        </FieldContainer>
      )}
    </>
  );
};
export default ConfigureFlyOut;
