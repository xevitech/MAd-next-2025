import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import {
  DialougeContentstyle,
  MiniSiteLink,
  ProfileAndMinisiteLink,
  QuoteModalStyle,
  QuoteProfileInfo,
} from "../style";
import MiniSiteQueryView from "@/components/miniSite/Reviews/MiniSiteQueryView";

export default function MiniSiteQuerySupplier({
  open,
  handleClose,
  type = "",
}) {
  const { headerData } = useSelector((state: any) => state.miniSite);

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
          Email To This Supplier
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
              src={headerData?.user_info?.profile_link}
            />
            <Typography>{headerData?.user_info?.name}</Typography>
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
                `/mini-site/${
                  headerData?.contact_profile?.name ?? "powercozmo"
                }/home`,
                "_blank"
              )
            }
          >
            {headerData?.contact_profile?.name}
          </MiniSiteLink>
        </ProfileAndMinisiteLink>

        <DialogContent dividers sx={DialougeContentstyle}>
          <MiniSiteQueryView
            heading={false}
            handleClose={handleClose}
            type={type}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
