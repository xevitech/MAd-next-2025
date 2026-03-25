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
  callFields,
  meetingFields,
  taskFields,
} from "@/components/common/common";
import SearchIcon from "@mui/icons-material/Search";
import {
  deleteFilterSavedData,
  getAllFieldData,
  setCustomFilterId,
  setCurrentFilterId,
  setFilterPopUp,
  getAllListOfTags,
  informationTaskMeetingCalls,
  setFilterOthers,
  setFilterShowOthers,
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
import moment from "moment";
import { CustomDateTimePicker } from "@/components/common/datePicker/CustomDateTimePicker";
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
const FiltersColumnOtherModules = () => {
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
    currentFilterId,
    userLists,
    userTags,
    savedFiltersDataOthers,
    typeName,
    filterShowOthers,
    typeId,
  } = useSelector((state: any) => state.formList);
  const [allFields, setAllFields] = useState([]);
  const [type, setType] = useState<any>("");
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [dateTime, setDateTime] = useState(moment());

  const handleChangeFilterAccordion =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  useEffect(() => {
    dispatch(getAllListOfTags());
  }, [dispatch]);

  const autocompleteRef = useRef(null);

  const handleChange = (event, id, type) => {
    let filteredDataIndex = filterShowOthers.findIndex(
      (val) => val.id == id?.id
    );
    const filteredDataa = [...filterShowOthers];
    if (filteredDataa.length > 0 && filteredDataIndex !== -1) {
      if (type === "select") {
        filteredDataa[filteredDataIndex] = {
          ...filteredDataa[filteredDataIndex],
          condition: event.target.value,
        };
      } else if (type == "owner") {
        const newValue = event?.id;
        filteredDataa[filteredDataIndex] = {
          ...filteredDataa[filteredDataIndex],
          value: newValue,
        };
      } else if (id?.type == "date") {
        const newValue = event;
        filteredDataa[filteredDataIndex] = {
          ...filteredDataa[filteredDataIndex],
          value: newValue,
        };
      } else if (id?.type == "timestamp") {
        const newValue = event;
        setDateTime(newValue);
        filteredDataa[filteredDataIndex] = {
          ...filteredDataa[filteredDataIndex],
          value: newValue
            ? newValue
            : moment(event?.toDate()).format("YYYY-MM-DD HH:mm A"),
        };
      } else if (id?.type == "tag") {
        let autocompleteRefValue =
          autocompleteRef?.current?.length > 0 &&
          autocompleteRef?.current?.map((ele) => ele?.id);
        filteredDataa[filteredDataIndex] = {
          ...filteredDataa[filteredDataIndex],
          value: autocompleteRefValue,
        };
      } else if (
        id?.db_field == "related_with" ||
        id?.db_field == "related_to"
      ) {
        filteredDataa[filteredDataIndex] = {
          ...filteredDataa[filteredDataIndex],
          value:
            event.target.value == "Leads"
              ? "1"
              : event.target.value == "Contacts"
              ? 4
              : event.target.value == "Company"
              ? 3
              : 2,
        };
      } else {
        filteredDataa[filteredDataIndex] = {
          ...filteredDataa[filteredDataIndex],
          value: event.target.value,
        };
      }
    }
    dispatch(setFilterShowOthers(filteredDataa));
  };

  const handleCheckBoxClick = async (data) => {
    let filters = [...filterShowOthers];
    let filteredData = filterShowOthers.filter((val) => val.id == data.id);
    if (filteredData.length > 0) {
      dispatch(
        setFilterShowOthers(filterShowOthers.filter((val) => val.id != data.id))
      );
    } else {
      filters.push({
        id: data.id,
        name: data.db_field,
        condition: "",
        value: "",
      });
      dispatch(setFilterShowOthers(filters));
    }
  };

  useEffect(() => {
    setAllFields(
      typeName == "Tasks"
        ? taskFields
        : typeName == "Meetings"
        ? meetingFields
        : callFields
    );
  }, [type]);

  useEffect(() => {
    setType(typeName);
  }, [dispatch]);

  const handleApplyFilters = async () => {
    let payloads = {
      fields:
        filterShowOthers?.length > 0
          ? filterShowOthers?.map((item) => item.name)
          : [],
      operators:
        filterShowOthers?.length > 0
          ? filterShowOthers?.map((item) => item.condition)
          : [],
      search_terms:
        filterShowOthers?.length > 0
          ? filterShowOthers?.map((item) => item.value)
          : [],
      logical_operators:
        filterShowOthers?.length > 0
          ? filterShowOthers
              .map((item, index) => (index !== 0 ? "or" : ""))
              ?.filter(Boolean)
          : [],
    };
    dispatch(setFilterOthers(filterShowOthers));
    dispatch(informationTaskMeetingCalls(payloads));
  };

  const handleClearFilters = async () => {
    setDateTime(null);
    dispatch(setFilterOthers([]));
    dispatch(setFilterShowOthers([]));
    dispatch(informationTaskMeetingCalls());
  };

  const handleFieldsFilters = async (event) => {
    let duplcateFields =
      typeName == "Tasks"
        ? taskFields
        : typeName == "Meetings"
        ? meetingFields
        : callFields;
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
      dispatch(informationTaskMeetingCalls());
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
    dispatch(informationTaskMeetingCalls());
    setAnchorEl(null);
  };

  return (
    <FilterCoulmn>
      <div>
        {savedFiltersDataOthers?.length > 0 && (
          <Accordion onChange={handleChangeFilterAccordion("panel1")}>
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
                {savedFiltersDataOthers?.map((savedFilter, index) => {
                  return (
                    <SaveFilterData key={index}>
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
        <Accordion
          onChange={handleChangeFilterAccordion("panel2")}
          defaultExpanded
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <TitleLeads variant="h5">
              <FilterIconStyle />
              Filter By Fields
            </TitleLeads>
            <Divider sx={{ m: "12px", mt: "6px", mb: "0" }} />
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <FilterMenuList>
              {allFields?.length > 0 &&
                allFields.map((myFields, myFieldsIndex) => {
                  let filteredValue = filterShowOthers?.filter(
                    (ele) => ele.id == myFields.id
                  ) ?? [0];
                  return (
                    <MylistItem key={myFieldsIndex} disablePadding>
                      <ListItemButton role={undefined} dense>
                        <FormControlLabel
                          key={myFieldsIndex + "child"}
                          control={
                            <Checkbox
                              checked={
                                filteredValue[0]?.id == myFields.id
                                  ? true
                                  : false
                              }
                              onClick={() => {
                                handleCheckBoxClick(myFields);
                              }}
                            />
                          }
                          label={
                            <ListItemText
                              id={myFields.id}
                              primary={myFields?.name}
                            />
                          }
                        />
                      </ListItemButton>
                      {filterShowOthers
                        .filter((val) => val.id == myFields.id)
                        ?.map((showEle, showIndex) => {
                          return (
                            <LeadFilterListing key={showIndex}>
                              <Grid container spacing={1}>
                                <Grid item xs={3.5}>
                                  <FilterField fullWidth>
                                    <Select
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
                                      value={filteredValue?.condition}
                                      onChange={(e) =>
                                        handleChange(e, myFields, "select")
                                      }
                                      IconComponent={
                                        KeyboardArrowDownOutlinedIcon
                                      }
                                    >
                                      {myFields.type == "select"
                                        ? DropDownFilter.map((element) => (
                                            <MenuItem value={element.values}>
                                              {element.name}
                                            </MenuItem>
                                          ))
                                        : myFields.field_type == "textarea" ||
                                          myFields.field_type == "email" ||
                                          myFields.field_type == "text" ||
                                          myFields.field_type == "phone" ||
                                          myFields.field_type == "mobile" ||
                                          myFields.field_type == "tag" ||
                                          myFields.field_type == "url" ||
                                          myFields.field_type == "country"
                                        ? StringFilter.map((element) => (
                                            <MenuItem value={element.name}>
                                              {element.name}
                                            </MenuItem>
                                          ))
                                        : myFields.field_type == "float" ||
                                          myFields.field_type == "integer"
                                        ? NumberFilter.map((element) => (
                                            <MenuItem value={element.values}>
                                              {element.name}
                                            </MenuItem>
                                          ))
                                        : myFields.field_type == "checkbox"
                                        ? CheckBoxFilter.map((element) => (
                                            <MenuItem value={element.values}>
                                              {element.name}
                                            </MenuItem>
                                          ))
                                        : DateFilter.map((element) => (
                                            <MenuItem value={element.name}>
                                              {element.name}
                                            </MenuItem>
                                          ))}
                                    </Select>
                                  </FilterField>
                                </Grid>
                                <Grid item xs={8.5}>
                                  <FilterField fullWidth>
                                    <div>
                                      {myFields.type == "autocomplete" ? (
                                        <div className="Filterowner">
                                          <CommonOwner
                                            defaultOwner={filteredValue?.value}
                                            updateValue={(newValue) => {
                                              handleChange(
                                                newValue,
                                                myFields,
                                                "owner"
                                              );
                                            }}
                                            label={""}
                                            userLists={userLists}
                                          />
                                        </div>
                                      ) : myFields.type == "select" ? (
                                        <FilterField fullWidth>
                                          <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={filteredValue?.condition}
                                            onChange={(e) => {
                                              handleChange(
                                                e,
                                                myFields,
                                                "input"
                                              );
                                            }}
                                            IconComponent={
                                              KeyboardArrowDownOutlinedIcon
                                            }
                                          >
                                            {myFields?.option_list?.map(
                                              (element) => (
                                                <MenuItem
                                                  value={element}
                                                  sx={{
                                                    textTransform: "capitalize",
                                                  }}
                                                >
                                                  {element?.replaceAll(
                                                    "-",
                                                    " "
                                                  )}
                                                </MenuItem>
                                              )
                                            )}
                                          </Select>
                                        </FilterField>
                                      ) : myFields?.type == "date" ? (
                                        <FilterField fullWidth>
                                          <CustomDatePicker
                                            handleChange={({ target }) => {
                                              handleChange(
                                                target.value,
                                                myFields,
                                                "date"
                                              );
                                            }}
                                            value={showEle?.value}
                                            // defaultDate={new Date()}
                                          />
                                        </FilterField>
                                      ) : myFields?.type == "timestamp" ? (
                                        <LocalizationProvider
                                          dateAdapter={AdapterDayjs}
                                        >
                                          <CustomDateTimePicker
                                            label={""}
                                            value={dateTime}
                                            handleChange={({ target }) => {
                                              handleChange(
                                                target?.value,
                                                myFields,
                                                "timestamp"
                                              );
                                            }}
                                          />
                                        </LocalizationProvider>
                                      ) : myFields?.type == "tag" ? (
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
                                            limitTags={10}
                                            onChange={(event, newValue) => {
                                              autocompleteRef.current =
                                                newValue;
                                              setFilterTags(newValue);
                                              handleChange(
                                                filterTags,
                                                myFields,
                                                "tag"
                                              );
                                            }}
                                            getOptionLabel={(option) =>
                                              option.name
                                            } // Define how options are displayed
                                            renderTags={(value, getTagProps) =>
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
                                              />
                                            )}
                                          />
                                        </div>
                                      ) : (
                                        <TextField
                                          style={{ width: "100%" }}
                                          id="outlined-required"
                                          value={filteredValue?.value}
                                          onChange={(e) => {
                                            handleChange(e, myFields, "input");
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
      </div>
      {filterShowOthers.length > 0 && (
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
      )}
    </FilterCoulmn>
  );
};
export default FiltersColumnOtherModules;
