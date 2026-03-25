import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { apiClient, getUniqueListBy } from "@/components/common/common";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import { TimeZone_List } from "@/components/profile/personalProfile/location/List";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
const CommonTimeZone = (props) => {
  const { typeName } = useSelector((state: any) => state.formList);

  return (
    <Autocomplete
      size="small"
      popupIcon={<KeyboardArrowDownOutlinedIcon/>}
      onChange={(event: any, newValue) => {
        props?.updateValue(newValue?.view);
      }}
      defaultValue={props?.defaultValue ? {value: props?.defaultValue} : null}
      id="free-solo-demo-time-zone"
      options={TimeZone_List.map((v) => ({
        value: v.tzCode,
        view: v.tzCode,
      }))}
      getOptionLabel={(option: any) => `${option.view}`}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.view}
        </Box>
      )}
      renderInput={(params) => (
        <>
          <TextField
            size="medium"
            placeholder="Select time zone"
            {...params}
            helperText={props?.helperText ? props?.helperText : null}
            onChange={(e) => {
              props?.updateValue(e.target.value);
            }}
            // error={formik.errors.time_zone ? true : false}
            // helperText={formik.errors.time_zone}
          />
        </>
      )}
    />
  );
};

export default CommonTimeZone;
