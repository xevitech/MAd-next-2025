import {
  TextField,
  Tooltip,
  MenuItem,
  ListSubheader,
  InputAdornment,
  Select,
  InputLabel,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import { useStyles } from "./styles";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";

export const SelectableTextField = (props) => {
  const {
    label,
    required,
    labelTooltipText,
    data,
    fieldName,
    name,
    value,
    handleChange,
    type,
    group1Heading,
    group2Heading,
    group1Data,
    group2Data,
    size,
    style,
    placeholder,
    isTextField = true
  } = props;

  const { classes } = useStyles();

  return (
    <>
      {isTextField ? (<TextField
        sx={{
          "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
          {
            padding: "9px 14px",
            height: "20px",
            fontSize: "13px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: value ? "" : "",
          },
        }}
        value={value || ""}
        name={name}
        select
        onChange={(e) => handleChange(e)}
        placeholder={placeholder}
        fullWidth
        label={
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
                <span
                  style={{
                    color: "#D7282F",
                    paddingRight: "5px",
                  }}
                >
                  *
                </span>
              </LightTooltip>
            )}
            {labelTooltipText && (
              <LightTooltip placement={"top"} title={labelTooltipText} arrow>
                <span
                  style={{
                    display: "inline-block",
                    position: "relative",
                    width: "16px",
                    height: "18px",
                  }}
                >
                  {" "}
                  <Image src={"/assets/helpIcon.svg"} layout="fill" alt="img" />
                </span>
              </LightTooltip>
            )}
          </div>
        }
        InputLabelProps={{ shrink: true }}
        inputProps={{
          style: {
            fontSize: size === "small" ? 14 : undefined,
          },
        }}
      >
        {type !== "grouping-select" &&
          data?.map((option) => (
            <MenuItem key={option?.value} value={option?.value}>
              {option.view}
            </MenuItem>
          ))}

        {type === "grouping-select" && (
          <ListSubheader>{group1Heading}</ListSubheader>
        )}
        {group1Data &&
          group1Data?.map((option) => (
            <MenuItem key={option?.value} value={option?.value}>
              {option.view}
            </MenuItem>
          ))}

        {type === "grouping-select" && (
          <ListSubheader>{group2Heading}</ListSubheader>
        )}

        {group2Data &&
          group2Data?.map((option) => (
            <MenuItem key={option?.value} value={option?.value}>
              {option.view}
            </MenuItem>
          ))}
      </TextField>) :
        (
          <>
            <InputLabel shrink={ true } sx={{"&.MuiFormLabel-root":{fontWeight:'600',color:'#1c1c1c !important'} ,paddingLeft:"6px"}}> {label ? label : "Unit"}
              <span
                style={{
                  color: "#D7282F",
                  paddingLeft: "6px",
                }}
              >
                *
              </span>
            </InputLabel>
            <Select
              size='small'
              sx={{
                "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                {
                  padding: "9px 14px",
                  height: "20px",
                  fontSize: "13px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: value ? "" : "",
                },
              }}
              value={value || ""}
              name={name}
              onChange={(e) => handleChange(e)}
              placeholder={placeholder}
              fullWidth
              label={
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
                      <span
                        style={{
                          color: "#D7282F",
                          paddingRight: "5px",
                        }}
                      >
                        *
                      </span>
                    </LightTooltip>
                  )}
                  {labelTooltipText && (
                    <LightTooltip placement={"top"} title={labelTooltipText} arrow>
                      <span
                        style={{
                          display: "inline-block",
                          position: "relative",
                          width: "16px",
                          height: "18px",
                        }}
                      >
                        {" "}
                        <Image src={"/assets/helpIcon.svg"} layout="fill" alt="img" />
                      </span>
                    </LightTooltip>
                  )}
                </div>
              }
              // InputLabelProps={{ shrink: true }}
              inputProps={{
                style: {
                  fontSize: size === "small" ? 14 : undefined,
                },
              }}
              MenuProps={{
                style:{ zIndex:  98},
                disableScrollLock: true,
                marginThreshold: null,
                PaperProps: {
                  sx: {
                    maxHeight: 200,
                    maxWidth: 178,
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
                  }
                }
              }}

            >
              {type !== "grouping-select" &&
                data?.map((option) => (
                  <MenuItem key={option?.value} value={option?.value}>
                    {option.view}
                  </MenuItem>
                ))}

              {type === "grouping-select" && (
                <ListSubheader>{group1Heading}</ListSubheader>
              )}
              {group1Data &&
                group1Data?.map((option) => (
                  <MenuItem key={option?.value} value={option?.value}>
                    {option.view}
                  </MenuItem>
                ))}

              {type === "grouping-select" && (
                <ListSubheader>{group2Heading}</ListSubheader>
              )}

              {group2Data &&
                group2Data?.map((option) => (
                  <MenuItem key={option?.value} value={option?.value}>
                    {option.view}
                  </MenuItem>
                ))}
            </Select>
          </>

        )}
    </>
  );
};
