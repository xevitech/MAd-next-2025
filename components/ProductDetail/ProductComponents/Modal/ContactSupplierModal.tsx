import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Supplier from "../Supplier";
import { Box } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "400px",
    maxWidth: "400px",
    "@media screen and (max-width:600px)": {
      width: "97%",
      maxWidth: "97%",
    },
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ContactSupplierModal = (props) => {
  const handleClose = () => {
    props.handleClose();
  };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Contact Supplier
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box
            sx={{
              "& .Headername": {
                display: "none",
              },
              "& .Outercontainer": {
                justifyContent: "flex-end",
                "@media screen and (max-width:380px)": {
                  textAlign: "right",
                },
              },
              "& .Border": {
                border: "none",
                padding: "0px",
                margin: "0px !important",
              },
              "& .Divider": {
                display: "none",
              },
              "& .Imageoutercontainer": {
                marginTop: "-20px",
                paddingTop: "0px !important",
                "@media screen and (max-width:380px)": {
                  marginTop: "0px",
                  marginLeft: "0px",
                },
              },
              "& .ButtonTop button": {
                "@media screen and (max-width:380px)": {
                  border: "none !important",
                  marginTop: "-40px",
                  marginRight: "-16px",
                },
              },
            }}
          >
            <Supplier handleClose={handleClose} />
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default ContactSupplierModal;
