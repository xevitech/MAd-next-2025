import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Link,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  TextareaAutosize,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ConFigueOverView,
  ConFigueOverViewInn,
  ConfigueProductInfo,
  ConfigueUserAddress,
  ConfigureOverviewCol,
  CProductImage,
  DelievryTerms,
  FlexDiv,
  LabelCheckboxGroup,
  LableValue,
  LableValueTop,
  PlanBadge,
  SubjectBox,
  SubjectLine,
  UserthumbImg,
} from "../style";
import { useSelector } from "react-redux";
import { apiClient, getCountryNameByCode } from "@/components/common/common";
import _debounce from "lodash/debounce";
import { TerritoryList, countriesList } from "@/utils/countriesphp";
import { useAppDispatch } from "redux/store";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { DataGridStyle } from "@/components/common/commonStyle";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
const ProductItemCustomizeConfigCase = ({
  formik,
  customiseRequest,
  rowSelection,
}) => {
  const [quantity, setQuantity] = useState<any>("");
  const [seaportList, setSeaportList] = useState<any>([
    { value: "", view: "" },
  ]);
  const [airportList, setAirportList] = useState<any>([
    { value: "", view: "" },
  ]);
  const [SelectedOrigin, setSelectedOrigin] = useState<any>([]);
  const [userPriceTerms, setUserPriceTerms] = useState<any>("");
  const [shipingMethod, setShippingMethod] = useState<any>("sea");
  const [portCountry, setPortCountry] = useState<any>({ value: "", view: "" });
  const [seaPort, setSeaPort] = useState<any>({ value: "", view: "" });
  const [airPort, setAirPort] = useState<any>({ value: "", view: "" });
  const [roadInfo, setRoadInfo] = useState<any>("");
  const [attachment, setAttachments] = useState<any>([]);
  const { unitList, quotedetails } = useSelector(
    (state: any) => state.quoteDetails
  );
  const [priceTermList, setPriceTermList] = useState<any>([]);
  const [userMessage, setUserMessage] = useState<string>("");
  const country = countriesList.map((v) => ({ value: v.code, view: v.name }));
  const [countryName, setCountryNames] = useState("");
  const [name, setName] = useState(customiseRequest?.name);

  useEffect(() => {
    let price =
      quotedetails?.price_type == "quantity"
        ? RenderPrice(quotedetails?.quantity_based_list, quantity)
        : quotedetails?.unit_price;
    let Data = {
      name,
      quantity,
      countryName,
      SelectedOrigin,
      userPriceTerms,
      shipingMethod,
      portCountry: portCountry?.value,
      attachment,
      userMessage,
      destination_port:
        shipingMethod == "road"
          ? roadInfo
          : shipingMethod == "air"
          ? airPort?.value
          : seaPort?.value,
      currency: quotedetails?.currency_id,
      price,
      total_price: +price * +quantity,
    };
    formik.setFieldValue("customize_request", Data);
  }, [
    name,
    quantity,
    countryName,
    SelectedOrigin,
    userPriceTerms,
    shipingMethod,
    portCountry,
    // attachment,
    userMessage,
    seaPort,
    airPort,
    roadInfo,
  ]);

  useEffect(() => {
    if (userPriceTerms == "" && quotedetails?.price_term) {
      setUserPriceTerms(quotedetails?.price_term);
    }
    if (
      quotedetails?.quantity_based_list?.[0]?.min_qty &&
      quotedetails?.price_type !== "fixed"
    ) {
    }
  }, [quotedetails]);

  useEffect(() => {
    FetchSeaPortList("a");
    FetchAirPortList("a");
  }, []);

  const columnsData: any = [
    {
      field: "sno",
      headerName: "Sr. No.",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "attribute",
      headerName: "Selected Variations",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        try {
          const jsonData =
            typeof params.row.json === "string"
              ? JSON.parse(params.row.json)
              : params.row.json;

          return (
            <LightTooltip
              arrow
              disableInteractive
              placement="top"
              title={Object.entries(jsonData)
                .map(([key, value]) => `${key}: ${String(value)}`)
                .join(", ")}
            >
              <Box
                sx={{
                  display: "flex",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
                // title={Object.entries(jsonData)
                //   .map(([key, value]) => `${key}: ${String(value)}`)
                //   .join(", ")}
              >
                {Object.entries(jsonData).map(([key, value]) => (
                  <Box
                    key={key}
                    sx={{
                      borderRight: "1px solid #ddd",
                      margin: "0 3px 0 0",
                      padding: "0 3px 0 0",
                    }}
                  >
                    <strong>{key}:</strong> {String(value)}
                  </Box>
                ))}
              </Box>
            </LightTooltip>
          );
        } catch (error) {
          console.error("Error parsing JSON:", error);
          return <div>Error parsing JSON</div>;
        }
      },
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        <>{params.row.symbol + params.row.price}</>;
      },
    },

    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 100,
      flex: 1,
      editable: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => <>{params.row.quantity}</>,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      minWidth: 100,
      flex: 1,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
  ];

  const rows = rowSelection.map((row, index) => {
 
    const numericPrice = parseFloat(row.price.replace(/[^\d.-]/g, "")) || 0;
    const quantity = parseFloat(row.quantity) || 0;
    const symbol = row?.symbol;

    return {
      ...row,
      sno: index + 1,
      price: symbol + numericPrice,
      totalPrice: `${symbol}${numericPrice * quantity}`,
      calculatedPrice: numericPrice * quantity,
    };
  });
  const grandTotal = rows.reduce((acc, row) => {
    return acc + row.calculatedPrice;
  }, 0);
  const formattedGrandTotal = `${rows[0]?.symbol || "$"}${grandTotal.toFixed(
    2
  )}`;

  useEffect(() => {
    FetchPriceTerm();
  }, []);
  const RenderPrice = (array = [], quantity) => {
    let maxQuantity = array[array.length - 1]?.max_qty < quantity;
    let minQuantity = array[0]?.min_qty > quantity;
    const result = array.find(
      (item) => quantity >= item.min_qty && quantity <= item.max_qty
    );

    if (result) {
      return result?.price;
    } else {
      if (result == undefined) {
        return "NA";
      }
      if (maxQuantity) {
        return array?.[array.length - 1]?.price;
      }
      if (minQuantity) {
        return array?.[0]?.price;
      }
    }
  };

  useEffect(() => {
    if (portCountry.value) {
      if (shipingMethod == "sea") FetchSeaPortList("", portCountry.value);
      if (shipingMethod == "air") FetchAirPortList("", portCountry.value);
    }
  }, [portCountry, shipingMethod]);
  const dispatch = useAppDispatch();

  const QuantityHandler = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    if (/^\d+$/.test(input) === false) {
      setQuantity("");
      return;
    }
    if (input.length > 4) {
      return;
    }
    formik.setFieldError("customize_request.quantity", "");
    let quantityValue = e.target.value;
    const regex = /^[1-9]\d*$/;
    if (/^\d+$/.test(quantityValue) && parseInt(quantityValue) > 0) {
      if (quotedetails?.price_type == "quantity") {
        if (quantityValue == 0) {
          setQuantity(quantityValue);
        } else {
          setQuantity(quantityValue);
        }
      } else {
        if (regex.test(quantityValue) || quantityValue === "") {
          setQuantity(quantityValue);
        }
      }
    } else {
      if (quantityValue == "" && quantityValue == 0) {
        setQuantity(null);
      }
    }
  };
  const FetchSeaPortList = async (value, country = "") => {
    let response = await apiClient(
      `ports/getPorts?search=${value}&type=sea_ports&country=${country}&per_page=50`,
      "get"
    );
    if (response.status === 200) {
      setSeaportList(
        response.data.map((v) => ({ view: v.name, value: v.name }))
      );
    }
    return response;
  };
  const FetchAirPortList = async (value, country = "") => {
    let response = await apiClient(
      `ports/getPorts?search=${value}&type=air_ports&country=${country}&per_page=50`,
      "get"
    );

    if (response.status === 200) {
      setAirportList(
        response.data.map((v) => ({ view: v.name, value: v.name }))
      );
    }
    return response;
  };
  let parsed = customiseRequest?.caseData
    ? JSON.parse(customiseRequest?.caseData)
    : "";

  let countryNames = [];
  if (customiseRequest?.case_type === "case_1") {
    countryNames =
      parsed && typeof parsed === "object" && parsed.country?.length
        ? parsed?.country?.map((code) => getCountryNameByCode(code))
        : [];
  } else if (customiseRequest?.case_type === "case_2") {
    countryNames =
      parsed && typeof parsed === "object" && parsed.primary_country
        ? [getCountryNameByCode(parsed.primary_country?.value)]
        : [];
  } else if (customiseRequest?.case_type === "case_3") {
    countryNames =
      parsed && typeof parsed === "object" && Array.isArray(parsed)
        ? parsed.map((item) => {
            const madeInData = JSON.parse(item.made_in);
            return getCountryNameByCode(madeInData.value);
          })
        : [];
  }

  const fetchSeaPort = React.useRef(
    _debounce(async (value, country) => {
      if (value) {
        await FetchSeaPortList(value, country);
      }
    }, 500)
  ).current;
  const { territoryData, modifiedCountriesList } = useSelector(
    (state: any) => state.editProduct
  );
  const FetchPriceTerm = async () => {
    let response = await apiClient("price_terms", "get");
    if (response.status == 200) {
      setPriceTermList(response.data);
    }
  };
  const fetchAirPort = React.useRef(
    _debounce(async (value, country) => {
      if (value) {
        await FetchAirPortList(value, country);
      }
    }, 500)
  ).current;

  const GetCountryName = (name: any) => {
    let countryName = name?.split(",");
    let countriesName = countryName?.map(
      (v) => country.find((el) => el.value == v)?.view
    );

    if (countriesName && countriesName?.[0] == undefined) {
      countriesName = TerritoryList.find(
        (el) => el.id == name?.replaceAll("t", "")
      )?.name;
      return countriesName?.toString();
    } else {
      return countriesName?.toString();
    }
  };

  let optionList = [];
  if (quotedetails?.case_type === "case_1") {
    const caseDataValue = quotedetails?.caseData?.value;
    if (typeof caseDataValue === "string") {
      let primary_country = caseDataValue.split(",");
      optionList = primary_country || [];
    } else {
      optionList = [];
    }
  }
  if (quotedetails?.case_type === "case_2") {
    const caseData = JSON?.parse(quotedetails?.caseData);

    let primary_country = Array.isArray(caseData?.primary_country)
      ? caseData?.primary_country
      : typeof caseData?.primary_country === "string"
      ? caseData?.primary_country.split(",")
      : [];

    let other_source = Array.isArray(caseData?.other_source)
      ? caseData?.other_source
      : typeof caseData?.other_source === "string"
      ? caseData?.other_source.split(",")
      : [];

    optionList = [].concat(...primary_country, ...other_source);
  }
  if (quotedetails?.case_type === "case_3") {
    let primary_country = JSON?.parse(quotedetails?.caseData)?.map(
      (ele) => ele?.made_in
    );
    let origin = JSON?.parse(quotedetails?.caseData)?.map((ele) => ele?.origin);
    let primary_country_update = primary_country.flatMap((item) =>
      item.split(",")
    );
    optionList = [].concat(...origin, ...primary_country_update);
  }
  const data = useSelector((state: any) => state.productDetail.detail.data);
  let toolTipData = `The seller's base price is based on an <b>${data?.price_term?.replaceAll(
    ",",
    ", "
  )}</b> delivery term.`;
  const availableCountries = countryNames;
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    // Optionally, handle saving the updated value here (e.g., making an API call)
  };
  const handleSaveClick = () => {
    setIsEditing(false);
    // Optionally, handle saving the updated value here (e.g., making an API call)
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setName(customiseRequest?.name); // Revert back to the original name if the user cancels
  };
  return (
    <>
      <Box sx={{ padding: "16px", paddingBottom: "0" }}>
        <Grid container rowSpacing={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} lg={7} xl={7}>
              <Box
                sx={{
                  display: "flex",
                  gap: "8px",
                  "@media screen and (max-width:600px)": {
                    flexWrap: "wrap",
                  },
                }}
              >
                <UserthumbImg>
                  <PlanBadge>
                    <Image
                      height={20}
                      width={20}
                      alt="vintage"
                      src="/assets/vinatage.png"
                    />
                  </PlanBadge>
                  <img src={customiseRequest?.seller_image} alt="" title="" />
                </UserthumbImg>
                <ConfigueUserAddress>
                  <FlexDiv>
                    <Typography variant="h6">To:</Typography>
                    <Typography variant="subtitle1">
                      {customiseRequest?.seller_name}
                    </Typography>
                    <Box
                      sx={{
                        fontSize: "12px",
                        color: "#d7282f",
                      }}
                    >
                      ({customiseRequest?.company_details?.company_name})
                    </Box>
                  </FlexDiv>
                  <SubjectLine>
                    <FlexDiv>
                      <Typography variant="h6">Subject:</Typography>

                      <SubjectBox>
                        <Box className="uniqueNo-brandName">
                          {customiseRequest?.unique_number} |
                        </Box>
                        {/* <Box className="uniqueNo-brandName">
                          {customiseRequest?.brand_name ?? "N/A"} |
                        </Box> */}
                        {isEditing ? (
                          <TextField
                            value={name}
                            onChange={handleNameChange}
                            autoFocus
                            size="small"
                            sx={{
                              width: "50%",
                              "& .MuiInputBase-input": {
                                padding: "2.5px 14px",
                              },
                            }}
                          />
                        ) : (
                          <LightTooltip
                            arrow
                            disableInteractive
                            placement="top"
                            title={name}
                          >
                            <Typography className="Prod-Name">
                              {name}
                            </Typography>
                          </LightTooltip>
                        )}
                        {isEditing ? (
                          <>
                            <LightTooltip
                              title="Save"
                              placement="top"
                              arrow
                              disableInteractive
                            >
                              <SaveIcon
                                className="del-saveIcons"
                                onClick={handleSaveClick}
                              />
                            </LightTooltip>
                            <LightTooltip
                              title="Cancel"
                              placement="top"
                              arrow
                              disableInteractive
                            >
                              <CancelIcon
                                className="del-saveIcons"
                                onClick={handleCancelClick}
                              />
                            </LightTooltip>
                          </>
                        ) : (
                          <LightTooltip
                            title="Edit"
                            placement="top"
                            arrow
                            disableInteractive
                          >
                            <EditIcon
                              onClick={handleEditClick}
                              className="editIcon"
                            />
                          </LightTooltip>
                        )}
                      </SubjectBox>
                    </FlexDiv>
                  </SubjectLine>
                </ConfigueUserAddress>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={5} xl={5}>
              <ConfigueUserAddress>
                <ConFigueOverView>
                  <Grid container spacing={2}>
                    <Grid item md={12}>
                      <ConfigueProductInfo>
                        <CProductImage>
                          <img
                            src={customiseRequest?.main_image}
                            alt=""
                            title=""
                          />
                        </CProductImage>
                        <Box>
                          <LightTooltip
                            placement="top"
                            title={customiseRequest?.name}
                            arrow
                            disableInteractive
                          >
                            <Typography variant="body2">
                              {customiseRequest?.name}
                            </Typography>
                          </LightTooltip>
                          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                            <Typography
                              variant="body2"
                              className="uniqueNo-brandName"
                            >
                              {customiseRequest?.id}|
                            </Typography>
                            <Typography
                              variant="body2"
                              className="uniqueNo-brandName"
                            >
                              {customiseRequest?.brand_name ?? "N/A"} |
                            </Typography>
                            <Typography
                              variant="body2"
                              className="uniqueNo-brandName"
                            >
                              {customiseRequest?.supplier_name}
                            </Typography>
                          </Box>
                        </Box>
                      </ConfigueProductInfo>
                    </Grid>
                  </Grid>
                </ConFigueOverView>
              </ConfigueUserAddress>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ConfigureOverviewCol>
              <Typography variant="h6">Product Selected Variations </Typography>
              <Box sx={{ width: "100%" }}>
                <Grid container spacing={1} sx={{ width: "100%" }}>
                  <Grid item xs={12} ml={1} mt={1}>
                    <Box sx={{ position: "relative" }}>
                      <DataGridPro
                        rows={rows}
                        columns={columnsData}
                        sx={{
                          ...DataGridStyle,
                          "& .MuiDataGrid-footerContainer": {
                            justifyContent: "start",
                          },
                          "& .MuiTablePagination-root": {
                            "& p": { marginBottom: "0" },
                          },
                        }}
                        checkboxSelection={false}
                        headerHeight={40}
                        autoHeight={true}
                        disableColumnFilter
                        disableSelectionOnClick
                        // hideFooter
                        components={{
                          NoRowsOverlay: () => (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                              }}
                            >
                              No variations selected yet
                            </div>
                          ),
                        }}
                      />
                      <Box
                        sx={{
                          border: "1px solid #d2d2d2",
                          borderRadius: "6px",
                          padding: "2px 6px 2px 2px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "10px",
                          position: "absolute",
                          right: "22px",
                          bottom: "8px",
                        }}
                      >
                        <Box
                          sx={{
                            background: "#d7282f",
                            padding: "6px",
                            borderRadius: "4px",
                            fontSize: "14px",
                            color: "#fff",
                            fontWeight: "600",
                          }}
                        >
                          Grand Total
                        </Box>
                        <Box
                          sx={{
                            fontSize: "18px",
                            fontWeight: "700",
                            color: "#4a4a4a",
                          }}
                        >
                          {formattedGrandTotal}
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </ConfigureOverviewCol>
          </Grid>
          {/* Grand Total:-{formattedGrandTotal} */}
          {/* {quotedetails?.caseData && optionList?.length > 1 && (
            <Grid item md={12}>
              <Box>
                <LableValueTop className="CustomizeRequestOrigin">
                  <Typography variant="h3">Origin Selection</Typography>
                  <Typography variant="body1">
                    This product is manufactured by the same company in the
                    following origins or territories. Please select your
                    preferred origin.
                  </Typography>
                </LableValueTop>
                <Box
                  sx={{
                    "& .MuiChip-root": {
                      background: "#D7282F",
                      "& .MuiChip-label": {
                        color: "#fff",
                      },
                      "& svg": {
                        color: "#fff",
                      },
                    },
                  }}
                >
                  <Autocomplete
                    multiple
                    id="multiple-limit-tags"
                    options={optionList ? optionList : []}
                    value={SelectedOrigin}
                    onChange={(e, value) => {
                      setSelectedOrigin(value);
                    }}
                    getOptionLabel={(option: any) => GetCountryName(option)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Origin"
                        placeholder="Origins"
                      />
                    )}
                    size="small"
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Box>
            </Grid>
          )} */}
          <Grid item xs={12}>
            <DelievryTerms>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Box>
                    <LableValueTop className="CustomizeRequestOrigin">
                      <Typography variant="h3">Origin Selection</Typography>
                      <Typography className="OriginDescription" variant="body1">
                        This product is manufactured by the same company in the
                        following origins or territories. Please select your
                        preferred origin.
                      </Typography>
                    </LableValueTop>
                    <Box
                      sx={{
                        "& .MuiChip-root": {
                          background: "#D7282F",
                          "& .MuiChip-label": {
                            color: "#fff",
                          },
                          "& svg": {
                            color: "#fff",
                          },
                        },
                      }}
                    >
                      <FormControl sx={{ width: "100%" }} size="small">
                        <InputLabel id="demo-select-small-label">
                          Select Preferred Origin
                        </InputLabel>
                        <Select
                          sx={{ width: "100%" }}
                          size="small"
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={countryName}
                          onChange={(e) => setCountryNames(e.target.value)}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                maxHeight: 200,
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
                            },
                          }}
                        >
                          {availableCountries?.map((country) => (
                            <MenuItem
                              style={{
                                display: "block",
                                width: "auto",
                                whiteSpace: "nowrap",
                              }}
                              key={country}
                              value={country}
                            >
                              {country}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Box>
                    <LableValueTop className="CustomizeRequestOrigin">
                      <Typography variant="h3">
                        Delivery Term Selection
                      </Typography>
                      <Typography variant="body1">
                        The seller's base price is based on{" "}
                        {["A", "E", "I", "O", "U"].includes(
                          quotedetails?.price_term?.[0]?.toUpperCase()
                        )
                          ? "an"
                          : "a"}{" "}
                        <span>{quotedetails?.price_term || "EXW"}</span>{" "}
                        delivery term. If you would like to request a quote for
                        a different delivery term, please select from the
                        following options. Please note that additional charges
                        may apply for different delivery terms.
                      </Typography>
                    </LableValueTop>
                    <Box>
                      <FormControl sx={{ width: "100%" }} size="small">
                        <InputLabel id="demo-select-small-label">
                          Select Delivery Term
                        </InputLabel>
                        <Select
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                maxHeight: 200,
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
                            },
                          }}
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={userPriceTerms}
                          label="Delivery Terms"
                          onChange={(e) => {
                            // if (
                            //   e?.target?.value == "EXW" ||
                            //   e?.target?.value == "FCA" ||
                            //   e?.target?.value == "FSA" ||
                            //   e?.target?.value == "FOB"
                            // ) {
                            //   setSeaPort({ view: "", value: "" });
                            //   setAirPort({ view: "", value: "" });
                            //   setPortCountry({ view: "", value: "" });
                            //   setRoadInfo("");
                            //   setUserPriceTerms(e.target.value);
                            // } else {
                            setUserPriceTerms(e.target.value);
                            // }
                          }}
                        >
                          {priceTermList.map((v) => (
                            <MenuItem
                              value={v.id}
                              key={v.id}
                              style={{
                                display: "block",
                                width: "auto",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {v.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </DelievryTerms>
          </Grid>
          <Grid item md={12} mt={1}>
            <Box
              sx={{
                backgroundColor: "#ECECEC",
                padding: "12px",
                borderRadius: "6px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  padding: "10px",
                }}
              >
                <Box>
                  <LableValue>
                    <Typography variant="h3">
                      Shipping Method Selection
                    </Typography>
                    <Typography variant="body1">
                      The seller offers various shipping methods to suit your
                      needs. Please select the most appropriate method for your
                      shipment.
                    </Typography>
                  </LableValue>
                  <LabelCheckboxGroup>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        sx={{
                          "& .Mui-checked": {
                            color: "#D7282F !important",
                          },
                        }}
                        value={shipingMethod}
                        onChange={(e, value) => {
                          setSeaPort({ view: "", value: "" });
                          setAirPort({ view: "", value: "" });
                          setPortCountry({ view: "", value: "" });
                          setRoadInfo("");
                          setShippingMethod(value);
                        }}
                      >
                        <FormControlLabel
                          value="sea"
                          control={<Radio size="small" />}
                          label="By Sea"
                        />
                        <FormControlLabel
                          value="air"
                          control={<Radio size="small" />}
                          label="By Air"
                        />
                        <FormControlLabel
                          value="road"
                          control={<Radio size="small" />}
                          label="By Road"
                        />
                      </RadioGroup>
                    </FormControl>
                  </LabelCheckboxGroup>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} mt={1}>
            <Box
              sx={{
                backgroundColor: "#ECECEC",
                padding: "12px",
                borderRadius: "6px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  padding: "10px",
                }}
              >
                <Box>
                  <LableValue>
                    <Typography variant="h3">Destination Port</Typography>
                    <Typography variant="body1" sx={{ margin: "0 0 6px" }}>
                      Please provide the destination port details for your
                      shipment
                    </Typography>
                  </LableValue>
                  <Grid container spacing={1} sx={{ paddingRight: "32px" }}>
                    <Grid item sm={12} xs={12} md={6}>
                      <Box>
                        <FormControl
                          sx={{ width: "calc(100% - 0px)" }}
                          size="small"
                        >
                          <Autocomplete
                            isOptionEqualToValue={(option, value) =>
                              option.value === value.value
                            }
                            disableClearable
                            id="multiple-limit-tags"
                            options={
                              country.length > 0
                                ? country
                                : [{ view: "", value: "" }]
                            }
                            value={portCountry}
                            onChange={(e, value) => {
                              setSeaPort({ view: "", value: "" });
                              setAirPort({ view: "", value: "" });
                              setRoadInfo("");
                              setPortCountry(value);
                            }}
                            ListboxProps={{
                              sx: {
                                maxHeight: "200px",
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
                            getOptionLabel={(option: any) => option.view}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Port Country"
                                placeholder="Country"
                              />
                            )}
                            size="small"
                            sx={{ width: "100%" }}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item sm={12} xs={12} md={6}>
                      <Box>
                        <FormControl
                          sx={{ width: "calc(100% - 0px)" }}
                          size="small"
                        >
                          {shipingMethod !== "road" ? (
                            <>
                              <Autocomplete
                                isOptionEqualToValue={(option, value) =>
                                  option.value === value.value
                                }
                                fullWidth
                                id="multiple-limit-tags"
                                options={
                                  shipingMethod === "sea"
                                    ? seaportList
                                    : airportList
                                }
                                value={
                                  shipingMethod === "sea" ? seaPort : airPort
                                }
                                onChange={(e, value) => {
                                  shipingMethod === "sea"
                                    ? setSeaPort(value)
                                    : setAirPort(value);
                                }}
                                onInputChange={(e: any) => {
                                  if (e?.target?.value) {
                                    shipingMethod === "sea"
                                      ? fetchSeaPort(
                                          e.target.value,
                                          portCountry?.value
                                        )
                                      : fetchAirPort(
                                          e.target.value,
                                          portCountry?.value
                                        );
                                  }
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
                                getOptionLabel={(option: any) => option.view}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    fullWidth
                                    label={
                                      shipingMethod == "sea"
                                        ? "Select Seaport"
                                        : "Select Airport"
                                    }
                                    placeholder={
                                      shipingMethod == "sea"
                                        ? "SeaPort"
                                        : "Airport"
                                    }
                                  />
                                )}
                                size="small"
                                sx={{ width: "100%" }}
                              />
                            </>
                          ) : (
                            <TextField
                              size="small"
                              label="City/Road"
                              fullWidth
                              placeholder="Place enter city/road details"
                              value={roadInfo}
                              onChange={(e) => setRoadInfo(e.target.value)}
                            />
                          )}
                        </FormControl>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Grid container mt={1}>
          <Grid item md={12}>
            <Box
              sx={{
                "& textarea": {
                  borderRadius: "4px",
                  border: "1px solid #BBBBBB",
                  outline: "none",
                  padding: "12px",
                  width: "100%",
                  fontFamily: "open sans",
                  "&:hover": {
                    borderColor: "#333333",
                  },
                },
                "& .textarea-heading": {
                  fontSize: "13px",
                  fontWeight: "600",
                  marginBottom: "4px",
                  // marginTop: "16px",
                  fontFamily: "open sans",
                },
              }}
            >
              <Typography className="textarea-heading">
                Write message to supplier to know more about your request
              </Typography>
              <TextareaAutosize
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                aria-label="minimum height"
                minRows={2}
                placeholder="If you have any specific requirements, preferences, questions or inquiries, please provide them here"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductItemCustomizeConfigCase;
