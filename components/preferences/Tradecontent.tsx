import React, { useContext, useState } from "react";
import { Button, Divider, Stack, Typography, styled } from "@mui/material";
import Radio from "@mui/material/Radio";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Box } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import { AccountContext } from "@/contextApi/accountContext";
import { SaveButton } from "./style";
import { useSelector } from "react-redux";

const Question = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "600",
  color: "#000000",
  fontFamily: "Open Sans",
  "@media screen and (max-width: 767px)": { fontSize: "14px" },
}));

const Flex = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
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
export default function Tradecontent() {
  const { details, value, setValue, getAccountDetails, UpdateDetails } =
    useContext(AccountContext);
  const [checked, setchecked] = useState<any>(
    details?.searches_matching === "yes" ? true : false
  );
  const [checked1, setchecked1] = useState<any>(
    details?.frequent_searches === "yes" ? true : false
  );
  const [checked2, setchecked2] = useState<any>(
    details?.trade_alert_new_product_demand === "yes" ? true : false
  );
  const [checked3, setchecked3] = useState<any>(
    details?.demanding_enquiries_powercozmo === "yes" ? true : false
  );
  const handleChange = (event) => {
    console.log(event.target.name, "name");
    {
      event.target.name === "ques5" &&
        setchecked(event.target.checked ? true : false);
    }
    {
      event.target.name === "ques6" &&
        setchecked1(event.target.checked ? true : false);
    }
    {
      event.target.name === "ques7" &&
        setchecked2(event.target.checked ? true : false);
    }
    {
      event.target.name === "ques8" &&
        setchecked3(event.target.checked ? true : false);
    }
    const val = event.target.checked ? "yes" : "no";
    setValue({
      ...value,
      [event.target.name]: val,
    });
  };

  const handleChange1 = (event) => {
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
    <Box>
      <Stack divider={<Divider orientation="horizontal" flexItem />}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={"20px"}
          sx={{ marginBottom: "10px" }}
        >
          <Box>
            <Question>
              Would you like to receive for searches matching product listings?
            </Question>
          </Box>
          <Box>
            <FormGroup>
              <FormControlLabel
                label=""
                name="ques5"
                value={checked ? true : false}
                onChange={handleChange}
                checked={checked}
                control={<Android12Switch />}
                sx={{ marginRight: "0px" }}
              />
            </FormGroup>
          </Box>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          marginTop={1}
          gap={"10px"}
          sx={{ marginBottom: "10px" }}
        >
          <Box>
            <Question>
              Would you like to receive alerts based on frequent searches for
              your product?
            </Question>
          </Box>
          <Box>
            <FormGroup>
              <FormControlLabel
                label=""
                name="ques6"
                value={checked1 ? true : false}
                onChange={handleChange}
                checked={checked1}
                control={<Android12Switch defaultChecked />}
                sx={{ marginRight: "0px" }}
              />
            </FormGroup>
          </Box>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          marginTop={1}
          gap={"10px"}
          sx={{ marginBottom: "10px" }}
        >
          <Box>
            <Question>
              Would you like to receive trade alerts for new products to
              understand the demand?
            </Question>
          </Box>
          <Box>
            <FormGroup>
              <FormControlLabel
                label=""
                name="ques7"
                value={checked2 ? true : false}
                onChange={handleChange}
                checked={checked2}
                control={<Android12Switch />}
                sx={{ marginRight: "0px" }}
              />
            </FormGroup>
          </Box>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          marginTop={1}
          gap={"10px"}
          sx={{ marginBottom: "10px" }}
        >
          <Box>
            <Question>
              Would you like to receive alerts for demanding enquiries across
              Merchant AD?
            </Question>
          </Box>
          <Box>
            <FormGroup>
              <FormControlLabel
                label=""
                name="ques8"
                value={checked3 ? true : false}
                onChange={handleChange}
                checked={checked3}
                control={<Android12Switch defaultChecked />}
                sx={{ marginRight: "0px" }}
              />
            </FormGroup>
          </Box>
        </Stack>

        <Stack marginTop={1}>
          <Box>
            <Question>Choose your preferred mode of Communication.</Question>
          </Box>
          <Box>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={details?.preffer_mode_communication}
                name="ques9"
                onChange={handleChange1}
                sx={{ marginRight: "0px" }}
              >
                <MyComp
                  value="email"
                  control={
                    <Radio
                      sx={{
                        "&.MuiButtonBase-root .MuiRadio-root, &.Mui-checked": {
                          color: "#D7282F",
                        },
                      }}
                    />
                  }
                  label="Email"
                />

                <MyComp
                  sx={{
                    "@media screen and (max-width:767px)": {
                      marginTop: "-10px",
                    },
                  }}
                  value="sms"
                  control={
                    <Radio
                      sx={{
                        "&.MuiButtonBase-root .MuiRadio-root, &.Mui-checked": {
                          color: "#D7282F",
                        },
                      }}
                    />
                  }
                  label="SMS"
                />

                <MyComp
                  sx={{
                    "@media screen and (max-width:767px)": {
                      marginTop: "-10px",
                    },
                  }}
                  value="whatsapp"
                  control={
                    <Radio
                      sx={{
                        "&.MuiButtonBase-root .MuiRadio-root, &.Mui-checked": {
                          color: "#D7282F",
                        },
                      }}
                    />
                  }
                  label="WhatsApp"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Stack>
      </Stack>
      {(role === "seller" ||
        (role === "subuser" &&
          permissions?.account_preferences?.add == true)) && (
        <SaveButton onClick={handleSubmit}>Save</SaveButton>
      )}
    </Box>
  );
}
