import React from "react";
import { Autocomplete } from "@mui/lab";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { countriesList } from "@/utils/countriesphp";
import { CountriesWithStateList } from "@/utils/countriesWithStateList";

const CountryStates = ({
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
        options={CountriesWithStateList?.[countryName] ?? []}
        defaultValue={city}
        value={city}
        placeholder="Select State"
        autoHighlight
        disableClearable={true}  
        autoComplete={false}
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
                  autoComplete: "new-password"
                }}
                InputProps={{
                  ...params.InputProps,
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

export default CountryStates;
