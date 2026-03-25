import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { LightTooltip } from "../Tooltip/tooltip";
import { useSelector } from "react-redux";

export const SelectableAndEditableField = ({
  size = "",
  formik = null,
  options,
  defaultValue = [],
  setValues = null,
  styleProps = {},
  className = "",
  errorText = "",
  error = false,
  placeholder,
  name = "",
  label = "",
  required = false,
  inputRef=null
}: any) => {
  const [pasted, setPasted] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  
  return (
    <Stack style={{ width: "100%", ...styleProps }}>
      <Autocomplete
        size={size}
        style={{ width: "100%" }}
        className={className || "autoComplete-container"}
        multiple
        id="tags-filled"
        sx={{
          "&& .MuiAutocomplete-endAdornment": {
            display: `${name == "metaKeyword" ? "none" : ""}`,
          },
          '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
            "& .MuiOutlinedInput-notchedOutline": {
              border: `${name == "metaKeyword" ? "none" : ""}`,
            },
          },
        }}
        options={options}
        defaultValue={defaultValue}
        value={defaultValue}
        freeSolo
        onChange={(event: any, value: any) => {
          if (event.key == "Backspace") {
            let keyword = [...defaultValue];
            keyword.pop();
            setValues(keyword);
          } else {
            let keywordValues = event?.target?.value?.includes(",")
              ? [...defaultValue, ...event.target.value.split(",")]
              : value;
            setValues(keywordValues);
          }
        }}
        onPaste={(e: any) => setPasted(true)}
        renderTags={(value: readonly string[], getTagProps) => {
          return value?.map((option, index) => (
            <Chip
              size="small"
              sx={{
                backgroundColor: `#ddd !important`,
                "& .MuiSvgIcon-root": {
                  color: "#d7282fd9",
                  "&:hover": {
                    color: "none",
                  },
                },
              }}
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              onDelete={(e) => {
                const value = defaultValue.filter((v: any) => v != option);
                setValues(value);
              }}
            />
          ));
        }}
        renderInput={(params) => (
          <TextField
            label={
              label ? (
                <div>
                  <span
                    style={{
                      paddingRight: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.4px",
                      color: "#1C1C1C",

                      fontFamily: "open sans",
                    }}
                  >
                    {label}
                  </span>
                  {required && (
                    <LightTooltip placement={"top"} title="Required!" arrow>
                      <span style={{ color: "#D7282F", paddingRight: "5px" }}>
                        *
                      </span>
                    </LightTooltip>
                  )}
                </div>
              ) : (
                ""
              )
            }
            {...params}
            {...(formik?.getFieldProps(name) ?? null)}
            variant="outlined"
            placeholder={placeholder}
            onChange={(e) => {
              if (defaultValue.includes(e.target.value)) {
                setIsError(true);
              } else {
                setIsError(false);
              }
            }}
            error={error || isError ? true : false}
            InputLabelProps={{ shrink: true }}
            helperText={
              error ? `${errorText}` : isError ? " Duplicate not allowed !" : ""
            }
            inputRef={inputRef}
          />
        )}
      />
    </Stack>
  );
};

export default SelectableAndEditableField;
