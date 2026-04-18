import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Popover,
  Grow,
  Typography,
  Button,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import {
  ProductList,
  SubListing,
  SubDescription,
  ThumbImg,
  ProductDrawerCarousel,
  OurProductList,
  OurProductMenuBox,
  ProductSubList,
  OurProductMenuBoxOuter,
  ImageInfo,
  ProductCarouselImagContent,
  ProductCarouselImag,
  Lable,
  SubLable,
  LearnMore,
} from "./style";
import EastIcon from "@mui/icons-material/East";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import Collapse from "@mui/material/Collapse";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { LOCAL_PUBLIC_URL } from "@/utils/staticValues";
const ProductDrawer = ({ drawer, handleClose, anchor }) => {
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: "left",
  }));
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [activeSubCategory, setActiveSubCategory] = useState<number>(0);
  const [linkIndex, setLinkIndex] = useState<number>(0);
  let list = useSelector((state: any) => state.header)?.pageList ?? [];

  const NavigateHandler = (link: any) =>
    window.open(`${link}`, "_blank", "noreferrer");
  return (
    <Popover
      className="GlobalNavigation"
      id="basic-header-product-menu"
      open={drawer}
      anchorEl={anchor}
      onClose={handleClose}
      disableScrollLock
      hideBackdrop
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      TransitionComponent={Collapse}
      TransitionProps={{
        timeout: 600,
      }}
      sx={{
        outline: "none !important",
        "& .MuiCollapse-wrapperInner": {
          height: "100%",
          "&:focus-visible": {
            outline: "none !important",
          },
        },
        "& .MuiCollapse-wrapper": {
          outline: "none !important",
        },
        "& .MuiCollapse-root": {
          boxShadow:
            "0px 1px 0px 0px rgba(0, 0, 0, 0.14), 0px 1px 9px 2px rgba(0, 0, 0, 0.12)",
          "&:focus-visible": {
            outline: "none !important",
          },
        },
        boxShadow: "none",
      }}
      PaperProps={{
        sx: {},
      }}
    >
      <Grid container>
        <Grid item sm={12} md={12} lg={12} style={{ padding: "0 10px 10px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={3} className="stickyNav">
              <ProductList>
                <Stack spacing={0}>
                  {list?.map((v, i) => (
                    <Item
                      key={v.id}
                      className={i === activeCategory ? "active" : ""}
                      onMouseEnter={() => {
                        setActiveCategory(i);
                        setActiveSubCategory(0);
                        setLinkIndex(0);
                      }}
                    >
                      <OurProductList>
                        <ImageInfo>
                          <img src={v.icon} width={"20"} alt="Image" title="" />
                          <Typography>{v.label}</Typography>
                        </ImageInfo>
                        <ChevronRightRoundedIcon />
                      </OurProductList>
                    </Item>
                  ))}
                </Stack>
              </ProductList>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6.5}>
              <OurProductMenuBoxOuter>
                <Grid container spacing={2}>
                  {list?.[activeCategory]?.children.map((v, i) => (
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={i}>
                      <OurProductMenuBox>
                        <List>
                          <ListItem disablePadding>
                            <Typography variant="h6">{v.label}</Typography>
                            <ProductSubList>
                              <Typography
                                variant="body2"
                                sx={{
                                  textTransform: "capitalize",
                                  WebkitBoxOrient: "vertical",
                                  WebkitLineClamp: "2",
                                  display: "-webkit-box",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {v.description}
                              </Typography>

                              <LearnMore
                                href={v.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Learn More
                              </LearnMore>
                            </ProductSubList>
                          </ListItem>
                        </List>
                      </OurProductMenuBox>
                    </Grid>
                  ))}
                </Grid>
              </OurProductMenuBoxOuter>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={2.5}>
              <SubDescription>
                <ProductDrawerCarousel>
                  <ProductCarouselImagContent>
                    <ProductCarouselImag>
                      <img
                        src={`${LOCAL_PUBLIC_URL}/uploads/product/gallery/Screenshot from 2024-07-16 11-02-44.png`}
                        alt=""
                      />
                    </ProductCarouselImag>
                  </ProductCarouselImagContent>
                  <Typography variant="h6" gutterBottom>
                    Natural Gas Engine Turbine
                  </Typography>
                  <Typography variant="body2">
                    WATER PRO Ductile Iron Pipes of Merchant AD Ductile Iron
                    portfolio is one of the sufficient...
                  </Typography>
                </ProductDrawerCarousel>
                <Typography
                  className="clickLink"
                  variant="button"
                  display="block"
                  onClick={() =>
                    NavigateHandler(
                      list?.[activeCategory]?.children?.[activeSubCategory]
                        ?.children[linkIndex].link
                    )
                  }
                >
                  Click here <EastIcon />
                </Typography>
              </SubDescription>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Popover>
  );
};

export default ProductDrawer;
