import React, { useCallback, useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
  Link,
  Popover,
  Typography,
} from "@mui/material";
import {
  CommonFormcontrol,
  ConverterFormCommon,
  GridItemRow,
  SmallBlackOutineBtn,
  SmallFilledBtn,
  SmallOutineBtn,
  SmallRedOutineBtn,
  StyledBootstrapDialog,
  TitleDialog,
} from "../commonStyle";
import { useSelector } from "react-redux";
import router, { useRouter } from "next/router";
import { useAppDispatch } from "redux/store";
import CloseIcon from "@mui/icons-material/Close";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  ConversionTypography,
  CustomActionButon,
  MassConvertBox,
  MassConvertDialog,
  MassConvertRow,
} from "../style";
import {
  fetchAllFields,
  getAllFieldData,
  getAllSavedViews,
  setDealsData,
  setMassAttatchment,
  setMassCovrtPop,
  setTypeId,
} from "@/hooks/UseCreateFormData";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { CustomDatePicker } from "@/components/common/datePicker";
import { apiClient } from "@/components/common/common";
import { toast } from "react-toastify";
import moment from "moment";
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const MassConvert: any = ({ openPopUp, setAction }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [dealActive, setDealActive] = useState<any>(true);
  const {
    ConvertAttachment,
    details,
    selectedDataIds,
    typeId,
    formData,
    DealsList,
    allTypeId,
    massConvertPopUp,
  } = useSelector((state: any) => state.formList);
  const stage = [
    " Qualification",
    "Needs Analysis",
    "Value Proposition",
    " Identify Decision Makers",
    " Proposal/Price Quote",
    " Negotiation/Review",
    "Closed Won",
  ];
  const contactRoles = [
    " Developer/Evaluator",
    "Purchasing",
    "Executive Sponsor",
    " Engineering Lead",
    " Economic Decision Maker",
    "Product Management",
  ];
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [stages, setStage] = React.useState("");
  const [dealName, setDealName] = React.useState("");
  const [pipeline, setPipeLine] = React.useState("");
  const [closingDate, setClosingDate] = React.useState("");
  const [contactRole, setContactRole] = React.useState("");
  const [massAttachment, setMassAttachment] = React.useState("3");
  const [tags, setTags] = useState<any>([]);
  const [deals, setDeals] = useState<any>(
    DealsList &&
      DealsList.filter(
        (item) =>
          item?.required === "1" ||
          item?.name === "Amount" ||
          item?.name === "Stage"
      )
  );

  const onChnageHandler = (value, index) => {
    setDeals((prevData) => {
      return prevData.map((item) => {
        if (item.id === index) {
          return { ...item, value: value };
        }
        return item;
      });
    });
  };

  const handleChecked = (e, type, data) => {
    if (data == "file") {
      if (e.target.checked) {
        setMassAttachment(type);
      } else {
        setMassAttachment("");
      }
    } else {
      if (e.target.checked) {
        tags.push(type);
      } else {
        setTags((prevTags) => prevTags.filter((item) => item !== type));
      }
    }
  };

  const crmMapping = () => {
    let body = {
      // type_name: typeName,
      type_id: allTypeId?.map((item) => item.id)?.join(","),
    };
    let response = apiClient(`crm/lead-convert/auto-mapping`, "post", { body });
  };

  useEffect(() => {
    (async () => {
      await dispatch(fetchAllFields());
      await crmMapping();
    })();
  }, [dispatch]);

  useEffect(() => {
    if (DealsList) {
      const filteredDeals = DealsList.filter(
        (item) => item?.required === "1" || item?.label === "Amount"
      );
      setDeals(filteredDeals);
    }
  }, [DealsList]);

  const handleCloseColumn = () => {
    // setAction("Action");
    dispatch(setMassCovrtPop(false));
    dispatch(setTypeId(1));
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: SelectChangeEvent, id) => {
    const { name, value } = event.target;
    if (name == "stage") {
      // setStateData(value)
      setStage(value as string);
    } else if (name == "pipeline") {
      setPipeLine(value as string);
    } else if (name == "contactRole") {
      setContactRole(value as string);
    }
  };

  const calculateExpression = (e, id) => {
    const allowedChars = /^[0-9+\-*/().\s]+$/;
    if (allowedChars.test(e.target.value)) {
      onChnageHandler(e.target.value, id);
      // setExpression(e.target.value)
    } else if (e.target.value == "") {
      onChnageHandler("", id);
      // setExpression(e.target.value)
    }
    try {
      const calculatedResult = eval(e.target.value);
      setResult(calculatedResult);
    } catch (error) {
      console.error("Error in evaluating expression:", error);
    }
  };

  const [errors, setErrors] = useState([]);
  const handleConvertMap = async () => {
    if (deals?.length > 0 && deals?.filter((filt) => filt.value == "" || filt.value == null)?.length > 0) {
      setErrors(
        deals?.filter((filt) => filt.value != "" || filt.value != null)
      );
      return;
    }
    setErrors([]);
    const payloads = {
      unique_id: selectedDataIds?.join(","),
      type_id: `3,4${!dealActive ? ",2" : ""}`,
      associated_for: `${massAttachment}`,
      carray_tag: tags?.join(","),
      deal_fields:
        deals?.length > 0 &&
        deals.map(
          ({
            name,
            unique,
            required,
            type,
            section_form_id,
            label,
            ...rest
          }) => ({
            ...rest,
            id: "",
            section_form_id: rest.id,
            unique_id: selectedDataIds?.join(","),
            type_id: typeId,
          })
        ),
    };

    let response = await apiClient(
      `crm/lead-convert/save-mapping-fields`,
      "post",
      {
        body: payloads,
      }
    );
    if (response.status == true || response.status == 200) {
      toast.success(response.message);
      dispatch(setTypeId(1));
      dispatch(getAllFieldData());
      handleCloseColumn();
    } else {
      toast.error(response.message);
    }
  };

  const handleSelectDeal = (e) => {
    if (e.target.checked) {
      setDealActive(false);
      // dispatch(setTypeId(2))
    } else {
      setDealActive(true);
      // dispatch(setTypeId(""))
    }
  };

  return (
    <div>
      <StyledBootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={massConvertPopUp}
        sx={MassConvertDialog}
        onClick={handlePopoverClose}
      >
        <TitleDialog sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <i className="icon-leadsblack"></i>
          Mass Convert
        </TitleDialog>
        <DialogContent dividers>
          <MassConvertBox>
            <FormControl component="fieldset">
              <MassConvertRow>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend">Convert Lead To</FormLabel>
                  </Grid>
                  <Grid item xs={12} sm={8} md={8}>
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        value="3"
                        control={<Checkbox />}
                        checked={true}
                        disabled
                        label="Contact"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="4"
                        control={<Checkbox />}
                        checked={true}
                        disabled
                        label="Accounts"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Checkbox />}
                        label="Deal"
                        labelPlacement="end"
                        onChange={(e: any) => handleSelectDeal(e)}
                      />
                    </FormGroup>
                    {/* {!dealActive && (
                      <ConverterFormCommon>
                        <Grid container spacing={1}>
                          <Grid item md={12}>
                            <Grid container spacing={1}>
                              <GridItemRow item md={3}>
                                <span>Amount</span>
                              </GridItemRow>
                              <GridItemRow item md={9}>
                                <CommonFormcontrol fullWidth>
                                  <OutlinedInput
                                    id="outlined-adornment-amount"
                                    size="small"
                                    value={expression}
                                    onChange={(e) =>calculateExpression(e) }
                                    onBlur={(e)=>{setExpression(result)}}
                                    onKeyDown={(e:any)=> e.key=="Enter"?handlePopoverOpen(e):""}
                                    startAdornment={
                                      <InputAdornment position="start">
                                        $
                                      </InputAdornment>
                                    }
                                  />
                                  <Popover
                                    id="mouse-over-popover"
                                    sx={{
                                      pointerEvents: "none",
                                    }}
                                    open={open}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                      vertical: "bottom",
                                      horizontal: "left",
                                    }}
                                    transformOrigin={{
                                      vertical: "top",
                                      horizontal: "left",
                                    }}
                                    onClick={handlePopoverClose}
                                    onClose={handlePopoverClose}
                                   
                                  >
                                    <Typography sx={{ p: 1 }}>
                                     {result!==undefined&&result}
                                    </Typography>
                                  </Popover>
                                </CommonFormcontrol>
                              </GridItemRow>
                            </Grid>
                          </Grid>
                          <Grid item md={12} className="converterMantoryfield">
                            <Grid container spacing={1}>
                              <GridItemRow item md={3}>
                                <span>Deal Name</span>
                              </GridItemRow>
                              <GridItemRow item md={9}>
                                <CommonFormcontrol fullWidth>
                                  <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="dealName"
                                    size="small"
                                    value={dealName}
                                    onChange={(e:any)=>setDealName(e.target.value)}
                                    
                                  />
                                </CommonFormcontrol>
                              </GridItemRow>
                            </Grid>
                          </Grid>
                          <Grid item md={12} className="converterMantoryfield">
                            <Grid container spacing={1}>
                              <GridItemRow item md={3}>
                                <span>Closing Date</span>
                              </GridItemRow>
                              <GridItemRow item md={9}>
                                <CommonFormcontrol fullWidth>
                                  <CustomDatePicker
                                    name="Closing Date"
                                    // label="Closing Date"
                                    value={"0000-00-00"}
                                    // handleChange={(e)=>setClosingDate(e.target.value)}
                                  />
                              
                                </CommonFormcontrol>
                              </GridItemRow>
                            </Grid>
                          </Grid>
                          <Grid item md={12} className="converterMantoryfield">
                            <Grid container spacing={1}>
                              <GridItemRow item md={3}>
                                <span>Stage</span>
                              </GridItemRow>
                              <GridItemRow item md={9}>
                                <CommonFormcontrol fullWidth>
                                  <FormControl fullWidth>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      name="stage"
                                      value={stages}
                                      onChange={handleChange}
                                      IconComponent={
                                        KeyboardArrowDownOutlinedIcon
                                      }
                                    >
                                      {stage?.map(item=><MenuItem value={item}>
                                        {item}
                                      </MenuItem>)}
                                    </Select>
                                  </FormControl>
                                </CommonFormcontrol>
                              </GridItemRow>
                            </Grid>
                          </Grid>
                          <Grid item md={12} className="converterMantoryfield">
                            <Grid container spacing={1}>
                              <GridItemRow item md={3}>
                                <span>Pipeline</span>
                              </GridItemRow>
                              <GridItemRow item md={9}>
                                <CommonFormcontrol fullWidth>
                                  <FormControl fullWidth>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      name="pipeline"
                                      value={pipeline}
                                      onChange={handleChange}
                                      IconComponent={
                                        KeyboardArrowDownOutlinedIcon
                                      }
                                    >
                                      <MenuItem value={"Standard"}>
                                        Standard (Standard)
                                      </MenuItem>
                                      <MenuItem value={"Pipeline Abc"}>
                                        Pipeline Abc
                                      </MenuItem>
                                      <MenuItem value={"Pipeline Name"}>
                                        Pipeline Name
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                </CommonFormcontrol>
                              </GridItemRow>
                            </Grid>
                          </Grid>
                          <Grid item md={12}>
                            <Grid container spacing={1}>
                              <GridItemRow item md={3}>
                                <span>Campaign Source</span>
                              </GridItemRow>
                              <GridItemRow item md={9}>
                                <CommonFormcontrol fullWidth>
                                  <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    name="campaign"
                                    // value={campaign}
                                    // onChange={(e)=>setCampaign(e.target.value)}
                                  />
                                </CommonFormcontrol>
                              </GridItemRow>
                            </Grid>
                          </Grid>
                          <Grid item md={12}>
                            <Grid container spacing={1}>
                              <GridItemRow item md={3}>
                                <span>Contact Role</span>
                              </GridItemRow>
                              <GridItemRow item md={9}>
                                <CommonFormcontrol fullWidth>
                                  <FormControl fullWidth>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      name="contactRole"
                                      value={contactRole}
                                      onChange={handleChange}
                                      IconComponent={
                                        KeyboardArrowDownOutlinedIcon
                                      }
                                    >
                                      <MenuItem value={10}>None</MenuItem>
                                      {contactRoles?.map(items=><MenuItem value={items}>{items}</MenuItem>)}
                                    </Select>
                                  </FormControl>
                                </CommonFormcontrol>
                              </GridItemRow>
                            </Grid>
                          </Grid>
                        </Grid>
                      </ConverterFormCommon>
                    )} */}
                    {!dealActive &&
                      deals?.length > 0 &&
                      deals?.map((ele, eleIndex) => (
                        <ConverterFormCommon key={eleIndex}>
                          <Grid container spacing={1}>
                            <Grid item md={12}>
                              <Grid container spacing={1}>
                                <GridItemRow item md={3}>
                                  <span>{ele?.label}</span>
                                </GridItemRow>
                                <GridItemRow item md={9}>
                                  <CommonFormcontrol fullWidth size="small">
                                    {ele?.label == "Amount" && (
                                      <>
                                        <OutlinedInput
                                          id="outlined-adornment-amount"
                                          size="small"
                                          value={ele?.value}
                                          onChange={(e) => {
                                            const regex = /^[0-9\b]+$/;
                                            const input = e.target.value;
                                            if (
                                              input === "" ||
                                              regex.test(input)
                                            ) {
                                              calculateExpression(e, ele?.id);
                                            }
                                          }}
                                          // onMouseLeave={handlePopoverOpen}
                                          onBlur={(e) => {
                                            onChnageHandler(result, ele?.id);
                                          }}
                                          // onKeyDown={(e:any)=> e.key=="Enter"?handlePopoverOpen(e):""}
                                          startAdornment={
                                            <InputAdornment position="start">
                                              $
                                            </InputAdornment>
                                          }
                                          error={
                                            errors?.[eleIndex]?.value == ""
                                              ? true
                                              : false
                                          }
                                        />
                                        {errors?.[eleIndex]?.value == "" ? (
                                          <FormHelperText>
                                            Please enter amount ($5453)
                                          </FormHelperText>
                                        ) : null}
                                        {result !== "" && (
                                          <Popover
                                            id="mouse-over-popover"
                                            sx={{
                                              pointerEvents: "none",
                                            }}
                                            open={open}
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                              vertical: "bottom",
                                              horizontal: "left",
                                            }}
                                            transformOrigin={{
                                              vertical: "top",
                                              horizontal: "left",
                                            }}
                                            onClose={handlePopoverClose}
                                            onClick={handlePopoverClose}
                                          >
                                            <Typography sx={{ p: 1 }}>
                                              <span>{result}</span>
                                            </Typography>
                                          </Popover>
                                        )}
                                      </>
                                    )}
                                    {ele?.label == "Deal Name" && (
                                      <Grid
                                        item
                                        md={12}
                                        className="converterMantoryfield"
                                      >
                                        <TextField
                                          id="outlined-basic"
                                          variant="outlined"
                                          name="dealName"
                                          size="small"
                                          value={ele?.value}
                                          error={
                                            errors?.[eleIndex]?.value == ""
                                              ? true
                                              : false
                                          }
                                          helperText={
                                            errors?.[eleIndex]?.value == ""
                                              ? "Please enter deal name"
                                              : false
                                          }
                                          onChange={(e: any) => {
                                            onChnageHandler(
                                              e.target.value,
                                              ele?.id
                                            );
                                          }}
                                        />
                                      </Grid>
                                    )}
                                    {ele?.label == "Closing Date" && (
                                      <Grid
                                        item
                                        md={12}
                                        className="converterMantoryfield"
                                      >
                                        <CustomDatePicker
                                          name="Closing Date"
                                          // label="Closing Date"
                                          min_date={moment(new Date())}
                                          value={ele?.value || "0000-00-00"}
                                          handleChange={(e) => {
                                            onChnageHandler(
                                              e.target.value,
                                              ele?.id
                                            );
                                          }}
                                          error={
                                            errors?.[eleIndex]?.value == ""
                                              ? true
                                              : false
                                          }
                                        />
                                        {errors?.[eleIndex]?.value == "" ? (
                                          <FormHelperText>
                                            Please select closing date
                                          </FormHelperText>
                                        ) : null}
                                      </Grid>
                                    )}
                                    {ele?.label == "Pipeline" && (
                                      <Grid
                                        item
                                        md={12}
                                        className="converterMantoryfield"
                                      >
                                        {" "}
                                        <FormControl fullWidth>
                                          <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="pipeline"
                                            value={ele?.value}
                                            onChange={(e) => {
                                              onChnageHandler(
                                                e.target.value,
                                                ele?.id
                                              );
                                            }}
                                            // onChange={(e)=>handleChange(e,ele?.id)}
                                            IconComponent={
                                              KeyboardArrowDownOutlinedIcon
                                            }
                                            error={
                                              errors?.[eleIndex]?.value == ""
                                                ? true
                                                : false
                                            }
                                          >
                                            <MenuItem value={"Standard"}>
                                              Standard (Standard)
                                            </MenuItem>
                                            <MenuItem value={"Pipeline Abc"}>
                                              Pipeline Abc
                                            </MenuItem>
                                            <MenuItem value={"Pipeline Name"}>
                                              Pipeline Name
                                            </MenuItem>
                                          </Select>
                                          {errors?.[eleIndex]?.value == "" ? (
                                          <FormHelperText>
                                            Please select pipeline
                                          </FormHelperText>
                                        ) : null}
                                        </FormControl>
                                      </Grid>
                                    )}
                                    {ele?.label == "Stage" && (
                                      <Grid
                                        item
                                        md={12}
                                        className="converterMantoryfield"
                                      >
                                        {" "}
                                        <FormControl fullWidth>
                                          <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="stage"
                                            value={ele?.value}
                                            onChange={(e) =>
                                              onChnageHandler(
                                                e.target.value,
                                                ele?.id
                                              )
                                            }
                                            IconComponent={
                                              KeyboardArrowDownOutlinedIcon
                                            }
                                            error={
                                              errors?.[eleIndex]?.value == ""
                                                ? true
                                                : false
                                            }
                                          >
                                            {stage?.map((item) => (
                                              <MenuItem value={item}>
                                                {item}
                                              </MenuItem>
                                            ))}
                                          </Select>
                                          {errors?.[eleIndex]?.value == "" ? (
                                          <FormHelperText>
                                            Please select stage
                                          </FormHelperText>
                                        ) : null}
                                        </FormControl>
                                      </Grid>
                                    )}
                                    {ele?.label == "Contact Name" && (
                                      <Autocomplete
                                        size="small"
                                        className={"autoComplete-container"}
                                        onInputChange={(e: any) => {
                                          onChnageHandler(
                                            e?.target.value,
                                            ele?.id
                                          );
                                        }}
                                        onChange={(e, newValue) => {}}
                                        id="free-solo-demo"
                                        freeSolo
                                        value={"None"}
                                        options={contactRoles}
                                        renderInput={(params) => (
                                          <>
                                            <TextField
                                              {...params}
                                              autoComplete="new-password"
                                              size="small"
                                              name="designation"
                                              error
                                              // placeholder="Enter/select Designation"
                                            />
                                          </>
                                        )}
                                      />
                                    )}
                                  </CommonFormcontrol>
                                </GridItemRow>
                              </Grid>
                            </Grid>
                          </Grid>
                        </ConverterFormCommon>
                      ))}
                  </Grid>
                </Grid>
              </MassConvertRow>
              <MassConvertRow>
                <Grid container>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Where would you like to move the attachments to?
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} sm={8} md={8}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value={massAttachment}
                        control={<Radio />}
                        checked={massAttachment == "3" && true}
                        label="Contact"
                        onChange={(e) => handleChecked(e, "3", "file")}
                      />
                      <FormControlLabel
                        value={massAttachment}
                        checked={massAttachment == "4" && true}
                        control={<Radio />}
                        label="Accounts"
                        onChange={(e) => handleChecked(e, "4", "file")}
                      />
                      <FormControlLabel
                        value={massAttachment}
                        disabled={dealActive}
                        checked={massAttachment == "2" && true}
                        control={<Radio />}
                        label="Deal"
                        onChange={(e) => handleChecked(e, "2", "file")}
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </MassConvertRow>
              <MassConvertRow>
                <Grid container>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormLabel component="legend">
                      Do you want to carry Tags
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} sm={8} md={8}>
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        value="3"
                        control={<Checkbox />}
                        label="Contact"
                        labelPlacement="end"
                        onChange={(e) => handleChecked(e, "3", "tag")}
                      />
                      <FormControlLabel
                        value="4"
                        control={<Checkbox />}
                        label="Accounts"
                        labelPlacement="end"
                        onChange={(e) => handleChecked(e, "4", "tag")}
                      />
                      <FormControlLabel
                        value="2"
                        control={<Checkbox />}
                        label="Deal"
                        disabled={dealActive}
                        labelPlacement="end"
                        onChange={(e) => handleChecked(e, "2", "tag")}
                      />
                    </FormGroup>
                  </Grid>
                </Grid>
              </MassConvertRow>
            </FormControl>
          </MassConvertBox>
          <ConversionTypography
            onClick={() => {
              dispatch(setMassCovrtPop(false));
              dispatch(setTypeId(1));
              router.replace("/crm/mapping")
            }}
            sx={{ cursor: "pointer" }}
          >
            {/* <Link underline="always" color="inherit"> */}
            <Link underline="always" color="inherit">
              Conversion Mapping
            </Link>
          </ConversionTypography>
        </DialogContent>
        <DialogActions>
          <CustomActionButon>
            <SmallRedOutineBtn variant="outlined" onClick={handleConvertMap}>
              Convert
            </SmallRedOutineBtn>
            <SmallBlackOutineBtn variant="outlined" onClick={handleCloseColumn}>
              Cancel
            </SmallBlackOutineBtn>
          </CustomActionButon>
        </DialogActions>
      </StyledBootstrapDialog>
    </div>
  );
};
export default MassConvert;
