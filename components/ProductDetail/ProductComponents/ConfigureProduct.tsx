import React, { useEffect, useState } from "react";
import {
  FieldContainer,
  ScrollCol,
  SelectContainer,
  SelectLbl,
  ConfigList,
  CollapseIcon,
  SelectproductFeature,
  SelectProductText,
  ItemSelectRow,
  NowSelect,
  CollapseIconSelect,
  SelectProductt,
  SelectFormControl,
  TabPanelStyle,
  QuantityPriceRow,
  PriceColumn,
  QuantityColumn,
  QtyContainer1,
  QtyCounter,
  CustomisedConfigration,
  TopAraaText,
  AddSpecifications,
  CustomizationContainer,
  MyLabel,
  AddIcons,
  StyleDrawer,
  UnfoldBtn,
  AvailableOpt4Config,
  AvailableOptText,
  StylingDatagrid,
  AddFeatures,
} from "@/components/ProductDetail/style";
import {
  Collapse,
  MenuItem,
  FormControl,
  Select,
  Typography,
  Stack,
  Button,
  Grid,
  TextField,
  Link,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setProductConfig } from "@/hooks/productDetailsReducer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ConfigureFlyOut from "./Modal/ConfigureFlyOut";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { IconButton } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import { DataGridPro } from "@mui/x-data-grid-pro";
import ConfigueQuoteModal from "./Modal/ConfigueQuoteModal";
import { data } from "jquery";
import { apiClient } from "@/components/common/common";
import GetQuoteConfigModal from "./Modal/GetQuoteConfiModal";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    width: "1200px",
    maxWidth: "1200px",
  },
  "& .MuiDialogTitle-root": {
    fontSize: "18px",
    padding: "10px 20px",
    color: "#000",
  },
}));

type Anchor = "top" | "left" | "bottom" | "right";
const ConfigureProduct = () => {
  const dispatch = useDispatch();
  const { productConfig }: any = useSelector(
    (state: any) => state.productDetail
  );

  const [options, setOptions] = useState<any>([]);

  const { variation_options } = useSelector(
    (state: any) => state.productDetail.detail.data
  );
  const { toggleConfigure } = useSelector((state: any) => state.productDetail);

  const DropDownHandler = (e, parent, index) => {
    const { name, value } = e.target;

    const [parentID, childID, itemName] = value.split("$=$");
    let configuration = productConfig.filter((v) => v.parentID !== `${parent}`);
    let data: any = [
      ...configuration,
      { value: childID, name, parentID, itemName, index },
    ];
    dispatch(setProductConfig(data));
  };
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  // const [expanded, setExpanded] = useState(false);

  const toggleFlyout = () => {
    setIsFlyoutOpen(!isFlyoutOpen);
  };

  // const toggleExpand = () => {
  //   setExpanded(!expanded);
  // };
  useEffect(() => {
    setOptions(variation_options);
  }, [variation_options]);
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [expandeddiv, setExpandeddiv] = useState(false);
  const toggleExpand = () => {
    setExpandeddiv(!expandeddiv);
  };

  const [expandeddiv2, setExpandeddiv2] = useState(false);
  const toggleExpand2 = () => {
    setExpandeddiv2(!expandeddiv2);
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [simpleQuanity, setSimpleQuanity] = React.useState<any>(1);
  const handleSimpleQuantity = async (e) => {
    const re = /^[0-9+\-/()]+$/;
    const newValue = e.target.value;
    if (newValue === "" || re.test(newValue)) {
      setSimpleQuanity(newValue);
    }
  };
  const [expandedText, setExpandedText] = useState(false);
  const handleExpandCollapse = () => {
    setExpandedText(!expandedText);
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const columns: any = [
    {
      field: "id",
      headerName: "Image",
      minWidth: 50,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "orderid",
      headerName: "Size",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "productName",
      headerName: "Color",
      width: 150,
      editable: false,
      headerAlign: "left",
      align: "left",
    },

    {
      field: "weight",
      headerName: "Weight",
      width: 90,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },

    {
      field: "area",
      headerName: "Area",
      width: 90,
      flex: 1,
      headerAlign: "left",
      align: "left",
    },

    {
      field: "quantity",
      headerName: "Grade",
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },

    {
      field: "attribute",
      headerName: "Attribute",
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
  ];
  const rows = [
    {
      id: 1,
      orderid: "1.5mm",
      productName: "Red",
      price: "$1880",
      weight: "32kg",
      area: "55000 sq ft.",
      quantity: "Renewed",
      amount: 450,
      attribute: "Attribute1",
    },
    {
      id: 2,
      orderid: "9.5mm",
      productName: "Green",
      price: "$1880",
      weight: "32kg",
      area: "55000 sq ft.",
      quantity: "Renewed",
      amount: 450,
      attribute: "Attribute1",
    },
    {
      id: 3,
      orderid: "02.5mm",
      productName: "Blue",
      price: "$1880",
      weight: "32kg",
      area: "55000 sq ft.",
      quantity: "Refurbished",
      amount: 450,
      attribute: "Attribute1",
    },
    {
      id: 4,
      orderid: "3.2mm",
      productName: "Blue",
      price: "$1880",
      weight: "32kg",
      area: "55000 sq ft.",
      quantity: "Refurbished",
      amount: 450,
      attribute: "Attribute1",
    },
    {
      id: 5,
      orderid: "7.2mm",
      productName: "White",
      price: "$1880",
      weight: "32kg",
      area: "55000 sq ft.",
      quantity: "Brands New",
      amount: 450,
      attribute: "Attribute1",
    },
    {
      id: 6,
      orderid: "7.2mm",
      productName: "Red",
      price: "$1880",
      weight: "32kg",
      area: "55000 sq ft.",
      quantity: "Damage",
      amount: 450,
      attribute: "Attribute1",
    },
    {
      id: 7,
      orderid: "7.2mm",
      productName: "Blue",
      price: "$1880",
      weight: "32kg",
      area: "55000 sq ft.",
      quantity: "Damage",
      amount: 450,
      attribute: "Attribute1",
    },
  ];
  const { id } = useSelector((state: any) => state.productDetail.detail.data);
  const [totalMatrix, setTotalMatrixData] = useState<any>("");
  useEffect(() => {
    fetchSingleProductDetails();
  }, []);
  const fetchSingleProductDetails = async () => {
    let response = await apiClient("front/single/view", "post", {
      body: { id: id },
    });
    if (response.status === 200) {
      setTotalMatrixData(response?.total_matrix);
    }
  };
  return (
    <>
      {options?.length > 0 && (
        <FieldContainer
          sx={{
            "& .PrivateSwipeArea-root": {
              width: "0px !important",
            },
          }}
        >
          {/* <Typography variant="h6">Configure the Product</Typography> */}
          {
            // <ConfigList>
            <>
              {/* <Collapse in={expanded} timeout="auto" collapsedSize={"70px"}>
                <ScrollCol>
                  {options?.map((val, i) => {
                    let index = productConfig.findIndex(
                      (v) => v.parentID == val.id
                    );
                    let value = index >= 0 ? productConfig[index] : "";
                    return (
                      <>
                        <SelectContainer className={value ? "active" : ""}>
                          <SelectLbl>{val.name}</SelectLbl>
                          <FormControl style={{ width: "100%" }} size="small">
                            <Select
                              displayEmpty
                              id="demo-simple-configure"
                              size="small"
                              placeholder={`Select ${val.name}`}
                              name={val.name}
                              onChange={(e) => DropDownHandler(e, val.id, i)}
                              value={
                                value
                                  ? `${value?.parentID}$=$${value?.value}$=$${value?.itemName}`
                                  : ""
                              }
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              <MenuItem value="">Select</MenuItem>
                              {val.parents.map((item) => (
                                <MenuItem
                                  key={item.id}
                                  value={`${val.id}$=$${item.id}$=$${item.name}`}
                                >
                                  {item.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </SelectContainer>
                      </>
                    );
                  })}
                </ScrollCol>
              </Collapse>
              <Stack
                display={{
                  xs: options.length >= 2 ? "block" : "none",
                  sm: options.length > 3 ? "block" : "none",
                  xl: options.length > 7 ? "block" : "none",
                  lg: options.length > 6 ? "block" : "none",
                  md: options.length > 4 ? "block" : "none",
                }}
              >
                <CollapseIcon
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  {!expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </CollapseIcon>
              </Stack> */}
              <SelectproductFeature>
                <ItemSelectRow>
                  <SelectProductText>
                    Select Product Features:{" "}
                    <span className="totalvariation">
                      Total variations:{" "}
                      <span className="itemcount">{totalMatrix ?? "N/A"}</span>
                    </span>
                  </SelectProductText>
                  <NowSelect>
                    <CollapseIconSelect
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <Button
                        disableRipple
                        // onClick={toggleExpand}
                        variant="text"
                        onClick={toggleFlyout}
                      >
                        Select Now <KeyboardArrowRightRoundedIcon />
                        {/* {!expanded ? (
                          <KeyboardArrowRightRoundedIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )} */}
                      </Button>
                    </CollapseIconSelect>
                  </NowSelect>
                </ItemSelectRow>

                <ItemSelectRow>
                  <AvailableOpt4Config>
                    {/* <AvailableOptText>
                      Available Options of Configuration
                    </AvailableOptText> */}
                    {/* <span>
                      <Button
                        startIcon={<AddRoundedIcon />}
                        variant="text"
                        onClick={handleClickOpen}
                      >
                        View More
                      </Button>
                    </span> */}
                  </AvailableOpt4Config>
                </ItemSelectRow>
              </SelectproductFeature>
              <StyleDrawer
                anchor="right"
                open={isFlyoutOpen}
                onClose={() => setIsFlyoutOpen(true)}
                onOpen={toggleFlyout}
              >
                <GetQuoteConfigModal
                  toggleFlyout={toggleFlyout}
                  type={"select"}
                />
              </StyleDrawer>
              <div>
                <BootstrapDialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                >
                  <DialogTitle sx={{ m: 0, p: 1 }} id="customized-dialog-title">
                    Available Options of Configuration
                  </DialogTitle>
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500],
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <DialogContent dividers>
                    <Box sx={{ height: 400, width: "100%" }}>
                      <Typography
                        sx={{
                          color: "#000",
                          fontSize: "16px",
                          padding: "0px 0 10px",
                        }}
                      >
                        List of configuration
                      </Typography>
                      <DataGridPro
                        autoHeight
                        rows={rows}
                        columns={columns}
                        loading={rows.length === 0}
                        rowHeight={32}
                        checkboxSelection
                        sx={StylingDatagrid}
                      />
                    </Box>
                  </DialogContent>
                </BootstrapDialog>
              </div>
            </>
            // </ConfigList>
          }
        </FieldContainer>
      )}
    </>
  );
};
export default ConfigureProduct;
