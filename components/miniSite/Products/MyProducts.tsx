import { Box, IconButton, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ListHeading } from "../styled";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ProductItemSkelton from "../MiniSkelton/ProductItemSkelton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EmptyPage from "@/components/miniSite/EmptyPages/index";
import router, { useRouter } from "next/router";
import { Grid } from "@mui/material";
import QuoteModal from "@/components/ProductDetail/ProductComponents/Modal/QuoteModal";
import product from "../Products/product.module.css";
import { useDispatch, useSelector } from "react-redux";
import { TerritoryList } from "@/utils/countriesphp";
import ProductItem from "@/components/ProductsListing/ProductItem";
// import ChatWindow from "@/components/Chat";
import { apiClient, handleTrackUser, trackPageView } from "@/components/common/common";
// Outside of functional component
export default function MyProducts({
  allProducts,
  FetchProductList,
  setPage,
  totalPage,
  lastPage,
  page,
  loaderSekelton,
  catalogsData
}) {

  const router = useRouter();
  const isAll = router.asPath?.split("?")[1];
  const { catalogIds } = router.query;

  // const selectedCatalog = catalogs?.find(catalog => catalog.id === filterId);
  const [getRecord, setGetRecord] = useState<boolean>(false);
  const [openModal, setModal] = useState<boolean>(false);
  const [territoryData, setTerritory] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [getTrackedId, setgetTrackedId] = useState("");
  const [catalogId, setCatalogId] = useState<any>("");
  const NavigateHandler = (route) => router.push(route);
  const [catalog, setCatalog] = useState<any>([]);
  let userid = JSON.parse(localStorage.getItem("userData"))?.id;
  const { minisiteUserID } = useSelector((state: any) => state.miniSite);
  let isScrolling: any;
  const ar = [1, 1, 1, 1, 1, 1, 1, 1];
  const dispatch = useDispatch();
  const getNextRecord = async () => {
    setPage((prev) => prev + 1);
    setGetRecord(true);
  };

  const getPreviousRecord = async () => {
    setPage((prev) => prev - 1);
    setGetRecord(true);
  };


  useEffect(() => {
    if (getRecord) {
      alert('fire1');
      FetchProductList();
      setGetRecord(false);
    }
  }, [getRecord]);

  useEffect(() => {
    (async () => {
      localStorage.removeItem("scrollPercentage");
      let response = await trackPageView(
        router?.asPath,
        "",
        "mini-site-products",
        "",
        ""
      );
      setgetTrackedId(response);
    })();
  }, []);

  useEffect(() => {
    const handleTrackUSer = (event) => {
      window.clearTimeout(isScrolling);
      if (getTrackedId !== "") {
        if (event?.type === "scroll") {
          isScrolling = setTimeout(function () {
            handleTrackUser(event, "", getTrackedId);
          }, 100);
        } else {
          handleTrackUser(event, "", getTrackedId);
        }
      }
    };
    document.addEventListener("click", handleTrackUSer, true);
    document.addEventListener("scroll", handleTrackUSer);
    return () => {
      document.removeEventListener("click", handleTrackUSer, true);
      document.removeEventListener("scroll", handleTrackUSer);
    };
  }, [getTrackedId]);

  useEffect(() => {
    let interval;
    const checkApi = async () => {
      interval = setInterval(
        () =>
          trackPageView(
            router?.asPath,
            "yes",
            "mini-site-products",
            "",
            getTrackedId
          ),
        30000
      );
    };
    getTrackedId && checkApi();

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    FetchTerritoryData();
  }, []);

  const FetchTerritoryData = async () => {
    setTerritory(
      TerritoryList.map((element) => ({
        value: element?.id + "t",
        view: element?.name,
        type: "Territory",
      }))
    );
  };
  // useEffect(() => {
  //   if (allProducts && allProducts.length > 0) {
  //     const timer = setTimeout(() => {
  //       setLoading(false);
  //     }, 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [allProducts]);
  const fetchAllCatalogList = async () => {
    setLoading(true);
    try {
      const currency_id = JSON.parse(localStorage.getItem("currency")) ?? 1;
      const response = await apiClient(
        `product/catalog_product_listing?currency=${currency_id}`,
        "get",
        {}
      );
      if (response.status === 200) {
        const allProductData = response?.data;
        setCatalog(allProductData);

      } else {
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };


  const getheaderName = () => {
    if (catalogsData?.name) {
      return `${catalogsData?.name} (${catalogsData?.products?.length})`
    }
    return ''
  }
  return (
    <Box>
      {/* <ChatWindow /> */}
      {openModal && (
        <QuoteModal open={openModal} handleClose={() => setModal(false)} />
      )}

      {!loading && allProducts?.length > 0 && (
        <ListHeading
          sx={{
            marginLeft: "12px",
            "@media screen and (max-width:280px)": {
              marginTop: "-20px",
              marginLeft: "20px",
            },
            "@media screen and (max-width:900px)": {
              margin: "12px",
            },
            "@media screen and (max-width:600px)": {
              marginLeft: "20px",
            },
          }}
          variant="h4"
          fontWeight={"700"}
          className={product.productslider}
        >

          <Stack
            className={product.arrowposition}
            direction={{ xs: "row" }}
            justifyContent={{ xs: "space-between" }}
            alignItems={{ xs: "center" }}
          >
            {totalPage > 12 &&
              (page != 1 ? (
                <IconButton
                  onClick={() => getPreviousRecord()}
                  size="medium"
                  disabled={getRecord}
                >
                  <ArrowBackIosIcon />
                </IconButton>
              ) : (
                <IconButton size="medium">
                  <ArrowBackIosIcon style={{ color: "#ccc" }} />
                </IconButton>
              ))}

            {totalPage > 12 &&
              (totalPage != lastPage && allProducts?.length > lastPage ? (
                <IconButton
                  disabled={getRecord}
                  onClick={() => getNextRecord()}
                  size="medium"
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              ) : (
                <IconButton size="medium">
                  <ArrowForwardIosIcon style={{ color: "#ccc" }} />
                </IconButton>
              ))}
          </Stack>
        </ListHeading>
      )}
      {loaderSekelton ? (
        <>
          <Box sx={{ margin: '0 0 0px 12px' }}>
            <Skeleton animation='wave' variant="text" width={'20%'} />
          </Box>
          <Grid container spacing={2} padding={{ xs: 1 }}>
            {ar.map((x, i) => (
              <Grid key={i} xs={12} md={4} lg={4} xl={4} item>
                <ProductItemSkelton data={i} />
              </Grid>
            ))}

          </Grid>
        </>
      ) : (
        <>
          <ListHeading
            sx={{
              marginLeft: "12px",
              "@media screen and (max-width:280px)": {
                marginTop: "-20px",
                marginLeft: "20px",
              },
              "@media screen and (max-width:900px)": {
                margin: "12px",
              },
              "@media screen and (max-width:600px)": {
                marginLeft: "20px",
              },
            }}
            variant="h4"
            fontWeight={"700"}
            className={product.productslider}
          >
            {getheaderName()}
          </ListHeading>
          <Grid container spacing={2} padding={{ xs: 1 }}>
            {allProducts?.length > 0 ? (<>
              {
                allProducts?.map((item, index) => (
                  <Grid key={index} xs={12} sm={6} md={4} lg={4} item>
                    <ProductItem data={item} key={index} />
                  </Grid>
                ))
              }
            </>) : (
              <EmptyPage
                text={"Product"}
                onClickHandler={() => {
                  router.push("/products/List?add");
                }}
                logo="/assets/Group.svg"
                actiontext={userid !== minisiteUserID ? false : true}
              />)}

          </Grid>
        </>
      )}
    </Box>
  );
}
