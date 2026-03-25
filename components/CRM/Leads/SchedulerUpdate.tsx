import * as React from "react";
import {
  ActivityFormData,
  ActivityTabInner,
  ActivityTabLeft,
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
} from "../style";
import {
  Avatar,
  Box,
  Checkbox,
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
  OutlinedInput,
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
  createTaskAndSchedule,
  getAllListOfTasks,
  getDetailOfSingleTasks,
  setActivityType,
  setActivityViewType,
  setSingleActivity,
  setTaskPopUp,
} from "@/hooks/UseCreateFormData";
import { SmallOutineBtn } from "../commonStyle";
import { ThreeDots } from "react-loader-spinner";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import moment from "moment";
import { toast } from "react-toastify";
import CommonOwner from "./CommonOwner";
import TaskUpdateSkeleton from "../Skeletons/TaskUpdateSkeleton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#57874B",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
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
    width: 22,
    height: 22,
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
    max-height:130px;
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

const SchedulerUpdate = () => {
  const dispatch = useAppDispatch();
  const {
    savedFieldData,
    saveLoader,
    typeId,
    selectedDataIds,
    userLists,
    details,
    singleActivity,
    singleActivityLoader,
  } = useSelector((state: any) => state.formList);
  const [subject, setSubject] = React.useState("");
  const [subjectError, setSubjectError] = React.useState(false);
  const [status, setStatus] = React.useState("Defered");
  const [priority, setPriority] = React.useState("High");
  const [description, setDescription] = React.useState("");
  const [leadOwnerList, setLeadOwnerList] = React.useState([]);
  const [reminder, setReminder] = React.useState(false);
  const [dueDate, setDueDate] = React.useState(new Date());
  const [timeAt, setTimeAt] = React.useState(null);
  const [reminderRadio, setReminderRadio] = React.useState(0);
  const [notificationType, setNotificationType] = React.useState("email");
  const [reminderType, setReminderType] = React.useState("days");
  const [reminderNumber, setReminderNumber] = React.useState("");
  const [selectedOwner, setSelectedOwner] = React.useState(null);
  const [reminderDate, setReminderDate] = React.useState(new Date());
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [beforeDueDate, setBeforeDueDate] = React.useState(
    moment(new Date()).format("ddd MMM DD YYYY HH:mm:ss")
  );

  React.useEffect(() => {
    let leadOwners = [];
    savedFieldData?.data?.data?.map((ele) => {
      leadOwners.push({
        name: ele.First_Name + " " + ele.Last_Name,
        id: ele.unique_id,
      });
    });
    setLeadOwnerList(leadOwners);
  }, [savedFieldData]);

  React.useEffect(() => {
    if (!singleActivityLoader) {
      setSubject(singleActivity?.subject);
      setStatus(singleActivity?.status);
      setPriority(singleActivity?.priority);
      setDueDate(singleActivity?.task_date);
      setDescription(singleActivity?.description);
      setReminder(
        singleActivity?.reminder_status == "off" ||
          singleActivity?.reminder_status == undefined
          ? false
          : true
      );

      setReminderRadio(
        singleActivity?.reminder_number == null ||
          singleActivity?.reminder_number == ""
          ? 0
          : 1
      );

      setNotificationType(singleActivity?.reminder_type);
      setReminderDate(singleActivity?.reminder_date_time);
      setTimeAt(singleActivity?.reminder_date_time);

      setReminderType(
        singleActivity?.reminder_number
          ? JSON.parse(singleActivity?.reminder_number)?.[0]?.type
          : "days"
      );
      setReminderNumber(
        singleActivity?.reminder_number
          ? JSON.parse(singleActivity?.reminder_number)?.[0]?.value
          : ""
      );
      setBeforeDueDate(
        singleActivity?.reminder_number
          ? singleActivity?.reminder_date_time
          : moment(new Date()).format("ddd MMM DD YYYY HH:mm:ss")
      );
      setSelectedOwner(singleActivity?.owner);
    }
  }, [singleActivity]);

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

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleReminderDate = (newValue: any) => {
    setReminderDate(newValue?.format("YYYY-MM-D"));
  };


  const handleUpdateFilterData = async () => {
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
            .subtract(reminderNumber, reminderType == "week" ? "week" : "days")
            .format("YYYY-MM-DD") +
          " " +
          moment(beforeDueDate).format("HH:mm");
        reminder_number = [{
          type: reminderType,
          value: reminderNumber,
          time: moment(beforeDueDate).format("HH:mm"),
        }];
      } else {
        reminder_date_time = "";
        reminder_number = [];
      }
      let body = {
        id: singleActivity?.id,
        unique_id: singleActivity?.unique_id,
        task_owner: selectedOwner?.id
          ? selectedOwner?.id
          : singleActivity?.task_owner,
        task_owner_email: selectedOwner?.email
          ? selectedOwner?.email
          : singleActivity?.task_owner_email,
        subject: subject,
        status: status,
        priority: priority,
        task_date: moment(dueDate).format("YYYY-MM-D"),
        description: description,
        reminder_date_time: reminder_date_time,
        reminder_number: reminder_number?.length > 0 ? JSON.stringify(reminder_number) : '',
        reminder_status: reminder ? "on" : "off",
        reminder_type: reminder == true ? notificationType : "",

        // reminder: reminder ? "on" : "off",
        // reminder_date:
        //   reminder == true && reminderRadio == 0
        //     ? moment(dueDate).format("YYYY-MM-D")
        //     : "",
        // reminder_time:
        //   reminder == true && reminderRadio == 0
        //     ? moment(timeAt).format("hh:mm A")
        //     : "",
        // reminder_type: reminderRadio == 1 ? reminderType : "",
        // reminder_before_number: reminderRadio == 1 ? reminderNumber : "",
        // reminder_due_time:
        //   reminderRadio == 1 ? moment(beforeDueDate).format("hh:mm A") : "",
        // notify_on: reminder == true ? notificationType : "",
      };
// console.log(body,'bodybodybody');
      let response = await dispatch(createTaskAndSchedule(body));
      if (response?.payload?.status == 200) {
        dispatch(getAllListOfTasks());
        dispatch(
          createHistory({
            lead_id: details.unique_id,
            type_id: typeId,
            name: "Activity",
            type: "activity",
            message: `<span>Activity Updated - task <b>${subject}</b>scheduled at <b>${moment(
              dueDate
            ).format("YYYY-MM-D")}</b> `,
          })
        );
        dispatch(setActivityType(""));
        dispatch(setActivityViewType("add"));
        toast.success(response?.payload?.message);
        handleCloseColumn();
      }
    }
  };

  const handleCloseColumn = () => {
    dispatch(setActivityViewType("add"));
    dispatch(dispatch(setSingleActivity([])));
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

  return (
    <ActivityTabLeft>
      {singleActivityLoader ? (
        <TaskUpdateSkeleton />
      ) : (
        <ActivityTabInner>
          <TaskInfoBar>
            <InfoTitle>Task Information</InfoTitle>
            <TaskInfoBtn>
              <SmallOutineBtn
                variant="outlined"
                autoFocus
                onClick={handleUpdateFilterData}
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
                  "Update"
                )}
              </SmallOutineBtn>
              <SmallOutineBtn variant="outlined" onClick={handleCloseColumn}>
                Cancel
              </SmallOutineBtn>
            </TaskInfoBtn>
          </TaskInfoBar>
          <ActivityFormData>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControlstyle variant="standard">
                  <CommonOwner
                    defaultOwner={selectedOwner}
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
                        <MenuItem value={"high"}>High</MenuItem>
                        <MenuItem value={"lowest"}>Lowest</MenuItem>
                        <MenuItem value={"low"}>Low</MenuItem>
                        <MenuItem value={"normal"}>Normal</MenuItem>
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
                            minDate={moment(dueDate)}
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

              <Grid item xs={12} md={6}>
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
                                      <Grid item md={6}>
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
                                      <Grid item md={6}>
                                        <TextTextField>
                                          <Typography>At</Typography>
                                          <LocalizationProvider
                                            dateAdapter={AdapterMoment}
                                          >
                                            <MobileTimePicker
                                              value={moment(timeAt)}
                                              onChange={handleChangeDateTime}
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
                                    <Grid container spacing={2}>
                                      <Grid item md={6}>
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
                                            <Grid item md={6}>
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
                                            <Grid item md={6}>
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
                                      <Grid item md={6}>
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
                                  <Grid item md={12}>
                                    <Grid
                                      container
                                      spacing={1}
                                      style={{ paddingLeft: "15px" }}
                                    >
                                      <Grid item md={8}>
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
                                            <MenuItem value={"0"}>
                                              Notify
                                            </MenuItem>
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
                                      <Grid item md={4}>
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
                    {reminder &&
                      reminderRadio == 1 &&
                      beforeDueDate != null && (
                        <ReminderMessage>
                          Remind me before {reminderNumber} {reminderType} from{" "}
                          <b>
                            {moment(dueDate).format("ddd DD MMM YYYY")}{" "}
                            {moment(beforeDueDate).format("hh:mm A")}
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
              {typeId != 1 && (
                <Grid item xs={12} md={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <FormControlstyle variant="standard">
                        <InputLabel htmlFor="input-with-icon-adornment">
                          <Image
                            style={{ margin: "0 -5px 0 5px" }}
                            src="/assets/images/crm/contact_icon.svg"
                            alt="Image"
                            width={30}
                            height={16}
                          />
                          Contact
                        </InputLabel>
                        <Input
                          id="input-with-icon-adornment"
                          placeholder="Contact"
                        />
                      </FormControlstyle>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControlstyle variant="standard">
                        <InputLabel htmlFor="input-with-icon-adornment">
                          <Image
                            src="/assets/images/crm/form4.svg"
                            alt="Image"
                            width={30}
                            height={16}
                          />
                          Accounts
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="input-with-icon-adornment"
                          value={""}
                          label="Lead Owner"
                          // onChange={handleChangeSelect}
                          IconComponent={KeyboardArrowDownOutlinedIcon}
                          startAdornment={
                            <InputAdornment position="start"></InputAdornment>
                          }
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControlstyle>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </ActivityFormData>
        </ActivityTabInner>
      )}
    </ActivityTabLeft>
  );
};
export default SchedulerUpdate;
