import React from "react";
import { TextField} from "@mui/material";
import { makeStyles } from 'tss-react/mui';

const useStyles: any = makeStyles()(() => {
  return {
  customTextField: {
    "& input::placeholder": {
      fontSize: "10px !important",
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

export const CustomTextField = ({
  size = undefined,
  label,
  handleChange,
  value,
  name,
}) => {
  const {classes} = useStyles();
  return (
    <>
      <TextField
        name={name}
        sx={{ minWidth: "30%" }}
        classes={{ root: classes.customTextField }}
        label={label}
        onChange={handleChange}
        value={value}
        size={size}
      ></TextField>
    </>
  );
};
