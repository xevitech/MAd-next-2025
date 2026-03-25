import React, { useEffect, useState } from "react";
import { styled } from "@mui/material";
import { countries } from "@/utils/countries";
// import { countriesList as countries } from "@/utils/countriesphp";
const Img = styled("img")({});

export const Flag = ({ countryCode }) => {
  const [country, setCountry] = useState<any>("");

  useEffect(() => {
    const CodeCountry = countries.find((item) => item.code == countryCode);
    if (CodeCountry == undefined) {
      const data = countries.find((item) => item.name == countryCode);
      setCountry(data?.code);
    } else {
      setCountry(CodeCountry?.code);
    }
  }, [countryCode]);

  return (
    <Img
      style={{ marginRight: "5px" }}
      loading="lazy"
      width="20"
      src={`https://flagcdn.com/w20/${country?.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w40/${country?.toLowerCase()}.png 2x`}
      alt="flag"
    />
  );
};
