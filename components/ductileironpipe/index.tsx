import React, { useEffect, useState } from "react";
import Template from "./template.module.css";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  Textlink,
  Text,
  MainHeader,
  Bar,
  NavigationBar,
  useStyles,
  FooterCol,
  SocialIcons,
  CopyrightTxt,
} from "../guestLayout/landingPage/styles";
import Link from "next/link";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Nominal size range", "DN80 – DN300", "DN80 – DN301", 24, 4.0),
  createData("Standardized lengths ", "5.5m/6.0m", 9.0, 37, 4.3),
  createData("Standard internal lining", "Cement mortar", 16.0, 24, 6.0),
  createData("Standard external coating", "Zinc/Zinc Aluminum", 3.7, 67, 4.3),
  createData("Max operating pressure", "48 bar", 16.0, 49, 3.9),
  createData("Deflection", "5°", 16.0, 49, 3.9),
  createData("Standard Lining", "48 bar", 16.0, 49, 3.9),
  createData("Strengthening Lining", "Epoxy Seal Coat", 16.0, 49, 3.9),
  createData("Standard Coating", "Zinc/ Zin Aluminum", 16.0, 49, 3.9),
  createData(
    "Strengthening Coating",
    "Blue/Red/Black Epoxy coat / Bituminous layer",
    16.0,
    49,
    3.9
  ),
  createData("External Protection", "Polyethylene Sleeve", 16.0, 49, 3.9),
  createData(
    "Joint Coatings",
    "Blue/Red/Black Epoxy coat / Bituminous layer",
    16.0,
    49,
    3.9
  ),
];

const PipeCmsPage = () => {
  const [value, setValue] = useState("1");
  const [domLoaded, setDomLoaded] = useState(false);
  const handleChange = (event, newValue) => {
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
          <MainHeader sx={{ flexGrow: 1 }} overflow={"hidden"}>
            <Bar position="static">
              <Toolbar>
                <Box>
                  <img src="/assets/Logo.svg" alt="" />
                </Box>
                <NavigationBar>
                  <Text>
                    <Textlink className="active">Home </Textlink>
                  </Text>
                  <Text>
                    <Textlink>About Us </Textlink>
                  </Text>
                  <Text>
                    <Textlink href="/ductilepipePage/ductilePipe">
                      Our Products{" "}
                    </Textlink>
                  </Text>
                  <Text>
                    <Textlink>Contact Us </Textlink>
                  </Text>
                </NavigationBar>
              </Toolbar>
            </Bar>
          </MainHeader>
          <Grid container>
            <Grid item xs={12}>
              <div className={Template.banner}>
                <img
                  className={Template.overlay}
                  src="/assets/cms-img/banner.jpg"
                  alt="Banner"
                  title="Banner Image"
                />
                <div className={Template.banner_txt}>
                  <h1>Merchant AD Pipelines and Water Systems</h1>
                  <h2>Pipes & Fittings- Valves & Pumps</h2>

                  {/* Four banner categories*/}
                  <div className={Template.category_sec}>
                    <Grid container spacing={3} sx={{ mt: 2 }}>
                      <Grid item xs={12} md={3} sm={6}>
                        <div className={Template.category_col}>
                          <h4>Pipes </h4>
                          <div className={Template.category_inn}>
                            <div className={Template.sub_icon}>
                              <img
                                src="/assets/cms-img/ic-di-pipes-300x300.png"
                                className={Template.sub_img}
                              />
                            </div>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={12} md={3} sm={6}>
                        <div className={Template.category_col}>
                          <h4>Fittings </h4>
                          <div className={Template.category_inn}>
                            <div className={Template.sub_icon}>
                              <img
                                src="/assets/cms-img/ic-di-fittings-300x300.png"
                                className={Template.sub_img}
                              />
                            </div>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={12} md={3} sm={6}>
                        <div className={Template.category_col}>
                          <h4>Accessories </h4>
                          <div className={Template.category_inn}>
                            <div className={Template.sub_icon}>
                              <img
                                src="/assets/cms-img//ic-di-valves-300x300.png"
                                className={Template.sub_img}
                              />
                            </div>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={12} md={3} sm={6}>
                        <div className={Template.category_col}>
                          <h4>Pipes </h4>
                          <div className={Template.category_inn}>
                            <div className={Template.sub_icon}>
                              <img
                                src="/assets/cms-img/ic-di-accesories-300x300.png"
                                className={Template.sub_img}
                              />
                            </div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  {/* Four banner categories*/}
                </div>
              </div>
            </Grid>
          </Grid>

          {/* START service part*/}
          <div className={Template.service_sec}>
            <div className={Template.service_secinn}>
              <Container maxWidth="lg">
                <Grid container>
                  <Grid item xs={12} md={6} sm={12}>
                    <div className={Template.service_left}>
                      <h2 className={Template.heading}>
                        Merchant AD Integrated Solutions for Pipeline
                        infrastructure Business.
                      </h2>
                      <p>
                        <b>Merchant AD</b> service legacy roots are{" "}
                        <b>12 years</b> and counting to the water treatment and
                        wastewater industry. Our constant and continuous product
                        development approach to industries has kept us above the
                        market competition, making us a pioneer in the industry
                        we serve, <b>we deliver quality services for EPC</b>,
                        Products Innovation and Aftermarket solutions. Adding to
                        it, our network spans locally and{" "}
                        <b>
                          globally to trademark Merchant AD as world-leading
                          pipelines
                        </b>{" "}
                        and{" "}
                        <b>
                          water systems service provider across Middle east,
                          Africa, and Asia
                        </b>
                        .
                      </p>
                      <Button
                        className={Template.red_color}
                        variant="contained"
                        endIcon={<ArrowForwardOutlinedIcon />}
                      >
                        Contact Us today
                      </Button>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6} sm={12}>
                    <div className={Template.service_right}>
                      <div className={Template.top_content}>
                        <div className={Template.img_box}>
                          <img
                            src="/assets/cms-img/powercozmo-portfolio.png"
                            alt=""
                            title=""
                          ></img>
                        </div>
                        <span className={Template.count}>10,000</span>
                        <p>
                          Our 10,000+ parts and system portfolio keep <br />
                          widening to get you covered.{" "}
                        </p>
                      </div>
                      <div className={Template.bottom_content}>
                        <div className={Template.content_left}>
                          <div className={Template.img_box}>
                            <img
                              src="/assets/cms-img/powercozmo-worlwide-ennergy.png"
                              alt=""
                              title=""
                            ></img>
                          </div>
                          <span className={Template.count}>300</span>
                          <p>
                            Serving 300 customers worldwide
                            <br /> for their energy needs.{" "}
                          </p>
                        </div>
                        <div className={Template.content_left}>
                          <div className={Template.img_box}>
                            <img
                              src="/assets/cms-img/powercozmo-prompted-deliverables.png"
                              alt=""
                              title=""
                            ></img>
                            <span className={Template.count}>300</span>
                            <p>
                              Prompted deliverables in the
                              <br /> past decade.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Container>
            </div>
          </div>
          {/* END service part*/}

          {/* START Infrastructure part*/}
          <div className={Template.structor_sec}>
            <Container maxWidth="lg">
              <Grid container>
                <Grid item xs={12} md={6} sm={12}>
                  <div className={Template.structor_left}>
                    <h4 className={Template.common_head}>
                      DI Pipeline and Infrastructure{" "}
                    </h4>
                    <h2
                      className={`${Template.comonbold_head} ${Template.common_heading2}`}
                    >
                      Middle EAST most complete pipelines systems provider.
                    </h2>
                    <p>
                      Exclusive deliverables steered by exclusive distribution
                      agreements from manufacturers and global market leaders
                      across Europe and Asia, devised to meet and deliver end
                      client demands and needs.We deliver an entire range of{" "}
                      <b>DI Pipes, fittings</b> Valves for{" "}
                      <b>DN 80 up to DN2600</b> with standardizations{" "}
                      <b>ISO2531, EN545, EN598</b> for respective work and
                      service conditions. For internal linings and external
                      coatings, we consider and support even the rugged and
                      aggressive soil and operating conditions, range of
                      solutions including{" "}
                      <b>fusion bonded Epoxy, Bitumen, Polyurethane</b>, and
                      others. Stocked parts can be delivered the next day, with
                      our global network for planning to enhance on time and
                      demand delivery.
                    </p>
                  </div>
                </Grid>
                <Grid item xs={12} md={1} sm={1}></Grid>
                <Grid item xs={12} md={5} sm={12}>
                  <div className={Template.structor_right}>
                    <h4>Cost and Quality</h4>
                    <p>
                      Exclusive deliverables steered by exclusive distribution
                      agreements from manufacturers and global market leaders
                      across Europe and Asia, devised to meet and deliver end
                      client demands and needs.We deliver an entire range of{" "}
                      <b>DI Pipes, fittings</b> Valves for{" "}
                      <b>DN 80 up to DN2600</b> with standardizations{" "}
                      <b>ISO2531, EN545, EN598</b> for respective work and
                      service conditions. For internal linings and external
                      coatings, we consider and support even the rugged and
                      aggressive soil and operating conditions, range of
                      solutions including{" "}
                      <b>fusion bonded Epoxy, Bitumen, Polyurethane</b>, and
                      others. Stocked parts can be delivered the next day, with
                      our global network for planning to enhance on time and
                      demand delivery.
                    </p>
                  </div>
                </Grid>
              </Grid>
              {/* START contact section part*/}
              <div className={Template.contact_sec}>
                <div className={Template.contact_secinn}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={5} sm={5}>
                      <span>
                        <h3>
                          Our dominant market over Middle East pipeline
                          requirements is making Global footprints.
                        </h3>
                      </span>
                    </Grid>
                    <Grid item xs={12} md={3} sm={3}>
                      <span>
                        <label className={Template.call_us}>Call Us ow</label>
                        <h3> +962-78-7000500 </h3>
                      </span>
                    </Grid>
                    <Grid item xs={12} md={4} sm={4}>
                      <span>
                        <Button
                          className={Template.red_color}
                          variant="contained"
                          endIcon={<ArrowForwardOutlinedIcon />}
                        >
                          Contact Us today
                        </Button>
                      </span>
                    </Grid>
                  </Grid>
                </div>
              </div>
              {/* END contact section part*/}
            </Container>
          </div>
          {/* END Infrastructure part*/}

          {/* START Technical Salience Tabs section */}
          <div
            className={`${Template.page_sec} ${Template.pagetop_tab} pagetop_tab`}
          >
            <Container maxWidth="lg">
              <h4 className={Template.common_head}>Technical Salience </h4>
              {/* START Tabs section */}
              <div className={Template.tab_box}>
                <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
                  <TabContext value={value}>
                    <Box className={Template.tech_tabbg}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab
                          className={Template.technical_tab}
                          label="Ductile Iron Pipes"
                          value="1"
                        />
                        <Tab
                          className={Template.technical_tab}
                          label="Lining and Coating"
                          value="2"
                        />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <div className={Template.tab_content}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} md={6} sm={12}>
                            <p>
                              Ductile iron, another composite form of cast iron,
                              is composed of spheroidal or nodal form of
                              graphite in the metal formation process instead of
                              the traditional Cast iron has random flake
                              graphite pattern. This spheroids pattern
                              arrangement avoids distant molecular connectivity
                              and increases the metal matrix formation giving
                              higher ductility and impact strength to the
                              material
                              <b>Spherical graphite iron</b>, characterization
                              of graphite resulting from the casting, adds
                              higher tensile strength than the flake graphite
                              form of structure, along with proof stress and
                              elongation properties. Thus, making pipeline
                              application much more feasible with the ductile
                              iron. The carbon pool formed during the
                              solidification process due to the segregation of
                              graphite is a vital factor influencing the
                              mechanical properties of the metal formed.
                              <b>Merchant AD Ductile Iron Pipes quality</b> is
                              tested and assured with the metal forming process.
                              The metal formation with Magnesium must be carried
                              out under controlled conditions to maintain the
                              nodularity and morphology of the material formed.
                            </p>
                          </Grid>
                          <Grid item xs={12} md={6} sm={12}>
                            <div
                              className={`${Template.tab_content_right} ${Template.big_img_col}`}
                            >
                              <img
                                className={Template.big_img}
                                src="/assets/cms-img/power-cozmo-ductile-iron-pipesandwatersystem-2048x573.jpg"
                              />

                              <p className={Template.imgbtmtxt}>
                                <b>
                                  Materials with the highest standards available
                                  are only used in <br></br>Merchant AD
                                  PIPELINES AND WATER SYSTEMS.{" "}
                                </b>
                              </p>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </TabPanel>
                    <TabPanel value="2">
                      <div className={Template.tab_content}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} md={6} sm={12}>
                            <div className={Template.tab_contentleft}>
                              <ul>
                                <li>
                                  <b>Soil Conditioning</b> We at Merchant AD
                                  deliver quality and standardized products, to
                                  make them effective in working conditions we
                                  recommend our clients to meet the preparation
                                  of bed and soil requirements, followed by a
                                  topographical survey, depending on the soil
                                  group, moisture content and rest other factors
                                  indicated with standard requirements under ISO
                                  10803.
                                </li>
                                <li>
                                  <b>Laying and Installation</b> If the pipe is
                                  to be laid directly in overly aggressive or
                                  stony soils up to a maximum grain size of 100
                                  mm (about 3.94 in), we recommend a zinc
                                  coating plus a cement mortar coating (ZMU) to
                                  EN 15 542. A ductile iron pipe with a ZMU can
                                  be installed in almost any native soil without
                                  the soil demanding soil replacement. This
                                  means a considerable cost saving such as on
                                  trenching costs, purchase of replacement soil
                                  and disposing and transportation cost for
                                  dumping. If the native soil can be re-used as
                                  backfill, there is the added benefit that
                                  avoids the often-undesirable draining effect a
                                  pipe trench filled with gravels face. Power
                                  Cozmo Ductile Iron Pipes with a ZMU layer can
                                  also be used for trenchless installation
                                  techniques, given while handling such
                                  techniques, extra-careful attention must be
                                  paid to the socket joint in this case.
                                </li>
                              </ul>
                            </div>
                          </Grid>
                          <Grid item xs={12} md={6} sm={12}>
                            <div className={Template.tab_content_right}>
                              <img src="/assets/cms-img/powercozmo-lining-coating.png" />
                              <ul>
                                <li>
                                  <b>Material and Deposition</b>
                                  Merchant AD coatings and linings are as per EN
                                  545 standard specifications ductile iron pipes
                                  and are provided with metallic zinc- aluminum
                                  coating as the finishing layer. The deposition
                                  mass of the zinc coating is 200g/m2 and that
                                  of aluminum coating is 400 g/m2. The final
                                  layer comprises a final paint layer or epoxy
                                  paint of bitumen depending on our client
                                  requirements which is based on soil
                                  conditions.
                                </li>
                              </ul>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </TabPanel>
                  </TabContext>
                </Box>
              </div>
              {/* END Tabs section */}
            </Container>
          </div>
          {/* END Technical Salience Tabs section */}

          {/* START Portfolio section */}
          <div className={`${Template.page_sec} ${Template.portfolio}`}>
            <Container maxWidth="lg">
              <h4 className={Template.common_head}>
                DI Pipeline and Infrastructure{" "}
              </h4>
              <p>
                Merchant AD produces pipes and fittings in the range DN80mm –
                DN2600 in accordance with the following standards.
                <br />
                Our pipeline portfolio serves you with the range DN80 to DN2600
                complying with the standards below.
                <br />
                Merchant AD produces a comprehensive range of fittings and
                ancillaries including{" "}
              </p>
              <Grid container sx={{ mt: 3 }} spacing={2}>
                <Grid item xs={12} md={4} sm={6}>
                  <div className={Template.list_sec_outer}>
                    <div className={Template.list_sec}>
                      <h4 className={Template.common_head}>
                        Normative Reference{" "}
                      </h4>
                      <ul>
                        <li>ISO 2531 / EN 545 for water</li>
                        <li>ISO 7186 / EN 598 for sewerage</li>
                        <li>IS 8329 / IS 9523 for water and sewage</li>
                        <li>AWWA C151</li>
                      </ul>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={4} sm={6}>
                  <div className={Template.list_sec_outer}>
                    <div className={Template.list_sec}>
                      <h4 className={Template.common_head}>
                        Pipes and Fittings{" "}
                      </h4>
                      <ul>
                        <li>
                          Socket and spigot pipes with flexible push-on joint
                          pipes
                        </li>
                        <li>Restrained flexible joint pipes</li>
                        <li>Flange pipes and joints</li>
                        <li>Mechanical Joint Pipes</li>
                        <li>Piling pipes</li>
                      </ul>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={4} sm={6}>
                  <div className={Template.list_sec_outer}>
                    <div className={Template.list_sec}>
                      <h4 className={Template.common_head}>Fittings Range </h4>
                      <ul>
                        <li>Push on joint socketed fittings.</li>
                        <li>Flanged fittings</li>
                        <li>Rotating flange fittings.</li>
                        <li>Restrained joint fittings.</li>
                      </ul>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
          {/* END Portfolio section */}

          {/* START Pipeline & Water Systems Portfolio section */}
          <div className={`${Template.page_sec} ${Template.pws_portfolio}`}>
            <Container maxWidth="lg">
              <h2 className={Template.comonbold_head}>
                Merchant AD <b>Pipeline</b> and <b>Water Systems Portfolio</b>
              </h2>
              <div className={`${Template.pws_tabs} pws_tabs`}>
                <Box
                  sx={{
                    width: "100%",
                    typography: "body1",
                    mt: 4,
                    border: "none",
                    padding: "0",
                  }}
                >
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: "none", borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab
                          className={Template.pws_bg}
                          label="C40"
                          value="1"
                        />
                        <Tab
                          className={Template.pws_bg}
                          label="C30"
                          value="2"
                        />
                        <Tab
                          className={Template.pws_bg}
                          label="C25"
                          value="3"
                        />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <Table
                        sx={{ minWidth: 650 }}
                        aria-label="simple table"
                        className={Template.pws_table}
                      >
                        <TableHead>
                          <TableRow>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow
                              className={Template.pws_row}
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                className={Template.pws_th}
                              >
                                {row.name}
                              </TableCell>
                              <TableCell
                                align="right"
                                className={Template.pws_td}
                              >
                                {row.calories}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabPanel>

                    <TabPanel value="2">
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow
                              className={Template.pws_row}
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                className={Template.pws_th}
                              >
                                {row.name}
                              </TableCell>
                              <TableCell
                                align="right"
                                className={Template.pws_td}
                              >
                                {row.calories}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabPanel>
                    <TabPanel value="3">
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow
                              className={Template.pws_row}
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                className={Template.pws_th}
                              >
                                {row.name}
                              </TableCell>
                              <TableCell
                                align="right"
                                className={Template.pws_td}
                              >
                                {row.calories}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabPanel>
                  </TabContext>
                </Box>
              </div>
            </Container>
          </div>
          {/* END Pipeline & Water Systems Portfolio section */}

          {/* START Industry Wide Usage section */}
          <div className={`${Template.page_sec} ${Template.industry_wide}`}>
            <Container maxWidth="lg">
              <h4 className={Template.common_head}>Industry Wide Usage </h4>
              <h2 className={Template.comonbold_head} style={{ color: "#fff" }}>
                Merchant AD Successful Applications in <b>Water </b>and{" "}
                <b>Wastewater Management </b>
              </h2>
              <Grid container sx={{ mt: 3 }} spacing={2}>
                <Grid item xs={12} md={12}>
                  <div className={Template.industry_list}>
                    <ul>
                      <li>
                        Potable and <b>recycled water transport</b> and{" "}
                        <b>supply</b>.{" "}
                      </li>
                      <li>
                        Buried and above{" "}
                        <b>ground water transportation systems</b>.{" "}
                      </li>
                      <li>
                        <b>Gravity sewage</b> aggregation and waste disposal,{" "}
                        <b>drainage systems</b>.{" "}
                      </li>
                      <li>
                        Water and <b>sewage treatment plants</b>.{" "}
                      </li>
                      <li>
                        <b>Onshore</b> and <b>offshore Fire</b> extinguishing
                        and <b>protection systems</b>.{" "}
                      </li>
                    </ul>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
          {/* END Industry Wide Usage section */}

          {/* START Industry Wide Usage section */}
          <div className={`${Template.page_sec} ${Template.convinient_sec}`}>
            <Container maxWidth="lg">
              <h4 className={Template.common_head} style={{ color: "#d7282f" }}>
                Convenient Joints
              </h4>
              <h2
                className={`${Template.comonbold_head} ${Template.common_heading2}`}
              >
                Di Pipes Joints
              </h2>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} sx={{ mt: 3 }}>
                  <div className={Template.convinient_accordion}>
                    <Accordion
                      defaultExpanded={true}
                      className={Template.acciordion_cont}
                      sx={{ mb: 3 }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={Template.accor_head}>
                          Push on Joint
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={8} sm={12}>
                              <p>
                                The most common and widely adopted joint for DI
                                pipes. Convenient usage under unfavorable soil
                                conditions where deflections are greater and
                                terrain disturbances are expected. The common
                                usage and adaptability are from the easy
                                handling, installation, and leak proof of this
                                joint. Merchant AD’s push-on joint assembly has
                                been constantly tested and analysed with more
                                than 1,000 psi internal pressure, 430 psi
                                external pressure and 14 psi negative air
                                pressure and found leakage proof or infiltration
                                count to zero. Push-on joints by Merchant AD
                                Ductile Iron Pipe systems are particularly
                                efficient by preventing infiltration,
                                exfiltration, and root intrusion that are
                                demanding concerns plagued sewer systems of
                                other piping materials.
                              </p>
                            </Grid>
                            <Grid item xs={12} md={4} sm={12}>
                              <div className={Template.accordion_img}>
                                <img
                                  src="/assets/cms-img/push_on.png"
                                  alt=""
                                  title=""
                                />
                              </div>
                            </Grid>
                          </Grid>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion className={Template.acciordion_cont}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel2a-header"
                      >
                        <Typography className={Template.accor_head}>
                          Mechanical Joint
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={8} sm={12}>
                              <p>
                                Push on joint application might seem difficult
                                under certain conditions, and this is where
                                mechanical joints prove effective. The circular
                                gasket is replaced by a trapezium shaped gasket
                                fastened and tightened to leak proof with a set
                                of bolt and nut. These bolt and nut assembly at
                                Merchant AD are adhered to the specifications
                                stated by ISO4016 and ISO4034.
                              </p>
                            </Grid>
                            <Grid item xs={12} md={4} sm={12}>
                              <div className={Template.accordion_img}>
                                <img
                                  src="/assets/cms-img/flanged.png"
                                  alt=""
                                  title=""
                                />
                              </div>
                            </Grid>
                          </Grid>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion className={Template.acciordion_cont}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography className={Template.accor_head}>
                          Flanged Joint
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={8} sm={12}>
                              <p>
                                Flanged joints are preferred in above soil
                                conditions, in treatment and processing
                                pipelines. The rigid assembly joint acts as a
                                restrained joint neglecting the necessity of
                                thrust blocks. Vertical pipe design, exposed
                                conditions over the ground are joined with
                                flanges. With assembly and disassembly of
                                flanges extremely easy and carried with handy
                                tools, they are used mostly in temporary
                                installations where transportation of the
                                pipelines is frequent. Flanges are flanged
                                during cast, welded or screwed to both ends of
                                the pipes and a bolt nut assembly is carried out
                                with a gasket in between to seal the metal
                                contact and avoid leakages and foreign particles
                                inside the pipeline.
                              </p>
                            </Grid>
                            <Grid item xs={12} md={4} sm={12}>
                              <div className={Template.accordion_img}>
                                <img
                                  src="/assets/cms-img/power-cozmo-mechnical-joint-300x225.png"
                                  alt=""
                                  title=""
                                />
                              </div>
                            </Grid>
                          </Grid>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion className={Template.acciordion_cont}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel2a-header"
                      >
                        <Typography className={Template.accor_head}>
                          Restrained Joint pipes
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={8} sm={12}>
                              <p>
                                Restrained joined spigot and socket is equipped
                                with rubber gaskets and stoppers. The restrained
                                joints are used in loose soil conditions where
                                the axial movement or deflection is to be
                                arrested mechanically and under trenchless
                                applications. This joint comprises an assembly
                                of socket and spigot pipes with glands, split
                                ring and a set of hook bolts, nuts, and washers.
                                Pipes with restrained joints are resistant to
                                the irregular and patch terrain failures due to
                                sagging and impact load on the pipes. This joint
                                has proven efficiency under rough, unleveled
                                terrains even with vertical assembly.
                              </p>
                            </Grid>
                            <Grid item xs={12} md={4} sm={12}>
                              <div className={Template.accordion_img}>
                                <img
                                  src="/assets/cms-img/flanged.png"
                                  alt=""
                                  title=""
                                />
                              </div>
                            </Grid>
                          </Grid>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
          {/* END Industry Wide Usage section */}

          {/* START leakage proof section */}
          <div className={`${Template.page_sec} ${Template.specification_sec}`}>
            <Container maxWidth="lg">
              <h4 className={Template.common_head} style={{ color: "#d7282f" }}>
                Leakage Proof
              </h4>
              <h2
                className={`${Template.comonbold_head} ${Template.common_heading2}`}
              >
                Rubber Gaskets
              </h2>
              <Grid
                container
                sx={{ mt: 3 }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={12} md={6} sm={12}>
                  <div className={Template.left_consec}>
                    <p>
                      <b>
                        Shape Advancement and product innovation for the gaskets
                        enable achieving 100% sealing with leakproof operations.
                        SBR (Styrene Butadiene Rubber) and EPDM (Ethylene
                        Propylene Diene Monomer Rubber) material made gaskets
                        are proving efficiency in the industry.
                      </b>
                      <b>Merchant AD</b> Gasket inspection and test reports
                      indicate prospective product life expectancy of 100 years
                      for the sealing equipment. Internal sealing and
                      positioning the gaskets in the internal groove avoids
                      environmental exposure and boosts durability. High
                      resistant and good chemical strength and gaskets provided
                      in our pipeline systems are inherently manufactured to
                      take shock loads arising due to operational parameters.
                      They are chosen with the material which can handle the
                      water and liquid in flow and can work for long decades
                      without failure. Sealing is another primary factor in the
                      assembly of DI pipes as leakages, foreign particles are
                      not preferred for quality operating conditions. Hence,
                      Merchant AD gasket proofs efficient to keep the liquid
                      flowing without disturbances or losses.{" "}
                    </p>
                    <p>
                      <b>
                        All the Rubber gaskets provided at Merchant AD Pipeline
                        and Water Systems carry the standard specifications of
                        ISO 43633/EN681.
                      </b>
                    </p>
                  </div>
                </Grid>

                <Grid item xs={12} md={6} sm={12}>
                  <div className={Template.structor_right_img}>
                    <img
                      src="/assets/cms-img/porwercozmo-rubber-gaskets.jpg"
                      alt=""
                      title=""
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 6 }}>
                <div
                  className={`${Template.specification_tabs} specification_tabs`}
                >
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: "#fff",
                      width: "100%",
                      typography: "body1",
                    }}
                  >
                    <TabContext value={value}>
                      <Box>
                        <TabList
                          onChange={handleChange}
                          aria-label="lab API tabs example"
                        >
                          <Tab
                            className={Template.spectab_color}
                            value="1"
                            label="Push on Joint Gasket"
                          />
                          <Tab
                            className={Template.spectab_color}
                            value="2"
                            label="Mechanical Joint Gasket"
                          />
                          <Tab
                            className={Template.spectab_color}
                            value="3"
                            label="Flanged Joints Gasket"
                          />
                          <Tab
                            className={Template.spectab_color}
                            value="4"
                            label="Restrained Joint Gasket"
                          />
                        </TabList>
                      </Box>
                      <div className={Template.specification_tabcontent}>
                        <TabPanel value="1">
                          <p>
                            This rubber gasket for Push On joint generally
                            consists of two parts namely Heel and Bulb. The heel
                            positioned in the groove and softer part is
                            compressed against the inner walls of the pipe
                            easing the pipe joining procedure.{" "}
                          </p>
                        </TabPanel>
                        <TabPanel value="2">
                          <p>
                            Trapezium shaped gasket is available at Merchant AD
                            that are used to seal the Mechanical Joint by means
                            of Bolts, nuts, and washers. The gland is placed
                            followed by the gasket inside the spigot and
                            inserted into the socket, then the hook heads are
                            tightened with bolt and nut sealing the
                            circumference.{" "}
                          </p>
                        </TabPanel>
                        <TabPanel value="3">
                          <p>
                            Rubber gaskets for Flanged joints for the entire
                            range DN80-DN2600 are available at Merchant AD
                            Pipeline and Water Systems. Standardized holes are
                            provided in the gasket face for assembling the
                            fasteners with standard class PN10, PN25, PN40
                            according to ISO 7005-1 and designated bolt sizes
                            and number of holes.{" "}
                          </p>
                        </TabPanel>
                        <TabPanel value="4">
                          <p>
                            Restrained joints are assembled with thrust bearing
                            gaskets. These gaskets provide counterforce and
                            protect the pipeline by bearing thrusts occurring
                            due to environmental and operating conditions. The
                            steel inserted gaskets are designed to take the
                            thrust force imparted on the pipeline.{" "}
                          </p>
                        </TabPanel>
                      </div>
                    </TabContext>
                  </Box>
                </div>
              </Grid>
            </Container>
          </div>
          {/* END leakage proof section */}

          {/* START Prevailing Benefits section */}
          <div className={`${Template.page_sec} ${Template.wider_container}`}>
            <Container maxWidth="lg">
              <h4 className={Template.common_head}>Prevailing Benefits </h4>
              <h2
                className={`${Template.comonbold_head} ${Template.common_heading2}`}
              >
                Merchant AD Ductile Pipes Featuring Advantages
              </h2>
            </Container>
            <div className={Template.service_list}>
              <Grid container sx={{ mt: 3 }} spacing={3}>
                <Grid item xs={12} md={6} sm={12}>
                  <div className={Template.btmservice_grid}>
                    <div className={Template.btmservice_left}>
                      <img
                        src="/assets/cms-img/Robust_and_Rigid-300x200.jpg"
                        alt="Service"
                        title="Service"
                      />
                    </div>
                    <div className={Template.btmservice_right}>
                      <h4>Robust and Rigid</h4>
                      <p>
                        Ductile Iron carries the Cast Iron properties by
                        spheroidal graphite characterized with high impact
                        strength and ductility. Merchant AD promises to have
                        products with rigidity even under aggressive soil and
                        extreme environmental conditions to produce favorable
                        output.
                      </p>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6} sm={12}>
                  <div className={Template.btmservice_grid}>
                    <div className={Template.btmservice_left}>
                      <img
                        src="/assets/cms-img/strong_and_tough-300x200.jpg"
                        alt="Service"
                        title="Service"
                      />
                    </div>
                    <div className={Template.btmservice_right}>
                      <h4>Strong and Tough</h4>
                      <p>
                        With Merchant AD Ductile Iron pipes, the strength of the
                        pipes is the best in the market and has immense
                        potential in exceeding the expected functionality.
                        Irregular operating conditions and high-pressure
                        applications are where product toughness quality is
                        analyzed.
                      </p>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6} sm={12}>
                  <div className={Template.btmservice_grid}>
                    <div className={Template.btmservice_left}>
                      <img
                        src="/assets/cms-img/Corrosion_Resistance-300x200.jpg"
                        alt="Service"
                        title="Service"
                      />
                    </div>
                    <div className={Template.btmservice_right}>
                      <h4>Corrosion Resistance</h4>
                      <p>
                        Corrosion, a major failure factor, is also keenly
                        tackled by the corrosion resistant material nature of
                        ductile iron. The presence of silicon and carbon in the
                        composition helps the ductile iron stay corrosion
                        resistant.
                      </p>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6} sm={12}>
                  <div className={Template.btmservice_grid}>
                    <div className={Template.btmservice_left}>
                      <img
                        src="/assets/cms-img/installation_and_maintenance-300x200.jpg"
                        alt="Service"
                        title="Service"
                      />
                    </div>
                    <div className={Template.btmservice_right}>
                      <h4>Installation and Maintenance</h4>
                      <p>
                        Ductile Iron pipes are easy to handle with common
                        equipment, tools, and shackles. Installation of DI Pipes
                        are carried out effortlessly with joints facilitated by
                        us. Less preparatory work needed, can be laid 8-10m even
                        without bed preparation.
                      </p>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
          {/* END Prevailing Benefits section */}

          {/* START Word in the market section */}
          <div className={`${Template.page_sec} ${Template.wider_container}`}>
            <Container maxWidth="lg">
              <h4 className={Template.common_head} style={{ color: "#d7282f" }}>
                Word in the market
              </h4>
            </Container>
            <div className={Template.benifit_list}>
              <Grid container sx={{ mt: 3 }} spacing={2}>
                <Grid item xs={12} md={3} sm={12}>
                  <div className={Template.post_col}>
                    <div className={Template.post_img}>
                      <img
                        src="/assets/cms-img/our_engineering-1-300x183.jpg"
                        alt="Post Image"
                        title="Post Image"
                      />
                    </div>
                    <div className={Template.post_content}>
                      <h2 className={Template.post_title}>Our Engineering</h2>
                      <p className={Template.moretext}>
                        <b> Merchant AD</b> PIPELINES AND WATER SYSTEMS design
                        and development team possess accurate technical
                        knowledge and innovate products, solutions
                      </p>
                      <Button
                        className={Template.post_button}
                        endIcon={<ArrowForwardOutlinedIcon />}
                      >
                        Read More
                      </Button>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={3} sm={12}>
                  <div className={Template.post_col}>
                    <div className={Template.post_img}>
                      <img
                        src="/assets/cms-img/our_products-300x183.jpg"
                        alt="Post Image"
                        title="Post Image"
                      />
                    </div>
                    <div className={Template.post_content}>
                      <h2 className={Template.post_title}>Our Products </h2>
                      <p className={Template.moretext}>
                        Time constrained industry is where majority of our
                        clients are from, so, we understand your zero breakdown
                        hours and need to avoid unfavorable conditions.
                      </p>
                      <Button
                        className={Template.post_button}
                        endIcon={<ArrowForwardOutlinedIcon />}
                      >
                        Read More
                      </Button>
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} md={3} sm={12}>
                  <div className={Template.post_col}>
                    <div className={Template.post_img}>
                      <img
                        src="/assets/cms-img/our_supply_chain-300x200.jpg"
                        alt="Post Image"
                        title="Post Image"
                      />
                    </div>
                    <div className={Template.post_content}>
                      <h2 className={Template.post_title}>Our Supply Chain </h2>
                      <p className={Template.moretext}>
                        Merchant AD contracts suppliers around the globe
                        connecting the chain of supply, giving us another
                        competitive edge together with our product.
                      </p>
                      <Button
                        className={Template.post_button}
                        endIcon={<ArrowForwardOutlinedIcon />}
                      >
                        Read More
                      </Button>
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} md={3} sm={12}>
                  <div className={Template.post_col}>
                    <div className={Template.post_img}>
                      <img
                        src="/assets/cms-img/our_commitment-300x200.jpg"
                        alt="Post Image"
                        title="Post Image"
                      />
                    </div>
                    <div className={Template.post_content}>
                      <h2 className={Template.post_title}>Our Commitment</h2>
                      <p className={Template.moretext}>
                        Quality assurance and demand meeting ends are our
                        unconditional thriving factor. We have a strict
                        adherence and compliance to the norms, rules
                      </p>
                      <Button
                        className={Template.post_button}
                        endIcon={<ArrowForwardOutlinedIcon />}
                      >
                        Read More
                      </Button>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
          {/* END Word in the market section */}

          <Grid container spacing={3} className={classes.bgimage} pb={5}>
            <Grid item xs={4}>
              <FooterCol>
                <img className="ComLogo" src="/assets/logo2.svg" alt="" />
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
export default PipeCmsPage;
