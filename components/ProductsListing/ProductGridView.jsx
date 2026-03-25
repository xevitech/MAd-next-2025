import React, { useState } from "react";
import { Grid, Button } from "@mui/material";
import ProductModule from "./product.module.css";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Carousel from "react-material-ui-carousel";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UploadIcon from "@mui/icons-material/Upload";
import QuoteModal from "../ProductDetail/ProductComponents/Modal/QuoteModal";
import { apiClient } from "@/components/common/common";
import { FirstletterCapital } from "@/components/common/common";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { setSingleProductId } from "../../hooks/UseProductListContext";
import { setQuoteDetails } from "@/hooks/quoteHooks";
export default function ProductGridView(props) {
  const element = props.data;
  const dispatch = useDispatch();
  const [openModal, setModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleQuote = async (id, type) => {
    setShowLoader(type);
    let response = await apiClient("front/single/view", "post", {
      body: { id: id },
    });
    if (response.status === 200) {
      dispatch(setQuoteDetails(response.data));
    }
    setModal(true);
    setShowLoader("");
    dispatch(setSingleProductId(id));
  };

  return (
    <>
      {openModal && (
        <QuoteModal open={openModal} handleClose={() => setModal(false)} />
      )}
      <Grid item xs={12} md={4} sm={6} key={Math.random() * (100 - 1)}>
        <div className={ProductModule.product_col}>
          <div className={ProductModule.product_col_inn}>
            <h5>
              <span>Category:</span>
              <b>{element.category_name}</b>
            </h5>
            <span className={ProductModule.productprice}>
              Price:
              <font style={{ color: "#D7282F" }}>
                <sup>$</sup>
              </font>
              <span>{element.unit_price}</span>
            </span>
          </div>

          <div className={ProductModule.productname_col}>
            <label className={ProductModule.label_left}>
              <h4>
                {element.product_name.length > 30
                  ? `${element.product_name.substring(0, 30)}...`
                  : element.product_name}
              </h4>
              <span>
                <b>Post/Product Id:</b> {element.id}
              </span>
            </label>

            <label className={ProductModule.label_right}>
              <span>
                <a href="#" className={ProductModule.txt_color}>
                  {FirstletterCapital(element.product_type.replace("_", " "))}
                </a>{" "}
              </span>
              <span>
                <b>Price Type: </b>
                {element.price_type}
              </span>
            </label>
          </div>

          <div className={ProductModule.product_list_img}>
            <Carousel
              autoPlay={false}
              IndicatorIcon={false}
              navButtonsAlwaysVisible={true}
              NextIcon={<NavigateNextIcon />}
              PrevIcon={<ArrowBackIosIcon />}
            >
              {element.photos.map((item, i) => (
                <div key={`photo-${i}`}>
                  <img src={item.source} alt={item.alt_tag} />
                  <Button
                    variant="contained"
                    endIcon={<UploadIcon />}
                    className={ProductModule.get_quote}
                    onClick={() => handleQuote(element.id, "quote")}
                  >
                    {loader === "quote" ? (
                      <ThreeDots
                        height="30"
                        width="30"
                        radius="9"
                        color="#D7282F"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                      />
                    ) : (
                      " Get a quote"
                    )}
                  </Button>
                </div>
              ))}
            </Carousel>
          </div>
          <div className={ProductModule.productname_col}>
            <label className={ProductModule.con_left}>
              <span>Current Location</span>
              <span className={ProductModule.location_txt}>
                {
                  <LocationOnOutlinedIcon
                    className={ProductModule.location_icon}
                  />
                }
                <b>{element.location}</b>
              </span>
            </label>

            <label className={ProductModule.con_left}>
              <span>Manufacturer</span>
              <span className={ProductModule.location_txt}>
                {element.brand_name}
              </span>
            </label>
          </div>

          <div
            className={`${ProductModule.productname_col} ${ProductModule.model_column}`}
          >
            <label className={ProductModule.con_left}>
              <span>CONDITION</span>
              <span className={ProductModule.location_txt}>
                {element.condition}
              </span>
            </label>

            <label className={ProductModule.con_left}>
              <span>MODEL NO.</span>
              <span className={ProductModule.location_txt}>
                {element.model_number}
              </span>
            </label>
            <label className={ProductModule.con_left}>
              {element.price_type === "quantity" && (
                <Button
                  variant="contained"
                  className={ProductModule.pink_btn}
                  onClick={() => handleQuote(element.id, "price")}
                >
                  {loader === "price" ? (
                    <ThreeDots
                      height="30"
                      width="30"
                      radius="9"
                      color="#D7282F"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      visible={true}
                    />
                  ) : (
                    " Get Latest Price"
                  )}
                </Button>
              )}
            </label>
          </div>
        </div>
      </Grid>
    </>
  );
}
