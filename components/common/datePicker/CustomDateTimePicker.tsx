import moment from "moment";
import React, { useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { Box } from "@mui/material";
import { FullFieldContainer, FullFieldLabel, FullFieldValue } from "@/components/CompanySettings/CompanyDetail/commonStyles";
import { Grid } from "react-loader-spinner";
import { FormControl } from "@mui/base";
import { CustomDatePicker } from ".";

export const CustomDateTimePicker: any = ({
  value = "",
  handleChange,
  label,
  name,
  error,
  errorText,
  mindate,
  maxdate,
  disabled,
  disablePast,
  type = ''
}) => {
  const [selectedDate, setSelectedDate] = useState<any>(null);

  const handleDummyChange = (newValue: any) => {
    let customEvent = { target: { name: "", value: "" } };
    customEvent.target.name = name;
    customEvent.target.value = newValue?.format("YYYY-MM-DD hh:mm A");
    handleChange(newValue);
    setSelectedDate(moment(newValue));
  };

  return (
    <Box className={type === 'crm' && "datetimecommon"}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateTimePicker
          label={label}
          format="YYYY-MM-DD hh:mm A"
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
          onChange={handleDummyChange}
          slotProps={{
       
            textField: {
              size:"small",
        
              variant: "outlined",
              error: error,
              helperText: errorText,
            },
          }}
          value={value ? moment(value) : selectedDate}
          minDate={mindate && moment(mindate)}
          maxDate={maxdate && moment(maxdate)}
          disabled={disabled ? true : false}
          disablePast={disablePast}
          sx={{width:'100%'}}
        />
         
      </LocalizationProvider>
    </Box>
  );
};
