import { BtnFilled } from "@/components/common/buttons/ButtonsVariations";
import CountrySelect from "@/components/common/countrydropdown/Index";
import { Box, Link, TextField } from "@mui/material";
import React, { useState } from "react";
import { Container, FontContainer } from "../../style";
import { useFormik } from "formik";
import { apiClient } from "@/components/common/common";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { DetailQuickSignPhoneField } from "./style";

const MobileInputCommon = dynamic(
  () => import("@/components/common/PhoneInput"),
  { ssr: false }
);
const Signup = ({
  setToggleSignup = null,
  SubmitQuotation = null,
  setHideLogin = null,
  buttonName = "Sign up",
  text = "Please enter your contacts to send quote to you",
  display = "flex",
  type,
}) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [validate, setValidation] = useState<boolean>(false);
  const validation = Yup.object().shape({
    name: Yup.string()
      .matches(/^(?! )(?!.* $)[A-Za-z\s' -]*$/, "Please enter a valid name")
      .min(2, "Minimum 2 characters")
      .required("Please enter name"),
    country: Yup.string().required("Please select Country"),
    email: Yup.string().email("Please enter valid email").required("Please enter email"),
    phone: Yup.string().required("Please enter mobile number"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      country: "",
      name: "",
      mobile_code: "",
      phone_code: "",
      phone: "",
    },
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {         
      const { email, name, mobile_code, password, phone, country, phone_code } =
        values;

      if (!validate) {
        formik.setFieldError("phone", "Please enter correct mobile no.");
        return;
      }
      setLoading(true);
      let validEmail = await apiClient("auth/isExistingUser", "post", {
        body: { email, phone: phone },
      });

      if(validEmail.email==false && validEmail.phone==false){
        let signupResponse: any = await apiClient("auth/signup", "post", {
          body: {
            email,
            password,
            name,
            phone_code: phone_code,
            phone,
            company_name: "",
            company_location: country,
            mobile_country_code: country,
            role: "buyer",
          },
        });
        if(signupResponse.status){
          localStorage.setItem("Token", signupResponse.accessToken);
          localStorage.setItem("userData", JSON.stringify(signupResponse.user));
          SubmitQuotation(1);
          setHideLogin(true);
        }else{
          toast.error("The email has already been taken.");
        }
      }else{
        validEmail?.email == true && formik.setFieldError("email", "Email already exists");
        validEmail?.phone == true && formik.setFieldError("phone", "Mobile number already exists");
      }
      setLoading(false);
    },
  });

  const setMobileNumber = (phone, mobile_code, country_code, isValid) => {
    formik.setFieldValue("mobile_code", mobile_code);
    formik.setFieldValue("country", country_code);
    formik.setFieldValue("phone_code", mobile_code);
    formik.setFieldValue("phone", phone);
    formik.setFieldError("phone", "");
    setValidation(isValid);
  };

  const ValidateField = (field: any) => {
    if (formik.errors[field] && formik.touched[field]) return true;
    else return false;
  };

  return (
    <Container className="SignUp" sx={{ width: "400px","@media screen and (max-width:480px)":{
      width:'100%'
    } }}>
      <FontContainer fontSize={"17px"} padding="8px 0">
        <LockOpenIcon /> {text}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
            "& .MuiSvgIcon-root": {
              cursor: "pointer",
              "&:hover": {
                color: "#D7282F",
              },
            },
          }}
          onClick={() => setHideLogin(true)}
        >
          <CloseIcon />
        </Box>
      </FontContainer>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "4px",
          gap: 16,
          width: "100%",
        }}
        onKeyDown={(e) => {
          if (e?.key === "Enter") {
            formik?.handleSubmit();
          }
        }}
      >
        <div style={{ display, gap: 16 }}>
          <TextField
            size="small"
            sx={{ width: "100%" }}
            variant="outlined"
            placeholder="Name"
            name={"name"}
            value={formik.values.name}
            onChange={(e) => {
              const trimmedValue = e?.target?.value?.trim();
              if (trimmedValue !== "") {
                formik.setFieldValue("name", e.target.value);
                formik.setFieldError("name", "");
              } else {
                formik.setFieldValue("name", "");
              }
            }}
            error={ValidateField("name")}
            helperText={
              formik.errors.name && (
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
                  <div>{formik.errors.name?.toString() ?? ""}</div>
                </span>
              )
            }
          />
        </div>
        <div style={{ display, gap: 16 }}>
          <TextField
            size="small"
            sx={{ width: "100%" }}
            variant="outlined"
            placeholder="Email"
            name={"email"}
            value={formik.values.email}
            onChange={(e) => {
              formik.setFieldValue("email", e.target.value);
              formik.setFieldError("email", "");
            }}
            error={ValidateField("email")}
            helperText={
              formik.errors.email && (
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
                  <div>{formik.errors.email?.toString() ?? ""}</div>
                </span>
              )
            }
          />
        </div>
        <DetailQuickSignPhoneField>
          <MobileInputCommon
            mobileNumber={formik.values.phone}
            mobileCode={formik.values.mobile_code}
            countryCode={
              formik.values.mobile_code ? formik.values.mobile_code : ""
            }
            handleChange={setMobileNumber}
            helperText={
              formik.errors.phone && (
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
                  <div>{formik.errors.phone?.toString() ?? ""}</div>
                </span>
              )
            }
            placeholder="Mobile Number"
          />
        </DetailQuickSignPhoneField>
       {text!=="Quick Signup"&& <div
          style={{
            display:
              !formik.values.country && !formik.touched.country
                ? "none"
                : "block",
            gap: 16,
          }}
        >
          <CountrySelect
            country={formik.values.country ? formik.values.country : "IN"}
            setCountry={(values) =>
              formik.setFieldValue("country", values ? values : "IN")
            }
            label="Country"
            styleProps={{ width: "100%" }}
            error={!formik.values.country ? formik.errors?.country : false}
            errorText={formik.values.country ? "" : formik.errors?.country}
          />
        </div> }

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            "& .MuiButton-root": {
              width: "100%",
            },
          }}
        >
          <BtnFilled onClick={formik.handleSubmit} disabled={loading}>
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
              buttonName ? buttonName : "Signup & Send Query"
            )}
          </BtnFilled>
        </Box>
        <Box
          sx={{
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& .MuiLink-root": {
              color: "#D7282F",
              cursor: "pointer",
              marginLeft: "4px",
              textDecoration: "none",
            },
          }}
        >
          Already have an Account?{" "}
          <Link onClick={() => setToggleSignup(false)}>Sign In</Link>
        </Box>
      </div>
    </Container>
  );
};

export default Signup;
