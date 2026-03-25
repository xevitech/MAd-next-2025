import {
  Box,
  Grid,
  Container,
  TextField,
  Skeleton,
  List,
  ListItem,
  ListItemIcon,
  Breadcrumbs,
  Link,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Bgimage,
  BoxOne,
  Categorybox,
  Categorytext,
  DateYear,
  Datetext,
  Faceboo,
  Followbox,
  Followtext,
  Icon1,
  Imgbox,
  Instagra,
  Linkdecoration,
  LinkedI,
  Paradetail,
  Recentbox,
  Recenttext,
  Rhombus,
  SearchBox,
  SearchIconWrapper,
  Searchbar,
  Searchtext,
  Sidehead,
  Sidetext,
  Textoverimg1,
  Twitte,
  CategoryListing,
  Datefont,
  Sixteen,
  BannerTxt,
  YouTubeIco,
  CreatedInfo,
  BlogCreated,
  DetailCategoryList,
  NoBlogBox,
  SuggestioBoxList,
  BlogImagee,
  BlogContentdiv,
  BreadcrumbSec,
  SliderImgbox,
} from "./style";
import SearchIcon from "@mui/icons-material/Search";

import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import {
  blog,
  categoryOfBlogs,
  recentBlogsList,
  singleBlogDetail,
} from "@/hooks/Blog";
import { useRouter } from "next/router";
import moment from "moment";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/styles";
import Head from "next/head";
import Slider from "react-slick";

export default function Blogdetail() {
  const [searchProudct, setSearchProudct] = useState("");
  const [suggestionList, setSuggestionList] = useState([]);
  const [toggleSuggetionList, setToggleSuggestionList] =
    useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<any>("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    singleBlog,
    loader,
    recentBlogs,
    blogsCategory,
    blogListed,
    singleLoader,
  } = useSelector((state: any) => state.blogs);

  useEffect(() => {
    router?.query?.blog && dispatch(singleBlogDetail(router?.query?.blog));
    router?.query?.blog && dispatch(recentBlogsList(5));
    router?.query?.blog && dispatch(categoryOfBlogs(100));
  }, [dispatch, router]);

  const BreadcrumbsStyle = styled(Box)(() => ({
    "& .MuiBreadcrumbs-li": {
      "& .MuiLink-root": {
        color: "#000000",
        textDecoration: "none",
        fontSize: "13px",
      },
      "&:last-child": {
        "& .MuiLink-root": {
          fontWeight: "600",
          color: "#D82E34",
        },
      },
    },
    "& .MuiBreadcrumbs-separator": {
      fontSize: "0",
      background: 'url("/assets/breadcrumb-arrow.svg") no-repeat center',
      display: "block",
      width: "7px",
      height: "10px",
      position: "relative",
      top: "2px",
    },
  }));

  const recentLoop = [1, 2, 3];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <Head>
        <title>{singleBlog?.meta_title}</title>
        <meta name="description" content={singleBlog?.meta_description ?? ""} />
        <meta name="keyword" content={singleBlog?.meta_keyword ?? ""} />
        <meta name="title" content={singleBlog?.meta_title ?? ""} />
      </Head>
      <BlogContentdiv sx={{ backgroundColor: "#ffff" }}>
        <Box>
          <Bgimage>
            <BannerTxt>
              <Box>
                <Textoverimg1 variant="h1">{singleBlog?.title}</Textoverimg1>
              </Box>
            </BannerTxt>
          </Bgimage>
        </Box>
        <Container maxWidth="xl">
          <BreadcrumbSec>
            <>
              <BreadcrumbsStyle>
                <Breadcrumbs
                  aria-label="breadcrumb"
                  style={{ color: "#223354", fontSize: "15px" }}
                >
                  <Link
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push("/")}
                  >
                    Home
                  </Link>
                  <Link
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push("/blog")}
                  >
                    Blog
                  </Link>
                  <Link style={{ cursor: "pointer" }}>
                    {singleBlog?.category?.title ?? singleBlog?.title}
                  </Link>
                </Breadcrumbs>
              </BreadcrumbsStyle>
            </>
          </BreadcrumbSec>
          {singleLoader ? (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={1.2} xl={1.2}>
                <Grid container>
                  <Grid
                    item
                    xs={4}
                    sm={4}
                    md={4}
                    lg={12}
                    xl={12}
                    sx={{
                      "@media screen and (max-width:1199px)": {
                        display: "none",
                      },
                    }}
                  >
                    <Box>
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={"100%"}
                        height={150}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={7.8} xl={7.8}>
                <Box>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={"100%"}
                    height={300}
                  />
                </Box>
                <Box mt={2}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={20}
                      height={20}
                    />
                    <Skeleton animation="wave" variant="text" width={"10%"} />
                  </Box>
                </Box>
                <Box mt={2}>
                  <Skeleton animation="wave" variant="text" width={"100%"} />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width={"100%"}
                    sx={{ marginTop: "6px" }}
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width={"100%"}
                    sx={{ marginTop: "6px" }}
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width={"100%"}
                    sx={{ marginTop: "6px" }}
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width={"100%"}
                    sx={{ marginTop: "6px" }}
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width={"100%"}
                    sx={{ marginTop: "6px" }}
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width={"100%"}
                    sx={{ marginTop: "6px" }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
                <Box
                  sx={{
                    backgroundColor: "#F8F8F8",
                    padding: "10px 0px 18px 0px",
                  }}
                >
                  <Box sx={{ padding: "0 10px" }}>
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={"26%"}
                      height={25}
                    />
                  </Box>
                  <Box sx={{ margin: "15px 10px 0px 10px" }}>
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={"100%"}
                      height={40}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    backgroundColor: "#F8F8F8",
                    marginTop: "20px",
                    padding: "10px 0px 18px 0px",
                  }}
                >
                  <Box sx={{ padding: "0 10px" }}>
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={"26%"}
                      height={25}
                    />
                  </Box>
                  <Box sx={{ marginTop: "8px" }}>
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={"30%"}
                      sx={{ marginLeft: "5%" }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={"28%"}
                      sx={{ marginTop: "6px", marginLeft: "10%" }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={"11%"}
                      sx={{ marginTop: "6px", marginLeft: "10%" }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={"20%"}
                      sx={{ marginTop: "6px", marginLeft: "10%" }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={"30%"}
                      sx={{ marginTop: "6px", marginLeft: "10%" }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={"10%"}
                      sx={{ marginTop: "6px", marginLeft: "10%" }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={"15%"}
                      sx={{ marginTop: "6px", marginLeft: "10%" }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={"20%"}
                      sx={{ marginTop: "6px", marginLeft: "10%" }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={"10%"}
                      sx={{ marginTop: "6px", marginLeft: "10%" }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={1.2} xl={1.2}>
                <Grid container>
                  <Grid
                    item
                    xs={4}
                    sm={4}
                    md={4}
                    lg={12}
                    xl={12}
                    sx={{
                      "@media screen and (max-width:1199px)": {
                        display: "none",
                      },
                    }}
                  >
                    <BoxOne className="active">
                      <Datetext>
                        <Datefont>
                          {moment(singleBlog?.created_at).format("DD")}
                        </Datefont>
                        {moment(singleBlog?.created_at).format("MMM")}
                        <Sixteen>
                          {moment(singleBlog?.created_at).format("YYYY")}
                        </Sixteen>
                      </Datetext>
                      <Rhombus></Rhombus>
                    </BoxOne>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={7.8} xl={7.8}>
                <Imgbox sx={{}}>
                  <Slider {...settings}>
                    {singleBlog?.gallery_images &&
                      Object.values(singleBlog.gallery_images)
                        .filter(
                          (image): image is string => typeof image === "string"
                        )
                        .map((image, index) => {
                          return (
                            <div key={index}>
                              <SliderImgbox>
                                <img
                                  src={image ?? ""}
                                  alt={`Gallery image ${index + 1}`}
                                />
                              </SliderImgbox>
                            </div>
                          );
                        })}
                  </Slider>
                </Imgbox>

                <CreatedInfo>
                  <DateYear>
                    {" "}
                    <Icon1 />
                    {moment(singleBlog?.created_at).format("DD MMM YYYY")}
                  </DateYear>
                  <BlogCreated>
                    <AccountCircleOutlinedIcon />
                    {singleBlog?.user?.name}
                  </BlogCreated>
                </CreatedInfo>

                <Box mt={2}>
                  <Paradetail
                    dangerouslySetInnerHTML={{
                      __html: singleBlog?.description,
                    }}
                  ></Paradetail>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
                <SearchBox>
                  <Searchtext>Search</Searchtext>
                  <Searchbar>
                    <TextField
                      autoComplete="off"
                      name="searchProduct"
                      sx={{
                        width: "100%",
                        "& fieldset": {
                          border: "0",
                        },
                      }}
                      placeholder="Enter key to search blogs"
                      size="small"
                      value={searchProudct}
                      onKeyDown={(e) => {
                        if (
                          (e.key == "Backspace" && searchProudct == null) ||
                          searchProudct == ""
                        ) {
                          setSuggestionList([]);
                        }
                      }}
                      onChange={(e) => {
                        if (e.target.value) {
                          setSearchProudct(e.target.value);
                          setSearchQuery("");
                          if (!toggleSuggetionList)
                            setToggleSuggestionList(true);
                          if (e.target.value)
                            dispatch(
                              blog({ pages: 1, search: e.target.value })
                            );
                          setSuggestionList(blogListed);
                        }
                        if (e.target.value == "") {
                          setSearchProudct("");
                          setToggleSuggestionList(true);
                          dispatch(blog({ pages: 1, search: "" }));
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!toggleSuggetionList) setToggleSuggestionList(true);
                      }}
                    />
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                  </Searchbar>
                  {suggestionList?.length > 0 ? (
                    <SuggestioBoxList>
                      <List>
                        {suggestionList.map((blog, i) => {
                          return (
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                  <BlogImagee>
                                    <img src={blog?.image} alt={blog?.slug} />
                                  </BlogImagee>
                                </ListItemIcon>
                                <ListItemText primary={blog?.title} />
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                      </List>
                    </SuggestioBoxList>
                  ) : (
                    searchProudct && <NoBlogBox>Blog does not exist</NoBlogBox>
                  )}
                </SearchBox>

                <Categorybox>
                  <Categorytext>Category</Categorytext>
                  <CategoryListing>
                    {loader ? (
                      <Box sx={{ display: "flex", px: 2, mt: 2 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={9} sm={10} md={12} lg={8} xl={8}>
                            <Box>
                              <Skeleton
                                animation="wave"
                                variant="text"
                                width={"100%"}
                                sx={{ marginTop: "8px" }}
                              />
                              <Skeleton
                                animation="wave"
                                variant="text"
                                width={"100%"}
                                sx={{ marginTop: "8px" }}
                              />
                              <Skeleton
                                animation="wave"
                                variant="text"
                                width={"100%"}
                                sx={{ marginTop: "8px" }}
                              />
                              <Skeleton
                                animation="wave"
                                variant="text"
                                width={"100%"}
                                sx={{ marginTop: "8px" }}
                              />
                              <Skeleton
                                animation="wave"
                                variant="text"
                                width={"100%"}
                                sx={{ marginTop: "8px" }}
                              />
                              <Skeleton
                                animation="wave"
                                variant="text"
                                width={"100%"}
                                sx={{ marginTop: "8px" }}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    ) : (
                      <DetailCategoryList>
                        <List>
                          {blogsCategory?.map((category) => (
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemText primary={category?.title} />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </DetailCategoryList>
                    )}
                  </CategoryListing>
                </Categorybox>

                <Recentbox>
                  <Recenttext>Recent Posts</Recenttext>
                  {loader
                    ? recentLoop?.map((i) => {
                        return (
                          <Box
                            key={i}
                            sx={{
                              padding: "10px 12px 18px 0px",
                              marginTop: "20px",
                              backgroundColor: "#F8F8F8",
                            }}
                          >
                            <Box sx={{ display: "flex", px: 2, mt: 2 }}>
                              <Grid container spacing={2}>
                                <Grid item xs={3} sm={2} md={12} lg={4} xl={4}>
                                  <Box>
                                    <Skeleton
                                      animation="wave"
                                      variant="rectangular"
                                      width={"100%"}
                                      height={100}
                                    />
                                  </Box>
                                </Grid>
                                <Grid item xs={9} sm={10} md={12} lg={8} xl={8}>
                                  <Box>
                                    <Skeleton
                                      animation="wave"
                                      variant="text"
                                      width={"30%"}
                                      height={30}
                                    />
                                    <Skeleton
                                      animation="wave"
                                      variant="text"
                                      width={"100%"}
                                      sx={{ marginTop: "8px" }}
                                    />
                                    <Skeleton
                                      animation="wave"
                                      variant="text"
                                      width={"100%"}
                                      sx={{ marginTop: "8px" }}
                                    />
                                    <Skeleton
                                      animation="wave"
                                      variant="text"
                                      width={"100%"}
                                      sx={{ marginTop: "8px" }}
                                    />
                                  </Box>
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                        );
                      })
                    : recentBlogs?.length > 0 &&
                      recentBlogs?.map((recent) => (
                        <Box display="flex" px={2} mt={2}>
                          <Grid container spacing={2}>
                            <Grid item xs={3} sm={2} md={12} lg={4} xl={4}>
                              <Box>
                                <Linkdecoration
                                  onClick={() => {
                                    router.push(`/blog/${recent?.slug}`);
                                  }}
                                >
                                  <img
                                    src={recent?.image}
                                    alt={recent?.title}
                                  />
                                </Linkdecoration>
                              </Box>
                            </Grid>
                            <Grid item xs={9} sm={10} md={12} lg={8} xl={8}>
                              <Box>
                                <Linkdecoration
                                  onClick={() => {
                                    router.push(`/blog/${recent?.slug}`);
                                  }}
                                >
                                  <Sidehead>{recent?.title}</Sidehead>
                                </Linkdecoration>
                                {recent?.short_description?.length > 50 ? (
                                  <Sidetext
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        recent?.short_description?.length > 0 &&
                                        recent?.short_description?.slice(
                                          0,
                                          50
                                        ) + "...",
                                    }}
                                  ></Sidetext>
                                ) : (
                                  <Sidetext
                                    dangerouslySetInnerHTML={{
                                      __html: recent.short_description,
                                    }}
                                  ></Sidetext>
                                )}
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      ))}
                </Recentbox>

                <Followbox>
                  <Followtext>Follow Us</Followtext>
                  <Box display="flex" marginLeft="6px">
                    <Link
                      className="facebook-icon"
                      href="https://www.facebook.com/powercozmo.epg"
                      target="_blank"
                    >
                      <Faceboo></Faceboo>
                    </Link>
                    <Link
                      className="twitter-icon"
                      href="https://twitter.com/powercozmo"
                      target="_blank"
                    >
                      <Twitte></Twitte>
                    </Link>
                    <Link
                      className="linkedin-icon"
                      href="https://www.linkedin.com/company/powercozmo"
                      target="_blank"
                    >
                      <LinkedI></LinkedI>
                    </Link>
                    <Link
                      className="instagram-icon"
                      href="https://www.instagram.com/powercozmo/"
                      target="_blank"
                    >
                      <Instagra></Instagra>
                    </Link>
                  </Box>
                </Followbox>
              </Grid>
            </Grid>
          )}
        </Container>
      </BlogContentdiv>
    </>
  );
}
