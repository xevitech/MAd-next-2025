import * as React from "react";
import {
  ActivityFormData,
  ActivityInfoContainer,
  ActivityInnerBox,
  ActivityTabData,
  ActivityTabInner,
  ActivityTabLeft,
  ActivityTabRight,
  ButtonContainer,
  CallfieldCombine,
  FormControlstyle,
  FormFieldContainer,
  IconHelping,
  InfoTitle,
  RadioButtonText2,
  ReminderHead,
  ReminderPopOver,
  ReminderStatus,
  RepaetHead,
  RepeatCoulumn,
  RepeatStatus,
  SwitchPopContent,
  SwitchPopContentRepeat,
  SwitchesBox,
  SwitchesPopup,
  TabsButtonStyle,
  TextFieldStyle,
  TextFieldTime,
  TextTextField,
  TypographyEnd,
} from "../style";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
  SwitchProps,
  Tab,
  TextField,
  TextareaAutosize,
  Typography,
  styled,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Image from "next/image";
import { CustomDatePicker } from "@/components/common/datePicker";
import { WeekScheduler } from "@/components/common/weekScheduler";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import Scheduler from "./Scheduler";
import { useSelector } from "react-redux";
import { OutLinedButton } from "../commonStyle";
import { useAppDispatch } from "redux/store";
import { setActivityType } from "@/hooks/UseCreateFormData";
import CallScheduler from "./CallScheduler";
import CalenderView from "./CalenderView";
import MeetingSchedule from "./MeetingSchedule";
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
const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

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
    box-shadow: 0px 2px 2px ${theme.palette.mode === "dark" ? grey[900] : grey[50]
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
const ActivityScheduler = () => {
  const [activeButton, setActiveButton] = React.useState(0);
  const [reminderToggle, setReminderToggle] = React.useState<any>("");
  const { activityType, details } = useSelector((state: any) => state.formList);

  const [value, setValue] = React.useState(String(activityType));
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [age, setAge] = React.useState("10");
  const handleChangeSelect = (event) => {
    setAge(event.target.value);
  };
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const dispatch = useAppDispatch();

  const handleClick = (event: any, type) => {
    setReminderToggle(type), setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setReminderToggle("");
    setAnchorEl(null);
  };

  const open = reminderToggle ? Boolean(anchorEl) : false;
  const id = open ? "simple-popover" : undefined;
  return (
    <ActivityInfoContainer>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <ActivityInnerBox>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={TabsButtonStyle}
              variant="scrollable"
              scrollButtons={false}
            >
              <Tab
                label="Task"
                icon={
                  <Image
                    src="/assets/images/crm/opentask.svg"
                    alt="Edit"
                    width={30}
                    height={16}
                  />
                }
                iconPosition="start"
                value={"1"}
              />
              <Tab
                label="Meeting"
                icon={
                  <Image
                    src="/assets/images/crm/meeting_icon_red.svg"
                    alt="Edit"
                    width={30}
                    height={16}
                  />
                }
                iconPosition="start"
                value="3"
              />
              <Tab
                label="call"
                icon={
                  <Image
                    src="/assets/images/crm/call_icon.svg"
                    alt="Edit"
                    width={30}
                    height={16}
                  />
                }
                iconPosition="start"
                value="2"
              />


            </TabList>
            <OutLinedButton
              className="ActivityViewtask"
              variant="outlined"
              onClick={() => dispatch(setActivityType(0))}
            >
              View Tasks
            </OutLinedButton>
          </ActivityInnerBox>
          <TabPanel value="1" sx={{ padding: 0 }}>
            <ActivityTabData>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <Scheduler />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CalenderView />
                </Grid>
              </Grid>
            </ActivityTabData>
          </TabPanel>
          <TabPanel value="2" sx={{ padding: 0 }}>
            <ActivityTabData>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <CallScheduler />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CalenderView />
                </Grid>
              </Grid>
            </ActivityTabData>
          </TabPanel>
          <TabPanel value="3" sx={{ padding: 0 }}>
            <ActivityTabData>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <ActivityTabLeft>
                    <MeetingSchedule />
                  </ActivityTabLeft>
                </Grid>
                <Grid item xs={12} md={6}>
                  <CalenderView />
                </Grid>
              </Grid>
            </ActivityTabData>
          </TabPanel>
        </TabContext>
      </Box>
    </ActivityInfoContainer>
  );
};
export default ActivityScheduler;
