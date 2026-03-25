import React from "react";
import { Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { setBannerPage } from "@/hooks/sellerSubaccount";
import { useDispatch, useSelector } from "react-redux";

export default function BannerspacewithSelect() {
  const [menu, menuData] = React.useState("");
  const dispatch = useDispatch();
  const handleChange = (event: SelectChangeEvent) => {
    menuData(event.target.value);
    dispatch(setBannerPage(event.target.value));
  };
  const { bannerData, page } = useSelector((state: any) => state.subseller);
  return (
    <div>
      <Box>
        <FormControl sx={{ width: "20%", mt: 3 }}>
          <Select
            size="small"
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={menu}
            onChange={handleChange}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <p style={{ color: "#bcbcbc", fontSize: "14px" }}>
                    Select Page
                  </p>
                );
              }
              return selected;
            }}
          >
            <MenuItem
              value={"Home"}
              disabled={bannerData && bannerData?.some((item) => item.page === "Home")}
            >
              Home
            </MenuItem>
            <MenuItem
              value={"Products"}
              disabled={bannerData && bannerData?.some((item) => item.page === "Products")}
            >
              Products
            </MenuItem>
            <MenuItem
              value={"Review"}
              disabled={bannerData?.some((item) => item.page === "Review")}
            >
              Review
            </MenuItem>
            <MenuItem
              value={"Company Profile"}
              disabled={bannerData?.some(
                (item) => item.page === "Company Profile"
              )}
            >
              Company Profile
            </MenuItem>
            <MenuItem
              value={"Certificates"}
              disabled={bannerData?.some(
                (item) => item.page === "Certificates"
              )}
            >
              Certificates
            </MenuItem>
            <MenuItem
              value={"Factory Tour"}
              disabled={bannerData?.some(
                (item) => item.page === "Factory Tour"
              )}
            >
              Factory Tour
            </MenuItem>
            <MenuItem
              value={"R&D Management"}
              disabled={bannerData?.some(
                (item) => item.page === "R&D Management"
              )}
            >
              R&D Management
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
