import { Redoutlinebtn } from "@/components/common/buttons/ButtonsVariations";
import { apiClient } from "@/components/common/common";
import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import {
  FontContainer,
  Containerlogin,
  SigninField,
  RememberCheckbox,
} from "@/components/ProductDetail/style";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { makeStyles } from "tss-react/mui";
import { Errormessage, LinkLive } from "@/components/guestLayout/user/styles";
import { useRouter } from "next/router";
const useStyles = makeStyles()((theme) => {
  return {
    loginfohead: {
      fontSize: "15px !important",
      padding: "5px 0",
      color: "#000",
    },
    loginbtn: {
      width: "100% !important",
      margin: "10px 0 0 !important",
      backgroundColor: "#D82E34 !important",
      color: "#ffffff !important",
      "&:hover": {
        backgroundColor: "#cf1c23 !important",
      },
    },
    rememberrow: { margin: "margin: 8px 0 0" },
  };
});

const QucikLogin = ({ setToggleSignup, setHideLogin }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { classes } = useStyles();
  const [blockmessage, setBlockMessage] = useState<any>({
    status: false,
    message: "",
  });
  const extractUrl = (message) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = message.match(urlRegex);
    return urls ? urls[0] : null;
  };
  const router = useRouter();
  const handleLinkClick = () => {
    const url = extractUrl(blockmessage.message);
    if (url) {
      router.push(url);
    }
  };
  const renderMessage = () => {
    let url = blockmessage?.message.match(/https?:\/\/[^\s]+/);
    const newUrl = url?.[0] || "";
    let updatedMessage = blockmessage?.message.replace(newUrl, "");
    const quoteLink = newUrl ? (
      <Link href={newUrl} target="_blank">
        Contact Us
      </Link>
    ) : null;
    return (
      // <>
      //   <Errormessage>{updatedMessage}</Errormessage>
      //   {newUrl && (
      //     <LinkLive onClick={() => handleLinkClick()}>{quoteLink}</LinkLive>
      //   )}
      // </>

      <Box
        sx={{
          "& .Errormessage": {
            display: "inline",
          },

          "& .LinkLive": {
            display: "inline",
            textDecoration: "none",
            "& a": {
              color: "#d7282f",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
          },
        }}
      >
        <Errormessage className="Errormessage">{updatedMessage}</Errormessage>
        {newUrl && (
          <LinkLive className="LinkLive" onClick={() => handleLinkClick()}>
            {quoteLink}
          </LinkLive>
        )}
      </Box>
    );
  };
  const validation = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Please enter email"),
    password: Yup.string().required("Please enter password"),
  });
  let formik = useFormik({
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { email, password } = values;
      setLoading(true);
      const response: any = await apiClient("auth/login", "post", {
        body: { email, password },
      });
      if (response.status === 200) {
        localStorage.setItem("Token", response.accessToken);
        localStorage.setItem("userData", JSON.stringify(response.user));
        setHideLogin();
        setToggleSignup(false);
      } else {
        if (!response.status) {
          console.log(response.message);
          setBlockMessage({ status: true, message: response.message });
        }
      }
      setLoading(false);
    },
  });
  const ValidateField = (field: any) => {
    if (formik.errors[field] && formik.touched[field]) return true;
    else return false;
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Containerlogin>
        <FontContainer variant="body2">
          <LockOpenIcon /> Have account, Sign in
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
        <SigninField>
          <TextField
            variant="outlined"
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={(e) => {
              formik.setFieldValue("email", e.target.value);
              formik.setFieldError("email", "");
            }}
            error={ValidateField("email")}
            helperText={formik.errors.email}
          />
          <TextField
            value={formik.values.password}
            variant="outlined"
            type="password"
            name="password"
            placeholder="Password"
            error={ValidateField("password")}
            onChange={(e) => {
              formik.setFieldValue("password", e.target.value);
              formik.setFieldError("password", "");
            }}
            helperText={formik.errors.password}
          />
        </SigninField>
        <RememberCheckbox>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember me"
          />
        </RememberCheckbox>
        {blockmessage?.status && (
          <Alert
            severity="error"
            sx={{
              fontSize: "11px",
              margin: "10px auto 0",
              // alignItems: "center",
              "& .mui-ptiqhd-MuiSvgIcon-root": {
                display: "none",
              },
              "@media screen and (max-width: 480px)": {
                padding: "3px",
                "&.MuiAlert-root": {
                  // flexDirection: "column",
                  // alignItems: "center",
                },
                "& .MuiAlert-icon": {
                  marginRight: "0",
                  "@media screen and (max-width: 480px)": {
                    paddingTop: "2px",
                    fontSize: "12px",
                    marginRight: "5px",
                  },
                },
                "& .MuiAlert-message": {
                  padding: "0 !important",
                },

                "& .MuiAlert-action": {
                  display: "none",
                },
              },
              "@media (min-width: 600px)": {
                width: "calc(100% - 68px)",
              },
            }}
            onClose={() => setBlockMessage({ status: false, message: "" })}
          >
            {renderMessage()}
          </Alert>
        )}
        {setToggleSignup && (
          <div
            style={{ borderTop: "1px solid #dddddd", padding: "12px 6px 0" }}
          >
            <Box display="flex" gap={0.5} justifyContent={"center"}>
              <FontContainer fontSize="12px" fontWeight="400">
                New User?
              </FontContainer>
              <FontContainer
                fontSize="12px"
                fontWeight="400"
                style={{ cursor: "pointer", color: "#D7282F" }}
                onClick={() => setToggleSignup(true)}
              >
                Sign up
              </FontContainer>
            </Box>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Redoutlinebtn
            type="submit"
            disabled={loading}
            className={classes.loginbtn}
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
              `Login`
            )}
          </Redoutlinebtn>
        </div>
      </Containerlogin>
    </form>
  );
};

export default QucikLogin;
