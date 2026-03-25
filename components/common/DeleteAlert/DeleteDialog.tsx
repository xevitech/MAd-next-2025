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
} from "./DeleteDialougeStyle";
import CloseIcon from "@mui/icons-material/Close";
import { ThreeDots } from "react-loader-spinner";

const DeleteDialog = ({
  open,
  handleClose,
  text,
  onClickAction,
  loading,
  componentText,
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
      <CloseIconContainer>
        {componentText == "trashed" ? (
          <RestorePageOutlinedIcon
            style={{
              width: "50px",
              height: "50px",
              color: "#d7282f",
            }}
          />
        ) : (
          <CloseIcon style={closeIconStyle} />
        )}
      </CloseIconContainer>

      <DialogTitle id="alert-dialog-title1" sx={WarningHeaderStyle}>
        Are You Sure?
      </DialogTitle>
      <DialogContent>
        {componentText == "trashed" ? (
          <DialogContentText
            id="alert-dialog-description1"
            sx={WarningTextStyle}
          >
            You want to restore selected {text} .
          </DialogContentText>
        ) : (
          <DialogContentText
            id="alert-dialog-description1"
            sx={WarningTextStyle}
            dangerouslySetInnerHTML={{
              __html:
                componentText == "wishlist"
                  ? `Do you want to remove from ${text}?`
                  : `Do you want to delete ${text}?`,
            }}
          />
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", marginBottom: 2 }}>
        <BtnFilled
          disabled={disableButton}
          type="submit"
          height={"36px"}
          onClick={() => {
            setDisable(true);
            onClickAction();
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
            <>
              {" "}
              {componentText === "trashed"
                ? "Restore"
                : componentText === "wishlist"
                ? "Remove"
                : "Delete"}
            </>
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

export default DeleteDialog;
