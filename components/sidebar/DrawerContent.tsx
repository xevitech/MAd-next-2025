import { Box, Typography, Grid, List, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MuiTabs, TabBtn } from "../category/style";
import {
  CategoriesMainHeading,
  Listitems,
  MoreCategories,
  SeeMoreCategories,
} from "./sidebarstyle";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "@mui/styles";
import { useSelector } from "react-redux";
import { apiClient } from "../common/common";
import { useRouter } from "next/router";
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

export default function DrawerContent() {
  const router = useRouter();
  const [value, setValue] = React.useState(0);
  const [subCategoryList, setSubCategoryList] = useState<any>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const { slug } = categoryList[newValue];
    FetchChildCategoryDetail(slug);
    setValue(newValue);
  };

  const SliderThumbnails = styled(Box)({
    borderRadius: "0px",
    padding: "8px",
    margin: "0 ",
    "& .slick-track": {
      display: "flex",
      gap: "10px",
      "& .slick-slide": {
        "& img": {
          border: "1px solid #e7e7e7",
          padding: "2px",
        },
      },
    },
    "& .slick-arrow": {
      "&:before": {
        color: "#6e6e6e",
        fontSize: "26px",
      },
    },
    "& .slick-prev": {
      left: "-10px",
      zIndex: "1",
    },
    "& .slick-next": {
      right: "-4px",
      zIndex: "1",
    },
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 10,
    arrow: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  let arr = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1,
  ];

  const { categoryList } = useSelector((state: any) => state.header);

  useEffect(() => {
    if (categoryList.length > 0 && subCategoryList.length == 0) {
      FetchChildCategoryDetail(categoryList[0].slug);
    }
  }, [categoryList]);

  const FetchChildCategoryDetail = async (slug) => {
    let response: any = await apiClient(
      `menu/SubCategoryList?slug=${slug}`,
      "get"
    );
    if (response.status == 200) {
      setSubCategoryList(response?.data?.[0]?.sub_category ?? []);
    }
  };

  return (
    <>
      <Box sx={{ padding: "12px", width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <MuiTabs
            value={value}
            onChange={(e, newValue) => handleChange(e, newValue)}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            {categoryList.map((v) => (
              <TabBtn
                key={v.id}
                sx={{ minWidth: "12% !important" }}
                icon={
                  <img
                    alt="test avatar"
                    src={
                      value !== 0
                        ? "/assets/blackbulbcategory.png"
                        : "/assets/Bulbcategory.png"
                    }
                    style={{ width: "auto", height: "40px" }}
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
                  </Box>
                }
                {...a11yProps(0)}
              />
            ))}
          </MuiTabs>
          <CustomTabPanel value={value} index={value}>
            <Box sx={{ marginTop: "24px" }}>
              <Grid container spacing={2}>
                {subCategoryList.map((sub) => (
                  <Grid item xs={12} sm={6} lg={2} xl={2} key={sub.id}>
                    <Box>
                      <CategoriesMainHeading
                        onClick={() => {
                          router.push(
                            `/category/${categoryList?.[value]?.slug}/${sub.slug}`
                          );
                        }}
                      >
                        {sub.name}
                      </CategoriesMainHeading>
                      <Box>
                        <List sx={{ paddingTop: "0px" }}>
                          {sub.sub_category.map((child) => (
                            <Box
                              key={child.id}
                              onClick={() => {
                                router.push(
                                  `/category/${categoryList?.[value]?.slug}/${sub.slug}/${child.slug}`
                                );
                              }}
                            >
                              <Listitems>{child.name}</Listitems>
                            </Box>
                          ))}
                        </List>
                      </Box>
                    </Box>
                  </Grid>
                ))}

                {subCategoryList.length > 0 && (
                  <Grid item xs={12} sm={12} lg={12} xl={12}>
                    <Box>
                      <MoreCategories
                        onClick={() =>
                          router.push(
                            `/category/${categoryList?.[value]?.slug}`
                          )
                        }
                      >
                        More Categories...
                      </MoreCategories>
                    </Box>
                  </Grid>
                )}
                <Grid item xs={12} sm={12} lg={12} xl={12}>
                  <Box>
                    <Divider variant="fullWidth" orientation="horizontal" />
                  </Box>
                </Grid>
              </Grid>
              <Box>
                <SliderThumbnails>
                  <Slider {...settings}>
                    {arr.map((v, i) => (
                      <div>
                        <h3 style={{ color: "red" }}>{i + 1}</h3>{" "}
                      </div>
                    ))}
                  </Slider>
                </SliderThumbnails>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <SeeMoreCategories>See More Products</SeeMoreCategories>
              </Box>
            </Box>
          </CustomTabPanel>
        </Box>
      </Box>
    </>
  );
}
