import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  BannerDescription,
  BannerDescriptionBox,
  CategoryMainBox,
  GridAlign,
  GridBorder,
  ImageHeading,
  ImageSubHeading,
  InnerAccordion,
  MuiTabs,
  SubCategoryTab,
  SubHeading,
  SubHeadingSubText,
  Subcategorybox,
  TabBtn,
  TabIcons,
  TabRightContent,
  TabSubLink,
  ThickBorder,
  ThinBorder,
} from "./style";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Banner from "./Banner";
import { useRouter } from "next/router";
import { apiClient } from "../common/common";
import { ProductListTile } from "../miniSite/styled";
import ProductModule from "@/components/miniSite/Products/product.module.css";
import { useSelector } from "react-redux";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
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
        <Box sx={{ p: 0 }}>
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

const SubCategoryDetail = ({ list, categoryData }) => {
  const router = useRouter();
  const subCategoryList =
    useSelector((state: any) => state.categoryDetail)?.subCategoryDetail ?? [];
  const { categoryDetail } = useSelector((state: any) => state.categoryDetail);
  const [expanded, setExpanded] = React.useState<any>(null);
  const [subChildCategoryList, setChildSubCategoryList] = useState<any>([]);
  const [previousCategoryList, setPreviousSubCategoryList] = useState<any>([]);
  const categoryList =
    useSelector((state: any) => state.header)?.categoryList ?? [];

  const AccordionHandleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        style={{ flexGrow: 1 }}
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <TabRightContent>
            <Typography>{children}</Typography>
          </TabRightContent>
        )}
      </div>
    );
  }
  const { query, push } = useRouter();

  useEffect(() => {
    if (query?.id[2]) {
      FetchChildCategoryDetail(query?.id[2]);
    }
  }, [subCategoryList, query]);

  const FetchChildCategoryDetail = async (slug) => {
    let response: any = await apiClient(
      `menu/SubCategoryList?slug=${slug}`,
      "get"
    );
    if (response.status == 200) {
      setChildSubCategoryList(response?.data?.[0]?.sub_category ?? []);
    }
  };

  useEffect(() => {
    setExpanded(list?.categoryList?.[0]?.slug);
  }, [subCategoryList]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const TabIndex = categoryList?.findIndex((v) => v.slug == query?.category);
  const categoryBreadCrumbs = categoryList?.[TabIndex];
  const subCategoryBreadCrumbs = categoryList?.[TabIndex]?.sub_category?.find(
    (v) => v?.slug == query?.id?.[0]
  );
  const previousRoute = router.asPath.replace("/category/", "");

  const NavigateHandler = (slug) => {
    window.open(`/productlist?category=${slug}`, "_blank", "noreferrer");
  };

  return (
    <>
      <CategoryMainBox>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              "& .MuiTabs-root": {
                width: "80%",
              },
            }}
          >
            <MuiTabs
              value={TabIndex}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
            >
              {categoryList.map((v) => (
                <TabBtn
                  onClick={() =>
                    router.push(
                      `/category/${v.slug}/${v?.sub_category?.[0]?.slug}`
                    )
                  }
                  icon={
                    <img
                      alt="test avatar"
                      src={v.icon}
                      style={{ height: "36px" }}
                    />
                  }
                  iconPosition="start"
                  label={
                    <Box
                      sx={{
                        textAlign: "left",
                        zIndex: "1",
                        position: "relative",
                      }}
                    >
                      <span className="smallervalue">{v.name}</span>
                      {/* <span className="largervalue"> Generation</span> */}
                    </Box>
                  }
                  {...a11yProps(0)}
                />
              ))}
            </MuiTabs>
          </Box>
          <CustomTabPanel value={value} index={value}>
            <Box sx={{ marginTop: "24px" }}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={3}
                  lg={3}
                  xl={2.5}
                  sx={{ position: "relative" }}
                >
                  {/* <SubCategoryTab> */}
                  <Box
                    sx={{
                      border: "1px solid #dadada",
                      padding: "15px 15px 15px 0px",
                      borderRadius: "20px",
                      "& .MuiPaper-root": {
                        boxShadow: "none",
                        margin: "8px 0 !important",
                        "&::before": {
                          display: "none",
                        },
                        "& .MuiAccordionSummary-root": {
                          padding: "0",
                          minHeight: "auto",
                          "& .MuiAccordionSummary-content": {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            margin: "0",
                            "& .MuiSvgIcon-root": {
                              display: "inline-block",
                              transition: "all ease .3s",
                              transform: "rotate(0deg)",
                            },
                            "&.Mui-expanded": {
                              "& .MuiSvgIcon-root": {
                                transform: "rotate(-180deg)",
                              },
                              ".accordiontitle": {
                                color: "#d7282f",
                              },
                            },
                          },
                        },
                      },
                    }}
                  >
                    <>
                      {list?.data.map((ele) => (
                        <InnerAccordion sx={{ marginLeft: "14px" }}>
                          <Accordion
                            sx={{ padding: "3px 0 0 6px" }}
                            expanded={expanded == ele.slug ? true : false}
                            onChange={() => setExpanded(ele.slug)}
                          >
                            <AccordionSummary
                              aria-controls="panel1d-content"
                              id="panel1d-header"
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  "& .MuiTypography-body1": {
                                    fontSize: "12px",
                                    fontWeight: "400",
                                  },
                                }}
                              >
                                {/* <TabIcons>
                                  <img src={ele.icon} alt={ele.name} />
                                </TabIcons> */}

                                <Typography
                                  className="accordiontitle"
                                  sx={{ fontSize: "14px !important" }}
                                >
                                  {ele.name}
                                </Typography>
                              </Box>
                              <KeyboardArrowDownIcon />
                            </AccordionSummary>
                            <AccordionDetails
                              sx={{
                                fontSize: "12px",
                                fontWeight: "400",
                                padding: "0px 0 6px 8px ",
                              }}
                            >
                              {list?.data?.[0]?.sub_category?.map((subb) => (
                                <InnerAccordion
                                  sx={{
                                    // marginLeft: "24px",
                                    marginTop: "0px",
                                  }}
                                  key={subb.id}
                                >
                                  <Accordion
                                    sx={{
                                      padding: "3px 0px 6px 10px",
                                    }}
                                    defaultExpanded={true}
                                  >
                                    <AccordionSummary
                                      aria-controls="panel1d-content"
                                      id="panel1d-header"
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          "& .MuiTypography-body1": {
                                            fontSize: "12px",
                                            fontWeight: "400",
                                          },
                                        }}
                                      >
                                        <Typography
                                          className="accordiontitle"
                                          sx={{ fontSize: "13px !important" }}
                                        >
                                          {subb.name}
                                        </Typography>
                                      </Box>
                                      <KeyboardArrowDownIcon />
                                    </AccordionSummary>
                                    <AccordionDetails
                                      sx={{
                                        fontSize: "12px",
                                        fontWeight: "400",
                                        padding: "4px 0 0px 10px !important",
                                      }}
                                    >
                                      <Stack sx={{}}>
                                        {subb?.sub_category?.map(
                                          (sub_child) => (
                                            <Typography
                                              key={sub_child.id}
                                              sx={{
                                                fontSize: "12px",
                                                fontWeight: "400",
                                                cursor: "pointer",
                                                transition: "all ease .3s",
                                                "&:hover": {
                                                  color: "#d7282f",
                                                  transition: "all ease .3s",
                                                },
                                              }}
                                              onClick={() => {
                                                NavigateHandler(sub_child.slug);
                                              }}
                                            >
                                              {sub_child.name}
                                            </Typography>
                                          )
                                        )}
                                      </Stack>
                                    </AccordionDetails>
                                  </Accordion>
                                </InnerAccordion>
                              ))}
                            </AccordionDetails>
                          </Accordion>
                        </InnerAccordion>
                      ))}
                    </>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9} xl={9.5}>
                  <Box
                    sx={{
                      border: "1px solid #dadada",
                      padding: "15px 15px 28px 15px",
                      borderRadius: "20px",
                    }}
                  >
                    <Banner categoryName={list?.data?.[0]} />
                    <BannerDescriptionBox>
                      <BannerDescription>
                        {list?.data?.[0]?.description}
                      </BannerDescription>
                    </BannerDescriptionBox>

                    <Subcategorybox>
                      <Grid
                        container
                        spacing={2}
                        sx={{ alignItems: "stretch" }}
                      >
                        {list?.data?.[0]?.sub_category?.map((sub) => (
                          <Grid item xs={12} sm={12} lg={6}>
                            <GridBorder sx={{ height: "100%" }}>
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} lg={2}>
                                  <Box sx={{}}>
                                    <img
                                      src={sub?.image}
                                      alt={sub?.name}
                                      style={{
                                        borderRadius: "6px",
                                        width: "100%",
                                      }}
                                    />
                                  </Box>
                                </Grid>
                                <GridAlign item xs={12} sm={12} lg={10}>
                                  <Box>
                                    <ImageHeading
                                      sx={{
                                        cursor: "pointer",
                                        transition: "all ease .3s",
                                        "&:hover": {
                                          color: "#d7282f",
                                          transition: "all ease .3s",
                                        },
                                      }}
                                      onClick={() => NavigateHandler(sub?.slug)}
                                    >
                                      {sub?.name}
                                    </ImageHeading>
                                    <ImageSubHeading>
                                      {sub?.description}sdsdsd
                                    </ImageSubHeading>
                                  </Box>
                                </GridAlign>
                                <Grid item xs={12} sm={12} lg={12}>
                                  <Divider></Divider>
                                </Grid>
                                {sub?.sub_category?.map((child: any) => (
                                  <Grid item xs={12} sm={12} lg={6}>
                                    <ThinBorder>
                                      <ThickBorder>
                                        <SubHeading
                                          style={{ cursor: "pointer" }}
                                          onClick={() =>
                                            NavigateHandler(child?.slug)
                                          }
                                        >
                                          {child?.name}
                                        </SubHeading>
                                      </ThickBorder>
                                      <SubHeadingSubText>
                                        {child?.description}
                                      </SubHeadingSubText>
                                    </ThinBorder>
                                  </Grid>
                                ))}
                              </Grid>
                            </GridBorder>
                          </Grid>
                        ))}
                      </Grid>
                    </Subcategorybox>
                    <ProductListTile>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "18px",
                          marginBottom: "8px",
                          fontWeight: "600",
                        }}
                      >
                        {
                          subCategoryList[0]?.sub_category?.find(
                            (v: any) => v.slug == query?.id?.[2]
                          )?.name
                        }
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "13px",
                          marginBottom: "16px",
                        }}
                      >
                        {
                          subCategoryList[0]?.sub_category?.find(
                            (v: any) => v.slug == query?.id?.[2]
                          )?.description
                        }
                      </Typography>
                    </ProductListTile>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CustomTabPanel>
        </Box>
      </CategoryMainBox>
      <Box>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            lg={3}
            xl={2}
            sx={{ position: "relative" }}
          >
            <SubCategoryTab>
              {categoryDetail[0]?.sub_category.map((v, i) => {
                return (
                  <Accordion
                    expanded={expanded == v.id}
                    onChange={AccordionHandleChange(v.id)}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          "& .MuiTypography-body1": {
                            fontSize: "14px",
                            fontWeight: "600",
                          },
                        }}
                      >
                        <TabIcons>
                          <img src={v.icon} alt={v.name} />
                        </TabIcons>
                        <Typography>{v.name}</Typography>
                      </Box>
                      <KeyboardArrowDownIcon />
                    </AccordionSummary>
                    <AccordionDetails>
                      <TabSubLink>
                        <List>
                          {v.sub_category.map((sub, i) => {
                            return (
                              <ListItem key={sub.id}>
                                <Link
                                  className={
                                    sub.slug == query?.id[2] ? "li-active" : ""
                                  }
                                  sx={{ cursor: "pointer" }}
                                  underline="none"
                                  onClick={(e) => {
                                    push(
                                      `/category/${query?.id?.[0]}/${v.slug}/${sub.slug}`
                                    );
                                  }}
                                >
                                  {sub.name}
                                </Link>
                              </ListItem>
                            );
                          })}
                        </List>
                      </TabSubLink>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </SubCategoryTab>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SubCategoryDetail;
