import React, { useEffect, useState } from "react";
import {
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
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
  FilterValuesLeads,
  ManageColumnList,
  ActionFieldStyle,
  ManagaDeleteDialog,
  FormFieldContainer,
  MassUpdateContent,
} from "../style";

import { Divider, Grid } from "@mui/material";
import {
  CommonFormcontrol,
  SearchCommon,
  SmallBlackOutineBtn,
  SmallOutineBtn,
  SmallRedOutineBtn,
  StyledBootstrapDialog,
} from "../commonStyle";
import { useSelector } from "react-redux";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
  DateFilter,
  NumberFilter,
  StringFilter,
  taskFields,
  meetingFields,
  callFields
} from "@/components/common/common";
import SearchIcon from "@mui/icons-material/Search";
import { idID } from "@mui/material/locale";
import {
  createAndScheduleCalls,
  createMeetings,
    createTaskAndSchedule,
  fetchAllFields,
  getAllFieldData,
  informationTaskMeetingCalls,
  setFilters,
  setSelectedActvityIds,
  updateFiledsData,
} from "@/hooks/UseCreateFormData";
import { useAppDispatch } from "redux/store";
import { ThreeDots } from "react-loader-spinner";
import CloseIcon from "@mui/icons-material/Close";
import CountrySelect from "@/components/common/countrydropdown/Index";
import { toast } from "react-toastify";
import CommonOwner from "./CommonOwner";
import MobileInputCommon from "@/components/common/PhoneInput";
import { CustomDatePicker } from "@/components/common/datePicker";
import { CustomDateTimePicker } from "@/components/common/datePicker/CustomDateTimePicker";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const ManageMassOther = ({ openPopUp, setAction }) => {
  const dispatch = useAppDispatch();
  const { selectedActvityIds, saveLoader, typeName, userLists } =
    useSelector((state: any) => state.formList);
  const [fieldName, setFieldName] = useState("");
  const [fieldValue, setFieldValue] = useState<any>("");
  const [latestField, setLatestField] = useState<any>([]);
  const [dropDownData, setDropdownData] = useState<any>("");
  const [error, setError] = useState(false);
  const handleCloseColumn = () => {
    setAction("Action");
  };

  useEffect(()=>{
  if(typeName=="Meetings"){
    setDropdownData(meetingFields);
  }else if(typeName=="Calls"){
    setDropdownData(callFields);
  }else{
    setDropdownData(taskFields);
  }
  },[typeName])

  const handleChangeFields = (event, type) => {
    if (type == "name") {
      setFieldName(event.target.value);
      setFieldValue("");
     
      if(typeName==="Meetings"){
        meetingFields?.length > 0 && meetingFields.map((ele) => {
          if (ele.db_field == event.target.value) setLatestField(ele);
      });
      } else if(typeName==="Calls"){
        callFields?.length > 0 && callFields.map((ele) => {
          if (ele.db_field == event.target.value) setLatestField(ele);
      });
      }else{
        taskFields?.length > 0 &&
        taskFields.map((ele) => {
              if (ele.db_field == event.target.value) setLatestField(ele);
          });
      }    
    } else {
      setFieldValue(event.target.value);
    }
  };

  const handleUpdateData = async () => {
    if (
      fieldValue == "" ||
      fieldValue == null ||
      fieldName == "" ||
      fieldName == null
    ) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    
    let body = {
      id: selectedActvityIds?.join(','),
      [latestField?.db_field]: fieldValue
    };
    let response:any;
    if(typeName=="Meetings"){
       response = await dispatch(createMeetings(body));
    }else if(typeName=="Calls"){
      response=await dispatch(createAndScheduleCalls(body));
    }else{
       response = await dispatch(createTaskAndSchedule(body));
    }
    if (response?.payload?.status == 200) {
      toast.success(response?.payload?.message);
      dispatch(informationTaskMeetingCalls());    
      handleCloseColumn();
    }
  };

  const onSubmit = (e) => {
    if (e.key === "Enter") {
      handleUpdateData();
    }
  };
  return (
    <MassUpdateContent>
      <StyledBootstrapDialog
        // onClose={handleCloseColumn}
        aria-labelledby="customized-dialog-title"
        open={openPopUp}
        sx={ManagaDeleteDialog}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseColumn}
        >
          Mass Update
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <ManageColumnList>
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <CommonFormcontrol required fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Select Field
                  </InputLabel>
                  <Select
                    fullWidth
                    size="small"
                    id="demo-simple-select"
                    value={fieldName}
                    defaultValue="Select a Value"
                    onChange={(e) => handleChangeFields(e, "name")}
                    IconComponent={KeyboardArrowDownOutlinedIcon}
                    label={"Select Field"}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {dropDownData?.length > 0 &&
                      dropDownData.map((filters, filtersIndex) => {
                        if (filters?.type != "tag" && filters?.name != "id") {
                          return (
                            <MenuItem value={filters.db_field}>
                              {filters.name
                                .replaceAll("_", " ")
                                .replaceAll(".", "")}
                            </MenuItem>
                          );
                        }
                      })}
                  </Select>
                </CommonFormcontrol>
              </Grid>
              <Grid item xs={6} md={8}>
                <CommonFormcontrol fullWidth size="small">
                  {latestField.type == "autocomplete" ? (
                    <div className="massupdeowner">
                      <CommonOwner
                        defaultOwner={null}
                        updateValue={(newValue) => {
                          if(typeName=="Calls"){
                            setFieldValue(newValue?.id);
                          }else{
                            setFieldValue(newValue?.email);
                          }                        
                        }}
                        label={""}
                        size="small"
                        userLists={userLists}
                      />
                    </div>
                  ) : latestField.type == "float" ||
                    latestField.type === "integer" ? (
                    <TextField
                      id="outlined-number"
                      type="number"
                      name="value"
                      size="small"
                      onChange={(e) => handleChangeFields(e, "value")}
                    />
                  ) : latestField.type == "select" ? (
                    <>
                      <InputLabel id="demo-simple-select-label">
                        {latestField.label}
                      </InputLabel>
                      <Select
                        required={latestField.is_required == 1 ? true : false}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={fieldValue}
                        size="small"
                        sx={{ textTransform: "capitalize"}}
                        label={latestField.label}
                        onChange={(e) => handleChangeFields(e, "value")}
                        IconComponent={KeyboardArrowDownOutlinedIcon}
                        error={error ? true : false}
                      >
                        {latestField.option_list?.map((list, index) => (
                          <MenuItem value={list} key={index}>
                            <span style={{ textTransform: "capitalize"}}>{list.includes("-")?list?.replaceAll("-"," "):list}</span>
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  ) : latestField.type == "date" ? (
                    <>
                      <CustomDatePicker
                        handleChange={(e) => {
                          setFieldValue(e.target.value);
                        }}
                        name="value"
                        value={fieldValue}
                        // defaultDate={new Date()}
                      />
                    </>
                  ) : latestField.type == "timestamp" ? (
                    <CustomDateTimePicker
                      label={""}
                      value={""}
                      name="value"
                      size="small"
                      handleChange={(e) => {
                        setFieldValue(e.target.value);
                      }}
                    />
                  ) : (
                    <TextField
                      required={latestField.is_required == 1 ? true : false}
                      style={{ width: "100%" }}
                      id="outlined-required"
                      label={latestField?.label}
                      value={fieldValue}
                      size="small"
                      placeholder={
                        latestField.placeholder
                          ? latestField?.placeholder
                              ?.replaceAll("_", " ")
                              .replaceAll(".", "")
                          : latestField?.label
                              ?.replaceAll("_", " ")
                              .replaceAll(".", "")
                      }
                      onChange={(e) => handleChangeFields(e, "value")}
                      helperText={
                        error ? `Please enter ${latestField?.label}` : null
                      }
                      error={error ? true : false}
                      onKeyDown={onSubmit}
                    />
                    // </FormFieldContainer>
                  )}
                </CommonFormcontrol>
              </Grid>
            </Grid>
          </ManageColumnList>
        </DialogContent>
        <DialogActions>
          <SmallRedOutineBtn
            variant="outlined"
            autoFocus
            onClick={handleUpdateData}
          >
            {saveLoader ? (
              <ThreeDots
                height="40"
                width="40"
                radius="9"
                color="#D7282F"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              />
            ) : (
              "Save"
            )}
          </SmallRedOutineBtn>
          <SmallBlackOutineBtn variant="outlined" onClick={handleCloseColumn}>
            Cancel
          </SmallBlackOutineBtn>
        </DialogActions>
      </StyledBootstrapDialog>
    </MassUpdateContent>
  );
};
export default ManageMassOther;
