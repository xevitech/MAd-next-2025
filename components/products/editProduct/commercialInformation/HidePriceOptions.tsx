import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

function HidePriceOptions({ formik }) {
  const options = [
    {
      name: "<strong>Sign in to show price </strong> or contact us for pricing information.",
      value: 1,
    },
    {
      name: "<strong>Price Flexible: </strong> The price of this product is flexible and may vary depending on quantity and other factors. Please sign in to see price.",
      value: 2,
    },
    {
      name: "<strong>Price Negotiable Upon Request,</strong> Please contact us for pricing information. The price of this product may vary depending on quantity and other factors.",
      value: 3,
    },
    {
      name: "<strong>Price Subject to Negotiation </strong> The price of this product is negotiable upon request. Please contact us for more information.",
      value: 4,
    },
    {
      name: "<strong>Price Subject to Final Agreement:</strong> The price of this product is flexible and may vary depending on quantity and other factors. Please contact us to discuss pricing.",
      value: 5,
    },
  ];
  return (
    <>
      <Box
        sx={{
          // borderBottom: "1px solid rgb(187, 187, 187)",
          padding: "12px 0 12px 0",
          marginTop: "12px",
          paddingLeft: "5px",
        }}
      >
        <Typography fontSize={"14px"} fontWeight={600} color={"#000"} mb={1}>
          The selected label will be displayed on the product detail page.
        </Typography>
        <FormControl>
          <RadioGroup
            value={formik.values.hide_price_condition}
            onChange={(e, value) => {
              formik.setFieldValue("hide_price_condition", value);
            }}
            sx={{
              "& .MuiFormControlLabel-root": {
                "& .MuiButtonBase-root": {
                  padding: "4px",
                  "&.Mui-checked": {
                    color: "#D7282F",
                  },
                },
                "& .MuiTypography-body1": {
                  fontSize: "14px",
                  color: "#1C1C1C",
                },
              },
            }}
          >
            {options.map((v, i) => (
              <FormControlLabel
                value={v.value}
                control={<Radio />}
                label={<div dangerouslySetInnerHTML={{ __html: v.name }} />}
                name={v.name}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
}

export default HidePriceOptions;
