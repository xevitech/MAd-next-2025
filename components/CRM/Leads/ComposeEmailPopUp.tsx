import React, { useEffect, useState } from "react";
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { ComposemailTitleTop, HighCrossIcon, ManagaDeleteDialog } from "../style";

import { SmallOutineBtn, StyledBootstrapDialog } from "../commonStyle";
import { useSelector } from "react-redux";
import { setComposeEmailPopUp, setDraftData } from "@/hooks/UseCreateFormData";
import { useAppDispatch } from "redux/store";
import { ThreeDots } from "react-loader-spinner";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import Scheduler from "./Scheduler";
import ComposeEmail from "./ComposeEmail";

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
      {/* {onClose ? (
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
      ) : null} */}
    </DialogTitle>
  );
}

const ComposeEmailPopUp = ({ openPopUp }) => {
  const dispatch = useAppDispatch();
  const { selectedDataEmails, selectedDataIds } = useSelector((state: any) => state.formList);

  const handleCloseColumn = () => {
    dispatch(setComposeEmailPopUp(false));
  };

  useEffect(() => {
    dispatch(setDraftData(''))
  }, [])
  const emails = selectedDataEmails?.map((ele) => {
    return ele?.mail;
  });
  const uniqueEmailsData = new Set(emails);
  const uniqueEmails = Array.from(uniqueEmailsData);

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
          <ComposemailTitleTop>
            <span>
              Compose Email
            </span>

            <HighCrossIcon />
          </ComposemailTitleTop>
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <ComposeEmail
            type={"popup"}
            reciver={uniqueEmails?.join(";")}
            unique_id={selectedDataIds.join(",")}
          />
        </DialogContent>
        {/* <DialogActions>                    
                </DialogActions> */}
      </StyledBootstrapDialog>
    </div>
  );
};

export default ComposeEmailPopUp;
