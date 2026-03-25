import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductItemSkelton from "./MiniSkelton/ProductItemSkelton";
import EmptyPage from "@/components/miniSite/EmptyPages/index";
import { useRouter } from "next/router";
import QuoteModal from "../ProductDetail/ProductComponents/Modal/QuoteModal";
import { apiClient } from "../common/common";
import SearchSorting from "./SearchSorting";
import { useDispatch, useSelector } from "react-redux";
import { setQuoteDetails } from "@/hooks/quoteHooks";
import dynamic from "next/dynamic";
import { MoreAboutUsButton, ViewMoreProductts } from "./styled";
import CategoryScroller from "./Products/CategoryScroller";
import { TerritoryList } from "@/utils/countriesphp";
import ProductItem from "../ProductsListing/ProductItem";
// import ChatWindow from "../Chat";
const LoadMore = dynamic(() => import("./LoadMore"), { ssr: false });

export default function Miniproductlisting({ listdata = [] }) {
  const [openModal, setModal] = useState<boolean>(false);
  const [loader, setShowLoader] = useState<any>({ loader: "", id: "" });
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [mounted, setMounted] = React.useState<boolean>(false);
  let userid = JSON.parse(localStorage.getItem("userData"))?.id;
  const { minisiteUserID, userInfo } = useSelector(
    (state: any) => state.miniSite
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const ar = [1, 1, 1, 1, 1, 1, 1, 1];

  const NavigateHandler = (route) => router.push(route);
  const dispatch = useDispatch();

  const fetchSingleProductDetails = async (id) => {
    let response = await apiClient("front/single/view", "post", {
      body: { id: id },
    });
    if (response.status === 200) {
      dispatch(setQuoteDetails(response.data));
      return response;
    }
  };

  const handleQuote = async (id, type) => {
    setShowLoader({ loader: type, id });
    await fetchSingleProductDetails(id);
    setModal(true);
    setShowLoader({ loader: "", id: "" });
  };
  const router = useRouter();
  const [page, setPage] = useState<number>(0);
  const [loaderSekelton, setLoader] = useState<boolean>(true);
  const [searchname, setSearchName] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<string>("");
  const [selctedsorting, setSelctedsorting] = useState<string>("DESC");
  const [categoryList, setCategoryList] = useState<any>([]);
  const [productList, setProductList] = useState<any>([]);
  const [allData, setAllData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<any>(0);
  const [territoryData, setTerritory] = useState<any>([]);

  const FetchProductList = async () => {
    setLoader(true);
    let response = await apiClient("front/mini-site/products", "post", {
      body: {
        page: page,
        per_page: "12",
        search_by_name: searchname,
        category_id: searchCategory,
        seller_id: minisiteUserID,
        user_id: userid,
        orderBy: `id,${selctedsorting}`,
        sort_by: `id,${selctedsorting}`,
        only_featured: "yes",
      },
    });
    if (response.status == 200) {
      setCategoryList(response.category_list);
      setAllData(response);
      setProductList(response.data);
      setPage(response.currentPage);
      setTotalPage(response.total);
      setLoader(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    if (minisiteUserID && searchname == "") {
      FetchProductList();
    }
  }, [minisiteUserID, searchname]);

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

  return (
    mounted && (
      <>
        {/* <ChatWindow /> */}
        {openModal && (
          <QuoteModal open={openModal} handleClose={() => setModal(false)} />
        )}
        <SearchSorting
          productList={productList}
          categoryList={categoryList}
          searchname={searchname}
          searchCategory={searchCategory}
          setSearchName={setSearchName}
          setSearchCategory={setSearchCategory}
          searchProduct={FetchProductList}
        />
        <Box
          sx={{
            border: "1px solid #dddddd",
            borderRadius: "8px",
            margin: "8px 20px 20px",
            backgroundColor: "#fbfbfb",
          }}
        >
          <CategoryScroller
            skeleton={false}
            categoryList={categoryList}
            FetchProductList={(item) => {}}
            setSearchCategory={(item) => {
              router.push(
                `/mini-site/${userInfo?.basic_information?.slug}/products?category=${item.slug}`
              );
            }}
          />
        </Box>
        <Grid container spacing={1.5} padding={{ xs: 1, md: 2.5 }}>
          {loaderSekelton ? (
            ar.map((x, i) => (
              <Grid key={i} xs={12} md={4} lg={3} item>
                <ProductItemSkelton data={i} />
              </Grid>
            ))
          ) : (
            <>
              {productList?.length === 0 ? (
                <EmptyPage
                  text={"Product"}
                  onClickHandler={() => {
                    NavigateHandler("/products/List?add");
                  }}
                  logo="/assets/Group.svg"
                  actiontext={userid !== minisiteUserID ? false : true}
                />
              ) : (
                productList?.map((item, index) => (
                  <Grid key={index} xs={12} sm={6} md={4} lg={3} item>
                    <ProductItem data={item} key={index} />
                  </Grid>
                ))
              )}
              {allData?.total > 12 && (
                <ViewMoreProductts>
                  <MoreAboutUsButton
                    onClick={() =>
                      router.push(
                        `/mini-site/${userInfo?.basic_information?.slug}/products`
                      )
                    }
                  >
                    View More
                  </MoreAboutUsButton>
                </ViewMoreProductts>
              )}
            </>
          )}
        </Grid>
      </>
    )
  );
}
