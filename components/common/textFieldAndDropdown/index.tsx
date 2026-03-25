import React from "react";
import { MenuItem, styled, TextField } from "@mui/material";

const OuterContainer = styled("div")({
  display: "flex",
  width: "100%",
});

export const TextFieldAndDropdown = ({
  textFieldValue,
  textFieldLabel,
  dropdownLabel,
  dropdownValue,
  dropdownOptions,
  handleChange,
  textFieldName,
  dropdownName,
  dropDownErrorText = "",
  textFieldErrorText = "",
  dropDownError = false,
  textFieldError = false,
}) => {

  return (
    <OuterContainer>
      <TextField
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          },
        }}
        SelectProps={{
          MenuProps: { disableScrollLock:true,style:{zIndex:98},
            PaperProps: {
              style: {
                maxHeight: 250,
              },
            },
          },
        }}
        className="custom-select"
        select
        style={{ width: "30%" }}
        label={dropdownLabel}
        name={dropdownName}
        onChange={handleChange}
        size="small"
        error={dropDownError}
        helperText={dropDownErrorText}
        value={dropdownValue}
      >
        {dropdownOptions?.map((ele) => (
          <MenuItem key={ele?.id} value={ele?.value}>
            {ele?.value}- {ele?.view}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label={textFieldLabel}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderLeft: 0,
              borderLeftRadius: 0,
            },
          },
        }}
        className="custom-field"
        style={{ width: "70%" }}
        value={textFieldValue}
        name={textFieldName}
        onChange={handleChange}
        size="small"
        error={textFieldError}
        helperText={textFieldErrorText}
        inputProps={{
          autoComplete: "off",
        }}
      />
    </OuterContainer>
  );
};
