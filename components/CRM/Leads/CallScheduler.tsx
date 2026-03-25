import * as React from "react";
import {
  ActivityFormData,
  ActivityTabInner,
  ActivityTabLeft,
  ActivityTabRight,
  CallfieldCombine,
  FormControlstyle,
  FormFieldContainer,
  IconHelping,
  InfoTitle,
  RelatedToBox,
  TaskInfoBar,
  TaskInfoBtn,
} from "../style";
import {
  FormHelperText,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  styled,
  Box,
  List,
  ListItem,
  ListItemButton,
  Avatar,
  ListItemText,
  Autocomplete,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { WeekScheduler } from "@/components/common/weekScheduler";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import { useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import CommonOwner from "./CommonOwner";
import {
  SmallBlackOutineBtn,
  SmallOutineBtn,
  SmallRedOutineBtn,
} from "../commonStyle";
import { ThreeDots } from "react-loader-spinner";
import moment from "moment";
import {
  createAndScheduleCalls,
  createHistory,
  getAllListOfTasks,
  informationTaskMeetingCalls,
  setActivityType,
  setActivityViewType,
  setCallsPopUp,
  setSingleActivity,
  setTaskPopUp,
} from "@/hooks/UseCreateFormData";
import { useRouter } from "next/router";
import { useAppDispatch } from "redux/store";
import { toast } from "react-toastify";
import CallSkeleton from "../Skeletons/CallSkeleton";
import { CustomDateTimePicker } from "@/components/common/datePicker/CustomDateTimePicker";
import { apiClient } from "@/components/common/common";
import CommonDropDownList from "./CommonDropDownList";
const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};
const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
    font-size: 0.875rem;
    font-family:Open Sans;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius:4px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
    width:100% !important;
    min-height:65px;
    margin:25px 0 0;
    &:hover {
      border-color:transparent;
      outline:1px solid #D2D2D2
    }
  
    &:focus {
      border-color: transparent;
      box-shadow:none;
      outline:1px solid #D2D2D2
    }
    
  `
);
const CallScheduler = () => {
  const {
    details,
    userLists,
    callsLoader,
    selectedDataIds,
    typeId,
    singleActivity,
    singleActivityLoader,
    typeName,
  } = useSelector((state: any) => state.formList);
  const [callType, setCallType] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [startDateTime, setStartDateTime] = React.useState<any>(
    moment(new Date())
      .add(0, "day")
      .add(10, "minutes")
      .format("YYYY-MM-DD HH:mm:ss")
  );
  const { userEmail, id, userName } = useSelector(
    (state: any) => state.userData
  );
  const [reminderStatus, setReminderStatus] = React.useState("off");
  const [filtersField, setFiltersFields] = React.useState([]);
  const [dataList, setDataList] = React.useState([]);
  const [callOwner, setCallOwner] = React.useState("");
  const [callDuration, setCallDuration] = React.useState("");
  const [subject, setSubject] = React.useState(
    `Call scheduled with ${details?.First_Name ? details?.First_Name : ""}`
  );
  const [recording, setRecording] = React.useState("");
  const [reminder, setReminder] = React.useState("");
  const [callPurpose, setCallPurpose] = React.useState("");
  const [callAgenda, setCallAgenda] = React.useState("");
  const [incomingCallReason, setIncomingCallReason] = React.useState("");
  const [relatedValue, setRelatedValue] = React.useState<any>("");
  const [checkSelect, setCheckSelect] = React.useState<any>("");
  const [statusError, setStatusError] = React.useState(false);
  const [callTypeError, setCallTypeError] = React.useState(false);
  const [subjectError, setSubjectError] = React.useState(false);
  const [selectedOwner, setSelectedOwner] = React.useState(null);
  let relatedToDo = [
    { typeId: 1, typeName: "Lead" },
    { typeId: 2, typeName: "Deal" },
    { typeId: 3, typeName: "Account" },
    { typeId: 4, typeName: "Contact" },
  ];
  const dispatch = useAppDispatch();
  const handleChangeDateTime = (newValue) => {
    setStartDateTime(newValue);
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

  const handleSaveFilterData = async () => {
    if (status == "" || status == null) {
      setStatusError(true);
      setCallTypeError(false);
      setSubjectError(false);
    } else if (callType == "" || callType == null) {
      setCallTypeError(true);
      setStatusError(false);
      setSubjectError(false);
    } else if (subject == "" || subject == null) {
      setSubjectError(true);
      setCallTypeError(false);
      setStatusError(false);
    } else {
      setStatusError(false);
      setCallTypeError(false);
      setSubjectError(false);

      var body = {
        id: singleActivity?.id ? singleActivity?.id : "",
        unique_id: `${
          typeId == 7
            ? relatedValue?.unique_id
            : Array.isArray(selectedDataIds) == true &&
              selectedDataIds?.length > 0
            ? selectedDataIds.join(",")
            : details?.unique_id
        }`,
        type_id: 7,
        crm_user_form_unique_id: relatedValue?.crm_user_form_unique_id,
        call_to: details?.id
          ? details?.id
          : JSON.parse(localStorage.getItem("userData"))?.id,
        status: status,
        call_type: callType,
        call_start_date_time: moment(startDateTime).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        call_owner: callOwner
          ? callOwner
          : JSON.parse(localStorage.getItem("userData"))?.id,
        subject: subject,
        reminder: status == "scheduled" ? reminder : "",
        call_purpose:
          status == "scheduled" || callType == "out-bound" ? callPurpose : "",
        call_agenda:
          status == "scheduled" || callType == "out-bound" ? callAgenda : "",
        recording: status != "scheduled" ? recording : "",
        incoming_call_reason:
          status != "scheduled" && callType == "in-bound"
            ? incomingCallReason
            : "",
        call_duration:
          status != "scheduled" && callType != "missed" ? callDuration : "",
        related_to: checkSelect !== "" ? checkSelect : details?.id,
        related_with_value: getRelatedValue(checkSelect),
        reminder_type: "both",
        reminder_status: reminderStatus,
        call_owner_email: userEmail,
        reminder_date_time: moment(startDateTime)
          .subtract(reminder, "minutes")
          .format("YYYY-MM-DD HH:mm:ss"),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        reminder_number: reminder,
      };

      let response = await dispatch(createAndScheduleCalls(body));
      if (response?.payload?.status == 200) {
        if (
          typeName == "Tasks" ||
          typeName == "Meetings" ||
          typeName == "Calls"
        ) {
          setCheckSelect("");
          toast.success(response?.payload?.message);
          dispatch(informationTaskMeetingCalls());
          dispatch(setActivityType(""));
          handleCloseColumn();
        } else {
          dispatch(getAllListOfTasks());
          dispatch(
            createHistory({
              lead_id: details.unique_id,
              name: "Activity",
              type_id: typeId,
              type: "activity",
              message:
                status == "scheduled"
                  ? `<span>${
                      singleActivity?.id
                        ? "Activity Updated"
                        : "Activity Created"
                    } - </span>call <b>${status}</b> at <b>${moment(
                      startDateTime
                    ).format("YYYY-MM-DD HH:mm A")}</b> `
                  : `<span>${
                      singleActivity?.id
                        ? "Activity Updated"
                        : "Activity Created"
                    } - </span>Logged a call at <b>${moment(
                      startDateTime
                    ).format("YYYY-MM-DD HH:mm A")}</b> `,
            })
          );
        }
        if (singleActivity?.id) {
          dispatch(dispatch(setSingleActivity([])));
          dispatch(setActivityViewType("add"));
        }
        dispatch(setActivityType(""));
      }
    }
  };
  const getRelatedList = async (value) => {
    let body = {
      // type_name: typeName,
      type_id: value,
      per_page: 100,
    };
    let response = await apiClient(`crm/data_listing`, "post", { body });
    if (response.status == true || response.status == 200) {
      setDataList(response?.data?.data);
      setFiltersFields(response?.data?.filter_fields);
    }
  };

  const handleChangeCallPurpose = (event) => {
    setCallPurpose(event.target.value);
  };

  const handleCloseColumn = () => {
    dispatch(setCallsPopUp(false));
    dispatch(setActivityViewType("add"));
    dispatch(dispatch(setSingleActivity([])));
    dispatch(setActivityType(""));
  };

  React.useEffect(() => {
    if(singleActivity?.type_name){
    setSelectedOwner(userEmail);
    setSubject(singleActivity?.subject);
    setStatus(singleActivity?.status);
    setCallType(singleActivity?.call_type);
    setReminder(singleActivity?.reminder_number);
    setCallPurpose(singleActivity?.call_purpose);
    setCallAgenda(singleActivity?.call_agenda);
    setCallDuration(singleActivity?.call_duration);
    setRecording(singleActivity?.recording);
    setIncomingCallReason(singleActivity?.incoming_call_reason);
    if (
      typeName == "Leads" ||
      typeName == "Contacts" ||
      typeName == "Accounts"
    ) {
      setCheckSelect(typeId);
      setStartDateTime(singleActivity?.call_start_date_time);
      getRelatedList(typeId);
    }
  }
  }, [singleActivity]);
  
  return (
    <ActivityTabLeft>
      {singleActivityLoader ? (
        <CallSkeleton />
      ) : (
        <>
          <ActivityTabInner>
            <TaskInfoBar>
              <InfoTitle>Call Information</InfoTitle>
              <TaskInfoBtn>
                <SmallRedOutineBtn
                  variant="outlined"
                  autoFocus
                  onClick={handleSaveFilterData}
                >
                  {callsLoader ? (
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
                <SmallBlackOutineBtn
                  variant="outlined"
                  onClick={handleCloseColumn}
                >
                  Cancel
                </SmallBlackOutineBtn>
              </TaskInfoBtn>
            </TaskInfoBar>
            <ActivityFormData>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <FormControlstyle variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      <Image
                        src="/assets/images/crm/form1.svg"
                        alt="Image"
                        width={15}
                        height={16}
                      />
                      Call To
                    </InputLabel>
                    <Grid item xs={12} md={12}>
                      <CallfieldCombine>
                        {/* <FormControlstyle style={{ width: "30%" }}>
                          <Select
                            size="small"
                            labelId="demo-simple-select-label"
                            id="input-with-icon-adornment"
                            value={
                              relatedToDo?.find(
                                (item: any) => item?.typeId == checkSelect
                              )?.typeId ||
                              relatedToDo?.find(
                                (item: any) => item?.typeId === typeId
                              )?.typeId
                            }
                            defaultValue={
                              relatedToDo?.find(
                                (item: any) => item?.typeId === typeId
                              )?.typeId
                            }
                            disabled={typeId == 1 && true}
                            label="Related To"
                            onChange={(e: any) => {
                              setCheckSelect(e.target.value),
                                getRelatedList(e.target.value);
                            }}
                            IconComponent={KeyboardArrowDownOutlinedIcon}
                            startAdornment={
                              <InputAdornment position="start"></InputAdornment>
                            }
                          >
                            {relatedToDo?.map((item) => (
                              <MenuItem value={item?.typeId}>
                                {item?.typeName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControlstyle> */}
                        <FormFieldContainer
                          style={{ width: "70%", padding: "2px" }}
                        >
                          {typeId == 1 && (
                            <Typography
                              style={{
                                color: "#88898b",
                                fontSize: "12px",
                                padding: "2px 4px 0",
                              }}
                            >
                              {details?.First_Name} {details?.Last_Name}
                            </Typography>
                          )}
                          {typeId !== 1 && (
                            <Autocomplete
                              id="country-select-demo"
                              popupIcon={<KeyboardArrowDownOutlinedIcon />}
                              // sx={{ width: 300 }}
                              options={dataList}
                              value={
                                dataList?.find(
                                  (ele) => ele?.id === relatedValue?.id
                                ) || null
                              }
                              // autoHighlight
                              onChange={(e, newValue) => {
                                setRelatedValue(newValue);
                              }}
                              getOptionLabel={(option) => {
                                if (checkSelect === 1) {
                                  return `${
                                    option?.First_Name
                                      ? option?.First_Name
                                      : option?.Lead_Owner
                                  }`;
                                } else if (checkSelect == 2) {
                                  return `${
                                    option?.Deal_Name
                                      ? option?.Deal_Name
                                      : option?.Deal_Owner
                                  }`;
                                } else if (checkSelect == 3) {
                                  return `${
                                    option?.Account_Name
                                      ? option?.Account_Name
                                      : option?.Account_Owner
                                  }`;
                                } else {
                                  return `${
                                    option?.First_Name
                                      ? option?.First_Name
                                      : option?.Contact_Owner
                                  }`;
                                }
                              }}
                              renderOption={(props, option) => (
                                <>
                                  <CommonDropDownList
                                    option={option}
                                    newPro={props}
                                    checkSelect={checkSelect}
                                  />
                                </>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: "off",
                                  }}
                                />
                              )}
                            />
                          )}
                          {/* <TextField
                            style={{ width: "100%" }}
                            id="outlined-required"
                            placeholder="Lead Name"
                            value={`${details?.First_Name} ${details?.Last_Name}`}
                          /> */}
                        </FormFieldContainer>
                      </CallfieldCombine>
                    </Grid>
                  </FormControlstyle>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlstyle variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      <Image
                        src="/assets/images/crm/form1.svg"
                        alt="Image"
                        width={15}
                        height={16}
                      />
                      Call Status
                    </InputLabel>
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
                      value={status}
                      label="Call Status"
                      onChange={(e) => {
                        setStatus(e.target.value);
                        if (e.target.value == "scheduled") {
                          setCallType("out-bound");
                          setSubject(
                            `Call scheduled with ${
                              details?.First_Name ? details?.First_Name : ""
                            }`
                          );
                        } else {
                          setSubject(
                            `Call log with ${
                              details?.First_Name ? details?.First_Name : ""
                            }`
                          );
                        }
                      }}
                      IconComponent={KeyboardArrowDownOutlinedIcon}
                      startAdornment={
                        <InputAdornment position="start"></InputAdornment>
                      }
                      error={statusError && true}
                    >
                      <MenuItem value={"scheduled"}>Scheduled</MenuItem>
                      <MenuItem value={"call-a-log"}>Call a log</MenuItem>
                    </Select>
                    {statusError && (
                      <FormHelperText sx={{ color: "#d7282f" }}>
                        Please select call status.
                      </FormHelperText>
                    )}
                  </FormControlstyle>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlstyle variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      <PhoneInTalkOutlinedIcon />
                      Call Type
                    </InputLabel>
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
                      value={callType}
                      label="Call Type"
                      onChange={(event) => {
                        setCallType(event.target.value);
                      }}
                      IconComponent={KeyboardArrowDownOutlinedIcon}
                      startAdornment={
                        <InputAdornment position="start"></InputAdornment>
                      }
                      disabled={status == "scheduled" && true}
                      error={callTypeError && true}
                    >
                      <MenuItem value={"in-bound"}>Inbound</MenuItem>
                      <MenuItem value={"out-bound"}>Outbound</MenuItem>
                      {status != "scheduled" && (
                        <MenuItem value={"missed"}>Missed</MenuItem>
                      )}
                    </Select>
                    {callTypeError && (
                      <FormHelperText sx={{ color: "#d7282f" }}>
                        Please select call type.
                      </FormHelperText>
                    )}
                  </FormControlstyle>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlstyle variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      <CalendarMonthOutlinedIcon />
                      Call Start Date/Time
                    </InputLabel>
                    <CustomDateTimePicker
                      label={""}
                      value={startDateTime}
                      handleChange={(newValue) => {
                        handleChangeDateTime(newValue);
                      }}
                      mindate={status == "scheduled" && new Date()}
                      maxdate={status == "call-a-log" && new Date()}
                    />
                  </FormControlstyle>
                </Grid>
                {status != "scheduled" &&
                (callType == "in-bound" || callType == "out-bound") ? (
                  <Grid item xs={12} md={6}>
                    <FormControlstyle variant="standard">
                      <InputLabel htmlFor="input-with-icon-adornment">
                        <Image
                          src="/assets/images/crm/status_icon.svg"
                          alt="Image"
                          width={16}
                          height={16}
                        />
                        Call Duration
                      </InputLabel>
                      <Input
                        id="input-with-icon-adornment"
                        placeholder="10 minutes"
                        startAdornment={
                          <InputAdornment position="start"></InputAdornment>
                        }
                        value={callDuration}
                        onChange={(e) => {
                          setCallDuration(e.target.value);
                        }}
                      />
                    </FormControlstyle>
                  </Grid>
                ) : null}

                {status == "scheduled" &&
                callType != "missed" &&
                callType != "in-bound" ? (
                  <Grid item xs={12} md={6}>
                    <FormControlstyle variant="standard">
                      <CommonOwner
                        // defaultOwner={selectedOwner}
                        defaultOwner={
                          userLists?.find((item) => item?.email == userEmail) ||
                          null
                        }
                        updateValue={(newValue) => {
                          setCallOwner(newValue?.id);
                        }}
                        label={"Call Owner"}
                        userLists={userLists}
                      />
                    </FormControlstyle>
                  </Grid>
                ) : null}
                <Grid item xs={12} md={6}>
                  <FormControlstyle variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      <Image
                        src="/assets/images/crm/status_icon.svg"
                        alt="Image"
                        width={16}
                        height={16}
                      />
                      Subject
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      placeholder="call scheduled with lead name"
                      startAdornment={
                        <InputAdornment position="start"></InputAdornment>
                      }
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                      }}
                    />
                    {subjectError && (
                      <FormHelperText sx={{ color: "#d7282f" }}>
                        Please enter subject.
                      </FormHelperText>
                    )}
                  </FormControlstyle>
                </Grid>
                {status != "scheduled" && callType != "" ? (
                  <Grid item xs={12} md={6}>
                    <FormControlstyle variant="standard">
                      <InputLabel htmlFor="input-with-icon-adornment">
                        <Image
                          src="/assets/images/crm/status_icon.svg"
                          alt="Image"
                          width={16}
                          height={16}
                        />
                        Voice Recording
                      </InputLabel>
                      <Input
                        id="input-with-icon-adornment"
                        placeholder="--------"
                        startAdornment={
                          <InputAdornment position="start"></InputAdornment>
                        }
                        value={recording}
                        onChange={(e) => {
                          setRecording(e.target.value);
                        }}
                      />
                    </FormControlstyle>
                  </Grid>
                ) : null}
                {callType == "in-bound" ? (
                  <Grid item xs={12} md={12}>
                    <FormControlstyle variant="standard">
                      <InputLabel htmlFor="input-with-icon-adornment">
                        <Image
                          src="/assets/images/crm/description.svg"
                          alt="Image"
                          width={16}
                          height={16}
                        />
                        Reason For Incoming Call
                      </InputLabel>
                      <StyledTextarea
                        aria-label="empty textarea"
                        placeholder="Description goes here...."
                        value={incomingCallReason}
                        onChange={(e) => setIncomingCallReason(e.target.value)}
                      />
                    </FormControlstyle>
                  </Grid>
                ) : null}
                {callType != "missed" && callType != "in-bound" ? (
                  <Grid item xs={12} md={6}>
                    <FormControlstyle variant="standard">
                      <InputLabel htmlFor="input-with-icon-adornment">
                        <Image
                          src="/assets/images/crm/reminder_icon.svg"
                          alt="Image"
                          width={16}
                          height={16}
                        />
                        Reminder <IconHelping />
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="input-with-icon-adornment"
                        value={reminder}
                        name="reminder"
                        onChange={(e) => {
                          setReminder(e.target.value);
                          setReminderStatus("on");
                        }}
                        defaultValue={reminder}
                        IconComponent={KeyboardArrowDownOutlinedIcon}
                        startAdornment={
                          <InputAdornment position="start"></InputAdornment>
                        }
                      >
                        <MenuItem value={5}>5 minutes before </MenuItem>
                        <MenuItem value={10}>10 minutes before </MenuItem>
                        <MenuItem value={15}>15 minutes before </MenuItem>
                        <MenuItem value={30}>30 minutes before </MenuItem>
                      </Select>
                    </FormControlstyle>
                  </Grid>
                ) : null}
                {/* <Grid item xs={12} md={6}>
                  <FormControlstyle variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                       <Image
                        src="/assets/images/crm/form1.svg"
                        alt="Image"
                        width={16}
                        height={16}
                      /> 
                    </InputLabel>
                    <CommonOwner
                      defaultOwner={userLists?.find(
                        (item) => item?.email == selectedOwner
                      )}
                      updateValue={(newValue) => {
                        setSelectedOwner(newValue);
                      }}
                      label={" Call Owner"}
                      onClose={() => {
                        setSelectedOwner(null);
                      }}
                      userLists={userLists}
                    />
                  </FormControlstyle>
                </Grid> */}
              </Grid>
            </ActivityFormData>
          </ActivityTabInner>
          {callType != "missed" && callType != "in-bound" ? (
            <ActivityTabInner>
              <InfoTitle className="Nospace">
                Purpose Of Outgoing Call
              </InfoTitle>
              <ActivityFormData className="Nomargin">
                <Grid container spacing={1}>
                  <Grid item xs={12} md={12}>
                    <FormControlstyle variant="standard">
                      <InputLabel htmlFor="input-with-icon-adornment">
                        <Image
                          src="/assets/images/crm/callpurpose_icon.svg"
                          alt="Image"
                          width={16}
                          height={14}
                        />
                        Call Purpose
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="input-with-icon-adornment"
                        value={callPurpose}
                        label="Call Purpose"
                        onChange={handleChangeCallPurpose}
                        defaultValue="None"
                        IconComponent={KeyboardArrowDownOutlinedIcon}
                        startAdornment={
                          <InputAdornment position="start"></InputAdornment>
                        }
                      >
                        <MenuItem value={"Prospecting"}>Prospecting </MenuItem>
                        <MenuItem value={"Administrative"}>
                          Administrative
                        </MenuItem>
                        <MenuItem value={"Negotiation"}>Negotiation</MenuItem>
                        <MenuItem value={"Demo"}>Demo</MenuItem>
                        <MenuItem value={"Project"}>Project</MenuItem>
                        <MenuItem value={"Desk"}>Desk</MenuItem>
                      </Select>
                    </FormControlstyle>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <FormControlstyle variant="standard">
                      <InputLabel htmlFor="input-with-icon-adornment">
                        <PhoneInTalkOutlinedIcon style={{}} />
                        Call Agenda
                      </InputLabel>
                      <Input
                        id="input-with-icon-adornment"
                        placeholder="Type here...."
                        startAdornment={
                          <InputAdornment position="start"></InputAdornment>
                        }
                        value={callAgenda}
                        onChange={(e) => setCallAgenda(e.target.value)}
                      />
                    </FormControlstyle>
                  </Grid>
                </Grid>
              </ActivityFormData>
            </ActivityTabInner>
          ) : null}
        </>
      )}
    </ActivityTabLeft>
  );
};
export default CallScheduler;
