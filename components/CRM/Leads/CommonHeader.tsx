import * as React from "react";
import {
  Avatar,
  Box,
  FormControl,
  Grid,
  IconButton,
  ListItemIcon,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ActivityColumn,
  ActivityDate,
  ActivityHead,
  ActivityThreeColumn,
  AvatarInfo,
  StatusLabel,
  InnerInfoContainer,
  InnerInfoData,
  StatusContainer,
  PersonDetail,
  ActivityCard,
  MeetingHead,
  OpenCallHead,
  OpenCallStatus,
  PersonDetailTop,
} from "../style";
import Image from "next/image";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import ActivityScheduler from "./ActivityScheduler";
import { useAppDispatch } from "redux/store";
import {
  getAllListOfTasks,
  setCallsPopUp,
  setTaskPopUp,
  setMeetingPopUp,
} from "@/hooks/UseCreateFormData";
import { useSelector } from "react-redux";
import ActivitySkeleton from "../Skeletons/ActivitySkeleton";
import TasksList from "./TasksList";
import MeetingLists from "./MeetingLists";
import CallLists from "./CallLists";
import { ProfileHeader } from "@/components/common/profileheader";
import {
  CommonTopSearch,
  CrmMainHeadingFullArea,
  QuickAddBox,
  QuickAddBoxInn,
  QuickAddMenu,
} from "../commonStyle";
import AddIcon from "@mui/icons-material/Add";
import TopCommonSearch from "./TopCommonSearch";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import {
  fetchAllFields,
  setTypeId,
  setTypeName,
} from "@/hooks/UseCreateFormData";
import CreateForm from "./CreateForm";
import TaskPopUp from "./TaskPopUp";
const CommonHeader = (props) => {
  const dispatch = useAppDispatch();
  const { typeName, userLists, taskPopUp } = useSelector(
    (state: any) => state.formList
  );

  const [openPopup, setOpenPopup] = React.useState(false);
  const handleClickOpen = async (type) => {
    dispatch(setTypeId(type));
    if (type == 4) {
      dispatch(setTypeName("Contacts"));
    } else if (type == 3) {
      dispatch(setTypeName("Accounts"));
    } else if (type == 2) {
      dispatch(setTypeName("Deals"));
    } else {
      dispatch(setTypeName("Leads"));
    }
    setOpenPopup(true);
    await dispatch(fetchAllFields());
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openAdd = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClosePopUp = () => {
    setOpenPopup(false);
  };
  return (
    <CrmMainHeadingFullArea>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={7} lg={5} className="Crmtophead">
          <ProfileHeader
            classname="crm_main_heading"
            text={`${typeName} Management Center`}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={4} className="Crmtophead">
          <CommonTopSearch>
            <FormControl variant="standard" fullWidth>
              <TopCommonSearch defaultOwner={[]} userLists={userLists} />
            </FormControl>
            <QuickAddBox>
              <QuickAddBoxInn>
                <Tooltip title="Quick Add">
                  <IconButton
                    className="Addcommonbutton"
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </QuickAddBoxInn>
              <QuickAddMenu
                anchorEl={anchorEl}
                id="account-menu"
                open={openAdd}
                disableScrollLock
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    width: "150px",
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
                      left: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                      "@media screen and (max-width: 767px)": {
                        right: 14,
                        left: "auto",
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              >
                <MenuItem onClick={() => handleClickOpen(1)}>
                  <ListItemIcon>
                    <i className="icon-leads"></i>
                  </ListItemIcon>
                  Lead
                </MenuItem>
                <MenuItem onClick={() => handleClickOpen(4)}>
                  <ListItemIcon>
                    <i className="icon-contact"></i>
                  </ListItemIcon>
                  Contact
                </MenuItem>
                <MenuItem onClick={() => handleClickOpen(3)}>
                  <ListItemIcon>
                    <i className="icon-account"></i>
                  </ListItemIcon>
                  Accounts
                </MenuItem>
                <MenuItem onClick={() => handleClickOpen(2)}>
                  <ListItemIcon>
                    <i className="icon-deal"></i>
                  </ListItemIcon>
                  Deal
                </MenuItem>
                <MenuItem onClick={() => dispatch(setTaskPopUp(true))}>
                  <ListItemIcon>
                    {/* <Image
                                                src="/assets/images/crm/opentask.svg"
                                                alt="Edit"
                                                width={16}
                                                height={16}
                                            /> */}
                    <i className="icon-main-task"></i>
                  </ListItemIcon>
                  Tasks
                </MenuItem>
                <MenuItem onClick={() => dispatch(setMeetingPopUp(true))}>
                  <ListItemIcon>
                    <i className="icon-main-meeting"></i>
                  </ListItemIcon>
                  Meetings
                </MenuItem>
                <MenuItem onClick={() => dispatch(setCallsPopUp(true))}>
                  <ListItemIcon>
                    <i className="icon-main-call"></i>
                  </ListItemIcon>
                  Calls
                </MenuItem>
                {/* <MenuItem onClick={() => handleClickOpen(1)}>
                                        <ListItemIcon>
                                            <i className="icon-signal"></i>
                                        </ListItemIcon>
                                        Sales Signal
                                    </MenuItem> */}
                <MenuItem onClick={handleClickOpen}>
                  <ListItemIcon>
                    <DescriptionOutlinedIcon />
                  </ListItemIcon>
                  Quotes
                </MenuItem>
                <MenuItem onClick={handleClickOpen}>
                  <ListItemIcon>
                    <RequestQuoteOutlinedIcon />
                  </ListItemIcon>
                  Invoice
                </MenuItem>
              </QuickAddMenu>
            </QuickAddBox>
          </CommonTopSearch>
        </Grid>
        {/* <Grid item xs={12} sm={4} md={3} lg={2}>
        <FixedCreateButton>
          <RedOutLinedButton
            variant="outlined"
            startIcon={<i className="icon-leadsblack"></i>}
            onClick={async (e) => {
              handleClickOpen(typeId);
            }}
          >
            Create {typeName}
          </RedOutLinedButton>
        </FixedCreateButton>
      </Grid> */}
      </Grid>
      {openPopup && <CreateForm open={true} setFormStatus={handleClosePopUp} />}
      {/* {taskPopUp && <TaskPopUp openPopUp={true} />} */}
    </CrmMainHeadingFullArea>
  );
};
export default CommonHeader;
