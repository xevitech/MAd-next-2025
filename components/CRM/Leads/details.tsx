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
  Popover,
  Select,
  Skeleton,
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
  TagInnerDiv,
  ModeEdit,
  LeadInfoIconData,
  LeadInfoRow,
  EditLayoutContainer,
  EditAddTagLayoutInner,
  EditCustomChip,
  LeadDetaileftArea,
  DetailTagPopOver,
  DetailTagPopOverInner,
  IconStyling,
  InnerButtonArea,
  StepperPipeleine,
  HorizontalStepper,
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
import {
  BtnFilledLeads,
  CrmFullData,
  CrmInnerContent,
  CrmStyledMenu,
  SmallFilledBtn,
} from "../commonStyle";
import SellIcon from "@mui/icons-material/Sell";
import ScoringRules from "./ScoringRules";
import ConvertSingleLead from "./ConvertSingleLead";
import { useSelector } from "react-redux";
import { CustomChip, DetailDrawerBox, LabelChipStack } from "../View/style";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalculateIcon from "@mui/icons-material/Calculate";
import {
  setDetailsData,
  EditSingleLead,
  setActivityType,
  deleteLeadSavedData,
  setDetailActiveTab,
  setShowSkeltn,
  setMassCovrtPop,
  setAddedTags,
  leadActivity,
  setSelectedDataIds,
  getAllFieldData,
  setTypeId,
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
/** Common file for these two components **/
import { ProfileHeader } from "../../common/profileheader";
import PersonDetail from "./PersonDetail";

LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);
import { apiClient } from "@/components/common/common";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { toast } from "react-toastify";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CommonHeader from "./CommonHeader";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import MassConvert from "./MassConvert";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import ReminderPopUp from "./ReminderPopUp";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { LOCAL_URL } from "@/utils/staticValues";
import Swal from "sweetalert2";
import UserTrackingHistory from "./UserTrackingHistory";
type Anchor = "top" | "left" | "bottom" | "right";
/* Steper hepling */
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#784af4",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "#784af4",
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  })
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      // backgroundImage:
      //   'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      background: "#d7282f",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      // backgroundImage:
      //   'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      background: "#d7282f",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#EDEDED",

    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#EDEDED",
  "&:hover": {
    background: "#fff",
    border: "1px solid #d7282f",
    color: "#d7282f",
  },
  zIndex: 1,
  color: "#231F20",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  transition: "all ease .5s",
  "& .MuiTypography-root": {
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: "12px",
  },
  "& .colorlbcontent": {
    textAlign: "center",
  },
  ...(ownerState.active && {
    // backgroundImage:
    //   'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    border: "1px solid #d7282f",
    background: "#fff",
    // boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    color: "#d7282f",
  }),
  ...(ownerState.completed && {
    border: "1px solid #d7282f",
    background: "#fff",
    color: "#d7282f",
  }),
}));
const ColorlibStepLabel = styled(StepLabel)(() => ({
  color: "red",
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {/* {icons[String(props.icon)]} */}
      <Box className="colorlbcontent">
        <Typography>4</Typography>
        <Typography>Days</Typography>
      </Box>
    </ColorlibStepIconRoot>
  );
}
const steps = [
  "Qualified",
  "Lead Analysis",
  "Value Proposition",
  "Qualified",
  "Lead Analysis",
  "Value Proposition",
];
/* End Steper hepling */

const Details = () => {
  const [deleteConfirmation, setDeleteConfirmation] = React.useState(false);
  const [expand, setExpand] = React.useState(false);
  const [showEditTags, setShowTags] = React.useState(false);
  const [leadIndex, setLeadIndex] = useState<any>(-1);
  const router = useRouter();
  const {
    typeName,
    details,
    savedFieldData,
    detailsTab,
    selectedDataIds,
    showSkelton,
    massConvertPopUp,
    addedTags,
    check_survey_mail_status,
  } = useSelector((state: any) => state.formList);

  const handlePrevious = (index) => {
    if (index !== -1) {
      dispatch(setShowSkeltn(true));
      const getNextId = savedFieldData?.data?.data?.[index - 1];
      dispatch(
        EditSingleLead({
          unique_id: getNextId?.unique_id,
          crm_user_form_unique_id: getNextId?.crm_user_form_unique_id,
        })
      );
      router.replace(
        `/crm/leads/${getNextId?.unique_id}/${getNextId?.crm_user_form_unique_id}`
      );
      dispatch(leadActivity(getNextId?.unique_id));
      setLeadIndex(index - 1);
    }
  };

  const handleNext = (nextIndex) => {
    if (
      nextIndex !== -1 &&
      nextIndex !== savedFieldData?.data?.data?.length - 1
    ) {
      const getNextId = savedFieldData?.data?.data?.[nextIndex + 1];
      dispatch(setShowSkeltn(true));
      dispatch(
        EditSingleLead({
          unique_id: getNextId?.unique_id,
          crm_user_form_unique_id: getNextId?.crm_user_form_unique_id,
        })
      );
      dispatch(leadActivity(getNextId?.unique_id));
      router.replace(
        `/crm/leads/${getNextId?.unique_id}/${getNextId?.crm_user_form_unique_id}`
      );
      setLeadIndex(nextIndex + 1);
    }
  };

  const dispatch = useAppDispatch();

  const getAllAreadyAddedTags = async () => {
    let filteredArray = await savedFieldData?.data?.data.filter((item: any) => {
      if (selectedDataIds?.length === 0) {
        return parseInt(router?.query?.id[0]);
      } else {
        return selectedDataIds.includes(item?.id);
      }
    });
    if (filteredArray?.length > 0) {
      const uniqueTagsSet = new Set([]);
      filteredArray.forEach((newTags) => {
        if (newTags?.tag) {
          newTags.tag.forEach((tag) => {
            uniqueTagsSet.add(tag);
          });
        }
      });

      const updatedTags = Array.from(uniqueTagsSet);
      dispatch(
        setAddedTags(
          Array.from(new Set(updatedTags?.map((item) => item.id)))?.map(
            (id) => {
              return updatedTags?.find((item) => item.id === id);
            }
          )
        )
      );
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setShowTags(true);
  };

  const cloneDetail = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "custom-btn cancel-button",
        cancelButton: "custom-btn remove-btn",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to clone?`,
        text: `Cloning the ${typeName?.slice(
          0,
          -1
        )} will create a duplicate entry with identical information. This action is irreversible and may result in the creation of redundant data.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, clone it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
        allowOutsideClick: false,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          let response = await apiClient("crm/clone-single-lead", "post", {
            body: {
              crm_user_form_unique_id: details?.crm_user_form_unique_id,
              unique_id: details?.unique_id,
            },
          });
          if (response?.status == true || response?.status == 200) {
            swalWithBootstrapButtons
              .fire({
                title: `${typeName?.slice(0, -1)} Cloned Successfully!?`,
                text: `Congratulations! You've cloned the ${typeName?.slice(
                  0,
                  -1
                )} without a hitch. Now, there's a duplicate entry ready for you to use. Take your time and continue with your next steps whenever you're ready.`,
                icon: "success",
                showCancelButton: true,
                confirmButtonText: `View Cloned ${typeName?.slice(0, -1)}`,
                reverseButtons: false,
                allowOutsideClick: false,
              })
              .then(async (result) => {
                if (result.isConfirmed) {
                  dispatch(setShowSkeltn(true));
                  dispatch(
                    EditSingleLead({
                      unique_id: response?.data,
                      crm_user_form_unique_id: details?.crm_user_form_unique_id,
                    })
                  );
                  dispatch(leadActivity(response?.data));
                  router.replace(
                    `/crm/leads/${response?.data}/${details?.crm_user_form_unique_id}`
                  );
                } else {
                  dispatch(setShowSkeltn(true));
                  dispatch(
                    EditSingleLead({
                      unique_id: response?.data,
                      crm_user_form_unique_id: details?.crm_user_form_unique_id,
                    })
                  );
                  dispatch(leadActivity(response?.data));
                  router.replace(
                    `/crm/leads/${details?.id}/${details?.crm_user_form_unique_id}`
                  );
                }
              });
          } else {
            swalWithBootstrapButtons.fire({
              title: `Error?`,
              text: response?.message,
              icon: "error",
              showCancelButton: false,
              confirmButtonText: `Ok`,
              reverseButtons: false,
              allowOutsideClick: false,
            });
          }
        } else {
          // User clicked "Cancel" or closed the dialog
          console.log("Action cancelled");
        }
      });

    return;
    let response = await apiClient("crm/clone-single-lead", "post", {
      body: {
        crm_user_form_unique_id: details?.crm_user_form_unique_id,
        unique_id: details?.unique_id,
      },
    });
    if (response?.status == true || response?.status == 200) {
      toast.success(response?.message);
    } else {
      toast.error(response?.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setAddedTags([]));
      await dispatch(getAllFieldData());
      getAllAreadyAddedTags();
      dispatch(setActivityType(""));
      dispatch(setDetailActiveTab(0));
      dispatch(setSelectedDataIds([]));
    };

    if (savedFieldData?.data?.data === undefined) {
      fetchData();
    } else {
      const indexData = savedFieldData?.data?.data?.findIndex(
        (item: any) => item?.unique_id == router?.query?.id?.[0]
      );

      setLeadIndex(indexData);
      getAllAreadyAddedTags();
      dispatch(setActivityType(""));
      dispatch(setDetailActiveTab(0));
    }
  }, [dispatch, savedFieldData?.data?.data]);

  const id = open ? "simple-popover" : undefined;
  /*** End Popover ***/

  /*** Dialog here ***/
  const [openLead, setOpen] = React.useState(false);

  /*** End Dialog here ***/

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
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <PersonDetail />
    </Box>
  );

  const renderTabsData = () => {
    switch (detailsTab) {
      case 0:
        return <LeadInformation />;
      case 1:
        return <EnquiryDetail />;
      case 2:
        return <Activities />;
      case 3:
        return <LeadNotes />;
      case 4:
        return <LeadFiles />;
      case 5:
        return <LeadEmails />;
      case 6:
        return <InvitedMeetings />;
      case 7:
        return <ScoringRules />;
      case 8:
        return <UserTrackingHistory />;
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

  const sendQuestionnaire = async () => {
    let url = `${window.location.origin}/questionnaire/${details?.id}/1/${details?.crm_user_form_unique_id}`;
    let response = await apiClient(
      "crm/lead-convert/send-lead-survey-mail",
      "post",
      {
        body: {
          name: details?.First_Name ? details?.First_Name : details?.Last_Name,
          email: details?.mail ? details?.mail : details?.Email,
          link: url,
        },
      }
    );
    if (response?.status == true || response?.status == 200) {
      toast.success(response?.message);
    } else {
      toast.error(response?.message);
    }
  };
  return (
    <div className="full_page crm_pagelayout">
      {massConvertPopUp && <MassConvert />}
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
          {/* <TopNextPreBar>
        <TopButtonCol>
          <Button variant="outlined" startIcon={<ArrowBackIcon />}>
            Pre
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button variant="outlined" endIcon={<ArrowForwardIcon />}>
            Next
          </Button>
        </TopButtonCol>
        <span style={{ cursor: "pointer" }}>
          {" "}
          <CancelTwoToneIcon onClick={() => onCloseOver()} />
        </span>
      </TopNextPreBar> */}
          <LeadDetailOuter>
            <LeadTopBar>
              {/* <TopButtonCol>
              <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={()=>handleBack()}>
            Back
          </Button>
            </TopButtonCol> */}
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={4}>
                  <LeadDetaileftArea>
                    <DealName>
                      <BackOption>
                        <Tooltip
                          title="Back"
                          arrow
                          onClick={() => {
                            router.push("/crm/leads");
                          }}
                        >
                          <IconButton>
                            <span>
                              <ChevronLeftIcon fontSize="small" />
                            </span>
                          </IconButton>
                        </Tooltip>
                      </BackOption>
                      <span>
                        SN:-
                        {details?.unique_id}
                        {details?.First_Name ? "-" : ""} {details?.First_Name}{" "}
                        {details?.Last_Name}
                      </span>

                      <OutLinedButton
                        className="persondetailmobile"
                        variant="outlined"
                        onClick={toggleDrawer("left", true)}
                      >
                        Person Detail
                      </OutLinedButton>
                    </DealName>
                    {/* <EditLayoutContainer>
                      {!showEditTags && (
                        <EditAddTagLayoutInner>
                          {!showSkelton && (
                            <>
                              <SellIcon
                                sx={{
                                  transform: "rotate(90deg)",
                                  fontSize: 16,
                                }}
                              />
                            </>
                          )}
                          {addedTags?.length > 0 && !showSkelton ? (
                            <Box className="leadrowdd">
                              {" "}
                              {addedTags?.map((item) => (
                                <EditCustomChip
                                  value={item?.background_color_code}
                                  text={item?.text_code}
                                >
                                  {item?.name}
                                </EditCustomChip>
                              ))}
                            </Box>
                          ) : (
                            <>
                              {!showSkelton && (
                                <Link underline="hover">
                                  <Typography className="createtagstxt">
                                    {" "}
                                    Add Tags{" "}
                                  </Typography>
                                </Link>
                              )}
                            </>
                          )}
                          {showSkelton && <TagsSkeleton />}
                        </EditAddTagLayoutInner>
                      )}
                      <div>
                        {!showEditTags ? (
                          <IconButton
                            onClick={handleClick}
                            aria-label="edit"
                            className="btnedittag"
                            disableRipple
                          >
                            <Tooltip title="Add Tags" arrow>
                              <IconStyling className="hovericons">
                                <ModeEditOutlineOutlinedIcon
                                  sx={{ color: "#d7282f", fontSize: 16 }}
                                  aria-describedby={id}
                                />
                              </IconStyling>
                            </Tooltip>
                          </IconButton>
                        ) : (
                          <IconButton
                            aria-label="edit"
                            className="btnedittag"
                            disableRipple
                          ></IconButton>
                        )}
                        {showEditTags && (
                          <>
                            <TagInnerDiv>
                              <DetailTagPopOver
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "left",
                                }}
                              >
                                <DetailTagPopOverInner>
                                  <CancelOutlinedIcon
                                    className="closetagbtn"
                                    onClick={() => {
                                      setAnchorEl(null);
                                      setShowTags(false);
                                    }}
                                  />
                                  <TagsInput type={0} sendData={""} />
                                </DetailTagPopOverInner>
                              </DetailTagPopOver>
                            </TagInnerDiv>
                          </>
                        )}
                      </div>
                    </EditLayoutContainer> */}
                  </LeadDetaileftArea>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={8}
                  className="detailbuttongrid"
                >
                  <ButtonContainer className="buttoncontainer">
                    <InnerButtonArea>
                      {check_survey_mail_status && (
                        <OutLinedButton
                          variant="outlined"
                          startIcon={<SendOutlinedIcon />}
                          onClick={() => {
                            sendQuestionnaire();
                          }}
                        >
                          Send Questionnaire
                        </OutLinedButton>
                      )}

                      <OutLinedButton
                        variant="outlined"
                        startIcon={<ContentCopyOutlinedIcon />}
                        onClick={() => {
                          cloneDetail();
                        }}
                      >
                        Clone
                      </OutLinedButton>
                      {typeName == "Leads" && (
                        <OutLinedButton
                          variant="outlined"
                          startIcon={<SwapHorizOutlinedIcon />}
                          onClick={() => {
                            dispatch(setTypeId(2)),
                              dispatch(setMassCovrtPop(true));
                          }}
                        >
                          Convert
                        </OutLinedButton>
                      )}
                      <OutLinedButton
                        variant="outlined"
                        startIcon={<DeleteOutlineOutlinedIcon />}
                        onClick={() => {
                          setDeleteConfirmation(true);
                        }}
                      >
                        Delete
                      </OutLinedButton>
                      <SmallFilledBtn
                        variant="outlined"
                        startIcon={<ForumOutlinedIcon />}
                      >
                        Chat Now
                      </SmallFilledBtn>
                    </InnerButtonArea>
                    {/* <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <MoreHorizIcon sx={{ color: "#8A8A8A" }} />
                    </IconButton>
                  </Tooltip> */}
                    {savedFieldData?.data?.data !== undefined ||
                    savedFieldData?.data?.data?.length == 0 ? (
                      <BackNdPreOptions>
                        <>
                          <Tooltip
                            title="Previous Record"
                            arrow
                            onClick={() => {
                              handlePrevious(leadIndex);
                            }}
                          >
                            <IconButton
                              disabled={leadIndex == 0 ? true : false}
                            >
                              <span>
                                <ChevronLeftIcon />
                              </span>
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            title="Next Record"
                            arrow
                            onClick={() => {
                              handleNext(leadIndex);
                            }}
                          >
                            <IconButton
                              disabled={
                                leadIndex ==
                                savedFieldData?.data?.data?.length - 1
                                  ? true
                                  : false
                              }
                            >
                              <span>
                                <ChevronRightIcon />
                              </span>
                            </IconButton>
                          </Tooltip>
                        </>
                        {/* )} */}
                      </BackNdPreOptions>
                    ) : (
                      ""
                    )}

                    {/* <Menu
                    anchorEl={anchorEl}
                    sx={CrmStyledMenu}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        minWidth: "120px",
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={handleClose}>Clone</MenuItem>
                    <Divider style={{ margin: 0 }} />
                    <MenuItem onClick={handleClose}>Delete</MenuItem>
                  </Menu> */}
                  </ButtonContainer>
                </Grid>
              </Grid>
            </LeadTopBar>
            {typeName == "Deals" && (
              <StepperPipeleine>
                <HorizontalStepper>
                  <div className="md-step active">
                    <div className="md-step-circle">
                      <span>
                        <Typography>4 </Typography>
                        <Typography>Days</Typography>{" "}
                      </span>
                    </div>
                    <div className="md-step-title">Qualified</div>
                    <div className="md-step-bar-left"></div>
                    <div className="md-step-bar-right"></div>
                  </div>
                  <div className="md-step active">
                    <div className="md-step-circle">
                      <span>
                        <Typography>4 </Typography>
                        <Typography>Days</Typography>{" "}
                      </span>
                    </div>
                    <div className="md-step-title">Lead Analysis</div>
                    <div className="md-step-bar-left"></div>
                    <div className="md-step-bar-right"></div>
                  </div>
                  <div className="md-step">
                    <div className="md-step-circle">
                      <span>
                        <Typography>4 </Typography>
                        <Typography>Days</Typography>{" "}
                      </span>
                    </div>
                    <div className="md-step-title">Value Proposition</div>
                    <div className="md-step-bar-left"></div>
                    <div className="md-step-bar-right"></div>
                  </div>
                  <div className="md-step">
                    <div className="md-step-circle">
                      <span>
                        <Typography>4 </Typography>
                        <Typography>Days</Typography>{" "}
                      </span>
                    </div>
                    <div className="md-step-title">Qualified</div>
                    <div className="md-step-bar-left"></div>
                    <div className="md-step-bar-right"></div>
                  </div>
                  <div className="md-step">
                    <div className="md-step-circle">
                      <span>
                        <Typography>4 </Typography>
                        <Typography>Days</Typography>{" "}
                      </span>
                    </div>
                    <div className="md-step-title">Lead Analysis</div>
                    <div className="md-step-bar-left"></div>
                    <div className="md-step-bar-right"></div>
                  </div>
                  <div className="md-step">
                    <div className="md-step-circle">
                      <span>
                        <Typography>4 </Typography>
                        <Typography>Days</Typography>{" "}
                      </span>
                    </div>
                    <div className="md-step-title">Value Proposition</div>
                    <div className="md-step-bar-left"></div>
                    <div className="md-step-bar-right"></div>
                  </div>
                </HorizontalStepper>
              </StepperPipeleine>
            )}
            <LeadDetailInner>
              {/* <ExpandCollapseArrow onClick={() => setExpand(!expand)}>
                  <MenuOpenIcon className={expand ? "arrowPosition" : ""} />
                </ExpandCollapseArrow> */}
              <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1, xl: 2 }}>
                {!expand && (
                  <Grid item xs={12} sm={12} md={3} lg={3.5} xl={3.5}>
                    <PersonDetailData>
                      <PersonDetail />
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
                    <Tabs
                      className="detailtoptabs"
                      value={detailsTab}
                      onChange={(e, value) => {
                        // setActiveButton(value);
                        dispatch(setDetailActiveTab(value));
                        dispatch(setActivityType(""));
                      }}
                      variant="scrollable"
                      // scrollButtons={false}
                      scrollButtons
                      allowScrollButtonsMobile
                      aria-label="scrollable prevent tabs example"
                      style={{
                        [`& .${tabsClasses.scrollButtons}`]: {
                          "&.Mui-disabled": { opacity: 0.3 },
                        },
                      }}
                      sx={TabsStyleindicator}
                    >
                      <Tab
                        disableRipple
                        label={`${typeName} Info`}
                        icon={<i className="icon-leadsblack"></i>}
                        iconPosition="start"
                      />
                      <Tab
                        disableRipple
                        label="Enquiry Detail"
                        icon={<AssignmentOutlinedIcon />}
                        iconPosition="start"
                      />
                      <Tab
                        disableRipple
                        label="Activity"
                        icon={<CalendarMonthOutlinedIcon />}
                        iconPosition="start"
                      />

                      <Tab
                        disableRipple
                        label="Notes"
                        icon={<AssignmentOutlinedIcon />}
                        iconPosition="start"
                      />
                      <Tab
                        disableRipple
                        label="Files"
                        icon={<FileCopyOutlinedIcon />}
                        iconPosition="start"
                      />
                      <Tab
                        disableRipple
                        label="Email"
                        icon={<MailOutlineOutlinedIcon />}
                        iconPosition="start"
                      />
                      <Tab
                        disableRipple
                        label="Invited Meetings"
                        icon={<GroupsOutlinedIcon />}
                        iconPosition="start"
                      />
                      <Tab
                        disableRipple
                        label="Scoring Rules"
                        icon={<SaveAsOutlinedIcon />}
                        iconPosition="start"
                      />
                      <Tab
                        disableRipple
                        label="Engagment Level Calculations"
                        icon={<CalculateIcon />}
                        iconPosition="start"
                      />
                    </Tabs>
                    <Grid item md={12}>
                      <div>{renderTabsData()}</div>
                    </Grid>
                  </DetailRight>
                </Grid>
              </Grid>
            </LeadDetailInner>
          </LeadDetailOuter>
          <ConvertSingleLead openLead={openLead} setOpen={setOpen} />
          <ReminderPopUp />

          {/* </DetailDrawerBox> */}
        </CrmInnerContent>
        <History />
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
export default Details;
