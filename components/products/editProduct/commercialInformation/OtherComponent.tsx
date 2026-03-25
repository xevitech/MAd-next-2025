import { Autocomplete, Box, FormControl, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { AddButton, Buttonspacing, DeleteButton } from "./styles";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import CommonErrorMessage from "@/components/common/CommonErrorMessage";
const OtherComponent = (props) => {
  const {
    formik,
    // componentName,
    // setComponentName,
    multiplePrimaryCountries,
    // otherCountriesList,
    modifiedCountriesList,
    ShowValidation,
    autocompleteOtherErrors,
    // setAutocompleteOtherErrors,
    // setOtherCountriesList,
    // RemoveValidation,
    createOtherComponent,
    deleteOtherComponent,
    index,
    componentOption,
    handleStateChange,
    data,
  } = props;

  //state for duplication of selected sourced country.
  const [existedError, setExistedError] = useState(false);
  const [lengthError, setLengthError] = useState(false);

  const onChangeHandler = (name, value) => {
    setLengthError(false);
    if (name == "sourcedCountry") {
      //filering out the data from the original list because the values structure is changed for selection input.
      const filteredCountryData = modifiedCountriesList.filter((country) =>
        value.some((item) => item?.value == country.value)
      );

      //checking if the value selected by the user already exist in the state.
      const alreadyExist = data?.sourcedCountry?.some((item) =>
        value.includes(item)
      );
      if (alreadyExist) {
        //setting error true in case of value is already there.
        setExistedError(true);
        return;
      }
      //setting the eroor to false if no duplication is found.
      setExistedError(false);
      let options = [...componentOption];
      options[index][name] = filteredCountryData;
      handleStateChange(options);
    } else {
      //this is the in the case for when user enters the value for component name.
      let options = [...componentOption];
      options[index][name] = value;
      handleStateChange(options);
    }

    // setError(name);
    //   }
    // }
  };

  return (
    <>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Box>
          <FormControl fullWidth size="small">
            <TextField
              fullWidth
              label="Component Name"
              value={data?.componentName}
              size="small"
              onChange={(e) => onChangeHandler("componentName", e.target.value)}
              error={
                formik?.errors?.caseTwoData && data?.componentName == ""
                  ? true
                  : false
              }
              // helperText={
              //   formik?.errors?.caseTwoData && data?.componentName == "" ? (
              //     <CommonErrorMessage message={formik?.errors?.caseTwoData} />
              //   ) : (
              //     " "
              //   )
              // }
            />
            {formik?.errors?.caseTwoData && data?.componentName == "" ? (
              <CommonErrorMessage message="Please enter value" />
            ) : null}
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Grid container spacing={2} alignItems={"start"}>
          {multiplePrimaryCountries.map((v, index) => {
            let defaultValues =
              data?.sourcedCountry?.map((country, index) => {
                let foundCountry = modifiedCountriesList.find(
                  (v) => v.value == data?.sourcedCountry?.[index]?.value
                );
                return {
                  value: foundCountry?.value ?? "",
                  view: foundCountry?.view ?? "",
                };
              }) || [];
            return (
              <Grid
                item
                lg={8}
                md={9}
                sm={12}
                xs={12}
                key={index}
                position={"relative"}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: `${
                      ShowValidation(index, "other_source")?.error ||
                      autocompleteOtherErrors[index]
                        ? "normal"
                        : "center"
                    }`,
                    // alignItems: 'center',
                    gap: "16px",
                    "@media screen and (max-width:600px)": {
                      flexWrap: "wrap",
                    },
                  }}
                >
                  <FormControl fullWidth size="small">
                    <Autocomplete
                      fullWidth
                      size={"small"}
                      multiple
                      // disableClearable={true}
                      disableClearable={false}
                      id="product-list-autocomplete"
                      options={modifiedCountriesList}
                      getOptionLabel={(option: any) => option?.view}
                      onChange={(e, values) => {
                        setLengthError(false);
                        if (values.length > 5) {
                          setLengthError(true);
                          return;
                        }
                        values.forEach((value) => {
                          //   if (
                          //     otherCountriesList.some(
                          //       (item) => item.value === value?.value
                          //     )
                          //   ) {
                          //     setAutocompleteOtherErrors((prevErrors) => {
                          //       const newErrors = [...prevErrors];
                          //       newErrors[index] = true;
                          //       return newErrors;
                          //     });
                          //   } else {
                          //     setAutocompleteOtherErrors((prevErrors) => {
                          //       const newErrors = [...prevErrors];
                          //       newErrors[index] = false;
                          //       return newErrors;
                          //     });
                          //   }
                          //   if (
                          //     !data?.sourcedCountry?.some(
                          //       (item) => item.value === value?.value
                          //     )
                          //   ) {
                          //     // setOtherCountriesList((prev) => {
                          //     //   let countries = [...prev, value];
                          //     //   // countries[index] = value;
                          //     //   return countries;
                          //     // });
                          //     onChangeHandler("sourcedCountry", values, e);
                          //   }
                          //   RemoveValidation(index, "other_source");
                        });
                        onChangeHandler("sourcedCountry", values);
                      }}
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
                      sx={{ width: "100% " }}
                      value={defaultValues}
                      defaultValue={defaultValues}
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
                              label="Sourced From"
                              // error={
                              //   ShowValidation(index, "other_source")?.error
                              // }
                              error={
                                existedError
                                  ? true
                                  : formik?.errors?.caseTwoData &&
                                    defaultValues.length == 0
                                  ? true
                                  : lengthError
                                  ? true
                                  : false
                              }
                              // helperText={
                              //   existedError ? (
                              //     <CommonErrorMessage
                              //       message={"Country already exists"}
                              //     />
                              //   ) : formik?.errors?.caseTwoData &&
                              //     defaultValues.length == 0 ? (
                              //     <CommonErrorMessage
                              //       message={formik?.errors?.caseTwoData}
                              //     />
                              //   ) : (
                              //     " "
                              //   )
                              // }

                              //   helperText={
                              //     ShowValidation(index, "other_source")?.message
                              //   }
                            />
                            {existedError ? (
                              <CommonErrorMessage
                                message={"Country already exists"}
                              />
                            ) : formik?.errors?.caseTwoData &&
                              defaultValues.length == 0 ? (
                              <CommonErrorMessage message="Please select value" />
                            ) : lengthError ? (
                              <CommonErrorMessage message="Maximum Limit has reached." />
                            ) : null}
                          </>
                        );
                      }}
                    />
                  </FormControl>
                </Box>
              </Grid>
            );
          })}
          <Grid item xs={12} sm={12} lg={4} md={3}>
            <Buttonspacing>
             
              {/**condition so the user can delete the newly created clone and limit him so he doesn't delete all the fields.*/}
              {index > 0 && (
                <LightTooltip
                  arrow
                  disableInteractive
                  placement="top"
                  title="Delete"
                >
                  <DeleteButton onClick={() => deleteOtherComponent(index)}>
                    <DeleteOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
                  </DeleteButton>
                </LightTooltip>
              )}
               {index == componentOption.length - 1 &&
                componentOption.length < 5 && (
                  <LightTooltip
                    arrow
                    disableInteractive
                    placement="top"
                    title="Add"
                  >
                    <AddButton
                      disabled={
                        data?.componentName == "" ||
                        data?.sourcedCountry.length < 1
                          ? true
                          : false
                      }
                      sx={{
                        border: `${
                          data?.componentName == "" ||
                          data?.sourcedCountry.length < 1
                            ? "0"
                            : "1px solid #d7282f"
                        }`,
                        backgroundColor: `${
                          data?.componentName == "" ||
                          data?.sourcedCountry.length < 1
                            ? "rgba(0, 0, 0, 0.12)"
                            : ""
                        }`,
                        height:'37.13px !important',
                        "@media screen and (max-width:1600px)":{height:'100% !important'}
                      }}
                      onClick={() => {
                        setLengthError(false);
                        createOtherComponent();
                      }}
                    >
                      <AddOutlinedIcon sx={{ fontSize: "20px" }} />
                    </AddButton>
                  </LightTooltip>
                )}
            </Buttonspacing>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default OtherComponent;
