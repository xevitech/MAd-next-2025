import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { countriesList as countries } from "@/utils/countriesphp";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { CountriesWithStateList } from "@/utils/countriesWithStateList";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
interface CountryTypeCheck {
  setStateData: (label: string) => void;
  mode: string;
  size?: "small" | "medium";
  label?: string;
  error: boolean;
  errorText: string;
  styleProps: any;
  name: string;
  formik: any;
  country: any;
  value: any;
  usedOn: any;
  disableClearable: any;
  disableScroll?: any;
  onBlurOverride?: () => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  placeholderValue?: string;
}

const StateSelect = (props) => {
  const {
    name = "",
    formik = null,
    country,
    setStateData,
    mode = "edit",
    size,
    label,
    error,
    errorText,
    styleProps,
    value,
    usedOn,
    disableClearable,
    disableScroll,
    inputRef = null,
    onBlurOverride = null,
    placeholderValue = null,
  }: CountryTypeCheck = props;
  const [countryLabel, setLabel] = useState<String>("");
  useEffect(() => {
    if (country || country !== "") {
      try {
        let { name } = countries.find((v) => v.code == country);
        setLabel(name);
      } catch (err) {
        setLabel("");
      }
    } else {
      setLabel("");
    }
  }, [country]);

  return (
    <>
      <Autocomplete
        readOnly={mode === "view" ? true : false}
        freeSolo={mode === "view" ? true : false}
        id="country-select-demo"
        sx={{ width: "100%", ...styleProps }}
        onOpen={() => {
          if (disableScroll) disableScroll(true);
        }}
        onClose={() => {
          if (disableScroll) disableScroll(false);
        }}
        options={
          CountriesWithStateList?.[`${countryLabel}`]
            ? CountriesWithStateList?.[`${countryLabel}`]
            : [`${countryLabel}`]
        }
        value={value ? value : null}
        popupIcon={
          props?.type == "crm" ? (
            <KeyboardArrowDownOutlinedIcon />
          ) : (
            <ArrowDropDownIcon />
          )
        }
        autoHighlight
        disableClearable={disableClearable}
        getOptionLabel={(option: any) => option}
        onChange={(event, newValue: any) => {
          setStateData(newValue ?? "");
        }}
        slotProps={{
          popper: {
            sx: {
              zIndex: usedOn == "CRM" ? "none" : 10,
            },
          },
        }}
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
          return (
            <>
              <TextField
                {...(formik?.getFieldProps(name) ?? null)}
                {...params}
                helperText={error ? errorText : ""}
                error={error}
                inputRef={inputRef}
                autoComplete="new-passsword"
                label={label}
                placeholder={placeholderValue ?? "Select region/state/province"}
                size={size || "small"}
                variant={mode === "view" ? "standard" : "outlined"}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "off",
                }}
                InputLabelProps={{
                  shrink: true
                }}
                onBlur={onBlurOverride || params.inputProps.onBlur}
              />
            </>
          );
        }}
      />
    </>
  );
};

export default StateSelect;
