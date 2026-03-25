import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Link,
  MenuItem,
  MenuList,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  AvatarContainer,
  CompanyAvatar,
  CompanyCircle,
  ContentInnerInfo,
  ContentStack,
  DetailLeftContent,
  DetailStatus,
  Detailleft,
  HeadingBg,
  LeadInfo,
  MainHeading,
  ProfileContainer,
  SuccessStatus,
  OverViewFields,
  OuverViewCoulms,
  OverViewTxt,
  DetalFieldContainer,
  TopActivityArea,
  ActivityCol,
  ActivityProgress,
  OverviewHead,
  ActivityColBoth,
  UserProgressBar,
  PagevisitArea,
  PageVisitCol,
  InsightColmn,
  LinerProgressbar,
  SelectOption,
  ToolTipBox,
  TooltipStyle,
  DetailStatusSelect,
  UserInfoPopover,
  StyledInfoPopover,
  PopOverContainer,
  PopOverInner,
  IconContainer,
  MainAccountInfo,
  InfoGreyBar,
  UseDes,
  ListingData,
  AssignedAccount,
  ReassignName,
  AssigneInfo,
  DiviceInfo,
  BuyerDetalFieldContainer,
  CancelIcon,
  ActivitiesViewDetails,
  ActivitiesAccordionData,
  InnerListData,
  OpenActivityList,
  PersonDetailTags,
  PopperStyle,
  TagPaperView,
  TagSearchBox,
  PreTagBoxList,
  PDParticipantsCol,
  PdInvitedInfoBox,
  PdAcceptedInfoBox,
  PdNoReplyInfoBox,
  PdDeclinedInfoBox,
  ParticipantsAccordionData,
} from "../style";
import Image from "next/image";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import DevicesIcon from '@mui/icons-material/Devices';
import { useAppDispatch } from "redux/store";
import { useRouter } from "next/router";
import { LicenseInfo } from "@mui/x-license-pro";
import LeadOwner from "../PageLayout/common/LeadOwner";
import { apiClient } from "@/components/common/common";
import moment from "moment";
import MailOutlineSharpIcon from '@mui/icons-material/MailOutlineSharp';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Chip from '@mui/material/Chip';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelScheduleSendOutlinedIcon from '@mui/icons-material/CancelScheduleSendOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: "none",
  marginBottom: "10px",
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    margin: "0",
  },
  "&.MuiAccordionSummary-root": {
    margin: "0 0 5px",
    minHeight: "38px",
    borderRadius: "4px",
    padding: "0 10px",
    "& i:before": {
      // color: "#231F20",
      margin: "0 7px 0 0",
      fontSize: "18px"
    },
    "& .icon-mail-cancel:before": {
      fontSize: "13px"
    },
    "& svg": {
      margin: "0px 7px -3px 0",
      fontSize: "18px"
    },
    "& .MuiTypography-root": {
      fontWeight: 600,
      // color: "#231F20",
      fontSize: "14px !important"
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
      position: "absolute",
      right: "10px",
      "& svg": {
        fontSize: "12px",
        // color: "#7e787a",
        margin: "0 7px 0 0"
      },
    },
  },
}));
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: "0",
  "& .MuiTypography-root": {
    fontSize: "13px !important"
  },
  "& .MuiListItemButton-root": {
    padding: "1px 0 0 33px !important"
  }
}));

LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);
const PersonDetailOther = () => {
  const router = useRouter();
  const { userLists, details, singleActivity, typeId, updateSingleData, allActivityData } = useSelector(
    (state: any) => state.formList
  );

  const leadUser = userLists?.find(ele => ele.email == details?.Lead_Owner);
  const givenDateTime = updateSingleData?.[0]?.lead_user_info?.last_login_at;

  useEffect(() => {
    if (details == "") {
      // router.back();

    }
  }, [details]);

  useEffect(() => {
  }, [allActivityData]);

  const dispatch = useAppDispatch();
  /*** Popover ***/
  const [anchorElP, setAnchorElP] = React.useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElP(event.currentTarget);
  };

  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const AcordionhandleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };
  return (
    <Detailleft>
      <DetailLeftContent>
        <HeadingBg>
          <MainHeading variant="h5">Person Detail</MainHeading>
        </HeadingBg>
        <ProfileContainer>
          {singleActivity?.related_with == "" || singleActivity?.related_with == null}
          <AvatarContainer>
            {singleActivity?.task_related_account_info?.length <= 0 || singleActivity?.
              hostby || singleActivity?.owner ?
              <Avatar onMouseOver={(e) => {
                // if (leadUser !== undefined) {
                // handlePopoverOpen(e)
                // }
              }}>
                {singleActivity?.owner && <img src={singleActivity?.owner ? singleActivity?.owner?.avatar : "https://merchantad.xevitech.com/public/assets/img/avatar-place.png"}></img>}
                {singleActivity?.task_related_account_info?.length <= 0 && singleActivity?.hostby && <img src={singleActivity?.hostby ? singleActivity?.hostby?.avatar : "https://merchantad.xevitech.com/public/assets/img/avatar-place.png"}></img>}
                {singleActivity?.hostby && <img src={singleActivity?.hostby ? singleActivity?.hostby?.avatar : "https://merchantad.xevitech.com/public/assets/img/avatar-place.png"}></img>}
              </Avatar> :
              <Avatar> <img src={singleActivity?.task_related_account_info?.[0]?.profile_image} /></Avatar>}
            <Box>
              {singleActivity?.related_with == "" || singleActivity?.related_with == null || singleActivity?.task_related_account_info?.length == 0 && <Typography variant="body2">
                {singleActivity?.owner ? singleActivity?.owner?.name : singleActivity?.hostby?.name}
              </Typography>}
              <LeadInfo>

                {singleActivity?.task_related_account_info?.map((ele: any) => <> <Typography>
                  {ele?.name == "mail" && <MailOutlineSharpIcon />}
                  {ele?.value}
                </Typography></>)}
                {singleActivity?.owner && <Typography className="smalltxt">
                  <Link>{singleActivity?.owner?.email}</Link>
                  <div><Tooltip title="Copy Email" placement="top" arrow><ContentCopyIcon className="emailcopy" /></Tooltip></div>
                </Typography>}

              </LeadInfo>
            </Box>

          </AvatarContainer>
          {/* <DetailStatus>
            <Tooltip title="Status" arrow placement="top">
              {leadUser !== undefined && <SuccessStatus variant="caption">{userLists?.find(ele => ele.email == details?.Lead_Owner)?.status !== "" ? userLists?.find(ele => ele.email == details?.Lead_Owner)?.status : "Non Active"}</SuccessStatus>}
            </Tooltip>
          </DetailStatus> */}
        </ProfileContainer>
        <ContentStack>
            <HeadingBg>
              <MainHeading variant="h5">Account Detail</MainHeading>
              {/* <ThreeDotsButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </ThreeDotsButton>
              <PersonDetailPopover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    border: "1px solid #EBEBEB",
                    filter: "drop-shadow(rgba(0, 0, 0, 0.05) 0px 0px 0px 1px)",
                  },
                }}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              >
                <MenuList>
                  <MenuItem>
                    <ListItemIcon>
                      <SwitchAccessShortcutOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText>Switch to another organization</ListItemText>
                  </MenuItem>

                  <MenuItem>
                    <ListItemIcon>
                      <LinkOffOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText>Unlink this organization</ListItemText>
                  </MenuItem>
                </MenuList>
              </PersonDetailPopover> */}
            </HeadingBg>
            <CompanyAvatar>
              <CompanyCircle>
                {/* <LocationCityOutlinedIcon /> */}
                {/* <img src="/assets/images/crm/companyimgg.svg"></img> */}
                <i className="icon-accountType"></i>
              </CompanyCircle>

              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, textTransform: "capitalize" }}>
                  {details?.Account}
                </Typography>
                <Typography className="smalltxt">
                  <MailOutlineSharpIcon />
                  <Link underline="none">{details?.mail}</Link>
                  <div>
                    <Tooltip title="Copy Email" placement="top" arrow>
                      <ContentCopyIcon
                        className="emailcopy"
                       // onClick={() => handleCopy(details?.mail)}
                      />
                    </Tooltip>
                  </div>

                </Typography>
              </Box>
            </CompanyAvatar>
          </ContentStack>
        <ContentStack>
          <HeadingBg>
            <MainHeading variant="h5">Overview</MainHeading>
            <IconButton aria-label="More Option">
              <MoreVertIcon />
            </IconButton>
          </HeadingBg>
          <OverViewFields>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <OuverViewCoulms>
                  <Typography>Owner</Typography>
                  <OverViewTxt>Main account</OverViewTxt>
                </OuverViewCoulms>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <OuverViewCoulms>
                  <Typography>Assign</Typography>
                  <DetalFieldContainer>
                    <SelectOption
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={10}
                      // onChange={handleChange}
                      IconComponent={KeyboardArrowDownOutlinedIcon}
                      defaultValue={10}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            width: "100",
                            "& .MuiMenuItem-root": {
                              fontSize: 12,
                            },
                          },
                        },
                      }}
                    >
                      <MenuItem value={10}>Assign To</MenuItem>
                      <MenuItem value={20}>Maya</MenuItem>
                      <MenuItem value={30}>Kamal</MenuItem>
                      <MenuItem value={30}>Shammi</MenuItem>
                    </SelectOption>
                  </DetalFieldContainer>
                </OuverViewCoulms>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <OuverViewCoulms>
                  <Typography>Next Activity</Typography>
                  <OverViewTxt style={{ color: "#103DDA" }}>
                    Follow Up
                  </OverViewTxt>
                </OuverViewCoulms>
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <OuverViewCoulms>
                  <Typography>Status</Typography>
                  <DetailStatus>
                    Lead Status
                    {/* <DetailStatusSelect
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={10}
                        onChange={handleChange}
                        IconComponent={KeyboardArrowDownOutlinedIcon}
                        defaultValue={10}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              width: "100",
                              "& .MuiMenuItem-root": {
                                fontSize: 12,
                              },
                            },
                          },
                        }}
                      >
                        <MenuItem value={10}>Interested</MenuItem>
                        <MenuItem value={20}>Not Interested</MenuItem>
                      </DetailStatusSelect> */}
                  </DetailStatus>
                </OuverViewCoulms>
              </Grid>
            </Grid>
          </OverViewFields>
        </ContentStack>
        <ContentStack>
          <HeadingBg>
            <MainHeading variant="h5">Tags</MainHeading>
            <IconButton aria-label="More Option">
              <MoreVertIcon />
            </IconButton>
          </HeadingBg>
          <PersonDetailTags>
            <Chip className="greenchip" size="small" icon={<SellOutlinedIcon />} label="Whatsapp" onDelete={handleDelete} deleteIcon={<CloseRoundedIcon />} />
            <Chip className="redchip" size="small" icon={<SellOutlinedIcon />} label="Cold Call" onDelete={handleDelete} deleteIcon={<CloseRoundedIcon />} />
            <Chip className="bluechip" size="small" icon={<SellOutlinedIcon />} label="Advertisement" onDelete={handleDelete} deleteIcon={<CloseRoundedIcon />} />
            <Chip className="greenchip" size="small" icon={<SellOutlinedIcon />} label="Hot Call" onDelete={handleDelete} deleteIcon={<CloseRoundedIcon />} />

            <PopupState variant="popper" popupId="demo-popup-popper">
              {(popupState) => (
                <span>
                  <Button variant="text" disableRipple startIcon={<AddCircleOutlineOutlinedIcon />} className="addmtag" {...bindToggle(popupState)}>
                    Add More Tags
                  </Button>
                  <Popper {...bindPopper(popupState)} transition
                    sx={PopperStyle}
                  >
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <TagPaperView>
                          <TagSearchBox>
                            <TextField fullWidth
                              id="standard-search"
                              placeholder="Search field"
                              type="search"
                              variant="standard"
                            />
                          </TagSearchBox>
                          <PreTagBoxList>
                            <MenuList dense>
                              <MenuItem disableRipple>
                                <ListItemText inset><Chip className="greenchip" size="small" icon={<SellOutlinedIcon />} label="Whatsapp" /></ListItemText>
                              </MenuItem>
                              <MenuItem disableRipple>
                                <ListItemText inset><Chip className="redchip" size="small" icon={<SellOutlinedIcon />} label="Cold Call" /></ListItemText>
                              </MenuItem>
                              <MenuItem disableRipple>
                                <ListItemText inset> <Chip className="bluechip" size="small" icon={<SellOutlinedIcon />} label="Advertisement" /></ListItemText>
                              </MenuItem>
                              <MenuItem disableRipple>
                                <ListItemText inset> <Chip className="greenchip" size="small" icon={<SellOutlinedIcon />} label="Hot Call" /></ListItemText>
                              </MenuItem>
                            </MenuList>
                          </PreTagBoxList>
                        </TagPaperView>
                      </Fade>
                    )}
                  </Popper>
                </span>
              )}
            </PopupState>
          </PersonDetailTags>
        </ContentStack>
        <ContentStack>
          <ActivitiesViewDetails>
            <PDParticipantsCol>
              <HeadingBg sx={{ margin: 0 }}>
                <MainHeading variant="h5">Participants</MainHeading>
              </HeadingBg>
              <ParticipantsAccordionData>
                <Accordion expanded={expanded === 'panel11'} onChange={AcordionhandleChange('panel11')}>
                  <PdInvitedInfoBox>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                      <Typography><i className="icon-crm-invitemeeting"></i>Invited ({allActivityData?.task?.length})</Typography>
                    </AccordionSummary>
                  </PdInvitedInfoBox>
                  <AccordionDetails>
                    <InnerListData>
                      <OpenActivityList>
                        {
                          allActivityData?.task?.length > 0 ?
                            allActivityData?.task?.map((ele: any) =>
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemText primary={ele?.subject} />
                                </ListItemButton>
                              </ListItem>
                            )
                            :
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemText primary={'No tasks added yet'} />
                              </ListItemButton>
                            </ListItem>
                        }
                      </OpenActivityList>
                    </InnerListData>
                  </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel12'} onChange={AcordionhandleChange('panel12')}>
                  <PdAcceptedInfoBox>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                      <Typography><CheckCircleOutlineOutlinedIcon />Accepted ({allActivityData?.meeting?.length})</Typography>
                    </AccordionSummary>
                  </PdAcceptedInfoBox>
                  <AccordionDetails>
                    {
                      allActivityData?.meeting?.length > 0 ?
                        allActivityData?.meeting?.map((ele: any) =>
                          <ListItem disablePadding>
                            <ListItemButton>
                              <ListItemText primary={ele?.title} />
                            </ListItemButton>
                          </ListItem>
                        )
                        :
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemText primary={'No meetings added yet'} />
                          </ListItemButton>
                        </ListItem>
                    }
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel13'} onChange={AcordionhandleChange('panel13')}>
                  <PdNoReplyInfoBox>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                      <Typography><i className="icon-mail-cancel"></i>No reply ({allActivityData?.call?.length})</Typography>
                    </AccordionSummary>
                  </PdNoReplyInfoBox>
                  <AccordionDetails>
                    <InnerListData>
                      <OpenActivityList>
                        {
                          allActivityData?.call?.length > 0 ?
                            allActivityData?.call?.map((ele: any) =>
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemText primary={ele?.subject} />
                                </ListItemButton>
                              </ListItem>
                            )
                            :
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemText primary={'No calls added yet'} />
                              </ListItemButton>
                            </ListItem>
                        }
                      </OpenActivityList>
                    </InnerListData>
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={AcordionhandleChange('panel4')}>
                  <PdDeclinedInfoBox>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                      <Typography><CancelOutlinedIcon />Declined ({allActivityData?.call?.length})</Typography>
                    </AccordionSummary>
                  </PdDeclinedInfoBox>
                  <AccordionDetails>
                    <InnerListData>
                      <OpenActivityList>
                        {
                          allActivityData?.call?.length > 0 ?
                            allActivityData?.call?.map((ele: any) =>
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemText primary={ele?.subject} />
                                </ListItemButton>
                              </ListItem>
                            )
                            :
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemText primary={'No calls added yet'} />
                              </ListItemButton>
                            </ListItem>
                        }
                      </OpenActivityList>
                    </InnerListData>
                  </AccordionDetails>
                </Accordion>
              </ParticipantsAccordionData>
            </PDParticipantsCol>
          </ActivitiesViewDetails>
        </ContentStack>
        <ContentStack>
          <ActivitiesViewDetails>
            <HeadingBg sx={{ margin: 0 }}>
              <MainHeading variant="h5">Open Activities</MainHeading>
            </HeadingBg>
            <ActivitiesAccordionData>
              <Accordion expanded={expanded === 'panel1'} onChange={AcordionhandleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" className="taskgradient">
                  <Typography><i className="icon-main-task"></i>Task ({allActivityData?.task?.length})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <InnerListData>
                    <OpenActivityList>
                      {
                        allActivityData?.task?.length > 0 ?
                          allActivityData?.task?.map((ele: any) =>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemText primary={ele?.subject} onClick={() => {
                                  router.push(`/crm/tasks/${ele?.id}`)
                                }} />
                              </ListItemButton>
                            </ListItem>
                          )
                          :
                          <ListItem disablePadding>
                            <ListItemButton>
                              <ListItemText primary={'No tasks added yet'} />
                            </ListItemButton>
                          </ListItem>
                      }
                    </OpenActivityList>
                  </InnerListData>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel2'} onChange={AcordionhandleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" className="meetinggradient">
                  <Typography><i className="icon-main-meeting"></i>Meetings ({allActivityData?.meeting?.length})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {
                    allActivityData?.meeting?.length > 0 ?
                      allActivityData?.meeting?.map((ele: any) =>
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemText primary={ele?.title} onClick={() => {
                              router.push(`/crm/meetings/${ele?.id}`)
                            }} />
                          </ListItemButton>
                        </ListItem>
                      )
                      :
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary={'No meetings added yet'} />
                        </ListItemButton>
                      </ListItem>
                  }
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel3'} onChange={AcordionhandleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" className="callgradient">
                  <Typography><i className="icon-main-call"></i>Call ({allActivityData?.call?.length})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <InnerListData>
                    <OpenActivityList>
                      {
                        allActivityData?.call?.length > 0 ?
                          allActivityData?.call?.map((ele: any) =>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemText primary={ele?.subject} onClick={() => {
                                  router.push(`/crm/calls/${ele?.id}`)
                                }} />
                              </ListItemButton>
                            </ListItem>
                          )
                          :
                          <ListItem disablePadding>
                            <ListItemButton>
                              <ListItemText primary={'No calls added yet'} />
                            </ListItemButton>
                          </ListItem>
                      }
                    </OpenActivityList>
                  </InnerListData>
                </AccordionDetails>
              </Accordion>
            </ActivitiesAccordionData>
          </ActivitiesViewDetails>
        </ContentStack>
        {/* <ContentStack>
          <HeadingBg>
            <MainHeading variant="h5">Page Visited</MainHeading>
            <IconButton aria-label="More Option">
              <MoreVertIcon />
            </IconButton>
          </HeadingBg>
          <PagevisitArea>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TooltipStyle
                  sx={{ padding: 0 }}
                  title={
                    <ToolTipBox>
                      <Typography>
                        <span>Page Name:</span>page name goes here
                      </Typography>

                      <Typography>
                        <span> Link:</span>{" "}
                        <Link href="#">https:google.com</Link>
                      </Typography>
                    </ToolTipBox>
                  }
                  placement={"bottom"}
                >
                  <PageVisitCol>
                    <Typography variant="subtitle2">1 min</Typography>
                    <Typography variant="subtitle2">
                      <span> 5 Hits</span>
                    </Typography>
                  </PageVisitCol>
                </TooltipStyle>
              </Grid>
              <Grid item xs={12} md={4}>
                <PageVisitCol style={{ borderColor: "#E6EB00" }}>
                  <Typography variant="subtitle2">1 min</Typography>
                  <Typography variant="subtitle2">
                    <span> 5 Hits</span>
                  </Typography>
                </PageVisitCol>
              </Grid>
              <Grid item xs={12} md={4}>
                <PageVisitCol style={{ borderColor: "#00AF6A" }}>
                  <Typography variant="subtitle2">1 min</Typography>
                  <Typography variant="subtitle2">
                    <span> 5 Hits</span>
                  </Typography>
                </PageVisitCol>
              </Grid>
            </Grid>
          </PagevisitArea>
        </ContentStack> */}
        {/* <ContentStack>
          <HeadingBg>
            <MainHeading variant="h5">Insight</MainHeading>
            <IconButton aria-label="More Option">
              <MoreVertIcon />
            </IconButton>
          </HeadingBg>
          <PagevisitArea>
            <InsightColmn>
              <Typography variant="subtitle2">No. Of Visits</Typography>
              <Typography variant="subtitle2">
                <span> 5 Hits</span>
              </Typography>
            </InsightColmn>
            <InsightColmn>
              <Typography variant="subtitle2">Total Duration</Typography>
              <Typography variant="subtitle2">
                <span>23 Minute</span>
              </Typography>
            </InsightColmn>
            <InsightColmn>
              <Typography variant="subtitle2">Days Visited</Typography>
              <Typography variant="subtitle2">
                <span>4 Days</span>
              </Typography>
            </InsightColmn>
            <InsightColmn>
              <Typography variant="subtitle2">Last Visit</Typography>
              <Typography variant="subtitle2">
                <span>10:50pm Yesterday</span>
              </Typography>
            </InsightColmn>
          </PagevisitArea>
        </ContentStack> */}
      </DetailLeftContent>
    </Detailleft>
  );
};
export default PersonDetailOther;
