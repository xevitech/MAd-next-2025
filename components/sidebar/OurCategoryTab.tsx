import React, { useEffect, useRef, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  AccordionTxt,
  CategoriesMainHeading,
  CategoryHoverContainer,
  CategoryHoverMenuBox,
  CategoryMobileOuter,
  HiddenTab,
  InnerColumnBox,
  Listitems,
  MainTxt,
  MenuHoverBoxOuter,
  MenuMainCategoryList,
  MenuSubCategoryList,
  MoreCategories,
  RPInfoText,
  RightRebButton,
  SecondAcd,
  StylePopoverMenu,
  SubCategoryBox,
} from "./sidebarstyle";
import { useDispatch, useSelector } from "react-redux";
import { apiClient } from "../common/common";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Popover, MenuItem } from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { setBreadCrumbsData } from "@/hooks/CategoryReducer";
import Link from "next/link";
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
  // "& .slick-arrow": {
  //   "&:before": {
  //     color: "#6e6e6e",
  //     fontSize: "26px",
  //   },
  // },
  // "& .slick-prev": {
  //   left: "-10px",
  //   zIndex: "1",
  // },
  // "& .slick-next": {
  //   right: "-4px",
  //   zIndex: "1",
  // },
});
const ManageListButton = styled(Button)({
  background: "#d7282f",
  textTransform: "capitalize",
  padding: "6px 12px",
  margin: "12px 0 0",
  borderRadius: "2px",
  boxShadow: "none",
  "& img": {
    width: "16px",
  },
  "&:hover": {
    background: "#97272b",
  },
  "@media screen and (max-width:1600px)": {
    padding: "3px 14px",
    fontSize: "12px",
    height: "37px",
  },
  "@media screen and (max-width:899px)": {
    display: "none",
  },
});

var categoryslidesettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  arrow: false,
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },

    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 8,
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

const SliderSettings = (list) => {
  return {
    dots: true,
    infinite: true,
    speed: 500,
    // slidesToShow: list.length > 2 ? 2 : list.length,
    // slidesToScroll: list.length > 2 ? 2 : list.length,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrow: false,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          // slidesToShow: list.length > 2 ? 2 : list.length,
          // slidesToScroll: list.length > 2 ? 2 : list.length,
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 1024,
        settings: {
          // slidesToShow: list.length > 4 ? 4 : list.length,
          // slidesToScroll: list.length > 4 ? 4 : list.length,
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 899,
        settings: {
          // slidesToShow: list.length > 4 ? 4 : list.length,
          // slidesToScroll: list.length > 4 ? 4 : list.length,
          slidesToShow: 4,
          slidesToScroll: 4,
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
};

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
      {value >= 0 && value === index && (
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

export default React.memo(function OurCategoryTab() {
  const [value, setValue] = React.useState(-1);
  const [subCategoryList, setSubCategoryList] = useState<any>([]);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [cachedCatedgoryList, setCachedCategoryList] = useState<any>([]);
  const [activeParentCatogery, setActiveParentCatogery] = useState(0);
  const [activeCategories, setActiveCategories] = useState([0, 0, 0, 0]);
  const [activePathToRedirect, setActivePathToRedirect] = useState("");
  const [activeSlugs, setActiveSlugs] = useState<string[]>([]); // To store the slugs for each level
  const [activeNames, setActiveNames] = useState<string[]>([]); // To store the name for each level for breadcrumbs

  const router = useRouter();
  const dispatch = useDispatch();

  const FetchChildCategoryDetail = async (slug) => {
    let cachedList = cachedCatedgoryList.filter((v) => v.parent_slug == slug);
    if (cachedList.length > 0) {
      setSubCategoryList(cachedList);
      return;
    }
    let response: any = await apiClient(
      `menu/SubCategoryList?slug=${slug}`,
      "get"
    );
    if (response.status == 200) {
      let list = response?.data?.[0]?.sub_category?.map((v) => ({
        ...v,
        parent_slug: slug,
      }));
      setSubCategoryList(list);
      setCachedCategoryList((prev) => {
        return [...prev, ...list];
      });
    }
  };

  const handleChange = (newValue: number) => {
    setActiveParentCatogery(0);
    setValue(newValue);
    const { slug } = categoryList[newValue];
    FetchChildCategoryDetail(slug);
  };

  // const { categoryList } = useSelector((state: any) => state.header);

  useEffect(() => {
    const fetchCatogeriesLists = async () => {
      try {
        let response = await apiClient(
          `front/frontEndcategoryList?with_product=${1}`,
          "get"
        );
        if (response.status === 200) {
          console.log(response.data);
          setCategoryList(response.data);
          return response.data;
        }
      } catch (err) {
        console.log("error while fetching catogories", err);
      }
    };
    fetchCatogeriesLists();
  }, []);
  const CategoriesData = [
    {
      id: 1,
      listName: "Pumps",
      subList: [
        {
          id: 4,
          list_2_name: "FeedWater Pumps",
          subList: [
            {
              id: 7,
              list_3_name: "High-Pressure Feedwater Pumps",
              subList: [
                {
                  id: 9,
                  list_4_name: "Centrifugal Pumps",
                  subList: [
                    { id: 11, list_5_name: "Multistage Centrifugal Pumps" },
                    { id: 12, list_5_name: "Axially Split Case Pumps" },
                  ],
                },
                { id: 10, list_4_name: "Reciprocating Pumps" },
              ],
            },
            { id: 8, list_3_name: "Low-Pressure Feedwater Pumps" },
          ],
        },
        { id: 5, list_2_name: "Cooling Water Pumps" },
        { id: 6, list_2_name: "Fuel Transfer Pumps" },
      ],
    },
    { id: 2, listName: "Solar Energy" },
    { id: 3, listName: "Wind Energy" },
  ];

  const selectedCategory = categoryList[value];
  const activeParentSubCategory =
    selectedCategory?.sub_category[activeParentCatogery];
  const subCategories = activeParentSubCategory?.sub_category;

  let secondSubCategories =
    subCategories?.[activeCategories[0]]?.sub_category || [];
  let thirdSubCategories =
    secondSubCategories?.[activeCategories[1]]?.sub_category || [];
  let fourthSubCategories =
    thirdSubCategories?.[activeCategories[2]]?.sub_category || [];

  const handleResetLevelsToInitial = (
    level: number,
    activeCategoriesIndexes: number[] = []
  ): number[] => {
    for (let i = level + 1; i < activeCategoriesIndexes.length; i++) {
      activeCategoriesIndexes[i] = 0;
    }
    return activeCategoriesIndexes;
  };

  const handleMouseOver = (
    level: number,
    index: number,
    catogeryDetails: any
  ) => {
    const { slug, name } = catogeryDetails;

    const newActiveCategories = [...activeCategories];
    const newActiveSlugs = [...activeSlugs];
    const newActiveBreadCrumbsNames = [...activeNames];

    // Update active category and slug for the current level
    newActiveCategories[level] = index;
    newActiveSlugs[level] = slug;
    newActiveBreadCrumbsNames[level] = name;

    // Reset subsequent levels to initial state
    handleResetLevelsToInitial(level, newActiveCategories);

    // Clear slugs for the levels below the current one
    for (let i = level + 1; i < newActiveSlugs.length; i++) {
      newActiveSlugs[i] = "";
      newActiveBreadCrumbsNames[i] = "";
    }

    const truncatedBreadcrumbs = newActiveBreadCrumbsNames?.slice(0, level + 1);

    const sectorSlug = selectedCategory?.slug;
    const parentSlug = activeParentSubCategory?.slug;
    const slugPath = newActiveSlugs
      ?.slice(0, level + 1)
      .filter(Boolean)
      .join("/");

    const path =
      `/category/${sectorSlug}` +
      (parentSlug ? `/${parentSlug}` : "") +
      (slugPath ? `/${slugPath}` : "");
    setActivePathToRedirect(path);
    // Set the updated active categories and slugs
    setActiveCategories(newActiveCategories);
    setActiveNames(truncatedBreadcrumbs);
    setActiveSlugs(newActiveSlugs);
  };

  useEffect(() => {
    document.body.classList.add("category-header");
    return () => {
      document.body.classList.remove("category-header");
    };
  });

  const sliderRef = useRef(null);
  const [isNext, setIsNext] = useState(true);

  const handleClick = () => {
    if (isNext) {
      sliderRef.current.slickNext();
    } else {
      sliderRef.current.slickPrev();
    }
    setIsNext(!isNext);
  };

  /*** New ****/
  const [hover, setHover] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleParentCategoryClick = (index: number) => {
    const sectorSlug = selectedCategory?.slug;
    const parentSlug = activeParentSubCategory?.slug;

    const sectorName = selectedCategory?.name || "";
    const parentName = activeParentSubCategory?.name || "";

    if (sectorSlug && parentSlug) {
      const newBreadCrumbs = [sectorName, parentName];
      dispatch(setBreadCrumbsData(newBreadCrumbs));
      router.push(`/category/${sectorSlug}/${parentSlug}`);
    }
  };

  const handleSubCategoryClick = (level: number, index: number) => {
    const sectorSlug = selectedCategory?.slug;
    const parentSlug = activeParentSubCategory?.slug;

    // const [sectorSlug, parentSlug, firstSubCategorySlug, secondSubCategorySlug, thirdSubCategorySlug] = activeSlugs;

    // Dynamically construct the URL based on the current level
    const slugPath = activeSlugs
      ?.slice(0, level + 1)
      .filter(Boolean)
      .join("/");

    const path =
      `/category/${sectorSlug}` +
      (parentSlug ? `/${parentSlug}` : "") +
      (slugPath ? `/${slugPath}` : "");

    const sectorName = selectedCategory?.name || "";
    const parentName = activeParentSubCategory?.name || "";

    const newBreadCrumbs = [
      sectorName,
      parentName,
      ...(activeNames?.length > 0 ? activeNames : []),
    ];
    // dispatch(setBreadCrumbsData(newBreadCrumbs))

    // Redirect using the dynamically created URL
    router.push(path);
  };

  const handleClick1 = (e) => {
    // e.preventDefault();
    router.push(activePathToRedirect);
  };
  const SubCategoryList = ({
    categories,
    activeCategory,
    setActiveCategory,
    level,
  }) => {
    return (
      <InnerColumnBox>
        <MenuSubCategoryList>
          {categories?.map((subCategory, index) => {
            const hasChildren = subCategory?.sub_category?.length > 0;

            return (
              <ListItem
                key={index}
                className={`${activeCategory === index && "selectedState"}`}
              >
                <Link href={activePathToRedirect}>
                  <ListItemText
                    onMouseEnter={() => {
                      setActiveCategory(index, subCategory, level);
                    }}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {subCategory?.name}
                  </ListItemText>
                </Link>
                {hasChildren && (
                  <IconButton edge="end" className="rightarrow">
                    <ChevronRightRoundedIcon />
                  </IconButton>
                )}
              </ListItem>
            );
          })}
        </MenuSubCategoryList>
      </InnerColumnBox>
    );
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            width: "100%",
          }}
          onMouseLeave={(e) => {
            setValue(-1);
            setSubCategoryList([]);
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              // padding: "0 0 0 12px",
              "@media screen and (max-width:899px)": {
                padding: "0",
                // margin: "0 0 0 -12px"
              },
              "& .MuiTabs-root": {
                minHeight: "40px",
              },
            }}
          >
            <Tabs
              onClick={(e) => {
                if (!isMobile)
                  router.push(
                    `/category/sector/${categoryList?.[value]?.slug}`
                  );
              }}
              value={value}
              onChange={(e, newValue) => {
                if (isMobile) {
                  router.push(
                    `/category/sector/${categoryList?.[newValue]?.slug}`
                  );
                } else {
                }
                handleChange(newValue);
              }}
              aria-label="basic tabs example"
              variant="scrollable"
              scrollButtons={false}
              sx={{
                color: "#231f20",
                "& .MuiTabs-indicator": {
                  background: "#d7282f",
                  height: "1px",
                },
                "& .MuiTab-root.Mui-selected": {
                  paddingBottom: "0px",
                  paddingTop: "0px",
                  backgroundColor: "transparent",
                  color: "#231f20",
                },
                "& .MuiTab-iconWrapper": {
                  marginRight: "5px",
                },
                "& .MuiButtonBase-root": {
                  padding: "0 30px 0 0!important",
                  minWidth: "auto",
                },
              }}
            >
              {categoryList.map((v, i) => (
                <HiddenTab
                  sx={{
                    padding: "0px 12px !important",
                    fontSize: "12px",
                    borderRadius: 0,
                  }}
                  icon={<img alt="test avatar" src={v.icon} />}
                  iconPosition="start"
                  label={v.name}
                  {...a11yProps(0)}
                  onMouseOver={(e) => {
                    value !== i && handleChange(i);
                  }}
                />
              ))}
            </Tabs>
            <Box
              sx={{
                cursor: "pointer",
                "&:hover": {
                  svg: {
                    color: "#d7282f",
                  },
                  "& .MuiTypography-root": {
                    color: "#d7282f",
                  },
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "6px",
                  alignItems: "center",
                  // padding: "2px 7px",
                  "@media screen and (max-width:899px)": {
                    display: "none",
                  },
                }}
                onClick={(e) => router.push("/category/list")}
              >
                <FormatListBulletedIcon
                  sx={{
                    color: "#231f20",
                    fontSize: "20px",
                  }}
                />
                <Box>
                  <Typography
                    sx={{
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#000",
                      "@media screen and (max-width:767px)": {
                        fontSize: "12px",
                      },
                    }}
                  >
                    View All Categories
                  </Typography>
                </Box>
              </Box>
            </Box>
            {/* <ManageListButton onClick={(e) => router.push("/category/list")} variant="contained" endIcon={<img src="/assets/images/header/view-category-icon.svg" />}>
              Manage My Listing
            </ManageListButton> */}
          </Box>

          <CustomTabPanel value={value} index={value}>
            <Box
              sx={{
                marginTop: "0px !important",
                backgroundColor: "#fff",
                padding: "0 20px 10px",
                overflowY: "scroll !important",
                maxHeight: "600px",
                position: "absolute",
                top: "100%",
                left: "0",
                zIndex: 10,
                width: "100%",
                boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
                "@media screen and (max-width: 1024px)": {
                  padding: "0",
                  overflow: "hidden",
                },

                "&::-webkit-scrollbar": {
                  width: "8px",
                },

                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                  borderRadius: "10px",
                },

                "&::-webkit-scrollbar-thumb": {
                  background: "#d2d2d2",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#6d6d6d !important",
                },
              }}
            >
              {/* <Grid container spacing={2}>
                {subCategoryList.slice(0, 12).map((sub) => (
                  <Grid item xs={12} sm={6} lg={2} xl={2} key={sub.id}>
                    <Box sx={{}}>
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
                                  `/category/${categoryList?.[value]?.slug}/${sub.slug}`
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

                {subCategoryList.length > 12 && (
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
              </Grid> */}
              {/* <>
                <Box sx={{ marginTop: "12px", position: "relative" }}>
                  <SliderThumbnails
                    sx={{
                      ".slick-dots li.slick-active button:before": {
                        color: "#d7282f !important",
                        height: "10px",
                        width: "10px",
                        borderRadius: "50%",
                        border: "1px solid #D7282F",
                        background: "#D7282F",
                      },
                      ".slick-dots li button:before": {
                        width: "10px",
                        height: "10px",
                        border: "1px solid #D7282F",
                        borderRadius: "50%",
                        content: '""',
                        opacity: "1",
                      },
                    }}
                  >
                    {value >= 0 && (
                      <Slider
                        {...SliderSettings(categoryList[value]?.product_list)}
                      >
                        {categoryList[value]?.product_list?.map((v, i) => (
                          <Box key={i}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                src={v?.photos?.source}
                                alt={v.name}
                                style={{ height: "80px", objectFit: "cover" }}
                              />
                            </Box>
                            <Box sx={{ textAlign: "center" }}>
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  color: "#231f20",
                                  fontWeight: "500",
                                }}
                              >
                                {v.name}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Slider>
                    )}
                  </SliderThumbnails>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                  }}
                >
                </Box>
              </> */}

              {/* Start New Category Multi level Menu */}
              <CategoryHoverContainer
                style={{ display: isMobile ? "none" : "block" }}
              >
                <Grid container spacing={2}>
                  <Grid item sm={12} md={9} lg={9}>
                    <CategoryHoverMenuBox>
                      <Grid container spacing={1}>
                        <Grid item xs={4} sm={3} md={2.5}>
                          <InnerColumnBox>
                            <MenuMainCategoryList>
                              {selectedCategory?.sub_category?.map(
                                (parentCatogery, index) => (
                                  <ListItem
                                    className={`${
                                      activeParentCatogery === index &&
                                      "selectedState"
                                    }`}
                                    onClick={() =>
                                      handleParentCategoryClick(index)
                                    }
                                    onMouseEnter={() => {
                                      setActiveParentCatogery(index);
                                      setHover(true);
                                      handleResetLevelsToInitial(
                                        -1,
                                        activeCategories
                                      );
                                    }}
                                  >
                                    <ListItemText>
                                      {parentCatogery.name}
                                    </ListItemText>
                                    <IconButton edge="end">
                                      <ChevronRightRoundedIcon />
                                    </IconButton>
                                  </ListItem>
                                )
                              )}
                            </MenuMainCategoryList>
                          </InnerColumnBox>
                        </Grid>
                        <Grid item xs={8} sm={9} md={9.5}>
                          <SubCategoryBox>
                            <div
                              className="slider-container"
                              style={{ position: "relative" }}
                            >
                              <Slider
                                ref={sliderRef}
                                {...categoryslidesettings}
                              >
                                <SubCategoryList
                                  categories={subCategories}
                                  activeCategory={activeCategories[0]}
                                  setActiveCategory={(
                                    index,
                                    catogeryDetails
                                  ) => {
                                    handleMouseOver(0, index, catogeryDetails);
                                  }}
                                  level={0}
                                />

                                <SubCategoryList
                                  categories={secondSubCategories}
                                  activeCategory={activeCategories[1]}
                                  setActiveCategory={(index, catogeryDetails) =>
                                    handleMouseOver(1, index, catogeryDetails)
                                  }
                                  level={1}
                                />

                                <SubCategoryList
                                  categories={thirdSubCategories}
                                  activeCategory={activeCategories[2]}
                                  setActiveCategory={(index, catogeryDetails) =>
                                    handleMouseOver(2, index, catogeryDetails)
                                  }
                                  level={2}
                                />

                                <SubCategoryList
                                  categories={fourthSubCategories}
                                  activeCategory={activeCategories[3]}
                                  setActiveCategory={(index, catogeryDetails) =>
                                    handleMouseOver(3, index, catogeryDetails)
                                  }
                                  level={3}
                                />
                              </Slider>

                              <RightRebButton
                                variant="contained"
                                onClick={handleClick}
                              >
                                {isNext ? (
                                  <ChevronRightRoundedIcon />
                                ) : (
                                  <ChevronLeftRoundedIcon />
                                )}
                              </RightRebButton>
                            </div>
                          </SubCategoryBox>
                        </Grid>
                      </Grid>
                    </CategoryHoverMenuBox>
                  </Grid>
                  <Grid item sm={12} md={3} lg={3}>
                    <Box>
                      <SliderThumbnails
                        sx={{
                          ".slick-dots li.slick-active button:before": {
                            color: "#d7282f !important",
                            height: "6px",
                            width: "6px",
                            borderRadius: "50%",
                            border: "1px solid #D7282F",
                            background: "#D7282F",
                          },
                          ".slick-dots li button:before": {
                            width: "6px",
                            height: "6px",
                            border: "1px solid #D7282F",
                            borderRadius: "50%",
                            content: '""',
                            opacity: "1",
                          },
                          "& .slick-dots": {
                            bottom: "-50px",
                          },
                          "& .slick-dots li": {
                            margin: 0,
                          },
                        }}
                      >
                        {value >= 0 && (
                          <Slider
                            {...SliderSettings(
                              categoryList[value]?.product_list
                            )}
                          >
                            {categoryList[value]?.product_list?.map((v, i) => (
                              <Box key={i}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "100px",
                                  }}
                                >
                                  <img
                                    src={v?.photos?.source}
                                    alt={v.name}
                                    style={{
                                      height: "100%",
                                      width: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                </Box>
                                <RPInfoText>
                                  <Typography variant="h5">
                                    Power Generation{" "}
                                  </Typography>
                                  <Typography variant="body2">
                                    {v.name}
                                  </Typography>
                                </RPInfoText>
                              </Box>
                            ))}
                          </Slider>
                        )}
                      </SliderThumbnails>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "30px",
                      }}
                    ></Box>
                  </Grid>
                </Grid>
              </CategoryHoverContainer>
              {/* End New Category Multi level Menu */}

              {/* {isMobile && (
                <CategoryMobileOuter>
                  {selectedCategory?.sub_category.map(
                    (firstSubCatogery, firstSubCatogeryIndex) => (
                      <Accordion
                        sx={{ border: "none" }}
                        defaultExpanded
                        key={firstSubCatogeryIndex}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <MainTxt>{firstSubCatogery?.name}</MainTxt>
                        </AccordionSummary>
                        {firstSubCatogery?.sub_category.map(
                          (secondSubCatogery, secondSubCatogeryIndex) => {
                            const showExpandedFirstSubCatogery =
                              secondSubCatogeryIndex === 0 &&
                              secondSubCatogery?.sub_category?.length > 0;
                            return (
                              <Accordion
                                sx={{ border: "none" }}
                                defaultExpanded={showExpandedFirstSubCatogery}
                                key={secondSubCatogeryIndex}
                              >
                                <AccordionSummary
                                  expandIcon={
                                    secondSubCatogery?.sub_category.length >
                                      0 && <ExpandMoreIcon />
                                  }
                                >
                                  <SecondAcd>
                                    {secondSubCatogery?.name}
                                  </SecondAcd>
                                </AccordionSummary>

                                {secondSubCatogery?.sub_category.length > 0 &&
                                  secondSubCatogery?.sub_category?.map(
                                    (
                                      thirdSubCatogery,
                                      thirdSubCatogeryIndex
                                    ) => {
                                      return (
                                        <Accordion key={thirdSubCatogeryIndex}>
                                          <AccordionSummary
                                            expandIcon={
                                              thirdSubCatogery?.sub_category >
                                                0 && <ExpandMoreIcon />
                                            }
                                          >
                                            <AccordionTxt>
                                              {thirdSubCatogery?.name}
                                            </AccordionTxt>
                                          </AccordionSummary>

                                          {thirdSubCatogery?.sub_category
                                            .length > 0 &&
                                            thirdSubCatogery?.sub_category?.map(
                                              (
                                                fourthSubCategories,
                                                fourthSubCategoriesIndex
                                              ) => {
                                                return (
                                                  <Accordion
                                                    key={
                                                      fourthSubCategoriesIndex
                                                    }
                                                  >
                                                    <AccordionSummary
                                                      expandIcon={
                                                        fourthSubCategories?.sub_category >
                                                          0 && (
                                                          <ExpandMoreIcon />
                                                        )
                                                      }
                                                    >
                                                      <AccordionTxt>
                                                        {
                                                          fourthSubCategories?.name
                                                        }
                                                      </AccordionTxt>
                                                    </AccordionSummary>
                                                  </Accordion>
                                                );
                                              }
                                            )}
                                        </Accordion>
                                      );
                                    }
                                  )}
                              </Accordion>
                            );
                          }
                        )}
                      </Accordion>
                    )
                  )}
                </CategoryMobileOuter>
              )} */}
            </Box>
          </CustomTabPanel>
        </Box>
      </Box>
    </>
  );
})
