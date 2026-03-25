import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ReviewEmailSupplier from "@/components/miniSite/Reviews/ReviewEmailSupplier";
import { Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import {
  DialougeContentstyle,
  MiniSiteLink,
  ProfileAndMinisiteLink,
  QuoteModalStyle,
  QuoteProfileInfo,
} from "./style";

export default function QueryModal({ open, handleClose, type = "" }) {
  const { seller_name, company_details }: any = useSelector(
    (state: any) => state.productDetail.detail.data
  );
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  useEffect(() => {
    let userData = localStorage?.userData ?? null;
    if (userData) {
      const { email, name } = JSON.parse(userData);
      setName(name);
      setEmail(email);
    }
  }, []);

  const BootstrapDialogTitle = (props: any) => {
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
              top: 3,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        sx={QuoteModalStyle}
        open={open}
        onClose={handleClose}
        style={{
          zIndex: 9999,
        }}
      >
        <BootstrapDialogTitle
          style={{ background: "#FFE9EA" }}
          id="customized-dialog-title"
          onClose={handleClose}
          sx={{
            padding: "10px",
            fontSize: "16px",
          }}
        >
          Contact Supplier
          {/* Email To This Supplier */}
        </BootstrapDialogTitle>
        <ProfileAndMinisiteLink>
          <QuoteProfileInfo>
            <Typography
              sx={{
                fontWeight: "400 !important",
              }}
            >
              To:
            </Typography>
            <Avatar
              style={{ margin: "0 14px" }}
              alt="Jack Sparrow"
              src={company_details?.logo}
            />
            <Typography>{seller_name}</Typography>
          </QuoteProfileInfo>
          <MiniSiteLink
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "#d7282f",
              },
            }}
            onClick={() =>
              window.open(
                `/mini-site/${company_details?.slug ?? "powercozmo"}/home`,
                "_blank"
              )
            }
          >
            {company_details?.company_name}
          </MiniSiteLink>
        </ProfileAndMinisiteLink>

        <DialogContent dividers sx={DialougeContentstyle}>
          <ReviewEmailSupplier
            heading={false}
            handleClose={handleClose}
            type={type}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
