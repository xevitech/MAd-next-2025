import React, { useEffect, useState } from "react";
import {
  ConfigAddAttatchment,
  ConfigSummaryInn,
  ConfigSummaryOuter,
  ConfigTotalBox,
  ConFigueOverView,
  ConFigueOverViewInn,
  ConfigueProductInfo,
  ConfigueUserAddress,
  ConfigureOverviewCol,
  ConfigureOverviewColData,
  CProductImage,
  DelievryTerms,
  FlexDiv,
  LabelCheckboxGroup,
  LableValue,
  LableValueTop,
  PlanBadge,
  SubjectLine,
  TabInnData,
  UserthumbImg,
  WriteMessagBox,
} from "./style";
import {
  Autocomplete,
  Box,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextareaAutosize,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import {
  apiClient,
  CheckOs,
  getCountryNameByCode,
} from "@/components/common/common";
import Image from "next/image";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { countriesList } from "@/utils/countriesphp";
import _debounce from "lodash/debounce";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { ImagesBox, ImgContainer } from "@/components/common/dropZone/style";
import AttachmentsView from "./NewQueryModal/AttachmentsView";

export default function CustomiseRequestConfig({
  id,
  totalPrice,
  filterData,
  sendDataToParent,
  tabData,
}) {
  const { quotedetails } = useSelector((state: any) => state.quoteDetails);
  const [attachment, setAttachments] = useState<any>([]);
  const [customiseRequest, setCustomiseRequestData] = useState<any>("");
  const [userPriceTerms, setUserPriceTerms] = useState<any>("");
  const [priceTermList, setPriceTermList] = useState<any>([]);
  const country = countriesList.map((v) => ({ value: v.code, view: v.name }));
  const [portCountry, setPortCountry] = useState<any>({ value: "", view: "" });
  const [seaPort, setSeaPort] = useState<any>({ value: "", view: "" });
  const [airPort, setAirPort] = useState<any>({ value: "", view: "" });
  const [roadInfo, setRoadInfo] = useState<any>("");
  const [shipingMethod, setShippingMethod] = useState<any>("sea");
  const [userMessage, setUserMessage] = useState<string>("");
  const [sendQueryButtonActive, setSendQueryButtonActive] =
    useState<boolean>(false);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const fetchSeaPort = React.useRef(
    _debounce(async (value, country) => {
      if (value) {
        await FetchSeaPortList(value, country);
      }
    }, 500)
  ).current;
  const fetchAirPort = React.useRef(
    _debounce(async (value, country) => {
      if (value) {
        await FetchAirPortList(value, country);
      }
    }, 500)
  ).current;
  useEffect(() => {
    handleQuote();
    FetchPriceTerm();
  }, []);
  useEffect(() => {
    sendDataToParent(data);
  }, [
    seaPort,
    airPort,
    roadInfo,
    shipingMethod,
    userMessage,
    priceTermList,
    userPriceTerms,
    customiseRequest,
    attachment,
    customiseRequest,
    portCountry,
  ]);
  let data = {
    seaPort,
    airPort,
    roadInfo,
    shipingMethod,
    userMessage,
    priceTermList,
    userPriceTerms,
    attachment,
    customiseRequest,
    portCountry,
  };

  useEffect(() => {
    FetchSeaPortList("a");
    FetchAirPortList("a");
  }, []);
  const importData = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "";
    input.multiple = true;
    input.onchange = (_) => {
      let files = Array.from(input.files);
      setAttachments([...attachment, ...files]);
    };
    input.click();
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

  const FetchPriceTerm = async () => {
    let response = await apiClient("price_terms", "get");
    if (response.status == 200) {
      setPriceTermList(response.data);
    }
  };
  const handleQuote = async () => {
    let response = await apiClient("front/single/view", "post", {
      body: { id: id },
    });
    if (response.status === 200) {
      setCustomiseRequestData(response?.data);
    }
  };

  const [seaportList, setSeaportList] = useState<any>([
    { value: "", view: "" },
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

  const [airportList, setAirportList] = useState<any>([
    { value: "", view: "" },
  ]);
  const renderAttributeItems = (attribute, name) => {
    return (
      <Grid container spacing={2}>
        {attribute.map((item) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <ConFigueOverViewInn>
                <Typography variant="h5">
                  {`${name.charAt(0).toUpperCase() + name.slice(1)} `}
                </Typography>
                <Typography variant="body1">
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </Typography>
              </ConFigueOverViewInn>
            </Grid>
          );
        })}
      </Grid>
    );
  };
  const parsed = customiseRequest?.caseData
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
  return (
    <div>
      <TabInnData>
        <Grid container spacing={2}>
          <Grid item xs={9} sm={4} lg={7} xl={7}>
            <Box sx={{ display: "flex", gap: "8px" }}>
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
                    <Typography variant="subtitle1">
                      {customiseRequest?.unique_number} |
                      {customiseRequest?.name}
                      <Tooltip title="Edit" placement="top">
                        <EditIcon />
                      </Tooltip>
                    </Typography>
                  </FlexDiv>
                </SubjectLine>
              </ConfigueUserAddress>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={5} xl={5}>
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
                    </ConfigueProductInfo>
                  </Grid>
                </Grid>
              </ConFigueOverView>
            </ConfigueUserAddress>
          </Grid>
        </Grid>
        <ConfigureOverviewCol>
          <Typography variant="h6">
            Product features & Characteristics
          </Typography>

          <Grid container>
            {typeof customiseRequest?.specification_options === "object" &&
              customiseRequest?.specification_options &&
              Object.keys(customiseRequest?.specification_options).map(
                (key) => {
                  return (
                    <Grid key={key}>
                      {renderAttributeItems(
                        customiseRequest?.specification_options[key],
                        key
                      )}
                    </Grid>
                  );
                }
              )}
          </Grid>
        </ConfigureOverviewCol>
        <DelievryTerms>
          <Grid container spacing={1}>
            <Grid item md={6}>
              <Box>
                <LableValueTop>
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
                    size={"small"}
                    multiple
                    disableClearable={false}
                    disabled={true}
                    id="product-list-autocomplete"
                    options={[]}
                    getOptionLabel={(option: any) => option}
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
                    onChange={(e, values) => {}}
                    sx={{ width: "100% " }}
                    value={countryNames ?? ["in"]}
                    defaultValue={countryNames ?? ["in"]}
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
                            {...params}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: null,
                            }}
                          />
                        </>
                      );
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box>
                <LableValueTop>
                  <Typography variant="h3">Delivery Term Selection</Typography>
                  <Typography variant="body1">
                    The seller's base price is based on an{" "}
                    <span>Delievery Terms</span> delivery term. If you would
                    like to request a quote for a different delivery term,
                    please select from the following options, Please note that
                    additional charges may apply for different delivery terms.
                  </Typography>
                </LableValueTop>
                <Box>
                  <FormControl fullWidth>
                    <InputLabel size="small" id="delivery-term-label">
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
                        if (
                          e?.target?.value == "EXW" ||
                          e?.target?.value == "FCA" ||
                          e?.target?.value == "FSA" ||
                          e?.target?.value == "FOB"
                        ) {
                          setUserPriceTerms(e.target.value);
                        } else {
                          setUserPriceTerms(e.target.value);
                        }
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

                    {/* {!priceTerm && <span
                  style={{
                    display: "flex",
                    alignItems:"center",
                    color: "#d7282f",
                  }}
                >
                  <img
                    src="/assets/error-outline-red.svg"
                    alt=""
                    style={{
                      width: "8px",
                      height: "8px",
                      marginRight: "4px",
                    }}
                  />
                  <div>{"Please select delivery term"}</div>
                </span>}      */}
                  </FormControl>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DelievryTerms>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
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
                    padding: "0 0 10px 0",
                  }}
                >
                  <Grid container spacing={2} sx={{ margin: "0" }}>
                    <Grid item md={6}>
                      <Box>
                        <LableValue>
                          <Typography variant="h3">
                            Shipping Method Selection
                          </Typography>
                          <Typography variant="body1">
                            The seller offers various shipping methods to suit
                            your needs. Please select the most appropriate
                            method for your shipment.
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
                    </Grid>
                    <Grid item md={6}>
                      <Box>
                        <LableValue>
                          <Typography variant="h3">Destination Port</Typography>
                          <Typography
                            variant="body1"
                            sx={{ margin: "0 0 6px" }}
                          >
                            Please provide the destination port details for your
                            shipment
                          </Typography>
                        </LableValue>
                        <Grid
                          container
                          spacing={1}
                          sx={{ paddingRight: "32px" }}
                        >
                          <Grid item md={6}>
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
                          <Grid item md={6}>
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
                                      disabled={
                                        userPriceTerms == "EXW" ||
                                        userPriceTerms == "FCA" ||
                                        userPriceTerms == "FSA" ||
                                        userPriceTerms == "FOB"
                                          ? true
                                          : false
                                      }
                                      id="multiple-limit-tags"
                                      options={
                                        shipingMethod === "sea"
                                          ? seaportList
                                          : airportList
                                      }
                                      value={
                                        shipingMethod === "sea"
                                          ? seaPort
                                          : airPort
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
                                      getOptionLabel={(option: any) =>
                                        option.view
                                      }
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
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
                                    placeholder="Place enter city/road details"
                                    value={roadInfo}
                                    disabled={
                                      userPriceTerms == "EXW" ||
                                      userPriceTerms == "FCA" ||
                                      userPriceTerms == "FSA" ||
                                      userPriceTerms == "FOB"
                                        ? true
                                        : false
                                    }
                                    onChange={(e) =>
                                      setRoadInfo(e.target.value)
                                    }
                                  />
                                )}
                              </FormControl>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Grid container>
          <Grid item md={12}>
            <WriteMessagBox>
              <Typography variant="body1">
                Write message to supplier to know more about your request
              </Typography>
              <TextareaAutosize
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                aria-label="minimum height"
                minRows={2}
                placeholder="If you have any specific requirements, preferences, questions or inquiries, please provide them here"
              />
            </WriteMessagBox>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={12}>
            <ConfigAddAttatchment>
              <label>
                If you have any relevant documents or files to share with the
                supplier.
              </label>
              <Box>
                <Link onClick={importData} sx={{ margin: "5px 0 0" }}>
                  <i className="icon-attachment"></i>Add Attachment
                </Link>
              </Box>
              <Box display="flex" alignItems="center" pt={1.5} gap="16px">
                {attachment?.length > 0 &&
                  attachment?.map((v, index) => {
                    return (
                      <Box
                        sx={{
                          position: "relative",
                          display: "flex",
                          "& .MuiSvgIcon-root": {
                            position: "absolute",
                            right: "-8px",
                            top: "-8px",
                            fontSize: "18px",
                            background: "#ffffff",
                            borderRadius: "100%",
                            "&:hover": {
                              color: "#DA020A",
                            },
                          },
                        }}
                        key={`${v?.id ?? `attachment${index + 1}`}`}
                      >
                        <CancelOutlinedIcon
                          sx={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setAttachments((prev) => {
                              let list = [...prev];
                              list.splice(index, 1);
                              return list;
                            });
                          }}
                        />
                        <Box
                          sx={{
                            width: "50px",
                            height: "50px",
                            padding: "5px",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                          }}
                        >
                          <ImgContainer>
                            <ImagesBox>
                              <AttachmentsView
                                imageUrl={
                                  v.id ? v.source : URL.createObjectURL(v)
                                }
                              />
                            </ImagesBox>
                          </ImgContainer>
                        </Box>
                      </Box>
                    );
                  })}
              </Box>
            </ConfigAddAttatchment>
          </Grid>
        </Grid>
        <ConfigSummaryOuter>
          <ConfigSummaryInn>
            <Typography variant="h5">Product Summary</Typography>
            <ConfigTotalBox>
              <Typography variant="h3">Total Price:</Typography>
              <Typography variant="body1">${totalPrice}</Typography>
            </ConfigTotalBox>
          </ConfigSummaryInn>
        </ConfigSummaryOuter>
      </TabInnData>
    </div>
  );
}
