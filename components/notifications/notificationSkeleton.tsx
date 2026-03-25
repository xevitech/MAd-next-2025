import React from "react";
import { Skeleton,styled } from "@mui/material";
import Box from "@mui/material/Box";

export const Flex = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

export default function NotificationSkeleton() {
  return (
    <>
      <Box pl={0.5} mt={.5}>
        <Box display="flex" alignItems="center">
          <Box>
            <Skeleton variant="circular" width={25} height={25} />
          </Box>
          <Box>
            <Skeleton
              variant="rounded"
              width={210}
              height={20}
              sx={{ ml: 2 }}
            />
          </Box>
        </Box>
        <Box>
          <Skeleton
            variant="rounded"
            width="45%"
            height={20}
            sx={{ ml: 5.3, mt: 1 }}
          />
          <Skeleton
            variant="rounded"
            width="20%"
            height={20}
            sx={{ ml: 5.3, mt: 2, mb: 3 }}
          />
        </Box>
      </Box>
      <Box pl={0.5} mt={.5}>
        <Box display="flex" alignItems="center">
          <Box>
            <Skeleton variant="circular" width={25} height={25} />
          </Box>
          <Box>
            <Skeleton
              variant="rounded"
              width={210}
              height={20}
              sx={{ ml: 2 }}
            />
          </Box>
        </Box>
        <Box>
          <Skeleton
            variant="rounded"
            width="45%"
            height={20}
            sx={{ ml: 5.3, mt: 1 }}
          />
          <Skeleton
            variant="rounded"
            width="20%"
            height={20}
            sx={{ ml: 5.3, mt: 2, mb: 3 }}
          />
        </Box>
      </Box>
      <Box pl={0.5} mt={.5}>
        <Box display="flex" alignItems="center">
          <Box>
            <Skeleton variant="circular" width={25} height={25} />
          </Box>
          <Box>
            <Skeleton
              variant="rounded"
              width={210}
              height={20}
              sx={{ ml: 2 }}
            />
          </Box>
        </Box>
        <Box>
          <Skeleton
            variant="rounded"
            width="45%"
            height={20}
            sx={{ ml: 5.3, mt: 1 }}
          />
          <Skeleton
            variant="rounded"
            width="20%"
            height={20}
            sx={{ ml: 5.3, mt: 2, mb: 3 }}
          />
        </Box>
      </Box>
      <Box pl={0.5} mt={.5}>
        <Box display="flex" alignItems="center">
          <Box>
            <Skeleton variant="circular" width={25} height={25} />
          </Box>
          <Box>
            <Skeleton
              variant="rounded"
              width={210}
              height={20}
              sx={{ ml: 2 }}
            />
          </Box>
        </Box>
        <Box>
          <Skeleton
            variant="rounded"
            width="45%"
            height={20}
            sx={{ ml: 5.3, mt: 1 }}
          />
          <Skeleton
            variant="rounded"
            width="20%"
            height={20}
            sx={{ ml: 5.3, mt: 2, mb: 3 }}
          />
        </Box>
      </Box>
      <Box pl={0.5} mt={.5}>
        <Box display="flex" alignItems="center">
          <Box>
            <Skeleton variant="circular" width={25} height={25} />
          </Box>
          <Box>
            <Skeleton
              variant="rounded"
              width={210}
              height={20}
              sx={{ ml: 2 }}
            />
          </Box>
        </Box>
        <Box>
          <Skeleton
            variant="rounded"
            width="45%"
            height={20}
            sx={{ ml: 5.3, mt: 1 }}
          />
          <Skeleton
            variant="rounded"
            width="20%"
            height={20}
            sx={{ ml: 5.3, mt: 2, mb: 3 }}
          />
        </Box>
      </Box>
      <Box pl={0.5} mt={.5}>
        <Box display="flex" alignItems="center">
          <Box>
            <Skeleton variant="circular" width={25} height={25} />
          </Box>
          <Box>
            <Skeleton
              variant="rounded"
              width={210}
              height={20}
              sx={{ ml: 2 }}
            />
          </Box>
        </Box>
        <Box>
          <Skeleton
            variant="rounded"
            width="45%"
            height={20}
            sx={{ ml: 5.3, mt: 1 }}
          />
          <Skeleton
            variant="rounded"
            width="20%"
            height={20}
            sx={{ ml: 5.3, mt: 2, mb: 3 }}
          />
        </Box>
      </Box>
    </>
  );
}
