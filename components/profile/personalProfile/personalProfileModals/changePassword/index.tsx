import React, { useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { TextField, Tooltip } from "@mui/material";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Button } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import Auth from "@/auth/Auth";
import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/staticValues";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  ButtonContainer,
  EyeIconContainer,
  ModalHeader,
  InputItemContainer,
  style,
} from "./styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { PasswordMessage, passwordRules } from "@/components/common/common";

export const ChangePassword = (props) => {
  const { open, closeModal } = props;
  const [activeStep, setActiveStep] = React.useState<number>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const currentInputRef=useRef(null);
  const newInputRef= useRef(null);
  const confirmInputRef=useRef(null);

  const checkPassword = async () => {
    try {
      const formData = new FormData();
      setLoading(true);
      formData.append("password", formik.values.current_password);
      const response = await fetch(`${BASE_URL}/profile/check_password`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (data.status) {
        setLoading(false);
        setShowPassword(false);
        setActiveStep(2);
      } else {
        setLoading(false);
        formik.setFieldError("current_password", data.message);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    if (formik.values.new_password !== formik.values.confirm_password) {
      formik.setFieldError(
        "confirm_password",
        "Confirm password does not match the new password."
      );
      return;
    }
    if (formik.values.new_password === formik.values.current_password) {
      formik.setFieldError(
        "new_password",
        "New password matches the previous password. Please choose a different password."
      );
      return;
    }
    if (!formik.isValid) {
      return;
    }
    setLoading(true);
    const res = await fetch(`${BASE_URL}/profile/changePassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.token()}`,
      },
      body: JSON.stringify({
        old_password: formik.values.current_password,
        password: formik.values.new_password,
      }),
    });
    const response = await res.json();
    setLoading(false);
    if (response.status) {
      toast.success(response.message);
      formik.resetForm();
      closeModal();
      setShowPassword(false);
      setShowNewPassword(true);
      setShowConfirmNewPassword(true);
      setActiveStep(1);
    } else {
      toast.error(response.message[0]);
    }
  };

  const validation = Yup.object().shape({
    current_password:
      activeStep == 1
        ? Yup.string().required("Please enter current password")
        : Yup.string().notRequired(),
    new_password:
      activeStep == 2
        ? Yup.string()
            .matches(passwordRules, {
              message: PasswordMessage,
            })
            .required("Please enter new password")
            .min(8, PasswordMessage)
        : Yup.string().notRequired(),
    confirm_password:
      activeStep == 2
        ? Yup.string()
            .required("Please enter confirm password ")
            .min(8, PasswordMessage)
        : Yup.string().notRequired(),
  });

  const formik = useFormik({
    validationSchema: validation,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    onSubmit: () => {
      if (activeStep == 1) checkPassword();
      if (activeStep == 2) changePassword();
    },
  });
  const handlePasswordChange = (e) => {
    const { value, selectionStart } = e.target;
    const removeSpace = value.replace(/\s/g, "");
    formik.setFieldValue("current_password", removeSpace);
    formik.setFieldTouched("current_password", true);
    const cursorPosition = selectionStart - (value.length - removeSpace.length);
    if (value.includes(" ")) {
      formik.setFieldError("current_password", "Current Password cannot contain spaces");
      setTimeout(() => {
        formik.setFieldError("current_password", "");
      }, 2000);
    } else {
      formik.setFieldError("current_password", "");
    }
    if (currentInputRef.current) {
      currentInputRef.current.value = removeSpace;
      currentInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  };

  const handleNewPasswordChange = (e) => {
    const { value, selectionStart } = e.target;
    const removeSpace = value.replace(/\s/g, "");
    formik.setFieldValue("new_password", removeSpace);
    formik.setFieldTouched("new_password", true);
    const cursorPosition = selectionStart - (value.length - removeSpace.length);
    if (value.includes(" ")) {
      formik.setFieldError("new_password", "Password cannot contain spaces");
      setTimeout(() => {
        formik.setFieldError("new_password", "");
      }, 2000);
    } else {
      formik.setFieldError("new_password", "");
    }
    if (newInputRef.current) {
      newInputRef.current.value = removeSpace;
      newInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  };

  const handleNewConfirmPasswordChange = (e) => {
    const { value, selectionStart } = e.target;
    const removeSpace = value.replace(/\s/g, "");
    formik.setFieldValue("confirm_password", removeSpace);
    formik.setFieldTouched("confirm_password", true);
    const cursorPosition = selectionStart - (value.length - removeSpace.length);
    if (value.includes(" ")) {
      formik.setFieldError("confirm_password", "Password cannot contain spaces");
      setTimeout(() => {
        formik.setFieldError("confirm_password", "");
      }, 2000);
    } else {
      formik.setFieldError("confirm_password", "");
    }
    if (confirmInputRef.current) {
      confirmInputRef.current.value = removeSpace;
      confirmInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {activeStep === 1 && (
            <form onSubmit={formik.handleSubmit}>
              <Button
                onClick={() => {
                  closeModal();
                  formik.resetForm();
                  setShowPassword(false);
                  setShowNewPassword(true);
                  setShowConfirmNewPassword(true);
                  formik.setFieldError("current_password", "");
                  formik.setFieldError("new_password", "");
                  formik.setFieldError("confirm_password", "");
                }}
                color="error"
                style={{
                  minHeight: "46px",
                  minWidth: "46px",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "9px",
                  right: "11px",
                }}
              >
                <CloseOutlinedIcon style={{ cursor: "pointer" }} />
              </Button>
              <ModalHeader>Current Password</ModalHeader>
              <InputItemContainer>
                {!showPassword ? (
                  <LightTooltip
                    title="Show Password"
                    arrow
                    placement="top"
                    disableInteractive
                  >
                    <EyeIconContainer>
                      <AiFillEye
                        onClick={() => {
                          setShowPassword(true);
                        }}
                      />
                    </EyeIconContainer>
                  </LightTooltip>
                ) : (
                  <LightTooltip
                    title="Hide Password"
                    arrow
                    placement="top"
                    disableInteractive
                  >
                    <EyeIconContainer>
                      <AiFillEyeInvisible
                        onClick={() => setShowPassword(false)}
                      />
                    </EyeIconContainer>
                  </LightTooltip>
                )}

                <TextField
                  // style={{ width: "85%", margin: "auto" }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  size="small"
                  autoFocus
                  error={formik.errors.current_password ? true : false}
                  helperText={
                    formik.errors.current_password && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#d7282f",
                        }}
                      >
                        <img
                          src="/assets/error-outline-red.svg"
                          alt=""
                          style={{
                            width: "8px",
                            height: "8px",
                            marginRight: "4px",
                          }}
                        />
                        <div>
                          {formik.errors.current_password?.toString() ?? ""}
                        </div>
                      </span>
                    )
                  }
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  label="Password"
                  placeholder="Enter your password"
                  id="password"
                  value={formik.values.current_password}
                  // onChange={(e) => {
                  //   formik.setFieldValue("current_password", e.target.value);
                  //   formik.setFieldError("current_password", "");
                  // }}
                  onChange={handlePasswordChange}
                  inputRef={currentInputRef}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      if (formik.values.current_password !== "") {
                      }
                    }
                  }}
                ></TextField>
              </InputItemContainer>
              <ButtonContainer>
                <Button
                  style={{
                    fontWeight: "bold",
                    textTransform: "none",
                    height: "36px",
                    // width: "calc(100% - 48px)",
                    width: "100%",
                    display: "inline-flex",
                    margin: "auto",
                    backgroundColor: "rgba(216, 38, 47,0.9)",
                  }}
                  variant="contained"
                  type="submit"
                >
                  {loading ? (
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
                </Button>
              </ButtonContainer>
            </form>
          )}
          {activeStep === 2 && (
            <>
              <form onSubmit={formik.handleSubmit}>
                <Button
                  onClick={() => {
                    formik.resetForm();
                    formik.setFieldError("current_password", "");
                    formik.setFieldError("new_password", "");
                    formik.setFieldError("confirm_password", "");
                    setActiveStep(1);
                    closeModal();
                  }}
                  color="error"
                  style={{
                    minHeight: "46px",
                    minWidth: "46px",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "9px",
                    right: "11px",
                  }}
                >
                  <CloseOutlinedIcon style={{ cursor: "pointer" }} />
                </Button>
                <ModalHeader>New Password</ModalHeader>
                <InputItemContainer>
                  {showNewPassword ? (
                    <LightTooltip title="Show Password" arrow>
                      <EyeIconContainer>
                        <AiFillEye
                          onClick={() => {
                            setShowNewPassword(false);
                          }}
                        />
                      </EyeIconContainer>
                    </LightTooltip>
                  ) : (
                    <LightTooltip title="Hide Password" arrow>
                      <EyeIconContainer>
                        <AiFillEyeInvisible
                          onClick={() => setShowNewPassword(true)}
                        />
                      </EyeIconContainer>
                    </LightTooltip>
                  )}
                  <TextField
                    sx={{
                      "&.MuiFormHelperText-root.Mui-error": {
                        color: "green !important",
                      },
                    }}
                    style={{ /*width: "85%",*/ margin: "auto" }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    size="small"
                    autoFocus
                    error={formik.errors.new_password ? true : false}
                    helperText={
                      formik.errors.new_password && (
                        <span
                          style={{
                            display: "flex",
                            color: "#d7282f",
                          }}
                        >
                          <img
                            src="/assets/error-outline-red.svg"
                            alt=""
                            style={{
                              width: "8px",
                              height: "8px",
                              marginRight: "4px",
                              marginTop: "4px",
                            }}
                          />
                          <div>
                            {formik.errors.new_password?.toString() ?? ""}
                          </div>
                        </span>
                      )
                    }
                    type={!showNewPassword ? "text" : "password"}
                    fullWidth
                    label="New Password"
                    placeholder="Type new Password"
                    id="newPassword"
                    value={formik.values.new_password}
                    // onChange={(e) => {
                    //   formik.setFieldValue("new_password", e.target.value);
                    //   formik.setFieldError("new_password", "");
                    // }}
                    onChange={handleNewPasswordChange}
                    inputRef={newInputRef}
                  ></TextField>
                </InputItemContainer>
                <div style={{ margin: "19px" }}></div>
                <InputItemContainer>
                  {showConfirmNewPassword ? (
                    <LightTooltip title="Show Password" arrow>
                      <EyeIconContainer>
                        <AiFillEye
                          onClick={() => {
                            setShowConfirmNewPassword(false);
                          }}
                        />
                      </EyeIconContainer>
                    </LightTooltip>
                  ) : (
                    <LightTooltip title="Hide Password" arrow>
                      <EyeIconContainer>
                        <AiFillEyeInvisible
                          onClick={() => setShowConfirmNewPassword(true)}
                        />
                      </EyeIconContainer>
                    </LightTooltip>
                  )}
                  <TextField
                    style={{ /*width: "85%",*/ margin: "auto" }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    size="small"
                    error={formik.errors.confirm_password ? true : false}
                    helperText={
                      formik.errors.confirm_password && (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            color: "#d7282f",
                          }}
                        >
                          <img
                            src="/assets/error-outline-red.svg"
                            alt=""
                            style={{
                              width: "8px",
                              height: "8px",
                              marginRight: "4px",
                            }}
                          />
                          <div>
                            {formik.errors.confirm_password?.toString() ?? ""}
                          </div>
                        </span>
                      )
                    }
                    type={!showConfirmNewPassword ? "text" : "password"}
                    fullWidth
                    label="Confirm New Password"
                    placeholder="Confirm Password"
                    id="confirmNewPassword"
                    value={formik.values.confirm_password}
                    // onChange={(e) => {
                    //   formik.setFieldValue("confirm_password", e.target.value);
                    //   formik.setFieldError("confirm_password", "");
                    // }}
                    onChange={handleNewConfirmPasswordChange}
                    inputRef={confirmInputRef}
                    InputProps={{
                      autoComplete: "new-password",
                    }}
                  ></TextField>
                </InputItemContainer>
                <ButtonContainer>
                  <Button
                    style={{
                      fontWeight: "bold",
                      textTransform: "none",
                      height: "36px",
                      // width: "calc(100% - 48px)",
                      width: "100%",
                      display: "inline-flex",
                      margin: "auto",
                      backgroundColor: "rgba(216, 38, 47,0.9)",
                    }}
                    variant="contained"
                    type="submit"
                  >
                    {loading ? (
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
                  </Button>
                </ButtonContainer>
              </form>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};
