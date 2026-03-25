import { FormControl, InputAdornment, TextField } from "@mui/material";
import React from "react";

import Image from "next/image";
export const CustomTextField = (props: any) => {
  const {
    placeholder,
    value,
    handleChange,
    name,
    endProps,
    addField,
    removeField,
    id,
    error,
    errorText,
    registered=null,
    inputRef = null,
  } = props;
  return (
    <FormControl sx={{ width: "100%" }}>
      <TextField
        inputProps={{
          autoComplete: "off",
        }}
        
        placeholder={placeholder ? placeholder : name}
        helperText={errorText}
        fullWidth
        autoComplete="off"
        disabled={name == "geo_location" ? true : false}
        error={error}
        name={name}
        size="small"
        value={value}
        inputRef={inputRef} 
        onChange={handleChange}
        sx={{
          "& .MuiInputBase-input": {
            height: registered ? "23px" : "",
          },
          "& .MuiFormHelperText-root":{margin: registered ? "0px !important" : "",}
        }}
        id={id}
        InputProps={{
          endAdornment: endProps && (
            <InputAdornment
              position="end"
              style={{ display: "flex", gap: "4px" }}
            >
              <Image
                style={{ cursor: "pointer" }}
                onClick={() => addField(id)}
                src={"/assets/plusSignRound.svg"}
                width={15}
                height={15}
                alt="add"
              />
              {props?.index > 0 && (
                <Image
                  style={{ cursor: "pointer" }}
                  onClick={() => removeField(id)}
                  src={"/assets/deleteSignRound.svg"}
                  width={15}
                  height={15}
                  alt="remove"
                />
              )}
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};
