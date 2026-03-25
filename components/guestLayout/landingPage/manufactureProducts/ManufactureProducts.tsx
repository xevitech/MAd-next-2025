import { Avatar, Box, Button, Grid, TextField, Typography } from "@mui/material";
import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import {
  FilterBox,
  FilterHeading,
  ManufactureBusinessType,
  ManufactureChatBTN,
  ManufactureContactSupplierBTN,
  ManufactureCountry,
  ManufactureDivider,
  ManufactureFlex1,
  ManufactureFlexBox,
  ManufactureFlexSpacebetween,
  ManufactureOriginDate,
  ManufacturerAttachmntArea,
  ManufacturerButtonRequest,
  ManuFacturerSellerName,
  ManuFacturerSupplierTo,
  ManufactureSellerImgBox,
  ManufactureSellerName,
  ManufactureUserStatus,
  ManufactureWishlist,
  Spacing,
} from "./ManufactureStyle";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { ButtonSize, OurTopProducts } from "../styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { apiClient } from "@/components/common/common";
import ProductItem from "@/components/ProductsListing/ProductItem";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import BusinessFilter3 from "@/components/ProductsListing/BusinessFilter3";
import CountryFilter3 from "@/components/ProductsListing/CountryFilter3";
import CategoryFilter3 from "@/components/ProductsListing/CategoryFilter3";
import { CommonDialogHeader } from "@/components/common/modal/styles";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Link from "next/link";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});



// import { filterProductsByCountry } from '@/hooks/reducers/manufactureProductsReducer';
const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <ButtonSize onClick={onClick} sx={{ right: 0 }}>
      <ArrowForwardIosIcon />
    </ButtonSize>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <ButtonSize onClick={onClick} sx={{ right: 35 }}>
      <ArrowBackIosIcon />
    </ButtonSize>
  );
};

const settingsBrowsingHistory = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        nextArrow: false,
        prevArrow: false,
      },
    },
  ],
};





const SellerInfoAndSlider = ({ sellerName, country, since, staffCount, business = [], products, idd, key, hdco, plan_name, logo }) => {
  // const getLogoFunc  => {} = (membership) => {
  const getLogoFunc = (plan_name) => {

    switch (plan_name) {
      case " ":
        return (

          <img
            src="https://merchantad.xevitech.com/public/uploads/icon/gold.svg"
            alt=""
            height={25}
          />

        )

      case 3384:
        return (

          <img
            src="https://merchantad.xevitech.com/public/uploads/icon/silver.svg"
            alt=""
            height={25}
          />

        )
      case 3384:
        return (
          <img
            src="https://merchantad.xevitech.com/public/uploads/icon/platinum.svg"
            alt=""
            height={25}
          />
        )
      default:
        return (

          <img
            src=""
            alt="free"
            height={25}
          />
        )

    }
  };
  const getBackgroundStyle = (membership) => {

    switch (membership) {
      case 3613:
        // gold
        return {
          background:
            "linear-gradient(180deg, rgba(255, 215, 0, 0.16) 0%, rgba(255, 215, 0, 0) 100%)",
          padding: "20px",
          borderRadius: "10px",
          margin: "0 0 10px 0",
        };

      case 3447:
        return {
          background:
            "linear-gradient(180deg, rgba(0, 71, 171, 0.16) 0%, rgba(0, 71, 171, 0) 100%)",
          padding: "20px",
          borderRadius: "10px",

        };
      case 3384:
        // silver

        return {
          background:
            "linear-gradient(180deg, rgba(128, 122, 135, 0.16) 0%, rgba(255, 255, 255, 0.16) 100%)",
          padding: "20px",
          borderRadius: "10px",
        };
      default:
        return {
          background:
            "linear-gradient(180deg, rgba(115, 110, 10, 0.16) 0%, rgba(251, 15, 0, 0) 100%)",
          padding: "20px",
          borderRadius: "10px",
        };
    }

  };

  // {console.log("business-Types",Array.isArray(businessType) && (businessType.length) >0 ? businessType[0].name  : "N/A")}

  return (
    <Box sx={getBackgroundStyle(plan_name)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={1} lg={1}>
          <Link href="">
            <ManufactureSellerImgBox>
              <img src={logo} alt="logo" />
            </ManufactureSellerImgBox>
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={11} lg={11}>
          <ManufactureFlexSpacebetween>
            <Box>
              <ManufactureFlex1>
                <Box>
                  <ManufactureSellerName>{sellerName}</ManufactureSellerName>
                </Box>

                <ManufactureDivider></ManufactureDivider>
                <img
                  src="/assets/verifyWtext.svg"
                  alt=""
                  width={60}
                  height={21}
                />
                <ManufactureFlex1
                  sx={{
                    gap: "4px",
                  }}
                >
                  <img
                    src="https://flagcdn.com/w20/in.png"
                    alt=""
                    style={{
                      border: "1px solid #ddd",
                      padding: "1px",
                      borderRadius: "2px",
                    }}
                  />
                  <Box component={"span"}>
                    <ManufactureCountry>{country}</ManufactureCountry>
                  </Box>
                </ManufactureFlex1>
              </ManufactureFlex1>
              <ManufactureOriginDate>
                <Box>
                  {getLogoFunc(plan_name)}
                </Box>
                <img
                  src={"/assets/images/category/crown.svg"}
                  alt="Image"
                  width="22"
                  height="17"
                />
                <Typography>Since {since}</Typography>
                <ManufactureUserStatus>
                  {staffCount}+ Staff
                </ManufactureUserStatus>
                <ManufactureBusinessType>

                  <span>Business Type:</span> {business}
                </ManufactureBusinessType>
              </ManufactureOriginDate>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <ManufactureContactSupplierBTN onClick={hdco}>
                Contact seller
              </ManufactureContactSupplierBTN>
              <ManufactureChatBTN>Chat Now</ManufactureChatBTN>
              <ManufactureWishlist>
                <FavoriteBorderOutlinedIcon />
              </ManufactureWishlist>
            </Box>
          </ManufactureFlexSpacebetween>
        </Grid>
        <Grid item xs={12}>
          <OurTopProducts sx={{ pt: 1 }}>
            <Slider {...settingsBrowsingHistory}>
              {Array.isArray(products) ? (
                products.length > 0 ? (
                  products.map((product, index) => {

                    return (
                      <div key={index}>
                        <Box sx={{ margin: "0 5px" }}>
                          <ProductItem data={product} />
                        </Box>
                      </div>
                    )
                  }
                  )) : (
                  <div></div>
                )
              ) : (

                Object.values(products || {}).map((product, index) => {
                  return (
                    <div key={index}>
                      <Box sx={{ margin: "0 5px" }}>

                        <ProductItem data={product} />

                        {/* {index} */}
                      </Box>
                    </div>
                  )
                }))}
            </Slider>
          </OurTopProducts>
        </Grid>
      </Grid>
    </Box>
  );
};


export default function ManufactureProducts() {
  const router = useRouter();
  // const dispatch = useDispatch();
  const [checkedBusiness, setCheckedBusiness] = useState([]);
  const [checkedCountry, setCheckedCountry] = useState([]);
  const [checkedCategory, setCheckedCategory] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true)
  const userQuery=router.query
  const {isReady}=router
  const q = userQuery.q as string;
  
  // Function to fetch products based on selected filters
  const fetchSellerProducts = async () => {
    try {
      const params = new URLSearchParams();
      checkedBusiness.forEach(type => {
        params.append('business_type', type);
      });
      checkedCountry.forEach(type => {
        params.append('country_name', type);
      });
      checkedCategory.forEach(type => {
        params.append('category_name', type);
      });
      if (q) {
        params.append("name", q);
      }
      const url = q ? "front/search/manufacture" : "front/manufacture/seller_products";
      const queryString = params.toString();
      console.log("Query Params:", queryString);

      const response = await apiClient(`${url}?${queryString}`, "get");

      if (response.status === 200) {
        console.log("Seller Products:", response.data);
        setApiData(response.data);
        setLoading(false)
      }
    } catch (error) {
      console.error("Error fetching seller products:", error);
    }
  };


  const handleBusinessFilterChange = (selectedFilters: string[]) => {
    setCheckedBusiness(selectedFilters);
  };
  const handleCountryFilterChange = (selectedFilters: string[]) => {
    setCheckedCountry(selectedFilters);
  };
  const handleCategoryFilterChange = (selectedFilters: string[]) => {
    setCheckedCategory(selectedFilters);
  };


  useEffect(() => {
    if(isReady){
       fetchSellerProducts();}
    // setLoading(true)
   
  }, [checkedBusiness, checkedCountry, checkedCategory,isReady,router.query]);


  //       // MayaMam
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <div>Loading.....</div>
  }
  return (
    <Box className="mypagecontainer">
      <Spacing>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={2}>
            <FilterBox>
              <FilterHeading>Filter</FilterHeading>
              <div className="productnav">
                <BusinessFilter3 onChange={handleBusinessFilterChange} />
                <CountryFilter3 onChange={handleCountryFilterChange} />
                <CategoryFilter3 onChange={handleCategoryFilterChange} />
              </div>
            </FilterBox>
            {/* <div>B:{bsf}</div> */}
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={9} xl={10}>
            <ManufactureFlexBox>
              {apiData.length > 0 ? (
                apiData.map((item, index) => {
                  const parsedBusinessType = JSON.parse(item.business_type);
                  const businessNames = parsedBusinessType.map(business => business.name).join(', ');
                  console.log(businessNames);
                  return (
                    <SellerInfoAndSlider
                      key={`${item.user_id}-${index}`}
                      sellerName={item.company_name}
                      country={item.country_name}
                      since={item.registration_year}
                      staffCount={item?.staff_count}
                      business={businessNames}
                      products={item?.products}
                      idd={item?.user_id}
                      hdco={handleClickOpen}
                      plan_name={item?.plan_name}
                      logo={item?.logo}
                    />
                  );
                })
              ) : (
                <Typography>No data available</Typography>
              )}
            </ManufactureFlexBox>
          </Grid>
        </Grid>
      </Spacing>


      {/* Here starts the sellerQuery hidden component */}
      <Box>
        <BootstrapDialog sx={CommonDialogHeader}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Query
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <ManuFacturerSupplierTo>
            <Typography>To:</Typography>
            <ManuFacturerSellerName><Avatar alt="Remy Sharp" src="https://merchantad.xevitech.com/public/uploads/all/1725351518_blob" />
              <Typography variant="body2"></Typography>
            </ManuFacturerSellerName>
          </ManuFacturerSupplierTo>
          <DialogContent dividers>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <TextField
                    name="Product"
                    fullWidth
                    label="Product Name"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="Quantity"
                    fullWidth
                    label="Purchase Quantity"
                    variant="outlined"
                    type="number"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="Units"
                    fullWidth
                    label="Units/Sets"
                    variant="outlined"
                    type="number"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    name="description"
                    fullWidth
                    variant="outlined"
                    multiline
                    placeholder="Please describe your specific sourcing requirements for product attributes, desired quantity, and any additional services you expect from suppliers"
                    rows={3}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <ManufacturerAttachmntArea>
                    <Button
                      component="label"
                      role={undefined}
                      tabIndex={-1}
                      startIcon={<i className="icon-attachment"></i>}
                    >
                      Add Attachment
                      <VisuallyHiddenInput
                        type="file"
                        multiple
                      />
                    </Button>
                  </ManufacturerAttachmntArea>
                </Grid>


              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <ManufacturerButtonRequest onClick={handleClose}
              variant="outlined"
              color="primary"
              type="submit"
              size="small"
            >
              <>Send Query</>
            </ManufacturerButtonRequest>
          </DialogActions>
        </BootstrapDialog>
      </Box>
    </Box>
  );
}