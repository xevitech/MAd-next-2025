import React, { useEffect, useState } from "react";
import Template from "./template.module.css";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  Textlink,
  useStyles,
  FooterCol,
  SocialIcons,
  CopyrightTxt,
} from "../guestLayout/landingPage/styles";
import Link from "next/link";

import { Tabs } from "@mui/material";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');
</style>;

function createData(
  name,
  calories,
  next,
  carbs,
  protein,
  caries,
  matt,
  card,
  prot
) {
  return { name, calories, next, carbs, protein, caries, matt, card, prot };
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
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

const rows = [
  createData(<b>DN</b>, "", "DE", "e", "DS", "LS", "m", "θ", "c"),
  createData(<b>mm</b>, "", "mm", "mm", "mm", "mm", "kg", "deg", "mm"),
  createData(<b>θ80</b>, "C40", "mm", 45, 55, 85, 9.8, 5, "3±1"),
  createData(<b>θ100</b>, "C40", 118, 4.7, 4.44, 163, 88, 5, "3±1"),
  createData(<b>θ125</b>, "C40", 1.0, 419, 349, 16.0, 19, 5, "3±1"),
  createData(<b>θ150</b>, "C40", 160, 49, 5.59, 16.0, 29, 5, "3±1"),
  createData(<b>θ200</b>, "C40", 15.0, 49, 39, 16.0, 44, 5, "3±1"),
  createData(<b>θ250</b>, "C40", 10, 49, 90, 16.0, 49, 5, "3±1"),
  createData(<b>θ300</b>, "C40", 165, 49, 319, 16.0, 50, 5, "3±1"),
];

const fitting = (props: TabPanelProps) => {
  const [domLoaded, setDomLoaded] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const { classes } = useStyles();
  return (
    <>
      {domLoaded && (
        <div className={Template.page_container}>
          <Grid container>
            <Grid item xs={12}>
              <div className={Template.banner}>
                <img
                  className={Template.overlay}
                  src="/assets/cms-img/fittingpipe.jpg"
                  alt="Pipes"
                  title="Pipes Image"
                />
                <div className={Template.banner_txt}>
                  <Typography sx={{ fontSize: "45px !important" }}>
                    Ductile Iron Fittings
                  </Typography>
                  <Typography sx={{ fontSize: "24px !important", mt: 2 }}>
                    Merchant AD Water and Wastewater management portfolio
                    providing complete{" "}
                    <span className={Template.fittingred}>Fittings</span>{" "}
                    solutions
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>

          <div className={Template.service_sec}>
            <div className={Template.service_secinn}>
              <Container maxWidth="lg">
                <Grid container spacing={2}>
                  <Grid item xs={6} mt={2.9}>
                    <div>
                      <h2>
                        We Guarantee Best price, Top industry quality, extensive
                        inventory holding{" "}
                        <span className={Template.headingfwNfs}>
                          {" "}
                          to meet demands at earliest, the best motives at
                        </span>{" "}
                        <span className={Template.PWred}>
                          {" "}
                          Merchant AD.
                        </span>{" "}
                      </h2>
                      <h4 className={Template.common_head}>OVERVIEW</h4>
                      <Typography className={Template.paragraph}>
                        Ductile Iron Fittings are facilitating components for
                        pipeline infrastructure and helps complete the system.
                        They allow pipeline connections to higher angular
                        deflections, above the standard pipeline deflection,
                        vary flow, overcome offsets, dissimilarity. For shorter
                        radius curve lines with larger angles Fittings are best
                        suitable option for pipe installation and assembly.
                      </Typography>
                      <Typography className={Template.paragraph} mt={3}>
                        <b>10,000+ fittings</b> are contained in{" "}
                        <b>Merchant AD Ductile Iron</b> portfolio with varying
                        dimensions, designs, end types, flow way directions,
                        flow reductions and transitions, basically entire range
                        of fittings that will fit and serve for any type of
                        complex pipeline configurations, layout, and process
                        requirements.
                      </Typography>
                      <Typography className={Template.paragraph} mt={3}>
                        Our Ductile Iron and Fittings products are 100 years+
                        lasting. With conventional, strengthening, and special
                        coatings, pipeline and fittings are covered despite when
                        external injuries are occurred.
                      </Typography>
                      <Typography className={Template.paragraph} mt={3}>
                        Serving with highest component range, dimension
                        configurations with innovative solutions and high-tech
                        engineering makes us the core part of Middle East
                        Pipeline and Infrastructure projects.
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div>
                      <h4 className={Template.middleEastfw}>
                        Middle East most trusted supplier, now Widening market
                        Globally.
                      </h4>
                    </div>
                    <div className={Template.BothImage}>
                      <img
                        className={Template.SecondSectionImg3}
                        src="/assets/cms-img/doubleflenged.jpg"
                        alt=""
                      />
                      <img
                        className={`${Template.SecondSectionSettingImg2} ${Template.Applogo2}`}
                        src="/assets/cms-img/pattern-4.png"
                        alt="Setting Image"
                      />
                    </div>
                    <Button
                      className={Template.redcolor}
                      variant="contained"
                      endIcon={<ArrowForwardOutlinedIcon />}
                      sx={{
                        mt: 8,
                        textTransform: "capitalize",
                        border: "1px solid red",
                      }}
                    >
                      Contact Us today
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            </div>
          </div>
          {/* END Second Section part*/}
          {/* START Water Pro Characteristics part*/}
          <Container maxWidth="lg" sx={{ mt: 10 }}>
            <Grid item xs={12} md={6} sm={12}>
              <div>
                <h4 className={Template.common_head}>
                  Merchant AD DUCTILE IRON CHARACTERISTICS
                </h4>
              </div>
              <div id="ThirdSection">
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Box className={Template.BlockIcons}>
                      <img
                        className={Template.BlockIconImg}
                        src="/assets/cms-img/regulation.png"
                        alt=""
                        width="65"
                        height="65"
                      />
                      <Box className={Template.textmarginleft}>
                        <p className={Template.Htext}>Soil Conditions</p>
                        <p className={Template.normal_Textcolor}>
                          Proven rigidity and longevity under medium-aggressive
                          soil conditions, all corrosion loads and environmental
                          effects like water, ambient temperature,
                        </p>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box className={Template.BlockIcons}>
                      <img
                        className={Template.BlockIconImg}
                        src="/assets/cms-img/highpressure.png"
                        alt=""
                        width="65"
                        height="65"
                      />
                      <Box className={Template.textmarginleft}>
                        <p className={Template.Htext}>Traffic Load Proofing.</p>
                        <p className={Template.normal_Textcolor}>
                          Above and below ground applications with traffic load
                          proofing.
                        </p>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box className={Template.BlockIcons}>
                      <img
                        className={Template.BlockIconImg}
                        src="/assets/cms-img/trafficloader.png"
                        alt=""
                        width="65"
                        height="65"
                      />
                      <Box className={Template.textmarginleft}>
                        <p className={Template.Htext}>Material Brand</p>
                        <p className={Template.normal_Textcolor}>
                          Carries the ductile iron material brand parameters
                          rigidity, ductility, and durability.
                        </p>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box className={Template.BlockIcons}>
                      <img
                        className={Template.BlockIconImg}
                        src="/assets/cms-img/feasibility.png"
                        alt=""
                        width="65"
                        height="65"
                      />
                      <Box className={Template.textmarginleft}>
                        <p className={Template.Htext}>Proofing Products</p>
                        <p className={Template.normal_Textcolor}>
                          Tightness and leak proofing products at Merchant AD,
                          to avoid operational losses.
                        </p>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box className={Template.BlockIcons}>
                      <img
                        className={Template.BlockIconImg}
                        src="/assets/cms-img/suitable.png"
                        alt=""
                        width="65"
                        height="65"
                      />
                      <Box className={Template.textmarginleft}>
                        <p className={Template.Htext}>Pipeline Design</p>
                        <p className={Template.normal_Textcolor}>
                          Higher axial deflections so the pipeline design and
                          network can be facilitated.
                        </p>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box className={Template.BlockIcons}>
                      <img
                        className={Template.BlockIconImg}
                        src="/assets/cms-img/pcstrength.png"
                        alt=""
                        width="65"
                        height="65"
                      />
                      <Box className={Template.textmarginleft}>
                        <p className={Template.Htext}>
                          Merchant AD DI Fittings
                        </p>
                        <p className={Template.normal_Textcolor}>
                          Merchant AD DI Fittings undergo uncompromised quality
                          assurance and testing procedures.
                        </p>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Container>
          {/* END Water Pro Characteristics part*/}

          <Container maxWidth="lg" sx={{ mt: 10 }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Box>
                  <h4 className={Template.common_head}>
                    SPECIFICATIONS AND STANDARDIZATIONS
                  </h4>
                </Box>
                <Box>
                  <Box>
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography sx={{ fontSize: "20px !important" }}>
                          Dimensions and Configuration
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p className={Template.normal_Textcolor}>
                          <CircleOutlinedIcon
                            sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                          />{" "}
                          Fittings for pipeline sizes from DN80 up to DN2600
                          with entire range of standardized lengths.
                        </p>
                        <p className={Template.normal_Textcolor}>
                          <CircleOutlinedIcon
                            sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                          />{" "}
                          Fittings including all possible configurations and
                          angular deflections, branches among flanges, bends,
                          tees, crosses, collars, reducers.
                        </p>
                        <p className={Template.normal_Textcolor}>
                          <CircleOutlinedIcon
                            sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                          />{" "}
                          Deflection angles varying from 11.250 to 900 and end
                          configurations of fittings include socket, flange,
                          collar, bell end are available in our ready stock.
                        </p>
                        <p className={Template.normal_Textcolor}>
                          <CircleOutlinedIcon
                            sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                          />{" "}
                          Long, short, radial, linear and hydrant profile
                          variants among the products are also offered.
                        </p>
                      </AccordionDetails>
                    </Accordion>
                  </Box>

                  <Box mt={4}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        aria-expanded={true}
                      >
                        <Typography sx={{ fontSize: "20px !important" }}>
                          Standard Certifications
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p className={Template.normal_Textcolor}>
                          <CircleOutlinedIcon
                            sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                          />
                          Design standard requirements are available in
                          exceeding to ISO2531 and EN545.
                        </p>
                        <p className={Template.normal_Textcolor}>
                          <CircleOutlinedIcon
                            sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                          />
                          Flange drill standards are available with PN10, PN16,
                          PN25, PN40.
                        </p>
                        <p className={Template.normal_Textcolor}>
                          <CircleOutlinedIcon
                            sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                          />
                          Barrel thickness dimensions are adapting ISO 2531 – K
                          series classification for all the fittings.
                        </p>
                        <p className={Template.normal_Textcolor}>
                          <CircleOutlinedIcon
                            sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                          />
                          Coatings and linings provided are adhered to ISO 2531
                          and EN545.
                        </p>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <img
                    src="/assets/cms-img/socket90d.jpg"
                    alt=""
                    width="100%"
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>

          {/* tab section */}
          <Box
            sx={{
              backgroundColor: "#EDF0F2",
              pb: 14,
              position: "relative",
              width: "100%",
            }}
          >
            <Box
              sx={{
                borderRadius: "10px",
                p: 4,
                width: "50%",
                margin: "0px auto",
                position: "absolute",
                bottom: "-12%",
                right: "27%",
                backgroundColor: "#D7282F",
                color: "#ffff",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={9}>
                  <Typography className={Template.absolutetext}>
                    With our one stop solution access for Water and wastewater
                    management systems at Merchant AD, you could find products
                    for every layout, design, and networking requirements.
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Box>
                    <Typography className={Template.callus}>
                      Call us now
                    </Typography>
                    <Typography className={Template.phnumber}>
                      +962-78-7000500
                    </Typography>
                    <Button
                      className={Template.redcolor2}
                      variant="outlined"
                      endIcon={<ArrowForwardOutlinedIcon />}
                    >
                      Contact us today
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Container maxWidth="lg" sx={{ mt: 10 }} className={Template.bgmap}>
              <Grid container spacing={2} className={Template.bgmap}>
                <Grid item xs={12}>
                  <Box>
                    <h4 className={Template.common_head}>FITTINGS PORTFOLIO</h4>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{}}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        sx={{
                          "& .MuiTabs-indicator": { display: "none" },
                          "& .MuiTab-root.Mui-selected": {
                            color: "white",
                            backgroundColor: "black",
                          },
                        }}
                      >
                        <Tab
                          label="BENDS"
                          {...a11yProps(0)}
                          sx={{
                            "&:hover": {
                              backgroundColor: "black",
                              color: "white",
                              opacity: 1,
                            },
                          }}
                        />
                        <Tab
                          label="TEES"
                          {...a11yProps(1)}
                          sx={{
                            "&:hover": {
                              backgroundColor: "black",
                              color: "white",
                              opacity: 1,
                            },
                          }}
                        />
                        <Tab
                          label="FLANGES"
                          {...a11yProps(2)}
                          sx={{
                            "&:hover": {
                              backgroundColor: "black",
                              color: "white",
                              opacity: 1,
                            },
                          }}
                        />
                        <Tab
                          label="CROSSES"
                          {...a11yProps(3)}
                          sx={{
                            "&:hover": {
                              backgroundColor: "black",
                              color: "white",
                              opacity: 1,
                            },
                          }}
                        />
                        <Tab
                          label="PADDLE PIPES"
                          {...a11yProps(4)}
                          sx={{
                            "&:hover": {
                              backgroundColor: "black",
                              color: "white",
                              opacity: 1,
                            },
                          }}
                        />
                        <Tab
                          label="REDUCERS/TAPERS"
                          {...a11yProps(5)}
                          sx={{
                            "&:hover": {
                              backgroundColor: "black",
                              color: "white",
                              opacity: 1,
                            },
                          }}
                        />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <Grid
                        container
                        spacing={3}
                        display="flex"
                        alignItems="center"
                      >
                        <Grid item xs={8}>
                          <p className={Template.tabtext}>
                            Bends are the most common and required fittings in
                            pipeline systems. They offer directional change to
                            the flowing water at standardized angles. For
                            shorter radius pipeline requiring longer deviation,
                            higher orientation angles are chosen for optimal
                            solutions.
                          </p>
                        </Grid>
                        <Grid item xs={4}>
                          <Button
                            className={Template.redcolor}
                            variant="contained"
                          >
                            Download Technical Datasheet
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <p>
                            <b>Bend Fittings Specifications:</b>
                          </p>
                        </Grid>
                        <Grid container spacing={5}>
                          <Grid item xs={9}>
                            <Box>
                              <TableContainer>
                                <Table>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Size Range
                                    </TableCell>
                                    <TableCell>mm</TableCell>
                                    <TableCell>DN80-DN2600</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Orientation angles
                                    </TableCell>
                                    <TableCell>deg</TableCell>
                                    <TableCell>
                                      90°,45°, 22.5°, 11.25°
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Configurations
                                    </TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell>
                                      1. Double socket end 2. Double Flange 3.
                                      Flange & Socket 4. Double Socket Duckfoot
                                      5. Double Flange Duckfoot 6. Flange &
                                      Socket Duckfoot
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Radial Length
                                    </TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell>1. Short 2. Long</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Joining methods
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                      1. Push On Rubber Ring Joint 2. Flange 3.
                                      Restrained Rubber Ring Joint
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Pressure Range
                                    </TableCell>
                                    <TableCell>bar</TableCell>
                                    <TableCell>25-30-40-50-64-100</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Standard class
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                      K- series classification
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Flange Standard class
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                      PN10, PN16, PN25, PN40
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Assembly components
                                    </TableCell>
                                    <TableCell>Assembly components</TableCell>
                                    <TableCell>
                                      Rubber Rings for socket joints Bolts,
                                      nuts, washers, gasket for flange assembly.
                                    </TableCell>
                                  </TableRow>
                                </Table>
                              </TableContainer>
                            </Box>
                          </Grid>
                          <Grid item xs={3}>
                            <Box className={Template.boxbgNp} pb={4}>
                              <Typography
                                sx={{ fontSize: "1.3em", fontWeight: "600" }}
                              >
                                Explore Our Entire Ductile Iron Portfolio
                              </Typography>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "#D7282F",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Pipes and Joints</Box>
                              </Box>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "#D7282F",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Valves</Box>
                              </Box>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "#D7282F",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Accessories</Box>
                              </Box>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "red",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Pumps</Box>
                              </Box>
                              <Button
                                variant="outlined"
                                sx={{
                                  borderColor: "white",
                                  mt: 2,
                                  color: "white",
                                  "&:hover": {
                                    backgroundColor: "white",
                                    color: "black",
                                  },
                                }}
                              >
                                View All
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <Grid
                        container
                        spacing={3}
                        display="flex"
                        alignItems="center"
                      >
                        <Grid item xs={8}>
                          <p className={Template.tabtext}>
                            Tee joint fittings are one of the vital parts in
                            networking if the fluid must be branched out to more
                            than one direction of flow. They allow three-way
                            flow of water and used to streamline different line
                            of water flow coming in from different reservoirs to
                            merge as a single unit in process industries.
                            Distribution and networking of the water flow is
                            achieved easily with our Tee line of Fittings.
                          </p>
                        </Grid>
                        <Grid item xs={4}>
                          <Button
                            className={Template.redcolor}
                            variant="contained"
                            endIcon={<ArrowForwardOutlinedIcon />}
                          >
                            Download Technical Datasheet
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <p>
                            <b>Tee Fittings Specifications:</b>
                          </p>
                        </Grid>
                        <Grid container spacing={5}>
                          <Grid item xs={9}>
                            <Box>
                              <TableContainer>
                                <Table>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Size Range
                                    </TableCell>
                                    <TableCell>mm</TableCell>
                                    <TableCell>DN80-DN2600</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Configurations
                                    </TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell>
                                      1. All Socket Tees 2. All branch Tees 3.
                                      Double Socket with Flange 4. Double Flange
                                      with socket
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Profile
                                    </TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell>
                                      1. Linear 2. Radial 3. Linear with 450
                                      Branch 4. Inverted 5. Y- shape
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Joining methods
                                    </TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell>
                                      ⦁ Push On Rubber Ring Joint ⦁ Flange
                                      mating ⦁ Restrained Rubber Ring Joint
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Pressure Range
                                    </TableCell>
                                    <TableCell>bar</TableCell>
                                    <TableCell>25-30-40-50-64-100</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Standard class
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                      K- series classification
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Flange Standard class
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                      PN10, PN16, PN25, PN40
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Assembly components
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                      ⦁ Rubber Rings for socket joints ⦁ Bolts,
                                      nuts, washers, gasket for flange assembly.
                                    </TableCell>
                                  </TableRow>
                                </Table>
                              </TableContainer>
                            </Box>
                          </Grid>
                          <Grid item xs={3}>
                            <Box className={Template.boxbgNp} pb={4}>
                              <Typography
                                sx={{ fontSize: "1.3em", fontWeight: "600" }}
                              >
                                Explore Our Entire Ductile Iron Portfolio
                              </Typography>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "#D7282F",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Pipes and Joints</Box>
                              </Box>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "#D7282F",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Valves</Box>
                              </Box>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "#D7282F",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Accessories</Box>
                              </Box>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "red",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Pumps</Box>
                              </Box>
                              <Button
                                variant="outlined"
                                sx={{
                                  borderColor: "white",
                                  mt: 2,
                                  color: "white",
                                  "&:hover": {
                                    backgroundColor: "white",
                                    color: "black",
                                  },
                                }}
                              >
                                View All
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      <Grid
                        container
                        spacing={3}
                        display="flex"
                        alignItems="center"
                      >
                        <Grid item xs={8}>
                          <p className={Template.tabtext}>
                            Flanges are assembly components generally used in
                            mating of the pipes. They are assembled with bolt,
                            nut, and washer fasteners. Merchant AD Fittings
                            portfolio contains flanges for entire pipeline range
                            with entire range of standard bolt sizes and
                            designated number of holes (4-20) for assembly.
                          </p>
                        </Grid>
                        <Grid item xs={4}>
                          <Button
                            className={Template.redcolor}
                            variant="contained"
                            endIcon={<ArrowForwardOutlinedIcon />}
                          >
                            Download Technical Datasheet
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <p>
                            <b>Flanges Specifications:</b>
                          </p>
                        </Grid>
                        <Grid container spacing={5}>
                          <Grid item xs={9}>
                            <Box>
                              <TableContainer>
                                <Table>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Size Range
                                    </TableCell>
                                    <TableCell>mm</TableCell>
                                    <TableCell>DN80-DN2600</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Profile
                                    </TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell>
                                      1. Short – weld neck 2. Long – weld neck
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Joining methods
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                      ⦁ Push On Rubber Ring Joint ⦁ Flange
                                      mating ⦁ Restrained Rubber Ring Joint
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Pressure Range
                                    </TableCell>
                                    <TableCell>bar</TableCell>
                                    <TableCell>25-30-40-50-64-100</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Standard class
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                      K- series classification
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Pressure Range
                                    </TableCell>
                                    <TableCell>bar</TableCell>
                                    <TableCell>25-30-40-50-64-100</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Standard class
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                      K- series classification
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Flange Standard class
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                      PN10, PN16, PN25, PN40
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Assembly components
                                    </TableCell>
                                    <TableCell>Assembly components</TableCell>
                                    <TableCell>
                                      Rubber Rings for socket joints Bolts,
                                      nuts, washers, gasket for flange assembly.
                                    </TableCell>
                                  </TableRow>
                                </Table>
                              </TableContainer>
                            </Box>
                          </Grid>
                          <Grid item xs={3}>
                            <Box className={Template.boxbgNp} pb={4}>
                              <Typography
                                sx={{ fontSize: "1.3em", fontWeight: "600" }}
                              >
                                Explore Our Entire Ductile Iron Portfolio
                              </Typography>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "#D7282F",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Pipes and Joints</Box>
                              </Box>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "#D7282F",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Valves</Box>
                              </Box>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "#D7282F",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Accessories</Box>
                              </Box>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "red",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Pumps</Box>
                              </Box>
                              <Button
                                variant="outlined"
                                sx={{
                                  borderColor: "white",
                                  mt: 2,
                                  color: "white",
                                  "&:hover": {
                                    backgroundColor: "white",
                                    color: "black",
                                  },
                                }}
                              >
                                View All
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                      <Grid
                        container
                        spacing={3}
                        display="flex"
                        alignItems="center"
                      >
                        <Grid item xs={8}>
                          <p className={Template.tabtext}>
                            Crosses are another branch out fittings to allow
                            water flow in 4-ways. They are used commonly in
                            complex pipeline layout and designs. They branch out
                            single line into two perpendicular and two parallel
                            directions.
                          </p>
                        </Grid>
                        <Grid item xs={4}>
                          <Button
                            className={Template.redcolor}
                            variant="contained"
                            endIcon={<ArrowForwardOutlinedIcon />}
                          >
                            Download Technical Datasheet
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <p>
                            <b>Cross fittings Specifications:</b>
                          </p>
                        </Grid>
                        <Grid container spacing={5}>
                          <Grid item xs={9}>
                            <Box>
                              <TableContainer>
                                <Table>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Size Range
                                    </TableCell>
                                    <TableCell>mm</TableCell>
                                    <TableCell>DN80-DN2600</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Configurations
                                    </TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell>
                                      1. All flange 2. All socket
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Joining methods
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                      ⦁ Push On Rubber Ring Joint ⦁ Flange
                                      mating ⦁ Restrained Rubber Ring Joint
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Socket Standard class
                                    </TableCell>
                                    <TableCell>bar</TableCell>
                                    <TableCell>
                                      K series classification
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Flange Standard class
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                      PN10, PN16, PN25, PN40
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Assembly components
                                    </TableCell>
                                    <TableCell>Assembly components</TableCell>
                                    <TableCell>
                                      Rubber Rings for socket joints Bolts,
                                      nuts, washers, gasket for flange assembly.
                                    </TableCell>
                                  </TableRow>
                                </Table>
                              </TableContainer>
                            </Box>
                          </Grid>
                          <Grid item xs={3}>
                            <Box className={Template.boxbgNp} pb={4}>
                              <Typography
                                sx={{ fontSize: "1.3em", fontWeight: "600" }}
                              >
                                Explore Our Entire Ductile Iron Portfolio
                              </Typography>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "#D7282F",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Pipes and Joints</Box>
                              </Box>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "#D7282F",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Valves</Box>
                              </Box>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "#D7282F",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Accessories</Box>
                              </Box>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "red",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Pumps</Box>
                              </Box>
                              <Button
                                variant="outlined"
                                sx={{
                                  borderColor: "white",
                                  mt: 2,
                                  color: "white",
                                  "&:hover": {
                                    backgroundColor: "white",
                                    color: "black",
                                  },
                                }}
                              >
                                View All
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                      <Grid
                        container
                        spacing={3}
                        display="flex"
                        alignItems="center"
                      >
                        <Grid item xs={8}>
                          <p className={Template.tabtext}>
                            Paddle pipes are provided with a middle flange in
                            the pipe where thrust blockers, concrete support is
                            provided. When the terrain conditions are not
                            completely levelled and uneven, to distribute the
                            load imparted during operations, these flanges are
                            provided. Paddle flanges are 10mm for DN300, 15mm
                            for 350 DN 600 and 20m m for DN 700.
                          </p>
                        </Grid>
                        <Grid item xs={4}>
                          <Button
                            className={Template.redcolor}
                            variant="contained"
                            endIcon={<ArrowForwardOutlinedIcon />}
                          >
                            Download Technical Datasheet
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <p>
                            <b>Paddle Pipe Fittings Specifications:</b>
                          </p>
                        </Grid>
                        <Grid container spacing={5}>
                          <Grid item xs={9}>
                            <Box>
                              <TableContainer>
                                <Table>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Size Range
                                    </TableCell>
                                    <TableCell>mm</TableCell>
                                    <TableCell>DN80-DN2600</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Joining methods
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                      ⦁ Flange mating joint ⦁ Push- On Joint ⦁
                                      Restrained Rubber ring joint
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Standard class
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                      K series classification – K9
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Flange Standard class
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>PN10, PN16, PN25</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Assembly components
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                      ⦁ Bolts, nuts, washers, gaskets for flange
                                      mating
                                    </TableCell>
                                  </TableRow>
                                </Table>
                              </TableContainer>
                            </Box>
                          </Grid>
                          <Grid item xs={3}>
                            <Box className={Template.boxbgNp} pb={4}>
                              <Typography
                                sx={{ fontSize: "1.3em", fontWeight: "600" }}
                              >
                                Explore Our Entire Ductile Iron Portfolio
                              </Typography>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "#D7282F",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Pipes and Joints</Box>
                              </Box>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "#D7282F",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Valves</Box>
                              </Box>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "#D7282F",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Accessories</Box>
                              </Box>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "red",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Pumps</Box>
                              </Box>
                              <Button
                                variant="outlined"
                                sx={{
                                  borderColor: "white",
                                  mt: 2,
                                  color: "white",
                                  "&:hover": {
                                    backgroundColor: "white",
                                    color: "black",
                                  },
                                }}
                              >
                                View All
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                      <Grid
                        container
                        spacing={3}
                        display="flex"
                        alignItems="center"
                      >
                        <Grid item xs={8}>
                          <p className={Template.tabtext}>
                            Reducers or Tapers are fittings that are used to
                            connect two different standard sized units. They are
                            also adapted when the water pressure and flow rate
                            are to be varied to the requirements.
                          </p>
                        </Grid>
                        <Grid item xs={4}>
                          <Button
                            className={Template.redcolor}
                            variant="contained"
                            endIcon={<ArrowForwardOutlinedIcon />}
                          >
                            Download Technical Datasheet
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <p>
                            <b>Taper fittings specifications:</b>
                          </p>
                        </Grid>
                        <Grid container spacing={5}>
                          <Grid item xs={9}>
                            <Box>
                              <TableContainer>
                                <Table>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Size Range
                                    </TableCell>
                                    <TableCell>mm</TableCell>
                                    <TableCell>DN80-DN2600</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Configurations
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                      1. Double socket 2. Double flanged
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Profile
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>⦁ Concentric ⦁ Taper</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Joining methods
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                      ⦁ Push On Rubber Ring Joint ⦁ Flange
                                      mating ⦁ Restrained Rubber Ring Joint
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Socket Standard class
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                      K- series classification
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Flange Standard Class
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                      PN10, PN16, PN25, PN40
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell
                                      className={Template.tableheading}
                                    >
                                      Assembly components
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                      ⦁ Bolts, nuts, washers, gaskets for flange
                                      mating. ⦁ Rubber rings for socket joints.
                                    </TableCell>
                                  </TableRow>
                                </Table>
                              </TableContainer>
                            </Box>
                          </Grid>
                          <Grid item xs={3}>
                            <Box className={Template.boxbgNp} pb={4}>
                              <Typography
                                sx={{ fontSize: "1.3em", fontWeight: "600" }}
                              >
                                Explore Our Entire Ductile Iron Portfolio
                              </Typography>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "#D7282F",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Pipes and Joints</Box>
                              </Box>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "#D7282F",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Valves</Box>
                              </Box>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "#D7282F",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Accessories</Box>
                              </Box>
                              <Box display="flex" alignItems="center" mt={1}>
                                <Box
                                  sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#D7282F",
                                    "& .MuiBox-root": {
                                      backgroundColor: "red",
                                    },
                                  }}
                                ></Box>
                                <Box ml={1.5}> Pumps</Box>
                              </Box>
                              <Button
                                variant="outlined"
                                sx={{
                                  borderColor: "white",
                                  mt: 2,
                                  color: "white",
                                  "&:hover": {
                                    backgroundColor: "white",
                                    color: "black",
                                  },
                                }}
                              >
                                View All
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </TabPanel>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
          {/* tab section */}

          <Container maxWidth="lg" sx={{ mt: 20 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box>
                  <h4 className={Template.common_head}>COATINGS AND LININGS</h4>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Box sx={{ borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                      sx={{
                        backgroundColor: "#f1f1f1",
                        width: "100%",
                        "& .MuiTabs-indicator": { display: "none" },
                        "& .MuiTab-root.Mui-selected": {
                          color: "white",
                          backgroundColor: "#04000f",
                        },
                      }}
                    >
                      <Tab
                        label="COUPLINGS, ADAPTERS AND JOINTS:"
                        {...a11yProps(0)}
                        className={Template.tabheading}
                      />
                      <Tab
                        label="COLLARS, CAPS AND PLUGS"
                        {...a11yProps(1)}
                        className={Template.tabheading}
                      />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    <Box>
                      <p className={Template.firsttabtext}>
                        Sizes Available: DN80 – DN2600 Flange Standards: PN10,
                        PN16, PN25, PN40
                      </p>
                      <Grid container spacing={3} mt={0}>
                        <Grid item xs={4}>
                          <h2 className={Template.tabsubheadingmb}>
                            COUPLINGS
                          </h2>
                          <p className={Template.firsttabtext}>
                            Couplings are useful fitting components when
                            different outside diameter pipes with same nominal
                            bore diameter are to be connected. They also allow
                            joining dissimilar pipe materials. Minor pipeline
                            offsets, thrust transmitting are achieved with
                            couplings. They are provided with end rings for
                            sealing.
                          </p>
                          <h4>Configurations:</h4>
                          <Typography display="flex" alignItems="center">
                            {" "}
                            <CircleOutlinedIcon
                              sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                            />
                            Universal Coupling
                          </Typography>
                          <Typography display="flex" alignItems="center" mt={2}>
                            {" "}
                            <CircleOutlinedIcon
                              sx={{
                                color: "#D7282f",
                                fontSize: "20px",
                                mr: 1,
                                mt: 1,
                              }}
                            />
                            Flexible Coupling
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <h2 className={Template.tabsubheadingmb}>ADAPTERS</h2>
                          <p className={Template.firsttabtext}>
                            They allow restricted axial movement and angular
                            misalignment, connected between the pipelines. They
                            are equipped with EPDM rubber seals at the ends.
                            Flange adapters are available in varied flange drill
                            standards PN10, PN16, PN25, PN40 and standard bolt
                            sizes and designated holes.
                          </p>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 2,
                            }}
                          >
                            <Box display="flex" alignItems="center">
                              <CircleOutlinedIcon
                                sx={{
                                  color: "#D7282f",
                                  fontSize: "20px",
                                  mr: 1,
                                }}
                              />
                            </Box>
                            <Box display="flex" alignItems="center">
                              <Typography
                                display="flex"
                                alignItems="center"
                                className={Template.firsttabtext}
                              >
                                UNIVERSAL FLANGE ADAPTERS
                              </Typography>
                            </Box>
                          </Box>

                          <Typography
                            display="flex"
                            alignItems="center"
                            mt={2}
                            className={Template.firsttabtext}
                          >
                            <CircleOutlinedIcon
                              sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                            />{" "}
                            PN10 Flange adapters
                          </Typography>
                          <Typography
                            display="flex"
                            alignItems="center"
                            mt={2}
                            className={Template.firsttabtext}
                          >
                            <CircleOutlinedIcon
                              sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                            />{" "}
                            PN16 Flange adapters
                          </Typography>
                          <Typography
                            display="flex"
                            alignItems="center"
                            mt={2}
                            className={Template.firsttabtext}
                          >
                            <CircleOutlinedIcon
                              sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                            />{" "}
                            PN25 Flange adapters
                          </Typography>
                          <Typography
                            display="flex"
                            alignItems="center"
                            mt={2}
                            className={Template.firsttabtext}
                          >
                            <CircleOutlinedIcon
                              sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                            />{" "}
                            PN40 Flange adapters
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <h2 className={Template.tabsubheadingmb}>JOINTS</h2>
                          <p className={Template.firsttabtext}>
                            Double flanged, these joints are again one of the
                            primary requirements in pipeline when working with
                            valves, space adjustments while assembling/
                            disassembling of the pipeline.
                          </p>
                          <p className={Template.firsttabtext}>
                            Longitudinal positioning of valves both while
                            installation and removal dismantling is sufficiently
                            made easy with these joints as they allow axial
                            adjustments.
                          </p>
                          <p className={Template.firsttabtext}>
                            Provides ease and speed during installation and
                            airtight sealing as the gaskets are compressed
                            against the faces
                          </p>
                        </Grid>
                      </Grid>
                    </Box>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Box>
                      <p className={Template.firsttabtext}>
                        Sizes Available: DN80 – DN2600 Flange Standards: PN10,
                        PN16, PN25, PN40
                      </p>
                      <Grid container spacing={3} mt={0}>
                        <Grid item xs={4}>
                          <h2 className={Template.tabsubheadingmb}>COLLARS</h2>
                          <p className={Template.firsttabtext}>
                            Collars are operation easing fittings applicable to
                            connecting pipeline with spigot ends and flanged
                            pipes.
                          </p>
                          <h5>DOUBLE SOCKET COLLAR:</h5>
                          <Typography mt={2} display="flex" alignItems="center">
                            {" "}
                            <CircleOutlinedIcon
                              sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                            />
                            Configuration: Socket
                          </Typography>
                          <Typography mt={2} display="flex" alignItems="center">
                            {" "}
                            <CircleOutlinedIcon
                              sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                            />
                            Optional components: End glands
                          </Typography>
                          <Typography mt={2} display="flex" alignItems="center">
                            {" "}
                            <CircleOutlinedIcon
                              sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                            />
                            Profile: Nominal length
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <h2 className={Template.tabsubheadingmb}>
                            MECHANICAL JOINT COLLAR:
                          </h2>
                          <p className={Template.firsttabtext}>
                            Mechanical joint collars offer great leakproof and
                            tightness sealing to the water flowing pipes where
                            bolts and tie rod studs are fastened at the ends
                            with the pipe.
                          </p>
                          <Typography mt={2} display="flex" alignItems="center">
                            {" "}
                            <CircleOutlinedIcon
                              sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                            />
                            Configuration: Flange ends
                          </Typography>
                          <Typography mt={2} display="flex" alignItems="center">
                            {" "}
                            <CircleOutlinedIcon
                              sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                            />
                            Components Required:
                          </Typography>
                          <Typography mt={2} display="flex" alignItems="center">
                            {" "}
                            <CircleOutlinedIcon
                              sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                            />
                            Optional components: End glands
                          </Typography>
                          <Typography mt={2} display="flex" alignItems="center">
                            {" "}
                            <CircleOutlinedIcon
                              sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                            />
                            Profile: Long.
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <h2 className={Template.tabsubheadingmb}>
                            CAPS & PLUGS
                          </h2>
                          <p className={Template.firsttabtext}>
                            Application: Spigot End, Flange ends.
                          </p>
                        </Grid>
                      </Grid>
                    </Box>
                  </TabPanel>
                </Box>
              </Grid>
            </Grid>
          </Container>

          <Container maxWidth="lg" sx={{ mt: 10 }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography>
                  {" "}
                  <b>
                    {" "}
                    Merchant AD provides wide range of coating options to meet
                    even aggressive soil conditions and protect fittings.{" "}
                  </b>
                </Typography>
                <Box mt={2}>
                  <Accordion
                    sx={{ border: "2px solid #e2e2e2", boxShadow: "none" }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography className={Template.accodionhead}>
                        Coating
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className={Template.accodiontext}>
                        Fusion bonded epoxy powder coat or 2-layer epoxy, with a
                        minimum average film thickness of 250 microns specified
                        by EN14901-1/ISO18468 can be applied or sprayed for
                      </Typography>
                      <Typography mt={1} className={Template.accodiontext}>
                        <CircleOutlinedIcon
                          sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                        />{" "}
                        Heavy duty, aggressive soil conditions and superior
                        corrosion resistant property
                      </Typography>
                      <Typography className={Template.accodiontext} mt={1}>
                        <CircleOutlinedIcon
                          sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                        />{" "}
                        Increased availability with compatibility of zero curing
                        hours.
                      </Typography>
                      <Typography className={Template.accodiontext} mt={1}>
                        <CircleOutlinedIcon
                          sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                        />{" "}
                        Can be customized to higher deposition rate on both
                        internal and external layers of the fittings.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
                <Box className={Template.boxbgcolor}>
                  <p className={Template.righticonflex}>
                    <KeyboardDoubleArrowRightOutlinedIcon
                      sx={{ ml: 1, color: "#d7282f" }}
                    />
                    Corrosive effluent TMPO Coating, complying to EN14901-2 for
                    Fittings when operating temperatures are extreme within the
                    range specified, highly intensive coating layer, which also
                    maintains environmental pollution standards.
                  </p>
                  <p className={Template.righticonflex}>
                    {" "}
                    <KeyboardDoubleArrowRightOutlinedIcon
                      sx={{ ml: 1, color: "#d7282f" }}
                    />{" "}
                    Under requirements we also offer bituminous paint on the
                    fittings externally with a minimum layer of 70 microns.
                  </p>
                  <p className={Template.righticonflex}>
                    <KeyboardDoubleArrowRightOutlinedIcon
                      sx={{ ml: 1, color: "#d7282f" }}
                    />{" "}
                    We also provide external special lining like Enamel applied
                    to a minimum of 150 microns with diffusion technology
                    providing a strong physical and chemical bonding to the
                    fitting.
                  </p>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <b>
                    Our lining standards for ductile iron have been tested
                    ultimately to meet both drinking water hygiene and corrosion
                    resistant property.
                  </b>
                </Typography>
                <Box mt={2}>
                  <Accordion
                    sx={{ border: "2px solid #e2e2e2", boxShadow: "none" }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography className={Template.accodionhead}>
                        Lining
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className={Template.accodiontext}>
                        Cement mortar lining is provided internally with a
                        smooth, dense, and continuous layer in accordance with
                        EN545. Bitumen or epoxy coat is provided for the joints.
                      </Typography>
                      <Typography
                        display="flex"
                        className={Template.accodiontext}
                        mt={1}
                      >
                        <CircleOutlinedIcon
                          sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                        />{" "}
                        Cement compositions are also varied accordingly to meet
                        end demands,
                      </Typography>
                      <Typography
                        display="flex"
                        className={Template.accodiontext}
                        mt={1}
                      >
                        <CircleOutlinedIcon
                          sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                        />{" "}
                        Sulphate resistant cement mortar
                      </Typography>
                      <Typography
                        display="flex"
                        className={Template.accodiontext}
                        mt={1}
                      >
                        <CircleOutlinedIcon
                          sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                        />{" "}
                        Deflection angles varying from 11.250 to 900 and end
                        configurations of fittings include socket, flange,
                        collar, bell end are available in our ready stock.
                      </Typography>
                      <Typography
                        display="flex"
                        className={Template.accodiontext}
                        mt={1}
                      >
                        <CircleOutlinedIcon
                          sx={{ color: "#D7282f", fontSize: "20px", mr: 1 }}
                        />{" "}
                        High alumina cement mortar, which is best suitable and
                        recommended for aggressive potable water application
                        which protects the primary cement mortar layer
                        composition.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
                <Box className={Template.boxbgcolor}>
                  <p className={Template.righticonflex}>
                    <KeyboardDoubleArrowRightOutlinedIcon
                      sx={{ ml: 1, color: "#d7282f" }}
                    />{" "}
                    For preventing alkaline spike and tuberculation internally,
                    seal coat layer is provided with ISO16132 standards.
                  </p>
                  <p className={Template.righticonflex}>
                    <KeyboardDoubleArrowRightOutlinedIcon
                      sx={{ ml: 1, color: "#d7282f" }}
                    />{" "}
                    Customized Polyurethane lining, BSEN15655/ ISO8180, with our
                    dual component spraying technology provides high electrical
                    insulation between inflow fluid and DI inner walls.
                  </p>
                  <p className={Template.righticonflex}>
                    <KeyboardDoubleArrowRightOutlinedIcon
                      sx={{ ml: 1, color: "#d7282f" }}
                    />{" "}
                    We also provide internal special lining like Enamel applied
                    to a minimum of 150 microns with diffusion technology.
                  </p>
                </Box>
              </Grid>
            </Grid>
          </Container>

          {/* footer */}
          <Grid container spacing={3} className={classes.bgimage} pb={5}>
            <Grid item xs={4}>
              <FooterCol>
                <img
                  className="ComLogo"
                  src="/assets/cms-img/logowithnored.svg"
                  alt=""
                />
                <Typography>
                  Merchant AD Our company's founders & CEO are electrical and
                  mechanical engineers and businessman
                </Typography>
                <Typography>
                  <Textlink>info@powercozmo.com</Textlink>
                </Typography>
              </FooterCol>
            </Grid>
            <Grid item xs={3}>
              <FooterCol>
                <Typography variant="h5">Quick Links</Typography>
                <Box className={classes.borderr}></Box>
                <Typography>
                  <Textlink>About Us</Textlink>
                </Typography>
                <Typography>
                  <Textlink href="/ductilepipePage/ductilePipe">
                    Our Products
                  </Textlink>
                </Typography>
                <Typography>
                  <Textlink>Contact Us</Textlink>
                </Typography>
              </FooterCol>
            </Grid>
            <Grid item xs={3}>
              <FooterCol>
                <Typography variant="h5">Main Products</Typography>
                <Box className={classes.borderr}></Box>
                <Typography>
                  <Textlink>Pipes</Textlink>
                </Typography>
                <Typography>
                  <Textlink>Fittings</Textlink>
                </Typography>
                <Typography>
                  <Textlink>Valves</Textlink>
                </Typography>
                <Typography>
                  <Textlink>Accessories</Textlink>
                </Typography>
              </FooterCol>
            </Grid>
            <Grid item xs={2}>
              <FooterCol>
                <Typography variant="h5">Follow Us</Typography>
                <Box className={classes.borderr}></Box>
                <SocialIcons display="flex" sx={{ mt: 3 }}>
                  <Link
                    href="https://www.facebook.com/powercozmo.epg"
                    target="_blank"
                  >
                    <FacebookIcon></FacebookIcon>
                  </Link>
                  <Link href="https://twitter.com/powercozmo" target="_blank">
                    <TwitterIcon></TwitterIcon>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/powercozmo"
                    target="_blank"
                  >
                    <LinkedInIcon></LinkedInIcon>
                  </Link>
                  <Link
                    href="https://www.instagram.com/powercozmo/"
                    target="_blank"
                  >
                    <InstagramIcon></InstagramIcon>
                  </Link>
                </SocialIcons>
              </FooterCol>
            </Grid>
            <Grid item xs={12}>
              <CopyrightTxt>
                <Typography>
                  © 2024 Merchant AD - All rights reserved.
                </Typography>
              </CopyrightTxt>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};
export default fitting;
