import { Box, Skeleton, Accordion, AccordionSummary, AccordionDetails, Typography, Grid } from "@mui/material";
import React from "react";
import { ExpandMore } from '@mui/icons-material'
import { SmallContainer } from "../style";

export default function GeneralSettingSkelton() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box mt={-0.2} mb={0}>
            <Skeleton animation="wave" variant="text" width={120} />
            <SmallContainer>
              <Skeleton animation="wave" variant="text" width={220} />
            </SmallContainer>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4} mt={-1}>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={510}
            height={40}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4} mt={-1}>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={510}
            height={40}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4} mt={-1}>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={510}
            height={40}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Skeleton
              animation="wave"
              variant="rounded"
              width={80}
              height={40}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
