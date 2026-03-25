import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { PaymentMethodEditPage, PaymentMethodInnerInfo } from "./styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ButtonCol } from "../productCategories/styles";
import { apiClient, getProductId } from "@/components/common/common";
import { ThreeDots } from "react-loader-spinner";

function PaymentMethods(props) {
  const {
    percentage,
    productDetail,
    formik,
    setTabValue,
    setPublished,
    setErrorEmpty,
    FetchProductDetail,
    setCompletedFields,
  } = props;
  const product_type = productDetail?.product_type;
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isMount, setIsMount] = useState<boolean>(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<any>(
    formik.values.payment_methods.length > 0
      ? formik.values.payment_methods.split(",")
      : []
  );
  const [isPaymentMethodFromCompany, setIsPaymentMethodFromCompany] =
    useState(false);

  useEffect(() => {
    setIsPaymentMethodFromCompany(productDetail?.is_payment_methods);
  }, [productDetail?.is_payment_methods]);

  const paymentMethods = [
    {
      name: "CBS (Cash before Shipment)",
      tooltip:
        "Guarantees payment for the seller before shipment, eliminating risk but potentially discouraging buyers due to the upfront requirement",
    },
    {
      name: "Advanced Payment",
      tooltip:
        "Encourages buyer commitment and accelerates cash flow for the seller by receiving a portion of the payment upfront but requires trust from the buyer.",
    },
    {
      name: "ACH Transfer",
      tooltip:
        "Transfers funds electronically within the same country, offering a cost-effective alternative to wire transfers but with slightly longer processing times",
    },
    {
      name: "Credit Card",
      tooltip:
        "Offers convenience and wide acceptance for buyers, but sellers incur processing fees.",
    },
    {
      name: "Debit Card",
      tooltip:
        "Similar to credit cards but deducts funds directly from the buyer's bank account, offering convenience and security",
    },
    {
      name: "Online Payment Platforms (e.g. PayPal)",
      tooltip:
        "Provides a secure and user-friendly platform for online payments, but fees may be associated with transactions.",
    },
    {
      name: "Cash",
      tooltip:
        "Traditional payment method accepted by most businesses but carries the risk of theft or loss.",
    },
    { name: "Escrow", tooltip: "" },
    {
      name: "D/P (Documents against Payment)",
      tooltip:
        "Provides some security for the seller while allowing buyers to inspect goods before payment.",
    },
    {
      name: "D/A (Documents against Acceptance)",
      tooltip: "Offers extended credit terms to the buyer compared to D/P.",
    },
    {
      name: "TT (Telegraphic Transfer)",
      tooltip:
        "Fast, secure, and widely accepted globally. Transparent fees and tracking of funds",
    },
    {
      name: "LC (Letter of Credit)",
      tooltip:
        "Guarantees payment to the seller through a bank upon fulfilling specific conditions outlined in the LC document, offering high security but requiring complex setup and incurring bank fees.",
    },
  ];

  const LCOptions = [
    "Revocable LC",
    "Irrevocable LC",
    "Documentary LC",
    "Standby LC",
    "Confirmed LC",
    "Unconfirmed LC",
    "Transferable LC",
    "Non-transferable LC",
  ];

  useEffect(() => {
    if (
      !isMount &&
      paymentMethod.length == 0 &&
      productDetail?.payment_methods
    ) {
      // setPaymentMethod(productDetail?.payment_methods?.split(","));
      if (
        productDetail?.payment_methods
          ?.split(",")
          ?.includes("LC (Letter of Credit)")
      ) {
        setIsChecked(true);
      }
      setIsMount(true);
    }
  }, [paymentMethod, isMount, productDetail]);

  useEffect(() => {
    if (paymentMethod.length > 0) {
      formik.setFieldError("payment_methods", "");
    }
    formik.setFieldValue("payment_methods", paymentMethod.join(","));
  }, [paymentMethod]);

  useEffect(() => {
    if (paymentMethod.length == 0) {
      setCompletedFields((prev) => ({ ...prev, commercial: false }));
    } else if (paymentMethod.length > 0) {
      setCompletedFields((prev) => ({ ...prev, commercial: true }));
    }
  }, [paymentMethod]);

  useEffect(() => {
    if (productDetail?.payment_methods?.length > 0) {
      if (
        productDetail?.payment_methods
          ?.split(",")
          ?.includes("LC (Letter of Credit)")
      ) {
        setIsChecked(true);
        return;
      }
    }
    setIsChecked(false);
  }, []);

  //fetching the productID from common function.
  const productId = getProductId();

  //extracting the value from formik

  //function to check the validation for payment methods
  const paymentMethodLength = (paymentMethods) => {
    let length = 0;
    paymentMethods?.split(",").forEach((element) => {
      if (!LCOptions?.includes(element)) {
        length++;
      }
    });
    return length;
  };

  const validatePaymentMethod = (paymentMethods) => {
    if (!paymentMethods || paymentMethods.trim() === "") {
      return "Please select a payment method";
    }

    const payemntCount = paymentMethodLength(paymentMethods);

    const LOCSelected = paymentMethod.filter((item) => {
      const isNotIncluded = LCOptions.includes(item);
      return isNotIncluded;
    });

    if (isChecked && LOCSelected.length == 0) {
      return "Please select at least 1 LC (Letter of Credit) type";
    }

    if (paymentMethods) {
      if (payemntCount > 6) {
        return "You can only select 6 payment methods";
      }
    }

    if (payemntCount < 1) {
      return "Please select at least 1 payment method";
    }

    return null; // No errors, validation passed
  };

  let percentageValueCal: number = percentage
    .map((v) => v.value)
    .reduce((a, b) => a + b);

  const percentageValue: any = Math.round(percentageValueCal);

  //hitting the api for this tab
  const updatePaymentMethodData = async () => {
    //check for validation: if the payment is less than 6 selected by user.
    //calling function to check the validation for paymentMethods
    setButtonLoader(false);
    const { payment_methods } = formik.values;

    const errorMessage = validatePaymentMethod(payment_methods);
    if (validatePaymentMethod(payment_methods)) {
      formik.setFieldError("payment_methods", errorMessage);
      //returning true for checking if there are any error while hitting the API.
      return true;
    }
    //setting fromik error for payment empty.
    formik.setFieldError("payment_methods", "");

    //add to formData
    setPublished("");
    const formData = new FormData();
    formData.append("payment_methods", payment_methods.replace(/^,+/, ""));
    formData.append("id", productId || "");
    formData.append("published", "0");
    formData.append("percentage", percentageValue);

    //hit API for this api client with formdata
    setButtonLoader(true);
    await apiClient(
      "product/view/single/update",
      "post",
      { body: formData },
      true
    );
    setButtonLoader(false);
    await FetchProductDetail();
    //return null for successful API excution.
    return null;
  };
  const handleNextTabChange = async () => {
    //hittin for API through this function and checking if the response is correct.
    //if response is true then it returns becuase there are errors in for payment method.
    if (await updatePaymentMethodData()) {
      return;
    }
    setErrorEmpty(["payment_methods"], true);
    //changing the tab after the completion of the API hitting.
    if (product_type === "simple") {
      setTabValue("2");
    } else {
      setTabValue("3");
    }
  };

  return (
    <>
      <Box
        sx={{
          padding: "16px",
          border: "1px solid rgb(221, 221, 221)",
          margin: "0px 0px 0px 0px",
          borderRadius: "6px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "#fff",
            margin: "0px 12px",
            top: "-12px",
            padding: "0px 6px",
          }}
        >
          <Typography
            sx={{ fontSize: "14px", fontWeight: "600", color: "#000" }}
          >
            Payment Methods{" "}
            <LightTooltip
              title="Required"
              arrow
              placement="top"
              disableInteractive
            >
              <span style={{ color: "rgb(215, 40, 47)", paddingRight: "5px" }}>
                *
              </span>
            </LightTooltip>
          </Typography>
        </Box>
        <PaymentMethodEditPage sx={{ margin: "0px 0 0 0" }}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <PaymentMethodInnerInfo display="flex" alignItems="center">
                <LightTooltip
                  disableInteractive
                  placement="top-start"
                  arrow
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -14],
                          },
                        },
                      ],
                    },
                  }}
                  title="Most recommended method, Merchant AD safeguards the payment until the buyer verifies the
                      receipt of goods or documents, establishing a secure and transparent transaction for both parties"
                >
                  <FormControlLabel
                    className="profile_business"
                    style={{
                      color: "#231F20",
                      fontSize: "14px",
                      lineHeight: "23px",
                      marginLeft: 0,
                      marginRight: "5px",
                    }}
                    control={
                      <Checkbox
                        style={{
                          paddingRight: 4,
                          paddingLeft: 0,
                        }}
                        sx={{
                          "&.Mui-checked": {
                            color: "#d7282f",
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: "19px",
                          },
                        }}
                        checked={paymentMethod.includes(
                          "Payment through Merchant AD"
                        )}
                        onChange={(e) => {
                          setIsPaymentMethodFromCompany(false);
                          if (e.target.checked) {
                            setPaymentMethod((prev) => [
                              ...prev,

                              "Payment through Merchant AD",
                            ]);
                          } else {
                            let list = paymentMethod.filter(
                              (v) => v != "Payment through Merchant AD"
                            );
                            setPaymentMethod(list);
                          }
                        }}
                      />
                    }
                    label={
                      <Typography
                        sx={{
                          fontSize: "13px",
                          color: "#231f20",
                          fontWeight: "400",
                          "@media screen and (max-width:480px)": {
                            fontSize: "12px",
                          },
                        }}
                      >
                        Payment through Merchant AD
                      </Typography>
                    }
                  />
                </LightTooltip>
              </PaymentMethodInnerInfo>
            </Grid>
            {paymentMethods.map((v, i) => (
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <Box>
                  <Box display="flex" alignItems="center">
                    <LightTooltip
                      arrow
                      placement="top-start"
                      title={v.tooltip}
                      disableInteractive
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -14],
                              },
                            },
                          ],
                        },
                      }}
                    >
                      <FormControlLabel
                        className="profile_business"
                        style={{
                          color: "#231F20",
                          fontSize: "14px",
                          lineHeight: "23px",
                          marginLeft: 0,
                          marginRight: "5px",
                        }}
                        control={
                          <Checkbox
                            style={{
                              paddingRight: 4,
                              paddingLeft: 0,
                            }}
                            sx={{
                              "&.Mui-checked": {
                                color: "#d7282f",
                              },
                              "& .MuiSvgIcon-root": {
                                fontSize: "19px",
                              },
                            }}
                            checked={paymentMethod.includes(v.name)}
                            onChange={(e) => {
                              setIsPaymentMethodFromCompany(false);
                              if (v.name == "LC (Letter of Credit)") {
                                setIsChecked(e.target.checked);
                              }
                              let updatedPaymentMethod = [...paymentMethod];
                              if (
                                v.name == "LC (Letter of Credit)" &&
                                !e.target.checked
                              ) {
                                updatedPaymentMethod = paymentMethod.filter(
                                  (item) => {
                                    const isNotIncluded =
                                      !LCOptions.includes(item);
                                    return isNotIncluded;
                                  }
                                );
                                setPaymentMethod(updatedPaymentMethod);
                              }
                              if (e.target.checked) {
                                setPaymentMethod((prev) => [...prev, v.name]);
                              } else {
                                let list = updatedPaymentMethod.filter(
                                  (i) => i != v.name
                                );
                                setPaymentMethod(list);
                              }
                            }}
                          />
                        }
                        label={
                          <Typography
                            sx={{
                              fontSize: "13px",
                              color: "#231f20",
                              fontWeight: "400",
                              "@media screen and (max-width:600px)": {
                                fontSize: "12px",
                              },
                              "@media screen and (max-width:320px)": {
                                fontSize: "11px",
                              },
                            }}
                          >
                            {v.name}
                          </Typography>
                        }
                      />
                    </LightTooltip>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </PaymentMethodEditPage>
        {isChecked && paymentMethod.includes("LC (Letter of Credit)") && (
          <Box sx={{ padding: "0px !important", margin: "12px 0 0 0 " }}>
            <Box
              sx={{
                width: "100%",
                height: "1px",
                backgroundColor: "rgb(221, 221, 221)",
                position: "relative",
                margin: "12px 0px",
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  top: "-11px",
                  position: "absolute",
                  left: "30px",
                  background: "#fff",
                  padding: "0px 8px",
                }}
              >
                <Typography
                  sx={{ color: "#000", fontSize: "14px", fontWeight: "500" }}
                >
                  LC Types
                </Typography>
              </Box>
            </Box>
            <Grid container spacing={2} rowSpacing={-1}>
              {paymentMethod.includes("LC (Letter of Credit)") &&
                LCOptions.map((value) => {
                  return (
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                      <FormControlLabel
                        key={value}
                        control={
                          <Checkbox
                            checked={paymentMethod.includes(value)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPaymentMethod((prev) => [...prev, value]);
                              } else {
                                let list = paymentMethod.filter(
                                  (i) => i != value
                                );
                                setPaymentMethod(list);
                              }
                            }}
                            sx={{
                              "&.Mui-checked": {
                                color: "#d7282f",
                              },
                              "& .MuiSvgIcon-root": {
                                fontSize: "19px",
                              },
                            }}
                          />
                        }
                        label={
                          <Typography
                            sx={{
                              fontSize: "13px",
                              color: "#231f20",
                              "@media screen and (max-width:480px)": {
                                fontSize: "12px",
                              },
                            }}
                          >
                            {value}
                          </Typography>
                        }
                      />
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
        )}
        {formik?.errors?.payment_methods && (
          <Typography
            sx={{ fontSize: "12px", color: "#d7282f", fontWeight: 400 }}
          >
            <span>
              <img
                src="/assets/error-outline-red.svg"
                alt=""
                style={{ width: "10px", height: "10px", marginRight: "4px" }}
              />
            </span>
            {formik.errors.payment_methods}
          </Typography>
        )}
      </Box>
      {isPaymentMethodFromCompany && (
        <Box>
          <Typography
            sx={{
              fontSize: "11px",
              fontWeight: "600",
              color: "#4a4a4a",
              opacity: ".8",
            }}
          >
            Default selected payment methods are fetched from the company
            details form. You may edit them according to this product's
            requirements.
          </Typography>
        </Box>
      )}
      <ButtonCol>
        <Button
          color="error"
          variant="outlined"
          size="small"
          style={{
            textTransform: "none",
            minWidth: "90px",
            height: "30.75px",
          }}
          type="submit"
          onClick={handleNextTabChange}
        >
          {buttonLoader ? (
            <ThreeDots
              height="14"
              width="107"
              radius="5"
              color="#d32f2f"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              visible={true}
            />
          ) : (
            "Next"
          )}
          <ArrowForwardIosIcon
            style={{ fontSize: "15px", marginLeft: "4px" }}
          ></ArrowForwardIosIcon>
        </Button>
      </ButtonCol>
    </>
  );
}

export default PaymentMethods;
