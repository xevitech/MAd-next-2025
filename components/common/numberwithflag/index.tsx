import Image from "next/image";
import React from "react";
import { countryDetail } from "../common";
import { Typography } from "@mui/material";
import { LightTooltip } from "../Tooltip/tooltip";

const MobileWithFlag: any = ({
  mobile_code = "",
  number = "",
  country_code = "",
  componentType,
}) => {
  let mobile_number = mobile_code?.includes("+")
    ? `${mobile_code} ${number}`
    : `+${mobile_code} ${number}`;

  return (
    <div>
      {componentType == "company" || componentType == "personal-profile" ? (
        <LightTooltip
          title={mobile_number}
          placement="top"
          arrow
          disableInteractive
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              loading="lazy"
              width={20}
              height={13}
              src={`https://flagcdn.com/w20/${
                country_code
                  ? country_code?.toLowerCase()
                  : countryDetail({
                      key: "code",
                      mobile_code,
                    })?.toLowerCase()
              }.png`}
              alt="flag"
            />
            <Typography
              sx={{ fontSize: "14px", color: "#231f20", marginLeft: "8px",whiteSpace:'nowrap' }}
            >
              {mobile_number}
            </Typography>
          </div>
        </LightTooltip>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            loading="lazy"
            width={20}
            height={13}
            src={`https://flagcdn.com/w20/${
              country_code
                ? country_code?.toLowerCase()
                : countryDetail({
                    key: "code",
                    mobile_code,
                  })?.toLowerCase()
            }.png`}
            alt="flag"
          />
          <Typography
            sx={{ fontSize: "14px !important", color: "#231f20", marginLeft: "8px",whiteSpace:'nowrap' }}
          >
            {mobile_number}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default MobileWithFlag;
