import React, { useEffect, useState } from "react";
import {
  Textlink,
  FooterCol,
  CopyrightTxt,
  SocialIcons,
  useStyles,
  ContainerHome,
  Overlay,
  FooterSubscribe,
  ButtonSearch,
} from "./style";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { apiClient } from "../common";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto"
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create("width"),
    background: "#fff",
    borderRadius: "10px",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "170px",
      paddingLeft: "16px",
      marginTop: "10px",
      "&:focus": {
        width: "25ch",
      },
    },
    "@media screen and (max-width:900px)": {
      margin: "0",
    },
  },
}));
const FooterPage = () => {
  const { classes } = useStyles();
  const [load, setLoader] = useState<boolean>(false);
  const [footerOptions, setFooterOptions] = useState<any>([]);
  useEffect(() => {
    setLoader(true);
    FetchFooterOptions();
  }, []);

  const FetchFooterOptions = async () => {
    let response = await apiClient("website_menu/getMenus_items/11", "get");
    if (response.status == 200) {
      setFooterOptions(response.data);
    }
  };

  return (
    <ContainerHome>
      <Overlay></Overlay>
      <Grid container spacing={2} className="bgimage">
        <Grid item xs={6} sm={4} md={2.5}>
          <FooterCol>
            <Typography variant="h5" className={classes.footerlinks}>
              Quick Links
            </Typography>
            <Box className={classes.borderr}></Box>
            <Typography>
              <Textlink href="/about-us">About Us</Textlink>
            </Typography>
            <Typography>
              <Textlink
                onClick={(e) => {
                  e.stopPropagation();
                  window.open("our-products", "_blank", "noreferrer");
                }}
              >
                Our Products
              </Textlink>
            </Typography>
            <Typography>
              <Textlink href="/contact-us">Contact Usbbfd</Textlink>
            </Typography>
          </FooterCol>
        </Grid>
        <Grid item xs={6} sm={4} md={2.5}>
          <FooterCol>
            <Typography variant="h5" className={classes.footerlinks}>
              Main Products
            </Typography>
            <Box className={classes.borderr}></Box>
            {footerOptions.map((v) => (
              <Typography key={v.id}>
                <Textlink href={v.link}>{v.label}</Textlink>
              </Typography>
            ))}
          </FooterCol>
        </Grid>
        <Grid item xs={6} sm={4} md={2.5}>
          <FooterCol>
            <Typography variant="h5" className={classes.footerlinks}>
              For Sellers
            </Typography>
            <Box className={classes.borderr}></Box>
            <Typography>
              {" "}
              <Textlink href="#">Mini Website</Textlink>
            </Typography>
            <Typography>
              <Textlink href="#">No Barriers</Textlink>
            </Typography>
            <Typography>
              <Textlink href="#">Quick Sales</Textlink>
            </Typography>
            <Typography>
              {" "}
              <Textlink href="#">Worldwide Reach </Textlink>
            </Typography>
          </FooterCol>
        </Grid>
        <Grid item xs={6} sm={4} md={2.5}>
          <FooterCol>
            <Typography variant="h5" className={classes.footerlinks}>
              For Buyer
            </Typography>
            <Box className={classes.borderr}></Box>
            <Typography>
              {" "}
              <Textlink href="#">Trusted Seller</Textlink>
            </Typography>
            <Typography>
              <Textlink href="#">Variety Available</Textlink>
            </Typography>
            <Typography>
              <Textlink href="#">Several Payment Method</Textlink>
            </Typography>
            <Typography>
              {" "}
              <Textlink href="#">24*7 Customer Support</Textlink>
            </Typography>
          </FooterCol>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <FooterCol>
            <Typography variant="h5" className={classes.footerlinks}>
              Blogs
            </Typography>
            <Box className={classes.borderr}></Box>
            <Typography>
              {" "}
              <Textlink href="#">Trusted Seller</Textlink>
            </Typography>
            <Typography>
              <Textlink href="#">Variety Available</Textlink>
            </Typography>
            <Typography>
              <Textlink href="#">Several Payment Method</Textlink>
            </Typography>
            <Typography>
              {" "}
              <Textlink href="#">24*7 Customer Support</Textlink>
            </Typography>
          </FooterCol>
        </Grid>
      </Grid>

      <Grid container spacing={2} className="bgimage">
        <Grid item xs={12} sm={6} md={5}>
          <FooterCol>
            <Textlink href="/">
              <img className="ComLogo" src="/assets/logo2.svg" alt="logo" />
            </Textlink>
            <Typography>
              Merchant AD Our company's founders
              <br /> & CEO are electrical and mechanical <br />
              engineers and businessman
            </Typography>
            <Typography>
              <Textlink>
                {load && (
                  <Textlink href="mailto:info@powercozmo.com">
                    info@powercozmo.com
                  </Textlink>
                )}
              </Textlink>
            </Typography>
          </FooterCol>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <FooterCol>
            <Typography variant="h5" className={classes.footerlinks}>
              Follow Us
            </Typography>
            <Box className={classes.borderr}></Box>
            <SocialIcons display="flex" sx={{ mt: 3 }}>
              <IconButton aria-label="Button">
                <Link
                  href="https://www.facebook.com/powercozmo.epg"
                  target="_blank"
                >
                  <FacebookIcon></FacebookIcon>
                </Link>
              </IconButton>
              <IconButton aria-label="Button">
                <Link href="https://twitter.com/powercozmo" target="_blank">
                  <TwitterIcon></TwitterIcon>
                </Link>
              </IconButton>
              <IconButton aria-label="Button">
                <Link
                  href="https://www.linkedin.com/company/powercozmo"
                  target="_blank"
                >
                  <LinkedInIcon></LinkedInIcon>
                </Link>
              </IconButton>
              <IconButton aria-label="Button">
                <Link
                  href="https://www.instagram.com/powercozmo/"
                  target="_blank"
                >
                  <InstagramIcon></InstagramIcon>
                </Link>
              </IconButton>
            </SocialIcons>
          </FooterCol>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FooterCol>
            <Typography variant="h5" className={classes.footerlinks}>
              Subscribe
            </Typography>
            <FooterSubscribe>
              <Toolbar sx={{ padding: 0 }}>
                <Search>
                  <StyledInputBase
                    placeholder="Enter Email"
                    inputProps={{ "aria-label": "search" }}
                  />
                  <ButtonSearch variant="contained">Submit</ButtonSearch>
                </Search>
              </Toolbar>
            </FooterSubscribe>
          </FooterCol>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CopyrightTxt>
            <Typography className={classes.footertxt}>
              © 2024 Merchant AD - All rights reserved.
            </Typography>
          </CopyrightTxt>
        </Grid>
      </Grid>
    </ContainerHome>
  );
};
export default FooterPage;
