import React from "react";
import { LargeTextContainer, SmallTextContainer } from "./styles";
import Image from "next/image";
import companydetail from "../../CompanySettings/CompanyDetail/companydetail.module.css";
import { Box } from "@mui/material";

const EmptyPage = ({
  logo,
  text = "",
  onClickHandler = null,
  actiontext = true,
  detailClass = null,
  type = "other",
  customMessage = null,
  usertype = "",
  customeTitle = "",
  customdescription = "",
  companyTour = "",
}) => {
  return (
    <>
      {type == "other" ? (
        <Box
          className={`${companydetail.empty_data} ${detailClass}`}
          // sx={{ minHeight: companyTour ? "232px" : undefined  }}
        >
          <div
            style={{ textAlign: "center", padding: "9px 15px", width: "100%" }}
            className="social_empty"
          >
            {logo ? (
              <Image src={logo} width={80} height={80} alt="logo" />
            ) : (
              <Image
                src={"/assets/group_social_icons.svg"}
                height={80}
                width={80}
                alt="logo"
              />
            )}
            {customMessage ? (
              <>
                <LargeTextContainer>
                  {customMessage?.boldText}
                </LargeTextContainer>
                <SmallTextContainer>
                  {customMessage?.smallText}
                </SmallTextContainer>
              </>
            ) : (
              <>
                <LargeTextContainer>
                  {customeTitle === ""
                    ? usertype !== "buyer"
                      ? `No ${text == "Activities" ? text : `${text} Added`}`
                      : `No viewed ${text}`
                    : customeTitle}
                  <SmallTextContainer>
                    {customdescription === ""
                      ? usertype !== "buyer"
                        ? ` You have not managed any ${text} yet.`
                        : `You haven’t viewed any ${text} yet.`
                      : customdescription}
                  </SmallTextContainer>
                </LargeTextContainer>
              </>
            )}

            {actiontext && (
              <SmallTextContainer
                value={{ cursor: "pointer", color: "#D7282F" }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClickHandler();
                }}
              >
                {/* Click here to add {text} */}
                {usertype !== "buyer" ? `Click here to add ${text}` : ""}
              </SmallTextContainer>
            )}
          </div>
        </Box>
      ) : (
        <div className={`${companydetail.empty_data} ${detailClass}`}>
          <div
            style={{ textAlign: "center", padding: "9px 15px", width: "100%" }}
            className="social_empty"
          >
            {logo ? (
              <Image src={logo} width={80} height={80} alt="logo" />
            ) : (
              <Image
                src={"/assets/group_social_icons.svg"}
                height={80}
                width={80}
                alt="logo"
              />
            )}
            <LargeTextContainer>
              {type === "visited" ? `No ${text}` : `No ${text} Found`}
            </LargeTextContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default EmptyPage;
