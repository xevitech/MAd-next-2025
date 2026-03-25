import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { DialogTitle, Divider, TextField, styled } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  PaymentCalc,
  QuantityCol,
  QtyField,
  EqualSign,
  PlanPrice,
  TotalPrice,
  BGColumn,
  TodayCharge,
  IcoBox,
  ChargeTxt,
  PlanDescription,
  PaymentMethod,
  ModalFooter,
} from "../styles";
import CardsInfo from "../Components/common/CardsInfo";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { apiClient } from "@/components/common/common";
import { ThreeDots } from "react-loader-spinner";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  p: 3,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function UpgradeModal({
  open,
  handleClose,
  detail,
  featureData,
  setFetchPlanDetail,
}) {
  const [quantity, setQuantity] = useState<any>("1");
  const [price, setPrice] = useState<any>("");
  const [payLoader, setPayLoader] = useState(false);
  const validation = Yup.object().shape({
    quantity: Yup.string().required("Enter quantity"),
  });

  let formik: any = useFormik({
    initialValues: {
      quantity: quantity,
    },
    enableReinitialize: true,
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setPayLoader(true);
      let response = await apiClient("users/current_plan_addon", "post", {
        body: {
          active_plan_id: detail?.user_access_id,
          addon_feature_id: featureData?.id,
          addon_feature_price:
            featureData?.value == "no"
              ? featureData?.price
              : featureData?.single_cost,
          addon_feature_quantity:
            featureData?.value == "no" ? "yes" : values?.quantity,
        },
      });

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "custom-btn cancel-button",
          cancelButton: "custom-btn remove-btn",
        },
        buttonsStyling: false,
      });
      if (response.status === 200) {
        setPayLoader(false);
        swalWithBootstrapButtons.fire({
          title: "Payment Successful",
          html: `Your payment has been processed successfully, Now you can use feature <b>${featureData?.name}</b>`,
          icon: "success",
          showCancelButton: false,
          reverseButtons: true,
        });
        setFetchPlanDetail();
        handleClose();
      } else {
        setPayLoader(false);
        swalWithBootstrapButtons.fire({
          title: "Payment Failed",
          text: `Your payment has been processed failed, Please try again`,
          icon: "error",
          showCancelButton: false,
          reverseButtons: true,
        });
        handleClose();
      }
    },
  });

  const onChangeHandler = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    if (input == "") {
      formik.setFieldError("quantity", "Enter quantity");
    } else {
      formik.setFieldError("quantity", "");
      formik.setFieldValue("quantity", "");
    }

    if (/^\d+$/.test(input) === false) {
      setQuantity(input);
      formik.setFieldValue("quantity", input);
      return;
    }
    if (input.length > 3) {
      setQuantity(input.substring(0, 4));
      formik.setFieldValue("quantity", input.substring(0, 4));
      return;
    }
    let quantityValue = e.target.value;
    const regex = /^[1-9]\d*$/;
    if (/^\d+$/.test(quantityValue) && parseInt(quantityValue) > 0) {
      if (quantityValue == 0) {
        setQuantity(quantityValue);
        formik.setFieldValue("quantity", input);
        setPrice(featureData?.single_cost * quantityValue);
      } else if (regex.test(quantityValue) || quantityValue === "") {
        setQuantity(quantityValue);
        formik.setFieldValue("quantity", input);
        setPrice(featureData?.single_cost * quantityValue);
      } else {
        setQuantity(quantityValue);
        formik.setFieldValue("quantity", input);
        setPrice(featureData?.single_cost * quantityValue);
      }
    }
  };

  useEffect(() => {
    setPrice(featureData?.single_cost * quantity);
  }, [quantity]);

  useEffect(() => {
    featureData?.value == "no" && setPrice(featureData?.price);
  }, []);
  return (
    <div>
      <Box sx={{}}>
        <DialogTitle
          sx={{}}
          id="customized-dialog-title"
          style={{ textAlign: "center", paddingTop: "0px" }}
        >
          <Box sx={{ position: "absolute", right: 20 }}>
            <CloseOutlinedIcon
              sx={{ cursor: "pointer" }}
              onClick={handleClose}
            />
          </Box>
          <Typography
            id="modal-modal-title"
            sx={{
              fontSize: "25px",
              fontWeight: "600",
              "@media screen and (max-width:480px)": { fontSize: "16px" },
            }}
          >
            Upgrade Plan
          </Typography>
          <Typography
            sx={{
              "@media screen and (max-width:480px)": {
                fontSize: "12px",
              },
            }}
          >
            You'd like to add to your subscription plan.
          </Typography>
        </DialogTitle>
        <Divider />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form onSubmit={formik.handleSubmit}>
            {featureData?.value != "no" && (
              <PaymentCalc>
                <Typography variant="h5" component="h5">
                  Payment Calculation:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <QuantityCol>
                    <Typography component={"label"}>Quantity:</Typography>
                    <QtyField>
                      <RemoveIcon
                        sx={{
                          color: "#D7282F",
                          background: "#FFEBEC",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "20px",
                          "@media screen and (max-width:480px)": {
                            fontSize: "18px",
                          },
                        }}
                        onClick={(e) => {
                          if (quantity > 1)
                            setQuantity((prev) => parseInt(prev) - 1);
                        }}
                      />
                      <div>
                        <TextField
                          sx={{ width: "90px" }}
                          variant="outlined"
                          size="small"
                          value={quantity}
                          onChange={(e) => onChangeHandler(e)}
                          helperText={
                            formik.errors.quantity ? formik.errors.quantity : ""
                          }
                          error={formik.errors.quantity ? true : false}
                        />
                      </div>

                      <AddIcon
                        sx={{
                          color: "#D7282F",
                          background: "#FFEBEC",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "20px",
                          "@media screen and (max-width:480px)": {
                            fontSize: "18px",
                            paddingLeft: "30px",
                          },
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuantity((prev) => parseInt(prev) + 1);
                        }}
                      />
                      <EqualSign>=</EqualSign>
                    </QtyField>
                  </QuantityCol>
                  <PlanPrice>
                    <Typography component={"label"}>Price:</Typography>
                    <TotalPrice>
                      <strong>${featureData?.single_cost}</strong>/quantity
                    </TotalPrice>
                  </PlanPrice>
                </Box>
              </PaymentCalc>
            )}

            <BGColumn>
              <Box display="flex" alignItems="center">
                <TodayCharge>
                  {/* <IcoBox>
                    <AttachMoneyIcon />
                  </IcoBox> */}
                </TodayCharge>
                <ChargeTxt>
                  <Typography component={"label"}>Total Charge</Typography>
                  <Typography variant="h3" component="h3">
                    ${price}
                  </Typography>
                </ChargeTxt>
              </Box>
              <PlanDescription>
                <Typography component={"span"}>
                  In the next billing period, your account will be charged the
                  full cost of your subscription.
                </Typography>
              </PlanDescription>

              <PaymentMethod>
                <Typography variant="h5" component="h5">
                  Payment Methods:
                </Typography>
                <Stack spacing={2}>
                  <Item style={{ textAlign: "left" }}>
                    <CardsInfo
                      logo={"https://www.svgrepo.com/show/333620/visa.svg"}
                    />
                    Use a different card
                  </Item>
                </Stack>
                <ModalFooter>
                  <Button
                    variant="contained"
                    size="medium"
                    color="error"
                    type="submit"
                  >
                    {payLoader ? (
                      <ThreeDots
                        height="18"
                        width="40"
                        radius="9"
                        color="white"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                      />
                    ) : (
                      "Pay Now"
                    )}
                  </Button>
                </ModalFooter>
              </PaymentMethod>
            </BGColumn>
          </form>
        </Typography>
      </Box>
    </div>
  );
}
