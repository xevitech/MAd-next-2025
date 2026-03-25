import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as Yup from "yup";
import { useFormik } from "formik";
import CountrySelect from "@/components/common/countrydropdown/Index";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ProductModule from "./product.module.css";
import { BtnFilled } from "@/components/common/buttons/ButtonsVariations";
import { apiClient } from "@/components/common/common";
import { useRouter } from "next/router";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { setGetLatestPopup } from "@/hooks/UseProductListContext";
import { useAppDispatch } from "redux/store";
export default function RequestPrice({
  open = false,
  closeModal = null,
  id = null,
}) {
  const dispatch = useAppDispatch();
  const [mobile, setMobile] = useState<string>("+91");
  const [priceResponse, setPriceResponse] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [auth, setAuth] = useState<any>({ auth: false, user_id: "" });
  const { singleProductDetail }: any = useSelector(
    (state: any) => state.productList
  );
  const phoneRegExp: any = "^[0-9]+$";
  const { query } = useRouter();

  useEffect(() => {
    try {
      let { id } = JSON.parse(localStorage.userData);
      setAuth({ ...auth, auth: true, user_id: id });
    } catch (err) {
      setAuth({ ...auth, auth: false, user_id: "" });
    }
  }, []);

  const ValidateFields = () => {
    if (!auth.auth) {
      return {
        name: Yup.string().required("Please enter name"),
        email: Yup.string()
          .email("Invalid email")
          .required("Please enter email"),
        country: Yup.string().required("Please select country"),
        phone: Yup.string().required("Please enter mobile number"),
      };
    }
  };

  const validation = Yup.object().shape({
    quantity: Yup.string()
      .matches(phoneRegExp, "Please enter valid quantity")
      .required("Please enter quantity"),
    message: Yup.string().required("Please enter message"),
    ...ValidateFields(),
  });

  let formik = useFormik({
    initialValues: {
      quantity: "",
      message: "",
      name: "",
      email: "",
      country: "",
      phone: "",
    },
    validationSchema: validation,
    onSubmit: async (values: any) => {
      setLoading(true);
      const { quantity, message, name, email, country, phone } = values;
      const { user_id } = auth;
      let dataToSend;
      dataToSend = {
        quantity,
        message,
        user_id,
        product_id: singleProductDetail?.id || id || query?.id,
      };
      if (!auth.auth)
        dataToSend = {
          ...dataToSend,
          name,
          business_email: email,
          country,
          phone,
        };

      let response = await apiClient("front/latestprice/submit", "post", {
        body: {
          dataToSend,
        },
      });
      if (response.status === 200) {
        setPriceResponse(true);
      }
      setLoading(false);
    },
  });

  const ValidateField = (field) => {
    if (formik.errors[field] && formik.touched[field]) return true;
    else return false;
  };

  const handleClose = () => {
    dispatch(setGetLatestPopup(false));
  };
  const { getLatestPopup }: any = useSelector(
    (state: any) => state.productList
  );

  const setMobileNumber = (value, info) => {
    setMobile(value);
    formik.setFieldValue("mobile_code", info.countryCallingCode);
    formik.setFieldValue("phone", info.nationalNumber);
  };

  return (
    <div>
      <Dialog
        open={open || getLatestPopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className={ProductModule.popupHeading}
        >
          Enter your detailed requirements to receive an accurate quote
          <CloseOutlinedIcon
            style={{ cursor: "pointer" }}
            className={ProductModule.popupcross}
            onClick={() => (open ? closeModal(false) : handleClose())}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {priceResponse ? (
              <Grid container spacing={2} mt={1}>
                <div className={ProductModule.successMessage}>
                  <h3 style={{ color: "#5cbb5c", margin: "7px 0px 9px 0px" }}>
                    {" "}
                    <CheckCircleIcon />
                    Sent Successfully!
                  </h3>
                  <p>
                    Notification of supplier&apos;s reply will be sent to{" "}
                    {formik.values.email}.
                  </p>
                </div>
              </Grid>
            ) : (
              <form
                onSubmit={formik.handleSubmit}
                className={ProductModule.priceForm}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <TextField
                      id="outlined-basic"
                      label="Quantity"
                      variant="outlined"
                      fullWidth
                      {...formik.getFieldProps("quantity")}
                      error={ValidateField("quantity")}
                      helperText={`${formik.errors.quantity}`}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      placeholder="Your Message"
                      id="outlined-basic"
                      label="Message"
                      variant="outlined"
                      multiline
                      minRows={2}
                      maxRows={4}
                      fullWidth
                      {...formik.getFieldProps("message")}
                      error={ValidateField("message")}
                      helperText={`${formik.errors.message}`}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    {!auth.auth && (
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                          <TextField
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            {...formik.getFieldProps("name")}
                            error={ValidateField("name")}
                            helperText={`${formik.errors.name}`}
                            className={ProductModule.nameEmail}
                            size="small"
                          />
                        </Grid>

                        <Grid item xs={6} md={6}>
                          <TextField
                            id="outlined-basic"
                            label="Business Email"
                            variant="outlined"
                            {...formik.getFieldProps("email")}
                            error={ValidateField("email")}
                            helperText={`${formik.errors.email}`}
                            className={ProductModule.nameEmail}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <CountrySelect
                            country={formik.values.country}
                            setCountry={(values) =>
                              formik.setFieldValue("country", values)
                            }
                            errorText={"Please Select country"}
                            label="Select Country"
                            error={formik.errors.country ? true : false}
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <center>
                      <BtnFilled
                        variant="contained"
                        type="submit"
                        style={{ width: "50%" }}
                      >
                        {loading ? (
                          <ThreeDots
                            height="40"
                            width="40"
                            radius="9"
                            color="white"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            visible={true}
                          />
                        ) : (
                          "Submit"
                        )}
                      </BtnFilled>
                    </center>
                  </Grid>
                </Grid>
              </form>
            )}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
