import React, { useEffect, useState } from "react";
import { Box, Typography, Link, List, ListItem } from "@mui/material";

import {
  ShadowBox,
  WishlistCol,
  LocationCol,
  DispatchOpt,
  ViewOpt,
  ChatSupplier,
  SupplierImg,
  AddList,
  MyAdsInnerData,
} from "@/components/ProductDetail/ProductComponents/Style";

import QuoteModal from "@/components/ProductDetail/ProductComponents/Modal/QuoteModal";

import { toast } from "react-toastify";
import { apiClient } from "@/components/common/common";
import RequestPrice from "@/components/ProductsListing/RequestPrice";
import { makeStyles } from "tss-react/mui";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { setQuoteModal } from "@/hooks/productDetailsReducer";
import { useAppDispatch } from "redux/store";
import Ports from "./Ports";
import ProductOptionsModal from "./Modal/ProductOptionsModal";
import moment from "moment";
import { getTokenFromCookies } from "@/utils/cookieUtils";

const ProductPricing = () => {
  const {
    product_type,
    price_type,
    availability,
    delivery_time,
    delivery_select,
    in_house_production,
    in_house_production_days,
    user_id,
    qty_unit,
    unit,
    id,
    dispatch_in,
    dispatch_day,
    quantity_based_list,
    existence_place,
    news,
    end_date,
  }: any = useSelector((state: any) => state.productDetail.detail.data);
  const { country } = useSelector((state: any) => state.productDetail);

  const { openQuoteModal }: any = useSelector(
    (state: any) => state.productDetail
  );
  const Units = useSelector((state: any) => state.productDetail.unit);
  const useStyles = makeStyles()((theme) => {
    return {
      qyalitytxt: {
        fontSize: "14px !important",
        color: "#000000",
      },
      qyalityfield: {
        width: "50px",
        margin: "0px 10px !important",
      },
      qualityrow: {},
      negotiablescreen: {
        "@media screen and (max-width: 1600px)": {
          fontSize: "9px !important",
        },
      },

      "@media screen and (max-width: 1700px)": {
        qyalitytxt: {
          fontSize: "11px !important",
        },
        qyalityfield: {
          width: "40px",
        },
      },
    };
  });
  const [open, setOpen] = useState<boolean>(false);
  const [openModal, setModal] = useState<boolean>(false);
  const [getLatestPrice, setGetLatestPrice] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<any>(1);
  const [anchorEl, setAnchorEl] = React.useState<boolean>(true);
  const [showButton, setShowButton] = React.useState<boolean>(true);
  const [mount, setMount] = React.useState<boolean>(false);
  const [unitPrice, setUnitPrice] = useState<Number>(0);
  const [productOptionsList, setProductOptionsList] = React.useState<any>([]);
  const [page, setPage] = React.useState<number>(1);
  const [lastPage, setlastpage] = React.useState<number>(0);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(true);
  };
  useEffect(() => {
    if (!mount) {
      setMount(true);
      FetchProductOptions(1);
    }
  }, [mount]);

  const SetPageHandler = (page_number) => {
    FetchProductOptions(page_number);
  };

  const FetchProductOptions = async (page_number) => {
    let formData = new FormData();
    formData.append("product_id", id);
    formData.append("page", `${page_number}`);
    formData.append("per_page", "10");
    let response = await apiClient(
      "front/matrix/list",
      "post",
      { body: formData },
      true
    );
    setPage(page_number);
    setlastpage(response.lastPage);
    setProductOptionsList((prev) => response.data);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    let id = JSON.parse(localStorage.getItem("userData"))?.id;
    if (id == user_id) {
      setShowButton(false);
    }
  }, [user_id]);

  useEffect(() => {
    if (price_type === "quantity" && quantity === 1) {
      if (quantity_based_list.length > 0)
        setQuantity(quantity_based_list[0]?.min_qty);
    }
  }, [quantity_based_list]);

  useEffect(() => {
    if (price_type === "quantity") {
      let price = quantity_based_list?.filter(
        (item) => quantity >= item.min_qty && quantity <= item.max_qty
      );
      let unit =
        price?.length > 1
          ? price?.[price?.length - 1]?.price
          : price?.[0]?.price;
      setUnitPrice(unit);
    }
  }, [quantity, quantity_based_list]);

  useEffect(() => {
    if (openQuoteModal) {
      setTimeout(() => {
        setModal(true);
        let val: any = false;
        dispatch(setQuoteModal(val));
      }, 500);
    }
  }, [openQuoteModal]);

  const { is_wishlist, hide_country } = useSelector(
    (state: any) => state.productDetail.detail.data
  );

  const [Favorite, setFavourite] = useState<boolean>(is_wishlist);
  useEffect(() => {
    if (is_wishlist && !Favorite) setFavourite(true);
  }, [is_wishlist, Favorite]);

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

  let unitToShow =
    Units?.find((v) => (v.id == qty_unit ? qty_unit : unit ? unit : ""))
      ?.name ?? null;

  return (
    <>
      {open && (
        <ProductOptionsModal
          open={open}
          handleClose={() => setOpen(false)}
          productOptionsList={productOptionsList}
          lastPage={lastPage}
          page={page}
          setPage={SetPageHandler}
        />
      )}
      {moment(end_date).isAfter(moment()) && news?.length > 1 && (
        <ShadowBox>
          <AddList>
            {news?.map((v, index) => {
              return (
                <ListItem key={index}>
                  <MyAdsInnerData>
                    <div dangerouslySetInnerHTML={{ __html: v }}></div>
                  </MyAdsInnerData>
                </ListItem>
              );
            })}
          </AddList>
        </ShadowBox>
      )}

      <ShadowBox style={{ display: "none" }}>
        <WishlistCol>
          {
            <Link
              href="#"
              underline="none"
              onClick={() => {
                WishlistHandler();
              }}
            >
              {!Favorite ? <FavoriteBorderOutlinedIcon /> : <FavoriteIcon />}
              Wishlist
            </Link>
          }
          <Box
            sx={{
              fontSize: "12px",
              color: "#FFFFFF",
              border: `1px solid ${product_type == "simple" ? "#34A853" : "#D7282F"
                }`,
              borderRadius: "6px",
              padding: "2px 6px",
              background: product_type == "simple" ? "#34A853" : "#D7282F",
            }}
          >
            {product_type == "simple"
              ? "  Simple Product"
              : "Configure Product"}
          </Box>
        </WishlistCol>

        {hide_country == 1 && (
          <LocationCol>
            Current Location:{" "}
            <strong>
              {hide_country == 1
                ? country?.find((v) => v.value == existence_place)?.view ?? ""
                : "--"}
            </strong>
          </LocationCol>
        )}
        <Ports />
        <DispatchOpt>
          <List>
            {availability === "in_stock" && dispatch_in && (
              <ListItem>
                Order Preparation Time:
                <span>
                  {dispatch_in ? `${dispatch_in} ` : ""}
                  {dispatch_day ? dispatch_day : ""}
                </span>
              </ListItem>
            )}
            {availability === "by_order" && in_house_production && (
              <>
                <ListItem>
                  Production Capacity:
                  <span>
                    {in_house_production ? `${in_house_production} ` : ""}
                    {in_house_production_days ? in_house_production_days : ""}
                  </span>
                </ListItem>
                <ListItem>
                  Unit:
                  <span>{unitToShow}</span>
                </ListItem>
                <ListItem>
                  Lead Delivery:
                  <span>
                    {delivery_time ? `${delivery_time} ${delivery_select}` : ""}
                  </span>
                </ListItem>
              </>
            )}
          </List>
        </DispatchOpt>
        {product_type !== "simple" && productOptionsList?.length > 0 && (
          <ViewOpt>
            <Typography variant="body1">All Available Options</Typography>
            <Link href="#" underline="none" onClick={() => setOpen(true)}>
              <i className="icon-view-opt"></i>View Options
            </Link>
          </ViewOpt>
        )}
        <ChatSupplier>
          <SupplierImg>
            <img src="/assets/chat.svg" />
          </SupplierImg>
          Chat with <span>Supplier</span>
        </ChatSupplier>
      </ShadowBox>

      {openModal && (
        <QuoteModal open={openModal} handleClose={() => setModal(false)} />
      )}
      {getLatestPrice && (
        <RequestPrice open={getLatestPrice} closeModal={setGetLatestPrice} />
      )}

      { }
    </>
  );
};
export default ProductPricing;
