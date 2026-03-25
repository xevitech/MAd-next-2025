import React from "react";
import { LargeTextContainer, SmallTextContainer } from "./style";
import Image from "next/image";
import companydetail from "../../CompanySettings/CompanyDetail/companydetail.module.css";

const EmptyPage = ({
  logo,
  text,
  onClickHandler = null,
  actiontext = true,
  detailClass = null,
  type = "other",
  company = false,
}) => {
  return (
    <>
      {type == "other" ? (
        <div
          className={`${companydetail.empty_data} ${detailClass}`}
          style={{ minHeight: company ? "372px" : "300px" }}
        >
          <div
            style={{ textAlign: "center", padding: "9px 15px", width: "100%" }}
            className="social_empty"
          >
            {logo ? (
              <Image
                src={logo}
                width={80}
                height={80}
                alt="logo"
                style={{ objectFit: "contain" }}
              />
            ) : (
              <Image
                src={"/assets/group_social_icons.svg"}
                height={80}
                width={80}
                alt="logo"
              />
            )}
            {text && actiontext ? (
              <SmallTextContainer>
                You have not managed any {text} yet.
              </SmallTextContainer>
            ) : (
              <SmallTextContainer>
                <span style={{ fontWeight: "bold" }}>No {text} added.</span>
              </SmallTextContainer>
            )}

            {actiontext && (
              <SmallTextContainer
                value={{ cursor: "pointer", color: "#D7282F" }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClickHandler();
                }}
              >
                Click here to add {text}
              </SmallTextContainer>
            )}
          </div>
        </div>
      ) : type == "review" ? (
        <div className={`${companydetail.empty_data} ${detailClass}`}>
          <div
            style={{ textAlign: "center", padding: "9px 15px", width: "100%" }}
            className="social_empty"
          >
            {logo ? (
              <Image src={logo} width={80} height={80} alt="logo" />
            ) : (
              <Image
                src={"/assets/review.svg"}
                height={80}
                width={80}
                alt="logo"
              />
            )}
            <LargeTextContainer>No {text} Found</LargeTextContainer>
          </div>
        </div>
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
            <LargeTextContainer>No {text} Found</LargeTextContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default EmptyPage;
