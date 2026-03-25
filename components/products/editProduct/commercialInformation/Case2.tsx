import {
  Autocomplete,
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import useProductContext from "@/hooks/useProductContext";
import { useSelector } from "react-redux";
import { OtherComponentBox } from "./styles";
import OtherComponent from "./OtherComponent";
import CommonErrorMessage from "@/components/common/CommonErrorMessage";

function Case2({
  formik,
  setIsOrderQuantity,
  case_type,
  isOrderquanity,
  multiplePrimaryComponents,
  setMultiplePrimaryComponents,
  productDetail,
  primaryCountry,
  setMultiplePrimaryCountries,
  setPrimaryCountry,
  otherCountriesList,
  setOtherCountriesList,
  multiplePrimaryCountries,
}) {
  // const { modifiedCountriesList } = useProductContext();

  const { modifiedCountriesList } = useSelector(
    (state: any) => state.editProduct
  );
  const [autocompleteErrors, setAutocompleteErrors] = useState(
    Array(multiplePrimaryCountries?.length).fill(false)
  );
  const [componentName, setComponentName] = useState<string>("Component");
  const [radioValue, setRadioValue] = useState<any>("");
  const [autocompleteOtherErrors, setAutocompleteOtherErrors] = useState(
    Array(multiplePrimaryComponents?.length).fill(false)
  );
  const { caseTwoData } = formik.values;
  const savedData = productDetail ? productDetail.caseData : null;
  const getExistedData = caseTwoData?.primary_country ? true : false;

  //created a empty initial state for cloning and updating values on changes in the component.
  const [componentOption, setComponentOption] = useState<any>([
    {
      id: 1,
      componentName: "Component",
      sourcedCountry: [],
    },
  ]);

  const LabelValue = [
    `Made in <strong>${primaryCountry?.view ? primaryCountry?.view : ""
    }</strong>${componentOption
      .map((options) => {
        if (options?.componentName && options?.sourcedCountry?.length > 0) {
          const sourcedCountries = options?.sourcedCountry
            .map(
              (v) =>
                modifiedCountriesList.find((item) => item.value === v?.value)
                  ?.view
            )
            .filter(Boolean)
            .join(", ");

          return sourcedCountries
            ? `, with <strong>${options.componentName}</strong> from <strong>${sourcedCountries}</strong>`
            : null;
        }
        return null;
      })
      .filter(Boolean)
      .join("")}.`,
    `Manufactured in <strong>${primaryCountry?.view ? primaryCountry?.view : ""
    }</strong> for global distribution. ${componentOption
      .map((option) => {
        if (option?.componentName && option?.sourcedCountry?.length > 0) {
          const sourcedCountries = option?.sourcedCountry
            .map(
              (v) =>
                modifiedCountriesList.find((item) => item.value === v?.value)
                  ?.view
            )
            .filter(Boolean)
            .join(", ");

          return sourcedCountries
            ? `${option?.componentName === "Component" ? "Some" : ""} <strong>${option?.componentName
            }</strong> may be sourced from <strong>${sourcedCountries}</strong>`
            : null;
        }

        return null;
      })
      .filter(Boolean)
      .join(",")}.`,
  ];

  useEffect(() => {
    formik.setFieldError("caseOneData", {});
    formik.setFieldValue("caseTwoData", {
      ...caseTwoData,
      // component_name: "testAPI",
      other_source: componentOption,
      primary_country: primaryCountry,
      label: LabelValue[+radioValue],
      labelValue: radioValue,
    });
  }, [
    radioValue,
    // caseTwoData,
    // otherCountriesList,
    primaryCountry,
    // LabelValue,
    // formik.values.price_term.length,
    // componentName,
    componentOption,
    // isOrderquanity,
    // getExistedData,
    // savedData,
  ]);

  useEffect(() => {
    if (savedData && productDetail?.case_type == "case_2") {
      setIsOrderQuantity(true);
      let Data = JSON.parse(savedData);

      // if (Data?.component_name !== "Component") {
      //   setComponentName(Data?.component_name);
      // }
      if (Data?.other_source) {
        setComponentOption(Data?.other_source);
      }
      if (Data?.primary_country) {
        setPrimaryCountry(Data?.primary_country);
        // setMultiplePrimaryCountries(Data?.primary_country);
      }
      // if (Data?.other_source && otherCountriesList.length == 0) {
      //   // setOtherCountriesList(Data?.other_source?.split(","));
      //   setMultiplePrimaryComponents(Data?.primary_country?.split(","));
      // }
      if (Data?.labelValue) {
        setRadioValue(Data?.labelValue ?? "");
      }
    }
  }, [
    savedData,
    // primaryCountry,
    // otherCountriesList,
    // isOrderquanity,
    // case_type,
    // radioValue,
  ]);

  const RemoveValidation = (i, errorName) => {
    let errorMessage: any = { ...formik.errors.caseTwoData };
    if (Array.isArray(errorMessage?.[errorName])) {
      errorMessage[errorName][i] = "";
      formik.setFieldError("caseTwoData", errorMessage);
    } else {
      errorMessage[errorName] = "";
      formik.setFieldError("caseTwoData", errorMessage);
    }
  };

  const ShowValidation = (i, errorName) => {
    let errorMessage: any = { ...formik.errors.caseTwoData };
    if (!Array.isArray(errorMessage[errorName])) {
      if (errorMessage[errorName]) {
        return { message: errorMessage[errorName], error: true };
      } else {
        return { message: "", error: false };
      }
    } else {
      if (errorMessage?.[errorName]?.[i]) {
        return { message: errorMessage?.[errorName]?.[i], error: true };
      } else {
        return { message: "", error: false };
      }
    }
  };

  let ValidOtherData = otherCountriesList.filter((v) => v);
  // let ValidPrimaryData = countriesList.filter((v) => v);

  const createOtherComponent = (): void => {
    //logic to add more otherCOmponent

    //setting the formik error empty
    formik.setFieldError("caseTwoData", "");

    //condition to limit the cloning after 3 clones.
    if (componentOption.length < 5) {
      //creating an empty instance for when clone creation.
      const newOption = {
        id: componentOption.length + 1,
        componentName: "",
        sourcedCountry: [],
      };
      //setting the previous values and the new empty instance for new clone.
      setComponentOption((prev) => [...prev, newOption]);
    }
  };

  const deleteOtherComponent = (index: number): void => {
    //logic to delete newly Created otherComponent
    if (typeof index === "number") {
      let orderQuantity = [...componentOption];
      orderQuantity.splice(index, 1);
      setComponentOption(orderQuantity);
      // formik?.setFieldValue("order_quantity", orderQuantity);
    }
  };

  //updating the state of the componentOption for value changes.
  //stateValue is passed from the component and this function is passed as the prop in the component.
  const handleStateChange = (stateValue) => {
    setComponentOption(stateValue);
  };

  const isPrimaryCountryValid =
    formik?.values?.caseTwoData?.primary_country === undefined ||
    formik?.values?.caseTwoData?.primary_country === null ||
    (typeof formik?.values?.caseTwoData?.primary_country === "object" &&
      !Array.isArray(formik?.values?.caseTwoData?.primary_country) &&
      Object.keys(formik?.values?.caseTwoData?.primary_country).length === 0);

  return (
    <Box
      sx={{
        border: "1px solid #DDDDDD",
        borderRadius: "6px",
        position: "relative",
        padding: "18px 16px",
        marginTop: "30px",
        "& .MuiTypography-h3": {
          fontSize: "15px",
          color: "#000000",
          fontWeight: "600",
          marginBottom: "16px",
        },
      }}
    >
      <Box>
        <Typography variant="h3">Primary Country</Typography>
        <Grid container spacing={2}>
          {multiplePrimaryCountries.map((v, index) => {
            return (
              <Grid
                item
                md={7}
                sm={12}
                xs={12}
                key={index + 1}
                position={"relative"}
              >
                <Box
                  sx={{
                    display: "flex",
                    // alignItems: `${ShowValidation(index, "primary_country")?.error ||
                    //   autocompleteErrors[index]
                    //   ? ""
                    //   : "center"
                    //   }`,
                    gap: "16px",
                    "@media screen and (max-width:600px)": { flexWrap: "wrap", gap: "0", },
                  }}
                >
                  <FormControl
                    sx={{ width: "100%", position: "relative" }}
                    size="small"
                  >
                    <Autocomplete
                      size={"small"}
                      // multiple
                      slotProps={{
                        popper: {
                          sx: {
                            zIndex: 9,
                          },
                        },
                      }}
                      ListboxProps={{
                        sx: {
                          "&::-webkit-scrollbar": {
                            width: "6px",
                          },
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
                      }}
                      // disableClearable={true}
                      disableClearable={false}
                      id="product-list-autocomplete"
                      autoComplete={false}
                      options={modifiedCountriesList}
                      getOptionLabel={(option: any) => option?.view}
                      onChange={(e, values) => {
                        setPrimaryCountry(values);
                      }}
                      sx={{ width: "100% " }}
                      value={
                        primaryCountry
                          ? modifiedCountriesList.find(
                            (country) =>
                              country.value === primaryCountry.value
                          )
                          : null
                      }
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{
                            padding: "6px 16px !important",
                            minHeight: "30px !important",
                            "& > img": { mr: 2, flexShrink: 0 },
                          }}
                          {...props}
                        >
                          {option.view}
                        </Box>
                      )}
                      renderInput={(params): any => {
                        return (
                          <>
                            <TextField
                              placeholder={`Select Country`}
                              {...params}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              error={
                                formik?.errors?.caseTwoData &&
                                  isPrimaryCountryValid
                                  ? true
                                  : false
                              }
                            // helperText={
                            //   formik?.errors?.caseTwoData &&
                            //   (formik?.values?.caseTwoData?.primary_country ==
                            //     undefined ||
                            //     formik?.values?.caseTwoData
                            //       ?.primary_country == null) ? (
                            //     <CommonErrorMessage
                            //       message={formik?.errors?.caseTwoData}
                            //     />
                            //   ) : (
                            //     ""
                            //   )
                            // }
                            />
                            {formik?.errors?.caseTwoData &&
                              isPrimaryCountryValid ? (
                              <CommonErrorMessage message="Please select value" />
                            ) : null}
                          </>
                        );
                      }}
                    />
                  </FormControl>

                  {index + 1 == multiplePrimaryCountries.length && (
                    <Box
                      sx={{
                        fontSize: "13px",
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                        marginLeft: "8px",
                        height: "35px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "2px 0 0 0",
                      }}
                    >
                      for global distribution.
                    </Box>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>

        <OtherComponentBox>
          <Typography variant="h3">Other Component</Typography>
          <Grid container spacing={2}>
            {componentOption?.map((option, index) => {
              return (
                <OtherComponent
                  key={option?.id}
                  index={index}
                  data={option}
                  formik={formik}
                  componentName={componentName}
                  setComponentName={setComponentName}
                  multiplePrimaryCountries={multiplePrimaryCountries}
                  otherCountriesList={otherCountriesList}
                  modifiedCountriesList={modifiedCountriesList}
                  ShowValidation={ShowValidation}
                  autocompleteOtherErrors={autocompleteOtherErrors}
                  createOtherComponent={createOtherComponent}
                  deleteOtherComponent={deleteOtherComponent}
                  setAutocompleteOtherErrors={setAutocompleteOtherErrors}
                  setOtherCountriesList={setOtherCountriesList}
                  RemoveValidation={RemoveValidation}
                  componentOption={componentOption}
                  handleStateChange={handleStateChange}
                />
              );
            })}

            <Grid item md={12}>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#414141",
                  fontWeight: "500",
                  padding: "4px 0px",
                }}
              >
                {/* Please list each component used in the machinery product. For
                example, if it's a CNC milling machine, components may include
                "motor," "controller," "tool holder," "linear guides," "spindle,"
                etc. Provide a detailed breakdown of the machinery's composition. */}
                List the origin of components of the machinery. (E.g. A CNC
                milling machine, includes motor, controller, tool holder etc,
                you can specifty the origin for each component.)
              </Typography>
            </Grid>
          </Grid>
        </OtherComponentBox>

        {componentOption[0]?.sourcedCountry.length > 0 && formik?.values?.caseTwoData?.primary_country?.value && (
          <Box
            sx={{
              paddingTop: "12px",
              marginTop: "4px",
              paddingLeft: "5px",
            }}
          >
            <FormControl>
              <RadioGroup
                value={radioValue}
                onChange={(e, value) => {
                  setRadioValue(value);
                  formik.setFieldValue("caseTwoData", {
                    ...caseTwoData,
                    label: e.target.name,
                    labelValue: value,
                  });
                }}
                sx={{
                  "& .MuiFormControlLabel-root": {
                    "& .MuiButtonBase-root": {
                      padding: "4px",
                      "&.Mui-checked": {
                        color: "#D7282F",
                      },
                    },
                    "& .MuiTypography-body1": {
                      fontSize: "14px",
                      color: "#1C1C1C",
                    },
                  },
                }}
              >
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label={
                    <div
                      // contentEditable="true"
                      dangerouslySetInnerHTML={{ __html: `${LabelValue[0]}` }}
                    ></div>
                  }
                  name={LabelValue[0]}
                />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label={
                    <div
                      // contentEditable="true"
                      dangerouslySetInnerHTML={{ __html: `${LabelValue[1]}` }}
                    ></div>
                  }
                  name={LabelValue[1]}
                />
              </RadioGroup>
            </FormControl>
            {formik?.errors?.caseTwoData &&
              formik?.values?.caseTwoData?.labelValue == "" && (
                <CommonErrorMessage message={formik?.errors?.caseTwoData} />
              )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Case2;
