import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { ManagaDeleteDialog } from "../style";

import { StyledBootstrapDialog } from "../commonStyle";
import { useSelector } from "react-redux";
import { setCallsPopUp, setMeetingPopUp, setTaskPopUp } from "@/hooks/UseCreateFormData";
import { useAppDispatch } from "redux/store";
import CloseIcon from "@mui/icons-material/Close";
import MeetingSchedule from "./MeetingSchedule";
import CallScheduler from "./CallScheduler";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const CallPopup = ({ openPopUp }) => {
  const dispatch = useAppDispatch();
  const { saveLoader, taskForm } = useSelector((state: any) => state.formList);

  const handleCloseColumn = () => {
    dispatch(setCallsPopUp(false));
  };

  return (
    <div>
      <StyledBootstrapDialog
        // onClose={handleCloseColumn}
        aria-labelledby="customized-dialog-title"
        open={openPopUp}
        sx={ManagaDeleteDialog}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseColumn}
        >
          Create Calls
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <CallScheduler />
        </DialogContent>
        {/* <DialogActions>                    
                </DialogActions> */}
      </StyledBootstrapDialog>
    </div>
  );
};

export default CallPopup;
