import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { countriesList as countries } from "@/utils/countriesphp";
import companydetail from "components/CompanySettings/CompanyDetail/companydetail.module.css";
import Image from "next/image";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { useRouter } from "next/router";

interface CountryTypeCheck {
  setCountry: (label: string) => void;
  setSelectedCountry: (label: string) => void;
  mode: string;
  size?: "small" | "medium";
  label?: string;
  error: boolean;
  errorText: string;
  styleProps: any;
  name: string;
  formik: any;
  country: any;
  type: any;
  disableClearable: any;
  disableScroll?: any;
  disableField?: boolean;
  onBlurOverride?: () => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const CompanyFacilitiesDropdown = (props) => {
  const {
    name = "",
    formik = null,
    country,
    setCountry,
    mode = "edit",
    size,
    label,
    error,
    errorText,
    styleProps,
    disableClearable,
    disableScroll,
    disableField,
    inputRef = null,
    setSelectedCountry,
    onBlurOverride = null,
  }: CountryTypeCheck = props;
  const [countryLabel, setLabel] = useState<String>("");
  const router = useRouter();
  
  useEffect(() => {
    if (country || country !== "IN") {
      try {
        let { name } = countries.find((v) => v.code == country);
        setLabel(name);
      } catch (err) {
        setLabel("");
      }
    } else {
      setLabel("");
    }
    setSelectedCountry(country);
  }, [country]);
  const isCountryLabelEmpty = !countryLabel || countryLabel === "";
  const [openDropdown, setOpenDropdown] = useState(false);
  const sortedcountries = [...countries].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return (
    <>
      <Autocomplete
        disabled={disableField}
        readOnly={mode === "view"}
        freeSolo={mode === "view"}
        id="country-select-demo"
        open={openDropdown}
        onOpen={() => {
          setOpenDropdown(true);
          if (disableScroll) disableScroll(true);
        }}
        onClose={() => {
          setOpenDropdown(false);
          if (disableScroll) disableScroll(false);
        }}
        sx={{ width: "100%", ...styleProps }}
        options={sortedcountries}
        disableClearable={disableClearable}
        value={sortedcountries.find(
          (v) => v.code == (country == "" || country == null ? "" : country)
        )}
        popupIcon={
          props?.type == "crm" ? (
            <KeyboardArrowDownOutlinedIcon />
          ) : (
            <ArrowDropDownIcon />
          )
        }
        autoHighlight
        getOptionLabel={(option: any) => option?.name}
        filterOptions={(options, { inputValue }) =>
          options.filter((option) =>
            option.name.toLowerCase().startsWith(inputValue.toLowerCase())
          )
        }
        onChange={(event, newValue: any) => {
          setCountry(newValue?.code ?? "");
          console.log("newValue", newValue);
          
        }}
        slotProps={{
          popper: {
            sx: {
              zIndex: props?.type === "crm" ? 1300 : 98,
            },
          },
        }}
        ListboxProps={{
          sx: {
            maxHeight: `${
              router?.asPath?.includes("/productdetail") ? "100px" : "122px"
            }`,
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
            <Image
              className={companydetail.country_img}
              loading="lazy"
              width={20}
              height={14}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              alt="country"
            />
            {option.name} ({option.code})
          </Box>
        )}
        renderInput={(params) => {
          const { inputProps }: any = params;
          return (
            <>
              <TextField
                disabled={disableField}
                {...(formik?.getFieldProps(name) ?? null)}
                {...params}
                helperText={error ? errorText : ""}
                error={error}
                inputRef={inputRef}
                onBlur={onBlurOverride || params.inputProps.onBlur}
                autoComplete="new-passsword"
                label={label}
                InputLabelProps={{
                  style: {
                    fontSize: 14,
                    fontWeight: props?.type == "crm" ? "normal" : 700,
                  },
                }}
                placeholder={
                  name == "factory"
                    ? ""
                    : isCountryLabelEmpty
                    ? "Select country"
                    : ""
                }
                size={size || "small"}
                variant={mode === "view" ? "standard" : "outlined"}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "off",
                  // readOnly: true,
                }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: country ? (
                    <Image
                      className={companydetail.country_img}
                      loading="lazy"
                      width={20}
                      height={14}
                      src={`https://flagcdn.com/w20/${country.toLowerCase()}.png`}
                      alt="country"
                      style={{
                        marginRight: 5,
                      }}
                    />
                  ) : null,
                  disableUnderline: mode === "view",
                }}
              />
            </>
          );
        }}
      />
    </>
  );
};

export default CompanyFacilitiesDropdown;
