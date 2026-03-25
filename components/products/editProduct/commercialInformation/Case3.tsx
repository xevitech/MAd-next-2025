import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import useProductContext from "@/hooks/useProductContext";
import CustomAutocompelete from "../../common/autoCompelete";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { useSelector } from "react-redux";
import {
  AddButton,
  BoxHeadingTyp,
  Buttonspacing,
  DeleteButton,
  RegionalBoxSelect,
  ShowHideWithIcon,
  useStyles,
} from "@/components/products/editProduct/commercialInformation/styles";
import CommonErrorMessage from "@/components/common/CommonErrorMessage";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

function Case3({ formik, productDetail }) {
  // const { modifiedCountriesList, territoryData } = useProductContext();
  const { modifiedCountriesList, territoryData } = useSelector(
    (state: any) => state.editProduct
  );
  const [selectedToggle, setSelectedToggle] = useState(null);
  const [multiplePlaceOfOrigin, setMultiplePlaceofOrigin] = useState([1]);
  const [existingState, setExistingState] = useState<any>([]);
  const [autocompleteOtherErrors, setAutocompleteOtherErrors] = useState(
    Array(multiplePlaceOfOrigin?.length).fill(false)
  );
  const [countriesAndTerritory, setCountriesAndTerritory] = useState<any>([
    { status: 1, origin: "", made_in: "", labelValue: "1" },
  ]);
  const { caseThreeData } = formik.values;

  const savedData = productDetail ? productDetail.caseData : null;

  useEffect(() => {
    if (savedData && productDetail?.case_type == "case_3") {
      let Data = JSON.parse(savedData).map((v) => {
        let origin = JSON.parse(v.origin);
        let made_in = JSON.parse(v.made_in);
        if (typeof origin === 'string') {
          origin = JSON.parse(origin); 
        }
        if (typeof made_in === 'string') {
          made_in = JSON.parse(made_in); 
        }
        return {
          ...v,
          origin,
          made_in
        };
      });
      let ValidData = countriesAndTerritory.filter(
        (v) => v.origin && v.made_in.length > 0
      );

      if (ValidData.length == 0) {
        setCountriesAndTerritory(Data);
        setMultiplePlaceofOrigin(Data);
      }
    }
  }, [savedData]);

  const isUnique = (arrToTest) => arrToTest.length !== new Set(arrToTest).size;

  useEffect(() => {
    //TODO: Check for data here also made some changes, check before setting it into formik.
    const data = countriesAndTerritory.filter(
      // (v) => v.made_in.length > 0 && v.origin != ""
      (v) => v.made_in != "" && v.origin != ""
    );

    //TODO: need to look for data setting in here for before setting it to the formik.
    if (countriesAndTerritory.length == 1) {
      let modifiedData = countriesAndTerritory.map((v) => ({
        ...v,
        // made_in: v.made_in.join(","),
        made_in: v.made_in,
      }));
      formik.setFieldValue("caseThreeData", modifiedData);
    }

    //TODO: check here also the data is setting before the data is setting.
    if (data.length > 0) {
      let modifiedData = countriesAndTerritory.map((v) => ({
        ...v,
        // made_in: v.made_in.join(","),
        made_in: v.made_in,
      }));
      formik.setFieldValue("caseThreeData", modifiedData);
    }
  }, [countriesAndTerritory]);

  let ValidData = countriesAndTerritory?.filter((v) => v.origin && v.made_in);
  const RemoveValidation = (i, errorName) => {
    let errorMessage: any = { ...formik.errors.caseThreeData };
    if (errorMessage?.[i]?.[errorName]) {
      errorMessage[i][errorName] = "";
      formik.setFieldError("caseOneData", errorMessage);
    }
  };
  let labelText = (i) => {
    const origin = countriesAndTerritory[i]?.origin;
    const made_in = countriesAndTerritory[i]?.made_in;
  
    const originCountry = [...modifiedCountriesList, ...territoryData].find(
      (item) => item.value === origin?.value && item.type === origin?.type
    );
    const madeInCountry = [...modifiedCountriesList, ...territoryData].find(
      (item) => item.value === made_in?.value && item.type === made_in?.type
    );
  
    return `For <strong>${originCountry?.view ?? ""}</strong> orders product made in <strong>${madeInCountry?.view ?? ""}</strong>.`;
  };
  

  // let labelText = (i) => {
  //   return `For <strong>${[...modifiedCountriesList, ...territoryData].find(
  //     (item) => item.value == countriesAndTerritory[i].origin
  //   )?.view
  //     }</strong> orders product made in <strong>${[...modifiedCountriesList, ...territoryData].find(
  //       (c) => countriesAndTerritory[i].made_in == c.value
  //     )?.view
  //     }</strong>.`;
  // };
  // const LabelShown = countriesAndTerritory.filter(
  //   (v) => v.status == 1 && v.made_in && v.origin
  // );

  const LabelShown = countriesAndTerritory.filter((v) => v.made_in && v.origin);
  const { classes } = useStyles();
  return (
    <Box
      sx={{
        marginTop: "30px",
        "& .MuiTypography-h3": {
          fontSize: "15px",
          color: "#000000",
          fontWeight: "600",
        },
        "& .Case3-addicon": {
          // margin: "-25px 0 0",
          margin: "-17px 0 0",
        },
        "& .AfterErrorStyle": {
          margin: "-17px 0 0",
        },
      }}
    >
      <Grid container spacing={2}>
        {/* <Grid
          item
          sm={6}
          md={6}
          lg={5}
          sx={{ "@media screen and (max-width:600px)": { display: "none" } }}
        >
          <Typography variant="h3">Orders</Typography>
        </Grid>
        <Grid
          item
          sm={6}
          md={6}
          lg={5}
          sx={{ "@media screen and (max-width:600px)": { display: "none" } }}
        >
          <Typography variant="h3">Product Made in</Typography>
        </Grid> */}
        {multiplePlaceOfOrigin.map((v, i) => {
          let defaultValuesForCountry = [
            ...territoryData,
            ...modifiedCountriesList,
          ].find((v) =>{
            if(v?.type == countriesAndTerritory?.[i]?.origin?.type){
              return v.view == countriesAndTerritory?.[i]?.origin?.view
            }
          });
          const defaultCountry = {
            value: defaultValuesForCountry?.value ?? "",
            view: defaultValuesForCountry?.view ?? "",
          };

          let defaultValuesForTerritory = [
            ...territoryData,
            ...modifiedCountriesList,
          ].find((v) => v.value == countriesAndTerritory?.[i]?.made_in?.value);

          // const defaultTerritory = countriesAndTerritory?.[i]?.made_in
          //   ?.map((v) => modifiedCountriesList.filter((c) => countriesAndTerritory?.[i]?.made_in == c.value))
          //   .flat();

          const defaultTerritory = {
            value: defaultValuesForTerritory?.value ?? "",
            view: defaultValuesForTerritory?.view ?? "",
          };

          return (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Grid
                container
                spacing={2}
                sx={
                  {
                    // display: "flex",
                    // alignItems: `${formik?.errors?.caseThreeData?.[i]?.made_in !== ""
                    //   ? "end"
                    //   : "center"
                    //   }`,
                  }
                }
              >
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <RegionalBoxSelect>
                    <Grid
                      container
                      sx={{
                        alignItems: `${formik?.values?.caseThreeData?.[i]?.origin == "" &&
                            formik?.errors?.caseThreeData
                            ? ""
                            : "center"
                          }`,
                      }}
                    >
                      <Grid item xs={12} md={12} lg={12} xl={4}>
                        <BoxHeadingTyp sx={{ textAlign: "left" }}>
                          {" "}
                          <Typography
                            variant="h3"
                            sx={{
                              margin: `${formik?.values?.caseThreeData?.[i]?.origin ==
                                  "" && formik?.errors?.caseThreeData
                                  ? "9px 0 0 0"
                                  : ""
                                }`,
                            }}
                          >
                            For Orders From
                          </Typography>
                        </BoxHeadingTyp>
                      </Grid>
                      <Grid item xs={12} md={12} lg={12} xl={8}>
                        <FormControl sx={{ width: "100%" }} size="small">
                          <Autocomplete
                            size={"small"}
                            slotProps={{
                              popper: {
                                sx: {
                                  zIndex: 9,
                                },
                              },
                            }}
                            ListboxProps={{
                              sx: {
                                padding: "0px 0 8px 0",
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

                                "& .MuiListSubheader-sticky": {
                                  fontWeight: "700",
                                  backgroundColor: "#F4F6FA",
                                  lineHeight: "33px",
                                  top: "0px",
                                },
                              },
                            }}
                            // disableClearable={true}
                            disableClearable={false}
                            id="product-list-autocomplete"
                            groupBy={(option) => option.type}
                            options={[
                              ...territoryData,
                              ...modifiedCountriesList,
                            ]}
                            getOptionLabel={(option: any) => option?.view}
                            onChange={(e, value) => {
                              // if (
                              //   countriesAndTerritory[i] &&
                              //   countriesAndTerritory[i].made_in?.length > 0
                              // ) {
                              // setCountriesAndTerritory((prev) => {
                              //   let countries = [...prev];
                              //   countries[i].made_in = [];
                              //   countries[i].label = "";
                              //   return countries;
                              // });
                              // } else {
                              setCountriesAndTerritory((prev) => {
                                let countries = [...prev];
                                countries[i].origin = value;
                                return countries;
                              });
                              // }
                              // RemoveValidation(i, "origin");
                            }}
                            sx={{
                              width: "100%",
                            }}
                            value={defaultCountry}
                            defaultValue={defaultCountry}
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
                                    placeholder={`Select Territory/Country`}
                                    {...params}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    error={
                                      formik?.errors?.caseThreeData?.[i]
                                        ?.origin ?? ""
                                        ? true
                                        : (formik?.values?.caseThreeData?.[i]
                                          ?.origin == "" || formik?.values?.caseThreeData?.[i]
                                          ?.origin == null) &&
                                          formik?.errors?.caseThreeData
                                          ? true
                                          : false
                                    }
                                  // helperText={
                                  //   formik?.errors?.caseThreeData?.[i]
                                  //     ?.origin ? (
                                  //     formik?.errors?.caseThreeData?.[i]
                                  //       ?.origin
                                  //   ) : formik?.values?.caseThreeData?.[i]
                                  //       ?.origin == "" &&
                                  //     formik?.errors?.caseThreeData ? (
                                  //     <CommonErrorMessage
                                  //       message={
                                  //         formik?.errors?.caseThreeData
                                  //       }
                                  //     />
                                  //   ) : (
                                  //     ""
                                  //   )
                                  // }
                                  />
                                  {formik?.errors?.caseThreeData?.[i]
                                    ?.origin ? (
                                    formik?.errors?.caseThreeData?.[i]?.origin
                                  ) : (formik?.values?.caseThreeData?.[i]
                                    ?.origin == "" || formik?.values?.caseThreeData?.[i]
                                    ?.origin == null) &&
                                    formik?.errors?.caseThreeData ? (
                                    <CommonErrorMessage
                                      message={formik?.errors?.caseThreeData}
                                    />
                                  ) : null}
                                </>
                              );
                            }}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </RegionalBoxSelect>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={5}>
                  <RegionalBoxSelect>
                    <Grid
                      container
                      sx={{
                        alignItems: `${formik?.values?.caseThreeData?.[i]?.made_in == "" &&
                            formik?.errors?.caseThreeData
                            ? ""
                            : "center"
                          }`,
                      }}
                    >
                      <Grid item xs={12} md={12} lg={12} xl={4}>
                        <BoxHeadingTyp>
                          <Typography
                            variant="h3"
                            sx={{
                              margin: `${formik?.values?.caseThreeData?.[i]?.made_in ==
                                  "" && formik?.errors?.caseThreeData
                                  ? "9px 0 0 0"
                                  : ""
                                }`,
                            }}
                          >
                            Product Made in
                          </Typography>
                        </BoxHeadingTyp>
                      </Grid>
                      <Grid item xs={12} md={12} lg={12} xl={8}>
                        <FormControl sx={{ width: "100%" }} size="small">
                          <Autocomplete
                       
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
                                "& .MuiListSubheader-sticky": {
                                  fontWeight: "700",
                                  backgroundColor: "#F4F6FA",
                                  lineHeight: "33px",
                                  top: "-8px",
                                },
                              },
                            }}
                            limitTags={1}
                            size={"small"}
                          
                            disableClearable={false}
                            id="product-list-autocomplete"
                            options={modifiedCountriesList}
                            getOptionLabel={(option: any) => option?.view}
                            groupBy={(option) => option.type}
                            onChange={(e, value: any) => {
                              setCountriesAndTerritory((prev) => {
                                let countries = [...prev];
                                countries[i].made_in = value;
                                countries[i].label = labelText(i);
                                return countries;
                              });
                              
                            }}
                            sx={{ width: "100% " }}
                            // value={countriesAndTerritory[i]?.made_in} 
                            value={defaultTerritory}
                           
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
                                      formik?.errors?.caseThreeData?.[i]
                                        ?.made_in || autocompleteOtherErrors[i]
                                        ? true
                                        : formik?.errors?.caseThreeData &&
                                          (formik?.values?.caseThreeData?.[i]
                                            ?.made_in == "" ||formik?.values?.caseThreeData?.[i]
                                            ?.made_in == null )
                                          ? true
                                          : false
                                    }
                                
                                  />
                                  {formik?.errors?.caseThreeData?.[i]
                                    ?.made_in ? (
                                    formik?.errors?.caseThreeData?.[i]?.made_in
                                  ) : autocompleteOtherErrors[i] ? (
                                    "Country already exists"
                                  ) : formik?.errors?.caseThreeData &&
                                    (formik?.values?.caseThreeData?.[i]
                                      ?.made_in == "" || formik?.values?.caseThreeData?.[i]
                                      ?.made_in == null) ? (
                                    <CommonErrorMessage
                                      message={formik?.errors?.caseThreeData}
                                    />
                                  ) : null}
                                </>
                              );
                            }}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </RegionalBoxSelect>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={3}
                  lg={3}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    "@media screen and (max-width:1200px)": {
                      justifyContent: "normal",
                      margin: "1px 0 0 0",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      // margin: "16px 10px 0",
                      gap: "10px",
                      "@media screen and (max-width:1535px)": {
                        // margin: "35px 0 0",
                        margin: "15px 0 0",
                      },
                      "@media screen and (max-width:1199px)": {
                        margin: "0",
                      },
                    }}
                  // sx={{
                  //   margin: `${
                  //     formik?.values?.caseThreeData?.[i]?.made_in ==
                  //       "" && formik?.errors?.caseThreeData
                  //       ? "9px 0 0 0"
                  //       : ""
                  //   }`,
                  // }}
                  >
                    {defaultValuesForCountry && defaultTerritory && (
                      // <FormControl
                      //   className="lala"
                      //   sx={{
                      //     "&.MuiFormControl-root": {
                      //       flexDirection: "row",
                      //     },
                      //   }}
                      // >
                      //   <RadioGroup
                      //     value={countriesAndTerritory[i]?.status}
                      //     onChange={(e, value) => {
                      //       setCountriesAndTerritory((prev) => {
                      //         let countries = [...prev];
                      //         if (countries?.[i]) {
                      //           countries[i].status = value;
                      //           // countries[i].status = value;
                      //         } else {
                      //           countries.push({
                      //             status: value,
                      //           });
                      //         }
                      //         return countries;
                      //       });
                      //     }}
                      //     row
                      //     sx={{
                      //       "& .MuiFormControlLabel-root": {
                      //         margin: "0 4px 0 0",
                      //         "& .MuiButtonBase-root": {
                      //           padding: "4px",
                      //           "& .MuiSvgIcon-root": {
                      //             fontSize: "16px",
                      //           },
                      //           "&.Mui-checked": {
                      //             color: "#D7282F",
                      //           },
                      //         },
                      //         "& .MuiTypography-body1": {
                      //           fontSize: "13px",
                      //           color: "#1C1C1C",
                      //           fontWeight: "600",
                      //           "@media screen and (min-width: 1200px) and (max-width: 1430px)":
                      //             { fontSize: "10px" },
                      //         },
                      //       },
                      //     }}
                      //   >
                      //     <FormControlLabel
                      //       value="1"
                      //       control={<Radio />}
                      //       label="Show"
                      //     />
                      //     <FormControlLabel
                      //       value="0"
                      //       control={<Radio />}
                      //       label="Hide"
                      //     />
                      //   </RadioGroup>
                      // </FormControl>
                      <ToggleButtonGroup
                        className={classes.toggleBtn}
                        color="primary"
                        size="small"
                        exclusive
                        aria-label="Platform"
                        style={{ height: "25px" }}
                        value={+countriesAndTerritory[i]?.status}
                        sx={{
                          margin: `${formik?.values?.caseThreeData?.[i]?.made_in == "" &&
                              formik?.errors?.caseThreeData
                              ? "-21px 0 0 0"
                              : ""
                            }`,
                        }}
                      >
                        <ToggleButton
                          className="toggleshow"
                          value={countriesAndTerritory[i]?.status == 1 && 1}
                          onClick={(e, value) => {
                            setCountriesAndTerritory((prev) => {
                              let countries = [...prev];
                              if (countries?.[i]) {
                                countries[i].status = 1;
                                // countries[i].status = value;
                              } else {
                                countries.push({
                                  status: 1,
                                });
                              }
                              return countries;
                            });
                          }}
                        >
                          <LightTooltip
                            title={
                              "The Country you have added will be displayed on the Product Detail Page"
                            }
                            placement="top"
                            arrow
                            disableInteractive
                          >
                            <ShowHideWithIcon>
                              {countriesAndTerritory[i]?.status == 1 && (
                                <CheckRoundedIcon />
                              )}
                              Show
                            </ShowHideWithIcon>
                          </LightTooltip>
                        </ToggleButton>
                        <ToggleButton
                          value={countriesAndTerritory[i]?.status == 0 && 0}
                          onClick={(e, value) => {
                            // setSelectedToggle(value)
                            setCountriesAndTerritory((prev) => {
                              let countries = [...prev];
                              if (countries?.[i]) {
                                countries[i].status = 0;
                                // countries[i].status = value;
                              } else {
                                countries.push({
                                  status: 0,
                                });
                              }
                              return countries;
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
                            <ShowHideWithIcon>
                              {countriesAndTerritory[i]?.status == 0 && (
                                <CheckRoundedIcon />
                              )}
                              Hide
                            </ShowHideWithIcon>
                          </LightTooltip>
                        </ToggleButton>
                      </ToggleButtonGroup>
                    )}

{
                      <Buttonspacing
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            // borderLeft: "1px solid #dddddd",
                            // paddingLeft: "8px",
                            "& .MuiSvgIcon-root": {
                              fontSize: "20px",
                              color: "#d7282f",
                              cursor: "pointer",
                              "&:hover": {
                                color: "#b30007",
                              },
                            },
                          }}
                        >
                          <LightTooltip
                            title="Delete"
                            placement="top"
                            arrow
                            disableInteractive
                          >
                            <DeleteButton
                              // disabled={
                              //   multiplePlaceOfOrigin.length !==
                              //   ValidData.length
                              // }
                              className={
                                (formik?.values?.caseThreeData?.[i]?.origin ==
                                  "" &&
                                  formik?.errors?.caseThreeData) ||
                                (formik?.errors?.caseThreeData &&
                                  formik?.values?.caseThreeData?.[i]?.made_in ==
                                    "")
                                  ? "Case3-addicon"
                                  : ""
                              }
                              onClick={(e) => {
                                formik.setFieldError("caseThreeData", "");
                                const removeItemAtIndex = (list) => list.filter((_, index) => index !== i);
                              
                                if (countriesAndTerritory?.length === 1) {
                                  setCountriesAndTerritory([
                                    {
                                      status: 1,
                                      origin: "",
                                      made_in: "",
                                      labelValue: "1",
                                    },
                                  ]);
                                  setMultiplePlaceofOrigin([1]);
                                } else {
                                  setCountriesAndTerritory((prev) => removeItemAtIndex(prev));
                                  setMultiplePlaceofOrigin((prev) => removeItemAtIndex(prev));
                                }
                              }}
                            >
                              <DeleteOutlineIcon />
                            </DeleteButton>
                          </LightTooltip>
                        </Box>
                      </Buttonspacing>
                    }

                    {i + 1 == multiplePlaceOfOrigin.length &&
                      multiplePlaceOfOrigin.length < 5 && (
                        <Buttonspacing
                          sx={{
                            position: "relative",
                            "& .MuiLink-root": {
                              backgroundColor: "#D7282F",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              textDecoration: "none",
                              cursor: "pointer",
                              color: "#ffffff",
                              fontSzie: "14px",
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
                          }}
                        >
                          {" "}
                          <LightTooltip
                            title="Add more countries"
                            placement="top"
                            arrow
                            disableInteractive
                          >
                            <AddButton
                              disabled={
                                multiplePlaceOfOrigin.length !==
                                ValidData.length
                              }
                              className={
                                (formik?.values?.caseThreeData?.[i]?.origin ==
                                  "" &&
                                  formik?.errors?.caseThreeData) ||
                                (formik?.errors?.caseThreeData &&
                                  formik?.values?.caseThreeData?.[i]?.made_in ==
                                    "")
                                  ? "Case3-addicon"
                                  : ""
                              }
                              // variant="contained"
                              size="medium"
                              color="error"
                              sx={{
                                border: `${
                                  multiplePlaceOfOrigin.length !==
                                  ValidData.length
                                    ? "0"
                                    : "1px solid #d7282f"
                                }`,
                                backgroundColor: `${
                                  multiplePlaceOfOrigin.length !==
                                  ValidData.length
                                    ? "rgba(0, 0, 0, 0.12)"
                                    : ""
                                }`,
                              }}
                              onClick={(e) => {
                                formik.setFieldError("caseThreeData", "");
                                setMultiplePlaceofOrigin((prev) => [
                                  ...prev,
                                  1,
                                ]);
                                setCountriesAndTerritory((prev) => [
                                  ...prev,
                                  {
                                    status: "1",
                                    origin: "",
                                    made_in: "",
                                    labelValue: "1",
                                  },
                                ]);
                              }}
                            >
                              <AddIcon />
                            </AddButton>
                          </LightTooltip>
                        </Buttonspacing>
                      )}
                    
                    {/* </Grid> */}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
        {LabelShown.length > 0 && (
          <Box
            paddingLeft={2}
            sx={{
              paddingTop: "12px",
              marginTop: "0px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "14px",
                fontWeight: "700",
                padding: "5px 0 2px",
              }}
            >
              Following label will be displayed on the product detail page.
            </Typography>
            {multiplePlaceOfOrigin.map(
              (v, i) =>
                // countriesAndTerritory?.[i]?.status == "1" &&
                countriesAndTerritory?.[i]?.origin &&
                countriesAndTerritory?.[i]?.made_in && (
                  <Box
                    // paddingLeft={2}
                    sx={{
                      "& .MuiTypography-h6": {
                        fontSize: "14px",
                      },
                    }}
                  >
                    <Typography variant="h6">
                      <div
                        // contentEditable="true"
                        dangerouslySetInnerHTML={{
                          __html: `For <strong>${[...modifiedCountriesList, ...territoryData].find(
                            (item) =>
                              item.value === countriesAndTerritory[i].origin?.value &&
                              item.type === countriesAndTerritory[i].origin?.type &&
                              item.view === countriesAndTerritory[i].origin?.view
                          )?.view ?? ""
                            }</strong> orders product made in <strong>${[...modifiedCountriesList, ...territoryData].find(
                              (item) =>
                                item.value ==
                                countriesAndTerritory[i].made_in?.value &&
                                item.type ==
                                countriesAndTerritory[i].made_in?.type
                            )?.view ?? ""
                            }</strong>.`,
                        }}
                      ></div>
                    </Typography>
                  </Box>
                )
            )}
          </Box>
        )}
      </Grid>
    </Box>
  );
}

export default Case3;
