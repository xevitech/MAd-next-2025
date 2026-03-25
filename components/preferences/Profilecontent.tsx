import React, { useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import { Typography, styled } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Box } from "@mui/system";
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

export const Flex = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  "@media screen and (max-width:600px)": {
    alignItems: "center",
  },
}));

const Android12Switch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#D7282F",
  },

  "& .MuiSwitch-switchBase": {
    color: "#C5C5C5",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#C5C5C5",
  },
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    backgroundColor: "#FFFFFF",
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 40,
      height: 20,
      border: "1px solid #C5C5C5",
      borderRadius: "50px",
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 14,
    height: 14,
    margin: 3,
  },
}));

export default function Profilecontent() {
  const { details, value, setValue, getAccountDetails, UpdateDetails } =
    useContext(AccountContext);
  const [checked, setchecked] = useState<any>(
    details?.view_profile === "yes" ? true : false
  );
  const { role } = useSelector((state: any) => state.userData);

  const handleChange = (event) => {
    setchecked(event.target.checked ? true : false);
    const val = event.target.checked ? "yes" : "no";
    setValue({
      ...value,
      [event.target.name]: val,
    });
  };
  const handleSubmit = () => {
    UpdateDetails();
    getAccountDetails();
  };
  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  const permissions =
    storedSubSellerList && storedSubSellerList.length > 0
      ? storedSubSellerList[0]
      : null;
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Flex>
            <Question>Who can view my profile</Question>
            <Box marginLeft={2}>
              <FormGroup>
                <FormControlLabel
                  label=""
                  name="ques10"
                  value={checked ? true : false}
                  onChange={handleChange}
                  checked={checked}
                  control={<Android12Switch />}
                />
              </FormGroup>
            </Box>
          </Flex>
          {(role === "seller" ||
            (role === "subuser" &&
              permissions?.account_preferences?.add == true)) && (
            <SaveButton onClick={handleSubmit}>Save</SaveButton>
          )}
        </Grid>
      </Grid>
    </>
  );
}
