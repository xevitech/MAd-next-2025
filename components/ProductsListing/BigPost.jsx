import React from "react";
import ProductModule from "./product.module.css";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Box, Divider, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Stack } from "@mui/system";
import BigPostSlider from "./BigPostSlider";
import { useRouter } from "next/router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductHeadePriceButton } from "./ProductListing.styled";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DoneIcon from "@mui/icons-material/Done";

const useStyles = makeStyles()((theme) => {
  return {
    CategoryTextStyle: {
      fontSize: 12,
      color: "rgba(35, 31, 32, 1)",
      fontWeight: 400,
      fontFamily: "Open sans",
      "& span": {
        fontSize: 14,
        fontWeight: 600,
      },
    },
    PriceTextStyle: {
      display: "inline-flex",
      alignItems: "top",
      fontSize: 14,
      gap: "5px",
      color: "rgba(35, 31, 32, 1)",
      fontWeight: 400,
      fontFamily: "Open sans",
      "& span": {
        fontSize: 22,
        fontWeight: 400,
        color: "#D7282F",
      },
      "& sup": {
        fontSize: 12,
        fontWeight: 600,
        color: "#D7282F",
      },
    },
    InStockStyle: {
      color: "#34A853",
      fontFamily: "Open sans",
      fontSize: 14,
      fontWeight: 600,
      whiteSpace: "nowrap",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 5,
      "& svg": {
        width: 19,
      },
    },
    ByOrderStyle: {
      color: "rgba(215, 40, 47, 1)",
      fontFamily: "Open sans",
      fontSize: 14,
      fontWeight: 600,
      whiteSpace: "nowrap",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 5,
      "& svg": {
        width: 19,
      },
    },
    ProductTitleStyle: {
      color: "rgba(35, 31, 32, 1)",
      fontFamily: "Open sans",
      fontSize: 18,
      fontWeight: 600,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      mstextOverflow: "ellipsis",
    },
    TypeStyle: {
      fontSize: 12,
      fontWeight: 600,
      fontFamily: "Open sans",
      color: "rgba(35, 31, 32, 1)",
      "& span": {
        fontWeight: 400,
        fontSize: 12,
        fontFamily: "Open sans",
        color: "rgba(35, 31, 32, 1)",
      },
    },
    ProductSmallHeadings: {
      color: "rgba(35, 31, 32, 1)",
      fontFamily: "Open sans",
      fontSize: 13,
      fontWeight: 400,
      whiteSpace: "nowrap",
    },
    ProductLocationandbrand: {
      color: "rgba(35, 31, 32, 0.6)",
      fontFamily: "Open sans",
      fontSize: 15,
      fontWeight: 600,
      whiteSpace: "nowrap",
      "& svg": {
        color: "rgba(215, 40, 47, 0.85)",
        position: "relative",
        bottom: -4,
        left: -4,
        fontSize: 18,
      },
    },
  };
});

export default function BigPost(props) {
  const router = useRouter();

  const { classes } = useStyles();

  const data = props?.data;

  return (
    <Box
      sx={{
        gridColumn: {
          xl: "1 / span 2",
          lg: "1 / span 2",
          md: "1 / span 2",
          sm: "1 / span 2",
          xs: "1 / span 2",
        },
        gridRow: {
          xl: "1 / span 2",
          lg: "1 / span 2",
          md: "1 / span 2",
          sm: "1 / span 2",
          xs: "1 / span 2",
        },
      }}
      key={"index"}
    >
      {/* padding removed dur to product listing design problem. not testing on ministie yet */}
      <Box
        style={{ backgroundColor: "rgba(247, 247, 247, 1)" }}
        className={ProductModule.product_col}
      >
        <Stack
          spacing={{ xs: 2 }}
          sx={{ borderBottom: "1px solid rgba(34, 51, 84, .1) " }}
          p={{ xs: 2 }}
          justifyContent={{ xs: "space-between" }}
          alignItems={{ xs: "center" }}
          direction={{ xs: "row" }}
        >
          <Typography className={classes.CategoryTextStyle}>
            Category :{" "}
            <Typography component="span">{data.category_name}</Typography>
          </Typography>
          {data.unit_price ? (
            <Typography className={classes.PriceTextStyle}>
              {" "}
              Price : <Typography component="sup">$</Typography>{" "}
              <Typography component="span">{data.unit_price}</Typography>
            </Typography>
          ) : (
            <ProductHeadePriceButton>
              <Typography component="span">Get Latest Price</Typography>{" "}
              <ArrowForwardIosIcon />
            </ProductHeadePriceButton>
          )}
        </Stack>
        <Stack p={{ xs: 2 }}>
          <Stack
            spacing={{ xs: 2 }}
            justifyContent={{ xs: "space-between" }}
            alignItems={{ xs: "center" }}
            direction={{ xs: "row" }}
          >
            <Typography className={classes.ProductTitleStyle} component="h6">
              {data.product_name}
            </Typography>
            {data.product_type === "in_stock" ? (
              <Typography className={classes.InStockStyle}>
                In Stock <DoneIcon />
              </Typography>
            ) : data.product_type === "by_order" ? (
              <Typography className={classes.ByOrderStyle}>
                By Order <DoneIcon />
              </Typography>
            ) : null}
          </Stack>

          <Stack
            spacing={{ xs: 2 }}
            justifyContent={{ xs: "space-between" }}
            alignItems={{ xs: "center" }}
            direction={{ xs: "row" }}
          >
            <Typography className={classes.TypeStyle}>
              {" "}
              Post/Product Id:{" "}
              <Typography component="span">{data.id} </Typography>
            </Typography>
            <Typography className={classes.TypeStyle}>
              {" "}
              Price Type:{" "}
              <Typography component="span">{data.price_type} </Typography>
            </Typography>
          </Stack>
        </Stack>

        <Box aria-label="Big Post Solider">
          <BigPostSlider itemdata={data} />
        </Box>

        <Stack
          p={{ xs: 2 }}
          spacing={{ xs: 2 }}
          justifyContent={{ xs: "space-between" }}
          alignItems={{ xs: "center" }}
          direction={{ xs: "row" }}
        >
          <Box>
            <Typography className={classes.ProductSmallHeadings}>
              Current Location
            </Typography>
            <Typography
              sx={{ fontWeight: 600 }}
              className={classes.ProductLocationandbrand}
            >
              <LocationOnOutlinedIcon />
              {data.location}
            </Typography>
          </Box>
          <Box>
            <Typography className={classes.ProductSmallHeadings}>
              Manufacturer
            </Typography>
            <Typography className={classes.ProductLocationandbrand}>
              {" "}
              {data.brand_name}
            </Typography>
          </Box>
        </Stack>
        <Divider />
        <Stack
          divider={<Divider orientation="vertical" flexItem />}
          p={{ xs: 2 }}
          pb={{ xs: 0 }}
          direction={{ xs: "row" }}
          justifyContent={{ xs: "space-between" }}
          alignItems={{ xs: "center" }}
          spacing={{ xs: 2 }}
        >
          <Box>
            <Typography className={classes.ProductSmallHeadings}>
              Condition
            </Typography>
            <Typography className={classes.ProductLocationandbrand}>
              {" "}
              {data.condition}
            </Typography>
          </Box>
          <Box>
            <Typography className={classes.ProductSmallHeadings}>
              Model No.
            </Typography>
            <Typography className={classes.ProductLocationandbrand}>
              {data.model_number}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
