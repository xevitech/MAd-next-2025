import { Padding } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  FormControl,
  List,
  styled,
  Typography,
} from "@mui/material";

export const CatelogeWhiteContainer = styled(Box)({
  background: "#FFFFFF",
  boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.075)",
  padding: "10px",
  borderRadius: "6px",
});
export const CataloguCommonHeading = styled(Box)({
  display: "flex",
  gap: "5px",
  "& svg": {
    color: "#34A853",
    fontSize: "16px",
  },
  "& .MuiTypography-body2": {
    color: "#34A853",
    fontSize: "13px",
  },
  "& .cataloginfoicon": {
    marginTop: "6rem",
    "@media (max-width:767px)": {
      display: "none",
    },
  },
});
export const AboutCateloge = styled(Typography)({
  fontWeight: "600",
  fontSize: "15px",
});
export const TypographyBody2 = styled(Typography)({
  fontSize: "13px",
});
export const CatelogWrapper = styled(Box)({
  borderRadius: "10px",
  padding: "7px 18px",
  "@media screen and (max-width:767px)": {
    padding: "0",
  },
});
export const SmallHeading = styled("h3")({
  padding: "10px 0",
  fontSize: "18px",
  "@media screen and (max-width:400px)": {
    fontSize: "12px",
    padding: "10px 0",
  },
});

export const CatalogDescriptionArea = styled(Box)({
  padding: "10px 0 0",
  "& .MuiTypography-body1": {
    fontSize: "14px",
    padding: "0 0 2px",
  },
  "& .MuiTypography-body2": {
    fontSize: "12px",
  },
});

export const CatelogArea = styled(Box)({
  // padding: "1rem 0 0",
});
export const FlexArea = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

export const CatelogMainHeading = styled("h2")({
  fontSize: "18px",
  fontWeight: 600,
});
export const CatelogDes = styled(Typography)({
  fontSize: "14px",
  fontWeight: 400,
});
export const RedFilledButton = styled(Button)({
  background: "#d7282f",
  color: "#fff",
  height: "30px",
  textTransform: "capitalize",
  "&:hover": {
    background: "#d7282f",
    color: "#fff",
  },
});

export const CatelogSearchCommon = styled("div")(({ theme }) => ({
  position: "relative",
  marginLeft: 0,
  width: "250px",
  padding: "0 0 1rem",
  margin: "0",
  "& .MuiInputBase-input": {
    paddingTop: "8px",
    paddingBottom: "8px",
    transition: "all 2s ease-in",
  },
  "& button": {
    padding: "0",
    margin: "3px 0px 3px -5px",
  },
  "& svg": {
    color: "#515151",
    fontSize: "19px",
  },
  "& fieldset": {
    borderRadius: "5px",
  },

  "@media screen and (max-width:400px)": {
    width: "100%",
    padding: "10px 0 0",
  },
}));

export const SearchContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  "@media screen and (max-width:776px)": {
    display: "block",
    marginBottom: "10px",
  },
});
export const CatalogFlexBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  "@media screen and (max-width:900px)": {
    display: "block",
  },
  "@media screen and (max-width:400px)": {
    gap: "5px",
  },
  "& .VertiDivider": {
    "@media screen and (max-width:900px)": {
      display: "none",
    },
  },
  "& .selectedrow": {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    margin: "0 0 10px 0",
    "@media screen and (max-width:320px)": {
      display: "block",
    },
  },
  "& .selecteddelete": {
    justifyContent: "flex-start",
  },
  "& .listPro":{
    margin:'0',
    "@media screen and (max-width:900px)": {
     margin:"10px 0",
    },
  }
});
export const CatelogTableCoulmn = styled(Box)({});
export const DataGridStyle = {
  // "& .MuiDataGrid-columnHeaderTitle": {
  //     fontWeight: 600,
  //     fontSize: "14px",
  //     color: "#1A2027",
  //     fontFamily: "Open Sans",
  // },
  // "& .MuiDataGrid-cell": {
  //     color: "#3E5060",
  //     fontSize: "13px",
  //     fontFamily: "Open Sans",
  //     cursor: "pointer",
  // },
  // "& .Mui-checked": {
  //     color: "#d7282fcc",
  // },
  // "& .MuiSvgIcon-root": {
  //     color: "#D7282F",
  //     fontSize: 16,
  // },
  "& .MuiDataGrid-cell:focus": {
    outline: "none",
  },
  "&.MuiDataGrid-root": {
    height: "90%",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 600,
    fontSize: "14px",
    color: "#1A2027",
    fontFamily: "Open Sans",
  },
  "& .MuiDataGrid-cell, .MuiTypography-root": {
    color: "#3E5060",
    fontSize: "13px",
    fontFamily: "Open Sans",
    cursor: "pointer",
  },
  "& .Mui-checked": {
    color: "#d7282fcc !important",
  },
  ".MuiCheckbox-root": {
    "& .MuiSvgIcon-root": {
      display: "none",
    },
    "&:before": {
      content: '" "',
      display: "block",
      width: "1rem",
      height: "1rem",
      border: "1px solid #d2d2d2",
      borderRadius: "4px",
    },
    "&:after": {
      content: '" "',
      display: "inline-block",
      transform: "rotate(45deg)",
      width: "4px",
      height: "8px",
      borderBottom: "2px solid #D7282F",
      borderRight: "2px solid #D7282F",
      position: "absolute",
      top: "11px",
      opacity: "0",
    },
    "&:hover": {
      "&:before": {
        borderColor: "#b1b0b0",
      },
    },
    "&.Mui-checked": {
      "&:after": {
        opacity: "1",
      },
      "&:before": {
        borderColor: "#D7282F",
      },
    },
  },
};
export const ListTableContainer = styled(Box)({
  // border: "1px solid #ddd",
  // padding: "16px",
  // borderRadius: "6px",
  margin: "1rem 0",
});

export const CreateTableTabs = styled(Box)({
  "& .MuiTabs-indicator": {
    background: "#d7282f",
    height: "38px",
    color: "#fff",
    borderRadius: "4px 4px 0 0px",
  },
  "& .MuiTab-root": {
    background: "#ECECEC",
    color: "#000",
    fontSize: "14px",
    textTransform: "capitalize",
    borderRadius: "4px 4px 0 0px",
    padding: "10px 16px",
    minHeight: "38px",
  },
  "& .Mui-selected": {
    color: "#fff !important",
    position: "relative",
    zIndex: 10,
    background: "transparent",
  },
  "& .MuiTabPanel-root": {
    padding: 0,
  },
  "& .MuiTabs-root": {
    minHeight: "38px",
  },
  "& .MuiTabs-flexContainer": {
    gap: "10px",
  },
});
export const AddNewProductcatalogue = styled(Box)({
  margin: "1rem 0",
});
export const AddMoreStripe = styled(Box)({
  background: "#FFEBED",
  width: "max-content",
  padding: "6px 10px",
  position: "relative",
  "@media screen and (max-width: 767px)": {
    width: "100%",
  },
  "& .MuiTypography-root": {
    fontWeight: 600,
    fontSize: "16px",
    "@media screen and (max-width: 767px)": {
      fontSize: "14px",
    },
  },
  "::before": {
    content: '""',
    position: "absolute",
    bottom: "8px",
    right: "-17px",
    transform: "translateY(-50%)",
    width: 0,
    height: 0,
    borderLeft: "18px solid transparent",
    borderRight: "18px solid transparent",
    borderBottom: "20px solid #FFEBED", // Color of the triangle
    rotate: "90deg",
    "@media screen and (max-width: 767px)": {
      display: "none",
    },
  },
  "& span": {
    fontWeight: 700,
  },
});

/****===== Start styling for Create Catalogue opage =====****/
export const CreateCatalogueCNtent = styled(Box)({
  margin: "14px 0",
});
export const SelectBoxOuter = styled(Box)({
  border: "1px solid #DADADA",
  borderRadius: "6px",
  padding: "12px",
  height: "100%",
});
export const SelectScrollBox = styled(Box)({
  overflowX: "auto",
  display: "flex",
  gap: "10px",
  justifyContent: "space-between",
});

export const FixedWidthBox = styled(Box)({
  width: "240px",
  minWidth: "230px",
  minHeight: "320px",
});

export const SelectHeading = styled(Typography)({
  color: "#223354",
  fontWeight: 600,
  fontSize: "15px",
});
export const Selectdes = styled(Typography)({
  color: "#231F20",
  fontSize: "13px",
  padding: "2px 0 0",
});

export const SelectBoxOuterInner = styled(Box)({
  border: "1px solid #ddd",
  padding: "6px",
  borderRadius: "6px",
  // margin: "10px 0 0",
  height: "100%",
  "& .Catalog-AddCategory": {
    "& svg": {
      color: "#d7282f",
      fontSize: "21px",
    },
    "& .MuiInputBase-root": {
      paddingRight: 0,
    },
  },
});
export const CreateSearchCommon = styled("div")(({ theme }) => ({
  position: "relative",
  marginLeft: 0,
  width: "100%",
  margin: "6px 0px 2px",
  "& .MuiInputBase-input": {
    paddingTop: "8px",
    paddingBottom: "8px",
    transition: "all 2s ease-in",
  },
  "& button": {
    margin: "3px 0px 3px -5px",
    padding: "1px 6px 1px 2px",
  },
  "& svg": {
    color: "#9199AA",
    fontSize: "19px",
  },
  "& fieldset": {
    borderRadius: "6px",
  },
}));
export const ParentSearchedCategoryList = styled(Box)({
  maxHeight: "280px",
  overflowY: "auto",
});
export const SearchedCategoryList = styled(Box)({
  maxHeight: "230px",
  overflowY: "auto",
});
export const ListComonent = styled(List)({
  "& .MuiListItemIcon-root": {
    minWidth: "30px !important",
    // "& img": {
    //   filter: "grayscale(100%)",
    // },
  },
  "& .MuiListItemButton-root": {
    paddingLeft: "8px",
    paddingTop: "3px",
    paddingBottom: "3px",
    marginBottom: "4px",
    "&:hover": {
      borderRadius: "4px !Important",
      background: "#ffecec",
      color: "#000",
    },
    "& .MuiTypography-root": {
      fontSize: "13px",
      color: "#7B7979",
    },
  },
  "& .SelectedCatelog": {
    "& .MuiButtonBase-root": {
      background: "#ffecec",
      "& .MuiTypography-root": {
        color: "#000",
      },
    },
  },
});
export const BtmActiontns = styled(Box)({
  display: "flex",
  gap: "10px",
  "& .updateBTN": {
    minWidth: "122px",
    "@media screen and (max-width:767px)": { minWidth: "auto" },
  },
});
export const SettingFormBox = styled(Box)({
  padding: "24px 10px 0",
});

export const TextFieldDiv = styled(Box)({
  margin: "0 0 15px",
});

export const BrowseIconC = styled("span")({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "120px",
  "& .MuiButtonBase-root": {
    background: "#fff !important",
    boxShadow: "none !important",
    padding: 0,
  },
  "& .MuiButton-icon": {
    marginRight: "0 !important",
  },
});

export const CBrowseText = styled(Typography)({
  fontSize: "14px",
  color: "#444",
  textTransform: "none",
});
export const BrowseBox = styled(Box)({
  textAlign: "center",
  flexDirection: "column",
  display: "inline-flex",
  alignItems: "center",
});
export const CLUploadImagRow = styled(Box)({
  flexWrap: "wrap",
  display: "flex",
  gap: 7,
  margin: "10px 0",
});

export const CLUploadImageCol = styled("span")({
  display: "inline-flex",
  alignItems: "center",
  border: "1px solid #d2d2d2",
  borderRadius: "4px",
  padding: "4px 6px",
  "& img": { maxWidth: "40px", minWidth: "40px" },
  "& .MuiTypography-body2": {
    position: "relative",
    "&::before": {
      borderRight: "1px solid #d2d2d2",
      content: '" "',
      position: "absolute",
      right: "-6px",
      height: "17px",
      top: 3,
    },
  },
  "& .MuiTypography-root": {
    fontSize: "14px",
    color: "#223354",
  },
  "& svg": {
    padding: "3px 0px 0 8px",
    color: "#d7282f",
    fontSize: "21px",
  },
});
export const CLUpImageName = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginLeft: "8px",
  "& .imagenname": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "70px",
  },
});
export const MainDialogueContent = styled(Box)({
  alignItems: "center",
  flexDirection: "column",
  display: "flex",
  padding: "30px 0 20px",
  "& .MuiTypography-h5": {
    color: "#000",
    fontSize: "16px",
    fontWeight: 700,
    padding: "10px 0 0",
  },
  "& .MuiTypography-body1": {
    color: "#000",
    fontSize: "14px",
  },
});

export const OuterBox = styled(Box)({
  padding: "20px",
});
export const ModalHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
export const ModalTitle = styled(Typography)({
  fontSize: "18px",
  fontWeight: "600",
  color: "#000",
});
export const SpecificationSelect = styled(Typography)({
  fontSize: "14px",
  fontWeight: "400",
  color: "#000",
  "& span": {
    fontWeight: "600",
  },
});
export const Section = styled(Box)({
  margin: "12px 0 0 0",
  "& .MuiTypography-root": {
    fontSize: "12px",
    fontWeight: "400",
    color: "#414141",
  },
});
export const SpecificationBox = styled(Box)({
  border: "1px solid #ddd",
  padding: "10px",
  borderRadius: "6px",
  height: "130px",
  overflow: "auto",
});
export const SpecificationBtn = styled(Button)({
  color: "#000",
  fontSize: "12px",
  fontWeight: "400",
  border: "1px solid #B2B1B1",
  borderRadius: "4px",
  padding: "0px 8px 0px 8px",
  margin: "0 6px 6px 0",
  height: "24px",
  "&:hover": {
    backgroundColor: "transparent",
  },
});

/****===== End styling for Create Catalogue opage =====****/

/****===== Start styling for Create page skeleton =====****/
export const CatelogSkeletonBox = styled(Box)({
  padding: "20px",
});

/***************************************** CRM Buttons Variation  *************************************************/
export const CommonBlackOutineBtn = styled(Button)({
  minWidth: "90px",
  borderRadius: "4px",
  background: "#fff",
  border: "1px solid #231F20",
  color: "#231F20",
  fontSize: "13px",
  fontWeight: 600,
  padding: "0 6px",
  textTransform: "capitalize",
  height: "33px",
  "& svg": { fontSize: "16px !Important" },
  "&:hover": {
    background: "#231F20",
    opacity: "85%",
    color: "#fff",
    border: "1px solid transparent",
  },
  "&:hover i::before": {
    color: "#fff",
  },
  "@media screen and (max-width: 900px)": {
    minWidth: "70px",
    padding: "0 3px",
    height: "30px",
  },
});
export const CommonRedOutineBtn = styled(Button)({
  minWidth: "70px",
  borderRadius: "4px",
  background: "#fff",
  border: "1px solid #D7282F",
  color: "#D7282F",
  fontSize: "13px",
  fontWeight: 600,
  padding: "0 9px",
  textTransform: "capitalize",
  height: "33px",
  boxShadow: "none",
  "& svg": { fontSize: "16px !Important" },
  "&:hover": {
    background: "#D7282F",
    opacity: "85%",
    color: "#fff",
    border: "1px solid transparent",
  },
  "&:hover i::before": {
    color: "#fff",
  },
  "@media screen and (max-width: 900px)": {
    minWidth: "70px",
    padding: "0 3px",
    height: "30px",
  },
});

// Catalogue Detail style------------------------------------------------------------------

export const MainHeadingCatalogue = styled(Box)({
  "& .MuiTypography-root": {
    fontSize: "16px",
    fontWeight: "600",
    padding: "0 0 6px 0",
  },
});
export const CatelogueDetailOuter = styled(Box)({
  border: "1px solid #d2d2d2",
  borderRadius: "8px",
});
export const CatelogueDetailHeadingBox = styled(Box)({
  backgroundColor: "#F5F5F5",
  padding: "10px 12px",
  borderRadius: "8px",
  "& .MuiTypography-root": {
    fontSize: "14px",
    fontWeight: "600",
  },
});
export const CatelogueDetailSubHeadingBox = styled(Box)({
  padding: "10px 12px",
  "& .MuiTypography-root": {
    fontSize: "13px",
    fontWeight: "400",
  },
});

export const AddMorePro = styled(Button)({
  textTransform: "capitalize",
});

// List of Products Table style------------------------------------------------------------------

export const ListOfProductData = styled(Box)({});
export const ListProductRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "@media screen and (max-width:767px)": {
    display: "block",
  },
  "&.list-of-product":{
    "@media screen and (max-width:900px)": {
    display: "block",
  },
  }
});
export const ListProductTable = styled(Box)({
  margin: "1rem 0 0 0",
  "& .MuiChip-root": {
    padding: "3px 0",
    height: "auto",
    borderRadius: "3px",
    "& .MuiChip-label": {
      margin: "2px 0 0",
      fontFamily: "Open Sans",
      fontSize: "12px",
    },
  },
});
export const ListTypography = styled(Typography)({
  fontSize: "20px",
  fontWeight: 600,
});
export const ActionBoxHere = styled(Box)({
  fontSize: "20px",
  fontWeight: 600,
});

export const AddMoreProductTable = styled(Box)({
  "& .MuiTabs-indicator": {
    background: "#d7282f",
    height: "38px",
    color: "#fff",
    borderRadius: "4px 4px 0 0px",
  },
  "& .MuiTab-root": {
    background: "#ECECEC",
    color: "#000",
    fontSize: "14px",
    textTransform: "capitalize",
    borderRadius: "4px 4px 0 0px",
    minHeight: "38px",
  },
  "& .Mui-selected": {
    color: "#fff !important",
    position: "relative",
    zIndex: 10,
    background: "transparent",
  },
  "& .MuiTabPanel-root": {
    padding: 0,
  },
  "& .MuiTabs-root": {
    minHeight: "38px",
  },
  "& .MuiTabs-flexContainer": {
    gap: "10px",
  },
  "& .MuiTabs-fixed": {
    height: "41px",
  },
});

// Add More Products Table style------------------------------------------------------------------

export const AddProductTableBox = styled(Box)({
  margin: "1rem 0 0",
  "& .MuiTabs-scrollButtons": {
    display: "inline-flex !important",
    boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
  },
});
export const AddProductTable = styled(Box)({});
export const NewProductCase = styled(Box)({
  margin: "1rem 0 0",
});
export const SelectedProductDescription = styled(Box)({
  "@media screen and (max-width: 767px)": {
    margin: "1rem 0 0",
  },
});
export const CheckListSelectedproduct = styled(Box)({});
export const Selectmessage = styled(Box)({
  background: "#FFEBED",
  padding: "6px 10px",
  position: "relative",
  width: "100%",
  margin: "1rem 0 0",
  "@media screen and (max-width: 767px)": {
    fontSize: "13px",
  },
  "& .MuiTypography-root": {
    fontWeight: 700,
    fontSize: "15px",
    "@media screen and (max-width: 767px)": {
      fontSize: "13px",
    },
  },
});
export const CheckListSelectedInn = styled(Box)({
  padding: "1rem 0",
  ".MuiCheckbox-root": {
    "& .MuiSvgIcon-root": {
      display: "none",
    },
    "&:before": {
      content: '" "',
      display: "block",
      width: "1rem",
      height: "1rem",
      border: "1px solid #d2d2d2",
      borderRadius: "4px",
    },
    "&:after": {
      content: '" "',
      display: "inline-block",
      transform: "rotate(45deg)",
      width: "4px",
      height: "8px",
      borderBottom: "2px solid #D7282F",
      borderRight: "2px solid #D7282F",
      position: "absolute",
      top: "11px",
      opacity: "0",
    },
    "&:hover": {
      "&:before": {
        borderColor: "#b1b0b0",
      },
    },
    "&.Mui-checked": {
      "&:after": {
        opacity: "1",
      },
      "&:before": {
        borderColor: "#D7282F",
      },
    },
  },
});
export const InstructionTxt = styled(Box)({
  fontWeight: 700,
  margin: "6px 0",
  "@media screen and (max-width: 767px)": {
    fontSize: "15px",
  },
  "& span": {
    color: "#d7282f",
    padding: "0 6px 0 1px",
  },
  "& .cantchange": {
    fontWeight: 400,
    color: "#878787",
    fontSize: "14px",
  },
});

export const SubCheckList = styled(Box)({
  display: "block",
  padding: "0 1.5rem",
  "& .MuiFormControlLabel-root": {
    display: "block",
    "& .MuiTypography-root": {
      fontSize: "15px",
      color: "#1A2027",
      fontWeight: 500,
      "@media screen and (max-width: 767px)": {
        fontSize: "13px",
      },
    },
  },
});
export const MainProductHeading = styled(Box)({
  "& .MuiTypography-root": {
    fontWeight: 700,
    fontSize: "18px",
    color: "#1A2027",
  },
});
export const NumberProductAdd = styled(Box)({
  display: "flex",
  gap: "10px",
  margin: "2rem 0",
  alignItems: "center",
  "& .MuiTypography-root": {
    fontWeight: 700,
    fontSize: "18px",
    color: "#1A2027",
  },
  "& .MuiFormControl-root": {
    minWidth: "400px",
  },
});
export const TextfieldAndButton = styled(Box)({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  "& button": {
    padding: "17px 20px",
  },
});
