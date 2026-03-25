import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ListHeading, ShortStack } from "../styled";
import IconButton from "@mui/material/IconButton";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";

export function MiniProductsListHeading({
  title = "",
  subTitle = "",
  value = null,
  controls = false,
}) {
  return (
    <Box>
      <Stack
        pb={1}
        paddingX={1.5}
        spacing={1}
        direction={{ xs: "row" }}
        justifyContent={{ xs: "space-between" }}
        alignItems={{ xs: "center" }}
      >
        <ListHeading variant="h4">
          {title}{" "}
          {subTitle || value ? (
            <span>
              (<span>{value}</span> {subTitle})
            </span>
          ) : null}{" "}
        </ListHeading>
        {controls && (
          <ShortStack
            direction={{ xs: "row" }}
            justifyContent={{ xs: "space-between" }}
            alignItems={{ xs: "center" }}
          >
            <Typography
              style={{ marginRight: "10px" }}
              color="black"
              fontSize={{ xs: "1rem" }}
            >
              Sort by:{" "}
            </Typography>
            <IconButton size="small">
              <ListAltOutlinedIcon />
            </IconButton>
            <IconButton size="small">
              <GridViewOutlinedIcon />
            </IconButton>
          </ShortStack>
        )}
      </Stack>
    </Box>
  );
}
