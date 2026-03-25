import {
  Box,
  Checkbox,
  Grid,
  Skeleton,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  AccordionHeader,
  FontContainer,
  ProdThumbImg,
  ProductLabel,
  SelectedConfig,
} from "../../style";
import { OverviewContainer, CountQty, QtyContainer } from "../Style";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SelectOptions from "./SelectOptions";
import { apiClient } from "@/components/common/common";
import { useAppDispatch } from "redux/store";
import { setSubmitQuoteData } from "@/hooks/quoteHooks";
import { useDispatch, useSelector } from "react-redux";
import _debounce from "lodash/debounce";
import UnitSelect from "./UnitSelect";
import { MobileCodes } from "@/components/common/PhoneInput/MobileCodesList";

function AccordianData({
  productList,
  unique_session_id,
  quotedetails,
  i,
  v,
  selectedProducts,
  handleCheckboxChange,
}) {
  const [expanded, setExpanded] = React.useState<string | false>("panel_1");
  const [quantities, setQuantities] = useState<any>(1);
  const [id, setID] = useState<string>("");
  const [relatedProductSpecifications, setRelatedProductSpecifications] =
    useState<any>([]);
  const [pricingData, setPricingData] = useState<any>();
  let totalPrice = useSelector(
    (state: any) => state.quoteDetails.TotalAndUnitPrice
  );

  const inputRef = useRef<any>(null)

  const dispatch = useDispatch();
  const { relatedProductData } = useSelector(
    (state: any) => state.quoteDetails
  );

  useEffect(() => {
    if (i == 0 && relatedProductSpecifications.length == 0) {
      FetchRelatedProductMatrix(v?.id);
    }
  }, [i]);

  // const [loader, setLoader] = useState(false);
  // const FetchRelatedProductMatrix = async (product_id) => {
  //   let response: any = await apiClient(
  //     "front/quotation_product_matrix",
  //     "post",
  //     {
  //       body: { product_id },
  //     }
  //   );

  //   const {
  //     country_name,
  //     country_origin_id,
  //     country_origin_id_type,
  //     country_origins,
  //   } = response;
  //   if (response.status == 200) {
  //     setRelatedProductSpecifications((prev) => [
  //       ...prev,
  //       {
  //         country_name: country_name
  //           ? country_name
  //           : country_origin_id
  //           ? country_origin_id
  //           : country_origin_id_type
  //           ? country_origin_id_type
  //           : country_origins
  //           ? country_origins
  //           : "",
  //         category_name: response.category_name,
  //         product_datetime: response.product_datetime,
  //         product_id,
  //         specifications:
  //           response.product_type == "simple"
  //             ? [response.specifications]
  //             : [response.variation_options],
  //       },
  //     ]);
  //   }
  // };
  // const [relatedProductSpecifications, setRelatedProductSpecifications] = useState([]);
  const [loadingSpecs, setLoadingSpecs] = useState<{ [key: number]: boolean }>(
    {}
  );

  const FetchRelatedProductMatrix = async (product_id) => {
    setLoadingSpecs((prev) => ({ ...prev, [product_id]: true }));

    try {
      let response: any = await apiClient(
        "front/quotation_product_matrix",
        "post",
        {
          body: { product_id },
        }
      );

      if (response.status === 200) {
        const {
          country_name,
          country_origin_id,
          country_origin_id_type,
          country_origins,
        } = response;

        setRelatedProductSpecifications((prev) => [
          ...prev,
          {
            country_name:
              country_name ??
              country_origin_id ??
              country_origin_id_type ??
              country_origins ??
              "",
            category_name: response.category_name,
            product_datetime: response.product_datetime,
            product_id,
            specifications:
              response.product_type === "simple"
                ? [response.specifications]
                : [response.variation_options],
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching product matrix:", error);
    } finally {
      setLoadingSpecs((prev) => ({ ...prev, [product_id]: false }));
    }
  };

  // Example trigger (you can move this call to useEffect or button click):
  // useEffect(() => {
  //   FetchRelatedProductMatrix(v.id);
  // }, [v.id]);

  const currentProductSpec = relatedProductSpecifications.find(
    (item) => item.product_id === v.id
  );
  const handleChange1 =
    (panel: string, id: any) =>
    (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
      if (!relatedProductSpecifications?.find((v) => v.product_id == id)) {
        FetchRelatedProductMatrix(id);
      }
    };

  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }));
  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  let filterData = relatedProductData?.filter((val) => val.id != v.id) ?? [];

  const SendQunatityQuery = React.useRef(
    _debounce(async (value, unique_session_id, id, attributes) => {
      if (value) {
        let response = await apiClient("front/quote_configuration", "post", {
          body: {
            unique_session_id,
            type: v.product_type,
            product_id: v.id,
            product_name: v.name,
            combinations: JSON.stringify(attributes?.specifications?.flat()),
            quantity: value,
            price: +v.unit_price ? +v.unit_price * value : 0,
            id: id ? id : "",
            country_name:
              MobileCodes.find((v) => v.code == attributes?.country_name)
                ?.name ?? "",
            category_name: attributes?.category_name,
            product_datetime: attributes?.product_datetime,
          },
        });
        if (response.status == 200) {
          setID(response.data.id);
          setPricingData(response.data);
          
        }
      }
    }, 100)
  ).current;

  let valueExist = relatedProductData.find((ele) => ele.id == v.id);
  const updateQuantity = (newQuantity) => {
    const updatedProduct = {
      id: v.id,
      type: v.product_type,
      qty: newQuantity,
      unit: `$ ${v?.unit_price ?? 0}`,
      total: `$ ${v?.unit_price ? +v.unit_price * newQuantity : 0}`,
    };

    if (valueExist) {
      dispatch(setSubmitQuoteData([updatedProduct]));
    }

    SendQunatityQuery(
      newQuantity,
      unique_session_id,
      id,
      relatedProductSpecifications?.find((item) => item.product_id == v.id)
    );
  };
  const [previousSelectedProducts, setPreviousSelectedProducts] = useState([]);
 

   const hideOptions = [
    {
      name: "Sign in to show price.",
      value: 1,
    },
    {
      name: "Price Flexible: The price of the product is flexible and may vary depending on quantity and other factors. Please sign in to discuss pricing.",
      value: 2,
    },
    {
      name: "Price Negotiable Upon Request: Please sign in for pricing information. The price of the product may vary depending on quality and other factors.",
      value: 3,
    },
    {
      name: "Price Subject to Negotiation: The price of the product is negotiable upon request. Please sign in for more information.",
      value: 4,
    },
    {
      name: "Price Subject to Final Agreement: The price of this product is flexible and may vary depending on quantity and other factors. Please sign in to discuss pricing.",
      value: 5,
    },
  ];
  const login = [
    {
      name: "contact us for pricing information.",
      value: 1,
    },
    {
      name: "Price Flexible: The price of this product is flexible and may vary depending on quantity and other factors. Please contact us to see price.",
      value: 2,
    },
    {
      name: "Price Negotiable Upon Request Please contact us for pricing information. The price of this product may vary depending on quantity and other factors.",
      value: 3,
    },
    {
      name: "Price Subject to Negotiation The price of this product is negotiable upon request. Please contact us for more information.",
      value: 4,
    },
    {
      name: "Price Subject to Final Agreement The price of this product is flexible and may vary depending on quantity and other factors. Please contact us to discuss pricing.",
      value: 5,
    },
  
  ];

  function debounce(func: any, delay: number) {
  let timeoutId: any;
  return function (...args: any) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

  const debouncedUpdateQuantity = React.useCallback(
    debounce((value:any) => {
      updateQuantity(value);
    }, 300),
    []
  );
 
  return (
    <Box
      sx={{
        display: "flex",
        gap: "5px",
        width: "100%",
        "& .MuiCheckbox-root": {
          "&.Mui-checked": {
            color: "#d7282f",
          },
        },
        ".MuiCheckbox-root": {
          padding: "9px 9px 9px 0px",

          "& .MuiSvgIcon-root": {
            display: "none",
          },
          "&:before": {
            content: '" "',
            display: "block",
            width: "14px",
            height: "14px",
            border: "1px solid #d2d2d2",
            borderRadius: "4px",
            padding: 0,
          },
          "&:after": {
            content: '" "',
            display: "inline-block",
            transform: "rotate(45deg)",
            width: "4px",
            height: "8px",
            borderBottom: "1px solid #D7282F",
            borderRight: "1px solid #D7282F",
            position: "absolute",
            top: "11px",
            opacity: "0",
          },
          "&:hover": {
            background: "transparent",
            "&:before": {
              borderColor: "#b1b0b0",
            },
          },
          "&.Mui-checked": {
            "&:after": {
              opacity: "1",
            },
            "&:before": {
              borderColor: "#D7282F",
            },
          },
          "& .MuiCheckbox-root": {
            padding: "5px 10px",
          },
        },
      }}
    >
      {/* Checkbox on the left */}
      <Checkbox
        key={v.id}
        checked={!!selectedProducts.find((item) => item.id === v.id)}
        onChange={handleCheckboxChange(v)}
        size="small"
        sx={{ alignSelf: "flex-start" }}
      />

      <Box sx={{ flex: 1 }}>
        <Accordion
          expanded={expanded === `panel_${i + 1}`}
          onChange={handleChange1(`panel_${i + 1}`, v.id)}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <ProdThumbImg sx={{ marginLeft: "2px" }}>
                <img src="/assets/image.jpg" />
              </ProdThumbImg>
              <AccordionHeader>
                <Typography variant="h6">{v.unique_number}</Typography>
                <Typography variant="body1">{v.product_name}</Typography>
              </AccordionHeader>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ProductLabel>
                {v?.product_type == "simple" ? "Simple" : "Configuration"}
              </ProductLabel>
              <SelectedConfig>
                {v?.product_type == "variation" && (
                  <>
                    Selected Configurations
                    <strong>
                      (
                      {relatedProductSpecifications[i]?.specifications
                        ?.length ?? 0}
                      )
                    </strong>
                  </>
                )}
              </SelectedConfig>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {v?.product_type != "simple" && (
              <>
                {relatedProductSpecifications
                  ?.find((item) => item.product_id == v.id)
                  ?.specifications?.map((val, Index) => (
                    <SelectOptions
                      otherValues={relatedProductSpecifications?.find(
                        (item) => item.product_id == v.id
                      )}
                      product_detail={v}
                      unique_session_id={unique_session_id}
                      v={val}
                      quotedetails={quotedetails}
                    />
                  ))}
              </>
            )}
            {v?.product_type == "simple" && (
              <OverviewContainer sx={{ paddingRight: "0 !important" }}>
                <Box sx={{ maxHeight: "200px", overflowY: "auto" }}>
                  <Grid container spacing={2}>
                    {loadingSpecs[v.id]
                      ? // Show skeletons while loading
                        [...Array(4)].map((_, index) => (
                          <Grid
                            item
                            xl={3}
                            lg={3}
                            md={3}
                            sm={4}
                            xs={12}
                            key={`skeleton_${index}`}
                          >
                            <Box borderLeft="1px solid #CBCBCB">
                              <FontContainer
                                sx={{
                                  borderLeft: "2px solid #D7282F",
                                  paddingLeft: "13px",
                                  paddingTop: "4px",
                                  color: "#231F20",
                                }}
                              >
                                <Skeleton
                                  animation="wave"
                                  variant="text"
                                  width={"15%"}
                                ></Skeleton>
                              </FontContainer>
                              <FontContainer
                                fontWeight={"500"}
                                sx={{
                                  paddingLeft: "13px",
                                  fontSize: "12px !important",
                                  fontWeight: "600",
                                  color: "#4b4b4b !important",
                                }}
                              >
                                <Skeleton
                                  animation="wave"
                                  variant="text"
                                  width={"12%"}
                                ></Skeleton>
                              </FontContainer>
                            </Box>
                          </Grid>
                        ))
                      : relatedProductSpecifications
                          ?.find((item) => item.product_id == v.id)
                          ?.specifications?.map((item, index) => (
                            <React.Fragment key={index}>
                              {item?.map((val, i) => (
                                <Grid
                                  item
                                  xl={3}
                                  lg={3}
                                  md={3}
                                  sm={4}
                                  xs={12}
                                  key={`${index}_${val.name}`}
                                >
                                  <Box borderLeft="1px solid #CBCBCB">
                                    <FontContainer
                                      sx={{
                                        borderLeft: "2px solid #D7282F",
                                        paddingLeft: "13px",
                                        paddingTop: "4px",
                                        color: "#231F20",
                                      }}
                                    >
                                      {val.name}
                                    </FontContainer>
                                    <FontContainer
                                      fontWeight={"500"}
                                      sx={{
                                        paddingLeft: "13px",
                                        fontSize: "12px !important",
                                        fontWeight: "600",
                                        color: "#4b4b4b !important",
                                      }}
                                    >
                                      {val.values}
                                    </FontContainer>
                                  </Box>
                                </Grid>
                              ))}
                            </React.Fragment>
                          ))}
                  </Grid>
                </Box>
                <QtyContainer>
                  <Box
                    sx={{
                      backgroundColor: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      position: "absolute",
                      top: "-16px",
                      right: "10px",
                      padding: "0 8px",
                    }}
                  >
                    {v?.price_type == "fixed" ? (
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "13px !important" }}
                      >
                        Unit Price: {v?.unit_price}
                      </Typography>
                    ) : (
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "13px !important" }}
                      >
                        Unit Price: {v?.price_range?.[0]}-{v?.price_range?.[1]}
                      </Typography>
                    )}
                    <UnitSelect quotedetails={v?.unit_price} />
                  </Box>
                </QtyContainer>
                <Box
                  className="quantityBox"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {v?.price_type !== "fixed" && (
                    <Typography sx={{ fontSize: "13px", color: "#231f20" }}>
                      {localStorage.getItem("userData") ? (
                        <>
                          {login.map(
                            (items, index) =>
                              items.value === Number(v?.hide_price_condition) &&
                              items.name
                          )}
                        </>
                      ) : (
                        <>
                          {hideOptions.map(
                            (items, index) =>
                              items.value === Number(v?.hide_price_condition) &&
                              items.name
                          )}
                        </>
                      )}
                    </Typography>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    QTY{" "}
                    <span>
                      <TextField
                        ref={inputRef}
                        value={inputRef?.current?.value}
                        // value={quantities}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          // setQuantities(newValue);
                          inputRef.current.value = newValue;
                          debouncedUpdateQuantity(newValue);
                        }}
                        placeholder="Enter quantity"
                        size="small"
                      />
                    </span>
                  </Box>
                  {v?.price_type === "fixed" && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Price{" "}
                      <Box
                        component={"span"}
                        sx={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#d7282f",
                        }}
                      >
                        {/* {calculatePrice(quantities)} */} {v?.symbol}
                        {pricingData ? pricingData?.price : v?.unit_price}
                      </Box>
                    </Box>
                  )}
                </Box>
              </OverviewContainer>
            )}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}

export default AccordianData;
