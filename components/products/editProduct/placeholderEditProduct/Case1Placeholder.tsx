import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  Radio,
  RadioGroup,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { getProductId, getUniqueListBy } from "@/components/common/common";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import useProductContext from "@/hooks/useProductContext";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  CommercialCases,
  CSmallHeading,
  SelectToggleBtn,
  ShowHideWithIcon,
  useStyles,
} from "@/components/products/editProduct/commercialInformation/styles";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { useDispatch, useSelector } from "react-redux";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { getTerritory } from "@/hooks/ProductReducers";
import CommonErrorMessage from "@/components/common/CommonErrorMessage";
function Case1Placeholder({
  radioValue,
  setIsOrderQuantity,
  setRadioValue,
  formik,
  multiplePlaceOrigin,
  showHideCountry,
  setShowHideCountry,
  showHideTerritory,
  setShowHideTerritory,
  setMultiplePlaceOrigin,
  multiplePlaceOriginTerritories,
  setMultiplePlaceOriginTerritories,
  productDetail,
  alignment,
  setAlignment,
  selectedCountries,
  setSelectedCountries,
  selectedTerritories,
  setSelectedTerritories,
  selectedOrigin,
  setSelectedOrigin
}) {

  const { territoryData, modifiedCountriesList } = useSelector(
    (state: any) => state.editProduct
  );
  const productId = getProductId();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTerritory());
  }, [productId]);

  const [selectedCountriesK, setselectedCountriesK] = useState<string[]>([]);

  const [autocompleteErrors, setAutocompleteErrors] = useState(
    Array(multiplePlaceOrigin?.length).fill(false)
  );
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  const [dataExist, setDataExist] = useState(false);
  const [componentSourceToggle, setComponentSourceToggle] =
    useState<boolean>(false);
  const { caseOneData, selectedCaseCountry, payment_methods } = formik.values;
  const savedData = productDetail ? productDetail.caseData : null;
  let Data = savedData && JSON?.parse(savedData);
  const [maxError, setMaxError] = useState(false);

  useEffect(() => {
    if (savedData && productDetail?.case_type == "case_1") {
      if (Data?.source_component_toggle == 1) {
        setComponentSourceToggle(true);
      } else {
        setComponentSourceToggle(false);
      }
    }
  }, [savedData]);

  useEffect(() => {
    if (savedData && productDetail?.case_type == "case_1") {
      // if (Data?.source_component_toggle==1) {
      //   setComponentSourceToggle(true);
      // }else{
      //   setComponentSourceToggle(false);
      // }
      if (selectedCountries?.length == 0 && Data?.selection == "country") {
        let countries = Data?.value?.split(",");
        let territories = modifiedCountriesList
          .filter((c) => Data?.value?.split(",").find((v) => v == c.value))
          .map((v) => v.region);
        // setSelectedTerritories(Data?.territory ?? territories);
        setMultiplePlaceOriginTerritories(Data?.territory ?? territories);
        setSelectedCountries(Data?.country ?? countries);
        setMultiplePlaceOrigin(Data?.country ?? countries);
      }
      if (selectedTerritories?.length == 0 && Data?.selection == "territory") {
        // setSelectedTerritories(Data?.territory ?? Data?.value?.split(","));
        setSelectedCountries(Data?.country);
        setMultiplePlaceOrigin(Data?.country);
        setMultiplePlaceOriginTerritories(
          Data?.territory ?? Data?.value?.split(",")
        );
      }
      if (radioValue == "" && Data.labelValue) {
        setRadioValue(Data?.labelValue);
      }
    }
  }, [
    savedData,
    selectedOrigin,
    // selectedCountries,
    // selectedTerritories,
    payment_methods,
  ]);

  useEffect(() => {
    if (savedData) {
      let Data = JSON.parse(savedData);
      if (showHideCountry != Data.show_countries)
        setShowHideCountry(Data?.show_countries ?? 1);
      if (showHideCountry != Data.show_territory)
        setShowHideTerritory(Data?.show_territory ?? 1);
      if (Data?.selection) setSelectedOrigin(Data.selection);
    }
  }, [savedData]);

  let countryLabels = [
    `Made in <strong>${selectedCountries
      ?.filter((v) => v)
      .map((v) => modifiedCountriesList.find((item) => item.value == v)?.view)
      .join(", ")}</strong>.`,
    `Manufactured in <strong>${selectedCountries
      ?.filter((v) => v)
      .map((v) => modifiedCountriesList.find((item) => item.value == v)?.view)
      .join(", ")}</strong> for global Distribution.`,

    `This product is proudly made in <strong>${selectedCountries
      ?.filter((v) => v)
      .map((v) => modifiedCountriesList.find((item) => item.value == v)?.view)
      .join(", ")}</strong>.`,
    `This product is manufactured in <strong>${selectedCountries
      ?.filter((v) => v)
      .map((v) => modifiedCountriesList.find((item) => item.value == v)?.view)
      .join(
        ", "
      )}</strong>, in some cases, be manufactured in alternative locations due to supply chain factors.`,
  ];
  let territoryLabels = [
    `Made in <strong>${selectedTerritories
      ?.filter((v) => v)
      .map((v) => territoryData.find((item) => item.value == v)?.view)
      .join(", ")}</strong>`,
    `Manufactured in <strong>${selectedTerritories
      ?.filter((v) => v)
      .map((v) => territoryData.find((item) => item.value == v)?.view)
      .join(", ")}</strong> for global Distribution.`,
    `This product is proudly made in <strong>${selectedTerritories
      ?.filter((v) => v)
      .map((v) => territoryData.find((item) => item.value == v)?.view)
      .join(", ")}</strong>`,
    `This product is manufactured in <strong>${selectedTerritories
      ?.filter((v) => v)
      .map((v) => territoryData.find((item) => item.value == v)?.view)
      .join(
        ", "
      )}</strong>, in some cases, be manufactured in alternative locations due to supply chain factors.`,
  ];

  let ValidCountryData = selectedCountries?.filter((v) => v);
  let ValidTerritoriesData = selectedTerritories?.filter((v) => v);

  const RemoveValidation = (i) => {
    let errorMessage: any = { ...formik.errors.caseOneData };
    if (!Array.isArray(errorMessage?.value)) {
      errorMessage.value = "";
      formik.setFieldError("caseOneData", errorMessage);
    } else {
      errorMessage.value[i] = "";
      formik.setFieldError("caseOneData", errorMessage);
    }
  };
  const ShowValidation = (i) => {
    let errorMessage: any = { ...formik.errors.caseOneData };
    if (!Array.isArray(errorMessage?.value)) {
      if (errorMessage?.value) {
        return { message: errorMessage.value, error: true };
      } else {
        return { message: "", error: false };
      }
    } else {
      if (errorMessage?.value?.[i]) {
        return { message: errorMessage.value[i], error: true };
      } else {
        return { message: "", error: false };
      }
    }
  };

  useEffect(() => {
    let territoryData = selectedCountries?.map(
      (item) => modifiedCountriesList?.find((v) => item == v?.value)?.region
    );
    setSelectedTerritories(getUniqueListBy(territoryData.filter((v) => v)));
    setMultiplePlaceOriginTerritories(
      getUniqueListBy(territoryData.filter((v) => v))
    );
  }, [selectedCountries]);

  useEffect(() => {
    let territoryData = selectedCountries?.map(
      (item) => modifiedCountriesList?.find((v) => item == v?.value)?.region
    );

    // if (territoryData?.length !== 0) setMultiplePlaceOrigin(getUniqueListBy(territoryData.filter((v) => v)))
  }, [componentSourceToggle]);

  useEffect(() => {
    formik.setFieldValue("caseOneData", {
      ...caseOneData,
      source_component_toggle: componentSourceToggle ? "1" : "0",
    });
  }, [componentSourceToggle]);

  // const onConfirmHandler = (value) => {
  //   setSelectedOrigin(value);
  //   formik.setFieldValue("caseOneData", {
  //     ...caseOneData,
  //     selection: value,
  //     label: radioValue
  //       ? value == "country"
  //         ? countryLabels[+radioValue]
  //         : territoryLabels[+radioValue]
  //       : "",
  //   });
  // };

  useEffect(() => {
    if (showHideCountry == 1) {
      formik.setFieldValue("caseOneData", {
        ...caseOneData,
        label: countryLabels[+radioValue],
        labelValue: radioValue,
      });
    } else if (showHideTerritory == 1) {
      formik.setFieldValue("caseOneData", {
        ...caseOneData,
        label: territoryLabels[+radioValue],
        labelValue: radioValue,
      });
    }

    if (showHideCountry == 0 && showHideTerritory == 0) {
      formik.setFieldValue("caseOneData", {
        ...caseOneData,
        label: "",
        labelValue: "",
      });
    }
  }, [showHideCountry, showHideTerritory, radioValue]);
  const { classes } = useStyles();

  const handleDelete = (defaultValue) => {
    const updated = multiplePlaceOriginTerritories.filter(
      (item) => item != defaultValue?.value
    );

    setSelectedTerritories(updated);
    setMultiplePlaceOriginTerritories(updated);
  };

  const handleShowTerritory = () => {
    setMaxError(false);
    if (showHideCountry == 1) {
      setShowHideCountry(0);
      // setShowHideTerritory(1);
      setSelectedOrigin("territory");
    } else {
      setShowHideTerritory(1);
      setSelectedOrigin("territory");
    }
  };
  const handleShowCountry = () => {
    setMaxError(false);
    if (showHideTerritory == 1) {
      setShowHideCountry(1);
      // setShowHideTerritory(1);
      setSelectedOrigin("country");
    } else {
      setShowHideCountry(1);
      setShowHideTerritory(1);
      setSelectedOrigin("country");
    }
  };

  let defaultCountries =
    selectedCountries?.map((selectedValue) => {
      let foundCountry = modifiedCountriesList.find(
        (country) => country.value === selectedValue
      );
      return {
        value: foundCountry?.value ?? "",
        view: foundCountry?.view ?? "",
      };
    }) || [];

  useEffect(() => {
    formik.setFieldValue("caseOneData", {
      ...caseOneData,
      country: selectedOrigin,
      value: selectedOrigin,
    });

    if (selectedOrigin == "country" || selectedOrigin.length == 0) {
      formik.setFieldValue("caseOneData", {
        ...caseOneData,
        country: [],
        value: [],
      });
    }
  }, [selectedOrigin]);
  return (
    <CommercialCases>
      <Box
        sx={{
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontWeight: "600",
          marginBottom: "10px",
          marginTop: "30px",
          "@media screen and (max-width:600px)": {
            flexWrap: "wrap",
          },
        }}
      >
        <CSmallHeading>Select Country of Origin:</CSmallHeading>
        <SelectToggleBtn
          value={selectedOrigin}
          exclusive
          onChange={(e, value) => {
            if (value) {
              // setValue(value);
              // onConfirmHandler(value);
            }
          }}
          aria-label="Platform"
        >
          {/* <ToggleButton value="country">
           
            <Box>Country</Box>
          </ToggleButton> */}

          {/* {showHideCountry == 0 && (
            <ToggleButton
              value="territory"
              // disabled={selectedCountries.length == 0}
            >
              <LightTooltip
                title={
                  selectedCountries?.length === 0 && "Please select country"
                }
                placement="top"
                arrow
                disableInteractive
              >
                <Box>Territory</Box>
              </LightTooltip>
            </ToggleButton>
          )} */}
        </SelectToggleBtn>
      </Box>

      {/* {selectedOrigin == "country" && ( */}
      <Grid container spacing={2}>
        {/* {multiplePlaceOrigin?.map((v, i) => {
          {/* // let defaultCountries =
          //   selectedCountries?.map((selectedValue) => { */}
        {/* //     let foundCountry = modifiedCountriesList.find(
          //       (country) => country.value === selectedValue
          //     );
          //     return { */}
        {/* //       value: foundCountry?.value ?? "",
          //       view: foundCountry?.view ?? "",
          //     };
          //   }) || [];

          // return ( */}
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          // key={i + 1}
          position={"relative"}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={5}>
              <FormControl fullWidth size="small">
                <Autocomplete
                  disabled={!showHideCountry}
                  size={"small"}
                  multiple
                  // disableClearable={true}
                  disableClearable={false}
                  id="product-list-autocomplete"
                  options={modifiedCountriesList}
                  getOptionLabel={(option: any) => option?.view}
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
                  onChange={(e, values) => {
                    setMaxError(false);
                    formik.setFieldError("caseOneData", "");
                    if (values.length == 0) {
                      if (selectedOrigin == "country") {
                        formik.setFieldValue("caseOneData", {
                          ...caseOneData,
                          country: [],
                          value: [],
                        });
                      }
                    }

                    let lastSelectedValue;
                    if (values.length > selectedCountries.length) {
                      if (values.length > 0) {
                        lastSelectedValue = values[values.length - 1].value;
                      }

                      if (selectedCountries.includes(lastSelectedValue)) {
                        setDataExist(true);
                        return;
                      }
                    }
                    setDataExist(false);
                    if (values.length > 5) {
                      setMaxError(true);
                      return;
                    }
                    setSelectedCountries(values.map((option) => option.value));

                    // values.forEach((option) => {
                    //   const { value } = option;
                    //   let { region } = modifiedCountriesList.find(
                    //     (v) => v.value == value
                    //   );

                    //   if (selectedCountries.includes(value)) {
                    //     setAutocompleteErrors((prevErrors) => {
                    //       const newErrors = [...prevErrors];
                    //       newErrors[i] = true;
                    //       return newErrors;
                    //     });
                    //   } else {
                    //     setAutocompleteErrors((prevErrors) => {
                    //       const newErrors = [...prevErrors];
                    //       newErrors[i] = false;
                    //       return newErrors;
                    //     });
                    //   }
                    //   setTimeout(() => {
                    //     setAutocompleteErrors((prevErrors) => {
                    //       const newErrors = [...prevErrors];
                    //       newErrors[i] = false;
                    //       return newErrors;
                    //     });
                    //   }, 3000);

                    //   if (selectedCountries.includes(value) == false) {
                    //     setSelectedCountries((prev) => {
                    //       let countries = [...prev, value];
                    //       // countries[i] = value;
                    //       return countries;
                    //     });
                    //   }

                    //   radioValue == "" && setRadioValue("0");
                    //   RemoveValidation(i);
                    // });
                  }}
                  sx={{ width: "100% " }}
                  value={defaultCountries}
                  defaultValue={defaultCountries}
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
                          placeholder="Select Country"
                          {...params}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={
                            dataExist ||
                            (formik?.errors?.caseOneData &&
                              selectedCountries.length === 0) ||
                            maxError
                          }
                          // Removed helperText for manual error handling below
                        />

                        {/* Manually render the error messages below */}
                        {dataExist ? (
                          <CommonErrorMessage message="Country already exists" />
                        ) : formik?.errors?.caseOneData &&
                          selectedCountries.length === 0 ? (
                          <CommonErrorMessage message="Please select a value" />
                        ) : maxError ? (
                          <CommonErrorMessage message="Max country selection limit reached!" />
                        ) : null}
                      </>
                    );
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={7}>
              <Box sx={{ display: "flex", gap: "10px", padding: "7px 0" }}>
                {/* {selectedOrigin == "country" && selectedCountries?.length > 0 && ( */}
                <CSmallHeading>Hide/Show The Country</CSmallHeading>
                <ToggleButtonGroup
                  className={classes.toggleBtn}
                  color="primary"
                  size="small"
                  exclusive
                  aria-label="Platform"
                  style={{ height: "25px" }}
                  value={+showHideCountry}
                >
                  <ToggleButton
                    className="toggleshow"
                    value={1}
                    onClick={handleShowCountry}
                  >
                    <LightTooltip
                      title={
                        "The Country you have added will be displayed on the Product Detail Page"
                      }
                      placement="top"
                      arrow
                      disableInteractive
                    >
                      {/* <ShowHideWithIcon><CheckRoundedIcon />Show</ShowHideWithIcon> */}
                      <ShowHideWithIcon>
                        {showHideCountry === 1 && <CheckRoundedIcon />}
                        Show
                      </ShowHideWithIcon>
                    </LightTooltip>
                  </ToggleButton>
                  <ToggleButton
                    value={0}
                    onClick={(e) => {
                      const { country } = formik?.values?.caseOneData;
                      if (country) {
                        if (country?.length == 0) {
                          formik.setFieldError("caseOneData", "Please select value");
                          return;
                        }
                      }
                      setMaxError(false);
                      formik.setFieldError("caseOneData", "");
                      // let value = "territory";
                      setShowHideCountry(0);
                      setSelectedOrigin("territory");
                      // formik.setFieldValue("caseOneData", {
                      //   ...caseOneData,
                      //   selection: "territory",
                      //   label: radioValue
                      //     ? value == "country"
                      //       ? countryLabels[+radioValue]
                      //       : territoryLabels[+radioValue]
                      //     : "",
                      // });
                    }}
                  >
                    <LightTooltip
                      title={
                        "The country you have added will no longer be displayed on Product Detail Page"
                      }
                      placement="top"
                      arrow
                      disableInteractive
                    >
                      {/* <ShowHideWithIcon><CheckRoundedIcon/>Hide</ShowHideWithIcon> */}
                      <ShowHideWithIcon>
                        {showHideCountry === 0 && <CheckRoundedIcon />}
                        Hide
                      </ShowHideWithIcon>
                    </LightTooltip>
                  </ToggleButton>
                </ToggleButtonGroup>
                {/* )} */}
              </Box>
            </Grid>

            {/**
             *
             * TODO: need to rmeove this code
             *
             */}

            {/* {i + 1 == multiplePlaceOrigin.length &&
                multiplePlaceOrigin.length < 5 ? ( */}
            <>
              {/* {i >= 1 && ( */}
              {/* <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "13px",
                          // height: `${autocompleteErrors[i] ? "37px" : ""}`,
                          "& .MuiSvgIcon-root": {
                            fontSize: "20px",
                            color: "#d7282f",
                            cursor: "pointer",
                            "&:hover": {
                              color: "#b30007",
                            },
                          },
                        }}
                        onClick={(e) => {
                          // setMultiplePlaceOrigin((prev) => {
                          //   let list = [...prev];
                          //   list.splice(i, 1);
                          //   return list;
                          // });
                          // setSelectedCountries((prev) => {
                          //   let list = [...prev];
                          //   list.splice(i, 1);
                          //   return list;
                          // });
                          // setAutocompleteErrors([false]);
                        }}
                      >
                        <DeleteOutlineIcon /> Delete
                      </Box> */}
              {/* // )} */}
              {/* <Box
                      sx={{
                        marginLeft: "-2px",
                        position: "relative",
                        display: "flex",
                        height: "35px",
                        margin: "2px 0 0 0",
                        "& .MuiLink-root": {
                          backgroundColor: "#D7282F",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textDecoration: "none",
                          cursor: "pointer",
                          color: "#ffffff",
                          fontSize: "14px",
                          fontWeight: "600",
                          height: "37px",
                          borderRadius: "0 4px 4px 0",
                          padding: "0 12px",
                          "& .MuiSvgIcon-root": {
                            fontSize: "22px",
                          },
                          "&:hover": {
                            backgroundColor: "#e5484e",
                          },
                        },
                        "& .MuiButtonBase-root": {
                          borderRadius: "4px",
                          "&.Mui-disabled": {
                            backgroundColor: "#E0E0E0",
                          },
                        },
                      }}
                    > */}
              {/* <LightTooltip
                        title="Add more countries"
                        placement="top"
                        arrow
                        disableInteractive
                      >
                        <Button
                          disabled={
                            selectedCountries.length == 0 ? true : false
                          }
                          variant="contained"
                          size="medium"
                          color="error"
                          sx={{
                            "& .MuiSvgIcon-root": { fontSize: "20px" },
                          }}
                          onClick={(e) => {
                            {
                              setMultiplePlaceOrigin((prev) => [...prev, 1]);
                              setSelectedCountries((prev) => [...prev, ""]);
                              setIsOrderQuantity(true);
                            }
                          }}
                        >
                          <AddIcon />
                        </Button>
                      </LightTooltip> */}
              {/* </Box> */}
            </>
            {/* // ) : ( */}
            {/* <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      borderLeft: "1px solid #dddddd",
                      paddingLeft: "8px",
                      marginLeft: "16px",
                      width: "94px",
                      "& .MuiSvgIcon-root": {
                        fontSize: "20px",
                        color: "#d7282f",
                        cursor: "pointer",
                        "&:hover": {
                          color: "#b30007",
                        },
                      },
                      "@media screen and (max-width:600px)": {
                        position: "absolute",
                        right: "-74px",
                        borderLeft: "none",
                        top: "23px",
                        "& .MuiTypography-root": {
                          display: "none",
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        "@media screen and (max-width:600px)": {
                          height: "24px",
                          width: "24px",
                          borderRadius: "50%",
                          backgroundColor: "rgb(255, 209, 211)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          "& .MuiSvgIcon-root": {
                            fontSize: "15px !important",
                          },
                        },
                      }}
                      onClick={(e) => {
                        // setMultiplePlaceOrigin((prev) => {
                        //   let list = [...prev];
                        //   list.splice(i, 1);
                        //   return list;
                        // });
                        // setSelectedCountries((prev) => {
                        //   let list = [...prev];
                        //   list.splice(i, 1);
                        //   return list;
                        // });
                        // setIsOrderQuantity(true);
                      }}
                    >
                      <DeleteOutlineIcon />
                      <Typography sx={{ fontSize: "13px" }}>Delete</Typography>
                    </Box>
                  </Box> */}
            {/* // )} */}

            {/**code for the renewal ends here */}
          </Grid>
        </Grid>
        {/* // ); */}
        {/* })} */}
      </Grid>

      {/* )} */}

      {showHideCountry == 0 && selectedCountries?.length !== 0 && (
        <>
          <Grid md={5} m={1}>
            <Box>
              <Typography fontSize={"13px"} fontWeight={500} color={"#000"}>
                {/* To add more territory, select a country, and the territory
                will be fetched automatically. */}
                You have chosen to hide country, now territory will be shown as
                product origin place
              </Typography>
            </Box>
          </Grid>

          <Grid container spacing={2}>
            {/* {multiplePlaceOriginTerritories?.map((v, i) => {
              let defaultValues = [...territoryData].find(
                (v) => v.value == selectedTerritories?.[i]
              );

              return ( */}
            <>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                // key={i + 1}
                alignItems={"center"}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={5}>
                    <FormControl sx={{ width: "100%" }} size="small">
                      {/* <TextField
                          value={defaultValues?.view}
                          size="small"
                          disabled
                        // sx={{
                        //   '& .MuiOutlinedInput-notchedOutline': {
                        //     border: '1px solid #000',
                        //     '&:focus-visible': {
                        //       border: '1px solid #000',
                        //     },
                        //   },
                        // }}
                        /> */}
                      <Box
                        sx={{
                          border: "1px solid #0000004a",
                          // width: "441px",
                          height: "37px",
                          padding: "18px 14px",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          gap: "2px",
                          ...(showHideTerritory
                            ? {}
                            : {
                                opacity: 0.6, // Reduced opacity for a disabled look
                                pointerEvents: "none", // Disable interactions
                                backgroundColor: "#f5f5f5", // Light background color
                              }),
                        }}
                      >
                        {/* <Typography sx={{ fontSize: "14px" }}> */}{" "}
                        {multiplePlaceOriginTerritories?.map((v, i) => {
                          let defaultValues = [...territoryData].find(
                            (v) => v.value == selectedTerritories?.[i]
                          );

                          return (
                            <Chip
                              key={defaultValues?.value}
                              label={defaultValues?.view}
                              // onDelete={() => handleDelete(defaultValues)}
                              size="small"
                            />
                          );
                        })}
                        {/* <Chip
                              label="Deletable"
                              onDelete={handleDelete}
                              size="small"
                            />
                            <Chip
                              label="Deletable"
                              onDelete={handleDelete}
                              size="small"
                            /> */}
                        {/* </Typography> */}
                      </Box>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        padding: "7px 0",
                      }}
                    >
                      <CSmallHeading>Hide/Show The Territory</CSmallHeading>
                      {/* {selectedOrigin == "country" && selectedCountries?.length > 0 && ( */}
                      {/* <ToggleButtonGroup
                        className={classes.toggleBtn}
                        color="primary"
                        size="small"
                        exclusive
                        aria-label="Platform"
                        style={{ height: "25px" }}
                        value={+showHideCountry}
                      >
                        <ToggleButton value={1} onClick={(e) => setShowHideCountry(1)}>
                          <LightTooltip
                            title={
                              "The Country you have added will be displayed on the Product Detail Page"
                            }
                            placement="top"
                            arrow
                            disableInteractive
                          >
                            <Box>Show</Box>
                          </LightTooltip>
                        </ToggleButton>
                        <ToggleButton
                          value={0}
                          onClick={(e) => {
                            let value = "territory";
                            setShowHideCountry(0);
                            setSelectedOrigin("territory");
                            formik.setFieldValue("caseOneData", {
                              ...caseOneData,
                              selection: "territory",
                              label: radioValue
                                ? value == "country"
                                  ? countryLabels[+radioValue]
                                  : territoryLabels[+radioValue]
                                : "",
                            });
                          }}
                        >
                          <LightTooltip
                            title={
                              "The country you have added will no longer be displayed on Product Detail Page"
                            }
                            placement="top"
                            arrow
                            disableInteractive
                          >
                            <Box>Hide</Box>
                          </LightTooltip>
                        </ToggleButton>
                      </ToggleButtonGroup> */}
                      {/* )} */}
                      {/* {selectedOrigin == "territory" && ( */}
                      <ToggleButtonGroup
                        className={classes.toggleBtn}
                        color="primary"
                        size="small"
                        exclusive
                        aria-label="Platform"
                        style={{ height: "25px" }}
                        value={+showHideTerritory}
                      >
                        {/* <ToggleButton value={1} onClick={(e) => setShowHideTerritory(1)}> */}
                        <ToggleButton value={1} onClick={handleShowTerritory}>
                          <LightTooltip
                            title={
                              "The territory you have added will be displayed on Product Detail Page"
                            }
                            placement="top"
                            arrow
                            disableInteractive
                          >
                            {/* <Box>Show</Box> */}
                            <ShowHideWithIcon>
                              {showHideTerritory === 1 && <CheckRoundedIcon />}
                              Show
                            </ShowHideWithIcon>
                          </LightTooltip>
                        </ToggleButton>
                        <ToggleButton
                          value={0}
                          onClick={(e: any) => {
                            setMaxError(false);
                            formik.setFieldError("caseOneData", "");
                            if (showHideCountry == 0) {
                              formik.setFieldValue("caseOneData", {
                                ...caseOneData,
                                label: "",
                                labelValue: "",
                              });
                              setRadioValue("");
                            }
                            setShowHideTerritory(0);
                            setSelectedOrigin("territory");
                          }}
                        >
                          <LightTooltip
                            title={
                              "The territory you have added will no longer be displayed on Product Detail Page"
                            }
                            placement="top"
                            arrow
                            disableInteractive
                          >
                            {/* <Box>Hide</Box> */}
                            <ShowHideWithIcon>
                              {showHideTerritory === 0 && <CheckRoundedIcon />}
                              Hide
                            </ShowHideWithIcon>
                          </LightTooltip>
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </>
            {/* //   );
            // }
            // )
            // } */}
          </Grid>
          <Typography
            fontSize={"11px"}
            fontWeight={400}
            sx={{
              color: "#727272",
              // lineHeight: "24px",
              // letterSpacing: "0.09px",
            }}
          >
            Territory will be automatically fetched corresponding to the country
            you selected.
          </Typography>
        </>
      )}

      {selectedCountries?.length > 0 &&
        selectedOrigin == "country" &&
        (showHideCountry == 1 || showHideTerritory == 1) && (
          <Box
            sx={{
              borderTop: "1px solid #dddddd",
              paddingTop: "12px",
              marginTop: "20px",
              paddingLeft: "5px",
            }}
          >
            <Typography
              fontSize={"14px"}
              fontWeight={600}
              color={"#000"}
              mb={1}
            >
              The selected label will be displayed on the product detail page.
            </Typography>
            <FormControl>
              <RadioGroup
                value={radioValue}
                onChange={(e, value) => {
                  setRadioValue(value);
                  formik.setFieldValue("caseOneData", {
                    ...caseOneData,
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
                      dangerouslySetInnerHTML={{
                        __html: `${countryLabels[0]}`,
                      }}
                    ></div>
                  }
                  name={countryLabels[0]}
                />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${countryLabels[1]}`,
                      }}
                    ></div>
                  }
                  name={countryLabels[1]}
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${countryLabels[2]}`,
                      }}
                    ></div>
                  }
                  name={countryLabels[2]}
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${countryLabels[3]}`,
                      }}
                    ></div>
                  }
                  name={countryLabels[3]}
                />
              </RadioGroup>
            </FormControl>
          </Box>
        )}
      {selectedTerritories?.length > 0 &&
        selectedOrigin == "territory" &&
        showHideTerritory == 1 &&
        showHideCountry == 0 && (
          <Box
            sx={{
              borderTop: "1px solid #dddddd",
              paddingTop: "12px",
              marginTop: "20px",
              paddingLeft: "5px",
            }}
          >
            <Typography
              fontSize={"14px"}
              fontWeight={600}
              mb={1}
              color={"#000"}
            >
              The selected label for territory will be displayed on Product
              detail page
            </Typography>
            <FormControl>
              <RadioGroup
                value={radioValue}
                onChange={(e, value) => {
                  setRadioValue(value);
                  formik.setFieldValue("caseOneData", {
                    ...caseOneData,
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
                  value={"0"}
                  control={<Radio />}
                  label={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${territoryLabels[0]}`,
                      }}
                    ></div>
                  }
                  name={territoryLabels[0]}
                />
                <FormControlLabel
                  value={"1"}
                  control={<Radio />}
                  label={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${territoryLabels[1]}`,
                      }}
                    ></div>
                  }
                  name={territoryLabels[1]}
                />
                <FormControlLabel
                  value={"2"}
                  control={<Radio />}
                  label={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${territoryLabels[2]}`,
                      }}
                    ></div>
                  }
                  name={territoryLabels[2]}
                />
                <FormControlLabel
                  value={"3"}
                  control={<Radio />}
                  label={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${territoryLabels[3]}`,
                      }}
                    ></div>
                  }
                  name={territoryLabels[3]}
                />
              </RadioGroup>
            </FormControl>
          </Box>
        )}
       {formik?.errors?.caseOneData && caseOneData?.labelValue == "" && caseOneData?.country.length != 0 && (showHideCountry == 1 || showHideTerritory == 1) ? (
        <CommonErrorMessage message={"Please select value"} />
      ) : null}
      {showHideCountry == 0 && showHideTerritory == 0 && (
        <Typography
          fontSize={"12px"}
          fontWeight={800}
          mt={2}
          sx={{ color: "rgb(215, 40, 47)" }}
        >
          Country/Territory information is hidden on product detail page. You
          can select another case to show information on product detail page{" "}
          <Link
            style={{ cursor: "pointer" }}
            onClick={() => setAlignment("case_2")}
          >
            Click here
          </Link>
        </Typography>
      )}
      {selectedCountries?.length > 0 && (
        <Box
          sx={{
            margin: "6px 0px 6px 2px",
            padding: "6px 0 0 0",
            borderTop: "1px solid #dddddd",
          }}
        >
          {/* <FormGroup> */}
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: "20px",
                  },
                  "&.Mui-checked": {
                    color: "#d7282f",
                  },
                }}
                checked={componentSourceToggle}
                onChange={(e) => setComponentSourceToggle(e.target.checked)}
              />
            }
            label={
              <Typography
                sx={{ fontSize: "14px", color: "#1c1c1c", fontWeight: "400" }}
              >
                Please note that some components of this product may be sourced
                from other countries.
              </Typography>
            }
          />
          {/* </FormGroup> */}
        </Box>
      )}
    </CommercialCases>
  );
}

export default Case1Placeholder;
