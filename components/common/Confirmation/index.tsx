import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  CrossIconContainer,
  WarningTextStyle,
  CloseIconContainer,
  closeIconStyle,
  BtnOutlinedRed,
} from "./style";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const AlertMessage = ({ open, handleClose, text }: any) => {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        padding: 0,
        width: "100%",
        "& .MuiDialog-paper": {
          minWidth: "400px",
          "@media screen and (max-width:600px)": { minWidth: "auto" },
        },
      }}
    >
      <CrossIconContainer></CrossIconContainer>
      <CloseIconContainer>
        <InfoOutlinedIcon style={closeIconStyle} />
      </CloseIconContainer>
      <DialogContent>
        <DialogContentText id="alert-dialog-description1" sx={WarningTextStyle}>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", marginBottom: 2 }}>
        {/* <BtnOutlinedRed onClick={() => handleClose(false)}>
          Cancel
        </BtnOutlinedRed> */}
        <BtnOutlinedRed
          sx={{ minWidth: "auto", padding: "0px 18px", height: "36px" }}
          onClick={() => handleClose(false)}
        >
          Ok
        </BtnOutlinedRed>
      </DialogActions>
    </Dialog>
  );
};

export default AlertMessage;
