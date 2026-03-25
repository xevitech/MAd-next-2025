import { Box, Breadcrumbs, Skeleton, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Bgimage,
  Boxheading,
  Boxpara,
  Boxradius,
  Boxspacebetween,
  Image1,
  Textoverimg1,
  Overlay,
  BannerTxt,
  StripeArea,
  BreadcrumbSec,
} from "./style";
import { Container, Divider, Grid } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { useAppDispatch } from "redux/store";
import { blog } from "@/hooks/Blog";
import { useSelector } from "react-redux";
import moment from "moment";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import { styled } from "@mui/styles";

export default function Blog() {
  const dispatch = useAppDispatch();
  const [pages, setPages] = useState(1);
  useEffect(() => {
    dispatch(blog({ pages: pages, search: "" }));
  }, [pages]);
  const { blogListed, pageLoader, blogListedTotal } = useSelector(
    (state: any) => state.blogs
  );

  const handlePageChange = (page: any) => {
    setPages(page);
  };

  const router = useRouter();

  const handleRedirect = async (slug: any) => {
    router.push(`/blog/${slug}`);
  };

  const a = [1, 2, 3, 4, 5, 6, 7, 8];

  const convertText = (text, limit) => {
    return text?.length > 0 && text?.slice(0, limit) + "...";
  };

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

  return (
    <>
      <Box sx={{ backgroundColor: "#ffffff", paddingBottom: "60px" }}>
        <Box>
          <Bgimage>
            <BannerTxt>
              <Box>
                <Textoverimg1 variant="h1">Our Blog</Textoverimg1>
              </Box>
            </BannerTxt>
          </Bgimage>
        </Box>
        <Box>
          <Container maxWidth="xl">
            <BreadcrumbSec>
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
                </Breadcrumbs>
              </BreadcrumbsStyle>
            </BreadcrumbSec>
            {pageLoader ? (
              <Container sx={{ display: "flex" }} maxWidth="xl">
                <Grid container spacing={3}>
                  {a?.map((i) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                        <Boxradius>
                          <Skeleton
                            variant="rectangular"
                            width={"100%"}
                            height={240}
                            sx={{ borderRadius: "18px" }}
                          />
                          <Divider />
                          <Box p={1}>
                            <Boxheading>
                              <Skeleton variant="rounded" width={"30%"} />
                            </Boxheading>
                            <Boxpara>
                              <Skeleton variant="rounded" width={"100%"} />
                              <Skeleton
                                variant="rounded"
                                width={"100%"}
                                sx={{ marginTop: "8px" }}
                              />
                              <Skeleton
                                variant="rounded"
                                width={"100%"}
                                sx={{ marginTop: "8px" }}
                              />
                            </Boxpara>
                          </Box>
                        </Boxradius>
                      </Grid>
                    );
                  })}
                </Grid>
              </Container>
            ) : (
              <Grid container spacing={3}>
                {blogListed?.map((blog) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={3}
                    sx={{ display: "grid", alignItems: "stretch" }}
                  >
                    <Boxradius>
                      <Overlay
                        position={"relative"}
                        style={{ cursor: "pointer" }}
                        onClick={() => router.push(`/blog/${blog?.slug}`)}
                      >
                        <Image1
                          src={blog?.image ? blog?.image : "/assets/NoImage.svg"}
                          alt={blog?.title}
                        />
                        <StripeArea>Latest Technology</StripeArea>
                      </Overlay>
                      <Box p={1}>
                        <Link
                          sx={{
                            cursor: "pointer",
                            textDecoration: "none",
                            "& .MuiTypography-h1": {
                              "&:hover": {
                                color: "#d7282f",
                              },
                            },
                          }}
                          onClick={() => router.push(`/blog/${blog?.slug}`)}
                        >
                          <Boxheading
                            title={blog?.title}
                            variant="h1"
                            gutterBottom
                            onClick={() => {
                              handleRedirect(blog?.slug);
                            }}
                          >
                            {blog?.title?.length > 70 ? (
                              <>{convertText(blog?.title, 70)}</>
                            ) : (
                              <>{blog?.title} </>
                            )}
                          </Boxheading>
                        </Link>
                        {blog?.short_description?.length > 198 ? (
                          <Boxpara
                            dangerouslySetInnerHTML={{
                              __html: convertText(blog?.short_description, 198),
                            }}
                          ></Boxpara>
                        ) : (
                          <Boxpara
                            dangerouslySetInnerHTML={{
                              __html: blog?.short_description,
                            }}
                          ></Boxpara>
                        )}
                        <Box display="flex" justifyContent="space-between">
                          <Box display="flex">
                            <Box>
                              <AccountCircleOutlinedIcon
                                sx={{
                                  height: "17.5px",
                                  width: "17.5px",
                                  color: "#8F8F8F",
                                  mr: 1,
                                }}
                              />
                            </Box>
                            <Box>
                              <Boxspacebetween>
                                {blog?.user?.name}
                              </Boxspacebetween>
                            </Box>
                          </Box>
                          <Box>
                            <Box display="flex">
                              <Box>
                                <AccessTimeOutlinedIcon
                                  sx={{
                                    height: "17.5px",
                                    width: "17.5px",
                                    color: "#8F8F8F",
                                    mr: 1,
                                  }}
                                />
                              </Box>
                              <Box>
                                <Boxspacebetween>
                                  {moment(blog?.created_at).format(
                                    "DD MMM YYYY"
                                  )}
                                </Boxspacebetween>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Boxradius>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
          {blogListed?.length > 12 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "11%",
                marginTop: "20px",
              }}
            >
              <Stack spacing={2}>
                <Pagination
                  count={Math.round(blogListedTotal / 10)}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
