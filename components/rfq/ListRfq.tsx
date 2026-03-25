import React, { useEffect, useState } from "react";
import {
  ApplyButtonWrapper,
  ButtonContainer,
  DataGridStyleIcon,
  DateAndTime,
  DialogProductInfo,
  EditModeProductTitle,
  EnquiryDetailData,
  FilledButton,
  FilterIconStyle,
  HeadingInfo,
  HelpIcon,
  EnquiryLeadImage,
  LeftFilterMenuList,
  OutLinedButton,
  ProductBasicInformation,
  ProductIDSection,
  RfqButtonContainerLeft,
  RfqFilterCoulm,
  RfqGridContent,
  RfqSearchCommon,
  RfqTableCoulmn,
  SidebarTitle,
  SidebarTitleArea,
  AccordionBorder,
  RfQTabBox,
  Labeldata,
  ActiveBtn,
  AddButtonSection,
  BuyerDetailTop,
  TopRightSection,
  CreatedDate,
} from "./style";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { DataGridPro } from "@mui/x-data-grid-pro";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import MenuItem from "@mui/material/MenuItem";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Drawer from "@mui/material/Drawer";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { apiClient } from "../common/common";
import SimpleRfqFlyout from "./simpleRfqFlyout";
import { useSelector } from "react-redux";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      content: '""',
    },
  },
}));
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));
const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  minHeight: "30px",
  padding: "0 12px",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    margin: "5px 0",
    marginLeft: theme.spacing(0.5),
  },
}));
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
export const ListRfq = () => {
  const [value, setValue] = React.useState("1");
  const [listData, setListData] = useState([]);
  const [filterHideShow, setFilterHideShow] = useState(false);
  const [dataLoader, setDataLoader] = useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const handleChange2 =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  const { user_info, role } = useSelector((state: any) => state.userData);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  type Anchor = "top" | "left" | "bottom" | "right";

  const [openBox, setOpenBox] = useState(false);
  const [age, setAge] = React.useState("");
  const [listValue, setListingValue] = useState<any>("");
  const handleChangeselect = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  useEffect(() => {
    getRfqList();
  }, []);
  const createdDate = new Date(listValue?.created_at);
  const formattedDate = createdDate.toLocaleDateString("en-GB");
  const getRfqList = async () => {
    setDataLoader(true);
    let response = await apiClient("rfq/list", "post");
    if (response.status) {
      setDataLoader(false);
      setListData(response.data);
    } else {
      setDataLoader(false);
      setListData([]);
    }
  };
  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 1100 }}
      role="presentation"
    >
      <BuyerDetailTop>
        <EditModeProductTitle>
          <DialogProductInfo>
            <EnquiryLeadImage>
              <Stack direction="row" spacing={2}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar alt="Remy Sharp" src={user_info?.avatar_original} />
                </StyledBadge>
              </Stack>
            </EnquiryLeadImage>
            <HeadingInfo>
              <Box>
                <Typography className="myproductname">
                  <span className="buyernamein">{user_info?.name} </span>{" "}
                  {user_info?.company_name}
                </Typography>
                <ProductIDSection>
                  <Typography sx={{ borderRight: "1px solid #ddd" }}>
                    Subject: {listValue?.enquiry_type}
                  </Typography>
                  <Typography sx={{ borderRight: "1px solid #ddd" }}>
                    {listValue?.product_name}
                  </Typography>
                  <Typography sx={{ borderRight: "1px solid #ddd" }}>
                    ID:<span>{listValue?.enquiry_user_id}</span>
                  </Typography>
                  <Typography>
                    Created Date:<span>{formattedDate}</span>
                  </Typography>
                </ProductIDSection>
              </Box>
            </HeadingInfo>
          </DialogProductInfo>

          <TopRightSection>
            <Button size="large" variant="outlined">
              View Quotes{" "}
            </Button>
            <Divider orientation="vertical" variant="middle" flexItem />
            <CreatedDate>
              <Typography variant="h6">Created On</Typography>
              <Typography variant="body1">{formattedDate}</Typography>
            </CreatedDate>
          </TopRightSection>

          <CancelOutlinedIcon
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setOpenBox(false);
            }}
          />
        </EditModeProductTitle>
        <AddButtonSection>
          <span>
            <Typography>Add Detail</Typography>
          </span>
          <span>
            <Typography>Edit</Typography>
          </span>
          <span>
            <Typography>Post Again</Typography>
          </span>
          <span>
            <Typography onClick={() => setOpenBox(false)}>Close</Typography>
          </span>
        </AddButtonSection>
      </BuyerDetailTop>
      <ProductBasicInformation>
        <Typography variant="h2" sx={{ fontWeight: "600", fontSize: "16px" }}>
          Product Details
        </Typography>
        <EnquiryDetailData>
          <div>
            {/* configured product */}
            {/* <ConfigurationRfqFlyout listData={listData} /> */}
            <AccordionBorder>
              <div>
                <SimpleRfqFlyout listData={listValue} />
              </div>
            </AccordionBorder>
          </div>
        </EnquiryDetailData>
      </ProductBasicInformation>
    </Box>
  );
  const [expanded3, setExpanded3] = React.useState<string | false>("panel3");

  const columns: any = [
    {
      field: "Sr .No ",
      headerName: "Sr. No",
      minWidth: 50,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        const rowIndex = cellValues.api.getRowIndex(cellValues.id);
        return (
          <>
            <div
              onClick={() => {
                setOpenBox(true);
              }}
            >
              {rowIndex + 1}
            </div>
          </>
        );
      },
    },
    {
      field: "id",
      headerName: "RFQs Id",
      minWidth: 50,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "product_name",
      headerName: "Product Name",
      width: 150,
      editable: false,
      headerAlign: "left",
      align: "left",
    },

    {
      field: "quantity",
      headerName: "Quantity",
      width: 90,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },

    {
      field: "created_at",
      headerName: "Created Date",
      width: 90,
      flex: 1,
      headerAlign: "left",
      align: "left",
      renderCell: (cellValues) => {
        const date = new Date(cellValues.value);
        const formattedDate = date.toLocaleDateString("en-GB");
        return <span>{formattedDate}</span>;
      },
    },
    {
      field: "status",
      headerName: "RFQs Status",
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
  ];

  const handleCellClick = (param, event) => {
    setOpenBox(true);
    setListingValue(param?.row);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          typography: "body1",
          "& .MuiTabPanel-root": {
            padding: 0,
          },
        }}
      >
        <TabContext value={value}>
          <RfQTabBox sx={{ borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label={
                  <Labeldata>
                    <i className="icon-main-task"></i>
                    <Typography>Inquiry </Typography>
                    <HelpIcon />
                  </Labeldata>
                }
                value="2"
              />
              <Divider orientation="vertical" variant="middle" flexItem />

              <Tab
                label={
                  <Labeldata>
                    <i className="icon-icon-rfq"></i>
                    <Typography>My RFQs </Typography>
                    <HelpIcon />
                  </Labeldata>
                }
                value="1"
              />
              <Divider orientation="vertical" variant="middle" flexItem />
              <Tab
                label={
                  <Labeldata>
                    <i className="icon-icon-quote"></i>
                    <Typography>Quote</Typography>
                    <HelpIcon />
                  </Labeldata>
                }
                value="3"
              />
              <Divider orientation="vertical" variant="middle" flexItem />
              <Tab
                label={
                  <Labeldata>
                    <i className="icon-icon-file"></i>
                    <Typography>Files</Typography>
                    <HelpIcon />
                  </Labeldata>
                }
                value="4"
              />
              <Divider orientation="vertical" variant="middle" flexItem />
              <Tab
                label={
                  <Labeldata>
                    <i className="icon-icon-mail"></i>
                    <Typography>Email</Typography>
                    <HelpIcon />
                  </Labeldata>
                }
                value="5"
              />
              <Divider orientation="vertical" variant="middle" flexItem />
            </TabList>
          </RfQTabBox>
          <TabPanel value="1">
            <RfqGridContent>
              <ButtonContainer>
                <RfqButtonContainerLeft>
                  <OutLinedButton
                    variant="outlined"
                    startIcon={<FilterAltOutlinedIcon />}
                    onClick={() => {
                      setFilterHideShow(!filterHideShow);
                    }}
                    sx={filterHideShow && ActiveBtn}
                  >
                    Filter
                  </OutLinedButton>
                </RfqButtonContainerLeft>
              </ButtonContainer>
              <Grid container spacing={1}>
                {!filterHideShow && (
                  <Grid item xs={12} sm={12} md={3} xl={2.2}>
                    <RfqFilterCoulm>
                      <div>
                        <SidebarTitleArea>
                          <SidebarTitle variant="h6">
                            Filter RFQs By
                          </SidebarTitle>
                          <RfqSearchCommon>
                            <TextField
                              fullWidth
                              id="standard-bare"
                              variant="outlined"
                              placeholder="Search..."
                              InputProps={{
                                endAdornment: (
                                  <IconButton>
                                    <SearchIcon />
                                  </IconButton>
                                ),
                              }}
                            />
                          </RfqSearchCommon>
                        </SidebarTitleArea>
                        <div>
                          <Accordion
                            expanded={expanded === "panel1"}
                            onChange={handleChange2("panel1")}
                          >
                            <AccordionSummary
                              aria-controls="panel1d-content"
                              id="panel1d-header"
                            >
                              <SidebarTitle variant="h5">
                                <FilterIconStyle />
                                Filter By Fields
                              </SidebarTitle>
                              <Divider sx={{ m: "12px", mt: "6px", mb: "0" }} />
                            </AccordionSummary>
                            <AccordionDetails>
                              <LeftFilterMenuList>
                                <FormGroup>
                                  <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label="Enquiry Id"
                                  />
                                  <FormControlLabel
                                    required
                                    control={<Checkbox />}
                                    label="Product Name"
                                  />
                                  <FormControlLabel
                                    control={<Checkbox />}
                                    label="Quantity"
                                  />
                                  <FormControlLabel
                                    control={<Checkbox />}
                                    label="Seller Name"
                                  />
                                  <FormControlLabel
                                    control={<Checkbox />}
                                    label="Company Name"
                                  />
                                  <FormControlLabel
                                    control={<Checkbox />}
                                    label="Created Date"
                                  />
                                  <Box sx={{ margin: "5px 0 0" }}>
                                    <Grid container spacing={1}>
                                      <Grid item md={4}>
                                        <FormControl fullWidth>
                                          <Select
                                            size="small"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            //  label="Age"
                                            onChange={handleChangeselect}
                                          >
                                            <MenuItem value={10}>
                                              isn’t
                                            </MenuItem>
                                            <MenuItem value={20}>is</MenuItem>
                                          </Select>
                                        </FormControl>
                                      </Grid>
                                      <Grid item md={8}>
                                        <TextField
                                          id="outlined-basic"
                                          placeholder="Type Here"
                                          variant="outlined"
                                          size="small"
                                        />
                                      </Grid>
                                    </Grid>
                                  </Box>
                                </FormGroup>
                              </LeftFilterMenuList>
                              <ApplyButtonWrapper>
                                <FilledButton variant="outlined">
                                  Apply Filter
                                </FilledButton>
                                <OutLinedButton variant="outlined">
                                  Clear
                                </OutLinedButton>
                              </ApplyButtonWrapper>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      </div>
                    </RfqFilterCoulm>
                  </Grid>
                )}
                <Grid
                  item
                  xs={12}
                  sm={9}
                  md={!filterHideShow ? 9 : 12}
                  xl={!filterHideShow ? 9.8 : 12}
                >
                  <RfqTableCoulmn sx={{ height: 520, width: "100%" }}>
                    <DataGridPro
                      onCellClick={handleCellClick}
                      autoHeight
                      rows={listData ? listData : []}
                      columns={columns}
                      loading={dataLoader}
                      rowHeight={32}
                      // checkboxSelection
                      sx={DataGridStyleIcon}
                    />
                  </RfqTableCoulmn>
                </Grid>
                :
              </Grid>
            </RfqGridContent>
          </TabPanel>
          <TabPanel value="2">
            <RfqGridContent>
              <ButtonContainer>
                <RfqButtonContainerLeft>
                  <OutLinedButton
                    variant="outlined"
                    startIcon={<FilterAltOutlinedIcon />}
                    onClick={() => {
                      setFilterHideShow(!filterHideShow);
                    }}
                    sx={filterHideShow && ActiveBtn}
                  >
                    Filter
                  </OutLinedButton>
                </RfqButtonContainerLeft>
              </ButtonContainer>
              <Grid container spacing={1}>
                {!filterHideShow && (
                  <Grid item xs={12} sm={12} md={3} xl={2.2}>
                    <RfqFilterCoulm>
                      <div>
                        <SidebarTitleArea>
                          <SidebarTitle variant="h6">
                            Filter RFQs By
                          </SidebarTitle>
                          <RfqSearchCommon>
                            <TextField
                              fullWidth
                              id="standard-bare"
                              variant="outlined"
                              placeholder="Search..."
                              InputProps={{
                                endAdornment: (
                                  <IconButton>
                                    <SearchIcon />
                                  </IconButton>
                                ),
                              }}
                            />
                          </RfqSearchCommon>
                        </SidebarTitleArea>
                        <div>
                          <Accordion
                            expanded={expanded === "panel1"}
                            onChange={handleChange2("panel1")}
                          >
                            <AccordionSummary
                              aria-controls="panel1d-content"
                              id="panel1d-header"
                            >
                              <SidebarTitle variant="h5">
                                <FilterIconStyle />
                                Filter By Fields
                              </SidebarTitle>
                              <Divider sx={{ m: "12px", mt: "6px", mb: "0" }} />
                            </AccordionSummary>
                            <AccordionDetails>
                              <LeftFilterMenuList>
                                <FormGroup>
                                  <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label="Enquiry Id"
                                  />
                                  <FormControlLabel
                                    required
                                    control={<Checkbox />}
                                    label="Product Name"
                                  />
                                  <FormControlLabel
                                    control={<Checkbox />}
                                    label="Quantity"
                                  />
                                  <FormControlLabel
                                    control={<Checkbox />}
                                    label="Seller Name"
                                  />
                                  <FormControlLabel
                                    control={<Checkbox />}
                                    label="Company Name"
                                  />
                                  <FormControlLabel
                                    control={<Checkbox />}
                                    label="Created Date"
                                  />
                                  <Box sx={{ margin: "5px 0 0" }}>
                                    <Grid container spacing={1}>
                                      <Grid item md={4}>
                                        <FormControl fullWidth>
                                          <Select
                                            size="small"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            //  label="Age"
                                            onChange={handleChangeselect}
                                          >
                                            <MenuItem value={10}>
                                              isn’t
                                            </MenuItem>
                                            <MenuItem value={20}>is</MenuItem>
                                          </Select>
                                        </FormControl>
                                      </Grid>
                                      <Grid item md={8}>
                                        <TextField
                                          id="outlined-basic"
                                          placeholder="Type Here"
                                          variant="outlined"
                                          size="small"
                                        />
                                      </Grid>
                                    </Grid>
                                  </Box>
                                </FormGroup>
                              </LeftFilterMenuList>
                              <ApplyButtonWrapper>
                                <FilledButton variant="outlined">
                                  Apply Filter
                                </FilledButton>
                                <OutLinedButton variant="outlined">
                                  Clear
                                </OutLinedButton>
                              </ApplyButtonWrapper>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      </div>
                    </RfqFilterCoulm>
                  </Grid>
                )}
                <Grid
                  item
                  xs={12}
                  sm={9}
                  md={!filterHideShow ? 9 : 12}
                  xl={!filterHideShow ? 9.8 : 12}
                >
                  <RfqTableCoulmn sx={{ height: 520, width: "100%" }}>
                    <DataGridPro
                      onCellClick={handleCellClick}
                      autoHeight
                      rows={listData ? listData : []}
                      columns={columns}
                      loading={dataLoader}
                      rowHeight={32}
                      // checkboxSelection
                      sx={DataGridStyleIcon}
                    />
                  </RfqTableCoulmn>
                </Grid>
                :
              </Grid>
            </RfqGridContent>
          </TabPanel>
        </TabContext>
      </Box>
      <div>
        <React.Fragment key={"right"}>
          <Drawer anchor={"right"} open={openBox}>
            {list("right")}
          </Drawer>
        </React.Fragment>
      </div>
    </>
  );
};
