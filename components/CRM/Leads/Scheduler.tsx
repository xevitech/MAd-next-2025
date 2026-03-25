import * as React from "react";
import {
  ActivityFormData,
  ActivityTabInner,
  ActivityTabLeft,
  FormControlstyle,
  FormFieldContainer,
  InfoTitle,
  ReminderHead,
  ReminderMessage,
  ReminderPopOver,
  ReminderStatus,
  SwitchPopContent,
  SwitchesBox,
  SwitchesPopup,
  TaskInfoBar,
  TaskInfoBtn,
  TextTextField,
} from "../style";
import {
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
  Autocomplete,
} from "@mui/material";
import Image from "next/image";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import {
  createHistory,
  createTaskAndSchedule,
  getAllListOfTasks,
  informationTaskMeetingCalls,
  setActivityType,
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
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import CommonOwner from "./CommonOwner";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import { apiClient } from "@/components/common/common";
import { useEffect } from "react";
import CommonDropDownList from "./CommonDropDownList";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
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
      color: "#fff !important",
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
    padding: 8px;
    border-radius:4px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
    width:100% !important;
    min-height:65px;
    max-height:100px;
    overflow-y:auto !important;
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

const Scheduler = () => {
  const dispatch = useAppDispatch();
  const {
    savedFieldData,
    saveLoader,
    typeId,
    selectedDataIds,
    userLists,
    details,
    typeName,
  } = useSelector((state: any) => state.formList);
  const { userEmail, id } = useSelector((state: any) => state.userData);
  const [subject, setSubject] = React.useState("");
  const [subjectError, setSubjectError] = React.useState(false);
  const [status, setStatus] = React.useState("defered");
  const [priority, setPriority] = React.useState("high");
  const [description, setDescription] = React.useState("");
  const [leadOwnerList, setLeadOwnerList] = React.useState([]);
  const [dataList, setDataList] = React.useState([]);
  const [filtersField, setFiltersFields] = React.useState([]);
  const [reminder, setReminder] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [relatedValue, setRelatedValue] = React.useState<any>("");
  const [checkSelect, setCheckSelect] = React.useState<any>("");
  const [dueDate, setDueDate] = React.useState(new Date());
  const [reminderDate, setReminderDate] = React.useState(new Date());
  const [timeAt, setTimeAt] = React.useState(null);
  const [reminderRadio, setReminderRadio] = React.useState(0);
  const [notificationType, setNotificationType] = React.useState("email");
  const [reminderType, setReminderType] = React.useState("days");
  const [reminderNumber, setReminderNumber] = React.useState("");
  const [selectedOwner, setSelectedOwner] = React.useState(null);
  const [beforeDueDate, setBeforeDueDate] = React.useState(
    moment(new Date()).format("ddd MMM DD YYYY HH:mm:ss")
  );
  let relatedTo = [
    { typeId: 1, typeName: "Lead" },
    { typeId: 2, typeName: "Deal" },
    { typeId: 3, typeName: "Accounts" },
    { typeId: 4, typeName: "Contact" },
  ];

  React.useEffect(() => {
    let leadOwners = [];
    savedFieldData?.data?.data?.map((ele) => {
      leadOwners.push({
        name: ele.First_Name + " " + ele.Last_Name,
        id: ele.unique_id,
      });
    });
    setLeadOwnerList(leadOwners);
    if (
      typeName == "Leads" ||
      typeName == "Contacts" ||
      typeName == "Accounts"
    ) {
      setCheckSelect(typeId);
    }
  }, [savedFieldData]);

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

  useEffect(() => {
    if (checkSelect !== "") {
      getRelatedList();
    }
  }, [checkSelect]);

  const handleClickReminder = (event: any) => {
    setReminder(!reminder);
    setAnchorEl(event.currentTarget);
    setTimeAt(moment(new Date()).format("ddd MMM DD YYYY HH:mm:ss"));
  };

  const handleCloseReminder = () => {
    setAnchorEl(null);
  };

  const handleCloseReminderPopUp = () => {
    setReminder(false)
    setAnchorEl(null);
    setTimeAt(false)
  }

  const openReminder = reminder ? Boolean(anchorEl) : false;
  const idReminder = openReminder ? "simple-popover" : undefined;
  const handleSubject = (event) => {
    if (event.target.value != "" || event.target.value != null) {
      setSubjectError(false);
    }
    setSubject(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangePriority = (event) => {
    setPriority(event.target.value);
  };

  const handleChangeSelect = (e) => {
    setCheckSelect(e?.target?.value);
  };
  const handleSelectRelated = (e) => {
    setRelatedValue(e);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
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
    if (subject == "" || subject == null) {
      setSubjectError(true);
    } else {
      setSubjectError(false);
      let reminder_date_time = "";
      let reminder_number = [];
      if (reminder == true && reminderRadio == 0) {
        reminder_date_time =
          moment(reminderDate).format("YYYY-MM-DD") +
          " " +
          moment(timeAt).format("HH:mm");
        // .format('YYYY-MM-DD HH:mm')
      } else if (reminder == true && reminderRadio == 1) {
        reminder_date_time =
          moment(dueDate)
            .add(reminderNumber, reminderType == "week" ? "week" : "days")
            .format("YYYY-MM-DD") +
          " " +
          moment(beforeDueDate).format("HH:mm");
        reminder_number = [
          {
            type: reminderType,
            value: reminderNumber,
            time: moment(beforeDueDate).format("HH:mm"),
          },
        ];
      } else {
        reminder_date_time = "";
        reminder_number = [];
      }
      let unique_id = `${
        typeId == 5
          ? relatedValue?.unique_id
          : Array.isArray(selectedDataIds) == true &&
            selectedDataIds?.length > 0
          ? selectedDataIds?.join(",")
          : details?.unique_id
      }`;

      let body = {
        unique_id: unique_id,
        type_id: 5,
        crm_user_form_unique_id:
          relatedValue?.crm_user_form_unique_id == undefined
            ? details?.crm_user_form_unique_id
            : relatedValue?.crm_user_form_unique_id,
        task_owner: selectedOwner?.id
          ? selectedOwner?.id
          : JSON.parse(localStorage.getItem("userData"))?.id,
        task_owner_email: selectedOwner?.email
          ? selectedOwner?.email
          : JSON.parse(localStorage.getItem("userData"))?.email,
        subject: subject,
        status: status,
        priority: priority,
        task_date: moment(dueDate).format("YYYY-MM-D"),
        description: description,
        related_with_value: getRelatedValue(checkSelect),
        related_with: checkSelect,
        reminder_date_time: reminder_date_time,
        reminder_number:
          reminder_number?.length > 0 ? JSON.stringify(reminder_number) : "",
        reminder_status: reminder ? "on" : "off",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        // reminder_date:
        //   reminder == true && reminderRadio == 0
        //     ? moment(dueDate).format("YYYY-MM-D")
        //     : "",
        // reminder_time:
        //   reminder == true && reminderRadio == 0
        //     ? moment(timeAt).format("hh:mm A")
        //     : "",
        reminder_type: reminder == true ? notificationType : "",
        // reminder_before_number: reminderRadio == 1 ? reminderNumber : "",
        // reminder_due_time:
        //   reminderRadio == 1 ? moment(beforeDueDate).format("hh:mm A") : "",
        // notify_on: reminder == true ? notificationType : "",
      };

      let response = await dispatch(createTaskAndSchedule(body));
      if (response?.payload?.status == 200) {
        if (
          typeName == "Tasks" ||
          typeName == "Meetings" ||
          typeName == "Calls"
        ) {
          dispatch(informationTaskMeetingCalls());
        } else {
          if (selectedDataIds?.length == 0) {
            dispatch(getAllListOfTasks());
            dispatch(
              createHistory({
                lead_id:
                  Array.isArray(selectedDataIds) == true &&
                  selectedDataIds?.length > 0
                    ? selectedDataIds.join(",")
                    : details?.unique_id,
                name: "Activity",
                type: "activity",
                type_id: typeId,
                message: `<span>Activity Created - task <b>${subject}</b>scheduled at <b>${moment(
                  dueDate
                ).format("YYYY-MM-D")}</b> `,
              })
            );
          } else {
            selectedDataIds?.map((ele) => {
              dispatch(
                createHistory({
                  lead_id: ele,
                  name: "Activity",
                  type: "activity",
                  type_id: typeId,
                  message: `<span>Activity Created - task <b>${subject}</b>scheduled at <b>${moment(
                    dueDate
                  ).format("YYYY-MM-D")}</b> `,
                })
              );
            });
          }
        }
        dispatch(setActivityType(""));
        toast.success(response?.payload?.message);
        handleCloseColumn();
      }
    }
  };

  const handleCloseColumn = () => {
    dispatch(setActivityType(""));
    dispatch(setTaskPopUp(false));
  };

  const handleChangeDateTime = (newValue) => {
    setTimeAt(newValue);
  };

  const handleRadioOnChange = (value) => {
    setReminderRadio(value);
  };

  const handleDummyChange = (newValue: any) => {
    setDueDate(newValue?.format("YYYY-MM-D"));
  };

  const handleReminderDate = (newValue: any) => {
    setReminderDate(newValue?.format("YYYY-MM-D"));
  };

  const handleChangeNotification = (event) => {
    setNotificationType(event.target.value);
  };

  const handleChangeReminderType = (event) => {
    setReminderType(event.target.value);
  };

  const handleChangeReminderNumber = (event) => {
    setReminderNumber(event.target.value);
  };

  const handleChangeDateTimeBeforeDueDate = (newValue) => {
    setBeforeDueDate(newValue);
  };

  const numberOfMenus = [];
  const totalLimit = reminderType == "days" ? 30 : 4;
  for (let i = 1; i <= totalLimit; i++) {
    numberOfMenus.push(i);
  }

  return (
    <ActivityTabLeft>
      <ActivityTabInner>
        <TaskInfoBar>
          <InfoTitle>Task Information</InfoTitle>
          <TaskInfoBtn>
            <SmallRedOutineBtn
              variant="outlined"
              autoFocus
              onClick={handleSaveFilterData}
            >
              {saveLoader ? (
                <ThreeDots
                  height="40"
                  width="40"
                  radius="9"
                  color="#fff"
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
          </TaskInfoBtn>
        </TaskInfoBar>
        <ActivityFormData>
          <Grid container spacing={1}></Grid>
        </ActivityFormData>
        <ActivityFormData>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <FormControlstyle variant="standard">
                <CommonOwner
                  defaultOwner={userLists?.find(
                    (item) => item?.email == userEmail
                  )}
                  updateValue={(newValue) => {
                    setSelectedOwner(newValue);
                  }}
                  label={"Task Owner"}
                  onClose={() => {
                    setSelectedOwner(null);
                  }}
                  userLists={userLists}
                />
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
                  Subject
                </InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  placeholder="subject "
                  startAdornment={
                    <InputAdornment position="start"></InputAdornment>
                  }
                  value={subject}
                  error={subjectError ? true : false}
                  onChange={(e) => handleSubject(e)}
                />
                {subjectError && (
                  <FormHelperText id="my-helper-text">
                    Please enter subject.
                  </FormHelperText>
                )}
              </FormControlstyle>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <FormControlstyle>
                    <InputLabel htmlFor="input-with-icon-adornment">
                      <Image
                        src="/assets/images/crm/status_icon.svg"
                        alt="Image"
                        width={16}
                        height={18}
                      />
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="input-with-icon-adornment"
                      value={status}
                      label="Status"
                      onChange={(e) => handleChangeStatus(e)}
                      IconComponent={KeyboardArrowDownOutlinedIcon}
                      startAdornment={
                        <InputAdornment position="start"></InputAdornment>
                      }
                    >
                      <MenuItem value={"defered"}>Defered</MenuItem>
                      <MenuItem value={"in-progress"}>In Progress</MenuItem>
                      <MenuItem value={"completed"}>Completed</MenuItem>
                      <MenuItem value={"wait-for-someone"}>
                        Waiting on someone else
                      </MenuItem>
                    </Select>
                  </FormControlstyle>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlstyle>
                    <InputLabel htmlFor="input-with-icon-adornment">
                      <Image
                        src="/assets/images/crm/priority_icon.svg"
                        alt="Image"
                        width={14}
                        height={16}
                      />
                      Priority
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="input-with-icon-adornment"
                      value={priority}
                      label="Task Priority"
                      onChange={(e) => handleChangePriority(e)}
                      IconComponent={KeyboardArrowDownOutlinedIcon}
                      startAdornment={
                        <InputAdornment position="start"></InputAdornment>
                      }
                    >
                      <MenuItem value={"high"}>
                        <span
                          className="flagstyle"
                          style={{ color: "#d7282f" }}
                        >
                          <FlagOutlinedIcon />
                        </span>
                        High
                      </MenuItem>
                      <MenuItem value={"lowest"}>
                        <span className="flagstyle" style={{ color: "#999" }}>
                          <FlagOutlinedIcon />
                        </span>
                        Lowest
                      </MenuItem>
                      <MenuItem value={"low"}>
                        <span
                          className="flagstyle"
                          style={{ color: "#6666c4" }}
                        >
                          <FlagOutlinedIcon />
                        </span>
                        Low
                      </MenuItem>
                      <MenuItem value={"normal"}>
                        <span className="flagstyle" style={{ color: "orange" }}>
                          <FlagOutlinedIcon />
                        </span>
                        Normal
                      </MenuItem>
                    </Select>
                  </FormControlstyle>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <FormControlstyle variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      <Image
                        src="/assets/images/crm/calender_grey.svg"
                        alt="Image"
                        width={12}
                        height={16}
                      />
                      Due Date
                    </InputLabel>
                    <FormFieldContainer fullWidth className="Duedate_column">
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                          format="YYYY-MM-DD"
                          //  label={'Due Date'}
                          value={moment(dueDate)}
                          minDate={moment(new Date())}
                          // disabled={reminderRadio != 0 && true}
                          onChange={handleDummyChange}
                          slotProps={{
                            textField: {
                              variant: "outlined",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </FormFieldContainer>
                  </FormControlstyle>
                </Grid>
              </Grid>
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
                  onChange={(e) => handleChangeDescription(e)}
                />
              </FormControlstyle>
            </Grid>
            {typeName == "Tasks" && (
              <Grid item xs={12} md={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <FormControlstyle variant="standard">
                      <InputLabel htmlFor="input-with-icon-adornment">
                        {/* <Image
                          style={{ margin: "0 -5px 0 5px" }}
                          src="/assets/images/crm/contact_icon.svg"
                          alt="Image"
                          width={30}
                          height={16}
                        /> */}
                        <Image
                          style={{ margin: "0 -5px 0 5px" }}
                          src="/assets/images/crm/relatedto_icon.svg"
                          alt="Image"
                          width={30}
                          height={16}
                        />
                        Related to
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="input-with-icon-adornment"
                        value={
                          relatedTo?.find(
                            (item: any) => item?.typeId == checkSelect
                          )?.typeName
                        }
                        label="Related To"
                        onChange={(e: any) => handleChangeSelect(e)}
                        IconComponent={KeyboardArrowDownOutlinedIcon}
                        startAdornment={
                          <InputAdornment position="start"></InputAdornment>
                        }
                      >
                        {relatedTo?.map((item) => (
                          <MenuItem value={item?.typeId}>
                            {item?.typeName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControlstyle>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlstyle variant="standard">
                      <InputLabel htmlFor="input-with-icon-adornment">
                        <Image
                          src="/assets/images/crm/form4.svg"
                          alt="Image"
                          width={15}
                          height={16}
                        />
                        {relatedTo?.find(
                          (item: any) => item?.typeId == checkSelect
                        )?.typeName || "Select Related to"}
                      </InputLabel>
                      <Autocomplete
                        className="schdulerautocomplete"
                        popupIcon={<KeyboardArrowDownOutlinedIcon />}
                        id="country-select-demo"
                        // sx={{ width: 300 }}
                        options={dataList}
                        // size="small"
                        value={
                          dataList?.find(
                            (ele) => ele?.id == relatedValue?.id
                          ) || null
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
                          <CommonDropDownList
                            option={option}
                            newPro={props}
                            checkSelect={checkSelect}
                          />
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
                </Grid>
              </Grid>
            )}
            <Grid item xs={12} md={12}>
              <SwitchesBox>
                <ReminderStatus>
                  <FormGroup>
                    <FormControlLabel
                      onClick={(e) => handleClickReminder(e)}
                      control={
                        <IOSSwitch
                          sx={{ m: 1 }}
                          checked={reminder ? true : false}
                        />
                      }
                      label="Set Reminder"
                    />
                  </FormGroup>
                </ReminderStatus>
                <div>
                  {reminder && (
                    <ReminderPopOver
                      id={idReminder}
                      open={openReminder}
                      anchorEl={anchorEl}
                      // onClose={handleCloseReminder}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <SwitchesPopup>
                        <ReminderHead>
                          <Typography>Reminder</Typography>
                          <CloseOutlinedIcon onClick={handleCloseReminderPopUp} />
                        </ReminderHead>
                        <SwitchPopContent>
                          <FormControl>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              defaultValue="female"
                              name="radio-buttons-group"
                            >
                              <Grid container spacing={2}>
                                <Grid item md={12}>
                                  <Grid container spacing={1}>
                                    <Grid item xs={12} sm={6} md={6}>
                                      <TextTextField>
                                        <FormControlLabel
                                          value={reminderRadio}
                                          label={reminderRadio}
                                          control={
                                            <Radio
                                              checked={
                                                reminderRadio == 0 && true
                                              }
                                            />
                                          }
                                          onChange={() =>
                                            handleRadioOnChange(0)
                                          }
                                        />

                                        <FormFieldContainer fullWidth>
                                          <LocalizationProvider
                                            dateAdapter={AdapterMoment}
                                          >
                                            <DesktopDatePicker
                                              format="YYYY-MM-DD"
                                              value={moment(reminderDate)}
                                              maxDate={moment(dueDate)}
                                              minDate={moment(new Date())}
                                              disabled={
                                                reminderRadio != 0 && true
                                              }
                                              onChange={handleReminderDate}
                                              slotProps={{
                                                textField: {
                                                  variant: "outlined",
                                                },
                                              }}
                                            />
                                          </LocalizationProvider>
                                        </FormFieldContainer>
                                      </TextTextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                      <TextTextField>
                                        <Typography>At</Typography>
                                        <LocalizationProvider
                                          dateAdapter={AdapterMoment}
                                        >
                                          <MobileTimePicker
                                            value={moment(timeAt)}
                                            onChange={handleChangeDateTime}
                                            minTime={moment(new Date())}
                                            disabled={
                                              reminderRadio != 0 && true
                                            }
                                            slotProps={{
                                              textField: {
                                                variant: "outlined",
                                              },
                                            }}
                                          />
                                        </LocalizationProvider>
                                      </TextTextField>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item md={12}>
                                  <Grid container spacing={1}>
                                    <Grid item xs={12} sm={6} md={6}>
                                      <TextTextField>
                                        <FormControlLabel
                                          value={reminderRadio}
                                          control={
                                            <Radio
                                              checked={
                                                reminderRadio == 1 && true
                                              }
                                            />
                                          }
                                          label={reminderRadio}
                                          onChange={() =>
                                            handleRadioOnChange(1)
                                          }
                                        />

                                        <Grid container spacing={1}>
                                          <Grid item xs={12} sm={6} md={6}>
                                            <FormFieldContainer fullWidth>
                                              <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={reminderType}
                                                onChange={
                                                  handleChangeReminderType
                                                }
                                                IconComponent={
                                                  KeyboardArrowDownOutlinedIcon
                                                }
                                                disabled={
                                                  reminderRadio == 0 && true
                                                }
                                              >
                                                <MenuItem value={"days"}>
                                                  {" "}
                                                  Day's
                                                </MenuItem>
                                                <MenuItem value={"week"}>
                                                  {" "}
                                                  Week's{" "}
                                                </MenuItem>
                                              </Select>
                                            </FormFieldContainer>
                                          </Grid>
                                          <Grid item xs={12} sm={6} md={6}>
                                            <FormFieldContainer fullWidth>
                                              <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={reminderNumber}
                                                defaultValue="No."
                                                onChange={
                                                  handleChangeReminderNumber
                                                }
                                                IconComponent={
                                                  KeyboardArrowDownOutlinedIcon
                                                }
                                                disabled={
                                                  reminderRadio == 0 && true
                                                }
                                              >
                                                <MenuItem value={""}>
                                                  No.
                                                </MenuItem>
                                                {numberOfMenus?.map(
                                                  (number) => (
                                                    <MenuItem value={number}>
                                                      {number}
                                                    </MenuItem>
                                                  )
                                                )}
                                              </Select>
                                            </FormFieldContainer>
                                          </Grid>
                                        </Grid>
                                      </TextTextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                      <TextTextField>
                                        <Typography>
                                          Before of Due Date at
                                        </Typography>
                                        <LocalizationProvider
                                          dateAdapter={AdapterMoment}
                                        >
                                          <MobileTimePicker
                                            value={moment(beforeDueDate)}
                                            onChange={
                                              handleChangeDateTimeBeforeDueDate
                                            }
                                            disabled={
                                              reminderRadio == 0 && true
                                            }
                                            slotProps={{
                                              textField: {
                                                variant: "outlined",
                                              },
                                            }}
                                          />
                                        </LocalizationProvider>
                                      </TextTextField>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                  <Grid
                                    container
                                    spacing={1}
                                    style={{ paddingLeft: "15px" }}
                                  >
                                    <Grid item xs={10} sm={10} md={10}>
                                      <FormFieldContainer fullWidth>
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          value={notificationType}
                                          onChange={(e) =>
                                            handleChangeNotification(e)
                                          }
                                          IconComponent={
                                            KeyboardArrowDownOutlinedIcon
                                          }
                                        >
                                          {/* <MenuItem value={"0"}>
                                            Notify
                                          </MenuItem> */}
                                          <MenuItem value={"email"}>
                                            Email
                                          </MenuItem>
                                          <MenuItem value={"popup"}>
                                            Popup
                                          </MenuItem>
                                          <MenuItem value={"both"}>
                                            Both
                                          </MenuItem>
                                        </Select>
                                      </FormFieldContainer>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={2}
                                      sm={2}
                                      md={2}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <SmallOutineBtn
                                        variant="outlined"
                                        autoFocus
                                        onClick={handleCloseReminder}
                                      >
                                        Done
                                      </SmallOutineBtn>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </RadioGroup>
                          </FormControl>
                        </SwitchPopContent>
                      </SwitchesPopup>
                    </ReminderPopOver>
                  )}

                  {reminder && reminderRadio == 0 && timeAt != null && (
                    <ReminderMessage>
                      Remind me on{" "}
                      <b>
                        {moment(reminderDate).format("ddd DD MMM YYYY")} at{" "}
                        {moment(timeAt).format("hh:mm A")}
                      </b>{" "}
                      by{" "}
                      {notificationType == "both"
                        ? "email and popup"
                        : notificationType}
                    </ReminderMessage>
                  )}
                  {reminder && reminderRadio == 1 && timeAt != null && (
                    <ReminderMessage>
                      Remind me before {reminderNumber} {reminderType} from{" "}
                      <b>
                        {moment(dueDate).format("ddd DD MMM YYYY")}{" "}
                        {moment(timeAt).format("hh:mm A")}
                      </b>{" "}
                      by{" "}
                      {notificationType == "both"
                        ? "email and popup"
                        : notificationType}
                    </ReminderMessage>
                  )}
                </div>
              </SwitchesBox>
            </Grid>
          </Grid>
        </ActivityFormData>
      </ActivityTabInner>
    </ActivityTabLeft>
  );
};
export default Scheduler;
