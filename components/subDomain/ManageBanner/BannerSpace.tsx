import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Instruction from "./Instruction";
import SliderListing from "./SliderListing";
import {
  BannerList,
  BannerSetting,
  setActivateBanner,
  setAddNewBanner,
  setBannerImages,
  setBannerPage,
  setButtonInvisible,
  setButtonVisible,
  setCycleNav,
  setDefaultBanner,
  setFullHeightHover,
  setIndicators,
  setSwipe,
} from "@/hooks/sellerSubaccount";
export default function BannerSpace() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(BannerList());
    dispatch(setBannerImages([]));
    dispatch(setBannerPage([]));
    dispatch(setCycleNav(""));
    dispatch(setButtonVisible(""));
    dispatch(setButtonInvisible(""));
    dispatch(setIndicators(""));
    dispatch(setSwipe(""));
    dispatch(setActivateBanner(""));
    dispatch(setFullHeightHover(""));
    dispatch(BannerSetting({ data : [], isActive : false }));
  }, []);

  return (
    <>
      <Instruction />
      <SliderListing />
    </>
  );
}
