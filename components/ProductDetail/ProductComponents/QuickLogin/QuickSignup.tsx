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
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
const MobileInputCommon = dynamic(
  () => import("@/components/common/PhoneInput"),
  { ssr: false }
);

const QuickSignup = ({
  setToggleSignup = null,
  setHideLogin = null,
  display = "flex",
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [validate, setValidation] = useState<boolean>(false);

  const validation = Yup.object().shape({
    name: Yup.string().required("Please enter name"),
    country: Yup.string().required("Please select Country"),
    email: Yup.string().email("Invalid email").required("Please enter email"),
    phone: Yup.string().required("Please enter Mobile Number"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      country: "",
      name: "",
      mobile_code: "",
      phone: "",
    },
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const { email, name, mobile_code, password, phone, country } = values;
      if (!validate) {
        formik.setFieldError("phone", "Please enter correct mobile no.");
        return;
      }
      setLoading(true);
      let signupResponse: any = await apiClient("auth/signup", "post", {
        body: {
          email,
          password,
          name,
          phone_code: mobile_code,
          phone,
          company_name: "",
          company_location: country,
          role: "seller",
        },
      });
      if (signupResponse.status) {
        localStorage.setItem("Token", signupResponse.accessToken);
        localStorage.setItem("userData", JSON.stringify(signupResponse.user));

        setHideLogin(true);
      }
      if (
        !signupResponse.status &&
        signupResponse?.message?.[0] === "The email has already been taken."
      ) {
        toast.error("The email has already been taken.");
      }
      setLoading(false);
    },
  });

  const setMobileNumber = (phone, mobile_code, country_code, isValid) => {
    formik.setFieldValue("mobile_code", mobile_code);
    formik.setFieldValue("country", country_code);
    formik.setFieldValue("phone", phone);
    formik.setFieldError("phone", "");
    setValidation(isValid);
  };

  const ValidateField = (field: any) => {
    if (formik.errors[field] && formik.touched[field]) return true;
    else return false;
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container className="SignUp" sx={{ width: "376px" }}>
        <FontContainer fontSize={"17px"} padding="8px 0">
          <LockOpenIcon />
          Haven't account, Sign up
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
          ></Box>
        </FontContainer>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "4px",
            gap: 16,
            width: "100%",
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
                formik.setFieldValue("name", e.target.value);
                formik.setFieldError("name", "");
              }}
              error={ValidateField("name")}
              helperText={formik.errors.name}
            />
          </div>
          <div style={{ display, gap: 16 }}>
            <TextField
              size="small"
              sx={{ width: "100%" }}
              variant="outlined"
              placeholder="Business Email"
              name={"email"}
              value={formik.values.email}
              onChange={(e) => {
                formik.setFieldValue("email", e.target.value);
                formik.setFieldError("email", "");
              }}
              error={ValidateField("email")}
              helperText={formik.errors.email}
            />
          </div>
          <div style={{ display, gap: 16 }}>
            <MobileInputCommon
              className="mobilecommon"
              mobileNumber={formik.values.phone}
              mobileCode={formik.values.mobile_code}
              countryCode={formik.values.country}
              handleChange={setMobileNumber}
              label={"Mobile No"}
              helperText={formik.errors.phone}
            />
          </div>
          <div style={{ display, gap: 16 }}>
            <CountrySelect
              country={formik.values.country}
              setCountry={(values) => formik.setFieldValue("country", values)}
              styleProps={{ width: "100%" }}
              errorText={"Please Select country"}
              label="Select Country "
              error={formik.errors.country ? true : false}
            />
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              "& .MuiButton-root": {
                width: "100%",
              },
            }}
          >
            <BtnFilled type="submit" disabled={loading}>
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
                `Signup`
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
              },
            }}
          >
            Already have an Account?{" "}
            <Link onClick={() => setToggleSignup(false)}>Sign In</Link>
          </Box>
        </div>
      </Container>
    </form>
  );
};

export default QuickSignup;
