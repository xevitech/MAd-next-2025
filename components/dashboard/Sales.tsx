import React from "react";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";

export default function Sales() {
  const router = useRouter();
  return (
    <>
      <Grid container spacing={1.5} sx={{ mt: 0.4 }}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
        </Grid>
      </Grid>
    </>
  );
}
