import React from "react";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";

const Recreate_Company = dynamic(
  () => import("@/components/guestLayout/recreate-company/RecreateCompany"),
  {
    ssr: false,
  }
);

const RecreateCompany = () => {
  return (
    <Box sx={{ margin: "0 0 80px 0", }}>
      <Recreate_Company />
    </Box>
  );
};

export default RecreateCompany;
