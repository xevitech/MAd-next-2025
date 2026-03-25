import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { FileUpload } from "@/components/common/uploadFile";
import { useFormik } from "formik";
import { MyAppContext } from "@/contextApi/appContext";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import { apiClient, imageFormat } from "@/components/common/common";
import { countries } from "@/utils/countries";
import {
  Blackoutlinebtn,
  Redoutlinebtn,
} from "@/components/common/buttons/ButtonsVariations";
import { FieldContainer } from "../styles";
import { FieldLabelContainer } from "@/components/CompanySettings/CompanyDetail/commonStyles";
import { ServiceAddText } from "@/components/CompanySettings/CompanyDetail/style";
import { FieldValueContainer } from "../../common";
import { SelectPlaceholder } from "@/components/CompanySettings/CompanyDetail/FactoryDetails/style";
import moment from "moment";
import { CustomDatePicker } from "@/components/common/datePicker";
function TradeShowForm({ fetchList, addMore, defaultValue, setAddMore }: any) {
  const [buttonLoader, setButtonLoader] = useState<any>(false);
  const { breakPoints, setCompleteScreenLoader } = useContext(MyAppContext);
  const validation = Yup.object().shape({
    trade_show_name: Yup.string().required("Please enter trade show name"),
    trade_show_region: Yup.string().required(
      "Please select customer's country/region"
    ),
    trade_show_date: Yup.string().required("Please select date"),
    trade_show_photos: Yup.array().min(1, "Please upload trade show photos"),
    trade_show_instructions: Yup.string()
      .required("Please enter trade show instructions")
      .max(200, "Max Characters Limit Reached!"),
  });

  const formik: any = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      trade_show_name: addMore === "edit" ? defaultValue?.name : "",
      trade_show_date: addMore === "edit" ? defaultValue?.date : "",
      trade_show_photos: addMore === "edit" ? defaultValue?.photos : [],
      trade_show_instructions:
        addMore === "edit" ? defaultValue?.instructions : "",
      trade_show_region: addMore === "edit" ? defaultValue?.country_ : "",
      id: addMore === "edit" ? defaultValue?.id : "",
      trade_show_photos_deleted: "",
    },
    onSubmit: async (value) => {
      setButtonLoader(true);
      let formData = new FormData();
      formData.append("name", value.trade_show_name);
      formData.append("date", value.trade_show_date);
      formData.append("country", value.trade_show_region);
      formData.append("instructions", value.trade_show_instructions);
      for (let i = 0; i < value.trade_show_photos.length; i++) {
        if (!value?.trade_show_photos[i]?.id) {
          formData.append("photos[]", value.trade_show_photos[i]);
        }
      }

      if (addMore == "edit") {
        formData.append("id", value.id);
        formData.append("photos_deleted", value.trade_show_photos_deleted);
        await apiClient("trade_show/update", "post", { body: formData }, true);
      } else {
        await apiClient("trade_show/create", "post", { body: formData }, true);
      }
      fetchList();
      setCompleteScreenLoader(false);
      formik.resetForm();
      setButtonLoader(false);
      setAddMore("");
    },
  });

  const {
    trade_show_name,
    trade_show_region,
    trade_show_date,
    trade_show_photos,
    trade_show_instructions,
  } = formik.values;

  const cancelHandle = () => {
    formik.resetForm();
    setAddMore("");
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <Grid container spacing={0} alignItems={"stretch"}>
          <Grid item xs={12}>
            <ServiceAddText variant="h6">
              {addMore === "edit" ? "Update" : "Add"} Trade Show
            </ServiceAddText>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Box>
                <FieldLabelContainer className="Tradeshow">
                  Trade Show Name<span className="detailastrics">*</span>
                </FieldLabelContainer>
                <FieldValueContainer
                  sx={{ p: 0 }}
                  autoComplete="off"
                  breakPoints={breakPoints}
                >
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    placeholder="Enter trade show Name"
                    value={formik.values.trade_show_name}
                    onChange={(e) => {
                      const input = e.target;
                      const newValue = input.value;
                      const cursorPosition = input.selectionStart;
                      if (newValue.length > 100) {
                        formik.setFieldError(
                          "trade_show_name",
                          "Trade show content is too long. Please limit it to 100 characters"
                        );
                        return;
                      }
                      const trimmedValue = newValue.trimStart();
                      if (trimmedValue !== newValue) {
                        formik.setFieldValue("trade_show_name", trimmedValue);
                        requestAnimationFrame(() => {
                          input.selectionStart = input.selectionEnd =
                            cursorPosition -
                            (newValue.length - trimmedValue.length);
                        });
                      } else {
                        formik.setFieldValue("trade_show_name", newValue);
                        formik.setFieldError("trade_show_name", "");
                        requestAnimationFrame(() => {
                          input.selectionStart = input.selectionEnd =
                            cursorPosition;
                        });
                      }
                    }}
                    error={formik?.errors?.trade_show_name ? true : false}
                    helperText={
                      formik?.errors?.trade_show_name
                        ? `${formik?.errors?.trade_show_name}`
                        : ""
                    }
                  />
                </FieldValueContainer>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <FieldLabelContainer className="Tradeshow">
                Date<div style={{ color: "#d7282f" }}>*</div>
              </FieldLabelContainer>
              <FieldValueContainer sx={{ p: 0 }}>
                <CustomDatePicker
                  datepicker
                  name="trade_show_date"
                  handleChange={({ target }) => {
                    const value = target.value;
                    formik.setFieldValue("trade_show_date", value);
                    if (value) {
                      formik.setFieldError("trade_show_date", "");
                    } else {
                      formik.setFieldError(
                        "trade_show_date",
                        "Date is required"
                      );
                    }
                  }}
                  value={trade_show_date}
                  defaultDate={moment(new Date()).format("YYYY-MM-DD")}
                  error={formik.errors?.trade_show_date ? true : false}
                  errorText={formik.errors?.trade_show_date || ""}
                />
              </FieldValueContainer>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box>
              <Box>
                <FieldLabelContainer className="Tradeshow">
                  Host Country/Region <span className="detailastrics">*</span>
                </FieldLabelContainer>
                <FieldValueContainer
                  sx={{ p: 0 }}
                  autoComplete="off"
                  breakPoints={breakPoints}
                >
                  <>
                    <FormControl
                      fullWidth
                      size="small"
                      error={
                        formik.touched.trade_show_region &&
                        Boolean(formik.errors.trade_show_region)
                      }
                    >
                      <Select
                        fullWidth
                        value={formik.values.trade_show_region || ""}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              maxHeight: 200,
                              "&::-webkit-scrollbar": { width: "6px" },
                              "&::-webkit-scrollbar-track": {
                                backgroundColor: "#f1f1f1",
                              },
                              "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#acabab",
                              },
                              "&::-webkit-scrollbar-thumb:hover": {
                                backgroundColor: "#6d6d6d",
                              },
                            },
                          },
                        }}
                        onChange={(e) => {
                          const selectedCountry = countries.find(
                            (country) => country.name === e.target.value
                          );
                          formik.setFieldValue(
                            "trade_show_region",
                            selectedCountry?.code
                          );
                          formik.setFieldError("trade_show_region", "");
                        }}
                        displayEmpty
                        renderValue={(selected) => {
                          if (!selected) {
                            return (
                              <SelectPlaceholder>Country</SelectPlaceholder>
                            );
                          }
                          const selectedCountry = countries.find(
                            (country) => country.code === selected
                          );
                          const flagUrl = selectedCountry
                            ? `https://flagcdn.com/w320/${selectedCountry.code.toLowerCase()}.png`
                            : "";

                          return (
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img
                                src={flagUrl}
                                alt={selectedCountry?.name || "Country Flag"}
                                style={{
                                  width: 20,
                                  height: 15,
                                  marginRight: 8,
                                }}
                              />
                              {selectedCountry?.name}
                            </div>
                          );
                        }}
                      >
                        {countries.map((country) => {
                          const flagUrl = `https://flagcdn.com/w320/${country.code.toLowerCase()}.png`;
                          return (
                            <MenuItem key={country.code} value={country.name}>
                              <img
                                src={flagUrl}
                                alt={country.name}
                                style={{
                                  width: 20,
                                  height: 15,
                                  marginRight: 8,
                                }}
                              />
                              {country.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {formik.touched.trade_show_region &&
                        formik.errors.trade_show_region && (
                          <FormHelperText>
                            {formik.errors.trade_show_region}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </>
                </FieldValueContainer>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Box>
                <FieldLabelContainer className="Tradeshow">
                  Trade Show Photos<span className="detailastrics">*</span>
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
                  sx={{ p: 0 }}
                  autoComplete="off"
                  breakPoints={breakPoints}
                >
                  <Box
                    sx={{
                      border: `${
                        formik.errors.trade_show_photos
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
                      files={trade_show_photos}
                      error={(error) =>
                        formik.setFieldError("trade_show_photos", error)
                      }
                      updateFiles={(e) => {
                        if (e.length > 3) {
                          formik.setFieldError(
                            "trade_show_photos",
                            "Please upload maximum 3 photos"
                          );
                          return;
                        }

                        formik.setFieldValue("trade_show_photos", e);
                        formik.setFieldError("trade_show_photos", "");
                      }}
                      removedFile={(e) => {
                        formik.setFieldValue("trade_show_photos_deleted", e);
                      }}
                    />
                  </Box>
                  {formik.errors.trade_show_photos && (
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
                      {formik.errors.trade_show_photos}
                    </p>
                  )}
                </FieldValueContainer>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Box>
                  <FieldLabelContainer className="Tradeshow">
                    Trade Show Instructions
                    <div style={{ color: "#d7282f" }}>*</div>
                  </FieldLabelContainer>
                  <FieldValueContainer sx={{ padding: "0px" }}>
                    <TextField
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "6px !important",
                        },
                      }}
                      id="outlined-multiline-static"
                      multiline
                      rows={4}
                      name="trade_show_instructions"
                      fullWidth
                      placeholder="Enter trade show instructions"
                      value={trade_show_instructions}
                      onChange={(e) => {
                        const input = e.target;
                        const newValue = input.value;
                        const cursorPosition = input.selectionStart;
                        if (newValue.length > 200) {
                          formik.setFieldError(
                            "trade_show_instructions",
                            "Trade show instructions content is too long. Please limit it to 200 characters"
                          );
                          const newValue1 = newValue.slice(0, 200);
                          formik.setFieldValue(
                            "trade_show_instructions",
                            newValue1
                          );
                          return;
                        }
                        const trimmedValue = newValue.trimStart();
                        if (trimmedValue !== newValue) {
                          formik.setFieldValue(
                            "trade_show_instructions",
                            trimmedValue
                          );
                          requestAnimationFrame(() => {
                            input.selectionStart = input.selectionEnd =
                              cursorPosition -
                              (newValue.length - trimmedValue.length);
                          });
                        } else {
                          formik.setFieldValue(
                            "trade_show_instructions",
                            newValue
                          );
                          formik.setFieldError("trade_show_instructions", "");
                          requestAnimationFrame(() => {
                            input.selectionStart = input.selectionEnd =
                              cursorPosition;
                          });
                        }
                      }}
                      error={
                        formik?.errors?.trade_show_instructions ? true : false
                      }
                      helperText={
                        formik?.errors?.trade_show_instructions
                          ? `${formik?.errors?.trade_show_instructions}`
                          : ""
                      }
                    />
                    <div
                      style={{
                        fontWeight: 400,
                        fontSize: "12px",
                        lineHeight: "160.9%",
                        display: "flex",
                        alignItems: "center",
                        color: "#848487",
                        paddingTop: "0px",
                        flexDirection: "column",
                      }}
                    >
                      <p>
                        Maximum characters{" "}
                        <span
                          style={{
                            color:
                              trade_show_instructions.length > 0
                                ? "inherit"
                                : "inherit",
                          }}
                        >
                          {trade_show_instructions.length || 0}
                        </span>
                        <span
                          style={{
                            color:
                              trade_show_instructions.length > 199
                                ? "inherit"
                                : "inherit",
                          }}
                        >
                          /200
                        </span>
                      </p>
                    </div>
                  </FieldValueContainer>
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                marginTop: "px",
                padding: "8px 0 0 0",
              }}
            >
              <Blackoutlinebtn
                borderRadius={"6px"}
                height={"35px"}
                onClick={() => cancelHandle()}
              >
                Cancel
              </Blackoutlinebtn>
              <Redoutlinebtn type="submit">
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
                ) : addMore === "edit" ? (
                  "Update"
                ) : (
                  "Save"
                )}
              </Redoutlinebtn>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
export default TradeShowForm;
