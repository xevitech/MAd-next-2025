import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  DealName,
  LeadDetailInner,
  LeadDetailOuter,
  LeadInfo,
  LeadTopBar,
  DetailRight,
  TabsStyleindicator,
  ButtonContainer,
  OutLinedButton,
  ExpandCollapseArrow,
  PersonDetailData,
  PersonDetalDrrawer,
  BackOption,
  BackNdPreOptions,
  AllTaskListingContainer,
  AllTaskListingWrapper,
  LinkText,
  OtherModeuleDetailOuter,
  OtherModuleDetailInner,
  ImageContainer,
  ImageLabelText,
  InfoContainer,
  OtherTaskStatus,
  OtherPeriority,
  OtherCommonDate,
  CardColumn,
  DividerStyle,
  RecordsButtonsRight,
  RecordsButtonsLeft,
  OtherTopBox,
  LinkButtomn,
  AllTaskListingOuter,
  TaskListCarousel,
  GridCommonItem,
} from "../style";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import LeadInformation from "./LeadInformation";
import EnquiryDetail from "./EnquiryDetail";
import Activities from "./LeadActivities";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LeadFiles from "./LeadFile";
import LeadEmails from "./LeadEmails";
import LeadNotes from "./LeadNotes";
import InvitedMeetings from "./InvitedMeetings";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import { CrmFullData, CrmInnerContent, CrmStyledMenu } from "../commonStyle";
import ScoringRules from "./ScoringRules";
import ConvertSingleLead from "./ConvertSingleLead";
import { useSelector } from "react-redux";
import { DetailDrawerBox } from "../View/style";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  setDetailsData,
  setActivityType,
  deleteLeadSavedData,
  setDetailActiveTab,
  setShowSkeltn,
  informationTaskMeetingCalls,
  updateEachTask,
  deleteTasks,
  getDetailOfSingleTasks,
  TaskMeetingCallsActivity,
  getAllActivityData,
  setSelectedActvityIds,
} from "@/hooks/UseCreateFormData";
import { useEffect, useState } from "react";
import { useAppDispatch } from "redux/store";
import { useRouter } from "next/router";
import { LicenseInfo } from "@mui/x-license-pro";
import History from "./History";
import CommonCRMTabs from "./CommonCRMTabs";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
/** Common file for these two components **/
import { OuterContainer } from "../../SellerTools/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { toast } from "react-toastify";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CommonHeader from "./CommonHeader";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import PersonDetailOther from "./PersonDetailOther";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import TaskInformation from "./TaskInformation";
import LeadLinks from "./LeadLinks";
import moment from "moment";
import LeadNotesOthers from "./LeadNotesOthers";
import LeadFileOthers from "./LeadFileOthers";
import MeetingInformation from "./MeetingInformation";
import CallInformation from "./CallInformation";
import HistoryOthers from "./HistoryOthers";
import ReminderPopUp from "./ReminderPopUp";
type Anchor = "top" | "left" | "bottom" | "right";

const DetailsOther = () => {
  const [deleteConfirmation, setDeleteConfirmation] = React.useState(false);
  const [expand, setExpand] = React.useState(false);
  const router = useRouter();
  const {
    typeName,
    details,
    detailsTab,
    taskMeetingCalls,
    singleActivity,
    typeId,
  } = useSelector((state: any) => state.formList);

  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: taskMeetingCalls?.data?.data?.length > 1 ? 4 : 1,
    arrows: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: taskMeetingCalls?.data?.data?.length > 1 ? 2 : 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        // settings: {
        //   slidesToShow: taskMeetingCalls?.data?.data?.length > 1 ? 2 : 1,
        //   slidesToScroll: 1,
        //   initialSlide: 1,
        // },
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      // {
      //   breakpoint: 480,
      //   settings: {
      //     slidesToShow: 1,
      //     slidesToScroll: 1,
      //     initialSlide: 1,
      //   },
      // },
    ],
  };
  const handleSelectTask = async (value: any) => {
    router.push(`${value?.id}`);
    await dispatch(TaskMeetingCallsActivity(value.id));
    typeId == 5 &&
      (await dispatch(getDetailOfSingleTasks({ id: value.id, type: "task" })));
    typeId == 6 &&
      (await dispatch(
        getDetailOfSingleTasks({ id: value.id, type: "meeting" })
      ));
    typeId == 7 &&
      (await dispatch(getDetailOfSingleTasks({ id: value.id, type: "call" })));
  };

  const handleDelete = async () => {
    try {
      const result = await dispatch(
        deleteTasks({
          id: router?.query?.id,
          type:
            typeName == "Tasks"
              ? "task"
              : typeName == "Calls"
                ? "calls"
                : "meetings",
        })
      );
      if (result?.payload?.status == 200 || result?.payload?.status == true) {
        router.back();
        toast.success(result?.payload?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const dispatch = useAppDispatch();

  const handleCloseTask = async () => {
    const payload = {
      status: "completed",
    };
    await dispatch(updateEachTask({ id: router?.query?.id, data: payload }));
    await dispatch(
      getDetailOfSingleTasks({ id: router?.query?.id, type: "task" })
    );
  };

  useEffect(() => {
    dispatch(informationTaskMeetingCalls());
    dispatch(getAllActivityData());
    dispatch(setSelectedActvityIds([]));
    dispatch(setDetailActiveTab(0));
  }, []);

  const [openLead, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === "keydown" &&
          ((event as React.KeyboardEvent).key === "Tab" ||
            (event as React.KeyboardEvent).key === "Shift")
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  const list = (anchor: Anchor) => (
    <Box
      // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <PersonDetailOther />
    </Box>
  );

  const renderTabsData = () => {
    switch (detailsTab) {
      case 0:
        return typeId == 5 ? (
          <TaskInformation />
        ) : typeId == 6 ? (
          <MeetingInformation />
        ) : (
          <CallInformation />
        );
      case 1:
        return <LeadNotesOthers />;
      case 2:
        return <LeadFileOthers />;
      case 3:
        return <LeadLinks />;
    }
  };

  const deleteLeads = async () => {
    let body = {
      unique_id: details?.unique_id,
      crm_user_form_unique_id: details?.crm_user_form_unique_id,
    };

    let response = await dispatch(deleteLeadSavedData(body));
    if (response?.payload?.status == 200) {
      toast.success(response?.payload?.message);
      setTimeout(() => {
        router.push(`/crm/${typeName.toLowerCase()}`);
      }, 3000);
    }
    setDeleteConfirmation(false);
  };
  return (
    <div className="full_page crm_pagelayout">
      <CrmFullData>
        <OuterContainer>
          <CommonHeader />
        </OuterContainer>
        <CrmInnerContent>
          {/* <DetailDrawerBox role="presentation"> */}

          <CommonCRMTabs activeButton={1} />
          {deleteConfirmation && (
            <DeleteDialog
              open={deleteConfirmation}
              handleClose={setDeleteConfirmation}
              text={typeName}
              onClickAction={deleteLeads}
            />
          )}
          <OtherModeuleDetailOuter>
            <AllTaskListingContainer>
              <OtherTopBox>
                <LinkButtomn onClick={() => router.push(`/crm/${typeName == "Tasks" ? "tasks" : typeName == "Meetings" ? "meetings" : "calls"}`)}>
                  <IconButton>
                    <ArrowBackIcon />
                  </IconButton>
                  <Link underline="hover">All {typeName}</Link>
                </LinkButtomn>
                <ButtonContainer>
                  {typeName == "Tasks" && (
                    <OutLinedButton
                      variant="outlined"
                      startIcon={
                        singleActivity?.status !== "completed" && (
                          <CancelOutlinedIcon />
                        )
                      }
                      onClick={() => {
                        if (singleActivity?.status !== "completed") {
                          handleCloseTask();
                        }
                      }}
                    >
                      {singleActivity?.status == "completed"
                        ? "Completed"
                        : "Close Task"}
                    </OutLinedButton>
                  )}
                  <OutLinedButton
                    variant="outlined"
                    startIcon={<DeleteOutlineOutlinedIcon />}
                    onClick={() => {
                      handleDelete();
                    }}
                  >
                    Delete
                  </OutLinedButton>
                </ButtonContainer>
              </OtherTopBox>
              <AllTaskListingOuter>
                <AllTaskListingWrapper>
                  {/* <Grid container spacing={1}> */}
                  {taskMeetingCalls?.data?.data?.length < 4 && (
                    <Grid container spacing={1}>
                      {taskMeetingCalls?.data?.data?.map((item, index): any => {
                        return typeId == 5 ? (
                          <GridCommonItem item xs={12} sm={4} md={3}>
                            <CardColumn
                              className={
                                item?.id == router?.query?.id ? "selectedcard cardcoulmn" : 'cardcoulmn'
                              }
                              onClick={() => handleSelectTask(item)}
                            >
                              <ImageContainer>
                                <span>
                                  <i className="icon-main-task"></i>
                                </span>
                                <ImageLabelText>
                                  <Typography
                                    variant="body2"
                                    className="taskname"
                                  >
                                    {" "}
                                    {item?.subject}
                                  </Typography>
                                  {item?.related_with_value?.length > 0 &&
                                    item?.related_with_value?.map((ele) => (
                                      <>
                                        {ele?.name == "Account" && (
                                          <Typography> {ele?.value}</Typography>
                                        )}
                                        {(ele?.name == "First_Name" ||
                                          ele?.name == "Last_Name") && (
                                            <Typography className="alltaskcarousel">
                                              {" "}
                                              {ele?.value}
                                            </Typography>
                                          )}
                                      </>
                                    ))}
                                </ImageLabelText>
                              </ImageContainer>
                              <InfoContainer>
                                <OtherTaskStatus>
                                  {item?.status?.replaceAll("-", " ")}
                                </OtherTaskStatus>
                                <OtherPeriority
                                  style={{
                                    background: `${item?.priority == "high"
                                      ? ""
                                      : item?.priority == "low"
                                        ? "#e6e6ff"
                                        : item?.priority == "lowest"
                                          ? "#999999"
                                          : "#fff5e3"
                                      }`,
                                    color: `${item?.priority == "high"
                                      ? ""
                                      : item?.priority == "low"
                                        ? "#6666c4"
                                        : item?.priority == "lowest"
                                          ? "#f5f5f5"
                                          : "#ffa500"
                                      }`,
                                  }}
                                >
                                  <FlagOutlinedIcon />
                                  {item?.priority}
                                </OtherPeriority>

                                <OtherCommonDate>
                                  {moment(item?.updated_at).format(
                                    "ddd, DD MMM YYYY hh:mm A"
                                  )}
                                </OtherCommonDate>
                              </InfoContainer>
                            </CardColumn>
                          </GridCommonItem>
                        ) : typeId == 6 ? (
                          <GridCommonItem item xs={12} sm={4} md={3}>
                            <CardColumn
                              sx={{ display: "block !important" }}
                              className={
                                item?.id == router?.query?.id ? "selectedcard cardcoulmn" : 'cardcoulmn'
                              }
                              onClick={() => handleSelectTask(item)}
                            >
                              <ImageContainer>
                                <span>
                                  <i className="icon-main-meeting"></i>
                                </span>
                                <ImageLabelText>
                                  <Typography
                                    variant="body2"
                                    className="taskname"
                                  >
                                    {item?.title}
                                  </Typography>
                                  <OtherCommonDate>
                                    {moment(item?.updated_at).format(
                                      "ddd, DD MMM YYYY hh:mm A"
                                    )}
                                  </OtherCommonDate>
                                </ImageLabelText>
                              </ImageContainer>
                            </CardColumn>
                          </GridCommonItem>
                        ) : (
                          <GridCommonItem item xs={12} sm={4} md={3}>
                            <CardColumn
                              sx={{ display: "block !important" }}
                              className={
                                item?.id == router?.query?.id ? "selectedcard cardcoulmn" : 'cardcoulmn'
                              }
                              onClick={() => handleSelectTask(item)}
                            >
                              <ImageContainer>
                                <span>
                                  {
                                    item?.call_type == 'missed' ?
                                      <i className="icon-missed_call"></i>
                                      : item?.call_type == 'in-bound' ?
                                        <i className="icon-incoming-new"></i>
                                        :
                                        <i className="icon-main-call"></i>
                                  }

                                </span>
                                <ImageLabelText>
                                  <Typography
                                    variant="body2"
                                    className="taskname"
                                  >
                                    {" "}
                                    {item?.subject}
                                  </Typography>
                                  <OtherTaskStatus>
                                    Call Type:
                                    <span style={{ fontWeight: 600 }}>
                                      {item?.call_type?.replaceAll('-', ' ')}
                                    </span>
                                  </OtherTaskStatus>
                                </ImageLabelText>
                              </ImageContainer>
                            </CardColumn>
                          </GridCommonItem>
                        );
                      })}
                    </Grid>
                  )}
                  {taskMeetingCalls?.data?.data?.length >= 4 && (
                    <TaskListCarousel>
                      <Slider {...settings}>
                        {taskMeetingCalls?.data?.data?.map(
                          (item, index): any => {
                            return typeId == 5 ? (
                              <CardColumn
                                className={
                                  item?.id == router?.query?.id ? "selectedcard cardcoulmn" : 'cardcoulmn'
                                }
                                onClick={() => {
                                  handleSelectTask(item);
                                }}
                              >
                                <ImageContainer>
                                  <span>
                                    <i className="icon-main-task"></i>
                                  </span>
                                  <ImageLabelText>
                                    <Typography
                                      variant="body2"
                                      className="taskname"
                                    >
                                      {item?.subject}
                                    </Typography>
                                    {typeId == 5 &&
                                      item?.related_with_value?.length > 0 &&
                                      item?.related_with_value?.map((ele) => (
                                        <>
                                          {ele?.name == "Account" && (
                                            <Typography>
                                              {" "}
                                              {ele?.value}
                                            </Typography>
                                          )}
                                          {(ele?.name == "First_Name" ||
                                            ele?.name == "Last_Name") && (
                                              <Typography className="alltaskcarousel">
                                                {" "}
                                                {ele?.value}
                                              </Typography>
                                            )}
                                        </>
                                      ))}
                                  </ImageLabelText>
                                </ImageContainer>
                                <InfoContainer>
                                  <OtherTaskStatus>
                                    {item?.status?.replaceAll("-", " ")}
                                  </OtherTaskStatus>
                                  <OtherPeriority
                                    style={{
                                      background: `${item?.priority == "high"
                                        ? ""
                                        : item?.priority == "low"
                                          ? "#e6e6ff"
                                          : item?.priority == "lowest"
                                            ? "#999999"
                                            : "#fff5e3"
                                        }`,
                                      color: `${item?.priority == "high"
                                        ? ""
                                        : item?.priority == "low"
                                          ? "#6666c4"
                                          : item?.priority == "lowest"
                                            ? "#f5f5f5"
                                            : "#ffa500"
                                        }`,
                                    }}
                                  >
                                    <FlagOutlinedIcon />
                                    {item?.priority}
                                  </OtherPeriority>
                                  <OtherCommonDate>
                                    {moment(item?.updated_at).format(
                                      "ddd, DD MMM YYYY hh:mm A"
                                    )}
                                  </OtherCommonDate>
                                </InfoContainer>
                              </CardColumn>
                            ) : typeId == 6 ? (
                              <CardColumn
                                sx={{ display: "block !important" }}
                                className={
                                  item?.id == router?.query?.id ? "selectedcard cardcoulmn" : 'cardcoulmn'
                                }
                                onClick={() => handleSelectTask(item)}
                              >
                                <ImageContainer>
                                  <span>
                                    <i className="icon-main-meeting"></i>
                                  </span>
                                  <ImageLabelText>
                                    <Typography
                                      variant="body2"
                                      className="taskname"
                                    >
                                      {item?.title}
                                    </Typography>
                                    <OtherCommonDate>
                                      {moment(item?.updated_at).format(
                                        "ddd, DD MMM YYYY hh:mm A"
                                      )}
                                    </OtherCommonDate>
                                  </ImageLabelText>
                                </ImageContainer>
                              </CardColumn>
                            ) : (
                              <CardColumn
                                sx={{ display: "block !important" }}
                                className={
                                  item?.id == router?.query?.id ? "selectedcard cardcoulmn" : 'cardcoulmn'
                                }
                                onClick={() => handleSelectTask(item)}
                              >
                                <ImageContainer>
                                  <span>
                                    <i className="icon-main-call"></i>
                                  </span>
                                  <ImageLabelText>
                                    <Typography
                                      variant="body2"
                                      className="taskname"
                                    >
                                      {" "}
                                      {item?.subject}
                                    </Typography>
                                    <OtherTaskStatus>
                                      Call Type:
                                      <span style={{ fontWeight: 600 }}>
                                        {item?.call_type?.replaceAll('-', ' ')}
                                      </span>
                                    </OtherTaskStatus>
                                  </ImageLabelText>
                                </ImageContainer>
                              </CardColumn>
                            );
                          }
                        )}
                      </Slider>
                    </TaskListCarousel>
                  )}
                </AllTaskListingWrapper>
              </AllTaskListingOuter>
            </AllTaskListingContainer>

            <OtherModuleDetailInner>
              <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1, xl: 2 }}>
                {!expand && (
                  <Grid item xs={12} sm={12} md={3} lg={3.5} xl={3.5}>
                    <PersonDetailData>
                      <PersonDetailOther />
                    </PersonDetailData>
                  </Grid>
                )}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={expand ? 12 : 9}
                  lg={expand ? 12 : 8.5}
                  xl={8.5}
                  className="detaildataright"
                >
                  <DetailRight>
                    <div>
                      <Tabs
                        className="detailtoptabs"
                        value={detailsTab}
                        onChange={(e, value) => {
                          // setActiveButton(value);
                          dispatch(setDetailActiveTab(value));
                          dispatch(setActivityType(""));
                        }}
                        variant="scrollable"
                        scrollButtons={false}
                        aria-label="scrollable prevent tabs example"
                        style={{
                          [`& .${tabsClasses.scrollButtons}`]: {
                            "&.Mui-disabled": { opacity: 0.3 },
                          },
                        }}
                        sx={TabsStyleindicator}
                      >
                        <Tab
                          label={`${typeName} Info`}
                          icon={<i className="icon-leadsblack"></i>}
                          iconPosition="start"
                        />
                        <Tab
                          label="Notes"
                          icon={<AssignmentOutlinedIcon />}
                          iconPosition="start"
                        />
                        <Tab
                          label="Files"
                          icon={<FileCopyOutlinedIcon />}
                          iconPosition="start"
                        />
                        <Tab
                          label="Links"
                          icon={<LinkOutlinedIcon />}
                          iconPosition="start"
                        />
                      </Tabs>
                    </div>
                    <Grid item md={12}>
                      <div>{renderTabsData()}</div>
                    </Grid>
                    <div>
                      <HistoryOthers />
                    </div>
                  </DetailRight>
                </Grid>
              </Grid>
            </OtherModuleDetailInner>
          </OtherModeuleDetailOuter>
          <ConvertSingleLead openLead={openLead} setOpen={setOpen} />
          <ReminderPopUp />
          {/* </DetailDrawerBox> */}
        </CrmInnerContent>
        <div>
          {(["left"] as const).map((anchor) => (
            <React.Fragment key={anchor}>
              <PersonDetalDrrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </PersonDetalDrrawer>
            </React.Fragment>
          ))}
        </div>
      </CrmFullData>
    </div>
  );
};
export default DetailsOther;
