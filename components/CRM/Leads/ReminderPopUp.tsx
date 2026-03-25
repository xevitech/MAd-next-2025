import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import Slide, { SlideProps } from "@mui/material/Slide";
import Grow, { GrowProps } from "@mui/material/Grow";
import { TransitionProps } from "@mui/material/transitions";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import {
  CheckTextInner,
  DismissBtn,
  NoReminderFound,
  ReminderContainer,
  ReminderContent,
  ReminderHeader,
  ReminderHeading,
  ReminderInnerScroll,
  ReminderListText,
  ReminderPopSnackbar,
  ReminderPopupConatiner,
} from "../commonStyle";
import { apiClient, getUniqueListBy } from "@/components/common/common";
import Checkbox from "@mui/material/Checkbox";
import { Box, Fab, FormControlLabel, FormGroup, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import MinimizeRoundedIcon from "@mui/icons-material/MinimizeRounded";
import _ from "lodash";
import { toast } from "react-toastify";
import moment from "moment";
import ReminderSkelton from "../Skeletons/ReminderSkelton";
function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

function GrowTransition(props: GrowProps) {
  return <Grow {...props} />;
}

export default function ReminderPopUp() {
  const [showSkelton, setshowSkelton] = React.useState<any>(false);
  const [checkedReminder, setCheckedReminder] = React.useState<any>([]);
  const [currentDateTasks, setCurrentDate] = React.useState<any>([]);
  const [previousDateTasks, setpreviousDate] = React.useState<any>([]);
  const router = useRouter();
  const [state, setState] = React.useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    Transition: Fade,
  });
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const handleClick =
    (
      Transition: React.ComponentType<
        TransitionProps & {
          children: React.ReactElement<any, any>;
        }
      >
    ) =>
      () => {
        setState({
          open: true,
          Transition,
        });
        let status = 1;
        localStorage.setItem("reminder", status?.toString());
      };

  const getAllReminder = async () => {
    setshowSkelton(true);
    let response = await apiClient(`crm/reminder/index`, "get");
    if (response?.status == 200 || response?.status == true) {
      setshowSkelton(false);
      // const sortedData = _.sortBy(response?.data?.task?.data, function (dateObj) {
      //   return dateObj.reminder_date_time;
      // });
      const previousMeetings = response?.data?.task?.data.filter((task: any) => {
        if (task.reminder_date_time) {
          const currentDate = moment();
          const reminderDate = moment(task.reminder_date_time);
          return reminderDate.isSameOrBefore(currentDate.subtract(1, 'days'), 'day');
        }
        return false;
      });
      setpreviousDate(previousMeetings)

      const todaysMeetings = response?.data?.task?.data.filter((task: any) => {
        if (task.reminder_date_time) {
          const currentDate = moment();
          const reminderDate = moment(task.reminder_date_time);
          return reminderDate.isSame(currentDate, 'day');
        }
        return false;
      });
      setCurrentDate(todaysMeetings);
    };
  }

  React.useEffect(() => {
    getAllReminder();
  }, [])

  const handleDismiss = async (item: any, type) => {
    const response = await apiClient(`crm/reminder/dismiss-reminder`, "post", {
      body: type == "single" ? [{
        id: item?.id,
        type_id: item?.type_id
      }] : checkedReminder,
    }
    );
    if (response?.status == 200 || response?.status == true) {
      toast.success(response?.message)
      setCheckedReminder([]);
      getAllReminder()
    }
  }

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
    let status = 0;
    localStorage.setItem("reminder", status?.toString());
  };

  const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    "& > :not(style) ~ :not(style)": {
      marginTop: theme.spacing(2),
    },
  }));

  const [isActive, setIsActive] = React.useState("");

  const handleClickC = (id: any) => {
    setIsActive(id);
  };

  React.useEffect(() => {
    setState({
      ...state,
      open: localStorage.getItem('reminder') == '1' ? true : false,
    });
  }, [])

  const handleCheck = (e, item) => {
    if (e?.target?.checked) {
      setCheckedReminder([...checkedReminder, { id: item?.id, type_id: item?.type_id }])
    } else {
      setCheckedReminder(checkedReminder?.filter((ele: any) => ele?.id !== item?.id))
    }
  }

  return (
    <ReminderContainer>
      <Fab
        size="small"
        className="fabreminder"
        color="secondary"
        aria-label="add"
        onClick={handleClick(SlideTransition)}
      >
        <img src="/assets/images/crm/reminder.svg" alt="Image" />
        <Typography className="remindercount">{currentDateTasks.length + previousDateTasks.length}</Typography>
      </Fab>
      <ReminderPopSnackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={state.open}
        // onClose={handleClose}
        TransitionComponent={state.Transition}
        message={
          <ReminderPopupConatiner>
            <ReminderHeader>
              <ReminderHeading>
                <img src="/assets/images/crm/reminder.svg" alt="Image" />
                <Typography>Reminders ({currentDateTasks.length + previousDateTasks.length})</Typography>
              </ReminderHeading>
              <IconButton
                aria-label="close"
                color="inherit"
                sx={{ p: 0.5 }}
                onClick={handleClose}
              >
                <MinimizeRoundedIcon />
              </IconButton>
            </ReminderHeader>
            {showSkelton ? <ReminderSkelton /> :
              <ReminderContent>
                <Root>
                  {checkedReminder?.length > 0 && <ReminderListText>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={11} md={11}>
                        <CheckTextInner>
                          <FormGroup >
                            {/* <FormControlLabel control={<Checkbox checked={checkedReminder?.length > 0 ? true : false} />} label="All" /> */}
                            <Box style={{ display: "flex", alignItems: "center" }}>
                              <Checkbox {...label} checked={checkedReminder?.length > 0 ? true : false} />
                              <Typography variant="h4" className="reminderheading">
                                All
                              </Typography>
                            </Box>
                          </FormGroup>
                        </CheckTextInner>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={1} md={1}>
                      <DismissBtn className="" onClick={() => handleDismiss(null, "")}>
                        <Button variant="contained">Dismiss</Button>
                      </DismissBtn>
                    </Grid>
                  </ReminderListText>}
                  {currentDateTasks.length == 0 && previousDateTasks.length == 0 && <NoReminderFound>
                    <Typography>No Activity Reminders found.</Typography>
                  </NoReminderFound>}
                 {currentDateTasks?.length > 0 &&   <Divider textAlign="left" style={{ margin: 0 }}>
                    <Typography>Today</Typography>
                  </Divider>}
                </Root>
                <ReminderInnerScroll>
                 
                  {currentDateTasks?.length > 0 && currentDateTasks?.map((item: any) => <ReminderListText
                    className={isActive == item?.id ? "active" : ""}
                  >
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={11} md={11}>
                        <CheckTextInner onClick={() => handleClickC(item?.id)}>
                          <Box>
                            <Checkbox {...label} onChange={(e) => handleCheck(e, item)} />
                          </Box>
                          <Box >
                            <Typography variant="h4" className="reminderheading" onClick={() => router?.push(`/crm/tasks/${item?.id}`)}>
                              {item?.subject}
                            </Typography>
                            <Typography variant="body1" className="reminderinfo">
                              {moment(item?.reminder_date_time).format('MMM DD hh:mm A') +
                                ' - ' +
                                moment(item?.reminder_date_time).add(30, 'minutes').format('hh:mm A')}
                            </Typography>
                            <div className="showcontent">
                              <Typography variant="body1" className="reminderinfo">
                                {item?.subject ? `Subject - ${item?.subject}` : ""}
                              </Typography>
                              <Typography variant="body1" className="reminderinfo">
                                {item?.status ? `Status - ${item?.status.replace("-", " ")}` : ""}
                              </Typography>
                            </div>
                          </Box>
                        </CheckTextInner>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={1} md={1}>
                      <DismissBtn className="dismissbtn" onClick={() => handleDismiss(item, "single")}>
                        <Button variant="contained">Dismiss</Button>
                      </DismissBtn>
                    </Grid>
                  </ReminderListText>)}
                  {previousDateTasks?.length > 0 && <><Root>
                    <Divider textAlign="left">
                      <Typography>{moment(previousDateTasks[0]?.reminder_date_time).format('DD MMM')}</Typography>
                    </Divider>
                  </Root>
                    {previousDateTasks?.map((item: any) => <ReminderListText
                      className={isActive == item?.id ? "active" : ""}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={11} md={11}>
                          <CheckTextInner onClick={() => handleClickC(item?.id)}>
                            <Box>
                              <Checkbox {...label} onChange={(e) => handleCheck(e, item)} />
                            </Box>
                            <Box >
                              <Typography variant="h4" className="reminderheading" onClick={() => router?.push(`/crm/tasks/${item?.id}`)}>
                                {item?.subject}
                              </Typography>
                              <Typography variant="body1" className="reminderinfo">
                                {moment(item?.reminder_date_time).format('MMM DD hh:mm A') +
                                  ' - ' +
                                  moment(item?.reminder_date_time).add(30, 'minutes').format('hh:mm A')}
                              </Typography>
                              <div className="showcontent">
                                <Typography variant="body1" className="reminderinfo">
                                  {item?.subject ? `Subject - ${item?.subject}` : ""}
                                </Typography>
                                <Typography variant="body1" className="reminderinfo">
                                  {item?.status ? `Status - ${item?.status.replace("-", " ")}` : ""}
                                </Typography>
                              </div>
                            </Box>
                          </CheckTextInner>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={1} md={1}>
                        <DismissBtn className="dismissbtn" onClick={() => handleDismiss(item, "single")}>
                          <Button variant="contained">Dismiss</Button>
                        </DismissBtn>
                      </Grid>
                    </ReminderListText>)} </>}
                </ReminderInnerScroll>
              </ReminderContent>}

          </ReminderPopupConatiner>}
        key={state.Transition.name}
      // action={
      //   <React.Fragment>
      //     <Button color="secondary" size="small" onClick={handleClose}>
      //       UNDO
      //     </Button>
      //     <IconButton
      //       aria-label="close"
      //       color="inherit"
      //       sx={{ p: 0.5 }}
      //       onClick={handleClose}
      //     >
      //       <CloseIcon />
      //     </IconButton>
      //   </React.Fragment>
      // }
      />
    </ReminderContainer>
  );
}
