import * as React from "react";
import {
  ActivityFormData,
  ActivityTabInner,
  ActivityTabLeft,
  AddMoreGridStyle,
  AddMoreUser,
  BoxDateTimePicker,
  CheckMeeting,
  CheckboxField,
  FormControlstyle,
  FormFieldContainer,
  InfoTitle,
  ListOption,
  RadioButtonText2,
  ReminderHead,
  ReminderMessage,
  ReminderPopOver,
  ReminderStatus,
  RepeatCoulumn,
  SwitchPopContent,
  SwitchesBox,
  SwitchesPopup,
  TaskAvatarContainer,
  TaskAvatarLabel,
  TaskInfoBar,
  TaskInfoBtn,
  TextFieldStyle,
  TextTextField,
  TypographyEnd,
  RelatedToBox,
} from "../style";
import {
  Avatar,
  Box,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
  SwitchProps,
  TextField,
  TextareaAutosize,
  Typography,
  styled,
} from "@mui/material";
import Image from "next/image";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import {
  createHistory,
  createMeetings,
  createTaskAndSchedule,
  getAllListOfTasks,
  informationTaskMeetingCalls,
  setActivityFormType,
  setActivityType,
  setActivityViewType,
  setMeetingPopUp,
  setSingleActivity,
  setTaskPopUp,
} from "@/hooks/UseCreateFormData";
import {
  SmallBlackOutineBtn,
  SmallOutineBtn,
  SmallRedOutineBtn,
} from "../commonStyle";
import { ThreeDots } from "react-loader-spinner";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import moment from "moment";
import { toast } from "react-toastify";
import CommonOwner from "./CommonOwner";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import TagsInput from "./TagsInput";
import MeetingSkeleton from "../Skeletons/MeetingSkeleton";
import { CustomDateTimePicker } from "@/components/common/datePicker/CustomDateTimePicker";
import { apiClient } from "@/components/common/common";
import CommonDropDownList from "./CommonDropDownList";
import { useEffect } from "react";
const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" />
))(({ theme }) => ({
  width: 42,
  height: 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 20,
    height: 20,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

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
const IOSSwitch2 = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" />
))(({ theme }) => ({
  width: 42,
  height: 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#C78800",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 20,
    height: 20,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const MeetingSchedule = () => {
  const dispatch = useAppDispatch();
  const {
    crmMeetingLoader,
    typeId,
    selectedDataIds,
    userLists,
    details,
    singleActivity,
    singleActivityLoader,
    typeName,
  } = useSelector((state: any) => state.formList);
  const { userEmail, id, userName } = useSelector(
    (state: any) => state.userData
  );
  const [meetingTitle, setMeetingTitle] = React.useState("New Meeting");
  const [meetingError, setMeetingError] = React.useState(false);
  const [toDateError, setToDateError] = React.useState(false);
  const [tagsError, setTagsError] = React.useState(false);
  const [hostError, setHostError] = React.useState(false);
  const [tagsValidationError, setTagsValidationError] = React.useState(false);
  const [meetingLocation, setMeetingLocation] = React.useState("");
  const [fromDate, setFromDate] = React.useState<any>(
    moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
  );
  const [toDate, setToDate] = React.useState<any>(
    moment(new Date())
      .add(0, "day")
      .add(1, "hour")
      .format("YYYY-MM-DD HH:mm:ss")
  );
  const [filtersField, setFiltersFields] = React.useState([]);
  const [relatedValue, setRelatedValue] = React.useState<any>("");
  const [dataList, setDataList] = React.useState([]);
  const [selectedOwner, setSelectedOwner] = React.useState(null);
  const [reminder, setReminder] = React.useState("");
  const [reminderStatus, setReminderStatus] = React.useState("off");
  const [description, setDescription] = React.useState("");
  const [tagInput, setTagInput] = React.useState("");
  const [checkSelect, setCheckSelect] = React.useState<any>("");
  const [tags, setTags] = React.useState([]);
  let relatedToDo = [
    { typeId: 1, typeName: "Lead" },
    { typeId: 2, typeName: "Deal" },
    { typeId: 3, typeName: "Accounts" },
    { typeId: 4, typeName: "Contact" },
  ];
  const handleMeeting = (event) => {
    if (event.target.value != "" || event.target.value != null) {
      setMeetingError(false);
    }
    setMeetingTitle(event.target.value);
  };

  useEffect(() => {
    if (checkSelect !== "") {
      getRelatedList();
    }
  }, [checkSelect]);

  const handleReminder = (e) => {
    setReminder(e.target.value);
    setReminderStatus("on");
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
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    let checkEmail = tags?.map((ele) => {
      return regex.test(ele);
    });

    let fromDateObj =
      fromDate?.target?.value !== undefined
        ? moment(fromDate?.target?.value, "YYYY-MM-DD HH:mm:ss")
        : moment(fromDate, "YYYY-MM-DD HH:mm:ss");
    let toDateObj =
      toDate?.target?.value !== undefined
        ? moment(toDate?.target?.value, "YYYY-MM-DD HH:mm:ss")
        : moment(toDate, "YYYY-MM-DD HH:mm:ss");

    let emailVerified = checkEmail?.some((v) => v === false);
    // if (meetingTitle == "" || meetingTitle == null) {
    //   setMeetingError(true);
    //   setTagsValidationError(false);
    //   setHostError(false);
    // } else
    if (selectedOwner == "" || selectedOwner == null) {
      setHostError(true);
    }
    // else if (tags?.length == 0) {
    //   setTagsError(true);
    //   setHostError(false);
    //   setTagsValidationError(false);
    // }
    else if (tags?.length > 0 && emailVerified) {
      setTagsError(false);
      setMeetingError(false);
      setHostError(false);
      setTagsValidationError(true);
    } else if (toDateObj.isSameOrBefore(fromDateObj)) {
      setToDateError(true);
    } else {
      setTagsValidationError(false);
      setHostError(false);
      setMeetingError(false);
      setTagsError(false);
      let body = {
        id: singleActivity?.id ? singleActivity?.id : "",
        unique_id: `${
          typeId == 6
            ? relatedValue?.unique_id
            : Array.isArray(selectedDataIds) == true &&
              selectedDataIds?.length > 0
            ? selectedDataIds.join(",")
            : details?.unique_id
        }`,
        type_id: 6,
        crm_user_form_unique_id: relatedValue?.crm_user_form_unique_id,
        host: selectedOwner?.id ? selectedOwner?.id : id,
        title: meetingTitle ? meetingTitle : "New Meeting",
        reminder_type: "both",
        location: meetingLocation,
        // from: moment(fromDate?.target?.value).format("YYYY-MM-DD HH:mm:ss"),
        from:
          fromDate? moment(fromDate).format("YYYY-MM-DD HH:mm:ss")
            : moment(fromDate?.target?.value, "YYYY-MM-DD HH:mm:ss").format(
                "YYYY-MM-DD HH:mm:ss"
              ),
        to: moment(toDate).format("YYYY-MM-DD HH:mm:ss"),
        // to:
        //   toDate
        //     ? moment(toDate?.target?.value, "YYYY-MM-DD HH:mm ss").format(
        //         "YYYY-MM-DD HH:mm:ss"
        //       )
        //     : moment(toDate).format("YYYY-MM-DD HH:mm:ss"),
        participants: tags.join(","),
        related_to: checkSelect !== "" ? checkSelect : details?.id,
        related_with_value: getRelatedValue(checkSelect),
        reminder_number: reminder,
        reminder_date_time:
          reminderStatus == "on"
            ? moment(fromDate?.target?.value, "YYYY-MM-DD HH:mm:ss").format(
                "YYYY-MM-DD HH:mm:ss"
              ) == "Invalid date"
              ? moment(fromDate)
                  .subtract(reminder, "minutes")
                  .format("YYYY-MM-DD HH:mm:ss")
              : moment(fromDate, "YYYY-MM-DD HH:mm:ss")
                  .subtract(reminder, "minutes")
                  .format("YYYY-MM-DD HH:mm:ss")
            : moment(fromDate, "YYYY-MM-DD HH:mm:ss").format(
                "YYYY-MM-DD HH:mm:ss"
              ) == "Invalid date"
            ? moment(fromDate).format("YYYY-MM-DD HH:mm ss")
            : moment(fromDate, "YYYY-MM-DD HH:mm:ss").format(
                "YYYY-MM-DD HH:mm:ss"
              ),
        reminder_status: reminderStatus,
        description: description,
        host_email: userEmail,
        host_name: userName,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        participants_name: "",
      };
      let response = await dispatch(createMeetings(body));
      toast.success(response?.payload?.message);
      if (response?.payload?.status == 200) {
        if (
          typeName == "Tasks" ||
          typeName == "Meetings" ||
          typeName == "Calls"
        ) {
          setCheckSelect("");
          dispatch(informationTaskMeetingCalls());
          // toast.success(response?.payload?.message);
          dispatch(setActivityType(""));
          handleCloseColumn();
        } else {
          dispatch(getAllListOfTasks());
          dispatch(
            createHistory({
              lead_id: details.unique_id,
              type_id: typeId,
              name: "Activity",
              type: "activity",
              message: `<span>${
                singleActivity?.id ? "Activity Updated" : "Activity Created"
              } - </span>meeting ${
                singleActivity?.id ? "updated " : "created "
              }${meetingTitle} <b>from </b>${moment(fromDate).format(
                "YYYY-MM-DD HH:mm A"
              )}<b> to </b>${moment(toDate).format(
                "YYYY-MM-DD HH:mm A"
              )} <b>with </b>${tags.join(",")}`,
            })
          );
          handleCloseColumn();
          setCheckSelect("");
        }

        if (singleActivity?.id) {
          dispatch(dispatch(setSingleActivity([])));
          dispatch(setActivityViewType("add"));
        }
      }
    }
  };

  const handleCloseColumn = () => {
    dispatch(setActivityViewType("add"));
    dispatch(dispatch(setSingleActivity([])));
    dispatch(setMeetingPopUp(false));
    dispatch(setActivityType(""));
    dispatch(setTaskPopUp(false));
    dispatch(setActivityType(""));
  };

  const getRelatedList = async () => {
    let body = {
      // type_name: typeName,
      type_id: checkSelect,
      per_page: 100,
    };
    let response = await apiClient(`crm/data_listing`, "post", { body });
    if (response.status == true || response.status == 200) {
      setDataList(response?.data?.data);
      setFiltersFields(response?.data?.filter_fields);
    }
  };

  const handleSelectRelated = (e) => {
    setRelatedValue(e);
  };

  const handleChangeFromDateTime = (newValue) => {
    setFromDate(newValue);
    const newToDate = moment(newValue?.target?.value, "YYYY-MM-DD HH:mm A")
      .add(0, "day")
      .add(1, "hour");
  };

  const handleChangeToDateTime = (newValue) => {
    setToDateError(false);
    setToDate(newValue);
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

  const handleTagInputChange = (event, newValue) => {
    setTagInput(newValue);
  };

  const handleDeleteTag = (tagToDelete) => {
    const updatedTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(updatedTags);
  };

  React.useEffect(() => {

      setSelectedOwner(userEmail);
      setMeetingTitle(singleActivity?.title);
      setMeetingLocation(singleActivity?.location);
      setReminder(singleActivity?.reminder_number)
      setTags(
        singleActivity?.participants
          ? singleActivity?.participants.split(",")
          : []
      );
      singleActivity?.description !== null &&
        setDescription(singleActivity?.description);
      if (
        (typeName == "Leads" ||
          typeName == "Contacts" ||
          typeName == "Accounts")
      ) {
        setFromDate(singleActivity?.from);
        setToDate(singleActivity?.to);
        setCheckSelect(typeId);
      }

  }, [singleActivity]);


  return (
    <ActivityTabInner>
      {singleActivityLoader ? (
        <MeetingSkeleton />
      ) : (
        <>
          <TaskInfoBar>
            <InfoTitle>Meeting Information</InfoTitle>
            <TaskInfoBtn>
              <SmallRedOutineBtn
                variant="outlined"
                autoFocus
                onClick={handleSaveFilterData}
              >
                {crmMeetingLoader ? (
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
                <FormControlstyle>
                  <InputLabel htmlFor="input-with-icon-adornment">
                    <Image
                      src="/assets/images/crm/form1.svg"
                      alt="Image"
                      width={16}
                      height={18}
                    />
                    New Meeting
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                      <InputAdornment position="start"></InputAdornment>
                    }
                    value={meetingTitle}
                    onChange={(e) => handleMeeting(e)}
                  />
                  {meetingError && (
                    <FormHelperText id="my-helper-text">
                      Please enter meeting title.
                    </FormHelperText>
                  )}
                </FormControlstyle>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlstyle variant="standard">
                  <InputLabel htmlFor="input-with-icon-adornment">
                    <Image
                      src="/assets/images/crm/form2.svg"
                      alt="Image"
                      width={16}
                      height={16}
                    />
                    Location
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    placeholder="Enter location or address"
                    startAdornment={
                      <InputAdornment position="start"></InputAdornment>
                    }
                    value={meetingLocation}
                    onChange={(e) => {
                      setMeetingLocation(e.target.value);
                    }}
                  />
                </FormControlstyle>
              </Grid>
              <Grid item xs={12} md={12}>
                <Grid container spacing={1}>
                  <Grid item xs={6} md={6}>
                    <Grid container spacing={0.5}>
                      <Grid item xs={12} md={12}>
                        <FormControlstyle>
                          <InputLabel htmlFor="input-with-icon-adornment">
                            <Image
                              src="/assets/images/crm/calender_grey.svg"
                              alt="Image"
                              width={16}
                              height={16}
                            />
                            From
                          </InputLabel>
                          <BoxDateTimePicker>
                            <CustomDateTimePicker
                              label={""}
                              value={fromDate}
                              handleChange={handleChangeFromDateTime}
                              mindate={moment(new Date())}
                            />
                          </BoxDateTimePicker>
                        </FormControlstyle>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Grid container spacing={0.5}>
                      <Grid item xs={12} md={12}>
                        <FormControlstyle>
                          <InputLabel htmlFor="input-with-icon-adornment">
                            <ArrowRightAltOutlinedIcon />
                            To
                          </InputLabel>
                          <BoxDateTimePicker>
                            <CustomDateTimePicker
                              label={""}
                              value={toDate}
                              handleChange={handleChangeToDateTime}
                              // error={toDateError}
                              errorText={
                                toDateError
                                  ? "To Date must be greater than from date"
                                  : ""
                              }
                              disablePast={true}
                              mindate={
                                fromDate?.target?.value
                                  ? moment(fromDate?.target?.value)
                                      .add(0, "day")
                                      .add(1, "hour")
                                  : moment(fromDate)
                                      .add(0, "day")
                                      .add(1, "hour")
                              }
                            
                            />
                          </BoxDateTimePicker>
                        </FormControlstyle>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlstyle>
                  <InputLabel htmlFor="input-with-icon-adornment">
                    <Image
                      src="/assets/images/crm/form1.svg"
                      alt="Image"
                      width={16}
                      height={18}
                    />
                  </InputLabel>
                  <CommonOwner
                    defaultOwner={userLists?.find(
                      (item) => item?.email == selectedOwner
                    )}
                    updateValue={(newValue) => {
                      setSelectedOwner(newValue);
                    }}
                    label={"Host"}
                    onClose={() => {
                      setSelectedOwner(null);
                    }}
                    userLists={userLists}
                  />
                  {hostError && (
                    <FormHelperText id="my-helper-text">
                      Please select host name.
                    </FormHelperText>
                  )}
                </FormControlstyle>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlstyle>
                  <InputLabel htmlFor="input-with-icon-adornment">
                    <Image
                      src="/assets/images/crm/reminder_icon.svg"
                      alt="Image"
                      width={16}
                      height={18}
                    />
                    Reminder
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
                    value={
                      reminder ||
                      (singleActivity?.reminder_number !== "" &&
                        singleActivity?.reminder_number !== null &&
                        singleActivity?.reminder_number)
                    }
                    label="Status"
                    onChange={(e) => handleReminder(e)}
                    IconComponent={KeyboardArrowDownOutlinedIcon}
                    startAdornment={
                      <InputAdornment position="start"></InputAdornment>
                    }
                  >
                    <MenuItem value={"5"}>5 minutes before </MenuItem>
                    <MenuItem value={"10"}>10 minutes before </MenuItem>
                    <MenuItem value={"15"}>15 minutes before </MenuItem>
                    <MenuItem value={"30"}>30 minutes before </MenuItem>
                    <MenuItem value={"60"}>1 hours before </MenuItem>
                    <MenuItem value={"120"}>2 hours before </MenuItem>
                    <MenuItem value={"1440"}>1 day before </MenuItem>
                    <MenuItem value={"2880"}>2 days before </MenuItem>
                  </Select>
                </FormControlstyle>
              </Grid>
              {typeId == 6 && (
                <Grid item xs={12} md={6}>
                  <FormControlstyle variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      <Image
                        src="/assets/images/crm/relatedto_icon.svg"
                        alt="Image"
                        width={16}
                        height={16}
                      />
                      Related To
                    </InputLabel>
                    {/* <Input
                    id="input-with-icon-adornment"
                    placeholder="Recontact test last name"
                    startAdornment={
                      <InputAdornment position="start"></InputAdornment>
                    }
                    value={relatedTo}
                  /> */}
                    <Select
                      labelId="demo-simple-select-label"
                      id="input-with-icon-adornment"
                      value={
                        relatedToDo?.find(
                          (item: any) => item?.typeId == checkSelect
                        )?.typeName
                      }
                      label="Related To"
                      onChange={(e: any) => {
                        setCheckSelect(e?.target?.value);
                        getRelatedList();
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
                  </FormControlstyle>
                </Grid>
              )}
              {typeId == 6 && (
                <Grid item xs={12} md={6}>
                  <FormControlstyle variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      <Image
                        src="/assets/images/crm/relatedto_icon.svg"
                        alt="Image"
                        width={16}
                        height={16}
                      />
                      Related with
                    </InputLabel>
                    <Autocomplete
                      id="country-select-demo"
                      // sx={{ width: 300 }}
                      options={dataList}
                      popupIcon={<KeyboardArrowDownOutlinedIcon />}
                      value={
                        dataList?.find((ele) => ele?.id == relatedValue?.id) ||
                        null
                      }
                      // autoHighlight
                      onChange={(e, newValue) => {
                        handleSelectRelated(newValue);
                      }}
                      // onInputChange={(newValue)=>handleSelectRelated(newValue)}
                      getOptionLabel={(option) => {
                        if (checkSelect === 1) {
                          return `${
                            option?.First_Name
                              ? option?.First_Name
                              : option?.mail
                          }`;
                        } else if (checkSelect == 2) {
                          return `${
                            option?.Deal_Name ? option?.Deal_Name : option?.name
                          }`;
                        } else if (checkSelect == 3) {
                          return `${
                            option?.Full_Name
                              ? option?.Full_Name
                              : option?.mail
                              ? option?.mail
                              : option?.Company_Owner
                          }`;
                        } else {
                          return option?.Full_Name;
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
                  </FormControlstyle>
                </Grid>
              )}
              <Grid item xs={12} md={12}>
                <FormControlstyle variant="standard">
                  <Autocomplete
                    popupIcon={<KeyboardArrowDownOutlinedIcon />}
                    fullWidth
                    multiple
                    id="participants"
                    freeSolo
                    options={[]}
                    value={tags}
                    noOptionsText={""}
                    limitTags={10}
                    onChange={(event, newValue) => setTags(newValue)}
                    inputValue={tagInput}
                    onInputChange={handleTagInputChange}
                    renderTags={(value, getTagProps) =>
                      value.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          onDelete={() => handleDeleteTag(tag)}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <>
                        <InputLabel htmlFor="input-with-icon-adornment">
                          <Image
                            src="/assets/images/crm/status_icon.svg"
                            alt="Image"
                            width={16}
                            height={18}
                          />
                          Participants
                        </InputLabel>
                        <TextField
                          fullWidth
                          {...params}
                          placeholder="Add participant emails by click on enter"
                          variant="outlined"
                          onKeyDown={handleKeyDown}
                        />
                      </>
                    )}
                  />
                  {tagsError && (
                    <FormHelperText id="my-helper-text">
                      Please enter participant emails.
                    </FormHelperText>
                  )}
                  {tagsValidationError && (
                    <FormHelperText id="my-helper-text">
                      Please enter valid emails.
                    </FormHelperText>
                  )}
                </FormControlstyle>
              </Grid>

              <Grid item xs={12} md={12}>
                <FormControlstyle variant="standard">
                  <InputLabel htmlFor="input-with-icon-adornment">
                    <Image
                      src="/assets/images/crm/description.svg"
                      alt="Image"
                      width={16}
                      height={16}
                    />
                    Description
                  </InputLabel>
                  <StyledTextarea
                    aria-label="empty textarea"
                    placeholder="Description goes here...."
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </FormControlstyle>
              </Grid>
            </Grid>
          </ActivityFormData>
        </>
      )}
    </ActivityTabInner>
  );
};
export default MeetingSchedule;
