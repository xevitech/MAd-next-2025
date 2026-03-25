import UseProductListContext from "@/hooks/UseProductListContext";
import manufactureProductListSlice from "@/hooks/reducers/manufactureProductsReducer";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { useDispatch } from "react-redux";
import appReducer from "@/hooks/appReducers";
import socialMediaReducer from "@/hooks/socialMediaContactReducer";
import UseContactList from "@/hooks/UseContactList";
import companyProfileState from "@/hooks/company";
import geoLocationState from "@/hooks/geolocation";
import UseEnquiryList from "@/hooks/useEnquiryList";
import UseAds from "@/hooks/UseAds";
import productListUrlFilter from "@/hooks/productListUrlFilter";
import useNotificationContext from "@/hooks/useNotificationContext";
import useSubSeller from "@/hooks/sellerSubaccount";
import MiniSiteContext from "@/hooks/miniSite";
import ProdutDetailReducer from "@/hooks/productDetailsReducer";
import HeaderCategoryList from "@/hooks/HeaderHooks";
import PortsList from "@/hooks/portReducer";
import UseBlogList from "@/hooks/Blog";
import LeadReducer from "@/hooks/LeadsReducer";
import UseCreateFormData from "@/hooks/UseCreateFormData";
import QuoteDetailReducer from "@/hooks/quoteHooks";
import CategoryDetailReducer from "@/hooks/CategoryReducer";
import ChatReducer from "@/hooks/ChatReducer";
import { calculatorDetail } from "@/hooks/CalculatorReducer";
import PricingCalculator from "@/hooks/PricingCalculatorReducer";
import { editProductReducer } from "@/hooks/ProductReducers";
import Mpreducer from "@/hooks/reducers/manufactureProductsReducer3";
import AutomationReducer from "@/hooks/automationReducer";
import ThreadReducer from "@/hooks/threadReducer";
import leadScoringSlice from "@/hooks/leadScoringReducers";
const makeStore: any = () =>
  configureStore({
    reducer: {
      enquiry: UseEnquiryList.reducer,
      contact: UseContactList.reducer,
      manufactureProduct: manufactureProductListSlice,
      ads: UseAds.reducer,
      Mpreducer: Mpreducer,
      companyProfile: companyProfileState.reducer,
      geoLocation: geoLocationState.reducer,
      userData: appReducer.reducer,
      SocialMedia: socialMediaReducer.reducer,
      productList: UseProductListContext.reducer,
      UrlFilter: productListUrlFilter.reducer,
      notification: useNotificationContext.reducer,
      subseller: useSubSeller.reducer,
      miniSite: MiniSiteContext.reducer,
      productDetail: ProdutDetailReducer.reducer,
      categoryDetail: CategoryDetailReducer.reducer,
      portsList: PortsList.reducer,
      header: HeaderCategoryList.reducer,
      blogs: UseBlogList.reducer,
      LeadsData: LeadReducer.reducer,
      formList: UseCreateFormData.reducer,
      quoteDetails: QuoteDetailReducer.reducer,
      chatData: ChatReducer.reducer,
      editProduct: editProductReducer.reducer,
      calculatorData: calculatorDetail.reducer,
      PricingCalculator: PricingCalculator,
      automation: AutomationReducer.reducer,
      thread: ThreadReducer.reducer,
      leadScoring: leadScoringSlice.reducer,
    },
    devTools: true,
  });

export const store = makeStore();
export type RootState = ReturnType<typeof store.getState>;

// export type RootState = {
//   manufactureProductList: ReturnType<typeof manufactureProductListReducer>;
// Add other reducers here as needed
// };
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const wrapper = createWrapper<RootState>(makeStore);
