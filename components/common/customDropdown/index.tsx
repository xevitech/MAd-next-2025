import React from "react";
import { Box, FormHelperText, MenuItem, Select } from "@mui/material";

export const CustomDropdown = (props) => {
  const {
    options,
    value,
    handleChange,
    name,
    error,
    errorText,
    styleProps,
    placeholder,
    formik = null,
    registaredcurrency = null,
    type,
    inputRef = null,
  } = props;
  return (
    <Box
      sx={{
        "& .MuiInputBase-root": {
          "&:hover": {
            "& fieldset": {
              borderColor: registaredcurrency ? "#d7282f" : "",
            },
          },
        },
      }}
    >
      <Select
        {...(formik?.getFieldProps(name) ?? null)}
        style={{ width: "100%", ...styleProps }}
        id="outlined-select-currency"
        displayEmpty
        name={name}
        size="small"
        error={error}
        sx={{
          "& .MuiSelect-select": {
            fontSize: "13px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: registaredcurrency ? "#d7282f" : "",
          },
        }}
        inputRef={inputRef}
        renderValue={(selected: any) => {
          if (selected?.length === 0) {
            return (
              <p style={{ color: "rgba(34, 51, 84, 0.5)" }}>{placeholder}</p>
            );
          }
          return selected;
        }}
        helperText={errorText}
        value={value}
        onChange={handleChange}
        placeholder="Yearly Revenue"
        MenuProps={{
          style: { zIndex: `${props.overlay ? 1400 : 98}` },
          disableScrollLock: true,
          marginThreshold: null,
          PaperProps: {
            sx: {
              maxHeight: 200,
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#acabab",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#6d6d6d",
              },
            },
          },
        }}
      >
        {options?.map((option) => (
          <MenuItem key={option?.id} value={option?.value || option?.name}>
            {option?.view || option?.value || option?.name}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <FormHelperText>
          {" "}
          <span className="erroricon" style={{ marginLeft: "0px !important" }}>
            {type == "employee" ? (
              ""
            ) : (
              <img
                src="/assets/error-outline-red.svg"
                alt=""
                style={{ width: "8px", height: "8px" }}
              />
            )}
          </span>
          <span
            style={{
              marginLeft: "3px",
              fontSize: "10px",
              color: "#d7282f",
            }}
          >
            {" "}
            {errorText}
          </span>
        </FormHelperText>
      )}
    </Box>
  );
};
