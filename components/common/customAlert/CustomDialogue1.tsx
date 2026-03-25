import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  BtnFilled,
  BtnOutlined,
} from "@/components/common/buttons/ButtonsVariations";
import RestorePageOutlinedIcon from "@mui/icons-material/RestorePageOutlined";
import {
  OuterContainer,
  CrossIconContainer,
  WarningHeaderStyle,
  WarningTextStyle,
  CloseIconContainer,
  closeIconStyle,
} from "../DeleteAlert/DeleteDialougeStyle";
import CloseIcon from "@mui/icons-material/Close";
import { ThreeDots } from "react-loader-spinner";

const CustomDialog = ({
  open,
  handleClose,
  text,
  onClickAction,
  loading,
  componentText = "",
  submitButtonText = "Proceed",
}: any) => {
  const [disableButton, setDisable] = useState<boolean>(false);
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ padding: 0, width: "100%" }}
    >
      <OuterContainer onClick={() => handleClose(false)}>
        <CrossIconContainer>
          <CloseIcon style={{ color: "#FF1A43" }} />
        </CrossIconContainer>
      </OuterContainer>
      <CloseIconContainer></CloseIconContainer>

      <DialogTitle id="alert-dialog-title1" sx={WarningHeaderStyle}>
        Are You Sure?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description1" sx={WarningTextStyle}>
          {componentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", marginBottom: 2 }}>
        <BtnFilled
          disabled={disableButton}
          type="submit"
          height={"36px"}
          onClick={async () => {
            setDisable(true);
            await onClickAction();
            setDisable(false);
          }}
        >
          {disableButton || loading ? (
            <ThreeDots
              height="40"
              width="40"
              radius="9"
              color="white"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              visible={true}
            />
          ) : (
            <>{submitButtonText}</>
          )}
        </BtnFilled>
        <BtnOutlined
          sx={{
            "&:hover": {
              backgroundColor: "#D7282F",
              color: "#fff",
            },
            backgroundColor: "#fff",
            color: "#D7282F",
          }}
          disabled={disableButton}
          height={"36px"}
          onClick={() => handleClose(false)}
        >
          Cancel
        </BtnOutlined>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
