import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  apiClient,
  CurrencySymbol,
  fetchChatHistory,
  getUserIdLocalStorage,
  Navigate,
} from "../common/common";
import { setQuoteDetails } from "@/hooks/quoteHooks";
import { setSingleProductId } from "@/hooks/UseProductListContext";
import { toast } from "react-toastify";
import { countriesList } from "@/utils/countriesphp";
import {
  chatWindowPopup,
  replaceChat,
  setActiveUser,
  setRoomId,
  setUsersList,
} from "@/hooks/ChatReducer";
import { Box, Checkbox, Stack, Tooltip, Typography } from "@mui/material";
import { BootstrapDialog } from "../Chat/style";
import QuickSignup from "../auth/quickSignup/QuickSignup";
import QuoteModal from "../ProductDetail/ProductComponents/Modal/QuoteModal";

import { LightTooltip } from "../common/Tooltip/tooltip";
import ProductModule from "../ProductsListing/product.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";
import { CheckBoxStyle } from "../profile/common";
import Login from "../ProductDetail/ProductComponents/Modal/Login";
import { ByOrderTypography, ContentFlewView, Doneicon, InStockTypography, ProductItemInfoCard, ProductItemInfoCardOuter, ProductsmallTypography, ProductTitleTypo } from "../ProductsListing/style";
import CustomSlider from "../ProductsListing/CustomSlider";
import { ProductHeadePriceButton } from "../miniSite/styled";
const CustomLabel = ({labelName,onClick }) => {
  const [openModal, setModal] = useState(false);
//   const [Favourite, setFavourite] = useState(data?.wishList);
  const [showLoader, setShowLoader] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSignPopup, setShowSignPopup] = useState(false);
  const [toggleSignup, setToggleSignup] = useState(true);
  const {
    detail: { data: productData = {} },
  } = useSelector((state: any) => state.productDetail);
  const {
    user_id: userIdLocalStorage = "",
    seller_name = "",
    company_details: { company_name = "" } = {},
  } = productData || {};
  const dispatch = useDispatch();
  const { Territory } = useSelector((state: any) => state.productList);
  const { usersList, activeUser } = useSelector((state: any) => state.chatData);
  const {
    user_info: { id: currentLoggedUser },
  } = useSelector((state: any) => state.userData);

  const handleQuote = async (id, type) => {
    setShowLoader(type);
    let response = await apiClient("front/single/view", "post", {
      body: { id: id },
    });
    if (response.status === 200) {
      dispatch(setQuoteDetails(response.data));
    }
    setModal(true);
    setShowLoader("");
    dispatch(setSingleProductId(id));
  };


  let country = countriesList.map((element) => ({
    value: element?.code,
    view: element?.name,
    type: "Country",
    region: `${element.region}t`,
  }));

  const GetName = (id) => {
    let List = [...country, ...Territory];
    let view =
      List.find((v) => v.value?.replace("t", "") == `${id}`.replace("t", ""))
        ?.view ?? "";
    return view;
  };

  const unit = useSelector((state: any) => state.header.unit);

  const UnitName = (unit_id) => {
    return unit.find((v) => v.id == unit_id)?.name ?? "NA";
  };

//   let bussiness = data?.company_details?.business_type;
  let manufacturer_image = "s-badge.png";




  const [state, setState] = useState({ open: false });

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
    let status = 0;
    localStorage.setItem("reminder", status.toString());
  };

  const handlePopupClose = () => {
    setShowSignPopup(false);
  };
  const HandleClose = () => {
    setShowSignPopup(false);
  };


  return (
    <Box sx={{ maxWidth: "100%", height: "100%" }}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={showSignPopup}
      >
        {/* {toggleSignup ? (
          <QuickSignup
            text="Quick Signup"
            setHideLogin={HandleClose}
            display="block"
            setToggleSignup={setToggleSignup}
            // SubmitQuotation={handleAfterSignup}
            buttonName="Start Chat"
            type={"signup"}
          />
        ) : (
          <Login
            setToggleSignup={setToggleSignup}
            setHideLogin={HandleClose}
            // SubmitQuotation={handleAfterSignup}
            buttonName="Login & Start Chat"
          />
        )} */}
      </BootstrapDialog>
      {openModal && (
        <QuoteModal open={openModal} handleClose={() => setModal(false)} />
      )}
      
    </Box>
  );
};

export default CustomLabel;
// prodcutitem.jsx
