import React from "react";
import { CountriesWithCitiesObject } from "@/utils/countriesWithCitiesList";
import { Autocomplete } from "@mui/lab";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { countriesList } from "@/utils/countriesphp";

const CountryCities = ({
  country = "",
  city = "",
  setCity,
  styleProps = {},
  name = "",
  formik = null,
  errors = false,
  errorText = "",
}) => {
  const countryName = countriesList.find((v) => v.code == country)?.name ?? "";

  return (
    <>
      <Autocomplete
        id="city-select-demo"
        size="small"
        sx={{ width: "100%", ...styleProps }}
        options={CountriesWithCitiesObject?.[countryName] ?? []}
        defaultValue={city}
        value={city}
        placeholder="Select City"
        autoHighlight
        disableClearable={true}  
        autoComplete={false}
        slotProps={{
          popper: {
            sx: {
              zIndex: 10

            }
          }
        }}
        getOptionLabel={(option: string) => option}
        onChange={(event: any, newValue: string) => setCity(newValue)}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {option}
          </Box>
        )}
        renderInput={(params) => {
          const { inputProps } = params;
          if (city || city !== "") inputProps.value = city;
          return (
            <>
              <TextField
                {...(formik?.getFieldProps(name) ?? null)}
                {...params}
                size="small"
                placeholder="Select City"
                inputProps={{
                  ...params.inputProps,
                  style: {
                  },
                  autoComplete: "new-password"
                }}
                InputProps={{
                  ...params.InputProps,
                  style: {
                  },
                }}
                onChange={(e) => setCity(e.target.value)}
                helperText={errors ? errorText : ""}
                error={errors}
              />
            </>
          );
        }}
      />
    </>
  );
};

export default CountryCities;
