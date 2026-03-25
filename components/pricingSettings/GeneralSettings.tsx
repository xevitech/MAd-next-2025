import {
  Autocomplete,
  Box,
  FormGroup,
  Grid,
  Skeleton,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { apiClient } from "../common/common";
import { BtnFilled } from "../common/buttons/ButtonsVariations";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import {
  Android12Switch,
  LargeContainer,
  SmallContainer,
  TextfieldStyling,
} from "./style";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSelector } from "react-redux";
import GeneralSettingSkelton from "./Skeleton/GeneralSettingSkelton";

const GeneralSettings = ({ priceDetail, unitList }) => {
  const [unit, setUnit] = useState<any>("");
  const [min_val, setMinValue] = useState<string>("");
  const [min_val_status, setMinValueStatus] = useState<number>(1);
  const [min_qty, setMinQuantity] = useState<string>("");
  const [min_qty_status, setMinQuantityStatus] = useState<number>(1);
  const [unit_status, setUnitStatus] = useState<string>("1");
  const { role } = useSelector((state: any) => state.userData);
  const [loader, setLoader] = useState(false);
  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  const permissions =
    storedSubSellerList && storedSubSellerList.length > 0
      ? storedSubSellerList[0]
      : null;
  useEffect(() => {
    const { unit, min_val, min_qty, min_qty_status, min_val_status } =
      priceDetail;
    setTimeout(() => {
      setUnit(unitList.find((v) => v.name == unit));
      setMinValue(min_val);
      setMinQuantity(min_qty);
      setMinQuantityStatus(min_qty_status);
      setMinValueStatus(min_val_status);
    });
  }, [priceDetail, unitList]);

  console.log("priceDetail===", priceDetail);

  // const SubmitHandler = async ({ priceDetail }) => {
  //   let response = await apiClient("users/set_rules_update", "post", {
  //     body: {
  //       min_val,
  //       min_qty,
  //       unit: unit.name,
  //       min_val_status,
  //       min_qty_status,
  //     },
  //   });
  //   if (response.status == 200) toast.success("Rules updated successfully");
  //   setLoader(false);
  // }
  const SubmitHandler = async ({ priceDetail }) => {
    if(loader)return;
    setLoader(true);
    try {
      let response = await apiClient("users/set_rules_update", "post", {  
        body: {
          min_val,
          min_qty,
          unit: unit.name,
          min_val_status,
          min_qty_status,
        },
      });
      if (response.status == 200) {
        toast.success("Rules updated successfully");
      } else {
        toast.error("Failed to update rules");
      }
    } catch (error) {
      toast.error("An error occurred while updating rules");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {/* {loader ? (
        <GeneralSettingSkelton />
      ) : ( */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box mt={-0.2} mb={0}>
            <LargeContainer sx={{ pb: "3px " }}>Apply Quantity</LargeContainer>
            <SmallContainer>
              Minimum Value / Minimum Qunatity / Unit
            </SmallContainer>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4} mt={-1}>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <FormGroup>
              <FormControlLabel
                control={<Android12Switch />}
                label=""
                checked={min_val_status == 1 ? true : false}
                onChange={(e: any) => {
                  if (e.target.checked) {
                    setMinValueStatus(1);
                  } else {
                    setMinValueStatus(0);
                  }
                }}
              />
            </FormGroup>
          </Box>
          <TextField
            style={{ marginTop: "5px" }}
            size="small"
            sx={TextfieldStyling}
            label="Consider minimum order value"
            placeholder="Enter value"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setMinValue(e.target.value)}
            value={min_val}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4} mt={-1}>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <FormGroup>
              <FormControlLabel
                control={<Android12Switch />}
                label=""
                checked={min_qty_status == 1 ? true : false}
                onChange={(e: any) => {
                  if (e.target.checked) {
                    setMinQuantityStatus(1);
                  } else {
                    setMinQuantityStatus(0);
                  }
                }}
              />
            </FormGroup>
          </Box>
          <TextField
            style={{ marginTop: "5px" }}
            size="small"
            sx={TextfieldStyling}
            label="Consider minimum order quantity"
            placeholder="Enter Quantity"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setMinQuantity(e.target.value)}
            value={min_qty}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4} mt={-1}>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <FormGroup>
              <FormControlLabel
                control={<Android12Switch />}
                label=""
                checked={unit_status == "1" ? true : false}
                onChange={(e: any) => {
                  if (e.target.checked) {
                    setUnitStatus("1");
                  } else {
                    setUnitStatus("0");
                  }
                }}
              />
            </FormGroup>
          </Box>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={TextfieldStyling}
            options={unitList}
            getOptionLabel={(option: any) => option?.name}
            defaultValue={unit}
            value={unit}
            onChange={(event, value) => {
              setUnit(value);
            }}
            renderInput={(params) => (
              <TextField
                style={{ marginTop: "5px" }}
                {...params}
                label="Unit"
                size="small"
                sx={{
                  width: "100%",
                  "& .MuiInputLabel-root": {
                    top: "2px !important",
                  },
                }}
                InputLabelProps={{ shrink: true }}
                placeholder="Unit"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          {(role === "seller" ||
            (role === "subuser" &&
              permissions?.general_settings?.add == true)) && (
            <Box display={"flex"} justifyContent={"flex-end"}>
              <BtnFilled onClick={SubmitHandler}>
                {loader ? (
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
            </Box>
          )}
        </Grid>
      </Grid>
      {/* )} */}
    </>
  );
};

export default GeneralSettings;
