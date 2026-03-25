import React from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import Image from "next/image";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
function CustomAutocompelete({
  size = "",
  options,
  label = "",
  handleChange,
  value = "",
  initialValue = null,
  groupBy = false,
  name = "",
  required = false,
  formik = null,
  index = 0,
  placeholder,
  handleRemoveError=null,
  labelToolTipText = "",
  onChangeHandler = null,
}) {
  const handleOptionChange = (event, newValue) => {
    if(handleRemoveError){
      handleRemoveError();
    }
    handleChange(newValue?.value ?? "");
  };

  const ShowError = (name) => {
    if (name === "country_origin_id") {
      if (formik?.errors?.[name]?.[index]?.country_code) return true;
      else false;
    } else if (name === "tertiary_id") {
      if (formik?.errors?.[name]?.[index]?.country_code) return true;
      else false;
    } else if (name === "sea_") {
      if (formik?.errors?.["sea_"]?.[index]?.sea_ports) return true;
      else false;
    } else if (name === "port_") {
      if (formik?.errors?.["port_"]?.[index]?.air_ports) return true;
      else false;
    } else {
      if (formik?.errors[name]) return true;
      else return false;
    }
  };
  const ErrorMessage = () => {
    if (name === "country_origin_id") {
      return formik?.errors?.[name]?.[index]?.country_code;
    } else if (name === "tertiary_id") {
      return formik?.errors?.[name]?.[index]?.country_code;
    } else if (name === "sea_") {
      return formik?.errors?.[name]?.[index]?.sea_ports;
    } else if (name === "port_") {
      return formik?.errors?.[name]?.[index]?.air_ports;
    } else {
      return formik?.errors[name];
    }
  };

  const handleKeyPress = (event) => {
    if (
      (name === "qty_unit" && /\d/.test(event.key)) ||
      (name === "unit" && /\d/.test(event.key))
    ) {
      event.preventDefault();
    }
  };

  return (
    <Autocomplete
      size={size ? "small" : "medium"}
      onInputChange={(e: any) => {
        if (onChangeHandler) {
          onChangeHandler(e?.target?.value);
        }
      }}
      // disableClearable={true}
      disableClearable={false}
      id="product-list-autocomplete"
      options={options}
      groupBy={groupBy ? (option) => option.type : null}
      getOptionLabel={(option: any) =>
        name == "manufacturer_year" ? option?.view.toString() : option?.view
      }
      onChange={handleOptionChange}
      sx={{ width: "100% " }}
      value={initialValue}
      defaultValue={initialValue}
      slotProps={{
        popper: {
          sx: {
            zIndex: `${name == "currency" ? null : 9}`,
          },
        },
      }}
      ListboxProps={{
        sx: {
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
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{
            padding: "6px 16px !important",
            minHeight: "30px !important",
            "& > img": { mr: 2, flexShrink: 0 },
          }}
          {...props}
        >
          {option.view}
        </Box>
      )}
      renderInput={(params): any => {
        return (
          <TextField
            placeholder={`Select ${placeholder}`}
            {...formik?.getFieldProps(name)}
            {...params}
            InputLabelProps={{
              shrink: label ? true : false,
            }}
            inputProps={{
              ...params.inputProps,
              onKeyPress: handleKeyPress,
            }}
            label={
              <div>
                {label && (
                  <span
                    style={{
                      // paddingRight: "10px",
                      paddingRight: "3px",
                      fontWeight: 600,
                      letterSpacing: "0.4px",
                      color: "#1C1C1C",
                      fontFamily: "open sans",
                    }}
                  >
                    {label}
                  </span>
                )}

                {required && (
                  <LightTooltip
                    placement={"top"}
                    title="Required!"
                    arrow
                    disableInteractive
                  >
                    <span style={{ color: "#D7282F", paddingRight: "5px" }}>
                      *
                    </span>
                  </LightTooltip>
                )}
                {labelToolTipText && (
                  <LightTooltip
                    // placement={"top"}
                    placement={"right"}
                    title={labelToolTipText}
                    arrow
                    disableInteractive
                  >
                    {
                      <span
                        style={{
                          display: "inline-block",
                          position: "relative",
                          width: "16px",
                          height: "16px",
                        }}
                      >
                        <Image
                          src={"/assets/helpIcon.svg"}
                          layout="fill"
                          alt="image"
                        />{" "}
                      </span>
                    }
                  </LightTooltip>
                )} 
              </div>
            }
            error={ShowError(name)}
            helperText={ShowError(name) ? ErrorMessage() : ""}
          />
        );
      }}
    />
  );
}

export default CustomAutocompelete;
