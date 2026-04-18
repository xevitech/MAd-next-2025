import * as React from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import {
  AccordionContent,
  AddSpecification,
  AdditionalDetail,
  AdditionalTitle,
  AmountValue,
  BoldCell,
  BoxAccordianInner,
  BrandBoxStyle,
  ButtonActionInfo,
  ButtonByOrder,
  ButtonQuantity,
  ButtonSimple,
  CancelButton,
  CategoryName,
  ColorBoxValue,
  CountQty,
  CountryChip,
  CountryName,
  CrmNoDetailFound,
  CrmNoDetailFoundInner,
  CustomInfoTitle,
  CustomInfoValue,
  CustomInfoValue2,
  CustomSelectedChip,
  CustomizeInfoInn,
  CustomizeInfosection,
  DataProductTypeData1,
  DataProductTypeInner,
  DateAndTime,
  DestinationPort,
  DestinationPortInn,
  DetailTopButtons,
  DialogProductInfo,
  EDetailButtons,
  EditDrawerPanel,
  EditModeProductContent,
  EditModeProductTitle,
  EditPopupContent,
  EditProductTable,
  EditSwipeableDrawerStyle,
  EnquiryAddproduct,
  EnquiryDetailData,
  EnquiryDetailSearch,
  EnquiryDetailSearchOuter,
  ExpandedList,
  FeatureOpt,
  GrandTotalRow,
  GreenboxValue,
  GreenboxValuesmall,
  GreyBoxInfo,
  HeadingInfo,
  ImageProduct,
  InnerOpt,
  LocationBox,
  LocationDiv,
  MultipleButton,
  NoProductList,
  OutLinedButton,
  OuterContentAccor,
  OverViewHeading,
  OverViewInfo,
  OverViewInfoP,
  OverViewSection,
  OverViewSection2,
  OverinfoLabel,
  OverinfoValue,
  PTypeImage,
  PriceQuoteColumn,
  PriceQuoteInfo,
  PriceTermVlue,
  ProDuctTypeRow,
  ProductBgInfo,
  ProductBoxLeft,
  ProductBoxRight,
  ProductDetailtable,
  ProductEnquiryData,
  ProductFeatureSection,
  ProductID,
  ProductIDSection,
  ProductImageBox,
  ProductInnerInfo,
  ProductNameBox,
  ProductRow,
  ProductTitle,
  ProductTypeOption,
  QtyContainer,
  QuantityBox,
  RProductLabel,
  RedboxValue,
  RelatedLabel,
  RightSection,
  SearchWithButton,
  SimpleQuantityCompo,
  SpecificationCol,
  SpecificationHeading,
  SpecificationScrollBox,
  StyledTable,
  TopData,
  TotalProductBox,
  TotalProductCount,
  UnitPrice,
  UnitPriceBox,
  UnitPriceContainer,
  UnitPriceValue,
} from "../style";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import {
  DataGridStyle,
  DataGridStyleIcon,
  SearchCommon,
  SmallBlackOutineBtn,
  SmallFilledBtn,
  SmallOutineBtn,
  SmallRedOutineBtn,
  StyledBootstrapDialog,
} from "../commonStyle";
import { DataGridPro } from "@mui/x-data-grid-pro";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Image from "next/image";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { createHistory, getEnquiryDetails } from "@/hooks/UseCreateFormData";
import { fetchAllProductsList } from "@/hooks/UseProductListContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import _debounce from "lodash/debounce";
import debounce from "lodash/debounce";
import { Navigate, ReplaceSpaces, apiClient } from "@/components/common/common";
import moment from "moment";
import { setSearchName } from "@/hooks/miniSite";
import EditableTable from "@/components/ProductDetail/ProductComponents/Modal/EditableTable";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import EnquiryList from "../Skeletons/EnquiryList";
import SelectOptions from "@/components/ProductDetail/ProductComponents/Modal/SelectOptions";
import { setRelatedProductSpecs } from "@/hooks/quoteHooks";
import EnquiryPopUp from "./EnquiryPopUp";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { LOCAL_PUBLIC_URL } from "@/utils/staticValues";
type Anchor = "top" | "left" | "bottom" | "right";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "5px",
  margin: "0 0 10px",
  // "&:not(:last-child)": { borderBottom: 0 },
  "&:before": { display: "none" },
}));
const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  background: "#fff",
  color: "#4A4A4A",
  borderRadius: "5px",
  fontSize: 16,
  padding: "0",
  // flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    // marginLeft: theme.spacing(1),
    justifyContent: "space-between",
    margin: "0",
  },
  "& .MuiTypography-root": { fontWeight: 600, color: "#4A4A4A" },
  "& .MuiAccordionSummary-expandIconWrapper": {
    margin: "0 10px",
    "& svg": {
      padding: "5px",
      width: "25px",
      height: "25px",
      border: "1px solid",
      borderRadius: "20px",
    },
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
}));

const EnquiryDetail = () => {
  const { details, typeId } = useSelector((state: any) => state.formList);
  const { relatedProductSpecs } = useSelector(
    (state: any) => state.quoteDetails
  );
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [searchProudct, setSearchProudct] = React.useState("");
  const [suggestionList, setSuggestionList] = React.useState([]);
  const [toggleDrawer, setToggleDrawer] = React.useState<boolean>(false);
  const [enquiryDetail, setEnquiryDetail] = React.useState<any>([]);
  const [enquiryDetailResponse, setEnquiryDetailResponse] = React.useState<any>(
    []
  );
  const [leadCreationTime, setLeadCreationTime] = React.useState<string>();
  const [addLoader, setAddLoader] = React.useState(false);
  const [notes, setNotes] = React.useState("");
  const [priceTerm, setPriceTerm] = React.useState("");
  const [uniqueSessionId, setUniqueSessionId] = React.useState("");
  const [searchLoader, setSearchLoader] = React.useState(false);
  const [createLoader, setCreateLoader] = React.useState(false);
  const [enquiryLoader, setEnquiryLoader] = React.useState(false);
  const [newAddedProduct, setNewAddedProduct] = React.useState<any>([]);
  const [toggleSuggetionList, setToggleSuggestionList] =
    React.useState<boolean>(false);
  const [checkConfigurationSelected, setCheckConfigurationSelected] =
    React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<any>("");
  const [simpleQuanity, setSimpleQuanity] = React.useState<any>(0);
  const [configQuanity, setConfigQuanity] = React.useState<any>([]);
  const [updateConfig, setUpdateConfig] = React.useState<any>({
    id: "",
    quantity: "",
  });
  const [editSimple, setEditSimple] = React.useState<any>([]);
  const [shopName, setShopName] = React.useState<any>("");
  const [openEdit, setOpenEdit] = React.useState(false);
  const [addProductPrice, setAddProductPrice] = React.useState<any>();

  const handleClickOpenEdit = async (productType, productId) => {
    setSimpleQuanity(1);
    dispatch(setRelatedProductSpecs([]));
    setToggleDrawer(true);
    if (productType == "add") {
      await getProduct(productId);
      setSearchProudct("");
      setSuggestionList([]);
    }
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setToggleDrawer(false);
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const getProduct = async (productId) => {
    setAddLoader(true);
    let response = await apiClient(`front/quotation_product_matrix`, "post", {
      body: { product_id: productId },
    });
    if (response.status == 200 || response.status == true) {
      setNewAddedProduct(response);
      setAddLoader(false);
    }
  };

  const getEnquiryDetails = async () => {
    setEnquiryLoader(true);
    let response = await apiClient(
      `crm/crmproducts?per_page=1&lead_id=${details?.unique_id}`,
      "get"
    );
    if (response.status == 200 || response.status == true) {
      setEnquiryDetailResponse(response);
      setEnquiryDetail(response?.data);
      setNotes(response?.notes);
      setPriceTerm(response?.price_term);
      setUniqueSessionId(response?.unique_session_id);
      setShopName(response?.user_name);
      setEnquiryLoader(false);
      setLeadCreationTime(response.created_time);
    }
  };

  React.useEffect(() => {
    getEnquiryDetails();
  }, [dispatch]);

  const FetchSuggestionList = React.useRef(
    _debounce(async (keyword: any) => {
      setSearchLoader(true);
      if (keyword) {
        let response = await apiClient(
          `crm/product_enquiry/my_products?search=${keyword}`,
          "post",
          {
            body: { keyword },
          }
        );
        if (response.status == 200 || response.status == true) {
          if (keyword) {
            setSuggestionList(response.data);
          }
          setSearchLoader(false);
        }
      }
    }, 500)
  ).current;

  const searchSkeleton = () => {
    return (
      <ExpandedList>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Box>
              <Skeleton
                animation="wave"
                variant="circular"
                height={30}
                width={30}
                style={{ margin: "0 6px" }}
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              <Skeleton animation="wave" variant="text" width={"100%"} />
              <Skeleton animation="wave" variant="text" width={"100%"} />
              <Skeleton animation="wave" variant="text" width={"40%"} />
            </Box>
          </Box>
        </Box>
      </ExpandedList>
    );
  };

  const handleSimpleQuantity = async (e) => {
    const re = /^[0-9+\-/()]+$/;
    const newValue = e.target.value;
    if (newValue === "" || re.test(newValue)) {
      setSimpleQuanity(newValue);
    }
  };

  const addProductInList = async (product) => {
    if (product?.product_type == "simple") {
      setCreateLoader(true);
      let specfication = [];
      product?.specifications?.length > 0 &&
        product?.specifications?.map((ele) => {
          specfication.push({
            attribute_id: ele?.attribute_id,
            name: ele?.name,
            values: ele?.values,
          });
        });
      let payloads = {
        user_id: JSON.parse(localStorage.getItem("userData"))?.id,
        product_id: product?.id,
        lead_id: details?.unique_id,
        product_name: product?.name,
        quantity: simpleQuanity,
        price: addProductPrice,
        type: product?.product_type,
        category_name: product?.category_name,
        country_name: product?.country_name,
        product_datetime: product?.product_datetime,
        combinations: JSON.stringify(specfication),
        unique_session_id: uniqueSessionId,
      };

      let response = await apiClient(`crm/crmproducts`, "post", {
        body: payloads,
      });

      if (response.status == 200 || response.status == true) {
        await getEnquiryDetails();
        dispatch(
          createHistory({
            lead_id: details.unique_id,
            type_id: typeId,
            name: "Enquiry",
            type: "enquiry",
            message: `<span>Product Added - </span> <b>${product?.name}</b> product has been added into the enquiry with <b>${simpleQuanity}</b> quantity`,
          })
        );
        setOpenEdit(false);
        setCreateLoader(false);
        setToggleDrawer(false);
        toast.success(response.message);
        setAddProductPrice(0);
      } else {
        toast.success(response.message);
        setCreateLoader(false);
      }
    }
  };

  const handleSimpleProductDelete = async (product, config: any = "") => {
    let response = await apiClient(
      `crm/crmproducts/${product.id}?lead_id=${product?.lead_id}&delete_all_variation=${config}`,
      "DELETE"
    );

    if (response.status == 200 || response.status == true) {
      await getEnquiryDetails();
      dispatch(
        createHistory({
          lead_id: details.unique_id,
          type_id: typeId,
          name: "Enquiry",
          type: "enquiry",
          message: `<span>Product Deleted - </span> <b>${product?.product_name}</b> product has been deleted from the enquiry `,
        })
      );
    }
    toast.success(response.message);
  };

  const deleteConfiguration = async (list, product) => {
    let response = await apiClient(
      `crm/crmproducts/${list?.id}?lead_id=${details?.unique_id}`,
      "DELETE"
    );
    if (response.status == 200 || response.status == true) {
      await getEnquiryDetails();
      dispatch(
        createHistory({
          lead_id: details.unique_id,
          type_id: typeId,
          name: "Enquiry",
          type: "enquiry",
          message: `<span>Product Deleted - </span><b>${list?.matrix}</b> configuration of the product <b>${product?.product_name}</b> has been deleted from the enquiry `,
        })
      );
    }
    toast.success(response.message);
  };

  const updateConfigQuantity = async (oldQuantity, productName) => {
    setCreateLoader(true);
    let payloads = {
      quantity: updateConfig?.quantity,
    };

    let response = await apiClient(
      `crm/crmproducts/${updateConfig?.id}`,
      "put",
      {
        body: payloads,
      }
    );

    if (response.status == 200 || response.status == true) {
      dispatch(
        createHistory({
          lead_id: details.unique_id,
          type_id: typeId,
          name: "Enquiry",
          type: "enquiry",
          message: `<span>Enquiry Updated - </span> <b>${productName}</b> product quantity has been updated from <b>${oldQuantity}</b> to <b>${updateConfig?.quantity}</b> `,
        })
      );
      setCreateLoader(false);
      await getEnquiryDetails();
      setUpdateConfig({ id: "", quantity: "" });
      setEditSimple([]);
      setConfigQuanity([]);
      setToggleDrawer(false);
    }
    toast.success(response.message);
  };
  const updateQuantity = async (product) => {
    setCreateLoader(true);
    let payloads = {
      quantity: simpleQuanity,
    };

    let response = await apiClient(`crm/crmproducts/${product?.id}`, "put", {
      body: payloads,
    });

    if (response.status == 200 || response.status == true) {
      dispatch(
        createHistory({
          lead_id: details.unique_id,
          type_id: typeId,
          name: "Enquiry",
          type: "enquiry",
          message: `<span>Enquiry Updated - </span> <b>${product?.product_name}</b> product quantity has been updated from <b>${product?.configrations?.[0]?.quantity} </b> to <b>${simpleQuanity}</b> `,
        })
      );
      setCreateLoader(false);
      await getEnquiryDetails();
      setOpenEdit(false);
      setEditSimple([]);
    }
    toast.success(response.message);
  };

  const addNewSpeficication = async (product_id) => {
    await getProduct(product_id);
    dispatch(setRelatedProductSpecs([]));
    setOpenEdit(true);
    setToggleDrawer(true);
  };

  const convertToTitleCase = (str) => {
    const words = str.split("_");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };
  const capitalizeFirstLetter = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  function getAddProductPrice() {
    newAddedProduct?.get_price_list?.map((value) => {
      if (simpleQuanity >= value?.min_qty && simpleQuanity <= value?.max_qty) {
        setAddProductPrice(value?.per_unit);
      }
    });
  }

  React.useEffect(() => {
    getAddProductPrice();
  }, [simpleQuanity]);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const columns2: any = [
    {
      field: "id",
      headerName: "Sr. No.",
      minWidth: 50,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "orderid",
      headerName: "Matrix Id",
      minWidth: 100,
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "product_name",
      headerName: "Images",
      width: 150,
      editable: false,
      headerAlign: "left",
      align: "left",
      renderCell: (cellValues) => {
        return (
          <>
            <div>
              <AvatarGroup max={4}>
                <Avatar
                  alt="Remy Sharp"
                  src={`${LOCAL_PUBLIC_URL}/uploads/product/gallery/Screenshot from 2024-04-25 09-42-27.png`}
                  sx={{ width: 24, height: 24 }}
                />
                <Avatar
                  alt="Travis Howard"
                  src={`${LOCAL_PUBLIC_URL}/uploads/product/gallery/travis-howard.jpg`}
                  sx={{ width: 24, height: 24 }}
                />
                <Avatar
                  alt="Cindy Baker"
                  src={`${LOCAL_PUBLIC_URL}/uploads/product/gallery/black horse fly 1.png`}
                  sx={{ width: 24, height: 24 }}
                />
              </AvatarGroup>
            </div>
          </>
        );
      },
    },

    {
      field: "color",
      headerName: "Color",
      width: 90,
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },

    {
      field: "weight",
      headerName: "Weight",
      width: 90,
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },

    {
      field: "area",
      headerName: "Area",
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
  ];
  const rows = [
    {
      id: 1,
      orderid: "0123",
      color: "Red",
      price: "$1880",
      weight: "32kg",
      area: "500sq.Ft",
      amount: 450,
    },
    {
      id: 2,
      orderid: "0123",
      color: "Red",
      price: "$1880",
      weight: "32kg",
      area: "500sq.Ft",
      amount: 450,
    },
    {
      id: 3,
      orderid: "0123",
      color: "Red",
      price: "$1880",
      weight: "32kg",
      area: "500sq.Ft",
      amount: 450,
    },
    {
      id: 4,
      orderid: "0123",
      color: "Red",
      price: "$1880",
      weight: "32kg",
      area: "500sq.Ft",
      quantity: "Pending",
      amount: 450,
    },
    {
      id: 5,
      orderid: "0123",
      color: "Red",
      price: "$1880",
      weight: "32kg",
      area: "500sq.Ft",
      quantity: "Pending",
      amount: 450,
    },
    {
      id: 6,
      orderid: "0123",
      color: "Red",
      price: "$1880",
      weight: "32kg",
      area: "500sq.Ft",
      quantity: "Not Paid",
      amount: 450,
    },
    {
      id: 7,
      orderid: "0123",
      color: "Red",
      price: "$1880",
      weight: "32kg",
      area: "500sq.Ft",
      quantity: "Pending",
      amount: 450,
    },
    {
      id: 8,
      orderid: "0123",
      color: "Red",
      price: "$1880",
      weight: "32kg",
      area: "500sq.Ft",
      quantity: "Pending",
      amount: 450,
    },
    {
      id: 9,
      orderid: "0123",
      color: "Red",
      price: "$1880",
      weight: "32kg",
      area: "500sq.Ft",
      quantity: "Not Paid",
      amount: 450,
    },
    {
      id: 10,
      orderid: "0123",
      color: "Red",
      price: "$1880",
      weight: "32kg",
      area: "500sq.Ft",
      quantity: "In Progress",
      amount: 450,
    },
    {
      id: 11,
      orderid: "0123",
      color: "Red",
      price: "$1880",
      weight: "32kg",
      area: "500sq.Ft",
      quantity: "Pending",
      amount: 450,
    },
  ];

  const list = (anchor: Anchor) => (
    <EditDrawerPanel
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 800,
      }}
      role="presentation"
    >
      <EditModeProductTitle>
        <DialogProductInfo>
          <ImageProduct>
            {" "}
            <img
              src={newAddedProduct?.photos?.source}
              alt={
                newAddedProduct?.photos?.alt_tag
                  ? newAddedProduct?.photos?.alt_tag
                  : newAddedProduct?.name
              }
              width={"30px"}
            />
          </ImageProduct>
          <HeadingInfo>
            <Typography className="myproductname">
              {newAddedProduct?.name}
            </Typography>
            <ProductIDSection>
              <Typography>ID: {newAddedProduct?.unique_number} </Typography>
              <span className="Pricetyype">
                <GreenboxValuesmall>
                  <Tooltip title="Price Term" arrow>
                    <Typography>{newAddedProduct?.price_term}</Typography>
                  </Tooltip>
                </GreenboxValuesmall>
              </span>
            </ProductIDSection>
          </HeadingInfo>
        </DialogProductInfo>
        <CancelOutlinedIcon
          sx={{ cursor: "pointer" }}
          onClick={async () => {
            setToggleDrawer(false);
          }}
        />
      </EditModeProductTitle>
      <EditModeProductContent>
        <EditPopupContent>
          {newAddedProduct?.product_type == "simple" ? (
            <>
              <SpecificationScrollBox>
                <Grid container spacing={2}>
                  {newAddedProduct?.specifications?.length > 0 &&
                    newAddedProduct?.specifications?.map(
                      (addProduct, addProductIndex) => {
                        return (
                          <Grid item xs={12} sm={4} md={3}>
                            <SpecificationCol>
                              <Typography className="speciheading">
                                {addProduct?.name}
                              </Typography>
                              <Typography className="specivalue">
                                {addProduct?.values}
                              </Typography>
                            </SpecificationCol>
                          </Grid>
                        );
                      }
                    )}
                </Grid>
              </SpecificationScrollBox>
              <QtyContainer>
                <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    position: "absolute",
                    top: "-16px",
                    right: "10px",
                    padding: "0 8px",
                  }}
                >
                  <Typography variant="body1">Quantity</Typography>
                  <CountQty display="flex" alignItems="center" gap={1}>
                    <RemoveIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        if (simpleQuanity > 1) {
                          setSimpleQuanity(simpleQuanity - 1);
                        }
                      }}
                    />
                    <TextField
                      size="small"
                      onChange={handleSimpleQuantity}
                      value={simpleQuanity}
                    />
                    <AddIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setSimpleQuanity(simpleQuanity + 1);
                      }}
                    />
                  </CountQty>
                </Box>
              </QtyContainer>
            </>
          ) : (
            <Box>
              <EnquiryPopUp
                otherValues={""}
                product_detail={newAddedProduct}
                unique_session_id={uniqueSessionId}
                v={newAddedProduct?.variation_options}
                quotedetails={newAddedProduct}
                leadId={details?.unique_id}
                // listEnquiry={getEnquiryDetails}
              />
            </Box>
          )}

          {newAddedProduct?.product_type == "simple" && (
            <TotalProductCount>
              <TotalProductBox>
                <ProductRow>
                  <Typography>Unit Price</Typography>
                  <div className="Countbox">{addProductPrice}</div>
                </ProductRow>
                <Divider className="totaldivider" />
                <GrandTotalRow>
                  <Typography>Grand Total</Typography>
                  <Typography style={{ color: "#d7282f" }}>
                    $ {simpleQuanity * addProductPrice}
                  </Typography>
                </GrandTotalRow>
              </TotalProductBox>
            </TotalProductCount>
          )}
        </EditPopupContent>
      </EditModeProductContent>
      <ButtonActionInfo>
        {newAddedProduct?.product_type == "simple" ? (
          <>
            <SmallBlackOutineBtn variant="outlined" onClick={handleCloseEdit}>
              Cancel
            </SmallBlackOutineBtn>
            <SmallRedOutineBtn
              variant="outlined"
              onClick={() => {
                addProductInList(newAddedProduct);
              }}
            >
              {createLoader ? (
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
                "Add"
              )}
            </SmallRedOutineBtn>
          </>
        ) : (
          <SmallBlackOutineBtn
            variant="outlined"
            onClick={async () => {
              setOpenEdit(false);
              setToggleDrawer(false);
              await getEnquiryDetails();
              setEditSimple([]);
            }}
          >
            Close
          </SmallBlackOutineBtn>
        )}
      </ButtonActionInfo>
    </EditDrawerPanel>
  );

  return (
    <>
      <EnquiryDetailData>
        <EnquiryDetailSearchOuter>
          <EnquiryDetailSearch>
            <SearchWithButton>
              <SearchCommon className="enquirysearch">
                <TextField
                  fullWidth
                  id="standard-bare"
                  variant="outlined"
                  placeholder="Search products with name"
                  InputProps={{
                    endAdornment: (
                      <IconButton>
                        {!searchProudct && <SearchIcon />}
                        {searchProudct && (
                          <CancelOutlinedIcon
                            onClick={() => {
                              setSuggestionList([]);
                              setSearchProudct("");
                              setSearchLoader(false);
                              setSuggestionList([]);
                            }}
                          />
                        )}
                      </IconButton>
                    ),
                  }}
                  value={searchProudct}
                  onKeyDown={(e) => {
                    if (
                      (e.key == "Backspace" && searchProudct == null) ||
                      searchProudct == ""
                    ) {
                      setSuggestionList([]);
                    }
                  }}
                  onChange={(e) => {
                    if (e.target.value) {
                      setSearchProudct(e.target.value);
                      setSearchQuery("");
                      if (!toggleSuggetionList) setToggleSuggestionList(true);
                      if (e.target.value) FetchSuggestionList(e.target.value);
                    }
                    if (e.target.value == "") {
                      setSearchProudct("");
                      setSuggestionList([]);
                      setToggleSuggestionList(true);
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!toggleSuggetionList) setToggleSuggestionList(true);
                  }}
                />
              </SearchCommon>
            </SearchWithButton>
            {searchLoader
              ? searchSkeleton()
              : suggestionList?.length > 0 && (
                  <ExpandedList>
                    <List>
                      {suggestionList.map((product, i) => {
                        return (
                          <ListItem
                            disablePadding
                            onClick={
                              () => handleClickOpenEdit("add", product?.id)
                              // getAddProductPrice()
                            }
                          >
                            <ListItemButton>
                              <ListItemIcon>
                                <img
                                  src={
                                    product?.photos?.source
                                      ? product?.photos?.source
                                      : ""
                                  }
                                  alt={
                                    product?.photos?.alt_tag
                                      ? product?.photos?.alt_tag
                                      : product?.name
                                  }
                                  width={"30px"}
                                />
                              </ListItemIcon>
                              <ListItemText>
                                <Typography>{product?.name}</Typography>
                                <Typography>
                                  <span
                                    className={
                                      product?.product_type == "simple"
                                        ? "producttype productsimple"
                                        : "producttype productconfig"
                                    }
                                    style={{ textTransform: "capitalize" }}
                                  >
                                    {product?.product_type == "simple"
                                      ? product?.product_type
                                      : "config"}
                                  </span>
                                </Typography>
                              </ListItemText>
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </ExpandedList>
                )}
            {suggestionList?.length == 0 && searchProudct && (
              <NoProductList>
                <Typography>No product exists with this name!</Typography>
              </NoProductList>
            )}
          </EnquiryDetailSearch>
        </EnquiryDetailSearchOuter>
        <div>
          {enquiryLoader && <EnquiryList />}
          {enquiryDetail?.variation?.length > 0 &&
            enquiryDetail?.variation?.map((configuration) => (
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <ProductBgInfo style={{ position: "relative" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={5} md={7}>
                        <ProductBoxLeft>
                          <ProductImageBox>
                            <img
                              src={`${LOCAL_PUBLIC_URL}/uploads/product/gallery/Screenshot from 2024-04-25 09-42-27.png`}
                              alt=""
                            />
                          </ProductImageBox>
                          <div>
                            <ProductTitle>
                              <Link
                                onClick={() => {
                                  window.open(
                                    `/productdetail/${ReplaceSpaces(
                                      configuration?.category_name
                                    )}/${ReplaceSpaces(
                                      shopName
                                    )}/${ReplaceSpaces(configuration?.slug)}`,
                                    "_blank",
                                    "noreferrer"
                                  );
                                }}
                                underline="hover"
                              >
                                {configuration?.product_name}
                              </Link>
                            </ProductTitle>
                            <ProductID>
                              <span>Product Id: </span>
                            </ProductID>
                            <CategoryName>
                              <span>Category:</span>{" "}
                              {configuration?.category_name}
                            </CategoryName>
                          </div>
                        </ProductBoxLeft>
                      </Grid>
                      <Grid item xs={12} sm={7} md={5}>
                        <ProductBoxRight style={{ margin: "19px 0 0" }}>
                          <LocationDiv>
                            <CountryName>
                              {configuration?.country_name
                                ? configuration?.country_name
                                : "N/A"}
                            </CountryName>
                            <DateAndTime variant="body2">
                              <CalendarMonthOutlinedIcon />
                              {/* May 2, 1:24 pm */}
                              {moment(configuration?.created_date).format(
                                "MMM DD, hh:mm A"
                              )}
                            </DateAndTime>
                            <PTypeImage>
                              <Typography>Configured</Typography>
                            </PTypeImage>
                          </LocationDiv>
                          <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                          />
                          <EDetailButtons>
                            {editSimple?.id == configuration?.id ? (
                              <>
                                <OutLinedButton
                                  variant="outlined"
                                  onClick={() => {
                                    setEditSimple([]);
                                    setConfigQuanity([]);
                                    setToggleDrawer(false);
                                    setUpdateConfig({ id: "", quantity: "" });
                                  }}
                                >
                                  Cancel
                                </OutLinedButton>
                                {/* <OutLinedButton
                                  variant="outlined"
                                  onClick={() => {
                                    updateQuantity(configuration);
                                  }}
                                >
                                  {createLoader == true ? (
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
                                    "Update"
                                  )}
                                </OutLinedButton> */}
                              </>
                            ) : (
                              <>
                                <SmallBlackOutineBtn
                                  variant="outlined"
                                  onClick={() => {
                                    handleSimpleProductDelete(configuration, 1);
                                  }}
                                >
                                  Delete
                                </SmallBlackOutineBtn>
                                <SmallRedOutineBtn
                                  variant="outlined"
                                  // startIcon={<ModeEditOutlineOutlinedIcon />}
                                  onClick={() => {
                                    setEditSimple(configuration);
                                    setConfigQuanity(
                                      configuration?.configrations
                                    );
                                  }}
                                >
                                  Edit
                                </SmallRedOutineBtn>
                              </>
                            )}
                          </EDetailButtons>
                        </ProductBoxRight>
                      </Grid>
                    </Grid>
                  </ProductBgInfo>
                </AccordionSummary>
                <AccordionDetails>
                  <BoxAccordianInner>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={12}>
                            <ProductEnquiryData>
                              <DataProductTypeData1 sx={{ background: "none" }}>
                                <TopData>
                                  <p>
                                    This is{" "}
                                    <span className="by-orderp">By Order</span>{" "}
                                    product, available for purchase at below
                                    listed price.
                                  </p>
                                </TopData>
                              </DataProductTypeData1>
                              {/* <!-- Start ProductFeature Area --> */}
                              <ProductFeatureSection>
                                <SpecificationHeading variant="h3">
                                  Product Features & Characteristics
                                </SpecificationHeading>
                                <Box sx={{ padding: "10px 0" }}>
                                  <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3} md={3}>
                                      <BrandBoxStyle>
                                        <Typography variant="h6">
                                          {"Manufacturer/Brand"}
                                        </Typography>
                                        <Typography variant="body1">
                                          <LightTooltip
                                            disableInteractive
                                            arrow
                                            title={"Brand Name"}
                                            placement="top"
                                          >
                                            <span>Wassermann</span>
                                          </LightTooltip>
                                        </Typography>
                                      </BrandBoxStyle>
                                    </Grid>
                                    <Grid item xs={12} sm={9} md={9}>
                                      <FeatureOpt>
                                        <Grid container spacing={2}>
                                          <Grid item xs={12} sm={3} md={3}>
                                            <InnerOpt sx={{ border: "none" }}>
                                              <Typography variant="h6">
                                                Power Source
                                              </Typography>
                                              <Typography variant="body1">
                                                Electric
                                              </Typography>
                                            </InnerOpt>
                                          </Grid>
                                          <Grid item xs={12} sm={3} md={3}>
                                            <InnerOpt>
                                              <Typography variant="h6">
                                                Power Source
                                              </Typography>
                                              <Typography variant="body1">
                                                Electric
                                              </Typography>
                                            </InnerOpt>
                                          </Grid>
                                          <Grid item xs={12} sm={3} md={3}>
                                            <InnerOpt>
                                              <Typography variant="h6">
                                                Power Source
                                              </Typography>
                                              <Typography variant="body1">
                                                Electric
                                              </Typography>
                                            </InnerOpt>
                                          </Grid>
                                          <Grid item xs={12} sm={3} md={3}>
                                            <InnerOpt
                                              sx={{
                                                height: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <span className="view_more_opt">
                                                View More
                                              </span>
                                            </InnerOpt>
                                          </Grid>
                                          {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
                                        </Grid>
                                      </FeatureOpt>
                                    </Grid>
                                  </Grid>
                                </Box>
                              </ProductFeatureSection>
                              {/* <!-- End ProductFeature Area --> */}
                              <ProductDetailtable sx={{ margin: "20px 0 0" }}>
                                <DataGridPro
                                  autoHeight
                                  rows={rows}
                                  columns={columns2}
                                  // loading={listData.length === 0}
                                  rowHeight={32}
                                  //checkboxSelection
                                  sx={DataGridStyleIcon}
                                  pageSize={10}
                                  pagination
                                  // disableRowSelectionOnClick
                                />
                                <UnitPriceContainer>
                                  <UnitPriceBox>
                                    <UnitPrice>Unit Price</UnitPrice>
                                    <UnitPriceValue>$320.00</UnitPriceValue>
                                  </UnitPriceBox>
                                  <UnitPriceBox>
                                    <UnitPrice>Total Price</UnitPrice>
                                    <UnitPriceValue>$11560.00</UnitPriceValue>
                                  </UnitPriceBox>
                                </UnitPriceContainer>
                              </ProductDetailtable>
                            </ProductEnquiryData>
                          </Grid>
                        </Grid>
                        <ProductEnquiryData>
                          <TopData sx={{ padding: "0 14px 8px" }}>
                            <Typography variant="h5">
                              Configuration Of the product
                            </Typography>
                          </TopData>
                          <ProductDetailtable>
                            <StyledTable>
                              <Table
                                sx={{ minWidth: 650 }}
                                size="medium"
                                aria-label="a dense table"
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell>S.No</TableCell>
                                    <TableCell align="right">Matrix</TableCell>
                                    {configuration?.configrations &&
                                      JSON.parse(
                                        configuration?.configrations?.[0]
                                          ?.combinations
                                      )?.map((matrix) => (
                                        <TableCell align="right">
                                          {matrix?.option}
                                        </TableCell>
                                      ))}
                                    <TableCell align="right">
                                      Quantity / Unit
                                    </TableCell>
                                    <TableCell align="right">
                                      Unit Price
                                    </TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    {editSimple?.id == configuration?.id && (
                                      <TableCell align="right">
                                        Action
                                      </TableCell>
                                    )}
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {configuration?.configrations?.map(
                                    (list, listIndex) => (
                                      <TableRow
                                        key={121}
                                        sx={{
                                          "&:last-child td, &:last-child th": {
                                            border: 0,
                                          },
                                        }}
                                      >
                                        <TableCell component="th" scope="row">
                                          {listIndex + 1}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                          {list?.matrix}
                                        </TableCell>
                                        {list?.combinations &&
                                          JSON.parse(list?.combinations)?.map(
                                            (matrix, matrixIndex) => (
                                              <TableCell
                                                key={matrixIndex}
                                                component="th"
                                                scope="row"
                                              >
                                                {matrix?.value}
                                              </TableCell>
                                            )
                                          )}
                                        <TableCell component="th" scope="row">
                                          {editSimple?.id ==
                                          configuration?.id ? (
                                            <CountQty
                                              display="flex"
                                              alignItems="center"
                                              gap={1}
                                            >
                                              <RemoveIcon
                                                sx={{ cursor: "pointer" }}
                                                onClick={() => {
                                                  if (
                                                    configQuanity[listIndex]
                                                      ?.quantity > 1
                                                  ) {
                                                    setConfigQuanity(
                                                      (prevItems) => {
                                                        const newItems = [
                                                          ...prevItems,
                                                        ];
                                                        newItems[listIndex] = {
                                                          ...newItems[
                                                            listIndex
                                                          ],
                                                          quantity:
                                                            configQuanity[
                                                              listIndex
                                                            ]?.quantity - 1,
                                                        };
                                                        return newItems;
                                                      }
                                                    );
                                                    setUpdateConfig({
                                                      id: list?.id,
                                                      quantity:
                                                        configQuanity[listIndex]
                                                          ?.quantity - 1,
                                                    });
                                                  }
                                                }}
                                              />
                                              <TextField
                                                size="small"
                                                onChange={(e) => {
                                                  const re = /^[0-9+\-/()]+$/;
                                                  const newValue =
                                                    e.target.value;
                                                  if (
                                                    newValue === "" ||
                                                    re.test(newValue)
                                                  ) {
                                                    setConfigQuanity(
                                                      (prevItems) => {
                                                        const newItems = [
                                                          ...prevItems,
                                                        ];
                                                        newItems[listIndex] = {
                                                          ...newItems[
                                                            listIndex
                                                          ],
                                                          quantity: newValue,
                                                        };
                                                        return newItems;
                                                      }
                                                    );
                                                    setUpdateConfig({
                                                      id: list?.id,
                                                      quantity: newValue,
                                                    });
                                                  }
                                                }}
                                                value={
                                                  configQuanity[listIndex]
                                                    ?.quantity
                                                }
                                              />
                                              <AddIcon
                                                sx={{ cursor: "pointer" }}
                                                onClick={() => {
                                                  setConfigQuanity(
                                                    (prevItems) => {
                                                      const newItems = [
                                                        ...prevItems,
                                                      ];
                                                      newItems[listIndex] = {
                                                        ...newItems[listIndex],
                                                        quantity:
                                                          configQuanity[
                                                            listIndex
                                                          ]?.quantity + 1,
                                                      };
                                                      return newItems;
                                                    }
                                                  );
                                                  setUpdateConfig({
                                                    id: list?.id,
                                                    quantity:
                                                      configQuanity[listIndex]
                                                        ?.quantity + 1,
                                                  });
                                                }}
                                              />
                                            </CountQty>
                                          ) : (
                                            <Typography>
                                              {list?.quantity
                                                ? list?.quantity
                                                : "N/A"}
                                            </Typography>
                                          )}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                          $ {list?.price}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                          <span className="labeltext">
                                            {" "}
                                            $ {list?.quantity * list?.price}
                                          </span>
                                        </TableCell>
                                        {editSimple?.id ==
                                          configuration?.id && (
                                          <TableCell component="th" scope="row">
                                            <DeleteTwoToneIcon
                                              style={{
                                                color: "#d7282f",
                                                fontSize: "16px",
                                                cursor: "pointer",
                                              }}
                                              onClick={() => {
                                                deleteConfiguration(
                                                  list,
                                                  configuration
                                                );
                                              }}
                                            />
                                            {updateConfig?.id == list?.id && (
                                              <AddCircleOutlineOutlinedIcon
                                                style={{
                                                  color: "#57874B",
                                                  fontSize: "16px",
                                                  cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                  updateConfigQuantity(
                                                    list?.quantity,
                                                    configuration?.product_name
                                                  );
                                                }}
                                              />
                                            )}
                                          </TableCell>
                                        )}
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                              {editSimple?.id == configuration?.id && (
                                <AddSpecification
                                  variant="contained"
                                  onClick={() => {
                                    addNewSpeficication(
                                      configuration?.product_id
                                    );
                                    // setEditSimple([]);
                                  }}
                                >
                                  <AddIcon /> Add new Specifications
                                </AddSpecification>
                              )}
                            </StyledTable>
                            <UnitPriceContainer>
                              <UnitPriceBox>
                                {/* <UnitPrice>Unit Price</UnitPrice>
                                <UnitPriceValue>$320.00</UnitPriceValue> */}
                              </UnitPriceBox>
                              <UnitPriceBox>
                                <UnitPrice>Total Price</UnitPrice>
                                <UnitPriceValue>
                                  {/* ${configuration?.calculatedPrice} */}
                                </UnitPriceValue>
                              </UnitPriceBox>
                            </UnitPriceContainer>
                          </ProductDetailtable>
                        </ProductEnquiryData>
                      </Grid>
                    </Grid>
                  </BoxAccordianInner>
                </AccordionDetails>
              </Accordion>
            ))}
          {enquiryDetail?.simple?.length > 0 &&
            enquiryDetail?.simple?.map((simple, index) => {
              return (
                <Accordion
                  expanded={expanded === index}
                  onChange={handleChange(index)}
                >
                  <AccordionSummary
                    aria-controls="panel2d-content"
                    id="panel2d-header"
                  >
                    <ProductBgInfo>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={7} md={7}>
                          <ProductBoxLeft>
                            <ProductImageBox>
                              <img src={simple?.main_image} alt="Loading..." />
                            </ProductImageBox>
                            <div>
                              <ProductTitle>
                                <Link
                                  onClick={() => {
                                    window.open(
                                      `/productdetail/${ReplaceSpaces(
                                        simple?.category_name
                                      )}/${ReplaceSpaces(
                                        shopName
                                      )}/${ReplaceSpaces(simple?.slug)}`,
                                      "_blank",
                                      "noreferrer"
                                    );
                                  }}
                                  underline="hover"
                                >
                                  {simple?.product_name}
                                </Link>
                                {/* <GreenboxValue>
                                      <Tooltip title="Price Terms" arrow>
                                        <Typography>{priceTerm}!</Typography>
                                      </Tooltip>
                                    </GreenboxValue> */}
                              </ProductTitle>
                              <ProductID>
                                <span>Product Id: </span>{" "}
                                {simple?.unique_number}
                              </ProductID>
                              <CategoryName>
                                <span>Category:</span>
                                {simple?.category_name.map((value, index) =>
                                  simple?.category_name[
                                    simple?.category_name.length - 1
                                  ] !== value
                                    ? ` ${value}, `
                                    : `${value}`
                                )}
                                {/* <Link
                              // href="#"
                              color="inherit"
                              underline="hover"
                            >
                             {simple?.category_name}
                            </Link> */}
                              </CategoryName>
                            </div>
                          </ProductBoxLeft>
                        </Grid>

                        <Grid item xs={12} sm={5} md={5}>
                          <ProductBoxRight
                            sx={{ float: "right", margin: "10px 0 0" }}
                          >
                            <Box>
                              <CountryName>{simple?.country_name}</CountryName>
                              {/* <DateAndTime variant="body2">
                                    <CalendarMonthOutlinedIcon />
                                    May 2, 1:24 pm
                                  </DateAndTime> */}
                              <DateAndTime variant="body2">
                                <CalendarMonthOutlinedIcon />
                                {moment(simple?.product_datetime).format(
                                  "MMM DD, hh:mm A"
                                )}
                              </DateAndTime>
                            </Box>
                            <Divider
                              orientation="vertical"
                              variant="middle"
                              flexItem
                            />
                            <MultipleButton>
                              {editSimple?.id == simple?.id ? (
                                <>
                                  <OutLinedButton
                                    variant="outlined"
                                    onClick={() => {
                                      setEditSimple([]);
                                      setToggleDrawer(false);
                                    }}
                                  >
                                    Cancel
                                  </OutLinedButton>
                                  {/* <CloseRoundedIcon/> */}

                                  <OutLinedButton
                                    variant="outlined"
                                    onClick={() => {
                                      updateQuantity(simple);
                                    }}
                                  >
                                    {createLoader == true ? (
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
                                      "Update"
                                    )}
                                  </OutLinedButton>
                                  {/* <DoneRoundedIcon/> */}
                                </>
                              ) : (
                                <>
                                  <SmallBlackOutineBtn
                                    variant="outlined"
                                    onClick={() => {
                                      handleSimpleProductDelete(simple);
                                    }}
                                  >
                                    Delete
                                  </SmallBlackOutineBtn>
                                  <SmallRedOutineBtn
                                    variant="outlined"
                                    // startIcon={
                                    //   <ModeEditOutlineOutlinedIcon />
                                    // }
                                    onClick={() => {
                                      setEditSimple(simple);
                                      setSimpleQuanity(
                                        simple?.configrations?.[0]?.quantity
                                      );
                                    }}
                                  >
                                    Edit
                                  </SmallRedOutineBtn>
                                </>
                              )}
                            </MultipleButton>
                          </ProductBoxRight>
                        </Grid>
                      </Grid>
                    </ProductBgInfo>
                  </AccordionSummary>
                  <AccordionDetails>
                    <AccordionContent>
                      <OverViewInfoP>
                        <OverViewHeading>
                          <Typography> Overview</Typography>
                        </OverViewHeading>
                        <OverViewSection>
                          <Grid container spacing={2}>
                            <Grid item xs={6} sm={2.5} md={2.5}>
                              <BrandBoxStyle>
                                <Typography variant="h6">
                                  {"Manufacturer/Brand"}
                                </Typography>
                                <Typography variant="body1">
                                  <LightTooltip
                                    disableInteractive
                                    arrow
                                    title={"Brand Name"}
                                    placement="top"
                                  >
                                    <span>{simple?.brand_name}</span>
                                  </LightTooltip>
                                </Typography>
                              </BrandBoxStyle>
                            </Grid>
                            <Grid item xs={6} sm={2.5} md={2.5}>
                              <OverViewInfo>
                                <OverinfoLabel>
                                  Manufacturing Year
                                </OverinfoLabel>
                                <OverinfoValue>
                                  {simple?.manufacturer_year}
                                </OverinfoValue>
                              </OverViewInfo>
                            </Grid>
                            <Grid item xs={6} sm={2.5} md={2.5}>
                              <OverViewInfo>
                                <OverinfoLabel>Model No.</OverinfoLabel>
                                <OverinfoValue>
                                  {simple?.model_number}
                                </OverinfoValue>
                              </OverViewInfo>
                            </Grid>
                            <Grid item xs={6} sm={2.5} md={2.5}>
                              <OverViewInfo>
                                <OverinfoLabel>Condition</OverinfoLabel>
                                <OverinfoValue>
                                  {simple?.condition}
                                </OverinfoValue>
                              </OverViewInfo>
                            </Grid>
                            <Grid item xs={6} sm={2} md={2}>
                              <OverViewInfo>
                                <OverinfoLabel>Post Validity</OverinfoLabel>
                                <OverinfoValue>
                                  {simple?.validity}
                                </OverinfoValue>
                              </OverViewInfo>
                            </Grid>
                          </Grid>
                        </OverViewSection>

                        <OverViewSection2>
                          <ProductFeatureSection
                            sx={{ background: "none", padding: "0 12px 10px" }}
                          >
                            {simple?.configrations.length > 0 && (
                              <SpecificationHeading
                                variant="h3"
                                sx={{
                                  padding: "0px 0 5px",
                                }}
                              >
                                Product Features & Characteristics
                              </SpecificationHeading>
                            )}
                            {/* <Box sx={{
                                "& .MuiTypography-root": {
                                  fontSize: "12px"
                                },
                              }}>
                                <Grid container spacing={2}>
                                  <Grid item xs={6} sm={3} md={3}>
                                    <RProductLabel>Related Power</RProductLabel>
                                    <Typography>90A</Typography>
                                  </Grid>
                                  <Grid item xs={6} sm={3} md={3}>
                                    <RProductLabel>Fule</RProductLabel>
                                    <Typography>Biogas</Typography>
                                  </Grid>
                                  <Grid item xs={6} sm={3} md={3}>
                                    <RProductLabel>Pressure</RProductLabel>
                                    <Typography>Mpa ≤0.4</Typography>
                                  </Grid>
                                  <Grid item xs={6} sm={3} md={3}>
                                    <RProductLabel>Quantity / Unit</RProductLabel>
                                    <Typography>100 Boxes</Typography>
                                  </Grid>
                                </Grid>
                              </Box> */}
                            <ProductInnerInfo>
                              {simple?.configrations &&
                                simple?.configrations?.map((config) => (
                                  <Grid container spacing={2}>
                                    {config?.combinations &&
                                      JSON.parse(config?.combinations)?.map(
                                        (specifications) => {
                                          return (
                                            <Grid item xs={12} sm={3} md={3}>
                                              <RelatedLabel>
                                                {specifications?.name}
                                              </RelatedLabel>
                                              <Typography>
                                                {specifications?.values}
                                              </Typography>
                                            </Grid>
                                          );
                                        }
                                      )}
                                  </Grid>
                                ))}
                            </ProductInnerInfo>
                          </ProductFeatureSection>
                        </OverViewSection2>
                      </OverViewInfoP>
                      <DataProductTypeData1>
                        <Typography>
                          This is{" "}
                          <span
                            className={
                              simple?.availability === "in_stock"
                                ? "in-stockp"
                                : "by-orderp"
                            }
                          >
                            {convertToTitleCase(simple?.availability)}
                          </span>{" "}
                          product, available for purchase at below listed
                          prices.
                        </Typography>
                        <DataProductTypeInner>
                          <PriceQuoteColumn>
                            <Grid container>
                              {simple?.["Quantity based options"].map(
                                (value) => {
                                  return (
                                    <Grid
                                      item
                                      xs={12}
                                      md="auto"
                                      sx={{ padding: "0" }}
                                    >
                                      <PriceQuoteInfo>
                                        <Typography variant="h5">
                                          US$ {value.per_unit}
                                        </Typography>
                                        <Typography variant="body1">
                                          {value.min_qty} - {value.max_qty}{" "}
                                          pieces
                                        </Typography>
                                      </PriceQuoteInfo>
                                    </Grid>
                                  );
                                }
                              )}

                              <Grid
                                item
                                xs={12}
                                md="auto"
                                sx={{ padding: "0" }}
                              >
                                <PriceTermVlue>
                                  <Typography variant="h6">
                                    {simple?.configrations[0]?.price_term}
                                    <LightTooltip
                                      disableInteractive
                                      arrow
                                      placement="top"
                                      title={
                                        simple?.configrations[0]?.price_term
                                      }
                                    >
                                      <InfoOutlinedIcon />
                                    </LightTooltip>
                                  </Typography>
                                </PriceTermVlue>
                              </Grid>
                            </Grid>
                          </PriceQuoteColumn>
                        </DataProductTypeInner>
                      </DataProductTypeData1>
                      <QuantityBox>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {editSimple?.id == simple?.id ? (
                            <>
                              <SimpleQuantityCompo>
                                <CountQty
                                  className="simplqtybox"
                                  display="flex"
                                  alignItems="center"
                                  gap={1}
                                >
                                  <RemoveIcon
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => {
                                      if (simpleQuanity > 1) {
                                        setSimpleQuanity(simpleQuanity - 1);
                                      }
                                    }}
                                  />
                                  <TextField
                                    size="small"
                                    onChange={(e) => {
                                      const re = /^[0-9+\-/()]+$/;
                                      const newValue = e.target.value;
                                      if (
                                        newValue === "" ||
                                        re.test(newValue)
                                      ) {
                                        setSimpleQuanity(newValue);
                                      }
                                    }}
                                    value={simpleQuanity}
                                  />
                                  <AddIcon
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setSimpleQuanity(simpleQuanity + 1);
                                    }}
                                  />
                                </CountQty>
                              </SimpleQuantityCompo>
                              <span>
                                {simple?.final_price
                                  ? `$ ` + simple?.final_price
                                  : "--"}
                                /unit
                              </span>
                            </>
                          ) : (
                            <>
                              <FormControl sx={{ width: 80 }} size="small">
                                <TextField
                                  size="small"
                                  variant="outlined"
                                  id="outlined-basic"
                                  label="Quantity"
                                  defaultValue="100"
                                  value={
                                    simple?.totalQuantity
                                      ? simple?.totalQuantity
                                      : "N/A"
                                  }
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                              </FormControl>
                              <span>
                                {simple?.final_price
                                  ? `$ ` + simple?.final_price
                                  : "--"}
                                /unit
                              </span>
                            </>
                          )}
                        </div>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "50px",
                          }}
                        >
                          {/* <Box>
                            <RProductLabel>Unit Price</RProductLabel>
                            <Typography>
                              {simple?.configrations?.[0]?.price
                                ? `$ ` + simple?.configrations?.[0]?.price
                                : "--"}
                            </Typography>
                          </Box> */}
                          <Box>
                            <RProductLabel>Total Amount</RProductLabel>
                            <AmountValue>
                              <Typography>
                                <span className="labeltext">
                                  ${" "}
                                  {simple?.final_price * simple?.totalQuantity}
                                </span>
                              </Typography>
                            </AmountValue>
                          </Box>
                        </Box>
                      </QuantityBox>
                    </AccordionContent>
                  </AccordionDetails>
                </Accordion>
              );
            })}

          {/* {enquiryDetail?.simple?.length > 0 && (
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header"
              >
                <ProDuctTypeRow>
                  <Typography>Simple Product</Typography>
                </ProDuctTypeRow>
              </AccordionSummary>
              <AccordionDetails>
                {enquiryDetail?.simple?.map((simple) => (
                  <BoxAccordianInner>
                    <OuterContentAccor>
                      <AccordionContent>
                        <ProductBgInfo>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={7} md={7}>
                              <ProductBoxLeft>
                                <ProductImageBox>
                                  <img
                                    src={`${LOCAL_PUBLIC_URL}/uploads/product/gallery/Screenshot from 2024-04-25 09-42-27.png`}
                                    alt=""
                                  />
                                </ProductImageBox>
                                <div>
                                  <ProductTitle>
                                    <Link
                                      onClick={() => {
                                        window.open(
                                          `/productdetail/${ReplaceSpaces(
                                            simple?.category_name
                                          )}/${ReplaceSpaces(
                                            shopName
                                          )}/${ReplaceSpaces(simple?.slug)}`,
                                          "_blank",
                                          "noreferrer"
                                        );
                                      }}
                                      underline="hover"
                                    >
                                      {simple?.product_name}
                                    </Link>
                                  </ProductTitle>

                                  <ProductID>
                                    <span>Product Id: </span>PC28941043
                                  </ProductID>
                                  <CategoryName>
                                    <span>Category:</span>{" "}
                                    <Link
                                      // href="#"
                                      color="inherit"
                                      underline="hover"
                                    >
                                      {simple?.category_name}
                                    </Link>
                                  </CategoryName>
                                </div>
                              </ProductBoxLeft>
                            </Grid>
                            <Grid item xs={12} sm={5} md={5}>
                              <ProductBoxRight sx={{ float: "right" }}>
                                <Box>
                                  <CountryName>Jordan</CountryName>
                                  <DateAndTime variant="body2">
                                    <CalendarMonthOutlinedIcon />
                                    {moment(simple?.created_date).format(
                                      "MMM DD, hh:mm A"
                                    )}
                                  </DateAndTime>
                                </Box>

                                <MultipleButton>
                                  {editSimple?.id == simple?.id ? (
                                    <>
                                      <OutLinedButton
                                        variant="outlined"
                                        onClick={() => {
                                          setEditSimple([]);
                                          setToggleDrawer(false);
                                        }}
                                      >
                                        Cancel
                                      </OutLinedButton>

                                      <OutLinedButton
                                        variant="outlined"
                                        onClick={() => {
                                          updateQuantity(simple);
                                        }}
                                      >
                                        {createLoader == true ? (
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
                                          "Update"
                                        )}
                                      </OutLinedButton>
                                    </>
                                  ) : (
                                    <>
                                      <OutLinedButton
                                        variant="outlined"
                                        onClick={() => {
                                          handleSimpleProductDelete(simple);
                                        }}
                                      >
                                        Delete
                                      </OutLinedButton>
                                      <SmallFilledBtn
                                        variant="outlined"
                                        onClick={() => {
                                          setEditSimple(simple);
                                          setSimpleQuanity(
                                            simple?.configrations?.[0]?.quantity
                                          );
                                        }}
                                      >
                                        Edit
                                      </SmallFilledBtn>
                                    </>
                                  )}
                                </MultipleButton>
                              </ProductBoxRight>
                            </Grid>
                          </Grid>
                        </ProductBgInfo>
                        <OverViewInfoP>
                          <OverViewHeading>
                            <Typography> Overview</Typography>
                          </OverViewHeading>
                          <OverViewSection>
                            <Grid container spacing={2}>
                              <Grid item xs={6} sm={2.5} md={2.5}>
                                <BrandBoxStyle>
                                  <Typography variant="h6">{"Manufacturer/Brand"}</Typography>
                                  <Typography variant="body1">
                                    <LightTooltip
                                      disableInteractive
                                      arrow
                                      title={"Brand Name"}
                                      placement="top"
                                    ><span>Wassermann</span>
                                    </LightTooltip></Typography>

                                </BrandBoxStyle>
                              </Grid>
                              <Grid item xs={6} sm={2.5} md={2.5}>
                                <OverViewInfo>
                                  <OverinfoLabel>
                                    Manufacturing Year
                                  </OverinfoLabel>
                                  <OverinfoValue>
                                    2020
                                  </OverinfoValue>
                                </OverViewInfo>
                              </Grid>
                              <Grid item xs={6} sm={2.5} md={2.5}>
                                <OverViewInfo>
                                  <OverinfoLabel>
                                    Model No.
                                  </OverinfoLabel>
                                  <OverinfoValue>
                                    X6020HD
                                  </OverinfoValue>
                                </OverViewInfo>
                              </Grid>
                              <Grid item xs={6} sm={2.5} md={2.5}>
                                <OverViewInfo>
                                  <OverinfoLabel>
                                    Condition
                                  </OverinfoLabel>
                                  <OverinfoValue>
                                    Refurbished to zero hour
                                  </OverinfoValue>
                                </OverViewInfo>
                              </Grid>
                              <Grid item xs={6} sm={2} md={2}>
                                <OverViewInfo>
                                  <OverinfoLabel>
                                    Post Validity
                                  </OverinfoLabel>
                                  <OverinfoValue>
                                    3 Months
                                  </OverinfoValue>
                                </OverViewInfo>
                              </Grid>
                            </Grid>
                          </OverViewSection>

                          <OverViewSection2>
                            <ProductFeatureSection sx={{ background: "none", padding: "0 12px 10px" }}>
                              {simple?.configrations.length > 0 && <SpecificationHeading variant="h3" sx={{
                                padding: "0px 0 5px"
                              }}>
                                Product Features & Characteristics
                              </SpecificationHeading>}
                             
                              <ProductInnerInfo>
                                {simple?.configrations &&
                                  simple?.configrations?.map((config) => (
                                    <Grid container spacing={2}>
                                      {config?.combinations &&
                                        JSON.parse(config?.combinations)?.map(
                                          (specifications) => (
                                            <Grid item xs={12} sm={3} md={3}>
                                              <RelatedLabel>
                                                {specifications?.name}
                                              </RelatedLabel>
                                              <Typography>
                                                {specifications?.values}
                                              </Typography>
                                            </Grid>
                                          )
                                        )}
                                    </Grid>
                                  ))}
                              </ProductInnerInfo>


                            </ProductFeatureSection>
                          </OverViewSection2>
                        </OverViewInfoP>
                        <DataProductTypeData1>
                          <Typography>
                            This is <span className="in-stockp">In Stock</span>{" "}
                            product, available for purchase at below listed
                            price.
                          </Typography>
                          <DataProductTypeInner>
                            <PriceQuoteColumn>
                              <Grid container>
                                <Grid item xs={12} md="auto" sx={{ padding: "0" }}>
                                  <PriceQuoteInfo>
                                    <Typography variant="h5">
                                      US$50.00
                                    </Typography>
                                    <Typography variant="body1">
                                      1 - 99 pieces
                                    </Typography>
                                  </PriceQuoteInfo>
                                </Grid>
                                <Grid item xs={12} md="auto" sx={{ padding: "0" }}>
                                  <PriceQuoteInfo>
                                    <Typography variant="h5">
                                      US$50.00
                                    </Typography>
                                    <Typography variant="body1">
                                      1 - 99 pieces
                                    </Typography>
                                  </PriceQuoteInfo>
                                </Grid>
                                <Grid item xs={12} md="auto" sx={{ padding: "0" }}>
                                  <PriceQuoteInfo>
                                    <Typography variant="h5">
                                      US$50.00
                                    </Typography>
                                    <Typography variant="body1">
                                      1 - 99 pieces
                                    </Typography>
                                  </PriceQuoteInfo>
                                </Grid>
                                <Grid item xs={12} md="auto" sx={{ padding: "0" }}>
                                  <PriceQuoteInfo>
                                    <Typography variant="h5">
                                      US$50.00
                                    </Typography>
                                    <Typography variant="body1">
                                      1 - 99 pieces
                                    </Typography>
                                  </PriceQuoteInfo>
                                </Grid>
                                <Grid item xs={12} md="auto" sx={{ padding: "0" }}>
                                  <PriceQuoteInfo>
                                    <Typography variant="h5">
                                      US$50.00
                                    </Typography>
                                    <Typography variant="body1">
                                      1 - 99 pieces
                                    </Typography>
                                  </PriceQuoteInfo>
                                </Grid>
                                <Grid item xs={12} md="auto" sx={{ padding: "0" }}>
                                  <PriceTermVlue>
                                    <Typography variant="h6">
                                      EX Work
                                      <LightTooltip
                                        disableInteractive
                                        arrow
                                        placement="top"
                                        title={
                                          "EX Work"
                                        }
                                      >
                                        <InfoOutlinedIcon />
                                      </LightTooltip>
                                    </Typography>
                                  </PriceTermVlue>
                                </Grid>
                              </Grid>
                            </PriceQuoteColumn>

                          </DataProductTypeInner>
                        </DataProductTypeData1>
                        <QuantityBox>
                          <div style={{ display: "flex", alignItems: "center" }}>

                            {editSimple?.id == simple?.id ? (
                              <>
                                <SimpleQuantityCompo>
                                  <CountQty
                                    className="simplqtybox"
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                  >
                                    <RemoveIcon
                                      sx={{ cursor: "pointer" }}
                                      onClick={() => {
                                        if (simpleQuanity > 1) {
                                          setSimpleQuanity(
                                            simpleQuanity - 1
                                          );
                                        }
                                      }}
                                    />
                                    <TextField
                                      size="small"
                                      onChange={(e) => {
                                        const re = /^[0-9+\-/()]+$/;
                                        const newValue = e.target.value;
                                        if (
                                          newValue === "" ||
                                          re.test(newValue)
                                        ) {
                                          setSimpleQuanity(newValue);
                                        }
                                      }}
                                      value={simpleQuanity}
                                    />
                                    <AddIcon
                                      sx={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setSimpleQuanity(
                                          simpleQuanity + 1
                                        );
                                      }}
                                    />
                                  </CountQty>
                                </SimpleQuantityCompo>
                                <span>$2999/unit</span>
                              </>
                            ) : (
                              <>
                                <FormControl sx={{ width: 80 }} size="small">
                                  <TextField size="small" variant="outlined"
                                    id="outlined-basic"
                                    label="Quantity"
                                    defaultValue="100"
                                    value={simple?.configrations?.[0]?.quantity
                                      ? simple?.configrations?.[0]?.quantity
                                      : "N/A"}
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />
                                </FormControl>
                                <span>$2999/unit</span>
                              </>
                            )}


                          </div>


                          <Box sx={{ display: "flex", justifyContent: "space-between", gap: "50px" }}>
                            <Box>
                              <RProductLabel>Unit Price</RProductLabel>
                              <Typography>
                                {simple?.configrations?.[0]?.price
                                  ? `$ ` +
                                  simple?.configrations?.[0]?.price
                                  : "--"}
                              </Typography>
                            </Box>
                            <Box>
                              <RProductLabel>Amount</RProductLabel>
                              <AmountValue>
                                <Typography>
                                  <span className="labeltext">
                                    ${" "}
                                    {simple?.configrations?.[0]?.price *
                                      simple?.configrations?.[0]?.quantity}
                                  </span>
                                </Typography>
                              </AmountValue>
                            </Box>
                          </Box>
                        </QuantityBox>
                      </AccordionContent>
                    </OuterContentAccor>
                  </BoxAccordianInner>
                ))}
              </AccordionDetails>
            </Accordion>
          )} */}
        </div>
        {enquiryDetail?.variation?.length > 0 ||
        enquiryDetail?.simple?.length > 0 ? (
          // <AdditionalDetail>
          //   <AdditionalTitle variant="h4">
          //     Additional Details
          //     {/* <GreenboxValue>
          //     <Tooltip title="Price Terms" arrow>
          //       <Typography>{priceTerm}!</Typography>
          //     </Tooltip>
          //   </GreenboxValue> */}
          //   </AdditionalTitle>
          //   <Typography sx={{ fontSize: 12 }}>{notes}</Typography>
          // </AdditionalDetail>
          <>
            <GreyBoxInfo sx={{ margin: "10px 0" }}>
              <Box className="customize-title">Customize Your Request</Box>
              <CustomizeInfoInn>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} md={6}>
                    <CustomizeInfosection>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={7} md={7}>
                          <div>
                            <CustomInfoTitle>Origin</CustomInfoTitle>
                            <CustomSelectedChip>
                              <CountryChip>
                                {enquiryDetailResponse?.enquiry?.selectedOrigin}
                              </CountryChip>
                            </CustomSelectedChip>
                          </div>
                        </Grid>

                        <Grid item xs={12} sm={5} md={5}>
                          <div className="Myinfovalues">
                            <CustomInfoTitle>Delivery Term</CustomInfoTitle>
                            <CustomInfoValue>
                              {enquiryDetailResponse?.enquiry?.userPriceTerms}
                            </CustomInfoValue>
                          </div>
                        </Grid>
                      </Grid>
                    </CustomizeInfosection>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <CustomizeInfosection>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={5} md={5}>
                          <div>
                            <CustomInfoTitle>Shipping Method</CustomInfoTitle>
                            <CustomInfoValue>
                              {" "}
                              {`by ${capitalizeFirstLetter(
                                enquiryDetailResponse?.enquiry?.shipingMethod
                              )}`}
                            </CustomInfoValue>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <div className="Myinfovalues">
                            <CustomInfoTitle>Destination Port</CustomInfoTitle>
                            <DestinationPort>
                              <DestinationPortInn>
                                <CustomInfoValue>Port Country</CustomInfoValue>
                                <CustomInfoValue2>
                                  {enquiryDetailResponse?.enquiry?.portCountry}
                                </CustomInfoValue2>
                              </DestinationPortInn>
                              <DestinationPortInn>
                                <CustomInfoValue>
                                  {capitalizeFirstLetter(
                                    enquiryDetailResponse?.enquiry
                                      ?.shipingMethod
                                  )}{" "}
                                  port
                                </CustomInfoValue>
                                <CustomInfoValue2>
                                  {
                                    enquiryDetailResponse?.enquiry
                                      ?.destination_port
                                  }
                                </CustomInfoValue2>
                              </DestinationPortInn>
                            </DestinationPort>
                          </div>
                        </Grid>
                      </Grid>
                    </CustomizeInfosection>
                  </Grid>
                </Grid>
              </CustomizeInfoInn>
            </GreyBoxInfo>
            <GreyBoxInfo>
              <Box className="customize-title">More Information</Box>
              <CustomizeInfoInn>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <CustomizeInfosection>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} md={6}>
                          <div>
                            <CustomInfoTitle>
                              Purpose Of Inquiry
                            </CustomInfoTitle>
                            <DestinationPort>
                              <DestinationPortInn>
                                <CustomInfoValue>Inquiry</CustomInfoValue>
                                <CustomInfoValue2>
                                  {
                                    enquiryDetailResponse?.enquiry
                                      ?.purposeOfInquiry
                                  }
                                </CustomInfoValue2>
                              </DestinationPortInn>
                              <DestinationPortInn>
                                <CustomInfoValue>
                                  Project Location
                                </CustomInfoValue>
                                <CustomInfoValue2>
                                  {
                                    enquiryDetailResponse?.enquiry
                                      ?.projectLocation
                                  }
                                </CustomInfoValue2>
                              </DestinationPortInn>
                            </DestinationPort>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <div className="Myinfovalues">
                            <CustomInfoTitle>
                              Project Information
                            </CustomInfoTitle>
                            <DestinationPort>
                              <DestinationPortInn>
                                <CustomInfoValue>Port Country</CustomInfoValue>
                                <CustomInfoValue2>
                                  {enquiryDetailResponse?.enquiry?.portCountry}
                                </CustomInfoValue2>
                              </DestinationPortInn>
                              <DestinationPortInn>
                                <CustomInfoValue>
                                  {capitalizeFirstLetter(
                                    enquiryDetailResponse?.enquiry
                                      ?.shipingMethod
                                  )}{" "}
                                  port
                                </CustomInfoValue>
                                <CustomInfoValue2>
                                  {
                                    enquiryDetailResponse?.enquiry
                                      ?.destination_port
                                  }
                                </CustomInfoValue2>
                              </DestinationPortInn>
                            </DestinationPort>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                          <Divider component="div" sx={{ width: "100%" }} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                          <div>
                            <CustomInfoTitle>
                              Competitor Information
                            </CustomInfoTitle>
                            <DestinationPort>
                              <Grid container spacing={1}>
                                {(enquiryDetailResponse?.enquiry?.competitor)
                                  .split(",")
                                  .map((value, index) => {
                                    return (
                                      <Grid item xs={12} sm={3} md={3}>
                                        <DestinationPortInn>
                                          <CustomInfoValue>
                                            Competitor {index + 1}
                                          </CustomInfoValue>
                                          <CustomInfoValue2>
                                            {value}
                                          </CustomInfoValue2>
                                        </DestinationPortInn>
                                      </Grid>
                                    );
                                  })}
                              </Grid>
                            </DestinationPort>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                          <Divider component="div" sx={{ width: "100%" }} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                          <div>
                            <CustomInfoTitle>
                              Product Application
                            </CustomInfoTitle>

                            <DestinationPort>
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={3} md={3}>
                                  <Typography>
                                    {
                                      enquiryDetailResponse?.enquiry
                                        ?.productApplications
                                    }
                                  </Typography>
                                </Grid>
                              </Grid>
                            </DestinationPort>
                          </div>
                        </Grid>
                      </Grid>
                    </CustomizeInfosection>
                  </Grid>
                </Grid>
              </CustomizeInfoInn>
            </GreyBoxInfo>
          </>
        ) : (
          <CrmNoDetailFound>
            <CrmNoDetailFoundInner>
              <img src="/assets/images/crm/crm-emptydata.svg" alt="" />
              <Typography>No Enquiry Detail Found</Typography>
            </CrmNoDetailFoundInner>
          </CrmNoDetailFound>
        )}
        {enquiryDetail?.variation?.length > 0 ||
          (enquiryDetail?.simple?.length > 0 && (
            <TotalProductCount>
              <TotalProductBox>
                <ProductRow>
                  <Typography>Price Term</Typography>
                  <div className="Countbox">
                    {enquiryDetailResponse?.enquiry?.userPriceTerms}
                  </div>
                </ProductRow>
                <ProductRow>
                  <Typography>Total Products</Typography>
                  <div className="Countbox">
                    {
                      // enquiryDetail?.variation
                      //   ?.map((variation) => variation?.totalQuantity)
                      //   .reduce(
                      //     (accumulator, currentValue) =>
                      //       accumulator + currentValue,
                      //     0
                      // ) +
                      enquiryDetail?.simple?.length

                      // ?.map((simple) => simple?.totalQuantity)
                      // .reduce(
                      //   (accumulator, currentValue) =>
                      //     accumulator + currentValue,
                      //   0
                      // )
                    }
                  </div>
                </ProductRow>
                <ProductRow>
                  <Typography>Total Quantity</Typography>
                  <div className="Countbox">
                    {
                      // enquiryDetail?.variation
                      //   ?.map((variation) => variation?.totalQuantity)
                      //   .reduce(
                      //     (accumulator, currentValue) =>
                      //       accumulator + currentValue,
                      //     0
                      // ) +
                      enquiryDetail?.simple
                        ?.map((simple) => simple?.totalQuantity)
                        .reduce(
                          (accumulator, currentValue) =>
                            accumulator + currentValue,
                          0
                        )
                    }
                  </div>
                </ProductRow>
                <Divider className="totaldivider" />
                <GrandTotalRow>
                  <Typography>Grand Total </Typography>

                  <Typography style={{ color: "#d7282f" }}>
                    ${" "}
                    {
                      // enquiryDetail?.variation
                      //   ?.map((variation) => variation?.calculatedPrice)
                      //   .reduce(
                      //     (accumulator, currentValue) =>
                      //       accumulator + currentValue,
                      //     0
                      //   ) +

                      enquiryDetail?.simple
                        ?.map(
                          (simple) =>
                            simple?.final_price * simple?.totalQuantity
                        )
                        .reduce(
                          (accumulator, currentValue) =>
                            accumulator + currentValue,
                          0
                        )
                    }
                  </Typography>
                </GrandTotalRow>
              </TotalProductBox>
            </TotalProductCount>
          ))}
      </EnquiryDetailData>
      <div>
        <React.Fragment key={"right"}>
          <EditSwipeableDrawerStyle
            anchor={"right"}
            open={toggleDrawer}
            onClose={() => console.log(".........")}
            onOpen={() => setToggleDrawer(true)}
          >
            {list("left")}
          </EditSwipeableDrawerStyle>
        </React.Fragment>
      </div>
    </>
  );
};
export default EnquiryDetail;
