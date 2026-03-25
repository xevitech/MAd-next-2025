import React, { useContext, useState } from "react";
import {
  BlackCancelButton,
  CancelLink,
  RedSaveButton,
  SaveLink,
} from "../ContactPersonDetail/style";
import {
  Box,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import {
  FieldContainer,
  FieldLabelContainer,
  FieldValueContainer,
} from "../commonStyles";
import CountrySelect from "@/components/common/countrydropdown/Index";
import { FileUpload } from "@/components/common/uploadFile";
import { useFormik } from "formik";
import { MyAppContext } from "@/contextApi/appContext";
import * as Yup from "yup";
import {
  AnnualTurnoverBox,
  FloatingEditIcon,
  SectionFooterBtnContainer,
} from "../style";
import { ThreeDots } from "react-loader-spinner";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {
  apiClient,
  fullNameText,
  imageFormat,
  imageFormatDocs,
  limitfullNameText,
} from "@/components/common/common";
import imageCompression from "browser-image-compression";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { TextFieldAndDropdown1 } from "@/components/common/textFieldAndDropdown/reverseindex";

export function Customerform({
  exportData,
  currencyList,
  cancelHandler,
  addMore,
  FetchCustomerList,
  handleScroll,
}: any) {
  const [buttonLoader, setButtonLoader] = useState<any>(false);
  const { breakPoints } = useContext(MyAppContext);
  const validation = Yup.object().shape({
    customer_name: Yup.string()
      .trim()
      .required("Please enter project/customer name"),
    customer_region: Yup.string().required(
      "Please select customer's country/region"
    ),
    supplied_product: Yup.string()
      .trim()
      .required("Please enter product supplied to customer"),
    annual_turnover: Yup.object().shape({
      currency: Yup.string().required("Please select currency"),
      turnover_value: Yup.string().required("Please enter turnover value"),
    }),
    cooperation_photos: Yup.array().min(1, "Please upload cooperation photos"),

    transaction_documents: Yup.array().min(
      1,
      "Please upload transaction documents"
    ),
    status: Yup.string().required("Please select status"),
  });
  const formik: any = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      customer_name: exportData?.customer_name ?? "",
      customer_region: exportData?.customer_region ?? "",
      supplied_product: exportData?.supplied_product ?? "",
      annual_turnover: exportData?.annual_turnover
        ? {
            currency: exportData?.currency ?? "",
            turnover_value: exportData?.annual_turnover ?? "",
          }
        : { currency: "", turnover_value: "" },
      cooperation_photos: exportData?.cooperation_photos ?? [],
      transaction_documents: exportData?.transaction_documents ?? [],
      id: exportData?.id ?? [],
      transaction_deleted: "",
      cooperation_deleted: "",
      status: exportData?.status ?? "Enable",
    },
    onSubmit: async (value) => {
      setButtonLoader(true);
      let formData = new FormData();
      formData.append("customer_name", value.customer_name);
      formData.append("customer_region", value.customer_region);
      formData.append("supplied_product", value.supplied_product);
      formData.append("annual_turnover", value.annual_turnover.turnover_value);
      formData.append("currency", value.annual_turnover.currency);
      formData.append("status", value.status);

      for (let i = 0; i < value.cooperation_photos.length; i++) {
        if (!value?.cooperation_photos[i]?.id) {
          formData.append("cooperation_photos[]", value.cooperation_photos[i]);
        }
      }
      for (let i = 0; i < value.transaction_documents.length; i++) {
        if (!value?.transaction_documents[i]?.id) {
          formData.append(
            "transaction_documents[]",
            value.transaction_documents[i]
          );
        }
      }

      if (addMore == "edit") {
        formData.append("id", JSON.stringify(value.id));
        formData.append("cooperation_deleted", value.cooperation_deleted);
        formData.append("transaction_deleted", value.transaction_deleted);
        await apiClient(
          "export_traders/update",
          "post",
          { body: formData },
          true
        );
      } else {
        await apiClient(
          "export_traders/create",
          "post",
          { body: formData },
          true
        );
      }
      formik.resetForm();
      setButtonLoader(false);
      FetchCustomerList();
      cancelHandler();
    },
  });

  const {
    customer_name,
    customer_region,
    supplied_product,
    cooperation_photos,
    transaction_documents,
    annual_turnover,
  } = formik.values;
  const handleChangeTurnOver = (e: any) => {
    if (e.target.name == "turnover_value") {
      const regex = /^\d{0,8}(\.\d{0,2})?$/;
      if (e.target.value === "" || regex.test(e.target.value)) {
        formik.setFieldValue("annual_turnover", {
          ...annual_turnover,
          turnover_value: e.target.value,
        });
        formik.setFieldError("annual_turnover", {
          ...formik.errors.annual_turnover,
          turnover_value: "",
        });
      }
    } else {
      formik.setFieldValue("annual_turnover", {
        ...annual_turnover,
        currency: e.target.value,
      });
      formik.setFieldError("annual_turnover", {
        ...formik.errors.annual_turnover,
        currency: "",
      });
    }
  };

  function handleChange(e) {
    formik.setFieldValue("status", e.target.value);
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      {addMore == "edit" && (
        <Box display="flex" justifyContent="flex-end" gap={"6px"}>
          <SectionFooterBtnContainer>
            <FloatingEditIcon
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "2px",
              }}
            >
              <CancelLink
                sx={{
                  "@media screen and (max-width:320px)": {
                    fontSize: "12px !important",
                  },
                }}
              >
                <LightTooltip
                  placement="top"
                  title="Cancel"
                  arrow
                  disableInteractive
                >
                  <CloseIcon
                    sx={{
                      "@media screen and (max-width:320px)": {
                        fontSize: "16px !important",
                      },
                    }}
                    onClick={cancelHandler}
                  />
                </LightTooltip>
              </CancelLink>
              {buttonLoader ? (
                <ThreeDots
                  height="40"
                  width="40"
                  radius="9"
                  color="#D7282F"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              ) : (
                <SaveLink
                  sx={{
                    fontSize: "16px",
                    "@media screen and (max-width:320px)": {
                      fontSize: "12px !important",
                    },
                  }}
                >
                  <LightTooltip
                    placement="top"
                    title="Save"
                    arrow
                    disableInteractive
                  >
                    <SaveOutlinedIcon
                      sx={{
                        "@media screen and (max-width:320px)": {
                          fontSize: "16px !important",
                        },
                      }}
                      onClick={() => formik.handleSubmit()}
                    />
                  </LightTooltip>
                </SaveLink>
              )}
            </FloatingEditIcon>
          </SectionFooterBtnContainer>
        </Box>
      )}
      <Box
        sx={
          {
            // height: `${exportData.length <= 3 ? "220px" : "auto"}`,
            // paddingBottom: `${exportData.length == 0 ? "auto" : "12px"}`,
          }
        }
      >
        <Grid container spacing={1} alignItems={"stretch"}>
          <Grid item xs={12}>
            <Box
              sx={{
                height: "100%",
              }}
            >
              <FieldContainer
                sx={{
                  display: "block !important",
                  height: "100%",
                  "@media (max-width:600px)": {
                    padding: "0px !important",
                  },
                }}
              >
                <FieldLabelContainer
                  sx={{ padding: "0px !important" }}
                  value={{ padding: "16px" }}
                >
                  Project/Customer Name<span className="detailastrics">*</span>
                </FieldLabelContainer>
                <FieldValueContainer
                  autoComplete="off"
                  breakPoints={breakPoints}
                >
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    placeholder="Enter Project/Customer Name"
                    value={customer_name}
                    onChange={(e) => {
                      if (e?.target?.value.length > fullNameText) {
                        formik.setFieldError(
                          "customer_name",
                          limitfullNameText
                        );
                      } else {
                        formik.setFieldValue("customer_name", e.target.value);
                        formik.setFieldError("customer_name", "");
                      }
                    }}
                    error={formik?.errors?.customer_name ? true : false}
                    helperText={
                      formik?.errors?.customer_name
                        ? `${formik?.errors?.customer_name}`
                        : ""
                    }
                  />
                </FieldValueContainer>
              </FieldContainer>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                height: "100%",
              }}
            >
              <FieldContainer
                sx={{
                  display: "block !important",
                  height: "100%",
                  "@media (max-width:600px)": {
                    padding: "0px !important",
                  },
                }}
              >
                <FieldLabelContainer
                  sx={{ padding: "0px !important" }}
                  value={{ padding: "16px" }}
                >
                  Product Supplied to Customer
                  <span className="detailastrics">*</span>
                </FieldLabelContainer>
                <FieldValueContainer
                  autoComplete="off"
                  breakPoints={breakPoints}
                >
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    placeholder="Enter product you supply"
                    value={supplied_product}
                    onChange={(e) => {
                      formik.setFieldValue("supplied_product", e.target.value);
                      formik.setFieldError("supplied_product", "");
                    }}
                    error={formik.errors.supplied_product ? true : false}
                    helperText={`${formik?.errors?.supplied_product ?? ""}`}
                  />
                </FieldValueContainer>
              </FieldContainer>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <AnnualTurnoverBox
              sx={{
                height: "100%",
              }}
            >
              <FieldContainer
                sx={{
                  display: "block !important",
                  height: "100%",
                  "@media (max-width:600px)": {
                    padding: "0px !important",
                  },
                }}
              >
                <FieldLabelContainer
                  sx={{ padding: "0px !important" }}
                  value={{ padding: "16px" }}
                >
                  Annual Turnover<span className="detailastrics">*</span>
                </FieldLabelContainer>
                <FieldValueContainer
                  autoComplete="off"
                  breakPoints={breakPoints}
                  className="custom-dropdown-wrapper"
                >
                  <TextFieldAndDropdown1
                    dropdownOptions={currencyList}
                    textFieldName={"turnover_value"}
                    dropdownName={"turnover_currency"}
                    textFieldLabel={"Enter turnover"}
                    dropdownLabel={"Select Currency"}
                    handleChange={(e) => {
                      formik.handleChange(e);
                      handleChangeTurnOver(e);
                    }}
                    dropdownValue={formik.values.annual_turnover.currency}
                    textFieldValue={
                      formik.values.annual_turnover.turnover_value
                    }
                    dropDownError={formik.errors.annual_turnover?.currency}
                    textFieldError={
                      formik.errors.annual_turnover?.turnover_value
                    }
                    menuHeight={100}
                    turnoverRef={""}
                    currencyRef={""}
                  />   
          
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      "@media screen and (max-width:480px)": {
                        alignItems: "start",
                      },
                    }}
                  >
                    <Box sx={{ width: "50%" }}>
                      {formik?.errors?.annual_turnover?.turnover_value && (
                        <p style={{ color: "#d32f2f", fontSize: "10px" }}>
                          {" "}
                          <span>
                            <img
                              src="/assets/error-outline-red.svg"
                              alt=""
                              style={{
                                height: "8px",
                                width: "8px",
                                margin: "0 2px 0 0 ",
                              }}
                            />
                          </span>{" "}
                          {formik?.errors?.annual_turnover?.turnover_value}
                        </p>
                      )}
                    </Box>
                    <Box sx={{ width: "50%" }}>
                      {formik?.errors?.annual_turnover?.currency && (
                        <p
                          style={{
                            color: "#d32f2f",
                            fontSize: "10px",
                            paddingLeft: "1%",
                          }}
                        >
                          <span>
                            <img
                              src="/assets/error-outline-red.svg"
                              alt=""
                              style={{
                                height: "8px",
                                width: "8px",
                                margin: "0 2px 0 0 ",
                              }}
                            />
                          </span>
                          {formik?.errors?.annual_turnover?.currency}
                        </p>
                      )}
                    </Box>
                  </Box>
                </FieldValueContainer>
              </FieldContainer>
            </AnnualTurnoverBox>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box
              sx={{
                height: "100%",
              }}
            >
              <FieldContainer
                sx={{
                  display: "block !important",
                  height: "100%",
                  "@media (max-width:600px)": {
                    padding: "0px !important",
                  },
                }}
              >
                <FieldLabelContainer
                  sx={{ padding: "0px !important" }}
                  value={{ padding: "16px" }}
                >
                  Customer's Country/Region
                  <span className="detailastrics">*</span>
                </FieldLabelContainer>
                <FieldValueContainer
                  autoComplete="off"
                  breakPoints={breakPoints}
                >
                  <CountrySelect
                    // disableScroll={handleScroll}
                    mode={"edit"}
                    country={customer_region}
                    setCountry={(value) => {
                      formik.setFieldValue("customer_region", value);
                      formik.setFieldError("customer_region", "");
                    }}
                    error={formik.errors.customer_region ? true : false}
                    errorText={`${formik.errors.customer_region}`}
                  />
                </FieldValueContainer>
              </FieldContainer>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <FieldContainer
                sx={{
                  display: "block !important",
                  height: "100%",
                  "@media (max-width:600px)": {
                    padding: "0px !important",
                  },
                }}
              >
                <FieldLabelContainer
                  sx={{ padding: "0px !important", display: "block" }}
                  value={{ padding: "16px" }}
                >
                  Cooperation Photos<span className="detailastrics">*</span>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#231f20",
                      opacity: "1",
                      margin: "0 0 0 10px",
                    }}
                  >
                    {imageFormat}
                  </span>
                </FieldLabelContainer>
                <FieldValueContainer
                  autoComplete="off"
                  breakPoints={breakPoints}
                >
                  <Box
                    sx={{
                      border: `${
                        formik.errors.cooperation_photos
                          ? "1px solid #d7282f"
                          : "1px solid rgba(0, 0, 0, 0.23)"
                      }`,
                      width: "100%",
                      padding: "5px 2px 5px",
                      borderRadius: "4px",
                    }}
                  >
                    <FileUpload
                      fileType="image/*"
                      single={false}
                      name="cooperation_photos"
                      mode={"edit"}
                      files={cooperation_photos}
                      error={(error) =>
                        formik.setFieldError("cooperation_photos", error)
                      }
                      updateFiles={(e) => {
                        if (e.length > 3) {
                          formik.setFieldError(
                            "cooperation_photos",
                            "Please upload maximum 3 photos"
                          );
                          return;
                        }

                        formik.setFieldValue("cooperation_photos", e);
                        formik.setFieldError("cooperation_photos", "");
                      }}
                      removedFile={(e) =>
                        formik.setFieldValue("cooperation_deleted", e)
                      }
                    />
                  </Box>
                  {formik.errors.cooperation_photos && (
                    <p
                      style={{
                        fontSize: "10px",
                        color: "#d7282f",
                        margin: "2px 0px",
                      }}
                    >
                      <span>
                        <img
                          src="/assets/error-outline-red.svg"
                          alt=""
                          height={"8px"}
                          width={"8px"}
                          style={{ marginRight: "4px" }}
                        />
                      </span>
                      {formik.errors.cooperation_photos}
                    </p>
                  )}
                </FieldValueContainer>
              </FieldContainer>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <FieldContainer
                sx={{
                  display: "block !important",
                  height: "100%",
                  "@media (max-width:600px)": {
                    padding: "0px !important",
                  },
                }}
              >
                <FieldLabelContainer
                  sx={{ padding: "0px !important", display: "block" }}
                  value={{ padding: "16px" }}
                >
                  Transaction Documents<span className="detailastrics">*</span>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#231f20",
                      opacity: "1",
                      margin: "0 0px 0 10px",
                    }}
                  >
                    {imageFormatDocs}
                  </span>
                </FieldLabelContainer>
                <FieldValueContainer
                  autoComplete="off"
                  breakPoints={breakPoints}
                >
                  <Box
                    sx={{
                      border: `${
                        formik.errors.transaction_documents
                          ? "1px solid #d7282f"
                          : "1px solid rgba(0, 0, 0, 0.23)"
                      }`,
                      width: "100%",
                      padding: "5px 2px 5px",
                      borderRadius: "4px",
                    }}
                  >
                    <FileUpload
                      single={false}
                      name="transaction_documents"
                      mode={"edit"}
                      fileType={".pdf,.doc,.docx,.png,.jpeg,.jpg,.xls,.xlsx"}
                      files={transaction_documents}
                      updateFiles={(e) => {
                        if (e.length > 3) {
                          formik.setFieldError(
                            "transaction_documents",
                            "Please select upto 3 documents"
                          );
                          return;
                        }
                        formik.setFieldValue("transaction_documents", e);
                        formik.setFieldError("transaction_documents", "");
                      }}
                      removedFile={(e) =>
                        formik.setFieldValue("transaction_deleted", e)
                      }
                    />
                  </Box>
                  {formik.errors.transaction_documents && (
                    <p
                      style={{
                        fontSize: "10px",
                        color: "#d7282f",
                        margin: "2px 0px",
                      }}
                    >
                      <span>
                        <img
                          src="/assets/error-outline-red.svg"
                          alt=""
                          height={"8px"}
                          width={"8px"}
                          style={{ marginRight: "4px" }}
                        />
                      </span>
                      {formik.errors.transaction_documents}
                    </p>
                  )}
                </FieldValueContainer>
              </FieldContainer>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <FieldContainer
                sx={{
                  display: "block !important",
                  height: "100%",
                  "@media (max-width:600px)": {
                    padding: "0px !important",
                  },
                }}
              >
                <FieldLabelContainer
                  sx={{ padding: "0px !important", display: "block" }}
                  value={{ padding: "16px" }}
                >
                  Status
                </FieldLabelContainer>
                <FieldValueContainer
                  autoComplete="off"
                  breakPoints={breakPoints}
                >
                  <FormControl fullWidth>
                    <Select
                      sx={{
                        borderRadius: "4px",
                      }}
                      size="small"
                      name="status"
                      value={formik.values.status}
                      onChange={(e) => handleChange(e)}
                    >
                      <MenuItem value="Enable">Enable</MenuItem>
                      <MenuItem value="Disable">Disable</MenuItem>
                    </Select>
                  </FormControl>
                </FieldValueContainer>
              </FieldContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {addMore !== "edit" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "px",
            padding: "8px 0 0 0",
          }}
        >
          <BlackCancelButton onClick={() => cancelHandler("")}>
            Cancel
          </BlackCancelButton>
          <RedSaveButton type="submit">
            {" "}
            {buttonLoader ? (
              <ThreeDots
                height="40"
                width="40"
                radius="9"
                color="#D7282F"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              />
            ) : (
              "Save"
            )}
          </RedSaveButton>
        </Box>
      )}
    </form>
  );
}
