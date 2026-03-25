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
} from "@mui/material";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import TaskAltSharpIcon from "@mui/icons-material/TaskAltSharp";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
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
  updateEachTask,
  getDetailOfSingleTasks,
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
const TaskInformation = () => {
  const inputRef = useRef(null);
  const [dataList, setDataList] = React.useState([]);
  const [relatedValue, setRelatedValue] = React.useState<any>("");
  const [filtersField, setFiltersFields] = React.useState([]);
  const { userLists, showSkelton, singleActivity } = useSelector(
    (state: any) => state.formList
  );
  const [editField, setEditField] = useState<any>({
    owner: false,
    subject: false,
    priority: false,
    status: false,
    dueDate: false,
    related_with: false,
    description: false,
    related_with_value: false,
  });
  const [editedValues, setEditedValues] = useState({
    owner: singleActivity?.owner || "",
    subject: singleActivity?.subject || "",
    priority: singleActivity?.priority || "",
    status: singleActivity?.status || "",
    description: singleActivity?.description || "",
    related_with: singleActivity?.related_with || "",
    task_date: singleActivity?.task_date || "",
    related_with_value: singleActivity?.related_with_value || "",
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  let relatedTo = [
    { typeId: 1, typeName: "Lead" },
    { typeId: 2, typeName: "Deal" },
    { typeId: 3, typeName: "Accounts" },
    { typeId: 4, typeName: "Contact" },
  ];

  useEffect(() => {
    if (singleActivity) {
      setEditedValues({
        owner: singleActivity.owner || "",
        subject: singleActivity.subject || "",
        priority: singleActivity.priority || "",
        status: singleActivity.status || "",
        description: singleActivity.description || "",
        related_with: singleActivity.related_with || "",
        task_date: singleActivity.task_date || "",
        related_with_value: singleActivity?.related_with_value,
      });
      if (singleActivity?.related_with_value?.length > 0) {
        setRelatedValue(singleActivity?.related_with_value[0]?.unique_id);
      }
    }
  }, [singleActivity]);

  useEffect(() => {
    async function fetchMyAPI() {
      dispatch(setShowSkeltn(true));
      // await dispatch(EditTaskCallMeeting(taskDetails));
      await dispatch(
        getDetailOfSingleTasks({ id: router?.query.id, type: "task" })
      );
      await dispatch(getListOfUsersAndSubUsers());
      await dispatch(setEmailIdToSender(singleActivity));
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
        const accountId = filtersField?.find(
          (item) => item.name === "Account"
        )?.id;
        const emailId = filtersField?.find((item) => item.name === "mail")?.id;
        const mobileId = filtersField?.find(
          (item) => item.name === "Mobile_No."
        )?.id;
        filteredData = [
          firstNameId,
          lastNameId,
          accountId,
          emailId,
          mobileId,
        ]?.join(",");
        break;
      case 2:
        const dealAccount = filtersField?.find(
          (item) => item.name === "Account_Name"
        )?.id;
        const dealName = filtersField?.find(
          (item) => item.name === "Deal_Name"
        )?.id;
        filteredData = [dealAccount, dealName]?.join(",");
        break;
      case 3:
        const mailId = filtersField?.find((item) => item.name === "mail")?.id;
        const CompanyId = filtersField?.find(
          (item) => item.name === "Company_Name"
        )?.id;
        const Company_Owner = filtersField?.find(
          (item) => item.name === "Company_Owner"
        )?.id;
        const accountName = filtersField?.find(
          (item) => item.name === "Account_Name"
        )?.id;
        filteredData = [mailId, CompanyId, Company_Owner, accountName]?.join(
          ","
        );
        break;
      case 4:
        const Full_Name_Id = filtersField?.find(
          (item) => item.name === "Full_Name"
        )?.id;
        const contactFirstName = filtersField?.find(
          (item) => item.name === "First_Name"
        )?.id;
        const contactLastName = filtersField?.find(
          (item) => item.name === "Last_Name"
        )?.id;
        const mail_Id = filtersField?.find((item) => item.name === "mail")?.id;
        const contactMobile = filtersField?.find(
          (item) => item.name === "Mobile_No."
        )?.id;
        filteredData = [
          mail_Id,
          Full_Name_Id,
          contactFirstName,
          contactLastName,
          contactMobile,
        ]?.join(",");
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
    if (type == "related_with_value") {
      payload = {
        [type]: getRelatedValue(editedValues?.related_with),
      };
      message = `<span>Task Info - </span>Related With Value has been changed `;
      history = {
        lead_id: router?.query?.id,
        name: "Info",
        type: "info",
        message: message,
      };
    } else {
      payload = {
        [type]: value,
      };
      if (type == "related_with") {
        message = `<span>Task Info - </span>Related With has been changed <b>from </b>${singleActivity[type] == 1
            ? "Lead"
            : singleActivity[type] == 2
              ? "Deal"
              : singleActivity[type] == 3
                ? "Account"
                : "Contact"
          }<b> to </b>${value == 1
            ? "Lead"
            : value == 2
              ? "Deal"
              : value == 3
                ? "Account"
                : "Contact"
          } `;
        history = {
          lead_id: router?.query?.id,
          name: "Info",
          type: "info",
          message: message,
        };
      } else {
        message = `<span>Task Info - </span><span style="text-transform: capitalize">${type == "owner" ? "Task Owner" : type?.replaceAll("_", " ")
          }</span> has been changed <b>from</b> ${type == "owner"
            ? singleActivity[type]?.name
            : singleActivity[type]?.replaceAll("_", " ")
          }<b> to </b>${type == "owner"
            ? userLists?.find((ele) => ele?.email == payload[type]?.name)?.name
            : payload[type]
          } `;
        history = {
          lead_id: router?.query?.id,
          name: "Info",
          type: "info",
          message: message,
        };
      }
    }

    dispatch(updateEachTask({ id: router?.query?.id, data: payload }));
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
              <LeadInfoHeading>Task</LeadInfoHeading>
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
                            <InputFieldName>Task Owner</InputFieldName>
                          </Grid>
                          <Grid item xs={12} sm={12} md={9} lg={8}>
                            {editField.owner ? (
                              <>
                                <EditableBox className="leadinfoEditablefield leadEditablestyle">
                                  <LeadOwner
                                    inputRef={inputRef}
                                    defaultOwner={editedValues?.owner}
                                    userLists={userLists}
                                    label={"Lead Owner"}
                                    updateValue={(newValue) => {
                                      const update = { name: newValue };

                                      setEditedValues((prevEditedValues) => ({
                                        ...prevEditedValues,
                                        owner: update,
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
                                      onClick={() => handleCancel("owner")}
                                    />
                                    <DoneOutlinedIcon
                                      className="social-icon1"
                                      sx={{
                                        color: "green !important",
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();

                                        handleSaveTask(
                                          "owner",
                                          editedValues?.owner
                                        );
                                      }}
                                    />
                                  </span>
                                </EditFields>
                              </>
                            ) : (
                              <LeadInfoIconData>
                                <InputFieldValue>
                                  {editedValues?.owner?.name}
                                </InputFieldValue>
                                <ModeEdit
                                  className="hovericons"
                                  sx={{ color: "#d7282f" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleEdit("owner");
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
                            <InputFieldName>Priority</InputFieldName>
                          </Grid>
                          <Grid item xs={12} sm={12} md={9} lg={8}>
                            {editField.priority ? (
                              <>
                                <EditableBox className="leadinfoEditablefield leadEditablestyle">
                                  <Select
                                    inputRef={inputRef}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={editedValues?.priority}
                                    onChange={(e) => {
                                      setEditedValues((prevEditedValues) => ({
                                        ...prevEditedValues,
                                        ["priority"]: e.target.value,
                                      }));
                                    }}
                                    IconComponent={
                                      KeyboardArrowDownOutlinedIcon
                                    }
                                    error={true}
                                  >
                                    <MenuItem
                                      value={"high"}
                                      style={{ textTransform: "capitalize" }}
                                    >
                                      <span
                                        className="flagstyle"
                                        style={{ color: "#d7282f" }}
                                      >
                                        <FlagOutlinedIcon />
                                      </span>
                                      High
                                    </MenuItem>
                                    <MenuItem
                                      value={"lowest"}
                                      style={{ textTransform: "capitalize" }}
                                    >
                                      <span
                                        className="flagstyle"
                                        style={{ color: "#999" }}
                                      >
                                        <FlagOutlinedIcon />
                                      </span>
                                      Lowest
                                    </MenuItem>
                                    <MenuItem
                                      value={"low"}
                                      style={{ textTransform: "capitalize" }}
                                    >
                                      <span
                                        className="flagstyle"
                                        style={{ color: "#6666c4" }}
                                      >
                                        <FlagOutlinedIcon />
                                      </span>
                                      Low
                                    </MenuItem>
                                    <MenuItem
                                      value={"normal"}
                                      style={{ textTransform: "capitalize" }}
                                    >
                                      <span
                                        className="flagstyle"
                                        style={{ color: "orange" }}
                                      >
                                        <FlagOutlinedIcon />
                                      </span>
                                      Normal
                                    </MenuItem>
                                  </Select>
                                </EditableBox>
                                <EditFields className="hovericons">
                                  <span>
                                    <CloseIcon
                                      className="social-icon2"
                                      sx={{ color: "#d7282f" }}
                                      onClick={() => handleCancel("priority")}
                                    />
                                    <DoneOutlinedIcon
                                      className="social-icon1"
                                      sx={{
                                        color: "green !important",
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();

                                        handleSaveTask(
                                          "priority",
                                          editedValues?.priority
                                        );
                                      }}
                                    />
                                  </span>
                                </EditFields>
                              </>
                            ) : (
                              <LeadInfoIconData>
                                <InputFieldValue
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {editedValues?.priority}
                                </InputFieldValue>
                                <ModeEdit
                                  className="hovericons"
                                  sx={{ color: "#d7282f" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleEdit("priority");
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
                            <InputFieldName>Status</InputFieldName>
                          </Grid>
                          <Grid item xs={12} sm={12} md={9} lg={8}>
                            {editField.status ? (
                              <>
                                <EditableBox className="leadinfoEditablefield leadEditablestyle">
                                  <Select
                                    inputRef={inputRef}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={
                                      editedValues?.status == "defered"
                                        ? "Defered"
                                        : editedValues?.status
                                    }
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
                                    <MenuItem value={"Defered"}>
                                      {/* <FlagOutlinedIcon /> */}
                                      Defered
                                    </MenuItem>
                                    <MenuItem value={"in-progress"}>
                                      In Progress
                                    </MenuItem>
                                    <MenuItem value={"completed"}>
                                      Completed
                                    </MenuItem>
                                    <MenuItem
                                      value={" Waiting on someone else"}
                                    >
                                      Waiting on someone else
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
                                <InputFieldValue style={{ textTransform: 'capitalize' }}>
                                  {editedValues?.status.includes("-")
                                    ? editedValues?.status.replace("-", " ")
                                    : editedValues?.status}
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
                            <InputFieldName>Related With</InputFieldName>
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
                                {/*<ModeEdit
                                  className="hovericons"
                                  sx={{ color: "#d7282f" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleEdit("related_with");
                                  }}
                                /> */}
                                {" "}
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
                            {editField.related_with_value ? (
                              <>
                                <EditableBox className="leadinfoEditablefield leadEditablestyle">
                                  <Autocomplete
                                    id="country-select-demo"
                                    // sx={{ width: 300 }}
                                    options={dataList}
                                    value={
                                      dataList?.find(
                                        (ele) => ele?.unique_id == relatedValue
                                      ) || null
                                    }
                                    // autoHighlight
                                    onChange={(e, newValue) => {
                                      setEditedValues((prevEditedValues) => ({
                                        ...prevEditedValues,
                                        ["related_with_value"]: newValue,
                                      }));
                                      setRelatedValue(newValue?.unique_id);
                                    }}
                                    // onInputChange={(newValue)=>handleSelectRelated(newValue)}
                                    getOptionLabel={(option) => {
                                      if (editedValues?.related_with === 1) {
                                        return `${option?.First_Name
                                            ? option?.First_Name
                                            : option?.mail
                                          }`;
                                      } else if (
                                        editedValues?.related_with == 2
                                      ) {
                                        return `${option?.Deal_Name
                                            ? option?.Deal_Name
                                            : option?.name
                                          }`;
                                      } else if (
                                        editedValues?.related_with == 3
                                      ) {
                                        return `${option?.Full_Name
                                            ? option?.Full_Name
                                            : option?.mail
                                              ? option?.mail
                                              : option?.Company_Owner
                                          }`;
                                      } else {
                                        return `${(option?.Full_Name,
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
                                              {option?.Deal_Name
                                                ? option?.Deal_Name
                                                : option?.Deal_Owner}
                                            </Box>
                                          )}
                                          {editedValues?.related_with == 3 && (
                                            <Box component="li" {...props}>
                                              <List>
                                                <ListItem disablePadding>
                                                  <ListItemButton>
                                                    {option?.Account_Name
                                                      ? option?.Account_Name
                                                      : option?.Account_Owner}
                                                  </ListItemButton>
                                                </ListItem>
                                              </List>
                                            </Box>
                                          )}
                                          {editedValues?.related_with == 4 && (
                                            <Box component="li" {...props}>
                                              {option?.First_Name ? option?.First_Name : option?.Contact_Owner}
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
                                      onClick={() =>
                                        handleCancel("related_with_value")
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
                                          "related_with_value",
                                          editedValues?.related_with_value
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
                                    toggleEdit("related_with_value");
                                  }}
                                /> */}
                                {" "}
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
                            <InputFieldName>Due Date</InputFieldName>
                          </Grid>
                          <Grid item xs={12} sm={12} md={9} lg={8}>
                            {editField.task_date ? (
                              <>
                                <EditableBox className="leadinfoEditablefield leadEditablestyle">
                                  <CustomDatePicker
                                    handleChange={(e: any) => {
                                      setEditedValues((prevEditedValues) => ({
                                        ...prevEditedValues,
                                        ["task_date"]: e.target.value,
                                      }));
                                    }}
                                    name="value"
                                    value={editedValues?.task_date}
                                    defaultDate={editedValues?.task_date}
                                  />
                                </EditableBox>
                                <EditFields className="hovericons">
                                  <span>
                                    <CloseIcon
                                      className="social-icon2"
                                      sx={{ color: "#d7282f" }}
                                      onClick={() => handleCancel("task_date")}
                                    />
                                    <DoneOutlinedIcon
                                      className="social-icon1"
                                      sx={{
                                        color: "green !important",
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleSaveTask(
                                          "task_date",
                                          editedValues?.task_date
                                        );
                                      }}
                                    />
                                  </span>
                                </EditFields>
                              </>
                            ) : (
                              <LeadInfoIconData>
                                <InputFieldValue>
                                  {editedValues?.task_date}
                                </InputFieldValue>
                                <ModeEdit
                                  className="hovericons"
                                  sx={{ color: "#d7282f" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleEdit("task_date");
                                  }}
                                />{" "}
                              </LeadInfoIconData>
                            )}
                          </Grid>
                        </Grid>
                      </LeadInfoRow>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className="infotextarea">
                      <LeadInfoRow className="leadrow" style={{ border: "none" }}>
                        <Grid container>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <InputFieldName>Description</InputFieldName>
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            {editField.description ? (
                              <>
                                <EditableBox>
                                  {/* <StyledTextarea
                                    aria-label="empty textarea"
                                    placeholder="Description goes here...."
                                    value={editedValues?.description}
                                    onChange={(e) =>
                                      setEditedValues((prevEditedValues) => ({
                                        ...prevEditedValues,
                                        ["description"]: e.target.value,
                                      }))
                                    }
                                  /> */}
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
export default TaskInformation;
