import React, { useContext, useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import {
  EditTextContainer,
  FactoryLoacationLabelContainer,
  FactorySmallTextContainer,
  HeaderContainer,
  HeaderTextContainer,
  OuterContainer,
} from "../commonStyles";
import * as Yup from "yup";
import { MyAppContext } from "@/contextApi/appContext";
import { FormikErrorStyle, GridRightData, RNDGrid } from "../style";
import Checkbox from "@mui/material/Checkbox";
import {
  AcceptedCurrency,
  LCOptions,
  PaymentTooltips,
  apiClient,
  paymentMethods,
} from "@/components/common/common";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import ExportSkeleton from "../CompanySkeletons/ExportSkeleton";
import { toast } from "react-toastify";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { CancelLink, SaveLink } from "../ContactPersonDetail/style";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { TerritoryList } from "@/utils/countriesphp";
import { getCompanyProfile } from "@/hooks/company";
import { ThreeDots } from "react-loader-spinner";
import CustomerCaseForm from "./CustomerCaseForm";
import { DataGridStyle } from "@/components/common/commonStyle";

export default function ExportCapabilities() {
  const [territoryList, setTerritoryList] = useState<any>([]);
  const [paymentTermsList, setPaymentTermsList] = useState<any>([]);
  const [currencyList, setCurrencyList] = useState<any>([]);
  const [customerList, setCustomerList] = useState<any>(null);
  const [isChecked, setChecked] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [loader, setLoader] = useState(false);
  const [addMore, setAddMore] = useState("");
  const [deleteInfo, setDeleteInfo] = useState({ index: "", deleteID: "" });
  const [editIndex, setEditIndex] = useState(-1);
  const { breakPoints } = useContext(MyAppContext);
  const [skeletonLoader, setSkeletonLoader] = useState<boolean>(true);
  const [scrollHide, setScrollHide] = useState<any>(false);
  const [searchService, setSearchService] = useState<any>("");
  const [cloneServiceList, setCloneServiceList] = useState<any>([]);
  const [deleteID, setDeleteID] = useState<any>([]);
  let exportData = useSelector(
    (state: any) => state?.companyProfile?.companyDetails?.export
  );
  const [edit, setEdit] = useState<boolean>(false);
  const [LCValues, setLCValues] = useState<any>([]);
  const [locList, setLocList] = useState<any>([]);
  const [filterData, setfilterData] = useState(false);
  const lcNames = LCOptions.map((option) => option.name);
  useEffect(() => {
    setSkeletonLoader(true);
    FetchCustomerList();
    FetchTerritory();
    FetchPaymentTerms();
    FetchCurrency();
  }, []);

  useEffect(() => {
    if (
      exportData?.payment_methods?.split(",")?.includes("LC (Letter of Credit)")
    ) {
      setChecked(true);
      const paymentMethodData = exportData?.payment_methods?.split(",");
      const match = [];
      paymentMethodData?.forEach((method) => {
        const value = LCOptions?.find((option) => option?.name === method);
        if (value) {
          match?.push(value["name"]);
        }
      });
      setLCValues(match);
    }
  }, [exportData]);

  const FetchCustomerList = async () => {
    let response = await apiClient("export_traders/list", "get");
    setCustomerList(response.data);
    setCloneServiceList(response?.data);
    setSkeletonLoader(false);
  };

  const FetchTerritory = () => {
    setTerritoryList(TerritoryList.map((v) => ({ ...v, id: `${v.id}t` })));
  };

  const FetchCurrency = async () => {
    let response = await apiClient("currency", "get");
    setCurrencyList(
      response.data.map((v) => ({
        id: v.id,
        value: v.code,
        view: v.name,
      }))
    );
  };

  const FetchPaymentTerms = async () => {
    let response = await apiClient("price_terms", "get");
    const Payments = response?.data?.map((term) => {
      return {
        ...term,
        tooltip: PaymentTooltips[term.id] || "",
      };
    });
    setPaymentTermsList(Payments);
  };

  const validation: any = Yup.object().shape({
    export_market: Yup.array()
      .min(1, "Please select at least one export market")
      .required("Please select at least one export market")
      .nullable(),
    payment_terms: Yup.array().min(
      1,
      "Please select at least one accepted delivery term"
    ),
    payment_methods: Yup.array().min(
      1,
      "Please select at least one payment methods"
    ),
    accepted_currency: Yup.array()
      .min(1, "Please select at least one accepted currency")
      .required("Please select at least one accepted currency"),
  });
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    validateOnChange: false,
    initialValues: {
      export_market: exportData?.export_market?.split(",") ?? [],
      payment_terms: exportData?.payment_terms?.split(",") ?? [],
      payment_methods:
        exportData?.payment_methods
          ?.split(",")
          ?.filter((value) => !lcNames.includes(value)) ?? [],
      accepted_currency: exportData?.accepted_currency?.split(",") ?? [],
      supplied_product: exportData?.supplied_product ?? "",
    },
    onSubmit: async (value: any) => {
      if (LCValues?.length == 0 && isChecked) {
        formik.setFieldError(
          "payment_methods",
          "Please select atleast one LC Type"
        );
        return;
      }
      if (value.payment_methods?.length > 6) {
        formik.setFieldError(
          "payment_methods",
          "Please select maximum 6 payment methods"
        );
        return;
      }
      setLoader(true);
      const payments =
        locList?.length > 0
          ? value.payment_methods.concat(locList)
          : value.payment_methods;
      let DataToSend = new FormData();
      DataToSend.append("export_market", value.export_market.join(","));
      DataToSend.append("payment_terms", value.payment_terms.join(","));
      DataToSend.append("payment_methods", payments.join(","));
      DataToSend.append("accepted_currency", value.accepted_currency.join(","));

      let response = await apiClient(
        "company_profile/updateProfile",
        "post",
        { body: DataToSend },
        true
      );
      if (response.status == 200) {
        toast.success("Form submitted successfully");
        setLoader(false);
        setEdit(false);
        dispatch(getCompanyProfile());
      }
    },
  });
  useEffect(() => {
    if (
      exportData?.payment_methods?.split(",")?.includes("LC (Letter of Credit)")
    ) {
      const loc = exportData?.payment_methods?.split(",");
      const locData = LCOptions?.filter((element) =>
        loc?.includes(element?.name)
      );
      setLocList(locData?.map((item) => item.name));
      setChecked(true);
    } else {
      setChecked(false);
      setLocList([]);
    }
  }, [exportData]);

  useEffect(() => {
    if (!isChecked) {
      const updatedPayementMethods = payment_methods?.filter(
        (value) => !LCValues?.includes(value)
      );
      setLCValues([]);
      formik.setFieldValue("payment_methods", updatedPayementMethods);
    }
  }, [isChecked]);

  const { export_market, payment_terms, payment_methods, accepted_currency } =
    formik.values;

  const DeleteCustomer = async () => {
    const { deleteID, index } = deleteInfo;
    await apiClient("export_traders/delete", "post", {
      body: { id: deleteID },
    });
    setDeleteInfo({ index: "", deleteID: "" });
    setDeleteConfirmation(false);
    setCustomerList((prev) => {
      let list = [...prev];
      list.splice(+index, 1);
      return list;
    });
  };
  const FilterTable = (e) => {
    if (e.target.value.trim() !== "") {
      setSearchService(e.target.value);
      setCustomerList(cloneServiceList);
      let results = cloneServiceList.filter((val) => {
        return val.customer_name
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      if (results.length == 0) {
        setfilterData(true);
      } else {
        setfilterData(false);
        setCustomerList(results);
      }
      return;
    } else {
      setSearchService("");
      setfilterData(false);
      setCustomerList(cloneServiceList);
    }
  };
  const handleScroll = (value) => {
    setScrollHide(value);
    if (value) {
      document.body.style.overflowY = "hidden";
      document.body.style.marginRight = "17px";
    } else {
      document.body.style.overflowY = "auto";
      document.body.style.marginRight = "auto";
    }
  };
  const exportMarketRef = useRef(null);
  const shippingIncotermRef = useRef(null);
  const acceptedCurrencyRef = useRef(null);
  const paymentMethodsRef = useRef(null);
  const LCtypesRef = useRef(null);

  const handleSave = () => {
    formik.handleSubmit();

    if (!formik.values.export_market || formik.errors.export_market) {
      exportMarketRef.current?.focus();
      return;
    }
    if (!formik.values.payment_terms || formik.errors.payment_terms) {
      shippingIncotermRef?.current?.focus();
      return;
    }
    if (!formik.values.accepted_currency || formik.errors.accepted_currency) {
      acceptedCurrencyRef?.current?.focus();
      return;
    }
    if (!formik.values.payment_methods || formik.errors.payment_methods) {
      paymentMethodsRef?.current?.focus();
      return;
    }
    if (!LCValues || formik.errors.payment_methods) {
      LCtypesRef?.current?.focus();
      return;
    }
  };
  return (
    <>
      {deleteConfirmation && (
        <DeleteDialog
          open={deleteConfirmation}
          handleClose={setDeleteConfirmation}
          text="customer case"
          onClickAction={DeleteCustomer}
        />
      )}

      <OuterContainer value={"20px"}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <HeaderContainer breakPoints={breakPoints}>
              <Box>
                <HeaderTextContainer breakPoints={breakPoints}>
                  Export Capabilities
                </HeaderTextContainer>
                <FactorySmallTextContainer>
                  Manage Information related to Export Capabilities
                </FactorySmallTextContainer>
              </Box>
            </HeaderContainer>
            {edit ? (
              <Box>
                <Box>
                  {edit && (
                    <>
                      <Box
                        style={{
                          position: "absolute",
                          top: "16px",
                          right: "16px",
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <CancelLink
                          onClick={() => {
                            setEdit(false);
                            formik.resetForm();
                          }}
                        >
                          <CloseIcon sx={{ color: "#d7282f" }} />
                          <Box
                            sx={{
                              fontSize: "14px",
                              color: "#d7282f",
                              fontWeight: "500",
                              "@media screen and (max-width:320px)": {
                                display: "none",
                              },
                            }}
                          >
                            Cancel
                          </Box>
                        </CancelLink>
                        <SaveLink>
                          {loader ? (
                            <ThreeDots
                              height="30"
                              width="60"
                              radius="5"
                              color="#d32f2f"
                              ariaLabel="three-dots-loading"
                              wrapperStyle={{}}
                              visible={true}
                            />
                          ) : (
                            <Button
                              disabled={loader}
                              onClick={handleSave}
                              sx={{ padding: "0px", minWidth: "auto" }}
                            >
                              <SaveOutlinedIcon sx={{ marginLeft: "10px" }} />
                              <Box
                                sx={{
                                  "@media screen and (max-width:320px)": {
                                    display: "none",
                                  },
                                }}
                              >
                                Save
                              </Box>
                            </Button>
                          )}
                        </SaveLink>
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
            ) : (
              <EditTextContainer
                onClick={() => {
                  setEdit(true);
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "5px",
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    "@media screen and (max-width:600px)": { top: "0px" },
                  }}
                >
                  <LightTooltip
                    title="Edit"
                    arrow
                    placement="top"
                    disableInteractive
                  >
                    <img
                      style={{ width: "12px" }}
                      src={"/assets/EditPencil.svg"}
                      alt="editImage"
                    />
                  </LightTooltip>
                  Edit
                </Box>
              </EditTextContainer>
            )}
            <Divider variant="middle" style={{ margin: 0 }} />
            {skeletonLoader && <ExportSkeleton />}
            {!skeletonLoader && !edit && (
              <Grid container spacing={2}>
                <RNDGrid item xs={12}>
                  <Grid container spacing={1} alignItems={"flex-start"}>
                    <Grid item xs={12} md={3} sm={12}>
                      <FactoryLoacationLabelContainer
                        className="rndlableclass"
                        breakPoints={breakPoints}
                        value={{}}
                      >
                        Export Market
                      </FactoryLoacationLabelContainer>
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <GridRightData>
                        <Grid
                          container
                          spacing={1}
                          rowSpacing={-1}
                          sx={{
                            "@media screen and (max-width:900px)": {
                              marginTop: "-16px",
                            },
                          }}
                        >
                          {territoryList?.map((value) => (
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={5}
                              lg={4}
                              key={`${value.name}-${value.id}`}
                            >
                              <Box>
                                <Box
                                  component="div"
                                  display="flex"
                                  alignItems="center"
                                >
                                  <FormControlLabel
                                    disabled
                                    className="profile_business"
                                    sx={{
                                      color: "#231F20",
                                      fontSize: "14px",
                                      lineHeight: "23px",
                                      marginLeft: 0,
                                      marginRight: "5px",
                                    }}
                                    control={
                                      <Checkbox
                                        checked={formik?.values?.export_market?.includes(
                                          value.id
                                        )}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            formik.setFieldValue(
                                              "export_market",
                                              [
                                                ...formik.values.export_market,
                                                value.id,
                                              ]
                                            );
                                          } else {
                                            formik.setFieldValue(
                                              "export_market",
                                              formik.values.export_market.filter(
                                                (v) => v !== value.id
                                              )
                                            );
                                          }
                                          formik.setFieldError(
                                            "export_market",
                                            ""
                                          );
                                        }}
                                        style={{
                                          paddingRight: 4,
                                          paddingLeft: 0,
                                        }}
                                        sx={{
                                          "&.Mui-checked": {},
                                          "& .MuiSvgIcon-root": {
                                            fontSize: "19px",
                                          },
                                        }}
                                      />
                                    }
                                    label={
                                      <Typography
                                        sx={{
                                          fontSize: "14px",
                                          color: "#231f20",
                                          "@media screen and (max-width:480px)":
                                            {
                                              fontSize: "12px",
                                            },
                                        }}
                                      >
                                        {value.name}
                                      </Typography>
                                    }
                                  />
                                </Box>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </GridRightData>
                    </Grid>
                  </Grid>
                  <hr
                    className="hair-line"
                    style={{ margin: "0px", padding: "0px" }}
                  />
                </RNDGrid>
                <RNDGrid item xs={12} mt={-2}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={3} sm={12}>
                      <FactoryLoacationLabelContainer
                        breakPoints={breakPoints}
                        value={{}}
                      >
                        Accepted Shipping Incoterm
                      </FactoryLoacationLabelContainer>
                    </Grid>
                    <Grid item xs={12} md={9} sm={9}>
                      <Box sx={{ padding: "12px 0px" }}>
                        <Grid
                          container
                          spacing={1}
                          rowSpacing={-1}
                          sx={{
                            "@media screen and (max-width:900px)": {
                              marginTop: "-16px",
                            },
                          }}
                        >
                          {paymentTermsList.map((value) => (
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={5}
                              lg={4}
                              key={value.id}
                            >
                              <Box display="flex" alignItems="center">
                                <LightTooltip
                                  placement="top"
                                  arrow
                                  title={value.tooltip}
                                  disableInteractive
                                >
                                  <FormControlLabel
                                    disabled
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
                                        checked={payment_terms?.includes(
                                          value.id
                                        )}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            formik.setFieldValue(
                                              "payment_terms",
                                              [...payment_terms, value.id]
                                            );
                                          } else {
                                            formik.setFieldValue(
                                              "payment_terms",
                                              payment_terms.filter(
                                                (v) => v != value.id
                                              )
                                            );
                                          }
                                        }}
                                        style={{
                                          paddingRight: 4,
                                          paddingLeft: 0,
                                        }}
                                        sx={{
                                          "&.Mui-checked": {},
                                          "& .MuiSvgIcon-root": {
                                            fontSize: "19px",
                                          },
                                        }}
                                      />
                                    }
                                    label={
                                      <Typography
                                        sx={{
                                          fontSize: "14px",
                                          color: "#231f20",
                                          "@media screen and (max-width:480px)":
                                            {
                                              fontSize: "12px",
                                            },
                                        }}
                                      >
                                        {value.name}
                                      </Typography>
                                    }
                                  />
                                </LightTooltip>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                  <hr
                    className="hair-line"
                    style={{ margin: "0px", padding: "0px" }}
                  />
                </RNDGrid>
                <RNDGrid item xs={12} mt={-2}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={3} sm={12}>
                      <FactoryLoacationLabelContainer
                        breakPoints={breakPoints}
                        value={{}}
                      >
                        Accepted Currency
                      </FactoryLoacationLabelContainer>
                    </Grid>
                    <Grid item xs={12} md={9} sm={9}>
                      <Box sx={{ padding: "12px 0px" }}>
                        <Grid
                          container
                          spacing={1}
                          rowSpacing={-1}
                          sx={{
                            "@media screen and (max-width:900px)": {
                              marginTop: "-16px",
                            },
                          }}
                        >
                          {AcceptedCurrency?.map((value) => {
                            return (
                              <Grid item xs={12} sm={6} md={5} lg={4}>
                                <Box display="flex" alignItems="center">
                                  <LightTooltip
                                    placement="top"
                                    arrow
                                    title={value.tooltip}
                                    disableInteractive
                                  >
                                    <FormControlLabel
                                      disabled
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
                                          checked={accepted_currency?.includes(
                                            value.name
                                          )}
                                          onChange={(e) => {
                                            if (e.target.checked) {
                                              formik.setFieldValue(
                                                "accepted_currency",
                                                [
                                                  ...accepted_currency,
                                                  value.name,
                                                ]
                                              );
                                            } else {
                                              formik.setFieldValue(
                                                "accepted_currency",
                                                accepted_currency.filter(
                                                  (v) => v != value.name
                                                )
                                              );
                                            }
                                          }}
                                          style={{
                                            paddingRight: 4,
                                            paddingLeft: 0,
                                          }}
                                          sx={{
                                            "&.Mui-checked": {},
                                            "& .MuiSvgIcon-root": {
                                              fontSize: "19px",
                                            },
                                          }}
                                        />
                                      }
                                      label={
                                        <Typography
                                          sx={{
                                            fontSize: "14px",
                                            color: "#231f20",
                                            "@media screen and (max-width:480px)":
                                              {
                                                fontSize: "12px",
                                              },
                                          }}
                                        >
                                          {value.name}
                                        </Typography>
                                      }
                                    />
                                  </LightTooltip>
                                </Box>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                  <hr
                    className="hair-line"
                    style={{ margin: "0px", padding: "0px" }}
                  />
                </RNDGrid>

                <RNDGrid item xs={12} mt={-2}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={3} sm={9}>
                      <FactoryLoacationLabelContainer
                        breakPoints={breakPoints}
                        value={{}}
                      >
                        Payment Methods
                      </FactoryLoacationLabelContainer>
                      <Box
                        sx={{
                          // padding: "12px 0px 0px 5px",
                          fontSize: "12px",
                          fontWeight: "400",
                          color: "#223354",
                          opacity: "0.5",
                        }}
                      >
                        (Seller can select upto 6 Payment Methods )
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={9} sm={9}>
                      {/* <Box
                        sx={{
                          padding: "12px 0px 0px 5px",
                          fontSize: "14px",
                          fontWeight: "400px",
                          color: "#223354",
                          opacity: "0.5",
                        }}
                      >
                        Seller can Select up to 6 Payment Methods{" "}
                      </Box> */}
                      <Box sx={{ padding: "0px" }}>
                        <Grid container spacing={1} rowSpacing={-1}>
                          {paymentMethods.map((value) => (
                            <Grid item xs={12} sm={6} md={5} lg={4}>
                              <Box display="flex" alignItems="center">
                                <LightTooltip
                                  placement="top"
                                  arrow
                                  title={value.tooltip}
                                  disableInteractive
                                >
                                  <FormControlLabel
                                    className="profile_business"
                                    disabled
                                    style={{
                                      color: "#231F20",
                                      fontSize: "14px",
                                      lineHeight: "23px",
                                      marginLeft: 0,
                                      marginRight: "5px",
                                    }}
                                    control={
                                      <Checkbox
                                        checked={payment_methods?.includes(
                                          value.name
                                        )}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            formik.setFieldValue(
                                              "payment_methods",
                                              [payment_methods, value.name]
                                            );
                                            if (
                                              value.name ===
                                              "LC (Letter of Credit)"
                                            ) {
                                              setChecked(true);
                                            }
                                          } else {
                                            formik.setFieldValue(
                                              "payment_methods",
                                              payment_methods.filter(
                                                (v) => v != value.name
                                              )
                                            );
                                            if (
                                              value.name ===
                                              "LC (Letter of Credit)"
                                            ) {
                                              setChecked(false);
                                            }
                                            setLocList([]);
                                          }
                                          formik.setFieldError(
                                            "Payment methods",
                                            ""
                                          );
                                        }}
                                        style={{
                                          paddingRight: 4,
                                          paddingLeft: 0,
                                        }}
                                        sx={{
                                          "&.Mui-checked": {},
                                          "& .MuiSvgIcon-root": {
                                            fontSize: "19px",
                                          },
                                        }}
                                      />
                                    }
                                    label={
                                      <Typography
                                        sx={{
                                          fontSize: "14px",
                                          color: "#231f20",
                                          "@media screen and (max-width:480px)":
                                            {
                                              fontSize: "12px",
                                            },
                                        }}
                                      >
                                        {value.name}
                                      </Typography>
                                    }
                                  />
                                </LightTooltip>
                              </Box>
                            </Grid>
                          ))}
                          <Grid item xs={12}>
                            {isChecked && (
                              <Box
                                sx={{
                                  padding: "8px !important",
                                  border: "1px solid #ddd",
                                  borderRadius: "6px",
                                  margin: "12px 0 0 0",
                                  position: "relative",
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
                                    sx={{
                                      color: "#000",
                                      fontSize: "14px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    LC Types
                                  </Typography>
                                </Box>
                                <Grid
                                  container
                                  rowSpacing={0}
                                  columnSpacing={1}
                                >
                                  {LCOptions.map((value) => (
                                    <Grid item xs={12} sm={6} md={5} lg={4}>
                                      <Box display="flex" alignItems="center">
                                        <LightTooltip
                                          placement="top"
                                          arrow
                                          title={value.tooltip}
                                          disableInteractive
                                        >
                                          <FormControlLabel
                                            className="profile_business"
                                            disabled
                                            style={{
                                              color: "#231F20",
                                              fontSize: "14px",
                                              lineHeight: "23px",
                                              marginLeft: 0,
                                              marginRight: "5px",
                                            }}
                                            control={
                                              <Checkbox
                                                checked={locList.includes(
                                                  value.name
                                                )}
                                                onChange={(e) => {
                                                  if (e.target.checked) {
                                                    setLocList((pre) => [
                                                      ...pre,
                                                      value.name,
                                                    ]);
                                                    // formik.setFieldValue(
                                                    //   "payment_methods",
                                                    //   [
                                                    //     payment_methods,
                                                    //     value.name,
                                                    //   ]
                                                    // );
                                                    if (
                                                      value.name ===
                                                      "LC (Letter of Credit)"
                                                    ) {
                                                      setChecked(true);
                                                    }
                                                  } else {
                                                    setLocList(value.name);
                                                  }
                                                }}
                                                style={{
                                                  paddingRight: 4,
                                                  paddingLeft: 0,
                                                }}
                                                sx={{
                                                  "&.Mui-checked": {},
                                                  "& .MuiSvgIcon-root": {
                                                    fontSize: "19px",
                                                  },
                                                }}
                                              />
                                            }
                                            label={
                                              <Typography
                                                sx={{
                                                  fontSize: "14px",
                                                  color: "#231f20",
                                                  "@media screen and (max-width:480px)":
                                                    {
                                                      fontSize: "12px",
                                                    },
                                                }}
                                              >
                                                {value.name}
                                              </Typography>
                                            }
                                          />
                                        </LightTooltip>
                                      </Box>
                                    </Grid>
                                  ))}
                                </Grid>
                              </Box>
                            )}
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </RNDGrid>
              </Grid>
            )}
            {!skeletonLoader && edit && (
              <Grid container spacing={2}>
                <RNDGrid item xs={12}>
                  <Grid container spacing={1} alignItems={"flex-start"}>
                    <Grid item xs={12} md={3} sm={12}>
                      <FactoryLoacationLabelContainer
                        className="rndlableclass"
                        breakPoints={breakPoints}
                        value={{}}
                      >
                        Export Market<span className="detailastrics">*</span>
                      </FactoryLoacationLabelContainer>
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <GridRightData>
                        <Grid
                          container
                          spacing={1}
                          rowSpacing={-1}
                          sx={{
                            "@media screen and (max-width:900px)": {
                              marginTop: "-16px",
                            },
                          }}
                        >
                          {territoryList?.map((value) => (
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={5}
                              lg={4}
                              key={`${value.name}-${value.id}`}
                            >
                              <Box>
                                <Box
                                  component="div"
                                  display="flex"
                                  alignItems="center"
                                >
                                  <FormControlLabel
                                    className="profile_business"
                                    sx={{
                                      color: "#231F20",
                                      fontSize: "14px",
                                      lineHeight: "23px",
                                      marginLeft: 0,
                                      marginRight: "5px",
                                    }}
                                    control={
                                      <Checkbox
                                        inputRef={exportMarketRef}
                                        checked={formik.values.export_market?.includes(
                                          value.id
                                        )}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            formik.setFieldValue(
                                              "export_market",
                                              [
                                                ...formik.values.export_market,
                                                value.id,
                                              ]
                                            );
                                          } else {
                                            formik.setFieldValue(
                                              "export_market",
                                              formik.values.export_market.filter(
                                                (v) => v !== value.id
                                              )
                                            );
                                          }
                                          formik.setFieldError(
                                            "export_market",
                                            ""
                                          );
                                        }}
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
                                      />
                                    }
                                    label={
                                      <Typography
                                        sx={{
                                          fontSize: "14px",
                                          color: "#231f20",
                                          "@media screen and (max-width:480px)":
                                            {
                                              fontSize: "12px",
                                            },
                                        }}
                                      >
                                        {" "}
                                        {value.name}
                                      </Typography>
                                    }
                                  />
                                </Box>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </GridRightData>
                      <FormikErrorStyle>
                        {formik.errors.export_market && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <WarningAmberOutlinedIcon
                              style={{
                                fontSize: "12px",
                                margin: "0px 4px 0 0",
                                color: "#d7282f",
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: "12px",
                                color: "#d7282f !important",
                              }}
                            >
                              {`${formik.errors.export_market}`}
                            </Typography>
                          </Box>
                        )}
                      </FormikErrorStyle>
                    </Grid>
                  </Grid>
                  <hr
                    className="hair-line"
                    style={{ margin: "0px", padding: "0px" }}
                  />
                </RNDGrid>
                <RNDGrid item xs={12} mt={-2}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={3} sm={12}>
                      <FactoryLoacationLabelContainer
                        breakPoints={breakPoints}
                        value={{}}
                      >
                        Accepted Shipping Incoterm
                        <span className="detailastrics">*</span>
                      </FactoryLoacationLabelContainer>
                    </Grid>
                    <Grid item xs={12} md={9} sm={9}>
                      <GridRightData>
                        <Grid
                          container
                          spacing={1}
                          rowSpacing={-1}
                          sx={{
                            "@media screen and (max-width:900px)": {
                              marginTop: "-16px",
                            },
                          }}
                        >
                          {paymentTermsList.map((value) => (
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={5}
                              lg={4}
                              key={value.id}
                            >
                              <Box display="flex" alignItems="center">
                                <LightTooltip
                                  placement="top"
                                  arrow
                                  title={value.tooltip}
                                  disableInteractive
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
                                        inputRef={shippingIncotermRef}
                                        checked={payment_terms?.includes(
                                          value.id
                                        )}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            formik.setFieldValue(
                                              "payment_terms",
                                              [...payment_terms, value.id]
                                            );
                                          } else {
                                            formik.setFieldValue(
                                              "payment_terms",
                                              payment_terms.filter(
                                                (v) => v != value.id
                                              )
                                            );
                                          }
                                          formik.setFieldError(
                                            "payment_terms",
                                            ""
                                          );
                                        }}
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
                                      />
                                    }
                                    label={
                                      <Typography
                                        sx={{
                                          fontSize: "14px",
                                          color: "#231f20",
                                          "@media screen and (max-width:480px)":
                                            {
                                              fontSize: "12px",
                                            },
                                        }}
                                      >
                                        {value.name}
                                      </Typography>
                                    }
                                  />
                                </LightTooltip>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </GridRightData>
                      <FormikErrorStyle>
                        {formik.errors.payment_terms && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <WarningAmberOutlinedIcon
                              style={{
                                fontSize: "12px",
                                margin: "0px 4px 0 0",
                                color: "#d7282f",
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: "12px",
                                color: "#d7282f !important",
                              }}
                            >
                              {`${formik.errors.payment_terms}`}
                            </Typography>
                          </Box>
                        )}
                      </FormikErrorStyle>
                    </Grid>
                  </Grid>
                  <hr
                    className="hair-line"
                    style={{ margin: "0px", padding: "0px" }}
                  />
                </RNDGrid>
                <RNDGrid item xs={12} mt={-2}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={3} sm={12}>
                      <FactoryLoacationLabelContainer
                        breakPoints={breakPoints}
                        value={{}}
                      >
                        Accepted Currency
                        <span className="detailastrics">*</span>
                      </FactoryLoacationLabelContainer>
                    </Grid>
                    <Grid item xs={12} md={9} sm={9}>
                      <GridRightData>
                        <Grid
                          container
                          spacing={1}
                          rowSpacing={-1}
                          sx={{
                            "@media screen and (max-width:900px)": {
                              marginTop: "-16px",
                            },
                          }}
                        >
                          {AcceptedCurrency.map((value) => {
                            return (
                              <Grid item xs={12} sm={6} md={5} lg={4}>
                                <Box display="flex" alignItems="center">
                                  <LightTooltip
                                    placement="top"
                                    arrow
                                    title={value.tooltip}
                                    disableInteractive
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
                                          inputRef={acceptedCurrencyRef}
                                          checked={accepted_currency?.includes(
                                            value.name
                                          )}
                                          onChange={(e) => {
                                            if (e.target.checked) {
                                              formik.setFieldValue(
                                                "accepted_currency",
                                                [
                                                  ...accepted_currency,
                                                  value.name,
                                                ]
                                              );
                                            } else {
                                              formik.setFieldValue(
                                                "accepted_currency",
                                                accepted_currency.filter(
                                                  (v) => v != value.name
                                                )
                                              );
                                            }
                                            formik.setFieldError(
                                              "accepted_currency",
                                              ""
                                            );
                                          }}
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
                                        />
                                      }
                                      label={
                                        <Typography
                                          sx={{
                                            fontSize: "14px",
                                            color: "#231f20",
                                            "@media screen and (max-width:480px)":
                                              {
                                                fontSize: "12px",
                                              },
                                          }}
                                        >
                                          {value.name}
                                        </Typography>
                                      }
                                    />
                                  </LightTooltip>
                                </Box>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </GridRightData>
                      <FormikErrorStyle>
                        {formik.errors.accepted_currency && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <WarningAmberOutlinedIcon
                              style={{
                                fontSize: "12px",
                                margin: "0px 4px 0 0",
                                color: "#d7282f",
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: "12px",
                                color: "#d7282f !important",
                              }}
                            >
                              {`${formik.errors.accepted_currency}`}
                            </Typography>
                          </Box>
                        )}
                      </FormikErrorStyle>
                    </Grid>
                  </Grid>
                  <hr
                    className="hair-line"
                    style={{ margin: "0px", padding: "0px" }}
                  />
                </RNDGrid>

                <RNDGrid item xs={12} mt={-2}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={3} sm={9}>
                      <FactoryLoacationLabelContainer
                        breakPoints={breakPoints}
                        value={{}}
                      >
                        Payment Methods <span className="detailastrics">*</span>
                      </FactoryLoacationLabelContainer>
                    </Grid>
                    <Grid item xs={12} md={9} sm={9}>
                      {/* <Box
                        sx={{
                          padding: "12px 0px 0px 0px",
                          borderBottom: "1px solid #e2e2e2",
                          "@media screen and (max-width:900px)": {
                            marginTop: "-16px",
                          },
                        }}
                      ></Box> */}
                      <GridRightData>
                        <Grid container spacing={1} rowSpacing={-1}>
                          {paymentMethods.map((value) => (
                            <Grid item xs={12} sm={6} md={5} lg={4}>
                              <Box display="flex" alignItems="center">
                                <LightTooltip
                                  placement="top"
                                  arrow
                                  title={value.tooltip}
                                  disableInteractive
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
                                        inputRef={paymentMethodsRef}
                                        checked={payment_methods?.includes(
                                          value.name
                                        )}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            formik.setFieldValue(
                                              "payment_methods",
                                              [...payment_methods, value.name]
                                            );
                                            if (
                                              value.name ===
                                              "LC (Letter of Credit)"
                                            ) {
                                              setChecked(true);
                                            }
                                          } else {
                                            formik.setFieldValue(
                                              "payment_methods",
                                              payment_methods.filter(
                                                (v) => v != value.name
                                              )
                                            );
                                            if (
                                              value.name ===
                                              "LC (Letter of Credit)"
                                            ) {
                                              setChecked(false);
                                              setLocList([]);
                                            }
                                          }
                                          formik.setFieldError(
                                            "payment_methods",
                                            ""
                                          );
                                        }}
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
                                      />
                                    }
                                    label={
                                      <Typography
                                        sx={{
                                          fontSize: "14px",
                                          color: "#231f20",
                                          "@media screen and (max-width:480px)":
                                            {
                                              fontSize: "12px",
                                            },
                                        }}
                                      >
                                        {value.name}
                                      </Typography>
                                    }
                                  />
                                </LightTooltip>
                              </Box>
                            </Grid>
                          ))}
                          <Grid item xs={12}>
                            {isChecked && (
                              <Box
                                sx={{
                                  padding: "8px !important",
                                  border: "1px solid #ddd",
                                  borderRadius: "6px",
                                  margin: "12px 0 0 0",
                                  position: "relative",
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
                                    sx={{
                                      color: "#000",
                                      fontSize: "14px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    LC Types
                                  </Typography>
                                </Box>
                                <Grid
                                  container
                                  rowSpacing={0}
                                  columnSpacing={1}
                                >
                                  {LCOptions.map((value) => {
                                    return (
                                      <Grid item xs={12} sm={6} md={5} lg={4}>
                                        <Box display="flex" alignItems="center">
                                          <LightTooltip
                                            placement="top"
                                            arrow
                                            title={value.tooltip}
                                            disableInteractive
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
                                                  inputRef={LCtypesRef}
                                                  checked={locList.includes(
                                                    value.name
                                                  )}
                                                  onChange={(e) => {
                                                    if (e.target.checked) {
                                                      setLocList((pre) => [
                                                        ...pre,
                                                        value.name,
                                                      ]);
                                                      // formik.setFieldValue(
                                                      //   "payment_methods",
                                                      //   [
                                                      //     ...payment_methods,
                                                      //     value.name,
                                                      //   ]
                                                      // );
                                                      setLCValues((prev) => [
                                                        ...prev,
                                                        value.name,
                                                      ]);
                                                    } else {
                                                      const locFilter =
                                                        locList?.filter(
                                                          (itm) =>
                                                            itm !== value.name
                                                        );
                                                      setLocList(locFilter);
                                                      // formik.setFieldValue(
                                                      //   "payment_methods",
                                                      //   payment_methods.filter(
                                                      //     (v) => v != value.name
                                                      //   )
                                                      // );
                                                      const newLCValues =
                                                        LCValues?.filter(
                                                          (v) =>
                                                            v != value?.name
                                                        );
                                                      setLCValues(newLCValues);
                                                    }
                                                  }}
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
                                                />
                                              }
                                              label={
                                                <Typography
                                                  sx={{
                                                    fontSize: "14px",
                                                    color: "#231f20",
                                                    "@media screen and (max-width:480px)":
                                                      {
                                                        fontSize: "12px",
                                                      },
                                                  }}
                                                >
                                                  {value.name}
                                                </Typography>
                                              }
                                            />
                                          </LightTooltip>
                                        </Box>
                                      </Grid>
                                    );
                                  })}
                                </Grid>
                              </Box>
                            )}
                          </Grid>
                        </Grid>
                      </GridRightData>
                      {formik.errors.payment_methods && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <WarningAmberOutlinedIcon
                            style={{
                              fontSize: "12px",
                              margin: "0px 4px 0 0",
                              color: "#d7282f",
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: "12px",
                              color: "#d7282f !important",
                            }}
                          >
                            {`${formik.errors.payment_methods}`}
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </RNDGrid>
              </Grid>
            )}
          </Grid>
        </Grid>
        {!skeletonLoader && (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 0px",
                borderBottom: "1px solid #e2e2e2",
                "@media screen and (max-width:480px)": { display: "block" },
              }}
            ></Box>

            <CustomerCaseForm />
          </>
        )}
      </OuterContainer>
    </>
  );
}
