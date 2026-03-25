import * as React from "react";
import {
  Avatar,
  Box,
  Divider,
  Menu,
  MenuItem,
  MenuProps,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { CrmStyledMenu } from "../commonStyle";
import { useSelector } from "react-redux";
import {
  ActivityDate,
  AvatarInfo,
  PersonDetail,
  PersonDetailTop,
  PriorityStatus,
  StatusContainer,
  StatusLabel,
  TaskKanbanInnerInfoData,
} from "../style";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import moment from "moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useAppDispatch } from "redux/store";
import {
  deleteTasks,
  getDetailOfSingleTasks,
  informationTaskMeetingCalls,
  setSelectedDataIds,
  updateEachTask,
} from "@/hooks/UseCreateFormData";
import { useRouter } from "next/router";
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

const KanbanListOther = (props) => {
  let list = props?.list;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { typeName, userLists } = useSelector((state: any) => state.formList);

  const [anchorElActivity, setAnchorElActivity] =
    React.useState<null | HTMLElement>(null);
  const openActivity = Boolean(anchorElActivity);

  const handleClickActivity = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElActivity(event.currentTarget);
  };
  const handleCloseActivity = () => {
    setAnchorElActivity(null);
  };

  const EditPopup = (params) => {
    dispatch(setSelectedDataIds([]));
    router.push(
      typeName == "Tasks"
        ? `tasks/${params?.id}`
        : typeName == "Calls"
        ? `calls/${params?.id}`
        : `meetings/${params?.id}`
    );
  };

  const handleDelete = async (list) => {
    try {
      const result = await dispatch(
        deleteTasks({ id: list?.id, type: typeName == 'Tasks' ? "task" : typeName == 'Calls' ? 'calls' : 'meetings' })
      );
      if (result?.payload?.status == 200) {
        toast.success(result?.payload?.message);
        dispatch(informationTaskMeetingCalls())
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <TaskKanbanInnerInfoData>
      <PersonDetailTop>
        <PersonDetail
          onClick={() => EditPopup(list)}
          style={{ cursor: "pointer" }}
        >
          {typeName == "Tasks"
            ? list?.subject
            : typeName == "Meetings"
            ? list?.title
            : list?.subject}
        </PersonDetail>
        <div>
          <div
            id="demo-customized-button"
            aria-controls={"demo-customized-menu"}
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
            transformOrigin={{
              horizontal: "right",
              vertical: "top",
            }}
            anchorOrigin={{
              horizontal: "right",
              vertical: "bottom",
            }}
          >
            <MenuItem
              onClick={() => EditPopup(list)}
              style={{ cursor: "pointer" }}
            >
              Edit
            </MenuItem>
            {typeName == "Tasks" ? (
              <>
                <Divider />
                <MenuItem
                  onClick={async () => {
                    const payload = {
                      status: "completed",
                    };
                    await dispatch(
                      updateEachTask({ id: list?.id, data: payload })
                    );
                    await dispatch(
                      getDetailOfSingleTasks({
                        id: list?.id,
                        type: "task",
                      })
                    );
                    setAnchorElActivity(null);
                  }}
                  disabled={list?.status=="completed"}
                >
                  Completed 
                </MenuItem>
                <Divider />
              </>
            ) : (
              <Divider />
            )}
            <MenuItem onClick={() => {handleDelete(list)}}>Delete</MenuItem>
          </StyledMenu>
        </div>
      </PersonDetailTop>
      <AvatarInfo onClick={() => EditPopup(list)} style={{ cursor: "pointer" }}>
        <Avatar
          style={{ marginRight: "14px" }}
          alt={"Host"}
          src={
            typeName == "Tasks"
              ? userLists?.find((ele) => ele.id == list?.task_owner)?.file_name
              : typeName == "Calls"
              ? userLists?.find((ele) => ele.id == list?.call_owner)?.file_name
              : userLists?.find((ele) => ele.id == list?.host)?.file_name
          }
        />
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {typeName == "Tasks"
              ? userLists?.find((ele) => ele.id == list?.task_owner)?.name
              : typeName == "Calls"
              ? userLists?.find((ele) => ele.id == list?.call_owner)?.name
              : userLists?.find((ele) => ele.id == list?.host)?.name}
          </Typography>
          <ActivityDate>
            <CalendarMonthOutlinedIcon />
            {typeName == "Tasks"
              ? moment(list?.task_date).format("DD MMM")
              : typeName == "Calls"
              ? moment(list?.call_start_date_time).format("DD MMM")
              : moment(list?.from).format(`MMM DD, hh:mm A`)}
          </ActivityDate>
        </Box>
      </AvatarInfo>
      {typeName == "Tasks" ? (
        <StatusContainer
          onClick={() => EditPopup(list)}
          style={{ cursor: "pointer" }}
        >
          <StatusLabel>
            <Typography>
              <Tooltip title="Status" arrow placement="top">
                <HelpOutlineOutlinedIcon />
              </Tooltip>
              {/* Status: */}{" "}
              <span
                style={{
                  color: "#57874B",
                  textTransform: "capitalize",
                }}
              >
                {list?.status?.replaceAll("-", " ")}
              </span>
            </Typography>
          </StatusLabel>
          <PriorityStatus>
            <Typography>
              <Tooltip title="Priority" arrow placement="top">
                <TourOutlinedIcon />
              </Tooltip>
              {/* Priority: */}
              <span
                style={{
                  color: "#D7282F",
                  textTransform: "capitalize",
                }}
              >
                {list?.priority}
              </span>
            </Typography>
          </PriorityStatus>
        </StatusContainer>
      ) : typeName == "Meetings" ? (
        <StatusContainer
          onClick={() => EditPopup(list)}
          style={{ cursor: "pointer" }}
        >
          <StatusLabel>
            <Typography>
              <Tooltip title="Status" arrow placement="top">
                <HelpOutlineOutlinedIcon />
              </Tooltip>
              {/* Status: */}{" "}
              <span
                style={{
                  color: "#57874B",
                  textTransform: "capitalize",
                }}
              >
                {list?.status?.replaceAll("-", " ")}
              </span>
            </Typography>
          </StatusLabel>
        </StatusContainer>
      ) : (
        <StatusContainer
          onClick={() => EditPopup(list)}
          style={{ cursor: "pointer" }}
        >
          <StatusLabel>
            <Typography>
              <Tooltip title="Status" arrow placement="top">
                <HelpOutlineOutlinedIcon />
              </Tooltip>
              {/* Status: */}{" "}
              <span
                style={{
                  color: "#57874B",
                  textTransform: "capitalize",
                }}
              >
                {list?.status?.replaceAll("-", " ")}
              </span>
            </Typography>
          </StatusLabel>
        </StatusContainer>
      )}
    </TaskKanbanInnerInfoData>
  );
};
export default KanbanListOther;
