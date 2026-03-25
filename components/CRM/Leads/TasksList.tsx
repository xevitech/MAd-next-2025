import * as React from "react";
import {
  Avatar,
  Box,
  IconButton,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import {
  ActivityDate,
  AvatarInfo,
  StatusLabel,
  InnerInfoData,
  PriorityStatus,
  StatusContainer,
  PersonDetail,
  PersonDetailTop,
} from "../style";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import { useAppDispatch } from "redux/store";
import {
  createHistory,
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
import { useRouter } from "next/router";

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

const TasksList = (props) => {
  const dispatch = useAppDispatch();
  const { details, typeId } = useSelector((state: any) => state.formList);
  const router = useRouter();
  const [anchorElActivity, setAnchorElActivity] =
    React.useState<null | HTMLElement>(null);
  const openActivity = Boolean(anchorElActivity);

  const handleClickActivity = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElActivity(event.currentTarget);
  };
  const handleCloseActivity = () => {
    setAnchorElActivity(null);
  };

  const cloneTask = async (data) => {
    let body = {
      unique_id: data?.unique_id,
      type_id: data?.type_id,
      task_owner: data?.task_owner,
      task_owner_email: data?.task_owner_email,
      subject: data?.subject,
      status: "in-progress",
      priority: data?.priority,
      task_date: data?.task_date,
      description: data?.description,
      reminder_date_time: data?.reminder_date_time,
      reminder_number: data?.reminder_number,
      reminder_status: data?.reminder_status,
      reminder_type: data?.reminder_type,
      related_with: data?.related_with,
      related_with_value: data?.related_with_value,
      crm_user_form_unique_id: data?.crm_user_form_unique_id,
      // reminder: data?.reminder,
      // reminder_date: data?.reminder_date,
      // reminder_time: data?.reminder_time,
      // reminder_type: data?.reminder_type,
      // reminder_before_number: data?.reminder_before_number,
      // reminder_due_time: data?.reminder_due_time,
      // notify_on: data?.notify_on,
    };
    let response = await dispatch(createTaskAndSchedule(body));
    if (response?.payload?.status == 200) {
      await dispatch(getAllListOfTasks());
      await dispatch(
        createHistory({
          lead_id: details.unique_id,
          type_id: typeId,
          name: "Activity",
          type: "activity",
          message: `<span>Activity Created - task <b>${
            data?.subject
          }</b>scheduled at <b>${moment(data?.task_date).format(
            "YYYY-MM-D"
          )}</b> `,
        })
      );
      toast.success(response?.payload?.message);
      setAnchorElActivity(null);
    }
  };

  const tasks = props.data;
  return (
    <>
      <InnerInfoData key={props.key}>
        <PersonDetailTop>
          <PersonDetail>{tasks.subject}</PersonDetail>
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
                      dispatch(setActivityFormType("task"));
                      dispatch(setActivityViewType("edit"));
                      setAnchorElActivity(null);
                      await dispatch(
                        getDetailOfSingleTasks({ id: tasks.id, type: "task" })
                      );
                    }}
                  >
                    Edit
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={async () => {
                      await dispatch(
                        createTaskAndSchedule({
                          status: "completed",
                          id: tasks.id,
                        })
                      );
                      await dispatch(getAllListOfTasks());
                      await dispatch(
                        createHistory({
                          lead_id: details.unique_id,
                          type_id: typeId,
                          name: "Activity",
                          type: "activity",
                          message: `<span>Activity Updated - task has been completed`,
                        })
                      );
                    }}
                  >
                    Completed
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => cloneTask(tasks)}>Clone</MenuItem>
                  <Divider />
                </>
              )}

              <MenuItem
                onClick={async () => {
                  await dispatch(deleteTasks({ id: tasks.id, type: "task" }));
                  await dispatch(getAllListOfTasks());
                  await dispatch(
                    createHistory({
                      lead_id: details.unique_id,
                      type_id: typeId,
                      name: "Activity",
                      type: "activity",
                      message: `<span>Activity Updated - task has been deleted`,
                    })
                  );
                }}
              >
                Delete
              </MenuItem>
            </StyledMenu>
          </div>
        </PersonDetailTop>
        <div
          onClick={() => {
            router.push(`/crmV1/tasks/${props.data.id}`);
          }}
        >
          <AvatarInfo>
            <Avatar
              style={{ marginRight: "14px" }}
              alt={tasks.owner.name}
              src={tasks.owner.avatar}
            />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {tasks.owner.name}
              </Typography>
              <ActivityDate>
                <CalendarMonthOutlinedIcon />
                {moment(tasks.created_at).format("ddd MMM DD YYYY")}
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
                    {/* Status: */}{" "}
                    <span
                      style={{ color: "#57874B", textTransform: "capitalize" }}
                    >
                      {tasks.status.replaceAll("-", " ")}
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
                      style={{ color: "#D7282F", textTransform: "capitalize" }}
                    >
                      {tasks.priority}
                    </span>
                  </Typography>
                </PriorityStatus>
              </>
            ) : (
              <PriorityStatus>
                <Typography>
                  <TourOutlinedIcon />
                  Closed Time:
                  <span style={{ color: "#D7282F" }}>
                    {moment(tasks.updated_at).format("ddd MMM DD YYYY")}
                  </span>
                </Typography>
              </PriorityStatus>
            )}
          </StatusContainer>
        </div>
      </InnerInfoData>
    </>
  );
};
export default TasksList;
