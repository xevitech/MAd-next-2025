import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  DeleteIconBox,
  PriceText,
  WishListBox,
  WishListContent,
  WishListImg,
  WishListTextInfo,
  WishListtext,
  WishListtext1,
} from "./style";
import { Box, Divider, Skeleton } from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { apiClient, CurrencySymbol } from "../common";
import { useDispatch, useSelector } from "react-redux";
import { setWishListData } from "@/hooks/HeaderHooks";
import { BASE_URL_CHAT } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import { LightTooltip } from "../Tooltip/tooltip";
// import EmptyChatUserLists from "@/components/Chat/common/components/empty-chat-userlist/EmptyChatUserLists";
function WishlistPopupData(props) {
  const { setAnchorMenuMessage } = props;
  const [wishlists, setWishList] = useState([]);
  const { wishListData: wishLists } = useSelector((state: any) => state.header);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setSkeletonData(true);
      try {
        const storedCurrency = localStorage.getItem("currency");
        const currencyValue = storedCurrency ? storedCurrency : 1;
        const res = await apiClient(
          `front/list/wishlist?currency=${currencyValue}`,
          "get"
        );
        setWishList(res?.data);
        dispatch(setWishListData(res?.data));
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      } finally {
        setSkeletonData(false);
      }
    };
    fetchData();
  }, []);
  const handleRemoveWishList = async (product_id = "", user_id = "") => {
    const response = await apiClient("front/addproduct_To_wishList", "post", {
      body: { product_id, user_id },
    });
    const updatedWishLists = wishLists?.filter(
      (wishlist) => +wishlist.id !== +product_id
    );
    dispatch(setWishListData(updatedWishLists));
    setWishList(updatedWishLists);
  };
  const [skeletonData, setSkeletonData] = useState(true);

  return (
    <div>
      {/* <WishListBox
        onMouseLeave={() => {
          setAnchorMenuMessage(null);
        }}
      >
        {wishlists?.slice(0, 4)?.map((wishList) => {
          return (
            <>
              <WishListContent>
                <WishListImg>
                  <img src={wishList?.photos} alt="Image" title="" />
                </WishListImg>
                <WishListTextInfo>
                  <Box>
                    <WishListtext>{wishList?.name}</WishListtext>
                    {wishList?.unit_price && (
                      <PriceText>
                        Price:{" "}
                        <WishListtext1>{wishList?.unit_price}</WishListtext1>
                        {/* / 1000
                      Pieces 
                      </PriceText>
                    )}
                  </Box>
                  <DeleteIconBox
                    onClick={() =>
                      handleRemoveWishList(wishList?.id, wishList?.user_id)
                    }
                  >
                    <DeleteOutlineRoundedIcon />
                  </DeleteIconBox>
                </WishListTextInfo>
              </WishListContent>
              <Divider />
            </>
          );
        })}
      </WishListBox> */}
      <WishListBox
        sx={{
          maxHeight: wishlists.length == 0 ? "283px" : "283px",
          height: wishlists.length == 0 ? "283px" : "auto",
        }}
        onMouseLeave={() => {
          setAnchorMenuMessage(null);
        }}
      >
        {skeletonData ? (
          Array(4)
            .fill(0)
            .map((_, index) => (
              <WishListContent key={index}>
                <Skeleton variant="rectangular" width={50} height={50} />
                <WishListTextInfo>
                  <Box>
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", width: 120 }}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "0.875rem", width: 80 }}
                    />
                  </Box>
                  <Skeleton
                    variant="rectangular"
                    width={24}
                    height={24}
                    sx={{ borderRadius: "3px" }}
                  />
                </WishListTextInfo>
              </WishListContent>
            ))
        ) : wishlists && wishlists.length > 0 ? (
          wishlists.map((wishList) => {
            const symbol =
              wishList?.symbol ?? CurrencySymbol(wishList.currency_id);
            return (
              <React.Fragment key={wishList?.id}>
                <WishListContent>
                  <WishListImg>
                    <img src={wishList?.photos} alt="Image" title="" />
                  </WishListImg>
                  <WishListTextInfo>
                    <Box>
                      <LightTooltip
                        placement="top"
                        title={wishList?.product_name}
                        arrow
                        disableInteractive
                      >
                        <WishListtext>{wishList?.product_name}</WishListtext>
                      </LightTooltip>
                      {(wishList?.unit_price ||
                        wishList?.price_range?.length > 0) && (
                        <PriceText>
                          {wishList?.price_unavailable_type ? (
                            <WishListtext1>
                              {wishList?.price_unavailable_type}
                            </WishListtext1>
                          ) : wishList?.unit_price ? (
                            <WishListtext1>
                              {symbol} {wishList?.unit_price} /{" "}
                              {wishList?.unit_name ?? ""}
                            </WishListtext1>
                          ) : (
                            <WishListtext1>
                              {symbol}{" "}
                              {wishList?.price_range[0]
                                ? wishList.price_range[0]?.toLocaleString()
                                : "N/A"}{" "}
                              - {symbol}{" "}
                              {wishList?.price_range[1]
                                ? wishList?.price_range[1]?.toLocaleString()
                                : "N/A"}
                            </WishListtext1>
                          )}
                        </PriceText>
                      )}
                    </Box>
                    <DeleteIconBox
                      onClick={() =>
                        handleRemoveWishList(wishList?.id, wishList?.user_id)
                      }
                    >
                      <DeleteOutlineRoundedIcon />
                    </DeleteIconBox>
                  </WishListTextInfo>
                </WishListContent>
              </React.Fragment>
            );
          })
        ) : (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            {/* <EmptyChatUserLists
              title="No Products added"
              imageURL="/assets/images/header/No-wishlist-header.svg"
              imageWidth="100px"
            /> */}
          </Box>
        )}
      </WishListBox>
    </div>
  );
}
export default WishlistPopupData;
