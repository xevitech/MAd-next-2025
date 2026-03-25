import React, { useState, useRef } from "react";
import {
  Avatar,
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
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
  ThreeDotsButton,
  PersonDetailPopover,
  SocialLinksContainer,
  SocialLinksbutton,
  ActivityIcon,
  PersonDetailTags,
  TagSearchBox,
  PreTagBoxList,
  TagPaperView,
  PopperStyle,
  DetailStatusTop,
  SuccessStatusTop,
  SocialMediaFields,
  SocialMediaFInn,
  SocialInffo,
  SocialIconLabel,
  SocialIconValue,
  MAddMorebtn,
  AddButtonArea,
  SocialContactsAddMore,
  TagStylePopover,
  TagInnerDiv,
  OutLinedButton,
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
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "redux/store";
import { useRouter } from "next/router";
import { LicenseInfo } from "@mui/x-license-pro";
import LeadOwner from "../PageLayout/common/LeadOwner";
import { SocialMediaList, apiClient } from "@/components/common/common";
import moment from "moment";
import MailOutlineSharpIcon from "@mui/icons-material/MailOutlineSharp";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import SwitchAccessShortcutOutlinedIcon from "@mui/icons-material/SwitchAccessShortcutOutlined";
import LinkOffOutlinedIcon from "@mui/icons-material/LinkOffOutlined";
import Chip from "@mui/material/Chip";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { ListSocialIconTable, SocialLinksTooltipText } from "../View/style";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Collapse from "@material-ui/core/Collapse";
LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);
import { TooltipProps } from "@mui/material/Tooltip";
import {
  EditSingleLead,
  deleteListOfTags,
  getAllListOfTags,
  setDetailActiveTab,
  setSelectedDataIds,
} from "@/hooks/UseCreateFormData";
import TagsInput from "./TagsInput";
const ToBeStyledTooltip = ({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ tooltip: className }} />
);
const StyledTooltip = styled(ToBeStyledTooltip)(({ theme }) => ({
  backgroundColor: "#ebebeb",
  color: "rgba(0, 0, 0, 0.87)",
  maxWidth: 300,
  fontSize: 12,
  fontFamily: "Open Sans !important",
  border: "1px solid #dadde9",
}));

const ContainerProfile = styled(Box)({
  position: "relative",
  display: "inline-block",
  zIndex: 100,
});

const ProfileImage = styled(Box)({});

const HoverBox = styled(Box)({
  position: "absolute",
  top: "100%",
  left: "0",
  width: "300px",
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: "5px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  opacity: 0,
  transform: "translateY(-10px)",
  transition: "opacity 0.3s ease, transform 0.3s ease",
  pointerEvents: "none",
  "&:hover": {
    opacity: 1,
    transform: "translateY(0)",
    pointerEvents: "auto",
  },
});

const PersonDetail = () => {
  const inputRef = React.useRef(null);
  const [activeButton, setActiveButton] = React.useState(0);
  const [copied, setCopied] = React.useState(false);

  const [toHandleSideEffects, setToHandleSideEffects] =
    React.useState<boolean>(false);
  const [tags, setTags] = React.useState("Tags");
  const [anchorElTag, setAnchorElTag] = React.useState<null | HTMLElement>(
    null
  );
  const [detailsTags, setDetasilsTags] = React.useState<any>([]);

  const router = useRouter();
  const optionList = [
    "Untouched",
    "Qualified",
    "Non-Qualified",
    "Nurturing Leads",
    "Spam",
    "Blocked",
    "Not Interested",
  ];
  const {
    userLists,
    details,
    typeId,
    updateSingleData,
    typeName,
    activitiesCount,
    userTags,
    selectedDataEmails,
    selectedCellValue,
  } = useSelector((state: any) => state.formList);
  const [progress, setProgress] = React.useState(0);
  const handleChange = (event) => {
    // setAge(event.target.value);
  };

  const leadUser = userLists?.find((ele) => ele.email == details?.Lead_Owner);
  const givenDateTime = updateSingleData?.[0]?.lead_user_info?.last_login_at;
  const convertedDateTime =
    givenDateTime !== null
      ? moment.utc(givenDateTime).utcOffset(-6).format("h:mm A")
      : "";
  useEffect(() => {
    if (details == "") {
      // router.back();
    }
  }, [details]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = (copyData) => {
    navigator.clipboard
      .writeText(copyData)
      .then(() => {
        toast.success("Copied to clipboard!");
        setCopied(true);
      })
      .catch((error) => {
        console.log("error,", error);
      });
  };

  const dispatch = useAppDispatch();
  /*** Popover ***/
  const [anchorElP, setAnchorElP] = React.useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElP(event.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorElP(null);
  };

  const openpopover = Boolean(anchorElP);
  const id = open ? "simple-popover" : undefined;
  /*** End Popover ***/

  /*** Dialog here ***/
  const [openLead, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [anchorElCd, setAnchorElCd] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClickCd = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElCd(event.currentTarget);
  };
  const handleCloseCd = () => {
    setAnchorElCd(null);
  };
  const openCd = Boolean(anchorElCd);
  // const id = open ? 'simple-popover' : undefined;

  const handleDelete = async (tagId) => {
    await dispatch(deleteListOfTags(tagId?.toString()));
    await dispatch(EditSingleLead(details));
    // dispatch(getAllListOfTags());
  };
  const [showOptions, setShowOptions] = React.useState(false);
  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };
  const [age, setAge] = React.useState("");

  const openTagPopOver = Boolean(anchorElTag);
  const idTagPopOver = openTagPopOver ? "simple-popover" : undefined;

  const handleClickTag = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTag(event.currentTarget);
  };

  const handleTagsChange = async (event) => {
    setTags(event.target.value);
  };

  useEffect(() => {
    setAnchorElTag(null);
    const url = router.asPath.split("/");
    dispatch(setSelectedDataIds(url[3]));
  }, [toHandleSideEffects]);

  ///////// Buyer card hover information ////////
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hoverRef = useRef(null);
  // Handle mouse enter to show the main info immediately and delay the additional info
  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowMoreInfo(false);

    setTimeout(() => {
      setShowMoreInfo(true);
    }, 1000);
  };

  // Close the card when clicking outside
  const handleClickOutside = (event) => {
    if (hoverRef.current && !hoverRef.current.contains(event.target)) {
      setIsHovered(false);
      setShowMoreInfo(false);
    }
  };

  // Add event listener for clicks outside the card
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Detailleft>
      <UserInfoPopover>
        <StyledInfoPopover
          id={id}
          open={openpopover}
          anchorEl={anchorElP}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <div className="containereffects">
            <div className="card">
              <PopOverContainer>
                <div className="image">
                  <PopOverInner>
                    <Link href="#">
                      <CancelIcon onClick={() => handleClosePopover()} />
                    </Link>
                    <Avatar>
                      <img
                        src={
                          updateSingleData?.[0]?.lead_user_info?.photo
                            ? updateSingleData?.[0]?.lead_user_info?.photo
                            : "https://merchantad.xevitech.com/public/assets/img/avatar-place.png"
                        }
                      ></img>
                    </Avatar>
                    <Box>
                      <Typography
                        fontWeight={700}
                        sx={{ textTransform: "capitalize" }}
                      >
                        {details?.First_Name} {details?.Last_Name}
                      </Typography>
                      <UseDes>{leadUser?.job_role}</UseDes>
                    </Box>
                  </PopOverInner>
                  <IconContainer>
                    <Tooltip title="Add Person" arrow>
                      <Link href="#">
                        {" "}
                        <img
                          src="/assets/images/crm/addperson.svg"
                          alt="Add Person"
                          // width={30}
                          // height={30}
                        />
                      </Link>
                    </Tooltip>
                    <Tooltip title="Send Query" arrow>
                      <Link href="#">
                        {" "}
                        <img
                          className="queryicon"
                          src="/assets/images/crm/send.svg"
                          alt="Send Query"
                          // width={30}
                          // height={30}
                        />
                      </Link>
                    </Tooltip>
                    <Tooltip title="Block Person" arrow>
                      <Link href="#">
                        {" "}
                        <img
                          src="/assets/images/crm/blockperson.svg"
                          alt="Block Person"
                          // width={30}
                          // height={30}
                        />
                      </Link>
                    </Tooltip>
                  </IconContainer>
                </div>
                <div className="content">
                  <Divider />
                  <MainAccountInfo>
                    <Stack>
                      <InfoGreyBar>
                        <Typography>Main Account Info</Typography>
                      </InfoGreyBar>
                      <ListingData>
                        <List>
                          <ListItem disablePadding>
                            <ListItemButton disableRipple>
                              <ListItemIcon>
                                <Image
                                  src="/assets/images/crm/mail1.svg"
                                  alt=""
                                  width={25}
                                  height={25}
                                />
                              </ListItemIcon>
                              {/* <ListItemText primary={leadUser?.email} /> */}
                              <ListItemText primary={details?.mail} />
                              <ContentCopyIcon
                                onClick={() => handleCopy(details?.mail)}
                              />
                            </ListItemButton>
                          </ListItem>
                          <Divider />
                          <ListItem disablePadding>
                            <ListItemButton disableRipple>
                              <ListItemIcon>
                                <Image
                                  src="/assets/images/crm/location.svg"
                                  alt=""
                                  width={20}
                                  height={20}
                                />
                              </ListItemIcon>
                              {/* <ListItemText primary={leadUser?.country?.length > 0 ? leadUser?.country[0]?.name : "jordan"} /> */}
                              <ListItemText
                                primary={
                                  details?.Country ? details?.Country : "jordan"
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                          <Divider />
                          <ListItem disablePadding>
                            <ListItemButton disableRipple>
                              <ListItemIcon>
                                <Image
                                  src="/assets/images/crm/time_icon.svg"
                                  alt=""
                                  width={20}
                                  height={20}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  convertedDateTime
                                    ? convertedDateTime
                                    : "8:20 Am, (UTC-6)"
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                          <Divider />
                          <ListItem disablePadding>
                            <ListItemButton disableRipple>
                              <ListItemIcon>
                                <Image
                                  src="/assets/images/crm/device_info2 .svg"
                                  alt=""
                                  width={20}
                                  height={20}
                                />
                              </ListItemIcon>
                              <Grid item md={6}>
                                {updateSingleData?.[0]?.lead_user_info?.ip &&
                                updateSingleData?.[0]?.lead_user_info?.ip !==
                                  null ? (
                                  <ListItemText>
                                    IP{" "}
                                    {updateSingleData?.[0]?.lead_user_info?.ip}
                                    {/* IP 00910101 Desktop HP, Chrome */}
                                  </ListItemText>
                                ) : (
                                  <ListItemText>No info</ListItemText>
                                )}
                                {updateSingleData?.[0]?.lead_user_info
                                  ?.system_info !== null && (
                                  <ListItemText>
                                    {
                                      updateSingleData?.[0]?.lead_user_info
                                        ?.system_info
                                    }
                                  </ListItemText>
                                )}
                              </Grid>
                              {/* <ListItemText primary={convertedDateTime ? convertedDateTime : "8:20 Am, (UTC-6)"} /> */}
                            </ListItemButton>
                          </ListItem>
                        </List>
                      </ListingData>
                    </Stack>
                    <Stack>
                      {/* <InfoGreyBar>
                        <Typography>Other Info</Typography>
                      </InfoGreyBar> */}
                      <AssignedAccount>
                        {/* <AssigneInfo>
                          <Avatar>
                            <img src={leadUser?.file_name?leadUser?.file_name:"https://merchantad.xevitech.com/public/assets/img/avatar-place.png"}></img>
                          </Avatar>
                          <ReassignName>{leadUser?.name}</ReassignName>
                           <Box>
                            <BuyerDetalFieldContainer fullWidth>
                              <SelectOption
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
                                <MenuItem value={10}>Reassign</MenuItem>
                                <MenuItem value={20}>Maya</MenuItem>
                                <MenuItem value={30}>Kamal</MenuItem>
                                <MenuItem value={30}>Shammi</MenuItem>
                              </SelectOption>
                            </BuyerDetalFieldContainer>
                          </Box> 
                        </AssigneInfo> */}
                        {/* <Divider /> */}
                        {/* <DiviceInfo>
                          <Grid container spacing={1}>
                            <Grid item md={12}>
                              <Grid container spacing={1}>
                                <Grid item md={6}>
                                  <Typography>
                                    <span>Device information:</span>
                                  </Typography>
                                </Grid>
                                <Grid item md={6}>
                                  {updateSingleData?.[0]?.lead_user_info?.ip !== null &&
                                    <Typography>
                                      IP {updateSingleData?.[0]?.lead_user_info?.ip}
                                      IP 00910101 Desktop HP, Chrome
                                    </Typography>}
                                  {updateSingleData?.[0]?.lead_user_info?.system_info !== null && <Typography>
                                    {updateSingleData?.[0]?.lead_user_info?.system_info}
                                  </Typography>
                                  }
                                </Grid>
                              </Grid>
                              <Divider sx={{ mt: 1.5 }} />
                            </Grid>
                            <Grid item md={12}>
                               <Grid container spacing={1}>
                                <Grid item md={6}>
                                  <Typography>
                                    <span>Current Page:</span>
                                  </Typography>
                                </Grid>
                                <Grid item md={6}>
                                  <Typography>
                                    <Link href="#">
                                      Hitachi Gas Turbine spare parts
                                    </Link>
                                  </Typography>
                                </Grid>
                              </Grid> 
                            </Grid>
                          </Grid>
                        </DiviceInfo> */}
                      </AssignedAccount>
                    </Stack>
                  </MainAccountInfo>
                </div>
              </PopOverContainer>
            </div>
          </div>
        </StyledInfoPopover>
      </UserInfoPopover>

      <DetailLeftContent>
        <HeadingBg className="firstheadingbg">
          <MainHeading variant="h5">Person Detail</MainHeading>
        </HeadingBg>
        <ProfileContainer>
          <AvatarContainer>
            {/* <Avatar
              onMouseOver={(e) => {
                if (leadUser !== undefined) {
                  handlePopoverOpen(e);
                }
              }}
            >
              <img
                src={
                  updateSingleData?.[0]?.lead_user_info?.photo
                    ? updateSingleData?.[0]?.lead_user_info?.photo
                    : "https://merchantad.xevitech.com/public/assets/img/avatar-place.png"
                }
              ></img>
            </Avatar> */}

            <ContainerProfile
              onMouseEnter={handleMouseEnter}
              sx={{
                "&:hover .hover-box": {
                  opacity: 1,
                  transform: "translateY(0)",
                  pointerEvents: "auto",
                },
              }}
            >
              <ProfileImage>
                {" "}
                <Avatar
                // onMouseOver={(e) => {
                //   if (leadUser !== undefined) {
                //     handlePopoverOpen(e);
                //   }
                // }}
                >
                  <img
                    src={
                      updateSingleData?.[0]?.lead_user_info?.photo
                        ? updateSingleData?.[0]?.lead_user_info?.photo
                        : "https://merchantad.xevitech.com/public/assets/img/avatar-place.png"
                    }
                  ></img>
                </Avatar>
              </ProfileImage>
              <HoverBox
                ref={hoverRef}
                className="hover-box"
                sx={{
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateY(0)" : "translateY(-10px)",
                }}
              >
                <div className="image">
                  <PopOverInner>
                    <Link href="#">
                      <CancelIcon onClick={() => handleClosePopover()} />
                    </Link>
                    <Avatar>
                      <img
                        src={
                          updateSingleData?.[0]?.lead_user_info?.photo
                            ? updateSingleData?.[0]?.lead_user_info?.photo
                            : "https://merchantad.xevitech.com/public/assets/img/avatar-place.png"
                        }
                      ></img>
                    </Avatar>
                    <Box>
                      <Typography
                        fontWeight={700}
                        sx={{ textTransform: "capitalize" }}
                      >
                        {details?.First_Name} {details?.Last_Name}
                      </Typography>
                      <UseDes>{leadUser?.job_role}</UseDes>
                    </Box>
                  </PopOverInner>
                  <IconContainer>
                    <Tooltip title="Add Person" arrow>
                      <Link href="#">
                        {" "}
                        <img
                          src="/assets/images/crm/addperson.svg"
                          alt="Add Person"
                          // width={30}
                          // height={30}
                        />
                      </Link>
                    </Tooltip>
                    <Tooltip title="Send Query" arrow>
                      <Link href="#">
                        {" "}
                        <img
                          className="queryicon"
                          src="/assets/images/crm/send.svg"
                          alt="Send Query"
                          // width={30}
                          // height={30}
                        />
                      </Link>
                    </Tooltip>
                    <Tooltip title="Block Person" arrow>
                      <Link href="#">
                        {" "}
                        <img
                          src="/assets/images/crm/blockperson.svg"
                          alt="Block Person"
                          // width={30}
                          // height={30}
                        />
                      </Link>
                    </Tooltip>
                  </IconContainer>
                </div>

                {/* Smoothly showing the extra info after delay */}
                <div
                  style={{
                    maxHeight: showMoreInfo ? "200px" : "0",
                    opacity: showMoreInfo ? 1 : 0,
                    transition: "max-height 0.5s ease, opacity 0.5s ease",
                    overflow: "hidden",
                  }}
                >
                  <MainAccountInfo>
                    <Stack>
                      <InfoGreyBar>
                        <Typography>Main Account Info</Typography>
                      </InfoGreyBar>
                      <ListingData>
                        <List>
                          <ListItem disablePadding>
                            <ListItemButton disableRipple>
                              <ListItemIcon>
                                <Image
                                  src="/assets/images/crm/mail1.svg"
                                  alt=""
                                  width={25}
                                  height={25}
                                />
                              </ListItemIcon>
                              {/* <ListItemText primary={leadUser?.email} /> */}
                              <ListItemText primary={details?.mail} />
                              <ContentCopyIcon
                                onClick={() => handleCopy(details?.mail)}
                              />
                            </ListItemButton>
                          </ListItem>
                          <Divider />
                          <ListItem disablePadding>
                            <ListItemButton disableRipple>
                              <ListItemIcon>
                                <Image
                                  src="/assets/images/crm/location.svg"
                                  alt=""
                                  width={20}
                                  height={20}
                                />
                              </ListItemIcon>
                              {/* <ListItemText primary={leadUser?.country?.length > 0 ? leadUser?.country[0]?.name : "jordan"} /> */}
                              <ListItemText
                                primary={
                                  details?.Country ? details?.Country : "jordan"
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                          <Divider />
                          <ListItem disablePadding>
                            <ListItemButton disableRipple>
                              <ListItemIcon>
                                <Image
                                  src="/assets/images/crm/time_icon.svg"
                                  alt=""
                                  width={20}
                                  height={20}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  convertedDateTime
                                    ? convertedDateTime
                                    : "8:20 Am, (UTC-6)"
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                          <Divider />
                          <ListItem disablePadding>
                            <ListItemButton disableRipple>
                              <ListItemIcon>
                                <Image
                                  src="/assets/images/crm/device_info2 .svg"
                                  alt=""
                                  width={20}
                                  height={20}
                                />
                              </ListItemIcon>
                              <Grid item md={6}>
                                {updateSingleData?.[0]?.lead_user_info?.ip &&
                                updateSingleData?.[0]?.lead_user_info?.ip !==
                                  null ? (
                                  <ListItemText>
                                    IP{" "}
                                    {updateSingleData?.[0]?.lead_user_info?.ip}
                                    {/* IP 00910101 Desktop HP, Chrome */}
                                  </ListItemText>
                                ) : (
                                  <ListItemText>No info</ListItemText>
                                )}
                                {updateSingleData?.[0]?.lead_user_info
                                  ?.system_info !== null && (
                                  <ListItemText>
                                    {
                                      updateSingleData?.[0]?.lead_user_info
                                        ?.system_info
                                    }
                                  </ListItemText>
                                )}
                              </Grid>
                              {/* <ListItemText primary={convertedDateTime ? convertedDateTime : "8:20 Am, (UTC-6)"} /> */}
                            </ListItemButton>
                          </ListItem>
                        </List>
                      </ListingData>
                    </Stack>
                    <Stack>
                      {/* <InfoGreyBar>
                        <Typography>Other Info</Typography>
                      </InfoGreyBar> */}
                      <AssignedAccount>
                        {/* <AssigneInfo>
                          <Avatar>
                            <img src={leadUser?.file_name?leadUser?.file_name:"https://merchantad.xevitech.com/public/assets/img/avatar-place.png"}></img>
                          </Avatar>
                          <ReassignName>{leadUser?.name}</ReassignName>
                           <Box>
                            <BuyerDetalFieldContainer fullWidth>
                              <SelectOption
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
                                <MenuItem value={10}>Reassign</MenuItem>
                                <MenuItem value={20}>Maya</MenuItem>
                                <MenuItem value={30}>Kamal</MenuItem>
                                <MenuItem value={30}>Shammi</MenuItem>
                              </SelectOption>
                            </BuyerDetalFieldContainer>
                          </Box> 
                        </AssigneInfo> */}
                        {/* <Divider /> */}
                        {/* <DiviceInfo>
                          <Grid container spacing={1}>
                            <Grid item md={12}>
                              <Grid container spacing={1}>
                                <Grid item md={6}>
                                  <Typography>
                                    <span>Device information:</span>
                                  </Typography>
                                </Grid>
                                <Grid item md={6}>
                                  {updateSingleData?.[0]?.lead_user_info?.ip !== null &&
                                    <Typography>
                                      IP {updateSingleData?.[0]?.lead_user_info?.ip}
                                      IP 00910101 Desktop HP, Chrome
                                    </Typography>}
                                  {updateSingleData?.[0]?.lead_user_info?.system_info !== null && <Typography>
                                    {updateSingleData?.[0]?.lead_user_info?.system_info}
                                  </Typography>
                                  }
                                </Grid>
                              </Grid>
                              <Divider sx={{ mt: 1.5 }} />
                            </Grid>
                            <Grid item md={12}>
                               <Grid container spacing={1}>
                                <Grid item md={6}>
                                  <Typography>
                                    <span>Current Page:</span>
                                  </Typography>
                                </Grid>
                                <Grid item md={6}>
                                  <Typography>
                                    <Link href="#">
                                      Hitachi Gas Turbine spare parts
                                    </Link>
                                  </Typography>
                                </Grid>
                              </Grid> 
                            </Grid>
                          </Grid>
                        </DiviceInfo> */}
                      </AssignedAccount>
                    </Stack>
                  </MainAccountInfo>
                </div>
              </HoverBox>
            </ContainerProfile>
            <Box>
              <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
                {details?.First_Name} {details?.Last_Name}
              </Typography>
              <LeadInfo>
                {details?.mail && (
                  <Typography className="smalltxt">
                    <MailOutlineSharpIcon />
                    <Link underline="none">{details?.mail}</Link>
                    {/* {!copied && ( */}
                    <div>
                      <Tooltip title="Copy Email" placement="top" arrow>
                        <ContentCopyIcon
                          className="emailcopy"
                          onClick={() => handleCopy(details?.mail)}
                        />
                      </Tooltip>
                    </div>
                    {/* )} */}
                    {/* {copied && (
                      <div>
                        <Tooltip title="Copied" placement="top" arrow>
                          <DoneAllIcon />
                        </Tooltip>
                      </div>
                    )} */}
                  </Typography>
                )}
                {typeName !== "Accounts" &&
                  details?.["Mobile_No."] !== undefined &&
                  details?.["Mobile_No."] !== null && (
                    <Typography className="smalltxt">
                      <PhoneInTalkOutlinedIcon />
                      {details?.["Mobile_No."]?.includes("+")
                        ? details?.["Mobile_No."]
                        : "+" + details?.["Mobile_No."]}
                      <div>
                        <Tooltip title="Copy Mobile No." placement="top" arrow>
                          <ContentCopyIcon
                            className="emailcopy"
                            onClick={() => handleCopy(details?.["Mobile_No."])}
                          />
                        </Tooltip>
                      </div>
                    </Typography>
                  )}
                {typeName == "Accounts" && details?.Phone !== undefined && (
                  <Typography>
                    <PhoneInTalkOutlinedIcon />
                    {details?.Phone?.includes("+")
                      ? details?.Phone
                      : "+" + details?.Phone}
                  </Typography>
                )}
              </LeadInfo>

              {/* <Typography variant="caption">
                <Link sx={{ color: "#006FBF !important" }}>
                  {" "}
                  Chief Executive Officer
                </Link>
              </Typography> */}
              {/* {details?.mail && <Typography component="span" className="personEmailsec">
                <Link href="#"> <Image
                  src="/assets/images/crm/layout/email_icon.svg"
                  alt="Edit"
                  width={14}
                  height={15}
                /> */}
              {/* {userLists?.find(ele => ele.email == details?.Lead_Owner)?.email} */}
              {/* { details?.mail}
                </Link>
              </Typography>} */}
            </Box>
          </AvatarContainer>

          <DetailStatusTop>
            {/* <Typography variant="body2">{details?.Lead_status}</Typography> */}
            <Tooltip title="Status" arrow placement="top">
              {leadUser !== undefined && (
                <SuccessStatusTop variant="caption">
                  {userLists?.find((ele) => ele.email == details?.Lead_Owner)
                    ?.status !== ""
                    ? userLists?.find((ele) => ele.email == details?.Lead_Owner)
                        ?.status
                    : "Non Active"}
                </SuccessStatusTop>
              )}
              {/* <SuccessStatus>Non Active</SuccessStatus> */}
            </Tooltip>
            {/* <Typography className="Phonefield">
              <PhoneInTalkOutlinedIcon /> */}
            {/* {userLists?.find(ele => ele.email == details?.Lead_Owner)?.phone_code?.includes("+") ? "" : "+"} {userLists?.find(ele => ele.email == details?.Lead_Owner)?.phone_code}{" "}
            {userLists?.find(ele => ele.email == details?.Lead_Owner)?.phone} */}
            {/* {details?.["Mobile_No."]}
            </Typography> */}
          </DetailStatusTop>
        </ProfileContainer>
        <SocialLinksContainer>
          {details?.Social &&
            JSON.parse(details?.Social)?.map((social, index) => (
              <IconButton aria-label="" size="small">
                <SocialLinksbutton
                  onClick={() => {
                    window.open(social?.value, "_blank", "noreferrer");
                  }}
                >
                  <StyledTooltip
                    title={
                      <SocialLinksTooltipText>
                        <Typography>
                          <Link>{social?.value}</Link>
                        </Typography>
                      </SocialLinksTooltipText>
                    }
                  >
                    {/* <span className="relatedWithValueShow"> */}
                    <span>
                      <Typography>
                        {
                          SocialMediaList.find(
                            (v) =>
                              v.name.toLowerCase() ===
                              social?.platform.toLowerCase()
                          )?.logo
                        }
                      </Typography>
                    </span>
                  </StyledTooltip>
                </SocialLinksbutton>
              </IconButton>
            ))}
        </SocialLinksContainer>
        <Divider />

        <ContentInnerInfo>
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
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, textTransform: "capitalize" }}
                >
                  {details?.Account}
                </Typography>
                {/* <Typography className="smalltxt">
                  <MailOutlineSharpIcon />
                  <Link underline="none">{details?.mail}</Link>
                  <div>
                    <Tooltip title="Copy Email" placement="top" arrow>
                      <ContentCopyIcon
                        className="emailcopy"
                        onClick={() => handleCopy(details?.mail)}
                      />
                    </Tooltip>
                  </div>
                </Typography> */}
              </Box>
            </CompanyAvatar>
          </ContentStack>
          {/* <ContentStack>
                        <HeadingBg>
                          <MainHeading variant="h5">RFQ</MainHeading>
                          <IconButton aria-label="More Option">
                            <MoreVertIcon />
                          </IconButton>
                        </HeadingBg>
                        <RfqContent>
                          <RfqTitle variant="h6">RFQ - Product Name</RfqTitle>
                          <RfqInfo>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.{" "}
                          </RfqInfo>
                          <AddNoteMessage>
                            <RfqTitle variant="h6">Add Note</RfqTitle>
                            <TextField
                              fullWidth
                              id="outlined-textarea"
                              placeholder="Type your message..."
                              multiline
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Image
                                      width={22}
                                      height={24}
                                      src={"/assets/images/crm/send_icon.svg"}
                                      alt="img"
                                    />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </AddNoteMessage>
                        </RfqContent>
                      </ContentStack> */}
          <ContentStack>
            <HeadingBg>
              <MainHeading variant="h5">Overview</MainHeading>
              {/* <IconButton aria-label="More Option">
                <MoreVertIcon />
              </IconButton> */}
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
                    <Typography>Assigned To</Typography>
                    <OverViewTxt style={{ color: "#103DDA" }}>
                      {
                        userLists?.find(
                          (ele) => ele.email == details.Lead_Owner
                        )?.name
                      }
                    </OverViewTxt>
                    {/*<DetalFieldContainer>
                       <SelectOption
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
                        <MenuItem value={10}>Assign To</MenuItem>
                        <MenuItem value={20}>Maya</MenuItem>
                        <MenuItem value={30}>Kamal</MenuItem>
                        <MenuItem value={30}>Shammi</MenuItem>
                      </SelectOption> 
                    </DetalFieldContainer>
                    */}
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
                    <Typography>Lead Status</Typography>
                    <DetailStatus>
                      {details?.Lead_status}
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
          {typeName == "Contacts" && (
            <ContentStack>
              <HeadingBg>
                <MainHeading variant="h5">Social Media Accounts</MainHeading>
              </HeadingBg>
              <SocialMediaFields>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <SocialMediaFInn>
                      <i className="icon-whatsapp"></i>
                      <SocialInffo>
                        <SocialIconLabel>Whatsapp</SocialIconLabel>
                        <SocialIconValue>9898765434</SocialIconValue>
                      </SocialInffo>
                    </SocialMediaFInn>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <SocialMediaFInn>
                      <i className="icon-skype"></i>
                      <SocialInffo>
                        <SocialIconLabel>Skpye</SocialIconLabel>
                        <SocialIconValue>john_doe@gmail.com</SocialIconValue>
                      </SocialInffo>
                    </SocialMediaFInn>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <SocialMediaFInn>
                      <i className="icon-linkedin-bold"></i>
                      <SocialInffo>
                        <SocialIconLabel>Linkedin</SocialIconLabel>
                        <SocialIconValue>
                          https://www.linkedin.com/feed/
                        </SocialIconValue>
                      </SocialInffo>
                    </SocialMediaFInn>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <SocialMediaFInn>
                      <i className="icon-x-social"></i>
                      <SocialInffo>
                        <SocialIconLabel>Twitter</SocialIconLabel>
                        <SocialIconValue>
                          https://twitter.com/public/Munawar-Khan/dfsdf/fsd
                        </SocialIconValue>
                      </SocialInffo>
                    </SocialMediaFInn>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <SocialMediaFInn>
                      <i className="icon-fb-bold"></i>
                      <SocialInffo>
                        <SocialIconLabel>Facebook</SocialIconLabel>
                        <SocialIconValue>
                          https://facebook.com/public/Munawar-Khan/dfsdf/fsd
                        </SocialIconValue>
                      </SocialInffo>
                    </SocialMediaFInn>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <AddButtonArea>
                      <MAddMorebtn
                        variant="text"
                        onClick={handleButtonClick}
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                        className="addmtag"
                        disableRipple
                      >
                        Add More
                      </MAddMorebtn>
                    </AddButtonArea>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <SocialContactsAddMore>
                      <Collapse in={showOptions}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={4.5} md={4.5}>
                            <FormControl fullWidth size="small">
                              <InputLabel id="demo-simple-select-helper-label">
                                Social Accounts
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-helper-label"
                                IconComponent={KeyboardArrowDownOutlinedIcon}
                                id="demo-simple-select-helper"
                                value={age}
                                label="Social Accounts"
                                size="small"
                                onChange={handleChange}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={4.5} md={4.5}>
                            <TextField
                              id="outlined-basic"
                              label="Outlined"
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={3} md={3}>
                            <AddButtonArea>
                              <MAddMorebtn
                                variant="text"
                                disableRipple
                                startIcon={<AddCircleOutlineOutlinedIcon />}
                                className="addmtag"
                              >
                                Add More
                              </MAddMorebtn>
                            </AddButtonArea>
                          </Grid>
                        </Grid>
                      </Collapse>
                    </SocialContactsAddMore>
                  </Grid>
                </Grid>
              </SocialMediaFields>
            </ContentStack>
          )}

          <ContentStack>
            <HeadingBg>
              <MainHeading variant="h5">Tags</MainHeading>
              {/* <IconButton aria-label="More Option">
                <MoreVertIcon />
              </IconButton> */}
            </HeadingBg>
            <PersonDetailTags>
              {details?.tag?.length > 0 &&
                details?.tag?.map((tagElement, index) => (
                  <Chip
                    key={index}
                    // className="greenchip"
                    sx={{
                      color: tagElement?.text_code,
                      backgroundColor: tagElement?.background_color_code,
                    }}
                    size="small"
                    icon={<SellOutlinedIcon />}
                    label={tagElement?.name}
                    onDelete={() => handleDelete(tagElement?.id)}
                    deleteIcon={<CloseRoundedIcon />}
                  />
                ))}
              {/* <PopupState variant="popper" popupId="demo-popup-popper"> */}
              {/* {(popupState) =>{  */}
              {/* // console.log(popupState, "popuState-----**********");
                  return(
                  <span>
                    <MAddMorebtn
                      variant="text"
                      disableRipple
                      startIcon={<AddCircleOutlineOutlinedIcon />}
                      // {...bindToggle(popupState)}
                      onClick={handleClickTag}
                    >
                      Add More Tags
                    </MAddMorebtn> */}
              {/* <Popper
                      {...bindPopper(popupState)}
                      transition
                      sx={PopperStyle}
                    > */}
              {
                // ({ TransitionProps }) => (
                //   <Fade {...TransitionProps} timeout={3050}>
                //     <TagPaperView>
                //       <PreTagBoxList>
                //         <MenuList dense>
                //           <MenuItem disableRipple>
                //             <ListItemText inset>
                //               <Chip
                //                 className="greenchip"
                //                 size="small"
                //                 icon={<SellOutlinedIcon />}
                //                 label="Whatsapp"
                //               />
                //             </ListItemText>
                //           </MenuItem>
                //           <MenuItem disableRipple>
                //             <ListItemText inset>
                //               <Chip
                //                 className="redchip"
                //                 size="small"
                //                 icon={<SellOutlinedIcon />}
                //                 label="Cold Call"
                //               />
                //             </ListItemText>
                //           </MenuItem>
                //           <MenuItem disableRipple>
                //             <ListItemText inset>
                //               {" "}
                //               <Chip
                //                 className="bluechip"
                //                 size="small"
                //                 icon={<SellOutlinedIcon />}
                //                 label="Advertisement"
                //               />
                //             </ListItemText>
                //           </MenuItem>
                //           <MenuItem disableRipple>
                //             <ListItemText inset>
                //               {" "}
                //               <Chip
                //                 className="greenchip"
                //                 size="small"
                //                 icon={<SellOutlinedIcon />}
                //                 label="Hot Call"
                //               />
                //             </ListItemText>
                //           </MenuItem>
                //         </MenuList>
                //       </PreTagBoxList>
                //     </TagPaperView>
                //   </Fade>
                // )
              }
              {/* </Popper> */}
              {/* </span>
                )}} */}
              <OutLinedButton
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : "false"}
                variant="contained"
                value={tags}
                // onChange={handleTagsChange}
                disableElevation
                onClick={handleClickTag}
                startIcon={<AddCircleOutlineOutlinedIcon />}
                disableRipple
              >
                Add More Tags
              </OutLinedButton>
              <TagStylePopover
                id={idTagPopOver}
                open={openTagPopOver}
                anchorEl={anchorElTag}
                onClose={async () => {
                  await dispatch(EditSingleLead(details));
                  setToHandleSideEffects(!toHandleSideEffects);
                }}
                onKeyDown={async (e) => {
                  if (e.key == "Enter") {
                    await dispatch(EditSingleLead(details));
                    setToHandleSideEffects(!toHandleSideEffects);
                  }
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <TagInnerDiv>
                  <TagsInput type={0} sendData={[]} />
                </TagInnerDiv>
              </TagStylePopover>
              {/* </PopupState> */}
            </PersonDetailTags>
          </ContentStack>
          <ContentStack>
            <TopActivityArea>
              <HeadingBg>
                <MainHeading variant="h5">Top Activities</MainHeading>
                {/* <IconButton aria-label="More Option">
                  <MoreVertIcon />
                </IconButton> */}
              </HeadingBg>
              {/* <OverviewHead variant="h6">Top Activities</OverviewHead> */}
              <ActivityColBoth>
                <Grid container spacing={1.5}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    onClick={() => dispatch(setDetailActiveTab(2))}
                  >
                    <ActivityCol className="callgradient">
                      <ActivityIcon>
                        <i className="icon-main-call"></i>
                        <Typography>Calls</Typography>
                      </ActivityIcon>
                      <ActivityProgress>
                        <Typography>{activitiesCount?.call}</Typography>
                      </ActivityProgress>
                    </ActivityCol>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    onClick={() => dispatch(setDetailActiveTab(2))}
                  >
                    <ActivityCol className="taskgradient">
                      <ActivityIcon>
                        <i className="icon-main-task"></i>
                        <Typography>Task</Typography>
                      </ActivityIcon>
                      <ActivityProgress>
                        <Typography>{activitiesCount?.task}</Typography>
                      </ActivityProgress>
                    </ActivityCol>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    onClick={() => dispatch(setDetailActiveTab(3))}
                  >
                    <ActivityCol className="notsgradient">
                      <ActivityIcon>
                        <i className="icon-crm-notes"></i>
                        <Typography>Notes</Typography>
                      </ActivityIcon>
                      <ActivityProgress>
                        <Typography>{activitiesCount?.notes}</Typography>
                      </ActivityProgress>
                    </ActivityCol>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <ActivityCol className="meetinggradient">
                      <ActivityIcon>
                        <i className="icon-main-meeting"></i>
                        <Typography>Meetings</Typography>
                      </ActivityIcon>
                      <ActivityProgress>
                        <Typography>{activitiesCount?.meeting}</Typography>
                      </ActivityProgress>
                    </ActivityCol>
                  </Grid>
                  {typeName == "Contacts" && (
                    <Grid item xs={12} sm={12} md={12}>
                      <ActivityCol className="dealgradient">
                        <ActivityIcon>
                          <i className="icon-crm-notes"></i>
                          <Typography>Deals</Typography>
                        </ActivityIcon>
                        <ActivityProgress>
                          <Typography>4</Typography>
                        </ActivityProgress>
                      </ActivityCol>
                    </Grid>
                  )}
                </Grid>
              </ActivityColBoth>
            </TopActivityArea>
            {/* <TopActivityArea>
                        <OverviewHead variant="h6">
                          Most Active Users
                        </OverviewHead>
                        <UserProgressBar>
                          <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <Typography>
                                <span>Kamalpreet</span> (6 Calls)
                              </Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <Box sx={{ width: "100%" }}>
                                <LinearProgressWithLabel
                                  value={progress}
                                  sx={LinerProgressbar}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <Typography>
                                <span>Aamina </span>(6 Calls)
                              </Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <Box sx={{ width: "100%" }}>
                                <LinearProgressWithLabel
                                  value={progress}
                                  sx={LinerProgressbar}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                          <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <Typography>
                                <span>Maya</span> (3 Calls)
                              </Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <Box sx={{ width: "100%" }}>
                                <LinearProgressWithLabel
                                  value={progress}
                                  sx={LinerProgressbar}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                        </UserProgressBar>
                      </TopActivityArea> */}
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
                    //sx={TooltipStyle}
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
          <ContentStack>
            <HeadingBg>
              <MainHeading variant="h5">Insight</MainHeading>
              <IconButton aria-label="More Option">
                <MoreVertIcon />
              </IconButton>
            </HeadingBg>
            <PagevisitArea>
              {/* <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}> */}
              <InsightColmn>
                <Typography variant="subtitle2">No. Of Visits</Typography>
                <Typography variant="subtitle2">
                  <span> 5 Hits</span>
                </Typography>
              </InsightColmn>
              {/* </Grid>
                <Grid item xs={12} sm={6} md={3}> */}
              <InsightColmn>
                <Typography variant="subtitle2">Total Duration</Typography>
                <Typography variant="subtitle2">
                  <span>23 Minute</span>
                </Typography>
              </InsightColmn>
              {/* </Grid>
                <Grid item xs={12} sm={6} md={3}> */}
              <InsightColmn>
                <Typography variant="subtitle2">Days Visited</Typography>
                <Typography variant="subtitle2">
                  <span>4 Days</span>
                </Typography>
              </InsightColmn>
              {/* </Grid>
                <Grid item xs={12} sm={6} md={3}> */}
              <InsightColmn>
                <Typography variant="subtitle2">Last Visit</Typography>
                <Typography variant="subtitle2">
                  <span>10:50pm Yesterday</span>
                </Typography>
              </InsightColmn>
              {/* </Grid>
              </Grid> */}
            </PagevisitArea>
          </ContentStack>
        </ContentInnerInfo>
      </DetailLeftContent>
    </Detailleft>
  );
};
export default PersonDetail;
