import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import {
  AccordionDetails,
  Box,
  Button,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  List,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import React from "react";
import {
  AccordionAnswer,
  AccordionHead,
  AccordionQuestion,
  Accordionsection,
  AccordionsummaryIcon,
  BannerTxt,
  Bgimage1,
  Boxheading,
  Boxtext,
  CheckBox,
  CheckBox2,
  CheckBoxicon1,
  CheckBoxicon2,
  Faqsecondheading,
  Grid2text,
  Grid2text2,
  GridImages,
  GridStyle,
  GridStyle2,
  Gridbox,
  Happywithcustomers,
  HappywithcustomersRed,
  Heading,
  IOSSwitch,
  ImageBox,
  Listitemstext,
  NameDesignation,
  NameHeading,
  Newsection,
  Newsectiontext,
  Newsectiontext2,
  Permonth,
  PlanButtons,
  Plancardbox,
  Plancost,
  Plancostcurrency,
  Planshead,
  PlansheadBold,
  Planssubhead,
  Planssubheadred,
  SecondSection,
  Sliderbox,
  SliderboxDots,
  Sliderboxstyle,
  StyledTableCell,
  StyledTableRow,
  Textbox,
  Textoverimg1,
  Textoverimg2,
  Upgradebtton,
  WedontText,
  Whatourclient,
} from "./style";
const MainButton = {
  borderRadius: "26px",
  fontSize: "18px",
  flexDirection: " row",
  alignItems: "center",
  padding: "15px 20px",
  height: "50px",
  background: "#FFFFFF",
  border: "1px solid #D7282F",
  boxShadow: "0px 0px 30px 0px rgba(215, 40, 47, 0.25)",
  textTransform: "math-auto",
  marginTop: "40px 0px",
  color: "#d7282f",
  fontWeight: "600",
};

export default function PlanAndPricing() {
  const [anchorEl, setAnchorEl] = React.useState(true);
  const open = Boolean(anchorEl);
  const handleClick = () => {
    setAnchorEl(!anchorEl);
  };
  const [expanded, setExpanded] = React.useState(false);
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);
  const [expanded4, setExpanded4] = React.useState(false);
  const [expanded5, setExpanded5] = React.useState(false);

  return (
    <>
      <Box sx={{ backgroundColor: "#fff" }}>
        <Box>
          <Bgimage1>
            <BannerTxt>
              <Box>
                <Textoverimg1>Get Best Plans & Price</Textoverimg1>
                <Textoverimg2>Home / Plan and pricing</Textoverimg2>
              </Box>
            </BannerTxt>
          </Bgimage1>
        </Box>
        <Sliderbox>
          <SliderboxDots>
            <Sliderboxstyle></Sliderboxstyle>
            <Sliderboxstyle></Sliderboxstyle>
            <Sliderboxstyle></Sliderboxstyle>
          </SliderboxDots>
        </Sliderbox>
        <SecondSection>
          <Heading>Merchant AD | Let’s talk shop</Heading>
          <Typography>
            Whether you’re a business or a casual seller, we offer a Store
            subscription with the right tools and benefits to help you grow your
            sales.
          </Typography>
        </SecondSection>
        <Container maxWidth={"xl"} sx={{ marginTop: "-20px" }}>
          <img src="/assets/arrowforplans.svg" alt="" />
        </Container>
        <Container maxWidth={"xl"}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Gridbox>
                <ImageBox>
                  <img src="/assets/imageforplans.svg" alt="" />
                </ImageBox>
                <Textbox>
                  <Boxheading>Your Own Online Store</Boxheading>
                  <Boxtext>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Excepturi vero aliquam id. Lorem ipsum dolor sit amet. Lorem
                    ipsum dolor content here.
                  </Boxtext>
                </Textbox>
              </Gridbox>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Gridbox>
                <ImageBox>
                  <img src="/assets/imageforplans.svg" alt="" />
                </ImageBox>
                <Textbox>
                  <Boxheading>Your Own Online Store</Boxheading>
                  <Boxtext>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Excepturi vero aliquam id. Lorem ipsum dolor sit amet. Lorem
                    ipsum dolor content here.
                  </Boxtext>
                </Textbox>
              </Gridbox>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Gridbox>
                <ImageBox>
                  <img src="/assets/imageforplans.svg" alt="" />
                </ImageBox>
                <Textbox>
                  <Boxheading>Your Own Online Store</Boxheading>
                  <Boxtext>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Excepturi vero aliquam id. Lorem ipsum dolor sit amet. Lorem
                    ipsum dolor content here.
                  </Boxtext>
                </Textbox>
              </Gridbox>
            </Grid>
          </Grid>
        </Container>

        <Accordionsection sx={{ marginTop: "100px" }}>
          <Container maxWidth={"xl"}>
            <Box sx={{ textAlign: "center" }}>
              <Planshead>
                The <PlansheadBold>best work </PlansheadBold> solution,
              </Planshead>
              <Planssubhead>
                for the <Planssubheadred>Best Price</Planssubheadred>
                <img src="/assets/shape2forplan.svg" alt="" />
              </Planssubhead>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={2.4}
                  lg={2.4}
                  xl={2.4}
                  sx={{ display: "flex", alignItems: "stretch" }}
                >
                  <Plancardbox>
                    <Box>
                      <Plancost>
                        <Plancostcurrency>$</Plancostcurrency>10
                      </Plancost>
                    </Box>
                    <Box>
                      <Permonth>per month Billed Annually</Permonth>
                    </Box>
                    <Box>
                      <FormGroup>
                        <Stack
                          direction={"row"}
                          spacing={1}
                          alignItems={"center"}
                        >
                          <Typography>Yearly</Typography>
                          <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                            label=""
                          />
                          <Typography>Monthly</Typography>
                        </Stack>
                      </FormGroup>
                    </Box>
                    <Box sx={{ marginTop: "30px" }}>
                      <PlanButtons>Basic</PlanButtons>
                    </Box>
                    <Box>
                      <List>
                        <Listitemstext>Simple product post</Listitemstext>
                        <Listitemstext>Varient product post</Listitemstext>
                        <Listitemstext>
                          Maximum allowed photo size
                        </Listitemstext>
                        <Listitemstext>--</Listitemstext>
                        <Listitemstext>--</Listitemstext>
                        <Listitemstext>--</Listitemstext>
                        <Listitemstext>--</Listitemstext>
                        <Listitemstext>--</Listitemstext>
                        <Listitemstext>--</Listitemstext>
                        <Listitemstext>--</Listitemstext>
                        <Listitemstext>--</Listitemstext>
                        <Listitemstext>--</Listitemstext>
                        <Listitemstext>--</Listitemstext>
                        <Listitemstext>--</Listitemstext>
                        <Listitemstext>--</Listitemstext>
                        <Listitemstext>--</Listitemstext>
                        <Listitemstext>--</Listitemstext>
                        <Listitemstext>--</Listitemstext>
                        <Listitemstext>--</Listitemstext>
                        <Listitemstext>--</Listitemstext>
                        <Listitemstext>--</Listitemstext>
                        <Listitemstext>--</Listitemstext>
                      </List>
                    </Box>
                    <Box>
                      <Upgradebtton>Upgrade</Upgradebtton>
                    </Box>
                  </Plancardbox>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ textAlign: "center", my: 5 }}>
              <Box>
                <Button
                  sx={MainButton}
                  id="demo-customized-button"
                  aria-controls={open ? "demo-customized-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  disableElevation
                  onClick={handleClick}
                  endIcon={
                    open ? (
                      <KeyboardArrowUpOutlinedIcon sx={{ fontSize: "26px" }} />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )
                  }
                >
                  Complete Feature List
                </Button>
              </Box>
              {anchorEl ? (
                <Box mt={6} sx={{ backgroundColor: "" }}>
                  <TableContainer>
                    <Table aria-label="simple table">
                      <TableHead sx={{ height: "80px", borderRadius: "10px" }}>
                        <StyledTableRow>
                          <StyledTableCell></StyledTableCell>
                          <StyledTableCell>Startup</StyledTableCell>
                          <StyledTableCell>Basic</StyledTableCell>
                          <StyledTableCell>Professional</StyledTableCell>
                          <StyledTableCell>Standard</StyledTableCell>
                          <StyledTableCell>Pro</StyledTableCell>
                        </StyledTableRow>
                      </TableHead>
                      <TableBody>
                        <StyledTableRow>
                          <TableCell>Simple product Post  </TableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox>
                                <CheckBoxicon1></CheckBoxicon1>
                              </CheckBox>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox>
                                <CheckBoxicon1></CheckBoxicon1>
                              </CheckBox>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox>
                                <CheckBoxicon1></CheckBoxicon1>
                              </CheckBox>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox>
                                <CheckBoxicon1></CheckBoxicon1>
                              </CheckBox>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox>
                                <CheckBoxicon1></CheckBoxicon1>
                              </CheckBox>
                            </Box>
                          </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <TableCell>Simple product Post</TableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox>
                                <CheckBoxicon1></CheckBoxicon1>
                              </CheckBox>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox>
                                <CheckBoxicon1></CheckBoxicon1>
                              </CheckBox>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox>
                                <CheckBoxicon1></CheckBoxicon1>
                              </CheckBox>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox>
                                <CheckBoxicon1></CheckBoxicon1>
                              </CheckBox>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox>
                                <CheckBoxicon1></CheckBoxicon1>
                              </CheckBox>
                            </Box>
                          </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <TableCell>Simple product Post</TableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox>
                                <CheckBoxicon1></CheckBoxicon1>
                              </CheckBox>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox>
                                <CheckBoxicon1></CheckBoxicon1>
                              </CheckBox>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox>
                                <CheckBoxicon1></CheckBoxicon1>
                              </CheckBox>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox>
                                <CheckBoxicon1></CheckBoxicon1>
                              </CheckBox>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox>
                                <CheckBoxicon1></CheckBoxicon1>
                              </CheckBox>
                            </Box>
                          </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <TableCell>Simple product Post</TableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox2>
                                <CheckBoxicon2></CheckBoxicon2>
                              </CheckBox2>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox2>
                                <CheckBoxicon2></CheckBoxicon2>
                              </CheckBox2>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox2>
                                <CheckBoxicon2></CheckBoxicon2>
                              </CheckBox2>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox2>
                                <CheckBoxicon2></CheckBoxicon2>
                              </CheckBox2>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox2>
                                <CheckBoxicon2></CheckBoxicon2>
                              </CheckBox2>
                            </Box>
                          </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <TableCell>Simple product Post</TableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox2>
                                <CheckBoxicon2></CheckBoxicon2>
                              </CheckBox2>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox2>
                                <CheckBoxicon2></CheckBoxicon2>
                              </CheckBox2>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox2>
                                <CheckBoxicon2></CheckBoxicon2>
                              </CheckBox2>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox2>
                                <CheckBoxicon2></CheckBoxicon2>
                              </CheckBox2>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <CheckBox2>
                                <CheckBoxicon2></CheckBoxicon2>
                              </CheckBox2>
                            </Box>
                          </StyledTableCell>
                        </StyledTableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              ) : null}
            </Box>
          </Container>
        </Accordionsection>
        <Box>
          <Newsection>
            <Container maxWidth={"xl"}>
              <Box>
                <Newsectiontext>Merchant AD |</Newsectiontext>
                <Newsectiontext2>
                  A few things to consider when choosing your MerchantAD Store
                </Newsectiontext2>
              </Box>
              <Box mt={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Box>
                        <GridImages>
                          <img src="/assets/checkforplans.svg" alt="" />
                        </GridImages>
                      </Box>
                      <Box>
                        <Box>
                          <Grid2text>
                            How many free listings do you need?
                          </Grid2text>
                          <Grid2text2>
                            Do the math to see if you need the allotted zero fee
                            insertions—sometimes fewer free listings can
                            actually save you money.
                          </Grid2text2>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Box>
                        <GridImages>
                          <img src="/assets/checkforplans.svg" alt="" />
                        </GridImages>
                      </Box>
                      <Box>
                        <Box>
                          <Grid2text>
                            How many free listings do you need?
                          </Grid2text>
                          <Grid2text2>
                            Do the math to see if you need the allotted zero fee
                            insertions—sometimes fewer free listings can
                            actually save you money.
                          </Grid2text2>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Box>
                        <GridImages>
                          <img src="/assets/checkforplans.svg" alt="" />
                        </GridImages>
                      </Box>
                      <Box>
                        <Box>
                          <Grid2text>
                            How many free listings do you need?
                          </Grid2text>
                          <Grid2text2>
                            Do the math to see if you need the allotted zero fee
                            insertions—sometimes fewer free listings can
                            actually save you money.
                          </Grid2text2>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Newsection>
        </Box>
        <Box>
          <Accordionsection>
            <Container maxWidth={"xl"}>
              <SecondSection>
                <Heading>Merchant AD | FAQ's</Heading>
                <Faqsecondheading>
                  Have questions? We're here to help.
                </Faqsecondheading>
              </SecondSection>
              <Box mt={2}>
                <AccordionHead
                  expanded={expanded}
                  onChange={(e) => setExpanded((prev) => !prev)}
                >
                  <AccordionsummaryIcon
                    expandIcon={
                      expanded ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <AccordionQuestion>
                      Can I upgrade myself or do I have to upgrade my entire
                      Workspace?
                    </AccordionQuestion>
                  </AccordionsummaryIcon>
                  <AccordionDetails>
                    <AccordionAnswer>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </AccordionAnswer>
                  </AccordionDetails>
                </AccordionHead>
              </Box>
              <Box mt={2}>
                <AccordionHead onChange={(e) => setExpanded1((prev) => !prev)}>
                  <AccordionsummaryIcon
                    expandIcon={
                      expanded1 ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <AccordionQuestion>
                      How do I edit or cancel my Store subscription?
                    </AccordionQuestion>
                  </AccordionsummaryIcon>
                  <AccordionDetails>
                    <AccordionAnswer>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </AccordionAnswer>
                  </AccordionDetails>
                </AccordionHead>
              </Box>
              <Box mt={2}>
                <AccordionHead onChange={(e) => setExpanded2((prev) => !prev)}>
                  <AccordionsummaryIcon
                    expandIcon={
                      expanded2 ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <AccordionQuestion>
                      Are all suppliers verified on powercozmo?
                    </AccordionQuestion>
                  </AccordionsummaryIcon>
                  <AccordionDetails>
                    <AccordionAnswer>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </AccordionAnswer>
                  </AccordionDetails>
                </AccordionHead>
              </Box>
              <Box mt={2}>
                <AccordionHead onChange={(e) => setExpanded3((prev) => !prev)}>
                  <AccordionsummaryIcon
                    expandIcon={
                      expanded3 ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <AccordionQuestion>
                      Are all suppliers verified on powercozmo?
                    </AccordionQuestion>
                  </AccordionsummaryIcon>
                  <AccordionDetails>
                    <AccordionAnswer>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </AccordionAnswer>
                  </AccordionDetails>
                </AccordionHead>
              </Box>
              <Box mt={2}>
                <AccordionHead onChange={(e) => setExpanded4((prev) => !prev)}>
                  <AccordionsummaryIcon
                    expandIcon={
                      expanded4 ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <AccordionQuestion>
                      Are all suppliers verified on powercozmo?
                    </AccordionQuestion>
                  </AccordionsummaryIcon>
                  <AccordionDetails>
                    <AccordionAnswer>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </AccordionAnswer>
                  </AccordionDetails>
                </AccordionHead>
              </Box>
              <Box mt={2}>
                <AccordionHead onChange={(e) => setExpanded5((prev) => !prev)}>
                  <AccordionsummaryIcon
                    expandIcon={
                      expanded5 ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <AccordionQuestion>
                      Are all suppliers verified on powercozmo?
                    </AccordionQuestion>
                  </AccordionsummaryIcon>
                  <AccordionDetails>
                    <AccordionAnswer>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </AccordionAnswer>
                  </AccordionDetails>
                </AccordionHead>
              </Box>
            </Container>
          </Accordionsection>
        </Box>
        <Box>
          <Grid container spacing={2} mt={5}>
            <GridStyle item xs={12} sm={12} lg={6} xl={6}>
              <Box sx={{}}>
                <Box>
                  <Whatourclient>What Our Client Say</Whatourclient>
                </Box>
                <Box>
                  <Happywithcustomers>
                    Happy With{" "}
                    <HappywithcustomersRed>Customers</HappywithcustomersRed> &{" "}
                    <HappywithcustomersRed>Clients</HappywithcustomersRed>
                  </Happywithcustomers>
                </Box>
              </Box>
            </GridStyle>
            <GridStyle2 item xs={12} sm={12} lg={6} xl={6}>
              <Box sx={{ padding: "50px 40px 30px 100px" }}>
                <img src="/assets/plansdemoimage.svg" alt="" />
                <WedontText>
                  “We don't take ourselves too seriously, but seriously enough
                  to ensure we're creating the best product and experience for
                  our customers. I feel like Help Scout does the same.”
                </WedontText>
                <Box mt={3}>
                  <img src="/assets/5starforplan.svg" alt="" />
                </Box>
                <Box>
                  <NameHeading>Aamina Ahmed</NameHeading>
                  <NameDesignation>
                    Head Of IT, First Round Capital
                  </NameDesignation>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  <Box sx={{ position: "relative" }}>
                    <img src="/assets/smallimgforplan.svg" alt="" />
                    <Box
                      style={{ position: "absolute", top: "25%", right: "35%" }}
                    >
                      <img src="/assets/quoteforplan.svg" alt="" />
                    </Box>
                  </Box>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <ArrowBackOutlinedIcon sx={{ color: "#4a4a4a" }} />
                  <Box
                    sx={{
                      height: "15px",
                      border: "1px solid #4A4A4A",
                      marginX: "10px",
                    }}
                  ></Box>
                  <ArrowForwardOutlinedIcon sx={{ color: "#4a4a4a" }} />
                </Box>
              </Box>
            </GridStyle2>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
