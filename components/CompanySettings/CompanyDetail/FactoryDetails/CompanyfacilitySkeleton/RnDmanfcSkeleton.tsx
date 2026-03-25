import { Grid, Typography, Skeleton } from "@mui/material";
import React from "react";
import { DataRowHere, DataRowTitle, DataRowValue } from "../style";

export default function RnDmanfcSkeleton() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <DataRowHere>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={4}>
                    <DataRowTitle>
                      <Skeleton variant="text" width="30%" animation="wave" />
                    </DataRowTitle>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <DataRowValue>
                      <Skeleton variant="text" width="30%" animation="wave" />
                    </DataRowValue>
                  </Grid>
                </Grid>
              </DataRowHere>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <DataRowHere>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={4}>
                    <DataRowTitle>
                      <Skeleton variant="text" width="30%" animation="wave" />
                    </DataRowTitle>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <DataRowValue>
                      <Skeleton variant="text" width="30%" animation="wave" />
                    </DataRowValue>
                  </Grid>
                </Grid>
              </DataRowHere>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <DataRowHere>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={4}>
                    <DataRowTitle>
                      <Skeleton variant="text" width="30%" animation="wave" />
                    </DataRowTitle>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <DataRowValue>
                      <Skeleton variant="text" width="30%" animation="wave" />
                    </DataRowValue>
                  </Grid>
                </Grid>
              </DataRowHere>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <DataRowHere>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={4}>
                    <DataRowTitle>
                      <Skeleton variant="text" width="30%" animation="wave" />
                    </DataRowTitle>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <DataRowValue>
                      <Skeleton variant="text" width="30%" animation="wave" />
                    </DataRowValue>
                  </Grid>
                </Grid>
              </DataRowHere>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
