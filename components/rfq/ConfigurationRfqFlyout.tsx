import React, { useState } from "react";
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
  ProductDetailtable,
  ProductEnquiryData,
  ProductIDSection,
  OverViewInfoP,
  ProductNameBox,
  ProductTitle,
  RedOutLinedButton,
  RedboxValue,
  RProductLabel,
  RfQInnerContent,
  RfqButtonContainerLeft,
  RfqDataGridStyle,
  RfqFilterCoulm,
  RfqFullData,
  RfqGridContent,
  RfqOuterBox,
  RfqSearchCommon,
  RfqTableCoulmn,
  RightSection,
  SidebarTitle,
  SidebarTitleArea,
  TopData,
  UnitPrice,
  UnitPriceBox,
  UnitPriceContainer,
  UnitPriceValue,
  AmountValue,
  AccordionBorder,
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
  RfQTabBox,
  Labeldata,
  ActiveBtn,
  ProductTypeOption,
  PTypeImage,
  MainRightData,
  ProductFeatureSection,
  SpecificationHeading,
  BrandBoxStyle,
  FeatureOpt,
  InnerOpt,
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
  AddButtonSection,
  BuyerDetailTop,
  TopRightSection,
  CreatedDate,
  ProductID,
} from "./style";
import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { LightTooltip } from "../common/Tooltip/tooltip";
import { DataGridPro } from "@mui/x-data-grid-pro";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { LOCAL_PUBLIC_URL } from "@/utils/staticValues";
export default function ConfigurationRfqFlyout({ listData }) {
  const columns2: any = [
    {
      field: "id",
      headerName: "Sr. No",
      minWidth: 50,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "orderid",
      headerName: "Matrix Id",
      minWidth: 100,
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "product_name",
      headerName: "Images",
      width: 150,
      editable: false,
      headerAlign: "left",
      align: "left",
      renderCell: (cellValues) => {
        return (
          <>
            <div>
              <AvatarGroup max={4}>
                <Avatar
                  alt="Remy Sharp"
                  src={`${LOCAL_PUBLIC_URL}/uploads/product/gallery/Screenshot from 2024-04-25 09-42-27.png`}
                  sx={{ width: 24, height: 24 }}
                />
                <Avatar
                  alt="Travis Howard"
                  src={`${LOCAL_PUBLIC_URL}/uploads/product/gallery/travis-howard.jpeg`}
                  sx={{ width: 24, height: 24 }}
                />
                <Avatar
                  alt="Cindy Baker"
                  src={`${LOCAL_PUBLIC_URL}/uploads/product/gallery/black horse fly 1.png`}
                  sx={{ width: 24, height: 24 }}
                />
              </AvatarGroup>
            </div>
          </>
        );
      },
    },

    {
      field: "color",
      headerName: "Color",
      width: 90,
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },

    {
      field: "weight",
      headerName: "Weight",
      width: 90,
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },

    {
      field: "area",
      headerName: "Area",
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
  ];
  const rows = [
    {
      id: 1,
      orderid: "0123",
      color: "Red",
      price: "$1880",
      weight: "32kg",
      area: "500sq.Ft",
      amount: 450,
    },
    {
      id: 2,
      orderid: "0123",
      color: "Red",
      price: "$1880",
      weight: "32kg",
      area: "500sq.Ft",
      amount: 450,
    },
    {
      id: 3,
      orderid: "0123",
      color: "Red",
      price: "$1880",
      weight: "32kg",
      area: "500sq.Ft",
      amount: 450,
    },
    {
      id: 4,
      orderid: "0123",
      color: "Red",
      price: "$1880",
      weight: "32kg",
      area: "500sq.Ft",
      quantity: "Pending",
      amount: 450,
    },
    {
      id: 5,
      orderid: "0123",
      color: "Red",
      price: "$1880",
      weight: "32kg",
      area: "500sq.Ft",
      quantity: "Pending",
      amount: 450,
    },
    {
      id: 6,
      orderid: "0123",
      color: "Red",
      price: "$1880",
      weight: "32kg",
      area: "500sq.Ft",
      quantity: "Not Paid",
      amount: 450,
    },
    {
      id: 7,
      orderid: "0123",
      color: "Red",
      price: "$1880",
      weight: "32kg",
      area: "500sq.Ft",
      quantity: "Pending",
      amount: 450,
    },
    {
      id: 8,
      orderid: "0123",
      color: "Red",
      price: "$1880",
      weight: "32kg",
      area: "500sq.Ft",
      quantity: "Pending",
      amount: 450,
    },
    {
      id: 9,
      orderid: "0123",
      color: "Red",
      price: "$1880",
      weight: "32kg",
      area: "500sq.Ft",
      quantity: "Not Paid",
      amount: 450,
    },
    {
      id: 10,
      orderid: "0123",
      color: "Red",
      price: "$1880",
      weight: "32kg",
      area: "500sq.Ft",
      quantity: "In Progress",
      amount: 450,
    },
    {
      id: 11,
      orderid: "0123",
      color: "Red",
      price: "$1880",
      weight: "32kg",
      area: "500sq.Ft",
      quantity: "Pending",
      amount: 450,
    },
  ];
  return (
    <div>
      <AccordionBorder>
        <BoxAccordianInner>
          <ProductBgInfo>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8} md={8}>
                <ProductBoxLeft>
                  <ProductNameBox>
                    <ProductImageBox>
                      <img
                        src={`${LOCAL_PUBLIC_URL}/uploads/product/gallery/Screenshot from 2024-04-25 09-42-27.png`}
                        alt=""
                      />
                    </ProductImageBox>
                    <div>
                      <ProductTitle>
                        10kw Natural Gas Turbine Generator
                      </ProductTitle>
                      <ProductID>
                        <span>Product Id: </span>PC28941043
                      </ProductID>
                      <CategoryName>
                        <span>Category Name:</span> Gas Turbine
                      </CategoryName>
                    </div>
                  </ProductNameBox>
                </ProductBoxLeft>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <MainRightData>
                  <ProductBoxRight>
                    <CountryName>Jordan</CountryName>
                    <DateAndTime variant="body2">
                      <CalendarMonthOutlinedIcon />
                      May 2, 1:24 pm
                    </DateAndTime>
                  </ProductBoxRight>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <ProductTypeOption>
                    <PTypeImage>
                      <Typography>Configured</Typography>
                    </PTypeImage>
                  </ProductTypeOption>
                </MainRightData>
              </Grid>
            </Grid>
          </ProductBgInfo>
          {/* <!-- Start ProductFeature Area --> */}
          <ProductFeatureSection>
            <SpecificationHeading variant="h3">
              Product Features & Characteristics
            </SpecificationHeading>
            <Box sx={{ padding: "10px 0" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3} md={3}>
                  <BrandBoxStyle>
                    <Typography variant="h6">{"Manufacturer/Brand"}</Typography>
                    <Typography variant="body1">
                      <LightTooltip
                        disableInteractive
                        arrow
                        title={"Brand Name"}
                        placement="top"
                      >
                        <span>Wassermann</span>
                      </LightTooltip>
                    </Typography>
                  </BrandBoxStyle>
                </Grid>
                <Grid item xs={12} sm={9} md={9}>
                  <FeatureOpt>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={3} md={3}>
                        <InnerOpt sx={{ border: "none" }}>
                          <Typography variant="h6">Power Source</Typography>
                          <Typography variant="body1">Electric</Typography>
                        </InnerOpt>
                      </Grid>
                      <Grid item xs={12} sm={3} md={3}>
                        <InnerOpt>
                          <Typography variant="h6">Power Source</Typography>
                          <Typography variant="body1">Electric</Typography>
                        </InnerOpt>
                      </Grid>
                      <Grid item xs={12} sm={3} md={3}>
                        <InnerOpt>
                          <Typography variant="h6">Power Source</Typography>
                          <Typography variant="body1">Electric</Typography>
                        </InnerOpt>
                      </Grid>
                      <Grid item xs={12} sm={3} md={3}>
                        <InnerOpt
                          sx={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span className="view_more_opt">View More</span>
                        </InnerOpt>
                      </Grid>
                      {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
                    </Grid>
                  </FeatureOpt>
                </Grid>
              </Grid>
            </Box>
          </ProductFeatureSection>
          {/* <!-- End ProductFeature Area --> */}

          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <ProductEnquiryData>
                <DataProductTypeData1>
                  <TopData>
                    <Typography variant="h5">
                      Configuration Of the product
                    </Typography>
                    <p>
                      This is <span className="by-orderp">In Stock</span>{" "}
                      product, available for purchase at below listed price.
                    </p>
                  </TopData>
                </DataProductTypeData1>
                <ProductDetailtable>
                  <DataGridPro
                    autoHeight
                    rows={rows}
                    columns={columns2}
                    loading={listData?.length === 0}
                    rowHeight={32}
                    //checkboxSelection
                    sx={DataGridStyleIcon}
                    pageSize={10}
                    pagination
                    // disableRowSelectionOnClick
                  />
                  <UnitPriceContainer>
                    <UnitPriceBox>
                      <UnitPrice>Unit Price</UnitPrice>
                      <UnitPriceValue>$320.00</UnitPriceValue>
                    </UnitPriceBox>
                    <UnitPriceBox>
                      <UnitPrice>Total Price</UnitPrice>
                      <UnitPriceValue>$11560.00</UnitPriceValue>
                    </UnitPriceBox>
                  </UnitPriceContainer>
                </ProductDetailtable>
              </ProductEnquiryData>
            </Grid>
          </Grid>
        </BoxAccordianInner>
      </AccordionBorder>
    </div>
  );
}
