// import {
//   Button,
//   CircularProgress,
//   getSelectUtilityClasses,
//   OutlinedInput,
//   styled,
//   TextField,
//   Typography,
//   Autocomplete,
// } from "@mui/material";
// import React, { useState, useEffect, useContext } from "react";
// import Auth from "../../../auth/Auth";
// import InputAdornment from "@mui/material/InputAdornment";
// import { MyAppContext } from "../../../contextApi/appContext";
// import makeStyles from "@mui/styles/makeStyles";
// import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
// import { display } from "@mui/system";
// // import metaIcon from "../../../assets/images/metaKeywordIcon.svg";
// import uploadIcon from "../../../assets/images/upoadImageIcon.svg";
// import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined";
// // import helpIcon from "../../../assets/images/helpIcon.svg";
// import btnrtarrow from "../../../assets/images/buttonrightarrow.svg";
// import Tooltip from "@mui/material/Tooltip";
// import FormControl from "@mui/material/FormControl";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import uploadIconBrowse from "../../../assets/images/uploadIcon.svg";
// import crossicon from "../../../assets/images/crossIcon.svg";
// import Box from "@mui/material/Box";
// import Tab from "@mui/material/Tab";
// import { TabContext, TabList, TabPanel } from "@mui/lab";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
// import deleteIcon from "../../../assets/images/deleteIcon.svg";
// import tickIcon from "../../../assets/images/smallTick.svg";
// import plusSign from "../../../assets/images/plus_Sign.svg";
// // import greenExclamation from "../../../assets/images/greenExclamation.svg";
// import { EditableTextField } from "./AddProductSubComponents/EditableTextField";
// import { FileUploadProductDescription } from "./AddProductSubComponents/FileUploadProductDescription";
// import { OrderAndPrice } from "./AddProductSubComponents/OrderAndPrice";
// import { AttributeItem } from "./AddProductSubComponents/AttributeItem";
// import { EditAttribute } from "./AddProductSubComponents/EditAttribute";
// import { SelectableTextField } from "./AddProductSubComponents/SelectableTextField";
// import { postValidityOptions } from "../../../utils/AddProductPageSelectDropdownsData/staticData";
// import { attributes } from "../../../utils/AddProductPageSelectDropdownsData/staticData";
// import { ManufacturingYears } from "../../../utils/AddProductPageSelectDropdownsData/staticData";
// import { BASE_URL } from "../../../utils/staticValues";
// import Image from "next/image";
// import CustomAutocompelete from "@/components/products/common/autoCompelete";

// const PreHeaderText = styled("div")({
//   fontFamily: "open sans",
//   fontWeight: 600,
//   fontSize: "30px",
//   lineHeight: "41px",
//   marginBottom: "30px",
//   display: "flex",
//   // paddingLeft: "15px",
//   color: "#231F20",
// });

// const TextFieldHelperText = styled("p")({
//   textAlign: "end",
//   fontWeight: 400,
//   fontSize: "11px",
//   lineHeight: "24px",
//   letterSpacing: "0.09px",
//   color: "#727272",
// });

// const OuterContainer = styled("div")({
//   background: "#f5f7fa",
//   padding: "15px",
//   minHeight: "calc(100vh - 64px)",
//   width: "100%",
//   display: "flex",
//   // marginTop: "64px",
// });
// const ProductCategoryContainer = styled("div")({
//   background: "#FFFFFF",
//   boxShadow:
//     "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
//   borderRadius: "6px",
// });
// const Heading = styled("div")({
//   fontWeight: 600,
//   fontSize: "18px",
//   lineHeight: "25px",
//   color: "#000000",
//   padding: "10px 10px 5px",
//   fontFamily: "open sans",
// });
// const SubHeading = styled("div")({
//   fontWeight: 400,
//   fontSize: "13px",
//   lineHeight: "18px",
//   display: "flex",
//   alignItems: "center",
//   padding: "10px 10px 15px",
//   fontFamily: "open sans",

//   color: "#414141",
// });
// const CategorySelector = styled("div")({
//   minHeight: "48px",
//   background: "#ECECEC",
//   borderRadius: "6px",
//   margin: "16px",
//   marginBottom: "16px",
//   paddingLeft: "10px",
//   paddingRight: "10px",
// });
// const LeftHeading = styled("div")({
//   padding: "15px",
//   width: "fit-content",
// });
// const RightContent = styled("div")({
//   display: "flex",
//   // height: "100%",
//   minHeight: "48px",

//   alignItems: "center",
// });
// const CategoryHeader = styled("div")({
//   // height: "36px",
//   // border: "1px solid #ABAAAA",
//   // borderRadius: "6px",
//   // display: "flex",
//   // justifyContent: "space-between",
//   // alignItems: "center",
//   // paddingLeft: "15px",
//   // paddingRight: "10px",
//   // minWidth: "220px",
//   // cursor: "pointer",
//   display: "flex",
// });
// const CategoryHeaderText = styled("div")({
//   fontWeight: 400,
//   fontSize: "13px",
//   lineHeight: "18px",
// });
// const CategoryHeaderButton = styled("div")({
//   width: "25px",
//   height: "25px",
//   background: "#DD484E",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   borderRadius: "50%",
//   color: "white",
//   fontSize: "23px",
//   lineHeight: "25px",
//   cursor: "pointer",
// });
// const CategoryList = styled("div")({
//   minWidth: "252px",
//   height: "308px",
//   border: "1px solid #ABAAAA",
//   borderRadius: "6px",
//   overflowY: "auto",
//   paddingTop: "5px",
//   paddingLeft: "5px",
//   paddingRight: "5px",

//   "&::-webkit-scrollbar": {
//     width: "0.4em",
//   },
//   "&::-webkit-scrollbar-track": {
//     boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
//     webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
//     borderRadius: "6px",
//   },
//   "&::-webkit-scrollbar-thumb": {
//     backgroundColor: "rgba(0,0,0,.1)",
//     borderRadius: "6px",

//     // outline: "1px solid slategrey",
//   },
// });

// const CategoryListItem = styled("div")({
//   color: "black",
//   width: "100%",
//   fontSize: "13px",
//   lineHeight: "18px",
//   padding: "6px",
//   paddingLeft: "10px",
//   borderRadius: "6px",
//   textOverflow: "ellipsis",
//   // marginLeft: "5px",
//   cursor: "pointer",
//   "&:hover": {
//     background: "#DD484E",
//     color: "white",
//   },
// });
// const CategoriesListOuterRightContainer = styled("div")({
//   display: "flex",
//   overflowX: "auto",
//   gap: "20px",
//   padding: "15px",

//   "&::-webkit-scrollbar": {
//     height: "5px",
//   },
//   "&::-webkit-scrollbar-track": {
//     boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
//     webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
//     borderRadius: "6px",
//   },
//   "&::-webkit-scrollbar-thumb": {
//     backgroundColor: "rgba(0,0,0,.1)",
//     borderRadius: "6px",

//     // outline: "1px solid slategrey",
//   },
// });
// const CategoriesListInnerContainer = styled("div")({
//   display: "flex",
//   flexDirection: "column",
//   gap: "7px",
//   maxWidth: "252px",
// });

// const CategoryContainerSmall = styled("div")({
//   fontSize: "12px",
//   lineHeight: "16px",
//   background: "white",
//   color: "#000000",
//   padding: "5px",
//   borderRadius: "6px",
//   cursor: "pointer",
// });

// const CategoriesOuterContainer = styled("div")({
//   display: "flex",
//   // paddingBottom: "20px",
// });

// const CategoriesInnerLeftContainer = styled("div")({
//   padding: "15px",
//   boxShadow: "5px 0 2px -2px #888",
//   // "0px 9px 16px rgba(159, 162, 191, 0.1), 0px 2px 2px rgba(159, 162, 191, 0.6)",
// });

// const CategoriesInnerRightContiner = styled("div")({
//   display: "flex",
//   overflowX: "auto",
// });

// const InnerLeftContainer = styled("div")({
//   width: "calc(100% - 240px)",
//   marginTop: "64px",
// });

// const InnerRightContainer = styled("div")({
//   position: "sticky",
//   width: "240px",
//   // border: "1px solid #D7282F",
//   height: "fit-content",
//   right: "0",
//   top: "150px",
//   margin: "10px",
//   display: "flex",
//   marginLeft: "15px",
//   justifyContent: "center",
//   alignItems: "center",
//   // boxShadow:
//   //   "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
//   borderRadius: "6px",
//   // background: "#FFFFFF",
//   paddingTop: "0px",
//   paddingBottom: "10px",
//   gap: "15px",
//   flexDirection: "column",
// });

// const AttributesWrapper = styled("div")({
//   display: "flex",
//   gap: "16px",
//   flexWrap: "wrap",
//   padding: "10px",
//   border: "1px solid #DDDDDD",
//   borderRadius: "6px",
//   marginTop: "10px",
//   maxHeight: "112px",
//   overflow: "auto",
//   "&::-webkit-scrollbar": {
//     width: "0.4em",
//   },
//   "&::-webkit-scrollbar-track": {
//     boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
//     webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
//     borderRadius: "6px",
//   },
//   "&::-webkit-scrollbar-thumb": {
//     backgroundColor: "rgba(0,0,0,.1)",
//     borderRadius: "6px",

//     // marginBottom:"20px"    // paddingBottom:"10px"

//     // outline: "1px solid slategrey",
//   },
// });
// const HelpCard = styled("div")({
//   display: "flex",
//   flexDirection: "column",
//   background: "#FFFFFF",
//   boxShadow:
//     "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
//   borderRadius: "6px",
//   height: "150px",
//   width: "100%",
//   padding: "15px",
// });

// const HelpCardHeader = styled("div")({
//   fontWeight: 600,
//   fontSize: "16px",
//   lineHeight: "30px",
//   color: "#DD484E",
//   // padding: "15px",
//   fontFamily: "open sans",
// });

// const HelpCardContentText = styled("div")({
//   fontWeight: 400,
//   fontSize: "12px",
//   lineHeight: "16px",
//   paddingTop: "5px",

//   color: "#000000",
// });

// const HelpCardFooterContainer = styled("div")({
//   paddingTop: "10px",
// });

// const HelpCardFooterButton = styled(Button)({
//   background: "#D7282F",
//   borderRadius: "4px",
//   textTransform: "none",
//   minWidth: "120px",
//   fontWeight: 600,
//   fontSize: "13px",
//   lineHeight: "24px",
//   /* identical to box height, or 185% */

//   letterSpacing: "0.09px",

//   color: "#FFFFFF",
//   "&:hover": {
//     background: "#D7282F",
//   },
// });

// const InnerRightMiddleContainer = styled("div")({
//   height: "98px",
//   background: "#FFFFFF",
//   boxShadow:
//     "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
//   borderRadius: "6px",
//   display: "flex",
//   width: "240px",
// });

// const ItemContent = styled("div")({
//   display: "flex",
//   flexDirection: "column",
//   flex: 0.5,
//   marginTop: "10px",
//   marginBottom: "10px",
// });

// const IconContainer = styled("div")({
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   // marginTop: "15px",
//   marginBottom: "5px",
//   position: "relative",
// });

// const TextContainer = styled("div")({
//   fontWeight: 400,
//   fontSize: "12px",
//   lineHeight: "16px",
//   color: "#3A3A3A",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   flexDirection: "column",
// });

// const InnerRightContainerContent = styled("div")({
//   display: "flex",
//   flexDirection: "column",
//   gap: "20px",
//   boxShadow:
//     "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
//   borderRadius: "6px",
//   background: "#FFFFFF",
//   paddingTop: "12px",
// });

// const InnerRightContentProfileCompletionBox = styled("div")({
//   display: "flex",
//   flexDirection: "column",
//   // background: "#FFFFFF",

//   width: "100%",
//   // gap: "20px",
// });

// const CircularContainer = styled("div")({
//   position: "relative",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// });

// const OuterCircle = styled("div")({
//   width: "130px",
//   height: "130px",
//   borderRadius: "50%",
//   // border: "4px solid #DD484E",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// });

// const InnerCircle = styled("div")({
//   width: "104px",
//   height: "104px",
//   borderRadius: "50%",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   background: "#F2F2F2",
//   border: "1px solid #DDDDDD",
//   position: "absolute",
//   // top: "5px",
//   // left: "5px",
//   // right: "5px",
//   // bottom: "5px",
// });

// const DescriptionText = styled("div")({
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   fontWeight: 400,
//   fontSize: "12px",
//   lineHeight: "15px",
//   marginTop: "10px",
//   /* or 125% */
//   marginBottom: "10px",
//   textAlign: "center",

//   color: "#5F5F5F",
// });

// const ButtonContainer = styled("div")({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-around",
//   padding: "10px",
// });

// const ProductContentContainer = styled("div")({
//   padding: "16px",
//   // border: "1px solid black",
//   width: "100%",
//   background: "#ffff",
//   marginTop: "16px",
//   boxShadow:
//     "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
//   display: "flex",
//   justifyContent: "center",
//   gap: "16px",
//   alignItems: "center",
//   flexDirection: "column",
// });

// const ProductSectionHeaderContainer = styled("div")({
//   height: "35px",
//   borderBottom: "1px solid #DDDDDD",
//   fontWeight: 500,
//   fontSize: "18px",
//   lineHeight: "25px",
//   width: "100%",
//   marginBottom: "8px",
// });

// const ProductDescriptionFileUploader = styled("div")({
//   width: "100%",
//   border: "1px dashed #BBBBBB",
//   borderRadius: "4px",
//   height: "102px",
//   position: "relative",
// });

// const FileUploaderHeading = styled("div")({
//   position: "absolute",
//   top: "-8px",
//   left: "10px",
//   fontWeight: 600,
//   fontSize: "13px",
//   lineHeight: "12px",
//   paddingLeft: "10px",
//   paddingRight: "10px",
//   background: "white",
//   letterSpacing: "0.4px",
//   width: "fit-content",
//   color: "#1C1C1C",
// });

// const FileUploaderContent = styled("div")({
//   display: "flex",
//   margin: "auto",
//   marginTop: "8px",
// });

// const ContentDescription = styled("div")({
//   width: "100%",
// });

// const ContentDescriptionHeader = styled("div")({
//   fontWeight: 600,
//   fontSize: "14px",
//   lineHeight: "24px",
//   letterSpacing: "0.09px",
//   color: "#000000",
// });

// const ContentDescriptionText = styled("div")({
//   fontWeight: 400,
//   fontSize: "12px",
//   lineHeight: "24px",
//   /* identical to box height, or 200% */
//   letterSpacing: "0.09px",
//   color: "#414141",
// });

// const TabsContainer = styled("div")({
//   width: "100%",
// });
// const useStyles: any = makeStyles({
//   customTextField: {
//     "& input::placeholder": {
//       fontSize: "13px",
//     },
//   },
//   customInputFieldsProduct: {
//     "& input::placeholder": {
//       fontSize: "13px",
//       fontWeight: "bold",
//     },
//   },
//   buttonGroup: {
//     display: "flex",
//     gap: "16px !important",
//     marginTop: "16px !important",
//     marginBottom: "16px",
//     // paddingLeft: "30px",
//     flexWrap: "wrap",
//   },

//   customToggleButton: {
//     border: "1px solid rgba(0, 0, 0, 0.12) !important",
//     borderLeft: "1px solid rgba(0, 0, 0, 0.12) !important",
//     textTransform: "none",
//     // height: "28px",
//     minWidth: "90px",
//     maxHeight: "40px",
//     // border: 1px solid #979797;
//     borderRadius: "4px !important",
//     fontWeight: "500 !important",
//     fontSize: "14px !important",
//     lineHeight: "24px !important",
//     fontFamily: "open sans !important",
//     /* identical to box height, or 171% */
//     // opacity: "0.9 !important",
//     letterSpacing: "0.09px",
//     color: "black !important",
//     paddingLeft: "6px !important",
//     paddingRight: "6px !important",
//   },

//   customToggleButtonSelected: {
//     border: "1px solid rgba(0, 0, 0, 0.12) !important",
//     borderLeft: "1px solid rgba(0, 0, 0, 0.12) !important",
//     textTransform: "none",
//     // height: "28px",
//     minWidth: "90px",
//     maxHeight: "40px",
//     borderRadius: "4px !important",
//     fontWeight: "500 !important",
//     fontSize: "14px !important",
//     lineHeight: "24px !important",
//     fontFamily: "open sans !important",
//     /* identical to box height, or 171% */
//     // opacity: "0.9 !important",
//     letterSpacing: "0.09px",
//     backgroundColor: "#DD484E !important",
//     color: "white !important",
//     paddingLeft: "6px !important",
//     paddingRight: "6px !important",
//     // fontWeight:"bold !important"
//   },

//   pricingTypeCustomToggleButton: {
//     fontWeight: "400 !important",
//     fontSize: "14px !important",
//     lineHeight: "24px !important",
//     letterSpacing: "0.09px !important",
//     height: "28px !important",
//     border: "1px solid #979797 !important",
//     borderRadius: "4px !important",
//     padding: "2px 12px !important",
//     color: "#000000 !important",
//   },

//   pricingTypeCustomToggleButtonSelected: {
//     height: "28px !important",
//     background: "#34A853 !important",
//     border: "1px solid #A4A4A4 !important",
//     borderRadius: "4px !important",
//     fontWeight: 600,
//     fontSize: "14px !important",
//     lineHeight: "24px !important",
//     letterSpacing: "0.09px !important",
//     color: "#FFFFFF !important",
//     padding: "2px 12px !important",
//   },

//   customScrollClass: {
//     "&::-webkit-scrollbar": {
//       width: "5px",
//     },
//     "&::-webkit-scrollbar-track": {
//       boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
//       webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
//       borderRadius: "6px",
//     },
//     "&::-webkit-scrollbar-thumb": {
//       backgroundColor: "rgba(0,0,0,.1)",
//       borderRadius: "6px",
//     },
//   },
// });

// const shippedInVariables = [
//   { value: "Days", view: "Days" },
//   { value: "weeks", view: "Weeks" },
//   { value: "Months", view: "Months" },
//   { value: "Years", view: "Years" },
// ];

// const AddProduct = () => {
//   const {classes} = useStyles();

//   const [parentCategories, setParentCategories] = useState<any>([]);
//   const [categoriesState, setCategoriesState] = useState<any>([]);
//   const [selectedCategories, setSelectedCategories] = useState<any>([]);
//   const [productDatasheet, setProductDatasheet] = useState<any>();
//   const [deliveryTime, setDeliveryTime] = useState<any>("");
//   const [brandsData, setBrandsData] = useState<any>();

//   const [addProductState, setAddProductState] = useState({
//     productDescription: {
//       preTitle: {
//         value: "",
//         characterCount: "",
//         error: false,
//         helperText: "",
//       },
//       productName: {
//         value: "",
//         characterCount: "",
//         error: false,
//         helperText: "",
//       },
//       aboutProduct: {
//         value: "",
//         characterCount: "",
//         error: false,
//         helperText: "",
//       },
//       dataSheet: {
//         value: "",
//         characterCount: "",
//         error: false,
//         helperText: "",
//       },
//     },

//     productInformation: {
//       productAvailability: {
//         inStock: {
//           postValidity: "",
//           manufacturerBrand: "",
//           manufacturingYear: "",
//           modelNumber: "",
//         },
//       },
//       condition: "Brand new",
//     },
//   });

//   const [productAvailability, setProductAvailability] = useState<any>("1");
//   const [productCondition, setProductCondition] = useState<string>("Brand New");
//   const [informationType, setInformationType] = useState("1");
//   const [attributesData, setAttributesData] = useState(attributes);
//   const [pricingType, setPricingType] = useState("Quantity Based Pricing");
//   const [deliverySelect, setDeliverySelect] = useState("");
//   const [orderPricing, setOrderPricing] = useState([
//     {
//       minQuantity: "",
//       maxQuantity: "",
//       pricePerUnit: "",
//       id: 1,
//       unit: "",
//       currency: "",
//     },
//   ]);

//   const [newAttributeValue, setNewAttributeValue] = useState("");

//   const selectDurationVariable = (e) => {
//     setDeliverySelect(e.target.value);
//   };

//   const [
//     hierarchyCountAndCorrespondingData,
//     setHierarchyCountAndCorrespondingData,
//   ] = useState<any>({
//     hierarchy: 0,
//     data: {},
//     next: {},
//   });
//   const { completeScreenLoader, setCompleteScreenLoader } =
//     useContext(MyAppContext);

//   const handleDeliveryTime = (e) => {
//     const value = e.target.value;
//     const onlyNums = e.target.value.replace(/[^0-9]/g, "");

//     setDeliveryTime(onlyNums);
//   };

//   const handlePostValidity = (e) => {
//     console.log(e.target.value);
//     const value = e.target.value;

//     setAddProductState((prev) => ({
//       ...prev,
//       productInformation: {
//         ...prev.productInformation,
//         productAvailability: {
//           inStock: {
//             ...prev.productInformation.productAvailability.inStock,
//             postValidity: value,
//           },
//         },
//       },
//     }));
//   };

//   const handleManufacturerBrand = (e) => {
//     const value = e.target.value;
//     setAddProductState((prev) => ({
//       ...prev,
//       productInformation: {
//         ...prev.productInformation,
//         productAvailability: {
//           inStock: {
//             ...prev.productInformation.productAvailability.inStock,
//             manufacturerBrand: value,
//           },
//         },
//       },
//     }));
//   };

//   const handleManufacturingYear = (e) => {
//     const value = e.target.value;

//     setAddProductState((prev) => ({
//       ...prev,
//       productInformation: {
//         ...prev.productInformation,
//         productAvailability: {
//           inStock: {
//             ...prev.productInformation.productAvailability.inStock,
//             manufacturingYear: value,
//           },
//         },
//       },
//     }));
//   };

//   const removeProductDatasheet = () => {
//     setProductDatasheet((prev) => null);
//   };

//   const updateProductDatasheet = (e) => {
//     console.log(e.target.files);
//     setProductDatasheet(e.target.files[0]);
//   };

//   const handleNewAttributeValueChange = (e) => {
//     const value = e.target.value;

//     setNewAttributeValue(value);
//   };

//   const handlePricingChange = (e, value) => {
//     console.log(value);
//     setPricingType(value);
//   };

//   const addMoreSection = () => {
//     setOrderPricing((prev) => [
//       ...prev,
//       {
//         minQuantity: "",
//         maxQuantity: "",
//         pricePerUnit: "",
//         id: prev.length + 1,
//         unit: "",
//         currency: "",
//       },
//     ]);
//   };

//   const handleProductDescriptionChange = (e) => {
//     console.log("I ran");
//     const name = e.target.name;
//     const value = e.target.value;
//     console.log(name, value, "acs");
//     setAddProductState((prev) => ({
//       ...prev,
//       productDescription: {
//         ...prev.productDescription,
//         [name]: {
//           ...prev.productDescription[name],
//           value,
//           characterCount: value.length,
//         },
//       },
//     }));
//   };

//   const handleAttributeChange = (id) => {
//     console.log(id);
//     setAttributesData((prev) =>
//       prev.map((element) => {
//         if (element?.id == id) {
//           return { ...element, selected: !element?.selected };
//         } else {
//           return element;
//         }
//       })
//     );
//   };

//   const handleAttributeValueChange = (id, value) => {
//     setAttributesData((prev) =>
//       prev.map((element) => {
//         if (element?.id === id) {
//           // do something
//           return { ...element, value: value };
//         } else {
//           return element;
//         }
//       })
//     );
//   };

//   const handleProductAvailabilityChange = (e, value) => {
//     console.log(value);
//     if (value) {
//       setProductAvailability(value.toString());
//     }
//   };

//   const handleInformationTypeChange = (e, value) => {
//     if (value) {
//       setInformationType(value);
//     }
//   };

//   // co

//   const handleProductCondition = (e) => {
//     console.log(e.target.value);
//     setProductCondition(e.target.value);
//   };

//   const handleCategoryClick = (elementId, level) => {
//     console.log(elementId, level);
//     // categoriesState.filter(element)

//     // handling categories State selected

//     setCategoriesState(
//       categoriesState.map((element) => {
//         if (element?.level == level) {
//           return {
//             ...element,
//             data: element.data.map((elem) => {
//               if (elem?.id == elementId) {
//                 setSelectedCategories((prev) => [...prev, elem]);
//                 return { ...elem, selected: true };
//               } else return { ...elem, selected: false };
//             }),
//           };
//         } else {
//           return element;
//         }
//       })
//     );

//     // setSelectedCategories(categoriesState.map((element) => element?.dat));
//   };

//   // api for adding attribute

//   const addAttribute = async () => {
//     const formData = new FormData();
//     formData.append("name", newAttributeValue);

//     const response = await fetch(`${BASE_URL}/attributes/passive/create`, {
//       headers: {
//         Authorization: `Bearer ${Auth.token()}`,
//       },
//       method: "POST",

//       body: formData,
//     });

//     const data = await response.json();
//     console.log(data);
//   };

//   const handleAddCategoryInputChange = (e, level) => {
//     const value = e.target.value;

//     setCategoriesState((prev) =>
//       prev.map((element) => {
//         if (element?.level == level) {
//           return {
//             ...element,
//             ["AddCategoryString"]: value,
//           };
//         } else {
//           return element;
//         }
//       })
//     );

//     console.log(categoriesState);
//   };

//   // getCategories Api

//   const getCategoriesList = async (parentId = 0, level) => {
//     // console.log(parentId, level, "id and level");
//     // return;
//     const payload = {
//       parent: parentId,
//       user_id: Auth?.userData()?.id,
//     };

//     try {
//       setCompleteScreenLoader(true);
//       const response = await fetch(`${BASE_URL}/categoryList`, {
//         headers: {
//           Authorization: `Bearer ${Auth.token()}`,
//           "Content-Type": "application/json",
//         },
//         method: "POST",

//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       console.log(data);
//       setCompleteScreenLoader(false);
//       if (parentId === 0)
//         setCategoriesState([
//           {
//             level: 0,
//             parentId: parentId,
//             data: [
//               ...data?.data?.map((element) => ({
//                 ...element,
//                 selected: false,
//               })),
//             ],

//             AddCategoryString: "",
//           },
//         ]);

//       // setParentCategories([
//       //   ...data?.data?.map((element) => ({ ...element, selected: false })),
//       //   { AddCategoryString: "", parentId },
//       // ]);

//       if (parentId !== 0) {
//         setCategoriesState((prev) =>
//           prev.filter((element) => element?.level <= level)
//         );

//         setCategoriesState(
//           (prev) => [
//             ...prev,
//             {
//               level: prev[prev.length - 1].level + 1,
//               parentId,
//               data: [
//                 ...data?.data?.map((element) => ({
//                   ...element,
//                   selected: false,
//                 })),
//               ],
//             },
//           ]

//           // prev.map((element) => {
//           //   if (element?.id !== parentId) {
//           //     return { ...element, children: [] };
//           //   } else {
//           //     return { ...element, children: data?.data };
//           //   }
//           // })
//         );

//         // setHierarchyCountAndCorrespondingData((prev) => ({
//         //   hierarchy: prev.hierarchy + 1,
//         //   data: data.data,
//         // }));
//       }
//     } catch (error) {
//       console.error(error);
//       setCompleteScreenLoader(false);
//     }
//   };

//   //------------- creating new categories--------------------------
//   const handleCreateCategory = async (id, name) => {
//     const payload = { parent_id: id, name, user_id: `${Auth?.userData()?.id}` };
//     console.log(payload);
//     try {
//       setCompleteScreenLoader(true);
//       const response = await fetch(`${BASE_URL}/category/create`, {
//         headers: {
//           Authorization: `Bearer ${Auth.token()}`,
//           "Content-Type": "application/json",
//         },
//         method: "POST",

//         body: JSON.stringify(payload),
//       });
//       const data = await response.json();
//       console.log(data);
//       setCompleteScreenLoader(false);
//       // getCategoriesList();

//       setCategoriesState((prev) =>
//         prev.map((element) => {
//           if (element?.parentId === id) {
//             return {
//               ...element,
//               data: [
//                 { name: name, id: data.data, selected: false },
//                 ...element?.data,
//               ],
//               AddCategoryString: "",
//             };
//           } else return element;
//         })
//       );
//     } catch (error) {
//       console.log(error);
//       setCompleteScreenLoader(false);
//     }
//   };

//   useEffect(() => {
//     getCategoriesList(0, 0);
//   }, []);

//   const getUnits = async () => {
//     const response = await fetch(`${BASE_URL}/unit`);
//     const data = await response.json();
//   };

//   const getPriceTerms = async () => {
//     const response = await fetch(`${BASE_URL}/price_terms`);

//     const data = await response.json();
//     console.log(data);
//   };
//   const getCurrency = async () => {
//     const response = await fetch(`${BASE_URL}/currency`);

//     const data = await response.json();
//   };

//   const getBrands = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/brands`);

//       const data = await response.json();
//       const requiredDataFormat = data.data.map((element) => ({
//         view: element?.name,
//         value: element?.id,
//       }));

//       setBrandsData(requiredDataFormat);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const getPassiveAttributes = async () => {
//     const response = await fetch(`${BASE_URL}/attributes/passive/list`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${Auth.token()}`,
//       },
//     });

//     const data = await response.json();
//     setAttributesData(data.data);
//   };

//   const getTerritory = async () => {
//     const response = await fetch(`${BASE_URL}/territory`);

//     const data = await response.json();
//   };

//   useEffect(() => {
//     getUnits();
//     getPriceTerms();
//     getCurrency();
//     getTerritory();
//     getBrands();
//     getPassiveAttributes();
//   }, []);

//   return (
//     <OuterContainer>
//       <InnerLeftContainer>
//         <PreHeaderText>Edit Product</PreHeaderText>
//         <ProductCategoryContainer>
//           <Heading>Product Category</Heading>
//           <SubHeading>
//             Choosing the best product type ensures that you see the most
//             appropriate data fields for your product. Browse the product types
//             directly or use search.
//           </SubHeading>
//           <CategorySelector>
//             {/* <LeftHeading>Selected Category</LeftHeading> */}
//             <RightContent>
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 {selectedCategories?.map((element) => (
//                   <>
//                     <CategoryContainerSmall>
//                       {element?.name}
//                     </CategoryContainerSmall>
//                     <ArrowRightOutlinedIcon />
//                   </>
//                 ))}
//               </div>
//             </RightContent>
//           </CategorySelector>
//           <CategoriesOuterContainer>
//             <>
//               <CategoriesInnerLeftContainer>
//                 {categoriesState.map((elem, index) => {
//                   if (index == 0)
//                     return (
//                       <CategoriesListInnerContainer key={index}>
//                         <CategoryHeader>
//                           <TextField
//                             classes={{ root: classes.customTextField }}
//                             size="small"
//                             placeholder={
//                               elem?.level === 0
//                                 ? `Add Parent Category`
//                                 : "Add Sub Category"
//                             }
//                             onChange={(e) => {
//                               handleAddCategoryInputChange(e, elem?.level);
//                             }}
//                             value={elem?.AddCategoryString}
//                             InputProps={{
//                               endAdornment: (
//                                 <InputAdornment position="end">
//                                   {" "}
//                                   <CategoryHeaderButton
//                                     onClick={() => {
//                                       const id =
//                                         categoriesState[
//                                           categoriesState?.length - 1
//                                         ].parentId;
//                                       const name =
//                                         categoriesState[
//                                           categoriesState?.length - 1
//                                         ].AddCategoryString;
//                                       handleCreateCategory(id, name);
//                                     }}
//                                   >
//                                     +
//                                   </CategoryHeaderButton>
//                                 </InputAdornment>
//                               ),
//                             }}
//                           ></TextField>
//                         </CategoryHeader>
//                         <CategoryList>
//                           {elem?.data?.map(
//                             (element, index) =>
//                               element?.name && (
//                                 <CategoryListItem
//                                   className={`${
//                                     element?.selected
//                                       ? elem?.parentId == 0
//                                         ? "selected-list-parent"
//                                         : "selected-list-children"
//                                       : ""
//                                   }`}
//                                   key={index}
//                                   onClick={() => {
//                                     handleCategoryClick(
//                                       element?.id,
//                                       elem?.level
//                                     );
//                                     getCategoriesList(element?.id, elem?.level);
//                                   }}
//                                 >
//                                   {element?.name}
//                                 </CategoryListItem>
//                               )
//                           )}
//                         </CategoryList>
//                       </CategoriesListInnerContainer>
//                     );
//                 })}
//               </CategoriesInnerLeftContainer>
//               <CategoriesListOuterRightContainer>
//                 {categoriesState.map((elem, index) => {
//                   if (index > 0)
//                     return (
//                       <CategoriesListInnerContainer key={index}>
//                         <CategoryHeader>
//                           <TextField
//                             classes={{ root: classes.customTextField }}
//                             size="small"
//                             placeholder={
//                               elem?.level === 0
//                                 ? `Add Parent Category`
//                                 : "Add Sub Category"
//                             }
//                             onChange={(e) => {
//                               handleAddCategoryInputChange(e, elem?.level);
//                             }}
//                             value={elem?.AddCategoryString}
//                             InputProps={{
//                               endAdornment: (
//                                 <InputAdornment position="end">
//                                   {" "}
//                                   <CategoryHeaderButton
//                                     onClick={() => {
//                                       const id =
//                                         categoriesState[
//                                           categoriesState?.length - 1
//                                         ].parentId;
//                                       const name =
//                                         categoriesState[
//                                           categoriesState?.length - 1
//                                         ].AddCategoryString;
//                                       handleCreateCategory(id, name);
//                                     }}
//                                   >
//                                     +
//                                   </CategoryHeaderButton>
//                                 </InputAdornment>
//                               ),
//                             }}
//                           ></TextField>
//                         </CategoryHeader>
//                         <CategoryList>
//                           {elem?.data?.map(
//                             (element, index) =>
//                               element?.name && (
//                                 <CategoryListItem
//                                   className={`${
//                                     element?.selected
//                                       ? elem?.parentId == 0
//                                         ? "selected-list-parent"
//                                         : "selected-list-children"
//                                       : ""
//                                   }`}
//                                   key={index}
//                                   onClick={() => {
//                                     handleCategoryClick(
//                                       element?.id,
//                                       elem?.level
//                                     );
//                                     getCategoriesList(element?.id, elem?.level);
//                                   }}
//                                 >
//                                   {element?.name}
//                                 </CategoryListItem>
//                               )
//                           )}
//                         </CategoryList>
//                       </CategoriesListInnerContainer>
//                     );
//                 })}
//               </CategoriesListOuterRightContainer>
//             </>
//           </CategoriesOuterContainer>
//         </ProductCategoryContainer>

//         <ProductContentContainer>
//           <ProductSectionHeaderContainer>
//             Product Description
//           </ProductSectionHeaderContainer>
//           <div style={{ width: "100%", display: "flex", gap: "16px" }}>
//             <FormControl sx={{ width: "50%" }}>
//               <EditableTextField
//                 name="preTitle"
//                 placeholder="Enter Title"
//                 label="Pre Title"
//                 labelToolTipText={
//                   "Adding Product Application/Type filters the buyer search easily."
//                 }
//                 fieldToolTipText={
//                   "Include product application/type in less than 2-3 words. For example, Booster Pumps, Flame-proof motors"
//                 }
//                 charactersCount={
//                   addProductState?.productDescription?.preTitle?.characterCount
//                 }
//                 value={addProductState?.productDescription?.preTitle?.value}
//                 handleChange={handleProductDescriptionChange}
//               ></EditableTextField>
//             </FormControl>
//             <FormControl sx={{ width: "50%" }}>
//               <EditableTextField
//                 name="productName"
//                 placeholder="Enter"
//                 label="Product Name/Title"
//                 labelToolTipText={
//                   "Post title along with keywords are used to better position in specific buyer’s search appearances."
//                 }
//                 fieldToolTipText={
//                   "Including accurate post title increases the appearance count in respective buyer’s searches"
//                 }
//                 charactersCount={
//                   addProductState?.productDescription?.productName
//                     ?.characterCount
//                 }
//                 value={addProductState?.productDescription?.productName?.value}
//                 handleChange={handleProductDescriptionChange}
//               ></EditableTextField>
//             </FormControl>
//           </div>
//           <div style={{ width: "100%", display: "flex", gap: "16px" }}>
//             <FormControl sx={{ width: "50%" }}>
//               <EditableTextField
//                 name="aboutProduct"
//                 placeholder="Product Description"
//                 label={"About this Product"}
//                 multiline={true}
//                 rows={3}
//                 labelToolTipText={
//                   "Short Descriptions gives buyers the right idea about the product. Try to be as precise as possible"
//                 }
//                 fieldToolTipText={
//                   "Tell buyers about the highlighted features, specifications, applications of the product in less than 150 characters."
//                 }
//                 charactersCount={
//                   addProductState?.productDescription?.aboutProduct
//                     ?.characterCount
//                 }
//                 value={addProductState?.productDescription?.aboutProduct?.value}
//                 handleChange={handleProductDescriptionChange}
//               ></EditableTextField>
//             </FormControl>
//             <FormControl sx={{ width: "50%" }}>
//               <FileUploadProductDescription
//                 productDatasheet={productDatasheet}
//                 updateProductDatasheet={updateProductDatasheet}
//                 removeProductDatasheet={removeProductDatasheet}
//               ></FileUploadProductDescription>
//             </FormControl>
//           </div>
//         </ProductContentContainer>
//         <ProductContentContainer style={{ gap: "5px" }}>
//           <ProductSectionHeaderContainer>
//             Product Information
//           </ProductSectionHeaderContainer>
//           <ContentDescription>
//             <ContentDescriptionHeader>
//               Product Availability
//             </ContentDescriptionHeader>
//             <ContentDescriptionText>
//               Is the product ready to dispatch or needs to be manufactured
//               against order?
//             </ContentDescriptionText>
//           </ContentDescription>
//           <TabsContainer>
//             <Box sx={{ width: "100%", typography: "body1" }}>
//               <TabContext value={productAvailability}>
//                 <Box
//                   sx={{
//                     borderBottom: 1,
//                     borderColor: "divider",
//                     // fontFamily: "open sans",
//                   }}
//                 >
//                   <TabList
//                     TabIndicatorProps={{
//                       style: { background: "#DD484E" },
//                     }}
//                     onChange={handleProductAvailabilityChange}
//                     aria-label="lab API tabs example"
//                   >
//                     <Tab
//                       style={{
//                         textTransform: "none",
//                         color:
//                           productAvailability === "1" ? "#DD484E" : "black",
//                       }}
//                       label="In Stock"
//                       value="1"
//                     />
//                     <Tab
//                       style={{
//                         textTransform: "none",
//                         color:
//                           productAvailability === "2" ? "#DD484E" : "black",
//                       }}
//                       label="By Order"
//                       value="2"
//                     />
//                   </TabList>
//                 </Box>
//                 <TabPanel
//                   style={{
//                     textTransform: "none",
//                     padding: "0px",
//                     paddingTop: "30px",
//                   }}
//                   value="1"
//                 >
//                   <>
//                     <div
//                       style={{
//                         display: "flex",
//                         gap: "16px",

//                         paddingBottom: "20px",
//                         borderBottom: "1px solid #BBBBBB",
//                         flexDirection: "column",
//                       }}
//                     >
//                       <div style={{ display: "flex", gap: "16px" }}>
//                         <FormControl sx={{ width: "33.3%" }}>
//                           <SelectableTextField
//                             label="Post validity"
//                             value={
//                               addProductState.productInformation
//                                 .productAvailability.inStock.postValidity
//                             }
//                             fieldName="postValidity"
//                             data={postValidityOptions}
//                             handleChange={handlePostValidity}
//                           />
//                         </FormControl>
//                         <FormControl sx={{ width: "33.3%" }}>
//                           <CustomAutocompelete
//                             options={brandsData}
//                             label="Manufacturer/Brand"
//                             value={
//                               addProductState.productInformation
//                                 .productAvailability.inStock.manufacturerBrand
//                             }
//                             handleChange={handleManufacturerBrand}
//                           />
//                         </FormControl>
//                         <FormControl sx={{ width: "33.3%" }}>
//                           <SelectableTextField
//                             fieldName="manufacturerYear"
//                             label="Manufacturer Year"
//                             value={
//                               addProductState.productInformation
//                                 .productAvailability.inStock.manufacturingYear
//                             }
//                             data={ManufacturingYears}
//                             handleChange={handleManufacturingYear}
//                           />

//                           {/* <TextFieldHelperText>
//                         {" "}
//                         Maximum character 0/50{" "}
//                       </TextFieldHelperText> */}
//                         </FormControl>
//                       </div>
//                       <div>
//                         <FormControl sx={{ width: "33.3%" }}>
//                           <div style={{ paddingLeft: "0px" }}>
//                             <EditableTextField
//                               placeholder={"Enter Model Number"}
//                               label={"Model Number"}
//                             />

//                             {/* <TextFieldHelperText>
//                         {" "}
//                         Maximum character 0/50{" "}
//                       </TextFieldHelperText> */}
//                           </div>
//                         </FormControl>
//                       </div>
//                     </div>
//                     <ContentDescription
//                       style={{
//                         paddingTop: "16px",
//                         paddingBottom: "4px",
//                         borderBottom: "1px solid rgb(187, 187, 187)",
//                       }}
//                     >
//                       <ContentDescriptionHeader>
//                         Condition
//                         <span>
//                           <Tooltip placement={"top"} title="Required!" arrow>
//                             <span
//                               style={{
//                                 color: "#D7282F",
//                                 paddingRight: "5px",
//                                 paddingLeft: "5px",
//                                 // fontFamily:"open sans"
//                               }}
//                             >
//                               *
//                             </span>
//                           </Tooltip>
//                         </span>
//                         <span>
//                           <Tooltip
//                             placement={"top"}
//                             title="Adding Product Application/Type filters the buyer search easily."
//                             arrow
//                           >
//                             <div
//                               style={{
//                                 width: "14px",
//                                 height: "14px",
//                                 position: "relative",
//                                 display: "inline-block",
//                               }}
//                             >
//                               <Image
//                                 alt="help-img"
//                                 src={"/assets/helpIcon.svg"}
//                                 layout="fill"
//                               />{" "}
//                             </div>
//                           </Tooltip>
//                         </span>
//                       </ContentDescriptionHeader>
//                       <div>
//                         {" "}
//                         <ToggleButtonGroup
//                           className={classes?.buttonGroup}
//                           value={productCondition}
//                           exclusive
//                           onChange={handleProductCondition}
//                           aria-label="text alignment"
//                         >
//                           <ToggleButton
//                             style={{
//                               textTransform: "none",
//                             }}
//                             className={
//                               productCondition === "Brand New"
//                                 ? classes?.customToggleButtonSelected
//                                 : classes?.customToggleButton
//                             }
//                             size="small"
//                             value="Brand New"
//                             aria-label="left aligned"
//                           >
//                             {/* <FormatAlignLeftIcon /> */}
//                             Brand New{" "}
//                             {/* <CheckCircleOutlineOutlinedIcon
//                               style={{ marginLeft: "10px", opacity: "0.5" }}
//                             ></CheckCircleOutlineOutlinedIcon> */}
//                           </ToggleButton>
//                           <ToggleButton
//                             style={{ textTransform: "none" }}
//                             className={
//                               productCondition === "Surplus"
//                                 ? classes?.customToggleButtonSelected
//                                 : classes?.customToggleButton
//                             }
//                             size="small"
//                             value="Surplus"
//                             aria-label="centered"
//                           >
//                             {/* <FormatAlignCenterIcon /> */}
//                             Surplus
//                             {/* <CheckCircleOutlineOutlinedIcon></CheckCircleOutlineOutlinedIcon> */}
//                           </ToggleButton>
//                           <ToggleButton
//                             style={{ textTransform: "none" }}
//                             className={
//                               productCondition === "Used"
//                                 ? classes?.customToggleButtonSelected
//                                 : classes?.customToggleButton
//                             }
//                             size="small"
//                             value="Used"
//                             aria-label="right aligned"
//                           >
//                             Used
//                             {/* <CheckCircleOutlineOutlinedIcon></CheckCircleOutlineOutlinedIcon> */}
//                             {/* <FormatAlignRightIcon /> */}
//                           </ToggleButton>
//                           <ToggleButton
//                             style={{ textTransform: "none" }}
//                             className={
//                               productCondition === "Refurbished to zero hour"
//                                 ? classes?.customToggleButtonSelected
//                                 : classes?.customToggleButton
//                             }
//                             size="small"
//                             value="Refurbished to zero hour"
//                             aria-label="justified"
//                           >
//                             Refurbished to zero hour
//                             {/* <CheckCircleOutlineOutlinedIcon></CheckCircleOutlineOutlinedIcon> */}
//                             {/* <FormatAlignJustifyIcon /> */}
//                           </ToggleButton>
//                           <ToggleButton
//                             style={{ textTransform: "none" }}
//                             className={
//                               productCondition === "Damaged"
//                                 ? classes?.customToggleButtonSelected
//                                 : classes?.customToggleButton
//                             }
//                             size="small"
//                             value="Damaged"
//                             aria-label="justifiedd"
//                             // disabled
//                           >
//                             Damaged
//                             {/* <CheckCircleOutlineOutlinedIcon></CheckCircleOutlineOutlinedIcon> */}
//                             {/* <FormatAlignJustifyIcon /> */}
//                           </ToggleButton>
//                         </ToggleButtonGroup>
//                       </div>
//                     </ContentDescription>

//                     <ContentDescription
//                       style={{
//                         paddingTop: "16px",
//                         paddingBottom: "16px",
//                         borderBottom: "1px solid rgb(187, 187, 187)",
//                       }}
//                     >
//                       <ContentDescriptionHeader>
//                         Dispatch/Shipped in
//                         <span>
//                           <Tooltip placement={"top"} title="Required!" arrow>
//                             <span
//                               style={{
//                                 color: "#D7282F",
//                                 paddingRight: "5px",
//                                 paddingLeft: "5px",
//                                 // fontFamily:"open sans"
//                               }}
//                             >
//                               *
//                             </span>
//                           </Tooltip>
//                         </span>
//                         <span>
//                           <Tooltip
//                             placement={"top"}
//                             title="Adding Product Application/Type filters the buyer search easily."
//                             arrow
//                           >
//                             <div
//                               style={{
//                                 width: "14px",
//                                 height: "14px",
//                                 display: "inline-block",
//                                 position: "relative",
//                               }}
//                             >
//                               <Image
//                                 alt="help-img"
//                                 src={"/assets/helpIcon.svg"}
//                                 layout="fill"
//                               />{" "}
//                             </div>
//                           </Tooltip>
//                         </span>
//                       </ContentDescriptionHeader>
//                       <ContentDescriptionText style={{ marginBottom: "10px" }}>
//                         Duration in which the product can be dispatched to the
//                         nearest seaport/airport.
//                       </ContentDescriptionText>

//                       <div
//                         style={{
//                           display: "flex",
//                           gap: "16px",
//                         }}
//                       >
//                         <FormControl sx={{ width: "16%" }}>
//                           <TextField
//                             // type="numeric"
//                             // select

//                             value={deliveryTime}
//                             onChange={handleDeliveryTime}
//                             //size="small"

//                             classes={{ root: classes.customTextField }}
//                             fullWidth
//                             label={
//                               <div>
//                                 <span
//                                   style={{
//                                     // display: "inline-block",
//                                     // fontSize: "16px",
//                                     paddingRight: "10px",
//                                     fontWeight: 600,
//                                     letterSpacing: "0.4px",
//                                     color: "#1C1C1C",
//                                     // fontFamily: "open sans",
//                                   }}
//                                 >
//                                   Value
//                                 </span>
//                               </div>
//                             }
//                             InputLabelProps={{ shrink: true }}
//                           />
//                         </FormControl>
//                         <FormControl sx={{ width: "16%" }}>
//                           <SelectableTextField
//                             label="Duration"
//                             value={deliverySelect}
//                             handleChange={selectDurationVariable}
//                             data={shippedInVariables}
//                           ></SelectableTextField>
//                           {/* <TextField
//                             // type="numeric"
//                             select
//                             //size="small"
//                             placeholder="Enter Title"
//                             classes={{ root: classes.customTextField }}
//                             fullWidth
//                             InputLabelProps={{ shrink: true }}
//                           /> */}

//                           {/* <TextFieldHelperText>
//                         {" "}
//                         Maximum character 0/50{" "}
//                       </TextFieldHelperText> */}
//                         </FormControl>
//                         <div
//                           style={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                           }}
//                         >
//                           <p
//                             style={{
//                               fontWeight: 400,
//                               fontSize: "12px",
//                               lineHeight: "24px",

//                               letterSpacing: "0.09px",

//                               color: "#414141",
//                             }}
//                           >
//                             Generally {"<7"} days for products in warehouse or
//                             inventory
//                           </p>
//                         </div>
//                       </div>
//                     </ContentDescription>
//                     <div style={{ display: "flex", paddingTop: "20px" }}>
//                       <ContentDescription style={{ width: "50%" }}>
//                         <ContentDescriptionHeader>
//                           Place of Origin
//                           <span>
//                             <Tooltip placement={"top"} title="Required!" arrow>
//                               <span
//                                 style={{
//                                   color: "#D7282F",
//                                   paddingRight: "5px",
//                                   paddingLeft: "5px",
//                                 }}
//                               >
//                                 *
//                               </span>
//                             </Tooltip>
//                           </span>
//                           <span>
//                             <Tooltip
//                               placement={"top"}
//                               title="Adding Product Application/Type filters the buyer search easily."
//                               arrow
//                             >
//                               <div
//                                 style={{
//                                   width: "14px",
//                                   height: "14px",
//                                   display: "inline-block",

//                                   position: "relative",
//                                 }}
//                               >
//                                 <Image
//                                   alt="help-img"
//                                   src={"/assets/helpIcon.svg"}
//                                   layout="fill"
//                                 />{" "}
//                               </div>
//                             </Tooltip>
//                           </span>
//                         </ContentDescriptionHeader>
//                         <ContentDescriptionText>
//                           Add the manufacturer’s Country or Territory.
//                         </ContentDescriptionText>
//                         <FormControl sx={{ width: "100%", marginTop: "16px" }}>
//                           <SelectableTextField
//                             labelTooltipText="ABC"
//                             label="Country or Territory"
//                             // data={ }
//                             // handleChange={}
//                           ></SelectableTextField>
//                           {/* <TextField
//                             select
//                             //size="small"
//                             placeholder="Enter Title"
//                             classes={{ root: classes.customTextField }}
//                             fullWidth
//                             label={
//                               <div>
//                                 <span
//                                   style={{
//                                     // display: "inline-block",
//                                     // fontSize: "16px",
//                                     paddingRight: "10px",
//                                     fontWeight: 600,
//                                     letterSpacing: "0.4px",
//                                     color: "#1C1C1C",
//                                     // fontFamily: "open sans",
//                                   }}
//                                 >
//                                   Country or Territory
//                                 </span>
//                                 <Tooltip
//                                   placement={"top"}
//                                   title="Required!"
//                                   arrow
//                                 >
//                                   <span
//                                     style={{
//                                       color: "#D7282F",
//                                       paddingRight: "5px",
//                                     }}
//                                   >
//                                     *
//                                   </span>
//                                 </Tooltip>

//                                 <Tooltip
//                                   placement={"top"}
//                                   title="Adding Product Application/Type filters the buyer search easily."
//                                   arrow
//                                 >
//                                   <div
//                                     style={{
//                                       width: "14px",
//                                       height: "14px",
//                                       position: "relative",
//                                       display: "inline-block",
//                                     }}
//                                   >
//                                     <Image
//                                       alt="help-img"
//                                       src={"/assets/helpIcon.svg"}
//                                       layout="fill"
//                                     />{" "}
//                                   </div>
//                                 </Tooltip>
//                               </div>
//                             }
//                             InputLabelProps={{ shrink: true }}
//                           /> */}

//                           {/* <TextFieldHelperText>
//                         {" "}
//                         Maximum character 0/50{" "}
//                       </TextFieldHelperText> */}
//                         </FormControl>
//                       </ContentDescription>
//                       <ContentDescription>
//                         <ContentDescriptionHeader
//                           style={{ marginLeft: "30px" }}
//                         >
//                           Existence Place
//                           <span style={{ paddingLeft: "10px" }}>
//                             <Tooltip
//                               placement={"top"}
//                               title="Adding Product Application/Type filters the buyer search easily."
//                               arrow
//                             >
//                               <div
//                                 style={{
//                                   width: "14px",
//                                   height: "14px",
//                                   display: "inline-block",

//                                   position: "relative",
//                                 }}
//                               >
//                                 <Image
//                                   alt="help-img"
//                                   src={"/assets/helpIcon.svg"}
//                                   layout="fill"
//                                 />{" "}
//                               </div>
//                             </Tooltip>
//                           </span>
//                         </ContentDescriptionHeader>
//                         <ContentDescriptionText></ContentDescriptionText>
//                         <FormControl
//                           sx={{
//                             width: "50%",
//                             marginTop: "40px",
//                             marginLeft: "30px",
//                           }}
//                         >
//                           <TextField
//                             select
//                             //size="small"
//                             placeholder="Enter Title"
//                             classes={{ root: classes.customTextField }}
//                             fullWidth
//                             label={
//                               <div>
//                                 <span
//                                   style={{
//                                     // display: "inline-block",
//                                     // fontSize: "16px",
//                                     paddingRight: "10px",
//                                     fontWeight: 600,
//                                     letterSpacing: "0.4px",
//                                     color: "#1C1C1C",
//                                     // fontFamily: "open sans",
//                                   }}
//                                 >
//                                   Select Country
//                                 </span>
//                                 <Tooltip
//                                   placement={"top"}
//                                   title="Required!"
//                                   arrow
//                                 >
//                                   <span
//                                     style={{
//                                       color: "#D7282F",
//                                       paddingRight: "5px",
//                                     }}
//                                   >
//                                     *
//                                   </span>
//                                 </Tooltip>

//                                 <Tooltip
//                                   placement={"top"}
//                                   title="Adding Product Application/Type filters the buyer search easily."
//                                   arrow
//                                 >
//                                   <div
//                                     style={{
//                                       width: "14px",
//                                       height: "14px",
//                                       position: "relative",
//                                       display: "inline-block",
//                                     }}
//                                   >
//                                     <Image
//                                       alt="help-img"
//                                       src={"/assets/helpIcon.svg"}
//                                       layout="fill"
//                                     />{" "}
//                                   </div>
//                                 </Tooltip>
//                               </div>
//                             }
//                             InputLabelProps={{ shrink: true }}
//                           />

//                           {/* <TextFieldHelperText>
//                         {" "}
//                         Maximum character 0/50{" "}
//                       </TextFieldHelperText> */}
//                         </FormControl>
//                       </ContentDescription>
//                     </div>
//                   </>
//                 </TabPanel>
//                 <TabPanel
//                   style={{
//                     textTransform: "none",
//                     padding: "0px",
//                     paddingTop: "30px",
//                   }}
//                   value="2"
//                 >
//                   <>
//                     <div
//                       style={{
//                         display: "flex",
//                         width: "100%",
//                         paddingBottom: "20px",
//                         borderBottom: "1px solid #BBBBBB",
//                         gap: "16px",
//                       }}
//                     >
//                       <FormControl sx={{ width: "50%" }}>
//                         <TextField
//                           select
//                           //size="small"
//                           // placeholder="Enter Title"
//                           classes={{ root: classes.customTextField }}
//                           fullWidth
//                           label={
//                             <div>
//                               <span
//                                 style={{
//                                   // display: "inline-block",
//                                   // fontSize: "16px",
//                                   paddingRight: "10px",
//                                   fontWeight: 600,
//                                   letterSpacing: "0.4px",
//                                   color: "#1C1C1C",
//                                   // fontFamily: "open sans",
//                                 }}
//                               >
//                                 Manufacturer/Brand
//                               </span>
//                               <Tooltip
//                                 placement={"top"}
//                                 title="Required!"
//                                 arrow
//                               >
//                                 <span
//                                   style={{
//                                     color: "#D7282F",
//                                     paddingRight: "5px",
//                                   }}
//                                 >
//                                   *
//                                 </span>
//                               </Tooltip>

//                               <Tooltip
//                                 placement={"top"}
//                                 title="Adding Product Application/Type filters the buyer search easily."
//                                 arrow
//                               >
//                                 <div
//                                   style={{
//                                     width: "14px",
//                                     height: "14px",
//                                     position: "relative",
//                                     display: "inline-block",
//                                   }}
//                                 >
//                                   <Image
//                                     alt="help-img"
//                                     src={"/assets/helpIcon.svg"}
//                                     layout="fill"
//                                   />{" "}
//                                 </div>
//                               </Tooltip>
//                             </div>
//                           }
//                           InputLabelProps={{ shrink: true }}
//                         />

//                         {/* <TextFieldHelperText>
//                         {" "}
//                         Maximum character 0/50{" "}
//                       </TextFieldHelperText> */}
//                       </FormControl>
//                     </div>

//                     <ContentDescription
//                       style={{
//                         paddingTop: "16px",
//                         paddingBottom: "16px",
//                         borderBottom: "1px solid rgb(187, 187, 187)",
//                         display: "flex",
//                       }}
//                     >
//                       <div style={{ width: "50%" }}>
//                         <ContentDescriptionHeader>
//                           In house Production Capacity
//                           <span>
//                             <Tooltip placement={"top"} title="Required!" arrow>
//                               <span
//                                 style={{
//                                   color: "#D7282F",
//                                   paddingRight: "5px",
//                                   paddingLeft: "5px",
//                                 }}
//                               >
//                                 *
//                               </span>
//                             </Tooltip>
//                           </span>
//                           <span>
//                             <Tooltip
//                               placement={"top"}
//                               title="Adding Product Application/Type filters the buyer search easily."
//                               arrow
//                             >
//                               <div
//                                 style={{
//                                   width: "14px",
//                                   height: "14px",
//                                   position: "relative",
//                                   display: "inline-block",
//                                 }}
//                               >
//                                 <Image
//                                   alt="help-img"
//                                   src={"/assets/helpIcon.svg"}
//                                   layout="fill"
//                                 />{" "}
//                               </div>
//                             </Tooltip>
//                           </span>
//                         </ContentDescriptionHeader>
//                         <ContentDescriptionText
//                           style={{ marginBottom: "10px" }}
//                         >
//                           Daily/Weekly/Monthly production capacity of the listed
//                           product.
//                         </ContentDescriptionText>

//                         <div
//                           style={{
//                             display: "flex",
//                             gap: "16px",
//                           }}
//                         >
//                           <FormControl sx={{ width: "50%" }}>
//                             <TextField
//                               type="numeric"
//                               classes={{ root: classes.customTextField }}
//                               fullWidth
//                               InputLabelProps={{ shrink: true }}
//                             />
//                           </FormControl>
//                           <FormControl sx={{ width: "50%" }}>
//                             <TextField
//                               // type="numeric"
//                               select
//                               //size="small"
//                               placeholder="Enter Title"
//                               classes={{ root: classes.customTextField }}
//                               fullWidth
//                               InputLabelProps={{ shrink: true }}
//                             />

//                             {/* <TextFieldHelperText>
//                         {" "}
//                         Maximum character 0/50{" "}
//                       </TextFieldHelperText> */}
//                           </FormControl>
//                           <div
//                             style={{
//                               display: "flex",
//                               justifyContent: "center",
//                               alignItems: "center",
//                             }}
//                           ></div>
//                         </div>
//                       </div>

//                       <div style={{ width: "50% " }}>
//                         <ContentDescriptionHeader>
//                           Lead Delivery Time
//                           <span>
//                             <Tooltip placement={"top"} title="Required!" arrow>
//                               <span
//                                 style={{
//                                   color: "#D7282F",
//                                   paddingRight: "5px",
//                                   paddingLeft: "5px",
//                                 }}
//                               >
//                                 *
//                               </span>
//                             </Tooltip>
//                           </span>
//                           <span>
//                             <Tooltip
//                               placement={"top"}
//                               title="Adding Product Application/Type filters the buyer search easily."
//                               arrow
//                             >
//                               <div
//                                 style={{
//                                   width: "14px",
//                                   height: "14px",
//                                   display: "inline-block",

//                                   position: "relative",
//                                 }}
//                               >
//                                 <Image
//                                   alt="help-img"
//                                   src={"/assets/helpIcon.svg"}
//                                   layout="fill"
//                                 />{" "}
//                               </div>
//                             </Tooltip>
//                           </span>
//                         </ContentDescriptionHeader>
//                         <ContentDescriptionText
//                           style={{ marginBottom: "10px" }}
//                         >
//                           Days/Weeks/Months in which the manufactured product
//                           could be delivered.
//                         </ContentDescriptionText>
//                         <div
//                           style={{
//                             display: "flex",
//                             gap: "16px",
//                           }}
//                         >
//                           <FormControl sx={{ width: "50%" }}>
//                             <TextField
//                               type="numeric"
//                               // select
//                               //size="small"
//                               placeholder="Enter Number"
//                               classes={{ root: classes.customTextField }}
//                               fullWidth
//                               label={
//                                 <div>
//                                   <span
//                                     style={{
//                                       // display: "inline-block",
//                                       // fontSize: "16px",
//                                       paddingRight: "10px",
//                                       fontWeight: 600,
//                                       letterSpacing: "0.4px",
//                                       color: "#1C1C1C",
//                                       // fontFamily: "open sans",
//                                     }}
//                                   >
//                                     Ship In
//                                   </span>
//                                 </div>
//                               }
//                               InputLabelProps={{ shrink: true }}
//                             />

//                             {/* <TextFieldHelperText>
//                         {" "}
//                         Maximum character 0/50{" "}
//                       </TextFieldHelperText> */}
//                           </FormControl>
//                           <FormControl sx={{ width: "50%" }}>
//                             <TextField
//                               // type="numeric"
//                               select
//                               //size="small"
//                               placeholder="Enter Title"
//                               classes={{ root: classes.customTextField }}
//                               fullWidth
//                               InputLabelProps={{ shrink: true }}
//                             />

//                             {/* <TextFieldHelperText>
//                         {" "}
//                         Maximum character 0/50{" "}
//                       </TextFieldHelperText> */}
//                           </FormControl>
//                           <div
//                             style={{
//                               display: "flex",
//                               justifyContent: "center",
//                               alignItems: "center",
//                             }}
//                           ></div>
//                         </div>
//                       </div>
//                     </ContentDescription>
//                     <div
//                       style={{
//                         display: "flex",
//                         paddingTop: "20px",
//                         gap: "16px",
//                       }}
//                     >
//                       <ContentDescription style={{}}>
//                         <ContentDescriptionHeader>
//                           Place of Origin
//                           <span>
//                             <Tooltip placement={"top"} title="Required!" arrow>
//                               <span
//                                 style={{
//                                   color: "#D7282F",
//                                   paddingRight: "5px",
//                                   paddingLeft: "5px",
//                                 }}
//                               >
//                                 *
//                               </span>
//                             </Tooltip>
//                           </span>
//                           <span>
//                             <Tooltip
//                               placement={"top"}
//                               title="Adding Product Application/Type filters the buyer search easily."
//                               arrow
//                             >
//                               <div
//                                 style={{
//                                   width: "14px",
//                                   height: "14px",
//                                   position: "relative",
//                                   display: "inline-block",
//                                 }}
//                               >
//                                 <Image
//                                   alt="help-img"
//                                   src={"/assets/helpIcon.svg"}
//                                   layout="fill"
//                                 />{" "}
//                               </div>
//                             </Tooltip>
//                           </span>
//                         </ContentDescriptionHeader>
//                         <ContentDescriptionText>
//                           Add the manufacturer’s Country or Territory.
//                         </ContentDescriptionText>
//                         <FormControl sx={{ width: "100%", marginTop: "16px" }}>
//                           <TextField
//                             select
//                             //size="small"
//                             placeholder="Enter Title"
//                             classes={{ root: classes.customTextField }}
//                             fullWidth
//                             label={
//                               <div>
//                                 <span
//                                   style={{
//                                     // display: "inline-block",
//                                     // fontSize: "16px",
//                                     paddingRight: "10px",
//                                     fontWeight: 600,
//                                     letterSpacing: "0.4px",
//                                     color: "#1C1C1C",
//                                     // fontFamily: "open sans",
//                                   }}
//                                 >
//                                   Country or Territory
//                                 </span>
//                                 <Tooltip
//                                   placement={"top"}
//                                   title="Required!"
//                                   arrow
//                                 >
//                                   <span
//                                     style={{
//                                       color: "#D7282F",
//                                       paddingRight: "5px",
//                                     }}
//                                   >
//                                     *
//                                   </span>
//                                 </Tooltip>

//                                 <Tooltip
//                                   placement={"top"}
//                                   title="Adding Product Application/Type filters the buyer search easily."
//                                   arrow
//                                 >
//                                   <div
//                                     style={{
//                                       width: "14px",
//                                       height: "14px",
//                                       position: "relative",
//                                       display: "inline-block",
//                                     }}
//                                   >
//                                     <Image
//                                       alt="help-img"
//                                       src={"/assets/helpIcon.svg"}
//                                       layout="fill"
//                                     />{" "}
//                                   </div>
//                                 </Tooltip>
//                               </div>
//                             }
//                             InputLabelProps={{ shrink: true }}
//                           />

//                           {/* <TextFieldHelperText>
//                         {" "}
//                         Maximum character 0/50{" "}
//                       </TextFieldHelperText> */}
//                         </FormControl>
//                       </ContentDescription>
//                       <ContentDescription>
//                         <ContentDescriptionHeader
//                           style={{ marginLeft: "30px" }}
//                         >
//                           Existence Place
//                         </ContentDescriptionHeader>
//                         <ContentDescriptionText></ContentDescriptionText>
//                         <FormControl
//                           sx={{
//                             width: "100%",
//                             marginTop: "40px",
//                             // marginLeft: "30px",
//                           }}
//                         >
//                           <TextField
//                             select
//                             //size="small"
//                             placeholder="Enter Title"
//                             classes={{ root: classes.customTextField }}
//                             fullWidth
//                             label={
//                               <div>
//                                 <span
//                                   style={{
//                                     // display: "inline-block",
//                                     // fontSize: "16px",
//                                     paddingRight: "10px",
//                                     fontWeight: 600,
//                                     letterSpacing: "0.4px",
//                                     color: "#1C1C1C",
//                                     // fontFamily: "open sans",
//                                   }}
//                                 >
//                                   Select Country
//                                 </span>
//                                 <Tooltip
//                                   placement={"top"}
//                                   title="Required!"
//                                   arrow
//                                 >
//                                   <span
//                                     style={{
//                                       color: "#D7282F",
//                                       paddingRight: "5px",
//                                     }}
//                                   >
//                                     *
//                                   </span>
//                                 </Tooltip>

//                                 <Tooltip
//                                   placement={"top"}
//                                   title="Adding Product Application/Type filters the buyer search easily."
//                                   arrow
//                                 >
//                                   <div
//                                     style={{
//                                       width: "14px",
//                                       height: "14px",
//                                       position: "relative",
//                                       display: "inline-block",
//                                     }}
//                                   >
//                                     <Image
//                                       alt="help-img"
//                                       src={"/assets/helpIcon.svg"}
//                                       layout="fill"
//                                     />{" "}
//                                   </div>
//                                 </Tooltip>
//                               </div>
//                             }
//                             InputLabelProps={{ shrink: true }}
//                           />

//                           {/* <TextFieldHelperText>
//                         {" "}
//                         Maximum character 0/50{" "}
//                       </TextFieldHelperText> */}
//                         </FormControl>
//                       </ContentDescription>
//                     </div>
//                   </>
//                 </TabPanel>
//               </TabContext>
//             </Box>
//           </TabsContainer>
//         </ProductContentContainer>
//         <ProductContentContainer>
//           <TabsContainer>
//             <Box sx={{ width: "100%", typography: "body1" }}>
//               <TabContext value={informationType}>
//                 <Box
//                   sx={{
//                     borderBottom: 1,
//                     borderColor: "divider",
//                     fontFamily: "open sans",
//                   }}
//                 >
//                   <TabList
//                     TabIndicatorProps={{
//                       style: { background: "#DD484E" },
//                     }}
//                     onChange={handleInformationTypeChange}
//                     aria-label="lab API tabs example"
//                   >
//                     <Tab
//                       style={{
//                         textTransform: "none",
//                         color: informationType === "1" ? "#DD484E" : "black",
//                       }}
//                       label="Passive Information"
//                       value="1"
//                     />
//                     {/* <Tab
//                       style={{
//                         textTransform: "none",
//                         color: informationType === "2" ? "#DD484E" : "black",
//                       }}
//                       label="Active Information"
//                       value="2"
//                     /> */}
//                   </TabList>
//                 </Box>
//                 <TabPanel
//                   style={{
//                     textTransform: "none",
//                     padding: "0px",
//                     paddingTop: "30px",
//                   }}
//                   value="1"
//                 >
//                   <>
//                     <ContentDescriptionHeader
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <div>Attribute Details</div>
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           gap: "10px",
//                         }}
//                       >
//                         <div>
//                           <span
//                             style={{
//                               fontWeight: 400,
//                               fontSize: "14px",
//                               lineHeight: "19px",

//                               display: "flex",
//                               alignItems: "center",

//                               color: "#000000",
//                             }}
//                           >
//                             Selected Attribute(
//                             <span style={{ color: "#D7282F" }}>
//                               {
//                                 attributesData?.filter(
//                                   (element) => element?.selected
//                                 ).length
//                               }
//                             </span>
//                             )
//                           </span>
//                         </div>
//                         <div>
//                           <TextField
//                             placeholder="Add New Attribute"
//                             size="small"
//                             value={newAttributeValue}
//                             onChange={handleNewAttributeValueChange}
//                           ></TextField>
//                         </div>
//                         <div>
//                           <Button
//                             onClick={addAttribute}
//                             style={{ background: "#D7282F", color: "white" }}
//                           >
//                             Add
//                           </Button>
//                         </div>
//                       </div>
//                     </ContentDescriptionHeader>

//                     <AttributesWrapper>
//                       {" "}
//                       {attributesData?.map((element, index) => (
//                         <AttributeItem
//                           key={index}
//                           data={element}
//                           handleAttributeChange={handleAttributeChange}
//                         />
//                       ))}
//                     </AttributesWrapper>

//                     <div
//                       style={{
//                         display: "flex",
//                         flexWrap: "wrap",
//                         gap: "16px",
//                         paddingTop: "16px",
//                         marginTop: "32px",
//                       }}
//                     >
//                       {attributesData
//                         ?.filter((element) => element?.selected)
//                         .map((element, index) => (
//                           <EditAttribute
//                             key={index}
//                             handleAttributeChange={handleAttributeChange}
//                             data={element}
//                             handleAttributeValueChange={
//                               handleAttributeValueChange
//                             }
//                           />
//                         ))}
//                     </div>
//                   </>
//                 </TabPanel>
//                 {/* <TabPanel
//                   style={{
//                     textTransform: "none",
//                     padding: "0px",
//                     paddingTop: "30px",
//                   }}
//                   value="2"
//                 >
//                   <></>
//                 </TabPanel> */}
//               </TabContext>
//             </Box>
//           </TabsContainer>
//         </ProductContentContainer>
//         <ProductContentContainer>
//           <ProductSectionHeaderContainer>
//             Commercial Information
//           </ProductSectionHeaderContainer>
//           <div style={{ width: "100%" }}>
//             <ToggleButtonGroup
//               value={pricingType}
//               onChange={handlePricingChange}
//               exclusive
//               style={{
//                 width: "100%",
//                 display: "flex",
//                 gap: "16px",
//                 paddingBottom: "16px",
//               }}
//             >
//               <ToggleButton
//                 style={{ textTransform: "none" }}
//                 className={
//                   pricingType === "Quantity Based Pricing"
//                     ? classes.pricingTypeCustomToggleButtonSelected
//                     : classes.pricingTypeCustomToggleButton
//                 }
//                 value="Quantity Based Pricing"
//               >
//                 Quantity based pricing{" "}
//                 {pricingType === "Quantity Based Pricing" && (
//                   <span
//                     style={{
//                       display: "inline-flex",
//                       position: "relative",
//                       width: "16px",
//                       height: "12px",
//                       marginLeft: "8px",
//                     }}
//                   >
//                     <Image
//                       src={"/assets/smallTick.svg"}
//                       layout="fill"
//                       alt="img"
//                     />
//                   </span>
//                 )}
//               </ToggleButton>
//               <ToggleButton
//                 style={{ textTransform: "none" }}
//                 value="Fixed Pricing"
//                 className={
//                   pricingType === "Fixed Pricing"
//                     ? classes.pricingTypeCustomToggleButtonSelected
//                     : classes.pricingTypeCustomToggleButton
//                 }
//               >
//                 Fixed Pricing{" "}
//                 {pricingType === "Fixed Pricing" && (
//                   <span
//                     style={{
//                       display: "inline-flex",
//                       position: "relative",
//                       width: "16px",
//                       height: "12px",
//                       marginLeft: "8px",
//                     }}
//                   >
//                     <Image
//                       src={"/assets/smallTick.svg"}
//                       layout="fill"
//                       alt="img"
//                     />
//                   </span>
//                 )}
//               </ToggleButton>
//             </ToggleButtonGroup>
//             {pricingType === "Quantity Based Pricing" && (
//               <>
//                 <div style={{ width: "100%", marginTop: "16px" }}>
//                   <FormControl sx={{ width: "33.3%" }}>
//                     <div style={{ paddingLeft: "0px" }}>
//                       <TextField
//                         select
//                         //size="small"
//                         placeholder="Select Price Term"
//                         classes={{ root: classes.customTextField }}
//                         fullWidth
//                         label={
//                           <div>
//                             <span
//                               style={{
//                                 // display: "inline-block",
//                                 // fontSize: "16px",
//                                 paddingRight: "10px",
//                                 fontWeight: 600,
//                                 letterSpacing: "0.4px",
//                                 color: "#1C1C1C",
//                                 // fontFamily: "open sans",
//                               }}
//                             >
//                               Payment Terms
//                             </span>
//                             <Tooltip placement={"top"} title="Required!" arrow>
//                               <span
//                                 style={{
//                                   color: "#D7282F",
//                                   paddingRight: "5px",
//                                 }}
//                               >
//                                 *
//                               </span>
//                             </Tooltip>

//                             <Tooltip
//                               placement={"top"}
//                               title="Adding Product Application/Type filters the buyer search easily."
//                               arrow
//                             >
//                               <div
//                                 style={{
//                                   width: "14px",
//                                   display: "inline-block",
//                                   height: "14px",
//                                   position: "relative",
//                                 }}
//                               >
//                                 <Image
//                                   alt="help-img"
//                                   src={"/assets/helpIcon.svg"}
//                                   layout="fill"
//                                 />{" "}
//                               </div>
//                             </Tooltip>
//                           </div>
//                         }
//                         InputLabelProps={{ shrink: true }}
//                       />
//                     </div>
//                   </FormControl>
//                 </div>
//                 <div
//                   style={{
//                     width: "100%",
//                     marginTop: "16px",
//                     display: "flex",
//                     gap: "16px",
//                   }}
//                 >
//                   <FormControl sx={{ width: "33.3%" }}>
//                     <div style={{ paddingLeft: "0px" }}>
//                       <TextField
//                         select
//                         //size="small"
//                         placeholder="Select Price Term"
//                         classes={{ root: classes.customTextField }}
//                         fullWidth
//                         label={
//                           <div>
//                             <span
//                               style={{
//                                 // display: "inline-block",
//                                 // fontSize: "16px",
//                                 paddingRight: "10px",
//                                 fontWeight: 600,
//                                 letterSpacing: "0.4px",
//                                 color: "#1C1C1C",
//                                 // fontFamily: "open sans",
//                               }}
//                             >
//                               Unit
//                             </span>
//                             <Tooltip placement={"top"} title="Required!" arrow>
//                               <span
//                                 style={{
//                                   color: "#D7282F",
//                                   paddingRight: "5px",
//                                 }}
//                               >
//                                 *
//                               </span>
//                             </Tooltip>

//                             <Tooltip
//                               placement={"top"}
//                               title="Adding Product Application/Type filters the buyer search easily."
//                               arrow
//                             >
//                               <div
//                                 style={{
//                                   width: "14px",
//                                   height: "14px",
//                                   position: "relative",
//                                   display: "inline-block",
//                                 }}
//                               >
//                                 <Image
//                                   alt="help-img"
//                                   src={"/assets/helpIcon.svg"}
//                                   layout="fill"
//                                 />{" "}
//                               </div>
//                             </Tooltip>
//                           </div>
//                         }
//                         InputLabelProps={{ shrink: true }}
//                       />

//                       {/* <TextFieldHelperText>
//                         {" "}
//                         Maximum character 0/50{" "}
//                       </TextFieldHelperText> */}
//                     </div>
//                   </FormControl>
//                   <FormControl sx={{ width: "33.3%" }}>
//                     <div style={{ paddingLeft: "0px", paddingRight: "8px" }}>
//                       <TextField
//                         select
//                         //size="small"
//                         placeholder="Select Price Term"
//                         classes={{ root: classes.customTextField }}
//                         fullWidth
//                         label={
//                           <div>
//                             <span
//                               style={{
//                                 // display: "inline-block",
//                                 // fontSize: "16px",
//                                 paddingRight: "10px",
//                                 fontWeight: 600,
//                                 letterSpacing: "0.4px",
//                                 color: "#1C1C1C",
//                                 // fontFamily: "open sans",
//                               }}
//                             >
//                               Currency
//                             </span>
//                             <Tooltip placement={"top"} title="Required!" arrow>
//                               <span
//                                 style={{
//                                   color: "#D7282F",
//                                   paddingRight: "5px",
//                                 }}
//                               >
//                                 *
//                               </span>
//                             </Tooltip>

//                             <Tooltip
//                               placement={"top"}
//                               title="Adding Product Application/Type filters the buyer search easily."
//                               arrow
//                             >
//                               <div
//                                 style={{
//                                   width: "14px",
//                                   height: "14px",
//                                   display: "inline-block",

//                                   position: "relative",
//                                 }}
//                               >
//                                 <Image
//                                   alt="help-img"
//                                   src={"/assets/helpIcon.svg"}
//                                   layout="fill"
//                                 />{" "}
//                               </div>
//                             </Tooltip>
//                           </div>
//                         }
//                         InputLabelProps={{ shrink: true }}
//                       />

//                       {/* <TextFieldHelperText>
//                         {" "}
//                         Maximum character 0/50{" "}
//                       </TextFieldHelperText> */}
//                     </div>
//                   </FormControl>
//                 </div>
//                 <div
//                   style={{
//                     padding: "16px",
//                     border: "1px solid #DDDDDD",
//                     marginTop: "16px",

//                     borderRadius: "6px",
//                     position: "relative",
//                   }}
//                 >
//                   {orderPricing?.map((element, index) => (
//                     <OrderAndPrice
//                       key={index}
//                       data={element}
//                       index={index}
//                     ></OrderAndPrice>
//                   ))}
//                   <span style={{ display: "inline-block" }}>
//                     <Button
//                       style={{
//                         position: "absolute",
//                         bottom: "-10px",
//                         left: "50%",
//                         background: "#FFFFFF",
//                         border: "1px solid #DD484E",
//                         boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
//                         borderRadius: "4px",
//                         textTransform: "none",
//                         height: "24px",
//                         color: "#DD484E",
//                         minWidth: "120px",
//                       }}
//                       onClick={() => {
//                         addMoreSection();
//                       }}
//                     >
//                       <span
//                         style={{
//                           display: "inline-block",
//                           paddingRight: "6px",
//                           position: "relative",
//                           width: "12px",
//                           height: "12px",
//                           marginRight: "10px",
//                         }}
//                       >
//                         {" "}
//                         <Image
//                           src={"/assets/plus_Sign.svg"}
//                           alt="plus-sign-img"
//                           layout="fill"
//                         />
//                       </span>{" "}
//                       Add More{" "}
//                       <span
//                         style={{
//                           paddingLeft: "6px",
//                           position: "relative",
//                           display: "inline-block",
//                           width: "12px",
//                           height: "12px",
//                           marginLeft: "7px",
//                         }}
//                       >
//                         {" "}
//                         <Image
//                           src={"/assets/greenExclamation.svg"}
//                           layout="fill"
//                           alt="img"
//                         />
//                       </span>
//                     </Button>
//                   </span>
//                 </div>
//               </>
//             )}

//             {pricingType === "Fixed Pricing" && (
//               <div style={{ display: "flex" }}>
//                 <FormControl
//                   sx={{
//                     width: "33%",
//                     marginTop: "16px",
//                     // marginLeft: "30px",
//                   }}
//                 >
//                   <Autocomplete
//                     disablePortal
//                     id="combo-box-demo"
//                     sx={{ width: 300 }}
//                     renderInput={(params) => (
//                       <TextField {...params} label="Movie" />
//                     )}
//                   />
//                   {/* <TextField
//                     select
//                     //size="small"
//                     placeholder="Enter Title"
//                     classes={{ root: classes.customTextField }}
//                     fullWidth
//                     label={
//                       <div>
//                         <span
//                           style={{
//                             // display: "inline-block",
//                             // fontSize: "16px",
//                             paddingRight: "10px",
//                             fontWeight: 600,
//                             letterSpacing: "0.4px",
//                             color: "#1C1C1C",
//                             // fontFamily: "open sans",
//                           }}
//                         >
//                           Payment Terms
//                         </span>
//                         <Tooltip placement={"top"} title="Required!" arrow>
//                           <span
//                             style={{
//                               color: "#D7282F",
//                               paddingRight: "5px",
//                             }}
//                           >
//                             *
//                           </span>
//                         </Tooltip>

//                         <Tooltip
//                           placement={"top"}
//                           title="Adding Product Application/Type filters the buyer search easily."
//                           arrow
//                         >
//                           <div
//                             style={{
//                               width: "14px",
//                               height: "14px",
//                               position: "relative",
//                               display: "inline-block",
//                             }}
//                           >
//                             <Image
//                               alt="help-img"
//                               src={"/assets/helpIcon.svg"}
//                               layout="fill"
//                             />{" "}
//                           </div>
//                         </Tooltip>
//                       </div>
//                     }
//                     InputLabelProps={{ shrink: true }}
//                   /> */}

//                   {/* <TextFieldHelperText>
//                         {" "}
//                         Maximum character 0/50{" "}
//                       </TextFieldHelperText> */}
//                 </FormControl>
//                 <FormControl
//                   sx={{
//                     width: "33%",
//                     marginTop: "16px",
//                     display: "flex",
//                     gap: "16px",
//                     // marginLeft: "30px",
//                   }}
//                 >
//                   <div
//                     style={
//                       {
//                         // display: "flex", gap: "16px", width: "100%"
//                       }
//                     }
//                   >
//                     <div
//                       style={{
//                         display: "flex",
//                         gap: "16px",
//                         paddingLeft: "16px",
//                       }}
//                     >
//                       <TextField
//                         // select
//                         style={{ width: "50%" }}
//                         //size="small"
//                         placeholder="Enter"
//                         classes={{ root: classes.customTextField }}
//                         fullWidth
//                         label={
//                           <div>
//                             <span
//                               style={{
//                                 // display: "inline-block",
//                                 // fontSize: "16px",
//                                 paddingRight: "10px",
//                                 fontWeight: 600,
//                                 letterSpacing: "0.4px",
//                                 color: "#1C1C1C",
//                                 // fontFamily: "open sans",
//                               }}
//                             >
//                               Order Quantity
//                             </span>
//                             <Tooltip placement={"top"} title="Required!" arrow>
//                               <span
//                                 style={{
//                                   color: "#D7282F",
//                                   paddingRight: "5px",
//                                 }}
//                               >
//                                 *
//                               </span>
//                             </Tooltip>

//                             <Tooltip
//                               placement={"top"}
//                               title="Adding Product Application/Type filters the buyer search easily."
//                               arrow
//                             >
//                               <div
//                                 style={{
//                                   width: "14px",
//                                   height: "14px",
//                                   position: "relative",
//                                   display: "inline-block",
//                                 }}
//                               >
//                                 <Image
//                                   alt="help-img"
//                                   src={"/assets/helpIcon.svg"}
//                                   layout="fill"
//                                 />{" "}
//                               </div>
//                             </Tooltip>
//                           </div>
//                         }
//                         InputLabelProps={{ shrink: true }}
//                       />
//                       <TextField
//                         select
//                         style={{ width: "50%" }}
//                         //size="small"
//                         placeholder="Enter"
//                         classes={{ root: classes.customTextField }}
//                         fullWidth
//                         label={
//                           <div>
//                             <span
//                               style={{
//                                 // display: "inline-block",
//                                 // fontSize: "16px",
//                                 paddingRight: "10px",
//                                 fontWeight: 600,
//                                 letterSpacing: "0.4px",
//                                 color: "#1C1C1C",
//                                 // fontFamily: "open sans",
//                               }}
//                             >
//                               Unit
//                             </span>
//                             {/* <Tooltip placement={"top"} title="Required!" arrow>
//                               <span
//                                 style={{
//                                   color: "#D7282F",
//                                   paddingRight: "5px",
//                                 }}
//                               >
//                                 *
//                               </span>
//                             </Tooltip>

//                             <Tooltip
//                               placement={"top"}
//                               title="Adding Product Application/Type filters the buyer search easily."
//                               arrow
//                             >
//                            <div style={{width:"6px",height:"6px",position:"relative"}}><Image alt="help-img" src={"/assets/helpIcon.svg"} layout="fill" /> </div>
//                             </Tooltip> */}
//                           </div>
//                         }
//                         InputLabelProps={{ shrink: true }}
//                       />
//                     </div>
//                   </div>
//                 </FormControl>
//                 <FormControl
//                   sx={{
//                     width: "33%",
//                     marginTop: "16px",
//                     display: "flex",
//                     gap: "16px",
//                     // marginLeft: "30px",
//                   }}
//                 >
//                   <div style={{ display: "flex", gap: "16px", width: "100%" }}>
//                     <div
//                       style={{
//                         display: "flex",
//                         gap: "16px",
//                         paddingLeft: "16px",
//                         width: "100%",
//                       }}
//                     >
//                       <TextField
//                         // select
//                         style={{ width: "50%" }}
//                         //size="small"
//                         placeholder="Enter"
//                         classes={{ root: classes.customTextField }}
//                         fullWidth
//                         label={
//                           <div>
//                             <span
//                               style={{
//                                 // display: "inline-block",
//                                 // fontSize: "16px",
//                                 paddingRight: "10px",
//                                 fontWeight: 600,
//                                 letterSpacing: "0.4px",
//                                 color: "#1C1C1C",
//                                 // fontFamily: "open sans",
//                               }}
//                             >
//                               Price
//                             </span>
//                             <Tooltip placement={"top"} title="Required!" arrow>
//                               <span
//                                 style={{
//                                   color: "#D7282F",
//                                   paddingRight: "5px",
//                                 }}
//                               >
//                                 *
//                               </span>
//                             </Tooltip>

//                             <Tooltip
//                               placement={"top"}
//                               title="Adding Product Application/Type filters the buyer search easily."
//                               arrow
//                             >
//                               <div
//                                 style={{
//                                   width: "14px",
//                                   height: "14px",
//                                   position: "relative",
//                                   display: "inline-block",
//                                 }}
//                               >
//                                 <Image
//                                   alt="help-img"
//                                   src={"/assets/helpIcon.svg"}
//                                   layout="fill"
//                                 />{" "}
//                               </div>
//                             </Tooltip>
//                           </div>
//                         }
//                         InputLabelProps={{ shrink: true }}
//                       />
//                       <TextField
//                         select
//                         style={{ width: "50%" }}
//                         //size="small"
//                         placeholder="Enter"
//                         classes={{ root: classes.customTextField }}
//                         fullWidth
//                         label={
//                           <div>
//                             <span
//                               style={{
//                                 // display: "inline-block",
//                                 // fontSize: "16px",
//                                 paddingRight: "10px",
//                                 fontWeight: 600,
//                                 letterSpacing: "0.4px",
//                                 color: "#1C1C1C",
//                                 // fontFamily: "open sans",
//                               }}
//                             >
//                               Currency
//                             </span>
//                           </div>
//                         }
//                         InputLabelProps={{ shrink: true }}
//                       />
//                     </div>
//                   </div>
//                 </FormControl>
//               </div>
//             )}
//             <div style={{ marginTop: "16px", display: "flex", gap: "16px" }}>
//               <FormControl sx={{ width: "33%", marginTop: "16px" }}>
//                 <TextField
//                   // select
//                   //size="small"
//                   placeholder="Enter Seaport"
//                   classes={{ root: classes.customTextField }}
//                   fullWidth
//                   label={
//                     <div>
//                       <span
//                         style={{
//                           // display: "inline-block",
//                           // fontSize: "16px",
//                           paddingRight: "10px",
//                           fontWeight: 600,
//                           letterSpacing: "0.4px",
//                           color: "#1C1C1C",
//                           // fontFamily: "open sans",
//                         }}
//                       >
//                         Sea Port of Loading
//                       </span>
//                       <Tooltip placement={"top"} title="Required!" arrow>
//                         <span
//                           style={{
//                             color: "#D7282F",
//                             paddingRight: "5px",
//                           }}
//                         >
//                           *
//                         </span>
//                       </Tooltip>

//                       <Tooltip
//                         placement={"top"}
//                         title="Adding Product Application/Type filters the buyer search easily."
//                         arrow
//                       >
//                         <div
//                           style={{
//                             width: "14px",
//                             height: "14px",
//                             position: "relative",
//                             display: "inline-block",
//                           }}
//                         >
//                           <Image
//                             alt="help-img"
//                             src={"/assets/helpIcon.svg"}
//                             layout="fill"
//                           />{" "}
//                         </div>
//                       </Tooltip>
//                     </div>
//                   }
//                   InputLabelProps={{ shrink: true }}
//                 />

//                 {/* <TextFieldHelperText>
//                         {" "}
//                         Maximum character 0/50{" "}
//                       </TextFieldHelperText> */}
//               </FormControl>
//               <FormControl sx={{ width: "33%", marginTop: "16px" }}>
//                 <TextField
//                   // select
//                   //size="small"
//                   placeholder="Enter Airport"
//                   classes={{ root: classes.customTextField }}
//                   fullWidth
//                   label={
//                     <div>
//                       <span
//                         style={{
//                           // display: "inline-block",
//                           // fontSize: "16px",
//                           paddingRight: "10px",
//                           fontWeight: 600,
//                           letterSpacing: "0.4px",
//                           color: "#1C1C1C",
//                           // fontFamily: "open sans",
//                         }}
//                       >
//                         Airport of Loading
//                       </span>
//                       <Tooltip placement={"top"} title="Required!" arrow>
//                         <span
//                           style={{
//                             color: "#D7282F",
//                             paddingRight: "5px",
//                           }}
//                         >
//                           *
//                         </span>
//                       </Tooltip>

//                       <Tooltip
//                         placement={"top"}
//                         title="Adding Product Application/Type filters the buyer search easily."
//                         arrow
//                       >
//                         <div
//                           style={{
//                             width: "14px",
//                             height: "14px",
//                             position: "relative",
//                             display: "inline-block",
//                           }}
//                         >
//                           <Image
//                             alt="help-img"
//                             src={"/assets/helpIcon.svg"}
//                             layout="fill"
//                           />{" "}
//                         </div>
//                       </Tooltip>
//                     </div>
//                   }
//                   InputLabelProps={{ shrink: true }}
//                 />

//                 {/* <TextFieldHelperText>
//                         {" "}
//                         Maximum character 0/50{" "}
//                       </TextFieldHelperText> */}
//               </FormControl>
//             </div>
//           </div>
//         </ProductContentContainer>
//       </InnerLeftContainer>
//       <InnerRightContainer>
//         <InnerRightContainerContent>
//           <InnerRightContentProfileCompletionBox>
//             <CircularContainer>
//               <CircularProgress
//                 // color={"#ffff"}
//                 style={{ color: "#DD484E", transform: "rotate(-270deg)" }}
//                 size={"130px"}
//                 thickness={1.5}
//                 variant="determinate"
//                 value={10}
//               ></CircularProgress>
//               <InnerCircle>
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     fontWeight: 600,
//                     fontSize: "20px",
//                     lineHeight: "15px",
//                     textAlign: "center",

//                     color: "#393939",
//                   }}
//                 >
//                   <span style={{ display: "block", marginBottom: "6px" }}>
//                     100%
//                   </span>
//                   <span
//                     style={{
//                       display: "flex",
//                       fontWeight: 600,
//                       fontSize: "14px",
//                       lineHeight: "15px",
//                       color: "#525252",
//                     }}
//                   >
//                     Product
//                   </span>
//                   <span
//                     style={{
//                       display: "flex",
//                       fontWeight: 600,
//                       fontSize: "14px",
//                       lineHeight: "15px",
//                       color: "#525252",
//                     }}
//                   >
//                     {" "}
//                     Completion
//                   </span>
//                 </div>
//               </InnerCircle>
//             </CircularContainer>
//             <DescriptionText>
//               Please fill in the required field before submitting.
//             </DescriptionText>
//             <ButtonContainer>
//               <Button
//                 color="error"
//                 //size="small"
//                 variant="outlined"
//                 style={{
//                   textTransform: "none",
//                   minWidth: "90px",
//                   // boxShadow:
//                   //   "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
//                 }}
//               >
//                 Preview
//               </Button>
//               <Button
//                 //size="small"
//                 variant="outlined"
//                 style={{
//                   textTransform: "none",
//                   minWidth: "90px",
//                   color: "#7C7C7C",
//                   border: "1px solid #7C7C7C",
//                   // boxShadow:
//                   //   "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
//                   // "&:hover":{
//                   //   border:"1px solid "
//                   // }
//                 }}
//               >
//                 Save Draft
//               </Button>
//             </ButtonContainer>
//             <ButtonContainer style={{ paddingTop: "0px" }}>
//               <Button
//                 variant="contained"
//                 style={{
//                   width: "200px",
//                   textTransform: "none",
//                   fontSize: "14px",
//                   fontWeight: 600,
//                   fontFamily: "open sans",
//                   lineHeight: "24px",
//                   backgroundColor: "#34A853",
//                   marginBottom: "10px",
//                 }}
//                 fullWidth
//                 //size="small"
//               >
//                 Publish Now
//               </Button>
//             </ButtonContainer>
//           </InnerRightContentProfileCompletionBox>
//         </InnerRightContainerContent>
//         <InnerRightMiddleContainer>
//           <ItemContent
//             style={{ borderRight: "1px solid rgba(128, 128, 128, 0.3)" }}
//           >
//             <IconContainer>
//               <Image
//                 alt="help-img"
//                 src={"/assets/upoadImageIcon.svg"}
//                 layout="fill"
//               />
//               {/* <img style={{ cursor: "pointer" }} src={uploadIcon} alt="icon" /> */}
//             </IconContainer>
//             <TextContainer>
//               <span style={{ display: "block" }}> Upload</span>

//               <span style={{ display: "block" }}> Product Images</span>
//             </TextContainer>
//           </ItemContent>
//           <ItemContent>
//             {" "}
//             <IconContainer>
//               <Image
//                 alt="help-img"
//                 src={"/assets/metaKeywordIcon.svg"}
//                 layout="fill"
//               />
//               {/* <img style={{ cursor: "pointer" }} src={} alt="icon" /> */}
//             </IconContainer>
//             <TextContainer>
//               <span style={{ display: "block" }}> Add </span>

//               <span style={{ display: "block" }}> Meta Keyword</span>
//             </TextContainer>
//           </ItemContent>
//         </InnerRightMiddleContainer>
//         <HelpCard>
//           <HelpCardHeader>
//             {" "}
//             <div
//               style={{
//                 width: "14px",
//                 height: "14px",
//                 position: "relative",

//                 display: "inline-block",
//               }}
//             >
//               <Image
//                 src={"/assets/helpIcon.svg"}
//                 alt="help-icon"
//                 layout="fill"
//               />
//             </div>{" "}
//             Help
//           </HelpCardHeader>
//           <HelpCardContentText>
//             If you are experiencing technical issues with our website, please
//             contact us.
//           </HelpCardContentText>
//           <HelpCardFooterContainer>
//             <HelpCardFooterButton size="small" variant="contained">
//               Ask for Help{" "}
//               <div
//                 style={{
//                   position: "relative",
//                   width: "6px",
//                   height: "6px",
//                   marginLeft: "10px",
//                 }}
//               >
//                 {
//                   <Image
//                     src={"/assets/buttonrightarrow.svg"}
//                     layout="fill"
//                     alt="help-icon"
//                   />
//                 }
//               </div>
//             </HelpCardFooterButton>
//           </HelpCardFooterContainer>
//         </HelpCard>
//       </InnerRightContainer>
//     </OuterContainer>
//   );
// };

// export default AddProduct;
import React from 'react'

function AddProduct() {
  return (
    <div>AddProduct</div>
  )
}

export default AddProduct