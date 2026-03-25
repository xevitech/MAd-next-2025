import { Box, Breadcrumbs, Grid, Link } from "@mui/material";
import productdetail from "../productdetail.module.css";
import React, { useCallback, useEffect, useState } from "react";
import { BreadcrumbsStyle } from "@/components/ProductDetail/style";
import { apiClient } from "@/components/common/common";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getTokenFromCookies } from "@/utils/cookieUtils";

const Header = () => {
  const { is_wishlist, breadcrumbs, id } = useSelector(
    (state: any) => state.productDetail.detail.data
  );

  const [Favorite, setFavourite] = useState<boolean>(is_wishlist);
  useEffect(() => {
    if (is_wishlist && !Favorite) setFavourite(true);
  }, [is_wishlist]);
  const router = useRouter();
  const webview = {
    xs: "none",
    sm: "none",
    lg: "block",
    xl: "block",
    md: "block",
  };
  const mobileview = {
    xs: "none",
    sm: "none",
    lg: "block",
    xl: "block",
    md: "block",
  };

  let IconStyle = { fontSize: "14px", color: "#D7282F", cursor: "pointer" };

  const AddToWishlist = async () => {
    let response = await apiClient("front/addproduct_To_wishList", "post", {
      body: { product_id: id },
    });
    if (!response.status || response.status !== 200) {
      setFavourite(!Favorite);
    }
  };

  const WishlistHandler = () => {
    if (!getTokenFromCookies()) {
      toast.error("Please login to add product in wishlist");
      return;
    }
    setFavourite((prev) => !prev);
    AddToWishlist();
  };

  const getUrlToRedirect = useCallback(
    (targetSlug) => {
      let baseUrl = "/category";
      const slugs = breadcrumbs
        .slice(0, breadcrumbs.findIndex((b) => b.slug === targetSlug) + 1)
        .map((b) => b.slug);
      return `${baseUrl}/${slugs.join("/")}`;
    },
    [breadcrumbs]
  );

  return (
    <Box className="mypagecontainer">
      <Grid item>
        <BreadcrumbsStyle>
          <Breadcrumbs
            aria-label="breadcrumb"
            style={{ color: "#223354", fontSize: "15px" }}
          >
            <Link
              className={productdetail.link_name}
              style={{ cursor: "pointer" }}
              onClick={() => router.push("/productlist")}
            >
              Home
            </Link>
            {breadcrumbs?.map((v, index) => (
              <Link
                key={v.id}
                style={{ cursor: "pointer" }}
                className={productdetail.link_name}
                onClick={() => {
                  const urlToRedirect = getUrlToRedirect(v?.slug);
                  router.push(urlToRedirect);
                }}
              >
                {v.name}
              </Link>
            ))}
          </Breadcrumbs>
        </BreadcrumbsStyle>
      </Grid>
    </Box>
  );
};

export default Header;
