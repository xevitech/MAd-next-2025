import * as React from "react";
import { Box, Button } from "@mui/material";
import {
  ActivityBtnContainer,
  ActivityContainer,
  AddActivity,
  OpenCloseBtnContainer,
} from "../style";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Activites from "./Activites";
import { CrmStyledMenu, OutlineBigButton, RedBgBtn } from "../commonStyle";
import Image from "next/image";
import { styled, alpha } from "@mui/material/styles";
import { useAppDispatch } from "redux/store";
import {
  setActivityType,
  setActivityViewType,
  setSingleActivity,
} from "@/hooks/UseCreateFormData";
import { useSelector } from "react-redux";
import Scheduler from "./Scheduler";
import SchedulerUpdate from "./SchedulerUpdate";
import MeetingSchedule from "./MeetingSchedule";
import CallScheduler from "./CallScheduler";
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    "& .MuiDivider-root": { margin: "0" },
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 115,
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
      fontSize: 14,
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
      "&.MuiDivider-root": {
        margin: 0,
      },
    },
  },
}));

const LeadActivities = () => {
  const [activities, setActivities] = React.useState("open");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const { activityType, activityViewType, activityFormType } = useSelector(
    (state: any) => state.formList
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (type) => {
    dispatch(setActivityType(type));
    setAnchorEl(null);
  };
  const showActivites = async (params) => {
    setActivities(params);
  };

  React.useEffect(() => {
    dispatch(setActivityViewType("add"));
    dispatch(dispatch(setSingleActivity([])));
  }, []);

  return (
    <>
      <ActivityContainer>
        {activityViewType == "add"
          ? activityType == 0 && (
              <ActivityBtnContainer>
                <OpenCloseBtnContainer>
                  <OutlineBigButton
                    className={activities == "open" && "highlightedbtn"}
                    variant="contained"
                    startIcon={
                      <Image
                        src="/assets/images/crm/opentask.svg"
                        alt="Edit"
                        width={18}
                        height={18}
                      />
                    }
                    onClick={(e) => {
                      showActivites("open");
                    }}
                  >
                    Open Activities
                  </OutlineBigButton>
                  <OutlineBigButton
                    variant="contained"
                    className={activities == "close" && "highlightedbtn"}
                    startIcon={
                      <Image
                        src="/assets/images/crm/opencallicon.svg"
                        alt="Edit"
                        width={15}
                        height={18}
                      />
                    }
                    onClick={(e) => {
                      showActivites("close");
                    }}
                  >
                    Closed Activities
                  </OutlineBigButton>
                </OpenCloseBtnContainer>
                <AddActivity>
                  <RedBgBtn
                    id="demo-customized-button"
                    aria-controls={open ? "demo-customized-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                    sx={CrmStyledMenu}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    Add New
                  </RedBgBtn>
                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => {
                      dispatch(setActivityType(""));
                      setAnchorEl(null)
                    }}
                  >
                    <MenuItem onClick={() => handleClose(1)}>Task</MenuItem>
                    <Divider sx={{ margin: 0 }} />
                    <MenuItem onClick={() => handleClose(3)}>Meeting</MenuItem>
                    <Divider sx={{ margin: 0 }} />
                    <MenuItem onClick={() => handleClose(2)}>Call</MenuItem>
                  </StyledMenu>
                </AddActivity>
              </ActivityBtnContainer>
            )
          : null}
        {activityViewType == "add" || activityViewType != "edit" ? (
          activities == "open" ? (
            <Activites title={"Open"} />
          ) : (
            <Activites title={"Close"} />
          )
        ) : null}

        {activityViewType == "edit" && activityFormType == "task" && (
          <Box mt={2}>
            <SchedulerUpdate />
          </Box>
        )}
        {activityViewType == "edit" && activityFormType == "meeting" && (
          <MeetingSchedule />
        )}
        {activityViewType == "edit" && activityFormType == "call" && (
          <CallScheduler />
        )}
      </ActivityContainer>
    </>
  );
};
export default LeadActivities;
