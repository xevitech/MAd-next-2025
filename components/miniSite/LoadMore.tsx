import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector } from "react-redux";

export default function LoadMore() {
  const { contextLoading, productData } = useSelector(
    (state: any) => state.miniSite
  );
  return (
    <Box textAlign="center">
      {contextLoading && (
        <LoadingButton
          loading={contextLoading}
          loadingIndicator="Loading…"
          variant="contained"
        />
      )}
      {!productData && (
        <LoadingButton
          loading={contextLoading}
          loadingIndicator="Loading…"
          variant="contained"
        />
      )}
      {productData?.data?.length > 8 && (
        <Stack
          padding={2.5}
          direction={{ xs: "row" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack
            display={{ xs: "none", sm: "flex" }}
            direction={{ xs: "row" }}
            justifyContent="space-between"
            alignItems="center"
          >
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
