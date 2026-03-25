import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import ProductModule from "./product.module.css";
import AllProduct from "./AllProduct";
import PriceFilter from "./PriceFilter";
import MembersFilter from "./MembersFilter";
import {
  fetchAllFiltersDetail,
  fetchAllProductsList,
  setCategoryIds,
  setKeywordData,
} from "../../hooks/UseProductListContext";
import { styled } from "@mui/material";
import CategoryFilter from "./CategoryFilter";
import BrandFilter from "./BrandFilter";
import BusinessFilter from "./BusinessFilter";
import AnnualFilter from "./AnnualFilter";
import ConditionFilter from "./ConditionFilter";
import PriceTypeFilter from "./PriceTypeFilter";
import ProductAvailabeFilter from "./ProductAvailabeFilter";
import ManufactureFilter from "./ManufactureFilter";
import AllFilters from "./AllFilters";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useAppDispatch } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  DecodeUrl,
  trackPageView,
  handleTrackUser,
  apiClient,
} from "../common/common";
import {
  setAvailability,
  setBrand,
  setBusiness,
  setCategory,
  setCondition,
  setManufacturer,
  setPriceType,
  setRange,
  setRevenue,
} from "@/hooks/productListUrlFilter";
import { useRouter } from "next/router";
import CountryFilter from "./CountryFilter";
import {
  BackToTopBox,
  CategoryBox,
  ListingWrappers,
  MainPageFilterBox,
  ProductListingContainerr,
  ProductNavFilter,
  ScrollTopFab,
} from "./style";
import SimpleTreeItem from "./CategoryFilterNew";
import CategoryTreeView from "./CategoryFilterNew";
import { createAsyncThunk } from "@reduxjs/toolkit";
import PlanNameFilter from "./PlanNameFilter";
const Categorytitle = styled(Typography)(({ theme }) => ({
  textTransform: "capitalize",
  fontSize: "14px",
  fontWeight: 600,
  fontFamily: "Open sans",
}));
const CategorySidebarContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.common.white,
  borderRadius: 4,
}));

export default function ProductList() {
  const [domLoaded, setDomLoaded] = useState(false);
  const [checkClass, setCheckClass] = useState(false);
  const [getTrackedId, setgetTrackedId] = useState("");
  const dispatch = useAppDispatch();
  const [isMount, setIsMount] = useState(false);
  let { pathname, query, asPath } = useRouter();

  if (pathname.startsWith("/productlist")) {
    {
      query.availability &&
        dispatch(
          setAvailability(query.availability?.replace(",", "|").split("|"))
        );
    }
    {
      query.brand && dispatch(setBrand(query.brand));
    }
    {
      query.business &&
        dispatch(setBusiness(query.business?.replace(",", "|").split("|")));
    }
    {
      query.category && dispatch(setCategory(query.category));
    }
    {
      query.revenue &&
        dispatch(
          setRevenue(query.revenue?.replace(",", "|").split("|").map(Number))
        );
    }
    {
      query.range && dispatch(setRange(query.range));
    }
    {
      query.condition &&
        dispatch(
          setCondition(
            query.condition?.replace(",", "|").split("|").map(Number)
          )
        );
    }
    {
      query.manufacturer &&
        dispatch(
          setManufacturer(query.manufacturer?.replace(",", "|").split("|"))
        );
    }
    {
      query.priceType &&
        dispatch(setPriceType(query.priceType?.replace(",", "|").split("|")));
    }
  }
  //  useEffect(()=>{
  //   const handleTrackUSer=(event)=>{
  //       if((getTrackedId)){
  //         handleTrackUser(event,"/productlist",getTrackedId)
  //     }
  //   }
  //   // if(pathname=="/productlist"){
  //     document.addEventListener('click', handleTrackUSer,true);
  //     document.addEventListener('scroll', handleTrackUSer);
  //   // }

  //   return () => {
  //     // if(pathname=="/productlist"){
  //     document.removeEventListener('click', handleTrackUSer);
  //     document.removeEventListener('scroll', handleTrackUSer);
  //     // }
  //   };
  //   },[])

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  // useEffect(()=>{
  //   (async () => {
  //      let response= await trackPageView(asPath,"","productlist","","")
  //      setgetTrackedId(response);
  //      let interval ;
  //      const checkApi = async () => {
  //            interval  =  pathname =="/productlist"&&setInterval(()=> trackPageView(pathname,"yes","productlist","",response), 10000);
  //      }
  //      if(response){
  //       checkApi();
  //      }
  //      return () => {
  //       clearInterval(interval);
  //   }
  //     })();
  // },[])
  const [categoryList, setCategoryList] = React.useState([]);
  const [subCategoryList, setSubCategoryList] = React.useState([]);
  const { categoryData } = useSelector((state) => state.productList);

  React.useEffect(() => {
    FetchCategoryList();
    FetchSubCategoryList();
  }, [query]);

  const FetchCategoryList = async () => {
    let response = await apiClient("categoryList", "post", {
      body: { user_id: "", parent: "", sub: 2 },
    });
    if (response?.status == 200) {
      setCategoryList(response.data);
      // dispatch(setKeywordData(response.data));
    }
  };
  const FetchSubCategoryList = async () => {
    const categorySelected = query?.category || query?.catogery;
    let response = await apiClient(
      `menu/SubCategoryList?slug=${categorySelected}`,
      "get"
    );
    if (response?.status == 200) {
      setSubCategoryList(response.data);
      dispatch(setKeywordData(response.data));
    }
  };

  useEffect(() => {
    if (window !== undefined) {
      if (!isMount) {
        let queryParam = window.location.search;
        if (queryParam) {
          let param = queryParam?.split("=") ?? "";
          if (param) {
            let decodedparam = DecodeUrl(param[1]).toLowerCase();
            let id =
              categoryData.find((v) => v.name.toLowerCase() == decodedparam)
                ?.id ?? "";
            if (id) dispatch(setCategoryIds(id));
            if (id) setIsMount(true);
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    dispatch(fetchAllFiltersDetail());
    dispatch(fetchAllProductsList());
  }, [dispatch]);

  // useEffect(() => {
  //   let interval ;
  //   const checkApi = async () => {
  //         interval  =  pathname =="/productlist"&&setInterval(()=> trackPageView(pathname,"yes","productlist","",getTrackedId), 10000);
  //   }
  //   checkApi()
  //   return () => {
  //     clearInterval(interval);
  // }},[])

  const checkCode = () => {
    setCheckClass(!checkClass);
  };

  const data = [
    {
      id: "1",
      name: "Power Generation Pumps",
      children: [
        {
          id: "2",
          name: "Power pumps",
          children: [
            {
              id: "2",
              name: "Pumps",
              children: [
                {
                  id: "3",
                  name: "Pumpss",
                },
                {
                  id: "4",
                  name: "Cooling Water Pumps",
                },
                {
                  id: "5",
                  name: "Feedwater Pumps",
                },
                {
                  id: "6",
                  name: "Fuel Transfer Pumps",
                },
                {
                  id: "7",
                  name: "Waste & Sludge Pumps",
                },
              ],
              children: [
                {
                  id: "3",
                  name: "Chemical-Pumps",
                },
                {
                  id: "4",
                  name: "Cooling Water Pumps",
                },
                {
                  id: "5",
                  name: "Feedwater Pumps",
                },
                {
                  id: "6",
                  name: "Fuel Transfer Pumps",
                },
                {
                  id: "7",
                  name: "Waste & Sludge Pumps",
                },
              ],
            },
          ],
        },
      ],
    },
    // Add more sectors or categories here
  ];

  return (
    <div className="mypagecontainer">
      <ProductListingContainerr>
        <Box id="back-to-top-anchor" />
        {domLoaded && (
          <ListingWrappers>
            <Breadcrumbs
              aria-label="breadcrumb"
              className={ProductModule.breadcrumblist}
            >
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>

              <Link
                underline="hover"
                color="text.primary"
                href="/material-ui/react-breadcrumbs/"
                aria-current="page"
              >
                Product Listing
              </Link>
            </Breadcrumbs>
            <Grid container spacing={{ xs: 2 }}>
              <Grid
                item
                xs={12}
                sm={4}
                md={3}
                lg={3}
                xl={2}
                className={
                  checkClass
                    ? ProductModule.showfilter
                    : ProductModule.grid_left
                }
              >
                <ProductNavFilter className="productnav">
                  {/* <CategorySidebarContainer p={{ xs: 1 }}> */}
                  <CategorySidebarContainer p={{ xs: 1 }}>
                    <AllFilters />
                    {subCategoryList?.length > 0 && (
                      <CategoryFilter data={subCategoryList} />
                    )}
                    <MembersFilter />
                    <PlanNameFilter />
                    <PriceFilter />
                    <CountryFilter />
                    <BrandFilter />
                    <BusinessFilter />
                    <ConditionFilter />
                    <PriceTypeFilter />
                    <ProductAvailabeFilter />
                    <ManufactureFilter />
                    {/* <AnnualFilter /> */}
                  </CategorySidebarContainer>
                </ProductNavFilter>
              </Grid>
              <AllProduct checkCode={checkCode} />
            </Grid>
          </ListingWrappers>
        )}
      </ProductListingContainerr>
    </div>
  );
}
