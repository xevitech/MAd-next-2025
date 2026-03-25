import React, { useEffect } from "react";
import { SelectFormButton, SelectFormData, SelectPopOverOuter } from "./style";
import {
  FormControl,
  InputLabel,
  MenuItem,
  styled,
  Typography,
} from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { languages } from "@/utils/languages";
import { defaultCurrencyAndLanguageHeader } from "../header/headerStaticValues";
import { useRouter } from "next/router";

function CurrencylanguageData(props) {
  const { setAnchorMenuMessage, closeDrawerFunction } = props;

  const router = useRouter();
  const currentQuery = router.query;

  const [selectedData, setSelectedData] = React.useState({
    language: null,
    currency: null,
  });

  useEffect(() => {
    const isLocalStorageHaveData = JSON.parse(
      localStorage.getItem("currency_language")
    );
    if (isLocalStorageHaveData) setSelectedData(isLocalStorageHaveData);
  }, []);

  const handleChangeLanguage = (event: SelectChangeEvent) => {
    setSelectedData((prev) => ({
      ...prev,
      language: event.target.value as string,
    }));
  };
  const handleChangeCurrency = (event: SelectChangeEvent) => {
    setSelectedData((prev) => ({
      ...prev,
      currency: event.target.value as string,
    }));
  };

  const handleSave = () => {
    localStorage.setItem(
      "currency_language",
      JSON.stringify({
        currency:
          selectedData?.currency ?? defaultCurrencyAndLanguageHeader?.currency,
        language:
          selectedData?.language ?? defaultCurrencyAndLanguageHeader?.language,
      })
    );
    let currencyValue =
      selectedData?.currency ?? defaultCurrencyAndLanguageHeader?.currency;
    const currencyId = currencyValue.includes("-")
      ? currencyValue.split("-")[0]
      : 1;
    localStorage.setItem("currency", currencyId);
    closeDrawerFunction && closeDrawerFunction(false);
    // const updatedQuery = { ...currentQuery, currency: selectedData?.currency };
    // router
    //   .replace({
    //     pathname: router.pathname,
    //     query: updatedQuery,
    //   })
    //   .then(() => window.location.reload());
    window.location.reload()
  };
  return (
    <div
      onMouseLeave={() => {
        setAnchorMenuMessage(null);
      }}
    >
      <SelectPopOverOuter>
        <Typography variant="h4">Set language and currency</Typography>
        <Typography variant="body2">
          Select your preferred language and currency. You can update the
          settings at any time.
        </Typography>
        <SelectFormData>
          <FormControl fullWidth>
            <InputLabel shrink id="demo-simple-select-label">
              Language
            </InputLabel>
            <Select
              IconComponent={KeyboardArrowDownOutlinedIcon}
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedData?.language}
              label="Language"
              onChange={handleChangeLanguage}
            >
              <MenuItem className="popover_options" value="Hindi">
                Hindi
              </MenuItem>
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Spanish">Spanish</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel shrink id="demo-simple-select-label">
              Currency
            </InputLabel>
            <Select
              size="small"
              IconComponent={KeyboardArrowDownOutlinedIcon}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedData?.currency}
              label="Language"
              onChange={handleChangeCurrency}
            >
              <MenuItem className="popover_options" value={"1-USD"}>
                USD- US Dollar
              </MenuItem>
              <MenuItem value={"9-EUR"}>EUR- Euro</MenuItem>
              <MenuItem value={"13-JPY"}>JPY- Japanese Yen</MenuItem>
              <MenuItem value={"3-GBP"}>GBP- British pound sterling</MenuItem>
              <MenuItem value={"0-JOD"}>JOD- Jordan</MenuItem>
            </Select>
          </FormControl>
          <SelectFormButton fullWidth variant="contained" onClick={handleSave}>
            Save
          </SelectFormButton>
        </SelectFormData>
      </SelectPopOverOuter>
    </div>
  );
}

export default CurrencylanguageData;
