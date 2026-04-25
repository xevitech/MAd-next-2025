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
  StylingDatagrid,
  FlyoutBtn,
  FlyOutButtonArea,
  FlyOutTable,
  EnterQuantityBox,
  FlyoutCloseBtn,
  FlyOutTableButton,
  EmptyFlyout,
} from "@/components/ProductDetail/style";
import * as Yup from "yup";
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
  Link,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setProductConfig } from "@/hooks/productDetailsReducer";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { DataGridPro, GridColumns } from "@mui/x-data-grid-pro";
import {
  FooterBtn,
  LoginModal,
  TabsData,
  UploadImgView,
  ZoomBox,
} from "./style";
import ConfigueRelatedProducts from "./ConfigueRelatedProducts";
import Carousel from "react-material-ui-carousel";
import CloseIcon from "@mui/icons-material/Close";
import {
  apiClient,
  CheckOs,
  CurrencySymbol,
  randomStr,
} from "@/components/common/common";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import moment from "moment";
import { BASE_URL_CRM, BASE_URL_V2 } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import MoreInfomation from "./NewQueryModal/MoreInfomation";
import { useFormik } from "formik";
import CustomizeRequestConfigCaase from "./NewQueryModal/CustomizeRequestConfig";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import DescriptionIcon from "@mui/icons-material/Description";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGridStyle } from "@/components/common/commonStyle";
import { UploadImgBox } from "@/components/CompanySettings/CompanyDetail/Certificates/style";
import { FieldBorder } from "@/components/CompanySettings/CompanyDetail/commonStyles";
import { FileUpload } from "@/components/common/uploadFile";
import { data } from "jquery";
import {
  getSessionFromCookies,
  getTokenFromCookies,
} from "@/utils/cookieUtils";
import { Token } from "@mui/icons-material";
import { SupplierContainer } from "../Style";
import Login from "@/components/ProductDetail/ProductComponents/Modal/Login";
import QuickSignup from "@/components/auth/quickSignup/QuickSignup";
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
const ConfigueQuoteModal = ({ toggleFlyout }) => {
  const { productConfig }: any = useSelector(
    (state: any) => state.productDetail
  );
  const dispatch = useDispatch();

  const [options, setOptions] = useState<any>([]);
  const { variation_options, product_type } = useSelector(
    (state: any) => state.productDetail.detail.data
  );
  const { quotedetails, getQuoteAtachment } = useSelector(
    (state: any) => state.quoteDetails
  );

  const { id } = useSelector((state: any) => state.productDetail.detail.data);
  const [searchData, setSearchData] = useState("");
  const [filterData, setFilterData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value2, setValue2] = React.useState(0);
  const [loader, setLoader] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
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
  const [priceTermList, setPriceTermList] = useState<any>([]);
  const [attachments, setAttachments] = useState<any>([]);
  const [fileData, setFileData] = useState<any>([]);
  const { currency_id } = useSelector(
    (state: any) => state.productDetail.detail.data
  );
  const [toggleSignUp, setToggleSignup] = useState<boolean>(true);
  const [hideLogin, setHideLogin] = useState<boolean>(false);

  // const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [sendQueryButtonActive, setSendQueryButtonActive] =
    useState<boolean>(false);
  const importData = (event) => {
    const files = event.target.files;

    if (files.length > 3) {
      // You can set an error or warning here
      toast.error("Please upload a maximum of 3 files");
      // formik.setFieldError("images", "Please upload a maximum of 3 files");
      return;
    } else {
      // Clear previous errors and update formik field
      // formik.setFieldError("images", "");
      // formik.setFieldValue("images", [fileData, ...files]);
      setFileData([...fileData, ...files]);
    }

    // If you need to handle attachments in a separate state like the `setAttachments` function:
    if (files.length > 0) {
      setAttachments((prev) => [...prev, ...files]);
    }
  };
  useEffect(() => {
    setFilterData([]);
    setValue2(0);
    fetchSingleProductDetails();
  }, []);
  const handleTabChange = (event, newValue) => {
    setValue2(newValue);
  };
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    filterData.map((item) => item.matrix_id);
  }, [filterData]);

  useEffect(() => {
    setOptions(variation_options);
  }, [variation_options]);
  useEffect(() => {
    handleSaveData();
  });
  const handleChange = (event: any, newValue: any) => setValue(newValue);

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
      const currency = localStorage.getItem("currency");
      let response = await apiClient(
        `front/matrix/list?search=${sanitizedSearchData}&product_id=${id}&product_type=${quotedetails?.product_type}&currency=${currency}`,
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
  const HandleClose = () => {
    setHideLogin(true);
    setSendQueryButtonActive(false);
  };
  const fetchRelatedProducts = async () => {
    let response = await apiClient(
      `front/quote_related_product?category_list=${customiseRequest?.category_lists}&seller_id=${customiseRequest?.user_id}&product_id=${id}&product_type=${product_type}`,
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
  const validation = Yup.object().shape({});
  let formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    validateOnChange: false,
    initialValues: {},
    onSubmit: (values) => {},
  });

  useEffect(() => {
    handleQuote();
  }, []);
  const handleQuote = async () => {
    let response = await apiClient("front/single/view", "post", {
      body: { id: id },
    });
    if (response.status === 200) {
      setCustomiseRequestData(response?.data);
    }
  };
  const [unique_session_id, setUniqueID] = useState<string>("");
  interface UserData {
    id: number;
    type: string;
    name: string;
    email: string;
  }

  const userDataStr = localStorage.getItem("userData");

  let userData: UserData | null = null;

  if (userDataStr) {
    try {
      userData = JSON.parse(userDataStr);
    } catch (e) {}
  }
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
    const token = getTokenFromCookies();
    const { customize_request, more_information }: any = formik.values;
    if (!customize_request?.userPriceTerms) {
      toast.error("Please select delivery term");
      return;
    } else if (
      !["FCA", "FAS", "FOB", "EXW"].includes(
        customize_request?.userPriceTerms
      ) &&
      !customize_request?.portCountry
    ) {
      toast.error("Please select port country");
      return;
    }
    // else if (!customize_request?.userMessage) {
    //   toast.error("Please enter message");
    //   return;
    // } else if (!fileData.length) {
    //   toast.error("Please upload attachment");
    //   return;
    // }
    else if (!more_information?.purposeOfInquiry) {
      if (value == 0) {
        toast.error(
          "Please select more information tab to select purpose of inquiry"
        );
        return;
      } else {
        toast.error("Please select purpose of inquiry");
        return;
      }
    }
    // else if (!more_information?.projectName) {
    //   toast.error("Please enter project name");
    //   return;
    // } else if (!more_information?.projectLocation) {
    //   toast.error("Please enter project location");
    //   return;
    // }
    // if (more_information?.competitor[0] === "") {
    //   toast.error("Please enter competitor");
    //   return;
    // }
    else if (!more_information?.productApplications) {
      toast.error("Please enter product applications");
      return;
    } else if (!more_information?.statementOne) {
      toast.error("Please enter product applications");
      return;
    } else if (!more_information?.purposeOfInquiry) {
      if (value == 0) {
        toast.error(
          "Please select more information tab to select purpose of inquiry"
        );
        return;
      } else {
        toast.error("Please select purpose of inquiry");
        return;
      }
    }

    if (!token) {
      setSendQueryButtonActive(true);
      return;
    }
    const formData = new FormData();
    formData.append(
      "message",
      `${customiseRequest?.seller_name}, We are interested in ( ${customiseRequest?.category})`
    );
    formData.append("country_name", customize_request?.countryName);
    formData.append("price_term", customize_request?.userPriceTerms ?? "");
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
    formData.append("selectedOrigin", customize_request?.countryName ?? "");
    // formData.append(
    //   "selectedOrigin",
    //   customiseRequest?.selectedOrigin &&
    //     customiseRequest.selectedOrigin.length > 0
    //     ? customiseRequest.selectedOrigin.join(",")
    //     : customiseRequest?.caseData
    //     ? JSON.parse(customiseRequest.caseData).country
    //     : null
    // );

    formData.append("attachment", fileData);
    formData.append("currency", customiseRequest?.currency_id);
    formData.append("price", formattedPrice);
    formData.append("user_price_terms", customize_request?.userPriceTerms);
    formData.append("shiping_method", customize_request?.shipingMethod ?? "");
    formData.append("port_country_id", customize_request?.portCountry);
    formData.append("user_message", customize_request?.userMessage);
    formData.append(
      "destination_port_id",
      customize_request?.destination_port ?? ""
    );
    formData.append(
      "purpose_of_inquiry",
      more_information?.purposeOfInquiry ?? ""
    );
    formData.append("project_name", more_information?.projectName ?? "");
    formData.append(
      "project_location",
      more_information?.projectLocation ?? ""
    );
    // formData.append("competitor", more_information?.competitor ?? "");
    formData.append(
      "competitor",

      more_information?.competitor === ","
        ? ""
        : more_information?.competitor ?? ""
    );

    formData.append(
      "product_application",
      more_information?.productApplications ?? ""
    );
    formData.append(
      "statement_one",
      JSON.stringify(more_information?.statementOne)
    );
    formData.append(
      "statement_two",
      JSON.stringify(more_information?.statementTwo)
    );
    formData.append("system_info", CheckOs());
    formData.append("selectedOrigin", customize_request?.countryName ?? "");
    // formData.append(
    //   "selectedOrigin",
    //   customiseRequest?.selectedOrigin &&
    //     customiseRequest.selectedOrigin.length > 0
    //     ? customiseRequest.selectedOrigin.join(",")
    //     : customiseRequest?.caseData
    //     ? JSON.parse(customiseRequest.caseData).country
    //     : null
    // );
    formData.append("product_features", JSON.stringify(rowSelection));
    formData.append("final_price", `${formattedPrice}`);
    formData.append("product_datetime", moment().format("YYYY-MM-DD hh:mm:ss"));
    formData.append("product_name", customiseRequest?.slug ?? "");
    formData.append("product_image", customiseRequest?.main_image ?? "");
    formData.append("pre_title_name", more_information?.projectName ?? "");
    formData.append("type", "configured");
    formData.append("matrix", JSON.stringify(rowSelection));
    // formData.append("matrix", filterData);
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
    try {
      const fetchData = await fetch(`${BASE_URL_CRM}quotation/config-submit`, {
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
        setAttachments([]);
        setTabData(false);
        setQuantity("1");
        setValue2(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const rows = useMemo(() => {
    return filterData?.map((item) => {
      const totalPrice = item.price * item.quantity;
      return {
        id: item.id,
        price: `${CurrencySymbol(currency_id)}${item.price}`,
        quantity: item.quantity,
        images: item.images,
        attribute: item.value,
        totalPrice: `${CurrencySymbol(currency_id)}${totalPrice}`,
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
        <DeleteOutlineRoundedIcon sx={{ fontSize: "18px" }} />
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
  const [rowSelection, setRowSelection] = useState([]);
  const handleSelectionChange = (newSelection) => {
    const selectedIDs = newSelection;
    const selectedRows = filterData.filter((row) =>
      selectedIDs.includes(row.id)
    );
    setRowSelection(selectedRows);
  };
  const handleClick = async () => {
    setIsLoading(true);
    await fetchSingleProductDetails();
    setTabData(true);
    setIsLoading(false);
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
      setQuantity("1");
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
      <LoginModal className="Login-modal">
        <ZoomBox className="Zoom-box">
          {sendQueryButtonActive && (
            <SupplierContainer
              className="New-user"
              sx={{
                "@media screen and (max-width: 767px)": {
                  display: "block",
                },
              }}
            >
              {toggleSignUp ? (
                <QuickSignup
                  text="Quick Signup"
                  setHideLogin={HandleClose}
                  display="block"
                  setToggleSignup={setToggleSignup}
                  SubmitQuotation={SubmitQuotation}
                  buttonName="Signup & Add to Cart"
                  type={"signup"}
                />
              ) : (
                <Login
                  setToggleSignup={setToggleSignup}
                  setHideLogin={HandleClose}
                  SubmitQuotation={SubmitQuotation}
                  buttonName="Login & Add to Cart"
                />
              )}
            </SupplierContainer>
          )}
        </ZoomBox>
      </LoginModal>
      {options?.length > 0 && (
        <FieldContainer>
          {
            <>
              <SelectproductFeature>
                <ItemSelectRow className="flyouthederr">
                  <SelectProductText>
                    Select Product Features:{" "}
                    {filterData?.length > 0 && (
                      <span className="totalvariation">
                        Total variations:{" "}
                        <span className="itemcount">{filterData.length}</span>
                      </span>
                    )}
                  </SelectProductText>
                  <CancelOutlinedIcon
                    sx={{ cursor: "pointer", "&:hover": { color: "#d7282f" } }}
                    onClick={() => {
                      toggleFlyout();
                      setAttachments([]);
                      setFilterData([]);
                      setSelectedValue([]);
                      setTabData(false);
                      setQuantity("1");
                      setValue2(0);
                    }}
                  />
                </ItemSelectRow>
                <Box sx={{ padding: "1rem" }}>
                  <ScrollCol>
                    <Grid container spacing={1}>
                      {/* <Grid item xs={12} sm={12} md={8} lg={8}> */}
                      {/* <Grid container spacing={1}> */}
                      {options?.map((val, i) => {
                        let index = productConfig.findIndex(
                          (v) => v.parentID == val.id
                        );
                        let value = index >= 0 ? productConfig[index] : "";
                        return (
                          <>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
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
                      {/* </Grid> */}
                      {/* </Grid> */}
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
                      <FlyOutTable sx={{ height: 250, width: "100%" }}>
                        <Typography variant="h3">
                          Selected Variations
                        </Typography>
                        <DataGridPro
                          rows={rows}
                          columns={columnsData}
                          pageSize={6}
                          sx={DataGridStyle}
                          rowHeight={38}
                          pagination
                          checkboxSelection
                          onSelectionModelChange={handleSelectionChange}
                        />
                        {/* <DataGridPro
                          rows={rows}
                          columns={columnsData}
                          pageSize={5}
                          // sx={StylingDatagrid}
                          sx={DataGridStyle}
                          rowHeight={38}
                          loading={rows.length === 0}
                        /> */}
                      </FlyOutTable>

                      <FlyOutTableButton className="configFlyout">
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
                          className={
                            rowSelection.length === 0 ? "ConfigQuote" : ""
                          }
                          onClick={() => {
                            fetchSingleProductDetails(), setTabData(true);
                          }}
                          variant="outlined"
                          size="small"
                        >
                          Proceed To Get A Quote
                        </FlyoutBtn> */}
                        <FlyoutBtn
                          className={
                            rowSelection.length === 0 ? "ConfigQuote" : ""
                          }
                          onClick={handleClick}
                          variant="outlined"
                          disabled={rowSelection.length === 0}
                          size="small"
                        >
                          {isLoading ? (
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
                            "Proceed To Get A Quote"
                          )}
                        </FlyoutBtn>
                      </FlyOutTableButton>
                    </>
                  )}
                  {tabData && (
                    <TabsData>
                      <Box sx={{ height: "38px" }}>
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          aria-label="basic tabs example"
                          variant="scrollable"
                          TabIndicatorProps={{ style: { display: "none" } }}
                        >
                          <Tab
                            iconPosition="start"
                            label="Customize your Request"
                            disableRipple
                          />
                          <Tab
                            iconPosition="end"
                            label="More Information"
                            disableRipple
                          />
                          <Tab
                            iconPosition="end"
                            label="Related Products"
                            disableRipple
                          />
                        </Tabs>
                      </Box>

                      <Box
                        sx={{
                          display: value == 0 ? "block" : "none",
                          border: "1px solid #DDDDDD",
                          // padding: "16px",
                        }}
                      >
                        <CustomizeRequestConfigCaase
                          formik={formik}
                          customiseRequest={customiseRequest}
                          data={data}
                        />

                        <Grid item md={12}>
                          <Box
                            sx={{
                              padding: "0 16px 16px",
                              "& textarea": {
                                borderRadius: "4px",
                                border: "1px solid #BBBBBB",
                                outline: "none",
                                padding: "12px",
                                width: "100%",
                              },
                              "& label": {
                                fontSize: "13px",
                                fontWeight: "600",
                                marginBottom: "12px",
                                marginTop: "4px",
                              },
                            }}
                          >
                            <label>
                              If you have any relevant documents or files to
                              share with the supplier.
                            </label>
                            {/* <Box
                              sx={{
                                color: "#DA020A",
                                fontSize: "14px",
                                display: "flex",
                                "& .MuiTypography-root": {
                                  color: "#DA020A",
                                  textDecoration: "none",
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  "&:hover": {
                                    color: "#c10007",
                                  },
                                  "& i": {
                                    marginRight: "4px",
                                    fontSize: "16px",
                                  },
                                },
                              }}
                            >
                              <Link
                                component="label"
                                sx={{ margin: "5px 0 0", cursor: "pointer" }}
                              >
                                <i className="icon-attachment"></i> Add
                                Attachment
                                <input
                                  type="file"
                                  multiple
                                  hidden
                                  onChange={importData}
                                />
                              </Link>
                            </Box> */}
                            <UploadImgBox>
                              <FieldBorder
                                style={{
                                  position: "relative",
                                  // border: `${errors.images ? "1px solid #d32f2f" : ""}`,
                                }}
                              >
                                <FileUpload
                                  fileType={
                                    ".pdf,.doc,.docx,.png,.jpeg,.jpg,.xls,.xlsx"
                                  }
                                  name="transaction_documents"
                                  files={fileData}
                                  error={(error) =>
                                    formik.setFieldError("images", error)
                                  }
                                  updateFiles={(e) => {
                                    if (e?.length > 3) {
                                      toast.error(
                                        "Please upload maximum 3 photos"
                                      );
                                      // formik.setFieldError(
                                      //   "images",
                                      //   "Please upload maximum 3 photos"
                                      // );
                                      return;
                                    } else {
                                      setFileData([...e]);
                                      // formik.setFieldError("images", "");
                                      // formik.setFieldValue("images", [...e]);
                                    }
                                  }}
                                  removedFile={
                                    (deletedID) => setFileData(deletedID)
                                    // formik.setFieldValue(
                                    //   "deleted_images_ids",
                                    //   deletedID
                                    // )
                                  }
                                />
                                {/* {errors.images ? (
                          <span
                            style={{
                              color: "#d7282f",
                              position: "absolute",
                              bottom: "-16px",
                              fontSize: "10px",
                              marginLeft: "-3px",
                            }}
                          >
                            <span>
                              <img
                                src="/assets/error-outline-red.svg"
                                alt=""
                                style={{ width: "8px", height: "8px" }}
                              />
                            </span>{" "}
                            {errors.images}
                          </span>
                        ) : (
                          ""
                        )} */}
                              </FieldBorder>
                            </UploadImgBox>
                            {/* <UploadImgView>
                              <DescriptionIcon className="desicon" />
                              <Typography variant="body2">
                                FileNameLightTooltipLightTooltip.jpg
                              </Typography>  
                              <VisibilityIcon className="visibilityIcon" />
                            </UploadImgView> */}

                            <Box
                              display="flex"
                              alignItems="center"
                              pt={1.5}
                              gap="16px"
                            >
                              {attachments.length > 0 &&
                                attachments.map((v, index) => (
                                  <Box
                                    sx={{
                                      position: "relative",
                                      display: "flex",
                                      "& .MuiSvgIcon-root": {
                                        position: "absolute",
                                        right: "-8px",
                                        top: "-8px",
                                        fontSize: "18px",
                                        background: "#ffffff",
                                        borderRadius: "100%",
                                        "&:hover": {
                                          color: "#DA020A",
                                        },
                                      },
                                    }}
                                    key={v.name ?? `attachment${index + 1}`}
                                  >
                                    <CancelOutlinedIcon
                                      sx={{
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        setAttachments((prev) => {
                                          const list = [...prev];
                                          list.splice(index, 1);
                                          return list;
                                        });
                                      }}
                                    />
                                    <Box
                                      sx={{
                                        width: "50px",
                                        height: "50px",
                                        padding: "5px",
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                      }}
                                    >
                                      <img
                                        src={URL.createObjectURL(v)}
                                        alt={`attachment-${index}`}
                                        width={60}
                                        height={60}
                                      />
                                    </Box>
                                  </Box>
                                ))}
                            </Box>
                          </Box>
                        </Grid>
                      </Box>
                      <Box
                        sx={{
                          display: value == 1 ? "block" : "none",
                          border: "1px solid #DDDDDD",
                          padding: "16px",
                        }}
                      >
                        <MoreInfomation formik={formik} />
                      </Box>
                      <Box
                        sx={{
                          display: value == 2 ? "block" : "none",
                          border: "1px solid #DDDDDD",
                          padding: "16px",
                        }}
                      >
                        <ConfigueRelatedProducts
                          totalPrice={formattedPrice}
                          id={id}
                          onSendRelatedData={handleRelatedProductData}
                          relatedlist={relatedlist}
                          fetchRelatedProducts={fetchRelatedProducts}
                        />
                      </Box>
                    </TabsData>
                  )}
                </Box>
              </SelectproductFeature>
              {!filterData.length && (
                <EmptyFlyout>
                  <img src="/assets/images/pdpflyout.png" alt="" />
                  <Box className="Textarea">
                    <Typography className="emptyHeading">
                      Select Product Features
                    </Typography>
                    <Typography className="emptySubHeading">
                      Select the desired specifications for product and you can
                      view the price or images related to the particular
                      configuration.
                    </Typography>
                  </Box>
                </EmptyFlyout>
              )}
              {tabData && (
                <FooterBtn>
                  <Button
                    className="greyfooterbtn"
                    variant="outlined"
                    sx={{
                      marginRight: "10px",
                      color: "#a9a9a9",
                      border: "1px solid #a9a9a9",
                      "&:hover": {
                        color: "#707070",
                        border: "1px solid #707070",
                      },
                    }}
                    onClick={() => {
                      toggleFlyout(), setFilterData([]);
                      setSearchData("");
                      toggleFlyout();
                      setSelectedValue([]);
                      setTabData(false);
                      setQuantity("");
                      setValue2(0),
                        setFilterData([]),
                        setTabData(false),
                        setQuantity("1");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="redfooterbtn"
                    variant="contained"
                    color="error"
                    onClick={SubmitQuotation}
                    type="submit"
                    disabled={submitLoader}
                  >
                    {submitLoader ? (
                      <ThreeDots
                        height="35"
                        width="40"
                        radius="9"
                        color="#d7282f"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                      />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </FooterBtn>
              )}
            </>
          }
        </FieldContainer>
      )}
    </>
  );
};
export default ConfigueQuoteModal;
