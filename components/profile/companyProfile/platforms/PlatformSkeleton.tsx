import { Box, Skeleton } from "@mui/material";
import React from "react";
import { Licomponent, Ulcomponent } from ".";

export default function PlatformSkeleton() {
  return (
    <>
      <Box>
        <Ulcomponent>
          <Licomponent>
            <Skeleton animation="wave" variant="text" width={"100px"} />
          </Licomponent>
          <Licomponent>
            <Skeleton animation="wave" variant="text" width={"60px"} />
          </Licomponent>
          <Licomponent>
            <Skeleton animation="wave" variant="text" width={"80px"} />
          </Licomponent>
          <Licomponent>
            <Skeleton animation="wave" variant="text" width={"140px"} />
          </Licomponent>
        </Ulcomponent>
      </Box>
    </>
  );
}
