import React, { useContext } from "react";
import { Typography, Grid, Divider, Button, styled } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { AccountContext } from "@/contextApi/accountContext";
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

export default function Compantcontent() {
  const { details, value, setValue, getAccountDetails, UpdateDetails } =
    useContext(AccountContext);
  const handleChange = (event) => {
    const val = event.target.value;
    setValue({
      ...value,
      [event.target.name]: val,
    });
  };
  const handleSubmit = () => {
    UpdateDetails();
    getAccountDetails();
  };
  const { role } = useSelector((state: any) => state.userData);
  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  const permissions =
    storedSubSellerList && storedSubSellerList.length > 0
      ? storedSubSellerList[0]
      : null;
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Question>Select who can take view the tour of your company</Question>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={details?.view_company_tour}
              name="ques11"
              onChange={handleChange}
            >
              <MyComp
                value="anyone"
                control={
                  <Radio
                    sx={{
                      "&.MuiButtonBase-root .MuiRadio-root, &.Mui-checked": {
                        color: "#D7282F",
                      },
                    }}
                  />
                }
                label="Anyone"
              />
              <MyComp
                sx={{
                  "@media screen and (max-width:767px)": {
                    marginTop: "-10px",
                  },
                }}
                value="power_cozmo_verified_users"
                control={
                  <Radio
                    sx={{
                      "&.MuiButtonBase-root .MuiRadio-root, &.Mui-checked": {
                        color: "#D7282F",
                      },
                    }}
                  />
                }
                label="Merchant AD Verified Users"
              />
              <MyComp
                sx={{
                  "@media screen and (max-width:767px)": {
                    marginTop: "-10px",
                  },
                }}
                value="premium_members_only"
                control={
                  <Radio
                    sx={{
                      "&.MuiButtonBase-root .MuiRadio-root, &.Mui-checked": {
                        color: "#D7282F",
                      },
                    }}
                  />
                }
                label="Premium Members Only"
              />
            </RadioGroup>
          </FormControl>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <Question>Select who can view your company certifications</Question>

          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={details?.view_company_certifications}
              name="ques12"
              onChange={handleChange}
            >
              <MyComp
                value="power_cozmo_verified_users"
                control={
                  <Radio
                    sx={{
                      "&.MuiButtonBase-root .MuiRadio-root, &.Mui-checked": {
                        color: "#D7282F",
                      },
                    }}
                  />
                }
                label="Merchant AD Verified Users"
              />
              <MyComp
                sx={{
                  "@media screen and (max-width:767px)": {
                    marginTop: "-10px",
                  },
                }}
                value="premium_members_only"
                control={
                  <Radio
                    sx={{
                      "&.MuiButtonBase-root .MuiRadio-root, &.Mui-checked": {
                        color: "#D7282F",
                      },
                    }}
                  />
                }
                label="Premium Members Only"
              />
            </RadioGroup>
          </FormControl>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <Question>Select who can view your company contact Details</Question>

          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={details?.view_company_contact_details}
              name="ques13"
              onChange={handleChange}
            >
              <MyComp
                value="power_cozmo_verified_users"
                control={
                  <Radio
                    sx={{
                      "&.MuiButtonBase-root .MuiRadio-root, &.Mui-checked": {
                        color: "#D7282F",
                      },
                    }}
                  />
                }
                label="Merchant AD Verified Users"
              />
              <MyComp
                sx={{
                  "@media screen and (max-width:767px)": {
                    marginTop: "-10px",
                  },
                }}
                value="premium_members_only"
                control={
                  <Radio
                    sx={{
                      "&.MuiButtonBase-root .MuiRadio-root, &.Mui-checked": {
                        color: "#D7282F",
                      },
                    }}
                  />
                }
                label="Premium Members Only"
              />
            </RadioGroup>
          </FormControl>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <Question>Select who can view your company details</Question>

          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={details?.view_your_company_details}
              name="ques14"
              onChange={handleChange}
            >
              <MyComp
                value="power_cozmo_verified_users"
                control={
                  <Radio
                    sx={{
                      "&.MuiButtonBase-root .MuiRadio-root, &.Mui-checked": {
                        color: "#D7282F",
                      },
                    }}
                  />
                }
                label="Merchant AD Verified Users"
              />
              <MyComp
                sx={{
                  "@media screen and (max-width:767px)": {
                    marginTop: "-10px",
                  },
                }}
                value="premium_members_only"
                control={
                  <Radio
                    sx={{
                      "&.MuiButtonBase-root .MuiRadio-root, &.Mui-checked": {
                        color: "#D7282F",
                      },
                    }}
                  />
                }
                label="Premium Members Only"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      {(role === "seller" ||
        (role === "subuser" &&
          permissions?.account_preferences?.add == true)) && (
        <SaveButton onClick={handleSubmit}>Save</SaveButton>
      )}
    </>
  );
}
