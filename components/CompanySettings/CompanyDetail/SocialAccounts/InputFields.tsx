import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MenuItem, SelectChangeEvent, TextField } from "@mui/material";
import { MobileInputContainer } from "@/components/profile/personalProfile/personalProfileModals/editMobile/styles";
import { SocialConatactUpdates } from "../commonStyles";
import companydetail from "../../CompanyDetail/companydetail.module.css";
import dynamic from "next/dynamic";
import { apiClient } from "@/components/common/common";
import { forwardRef, useImperativeHandle } from "react";

const MobileInputCommon = dynamic(
  async () => import("@/components/common/PhoneInput"),
  {
    ssr: false,
  }
);

const InputFields = forwardRef((props: any, ref) => {
  const {
    componentType,
    profile_type,
    defaultValue,
    cancelHandler,
    index,
    socialMediaList,
    setSocialMediaLists,
  } = props;
  const [validateNo, setValidationNo] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const validation = Yup.object().shape({
    profile_link: Yup.string().required("Please enter profile link"),
  });

  useImperativeHandle(ref, () => {
    return {
      SubmitHandler,
    };
  });

  let formik = useFormik({
    initialValues: {
      profile_type: defaultValue?.profile_type ?? "",
      profile_link: defaultValue?.profile_link ?? "",
      countryCode: defaultValue?.countryCode ?? "",
      mobile_code: defaultValue?.mobile_code ?? "91",
      status: defaultValue?.status ?? "enable",
    },
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {},
  });

  const setMobileNumber = (phone, mobile_code, country_code, isValid) => {
    formik.setFieldValue("mobile", phone);
    formik.setFieldValue("mobile_code", mobile_code);
    formik.setFieldValue("countryCode", country_code);
    formik.setFieldValue("profile_link", phone);
    formik.setFieldError("profile_link", "");
    setErrorText("");
    setValidationNo(isValid);
  };

  // const SkypeRegex =
  //   /^(https?:\/\/(www\.)?skype\.com|skype:[a-zA-Z0-9]+|[a-zA-Z0-9]+)/;
  // const FacebookRegex = /^(https?:\/\/){0,1}(www\.){0,1}facebook\.com/;
  // const linkedinUrlRegex =
  //   /^(https?:\/\/){0,1}(www\.){0,1}(?:[a-z]{2}\.)?linkedin\.com/;
  // const instagramUrlRegex = /^(https?:\/\/){0,1}(www\.){0,1}instagram\.com/;
  // const twitterUrlRegex = /^(https?:\/\/){0,1}(www\.){0,1}x\.com/;

  // const ValidateURL = (profile_type, profile_link) => {
  //     const startsWithHttp = /^(https?:\/\/)/.test(formik.values.profile_link);
    
  //     if (!startsWithHttp) {
  //       setErrorText("Please enter the valid URL (http:// or https://)");
  //       return false;
  //     }
    
  //   if (profile_type == "LinkedIn") {
  //     let validate = linkedinUrlRegex.test(formik.values.profile_link);
  //     if (validate) setErrorText("");
  //     if (!validate) setErrorText(`Please enter valid linkedin url`);
  //     return validate;
  //   }
  //   if (profile_type == "Facebook") {
  //     let validate = FacebookRegex.test(formik.values.profile_link);
  //     if (validate) setErrorText("");
  //     if (!validate) setErrorText(`Please enter valid facebook url`);
  //     return validate;
  //   }
  //   if (profile_type == "Twitter") {
  //     let validate = twitterUrlRegex.test(formik.values.profile_link);
  //     if (validate) setErrorText("");
  //     if (!validate) setErrorText(`Please enter valid twitter url`);
  //     return validate;
  //   }
  //   if (profile_type == "Instagram") {
  //     let validate = instagramUrlRegex.test(formik.values.profile_link);
  //     if (validate) setErrorText("");
  //     if (!validate) setErrorText(`Please enter valid instagram url`);
  //     return validate;
  //   }
  //   if (profile_type == "Skype") {
  //     let validate = SkypeRegex.test(formik.values.profile_link);
  //     if (validate) setErrorText("");
  //     if (!validate) setErrorText(`Please enter valid skype url`);
  //     return validate;
  //   }
  //   if (profile_type == "WhatsApp") {
  //     if (!validateNo) setErrorText("Please enter correct mobile no");
  //     return validateNo;
  //   }
  //   if (profile_type == "WeChat") {
  //     if (!validateNo) setErrorText("Please enter correct mobile no");
  //     return validateNo;
  //   }
  // };

  const SkypeRegex =/^(https?:\/\/)?(www\.)?(skype\.com(\/.*)?|join\.skype\.com\/(invite\/)?[A-Za-z0-9_-]+)$/;
const FacebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com/;
const linkedinUrlRegex =
  /^(https?:\/\/)?(www\.)?(?:[a-z]{2}\.)?linkedin\.com/;
const instagramUrlRegex = /^(https?:\/\/)?(www\.)?instagram\.com/;
const twitterUrlRegex = /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)/;

const ValidateURL = (profile_type, profile_link) => {
  const startsWithHttp = /^(https?:\/\/)/.test(profile_link);

  if (!startsWithHttp  && profile_type !== "WhatsApp" && profile_type !== "WeChat") {
    setErrorText("Please enter the valid URL (http:// or https://)");
    return false;
  }

  let validate = true; 

  if (profile_type === "LinkedIn") {
    validate = linkedinUrlRegex.test(profile_link);
    if (validate) setErrorText("");
    if (!validate) setErrorText("Please enter valid LinkedIn URL");
  }

  if (profile_type === "Facebook") {
    validate = FacebookRegex.test(profile_link);
    if (validate) setErrorText("");
    if (!validate) setErrorText("Please enter valid Facebook URL");
  }

  if (profile_type === "Twitter") {
    validate = twitterUrlRegex.test(profile_link);
    if (validate) setErrorText("");
    if (!validate) setErrorText("Please enter valid Twitter URL");
  }

  if (profile_type === "Instagram") {
    validate = instagramUrlRegex.test(profile_link);
    if (validate) setErrorText("");
    if (!validate) setErrorText("Please enter valid Instagram URL");
  }

  // if (profile_type === "Skype") {
  //   // validate = SkypeRegex.test(profile_link) || !/^(https?:\/\/)/.test(profile_link);
  //   validate = SkypeRegex.test(profile_link);
  //   if (validate) setErrorText("");
  //   if (!validate) setErrorText("Please enter valid Skype URL");
    
  // }
  if (profile_type === "Skype") {
    validate = SkypeRegex.test(profile_link);  // Validate Skype URLs (meeting links or user IDs)
    setErrorText(validate ? "" : "Please enter a valid Skype URL");
  }

  if (profile_type === "WhatsApp" || profile_type === "WeChat") {
    if (!validateNo) setErrorText(`Please enter correct ${profile_type.toLowerCase()} number`);
    return validateNo;
  }

  return validate;
};


  const SubmitHandler = async () => {
    let validate = ValidateURL(profile_type, formik.values.profile_link);
    if (formik.values.profile_link == "") {
      if (profile_type == "WhatsApp" || profile_type == "WeChat") {
        setErrorText(`Please enter ${profile_type.toLowerCase()} number`);
        return;
      } else {
        setErrorText(`Please enter ${profile_type.toLowerCase()} link`);
        return;
      }
    }
    if (validate) {
      let updatedList = [...socialMediaList].map((v) => ({
        ...v,
        type: componentType == "personal-profile" ? "personal" : "company",
      }));
      updatedList[index].profile_link = formik.values.profile_link;
      updatedList[index].countryCode = formik.values.countryCode;
      updatedList[index].mobile_code = formik.values.mobile_code;
      updatedList[index].status = formik.values.status;
      let response = await apiClient(`profile/submit/social`, "post", {
        body: {
          social_data: [...updatedList],
        },
      });
      if (response.status) {
        setSocialMediaLists(updatedList);
        cancelHandler();
      }
    }
  };
   return (
    <SocialConatactUpdates
      sx={{
        width: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        "@media screen and (max-width:480px)": {
          flexDirection: "column",
          alignItems: "flex-start",
        },
      }}
    >
      {profile_type !== "WhatsApp" && profile_type !== "WeChat" && (
        <TextField
          className={companydetail.cdetailmediafield + " media_box"}
          sx={{
            width: componentType === "personal-profile" ? "100%" : "100%",
            fontSize: "14px",
            marginLeft: "-6px",
            marginTop: "-2px",
            "@media screen and (max-width:480px)": {
              marginLeft: "0px",
            },
          }}
          name={"profile_link"}
          size="small"
          value={formik.values.profile_link}
          onChange={(e) => {
            formik.setFieldValue("profile_link", e.target.value);
            setErrorText("");
          }}
          placeholder="Insert Link/ ID/ Number"
          error={errorText ? true : false}
          helperText={errorText}
        />
      )}
      {(profile_type == "WhatsApp" || profile_type == "WeChat") && (
        <MobileInputContainer>
          <MobileInputCommon
            mobileCode={formik.values.mobile_code}
            mobileNumber={formik.values.profile_link}
            countryCode={formik.values.countryCode}
            handleChange={setMobileNumber}
            helperText={errorText}
          />
        </MobileInputContainer>
      )}
      {componentType == "company" && (
        <TextField
          label={"Visible on Mini-site"}
          select
          name={"profile_type"}
          value={formik?.values?.status}
          onChange={(e) => formik.setFieldValue("status", e.target.value)}
          size="small"
          sx={{
            width: "40%",
            "@media screen and (max-width:480px)": { width: "100%" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "4px",
                fontSize: "12px",
              },
            },
          }}
        >
          <MenuItem value={"enable"}>Enable</MenuItem>
          <MenuItem value={"disable"}>Disable</MenuItem>
        </TextField>
      )}
    </SocialConatactUpdates>
  );
});

export default InputFields;
