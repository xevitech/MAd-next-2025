import React from "react";
import {
  AccordionContent,
  ApplyButtonWrapper,
  BoxAccordianInner,
  ButtonContainer,
  CategoryName,
  ColorBoxValue,
  CountryName,
  DataGridStyleIcon,
  DateAndTime,
  DialogProductInfo,
  EditModeProductTitle,
  EnquiryDetailData,
  FilledButton,
  FilterIconStyle,
  GreenboxValue,
  GreenboxValuesmall,
  HeadingInfo,
  HelpIcon,
  EnquiryLeadImage,
  InfoButtonContainer,
  LeftFilterMenuList,
  QuantityBox,
  MultipleButton,
  OutLinedButton,
  OuterContentAccor,
  ProductBasicInformation,
  ProductBgInfo,
  ProductBoxLeft,
  ProductBoxRight,
  OverViewInfoP,
  ProductNameBox,
  ProductTitle,
  RProductLabel,
  AmountValue,
  GreyBoxInfo,
  CustomizeInfoInn,
  CustomizeInfosection,
  CustomInfoTitle,
  CustomSelectedChip,
  CountryChip,
  CustomInfoValue,
  DestinationPort,
  DestinationPortInn,
  CustomInfoValue2,
  ProductImageBox,
  MainRightData,
  ProductFeatureSection,
  SpecificationHeading,
  BrandBoxStyle,
  DataProductTypeData1,
  DataProductTypeInner,
  OverViewHeading,
  OverViewSection,
  OverViewInfo,
  OverinfoLabel,
  OverinfoValue,
  OverViewSection2,
  PriceQuoteColumn,
  PriceQuoteInfo,
  PriceTermVlue,
  ProductID,
} from "./style";
import {
  Box,
  Divider,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { LightTooltip } from "../common/Tooltip/tooltip";
export default function SimpleRfqFlyout({ listData }) {
  return (
    <div>
      <BoxAccordianInner>
        <OuterContentAccor>
          <AccordionContent>
            <ProductBgInfo>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8} md={8}>
                  <ProductBoxLeft>
                    <ProductNameBox>
                      <ProductImageBox>
                        <img
                          src="https://merchantad.xevitech.com/public/uploads/product/gallery/Screenshot from 2024-04-25 09-42-27.png"
                          alt=""
                        />
                      </ProductImageBox>
                      <div>
                        <ProductTitle>{listData?.product_name}</ProductTitle>
                        <ProductID>
                          <span>Product Id: </span> {listData?.product_id}
                        </ProductID>
                        <CategoryName>
                          <span>Category Name:</span>
                          {listData?.category_lists.map((item, index) => (
                            <span key={index}>
                              {" "}
                              {item?.name}
                              {index < listData.category_lists.length - 1
                                ? ", "
                                : ""}
                            </span>
                          ))}
                        </CategoryName>
                      </div>
                    </ProductNameBox>
                  </ProductBoxLeft>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <MainRightData sx={{ float: "right" }}>
                    <ProductBoxRight>
                      <CountryName>{listData?.country_origins?listData?.country_origins:'N/A'}</CountryName>
                      <DateAndTime variant="body2">
                        {/* <CalendarMonthOutlinedIcon />
                        May 2, 1:24 pm */}
                      </DateAndTime>
                    </ProductBoxRight>
                  </MainRightData>
                </Grid>
              </Grid>
            </ProductBgInfo>

            <OverViewInfoP>
              <OverViewHeading>
                <Typography> Overview</Typography>
              </OverViewHeading>
              <OverViewSection>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={2.5} md={2.5}>
                    <BrandBoxStyle>
                      <Typography variant="h6">
                        {"Manufacturer/Brand"}
                      </Typography>
                      <Typography variant="body1">
                        <LightTooltip
                          disableInteractive
                          arrow
                          title={"Brand Name"}
                          placement="top"
                        >
                          <span>---</span>
                        </LightTooltip>
                      </Typography>
                    </BrandBoxStyle>
                  </Grid>
                  <Grid item xs={6} sm={2.5} md={2.5}>
                    <OverViewInfo>
                      <OverinfoLabel>Manufacturing Year</OverinfoLabel>
                      <OverinfoValue>
                        {listData?.manufacturer_year
                          ? listData?.manufacturer_year
                          : "N/A"}
                      </OverinfoValue>
                    </OverViewInfo>
                  </Grid>
                  <Grid item xs={6} sm={2.5} md={2.5}>
                    <OverViewInfo>
                      <OverinfoLabel>Model No.</OverinfoLabel>
                      <OverinfoValue>
                        {listData?.model_number
                          ? listData?.model_number
                          : "N/A"}
                      </OverinfoValue>
                    </OverViewInfo>
                  </Grid>
                  <Grid item xs={6} sm={2.5} md={2.5}>
                    <OverViewInfo>
                      <OverinfoLabel>Condition</OverinfoLabel>
                      <OverinfoValue>
                        {listData?.condition ? listData?.condition : "N/A"}
                      </OverinfoValue>
                    </OverViewInfo>
                  </Grid>
                  <Grid item xs={6} sm={2} md={2}>
                    <OverViewInfo>
                      <OverinfoLabel>Post Validity</OverinfoLabel>
                      <OverinfoValue>
                        {listData?.validity ? listData?.validity : "N/A"}
                      </OverinfoValue>
                    </OverViewInfo>
                  </Grid>
                </Grid>
              </OverViewSection>

              <OverViewSection2>
                <ProductFeatureSection
                  sx={{ background: "none", padding: "0 12px 10px" }}
                >
                  <SpecificationHeading
                    variant="h3"
                    sx={{
                      padding: "0 0 10px",
                    }}
                  >
                    Product Features & Characteristics
                  </SpecificationHeading>
                  <Box
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "12px",
                      },
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={3} md={3}>
                        <RProductLabel>Related Power</RProductLabel>
                        <Typography>---</Typography>
                      </Grid>
                      <Grid item xs={6} sm={3} md={3}>
                        <RProductLabel>Fule</RProductLabel>
                        <Typography>---</Typography>
                      </Grid>
                      <Grid item xs={6} sm={3} md={3}>
                        <RProductLabel>Pressure</RProductLabel>
                        <Typography>--</Typography>
                      </Grid>
                      <Grid item xs={6} sm={3} md={3}>
                        <RProductLabel>Quantity / Unit</RProductLabel>
                        <Typography>--</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </ProductFeatureSection>
              </OverViewSection2>
            </OverViewInfoP>
            {/* <DataProductTypeData1>
              <Typography>
                This is{" "}
                <span className="in-stockp">
                  {listData?.availability === "in_stock"
                    ? "In Stock"
                    : listData?.availability}
                </span>{" "}
                product, available for purchase at below listed price.
              </Typography>
              <DataProductTypeInner>
                <PriceQuoteColumn>
                  <Grid container>
                    <Grid item xs={12} md="auto" sx={{ padding: "0" }}>
                      <PriceQuoteInfo>
                        <Typography variant="h5">US$50.00</Typography>
                        <Typography variant="body1">1 - 99 pieces</Typography>
                      </PriceQuoteInfo>
                    </Grid>
                    <Grid item xs={12} md="auto" sx={{ padding: "0" }}>
                      <PriceQuoteInfo>
                        <Typography variant="h5">US$50.00</Typography>
                        <Typography variant="body1">1 - 99 pieces</Typography>
                      </PriceQuoteInfo>
                    </Grid>
                    <Grid item xs={12} md="auto" sx={{ padding: "0" }}>
                      <PriceQuoteInfo>
                        <Typography variant="h5">US$50.00</Typography>
                        <Typography variant="body1">1 - 99 pieces</Typography>
                      </PriceQuoteInfo>
                    </Grid>
                    <Grid item xs={12} md="auto" sx={{ padding: "0" }}>
                      <PriceQuoteInfo>
                        <Typography variant="h5">US$50.00</Typography>
                        <Typography variant="body1">1 - 99 pieces</Typography>
                      </PriceQuoteInfo>
                    </Grid>
                    <Grid item xs={12} md="auto" sx={{ padding: "0" }}>
                      <PriceQuoteInfo>
                        <Typography variant="h5">US$50.00</Typography>
                        <Typography variant="body1">1 - 99 pieces</Typography>
                      </PriceQuoteInfo>
                    </Grid>
                    <Grid item xs={12} md="auto" sx={{ padding: "0" }}>
                      <PriceTermVlue>
                        <Typography variant="h6">
                          EX Work
                          <LightTooltip
                            disableInteractive
                            arrow
                            placement="top"
                            title={"EX Work"}
                          >
                            <InfoOutlinedIcon />
                          </LightTooltip>
                        </Typography>
                      </PriceTermVlue>
                    </Grid>
                  </Grid>
                </PriceQuoteColumn>
              </DataProductTypeInner>
            </DataProductTypeData1> */}

            <QuantityBox>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FormControl sx={{ width: 80 }} size="small">
                  <TextField
                    size="small"
                    variant="outlined"
                    id="outlined-basic"
                    label="Quantity"
                    defaultValue="100"
                    value={listData?.quantity}
                    InputProps={{
                      readOnly: true,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
                <span>{listData?.quantity}/unit</span>
              </div>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "50px",
                }}
              >
                <Box>
                  <RProductLabel>Unit Price</RProductLabel>
                  <Typography>USD 25000</Typography>
                </Box>
                <Box>
                  <RProductLabel>Amount</RProductLabel>
                  <AmountValue>
                    <span>USD 12,500,000</span>
                  </AmountValue>
                </Box>
              </Box>
            </QuantityBox>
          </AccordionContent>
        </OuterContentAccor>
      </BoxAccordianInner>

      <GreyBoxInfo>
        <ProductTitle className="customize-title">
          Customize Your Request
        </ProductTitle>
        <CustomizeInfoInn>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6}>
              <CustomizeInfosection>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={7} md={7}>
                    <div>
                      <CustomInfoTitle>Origin</CustomInfoTitle>
                      <CustomSelectedChip>
                        <CountryChip>
                          {!listData?.selectedOrigin
                            ? listData?.selectedOrigin
                            : "N/A"}
                        </CountryChip>
                       
                      </CustomSelectedChip>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={5} md={5}>
                    <div className="Myinfovalues">
                      <CustomInfoTitle>Delivery Term</CustomInfoTitle>
                      <CustomInfoValue>
                        {listData?.delivery_terms}
                      </CustomInfoValue>
                    </div>
                  </Grid>
                </Grid>
              </CustomizeInfosection>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <CustomizeInfosection>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={5} md={5}>
                    <div>
                      <CustomInfoTitle>Shipping Method</CustomInfoTitle>
                      <CustomInfoValue>
                        {listData?.shipingMethod
                          ? listData?.shipingMethod
                          : "N/A"}
                      </CustomInfoValue>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <div className="Myinfovalues">
                      <CustomInfoTitle>Destination Port</CustomInfoTitle>
                      <DestinationPort>
                        <DestinationPortInn>
                          <CustomInfoValue> Port Country</CustomInfoValue>
                          <CustomInfoValue2>
                            {listData?.port_ ? listData?.port_ : "N/A"}
                          </CustomInfoValue2>
                        </DestinationPortInn>
                        <DestinationPortInn>
                          <CustomInfoValue>Sea port</CustomInfoValue>
                          <CustomInfoValue2>
                            {listData?.sea_ ? listData?.sea_ : "N/A"}
                          </CustomInfoValue2>
                        </DestinationPortInn>
                      </DestinationPort>
                    </div>
                  </Grid>
                </Grid>
              </CustomizeInfosection>
            </Grid>
          </Grid>
        </CustomizeInfoInn>
      </GreyBoxInfo>
      <GreyBoxInfo>
        <ProductTitle className="customize-title">
          More Information
        </ProductTitle>
        <CustomizeInfoInn>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <CustomizeInfosection>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} md={6}>
                    <div>
                      <CustomInfoTitle>Purpose Of Inquiry</CustomInfoTitle>
                      <DestinationPort>
                        <DestinationPortInn>
                          <CustomInfoValue>Inquiry</CustomInfoValue>
                          <CustomInfoValue2>
                            {listData?.purposeOfInquiry
                              ? listData?.purposeOfInquiry
                              : "N/A"}
                          </CustomInfoValue2>
                        </DestinationPortInn>
                        <DestinationPortInn>
                          <CustomInfoValue>Project Location</CustomInfoValue>
                          <CustomInfoValue2>
                            {listData?.projectLocation
                              ? listData?.projectLocation
                              : "N/A"}
                          </CustomInfoValue2>
                        </DestinationPortInn>
                      </DestinationPort>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <div className="Myinfovalues">
                      <CustomInfoTitle>Project Information</CustomInfoTitle>
                      <DestinationPort>
                        <DestinationPortInn>
                          <CustomInfoValue> Port Country</CustomInfoValue>
                          <CustomInfoValue2>
                            {listData?.projectLocation
                              ? listData?.portCountry
                              : "N/A"}
                          </CustomInfoValue2>
                        </DestinationPortInn>
                        <DestinationPortInn>
                          <CustomInfoValue>Sea port</CustomInfoValue>
                          <CustomInfoValue2>
                            {listData?.projectLocation
                              ? listData?.projectLocation
                              : "N/A"}
                          </CustomInfoValue2>
                        </DestinationPortInn>
                      </DestinationPort>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Divider component="div" sx={{ width: "100%" }} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <div>
                      <CustomInfoTitle>Competitor Information</CustomInfoTitle>
                      <DestinationPort>
                        <DestinationPortInn>
                          <CustomInfoValue>Competitor 1</CustomInfoValue>
                          <CustomInfoValue2>
                            {listData?.competitor
                              ? listData?.competitor
                              : "N/A"}
                          </CustomInfoValue2>
                        </DestinationPortInn>
                       
                      </DestinationPort>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Divider component="div" sx={{ width: "100%" }} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <div>
                      <CustomInfoTitle>Product Application</CustomInfoTitle>
                      <DestinationPort>
                        <Typography>
                          {listData?.productApplications
                            ? listData?.productApplications
                            : "N/A"}
                        
                        </Typography>
                      </DestinationPort>
                    </div>
                  </Grid>
                </Grid>
              </CustomizeInfosection>
            </Grid>
          </Grid>
        </CustomizeInfoInn>
      </GreyBoxInfo>
    </div>
  );
}
