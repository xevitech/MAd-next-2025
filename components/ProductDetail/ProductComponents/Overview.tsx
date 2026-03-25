import React from "react";
import {
  Container,
  FontContainer,
  OverviewHead,
} from "@/components/ProductDetail/style";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Divider, Box, Grid, Typography } from "@mui/material";
import { OverviewContainer } from "@/components/ProductDetail/ProductComponents/Style";
import useAppContext from "@/hooks/useAppContext";
import { styled } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { useSelector } from "react-redux";

const useStyles = makeStyles()((theme) => {
  return {
    spbox: {
      display: "flex",
      justifyContent: "space-between",
      padding: "6px 12px 0",
    },
    overviewvalue: {
      color: "#000",
      fontSize: "12px !important",
      fontWeight: 400,
    },
    overviewcolumn: {
      margin: "0 0 8px",
    },
    overviewlocation: {
      color: "#000",
      fontSize: "14px !important",
    },
    ovlocationvalue: {
      color: "#231F20",
      "@media screen and (max-width: 1600px)": {
        fontSize: "11px",
      },
    },
  };
});

const SpHead = styled(Typography)(() => ({
  fontSize: 18,
  fontWeight: 600,
  fontFamily: "Open sans",
  color: "#231F20",
  textTransform: "capitalize",
}));

const Overview = ({ marginTop = "0px" }) => {
  const {
    manufacturer_year,
    model_number,
    dispatch_day,
    dispatch_in,
    country_origin_id,
    brand_name,
    tertiary_id,
    existence_place,
    country_origins,
    product_type,
    condition,
    availability,
    hide_country,
    hide_territory,
  } = useSelector((state: any) => state.productDetail.detail.data);
  const { country } = useSelector((state: any) => state.productDetail);
  const { breakPoints } = useAppContext();

  const GetCountryName = (name: any) => {
    let countryName = name.split(",");
    let countriesName = countryName.map(
      (v) => country.find((el) => el.value == v)?.view
    );
    return countriesName.toString();
  };

  const Value = [
    {
      title: "Manufacturer/Brand",
      value: brand_name ? brand_name : "",
    },
    {
      title: "Manufacturing Year",
      value: manufacturer_year ? manufacturer_year : "",
    },
    {
      title: "Model No.",
      value: model_number ? model_number : "",
    },
    {
      title: "Shipped in",
      value:
        product_type !== "simple"
          ? dispatch_in
            ? `${dispatch_in} ${dispatch_day}`
            : ""
          : "",
    },
    {
      title: "Condition",
      value: availability == "in_stock" ? (condition ? condition : "") : "",
    },
    {
      title: "Place of Origin",
      value:
        hide_country == 1
          ? availability == "in_stock"
            ? country.find((v) => v.value == country_origin_id)?.view ?? ""
            : ""
          : "",
    },
    {
      title: "Territory ",
      value:
        hide_territory == 1
          ? tertiary_id
            ? country?.find((v) => v.value == `${tertiary_id}t`)?.view ?? ""
            : ""
          : "",
    },
    {
      title: "Country ",
      value:
        hide_country == 1
          ? country_origins
            ? GetCountryName(country_origins)
            : ""
          : "",
    },
  ];

  const { classes } = useStyles();
  return (
    <Container pb={{ xs: "0px!important" }} pt={{ xs: "5px!important" }}>
      <div className={classes.spbox}>
        <SpHead style={{ fontWeight: "600 !important" }}>Overview</SpHead>
        {existence_place && availability === "in_stock" && (
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <FontContainer
              className={classes.overviewlocation}
              fontWeight={600}
            >
              Current Location
            </FontContainer>
            <LocationOnOutlinedIcon
              style={{
                fontSize: "16px",
                color: "#D7282F",
                margin: "1px -2px 0px 4px",
              }}
            />
            <FontContainer
              className={classes.ovlocationvalue}
              fontWeight={"400"}
              fontSize={"14px"}
            >
              {hide_country == 1
                ? country?.find((v) => v.value == existence_place)?.view ?? ""
                : ""}
            </FontContainer>
          </div>
        )}
      </div>
      <Divider sx={{ margin: "10px 12px 0" }} />
      <OverviewContainer>
        <Grid container spacing={1}>
          {Value.map((item, index) => {
            if (item.value || item.value !== "")
              return (
                <Grid item xl={4} lg={4} md={4} sm={4} xs={6} key={index}>
                  <Box className={classes.overviewcolumn}>
                    <OverviewHead
                      breakPoints={breakPoints}
                      sx={{
                        borderLeft: "2px solid #D7282F",
                        paddingLeft: "13px",
                      }}
                    >
                      {item.title}
                    </OverviewHead>

                    <FontContainer
                      className={classes.overviewvalue}
                      fontWeight={"400"}
                      sx={{ paddingLeft: "8px" }}
                    >
                      {item.value}
                    </FontContainer>
                  </Box>
                </Grid>
              );
          })}
        </Grid>
      </OverviewContainer>
    </Container>
  );
};

export default Overview;
