import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, Grid, IconButton, Link, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useState } from "react";
import { apiClient } from "../common";
import {
  ButtonSearch,
  ContainerHome,
  CopyrightTxt,
  FooterCol,
  FooterSubscribe,
  Overlay,
  SocialIcons,
  Textlink,
  useStyles,
} from "./style";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  margin: "0",
  "@media screen and (max-width:767px)": {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "9px",
  },

  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
    // marginTop: 10,
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    transition: theme.transitions.create("width"),
    background: "#fff",
    borderRadius: "10px",
    width: "170px",
    padding: "6px",
    [theme.breakpoints.up("sm")]: {
      width: "190px",
      paddingLeft: "16px",
      marginTop: "0",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const FooterPage = () => {
  const { classes } = useStyles();
  const [load, setLoader] = useState<boolean>(false);
  const [footerOptions, setFooterOptions] = useState<any>([]);
  const [render, setRender] = useState<any>(false);

  useEffect(() => {
    setRender(true);
  }, []);
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
      {render && (
        <>
          <Overlay></Overlay>
          <Grid container spacing={2} className="bgimage">
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <FooterCol>
                <img
                  src="/assets/merchantad-logo.png"
                  className="footerlogoic"
                  alt="footer-logo"
                />
                <Typography>
                  India's largest online B2B marketplace for Small & Medium Size Businesses, connecting global buyers with suppliers. Find Manufacturers, Exporters, Importers, Wholesalers, Products, and Trade Leads. Let's Buy & Sell on Merchant AD.
                </Typography>
                <Typography className="mailinfo">
                  <Link href="#" underline="hover">
                    {load && (
                      <Textlink href="mailto:info@merchantad.com">
                        info@merchantad.com
                      </Textlink>
                    )}
                  </Link>
                </Typography>
               
              </FooterCol>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <FooterCol>
                <Typography variant="h5" className={classes.footerlinks}>
                  Quick Link
                </Typography>
                <Box className={classes.borderr}></Box>
                <Typography>
                  <Textlink href="/about-us">About Us</Textlink>
                </Typography>
                <Typography>
                  <Textlink href="/productlist">All Products</Textlink>
                </Typography>
                <Typography>
                  <Textlink href="/contact-us">Contact Us</Textlink>
                </Typography>

                
               
                {/* <Typography>
                  <Textlink href="privacy-policy/use-data-deletion">User data deletion instructions</Textlink>
                </Typography> */}
              </FooterCol>
            </Grid>
            <Grid item xs={12} sm={6} md={2.5} lg={2.5}>
              <FooterCol>
                <Typography variant="h5" className={classes.footerlinks}>
                  Quick Link
                </Typography>
                <Box className={classes.borderr}></Box>
                {/* {footerOptions.map((v) => (
                  <Typography key={v.id}>
                    <Textlink href={v.link}>{v.label}</Textlink>
                  </Typography>
                ))} */}
                 <Typography>
                  <Textlink href="/blog">Blog</Textlink>
                </Typography>
                {/* <Typography>
                  <Textlink href="/faq">FAQ&'s</Textlink>
                </Typography> */}
                <Typography>
                  <Textlink href="/privacy-policy">Privacy Policy</Textlink>
                </Typography>
              </FooterCol>
            </Grid>
            <Grid item xs={12} sm={6} md={3.5} lg={3.5}>
              <FooterCol>
                <Typography variant="h5" className={classes.footerlinks}>
                  Subscribe
                </Typography>
                <FooterSubscribe>
                  <Toolbar sx={{ padding: 0, minHeight: "auto" }}>
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
              <FooterCol>
                  <SocialIcons display="flex">
                    <IconButton aria-label="Button">
                      <Link
                        href="https://www.facebook.com"
                        target="_blank"
                      >
                        <FacebookIcon></FacebookIcon>
                      </Link>
                    </IconButton>
                    <IconButton
                      aria-label="Button"
                      href="https://twitter.com"
                      target="_blank"
                    >
                      <i
                        className="icon-x-social"
                        style={{
                          fontSize: "12px",
                        }}
                      ></i>
                    </IconButton>
                    <IconButton aria-label="Button">
                      <Link
                        href="https://www.linkedin.com/company"
                        target="_blank"
                      >
                        <LinkedInIcon></LinkedInIcon>
                      </Link>
                    </IconButton>
                    <IconButton aria-label="Button">
                      <Link
                        href="https://www.instagram.com"
                        target="_blank"
                      >
                        <InstagramIcon></InstagramIcon>
                      </Link>
                    </IconButton>
                  </SocialIcons>
                </FooterCol>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CopyrightTxt>
                <Typography className={classes.footertxt}>
                  © 2026 Merchant AD - All rights reserved.
                </Typography>
              </CopyrightTxt>
            </Grid>
          </Grid>
        </>
      )}
    </ContainerHome>
  );
};
export default FooterPage;
