import { Stack } from "@mui/material";
import { ListHeading, ShortChip, ProductListHeading } from "./styled";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MiniSiteContext } from "@/contextApi/miniContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { setCloseAnchorEl } from "@/hooks/miniSite";
import { useAppDispatch } from "redux/store";

export default function Listingheading({ productList }) {
  const { productData } = useSelector((state: any) => state.miniSite);
  const { selctedcategory } = useContext(MiniSiteContext);
  const dispatch = useAppDispatch();
  const handleclosePopUp = () => {
    dispatch(setCloseAnchorEl(null));
  };
  return (
    <ProductListHeading onMouseEnter={handleclosePopUp}>
      <Stack
        direction={{ xs: "row" }}
        justifyContent={{ xs: "space-between" }}
        alignItems="center"
      >
        <ListHeading variant="h5">
          {selctedcategory ? selctedcategory : "All Products"}
          <span style={{ marginLeft: "8px" }}>
            | Products Available <span>({productList?.length})</span>
          </span>{" "}
        </ListHeading>
        <ShortChip
          variant="outlined"
          label="Sort By"
          icon={<ExpandMoreIcon />}
        />
      </Stack>
    </ProductListHeading>
  );
}
