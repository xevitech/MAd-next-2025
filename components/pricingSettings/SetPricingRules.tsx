import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomDatePicker } from "../common/datePicker";
import CountrySelect from "../common/countrydropdown/Index";
import { GetCurrentPlan, apiClient, countryDetail } from "../common/common";
import * as Yup from "yup";
import { BtnFilled } from "../common/buttons/ButtonsVariations";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SetRules from "./setRuleSkeleton";
import DeleteDialog from "../common/DeleteAlert/DeleteDialog";
import {
  BoxRuleInner,
  BoxRuletext,
  ChipBox,
  ChipStyle,
  DatePickerBox,
  IconClose,
  PlusIcon,
  SelectCondition,
  SelectConditionBox,
  menuList,
} from "./style";
import PlanAlertDialog from "../common/DeleteAlert/PlanAlert";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const SetPricingRules = ({ priceDetail }) => {
  const [loader, setLoader] = useState<boolean>(false);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const LargeContainer = styled(Typography)({
    fontFamily: "open sans",
    fontSize: "16px",
    fontWeight: "600",
    color: "#A44044",

    padding: "12px 0 3px",
  });
  const SmallContainer = styled(Typography)({
    fontFamily: "open sans",
    fontSize: "12px",
    fontWeight: "400",
  });
  const RuleText = styled(Typography)({
    fontFamily: "open sans",
    fontSize: "13px",
    fontWeight: "600",

    /*** after makestyle ***/
    height: "auto",
    content: "''",
    display: "block",
    marginTop: 0,
    background: "white",
    top: "-9px",
    padding: "0 9px",
  });

  const validation = Yup.object().shape({
    rules: Yup.array().of(
      Yup.object().shape({
        rule: Yup.object().required("Please select rule"),
      })
    ),
  });

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [hiddenAnchorEl, setHiddenAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);
  const [country, setCountry] = React.useState<string>("");
  const [showskeleton, setShowSkeleton] = useState<boolean>(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [hiddenCountry, setHiddenCountry] = React.useState<string>("");
  const [ruleList, setRuleList] = React.useState<any>([]);
  const [cloneRuleList, setCloneRuleList] = React.useState<any>([]);
  const [hidden, setHidden] = React.useState<any>([
    { rule: "1", condition: "", selection: "", selectionValue: "" },
  ]);
  const [shown, setShown] = React.useState<any>([
    { rule: "1", condition: "", selection: "", selectionValue: "" },
  ]);
  const [planLoading, setPlanLoading] = React.useState(false);
  const [openModal, setOpen] = React.useState(false);
  const [featureList, setFeatureList] = useState<any>([]);
  const { role } = useSelector((state: any) => state.userData);

  useEffect(() => {
    FetchRuleList();
    GetCurrentPlan(setFeatureList);
  }, []);

  const FetchRuleList = async () => {
    setShowSkeleton(true);
    let response = await apiClient("users/set_rules/list", "get");
    if (response.status === 200) {
      setShowSkeleton(false);
      setCloneRuleList(
        response.data.map((v) => ({ value: v.id, label: v.labels }))
      );
      setRuleList(response.data.map((v) => ({ value: v.id, label: v.labels })));
    }
  };
  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  const permissions =
    storedSubSellerList && storedSubSellerList.length > 0
      ? storedSubSellerList[0]
      : null;
  useEffect(() => {
    const { shown, hidden } = priceDetail;
    if (shown?.length > 0) setShown(FormatPriceDetailData(shown));
    if (hidden?.length > 0) setHidden(FormatPriceDetailData(hidden));
  }, [priceDetail]);

  const FormatPriceDetailData = (value: any) => {
    let data =
      value != "null"
        ? value?.map((val: any) => ({
            condition: val?.condition ?? "",
            selection: val?.selection ?? "",
            selectionValue:
              val.selection == "country"
                ? val?.selectionValue.split(",")
                : val?.selectionValue ?? "",
            rule: val?.rule ?? "",
          }))
        : [{ rule: "", condition: "", selection: "", selectionValue: "" }];
    return data;
  };
  const handleClick = (event: any, type = "rules") => {
    if (type === "rules") setAnchorEl(event.currentTarget);
    if (type === "hidden") setHiddenAnchorEl(event.currentTarget);
  };
  const handleClose = (type) => {
    if (type === "hidden") setAnchorEl(null);
    if (type === "rules") setHiddenAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const RuleHandler = (type, index, name, value) => {
    const rule = type === "hidden" ? [...hidden] : [...shown];
    rule[index][name] = value;
    if (name === "condition") {
      handleClose(type);
      if (type === "hidden") {
        setHidden([
          ...rule,
          { rule: "", condition: "", selection: "", selectionValue: "" },
        ]);
      } else {
        setShown([
          ...rule,
          { rule: "", condition: "", selection: "", selectionValue: "" },
        ]);
      }
    } else {
      if (type === "hidden") {
        setHidden(rule);
      } else {
        setShown(rule);
      }
    }
    setRuleList((prev) => prev.filter((v) => v.value != value));
  };

  const RemoveHandler = (index, type = "rules") => {
    const rule = type === "hidden" ? [...hidden] : [...shown];
    rule.splice(index, 1);
    if (type === "hidden") {
      setHidden(rule);
    } else {
      setShown(rule);
    }
  };

  const CountryHandler = (index, value, type = "rules") => {
    type === "hidden" ? setHiddenCountry(value) : setCountry(value);
    const rule = type === "hidden" ? [...hidden] : [...shown];
    let countries: any =
      rule[index]["selectionValue"] !== "" ? rule[index]["selectionValue"] : [];
    rule[index]["selectionValue"] = [...countries, value];
    rule[index]["selection"] = "country";
    if (type === "hidden") {
      setHidden(rule);
    } else {
      setShown(rule);
    }
  };

  const DateSelection = (index, value, type = "rules") => {
    const rule = type === "hidden" ? [...hidden] : [...shown];
    rule[index]["selectionValue"] = value.value;
    rule[index]["selection"] = "from_to";
    if (type === "hidden") {
      setHidden(rule);
    } else {
      setShown(rule);
    }
  };

  const CountryDelete = (index, i, type = "rules") => {
    const rule = type === "hidden" ? [...hidden] : [...shown];
    rule[index]["selectionValue"].splice(i, 1);
    if (rule.length === 0) setCountry("");
    if (type === "hidden") {
      setHidden(rule);
    } else {
      setShown(rule);
    }
  };

  const UpdateRule = async () => {
    let status = featureList.find((v) => v.id == 7)?.value ?? false;
    if (status == "no") {
      setOpen(true);
      return;
    }
    setLoader(true);
    let dataToSend = {
      shown: shown.map((v) => ({
        rule: v.rule,
        condition: v.condition,
        selection: v.selection,
        selectionValue: v.selectionValue.toString(),
      })),
      hidden: hidden.map((v) => ({
        rule: v.rule,
        condition: v.condition,
        selection: v.selection,
        selectionValue: v.selectionValue.toString(),
      })),
    };
    let response = await apiClient("users/set_rules_update", "post", {
      body: dataToSend,
    });
    if (response.status == 200) toast.success("setting updated successfully");
    setLoader(false);
  };

  const ClearRuleHandler = async () => {
    let dataToSend = {
      shown: "null",
      hidden: "null",
    };
    let response = await apiClient("users/set_rules_update", "post", {
      body: dataToSend,
    });
    if (response.status == 200) {
      toast.success("Rules deleted Successfully");
      setHidden([
        { rule: "1", condition: "", selection: "", selectionValue: "" },
      ]);
      setShown([
        { rule: "1", condition: "", selection: "", selectionValue: "" },
      ]);
    }
    setDeleteConfirmation(false);
  };

  const router = useRouter();
  const onClickAction = () => {
    setPlanLoading(true);
    router.push(`/plancards`);
  };

  const handleCloseRule = () => {
    setOpen(false);
  };

  return (
    <>
      {deleteConfirmation && (
        <DeleteDialog
          open={deleteConfirmation}
          handleClose={setDeleteConfirmation}
          text="rules"
          onClickAction={ClearRuleHandler}
        />
      )}

      <PlanAlertDialog
        open={openModal}
        handleClose={handleCloseRule}
        onClickAction={onClickAction}
        loading={planLoading}
        features={"Discount Level Creation"}
      />
      <Grid container display="flex" flexDirection="column" spacing={2}>
        {!showskeleton && (
          <>
            <Grid
              item
              xs={12}
              marginTop="10px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                "@media screen and (max-width:440px)": {
                  display: "block",
                },
              }}
            >
              <Box>
                <LargeContainer>Create Hide and Show Price Rule</LargeContainer>
                <SmallContainer>Price Status / Condition / Rule</SmallContainer>
              </Box>
              {(role === "seller" ||
                (role === "subuser" &&
                  permissions?.pricing_rules?.edit == true)) && (
                <Button
                  color="error"
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: "none",
                    minWidth: "90px",
                    marginLeft: "auto",
                    "@media screen and (max-width:440px)": {
                      marginTop: "8px",
                    },
                  }}
                  onClick={() => setDeleteConfirmation(true)}
                >
                  {buttonLoader ? (
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
                    "Clear Rules"
                  )}
                </Button>
              )}
            </Grid>
            <Grid item xs={12}>
              <BoxRuleInner component="div">
                <RuleText>Shown Rule</RuleText>
                {shown.map((value: any, index) => {
                  const defaultValue = cloneRuleList.find(
                    (v) => v.value == value.rule
                  );

                  return (
                    <Box component="div" key={index}>
                      <Grid container spacing={1.5} key={index}>
                        <Grid item xs={10} sm={11} md={5} lg={5} xl={5}>
                          <Autocomplete
                            sx={{ width: "100%" }}
                            size="small"
                            disablePortal
                            id="combo-box-demo-23"
                            options={ruleList}
                            value={defaultValue}
                            onChange={(e, val) =>
                              RuleHandler("rules", index, "rule", val?.value)
                            }
                            renderInput={(params) => (
                              <TextField {...params} size="small" />
                            )}
                          />
                        </Grid>
                        {/************************Date Picker*******************************************/}

                        {value?.rule == "12" && (
                          <Grid item xs={10} sm={8} md={2} lg={2} xl={2}>
                            <Box
                              component="div"
                              display="flex"
                              gap={1}
                              mb={1.4}
                            >
                              <FormControl
                                style={{ width: "100%", height: "20%" }}
                              >
                                <CustomDatePicker
                                  name={"start_date"}
                                  label="Start on"
                                  value={value.selectionValue}
                                  handleChange={(val) =>
                                    DateSelection(index, val.target)
                                  }
                                />
                              </FormControl>
                            </Box>
                          </Grid>
                        )}

                        {/************************ Country *******************************************/}

                        {value?.rule == "6" && (
                          <Grid item xs={10} sm={8} md={2} lg={2} xl={2}>
                            <DatePickerBox component="div">
                              <FormControl
                                style={{
                                  width: "100%",
                                  height: "20%",
                                }}
                              >
                                <CountrySelect
                                  IconComponent={ExpandMoreIcon}
                                  country={
                                    value.selectionValue[
                                      value.selectionValue.length - 1
                                    ]
                                  }
                                  setCountry={(values) =>
                                    CountryHandler(index, values)
                                  }
                                  styleProps={{ width: "100%" }}
                                />
                              </FormControl>
                              <ChipBox>
                                {typeof value?.selectionValue !== "string" &&
                                  value?.selectionValue?.map((v, i) => (
                                    <ChipStyle
                                      sx={{
                                        "& .MuiChip-deleteIcon": {
                                          color: "#fff !important",
                                        },
                                      }}
                                      key={i}
                                      label={countryDetail({
                                        key: "name",
                                        country_code: v,
                                      })}
                                      variant="outlined"
                                      onDelete={() => CountryDelete(index, i)}
                                    />
                                  ))}
                              </ChipBox>
                            </DatePickerBox>
                          </Grid>
                        )}

                        {value.condition === "" ? (
                          <>
                            <Grid item xs={10} sm={3} md={2} lg={2} xl={2}>
                              {/************************ Rule *******************************************/}
                              {(role === "seller" ||
                                (role === "subuser" &&
                                  permissions?.pricing_rules?.add == true)) && (
                                <SelectConditionBox
                                  component="div"
                                  display="flex"
                                  alignItems="flex-start"
                                  aria-describedby={id}
                                  onClick={(e) => handleClick(e)}
                                >
                                  <FormControl
                                    style={{ width: "100%", display: "flex" }}
                                    size="small"
                                    className="setprice_select"
                                  >
                                    <SelectCondition
                                      id="demo-simple-select-label"
                                      size="small"
                                    >
                                      <PlusIcon />
                                      Select Condition
                                    </SelectCondition>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      label="Condtion"
                                      IconComponent={ExpandMoreIcon}
                                      size="small"
                                      onChange={(e) => {
                                        RuleHandler(
                                          "rules",
                                          index,
                                          "condition",
                                          e.target.value
                                        );
                                      }}
                                    >
                                      <MenuItem value={"or"} sx={menuList}>
                                        OR
                                      </MenuItem>
                                      <MenuItem value={"and"} sx={menuList}>
                                        AND
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                </SelectConditionBox>
                              )}
                            </Grid>
                          </>
                        ) : (
                          <Grid item xs={1} sm={1} md={2} lg={2} xl={2}>
                            <IconClose onClick={() => RemoveHandler(index)} />
                          </Grid>
                        )}
                      </Grid>

                      {value.condition !== "" && (
                        <BoxRuletext display="flex" justifyContent="center">
                          <RuleText>{value?.condition?.toUpperCase()}</RuleText>
                        </BoxRuletext>
                      )}
                    </Box>
                  );
                })}
              </BoxRuleInner>
            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
              <BoxRuleInner component="div">
                <RuleText>Hidden Rule</RuleText>
                {hidden.map((value: any, index) => {
                  const defaultValue = cloneRuleList.find(
                    (v) => v.value == value.rule
                  );
                  return (
                    <Box component="div" key={index}>
                      <Grid container spacing={1.5} key={index}>
                        <Grid item xs={10} sm={11} md={5} lg={5} xl={5}>
                          <Autocomplete
                            sx={{ width: "100%" }}
                            size="small"
                            disablePortal
                            id="combo-box-demo-23"
                            options={ruleList}
                            value={defaultValue}
                            onChange={(e, val) =>
                              RuleHandler("hidden", index, "rule", val.value)
                            }
                            renderInput={(params) => (
                              <TextField {...params} size="small" />
                            )}
                          />
                        </Grid>
                        {/************************Date Picker*******************************************/}
                        {value?.rule == 12 && (
                          <Grid item xs={10} sm={8} md={2} lg={2} xl={2}>
                            <DatePickerBox
                              component="div"
                              display="flex"
                              gap={1}
                            >
                              <FormControl
                                style={{
                                  /*width: "50%",*/ width: "100%",
                                  height: "20%",
                                }}
                              >
                                <CustomDatePicker
                                  name={"start_date"}
                                  label="Start on"
                                  value={value.selectionValue}
                                  handleChange={(val) =>
                                    DateSelection(index, val.target, "hidden")
                                  }
                                />
                              </FormControl>
                            </DatePickerBox>
                          </Grid>
                        )}
                        {/************************ Country *******************************************/}
                        {value?.rule == 6 && (
                          <Grid item xs={10} sm={8} md={2} lg={2} xl={2}>
                            <Box component="div">
                              <FormControl
                                style={{ width: "100%", height: "20%" }}
                              >
                                <CountrySelect
                                  country={
                                    value.selectionValue[
                                      value.selectionValue.length - 1
                                    ]
                                  }
                                  setCountry={(values) =>
                                    CountryHandler(index, values, "hidden")
                                  }
                                  styleProps={{ width: "100%" }}
                                />
                              </FormControl>
                              <Box display="flex">
                                {typeof value?.selectionValue !== "string" &&
                                  value?.selectionValue?.map((v, i) => (
                                    <ChipStyle
                                      sx={{
                                        "& .MuiChip-deleteIcon": {
                                          color: "#fff",
                                        },
                                      }}
                                      key={i}
                                      label={countryDetail({
                                        key: "name",
                                        country_code: v,
                                      })}
                                      variant="outlined"
                                      onDelete={() =>
                                        CountryDelete(index, i, "hidden")
                                      }
                                    />
                                  ))}
                              </Box>
                            </Box>
                          </Grid>
                        )}
                        {value.condition === "" ? (
                          <>
                            {/************************ Rule *******************************************/}
                            <Grid item xs={10} sm={3} md={2} lg={2} xl={2}>
                              {(role === "seller" ||
                                (role === "subuser" &&
                                  permissions?.pricing_rules?.add == true)) && (
                                <SelectConditionBox
                                  component="div"
                                  display="flex"
                                  alignItems="center"
                                  aria-describedby={id}
                                >
                                  <FormControl
                                    style={{ width: "100%", height: "20%" }}
                                  >
                                    <SelectCondition
                                      id="demo-simple-select-label"
                                      size="small"
                                    >
                                      <PlusIcon />
                                      Select Condition
                                    </SelectCondition>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      label="Condtion"
                                      size="small"
                                      className="setprice_select"
                                      onChange={(e) => {
                                        RuleHandler(
                                          "hidden",
                                          index,
                                          "condition",
                                          e.target.value
                                        );
                                      }}
                                    >
                                      <MenuItem value={"or"} sx={menuList}>
                                        OR
                                      </MenuItem>
                                      <MenuItem value={"and"} sx={menuList}>
                                        AND
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                </SelectConditionBox>
                              )}
                            </Grid>
                          </>
                        ) : (
                          <Grid item xs={1} sm={1} md={2} lg={2} xl={2}>
                            <IconClose
                              onClick={() => RemoveHandler(index, "hidden")}
                            />
                          </Grid>
                        )}
                      </Grid>
                      {value.condition !== "" && (
                        <BoxRuletext display="flex" justifyContent="center">
                          <RuleText>{value.condition.toUpperCase()}</RuleText>
                        </BoxRuletext>
                      )}
                    </Box>
                  );
                })}
              </BoxRuleInner>
            </Grid>
            <Grid item xs={12}>
              {(role === "seller" ||
                (role === "subuser" &&
                  permissions?.pricing_rules?.add == true)) && (
                <Box component="div" display="flex" justifyContent="flex-end">
                  <BtnFilled onClick={UpdateRule}>
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
            </Grid>{" "}
          </>
        )}
        {showskeleton && (
          <>
            <SetRules />
          </>
        )}
      </Grid>
    </>
  );
};

export default SetPricingRules;
