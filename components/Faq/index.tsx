import {
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  A_answer,
  AccordionBoxshadow,
  Accordionbackground,
  Answer,
  BannerTxt,
  Bgimage,
  CustomeTab,
  Faqheading,
  Heading,
  Headingsubheadingbox,
  ImageBox,
  Imagenone,
  Innerbox,
  Outerbox,
  Questions,
  SearchButton,
  Sliderbox,
  SliderboxDots,
  Sliderboxstyle,
  SubHeading,
  TabBox,
  Tabinnerbox,
  TabsImage,
  Textoverimg1,
  Textoverimg3,
} from "./style";
import Tabs from "@mui/material/Tabs";
import AccordionDetails from "@mui/material/AccordionDetails";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
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
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function faq() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [domLoaded, setDomLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [faqData, setFaqData] = useState([]);
  const [moduleTypes, setModuleTypes] = useState([]);
  const [selectedModuleType, setSelectedModuleType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(faqData);

  const handleChange = (event: React.SyntheticEvent, newValue: number): any => {
    setValue(newValue);
    setSelectedModuleType(moduleTypes[newValue]);
  };
  const getFaqsData = async (value) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/category/faq/manager/list?module_type=${value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.token()}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error(`Error fetching top seller data: ${res.status}`);
      }
      const responseData = await res.json();
      setFaqData(responseData.data);
      const uniqueModuleTypes = [
        ...new Set(
          responseData.data.map((item) => item.module_type).filter(Boolean)
        ),
      ];
      setModuleTypes(uniqueModuleTypes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFaqsData("profile");
  }, []);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);
  const [expanded4, setExpanded4] = React.useState(false);
  const [expanded5, setExpanded5] = React.useState(false);
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(faqData);
    } else {
      const filteredFAQs = faqData.filter((faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredFAQs);
    }
    setExpanded(false);
  }, [searchTerm, faqData]);

  return (
    <>
      {domLoaded && (
        <Box sx={{ backgroundColor: "#FCF8F8", pb: 8 }}>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box>
                  <Bgimage>
                    <BannerTxt>
                      <Box>
                        <Textoverimg1 variant="h1">
                          Frequently Ask Questions
                        </Textoverimg1>
                      </Box>
                    </BannerTxt>
                  </Bgimage>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Sliderbox>
            <SliderboxDots>
              <Sliderboxstyle></Sliderboxstyle>
              <Sliderboxstyle></Sliderboxstyle>
              <Sliderboxstyle></Sliderboxstyle>
            </SliderboxDots>
          </Sliderbox>
          <Box>
            <Container maxWidth={"xl"}>
              <Headingsubheadingbox>
                <Heading sx={{ textAlign: "center" }}>
                  Merchant AD | the best industry services
                </Heading>
                <SubHeading sx={{ textAlign: "center" }}>
                  What can we help you with today?
                </SubHeading>
              </Headingsubheadingbox>
              <Outerbox>
                <Innerbox>
                  <TabBox display={{ xs: "block", md: "flex" }}>
                    <Tabs
                      orientation={isMobile ? "horizontal" : "vertical"}
                      variant="scrollable"
                      value={value}
                      onChange={handleChange}
                      aria-label="Vertical tabs example"
                      sx={{
                        "& .MuiTabs-indicator": { display: "none" },
                        m: 1,
                        overflow: "unset",
                        "@media screen and (max-width:900px)": {
                          height: "auto",
                        },
                      }}
                    >
                      <CustomeTab
                        label="Profile"
                        {...a11yProps(0)}
                        onClick={() => {
                          getFaqsData("profile");
                        }}
                      />
                      <CustomeTab
                        label="Enquiry Center"
                        {...a11yProps(1)}
                        onClick={() => {
                          getFaqsData("enquiry");
                        }}
                      />
                      <CustomeTab
                        label="RFQs"
                        {...a11yProps(2)}
                        onClick={() => {
                          getFaqsData("rfqs");
                        }}
                      />
                      <CustomeTab
                        label="Order And Invoice"
                        {...a11yProps(3)}
                        onClick={() => {
                          getFaqsData("order_invoice");
                        }}
                      />
                      <CustomeTab
                        label="Products"
                        {...a11yProps(4)}
                        onClick={() => {
                          getFaqsData("product");
                        }}
                      />
                      <CustomeTab
                        label="Quotations"
                        {...a11yProps(5)}
                        onClick={() => {
                          getFaqsData("quotations");
                        }}
                      />
                      <CustomeTab
                        label="Seller tool"
                        {...a11yProps(6)}
                        onClick={() => {
                          getFaqsData("seller_tools");
                        }}
                      />
                      <CustomeTab
                        label="Pricing Settings"
                        {...a11yProps(7)}
                        onClick={() => {
                          getFaqsData("price_setting");
                        }}
                      />
                      <CustomeTab
                        label="Company Settings"
                        {...a11yProps(8)}
                        onClick={() => {
                          getFaqsData("company_setting");
                        }}
                      />
                      <CustomeTab
                        label="Pricing Settings"
                        {...a11yProps(9)}
                        onClick={() => {
                          getFaqsData("price_setting");
                        }}
                      />
                      <Box mt={3}>
                        <Imagenone
                          src="/assets/faqbelowtab.svg"
                          alt=""
                          style={{ height: "300px" }}
                        />
                      </Box>
                    </Tabs>
                    <TabPanel value={value} index={value}>
                      <Tabinnerbox>
                        <ImageBox>
                          <TabsImage src="/assets/faqbg.svg" alt="" />
                          <BannerTxt>
                            <Textoverimg3 sx={{ color: "black" }}>
                              All Industries
                            </Textoverimg3>
                          </BannerTxt>
                        </ImageBox>
                        <Box mt={2}>
                          <Box>
                            <Heading>Merchant AD | Useful information</Heading>
                          </Box>
                          <Box>
                            <SubHeading>
                              What can we help you with today?
                            </SubHeading>
                          </Box>
                        </Box>
                        <Box mt={2}>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "5px",
                              alignItems: "center",
                            }}
                          >
                            <TextField
                              variant="outlined"
                              placeholder="Enter a manufacturer or a Model. Eg Gas compressor, Generators..."
                              sx={{
                                width: "80%",
                                border: "1px solid #CCCEDD",
                                borderRadius: "3px",
                                backgroundColor: "#F9F9F9",
                                "@media only screen and (max-width: 400px)": {
                                  "& .MuiInputBase-input": {
                                    padding: "12px 0px",
                                  },
                                },
                              }}
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <IconButton sx={{ padding: "0px" }}>
                                      <SearchIcon
                                        sx={{
                                          color: "#d7282f",
                                          padding: "0px",
                                        }}
                                      />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                            <SearchButton>Search</SearchButton>
                          </Box>
                        </Box>
                        <Box sx={{ marginTop: "15px" }}>
                          <Faqheading>Frequently Ask Questions</Faqheading>
                        </Box>
                        <Box>
                          {filteredData.length > 0 ? (
                            filteredData?.map((faq, index) => {
                              return (
                                <Box mt={3} key={index}>
                                  <AccordionBoxshadow
                                    expanded={expanded === `panel1${index}`}
                                    onChange={handleAccordionChange(
                                      `panel1${index}`
                                    )}
                                  >
                                    <Accordionbackground
                                      expandIcon={
                                        expanded === `panel1${index}` ? (
                                          <RemoveOutlinedIcon />
                                        ) : (
                                          <AddOutlinedIcon />
                                        )
                                      }
                                      aria-controls={`panel1${index}-content`}
                                      id={`panel1${index}-header`}
                                    >
                                      <Questions>Q{index + 1}: {faq.question}</Questions>
                                    </Accordionbackground>
                                    <AccordionDetails>
                                      <Answer>
                                        <A_answer>A{index + 1}:</A_answer> {faq.answer}
                                      </Answer>
                                    </AccordionDetails>
                                  </AccordionBoxshadow>
                                </Box>
                              );
                            })
                          ) : (
                            <p>No FAQs available.</p>
                          )}
                        </Box>
                      </Tabinnerbox>
                    </TabPanel>
                  </TabBox>
                </Innerbox>
              </Outerbox>
            </Container>
          </Box>
        </Box>
      )}
    </>
  );
}

export default faq;
