import {
  Grid,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/styles";
import { makeStyles } from "tss-react/mui";
import { useSelector } from "react-redux";
import { OverviewOpt } from "./Style";

const useStyles = makeStyles()((theme) => {
  return {
    heading: {
      fontSize: "12px !important",
      fontWeight: 400,
      fontFamily: "Open sans",
      textTransform: "capitalize",
      textAlign: "left",
      marginBottom: "4px",
    },
    main: {
      fontSize: "14px !important",
      fontWeight: 600,
      fontFamily: "Open sans",
      color: "#231F20",
      textTransform: "capitalize",
      textAlign: "left",
      "@media screen and (max-width: 1600px)": {
        fontSize: 14,
      },
    },
    gridspecification: {
      paddingLeft: "0px !important",
      paddingRight: "2px !important",
    },
    gridspecificationcolumn: { paddingTop: "0 !important" },
  };
});

const SpHead = styled(Typography)(() => ({
  fontSize: 18,
  fontWeight: 600,
  fontFamily: "Open sans",
  color: "#231F20",
  textTransform: "capitalize",
  marginBottom: "6px !important",
}));
const SpExpand = styled(Typography)(() => ({
  fontSize: "12px !important",
  fontWeight: 600,
  fontFamily: "Open sans",
  color: "#231F20",
  textTransform: "capitalize",
  cursor: "pointer",
}));

function SpecificationItem({ item, index }: any) {
  const { classes } = useStyles();
  return (
    <Grid
      item
      key={item.attribute_id}
      xs={12}
      md={6}
      lg={6}
      xl={6}
      className={classes.gridspecification}
    >
      <Stack direction="row" justifyContent="space-between" margin="5px 0">
        <Box
          textAlign="left"
          pt={{ xs: 2 }}
          width="100%"
          className={classes.gridspecificationcolumn}
        >
          <Typography className={classes.heading}>
            {item.name || item.attribute_id}
          </Typography>
          <Typography className={classes.main} component="h6" fontWeight={600}>
            {item.values}
          </Typography>
        </Box>
      </Stack>
    </Grid>
  );
}

const ProductSpecification = ({ marginTop = "27px" }) => {
  const { specifications }: any = useSelector(
    (state: any) => state.productDetail.detail.data
  );

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Grid container>
        {specifications?.map((item, index) => (
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <OverviewOpt key={`specs-${index}`}>
              <h6>{item.name}</h6>
              <span>{item.values}</span>
            </OverviewOpt>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default ProductSpecification;
