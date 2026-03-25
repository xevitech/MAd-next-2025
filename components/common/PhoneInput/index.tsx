import { useEffect, useState } from "react";
import { MobileCodes } from "./MobileCodesList";
import { useSelector } from "react-redux";
import { PhoneNumberUtil } from "google-libphonenumber";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from "react-international-phone";
import "react-international-phone/style.css";
import {
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { LightTooltip } from "../Tooltip/tooltip";
import Image from "next/image";

export default function MobileInputCommon(props) {
  const {
    handleChange,
    mobileNumber,
    mobileCode,
    countryCode,
    helperText,
    inputRef,
    survey,
    showtooltip = false,
    // handleKeys,
    contactpersonPHN,
  } = props;
  const router = useRouter();
  const defaultCountryCode =
    JSON.parse(localStorage.getItem("country_code"))?.country_code || "IN";
  const phoneUtil = PhoneNumberUtil.getInstance();

  const isPhoneValid = (phone: any) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return false;
    }
  };
  const isGuernseyAdded = defaultCountries.some(country => country[1] === 'gg');

// If Guernsey is not already in the list, add it
if (!isGuernseyAdded) {
  defaultCountries.push(["Guernsey", "gg", "44", ""]);  // Add Guernsey (with an empty string as FormatConfig)
}

// Now pass the updated list into the usePhoneInput hook
// const extendedCountries = defaultCountries;

const sortedCountries = defaultCountries.sort((a, b) => {
  const countryA = a[0].toUpperCase();  // Country name of 'a'
  const countryB = b[0].toUpperCase();  // Country name of 'b'
  if (countryA < countryB) {
    return -1;  // 'a' comes first
  }
  if (countryA > countryB) {
    return 1;  // 'b' comes first
  }
  return 0;  // Names are the same
});

// Now pass the sorted list into the usePhoneInput hook
const extendedCountries = sortedCountries;
  const MobileNumberHandler = ({
    phone,
    mobile_code,
    country_code,
    phoneNumber,
  }) => {
    const isValid = isPhoneValid(phoneNumber);
    handleChange(phone, mobile_code, country_code, isValid);
  };
  const [phoneNumber, setPhoneNumber] = useState<any>("");
  const [componentMount, setComponentMount] = useState<any>(false);

  useEffect(() => {
    if (!componentMount && mobileNumber && phoneNumber === "") {
      setPhoneNumber(`+${mobileCode}${mobileNumber}`);
      setComponentMount(true);
    }
  }, [componentMount, phoneNumber, mobileNumber, mobileCode]);

  let localCountryCode =
    countryCode !== ""
      ? countryCode
      : mobileCode
        ? MobileCodes?.find((v) => v.dial_code == `+${mobileCode}`)?.code
        : null;

  const { inputValue, handlePhoneValueChange, country, setCountry } =
    usePhoneInput({
      defaultCountry: localCountryCode
        ? localCountryCode?.toLowerCase()
        : defaultCountryCode?.toLowerCase(),
      value: `${phoneNumber}`,
      countries: extendedCountries,
      forceDialCode: true,
      onChange: (data) => {
        const { phone, country } = data;
        let number = phone?.replace(`+${country.dialCode}`, "");
        MobileNumberHandler({
          phone: number,
          mobile_code: country.dialCode,
          country_code: country.iso2.toUpperCase(),
          phoneNumber: phone,
        });
      },
    });

  return (
    <>
      <TextField
        error={helperText ? true : false}
        helperText={helperText}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: survey ? "transparent !important" : "",
          },
          "@media screen and (max-width:900px)": {
            width: survey ? "100%" : "100%",
          },
        }}
        size={survey ? "medium" : "small"}
        // size={survey ? "medium" : "small"}
        variant="outlined"
        label={
          props?.module == "crm"
            ? props?.label?.replaceAll(".", "")
            : props.label
        }
        InputLabelProps={{ style: { fontSize: 14, fontWeight: 700 } }}
        color="primary"
        placeholder="Phone number"
        value={inputValue}
        // onKeyDown={handleKeys ? (e) => handleKeys(e) : undefined}
        onChange={handlePhoneValueChange}
        type="tel"
        inputRef={inputRef}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              style={{ marginRight: "2px", marginLeft: "-8px" }}
            >
              <Select className={props?.module == "crm" && "withArrowMobileFlag"}
                inputProps={{ className: "custom-select-input" }}
                IconComponent={props?.module == "crm" ? KeyboardArrowDownOutlinedIcon : undefined}
                MenuProps={{
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left",
                  },
                  PaperProps: {
                    sx: {
                      maxHeight: `${router?.asPath?.includes("/productdetail")
                        ? "108px"
                        : "200px"
                        }`,
                      margin: contactpersonPHN ? "0 0 0 -10px" : "0 0 0 -30px",
                      "@media screen and (max-width:380px)": {
                        margin: "0",
                        width: "100%",
                      },
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
                  },
                }}
                sx={{
                  width: "max-content",
                  fieldset: {
                    display: "none",
                  },
                  '&.Mui-focused:has(div[aria-expanded="false"])': {
                    fieldset: {
                      display: "block",
                    },
                  },
                  ".MuiSelect-select": {
                    padding: "8px",
                    paddingRight: "24px !important",
                  },
                  svg: {
                    right: 0,
                    // height: "28px !important",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "0 !important",
                  },
                }}
                value={country.iso2}
                onChange={(e) => {
                  console.log(e.target.value, "e.target.value");
                  setCountry(e.target.value);
                }}
                renderValue={(value) => {
                  if (value === "hn") {
                    return (
                      <Image
                        // className={companydetail.country_img}
                        loading="lazy"
                        width={22}
                        height={18}
                        src={`https://flagcdn.com/w20/${value.toLowerCase()}.png`}
                        alt="country"
                        style={{
                          display: "flex",
                          borderRadius: "2px",
                          marginTop: "2px",
                          // marginRight: 5,
                        }}
                      />
                    );
                  }
                  return <FlagImage iso2={value} style={{ display: "flex" }} />;
                }}
              >
                {extendedCountries.map((c) => {
                  const country = parseCountry(c);
                  return (
                    <MenuItem key={country.iso2} value={country.iso2}>
                      {country?.iso2 !== "hn" ? (
                        <FlagImage
                          iso2={country.iso2}
                          style={{ marginRight: "8px" }}
                        />
                      ) : (
                        <Image
                          // className={companydetail.country_img}
                          loading="lazy"
                          width={23}
                          height={19}
                          src={`https://flagcdn.com/w20/${country?.iso2.toLowerCase()}.png`}
                          alt="country"
                          style={{
                            display: "flex",
                            borderRadius: "2px",
                            // marginTop:'2px'
                            marginRight: 10,
                          }}
                        />
                      )}
                      <Typography
                        marginRight="8px"
                        sx={{
                          fontSize: "13px",
                          color: "#231f20",
                          fontWeight: "400",
                        }}
                      >
                        {country.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          color: "#808080",
                          fontWeight: "400",
                        }}
                      >
                        +{country.dialCode}
                      </Typography>
                    </MenuItem>
                  );
                })}
              </Select>
            </InputAdornment>
          ),
          endAdornment: showtooltip ? (
            <>
              <LightTooltip
                arrow
                disableInteractive
                placement="top-start"
                title="The contact phone is for contact only, it is not the phone to receive the verification code."
              >
                <InfoOutlinedIcon
                  sx={{ fontSize: "18px", color: "rgba(0, 0, 0, 0.54)" }}
                />
              </LightTooltip>
            </>
          ) : (
            ""
          ),
        }}
      />
    </>
  );
}
