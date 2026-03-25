import * as React from "react";
import { Box, Button, Grid, Link, Typography, styled } from "@mui/material";
import {
  CardHeading,
  KanbanItem,
  KanbanItemHeader,
  ItemInfo,
  CardLayout,
  CardStyle,
  CardInfo,
  CardMail,
  CompanyInfo,
  ComanyIcon,
  AnnualRevenue,
  PriceValue,
  LeadNameValue,
  RevenueStack,
  EmailStack,
  LeadNumber,
  PriceBoxV,
  AddIcon,
  KanbanItemGreen,
  KanbanItemHeaderBlue,
  KanbanItemBlue,
  KanbanItemHeaderRed,
  KanbanItemRed,
  KanbanItemPurple,
  KanbanItemHeaderPurple,
  KanbanBoxContainer,
  CustomChip,
  LabelChipStack,
  CustomChip2,
  MoreTags,
  StyledBootstrapDialog,
} from "./style";
import Checkbox from "@mui/material/Checkbox";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Image from "next/image";
import ActivityScheduler from "../Leads/ActivityScheduler";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { SmallOutineBtn } from "../commonStyle";
import KanbanLayout from "./DraggableKanban";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    "&::-webkit-scrollbar": {
      width: "0.6em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#bbbaba",
      borderRadius: "8px",
    },
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    background: "#F5F5F5",
  },
  "& .MuiPaper-root": {
    maxWidth: "900px",
  },
  "& .MuiDialogTitle-root": {
    background: "#F5F5F5",
    color: "#4a4a4a",
    fontSize: "18px",
    fontWeight: "600",
    padding: "6px 16px",
  },
}));
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
            top: 0,
            color: "#4a4a4a",
          }}
        >
          <CancelOutlinedIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const KanbanViewDeal = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div>
        <StyledBootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Schedule an activity
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Box>
              <ActivityScheduler />
            </Box>
          </DialogContent>
          <DialogActions>
            <SmallOutineBtn onClick={handleClose} variant="outlined">
              Save
            </SmallOutineBtn>
            <SmallOutineBtn onClick={handleClose} variant="outlined">
              Cancel
            </SmallOutineBtn>
          </DialogActions>
        </StyledBootstrapDialog>
      </div>
      <KanbanBoxContainer>        
          <KanbanLayout/>
      </KanbanBoxContainer>
    </>
  );
};
export default KanbanViewDeal;
