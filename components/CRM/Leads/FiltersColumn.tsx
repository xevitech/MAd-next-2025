import React, { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  Checkbox,
  Chip,
  FormControlLabel,
  IconButton,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  FilterCoulmn,
  SearchCoulmBox,
  TitleLeads,
  FilterIconStyle,
  FilterMenuList,
  MylistItem,
  LeadFilterListing,
  FilterField,
  ApplyButtonWrapper,
  FilledButton,
  OutLinedButton,
  SaveFilterValue,
  SaveFilterBox,
  SaveFilterData,
} from "../style";

import { Divider, Grid } from "@mui/material";
import { CrmStyledMenu, SearchCommon } from "../commonStyle";
import { useSelector } from "react-redux";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
  CheckBoxFilter,
  DateFilter,
  DropDownFilter,
  NumberFilter,
  StringFilter,
} from "@/components/common/common";
import SearchIcon from "@mui/icons-material/Search";
import {
  deleteFilterSavedData,
  getAllFieldData,
  setFilters,
  setShowFilters,
  setCustomFilterId,
  setCurrentFilterId,
  setFilterPopUp,
  getKanbanList,
  getAllListOfTags,
  setCustomViewId,
  setSelectedViewName,
} from "@/hooks/UseCreateFormData";
import { useAppDispatch } from "redux/store";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { toast } from "react-toastify";
import CommonOwner from "./CommonOwner";
import { CustomDatePicker } from "@/components/common/datePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";
import { CustomDateTimePicker } from "@/components/common/datePicker/CustomDateTimePicker";
import MobileInputCommon from "@/components/common/PhoneInput";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { MobileCodes } from "@/components/common/PhoneInput/MobileCodesList";
import Swal from "sweetalert2";
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,
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
  backgroundColor: "#f7f7f7",
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
const FiltersColumn = () => {
  const [filterTags, setFilterTags] = useState<any>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick: any = (event: React.MouseEvent<HTMLElement>, data) => {
    dispatch(setCurrentFilterId(data));
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useAppDispatch();
  const {
    savedFieldData,
    showFilters,
    selectedViewName,
    customViewId,
    currentFilterId,
    userLists,
    dataViewType,
    userTags,
    savedFiltersData,
    typeName,
    savedViews,
    customFilterId,
  } = useSelector((state: any) => state.formList);
  const [allFields, setAllFields] = useState([]);
  // const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [expanded, setExpanded] = React.useState<string | false>('panel2');
  const [fieldData, setFieldData] = useState({ condition: "", value: "" });
  const [dateTime, setDateTime] = useState(moment());
  const [defaultCountryCode, setDefaultCountryCode] = useState<any>("");
  const [mount, setMount] = useState<any>(false);
  const [errorText, setErrorText] = useState<string>("");
  const getGeoLocation = async () => {
    try {
      const response = await fetch("https://geolocation-db.com/json/");
      const data = await response.json();
      setDefaultCountryCode(data.country_code);
    } catch (error) {
      return error?.message;
    }
  };

  useEffect(() => {
    setMount(true);
    if (!defaultCountryCode) {
      getGeoLocation();
    }
    if (!defaultCountryCode) {
      let code =
        MobileCodes.find((v) => v.dial_code == `+${defaultCountryCode}`)
          ?.code ?? "";
      setDefaultCountryCode(code);
    }
  }, [defaultCountryCode]);

  const handleChangeFilterAccordion =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  useEffect(() => {
    dispatch(getAllListOfTags());
  }, [dispatch]);

  const autocompleteRef = useRef(null);
  const handleChange = (event, id, type) => {
    let filteredDataIndex = showFilters.findIndex((val) => val.id == id?.id);
    const filteredDataa = [...showFilters];
    if (filteredDataa.length > 0) {
      if (type == "select") {
        filteredDataa[filteredDataIndex] = {
          ...filteredDataa[filteredDataIndex],
          condition: event.target.value,
        };
      } else if (id?.name == "Lead_Owner" && type == "owner") {
        // const newValue = event?.name;
        const newValue = event?.email;
        filteredDataa[filteredDataIndex] = {
          ...filteredDataa[filteredDataIndex],
          value: newValue,
        };
      } else if (id?.field_type == "phone") {
        const newValue = event;
        filteredDataa[filteredDataIndex] = {
          ...filteredDataa[filteredDataIndex],
          value: newValue,
        };
      } else if (id?.field_type == "date") {
        const newValue = event;
        filteredDataa[filteredDataIndex] = {
          ...filteredDataa[filteredDataIndex],
          value: newValue,
        };
      } else if (id?.field_type == "timestamp") {
        const newValue = event;
        setDateTime(newValue);
        filteredDataa[filteredDataIndex] = {
          ...filteredDataa[filteredDataIndex],
          value: newValue
            ? newValue
            : moment(event?.toDate()).format("YYYY-MM-DD HH:mm A"),
        };
      } else if (id?.field_type == "tag") {
        let autocompleteRefValue =
          autocompleteRef?.current?.length > 0 &&
          autocompleteRef?.current?.map((ele) => ele?.id);
        filteredDataa[filteredDataIndex] = {
          ...filteredDataa[filteredDataIndex],
          value: autocompleteRefValue,
        };
      } else {
        filteredDataa[filteredDataIndex] = {
          ...filteredDataa[filteredDataIndex],
          value: event.target.value,
        };
      }
    }

    dispatch(setShowFilters(filteredDataa));
  };

  const handleCheckBoxClick = async (data) => {
    let filters = [...showFilters];
    let filteredData = showFilters.filter((val) => val.id == data.id);
    if (filteredData.length > 0) {
      dispatch(setShowFilters(showFilters.filter((val) => val.id != data.id)));
    } else {
      filters.push({
        id: data.id,
        name: data.name,
        condition: "1",
        value: "",
      });
      dispatch(setShowFilters(filters));
    }
  };

  useEffect(() => { }, [showFilters]);

  useEffect(() => {
    // setAllFields(savedFieldData?.user_form_listing?.form_fields_data);
    setAllFields(savedFieldData?.data?.filter_fields);
  }, [savedFieldData]);

  const handleApplyFilters = async () => {
    if (
      !showFilters?.some(
        (item) =>
          item.value === "" && (item?.condition != 7 || item?.condition != 8)
      )
    ) {
      dispatch(setCustomFilterId([]));
      dispatch(setFilters(showFilters));
      if (dataViewType == 1) {
        dispatch(getKanbanList());
      } else {
        dispatch(getAllFieldData());
      }
    } else {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "custom-btn cancel-button",
          cancelButton: "custom-btn remove-btn",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons.fire({
        title: "Error",
        text: "Please fill all mandatory fields.",
        icon: "error",
        showCancelButton: false,
        // confirmButtonText: "Yes, upgrade it!",
        // cancelButtonText: "No, cancel!",
        reverseButtons: true,
      });
      return;
    }
  };

  const handleClearFilters = async () => {
    setDateTime(null);
    dispatch(setShowFilters([]));
    dispatch(setFilters([]));
    if (dataViewType == 0) {
      dispatch(getAllFieldData());
    } else {
      dispatch(getKanbanList());
    }
  };

  const handleFieldsFilters = async (event) => {
    // let duplcateFields = savedFieldData?.user_form_listing?.form_fields_data;
    let duplcateFields = savedFieldData?.data?.filter_fields;
    let filteredData = duplcateFields.filter((item) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setAllFields(filteredData);
  };

  const handleDeleteFilter = async () => {
    handleClose();
    let response = await dispatch(deleteFilterSavedData(currentFilterId?.id));
    if (response?.payload?.status == 200) {
      toast.success(response?.payload?.message);
      if (dataViewType == 0) {
        if (currentFilterId.id === customFilterId.id) {
          dispatch(setCustomFilterId([]));
          dispatch(setSelectedViewName("All Leads"));
          dispatch(setCustomViewId("0"));
        }
        dispatch(getAllFieldData());
      } else {
        if (currentFilterId.id === customFilterId.id) {
          dispatch(setCustomFilterId([]));
          dispatch(setSelectedViewName("All Leads"));
          dispatch(setCustomViewId("0"));
        }
        dispatch(getKanbanList());
        dispatch(getAllFieldData());
      }
    }
  };

  const handleRenameFilter = async () => {
    dispatch(setFilterPopUp(true));
    handleClose();
  };

  const fetchViewData = async (data) => {
    dispatch(
      setCustomFilterId({ id: data.id, filter: JSON.parse(data.filters) })
    );
    dispatch(getAllFieldData());
    setAnchorEl(null);

    if (dataViewType == 1) {
      dispatch(getKanbanList());
    }
  };

  return (
    <>
      <FilterCoulmn>
        <div>
          {savedFiltersData?.length > 0 && (
            <Accordion onChange={handleChangeFilterAccordion("panel1")} expanded={expanded === "panel1"}>
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <TitleLeads variant="h6" style={{ padding: 0 }}>
                  Saved Filter
                </TitleLeads>
              </AccordionSummary>
              <AccordionDetails>
                <SaveFilterBox>
                  {savedFiltersData?.map((savedFilter, index) => {
                    return (
                      <SaveFilterData
                        key={index}
                        style={{
                          background:
                            customFilterId.id == savedFilter.id ? "#ddd" : "",
                        }}
                      >
                        <SaveFilterValue
                          onClick={() => {
                            fetchViewData(savedFilter);
                          }}
                        >
                          {savedFilter.name}{" "}
                          <span>{savedFilter.total_results}</span>
                        </SaveFilterValue>
                        <div>
                          <IconButton
                            className="Savevaluicon"
                            id="fade-button"
                            aria-controls={open ? "fade-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={(e) => handleClick(e, savedFilter)}
                          >
                            <MoreHorizIcon />
                          </IconButton>
                          <Menu
                            id="fade-menu"
                            MenuListProps={{
                              "aria-labelledby": "fade-button",
                            }}
                            anchorEl={anchorEl}
                            sx={CrmStyledMenu}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                            transformOrigin={{
                              horizontal: "right",
                              vertical: "top",
                            }}
                            anchorOrigin={{
                              horizontal: "right",
                              vertical: "bottom",
                            }}
                          >
                            <MenuItem onClick={handleRenameFilter}>
                              Rename
                            </MenuItem>
                            <MenuItem onClick={handleDeleteFilter}>
                              Delete
                            </MenuItem>
                          </Menu>
                        </div>
                      </SaveFilterData>
                    );
                  })}
                </SaveFilterBox>
                <Divider sx={{ mt: "6px" }} />
              </AccordionDetails>
            </Accordion>
          )}
          <SearchCoulmBox>
            <TitleLeads variant="h6">Filter {typeName} By</TitleLeads>
            <SearchCommon>
              <TextField
                fullWidth
                id="standard-bare"
                variant="outlined"
                placeholder="Search..."
                onChange={(e) => handleFieldsFilters(e)}
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </SearchCommon>
          </SearchCoulmBox>
          <Accordion expanded={expanded === "panel2"}
            onChange={handleChangeFilterAccordion("panel2")}
            defaultExpanded
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <TitleLeads variant="h5">
                <FilterIconStyle />
                Filter By Fields
              </TitleLeads>
              <Divider sx={{ m: "12px", mt: "6px", mb: "0" }} />
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <FilterMenuList>
                {allFields?.length > 0 &&
                  allFields.map((filters, filtersIndex) => {
                    let filteredValue = showFilters?.filter(
                      (ele) => ele.id == filters.id
                    );
                    return (
                      <MylistItem key={filtersIndex} disablePadding>
                        <ListItemButton role={undefined} dense>
                          {filters.name !== "id" && (
                            <FormControlLabel
                              key={filtersIndex + "child"}
                              control={
                                <Checkbox
                                  checked={
                                    filteredValue[0]?.id == filters.id
                                      ? true
                                      : false
                                  }
                                  onClick={() => {
                                    handleCheckBoxClick(filters);
                                  }}
                                />
                              }
                              label={
                                <ListItemText
                                  id={filters.id}
                                  sx={{ textTransform: "capitalize" }}
                                  primary={
                                    filters.name == "mail"
                                      ? "Email"
                                      : filters.name.charAt(0).toUpperCase() +
                                      filters.name
                                        .slice(1)
                                        .replaceAll("_", " ")
                                        .replaceAll(".", "")
                                  }
                                />
                              }
                            />
                          )}
                        </ListItemButton>
                        {showFilters
                          .filter((val) => val.id == filters.id)
                          ?.map((showEle, showIndex) => {
                            return (
                              <LeadFilterListing>
                                <Grid container spacing={1}>
                                  <Grid item xs={3.5}>
                                    <FilterField fullWidth>
                                      <Select
                                        size="small"
                                        MenuProps={{
                                          PaperProps: {
                                            sx: {
                                              maxHeight: "150px",
                                              "&::-webkit-scrollbar": {
                                                width: "0.4em",
                                                backgroundColor: "#f1f1f1",
                                              },
                                              "&::-webkit-scrollbar-track": {
                                                boxShadow:
                                                  "inset 0 0 6px rgba(0,0,0,0.00)",
                                                webkitBoxShadow:
                                                  "inset 0 0 6px rgba(0,0,0,0.00)",
                                              },
                                              "&::-webkit-scrollbar-thumb": {
                                                backgroundColor: "#dedede",
                                                borderRadius: "4px",
                                              },
                                            },
                                          },
                                        }}
                                        fullWidth
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={
                                          // filteredValue?.condition
                                          //   ? filteredValue?.condition
                                          //   : 1
                                          showEle?.condition
                                            ? showEle?.condition
                                            : 1
                                        }
                                        onChange={(e) =>
                                          handleChange(e, filters, "select")
                                        }
                                        IconComponent={
                                          KeyboardArrowDownOutlinedIcon
                                        }
                                      >
                                        {filters.field_type == "select"
                                          ? DropDownFilter.map((element) => (
                                            <MenuItem value={element.values}>
                                              {element.name}
                                            </MenuItem>
                                          ))
                                          : filters.field_type == "textarea" ||
                                            filters.field_type == "email" ||
                                            filters.field_type == "text" ||
                                            filters.field_type == "phone" ||
                                            filters.field_type == "mobile" ||
                                            filters.field_type == "tag" ||
                                            filters.field_type == "url" ||
                                            filters.field_type == "country"
                                            ? StringFilter.map((element) => (
                                              <MenuItem value={element.values}>
                                                {element.name}
                                              </MenuItem>
                                            ))
                                            : filters.field_type == "float" ||
                                              filters.field_type == "integer"
                                              ? NumberFilter.map((element) => (
                                                <MenuItem value={element.values}>
                                                  {element.name}
                                                </MenuItem>
                                              ))
                                              : filters.field_type == "checkbox"
                                                ? CheckBoxFilter.map((element) => (
                                                  <MenuItem value={element.values}>
                                                    {element.name}
                                                  </MenuItem>
                                                ))
                                                : DateFilter.map((element) => (
                                                  <MenuItem value={element.values}>
                                                    {element.name}
                                                  </MenuItem>
                                                ))}
                                      </Select>
                                    </FilterField>
                                  </Grid>
                                  <Grid item xs={8.5}>
                                    <FilterField fullWidth size="small">
                                      <div>
                                        {filters.field_type == "select" &&
                                          filters.name == "Lead_Owner" ? (
                                          <div className="Filterowner">
                                            <CommonOwner
                                              size="small"
                                              defaultOwner={userLists?.find(
                                                (ele) =>
                                                  ele.email ==
                                                  showFilters?.[filtersIndex]
                                                    ?.value
                                              )}
                                              // value={
                                              //   filteredValue?.[0]?.value
                                              // }
                                              updateValue={(newValue) => {
                                                handleChange(
                                                  newValue,
                                                  filters,
                                                  "owner"
                                                );
                                              }}
                                              label={""}
                                              userLists={userLists}
                                              disabled={
                                                showEle?.condition == 7 ||
                                                  showEle?.condition == 8
                                                  ? true
                                                  : false
                                              }
                                              error={
                                                showEle?.value == "" &&
                                                  (showEle?.condition != 7 ||
                                                    showEle?.condition != 8)
                                                  ? true
                                                  : false
                                              }
                                            />
                                          </div>
                                        ) : filters?.field_type === "phone" ||
                                          filters?.field_type === "mobile" ? (
                                          <>
                                            <MuiTelInput
                                              fullWidth
                                              size="small"
                                              sx={{
                                                "& .MuiButtonBase-root": {
                                                  paddingLeft: "0",
                                                  paddingRight: "0",
                                                  "& img": {
                            borderRadius: "2px",
                          },
                                                  "&:hover": {
                                                    backgroundColor:
                                                      "transparent",
                                                  },
                                                  "& .MuiTouchRipple-root": {
                                                    display: "none",
                                                  },
                                                },
                                              }}
                                              // fullWidth
                                              forceCallingCode
                                              autoComplete="off"
                                              disabled={
                                                showEle?.condition == 7 ||
                                                  showEle?.condition == 8
                                                  ? true
                                                  : false
                                              }
                                              style={
                                                showEle?.condition == 7 ||
                                                  showEle?.condition == 8
                                                  ? { background: "#f5f3f3" }
                                                  : null
                                              }
                                              defaultCountry={
                                                defaultCountryCode
                                              }
                                              value={showEle?.value}
                                              // error={errorText ? true : false}
                                              error={
                                                errorText
                                                  ? true
                                                  : showEle?.value == "" &&
                                                    (showEle?.condition != 7 ||
                                                      showEle?.condition != 8)
                                                    ? true
                                                    : false
                                              }
                                              helperText={errorText}
                                              onChange={(value, info) => {
                                                if (
                                                  info.nationalNumber &&
                                                  matchIsValidTel(value)
                                                ) {
                                                  setErrorText("");
                                                  handleChange(
                                                    value,
                                                    filters,
                                                    "phone"
                                                  );
                                                } else {
                                                  setErrorText(
                                                    "Invalid Mobile!"
                                                  );
                                                  handleChange(
                                                    value,
                                                    filters,
                                                    "phone"
                                                  );
                                                }
                                              }}
                                            />
                                          </>
                                        ) : filters.field_type == "float" ||
                                          filters?.field_type === "integer" ? (
                                          <TextField
                                            size="small"
                                            fullWidth
                                            id="outlined-number"
                                            type="number"
                                            value={filteredValue?.[0]?.value}
                                            onChange={(e) => {
                                              handleChange(e, filters, "input");
                                            }}
                                            error={
                                              showEle?.value == "" &&
                                                (showEle?.condition != 7 ||
                                                  showEle?.condition != 8)
                                                ? true
                                                : false
                                            }
                                          />
                                        ) : filters.field_type == "select" ? (
                                          <FilterField fullWidth size="small">
                                            <Select
                                              size="small"
                                              fullWidth
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              value={filteredValue?.[0]?.value}
                                              onChange={(e) => {
                                                handleChange(
                                                  e,
                                                  filters,
                                                  "input"
                                                );
                                              }}
                                              IconComponent={
                                                KeyboardArrowDownOutlinedIcon
                                              }
                                              disabled={
                                                showEle?.condition == 7 ||
                                                  showEle?.condition == 8
                                                  ? true
                                                  : false
                                              }
                                              sx={
                                                showEle?.condition == 7 ||
                                                  showEle?.condition == 8
                                                  ? { background: "#f5f3f3" }
                                                  : null
                                              }
                                              error={
                                                showEle?.value == "" &&
                                                  (showEle?.condition != 7 ||
                                                    showEle?.condition != 8)
                                                  ? true
                                                  : false
                                              }
                                            >
                                              {filters.option_list?.map(
                                                (element) => (
                                                  <MenuItem value={element}>
                                                    {element}
                                                  </MenuItem>
                                                )
                                              )}
                                            </Select>
                                          </FilterField>
                                        ) : filters.field_type == "date" ? (
                                          <FilterField fullWidth size="small">
                                            <CustomDatePicker
                                              size="small"
                                              handleChange={({ target }) => {
                                                handleChange(
                                                  target.value,
                                                  filters,
                                                  "input"
                                                );
                                              }}
                                              value={showEle?.value}
                                            // defaultDate={new Date()}
                                            />
                                          </FilterField>
                                        ) : filters.field_type ==
                                          "timestamp" ? (
                                          <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                          >
                                            <CustomDateTimePicker
                                              size="small"
                                              fullWidth
                                              label={""}
                                              value={dateTime}
                                              handleChange={({ target }) => {
                                                handleChange(
                                                  target?.value,
                                                  filters,
                                                  "timestamp"
                                                );
                                              }}
                                            />
                                          </LocalizationProvider>
                                        ) : filters.field_type == "checkbox" ? (
                                          <Select
                                            size="small"
                                            fullWidth
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={filteredValue?.[0]?.value}
                                            defaultValue={
                                              filteredValue?.[0]?.value
                                            }
                                            onChange={(e) => {
                                              handleChange(e, filters, "input");
                                            }}
                                            IconComponent={
                                              KeyboardArrowDownOutlinedIcon
                                            }
                                            error={
                                              showEle?.value == "" &&
                                                (showEle?.condition != 7 ||
                                                  showEle?.condition != 8)
                                                ? true
                                                : false
                                            }
                                          >
                                            <MenuItem value={0}>
                                              Select
                                            </MenuItem>
                                            <MenuItem value={1}>
                                              Selected
                                            </MenuItem>
                                            <MenuItem value={2}>
                                              Not Selected
                                            </MenuItem>
                                          </Select>
                                        ) : filters.field_type == "tag" ? (
                                          <div className="FiltertagOption">
                                            <Autocomplete
                                              size="small"
                                              popupIcon={
                                                <KeyboardArrowDownOutlinedIcon />
                                              }
                                              ref={autocompleteRef}
                                              fullWidth
                                              multiple
                                              id="participants"
                                              freeSolo={false}
                                              options={userTags ? userTags : []}
                                              value={filterTags}
                                              noOptionsText={""}
                                              disabled={
                                                showEle?.condition == 7 ||
                                                  showEle?.condition == 8
                                                  ? true
                                                  : false
                                              }
                                              sx={
                                                showEle?.condition == 7 ||
                                                  showEle?.condition == 8
                                                  ? { background: "#f5f3f3" }
                                                  : null
                                              }
                                              limitTags={10}
                                              onChange={(event, newValue) => {
                                                autocompleteRef.current =
                                                  newValue;
                                                setFilterTags(newValue);
                                                handleChange(
                                                  filterTags,
                                                  filters,
                                                  "tag"
                                                );
                                              }}
                                              getOptionLabel={(option) =>
                                                option.name
                                              } // Define how options are displayed
                                              renderTags={(
                                                value,
                                                getTagProps
                                              ) =>
                                                value.map((tag, index) => (
                                                  <Chip
                                                    key={tag.id} // Use unique key
                                                    label={tag.name}
                                                    size="small"
                                                    {...getTagProps({ index })}
                                                  />
                                                ))
                                              }
                                              renderInput={(params) => (
                                                <TextField
                                                  size="small"
                                                  fullWidth
                                                  {...params}
                                                  placeholder="Select multiple tags"
                                                  variant="outlined"
                                                  error={
                                                    showEle?.value == "" &&
                                                      (showEle?.condition != 7 ||
                                                        showEle?.condition != 8)
                                                      ? true
                                                      : false
                                                  }
                                                />
                                              )}
                                            />
                                          </div>
                                        ) : (
                                          <TextField
                                            size="small"
                                            fullWidth
                                            style={{ width: "100%" }}
                                            id="outlined-required"
                                            value={filteredValue?.[0]?.value}
                                            disabled={
                                              showEle?.condition == 7 ||
                                                showEle?.condition == 8
                                                ? true
                                                : false
                                            }
                                            error={
                                              showEle?.value == "" &&
                                                (showEle?.condition != 7 ||
                                                  showEle?.condition != 8)
                                                ? true
                                                : false
                                            }
                                            sx={
                                              showEle?.condition == 7 ||
                                                showEle?.condition == 8
                                                ? { background: "#f5f3f3" }
                                                : null
                                            }
                                            onChange={(e) => {
                                              handleChange(e, filters, "input");
                                            }}
                                          />
                                        )}
                                      </div>
                                    </FilterField>
                                  </Grid>
                                </Grid>
                              </LeadFilterListing>
                            );
                          })}
                      </MylistItem>
                    );
                  })}
              </FilterMenuList>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChangeFilterAccordion("panel3")}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <TitleLeads variant="h5">
                <FilterIconStyle />
                Filter By Groups
              </TitleLeads>
              <Divider sx={{ m: "12px", mt: "6px", mb: "0" }} />
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <FilterMenuList>
                <MylistItem key={1} disablePadding>
                  <ListItemButton role={undefined} dense disableRipple>
                    <FormControlLabel
                      key={1}
                      control={<Checkbox />}
                      label={
                        <ListItemText id={"1"} primary={"Group1"} />
                      }
                    />
                  </ListItemButton>
                </MylistItem>
                <MylistItem key={1} disablePadding>
                  <ListItemButton role={undefined} dense disableRipple>
                    <FormControlLabel
                      key={1}
                      control={<Checkbox />}
                      label={
                        <ListItemText id={"1"} primary={"Group2"} />
                      }
                    />
                  </ListItemButton>
                </MylistItem>
                <MylistItem key={1} disablePadding>
                  <ListItemButton role={undefined} dense disableRipple>
                    <FormControlLabel
                      key={1}
                      control={<Checkbox />}
                      label={<ListItemText id={"1"} primary={"Group3"} />}
                    />
                  </ListItemButton>
                </MylistItem>
                <MylistItem key={1} disablePadding>
                  <ListItemButton role={undefined} dense disableRipple>
                    <FormControlLabel
                      key={1}
                      control={<Checkbox />}
                      label={<ListItemText id={"1"} primary={"Group4"} />}
                    />
                  </ListItemButton>
                </MylistItem>
                <MylistItem key={1} disablePadding>
                  <ListItemButton role={undefined} dense disableRipple>
                    <FormControlLabel
                      key={1}
                      control={<Checkbox />}
                      label={<ListItemText id={"1"} primary={"Group5"} />}
                    />
                  </ListItemButton>
                </MylistItem>
                <MylistItem key={1} disablePadding>
                  <ListItemButton role={undefined} dense disableRipple>
                    <FormControlLabel
                      key={1}
                      control={<Checkbox />}
                      label={<ListItemText id={"1"} primary={"Group6"} />}
                    />
                  </ListItemButton>
                </MylistItem>
              </FilterMenuList>
            </AccordionDetails>
          </Accordion>
        </div>
      </FilterCoulmn>

      {showFilters.length > 0 && (
        <footer>
          <ApplyButtonWrapper>
            <FilledButton variant="outlined" onClick={() => handleApplyFilters()}>
              Apply Filter
            </FilledButton>
            <OutLinedButton
              variant="outlined"
              onClick={() => handleClearFilters()}
            >
              Clear
            </OutLinedButton>
          </ApplyButtonWrapper>
        </footer>
      )}
    </>
  );
};
export default FiltersColumn;
