import {
  TextField,
  Tooltip,
  MenuItem,
} from "@mui/material";
import React from "react";
import { makeStyles } from 'tss-react/mui';
import Image from "next/image";


const useStyles: any = makeStyles()((theme) => {
  return {
  customTextField: {
    "& input::placeholder": {
      fontSize: "13px !important",
    },

    "& textArea::placeholder": {
      fontSize: "13px !important",
    },
  },
  customInputFieldsProduct: {
    "& input::placeholder": {
      fontSize: "13px !important",
      fontWeight: "bold",
    },
  },
}
});

export const SelectableTextField = (props) => {

  const {
    label,
    labelTooltipText,
    data,
    name,
    value,
    handleChange,
  } = props;

  const {classes} = useStyles();

  return (
    <>
      <TextField
        value={value || ""}
        name={name}
        select
        onChange={(e) => {
          console.log(e.target.value);
          handleChange(e);
        }}
        classes={{ root: classes.customTextField }}
        fullWidth
        label={
          <div>
            <span
              style={{
                paddingRight: "10px",
                fontWeight: 600,
                letterSpacing: "0.4px",
                color: "#1C1C1C",
              }}
            >
              {label}
            </span>
            <Tooltip placement={"top"} title="Required!" arrow>
              <span
                style={{
                  color: "#D7282F",
                  paddingRight: "5px",
                }}
              >
                *
              </span>
            </Tooltip>

            <Tooltip placement={"top"} title={labelTooltipText} arrow>
              <span
                style={{
                  display: "inline-block",
                  position: "relative",
                  width: "15px",
                  height: "15px",
                }}
              >
                {" "}
                <Image src={"/assets/helpIcon.svg"} layout="fill" alt="img" />
              </span>
            </Tooltip>
          </div>
        }
        InputLabelProps={{ shrink: true }}
      >
        {data?.map((option) => (
          <MenuItem key={option?.value} value={option?.value}>
            {option.view}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};
