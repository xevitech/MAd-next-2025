import { Box, Breadcrumbs, Grid, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CategiryListingList,
  CategoryDescription,
  CategoryHeading,
  CategoryMainBox,
  ImageLabelBox,
  Label1,
  LabelBox,
  MainSectorBox,
  OuterBorder,
  ParentCategoryBox,
  ParentCategoryImageBox,
  Spaceforheading,
  ViewMoreBtn,
  ViewMoreBtnBox,
} from "./style";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import { useRouter } from "next/router";
import { useAppDispatch } from "redux/store";
import { setBreadCrumbsData } from "@/hooks/CategoryReducer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
export const Img = styled("img")(() => ({
  height: "590px",
  width: "100%",
  "@media screen and (max-width:899px)": {
    height: "480px",
  },
  "@media screen and (max-width:600px)": {
    height: "200px",
  },
}));

function CategorySector({ list }) {
  const router = useRouter();
  const [viewMoreToggle, setViewMoreToggle] = useState<any>({
    index: -1,
    toggle: false,
  });
  const [cloneCategoryList, setCloneCategoryList] = useState<any>([]);
  const [categoryList, setCategoryList] = useState<any>([]);
  const dispatch = useAppDispatch();

  const BreadCrumbHandler = (value: any) => {
    dispatch(setBreadCrumbsData([...value]));
  };

  useEffect(() => {
    if (list?.query?.id) {
      let categoryList =
        list?.query?.id[0] == "list"
          ? list?.data
          : list?.data?.filter((v) => v.slug == list?.query?.id[0]);
      setCategoryList(categoryList);
    }
  }, [list?.query?.id]);

  useEffect(() => {
    if (categoryList.length > 0 && cloneCategoryList.length == 0) {
      setCloneCategoryList(
        categoryList.map((v) => ({
          ...v,
          sub_category: v.sub_category.slice(0, 8),
        }))
      );
    }
  }, [categoryList, cloneCategoryList]);

  const ViewMoreHandler = (index) => {
    if (viewMoreToggle.toggle && viewMoreToggle.index == index) {
      setViewMoreToggle({ index: -1, toggle: false });
      setCloneCategoryList(
        categoryList.map((v) => ({
          ...v,
          sub_category: v.sub_category.slice(0, 8),
        }))
      );
    } else {
      setViewMoreToggle({ index: index, toggle: true });
      let slug = cloneCategoryList[index].slug;
      let list = categoryList.map((v) => {
        if (v.slug == slug) {
          return { ...v, sub_category: v.sub_category };
        } else {
          return { ...v, sub_category: v.sub_category.slice(0, 8) };
        }
      });
      setCloneCategoryList(list);
    }
  };
  const CleanedContent = ({ description }) => {
    const sanitizeHTML = (htmlString) => {
      if (!htmlString) return "";
      return htmlString.replace(/<\/?(div|span)[^>]*>/g, "");
    };

    return (
      <div
        dangerouslySetInnerHTML={{
          __html: sanitizeHTML(description),
        }}
      ></div>
    );
  };
  return (
    <>
      <CategoryMainBox>
        <Box>
          <Breadcrumbs aria-label="breadcrumb" sx={{ padding: "15px 0 0" }}>
            <Typography
              fontWeight={600}
              color="#000"
              sx={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => router.push("/")}
            >
              Home
            </Typography>
            <Typography
              fontWeight={600}
              color="#000"
              sx={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => (window.location.href = "/category/list")}
            >
              All Categories
            </Typography>
            {list?.query?.id[0] !== "list" && (
              <Typography
                fontWeight={600}
                color="#d7282f"
                sx={{ fontSize: "12px" }}
              >
                {categoryList[0]?.name}
              </Typography>
            )}
          </Breadcrumbs>
        </Box>

        {cloneCategoryList?.map((v, catIndex) => (
          <>
            <Box sx={{ position: "relative", top: "-70px" }} id={v.slug}></Box>
            <MainSectorBox key={v.slug} id={v.slug}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={3} lg={3} xl={2} height={"100%"}>
                  <ImageLabelBox
                    height={"100%"}
                    onClick={() => router.push(`/category/sector/${v.slug}`)}
                  >
                    <Img src={v.banner} alt="" />
                    <LabelBox>
                      <Label1 variant="h1">{v.name}</Label1>
                    </LabelBox>
                  </ImageLabelBox>
                </Grid>
                <Grid item xs={12} sm={8} md={9} lg={9} xl={10} height={"100%"}>
                  <Box sx={{ position: "relative", height: "100%" }}>
                    <OuterBorder>
                      <Grid container spacing={2}>
                        {v?.sub_category?.map((sub) => (
                          <Grid
                            sx={{ cursor: "pointer" }}
                            item
                            xs={12}
                            sm={6}
                            lg={3}
                            xl={3}
                            onClick={() => {
                              BreadCrumbHandler([
                                { slug: v.slug, name: v.name },
                                { slug: sub.slug, name: sub.name },
                              ]);
                              router.push(`/category/${v.slug}/${sub.slug}`);
                            }}
                          >
                            {/* <Box sx={{ height: "100%" }}>
                              <ParentCategoryBox className="draw-border">
                                <div className="layer"></div>
                                <Spaceforheading>
                                  <CategoryHeading>{sub.name}</CategoryHeading>
                                </Spaceforheading>
                                <CategiryListingList>
                                  <ListItem disablePadding >
                                    <ListItemButton>
                                      <ListItemText>
                                        <Typography>Machine Tools</Typography>
                                      </ListItemText>
                                    </ListItemButton>
                                  </ListItem>
                                  <ListItem disablePadding >
                                    <ListItemButton>
                                      <ListItemText>
                                        <Typography>Engineering & Construction Machinery</Typography>
                                      </ListItemText>
                                    </ListItemButton>
                                  </ListItem>
                                  <ListItem disablePadding >
                                    <ListItemButton>
                                      <ListItemText>
                                        <Typography>Woodworking Machinery</Typography>
                                      </ListItemText>
                                    </ListItemButton>
                                  </ListItem>
                                  <ListItem disablePadding >
                                    <ListItemButton>
                                      <ListItemText>
                                        <Typography>Metallic Processing Machinery</Typography>
                                      </ListItemText>
                                    </ListItemButton>
                                  </ListItem>
                                  <ListItem disablePadding >
                                    <ListItemButton>
                                      <ListItemText>
                                        <Typography>Laser Equipment</Typography>
                                      </ListItemText>
                                    </ListItemButton>
                                  </ListItem>
                                  <ListItem disablePadding >
                                    <ListItemButton>
                                      <ListItemText>
                                        <Typography>Pump & Vacuum Equipment</Typography>
                                      </ListItemText>
                                    </ListItemButton>
                                  </ListItem>
                                  <ListItem disablePadding >
                                    <ListItemButton>
                                      <ListItemText>
                                        <Typography>Pre-Press Equipment</Typography>
                                      </ListItemText>
                                    </ListItemButton>
                                  </ListItem>
                                </CategiryListingList>
                              </ParentCategoryBox>
                            </Box> */}
                            <Box sx={{ height: "100%" }}>
                              <ParentCategoryBox>
                                <ParentCategoryImageBox>
                                  <img
                                    src={
                                      sub?.banner
                                        ? sub?.banner
                                        : "../assets/images/category/image-cat01.svg"
                                    }
                                    alt="sub-category"
                                    title=""
                                  />
                                </ParentCategoryImageBox>
                                <Spaceforheading>
                                  <CategoryHeading>{sub.name}</CategoryHeading>
                                  <CategoryDescription>
                                    <CleanedContent
                                      description={sub.description}
                                    />
                                  </CategoryDescription>
                                </Spaceforheading>
                              </ParentCategoryBox>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </OuterBorder>
                    {categoryList?.find((cat) => cat.slug == v.slug)
                      ?.sub_category.length > 8 && (
                      <ViewMoreBtnBox>
                        <ViewMoreBtn
                          onClick={() => ViewMoreHandler(catIndex)}
                          variant="text"
                        >
                          {viewMoreToggle?.index == catIndex
                            ? "view less"
                            : "view more"}
                          {viewMoreToggle?.index !== catIndex ? (
                            <ExpandMoreOutlinedIcon />
                          ) : (
                            <ExpandLessOutlinedIcon />
                          )}
                        </ViewMoreBtn>
                      </ViewMoreBtnBox>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </MainSectorBox>
          </>
        ))}
      </CategoryMainBox>
    </>
  );
}

export default CategorySector;
