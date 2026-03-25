import React, { useState, createContext, useEffect, useReducer } from "react";
import { apiClient } from "@/components/common/common";
import { toast } from "react-toastify";
import router, { useRouter } from "next/router";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";

//  const MINI_STATE = {
//   reviewdata: {},
//   loading: true,
//   error: null
// };
//  const miniReducer = (state, action) => {
//   switch (action.type) {
//       case "FETCHING_REVIEW":
//           return {
//               ...state,
//               loading: true
//           };
//       case "FETCHED_REVIEW":
//           return {
//               ...state,
//               loading: false
//           };
//       case "UPDATE_REVIEW":
//           return {
//               ...state,
//               reviewdata: { ...action.payload }
//           };

//       default:
//           return state;
//   }
// };

export const MiniSiteContext = createContext<any>(null);

export const MiniSiteContextProvider = ({ children }: any) => {
  const [loader, setLoader] = useState<boolean>(false);
  const [selctedcategory, setSelctedcategory] = React.useState<any>("");
  const [selctedsorting, setSelctedsorting] = React.useState<any>("");
  const [productData, setProductData] = useState<any>([]);
  const [contextloading, setContextloading] = useState(true);
  const [certificateloading, setCertificateloading] = useState(true);
  const [headerloading, setHeaderloading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchname, setSearchname] = useState<any>("");
  const [searchCategory, setSearchCategory] = useState<any>("");
  const [userinfo, setUserinfo] = useState<any>();
  const [errormessage, setErrormessage] = useState<any>();
  const [sortedData, setSortedData] = useState<any>([]);
  const [certificatesData, setCertificatesData] = useState<any>();

  const [reviewData, setReviewData] = useState<any>();
  const [reviewloader, setReviewloader] = useState<boolean>();
  const [servicelist, setServicelist] = useState<any>();
  const [headerData, setHeaderData] = useState<any>();
  const [faqData, setFaqData] = useState<any>();
  const [factorydetails, setfactorydetails] = useState<any>();
  const [allProducts, setAlProducts] = useState<any>();
  const [miniId, setMiniId] = useState<any>();
  const { query } = useRouter();
  const [checkId, setCheckId] = useState();

  useEffect(() => {
    async function getItems() {
      // setHeaderloading(true);
      // let minisite: any = window.location.search.split("=")[1];
      // if (minisite) localStorage.setItem("miniSiteid", minisite);
      // setCheckId(minisite);
      // const headerdata = await getHeaderData();
      // setUserinfo(headerdata);
      // setHeaderloading(false);
      // setCertificateloading(true);
      // const certdata = await fetchcertificateData();
      // setCertificatesData(certdata.data);
      // setSortedData([...certdata.sorted]);
      // setCertificateloading(false);
    }
    getItems();
  }, [query.id]);

  function sortProduct() {
    const newArr = productData.data.sort((a, b) =>
      a.product_name > b.product_name
        ? 1
        : b.product_name > a.product_name
        ? -1
        : 0
    );
    setProductData({ ...productData, data: newArr });
  }

  // Mini site header data getting

  async function getHeaderData() {
    // if (localStorage?.getItem("miniSiteid")) {
    //   let userid = JSON.parse(localStorage.getItem("userData"))?.id;
    //   let minisiteid = localStorage?.getItem("miniSiteid");
    //   let response = await apiClient("front/mini-site/home", "post", {
    //     body: { user_id: userid, shop_id: minisiteid },
    //   });
    //   if (response.status === 200) {
    //     return response;
    //   }
    // }
  }

  async function fetchcertificateData() {
    // let userid = JSON.parse(localStorage.getItem("userData"))?.id;
    // const viewData = JSON.parse(localStorage.getItem("userData1"));
    // const shopid = viewData?.basic_information?.shop_id;
    // let shop_id = localStorage?.shop_id ?? shopid;
    // let minisiteid = localStorage?.getItem("miniSiteid");
    // let response = await apiClient("front/mini-site/certificate", "post", {
    //   body: { companyid: shopid, user_id: query.id ? query.id : minisiteid },
    // });
    // if (response.status === 200) {
    //   const sorted = response?.data.map((item, i) => {
    //     return {
    //       id: item?.row[0].id,
    //       title: item?.row[0].name,
    //       certificateImage: item?.row[0].images[0]?.source,
    //       type: item.row[0].type,
    //     };
    //   });
    //   return { data: response.data, sorted };
    // }
  }
  // getting review data and sorting

  // Getting faq Data

  // Getting newRoom Data

  // async function fetchNewsRoomData() {
  //   let userid = JSON.parse(localStorage.getItem("userData"))?.id;
  //   let minisiteid = JSON.parse(localStorage.getItem("miniSiteid"));
  //   let response = await apiClient("front/mini-site/news/list", "post", {
  //     body: { user_id: minisiteid },
  //   });
  //   if (response.status === 200) {
  //     return response;
  //   }
  // }

  // Getting service list Data

  async function fetchServiceList() {
    // let userid = JSON.parse(localStorage.getItem("userData"))?.id;
    // let minisiteid =FetchQueryParams("id")
    // // let response = await apiClient("company_profile/services/list", "get", {
    // //   body: { user_id: minisiteid },
    // // });
    // // if (response.status === 200) {
    // //   return response
    // // }
    // try {
    //   const response = await fetch(
    //     `${BASE_URL}/mini-site/company_profile/services/list?user_id=${minisiteid}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${Auth.token()}`,
    //         "Content-Type": "application/json",
    //       },
    //       method: "GET",
    //     }
    //   );
    //   const responseJson = await response.json();
    //   if (response.status === 200) {
    //     return responseJson;
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  }

  // const getFactoryDetails = async () => {
  //   let minisiteid =FetchQueryParams("id")
  //   // let response = await apiClient(
  //   //   "company_profile/factory_informations/view",
  //   //   "post" , {
  //   //     body :{user_id: minisiteid}
  //   //   }
  //   // );
  //   try {
  //     const response = await fetch(
  //       `${BASE_URL}/mini-site/company_profile/factory_informations/view?user_id=${minisiteid}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${Auth.token()}`,
  //           "Content-Type": "application/json",
  //         },
  //         method: "GET",
  //       }
  //     );
  //     const responseJson = await response.json();
  //     setfactorydetails(response);
  //     if (response.status === 200) {
  //       return responseJson;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const [state, dispatch] = useReducer(miniReducer, MINI_STATE)

  return (
    <MiniSiteContext.Provider
      value={{
        reviewData,
        reviewloader,
        certificateloading,
        headerloading,
        productData,
        contextloading,
        userinfo,
        errormessage,
        setSearchname,
        setSearchCategory,
        sortProduct,
        sortedData,
        certificatesData,
        // fetchNewsRoomData,
        getHeaderData,

        setFaqData,
        faqData,
        setHeaderData,
        headerData,
        selctedcategory,
        setSelctedcategory,
        selctedsorting,
        setSelctedsorting,
        // getFactoryDetails,
        factorydetails,
        servicelist,
        setServicelist,
        fetchServiceList,
        loader,
        setLoader,
        setProductData,
        allProducts,
        setUserinfo,

        setPageNumber,
        pageNumber,
        // SaveLikeData,
        // likebtn
      }}
    >
      {children}
    </MiniSiteContext.Provider>
  );
};
