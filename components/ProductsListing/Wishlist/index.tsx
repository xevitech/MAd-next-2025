import { Box, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ProductModule from "../product.module.css";
import { toast } from "react-toastify";
import { apiClient } from "@/components/common/common";
import { getTokenFromCookies } from "@/utils/cookieUtils";
import { setWishListData } from "@/hooks/HeaderHooks";
import { useDispatch, useSelector } from "react-redux";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
function WishlistComponent({ element }) {
  const [Favourite, setFavourite] = useState(false);
  const [mount, setMount] = useState(false);

  const dispatch = useDispatch();

  const { wishListData: wishLists } = useSelector((state: any) => state.header);

  useEffect(() => {
    if (element?.wishList && !Favourite && !mount) {
      setFavourite(true);
      setMount(true);
    }
  }, [element?.wishList, Favourite, mount]);
  const AddToWishlist = async (item) => {
    if (!getTokenFromCookies()) {
      toast.error("Please login to add product in wishlist");
      return;
    }
    setFavourite(!Favourite);
    let userid = JSON.parse(localStorage.getItem("userData"))?.id;
    let response = await apiClient("front/addproduct_To_wishList", "post", {
      body: { product_id: item.id, user_id: userid },
    });
    if (!response.status || response.status !== 200) {
      setFavourite(!Favourite);
    }
    if (!Favourite) {
      if (wishLists && element) {
        const updatedWishLists = [...wishLists, { ...element }];
        dispatch(setWishListData(updatedWishLists));
      }
    } else {
      const updatedWishLists = wishLists?.filter(
        (wishlist) => +wishlist.id !== +element?.id
      );
      dispatch(setWishListData(updatedWishLists));
    }
  };
  const currentLoggedUser = JSON.parse(localStorage.getItem("userData"))?.id;
  if (element?.user_id === currentLoggedUser) {
    return null;
  }
  return (
    <LightTooltip title="Wishlist" placement="top" arrow>
      <Box className={ProductModule.wishlist_btn} aria-label="Wishlist">
        {Favourite ? (
          <FavoriteIcon
            style={{ color: "#d7282f" }}
            aria-label="Wishlist"
            className={ProductModule.wislist_img}
            onClick={(e) => {
              AddToWishlist(element);
            }}
          />
        ) : (
          <FavoriteBorderOutlinedIcon
            className={ProductModule.wislist_img}
            aria-label="Wishlist"
            onClick={(e) => {
              AddToWishlist(element);
            }}
          />
        )}
      </Box>
    </LightTooltip>
  );
}

export default WishlistComponent;
