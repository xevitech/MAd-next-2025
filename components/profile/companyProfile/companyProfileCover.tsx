import ImageCropper from "@/components/common/ImageCropper";
import React, { useEffect, useState } from "react";
import {
  CompanyName,
  CompanyNameContainer,
  CoverImage,
  Edit,
  FloatingEditIconCompanyName,
  Logo,
  LogoContainer,
  PencilIconCompanyName,
} from "./styles";
import Image from "next/image";
import { Skeleton, Tooltip } from "@mui/material";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";

const CompanyProfileCover: any = ({
  companyDetails,
  DeleteImage,
  breakPoints,
  role,
  editModal,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogoClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [loader, setLoader] = useState(false);
  useEffect(() => {
    if (companyDetails?.contact_profile?.name) {
      setLoader(false);
    } else {
      setLoader(true);
    }
  }, [companyDetails]);
  return (
    <>
      <LogoContainer>
        <CoverImage
          src={
            companyDetails?.contact_profile?.profile_banner ||
            "/assets/default/defaultCompanyBanner.svg"
          }
        />

        <div className="CoverLogo">
          <ImageCropper
            deleteImages={DeleteImage}
            type={"banner"}
            endPoints={"company_profile/updateProfile"}
            params={"profile_banner"}
            defaultImage={companyDetails?.contact_profile?.profile_banner}
          />
        </div>
        <div className="CircleLogo">
          <Logo
            breakPoints={breakPoints}
            src={
              companyDetails?.contact_profile?.profile_image ||
              "/assets/default/defaultCompanyImage.png"
            }
            onClick={
              companyDetails?.contact_profile?.profile_image
                ? handleLogoClick
                : undefined
            }
            style={{
              cursor: companyDetails?.contact_profile?.profile_image
                ? "pointer"
                : "default",
            }}
          />

          <ImageCropper
            deleteImages={DeleteImage}
            type={"profile"}
            endPoints={"company_profile/updateProfile"}
            params={"profile_image"}
            defaultImage={companyDetails?.contact_profile?.profile_image}
          />
        </div>
      </LogoContainer>
      {modalOpen && (
        <div className="personalmodal" onClick={handleCloseModal}>
          <div
            className="personalmodal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={
                companyDetails?.contact_profile?.profile_image ||
                "/assets/default/defaultCompanyImage.png"
              }
              alt="Profile"
            />
          </div>
        </div>
      )}
      <CompanyNameContainer>
        <div>
          {loader === true ? (
            <Skeleton
              animation="wave"
              variant="text"
              width={120}
              sx={{ margin: "0 0 23px 0" }}
            />
          ) : (
            <>
              <LightTooltip
                arrow
                disableInteractive
                placement="top"
                title={companyDetails?.contact_profile?.name}
              >
                <CompanyName
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {companyDetails?.contact_profile?.name}
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: "13px",
                      lineHeight: "18px",
                      color: "#D7282F",
                    }}
                  >
                    {companyDetails?.contact_profile?.phone_verified === "1" &&
                      companyDetails?.contact_profile?.email_verified ===
                        "1" && (
                        <Tooltip title="Verified" placement="top" arrow>
                          <span>
                            <Image
                              style={{ margin: "0px 0 -6px 4px" }}
                              src={"/assets/premium-user1.svg"}
                              alt="verified-img"
                              width={25}
                              height={25}
                            />
                          </span>
                        </Tooltip>
                      )}
                    {companyDetails?.basic_information?.is_company_approved && (
                      <Tooltip title="Verified" placement="top" arrow>
                        <span>
                          <Image
                            style={{ margin: "0px 0 -6px 4px" }}
                            src={"/assets/Approved.svg"}
                            alt="verified-img"
                            width={30}
                            height={30}
                          />
                        </span>
                      </Tooltip>
                    )}
                    {companyDetails?.newLicence?.rejection_comment !== null &&
                      companyDetails?.newLicence?.rejection_comment !== "" && (
                        <Tooltip title="Verified" placement="top" arrow>
                          <span>
                            <Image
                              style={{ margin: "0px 0 -6px 4px" }}
                              src={"/assets/Rejected.svg"}
                              alt="verified-img"
                              width={30}
                              height={30}
                            />
                          </span>
                        </Tooltip>
                      )}
                  </span>
                </CompanyName>
              </LightTooltip>
            </>
          )}
        </div>
        <FloatingEditIconCompanyName
          onClick={() => {
            editModal();
          }}
        >
          <PencilIconCompanyName>
            {" "}
            <Image
              src={"/assets/EditPencil.svg"}
              layout="fill"
              alt="edit-img"
            />
          </PencilIconCompanyName>
          <Edit>Edit</Edit>
        </FloatingEditIconCompanyName>
      </CompanyNameContainer>
    </>
  );
};

export default CompanyProfileCover;
