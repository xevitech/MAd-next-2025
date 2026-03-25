import React from "react";
import {
  Box,
  Typography,
  styled
} from "@mui/material";
import { ButtonBase, Grid } from "@mui/material";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { Card, Imgcom, TypographyBorderline } from "./style";
import { useRouter } from "next/router";

const Text = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "21px",
  lineHeight: "28.6px",
  color: "#231F20",
  margin: "1px 0 15px",
  "@media screen and (max-width: 840px)": {
    fontSize: "16px",
  },
}));

const Helo = styled(ButtonBase)(() => ({
  padding: "10px 20px",
  fontWeight: "700",
  fontSize: "15px",
  color: "#D7282F",
  border: "1px solid red",
  borderRadius: "6px",
  fontFamily: "open sans",
  marginBottom: "15px",
  transition: "ease-in .3s",
  "&:hover": {
    backgroundColor: "#D7282F",
    color: "#ffff",
  },
  "@media screen and (max-width: 840px)": {
    fontSize: "12px",
  },
}));

const Cardheading = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "18px",
  lineHeight: "24.51px",
  color: "#231F20",
  "@media screen and (max-width:350px)": {
    fontSize: '13px', lineHeight: '18px'
  }
}));
const Cardcontent = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "12px",
  lineHeight: "20px",
  color: "#4A4A4A",
  marginTop: "10px",
  marginBottom: "10px",
}));

const Cardborder = styled(Box)(() => ({
  border: "1px solid #E1E1E1",
  borderRadius: "6px",
  position: "relative",
}));

const ButtonText = styled(Typography)(() => ({
  color: "#D7282F",

  "@media screen and (max-width:350px)": {
    fontSize: '12px'
  }
}));

const ButtonoverCard = styled(ButtonBase)(() => ({
  border: "1px solid #CDCDCD",
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "21.79px",
  textAlign: "center",
  borderRadius: "6px",
  padding: "9px 11px 12px 11px",
  position: "absolute",
  backgroundColor: "#ffff",
  left: "0",
  right: "0",
  margin: "0 auto",
  width: "150.19px",
  color: "#D7282F",
  transition: "ease-in .3s",
  "&:hover": {
    backgroundColor: "#D7282F",
    color: "#ffff",
    transition: "ease-in .3s",
    "& .MuiTypography-root": {
      color: "#ffff",
      transition: "ease-in .3s",
    },
  },
  "@media screen and (max-width:350px)":{
    padding:'8px'
  },
}));

const Displayflex = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  textAlign: "center",
  alignItems: "center",
  marginTop: "16px",
  "@media screen and (max-width: 768px)": {
    display: "block",
  },
}));

export default function UpgradeInfo() {
  const router = useRouter();
  return (
    <Grid container spacing={1.5}  sx={{ mt: 0.4 }}>
      <Grid item xs={12}>
        <Card style={{ height: "auto" }}>
          <Box sx={{ borderRadius: "6px", p: 3, pt: 1 }}>
            <Displayflex>
              <Box>
                <Text>
                  Grow your margins with a suite of tools built for B2B sales
                </Text>
              </Box>
              <Box>
                <Helo onClick={(e) => router.push("plancards")}>
                  Upgrade For Unlimited Access
                  <AddAlertOutlinedIcon sx={{ ml: 1 }} />
                </Helo>
              </Box>
            </Displayflex>
            <Box>
              <Grid container spacing={2} sx={{ pb: 5, marginTop: "1px" }}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  xl={4}
                  marginBottom="20px"
                >
                  <Cardborder sx={{ p: 3 }}>
                    <Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        marginBottom="10px"
                      >
                        <Box>
                          <Imgcom>
                            <img
                              src="/assets/user_img8.svg"
                              style={{ margin: "0 7px -8px 0px" }}
                            />
                          </Imgcom>
                        </Box>
                        <Cardheading>
                          Set up storefront
                        </Cardheading>
                      </Box>
                      <Box>
                        <Cardcontent>
                          Once you register with us at Merchant AD, you will be
                          redirected to your collective dashboard.
                        </Cardcontent>
                      </Box>
                    </Box>
                    <ButtonoverCard>
                      <ArrowCircleRightOutlinedIcon
                        sx={{ margin: "0 4px 0 0", fontSize: "19px" }}
                      />
                      <ButtonText>Learn More..</ButtonText>
                      <TypographyBorderline
                        component="span"
                      ></TypographyBorderline>
                    </ButtonoverCard>
                  </Cardborder>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  xl={4}
                  marginBottom="20px"
                >
                  <Cardborder sx={{ p: 3 }}>
                    <Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        marginBottom="10px"
                      >
                       <Box>
                          <Imgcom>
                            <img
                              src="/assets/user_img8.svg"
                              style={{ margin: "0 7px -8px 0px" }}
                            />
                          </Imgcom>
                        </Box>
                        <Cardheading>
                          Set up storefront
                        </Cardheading>
                      </Box>
                      <Box>
                        <Cardcontent>
                          Once you register with us at Merchant AD, you will be
                          redirected to your collective dashboard.
                        </Cardcontent>
                      </Box>
                    </Box>
                    <ButtonoverCard>
                      <ArrowCircleRightOutlinedIcon
                        sx={{ margin: "0 4px 0 0", fontSize: "19px" }}
                      />
                      <ButtonText>Learn More..</ButtonText>
                      <TypographyBorderline
                        component="span"
                      ></TypographyBorderline>
                    </ButtonoverCard>
                  </Cardborder>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  xl={4}
                  marginBottom="10px"
                >
                  <Cardborder sx={{ p: 3 }}>
                    <Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        marginBottom="10px"
                      >
                        <Box>
                          <Imgcom>
                            <img
                              src="/assets/user_img8.svg"
                              style={{ margin: "0 7px -8px 0px" }}
                            />
                          </Imgcom>
                        </Box>
                        <Cardheading>
                          Set up storefront
                        </Cardheading>
                      </Box>
                      <Box>
                        <Cardcontent>
                          Once you register with us at Merchant AD, you will be
                          redirected to your collective dashboard.
                        </Cardcontent>
                      </Box>
                    </Box>
                    <ButtonoverCard>
                      <ArrowCircleRightOutlinedIcon
                        sx={{ margin: "0 4px 0 0", fontSize: "19px" }}
                      />
                      <ButtonText>Learn More..</ButtonText>
                      <TypographyBorderline
                        component="span"
                      ></TypographyBorderline>
                    </ButtonoverCard>
                  </Cardborder>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
