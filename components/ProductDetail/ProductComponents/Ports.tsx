import { Typography } from "@mui/material";
import React from "react";
import { FontContainer, PortLocation } from "@/components/ProductDetail/style";
import {
  PortBox,
  PortContainer,
  PortLocationContainer,
  PortStyleContainer,
  SeaPortsCol,
  PortIcons,
} from "@/components/ProductDetail/ProductComponents/Style";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Ports = ({ marginTop = "16px" }) => {
  const { sea_, port_, product_type } = useSelector(
    (state: any) => state.productDetail.detail.data
  );
  const { toggleConfigure } = useSelector((state: any) => state.productDetail);
  const dispatch = useDispatch();

  return (
    <PortContainer>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={product_type !== "simple" ? 12 : 12}
          xl={product_type !== "simple" ? 12 : 12}
        >
          <SeaPortsCol>
            <Typography
              sx={{ fontSize: "18px", color: "#D7282F", margin: "12px 0 0px" }}
            >
              Shipping Method
            </Typography>
          </SeaPortsCol>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <PortBox>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <PortLocationContainer>
                      <PortIcons>
                        <i className="icon-sea-port"></i>
                      </PortIcons>
                      <PortStyleContainer>
                        <FontContainer fontSize="13px" color=" #000000">
                          Sea Port
                        </FontContainer>
                        <PortLocation
                          color=" #5C5C5C"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {sea_ || "Not available"}
                        </PortLocation>
                      </PortStyleContainer>
                    </PortLocationContainer>
                  </Grid>
                </Grid>
              </PortBox>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PortContainer>
  );
};

export default Ports;
