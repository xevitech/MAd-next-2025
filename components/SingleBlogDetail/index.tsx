import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bgimage,
  Textoverimg1,
  Textoverimg2,
  Heading,
  Imagetext,
  Threetext,
  Paragraph,
  Borderall,
  Searchtext,
  SearchIconWrapper,
  StyledInputBase,
  Searchbar,
  SearchBox,
  Categorybox,
  Recentbox,
  Recenttext,
  Sidetext,
  Sidehead,
  Followbox,
  Followtext,
  Icon1,
  Icon2,
  Img,
  Linkdecoration,
  Faceboo,
  Instagra,
  LinkedI,
  Twitte,
  Newsspan,
  Threetextspan,
  Sidehead2,
} from "./style";
import { Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TreeItem from "@mui/lab/TreeItem";
import { useRouter } from "next/router";
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import { blog, setSearchValue, singleBlogDetail } from "@/hooks/Blog";
import CategoryFilter from "../ProductsListing/CategoryFilter";
import _debounce from "lodash/debounce";
interface RenderTree {
  id: string;
  name: string;
  children?: readonly RenderTree[];
}

const data: RenderTree = {
  id: "root",
  name: "Information",
  children: [
    {
      id: "1",
      name: "About Company",
    },
    {
      id: "3",
      name: "History",
      children: [
        {
          id: "4",
          name: "Mission and Vision",
        },
      ],
    },
    {
      id: "5",
      name: "Posts",
    },
    {
      id: "6",
      name: "Our Aim",
    },
  ],
};

export default function index() {
  const { query } = useRouter();
  const [searchResult, setSearchResult] = useState(false);
  const [searchExist, setSearchExist] = useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(blog({ pages: 1, search: "" }));
  }, [dispatch]);
  useEffect(() => {
    dispatch(singleBlogDetail({ slug: query.name }));
  }, [dispatch]);
  const { blogListed, singleBlog, loader, searchValue } = useSelector(
    (state: any) => state.blogs
  );
  const delayedQuery = React.useRef(
    _debounce(async (q) => {
      const result = dispatch(blog({ pages: 1, search: q }));
      const data = await result;
      setSearchExist(data?.meta?.arg?.search);
      setSearchResult(data?.payload?.status);
    }, 500)
  ).current;
  console.log(searchResult, "searchResult");

  const handleSearch = async (value) => {
    dispatch(setSearchValue(value));
    delayedQuery(value);
  };

  const renderTree = (nodes: RenderTree) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );
  return (
    <>
      <Box sx={{ backgroundColor: "white" }}>
        <Box>
          <Bgimage>
            <Box>
              <Textoverimg1>Let's Start to see our all Blog</Textoverimg1>
              <Textoverimg2>Home / Blog</Textoverimg2>
            </Box>
          </Bgimage>
        </Box>
        <Box>
          <Container maxWidth="xl">
            <Box>
              <Heading>
                Latest Posts
                <Newsspan>News</Newsspan>
              </Heading>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                <Borderall>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <Box>
                        <Linkdecoration href="#">
                          <Img src={singleBlog?.image} alt="" />
                        </Linkdecoration>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <Box mx={2} mt={2}>
                        <Linkdecoration href="#">
                          <Imagetext>{singleBlog?.title}</Imagetext>
                        </Linkdecoration>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          mt={2}
                          mb={2}
                        >
                          <Threetext>
                            {" "}
                            <Icon1 />
                            Wednesday, October 26, 2020
                          </Threetext>
                          <Threetext>
                            {" "}
                            <Icon2 />
                            BY: <Threetextspan>Henry H.Garrick</Threetextspan>
                          </Threetext>
                          <Threetext>
                            {" "}
                            <Icon1 />
                            Comments: 48
                          </Threetext>
                        </Box>
                        <Box>
                          <Paragraph>{singleBlog?.short_description}</Paragraph>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Borderall>
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <SearchBox>
                  <Searchtext>Search</Searchtext>

                  <Searchbar>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      value={searchValue}
                      onChange={(event) => handleSearch(event.target.value)}
                      inputProps={{ "aria-label": "search" }}
                    />
                  </Searchbar>

                  {searchResult &&
                    searchExist &&
                    blogListed?.map((item) => {
                      return (
                        <div key={item.id} style={{ width: "200px" }}>
                          <ul
                            style={{
                              marginLeft: "15px",
                              listStyleType: "none",
                            }}
                          >
                            <li>
                              <Link
                                href={{
                                  pathname: "/Bloglist",
                                  query: {
                                    name: item.slug,
                                  }, // the data
                                }}
                              >
                                <Sidehead2>{item.title}</Sidehead2>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      );
                    })}
                  {!searchResult && searchExist && (
                    <div style={{ marginLeft: "15px", marginTop: "10px" }}>
                      No Data found
                    </div>
                  )}
                </SearchBox>
                <Categorybox>
                  <CategoryFilter />
                </Categorybox>
                <Recentbox>
                  <Recenttext>Recent Posts</Recenttext>
                  <Grid container spacing={2} px={1.5} mt={2}>
                    {blogListed?.slice(0, 5).map((item) => {
                      return (
                        <>
                          <Grid
                            key={item.id}
                            item
                            xs={6}
                            sm={6}
                            md={6}
                            lg={6}
                            xl={6}
                          >
                            <Box>
                              <Link
                                href={{
                                  pathname: "/Bloglist",
                                  query: {
                                    name: item.slug,
                                  }, // the data
                                }}
                              >
                                <img src={item?.image} alt="" width="100%" />
                              </Link>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Box>
                              <Link
                                href={{
                                  pathname: "/Bloglist",
                                  query: {
                                    name: item.slug,
                                  }, // the data
                                }}
                              >
                                <Sidehead>{item.title}</Sidehead>
                              </Link>
                              <Sidetext>
                                {item.short_description.substr(0, 100)}....
                              </Sidetext>
                            </Box>
                          </Grid>
                        </>
                      );
                    })}
                  </Grid>
                </Recentbox>

                <Followbox>
                  <Followtext>Follow Us</Followtext>
                  <Box display="flex" ml={2}>
                    <Link
                      href="https://www.facebook.com/powercozmo.epg"
                      target="_blank"
                    >
                      <Faceboo></Faceboo>
                    </Link>
                    <Link href="https://twitter.com/powercozmo" target="_blank">
                      <Twitte></Twitte>
                    </Link>
                    <Link
                      href="https://www.linkedin.com/company/powercozmo"
                      target="_blank"
                    >
                      <LinkedI></LinkedI>
                    </Link>
                    <Link
                      href="https://www.instagram.com/powercozmo/"
                      target="_blank"
                    >
                      <Instagra></Instagra>
                    </Link>
                  </Box>
                </Followbox>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
}
