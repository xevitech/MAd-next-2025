import React, { useEffect, useState } from "react";
import { Autocomplete } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { apiClient } from "./common";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
const CitiesStates: any = ({
  country = "",
  city = "",
  state = "",
  setCity,
  styleProps = {},
  name = "",
  formik = null,
  errors = false,
  errorText = "",
  setLocation,
  usedOn,
  disableClearable,
  disableScroll,
  inputRef = null,
  onBlurOverride = null, 
  type=""
}) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getCities();
  }, [state]);

  const getCities = async () => {
    try {
      if (!state && !country) {
        setCities([]);
        return;
      }
      const response = await apiClient(
        `cities?state=${state}&country=${country}`,
        "get"
      );
      if (response.status === 200) {
        setCities(response.data);
      } else {
        setCities([]);
      }
    } catch (error) {
      setCities([]);
    }
  };

  const handleCityChange = (event: any, newValue: any) => {
    setLocation(newValue);
    setCity(newValue?.name);
  };

  return (
    <>
      <Autocomplete
        id="city-select-demo"
        size="small"
        sx={{ width: "100%", ...styleProps }}
        options={cities}
        value={city ? { name: city } : null}
        onOpen={() => {
          if(disableScroll) disableScroll(true)
        }}
        onClose={() => {
          if(disableScroll) disableScroll(false)
        }}
        placeholder="Select City"
        autoHighlight
        disableClearable={disableClearable}
        autoComplete={false}
        slotProps={{
          popper: {
            sx: {
              zIndex: usedOn == "CRM" ? "none" : 10,
            },
          },
        }}
        popupIcon={
          type == "crm" ? (
            <KeyboardArrowDownOutlinedIcon />
          ) : (
            <ArrowDropDownIcon />
          )
        }
        ListboxProps={{
          
          sx: {
            maxHeight: 150,
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
        getOptionLabel={(option) => option?.name}
        onChange={handleCityChange} // Call handleCityChange on option change
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {option?.name}
          </Box>
        )}
        renderInput={(params) => (
          <>
            <TextField
              {...(formik?.getFieldProps(name) ?? null)}
              {...params}
              size="small"
              placeholder="Select city"
              inputProps={{
                ...params.inputProps,
                style: {},
                autoComplete: "new-password",
              }}
              InputProps={{
                ...params.InputProps,
                style: {},
              }}
              helperText={errors ? errorText : ""}
              error={errors}
              inputRef={inputRef}
              onBlur={onBlurOverride || params.inputProps.onBlur}
            />
          </>
        )}
      />
    </>
  );
};

export default CitiesStates;
