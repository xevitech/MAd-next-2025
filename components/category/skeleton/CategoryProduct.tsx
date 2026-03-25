import React from "react";
import Grid from "@mui/material/Grid";
import { Link, Skeleton } from "@mui/material";
import {
  ImageHeading,
  ImageInfo,
  InnerContentBox,
  MyImageBox,
  MyInfoBox,
} from "../style";

export default function CategoryProduct() {
  let List = [1, 2, 3, 4, 5, 6, 7];
  return (
    <>
      <Grid container spacing={2} sx={{ margin: "20px 0 0 0" }}>
        {List.map((v, i) => (
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Link
              sx={{
                textDecoration: "none",
                color: "inherit",
                "&:hover": {
                  color: "inherit",
                  textDecoration: "none",
                },
              }}
            >
              <InnerContentBox>
                <MyImageBox sx={{ borderRadius: "4px" }}>
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={"100%"}
                    height={"100%"}
                  />
                </MyImageBox>
                <MyInfoBox>
                  <ImageHeading>
                    <Skeleton animation="wave" variant="text" width={"100%"} />
                    <Skeleton animation="wave" variant="text" width={"50%"} />
                  </ImageHeading>
                  <ImageInfo>
                    <Skeleton animation="wave" variant="text" width={"80%"} />
                  </ImageInfo>
                </MyInfoBox>
              </InnerContentBox>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
