import React, { useState, useEffect, useContext } from "react";
import { Box, Button, FormControl, Stack, Typography } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import { EditableTextField } from "@/components/products/common/editableTextField";
import { styled } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import { makeStyles } from "tss-react/mui";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import { toast } from "react-toastify";
// import { ProductContext } from "contextApi/productContext";
import { useRouter } from "next/router";
import CustomAutocompelete from "@/components/products/common/autoCompelete";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { GetCurrentPlan } from "@/components/common/common";
import { useFormik } from "formik";
import * as Yup from "yup";
import PlanAlertDialog from "@/components/common/DeleteAlert/PlanAlert";
import { TButtonGroup } from "./styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Head from "next/head";
import Image from "next/image";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { useSelector } from "react-redux";
import { setAddListingLoader } from "@/hooks/appReducers";
import { useAppDispatch } from "redux/store";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { setProductDetail } from "@/hooks/ProductReducers";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    "@media screen and (max-width: 899px)": {
      height: "400px",
      overflow: "auto",
    },
    "@media only screen and (min-width: 280px) and (max-device-width: 950px) and (orientation: landscape)":
      {
        height: "200px",
        overflowY: "auto",
      },
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    width: 600,
    overflow: "hidden",
    "@media screen and (max-width: 600px)": {
      width: "100%",
      maxWidth: "100%",
      margin: "10px",
    },
  },
  "& .MuiDialogTitle-root": {
    padding: "10px 16px",
  },
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        //backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        background: "green",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 530,
  bgcolor: "background.paper",
  borderRadius: "6px",
  boxShadow: 24,
  p: 3,
  "@media screen and (max-width: 600px)": {
    width: "95%",
  },
};

export const EditProductSwitchSection = styled(Box)({
  // padding: "10px",
  // display: "flex",
  // alignItems: "center",

  "& .MuiTypography-root": {
    fontSize: "12px",
    color: "#5F5F5F",
  },
  "& .MuiStack-root": {
    margin: "0 auto",
  },
});

const useStyles: any = makeStyles()((theme) => {
  return {
    customTextField: {
      "& input::placeholder": {
        fontSize: "13px",
      },
    },
    customInputFieldsProduct: {
      "& input::placeholder": {
        fontSize: "13px",
        fontWeight: "bold",
      },
    },
    buttonGroup: {
      display: "flex",
      gap: "18px !important",
      marginTop: "16px !important",
      marginBottom: "16px",
    },

    customToggleButton: {
      border: "1.5px solid #231F20 !important",
      textTransform: "none",
      minWidth: "90px",
      maxHeight: "40px",
      borderRadius: "4px !important",
      fontWeight: "500 !important",
      fontSize: "12px !important",
      lineHeight: "24px !important",
      fontFamily: "open sans !important",
      letterSpacing: "0.09px",
      color: "black !important",
      paddingLeft: "6px !important",
      paddingRight: "6px !important",
      width: "50%",
      "@media (max-width: 480px)": {
        width: "100%",
        fontSize: "12px !important",
        margin: "0px 0 15px !important",
        paddingLeft: "35px !important",
      },
    },

    customToggleButtonSelected: {
      border: "1.5px solid #D7282F !important",
      textTransform: "none",
      minWidth: "90px",
      maxHeight: "40px",
      borderRadius: "4px !important",
      fontWeight: "500 !important",
      fontSize: "12px !important",
      lineHeight: "24px !important",
      fontFamily: "open sans !important",
      letterSpacing: "0.09px",
      backgroundColor: "#fff !important",
      color: "#D7282F !important",
      paddingLeft: "6px !important",
      paddingRight: "6px !important",
      width: "50%",
      "@media (max-width:480px)": {
        width: "100%",
        margin: "0px 0 15px !important",
        fontSize: "12px !important",
        paddingLeft: "35px !important",
      },
    },

    pricingTypeCustomToggleButton: {
      fontWeight: "400 !important",
      fontSize: "14px !important",
      lineHeight: "24px !important",
      letterSpacing: "0.09px !important",
      height: "28px !important",
      border: "1px solid #979797 !important",
      borderRadius: "4px !important",
      padding: "2px 12px !important",
      color: "#000000 !important",
    },

    pricingTypeCustomToggleButtonSelected: {
      height: "28px !important",
      background: "#34A853 !important",
      border: "1px solid #A4A4A4 !important",
      borderRadius: "4px !important",
      fontWeight: 600,
      fontSize: "14px !important",
      lineHeight: "24px !important",
      letterSpacing: "0.09px !important",
      color: "#FFFFFF !important",
      padding: "2px 12px !important",
    },

    modalform: {
      width: "95%",
      margin: "0 auto",
      "@media (max-width:600px)": {
        width: "100%",
      },
    },

    buttonbgselect: {
      background: "#F7D4D5",
      position: "absolute",
      left: 0,
      height: "100%",
      alignItems: "center",
      verticalAlign: "middle",
      display: "grid",
      borderRadius: "4px 0 0 4px",
      width: "38px",
    },

    buttonbgsimple: {
      background: "#D3D2D2",
      position: "absolute",
      left: 0,
      height: "100%",
      alignItems: "center",
      verticalAlign: "middle",
      display: "grid",
      borderRadius: "4px 0 0 4px",
      width: "38px",
    },

    buttonicon: {
      color: "#000",
      margin: "0 auto",
    },
    submitbtn: {
      color: "#fff",
      backgroundColor: "#black",
      border: "solid 4px #white",
      padding: "20px 30px",
      outline: 0,
      overflow: "hidden",
      display: "inlineBlock",
      position: "relative",
      boxShadow: "0 0 0 0 rgba($white, 0.5)",
      transition: "box-shadow 150ms ease-out",
    },
    customScrollClass: {
      "&::-webkit-scrollbar": {
        width: "5px",
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        borderRadius: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        borderRadius: "6px",
      },
    },
  };
});
const ButtonGroupHeader = styled("div")({
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "19px",
  display: "flex",
  alignItems: "center",
  color: "#231F20",
  paddingBottom: "5px",
  borderBottom: "1px solid rgba(34, 51, 84, 0.1)",
});

export const CreatePostModal = (props) => {
  const { classes } = useStyles();
  const router = useRouter();
  const [featured, setFeatured] = useState(0);
  const { addListingLoader } = useSelector((state: any) => state.userData);
  const dispatch = useAppDispatch();
  // const { setProductDetail } = useContext(ProductContext);
  const { open, closeModal } = props;
  const [loading, setLoading] = React.useState(false);
  const [planLoading, setPlanLoading] = React.useState(false);
  const [openModal, setOpen] = React.useState(false);
  const [currencies, setCurrencies] = useState([]);
  const { role } = useSelector((state: any) => state.userData);
  const [featureList, setFeatureList] = useState<any>([
    { id: 1, status: false },
    { id: 2, status: false },
  ]);
  const validation = Yup.object().shape({
    name: Yup.string()
      .max(180, "Product name must be of 180 characters")
      .required("Please enter product name"),
    currency: Yup.string().required("Please select currency"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    validateOnChange: false,
    initialValues: {
      name: router?.query?.name ?? "",
      currency: router?.query?.currency
        ? currencies.find((v) => v.value == router?.query?.currency)?.value
        : 1,
      availability: router?.query?.availability ?? "in_stock",
      // type: router?.query?.type ?? "simple",
      type: "simple",
    },
    onSubmit: (values) => {
      createQuickProduct(values);
    },
  });

  const createQuickProduct = async (values) => {
    const { type } = formik.values;
    if (type == "simple") {
      let status = featureList?.find((v) => v.id == 1)?.status ?? false;
      if (!status) {
        setOpen(true);
        return;
      } else {
        SubmitValues(values);
      }
    }
    if (type == "configured") {
      let status = featureList?.find((v) => v.id == 2)?.status ?? false;
      if (!status) {
        setOpen(true);
        return;
      } else {
        SubmitValues(values);
      }
    }
  };

  const SubmitValues = async ({
    name,
    type,
    availability,
    currency,
    is_placeholder = null,
  }: any) => {
    if (is_placeholder) setFeatured(+is_placeholder);
    const isPlaceholderEnabled = is_placeholder
      ? +is_placeholder === 1
        ? "yes"
        : "no"
      : featured === 1
      ? "yes"
      : "no";
    const formData = new FormData();
    formData.append("product_name", name);
    formData.append("product_type", type);
    formData.append("availability", availability);
    formData.append("currency_id", currency);
    localStorage.setItem("productCurrency", currency);
    formData.append("is_placeholder", isPlaceholderEnabled);
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/product/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });
      const storedSubSellerList = JSON.parse(
        localStorage.getItem("subSellerList")
      );
      const permissions =
        storedSubSellerList && storedSubSellerList.length > 0
          ? storedSubSellerList[0]
          : null;
      const data = await response.json();
      dispatch(setProductDetail({}));
      dispatch(setAddListingLoader(false));
      toast.success(data.message);
      setLoading(false);
      closeModal();
      let permission = permissions?.product?.edit == true;

      if (isPlaceholderEnabled === "yes") {
        router.push(`/products/placeholder/${data.data.id}`);
      } else {
        if (role == "subuser" && !permission) {
          router.push(`/products/List`);
        } else {
          router.push(`/products/edit/${data.data.id}`);
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleCurrencyChange = (e) => {
    formik.setFieldValue("currency", e?.target?.value ?? e);
  };

  const handleProductChange = (e, text) => {
    formik.setFieldValue("type", text);
    if (text !== "simple") formik.setFieldValue("availability", "by_order");
  };
  const handleProductAvailabilityChange = (e, text) => {
    formik.setFieldValue("availability", text);
  };

  const getCurrency = async () => {
    try {
      const response = await fetch(`${BASE_URL}/currency`);
      const data = await response.json();
      setCurrencies(
        data.data.map((element) => ({
          value: element?.id,
          view: element?.name + " (" + element?.symbol + ")",
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    formik?.setFieldValue("name", "");
    getCurrency();
    GetCurrentPlan(setFeatureList);
  }, []);

  useEffect(() => {
    if (router?.asPath !== "/products/List") {
      const values = {
        name: router?.query?.name,
        type: router?.query?.type,
        availability: router?.query?.availability,
        currency: router?.query?.currency,
        is_placeholder: router?.query?.is_placeholder,
      };
      addListingLoader && SubmitValues(values);
    }
  }, []);

  const onClickAction = () => {
    setPlanLoading(true);
    const { name, currency, availability, type } = formik.values;
    let { value } = currencies?.find((v) => v?.value == currency);
    localStorage.setItem("productCurrency", value);
    router.push(
      `/plancards?name=${name}&type=${type}&availability=${availability}&currency=${value}&is_placeholder=${featured}`
    );
  };
  const handleInput = (event) => {
    let value = event.target.value;
    
    if (value.length === 0) return; // Prevents issues when input is empty
    
    let formattedValue = value
      .split("")
      .map((char, index) => {
        if (index === 0) {
          return char.toUpperCase(); // First letter always uppercase
        }
        return char; // Rest remains as typed
      })
      .join("");
  
    event.target.value = formattedValue;
  };
  
  return (
    <>
      <Head>
        <title>Add New Product | Merchant AD</title>
      </Head>
      <PlanAlertDialog
        open={openModal}
        handleClose={handleClose}
        onClickAction={onClickAction}
        loading={planLoading}
        features={"Product Posts"}
        role={role}
      />
      <div>
        <BootstrapDialog
          onClose={closeModal}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Add Product
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={closeModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <form onSubmit={formik.handleSubmit} className={classes?.modalform}>
            <DialogContent dividers>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div>
                  <FormControl
                    sx={{
                      paddingTop: "30px",
                      paddingBottom: "30px",
                      width: "100%",
                      "@media screen and (max-width:600px)": {
                        paddingTop: "18px",
                        paddingBottom: "10px",
                      },
                    }}
                  >
                    <EditableTextField
                      name="name"
                      value={formik.values.name}
                      label="Product Name/Title"
                      required={true}
                      labelToolTipText="Use relevant keywords and highlight key features. Aim for clarity and avoid misleading titles."
                      placeholder="Enter Product name here"
                      error={formik.errors.name ? true : false}
                      helperText={formik.errors.name}
                      formik={formik}
                      createpost={1}
                      onInput={handleInput} 
                    />
                  </FormControl>
                </div>
                {/* <div>
                  <ButtonGroupHeader>Product Type </ButtonGroupHeader>
                  <TButtonGroup
                    color="primary"
                    exclusive
                    onChange={handleProductChange}
                    aria-label="Platform"
                  >
                    <ToggleButton
                      className={
                        formik.values.type == "simple"
                          ? classes?.customToggleButtonSelected
                          : classes?.customToggleButton
                      }
                      value="simple"
                    >
                      <span
                        className={
                          formik.values.type === "simple"
                            ? classes?.buttonbgselect
                            : classes?.buttonbgsimple
                        }
                      >
                        <img
                          src="/assets/createproduct/simpleproduct.svg"
                          className={classes?.buttonicon}
                          alt="simpleproduct"
                        />
                      </span>
                      Simple Product
                    </ToggleButton>

                    <ToggleButton
                      className={
                        formik.values.type == "configured"
                          ? classes?.customToggleButtonSelected
                          : classes?.customToggleButton
                      }
                      value="configured"
                    >
                      <span
                        className={
                          formik.values.type === "configured"
                            ? classes?.buttonbgselect
                            : classes?.buttonbgsimple
                        }
                      >
                        <img
                          alt="Vector"
                          src="/assets/createproduct/Vector.svg"
                          className={classes?.buttonicon}
                        />
                      </span>
                      Configure Product
                    </ToggleButton>
                  </TButtonGroup>
                </div> */}
                <div>
                  <ButtonGroupHeader>Product Availability </ButtonGroupHeader>

                  <TButtonGroup
                    color="primary"
                    exclusive
                    onChange={handleProductAvailabilityChange}
                    aria-label="Platform"
                  >
                    {formik.values.type == "simple" && (
                      <ToggleButton
                        className={
                          formik.values.availability == "in_stock"
                            ? classes?.customToggleButtonSelected
                            : classes?.customToggleButton
                        }
                        value="in_stock"
                      >
                        <span
                          className={
                            formik.values.availability === "in_stock"
                              ? classes?.buttonbgselect
                              : classes?.buttonbgsimple
                          }
                        >
                          <CheckCircleOutlineOutlinedIcon
                            className={classes?.buttonicon}
                          />
                        </span>
                        In Stock
                      </ToggleButton>
                    )}
                    <ToggleButton
                      className={
                        formik.values.availability == "by_order"
                          ? classes?.customToggleButtonSelected
                          : classes?.customToggleButton
                      }
                      value="by_order"
                    >
                      <span
                        className={
                          formik.values.availability === "by_order"
                            ? classes?.buttonbgselect
                            : classes?.buttonbgsimple
                        }
                      >
                        <img
                          src="/assets/createproduct/byorder.svg"
                          className={classes?.buttonicon}
                          alt="byorder"
                        />
                      </span>
                      By Order
                    </ToggleButton>
                  </TButtonGroup>
                </div>
                <FormControl
                  style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <CustomAutocompelete
                    name="currency"
                    placeholder="Currency"
                    formik={formik}
                    label="Choose Currency"
                    options={currencies}
                    value={formik.values.currency}
                    handleChange={handleCurrencyChange}
                    initialValue={currencies.find(
                      (v) => v.value == formik?.values?.currency
                    )}
                    required={true}
                  />
                </FormControl>
                {/* <EditProductSwitchSection>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LightTooltip
                      arrow
                      placement="top"
                      title="Placeholder products stand in for future offerings or customizable options. They act like teasers for exciting features to come, gauging customer interest and gathering early feedback.  For customizable products, they provide a starting point, highlighting the core functionalities while prompting users to contact sales for specific configurations and quotes.  Ultimately, these temporary products help bridge the gap between a static catalog and a dynamic B2B sales experience"
                      disableInteractive
                    >
                      <Box>
                        <AntSwitch
                          checked={featured == 1 ? true : false}
                          defaultChecked={featured == 1 ? true : false}
                          inputProps={{ "aria-label": "ant design" }}
                          onChange={(e) =>
                            setFeatured(e.target.checked ? 1 : 0)
                          }
                        />
                      </Box>
                    </LightTooltip>
                    <Typography>Placeholder Product</Typography>
                  </Stack>
                </EditProductSwitchSection> */}
              </div>
            </DialogContent>
            <DialogActions>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Button
                  className={classes?.submitbtn}
                  style={{
                    fontWeight: "600",
                    textTransform: "none",
                    height: "36px",
                    display: "inline-flex",
                    margin: "auto",
                    backgroundColor: "#d7282fcc",
                  }}
                  variant="contained"
                  type="submit"
                >
                  {loading ? (
                    <ThreeDots
                      height="40"
                      width="47"
                      radius="9"
                      color="white"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      visible={true}
                    />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </DialogActions>
          </form>
        </BootstrapDialog>
      </div>
    </>
  );
};
