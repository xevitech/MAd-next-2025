import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import ProductModule from "./product.module.css";
import { FontContainer, RelatedproductContainer } from "../style";
import { apiClient } from "@/components/common/common";

import RequestPrice from "@/components/ProductsListing/RequestPrice";
import QuoteModal from "./Modal/QuoteModal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SellerRelatedproducts, SliderThumbnails } from "./Style";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setQuoteDetails } from "@/hooks/quoteHooks";
import ProductItem from "@/components/ProductsListing/ProductItem";
const SellerProducts = ({ marginTop = "4px", productList, Name }) => {
  const { country, detail }: any = useSelector(
    (state: any) => state.productDetail
  );
  const [getLatestPrice, setGetLatestPrice] = useState<boolean>(false);
  const [openModal, setModal] = useState<boolean>(false);
  const [productID, setProductID] = useState<any>("");
  const [loader, setShowLoader] = useState<any>({ loader: "", id: "" });
  const dispatch = useDispatch();
  const [index, setIndex] = useState<number>(0);
  const fetchSingleProductDetails = async (id) => {
    let response = await apiClient("front/single/view", "post", {
      body: { id: id },
    });
    if (response.status === 200) {
      dispatch(setQuoteDetails(response.data));
      return response;
    }
  };
  const handleQuote = async (id, type) => {
    setShowLoader({ loader: type, id });
    await fetchSingleProductDetails(id);
    setModal(true);
    setShowLoader({ loader: "", id: "" });
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrow: true,
    beforeChange: (current, next) => setIndex(next),
    afterChange: (current, next) => setIndex(current),
    prevArrow: <img src="/assets/arrowLeft.svg" alt="" className="prevArrow" />,
    nextArrow: <img src="/assets/arrowRight.svg" alt="" className="nextArrow" />,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <RelatedproductContainer>
      {getLatestPrice && (
        <RequestPrice
          open={getLatestPrice}
          closeModal={setGetLatestPrice}
          id={productID}
        />
      )}
      {openModal && (
        <QuoteModal open={openModal} handleClose={() => setModal(false)} />
      )}
      <SellerRelatedproducts
        className={`${ProductModule.grid_layout} ${ProductModule.product_related}`}
      >
        <Box sx={{
          "@media screen and (max-width:767px)": {
            margin: "0 0 6px"
          }

        }}>
          <FontContainer fontSize={"18px"} color="#000000" fontWeight={"700"}>
            {Name || "Products"}
          </FontContainer>
        </Box>

        {productList.length >= 4 && (
          <Box sx={{
          }}>
            <SliderThumbnails>
              <Slider {...settings}>
                {productList.map((element, index) => {
                  if (element) {
                    return (
                      <ProductItem data={element} key={index} />
                    );
                  }
                })}
              </Slider>
            </SliderThumbnails>
          </Box>
        )}
        {productList.length <= 3 && (
          <Box sx={{
          }}>
            <Grid container spacing={1}>
              {productList.length > 0
                ? productList.map((element, index) => {
                  if (element) {
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={3}
                        key={index}
                      >
                        <ProductItem data={element} key={index} />
                      </Grid>
                    );
                  }
                })
                : null}
            </Grid>
          </Box>
        )}
      </SellerRelatedproducts>
    </RelatedproductContainer>
  );
};

export default SellerProducts;
