import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { MiniSectionWrapper, MiniSortContainer } from "./Products.styled";
import { MiniSiteContainer } from "../styled";
import { MiniSiteContext } from "@/contextApi/miniContext";
import { apiClient } from "@/components/common/common";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import SingleSlider from "../SingleSlider";

const MiniSidebar = dynamic(() => import("../MiniSidebar"), { ssr: false });
const MyProducts = dynamic(() => import("./MyProducts"), { ssr: false });
const CategoryScroller = dynamic(() => import("./CategoryScroller"), {
  ssr: false,
});
const SearchSortComp = dynamic(() => import("./SearchSortComp"), {
  ssr: false,
});

const MiniProducts = (props) => {
  const [show, setShow] = useState<boolean>();
  const ctx = useContext(MiniSiteContext);
  const [sidebarWidth, setSidebarWidth] = useState(undefined);
  const [sidebarTop, setSidebarTop] = useState(undefined);
  const [bannerSettings, setBannerSettings] = useState([]);
  // const { catalog, id } = props;
  const [catalogs, setCatalogs] = useState<any>({});
  const { productData } = props;

  useEffect(() => {
    const sidebarEl = document.querySelector(".target").getBoundingClientRect();
    setSidebarWidth(sidebarEl.width);
    setSidebarTop(sidebarEl.top);
  }, []);

  useEffect(() => {
    if (!sidebarTop) return;
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, [sidebarTop]);

  const isSticky = (e) => {
    const scrollTop = window.scrollY;
    if (scrollTop >= sidebarTop) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const [page, setPage] = useState<number>(0);
  const [loaderSekelton, setLoader] = useState<boolean>(true);
  const [searchname, setSearchName] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<any>({ id: "" });
  const [selctedsorting, setSelctedsorting] = useState<string>("DESC");
  const [categoryList, setCategoryList] = useState<any>([]);
  const [productList, setProductList] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<any>(0);
  const [lastPage, setLastPage] = useState<any>(0);
  const [loader, setBannerLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const [skeleton, setSkeleton] = useState(false);

  let userid = JSON.parse(localStorage.getItem("userData"))?.id;
  const { minisiteUserID, userInfo } = useSelector(
    (state: any) => state.miniSite
  );
  const { query }: any = useRouter();
  const router = useRouter();
  const q = router.query.id;
  const isAll = router.asPath?.split("?")[1];
  const [catalogId, setCatalogId] = useState<any>("");
  const productId = q && Array.isArray(q) ? q[q.length - 1] : null;

  useEffect(() => {
    if (router?.query?.catalogIds) {
      // const id = Number(router?.query?.catalogIds);
      setCatalogId(router?.query?.catalogIds);
    }
  }, [router?.query?.catalogIds]);

  const filterById = (idToFilter, catalogsData) => {
    const filteredCatalogs = catalogsData.find((catalog) => {
      return +catalog.id === +idToFilter;
    });
    setCatalogs(filteredCatalogs);

    return filteredCatalogs?.products;
  };

  const fetchAllCatalogList = async () => {
    setCatalogs({});
    setLoader(true);
    // setCatalogs({name:'ALL Catalog'})
    setCatalogs({ name: "All Catalog", products: [] });
    try {
      const currency_id = JSON.parse(localStorage.getItem("currency")) ?? 1;
      const response = await apiClient(
        `product/catalog_product_listing?currency=${currency_id}&shop_slug=${userInfo?.basic_information?.slug}`,
        "get",
        {}
      );
      if (response.status) {
        const allProductData = response?.data;
        setCatalogs({ name: "All Catalog", products: allProductData });
        setProductList(allProductData);
      } else {
      }
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };
  const fetchCatalogList = async () => {
    setCatalogs({});
    setLoader(true);

    try {
      const currency_id = JSON.parse(localStorage.getItem("currency")) ?? 1;
      const response = await apiClient(
        `product/minisite_catalog_list?currency=${currency_id}&shop_slug=${userInfo?.basic_information?.slug}`,
        "get",
        {}
      );
      if (response.status === 200) {
        const products = filterById(router?.query?.catalogIds, response?.data);
        setProductList(products || []);
      } else {
      }
    } catch (error) {
      console.error("Error fetching catalogs:", error);
    } finally {
      setLoader(false);
    }
  };

  const FetchProductList = async (reset = false, id = "") => {
    setLoader(true);
    setSkeleton(true);
    const currency = JSON.parse(localStorage.getItem("currency")) ?? 1;

    let response = await apiClient(
      "front/mini-site/products?type=Products",
      "post",
      {
        body: {
          currency: currency,
          page: !reset ? page : 1,
          per_page: "12",
          search_by_name: reset ? "" : searchname ? searchname : query?.s,
          category_id: !reset
            ? query.category
              ? query.category
              : searchCategory?.slug
            : "",
          seller_id: minisiteUserID,
          user_id: userid,
          orderBy: `id,${!reset ? selctedsorting : "DESC"}`,
          sort_by: `id,${!reset ? selctedsorting : "DESC"}`,
        },
      }
    );
    if (response.status == 200) {
      setCatalogs({ name: "All products ", products: response.data });
      setBannerSettings(response.banner_setting);
      if (query?.category != undefined) {
        setSearchCategory(
          response.category_list.find((v) => v.slug == query.category)
        );
      } else {
        setSearchCategory({ id: "" });
      }

      setCategoryList(response.category_list);
      setPage(response.currentPage);
      setTotalPage(response.total);
      setLastPage(response.lastPage);
      // setProductTest(response.data);
      setProductList(response.data);
    }
    setLoader(false);
    setSkeleton(false);
  };

  useEffect(() => {
    if (router?.query?.catalogIds) {
      if (router?.query?.catalogIds === "All") {
        fetchAllCatalogList();
      } else {
        fetchCatalogList();
      }
    } else {
      FetchProductList();
    }
  }, [router?.query, router?.query?.catalogIds]);

  // useEffect(() => {
  //   if (minisiteUserID)
  //     FetchProductList(false, query?.category?.split("_")?.[1] ?? "");
  // }, [minisiteUserID, query]);
  // useEffect(() => {
  //   if (minisiteUserID)
  //     FetchProductList(false, query?.category?.split("_")?.[1] ?? "");
  // }, [minisiteUserID]);

  useEffect(() => {}, []);

  // useEffect(() => {
  //   if (!isNaN(catalogId) && catalogId) {
  //     setLoader(true);
  //     if (catalogs?.length <= 0) {
  //       // router.push(`${userInfo?.basic_information?.slug}/products/`);
  //     }
  //     const filteredProductList = catalogs.find((catalog) => {
  //       return catalog?.id == catalogId;
  //     });
  //     setProductList(filteredProductList?.products);
  //     setLoader(false);
  //   } else {
  //     if (productTest?.length > 0) {
  //       setProductList(productTest);
  //     }
  //   }
  // }, [catalogId, catalogs, productTest]);

  return (
    <Box>
      <Box>
        {bannerSettings?.length > 0 && (
          <SingleSlider settings={bannerSettings[0]} type="products" />
        )}
        <MiniSiteContainer className="sectionspacing">
          <Box>
            <Grid container spacing={{ md: 2, sm: 2, xs: 2 }}>
              <Grid item md={3} xs={12} display={{ xs: "none", lg: "block" }}>
                <MiniSidebar />
              </Grid>
              <Grid item lg={9} xs={12}>
                <Box
                  className={
                    show ? "categoryContaineerActive" : "categoryContaineer"
                  }
                  style={{ width: `${sidebarWidth}px` }}
                ></Box>
                <Stack spacing={{ md: 2, xs: 2 }}>
                  <MiniSortContainer p={{ md: 2, xs: 1.5 }}>
                    <SearchSortComp
                     skeleton={skeleton}
                      searchname={searchname}
                      setSearchName={setSearchName}
                      selctedsorting={selctedsorting}
                      setSelctedsorting={setSelctedsorting}
                      FetchProductList={FetchProductList}
                      setSearchCategory={setSearchCategory}
                      productList={productList}
                    />
                  </MiniSortContainer>
                  <MiniSortContainer
                    className="target"
                    p={
                      ctx?.productData?.category_list?.length > 0 && {
                        md: 2,
                        xs: 1.5,
                      }
                    }
                  >
                    <CategoryScroller
                      skeleton={skeleton}
                      categoryList={categoryList}
                      FetchProductList={FetchProductList}
                      setSearchCategory={setSearchCategory}
                      searchCategory={searchCategory}
                    />
                  </MiniSortContainer>
                  <MiniSectionWrapper p={{ md: 2 }}>
                    {/* xs: 1.5 */}
                    <MyProducts
                      allProducts={productList}
                      FetchProductList={FetchProductList}
                      setPage={setPage}
                      totalPage={totalPage}
                      lastPage={lastPage}
                      page={page}
                      loaderSekelton={loaderSekelton}
                      catalogsData={catalogs}
                    />
                  </MiniSectionWrapper>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </MiniSiteContainer>
      </Box>
    </Box>
  );
};

export default MiniProducts;
