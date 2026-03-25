import React from "react";
import { Box } from "@mui/material";
import {
  LargeTextContainer,
  SmallTextContainer,
} from "@/components/common/NoDataFound/style";
import Image from "next/image";

const NoDataFound = () => {
  return (
    <Box height="100%" alignItems="center" justifyContent="center" sx={{minHeight: "300px", display:"flex"}}>
      <div style={{ textAlign: "center", }}>
        <Image height={80} width={80} alt='no data found' src={"/assets/NoResult.svg"} />
        <LargeTextContainer>No Result Found</LargeTextContainer>
        <SmallTextContainer>We couldn&apos;t found what you searched for <br/>Try searching again</SmallTextContainer>
        
      </div>
    </Box>
  );
};

export default NoDataFound;
