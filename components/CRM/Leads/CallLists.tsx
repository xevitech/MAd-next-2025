import * as React from "react";
import { Avatar, Box, IconButton, Tooltip, Typography, styled } from "@mui/material";
import {
  ActivityDate,
  AvatarInfo,
  StatusLabel,
  InnerInfoData,
  PriorityStatus,
  StatusContainer,
  PersonDetail,
  PersonDetailTop,
  OpenCallStatus,
} from "../style";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import { useAppDispatch } from "redux/store";
import {
  createAndScheduleCalls,
  createHistory,
  createMeetings,
  createTaskAndSchedule,
  deleteTasks,
  getAllListOfTasks,
  getDetailOfSingleTasks,
  setActivityFormType,
  setActivityViewType,
} from "@/hooks/UseCreateFormData";
import { useSelector } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { CrmStyledMenu } from "../commonStyle";
import moment from "moment";
import { toast } from "react-toastify";

const StyledMenu = styled((props: MenuProps) => (
  <Menu elevation={0} {...props} />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    "& .MuiDivider-root": { margin: "0" },
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 100,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
    },
  },
}));

const CallLists = (props) => {
  const dispatch = useAppDispatch();
  const { typeId, details } = useSelector((state: any) => state.formList);
  const [anchorElActivity, setAnchorElActivity] =
    React.useState<null | HTMLElement>(null);
  const openActivity = Boolean(anchorElActivity);
  const handleClickActivity = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElActivity(event.currentTarget);
  };
  const handleCloseActivity = () => {
    setAnchorElActivity(null);
  };

  const cloneCall = async (data) => {
    var body = {
      unique_id: data?.unique_id,
      type_id: data?.type_id,
      call_to: data?.call_to,
      status: data?.status,
      call_type: data?.call_type,
      call_start_date_time: data?.call_start_date_time,
      call_owner: data?.call_owner,
      subject: data?.subject,
      reminder: data?.reminder,
      call_purpose: data?.call_purpose,
      call_agenda: data?.call_agenda,
      recording: data?.recording,
      incoming_call_reason: data?.incoming_call_reason,
      call_duration: data?.call_duration,
    };

    let response = await dispatch(createAndScheduleCalls(body));
    if (response?.payload?.status == 200) {
      await dispatch(getAllListOfTasks());
      await dispatch(
        createHistory({
          lead_id: details.unique_id,
          type_id: typeId,
          name: "Activity",
          type: "activity",
          message:
            data?.status == "scheduled"
              ? `<span>Activity Created - </span>clone call and <b>${
                  data?.status
                }</b> at <b>${moment(data?.call_start_date_time).format(
                  "YYYY-MM-DD HH:mm A"
                )}</b> `
              : `<span>Activity Created - </span>clone logged a call at <b>${moment(
                  data?.call_start_date_time
                ).format("YYYY-MM-DD HH:mm A")}</b> `,
        })
      );
      toast.success(response?.payload?.message);
      setAnchorElActivity(null);
    }
  };

  const calls = props.data;
  return (
    <>
      <InnerInfoData key={props.key}>
        <PersonDetailTop>
          <PersonDetail>{calls?.subject}</PersonDetail>
          <div>
            <div
              id="demo-customized-button"
              aria-controls={openActivity ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openActivity ? "true" : undefined}
              onClick={handleClickActivity}
            >
              <IconButton aria-label="delete">
                <MoreHorizIcon />
              </IconButton>
            </div>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorElActivity}
              open={openActivity}
              sx={CrmStyledMenu}
              onClose={handleCloseActivity}
              PaperProps={{
                elevation: 0,
                sx: {
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
              {props.title == "Open" && (
                <>
                  <MenuItem
                    onClick={async () => {
                      dispatch(setActivityFormType("call"));
                      dispatch(setActivityViewType("edit"));
                      setAnchorElActivity(null);
                      await dispatch(
                        getDetailOfSingleTasks({ id: calls.id, type: "call" })
                      );
                    }}
                  >
                    Edit
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={async () => {
                      await dispatch(
                        createAndScheduleCalls({
                          status: "call-a-log",
                          id: calls.id,
                        })
                      );
                      await dispatch(getAllListOfTasks());
                      await dispatch(
                        createHistory({
                          lead_id: details.unique_id,
                          type_id: typeId,
                          name: "Activity",
                          type: "activity",
                          message: `<span>Activity Updated - call has been completed`,
                        })
                      );
                    }}
                  >
                    Completed
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => cloneCall(calls)}>Clone</MenuItem>
                  <Divider />
                </>
              )}
              <MenuItem
                onClick={async () => {
                  await dispatch(deleteTasks({ id: calls.id, type: "calls" }));
                  await dispatch(getAllListOfTasks());      
                  await dispatch(
                    createHistory({
                      lead_id: details.unique_id,
                      type_id: typeId,
                      name: "Activity",
                      type: "activity",
                      message: `<span>Activity Updated - call has been deleted`,
                    })
                  );
                }}
              >
                Delete
              </MenuItem>
            </StyledMenu>
          </div>
        </PersonDetailTop>
        <AvatarInfo>
          <Avatar
            style={{ marginRight: "14px" }}
            alt={calls.owner.name}
            src={calls.owner.avatar}
          />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {calls.owner.name}
            </Typography>
            <ActivityDate>
              <CalendarMonthOutlinedIcon />
              {moment(calls?.call_start_date_time).format('MMMM Do YYYY, h:mm a')}
            </ActivityDate>
          </Box>
        </AvatarInfo>
        <StatusContainer>
          {props.title == "Open" ? (
            <>
              <StatusLabel>
                <Typography>
                <Tooltip title="Status" arrow placement="top">
                  <HelpOutlineOutlinedIcon />
                  </Tooltip>
                  {/* Status: */}
                  {" "}
                  <span
                    style={{ color: "#57874B", textTransform: "capitalize" }}
                  >
                    {calls.status}
                  </span>
                </Typography>
              </StatusLabel>
            </>
          ) : (
            <StatusLabel>
              <Typography>
                <HelpOutlineOutlinedIcon />
                Closed Time:{" "}
                <span style={{ color: "#57874B" }}>
                  {moment(calls.updated_at).format("ddd MMM DD YYYY")}
                </span>
              </Typography>
            </StatusLabel>
          )}
        </StatusContainer>
      </InnerInfoData>
    </>
  );
};
export default CallLists;
