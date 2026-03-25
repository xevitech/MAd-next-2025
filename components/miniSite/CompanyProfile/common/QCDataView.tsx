import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { CPTextViewBox } from "../CompanyProfile.styled";
import ImageTitleShow from "./ImageTitleShow";
import { CloneBoxSectionMini } from "../../styled";

const QCDataView = ({ title, data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return;
  }

  return (
    <>
      <Box
        sx={{
          margin: "0 0 24px 0",
          border: "1px solid #e2e2e2",
          borderRadius: "10px",
        }}
      >
        <Typography
          sx={{
            textTransform: "capitalize",
            background: "#fff1f1",
            fontSize: "16px",
            padding: "0.3rem 1rem",
            fontWeight: "600",
            borderRadius: "10px 10px 0 0",
            margin: "0 0 16px 0",
          }}
        >
          {title}
        </Typography>

        <CloneBoxSectionMini>
          <Box sx={{ padding: "0 15px 15px 15px" }}>
            <Grid
              mb={{ xs: 1 }}
              container
              spacing={{ xs: 1 }}
              className="parent-section"
            >
              <Grid
                // key={`section-${i}`}
                container
                spacing={2}
                // className={`common-section section-${i}`}
              >
                {data?.map((qualityControlArray, i) => 
                    qualityControlArray?.map((qualityControlProcess, j) => (
                      <Grid item xs={12} sm={4} md={4} key={j}>
                        <CPTextViewBox
                          pb={{ xs: 1.8 }}
                          wid="100%"
                          height="100%"
                          className="CPTextViewBox"
                        >
                          <Typography component="label">
                            {qualityControlProcess?.title}
                          </Typography>
                          {qualityControlProcess?.title ===
                            "Testing Certificate" ||
                          qualityControlProcess?.title === "Process Image" ? (
                            <Box>
                              {Array.isArray(qualityControlProcess?.value) ? (
                                qualityControlProcess.value.map((image, k) => (
                                  <ImageTitleShow
                                    key={k}
                                    src={image?.source}
                                    alt={image?.file_original_name}
                                  />
                                ))
                              ) : (
                                <Typography>
                                  {qualityControlProcess?.value}
                                </Typography>
                              )}
                            </Box>
                          ) : (
                            <Typography>
                              {qualityControlProcess?.value}
                            </Typography>
                          )}
                        </CPTextViewBox>
                      </Grid>
                    ))
                )}
              </Grid>
            </Grid>
          </Box>
        </CloneBoxSectionMini>
      </Box>
    </>
  );
};

export default QCDataView;
