import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { makeStyles } from "tss-react/mui";
import { BtnFilled } from "../common/buttons/ButtonsVariations";
import { apiClient } from "../common/common";
import Discountlevel from "./discountSkeleton";
import {
  BoxColumn,
  BoxDiscountLevel,
  BoxFormedInquiry,
  BoxSetBox,
  ContainerBox,
  CrosIccon,
  FormControlStyle,
  InfoData,
  TypographyContent,
  TypographyContent2,
  TypographyNoDiscount,
  UpButton,
  ValueTitle,
  ValueTitle2,
} from "./style";
const useStyles = makeStyles()((theme) => {
  return {
    discountheader2: {
      width: 174,
      height: 20,
      fontSize: "15px",
      marginTop: 20,
      marginBottom: 10,
      fontWeight: 600,
      color: "#0D0D0D",
    },
    submitbtn: {
      marginTop: 18,
      float: "right",
      color: "#D7282F",
      border: "1px solid #D7282F",
      paddingLeft: 15,
      paddingRight: 15,
    },
  };
});

const data = [
  "Pricing is shown only for users registered and logged into the MerchantAD website",
  "If User came from google",
];
const data1 = ["fixed", "Percentage"];
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));
const DiscountLevels = ({ priceDetail, discountLoader }) => {
  const { classes } = useStyles();
  const [condition, setCondition] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [discountValues, setDiscountValues] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const { role } = useSelector((state: any) => state.userData);

  const usePlaceholderStyles = makeStyles()((theme) => {
    return {
      placeholder: {
        color: "#aaa",
      },
    };
  });
  const Placeholder = ({ children }) => {
    const { classes } = usePlaceholderStyles();
    return <div className={classes.placeholder}>{children}</div>;
  };

  useEffect(() => {
    const { discount_level } = priceDetail;
    if (discount_level?.length > 0) setDiscountValues(discount_level);
  }, [priceDetail]);

  const ApplyHandler = () => {
    setDiscountValues((prev) => [
      ...prev,
      {
        discountType,
        condition,
        selection: "",
        selectionValue: discountValue,
      },
    ]);
    setDiscountType("");
    setDiscountValue("");
    setCondition("");
  };

  const RemoveHandler = (index) => {
    setDiscountValues((prev) => {
      let list = [...prev];
      list.splice(index, 1);
      return list;
    });
  };
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

  const onChangeHandler = (index, value, name) => {
    const values = [...discountValues];
    if (name === "selectionValue" && (value === "" || /^\d+$/.test(value))) {
      values[index][name] = value;
    }
    if (name !== "selectionValue") {
      values[index][name] = value;
    }
    setDiscountValues(values);
  };

  const onSubmitHandler = async () => {
    setLoader(true);
    let response = await apiClient("users/set_rules_update", "post", {
      body: { discount_level: discountValues },
    });
    if (response.status == 200)
      toast.success("Discount values updated successfully");
    setLoader(false);
  };

  const onChangeValue = (value) => {
    const re = /^[0-9\b]+$/;
    if (value === "" || re.test(value)) {
      setDiscountValue(value);
    }
  };
  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  const permissions =
    storedSubSellerList && storedSubSellerList.length > 0
      ? storedSubSellerList[0]
      : null;
  return (
    <Grid container display="flex" flexDirection="column" spacing={2}>
      {!discountLoader && (
        <>
          <Grid item xs={12} marginTop="10px">
            <LargeContainer>Apply Discount Levels</LargeContainer>
            <SmallContainer>
              Vestibulum lobortis odio quis sem vulputate, sed varius mauris
              maximus.
            </SmallContainer>
          </Grid>
          <Grid item xs={12}>
            <ContainerBox mt={1}>
              <BoxColumn>
                <ValueTitle>Condition</ValueTitle>
                <FormControl size="small" sx={FormControlStyle}>
                  <Select
                    style={{ fontSize: "11px" }}
                    size="small"
                    value={condition}
                    displayEmpty
                    onChange={(e) => setCondition(e.target.value)}
                    IconComponent={ExpandMoreIcon}
                    renderValue={
                      condition !== ""
                        ? undefined
                        : () => <Placeholder>Please Select Value</Placeholder>
                    }
                  >
                    {data.map((val) => (
                      <MenuItem
                        style={{ fontSize: "11px" }}
                        key={val}
                        value={val}
                      >
                        {val}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </BoxColumn>
              <BoxColumn>
                <ValueTitle>Discount Type</ValueTitle>
                <FormControl size="small" sx={FormControlStyle}>
                  <Select
                    style={{ fontSize: "11px" }}
                    size="small"
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                    displayEmpty
                    IconComponent={ExpandMoreIcon}
                    renderValue={
                      discountType !== ""
                        ? undefined
                        : () => (
                          <Placeholder>
                            Select Discount Type Value
                          </Placeholder>
                        )
                    }
                  >
                    {data1.map((val) => (
                      <MenuItem
                        style={{ fontSize: "11px" }}
                        key={val}
                        value={val}
                      >
                        {val}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </BoxColumn>
              <BoxColumn>
                <ValueTitle>Value</ValueTitle>
                <FormControl size="small" sx={FormControlStyle}>
                  <TextField
                    size="small"
                    sx={{ width: "100%" }}
                    value={discountValue}
                    onChange={(e) => onChangeValue(e.target.value)}
                  />
                </FormControl>
              </BoxColumn>
              {(role === "seller" ||
                (role === "subuser" &&
                  permissions?.discount_levels?.add == true)) && (
                  <UpButton
                    variant="contained"
                    sx={{
                      ":hover": {
                        backgroundColor: "#D7282F",
                      },
                    }}
                    onClick={ApplyHandler}
                  >
                    Apply
                  </UpButton>
                )}
            </ContainerBox>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <ValueTitle2>Selected Discount Level</ValueTitle2>
              <BoxDiscountLevel overflow="hidden">
                <Grid container spacing={2}>
                  {discountValues?.length > 0 ? (
                    discountValues?.map((value, index) => (
                      <>
                        <Grid item xs={12}>
                          <BoxFormedInquiry component="div">
                            <BoxSetBox component="div">
                              <ValueTitle>Condition</ValueTitle>
                              <FormControl sx={FormControlStyle} size="small">
                                <Select
                                  style={{ fontSize: "11px" }}
                                  size="small"
                                  value={value.condition}
                                  displayEmpty
                                  onChange={(e) =>
                                    onChangeHandler(
                                      index,
                                      e.target.value,
                                      "condition"
                                    )
                                  }
                                  renderValue={
                                    value.condition !== ""
                                      ? undefined
                                      : () => (
                                        <Placeholder>
                                          Please Select Value
                                        </Placeholder>
                                      )
                                  }
                                >
                                  {data.map((val) => (
                                    <MenuItem
                                      style={{ fontSize: "11px" }}
                                      key={val}
                                      value={val}
                                    >
                                      {val}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </BoxSetBox>
                            <BoxSetBox component="div">
                              <ValueTitle>Discount Type</ValueTitle>
                              <FormControl sx={FormControlStyle} size="small">
                                <Select
                                  style={{ fontSize: "11px" }}
                                  size="small"
                                  value={value.discountType}
                                  onChange={(e) =>
                                    onChangeHandler(
                                      index,
                                      e.target.value,
                                      "discountType"
                                    )
                                  }
                                  displayEmpty
                                  renderValue={
                                    value.discountType !== ""
                                      ? undefined
                                      : () => (
                                        <Placeholder>
                                          Select Discount Type Value
                                        </Placeholder>
                                      )
                                  }
                                >
                                  {data1.map((val) => (
                                    <MenuItem
                                      style={{ fontSize: "11px" }}
                                      key={val}
                                      value={val}
                                    >
                                      {val}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </BoxSetBox>
                            <BoxSetBox component="div">
                              <ValueTitle>Value</ValueTitle>
                              <FormControl sx={FormControlStyle} size="small">
                                <TextField
                                  sx={{ width: "100%" }}
                                  size="small"
                                  value={value.selectionValue}
                                  onChange={(e) =>
                                    onChangeHandler(
                                      index,
                                      e.target.value,
                                      "selectionValue"
                                    )
                                  }
                                />
                              </FormControl>
                            </BoxSetBox>
                            <Box component="div">
                              <CrosIccon onClick={() => RemoveHandler(index)} />
                            </Box>
                          </BoxFormedInquiry>
                        </Grid>
                      </>
                    ))
                  ) : (
                    <InfoData>
                      <Box>
                        <Image
                          alt="empty"
                          height={100}
                          width={100}
                          src="/assets/emptypage.svg"
                        />
                      </Box>
                      <TypographyNoDiscount variant="h5">
                        No Discount Level Selected
                      </TypographyNoDiscount>
                      <TypographyContent>
                        Aliquam sit amet arcu volutpat,
                      </TypographyContent>
                      <TypographyContent2>
                        Please Apply Discount Level
                      </TypographyContent2>
                    </InfoData>
                  )}
                </Grid>
              </BoxDiscountLevel>
            </Box>
          </Grid>
          <Grid item>
            {(role === "seller" ||
              (role === "subuser" &&
                permissions?.discount_levels?.add == true)) && (
                <Box component="div" display="flex" justifyContent="flex-end">
                  <BtnFilled onClick={onSubmitHandler}>
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
        </>
      )}
      {discountLoader && (
        <>
          <Discountlevel />
        </>
      )}
    </Grid>
  );
};

export default DiscountLevels;
