import {
  Box,
  Button,
  Popover,
  Typography,
  Card,
  TextField,
  Stack,
} from "@mui/material";
import React, { useEffect } from "react";
import BigPostdummy from "@/components/ProductsListing/BigPostdummy";
import ProductItemSkelton from "../MiniSkelton/ProductItemSkelton";
import { apiClient } from "@/components/common/common";
import ProductItem from "@/components/ProductsListing/ProductItem";

export default function GridProductListing({
  ParentComponent,
  gridData,
  loading,
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [territoryData, setTerritory] = React.useState<any>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const arr = [1, 1, 1, 1, 1, 1, 1, 1];

  useEffect(() => {
    FetchTerritoryData();
  }, []);

  const FetchTerritoryData = async () => {
    let response = await apiClient("territory", "get");
    if (response.status == 200) {
      const { data } = response;
      setTerritory(
        data.map((element) => ({
          value: element?.id + "t",
          view: element?.name,
          type: "Territory",
        }))
      );
    }
  };

  return (
    <Box mt={{ xs: 0.8 }}>
      <ParentComponent>
        {loading
          ? arr.map((skelton, i) => <ProductItemSkelton key={i} />)
          : gridData.map((item, i) =>
              i === 2 ? (
                <BigPostdummy data={item} />
              ) : (
                <ProductItem data={item} key={i} />
              )
            )}
      </ParentComponent>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        style={{ marginRight: "10px" }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Card sx={{ minWidth: 275 }}>
          <Box
            p={1.5}
            style={{ borderBottom: "1px solid rgba(34, 51, 84, .1)" }}
          >
            <Typography
              variant="h6"
              style={{ fontSize: "21px", fontWeight: 700 }}
            >
              Send Inquiry Now
            </Typography>
          </Box>
          <Stack spacing={2.5} p={{ xs: 2.5 }}>
            <Typography
              variant="h6"
              style={{ fontSize: "18px", fontWeight: 700 }}
            >
              Biogas Generator Silent Type 200kw 300kVA
            </Typography>
            <TextField
              sx={{
                "& .MuiFormLabel-root": {
                  top: "-4px",
                },
                "& .MuiInputBase-input": {
                  paddingX: 1.5,
                },
              }}
              label="Enter email address"
              size="small"
            />
            <TextField
              sx={{
                "& .MuiFormLabel-root": {
                  top: "-4px",
                },
                "& .MuiInputBase-input": {
                  paddingX: 1.5,
                },
              }}
              label="Short description"
              size="small"
              multiline
              maxRows={4}
            />
            <Button variant="contained" size="medium" color="primary">
              Send Inquiry Now
            </Button>
          </Stack>
        </Card>
      </Popover>
    </Box>
  );
}
