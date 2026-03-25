import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  styled,
  TextField,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Autocomplete,
  Chip,
  InputAdornment,
} from "@mui/material";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { SDCheckboxStyle } from "../commonStyle";
import {
  BoxBothfield,
  CustomInputCheckbox,
  CustomInputCheckboxRow,
  EditFields,
  EditableBox,
  FormFieldContainer,
  ImageEdit,
  InputFieldName,
  InputFieldValue,
  LeadBoxBothfield,
  LeadInfoCalenderBpx,
  LeadInfoHeading,
  LeadInfoIconData,
  LeadInfoRow,
  LeadViewFormData,
  LeadViewFormrow,
  LeadViewInner,
  LeadViewformContent,
  ModeEdit,
  PrefixEditableBox,
  StyledTextarea,
  TaskFullTextarea,
  RelatedToBox,
} from "../style";
import { useSelector } from "react-redux";
import {
  setEmailIdToSender,
  getListOfUsersAndSubUsers,
  setShowSkeltn,
  getDetailOfSingleTasks,
  updateEachMeeting,
  updateEachCall,
  createTaskMeetingCallsHistory,
} from "@/hooks/UseCreateFormData";
import { useAppDispatch } from "redux/store";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useEffect, useRef, useState } from "react";
import LeadOwner from "../PageLayout/common/LeadOwner";
import LeadInfo from "../Skeletons/LeadInfo";
import { CustomDatePicker } from "@/components/common/datePicker";
import { useRouter } from "next/router";
import History from "./History";
import { apiClient } from "@/components/common/common";
const CallInformation = () => {
  const inputRef = useRef(null);
  const [dataList, setDataList] = React.useState([]);
  const [relatedValue, setRelatedValue] = React.useState<any>("");
  const [filtersField, setFiltersFields] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const { userLists, showSkelton, singleActivity, typeId } =
    useSelector((state: any) => state.formList);
  const [editField, setEditField] = useState<any>({
    call_owner: false,
    participants: false,
    status: false,
    reminder: false,
    // status: false,
    from: false,
    to: false,
    subject: false,
    related_with: false,
    description: false,
    related_to: false,
    call_type: false,
    call_purpose: false,
  });
  const [editedValues, setEditedValues] = useState({
    call_owner: singleActivity?.owner || "",
    participants: singleActivity?.participants || [],
    status: singleActivity?.status || "",
    reminder: singleActivity?.reminder_number || "",
    description: singleActivity?.description || "",
    related_with: singleActivity?.related_to || "",
    from: singleActivity?.call_start_date_time || "",
    subject: singleActivity?.subject || "",
    to: singleActivity?.to || "",
    related_to: singleActivity?.related_to || "",
    call_type: singleActivity?.call_type || "",
    call_purpose: singleActivity?.call_purpose || "",
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  let relatedTo = [
    { typeId: 1, typeName: "Lead" },
    { typeId: 2, typeName: "Deal" },
    { typeId: 3, typeName: "Account" },
    { typeId: 4, typeName: "Contact" },
  ];

  useEffect(() => {
    if (singleActivity) {
      setEditedValues({
        call_owner: singleActivity.owner || "",
        participants: singleActivity.participants || [],
        status: singleActivity.status || "",
        reminder: singleActivity.reminder_number || "",
        description: singleActivity.description || "",
        related_with: singleActivity.related_to || "",
        subject: singleActivity?.subject || "",
        from: singleActivity.call_start_date_time || "",
        to: singleActivity.to || "",
        related_to: singleActivity?.related_to || "",
        call_type: singleActivity?.call_type || "",
        call_purpose: singleActivity?.call_purpose || "",
      });
      setTags(
        singleActivity?.participants
          ? singleActivity?.participants.split(",")
          : []
      );
      if(singleActivity?.related_with_value?.length>0){
        setRelatedValue(singleActivity?.related_with_value[0]?.unique_id)
      }
    }
  }, [singleActivity]);

  useEffect(() => {
    async function fetchMyAPI() {
      dispatch(setShowSkeltn(true));
      await dispatch(
       getDetailOfSingleTasks({ id: router?.query.id, type: "call" })
      );
      await dispatch(getListOfUsersAndSubUsers());
      dispatch(setShowSkeltn(false));
    }
    fetchMyAPI();
  }, [dispatch]);

  useEffect(() => {
    if (editedValues?.related_with !== "") {
      getRelatedList();
      // setRelatedValue("");
    }
  }, [editedValues?.related_with]);

  const toggleEdit = (field) => {
    setEditField((prevEditField) => ({
      ...prevEditField,
      [field]: !prevEditField[field],
    }));
  };

  const getRelatedList = async () => {
    let body = {
      type_id: editedValues?.related_with,
      per_page: 100,
    };
    let response = await apiClient(`crm/data_listing`, "post", { body });
    if (response.status == true || response.status == 200) {
      setDataList(response?.data?.data);
      setFiltersFields(response?.data?.filter_fields);
    }
  };

  const handleCancel = (field) => {
    toggleEdit(field);
    setEditedValues((prevEditedValues) => ({
      ...prevEditedValues,
    }));
  };

  const getRelatedValue = (checkSelect) => {
    let filteredData: any = "";
    switch (checkSelect) {
      case 1:
        const firstNameId = filtersField?.find(
          (item) => item.name === "First_Name"
        )?.id;
        const lastNameId = filtersField?.find(
          (item) => item.name === "Last_Name"
        )?.id;
        filteredData = [firstNameId, lastNameId]?.join(",");
        break;
      case 2:
        filteredData = filtersField?.find(
          (item) => item.name === "Deal_Name"
        )?.id;
        break;
      case 3:
        const mailId = filtersField?.find((item) => item.name === "mail")?.id;
        const CompanyId = filtersField?.find(
          (item) => item.name === "Company_Name"
        )?.id;
        const Company_Owner = filtersField?.find(
          (item) => item.name === "Company_Owner"
        )?.id;
        filteredData = [mailId, CompanyId, Company_Owner]?.join(",");
        break;
      case 4:
        const Full_Name_Id = filtersField?.find(
          (item) => item.name === "Full_Name"
        )?.id;
        const mail_Id = filtersField?.find((item) => item.name === "mail")?.id;
        filteredData = [mail_Id, Full_Name_Id]?.join(",");
        break;
      default:
        filteredData;
        break;
    }
    return filteredData;
  };

  const handleSaveTask = async (type: any, value: any) => {
    let history = {};
    let message = "";
    let payload: any;
    toggleEdit(type);
    if (type == "related_to") {
      payload = {
        [type]: getRelatedValue(editedValues?.related_with),
      };
      message = `<span>Call Info - </span>Related With Value has been changed `;
      history = {
        lead_id: router?.query?.id,
        name: "Info",
        type: "info",
        message: message,
      };
    } else if (type == "participants") {
      payload = {
        [type]: tags.join(","),
      };
      message = `<span>Call Info - </span>Participants Owner has been changed to ${tags.join(
        ","
      )} `;
      history = {
        lead_id: router?.query?.id,
        name: "Info",
        type: "info",
        message: message,
      };
    } else if (type == "call_owner") {
      payload = {
        [type]: userLists?.find((item) => item?.email == value)?.id,
      };
      message = `<span>Call Info - </span><span style="text-transform: capitalize">Call Owner has been changed <b>from ${
        singleActivity?.owner?.name ? singleActivity?.owner?.name : 'null'
      }<b> to 
            </b>${
              userLists?.find((ele) => ele?.id == payload[type])?.name ? userLists?.find((ele) => ele?.id == payload[type])?.name: 'null'
            } `;
      history = {
        lead_id: router?.query?.id,
        name: "Info",
        type: "info",
        message: message,
      };
    } else{
      payload = {
        [type]: value,
      };
      message = `<span>Call Info - </span><span style="text-transform: capitalize">${ type?.includes("_")?type?.replaceAll(
        "_",
        " "
      ):type}</span> has been changed <b> from</b> ${type?.includes("_")?singleActivity[
        type
      ]?.replaceAll("_", " "):singleActivity[type] ? type?.includes("_")?singleActivity[
        type
      ]?.replaceAll("_", " "):singleActivity[type] : 'null'} <b>to </b>${value ? value : 'null'} `;
      history = {
        lead_id: router?.query?.id,
        name: "Info",
        type: "info",
        message: message,
      };
    }
    dispatch(updateEachCall({ id: router?.query?.id, data: payload }));
    dispatch(createTaskMeetingCallsHistory(history));
  };

  const getDetails = (data) => {
    if (data?.related_with === 1) {
      let lname = dataList?.find(
        (ele) => ele?.unique_id == relatedValue
      )?.First_Name;
      let lowner = dataList?.find(
        (ele) => ele?.unique_id == relatedValue
      )?.Lead_Owner;
      if (lname) {
        return lname;
      } else {
        return lowner ? lowner : "NA";
      }
    } else if (data?.related_with === 2) {
      let dname = dataList?.find(
        (ele) => ele?.unique_id == relatedValue
      )?.Deal_Name;
      let downer = dataList?.find(
        (ele) => ele?.unique_id == relatedValue
      )?.Deal_Owner;
      if (dname) {
        return dname;
      } else {
        return downer ? downer : "NA";
      }
    } else if (data?.related_with === 3) {
      let aname = dataList?.find(
        (ele) => ele?.unique_id == relatedValue
      )?.Account_Name;
      let aowner = dataList?.find(
        (ele) => ele?.unique_id == relatedValue
      )?.Account_Owner;
      if (aname) {
        return aname;
      } else {
        return aowner ? aowner : "NA";
      }
    } else {
      let cname = dataList?.find(
        (ele) => ele?.unique_id == relatedValue
      )?.First_Name;
      let cowner = dataList?.find(
        (ele) => ele?.unique_id == relatedValue
      )?.Contact_Owner;
      if (cname) {
        return cname;
      } else {
        return cowner ? cowner : "NA";
      }
    }
  };
  return (
    <>
      {showSkelton && <LeadInfo />}
      {!showSkelton && (
        <LeadViewFormData>
          <>
            <LeadViewformContent>
              <LeadInfoHeading>Calls</LeadInfoHeading>
              <LeadViewFormrow>
                <LeadViewInner>
                  <Grid
                    container
                    rowSpacing={1}
                    spacing={1.5}
                    columnSpacing={{ xs: 1, sm: 1, md: 1, xl: 1.5 }}
                  >
                    <Grid item xs={12} sm={6} md={6}>
                      <LeadInfoRow className="leadrow">
                        <Grid container>
                          <Grid item xs={12} sm={12} md={3} lg={4}>
                            <InputFieldName>Call Owner</InputFieldName>
                          </Grid>
                          <Grid item xs={12} sm={12} md={9} lg={8}>
                            {editField.call_owner ? (
                              <>
                                <EditableBox className="leadinfoEditablefield leadEditablestyle">
                                  <LeadOwner
                                    inputRef={inputRef}
                                    defaultOwner={
                                      editedValues?.call_owner ||
                                      userLists?.find(
                                        (item) =>
                                          item.email == editedValues?.call_owner
                                      )
                                    }
                                    userLists={userLists}
                                    label={"Lead Owner"}
                                    updateValue={(newValue) => {
                                      const update = { name: newValue };
                                      setEditedValues((prevEditedValues) => ({
                                        ...prevEditedValues,
                                        call_owner: newValue,
                                      }));
                                    }}
                                    onChange={(value) => {
                                      console.log(value, "value in onChange");
                                    }}
                                  />
                                </EditableBox>{" "}
                                <EditFields className="hovericons">
                                  <span>
                                    <CloseIcon
                                      className="social-icon2"
                                      sx={{ color: "#d7282f" }}
                                      onClick={() => handleCancel("call_owner")}
                                    />
                                    <DoneOutlinedIcon
                                      className="social-icon1"
                                      sx={{
                                        color: "green !important",
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();

                                        handleSaveTask(
                                          "call_owner",
                                          editedValues?.call_owner
                                        );
                                      }}
                                    />
                                  </span>
                                </EditFields>
                              </>
                            ) : (
                              <LeadInfoIconData>
                                <InputFieldValue>
                                  {editedValues?.call_owner?.name ||
                                    userLists?.find(
                                      (item: any) =>
                                        item.email == editedValues?.call_owner
                                    )?.name}
                                </InputFieldValue>
                                <ModeEdit
                                  className="hovericons"
                                  sx={{ color: "#d7282f" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleEdit("call_owner");
                                  }}
                                />{" "}
                              </LeadInfoIconData>
                            )}
                          </Grid>
                        </Grid>
                      </LeadInfoRow>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <LeadInfoRow className="leadrow">
                        <Grid container>
                          <Grid item xs={12} sm={12} md={3} lg={4}>
                            <InputFieldName>Subject</InputFieldName>
                          </Grid>
                          <Grid item xs={12} sm={12} md={9} lg={8}>
                            {editField.subject ? (
                              <>
                                <EditableBox className="leadinfoEditablefield leadEditablestyle">
                                  <TextField
                                    inputRef={inputRef}
                                    fullWidth
                                    id="outlined-required"
                                    value={editedValues.subject}
                                    placeholder={"subject"}
                                    onChange={(e) => {
                                      e.preventDefault();
                                      setEditedValues((prevEditedValues) => ({
                                        ...prevEditedValues,
                                        ["subject"]: e.target.value,
                                      }));
                                    }}
                                  />
                                </EditableBox>
                                <EditFields className="hovericons">
                                  <span>
                                    <CloseIcon
                                      className="social-icon2"
                                      sx={{ color: "#d7282f" }}
                                      onClick={() => handleCancel("subject")}
                                    />
                                    <DoneOutlinedIcon
                                      className="social-icon1"
                                      sx={{
                                        color: "green !important",
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();

                                        handleSaveTask(
                                          "subject",
                                          editedValues?.subject
                                        );
                                      }}
                                    />
                                  </span>
                                </EditFields>
                              </>
                            ) : (
                              <LeadInfoIconData>
                                <InputFieldValue>
                                  {editedValues?.subject}
                                </InputFieldValue>
                                <ModeEdit
                                  className="hovericons"
                                  sx={{ color: "#d7282f" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleEdit("subject");
                                  }}
                                />{" "}
                              </LeadInfoIconData>
                            )}
                          </Grid>
                        </Grid>
                      </LeadInfoRow>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <LeadInfoRow className="leadrow">
                        <Grid container>
                          <Grid item xs={12} sm={12} md={3} lg={4}>
                            <InputFieldName>Call Status</InputFieldName>
                          </Grid>
                          <Grid item xs={12} sm={12} md={9} lg={8}>
                            {editField.status ? (
                              <>
                                <EditableBox className="leadinfoEditablefield leadEditablestyle">
                                  {/* <TextField
                                    inputRef={inputRef}
                                    fullWidth
                                    id="outlined-required"
                                    value={editedValues.status}
                                    placeholder={"status"}
                                    onChange={(e) => {
                                      e.preventDefault();
                                      setEditedValues((prevEditedValues) => ({
                                        ...prevEditedValues,
                                        ["status"]: e.target.value,
                                      }));
                                    }}
                                  /> */}
                                  <Select
                                    inputRef={inputRef}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={editedValues.status}
                                    onChange={(e) => {
                                      setEditedValues((prevEditedValues) => ({
                                        ...prevEditedValues,
                                        ["status"]: e.target.value,
                                      }));
                                    }}
                                    IconComponent={
                                      KeyboardArrowDownOutlinedIcon
                                    }
                                    error={true}
                                  >
                                    <MenuItem value={"scheduled"}>
                                      Scheduled
                                    </MenuItem>
                                    <MenuItem value={"call-a-log"}>
                                      Call a log
                                    </MenuItem>
                                  </Select>
                                </EditableBox>
                                <EditFields className="hovericons">
                                  <span>
                                    <CloseIcon
                                      className="social-icon2"
                                      sx={{ color: "#d7282f" }}
                                      onClick={() => handleCancel("status")}
                                    />
                                    <DoneOutlinedIcon
                                      className="social-icon1"
                                      sx={{
                                        color: "green !important",
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();

                                        handleSaveTask(
                                          "status",
                                          editedValues?.status
                                        );
                                      }}
                                    />
                                  </span>
                                </EditFields>
                              </>
                            ) : (
                              <LeadInfoIconData>
                                <InputFieldValue style={{textTransform:'capitalize'}}>
                                  {editedValues?.status?.replaceAll("-", " ")}
                                </InputFieldValue>
                                <ModeEdit
                                  className="hovericons"
                                  sx={{ color: "#d7282f" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleEdit("status");
                                  }}
                                />{" "}
                              </LeadInfoIconData>
                            )}
                          </Grid>
                        </Grid>
                      </LeadInfoRow>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <LeadInfoRow className="leadrow">
                        <Grid container>
                          <Grid item xs={12} sm={12} md={3} lg={4}>
                            <InputFieldName>Call Type</InputFieldName>
                          </Grid>
                          <Grid item xs={12} sm={12} md={9} lg={8}>
                            {editField.call_type ? (
                              <>
                                <EditableBox className="leadinfoEditablefield leadEditablestyle">
                                  <Select
                                    MenuProps={{
                                      PaperProps: {
                                        sx: {
                                          "& .MuiMenuItem-root": {
                                            fontSize: 13,
                                          },
                                        },
                                      },
                                    }}
                                    labelId="demo-simple-select-label"
                                    id="input-with-icon-adornment"
                                    value={editedValues?.call_type}
                                    label="Call Type"
                                    onChange={(event) => {
                                      setEditedValues((prevEditedValues) => ({
                                        ...prevEditedValues,
                                        ["call_type"]: event.target.value,
                                      }));
                                      // setCallType(event.target.value);
                                    }}
                                    IconComponent={
                                      KeyboardArrowDownOutlinedIcon
                                    }
                                    startAdornment={
                                      <InputAdornment position="start"></InputAdornment>
                                    }
                                    disabled={status == "scheduled" && true}
                                    //   error={callTypeError && true}
                                  >
                                    <MenuItem value={"in-bound"}>
                                      Inbound
                                    </MenuItem>
                                    <MenuItem value={"out-bound"}>
                                      Outbound
                                    </MenuItem>
                                    {status != "scheduled" && (
                                      <MenuItem value={"missed"}>
                                        Missed
                                      </MenuItem>
                                    )}
                                  </Select>
                                </EditableBox>
                                <EditFields className="hovericons">
                                  <span>
                                    <CloseIcon
                                      className="social-icon2"
                                      sx={{ color: "#d7282f" }}
                                      onClick={() => handleCancel("call_type")}
                                    />
                                    <DoneOutlinedIcon
                                      className="social-icon1"
                                      sx={{
                                        color: "green !important",
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();

                                        handleSaveTask(
                                          "call_type",
                                          editedValues?.call_type
                                        );
                                      }}
                                    />
                                  </span>
                                </EditFields>
                              </>
                            ) : (
                              <LeadInfoIconData>
                                <InputFieldValue style={{textTransform:'capitalize'}}>
                                  {editedValues?.call_type?.replaceAll(
                                    "-",
                                    " "
                                  )}
                                </InputFieldValue>
                                {/* <ModeEdit
                                  className="hovericons"
                                  sx={{ color: "#d7282f" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleEdit("call_type");
                                  }}
                                />{" "} */}
                              </LeadInfoIconData>
                            )}
                          </Grid>
                        </Grid>
                      </LeadInfoRow>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <LeadInfoRow className="leadrow">
                        <Grid container>
                          <Grid item xs={12} sm={12} md={3} lg={4}>
                            <InputFieldName>Reminder</InputFieldName>
                          </Grid>
                          <Grid item xs={12} sm={12} md={9} lg={8}>
                            {editField.reminder ? (
                              <>
                                <EditableBox className="leadinfoEditablefield leadEditablestyle">
                                  {/* <TextField
                                    inputRef={inputRef}
                                    fullWidth
                                    id="outlined-required"
                                    value={editedValues.status}
                                    placeholder={"status"}
                                    onChange={(e) => {
                                      e.preventDefault();
                                      setEditedValues((prevEditedValues) => ({
                                        ...prevEditedValues,
                                        ["status"]: e.target.value,
                                      }));
                                    }}
                                  /> */}
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="input-with-icon-adornment"
                                    value={editedValues?.reminder}
                                    name="reminder"
                                    onChange={(e) => {
                                      setEditedValues((prevEditedValues) => ({
                                        ...prevEditedValues,
                                        ["reminder"]: e.target.value,
                                      }));
                                    }}
                                    defaultValue="none"
                                    IconComponent={
                                      KeyboardArrowDownOutlinedIcon
                                    }
                                    startAdornment={
                                      <InputAdornment position="start"></InputAdornment>
                                    }
                                  >
                                    <MenuItem value={5}>
                                      5 minutes before{" "}
                                    </MenuItem>
                                    <MenuItem value={10}>
                                      10 minutes before{" "}
                                    </MenuItem>
                                    <MenuItem value={15}>
                                      15 minutes before{" "}
                                    </MenuItem>
                                    <MenuItem value={30}>
                                      30 minutes before{" "}
                                    </MenuItem>
                                  </Select>
                                </EditableBox>
                                <EditFields className="hovericons">
                                  <span>
                                    <CloseIcon
                                      className="social-icon2"
                                      sx={{ color: "#d7282f" }}
                                      onClick={() => handleCancel("reminder")}
                                    />
                                    <DoneOutlinedIcon
                                      className="social-icon1"
                                      sx={{
                                        color: "green !important",
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();

                                        handleSaveTask(
                                          "reminder",
                                          editedValues?.reminder
                                        );
                                      }}
                                    />
                                  </span>
                                </EditFields>
                              </>
                            ) : (
                              <LeadInfoIconData>
                                <InputFieldValue>
                                  {editedValues?.reminder &&
                                    `${editedValues?.reminder} minutes before`}
                                </InputFieldValue>
                                {/* <ModeEdit
                                  className="hovericons"
                                  sx={{ color: "#d7282f" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleEdit("reminder");
                                  }}
                                />{" "} */}
                              </LeadInfoIconData>
                            )}
                          </Grid>
                        </Grid>
                      </LeadInfoRow>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <LeadInfoRow className="leadrow">
                        <Grid container>
                          <Grid item xs={12} sm={12} md={3} lg={4}>
                            <InputFieldName>Related With </InputFieldName>
                          </Grid>
                          <Grid item xs={12} sm={12} md={9} lg={8}>
                            {editField.related_with ? (
                              <>
                                <EditableBox className="leadinfoEditablefield leadEditablestyle">
                                  <Select
                                    inputRef={inputRef}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={
                                      relatedTo?.find(
                                        (item: any) =>
                                          item?.typeId ==
                                          editedValues?.related_with
                                      )?.typeId || null
                                    }
                                    onChange={(e) => {
                                      setEditedValues((prevEditedValues) => ({
                                        ...prevEditedValues,
                                        ["related_with"]: e.target.value,
                                      }));
                                    }}
                                    IconComponent={
                                      KeyboardArrowDownOutlinedIcon
                                    }
                                  >
                                    {relatedTo?.map((item) => (
                                      <MenuItem value={item?.typeId}>
                                        {item?.typeName}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </EditableBox>
                                <EditFields className="hovericons">
                                  <span>
                                    <CloseIcon
                                      className="social-icon2"
                                      sx={{ color: "#d7282f" }}
                                      onClick={() =>
                                        handleCancel("related_with")
                                      }
                                    />
                                    <DoneOutlinedIcon
                                      className="social-icon1"
                                      sx={{
                                        color: "green !important",
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleSaveTask(
                                          "related_with",
                                          editedValues?.related_with
                                        );
                                      }}
                                    />
                                  </span>
                                </EditFields>
                              </>
                            ) : (
                              <LeadInfoIconData>
                                <InputFieldValue>
                                  {relatedTo?.find(
                                    (item: any) =>
                                      item?.typeId == editedValues?.related_with
                                  )?.typeName || ""}
                                </InputFieldValue>
                                {/* <ModeEdit
                                  className="hovericons"
                                  sx={{ color: "#d7282f" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleEdit("related_with");
                                  }}
                                />{" "} */}
                              </LeadInfoIconData>
                            )}
                          </Grid>
                        </Grid>
                      </LeadInfoRow>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <LeadInfoRow className="leadrow">
                        <Grid container>
                          <Grid item xs={12} sm={12} md={3} lg={4}>
                            <InputFieldName>
                              {" "}
                              {relatedTo?.find(
                                (item: any) =>
                                  item?.typeId == editedValues?.related_with
                              )?.typeName || "Select Related to"}
                            </InputFieldName>
                          </Grid>
                          <Grid item xs={12} sm={12} md={9} lg={8}>
                            {editField.related_to ? (
                              <>
                                <EditableBox className="leadinfoEditablefield leadEditablestyle">
                                  <Autocomplete
                                    id="country-select-demo"
                                    // sx={{ width: 300 }}
                                    options={dataList}
                                    value={
                                      dataList?.find(
                                        (ele) =>
                                          ele?.unique_id ==
                                          relatedTo
                                      ) || null
                                    }
                                    // autoHighlight
                                    onChange={(e, newValue) => {
                                      setEditedValues((prevEditedValues) => ({
                                        ...prevEditedValues,
                                        ["related_to"]: newValue,
                                      }));
                                      setRelatedValue(newValue?.unique_id);
                                    }}
                                    // onInputChange={(newValue)=>handleSelectRelated(newValue)}
                                    getOptionLabel={(option) => {
                                      if (editedValues?.related_with === 1) {
                                        return `${
                                          option?.First_Name
                                            ? option?.First_Name
                                            : option?.mail
                                        }`;
                                      } else if (
                                        editedValues?.related_with == 2
                                      ) {
                                        return `${
                                          option?.Deal_Name
                                            ? option?.Deal_Name
                                            : option?.name
                                        }`;
                                      } else if (
                                        editedValues?.related_with == 3
                                      ) {
                                        return `${
                                          option?.Full_Name
                                            ? option?.Full_Name
                                            : option?.mail
                                            ? option?.mail
                                            : option?.Company_Owner
                                        }`;
                                      } else {
                                        return `${
                                          (option?.Full_Name,
                                          option?.Contact_Owner)
                                        }`;
                                      }
                                    }}
                                    renderOption={(props, option) => (
                                      <>
                                        <RelatedToBox>
                                          {editedValues?.related_with == 1 && (
                                            <>
                                              <Box
                                                component="li"
                                                {...props}
                                                style={{ display: "block" }}
                                              >
                                                <List>
                                                  <ListItem disablePadding>
                                                    <ListItemButton>
                                                      <div>
                                                        {" "}
                                                        <Avatar
                                                          alt="Image"
                                                          src={option.file_name}
                                                        />
                                                      </div>
                                                      <ListItemText>
                                                        <div className="TaskUsername">
                                                          {" "}
                                                          {
                                                            option?.First_Name
                                                          }{" "}
                                                          {option?.Last_Name}
                                                        </div>
                                                        {"  "}{" "}
                                                        <div className="TaskUseremail">
                                                          {option?.mail}
                                                        </div>
                                                      </ListItemText>
                                                    </ListItemButton>
                                                  </ListItem>
                                                </List>
                                              </Box>
                                            </>
                                          )}
                                          {editedValues?.related_with == 2 && (
                                            <Box component="li" {...props}>
                                              {option?.Deal_Name} {option?.name}
                                            </Box>
                                          )}
                                          {editedValues?.related_with == 3 && (
                                            <Box component="li" {...props}>
                                              {option?.Full_Name} {option?.mail}{" "}
                                              {option?.Company_Owner}
                                            </Box>
                                          )}
                                          {editedValues?.related_with == 4 && (
                                            <Box component="li" {...props}>
                                              {option?.Full_Name} {option?.mail}
                                              {option?.Contact_Owner}
                                            </Box>
                                          )}
                                        </RelatedToBox>
                                      </>
                                    )}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        inputProps={{
                                          ...params.inputProps,
                                          autoComplete: "new-password",
                                        }}
                                      />
                                    )}
                                  />
                                </EditableBox>
                                <EditFields className="hovericons">
                                  <span>
                                    <CloseIcon
                                      className="social-icon2"
                                      sx={{ color: "#d7282f" }}
                                      onClick={() => handleCancel("related_to")}
                                    />
                                    <DoneOutlinedIcon
                                      className="social-icon1"
                                      sx={{
                                        color: "green !important",
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleSaveTask(
                                          "related_to",
                                          editedValues?.related_to
                                        );
                                      }}
                                    />
                                  </span>
                                </EditFields>
                              </>
                            ) : (
                              <LeadInfoIconData>
                                <InputFieldValue>
                                {getDetails(editedValues)} 
                                </InputFieldValue>
                                {/* <ModeEdit
                                  className="hovericons"
                                  sx={{ color: "#d7282f" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleEdit("related_to");
                                  }}
                                />{" "} */}
                              </LeadInfoIconData>
                            )}
                          </Grid>
                        </Grid>
                      </LeadInfoRow>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <LeadInfoRow className="leadrow">
                        <Grid container>
                          <Grid item xs={12} sm={12} md={3} lg={4}>
                            <InputFieldName>From</InputFieldName>
                          </Grid>
                          <Grid item xs={12} sm={12} md={9} lg={8}>
                            {editField.from ? (
                              <>
                                <EditableBox className="leadinfoEditablefield leadEditablestyle">
                                  <CustomDatePicker
                                    handleChange={(e: any) => {
                                      setEditedValues((prevEditedValues) => ({
                                        ...prevEditedValues,
                                        ["from"]: e.target.value,
                                      }));
                                    }}
                                    name="value"
                                    value={editedValues?.from}
                                    defaultDate={editedValues?.from}
                                  />
                                </EditableBox>
                                <EditFields className="hovericons">
                                  <span>
                                    <CloseIcon
                                      className="social-icon2"
                                      sx={{ color: "#d7282f" }}
                                      onClick={() => handleCancel("from")}
                                    />
                                    <DoneOutlinedIcon
                                      className="social-icon1"
                                      sx={{
                                        color: "green !important",
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleSaveTask(
                                          "from",
                                          editedValues?.from
                                        );
                                      }}
                                    />
                                  </span>
                                </EditFields>
                              </>
                            ) : (
                              <LeadInfoIconData>
                                <InputFieldValue>
                                {moment(editedValues?.from).format("MMM D, YYYY hh:mm A")}
                                </InputFieldValue>
                                {/* <ModeEdit
                                  className="hovericons"
                                  sx={{ color: "#d7282f" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleEdit("from");
                                  }}
                                />{" "} */}
                              </LeadInfoIconData>
                            )}
                          </Grid>
                        </Grid>
                      </LeadInfoRow>
                    </Grid>
                    {/* <Grid item xs={12} sm={6} md={6}>
                      <LeadInfoRow className="leadrow">
                        <Grid container>
                          <Grid item xs={12} sm={12} md={3} lg={4}>
                            <InputFieldName>To</InputFieldName>
                          </Grid>
                          <Grid item xs={12} sm={12} md={9} lg={8}>
                            {editField.to ? (
                              <>
                                <EditableBox className="leadinfoEditablefield leadEditablestyle">
                                  <CustomDatePicker
                                    handleChange={(e: any) => {
                                      setEditedValues((prevEditedValues) => ({
                                        ...prevEditedValues,
                                        ["to"]: e.target.value,
                                      }));
                                    }}
                                    name="value"
                                    value={editedValues?.to}
                                    defaultDate={editedValues?.to}
                                  />
                                </EditableBox>
                                <EditFields className="hovericons">
                                  <span>
                                    <CloseIcon
                                      className="social-icon2"
                                      sx={{ color: "#d7282f" }}
                                      onClick={() => handleCancel("to")}
                                    />
                                    <DoneOutlinedIcon
                                      className="social-icon1"
                                      sx={{
                                        color: "green !important",
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleSaveTask("to", editedValues?.to);
                                      }}
                                    />
                                  </span>
                                </EditFields>
                              </>
                            ) : (
                              <LeadInfoIconData>
                                <InputFieldValue>
                                  {editedValues?.to}
                                </InputFieldValue>
                                <ModeEdit
                                  className="hovericons"
                                  sx={{ color: "#d7282f" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleEdit("to");
                                  }}
                                />{" "}
                              </LeadInfoIconData>
                            )}
                          </Grid>
                        </Grid>
                      </LeadInfoRow>
                    </Grid> */}
                    <Grid item xs={12} sm={6} md={6}>
                      <LeadInfoRow className="leadrow">
                        <Grid container>
                          <Grid item xs={12} sm={12} md={3} lg={4}>
                            <InputFieldName>Call Purpose</InputFieldName>
                          </Grid>
                          <Grid item xs={12} sm={12} md={9} lg={8}>
                            {editField.call_purpose ? (
                              <>
                                <EditableBox className="leadinfoEditablefield leadEditablestyle">
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="input-with-icon-adornment"
                                    value={editedValues?.call_purpose}
                                    onChange={(e) =>
                                      setEditedValues((prevEditedValues) => ({
                                        ...prevEditedValues,
                                        ["call_purpose"]: e.target.value,
                                      }))
                                    }
                                    defaultValue="None"
                                    IconComponent={
                                      KeyboardArrowDownOutlinedIcon
                                    }
                                    startAdornment={
                                      <InputAdornment position="start"></InputAdornment>
                                    }
                                  >
                                    <MenuItem value={"Prospecting"}>
                                      Prospecting{" "}
                                    </MenuItem>
                                    <MenuItem value={"Administrative"}>
                                      Administrative
                                    </MenuItem>
                                    <MenuItem value={"Negotiation"}>
                                      Negotiation
                                    </MenuItem>
                                    <MenuItem value={"Demo"}>Demo</MenuItem>
                                    <MenuItem value={"Project"}>
                                      Project
                                    </MenuItem>
                                    <MenuItem value={"Desk"}>Desk</MenuItem>
                                  </Select>
                                </EditableBox>
                                <EditFields className="hovericons">
                                  <span>
                                    <CloseIcon
                                      className="social-icon2"
                                      sx={{ color: "#d7282f" }}
                                      onClick={() =>
                                        handleCancel("call_purpose")
                                      }
                                    />
                                    <DoneOutlinedIcon
                                      className="social-icon1"
                                      sx={{
                                        color: "green !important",
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleSaveTask(
                                          "call_purpose",
                                          editedValues?.call_purpose
                                        );
                                      }}
                                    />
                                  </span>
                                </EditFields>
                              </>
                            ) : (
                              <LeadInfoIconData>
                                <InputFieldValue>
                                  {editedValues?.call_purpose}
                                </InputFieldValue>
                                <ModeEdit
                                  className="hovericons"
                                  sx={{ color: "#d7282f" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleEdit("call_purpose");
                                  }}
                                />{" "}
                              </LeadInfoIconData>
                            )}
                          </Grid>
                        </Grid>
                      </LeadInfoRow>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className="infotextarea">
                      <LeadInfoRow className="leadrow">
                        <Grid container>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <InputFieldName>Description</InputFieldName>
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            {editField.description ? (
                              <>
                                <EditableBox>
                                  <TaskFullTextarea>
                                    <TextField
                                      id="outlined-multiline-static"
                                      multiline
                                      rows={2}
                                      defaultValue="Default Value"
                                      placeholder="Description goes here...."
                                      value={editedValues?.description}
                                      onChange={(e) =>
                                        setEditedValues((prevEditedValues) => ({
                                          ...prevEditedValues,
                                          ["description"]: e.target.value,
                                        }))
                                      }
                                    />
                                  </TaskFullTextarea>
                                </EditableBox>
                                <EditFields className="hovericons">
                                  <span>
                                    <CloseIcon
                                      className="social-icon2"
                                      sx={{ color: "#d7282f" }}
                                      onClick={() =>
                                        handleCancel("description")
                                      }
                                    />
                                    <DoneOutlinedIcon
                                      className="social-icon1"
                                      sx={{
                                        color: "green !important",
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleSaveTask(
                                          "description",
                                          editedValues?.description
                                        );
                                      }}
                                    />
                                  </span>
                                </EditFields>
                              </>
                            ) : (
                              <LeadInfoIconData>
                                <InputFieldValue>
                                  {editedValues?.description}
                                </InputFieldValue>
                                <ModeEdit
                                  className="hovericons"
                                  sx={{ color: "#d7282f" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleEdit("description");
                                  }}
                                />{" "}
                              </LeadInfoIconData>
                            )}
                          </Grid>
                        </Grid>
                      </LeadInfoRow>
                    </Grid>
                  </Grid>
                </LeadViewInner>
              </LeadViewFormrow>
            </LeadViewformContent>
          </>
        </LeadViewFormData>
      )}
    </>
  );
};
export default CallInformation;
