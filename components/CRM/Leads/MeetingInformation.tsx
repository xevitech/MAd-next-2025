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
  getDetailOfSingleTasks,
  updateEachMeeting,
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
const MeetingInformation = () => {
  const inputRef = useRef(null);
  const [dataList, setDataList] = React.useState([]);
  const [relatedValue, setRelatedValue] = React.useState<any>("");
  const [filtersField, setFiltersFields] = React.useState([]);
  const [tagInput, setTagInput] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const { userLists, showSkelton, singleActivity } =
    useSelector((state: any) => state.formList);
  const [editField, setEditField] = useState<any>({
    hostby: false,
    participants: false,
    location: false,
    // status: false,
    from: false,
    to: false,
    title: false,
    related_with: false,
    description: false,
    related_to: false,
  });
  const [editedValues, setEditedValues] = useState({
    hostby: singleActivity?.hostby || "",
    participants: singleActivity?.participants || [],
    location: singleActivity?.location || "",
    // status: singleActivity?.status || '',
    description: singleActivity?.description || "",
    related_with: singleActivity?.related_to || "",
    from: singleActivity?.task_date || "",
    title: singleActivity?.title || "",
    to: singleActivity?.to || "",
    related_to: singleActivity?.related_with || "",
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
        hostby: singleActivity.hostby || "",
        participants: singleActivity.participants || [],
        location: singleActivity.location || "",
        description: singleActivity.description || "",
        related_with: singleActivity.related_to || "",
        title: singleActivity?.title || "",
        from: singleActivity.from || "",
        to: singleActivity.to || "",
        related_to: singleActivity?.related_with || "",
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
        singleActivity?.id?getDetailOfSingleTasks({ id: singleActivity.id, type: "meeting" }): getDetailOfSingleTasks({ id: router?.query.id, type: "meeting" })
      );
      dispatch(setShowSkeltn(false));
    }
    fetchMyAPI();
  }, [dispatch]);

  useEffect(() => { 
    if (editedValues?.related_with !== ""||editedValues?.related_with!==null) {
      getRelatedList(editedValues?.related_with);
      // setRelatedValue("");
    }
  }, [editedValues?.related_with]);

  const toggleEdit = (field) => {
    setEditField((prevEditField) => ({
      ...prevEditField,
      [field]: !prevEditField[field],
    }));
  };

  const getRelatedList = async (id:any) => {
    if(id!==""){
      let body = {
        type_id:  id,
        per_page: 100,
      };
      let response = await apiClient(`crm/data_listing`, "post", { body });
      if (response.status == true || response.status == 200) {
        setDataList(response?.data?.data);
        setFiltersFields(response?.data?.filter_fields);
      }
    }
  };

  const handleCancel = (field) => {
    toggleEdit(field);
    setEditedValues((prevEditedValues) => ({
      ...prevEditedValues,
    }));
  };

  const handleDeleteTag = (tagToDelete) => {
    const updatedTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(updatedTags);
  };
  

  const handleTagInputChange = (event, newValue) => {
    setTagInput(newValue);
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
      message = `<span>Meeting Info - </span>Related With Value has been changed `;
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
      message = `<span>Meeting Info - </span>Participants has been changed to ${tags.join(",")}`;
      history = {
        lead_id: router?.query?.id,
        name: "Info",
        type: "info",
        message: message,
      };
    } else if (type == "hostby") {
      payload = {
        host: userLists?.find(item => item?.email == value)?.id,
      };
      message = `<span>Meeting Info - </span><span style="text-transform: capitalize">Meeting Owner has been changed <b>from</b> ${singleActivity[type]?.name ? singleActivity[type]?.name : 'null'} <b>to</b> 
      ${userLists?.find((ele) => ele?.id == payload?.host)?.name ? userLists?.find((ele) => ele?.id == payload?.host)?.name : 'null'} `;
      history = {
          lead_id: router?.query?.id,
          name: "Info",
          type: "info",
          message: message,
      };
    }  else {
      
      payload = {
        [type]: value,
      };
      message = `<span>Meeting Info - </span><span style="text-transform: capitalize">${
        type == "hostby" ? "Meeting Owner" : type?.replaceAll("_", " ")
      }</span> has been changed <b>from</b> ${
        type == "hostby"
          ? singleActivity[type]?.name
          : singleActivity[type]?.replaceAll("_", " ")
      }<b> to </b>${
        type == "hostby"
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
    dispatch(updateEachMeeting({ id: router?.query?.id, data: payload }));
    dispatch(createTaskMeetingCallsHistory(history));

  };


  const handleKeyDown = (event) => {
    if (event.key === "Enter" && tagInput.trim() !== "") {
      setTags([
        ...tags,
        {
          email: tagInput.trim(),
        },
      ]);
      setTagInput("");
    }
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
              <LeadInfoHeading>Meeting</LeadInfoHeading>
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
                            <InputFieldName>Meeting Owner</InputFieldName>
                          </Grid>
                          <Grid item xs={12} sm={12} md={9} lg={8}>
                            {editField.hostby ? (
                              <>
                                <EditableBox className="leadinfoEditablefield leadEditablestyle">
                                  <LeadOwner
                                    inputRef={inputRef}
                                    defaultOwner={editedValues?.hostby||userLists?.find((item:any)=>item.email==editedValues?.hostby)?.name}
                                    userLists={userLists}
                                    label={"Lead Owner"}
                                    updateValue={(newValue) => {
                                      const update = { name: newValue };
                                      setEditedValues((prevEditedValues) => ({
                                        ...prevEditedValues,
                                        hostby: newValue,
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
                                      onClick={() => handleCancel("hostby")}
                                    />
                                    <DoneOutlinedIcon
                                      className="social-icon1"
                                      sx={{
                                        color: "green !important",
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();

                                        handleSaveTask(
                                          "hostby",
                                          editedValues?.hostby
                                        );
                                      }}
                                    />
                                  </span>
                                </EditFields>
                              </>
                            ) : (
                              <LeadInfoIconData>
                                <InputFieldValue>
                                  {editedValues?.hostby?.name||userLists?.find((item:any)=>item.email==editedValues?.hostby)?.name}
                                </InputFieldValue>
                                <ModeEdit
                                  className="hovericons"
                                  sx={{ color: "#d7282f" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleEdit("hostby");
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
                            <InputFieldName>Title</InputFieldName>
                          </Grid>
                          <Grid item xs={12} sm={12} md={9} lg={8}>
                            {editField.title ? (
                              <>
                                <EditableBox className="leadinfoEditablefield leadEditablestyle">
                                  <TextField
                                    inputRef={inputRef}
                                    fullWidth
                                    id="outlined-required"
                                    value={editedValues.title}
                                    placeholder={"title"}
                                    onChange={(e) => {
                                      e.preventDefault();
                                      setEditedValues((prevEditedValues) => ({
                                        ...prevEditedValues,
                                        ["title"]: e.target.value,
                                      }));
                                    }}
                                  />
                                </EditableBox>
                                <EditFields className="hovericons">
                                  <span>
                                    <CloseIcon
                                      className="social-icon2"
                                      sx={{ color: "#d7282f" }}
                                      onClick={() => handleCancel("title")}
                                    />
                                    <DoneOutlinedIcon
                                      className="social-icon1"
                                      sx={{
                                        color: "green !important",
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();

                                        handleSaveTask(
                                          "title",
                                          editedValues?.title
                                        );
                                      }}
                                    />
                                  </span>
                                </EditFields>
                              </>
                            ) : (
                              <LeadInfoIconData>
                                <InputFieldValue>
                                  {editedValues?.title}
                                </InputFieldValue>
                                <ModeEdit
                                  className="hovericons"
                                  sx={{ color: "#d7282f" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleEdit("title");
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
                            <InputFieldName>Location</InputFieldName>
                          </Grid>
                          <Grid item xs={12} sm={12} md={9} lg={8}>
                            {editField.location ? (
                              <>
                                <EditableBox className="leadinfoEditablefield leadEditablestyle">
                                  <TextField
                                    inputRef={inputRef}
                                    fullWidth
                                    id="outlined-required"
                                    value={editedValues.location}
                                    placeholder={"location"}
                                    onChange={(e) => {
                                      e.preventDefault();
                                      setEditedValues((prevEditedValues) => ({
                                        ...prevEditedValues,
                                        ["location"]: e.target.value,
                                      }));
                                    }}
                                  />                             
                                </EditableBox>
                                <EditFields className="hovericons">
                                  <span>
                                    <CloseIcon
                                      className="social-icon2"
                                      sx={{ color: "#d7282f" }}
                                      onClick={() => handleCancel("location")}
                                    />
                                    <DoneOutlinedIcon
                                      className="social-icon1"
                                      sx={{
                                        color: "green !important",
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();

                                        handleSaveTask(
                                          "location",
                                          editedValues?.location
                                        );
                                      }}
                                    />
                                  </span>
                                </EditFields>
                              </>
                            ) : (
                              <LeadInfoIconData>
                                <InputFieldValue>
                                  {editedValues?.location}
                                </InputFieldValue>
                                <ModeEdit
                                  className="hovericons"
                                  sx={{ color: "#d7282f" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleEdit("location");
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
                                      onClick={() =>{
                                        setEditedValues((prevEditedValues) => ({
                                          ...prevEditedValues,
                                          ["related_with"]: singleActivity?.related_to,
                                        }));
                                        toggleEdit("related_with",);
                                      }
                                       
                                        // handleCancel("related_with")
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
                                />*/}
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
                                          ele?.id ==
                                          relatedValue
                                      ) || null
                                    }
                                    // autoHighlight
                                    onChange={(e, newValue) => {
                                      setEditedValues((prevEditedValues) => ({
                                        ...prevEditedValues,
                                        ["related_to"]: newValue,
                                      }));
                                      setRelatedValue(newValue?.id);
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
                                    error={editedValues?.from==""?true:false}
                                    errorText={editedValues?.from==""?"Please enter from date":""}
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
                                  {editedValues?.from}
                                </InputFieldValue>
                                <ModeEdit
                                  className="hovericons"
                                  sx={{ color: "#d7282f" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleEdit("from");
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
                                    error={editedValues?.to==""?true:false}
                                    errorText={editedValues?.to==""?"Please enter To date":""}
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
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <LeadInfoRow className="leadrow">
                        <Grid container>
                          <Grid item xs={12} sm={12} md={3} lg={4}>
                            <InputFieldName>Participants</InputFieldName>
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={8}>
                            {editField.participants ? (
                              <>
                                <EditableBox className="leadinfoEditablefield leadEditablestyle">
                                  {/* <TextField
                                    inputRef={inputRef}
                                    fullWidth
                                    id="outlined-required"
                                    value={editedValues.participants}
                                    placeholder={"participants"}
                                    onChange={(e) => {
                                      e.preventDefault();
                                      setEditedValues((prevEditedValues) => ({
                                        ...prevEditedValues,
                                        ["participants"]: e.target.value,
                                      }));
                                    }}
                                  /> */}
                                  <Autocomplete
                                    popupIcon={
                                      <KeyboardArrowDownOutlinedIcon />
                                    }
                                    fullWidth
                                    multiple
                                    id="participants"
                                    freeSolo
                                    options={[]}
                                    value={tags}
                                    noOptionsText={""}
                                    limitTags={10}
                                    onChange={(event, newValue) =>
                                      setTags(newValue)
                                    }
                                    inputValue={tagInput}
                                    onInputChange={handleTagInputChange}
                                    renderTags={(value, getTagProps) =>
                                      value?.map((tag, index) => (
                                        <Chip
                                          key={index}
                                          label={tag}
                                          onDelete={() => handleDeleteTag(tag)}
                                          {...getTagProps({ index })}
                                        />
                                      ))
                                    }
                                    renderInput={(params) => (
                                      <>
                                        <TextField
                                          fullWidth
                                          {...params}
                                          placeholder="Add participant emails"
                                          variant="outlined"
                                          onKeyDown={handleKeyDown}
                                        />
                                      </>
                                    )}
                                  />
                                </EditableBox>
                                <EditFields className="hovericons">
                                  <span>
                                    <CloseIcon
                                      className="social-icon2"
                                      sx={{ color: "#d7282f" }}
                                      onClick={() =>
                                        handleCancel("participants")
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
                                          "participants",
                                          editedValues?.participants
                                        );
                                      }}
                                    />
                                  </span>
                                </EditFields>
                              </>
                            ) : (
                              <LeadInfoIconData>
                                <InputFieldValue>
                                  {tags?.map((ele) => ele)}
                                  {/* {editedValues?.participants} */}
                                </InputFieldValue>
                                <ModeEdit
                                  className="hovericons"
                                  sx={{ color: "#d7282f" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleEdit("participants");
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
export default MeetingInformation;
