import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Typography,
  Box,
  styled,
} from "@mui/material";
import {
  BtnFilled,
  BtnOutlined,
} from "@/components/common/buttons/ButtonsVariations";
import * as Yup from "yup";
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
import Auth from "@/auth/Auth";
import { EyeIconContainer } from "@/components/guestLayout/user/styles";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { LightTooltip } from "../Tooltip/tooltip";
import { InputItemContainer } from "../updateprofilemodal/styles";
import { useFormik } from "formik";
import { apiClient } from "../common";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
const StyleDialoge = {
  "& .MuiDialog-paper": {
    width: "450px",
  },
  "& .MuiDialogContent-root": {
    padding: "20px 20px 6px 20px"
  }
};

export const SureText = styled(Typography)({
  fontSize: "23px",
  color: "#231f20",
  fontWeight: "700",
  textAlign: "center",
  padding: "10px 0 0",
  "@media screen and (max-width:320px)": {
    fontSize: "16px",
  },
});






const DeleteAccount = ({
  open,
  handleClose,
  text,
  onClickAction,
  loading,
  componentText,
}: any) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const validation = Yup.object().shape({
    password:
      activeStep == 2
        ? Yup.string()
          .required("Please enter password")
          .min(6, "Mininum 6 characters")
        : Yup.string().notRequired(),
    message: Yup.string()
      .required("Please enter message"),
  });

  let formik = useFormik({
    initialValues: {
      password: "",
      message: "",
    },
    enableReinitialize: true,
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const {
        password,
        message
      } = values;
      if (activeStep === 2) {
        let response = await apiClient("profile/verify/delete_account", "post", {
          body: { leave_reason: message, password: password },
        });

        if (response.status == 200) {
          setDisable(false);
          Auth.logout();
          window.location.href = "/user/signin";
          handleClose(false)
        } else {
          setDisable(false);
          formik.setFieldError("password", response.message)
        }

      }
    }
  });
  const [disableButton, setDisable] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(true);

  const handleTextMessage = (e: any) => {
    formik.setFieldValue("message", e?.target?.value)
    formik.setFieldError("message", "")
  }

  const handleCloseModal = () => {
    handleClose(false)
    setActiveStep(1)
    setDisable(false);
    setShowPassword(true)
    formik.setFieldValue("message", "");
    formik.setFieldValue("password", "");
    formik.setFieldError("password", "")
  }

  const handleDeleteAccount = () => {
    formik.handleSubmit();
  }

  return (
    <Dialog sx={StyleDialoge}
      open={open}
      // onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    //sx={{ padding: 0, width: "100%" }}
    >
      <OuterContainer onClick={() => handleCloseModal()} sx={{ padding: "10px" }}>
        <CrossIconContainer>
          <CloseIcon style={{ color: "#FF1A43" }} />
        </CrossIconContainer>
      </OuterContainer>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            height: "50px",
            width: "50px",
            borderRadius: "50%",
            border: "1px solid #d7272f",
            transform: "matrix(-1, 0, 0, 1, 0, 0)",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DeleteOutlineRoundedIcon
            sx={{ color: "#d7282f", fontSize: "35px" }}
          />
        </Box>
      </Box>
      <SureText>
        Are You Sure?
      </SureText>

      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: "400",
          color: "#4a4a4a",
          textAlign: "center",
        }}
      >
        Do you want delete your account permanently?
      </Typography>
      {activeStep == 1 && <DialogContent>
        <DialogContentText
          id="alert-dialog-description1"
          sx={WarningTextStyle}
        >
          <TextField
            value={formik.values.message}
            fullWidth
            multiline
            size='small'
            minRows={3}
            placeholder='Please mention the reason to delete account.'
            error={formik.errors.message ? true : false}
            helperText={formik.errors.message}
            onChange={handleTextMessage}  
          />        
        </DialogContentText>
      </DialogContent>
      }
      {activeStep == 2 && <DialogContent>
        <InputItemContainer>
          {!showPassword ? (
            <LightTooltip
              title="Hide Password"
              arrow
              placement="top"
              disableInteractive
            >
              <EyeIconContainer sx={{ top: "6px" }}>
                <AiFillEye
                  onClick={() => {
                    setShowPassword(true);
                  }}
                />
              </EyeIconContainer>
            </LightTooltip>
          ) : (
            <LightTooltip
              title="Show Password"
              arrow
              placement="top"
              disableInteractive
            >
              <EyeIconContainer sx={{ top: "6px" }}>
                <AiFillEyeInvisible
                  onClick={() => setShowPassword(false)}
                />
              </EyeIconContainer>
            </LightTooltip>
          )}
          <TextField
            style={{ /* width: "85%",*/ margin: "auto" }}
            InputLabelProps={{
              style: { fontSize: 14, fontWeight: 700 },
              shrink: true,
            }}
            size="small"
            autoFocus
            error={formik.errors.password ? true : false}
            helperText={formik.errors.password}
            type={!showPassword ? "text" : "password"}
            fullWidth
            label="Password"
            id="password"
            value={formik.values.password}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setDisable(true);
                handleDeleteAccount()
              }
            }}
            onChange={(e) => {
              formik.setFieldValue("password", e.target.value);
              formik.setFieldError("password", "");
              setDisable(false);
            }}
            inputProps={{
              autoComplete: "new-password",
            }
            }
          ></TextField>
        </InputItemContainer>
      </DialogContent>}
      <DialogActions sx={{ justifyContent: "center", marginBottom: 2 }}>
        {activeStep == 1 && <BtnFilled
          disabled={disableButton}
          type="submit"
          height={"36px"}
          onClick={() => {
            if (formik.values.message == "") {
              formik.setFieldError("message", "Please enter reason to delete account")
            } else {
              setActiveStep(2)
            }

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
            "Next"
          )}
        </BtnFilled>}
        {activeStep == 2 && (<><BtnFilled
          disabled={disableButton}
          type="submit"
          height={"36px"}
          onClick={() => {
            setDisable(true);
            handleDeleteAccount();
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
            "Delete"
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
            onClick={() => handleCloseModal()}
          >
            Cancel
          </BtnOutlined> </>)
        }
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccount;
