import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import {
  CertificateHeadText,
  CustomeChip,
  ImageGridItem,
  MoreAboutUsButton,
  MoreText,
  Smalldescription,
  ViewMoreLessBox,
  ViewMoreLessText,
} from "./styled";
import router from "next/router";
import { useSelector } from "react-redux";
import { countries } from "@/utils/countries";
import HeaderStripBuisness from "../common/header/HeaderStripBuisness";
import SelectTemplate from "./MenuTemplates/SelectTemplate";

export default function MiniAbout() {
  const { productData, userInfo, headerLoading } = useSelector(
    (state: any) => state.miniSite
  );
  const [checked, setChecked] = React.useState(false);

  const handleChangeCollapse = () => {
    setChecked((prev) => !prev);
  };
  const [showFullContent, setShowFullContent] = useState(false);

  const handleViewMore = () => {
    setShowFullContent(true);
  };

  const handleViewLess = () => {
    setShowFullContent(false);
  };

  const content = userInfo?.contact_profile?.description;
  const [viewMore, setViewMore] = useState<boolean>(false);
  return (
    <Box>
      {headerLoading ? (
        <Typography>Loading ...</Typography>
      ) : (
        <Grid
          borderRadius={{ xs: "6px" }}
          overflow="hidden"
          container
          mt={2.5}
          direction={{ md: "row", xs: "column" }}
        >
          <Grid item xs={8} direction={{ sm: "column" }}>
            <Box p={{ xs: 1, sm: 2, md: 2.5 }}>
              <Stack
                mb={{ xs: 1, sm: 1 }}
                direction={{ xs: "row" }}
                justifyContent="start"
                alignItems="center"
                sx={{
                  paddingBottom: "8px",
                  borderBottom: "1px solid rgba(34, 51, 84, .1)",
                }}
              >
                <CustomeChip component="span">
                  <Image
                    width={24}
                    height={24}
                    src="/assets/docIcon.svg"
                    alt="icon"
                  />
                </CustomeChip>
                <CertificateHeadText variant="h4">
                  About Our Company{" "}
                </CertificateHeadText>
              </Stack>
              <Box mb={{ xs: 2, sm: 2, md: 2 }}>
                <ViewMoreLessBox>
                  <p
                    style={{
                      lineHeight: "160.9%",
                      alignItems: "center",
                      paddingTop: "8px",
                      flexDirection: "column",
                      overflow: "hidden",
                      fontSize: "14px",
                    }}
                  >
                    {viewMore ? (
                      <>
                        {content.length > 0 && (
                          <p
                            contentEditable="false"
                            dangerouslySetInnerHTML={{
                              __html: content.replaceAll(/\n/g, "<br />"),
                            }}
                          ></p>
                        )}{" "}
                      </>
                    ) : (
                      <>
                        {content?.length > 0 && (
                          <p
                            contentEditable="false"
                            dangerouslySetInnerHTML={{
                              __html: content?.slice(0, 470) + "...",
                            }}
                          ></p>
                        )}
                      </>
                    )}
                    <ViewMoreLessText
                      onClick={() => {
                        router.push({
                          pathname: `/mini-site/${router?.query?.id[0]}/companyprofile`,
                        });
                      }}
                    ></ViewMoreLessText>
                  </p>
                </ViewMoreLessBox>
              </Box>

              <Grid container spacing={2.5}>
                <Grid item xs={6} md={6} lg={4}>
                  <Box borderLeft="1px solid GrayText" pb={3}>
                    <Box>
                      <MoreText
                        style={{
                          marginBottom: "5px",
                          borderLeft: "3px solid rgba(215, 40, 47, 1)",
                          paddingLeft: "16px",
                        }}
                      >
                        Business Type
                      </MoreText>
                      <Smalldescription
                        style={{ fontSize: "12px", paddingLeft: "16px" }}
                        variant="body2"
                        fontSize={{ xs: 12 }}
                        color="black"
                      >
                        <HeaderStripBuisness />
                      </Smalldescription>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} md={6} lg={4}>
                  <Box borderLeft="1px solid GrayText" pb={3}>
                    <Box>
                      <MoreText
                        style={{
                          marginBottom: "5px",
                          borderLeft: "3px solid rgba(215, 40, 47, 1)",
                          paddingLeft: "16px",
                        }}
                      >
                        Product Category
                      </MoreText>
                      <Smalldescription
                        style={{ fontSize: "12px", paddingLeft: "16px" }}
                        variant="body2"
                        fontSize={{ xs: 12 }}
                        color="black"
                      >
                        {userInfo?.basic_information?.category_id.length > 0 ? (
                          <Typography component="span">
                            {userInfo?.basic_information?.category_id?.join(
                              ", "
                            )}
                          </Typography>
                        ) : (
                          "---"
                        )}
                      </Smalldescription>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} md={6} lg={4}>
                  <Box borderLeft="1px solid GrayText" pb={3}>
                    <Box>
                      <MoreText
                        style={{
                          marginBottom: "5px",
                          borderLeft: "3px solid rgba(215, 40, 47, 1)",
                          paddingLeft: "16px",
                        }}
                      >
                        Annual Export Rate
                      </MoreText>
                      <Smalldescription
                        style={{ fontSize: "12px", paddingLeft: "16px" }}
                        variant="body2"
                        fontSize={{ xs: 12 }}
                        color="black"
                      >
                        {userInfo?.basic_information?.yearly_revenue
                          ? userInfo?.basic_information?.yearly_revenue
                          : "---"}
                      </Smalldescription>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} md={6} lg={4}>
                  <Box borderLeft="1px solid GrayText" pb={3}>
                    <Box>
                      <MoreText
                        style={{
                          marginBottom: "5px",
                          borderLeft: "3px solid rgba(215, 40, 47, 1)",
                          paddingLeft: "16px",
                        }}
                      >
                        Country / Region
                      </MoreText>
                      <Smalldescription
                        style={{ fontSize: "12px", paddingLeft: "16px" }}
                        variant="body2"
                        fontSize={{ xs: 12 }}
                        color="black"
                      >
                        {userInfo?.company_operational_address?.country_id
                          ? countries
                              .filter(
                                (country) =>
                                  country.code ==
                                  userInfo?.company_operational_address
                                    ?.country_id
                              )
                              .map((item) => item.name)
                          : "---"}
                      </Smalldescription>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} md={6} lg={4}>
                  <Box borderLeft="1px solid GrayText" pb={3}>
                    <Box>
                      <MoreText
                        style={{
                          marginBottom: "5px",
                          borderLeft: "3px solid rgba(215, 40, 47, 1)",
                          paddingLeft: "16px",
                        }}
                      >
                        Year Established
                      </MoreText>
                      <Smalldescription
                        style={{ fontSize: "12px", paddingLeft: "16px" }}
                        variant="body2"
                        fontSize={{ xs: 12 }}
                        color="black"
                      >
                        {userInfo?.basic_information?.registration_year
                          ? userInfo?.basic_information?.registration_year
                          : "---"}
                      </Smalldescription>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} md={6} lg={4}>
                  <Box borderLeft="1px solid GrayText" pb={3}>
                    <Box>
                      <MoreText
                        style={{
                          marginBottom: "5px",
                          borderLeft: "3px solid rgba(215, 40, 47, 1)",
                          paddingLeft: "16px",
                        }}
                      >
                        Main Product{" "}
                      </MoreText>
                      <Smalldescription
                        style={{ fontSize: "12px", paddingLeft: "16px" }}
                        variant="body2"
                        fontSize={{ xs: 12 }}
                        color="black"
                      >
                        {userInfo?.basic_information?.company_products.length >
                        0
                          ? userInfo?.basic_information?.company_products.map(
                              (item, i) => (
                                <Typography key={i} component="span">
                                  {" "}
                                  {item}
                                  {i ===
                                  userInfo?.basic_information?.company_products
                                    .length -
                                    1
                                    ? ""
                                    : ","}
                                </Typography>
                              )
                            )
                          : "---"}
                      </Smalldescription>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  display={{ xs: "none!important", sm: "block !important" }}
                  item
                  xs={12}
                  textAlign="right"
                >
                  <MoreAboutUsButton
                    onClick={() => {
                      router.push({
                        pathname: `/mini-site/${router?.query?.id[0]}/companyprofile`,
                      });
                    }}
                  >
                    Know More
                  </MoreAboutUsButton>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <ImageGridItem
            item
            xs={4}
            imgsrc={userInfo?.contact_profile?.minisite_footer_banner}
          ></ImageGridItem>
          <Grid
            p={2}
            display={{ xs: "block!important", sm: "none !important" }}
            item
            xs={12}
            textAlign="right"
          >
            <MoreAboutUsButton
              onClick={() => {
                router.push({
                  pathname: "/miniSite/CompanyProfile",
                });
              }}
            >
              More Details...!
            </MoreAboutUsButton>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
