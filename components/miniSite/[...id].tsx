import React, { useEffect, useState } from "react";
import MiniHeader from "./Header";
import Headernav from "./Header/Headernav";
import MiniFooter from "./MiniFooter";
import { useSelector } from "react-redux";
import EmptyPage from "@/components/miniSite/EmptyPages/index";
import AppNavigationBar from "./Header/Appbar";
import {
  setContactChat,
  setHeaderData,
  setMinisiteUserId,
  setUserCategory,
} from "@/hooks/miniSite";
import { apiClient } from "../common/common";
import { useRouter } from "next/router";
import { useAppDispatch } from "redux/store";
import { Box, Typography } from "@mui/material";
import { fetchIPAddress } from "@/hooks/appReducers";
import MiniSiteSkeleton from "./Reviews/MiniSiteSkeleton";
import { Loader } from "./styled";
// import ChatWindow from "../Chat";

const MiniSite = () => {
  const [loader, setLoader] = useState<any>(true);
  const { minisiteUserID, headerData } = useSelector(
    (state: any) => state.miniSite
  );
  let user_id = JSON.parse(localStorage.getItem("userData"))?.id;
  const slug_status = headerData?.basic_information?.slug_status;
  const { ipAddress } = useSelector((state: any) => state.userData);
  const [authenticate, setAuthenticate] = useState<any>(false);
  const dispatch = useAppDispatch();
  const { query } = useRouter();
  const FetchDetail = async () => {
    let id = localStorage?.userData
      ? JSON.parse(localStorage?.userData)?.id
      : null;
    setLoader(true);
    let response = await apiClient("front/mini-site/home?type=Home", "post", {
      body: { shop_slug: query?.id?.[0], user_id: id, ip: ipAddress },
    });
    if (response.status == 200) {
      FactoryDetails(response.basic_information.user_id, response);
      localStorage.setItem("shop_id", response.basic_information.shop_id);
      dispatch(setHeaderData(response));
      dispatch(setMinisiteUserId(response.basic_information.user_id));
      dispatch(setUserCategory(response.basic_information.category_list));
      dispatch(
        setContactChat(
          response?.chat_contact_person ?? {
            ...response?.user_info,
            designation: response?.user_info?.job_role,
            image: response?.user_info?.profile_link,
          }
        )
      );
      setAuthenticate(true);
    } else {
      setAuthenticate(false);
    }
    setLoader(false);
  };

  const FactoryDetails = async (minisiteUserID, res) => {
    let response = await apiClient(
      `mini-site/company_profile/factory_informations/view?user_id=${minisiteUserID}&mini_site=1`,
      "get"
    );

    if (response.status == 200) {
      dispatch(
        setHeaderData({
          ...res,
          company_information: response?.data,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(fetchIPAddress());
    if (query?.id?.[0]) FetchDetail();
  }, [query?.id?.[0]]);
  const [bgImageVisible, setBgImageVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBgImageVisible(true);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      {/* <ChatWindow /> */}
      <AppNavigationBar authenticate={authenticate} />
      {loader ? (
        <>
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "251px",
            }}
          >
            <img src="/assets/Loader/Power-Logo-Loader.gif" />
          </Box> */}
          <MiniSiteSkeleton></MiniSiteSkeleton>
          {/* <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <Loader />
          </Box> */}
          {/* <Box
            sx={{
              height: "90vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:'#000'
            }}
          >
            <Box className="container loaderouter">
              <div className="text-wrapper">
                <span
                  className="char charactercolor"
                  style={{ animationDelay: " 0.6s" }}
                >
                  P
                </span>
                <span
                  className="char charactercolor"
                  style={{ animationDelay: "0.8s" }}
                >
                  O
                </span>
                <span
                  className="char charactercolor"
                  style={{ animationDelay: "1s" }}
                >
                  W
                </span>
                <span
                  className="char charactercolor"
                  style={{ animationDelay: "1.2s" }}
                >
                  E
                </span>
                <span
                  className="char charactercolor"
                  style={{ animationDelay: "1.4s" }}
                >
                  R
                </span>
                <span className="char" style={{ animationDelay: "1.6s" }}>
                  C
                </span>
                <span className="char" style={{ animationDelay: "1.8s" }}>
                  O
                </span>
                <span className="char" style={{ animationDelay: "2s" }}>
                  Z
                </span>
                <span className="char" style={{ animationDelay: "2.2s" }}>
                  M
                </span>
                <span className="char" style={{ animationDelay: "2.4s" }}>
                  O
                </span>
              </div>
              <Box className="imgdiv">
                <img
                  src="/assets/default/Powercozmo-icon.svg"
                  alt="Background"
                  className="bg-image"
                  id="bgImage"
                />
              </Box>
            </Box>
          </Box> */}
        </>
      ) : authenticate ? (
        <>
          <Box>
            {slug_status === 0 && minisiteUserID != user_id ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  flexDirection: "column",
                  gap: "8px",
                  height: "65.9vh",
                }}
              >
                <img
                  alt="logo"
                  loading="lazy"
                  width="100"
                  height="100"
                  decoding="async"
                  data-nimg="1"
                  src="/assets/images/unavailableStore.svg"
                  style={{ fill: "#d7282f" }}
                ></img>
                The seller's ministore is currently not available. Feel free to
                explore other sellers' stores or check back later.
              </Box>
            ) : (
              <>
                {loader ? (
                  <MiniSiteSkeleton></MiniSiteSkeleton>
                ) : (
                  <MiniHeader />
                )}
                {loader ? <MiniSiteSkeleton></MiniSiteSkeleton> : <Headernav />}
              </>
            )}
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "66vh",
          }}
        >
          <EmptyPage
            text={"Store"}
            onClickHandler={() => ""}
            logo="/assets/category_rejected.svg"
            type="product"
          />
        </Box>
      )}

      {loader ? (
        ""
      ) : (
        <MiniFooter name={headerData?.contact_profile?.name ?? "Merchant AD"} />
      )}
    </div>
  );
};

export default MiniSite;
