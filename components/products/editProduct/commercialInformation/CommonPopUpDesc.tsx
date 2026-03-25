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
} from "../../../common/DeleteAlert/DeleteDialougeStyle";
import CloseIcon from "@mui/icons-material/Close";
import { ThreeDots } from "react-loader-spinner";

const CommonPopUpDesc = (props: any) => {
  const { open, handleClose, text, onClickAction } =
    props;
//   const [disableButton, setDisable] = useState<boolean>(false);

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
      {/* <CloseIconContainer>
          <CloseIcon style={closeIconStyle} />
      </CloseIconContainer> */}

      <DialogTitle id="alert-dialog-title1" sx={WarningHeaderStyle}>
        Are You Sure?
      </DialogTitle>
      <DialogContent>

          <DialogContentText
            id="alert-dialog-description1"
            sx={WarningTextStyle}
          >
            {/* Do you want to move the selected {text} to trash? */}
            {text}
          </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", marginBottom: 2 }}>
        <BtnFilled
        //   disabled={disableButton}
          type="submit"
          height={"36px"}
          onClick={() => {
            // setDisable(true);
            onClickAction();
            // readyToProceed(true);
          }}
        >
        Okay !
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
        //   disabled={disableButton}
          height={"36px"}
          onClick={() => handleClose(false)}
        >
          Cancel
        </BtnOutlined>
      </DialogActions>
    </Dialog>
  );
};

export default CommonPopUpDesc;
