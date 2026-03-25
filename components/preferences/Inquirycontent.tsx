import React, { useContext, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Divider, FormControl, Typography, styled } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { AccountContext } from "@/contextApi/accountContext";
import InquirySkeleton from "./InquirySkeleton";
import { SaveButton } from "./style";
import { useSelector } from "react-redux";

export const Question = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "600",
  color: "#000000",
  fontFamily: "Open Sans",
  "@media screen and (max-width:767px)": {
    fontSize: "14px",
  },
}));

export const Para = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "12px",
  color: "#676767",
  marginBottom: "10px",
  fontFamily: "Open Sans",
}));

const MyComp = styled(FormControlLabel)(({ theme }) => ({
  fontWeight: "400",
  fontSize: "14px !important",
  color: "#000000",
  "& .MuiTypography-root": {
    color: "#000000",
    fontSize: "14px",
    fontFamily: "Open Sans",
    "@media screen and (max-width:767px)": {
      fontSize: "12px",
    },
  },
}));

export default function Inquirycontent() {
  const {
    details,
    value,
    setValue,
    setdetails,
    getAccountDetails,
    UpdateDetails,
  } = useContext(AccountContext);

  const handleChange = (event) => {
    const val = event.target.value;
    setValue({
      ...value,
      [event.target.name]: val,
    });
  };
  const { role } = useSelector((state: any) => state.userData);
  const handleSubmit = () => {
    UpdateDetails();
    getAccountDetails();
  };
  useEffect(() => {
    getAccountDetails();
  }, []);
  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  const permissions =
    storedSubSellerList && storedSubSellerList.length > 0
      ? storedSubSellerList[0]
      : null;
  return (
    <>
      {details == undefined && (
        <>
          <InquirySkeleton />
        </>
      )}
      {details != undefined && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Question>
              Who would you like to receive Product Inquiries from?
            </Question>

            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={details?.inquiry_from}
                name="ques1"
                onChange={handleChange}
              >
                <MyComp
                  value="registered"
                  control={
                    <Radio
                      sx={{
                        "&.MuiButtonBase-root .MuiRadio-root, &.Mui-checked": {
                          color: "#D7282F",
                        },
                      }}
                    />
                  }
                  label="Any registered user at Merchant AD."
                />

                <MyComp
                  sx={{
                    "@media screen and (max-width:767px)": {
                      marginTop: "-6px",
                    },
                  }}
                  value="verified"
                  control={
                    <Radio
                      sx={{
                        "&.MuiButtonBase-root .MuiRadio-root, &.Mui-checked": {
                          color: "#D7282F",
                        },
                      }}
                    />
                  }
                  label="Merchant AD Verified Users only."
                />

                <MyComp
                  sx={{
                    "@media screen and (max-width:767px)": {
                      marginTop: "-6px",
                    },
                  }}
                  value="premium"
                  control={
                    <Radio
                      sx={{
                        "&.MuiButtonBase-root .MuiRadio-root, &.Mui-checked": {
                          color: "#D7282F",
                        },
                      }}
                    />
                  }
                  label="Premium account members only."
                />
              </RadioGroup>
            </FormControl>

            <Para>
              Please understand the same will be applicable for the enquiries
              raised by you
            </Para>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Question>
              Would you like to opt for Company certificate verification?
            </Question>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={details?.company_verification_certificate}
                name="ques2"
                onChange={handleChange}
              >
                <MyComp
                  value="yes"
                  control={
                    <Radio
                      sx={{
                        "&.MuiButtonBase-root .MuiRadio-root, &.Mui-checked": {
                          color: "#D7282F",
                        },
                      }}
                    />
                  }
                  label="Yes"
                />
                <MyComp
                  sx={{
                    "@media screen and (max-width:767px)": {
                      marginTop: "-10px",
                    },
                  }}
                  value="no"
                  control={
                    <Radio
                      sx={{
                        "&.MuiButtonBase-root .MuiRadio-root, &.Mui-checked": {
                          color: "#D7282F",
                        },
                      }}
                    />
                  }
                  label="No"
                />
              </RadioGroup>
            </FormControl>
            <Para>Additional charges applicable.</Para>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Question>
              Would you like to opt for reminder for your inquiries?
            </Question>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={details?.reminder_inquiries}
                name="ques3"
                onChange={handleChange}
              >
                <MyComp
                  value="yes"
                  control={
                    <Radio
                      sx={{
                        "&.MuiButtonBase-root .MuiRadio-root, &.Mui-checked": {
                          color: "#D7282F",
                        },
                      }}
                    />
                  }
                  label="Yes"
                />
                <MyComp
                  sx={{
                    "@media screen and (max-width:767px)": {
                      marginTop: "-10px",
                    },
                  }}
                  value="no"
                  control={
                    <Radio
                      sx={{
                        "&.MuiButtonBase-root .MuiRadio-root, &.Mui-checked": {
                          color: "#D7282F",
                        },
                      }}
                    />
                  }
                  label="No"
                />
              </RadioGroup>
            </FormControl>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Question>Automate Quote</Question>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={details?.automate_quote}
                name="ques4"
                onChange={handleChange}
              >
                <MyComp
                  value="yes"
                  control={
                    <Radio
                      sx={{
                        "&.MuiButtonBase-root .MuiRadio-root, &.Mui-checked": {
                          color: "#D7282F",
                        },
                      }}
                    />
                  }
                  label="Yes"
                />
                <MyComp
                  sx={{
                    "@media screen and (max-width:767px)": {
                      marginTop: "-10px",
                    },
                  }}
                  value="no"
                  control={
                    <Radio
                      sx={{
                        "&.MuiButtonBase-root .MuiRadio-root, &.Mui-checked": {
                          color: "#D7282F",
                        },
                      }}
                    />
                  }
                  label="No"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      )}
      {(role === "seller" ||
        (role === "subuser" && 
          
          permissions?.account_preferences?.add==true 
          )) && (
        <SaveButton onClick={handleSubmit}>Save</SaveButton>
      )}
    </>
  );
}
