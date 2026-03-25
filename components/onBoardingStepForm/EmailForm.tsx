import React, { useRef, useState } from "react";
import {
  CustomisedEmailButton,
  InputContainer,
} from "./onBoardingStepFormStyles";
import { TextField } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { apiClient } from "../common/common";
import onboarding from "./onboarding.module.css";
import { ThreeDots } from "react-loader-spinner";

function EmailForm({ onAddHandler, emailInvites }) {
  const [loader, setLoader] = useState<any>(false);
  const emailInputRef= useRef(null);

  const validation = Yup.object().shape({
    email: Yup.string().email("Please enter valid email").required("Please enter email"),
  });

  const formik = useFormik({
    validationSchema: validation,
    validateOnChange: false,
    initialValues: {
      email: "",
    },
    onSubmit: async ({ email }, { setFieldError }) => {
     
      const userData = localStorage?.userData
      ? JSON.parse(localStorage.userData)
      : {};
      if(userData?.email===email ){
        setFieldError("email", "You cannot invite yourself."); 
        return
      }  
      setLoader(true);
      if(emailInvites?.length > 0){
        if(emailInvites.some(item => item.email === email)){
          setFieldError("email", "Please enter unique email");
          setLoader(false);
          return
        }
      }
      if (emailInvites?.length <= 4) {
        const response = await apiClient("auth/isInvited", "post", {
          body: {
            email,
          },
        });
        if (response.status == false) {
          setFieldError("email", "Email already exists");
        } else {
          onAddHandler(email);
          formik.setFieldValue("email", "");
        }
      }else{
        setFieldError("email", "You can't invite more than 5 peoples");
      }
      setLoader(false);
    },
  });

  const handleEmailChange = (e) => {
    const { value, selectionStart } = e.target;
    const removeSpace = value.replace(/\s/g, "");
    formik.setFieldValue("email", removeSpace);
    const cursorPosition = selectionStart - (value.length - removeSpace.length);
    if (value.includes(" ")) {
      formik.setFieldError("email", "Email cannot contain spaces");
      setTimeout(() => {
        formik.setFieldError("email","")
      }, 2000);
    } else {
      formik.setFieldError("email", "");
    }
    if (emailInputRef.current) {
      emailInputRef.current.value = removeSpace;
      emailInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="onboarding_step">
      <InputContainer>
        <TextField
          inputProps={{
            autoComplete: "off",
          }}
          size="small"
          error={formik.errors.email ? true : false}
          helperText={formik.errors.email}
          autoFocus
          label="Enter Email"
          variant="outlined"
          // onChange={(e) => {
          //   formik.setFieldValue("email", e.target.value);
          //   formik.setFieldError("email", "");
          // }}
          onChange={handleEmailChange}
          inputRef={emailInputRef}
          value={formik.values.email}
          type="text"
        />
        <CustomisedEmailButton
          className={onboarding.add_btn}
          type="submit"
          variant="contained"
          disabled={loader}
        >
          {loader ? (
            <ThreeDots
              height="18"
              width="40"
              radius="9"
              color="white"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              visible={true}
            />
          ) : (
            "Add"
          )}
        </CustomisedEmailButton>
      </InputContainer>
    </form>
  );
}

export default EmailForm;
