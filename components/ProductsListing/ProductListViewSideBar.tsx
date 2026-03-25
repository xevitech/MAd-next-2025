import {
  Box,
  InputAdornment,
  List,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  ListVieRelatedProductArea,
  MyImageBox,
  RelatedListingInnerBox,
  RelatedListingProducts,
  RelatedProductBox,
  SidebarHeading,
  SidebarMaintext,
  SidebarOuterBox,
  SidebarRedtext,
  SidebarSearchText,
} from "./style";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { CurrencySymbol, ReplaceSpaces } from "../common/common";
import { useSelector } from "react-redux";
import { LightTooltip } from "../common/Tooltip/tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
export default function ProductListViewSideBar(props) {
  let relatedProducts = props?.relatedLikedProducts;

  const [popularSearch, setpopularSearch] = useState(
    props?.mostSearchesProducts
  );

  const router = useRouter();

  const addQueryParams = (name) => {
    if (name == "") {
      delete router.query.name;
      router.push(router);
      return;
    }
    router.query.name = name;
    router.push(router);
  };

  const filterSearch = async (input) => {
    if (input != "") {
      setpopularSearch(
        props?.mostSearchesProducts?.filter((product) =>
          product.product_name.toLowerCase().includes(input.toLowerCase())
        )
      );
    } else {
      setpopularSearch(props?.mostSearchesProducts);
    }
  };

  const unit = useSelector((state: any) => state.header.unit);

  const UnitName = (unit_id) => {
    return unit.find((v) => v.id == unit_id)?.name ?? "NA";
  };

  const Navigate = (data: any) => {
    const { slug, category_name, company_details } = data;
    window.open(
      `/productdetail/${ReplaceSpaces(category_name)}/${ReplaceSpaces(
        company_details?.slug ?? ""
      )}/${ReplaceSpaces(slug)}`,
      "_blank",
      "noreferrer"
    );
  };

  let toolTipData = (tooltipMessage: any) => {
    return `The seller's base price is based on an <b>${tooltipMessage?.replaceAll(
      ",",
      ", "
    )}</b> delivery term.`;
  };

  return (
    <ListVieRelatedProductArea>
      <SidebarOuterBox>
        <SidebarHeading>You might Also like</SidebarHeading>
        <RelatedListingProducts>
          {relatedProducts?.length > 0 &&
            relatedProducts?.map((data, index) => {
              console.log(data, "relateddataz");
              return (
                <RelatedListingInnerBox
                  key={index}
                  onClick={() => Navigate(data)}
                  sx={{ cursor: "pointer" }}
                >
                  <MyImageBox>
                    <img src={data?.main_image} alt={data?.product_name} />
                  </MyImageBox>
                  <Box>
                    <SidebarMaintext className="sidebarproductnme">
                      {data?.product_name}
                    </SidebarMaintext>
                    <SidebarRedtext>
                      <Box
                        component={"span"}
                        sx={{ fontSize: "10px", color: "#4a4a4a" }}
                      >
                        {/* {data.product_type == "simple" && (
                        <Box
                          sx={{
                            fontSize: "13px",
                            color: "#4A4A4A",
                            display: "flex",
                            alignItems: "baseline",
                            gap: "4px",
                            marginTop: "1px",
                            paddingBottom: "8px",
                            "& .MuiTypography-h6": {
                              fontSize: "13px",
                              color: "#D7282F",
                              fontWeight: "600",
                              "@media screen and (max-width:1500px)": {
                                fontSize: "11px",
                              },
                              "& span": {
                                fontSize: "12px",
                                color: "#4A4A4A",
                              },
                            },
                          }}
                        >
                          {data?.hide_price == 1 &&
                            data.price_type == "fixed" && <>Price:</>}
                          {data.price_type == "quantity" &&
                            data.quantity_status == 1 && <>Price:</>}
                          {data.availability == "in_stock" ? (
                            data.price_type == "quantity" ? (
                              data.quantity_status == 1 ? (
                                <Typography variant="h6">
                                  {CurrencySymbol(data.currency_id)}
                                  {data.price_range[0]?.toLocaleString()} -{" "}
                                  {CurrencySymbol(data.currency_id)}
                                  {data.price_range[1]?.toLocaleString()}{" "}
                                  <span>/ {data.qty_unit_name}</span>
                                  <LightTooltip
                                    disableInteractive
                                    arrow
                                    title={
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: `${toolTipData(
                                            data?.price_term
                                          )}`,
                                        }}
                                      ></div>
                                    }
                                    placement="top"
                                  >
                                    <InfoOutlinedIcon
                                      style={{
                                        color: "#0AA133",
                                        fontSize: "13px",
                                        margin: "0px 2px -3px",
                                      }}
                                    />
                                  </LightTooltip>
                                </Typography>
                              ) : (
                                <Typography
                                  variant="h6"
                                  style={{ visibility: "hidden" }}
                                >
                                  Ask price
                                </Typography>
                              )
                            ) : (
                              <>
                                {data.hide_price == 0 ? (
                                  <Typography
                                    variant="h6"
                                    style={{ visibility: "hidden" }}
                                  >
                                    "Ask price"
                                  </Typography>
                                ) : (
                                  <>
                                    <Typography variant="h6">
                                      {`${CurrencySymbol(data.currency_id)}`}
                                      {Number(
                                        data.unit_price
                                      ).toLocaleString()}{" "}
                                      <span>/ {data.unit_name}</span>
                                      <LightTooltip
                                        disableInteractive
                                        arrow
                                        title={
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: `${toolTipData(
                                                data?.price_term
                                              )}`,
                                            }}
                                          ></div>
                                        }
                                        placement="top"
                                      >
                                        <InfoOutlinedIcon
                                          style={{
                                            color: "#0AA133",
                                            fontSize: "13px",
                                            margin: "0px 2px -3px",
                                          }}
                                        />
                                      </LightTooltip>
                                    </Typography>
                                  </>
                                )}
                              </>
                            )
                          ) : data.price_type == "quantity" ? (
                            <Typography variant="h6">
                              {CurrencySymbol(data.currency_id)}
                              {data.price_range[0].toLocaleString()} -{" "}
                              {CurrencySymbol(data.currency_id)}
                              {data.price_range[1].toLocaleString()} /{" "}
                              <span>{data.qty_unit_name}</span>
                              <LightTooltip
                                disableInteractive
                                arrow
                                title={
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: `${toolTipData(
                                        data?.price_term
                                      )}`,
                                    }}
                                  ></div>
                                }
                                placement="top"
                              >
                                <InfoOutlinedIcon
                                  style={{
                                    color: "#0AA133",
                                    fontSize: "13px",
                                    margin: "0px 2px -3px",
                                  }}
                                />
                              </LightTooltip>
                            </Typography>
                          ) 
                          : (
                            <>
                              {data.hide_price == 0 ? (
                                <Typography
                                  variant="h6"
                                  style={{ visibility: "hidden" }}
                                >
                                  Ask price
                                </Typography>
                              ) : (
                                <Typography variant="h6">
                                  {`${CurrencySymbol(data.currency_id)}${
                                    data.unit_price
                                  } /
                                  ${data.unit_name ?? data.qty_unit_name}`}
                                  <LightTooltip
                                    disableInteractive
                                    arrow
                                    title={
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: `${toolTipData(
                                            data?.price_term
                                          )}`,
                                        }}
                                      ></div>
                                    }
                                    placement="top"
                                  >
                                    <InfoOutlinedIcon
                                      style={{
                                        color: "#0AA133",
                                        fontSize: "13px",
                                        margin: "0px 2px -3px",
                                      }}
                                    />
                                  </LightTooltip>
                                </Typography>
                              )}
                            </>
                          )}
                        </Box>
                      )} */}
                        {/* {(data.product_type == "simple" &&
                          (data.price_type == "fixed" ||
                            data.price_type == "quantity")) ||
                        data?.hide_price == 1 ? (
                          <Box
                            sx={{
                              fontSize: "13px",
                              color: "#4A4A4A",
                              display: "flex",
                              alignItems: "baseline",
                              gap: "4px",
                              marginTop: "1px",
                              paddingBottom: "8px",
                              "& .MuiTypography-h6": {
                                fontSize: "13px",
                                color: "#D7282F",
                                fontWeight: "600",
                                "@media screen and (max-width:1500px)": {
                                  fontSize: "11px",
                                },
                                "& span": {
                                  fontSize: "12px",
                                  color: "#4A4A4A",
                                },
                              },
                            }}
                          >
                            Price:
                            <Typography variant="h6">
                              {data.price_type === "fixed"
                                ? `${CurrencySymbol(data.currency_id)}
                                  ${data.unit_price?.toLocaleString()}`
                                : `${CurrencySymbol(
                                    data.currency_id
                                  )}${data.price_range[0]?.toLocaleString()} - ${CurrencySymbol(
                                    data.currency_id
                                  )}${data.price_range[1]?.toLocaleString()}`}

                              <span>
                                / {data.qty_unit_name ?? data.unit_name}
                              </span>
                              <LightTooltip
                                disableInteractive
                                arrow
                                title={
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: `${toolTipData(
                                        data?.price_term
                                      )}`,
                                    }}
                                  ></div>
                                }
                                placement="top"
                              >
                                <InfoOutlinedIcon
                                  style={{
                                    color: "#0AA133",
                                    fontSize: "13px",
                                    margin: "0px 2px -3px",
                                  }}
                                />
                              </LightTooltip>
                            </Typography>
                          </Box>
                        ) : null} */}
                        {data.product_type === "simple" ? (
                          <Box
                            sx={{
                              fontSize: "13px",
                              color: "#4A4A4A",
                              display: "flex",
                              alignItems: "baseline",
                              gap: "4px",
                              marginTop: "1px",
                              paddingBottom: "8px",
                              "& .MuiTypography-h6": {
                                fontSize: "13px",
                                color: "#D7282F",
                                fontWeight: "600",
                                "@media screen and (max-width:1500px)": {
                                  fontSize: "11px",
                                },
                                "& span": {
                                  fontSize: "12px",
                                  color: "#4A4A4A",
                                },
                              },
                            }}
                          >
                            {data.is_placeholder === "yes" ? (
                              <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              {data.availability === "by_order" ||
                              data.availability === "in_stock" ? (
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  Price:
                                  <Typography variant="h6">
                                    {data.price_type === "fixed" ? (
                                      <>
                                        {data?.symbol}
                                        {data.unit_price?.toLocaleString()}
                                        <span>/ {data.unit_name}</span>
                                      </>
                                    ) : data.price_type === "quantity" ? (
                                      <>
                                        {`${
                                          data?.symbol
                                        }${data.price_range[0]?.toLocaleString()} - ${
                                          data?.symbol
                                        }${data.price_range[1]?.toLocaleString()}`}
                                        <span>/ {data.qty_unit_name}</span>
                                      </>
                                    ) : (
                                      <>
                                        {data?.price_unavailable_type ? (
                                          "Price:"
                                        ) : (
                                          <Box sx={{ height: "22px" }}></Box>
                                        )}
                                        <Typography
                                          variant="h6"
                                          sx={{ color: "#D7282F" }}
                                        >
                                          {data.price_unavailable_type ? (
                                            <>{data.price_unavailable_type}</>
                                          ) : (
                                            <Box sx={{ height: "22px" }}></Box>
                                          )}
                                        </Typography>
                                      </>
                                    )}
        
                                    {data?.price_term && (
                                      <LightTooltip
                                        disableInteractive
                                        arrow
                                        title={
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: `${toolTipData}`,
                                            }}
                                          ></div>
                                        }
                                        placement="top"
                                      >
                                        <InfoOutlinedIcon
                                          style={{
                                            color: "#0AA133",
                                            fontSize: "11px",
                                            margin: "0px 2px -3px",
                                          }}
                                        />
                                      </LightTooltip>
                                    )}
                                  </Typography>
                                </Box>
                              ) : null}
                            </Box>
                            ) : data.availability === "by_order" ||
                              data.availability === "in_stock" ? (
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                Price:
                                <Typography variant="h6">
                                  {data.price_type === "fixed" ? (
                                    <>
                                      {data?.symbol}
                                      {data.unit_price?.toLocaleString()}
                                      <span>/ {data.unit_name}</span>
                                    </>
                                  ) : data.price_type === "quantity" ? (
                                    <>
                                      {`${
                                        data?.symbol
                                      }${data.price_range[0]?.toLocaleString()} - ${
                                        data?.symbol
                                      }${data.price_range[1]?.toLocaleString()}`}
                                      <span>/ {data.qty_unit_name}</span>
                                    </>
                                  ) : null}
                                  {data?.price_term && (
                                    <LightTooltip
                                      disableInteractive
                                      arrow
                                      title={
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: `${toolTipData}`,
                                          }}
                                        ></div>
                                      }
                                      placement="top"
                                    >
                                      <InfoOutlinedIcon
                                        style={{
                                          color: "#0AA133",
                                          fontSize: "11px",
                                          margin: "0px 2px -3px",
                                        }}
                                      />
                                    </LightTooltip>
                                  )}
                                </Typography>
                              </Box>
                            ) : null}
                          </Box>
                        ) : null}

                        {data.product_type == "configured" && (
                          <Box
                            sx={{
                              fontSize: "14px",
                              color: "#4A4A4A",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              marginTop: "6px",
                              paddingBottom: "8px",
                              "& .MuiTypography-h6": {
                                fontSize: "16px",
                                color: "#D7282F",
                                fontWeight: "600",
                              },
                              "& .MuiTypography-body1": {
                                fontSize: "12px",
                              },
                            }}
                          >
                            <Typography variant="h6">
                              <Typography
                                variant="h6"
                                style={{ visibility: "hidden" }}
                              >
                                {"Ask price"}
                              </Typography>
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </SidebarRedtext>
                  </Box>
                </RelatedListingInnerBox>
              );
            })}
        </RelatedListingProducts>
      </SidebarOuterBox>
      <SidebarOuterBox>
        <SidebarHeading>Popular Searches</SidebarHeading>
        <RelatedProductBox>
          <TextField
            fullWidth
            size="small"
            placeholder="Explore Products"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#d7282f" }} />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              filterSearch(e.target.value);
            }}
          />
        </RelatedProductBox>
        <Box>
          <List>
            {popularSearch?.length > 0 &&
              popularSearch?.map((search, index) => (
                <SidebarSearchText
                  key={index}
                  sx={{ cursor: "pointer" }}
                  onClick={(event) => {
                    addQueryParams(search?.product_name);
                  }}
                >
                  {search?.product_name}
                </SidebarSearchText>
              ))}
          </List>
        </Box>
      </SidebarOuterBox>
    </ListVieRelatedProductArea>
  );
}
