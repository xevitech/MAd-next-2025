import { Box } from "@mui/material";
import moment from "moment";
import React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
interface DatePickerProps {
  value: string | null | undefined;
  label: string;
  name: string;
  size?: string;
  error?: boolean;
  errorText?: string;
  handleChange: (event: any) => void;
  defaultDate?: any;
  type?: any;
  max_date?: any;
  min_date?: any;
  inputRef?: React.Ref<any>;
  datepicker?: string;
  shouldApplyOwnLabelStyle?: boolean;
}

export const CustomDatePicker: any = ({
  value = "",
  handleChange,
  label,
  name,
  error = false,
  errorText = "",
  type = "",
  max_date = "",
  min_date = "",
  inputRef = null,
  datepicker = "",
  shouldApplyOwnLabelStyle = false,
}: DatePickerProps) => {
  const handleDummyChange = (newValue: any) => {
    let customEvent = { target: { name: "", value: "" } };
    customEvent.target.name = name;
    customEvent.target.value = newValue?.format("YYYY-MM-DD");
    handleChange(customEvent);
  };
  const maxDate = moment("2070-12-31");
  const minDate = min_date ? moment(min_date) : null;
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box sx={{ width: datepicker ? "100%" : "auto" }}>
        <DesktopDatePicker
          sx={{
            width: "100%",
            "& input::placeholder": {},
          }}
          inputRef={inputRef}
          format="YYYY-MM-DD"
          // label={label}
          label={ type=="deals" ?
            <span>
              {label} <span style={{ color: "#d7282f", fontSize:"13px" }}>*</span>
            </span>:''
          }
          value={value !== "0000-00-00" ? (value ? moment(value) : null) : null}
          maxDate={maxDate}
          minDate={minDate}
          onChange={handleDummyChange}
          slotProps={{
            textField: {
              variant: "outlined",
              size: "small",
              error: error,
              inputProps: { readOnly: true},
              helperText: (
                <Box sx={{ marginLeft: "0px !important" }}>
                  {error && type !== "crm" && (
                    <span style={{ marginRight: "3px" }}>
                      <img
                        src="/assets/error-outline-red.svg"
                        alt=""
                        style={{ width: "8px", height: "8px" }}
                      />
                    </span>
                  )}
                  {errorText && (
                    <span style={{ marginLeft: "0px !important" }}>
                      {errorText}
                    </span>
                  )}
                </Box>
              ),
              InputLabelProps: {
                shrink:true,
                sx: shouldApplyOwnLabelStyle
                  ? {
                      position: "absolute",
                      top: "50%",
                      left: 7,
                      width: "fit-content",
                      right: 0,
                      transform: "translateY(-50%)",
                      textAlign: "center",
                    }
                  : {},
              },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};
