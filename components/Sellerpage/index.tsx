import {
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableContainer,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import {
  Bgshade,
  Blackbg,
  ButtonText,
  Buttonbox,
  ButtonoverCard,
  Buyon,
  Buyonspan,
  CircleBG,
  ClickHereBox,
  ContentBox,
  ContentBoxmarginTop,
  Designation,
  DiscoverMoreBox,
  Fifthsectionheading,
  Fifthsectionsubheading,
  Fifthsectiontext,
  Fillin,
  FillinBox,
  Fillinspan,
  Firstsectionbackground,
  Firstsectionparagraph,
  FlexBox,
  FlexBoxSubText,
  FlexBoxText,
  FlexBoxforchat,
  FlexImageBox,
  Fromseller,
  FromsellerBox,
  Fromsellerspan,
  GlobalMarket,
  GlobalMarketspan,
  GlobalMarkettext,
  GrowYourBusiness,
  Howitworks,
  Howitworksspan,
  Imageborder,
  IndusterialText,
  Industerialparagraph,
  Innerbox,
  LeandAndOpportunities,
  LeandAndOpportunitiesText,
  LeandAndOpportunitiesspan,
  LearnMoreBox,
  Linebox,
  Livechat,
  Livechatparagraph,
  Name,
  One,
  OneBox,
  Onlinechat,
  Outerbox,
  Padding20px,
  ParaBox,
  Paragraph,
  PowercozmoText,
  Powercozmobox,
  Quotebox,
  Realtime,
  Realtimespan,
  Secondsection,
  SecondsectionPara,
  SecondsectionParabox,
  Shadesbg,
  Skewimage,
  Skewimage2,
  Sliderbox,
  Star,
  Startsellingbutton,
  TabButtonBox,
  TabSection,
  TablecellBox,
  Tablecellborder,
  Textbox,
  TypographyBorderline,
  Uppertextbox,
  Wealways,
  Weeasy,
  Weknow,
  Whyseller,
} from "./style";
import { Search as SearchIcon } from "@mui/icons-material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Skewimageinsidepadding } from "../Buyerpage/style";
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function Sellerpage() {
  const slider = useRef(null);
  function next() {
    slider.current.slickNext();
  }
  function previous() {
    slider.current.slickPrev();
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
  useEffect(() => {
    AOS.init();
  }, []);
  const sliderRef: any = useRef();
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

        <Secondsection>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} lg={6} xl={6}>
              <Box
                data-aos="fade-right"
                data-aos-offset="500"
                data-aos-easing="ease-in-sine"
                data-aos-duration="800"
              >
                <img
                  src="/assets/buyerlaptopimg2.svg"
                  alt=""
                  style={{ width: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6} xl={6} mb={5}>
              <Padding20px>
                <Box>
                  <IndusterialText>
                    INDUSTRIAL EXPERTS, NOW A TOUCH AWAY!!!
                  </IndusterialText>
                  <Industerialparagraph>
                    We understand the constant problems buyers and sellers are
                    facing in the industry while sourcing and procuring for
                    their companies with our diversified experience. Hence, we
                    have developed a platform to cut those lead and wait times
                    between buying and selling of products with everything
                    automated on a unified platform.
                  </Industerialparagraph>
                </Box>
                <Box>
                  <TableContainer>
                    <Table>
                      <TableRow>
                        <Tablecellborder>
                          <TablecellBox>
                            <Star />
                            Certified Expertise
                          </TablecellBox>
                        </Tablecellborder>
                        <Tablecellborder>
                          <TablecellBox>
                            <Star />
                            Certified Expertise
                          </TablecellBox>
                        </Tablecellborder>
                      </TableRow>
                      <TableRow>
                        <Tablecellborder>
                          <TablecellBox>
                            <Star />
                            Certified Expertise
                          </TablecellBox>
                        </Tablecellborder>
                        <Tablecellborder>
                          <TablecellBox>
                            <Star />
                            Certified Expertise
                          </TablecellBox>
                        </Tablecellborder>
                      </TableRow>
                      <TableRow>
                        <Tablecellborder>
                          <TablecellBox>
                            <Star />
                            Certified Expertise
                          </TablecellBox>
                        </Tablecellborder>
                        <Tablecellborder>
                          <TablecellBox>
                            <Star />
                            Certified Expertise
                          </TablecellBox>
                        </Tablecellborder>
                      </TableRow>
                    </Table>
                  </TableContainer>
                </Box>
                <SecondsectionParabox>
                  <SecondsectionPara>
                    Merchant AD facilitates an integrated platform that eases
                    the availability of spare parts, components and services to
                    the Power Generation, Oil & Energy, Water & Wastewater
                    management sectors.
                  </SecondsectionPara>
                </SecondsectionParabox>
                <DiscoverMoreBox>
                  <ButtonoverCard>
                    <ArrowCircleRightOutlinedIcon
                      sx={{ margin: "0 4px 0 0", fontSize: "19px" }}
                    />
                    <ButtonText>Discover More</ButtonText>
                    <TypographyBorderline
                      component="span"
                    ></TypographyBorderline>
                  </ButtonoverCard>
                </DiscoverMoreBox>
              </Padding20px>
            </Grid>
          </Grid>
        </Secondsection>

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
              <Box sx={{ textAlign: "center" }}>
                <img
                  src="/assets/buyerlaptopimg.svg"
                  alt=""
                  style={{ width: "70%" }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ backgroundColor: "#EDFAFE", padding: "40px 0px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              "@media screen and (max-width:600px)": {
                padding: "0px 20px",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#d7282f",
                textTransform: "uppercase",
              }}
            >
              Merchant AD{" "}
              <span style={{ color: "#4a4a4a" }}>| SELLER PORTAL</span>
            </Typography>
            <GrowYourBusiness>
              Grow your business with the best suite tools
            </GrowYourBusiness>
            <Typography
              sx={{ fontSize: "18px", fontWeight: "400", color: "#4a4a4a" }}
            >
              Now, giving your product the global market has become very simple.
              Follow below for professional and dynamic tools.
            </Typography>
          </Box>
          <Container maxWidth="xl">
            <Box sx={{ marginTop: "60px" }}>
              <Box sx={{ width: "100%" }}>
                <Box sx={{}}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    variant="scrollable"
                    scrollButtons
                    sx={{
                      "& .MuiTab-root.Mui-selected": {
                        color: "#d7282f",
                      },
                      "& .MuiTabs-indicator": {
                        backgroundColor: "#d7282f",
                      },
                    }}
                  >
                    <TabSection
                      label="Your Virtual Store"
                      {...a11yProps(0)}
                    />
                    <TabSection
                      label="Dynamic Pricing Tool"
                      {...a11yProps(1)}
                    />
                    <TabSection
                      label="Auto Quoting Setup"
                      {...a11yProps(2)}
                    />
                    <TabSection
                      label="Pricing Engine"
                      {...a11yProps(3)}
                    />
                    <TabSection
                      label="Buyer Database"
                      {...a11yProps(4)}
                    />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <Box mt={5}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={12} lg={5} xl={5}>
                        <FlexBox>
                          <FlexImageBox>
                            <img src="/assets/sellertabpng.png" alt="" />
                          </FlexImageBox>
                          <Box>
                            <FlexBoxText>Create Your Profile</FlexBoxText>
                            <FlexBoxSubText>
                              Give basic details of your company and get
                              registered with us.
                            </FlexBoxSubText>
                          </Box>
                        </FlexBox>
                        <FlexBox>
                          <FlexImageBox>
                            <img src="/assets/sellertabpng1.png" alt="" />
                          </FlexImageBox>
                          <Box>
                            <FlexBoxText>Create Your Products</FlexBoxText>
                            <FlexBoxSubText>
                              Add your product details from your Dashboard in
                              500+ categories.
                            </FlexBoxSubText>
                          </Box>
                        </FlexBox>
                        <FlexBox>
                          <FlexImageBox>
                            <img src="/assets/sellertabpng.png" alt="" />
                          </FlexImageBox>
                          <Box>
                            <FlexBoxText>Company Profile</FlexBoxText>
                            <FlexBoxSubText>
                              Fill in your company info and gain trust from
                              buyers.
                            </FlexBoxSubText>
                          </Box>
                        </FlexBox>
                        <FlexBox>
                          <FlexImageBox>
                            <img src="/assets/sellertabpng.png" alt="" />
                          </FlexImageBox>
                          <Box>
                            <FlexBoxText>Dynamic pricing</FlexBoxText>
                            <FlexBoxSubText>
                              Discount products according to your target market.
                            </FlexBoxSubText>
                          </Box>
                        </FlexBox>
                        <FlexBox>
                          <FlexImageBox>
                            <img src="/assets/sellertabpng.png" alt="" />
                          </FlexImageBox>
                          <Box>
                            <FlexBoxText>Chat With Buyer</FlexBoxText>
                            <FlexBoxSubText>
                              Immediately connect with buyers to understand
                              their requirement and sort them in seconds.
                            </FlexBoxSubText>
                          </Box>
                        </FlexBox>
                        <TabButtonBox>
                          <ButtonoverCard>
                            <ArrowCircleRightOutlinedIcon
                              sx={{ margin: "0 4px 0 0", fontSize: "19px" }}
                            />
                            <ButtonText>Learn More</ButtonText>
                            <TypographyBorderline
                              component="span"
                            ></TypographyBorderline>
                          </ButtonoverCard>
                        </TabButtonBox>
                      </Grid>
                      <Grid item xs={12} sm={12} lg={7} xl={7}>
                        <Sliderbox
                          data-aos="fade-left"
                          data-aos-offset="500"
                          data-aos-easing="ease-in-sine"
                          data-aos-duration="800"
                        >
                          <img
                            src="/assets/sellertabpng2.png"
                            alt=""
                            style={{ width: "100%" }}
                          />
                        </Sliderbox>
                      </Grid>
                    </Grid>
                  </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  Item Two
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  Item Three
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                  Item Three
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                  Item Three
                </CustomTabPanel>
              </Box>
            </Box>
          </Container>
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
                  <OneBox data-aos="fade-down" data-aos-duration="800">
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
                  <OneBox data-aos="fade-up" data-aos-duration="800">
                    <One>2</One>
                  </OneBox>
                </Buttonbox>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <Box>
                  <OneBox data-aos="fade-down" data-aos-duration="800">
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
                      portal. Get access to them for a hassle free virtual.
                    </LeandAndOpportunitiesText>
                  </Uppertextbox>
                  <Linebox>
                    <Outerbox>
                      <Innerbox></Innerbox>
                    </Outerbox>
                  </Linebox>
                  <OneBox data-aos="fade-up" data-aos-duration="800">
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
