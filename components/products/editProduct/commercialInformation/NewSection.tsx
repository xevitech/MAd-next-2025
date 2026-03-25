import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
// import useProductContext from "@/hooks/useProductContext";
import {
  StyledRadio,
  useStyles,
} from "@/components/products/editProduct/commercialInformation/styles";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { useSelector } from "react-redux";
import CommonErrorMessage from "@/components/common/CommonErrorMessage";
function NewSection({
  formik,
  productDetail,
  availableRest = null,
  setAvailabelRest = null,
  availableManuf = null,
  setAvailabelManuf = null,
}) {
  // const { modifiedCountriesList, territoryData } = useProductContext();
  const { modifiedCountriesList, territoryData } = useSelector(
    (state: any) => state.editProduct
  );
  const [availableSelectedValue, setAvaliableSelectedValue] = useState("");
  const [manufacturerleSelectedValue, setManufacturerSelectedValue] =
    useState("");
  const [multipleAvaliblity, setMultipleAvaliblity] = useState([1]);
  const [multipleManufacturer, setMultipleManufacturer] = useState([1]);
  const [multipleManufacturerCountries, setMultipleManufacturerCountries] =
    useState<any>([]);
  const [multipleAvaliblityCountries, setMultipleAvaliblityCountries] =
    useState<any>([]);
  const [availabilityStateMent, setAvailabilityStatement] =
    useState<any>(false);
  const [manufacturerStateMent, setManufacturerStatement] =
    useState<any>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (
      multipleManufacturerCountries.length == 0 &&
      productDetail.manufacturing_restrictions_country
    ) {
      setMultipleManufacturerCountries(
        productDetail.manufacturing_restrictions_country.split(",")
      );
      // setMultipleManufacturer(
      //   productDetail.manufacturing_restrictions_country.split(",")
      // );
    }
    if (
      multipleAvaliblityCountries.length == 0 &&
      productDetail.available_restrictions_country
    ) {
      setMultipleAvaliblityCountries(
        productDetail.available_restrictions_country.split(",")
      );
      // setMultipleAvaliblity(
      //   productDetail.available_restrictions_country.split(",")
      // );
    }
    setAvaliableSelectedValue(
      productDetail?.available_restrictions_availibility
    );
    setManufacturerSelectedValue(
      productDetail?.manufacturing_restrictions_availibility
    );
    setAvailabilityStatement(
      productDetail?.available_restrictions_status == "1" ? true : false
    );
    setManufacturerStatement(
      productDetail?.manufacturing_restrictions_status == "1" ? true : false
    );
    productDetail?.shiping_restrictions_toggle !== null
      ? setToggle(
          +productDetail?.shiping_restrictions_toggle == 1 ? true : false
        )
      : setToggle(false);
  }, [productDetail]);

  useEffect(() => {
    let Data = {
      available_restrictions_status: availabilityStateMent,
      available_restrictions_availibility: availableSelectedValue,
      available_restrictions_country: multipleAvaliblityCountries.join(","),
      manufacturing_restrictions_status: manufacturerStateMent,
      manufacturing_restrictions_availibility: manufacturerleSelectedValue,
      manufacturing_restrictions_country:
        multipleManufacturerCountries.join(","),
      shiping_restrictions_toggle: toggle == true ? 1 : 0,
    };
    formik.setFieldValue("restrictions", Data);
  }, [
    availabilityStateMent,
    availableSelectedValue,
    multipleAvaliblityCountries,
    manufacturerStateMent,
    manufacturerleSelectedValue,
    multipleManufacturerCountries,
    toggle,
  ]);

  const { classes } = useStyles();
  return (
    <Box
      sx={{
        // borderTop: "1px solid rgb(187, 187, 187)",
        // marginTop: "20px",
        // paddingTop: "16px",
        // borderTop: "1px solid rgb(187, 187, 187)",
        // marginTop: "20px",
        // paddingTop: "16px",
        // paddingBottom: "16px",
        "& .MuiTypography-h6": {
          fontSize: "16px",
          fontWeight: "600",
          marginBottom: "8px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#000",
            margin: "0 0 12px 0",
            "@media screen and (max-width:600px)": { fontSize: "14px" },
          }}
        >
          Product availability or manufacturing restrictions
        </Typography>
      </Box>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xl={6} lg={6} md={6} xs={12} sm={12}>
          <Box
            sx={{
              // margin: "0 0 12px 0",
              // height: "100%",
              display: "flex",
              flexDirection: "column",
              // justifyContent: "space-between",
              margin: "0 0 12px 0",
              height: "100%",
              gap: "12px",
            }}
          >
            <Box
              sx={{
                fontSize: "14px",
                color: "#000000",
                // marginBottom: "15px",
                display: "flex",
                "@media screen and (max-width:1200px)": {
                  flexWrap: "wrap",
                  fontSize: "13px",
                },
                "@media screen and (min-width:1024px) and (max-width:1132px)": {
                  minHeight: "38px",
                  alignItems:"start"
                },
                "& .sellTxt": {
                  padding: "0 4px",
                  fontWeight: "600",
                },
                "& .MuiButtonBase-root": {
                  "&.Mui-checked": {
                    color: "#d7282f",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "20px",
                  },
                },
               
              }}
            >
              <Checkbox
                checked={availabilityStateMent}
                onChange={(e) => {
                  setAvailabilityStatement(e.target.checked);
                  if (e.target.checked) {
                    setAvaliableSelectedValue("is");
                  } else {
                    setAvaliableSelectedValue("");
                    setAvailabelRest(false);
                  }
                }}
                sx={{
                  "& .MuiButtonBase-root-MuiCheckbox-root": {
                    padding: "0px",
                  },
                  padding: "0px 4px 0px 0",
                }}
              />
              This product
              <StyledRadio
                checked={availableSelectedValue == "is"}
                onChange={(e, value: any) => setAvaliableSelectedValue("is")}
                value="is"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
                sx={{ padding: "0 4px 0px 4px" }}
              />
              is
              <StyledRadio
                checked={availableSelectedValue == "isn't"}
                onChange={(e, value: any) => setAvaliableSelectedValue("isn't")}
                value="isn't"
                name="radio-buttons"
                inputProps={{ "aria-label": "B" }}
                sx={{ padding: "0 4px 0px 4px" }}
              />
              isn't {/* available to sell{" "} */}
              <Box style={{ marginLeft: "3px", fontWeight: "600" }}>
                available to sell{" "}
                <Box component={"span"} sx={{ fontWeight: "400" }}>
                  {" "}
                  in the following
                </Box>
              </Box>
            </Box>
            <Grid container spacing={2} sx={{}}>
              {multipleAvaliblity.map((v, i) => (
                <Grid item md={12} xs={12} key={i}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <FormControl sx={{ width: "100%" }} size="small">
                      <Autocomplete
                        slotProps={{
                          popper: {
                            sx: {
                              zIndex: 10,
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
                        fullWidth
                        limitTags={1}
                        size="small"
                        multiple
                        id="tags-standard"
                        options={[...territoryData, ...modifiedCountriesList]}
                        groupBy={(option) => option?.type}
                        getOptionLabel={(option) => option?.view}
                        value={multipleAvaliblityCountries.map((v) =>
                          [...territoryData, ...modifiedCountriesList].find(
                            (i) => {
                              if(i?.value == v){
                                return i?.value == v
                              }else if(i?.region == v){
                                return i?.region == v
                              }
                            }
                          )
                        )}
                        onChange={(e, value: any) => {
                          setAvailabelRest(false);
                          const newValue = value.map((item) => item?.value);
                          setMultipleAvaliblityCountries(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Territory/Country"
                            placeholder="Territory/Country"
                            error={availableRest ? true : false}
                            helperText={
                              availableRest ? "Please select value" : ""
                            }
                          />
                        )}
                      />
                    </FormControl>
                  </Box>
                  {availableSelectedValue &&
                    multipleAvaliblityCountries.length > 0 && (
                      <Box sx={{ marginTop: "8px" }}>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "400",
                            color: "#000",
                          }}
                        >
                          This product {`${availableSelectedValue} `}
                          <span
                            style={{ fontWeight: "600", marginLeft: "1px" }}
                          >
                            available to sell
                          </span>{" "}
                          in the{" "}
                          {multipleAvaliblityCountries
                            ?.map(
                              (v) =>
                                [
                                  ...territoryData,
                                  ...modifiedCountriesList,
                                ]?.find((i) => {
                                  if(i?.value == v){
                                    return i?.value == v
                                  }else if(i?.region == v){
                                    return i?.region == v
                                  }
                                })?.view
                            )
                            ?.join(",  ")}
                        </Typography>
                      </Box>
                    )}
                </Grid>
              ))}
              {/* <Grid item md={12} mt={-2}>
              <Box
                sx={{
                  "& hr": {
                    margin: "12px 0 16px",
                    border: "0",
                    height: "1px",
                    backgroundColor: "#dddddd",
                  },
                }}
              >
                <hr />
              </Box>
            </Grid> */}
            </Grid>
          </Box>
        </Grid>
        <Grid item xl={6} lg={6} md={6} xs={12} sm={12}>
          <Box
            sx={{
              // borderBottom: "1px solid #ddd",
              // margin: "0 0 12px 0",
              // padding: "0 0 12px 0",
              // height: "100%",
              display: "flex",
              flexDirection: "column",
              // justifyContent: "space-between",
              margin: "0 0 12px 0",
              height: "100%",
              gap: "12px",
            }}
          >
            <Box
              sx={{
                fontSize: "14px",
                color: "#000000",
                // marginBottom: "15px",
                display: "flex",
                "@media screen and (max-width:1200px)": {
                  flexWrap: "wrap",
                  fontSize: "13px",
                },
                "& .sellTxt": {
                  padding: "0 4px",
                  fontWeight: "600",
                },
                "& .MuiButtonBase-root": {
                  "&.Mui-checked": {
                    color: "#d7282f",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "20px",
                  },
                },
              }}
            >
              <Checkbox
                checked={manufacturerStateMent}
                onChange={(e) => {
                  setManufacturerStatement(e.target.checked);

                  if (e.target.checked) {
                    setManufacturerSelectedValue("is");
                  } else {
                    setManufacturerSelectedValue("");
                    setAvailabelManuf(false);
                  }
                }}
                sx={{
                  "& .MuiButtonBase-root-MuiCheckbox-root": {
                    padding: "0px",
                  },
                  padding: "0px 4px",
                }}
              />
              This product
              <StyledRadio
                checked={manufacturerleSelectedValue === "is"}
                onChange={(e, value: any) => setManufacturerSelectedValue("is")}
                value="is"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
                sx={{ padding: "0px 4px" }}
              />
              is
              <StyledRadio
                checked={manufacturerleSelectedValue === "isn't"}
                onChange={(e, value: any) =>
                  setManufacturerSelectedValue("isn't")
                }
                value="isn't"
                name="radio-buttons"
                inputProps={{ "aria-label": "B" }}
                sx={{ padding: "0px 4px" }}
              />
              isn't{" "}
              <span className="sellTxt" style={{ marginLeft: "3px" }}>
                manufactured
              </span>{" "}
              for the following
            </Box>
            <Grid container spacing={2} sx={{}}>
              {multipleManufacturer.map((v, i) => (
                <Grid item md={12} xs={12} key={i}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <FormControl sx={{ width: "100%" }} size="small">
                      {[...territoryData, ...modifiedCountriesList].length >
                        0 && (
                        <Autocomplete
                          size="small"
                          slotProps={{
                            popper: {
                              sx: {
                                zIndex: 10,
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
                          limitTags={1}
                          multiple
                          id="tags-standard"
                          options={[...territoryData, ...modifiedCountriesList]}
                          getOptionLabel={(option) => option?.view}
                          groupBy={(option) => option.type}
                          value={
                            multipleManufacturerCountries?.map((v) =>
                              [...territoryData, ...modifiedCountriesList].find(
                                (i) => {
                                  if(i?.value == v){
                                    return i?.value == v
                                  }else if(i?.region == v){
                                    return i?.region == v
                                  }
                                }
                              )
                            ) ?? { view: "", value: "" }
                          }
                          onChange={(e, value: any) => {
                            setAvailabelManuf(false);
                            setMultipleManufacturerCountries(
                              value.map((v) => v?.value)
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Territory/Country"
                              placeholder="Territory/Country"
                              error={availableManuf ? true : false}
                              helperText={
                                availableManuf ? "Please select value" : ""
                              }
                            />
                          )}
                        />
                      )}
                    </FormControl>
                  </Box>
                  {manufacturerleSelectedValue &&
                    multipleManufacturerCountries.length > 0 && (
                      <Box sx={{ marginTop: "8px" }}>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "400",
                            color: "#000",
                          }}
                        >
                          This product {`${manufacturerleSelectedValue} `}
                          <span
                            style={{ fontWeight: "600", marginLeft: "1px" }}
                          >
                            {" "}
                            manufactured
                          </span>{" "}
                          for the{" "}
                          {multipleManufacturerCountries
                            ?.map(
                              (v) =>
                                [
                                  ...territoryData,
                                  ...modifiedCountriesList,
                                ]?.find((i) => {
                                  if(i?.value == v){
                                    return i?.value == v
                                  }else if(i?.region == v){
                                    return i?.region == v
                                  }
                                })?.view
                            )
                            ?.join(",  ")}
                        </Typography>
                      </Box>
                    )}
                </Grid>
              ))}
              {/* <Grid item md={12} mt={-2}>
              <Box
                sx={{
                  "& hr": {
                    margin: "12px 0 16px",
                    border: "0",
                    height: "1px",
                    backgroundColor: "#dddddd",
                  },
                }}
              >
                <hr />
              </Box>
            </Grid> */}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          marginTop: "8px",
        }}
      >
        <Box sx={{ margin: "2px 0px 0 0px" }}>
          <FormGroup>
            {/* {checked ? (
              <LightTooltip title="Show" open={checked} placement="top" arrow>
                <FormControlLabel
                  sx={{
                    "&.MuiFormControlLabel-root": {
                      marginRight: "0px",
                      marginLeft: "0px",
                    },
                  }}
                  control={
                    <Checkbox
                      sx={{
                        "&.Mui-checked": {
                          color: "#d7282f",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: "19px",
                        },
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                        padding: "0px",
                      }}
                      checked={checked}
                      onChange={(e) => setChecked(e.target.checked)}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#231f20",
                        "@media screen and (max-width:480px)": {
                          fontSize: "12px",
                        },
                      }}
                    />
                  }
                />
              </LightTooltip>
            ) :  */}
            {/* ( */}
            <LightTooltip
              title={toggle ? "Hide" : "Show"}
              placement="top"
              arrow
            >
              <FormControlLabel
                sx={{
                  "&.MuiFormControlLabel-root": {
                    marginRight: "0px",
                    marginLeft: "0px",
                  },
                }}
                control={
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "#d7282f",
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: "19px",
                      },
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                      padding: "0px",
                    }}
                    checked={toggle}
                    onChange={(e) => {
                      setToggle(e.target.checked);
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#231f20",
                      "@media screen and (max-width:480px)": {
                        fontSize: "12px",
                      },
                    }}
                  />
                }
              />
            </LightTooltip>
            {/* )} */}
          </FormGroup>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: "14px", fontWeight: "600", color: "#000" }}
          >
            Please contact us for shipping restrictions to your specific
            location.
          </Typography>
        </Box>

        {/* <Box
          sx={{
            "& .MuiToggleButtonGroup-root": {
              height: "22px",
              "& .MuiButtonBase-root": {
                fontSize: "10px",
              },
            },
          }}
        >
          <ToggleButtonGroup
            className={classes.toggleBtn}
            color="primary"
            size="small"
            exclusive
            aria-label="Platform"
            value={toggle}
          >
            <ToggleButton value={1} onClick={(e) => setToggle(1)}>
              Show
            </ToggleButton>
            <ToggleButton value={0} onClick={(e) => setToggle(0)}>
              Hide
            </ToggleButton>
          </ToggleButtonGroup>
        </Box> */}
      </Box>
    </Box>
  );
}

export default NewSection;
