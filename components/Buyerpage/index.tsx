import {
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import {
  Bgshade,
  Blackbg,
  Borderfortext,
  ButtonText,
  Buttonbox,
  ButtonoverCard,
  Buyerportal,
  Buyerskewimage,
  Buyon,
  Buyonspan,
  CircleBG,
  ClickHereBox,
  ContentBox,
  ContentBoxmarginTop,
  Designation,
  Fifthsectionheading,
  Fifthsectionsubheading,
  Fifthsectiontext,
  Fillin,
  FillinBox,
  Fillinspan,
  Firstsectionbackground,
  Firstsectionparagraph,
  FlexBoxforchat,
  Fourthheading,
  Fourthsection,
  FourthsectionHeading,
  FourthsectionHeadingone,
  Fourthsectionparagraph,
  Fourthsectionredtext,
  FourthsectionsubHeading,
  Fromseller,
  FromsellerBox,
  Fromsellerspan,
  GlobalMarket,
  GlobalMarketspan,
  GlobalMarkettext,
  GridBoxes,
  GridBoxesParagraph,
  GridBoxestext,
  GridBoxestextspan,
  Heading,
  Howitworks,
  Howitworksspan,
  Imageborder,
  Innerbox,
  LeandAndOpportunities,
  LeandAndOpportunitiesText,
  LeandAndOpportunitiesspan,
  LearnMoreBox,
  Linebox,
  Livechat,
  Livechatparagraph,
  MainGridBox,
  Name,
  One,
  OneBox,
  Onlinechat,
  Outerbox,
  ParaBox,
  Paragraph,
  Pngbg,
  PowercozmoText,
  Powercozmobox,
  Quotebox,
  Realtime,
  Realtimespan,
  SecondSection,
  SecondSectionheadings,
  SecondSectioninnerBox,
  Shadesbg,
  Skewimage,
  Skewimage2,
  Skewimageinsidepadding,
  Staricon,
  Startsellingbutton,
  SubHeading,
  Tableborder,
  TablecellBox,
  Tablecellborder,
  Tablecellbox,
  Textbox,
  ThirdHeading,
  ThirdSection,
  ThirdSectionheading,
  ThirdSectionsubheading,
  ThirdsectionParagraph,
  TypographyBorderline,
  Uppertextbox,
  Wealways,
  Weeasy,
  Weknow,
  Whyseller,
} from "./style";
import { Search as SearchIcon } from "@mui/icons-material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";

export default function Buyerpage() {
  const slider = useRef(null);
  function next() {
    slider.current.slickNext();
  }
  function previous() {
    slider.current.slickPrev();
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: false,
    autoplaySpeed: 6000,
    autoplay: true,
    cssEase: "linear",
  };
  const sliderRef: any = useRef();
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Box sx={{ backgroundColor: "#fff" }}>
        <Firstsectionbackground>
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                sm={12}
                lg={6}
                xl={6}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box>
                  <Box>
                    <Buyon>
                      Buy on <Buyonspan>Merchant AD</Buyonspan>
                    </Buyon>
                  </Box>
                  <FillinBox>
                    <Fillin>
                      Fill in your requirements and get quotes{" "}
                      <Fillinspan>instantly!!</Fillinspan>
                    </Fillin>
                  </FillinBox>
                  <FromsellerBox>
                    <Fromseller>
                      From sellers <Fromsellerspan>worldwide</Fromsellerspan>{" "}
                      registered with us, get never seen prices.
                    </Fromseller>
                  </FromsellerBox>
                  <ParaBox>
                    <Firstsectionparagraph>
                      Access to 10k+ global network of manufacturers, suppliers,
                      traders and stockists through our buyer portal. Choose the
                      required category, product, ranges and specifications
                      across any National and International standard. Our
                      seamless seller support portal makes your quotation and
                      negotiation process hassle free.
                    </Firstsectionparagraph>
                  </ParaBox>
                  <Box sx={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                    <TextField
                      variant="outlined"
                      placeholder="Enter product, model, manufacturer, category etc..."
                      sx={{
                        width: "80%",
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#fff",
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton>
                              <SearchIcon sx={{ color: "#d7282f" }} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Startsellingbutton>Signup Free</Startsellingbutton>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} lg={6} xl={6}>
                <Box>
                  <img
                    src="/assets/buyermapwithlocation.png"
                    alt=""
                    style={{ width: "100%" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Firstsectionbackground>
        <SecondSection>
          <SecondSectioninnerBox>
            <Container maxWidth="xl">
              <SecondSectionheadings>
                <Box>
                  <Heading>
                    Merchant AD | SPECIALIZED Features for Buyers
                  </Heading>
                </Box>
                <Box>
                  <SubHeading>
                    Quotation to Invoice, now the process is just few clicks
                  </SubHeading>
                </Box>
              </SecondSectionheadings>
              <MainGridBox>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={4}
                    xl={4}
                    sx={{ display: "flex", alignItems: "stretch" }}
                  >
                    <GridBoxes>
                      <Box>
                        <img src="/assets/gridimg1.svg" alt="" />
                      </Box>
                      <Box sx={{ marginTop: "12px" }}>
                        <GridBoxestext>
                          Project Creation{" "}
                          <GridBoxestextspan>Tool</GridBoxestextspan>
                        </GridBoxestext>
                      </Box>
                      <Box sx={{ marginTop: "16px" }}>
                        <GridBoxesParagraph>
                          From our collective dashboard, fill in your project
                          requirements and share your BOQ with inbuilt support
                          for specifications.
                        </GridBoxesParagraph>
                      </Box>
                    </GridBoxes>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={4}
                    xl={4}
                    sx={{ display: "flex", alignItems: "stretch" }}
                  >
                    <GridBoxes>
                      <Box>
                        <img src="/assets/gridimg2.svg" alt="" />
                      </Box>
                      <Box sx={{ marginTop: "12px" }}>
                        <GridBoxestext>
                          Banking and{" "}
                          <GridBoxestextspan>Logistics</GridBoxestextspan>
                        </GridBoxestext>
                      </Box>
                      <Box sx={{ marginTop: "16px" }}>
                        <GridBoxesParagraph>
                          We extends our support for buyers by serving as
                          intermediate support while dealing with critical
                          manufacturers and suppliers.
                        </GridBoxesParagraph>
                      </Box>
                    </GridBoxes>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={4}
                    xl={4}
                    sx={{ display: "flex", alignItems: "stretch" }}
                  >
                    <GridBoxes>
                      <Box>
                        <img src="/assets/gridimg2.svg" alt="" />
                      </Box>
                      <Box sx={{ marginTop: "12px" }}>
                        <GridBoxestext>
                          Maximum Allowed{" "}
                          <GridBoxestextspan>discount</GridBoxestextspan>
                        </GridBoxestext>
                      </Box>
                      <Box sx={{ marginTop: "16px" }}>
                        <GridBoxesParagraph>
                          Need to avail the maximum discount being offered in
                          the market? Ping us! to bring the numbers down.
                        </GridBoxesParagraph>
                      </Box>
                    </GridBoxes>
                  </Grid>
                </Grid>
              </MainGridBox>
            </Container>
          </SecondSectioninnerBox>
        </SecondSection>
        <ThirdSection>
          <Box>
            <ThirdSectionheading>BUYER PORTAL</ThirdSectionheading>
          </Box>
          <Box>
            <ThirdSectionsubheading>
              Hire Merchant AD AS BUYING AGENT!!!
            </ThirdSectionsubheading>
          </Box>
        </ThirdSection>
        <Buyerskewimage sx={{ marginTop: "50px" }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={12}
              lg={6}
              xl={6}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box
                data-aos="fade-right"
                data-aos-offset="100"
                data-aos-easing="ease-in-sine"
                data-aos-duration="800"
                sx={{ width: '100%' }}
              >
                <img
                  src="/assets/buyerlaptop.svg"
                  alt=""
                  style={{ width: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6} xl={6}>
              <Buyerportal>
                <Box>
                  <ThirdHeading>
                    Let our agent bring the best prices and deals to your
                    inbox!!!
                  </ThirdHeading>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <ThirdsectionParagraph>
                    With our procurement projects, Merchant AD has reduced the
                    lead time for sourcing materials and products by bringing in
                    a unified platform for sellers and buyers.
                  </ThirdsectionParagraph>
                  <ThirdsectionParagraph sx={{ marginTop: "15px" }}>
                    Our well networked agents will navigate through your
                    requirements and bring in prices and deals that will
                    surprise you.
                  </ThirdsectionParagraph>
                </Box>
                <Box>
                  <TableContainer>
                    <Table>
                      <TableRow>
                        <Tableborder>
                          <Tablecellbox>
                            <Box>
                              {" "}
                              <Staricon />
                            </Box>
                            <Box>
                              <Typography>Certified Expertise</Typography>
                            </Box>
                          </Tablecellbox>
                        </Tableborder>
                        <Tableborder>
                          <Tablecellbox>
                            <Box>
                              {" "}
                              <Staricon />
                            </Box>
                            <Box>
                              <Typography>Worldwide sellers</Typography>
                            </Box>
                          </Tablecellbox>
                        </Tableborder>
                      </TableRow>
                      <TableRow>
                        <Tableborder>
                          <Tablecellbox>
                            <Box>
                              {" "}
                              <Staricon />
                            </Box>
                            <Box>
                              <Typography>Fully Automated</Typography>
                            </Box>
                          </Tablecellbox>
                        </Tableborder>
                        <Tableborder>
                          <Tablecellbox>
                            <Box>
                              {" "}
                              <Staricon />
                            </Box>
                            <Box>
                              <Typography>Turnkey solutions</Typography>
                            </Box>
                          </Tablecellbox>
                        </Tableborder>
                      </TableRow>
                    </Table>
                  </TableContainer>
                </Box>
                <Borderfortext>
                  <Typography>
                    Power buyer portal to meet your category wise demands.
                  </Typography>
                </Borderfortext>
                <Box sx={{ marginTop: "50px", marginBottom: "130px" }}>
                  <ButtonoverCard>
                    <ArrowCircleRightOutlinedIcon
                      sx={{ margin: "0 4px 0 0", fontSize: "19px" }}
                    />
                    <ButtonText>Discover More</ButtonText>
                    <TypographyBorderline component="span"></TypographyBorderline>
                  </ButtonoverCard>
                </Box>
              </Buyerportal>
            </Grid>
          </Grid>
        </Buyerskewimage>
        <Fourthsection>
          <FourthsectionHeading>
            <FourthsectionHeadingone>
              EASY COMMUNICATION
            </FourthsectionHeadingone>
            <FourthsectionsubHeading>CHAT WITH SELLERS</FourthsectionsubHeading>
          </FourthsectionHeading>
          <Grid container spacing={2} sx={{ marginTop: "0px" }}>
            <Grid
              item
              xs={12}
              sm={12}
              lg={6}
              xl={6}
              sx={{ display: "flex", alignItems: "stretch" }}
            >
              <Pngbg
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Box>
                  <Fourthheading>
                    Give your queries and open points a relief.
                  </Fourthheading>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <Fourthsectionredtext>
                    Connect with sellers and get your problems and queries with
                    the sorted out in minutes to execute your order.
                  </Fourthsectionredtext>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <Fourthsectionparagraph>
                    Our dedicated account manager are for you help and guide you
                    through the buying process on Merchant AD Buyer portal. Drop
                    in your queries to get them solved instantaneously.
                  </Fourthsectionparagraph>
                </Box>
                <Box sx={{ marginTop: "60px" }}>
                  <ButtonoverCard>
                    <ArrowCircleRightOutlinedIcon
                      sx={{ margin: "0 4px 0 0", fontSize: "19px" }}
                    />
                    <ButtonText>Discover More</ButtonText>
                    <TypographyBorderline component="span"></TypographyBorderline>
                  </ButtonoverCard>
                </Box>
              </Pngbg>
            </Grid>
            <Grid item xs={12} sm={12} lg={6} xl={6}>
              <Box
                data-aos="fade-left"
                data-aos-offset="500"
                data-aos-easing="ease-in-sine"
                data-aos-duration="800"
              >
                <img
                  src="/assets/chatscreen1.svg"
                  alt=""
                  style={{ width: "70%" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Fourthsection>
        <Box position={"relative"}>
          <CircleBG></CircleBG>
          <Box sx={{ position: "relative", zIndex: "1" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                paddingTop: "70px",
              }}
            >
              <Fifthsectionheading>
                Merchant AD | You Can create products
              </Fifthsectionheading>
              <Fifthsectionsubheading>
                Add your product requirements and get quoted within minutes !!!
              </Fifthsectionsubheading>
              <Fifthsectiontext>
                I Got multiple variants of A product?
                <br />
                Don’t worry, we got you covered with our integrated product
                addition tool
              </Fifthsectiontext>

              <Slider
                {...settings}
                ref={sliderRef}
                sx={{
                  display: "flex !important",
                  justifyContent: "center !important",
                }}
              >
                <Box
                  sx={{
                    display: "flex !important",
                    justifyContent: "center !important",
                  }}
                >
                  <img
                    src="/assets/buyerlaptopimg.svg"
                    alt=""
                    style={{ width: "70%" }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex !important",
                    justifyContent: "center !important",
                  }}
                >
                  <img
                    src="/assets/buyerlaptopimg.svg"
                    alt=""
                    style={{ width: "70%" }}
                  />
                </Box>
              </Slider>
            </Box>
          </Box>
        </Box>
        <Bgshade>
          <Powercozmobox>
            <PowercozmoText>Merchant AD</PowercozmoText>
            <Howitworks>
              How It <Howitworksspan>Works</Howitworksspan>
            </Howitworks>
            <Paragraph>
              Choosing the best product type ensures that you see the most
              appropriate data fields for your product. Browse the product types
              directly or use searches.<br></br> With over 150,000
              manufacturers, wholesalers, and distributors selling on the
              platform, you can find or create anything you’re looking for.
            </Paragraph>
          </Powercozmobox>
          <Container maxWidth="xl" sx={{ marginTop: "80px" }}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <Box>
                  <OneBox>
                    <One>1</One>
                  </OneBox>
                  <Linebox>
                    <Outerbox>
                      <Innerbox></Innerbox>
                    </Outerbox>
                  </Linebox>
                  <Textbox>
                    <GlobalMarket>
                      {" "}
                      <GlobalMarketspan>Global</GlobalMarketspan> Market
                    </GlobalMarket>
                    <GlobalMarkettext>
                      Share your product details and publish them for global
                      buyers and re sellers.
                    </GlobalMarkettext>
                  </Textbox>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <Buttonbox>
                  <Uppertextbox>
                    <LeandAndOpportunities>
                      {" "}
                      <LeandAndOpportunitiesspan>
                        Lead and
                      </LeandAndOpportunitiesspan>{" "}
                      opportunities
                    </LeandAndOpportunities>
                    <LeandAndOpportunitiesText>
                      Get multiple leads and opportunities from our extensive
                      database floated directly to your dashboard.
                    </LeandAndOpportunitiesText>
                  </Uppertextbox>
                  <Linebox>
                    <Outerbox>
                      <Innerbox></Innerbox>
                    </Outerbox>
                  </Linebox>
                  <OneBox>
                    <One>2</One>
                  </OneBox>
                </Buttonbox>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <Box>
                  <OneBox>
                    <One>3</One>
                  </OneBox>
                  <Linebox>
                    <Outerbox>
                      <Innerbox></Innerbox>
                    </Outerbox>
                  </Linebox>
                  <Textbox>
                    <GlobalMarket>
                      {" "}
                      <GlobalMarketspan>Close</GlobalMarketspan> Deals
                    </GlobalMarket>
                    <GlobalMarkettext>
                      With our one stop portal, quote, negotiate, close deals in
                      clicks away..
                    </GlobalMarkettext>
                  </Textbox>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <Buttonbox>
                  <Uppertextbox>
                    <LeandAndOpportunities>
                      {" "}
                      <LeandAndOpportunitiesspan>
                        Manage
                      </LeandAndOpportunitiesspan>{" "}
                      Orders
                    </LeandAndOpportunities>
                    <LeandAndOpportunitiesText>
                      Multiple buyer leads and orders are categorized in our CRM
                      portal. Get access to them for a hassle free virtual
                    </LeandAndOpportunitiesText>
                  </Uppertextbox>
                  <Linebox>
                    <Outerbox>
                      <Innerbox></Innerbox>
                    </Outerbox>
                  </Linebox>
                  <OneBox>
                    <One>4</One>
                  </OneBox>
                </Buttonbox>
              </Grid>
            </Grid>
          </Container>
        </Bgshade>

        <Blackbg>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={12}
              lg={5}
              xl={5}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Whyseller>Why sellers advise Merchant AD</Whyseller>
                <Weknow>- We know the industry!</Weknow>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
              <Skewimage>
                <Quotebox>
                  <img src="/assets/sellerquotepng.png" alt="" />
                </Quotebox>
                <Slider {...settings} ref={slider}>
                  <ContentBox>
                    <Box>
                      <img src="/assets/buyeravatar.svg" alt="" />
                    </Box>
                    <ContentBoxmarginTop>
                      <Wealways>
                        “We always get very genuine and potential leads through
                        Power <br /> Cozmo and the platform they provide is very
                        easy and one stop to <br /> handle all our orders and
                        deals.”
                      </Wealways>
                    </ContentBoxmarginTop>
                    <ContentBoxmarginTop>
                      <img src="/assets/buyerstars.svg" alt="" />
                    </ContentBoxmarginTop>
                    <ContentBoxmarginTop>
                      <Name>David Sen</Name>
                      <Designation>Head Of IT, Merchant AD</Designation>
                    </ContentBoxmarginTop>
                  </ContentBox>
                  <ContentBox>
                    <Box>
                      <img src="/assets/buyeravatar.svg" alt="" />
                    </Box>
                    <ContentBoxmarginTop>
                      <Wealways>
                        “We always get very genuine and potential leads through
                        Power <br /> Cozmo and the platform they provide is very
                        easy and one stop to <br /> handle all our orders and
                        deals.”
                      </Wealways>
                    </ContentBoxmarginTop>
                    <ContentBoxmarginTop>
                      <img src="/assets/buyerstars.svg" alt="" />
                    </ContentBoxmarginTop>
                    <ContentBoxmarginTop>
                      <Name>David Sen</Name>
                      <Designation>Head Of IT, Merchant AD</Designation>
                    </ContentBoxmarginTop>
                  </ContentBox>
                </Slider>
                <Box sx={{ textAlign: "start", marginTop: "30px" }}>
                  <WestIcon
                    onClick={() => {
                      previous();
                    }}
                    sx={{ marginX: "10px", cursor: "pointer" }}
                  />
                  <EastIcon
                    onClick={() => {
                      next();
                    }}
                    sx={{ marginX: "10px", cursor: "pointer" }}
                  />
                </Box>
              </Skewimage>
            </Grid>
          </Grid>
        </Blackbg>

        <Shadesbg>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} lg={6} xl={6}>
              <Skewimage2>
                <Skewimageinsidepadding>
                  <Box>
                    <Realtime>
                      24/7 <Realtimespan>real-time</Realtimespan> support.
                    </Realtime>
                    <Weeasy>
                      An easy way to post your sourcing requests and get quotes.
                    </Weeasy>
                  </Box>
                  <Box>
                    <TableContainer>
                      <Table>
                        <TableRow>
                          <Tablecellborder>
                            <TablecellBox>
                              <TaskAltOutlinedIcon sx={{ color: "#D7282F" }} />
                              Email, Chat, call Support
                            </TablecellBox>
                          </Tablecellborder>
                          <Tablecellborder>
                            <TablecellBox>
                              <TaskAltOutlinedIcon sx={{ color: "#D7282F" }} />
                              Dedicated managers working round the clock for
                              you.
                            </TablecellBox>
                          </Tablecellborder>
                        </TableRow>
                      </Table>
                    </TableContainer>
                  </Box>
                  <LearnMoreBox>
                    <ButtonoverCard>
                      <ArrowCircleRightOutlinedIcon
                        sx={{ margin: "0 4px 0 0", fontSize: "19px" }}
                      />
                      <ButtonText>Learn More</ButtonText>
                      <TypographyBorderline
                        component="span"
                      ></TypographyBorderline>
                    </ButtonoverCard>
                  </LearnMoreBox>
                </Skewimageinsidepadding>
              </Skewimage2>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              lg={6}
              xl={6}
              sx={{
                display: "flex",
                alignItems: "start",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <FlexBoxforchat>
                <Box>
                  <Imageborder>
                    <img src="/assets/buyerchatsvg.svg" alt="" />
                  </Imageborder>
                </Box>
                <Box>
                  <Onlinechat>Online Chat</Onlinechat>
                  <Livechat>Live Chat Now</Livechat>
                  <Box sx={{ marginTop: "20px" }}>
                    <Livechatparagraph>
                      Merchant AD supplier support is available to solve all
                      your doubts and issues at any point in <br /> your online
                      selling business.
                    </Livechatparagraph>
                  </Box>
                </Box>
              </FlexBoxforchat>
              <ClickHereBox>
                <ButtonoverCard>
                  <ArrowCircleRightOutlinedIcon
                    sx={{ margin: "0 4px 0 0", fontSize: "19px" }}
                  />
                  <ButtonText>Click Here</ButtonText>
                  <TypographyBorderline
                    component="span"
                  ></TypographyBorderline>
                </ButtonoverCard>
              </ClickHereBox>
            </Grid>
          </Grid>
        </Shadesbg>
      </Box>
    </>
  );
}
