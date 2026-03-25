import React from "react";
import { Stack } from "@mui/material";
import {
  LargeTextContainer,
  SmallTextContainer,
} from "@/components/common/NoDataFound/style";
import Image from "next/image";

const NoRows = () => {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      <div style={{ textAlign: "center", padding: "16px" }}>
        <Image height={80} width={80} alt='no data found' src={"/assets/Product.svg"} />
        <LargeTextContainer>No Result Found</LargeTextContainer>
        <SmallTextContainer>We couldn&apos;t found what you searched for</SmallTextContainer>
        <SmallTextContainer>Try searching again</SmallTextContainer>
      </div>
    </Stack>
  );
};

export default NoRows;
