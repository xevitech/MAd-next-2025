import React, { useEffect, useState } from "react";
import {
  Breadcrumbs,
  Drawer,
  Link,
  Stack,
  Tooltip,
  styled,
} from "@mui/material";
import { Grid } from "@mui/material";
import { Tab, Tabs, Typography } from "@mui/material";
import {
  OriginShippingPayIconsInfo,
  SelectedOrigin,
} from "@/components/ProductDetail/style";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { TextField, Box, Button } from "@mui/material";
import { useFormik } from "formik";
import {
  CountQty,
  OverviewContainer,
  QtyContainer,
} from "components/ProductDetail/ProductComponents/Style";
import {
  apiClient,
  CheckOs,
  CurrencySymbol,
  randomStr,
} from "@/components/common/common";
import Login from "@/components/ProductDetail/ProductComponents/Modal/Login";
import { toast } from "react-toastify";
import Image from "next/image";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";

import {
  UserAddress,
  PlanBadge,
  TabsData,
  ConfigTableList,
  DrawerContainer,
  DrawerHeader,
  DrawerBody,
  SubjectCol,
  UserthumbImg,
  SummaryOuter,
  SummaryBox,
  FooterBtn,
  LoginModal,
  ZoomBox,
  HeaderBreadcrumb,
  ProductWImg,
  FeatureProdImg,
  IdWName,
  ProductID,
  ProdCompanyName,
  OverviewCol,
  RequestQuoteH,
  QuoteDetail,
} from "./style";
import EditableTable from "./EditableTable";
import RelatedProducts from "./RelatedProducts";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import _debounce from "lodash/debounce";
import {
  setRelatedProductSpecs,
  setSubmitQuoteData,
  setTotalAndUnitPrice,
  setUnitList,
} from "@/hooks/quoteHooks";
import { fetchIPAddress } from "@/hooks/appReducers";
import { useAppDispatch } from "redux/store";
import UnitSelect from "./UnitSelect";
import { SupplierContainer } from "@/components/ProductDetail/ProductComponents/Style";
import { MobileCodes } from "@/components/common/PhoneInput/MobileCodesList";
import CustomizeRequest from "./NewQueryModal/CustomizeRequest";
import MoreInfomation from "./NewQueryModal/MoreInfomation";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { ThreeDots } from "react-loader-spinner";
import { createHistory } from "@/hooks/UseCreateFormData";
import * as Yup from "yup";
import { ImagesBox, ImgContainer } from "@/components/common/dropZone/style";
import AttachmentsView from "./NewQueryModal/AttachmentsView";
import moment from "moment";
import { AddCountryList } from "@/hooks/productDetailsReducer";
import { TerritoryList, countriesList } from "@/utils/countriesphp";
import QuickSignup from "@/components/auth/quickSignup/QuickSignup";
import Auth from "@/auth/Auth";
import { crmApiClient } from "@/utils/apiClient/crmApiClient";
import { getSessionFromCookies } from "@/utils/cookieUtils";
import { UploadImgBox } from "@/components/CompanySettings/CompanyDetail/Certificates/style";
import { FieldBorder } from "@/components/CompanySettings/CompanyDetail/commonStyles";
import { FileUpload } from "@/components/common/uploadFile";
import Swal from "sweetalert2";
const Item = styled(Box)(({ theme }) => ({
  textAlign: "center",
  color: "#000000",
  fontSize: "12px",
  fontWeight: "600",
  padding: "1px 0 0",
  "@media (max-width:900px)": {
    fontSize: "11px",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "12px",
  },
}));

const QuoteConfiModal = ({ open, handleClose }) => {
  const [specificationsList, setSpecificationList] = useState<any>([]);

  const [specificationsViewMore, setSpecificationViewMore] =
    useState<boolean>(false);
  const [toggleSignUp, setToggleSignup] = useState<boolean>(true);
  const [hideLogin, setHideLogin] = useState<boolean>(false);
  const { ipAddress } = useSelector((state: any) => state.userData);
  const [attachment, setAttachments] = useState<any>([]);

  const [quotationData, setQuotationData] = useState<any>({});
  const { quotedetails, getQuoteAtachment } = useSelector(
    (state: any) => state.quoteDetails
  );
  const [quantities, setQuantities] = useState<any>(1);
  const [value, setValue] = React.useState(0);
  const [unique_session_id, setUniqueID] = useState<string>("");
  const [id, setID] = useState<string>("");
  const [price_term, setPriceTerm] = useState<string>(quotedetails?.price_term);
  const [priceTermList, setPriceTermList] = useState<any>([]);
  const [checkConfigurationSelected, setCheckConfigurationSelected] =
    useState<boolean>(false);
  const [sendQueryButtonActive, setSendQueryButtonActive] =
    useState<boolean>(false);
  const [editSubject, setEditSubject] = useState<boolean>(false);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  let Token = localStorage?.Token ?? null;
  const dispatch = useAppDispatch();
  const { relatedProductData, relatedProductSpecs, productQuantity } =
    useSelector((state: any) => state.quoteDetails);
  let totalPrice = useSelector(
    (state: any) => state.quoteDetails.TotalAndUnitPrice
  );
  useEffect(() => {
    if (specificationsViewMore && specificationsList.length == 4) {
      setSpecificationList(quotedetails?.specifications);
    }
    if (!specificationsViewMore && specificationsList.length > 4) {
      setSpecificationList(quotedetails?.specifications.slice(0, 4));
    }
    if (
      !specificationsViewMore &&
      specificationsList.length == 0 &&
      quotedetails?.specifications?.length > 0
    ) {
      setSpecificationList(quotedetails?.specifications.slice(0, 4));
    }
  }, [quotedetails, specificationsViewMore]);

  const HandleClose = () => {
    setHideLogin(true);
    setSendQueryButtonActive(false);
  };
  useEffect(() => {
    const fetchUnit = async () => {
      let response = await apiClient("unit", "get");
      dispatch(setUnitList(response?.data ?? []));
    };
    fetchUnit();
    FetchPriceTerm();
    dispatch(fetchIPAddress());
  }, []);

  const FetchPriceTerm = async () => {
    let response = await apiClient("price_terms", "get");
    if (response.status == 200) {
      setPriceTermList(response.data);
    }
  };

  useEffect(() => {
    if (unique_session_id == "") setUniqueID(getSessionFromCookies());
  }, [unique_session_id]);

  const validation = Yup.object().shape({
    customize_request: Yup.object()
      .shape({
        quantity: Yup.number()
          .required("Please enter quantity")
          .typeError("Please enter quantity")
          .test("is-zero", "Quantity cannot be zero", (value) => value !== 0),
      })
      .nullable(),
  });
  let formik = useFormik({
    enableReinitialize: true,
    // validationSchema: validation,
    validateOnChange: false,
    initialValues: {
      to: quotedetails?.seller_name,
      details: `Hello ${quotedetails?.seller_name},
          We are interested in ( ${quotedetails?.name} - ${quotedetails?.unique_number})`,
      subject: `${quotedetails?.name}`,
      options: [],
      customize_request: { attachment: [] },
      more_information: {},
    },
    onSubmit: (values) => {
      SubmitQuotation(values);
    },
  });
  const { customize_request, more_information }: any = formik.values;
  const finalPrice: any =
    customize_request?.price && customize_request?.quantity
      ? customize_request?.price * customize_request?.quantity
      : 0;
  let quick_user_id = localStorage?.userData
    ? JSON.parse(localStorage?.userData).id
    : "";
  const [relatedIds, setRelatedIds] = useState<any>([]);
  const handleSelectedProductIds = (ids) => {
    setRelatedIds(ids);
  };
  let relatedProductIds = [];

  if (Array.isArray(relatedIds)) {
    relatedProductIds = relatedIds.map(Number);
  } else if (typeof relatedIds === "string") {
    relatedProductIds = relatedIds.split(",").map(Number);
  } else {
    relatedProductIds = [];
  }

  const SubmitQuotation = async (values) => {
    alert("submit------");
    return;
    let quick_user_id;
    quick_user_id = localStorage?.userData
      ? JSON.parse(localStorage?.userData).id
      : "";
    if (quotedetails?.user_id === quick_user_id) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "custom-btn cancel-button",
          cancelButton: "custom-btn remove-btn",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons.fire({
        title: "",
        html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot request a quotation <br> for your own products.</span>`,
        icon: undefined,
        showCancelButton: false,
        reverseButtons: true,
        imageUrl: "/assets/minisiteimages/blockquote.webp",
        imageWidth: 80,
        imageAlt: "alt",
      });
      return;
    }
    let Token = Auth.token() ?? null;

    if (quotedetails.product_type == "simple") {
      if (values?.customize_request?.quantity == "") {
        toast.error("Please enter quantity");
        return;
      }
      if (values?.customize_request?.quantity == 0) {
        toast.error("Quantity cannot be zero");
        return;
      }
      if (customize_request?.userPriceTerms == "") {
        toast.error("Please select delivery term");
        return;
      } else if (
        !["FCA", "FAS", "FOB", "EXW"].includes(
          customize_request?.userPriceTerms
        ) &&
        !customize_request?.portCountry
      ) {
        toast.error("Please select port country");
        return;
      } else if (!more_information?.purposeOfInquiry) {
        if (value == 0) {
          toast.error(
            "Please select more information tab to select purpose of inquiry"
          );
          return;
        } else {
          toast.error("Please select purpose of inquiry");
          return;
        }
      } else if (!more_information?.productApplications) {
        toast.error("Please enter product applications");
        return;
      } else if (!more_information?.statementOne) {
        toast.error("Please enter product applications");
        return;
      }
    }
    if (quotedetails.product_type != "simple") {
      if (!customize_request?.userPriceTerms) {
        toast.error("Please select delivery term");
        return;
      } else if (
        !["FCA", "FAS", "FOB", "EXW"].includes(
          customize_request?.userPriceTerms
        ) &&
        !customize_request?.portCountry
      ) {
        toast.error("Please select port country");
        return;
      } else if (!customize_request?.userMessage) {
        toast.error("Please enter message");
        return;
      } else if (!more_information?.purposeOfInquiry) {
        if (value == 0) {
          toast.error(
            "Please select more information tab to select purpose of inquiry"
          );
          return;
        } else {
          toast.error("Please select purpose of inquiry");
          return;
        }
      } else if (!more_information?.projectName) {
        toast.error("Please enter project name");
        return;
      } else if (!more_information?.projectLocation) {
        toast.error("Please enter project location");
        return;
      }
      if (more_information?.competitor[0] === "") {
        toast.error("Please enter competitor");
        return;
      } else if (!more_information?.productApplications) {
        toast.error("Please enter product applications");
        return;
      } else if (!more_information?.statementOne) {
        toast.error("Please enter product applications");
        return;
      } else if (!more_information?.purposeOfInquiry) {
        if (value == 0) {
          toast.error(
            "Please select more information tab to select purpose of inquiry"
          );
          return;
        } else {
          toast.error("Please select purpose of inquiry");
          return;
        }
      }
    }

    if (!Token) {
      setSendQueryButtonActive(true);
      return;
    } else {
      setButtonLoader(true);
    }

    let formData = new FormData();
    formData.append(
      "message",
      quotationData?.message ??
        `Hello ${quotedetails?.seller_name},
    We are interested in ( ${quotedetails?.name} - ${quotedetails?.unique_number})`
    );
    if (quotationData?.select?.length > 0) {
      quotationData?.select.forEach((v) => {
        formData.append("hide_location[]", v);
      });
    }

    formData.append("price_term", price_term);
    formData.append("origin", customize_request?.countryName ?? "");
    formData.append("product_name", quotedetails?.name ?? "");

    formData.append("product_image", quotedetails?.main_image ?? "");

    formData.append("pre_title_name", quotedetails?.pre_title_name ?? "");
    formData.append(
      "port",
      customize_request?.seaPort || customize_request?.airPort
    );
    formData.append("industry", quotationData?.industry ?? "");
    formData.append("related_product_ids", JSON.stringify(relatedProductIds));
    formData.append("enquiry_user_id", quick_user_id);
    formData.append("seller_user_id", quotedetails?.user_id);
    formData.append("product_id", `${quotedetails?.id}`);
    formData.append("unique_session_id", unique_session_id);
    formData.append("ip", ipAddress);
    formData.append("quantity", customize_request?.quantity);
    formData.append("selectedOrigin", customize_request?.countryName ?? "");
    formData.append("enquiry_type", "query");
    formData.append("currency", customize_request?.currency);
    formData.append("price", quotedetails?.unit_price);
    formData.append("final_price", finalPrice);
    formData.append("userPriceTerms", customize_request?.userPriceTerms);
    formData.append("shipingMethod", customize_request?.shipingMethod);
    formData.append("portCountry", customize_request?.portCountry);
    formData.append("port", customize_request?.portCountry);
    formData.append("country_name", customize_request?.countryName);

    // for (let i = 0; i < attachment.length; i++) {
    //   formData.append("attachment[]", attachment[i]);
    // }
    formData.append("userMessage", customize_request?.userMessage);
    formData.append("destination_port", customize_request?.destination_port);
    formData.append("purposeOfInquiry", more_information?.purposeOfInquiry);
    formData.append("projectName", more_information?.projectName);
    formData.append("projectLocation", more_information?.projectLocation);
    const cleanedCompetitor =
      String(more_information?.competitor || "")
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item)
        .join(", ") || "";
    formData.append("competitor", cleanedCompetitor ?? "");
    formData.append(
      "productApplications",
      more_information?.productApplications
    );
    formData.append(
      "statementOne",
      JSON.stringify(more_information?.statementOne)
    );
    formData.append(
      "statementTwo",
      JSON.stringify(more_information?.statementTwo)
    );
    formData.append("system_info", CheckOs());

    formData.append("product_datetime", moment().format("YYYY-MM-DD hh:mm:ss"));
    let url;

    if (quotedetails.product_type == "configured") {
      url = `quotation/config-submit`;
    } else if (quotedetails.product_type == "simple") {
      url = "quotation/simple";
    }
    let response;
    if (quotedetails.product_type == "simple") {
      response = await crmApiClient(
        url,
        "post",
        {
          body: formData,
        },
        true
      );
    } else {
      response = await apiClient(
        url,
        "post",
        {
          body: formData,
        },
        true
      );
    }

    if (response?.status === 200) {
      dispatch(
        createHistory({
          lead_id: response?.lead_id,
          type_id: 1,
          name: "Lead",
          type: "info",
          message: `<span>Lead Created`,
        })
      );
      if (values == 1) {
        setSendQueryButtonActive(false);
        toast.success("Quotation sent successfully");
      } else {
        toast.success("Quotation sent successfully");
      }

      CloseDrawer();
    }

    setButtonLoader(false);
  };

  const handleChange = (event: any, newValue: any) => setValue(newValue);

  const QuotationDatahandler = (data) =>
    setQuotationData((prev) => ({ ...prev, ...data }));

  const SendQunatityQuery = React.useRef(
    _debounce(async (value, unique_session_id, id) => {
      if (value == 0) {
        dispatch(
          setTotalAndUnitPrice({
            ...totalPrice,
            mainProduct: [
              {
                unit: `$ 0`,
                total: `$ 0`,
              },
            ],
          })
        );
        return;
      }
      if (value) {
        let response = await apiClient("front/quote_configuration", "post", {
          body: {
            unique_session_id,
            type: quotedetails.product_type,
            product_id: quotedetails.id,
            product_name: quotedetails.name,
            combinations: JSON.stringify(quotedetails.specifications),
            quantity: value,
            price: +quotedetails.unit_price
              ? +quotedetails.unit_price * value
              : 0,
            id: id ? id : "",
            country_name:
              MobileCodes.find((v) =>
                v.code == quotedetails?.country_origin_id
                  ? quotedetails?.country_origin_id
                  : quotedetails.country_origin_id
              )?.name ?? "",
            category_name: quotedetails?.category_name,
            product_datetime: quotedetails?.created_at,
          },
        });
        if (response.status == 200) {
          if (value > 0) {
            dispatch(
              setTotalAndUnitPrice({
                ...totalPrice,
                mainProduct: [
                  {
                    unit: `$ ${quotedetails?.unit_price ?? 0}`,
                    total: `$ ${
                      quotedetails?.unit_price
                        ? +quotedetails.unit_price * value
                        : 0
                    }`,
                  },
                ],
              })
            );
          }
          setID(response.data.id);
        }
      }
    }, 100)
  ).current;

  const CloseDrawer = () => {
    dispatch(setRelatedProductSpecs([]));
    dispatch(setSubmitQuoteData([]));
    dispatch(setTotalAndUnitPrice({}));
    handleClose();
  };

  let checkedProductIds = relatedProductData.map((v) => v.id);

  let relatedProductPrice = relatedProductSpecs
    .filter((v) => checkedProductIds.includes(v.id))
    .map((v) => {
      if (v.specs.length > 0) {
        return v.specs.map((i) => ({
          unit: Number(i?.unit_price?.split(" ")[1] ?? 0),
          total: Number(i?.price?.split(" ")[1] ?? 0),
        }));
      }
    })
    .flat();

  const AddPrice = (arr) => {
    const resultArray = arr?.reduce(
      (accumulator, currentValue) => {
        accumulator.unit += currentValue.unit;
        accumulator.total += currentValue.total;
        return accumulator;
      },
      { unit: 0, total: 0 }
    ) ?? { unit: 0, total: 0 };
    return resultArray;
  };

  let mainProductPrice = totalPrice?.mainProduct?.map((i) => ({
    unit: Number(i?.unit?.split(" ")[1] ?? 0),
    total: Number(i?.total?.split(" ")[1] ?? 0),
  }));

  let relatedSimpleProductPrice = relatedProductData
    ?.filter((v) => v.type == "simple")
    ?.map((i) => ({
      unit: Number(i?.unit?.split(" ")[1] ?? 0),
      total: Number(i?.total?.split(" ")[1] ?? 0),
    }));

  const RenderPrice = () => {
    let unitPrice =
      AddPrice(relatedProductPrice).unit +
      AddPrice(mainProductPrice).unit +
      AddPrice(relatedSimpleProductPrice).unit;
    let totalPrice =
      AddPrice(relatedProductPrice).total +
      AddPrice(mainProductPrice).total +
      AddPrice(relatedSimpleProductPrice).total;
    return { unitPrice, totalPrice };
  };

  useEffect(() => {
    if (quotedetails.product_type == "simple" && unique_session_id) {
      const sendQuery = async () => {
        let response = await apiClient("front/quote_configuration", "post", {
          body: {
            unique_session_id,
            type: quotedetails.product_type,
            product_id: quotedetails.id,
            product_name: quotedetails.name,
            combinations: JSON.stringify(quotedetails?.specifications?.flat()),
            quantity: value,
            price: quotedetails.unit_price
              ? quotedetails.unit_price * value
              : 0,
            // total_price: quotedetails.unit_price * value,
            // ? quotedetails.unit_price * value
            // : 0,
            id: id ? id : "",
          },
        });
        setID(response.data.id);
        dispatch(
          setTotalAndUnitPrice({
            ...totalPrice,
            mainProduct: [
              {
                unit: `$ ${quotedetails?.unit_price ?? 0}`,
                total: `$ ${
                  quotedetails?.unit_price ? +quotedetails.unit_price * 1 : 0
                }`,
              },
            ],
          })
        );
      };
      sendQuery();
    }
  }, [unique_session_id]);

  const OverviewOptions: any = [
    {
      name: "Manufacturer/Brand",
      value: quotedetails?.brand_name ?? "",
    },
    {
      name: "Manufacturing Year",
      value: quotedetails?.manufacturer_year ?? "",
    },
    {
      name: "Modal No.",
      value: quotedetails?.model_number ?? "",
    },
    {
      name: "Condition",
      value: quotedetails?.condition ?? "",
    },
  ];

  const FetchTerritory = async () => {
    let countryTerritory = [];
    let territory = TerritoryList.map((element) => ({
      value: element?.id + "t",
      view: element?.name,
      type: "Territory",
    }));
    let country = countriesList.map((element) => ({
      value: element?.code,
      view: element?.name,
      type: "Country",
      region: `${element.region}t`,
    }));
    countryTerritory = [...territory, ...country];

    return countryTerritory;
  };

  useEffect(() => {
    (async () => {
      let countryTerritory: any = await FetchTerritory();
      dispatch(AddCountryList(countryTerritory));
    })();
  }, []);
  const [fileData, setFileData] = useState<any>([]);
  const { country } = useSelector((state: any) => state.productDetail);
  const GetCountryName = (name: any) => {
    let countryName = name?.split(",");
    let countriesName = countryName?.map(
      (v) => country.find((el) => el.value == v)?.view
    );

    return countriesName && countriesName?.[0]
      ? countriesName?.toString()
      : "NA";
  };

  let optionList = [];
  if (quotedetails?.case_type === "case_1") {
    let primary_country = JSON?.parse(quotedetails?.caseData)?.value?.split(
      ","
    );
    optionList = [].concat(...primary_country);
  }
  if (quotedetails?.case_type === "case_2") {
    let caseData = JSON?.parse(quotedetails?.caseData);

    // Ensure primary_country is a string before calling .split()
    let primary_country =
      typeof caseData?.primary_country === "string"
        ? caseData?.primary_country.split(",")
        : [];

    let other_source =
      typeof caseData?.other_source === "string"
        ? caseData?.other_source.split(",")
        : [];

    optionList = [].concat(...primary_country, ...other_source);
  }

  if (quotedetails?.case_type === "case_3") {
    let primary_country = JSON?.parse(quotedetails?.caseData)?.map(
      (ele) => ele?.made_in
    );
    let primary_country_update = primary_country.flatMap((item) =>
      item.split(",")
    );
    optionList = [].concat(...primary_country_update);
  }

  const [mount, setMount] = useState(false);
  const importData = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "";
    input.multiple = true;
    input.onchange = (_) => {
      let files = Array.from(input.files);
      setAttachments([...attachment, ...files]);
    };
    input.click();
  };

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
  }

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      MUI
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      Core
    </Link>,
    <Typography key="3" color="text.primary">
      Breadcrumb
    </Typography>,
  ];

  const formatCurrency = (value) => {
    if (!value) return "";

    const parts = value.toString().split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1] ? `.${parts[1]}` : "";

    const formattedInteger = integerPart.replace(
      /(\d)(?=(\d{3})+(?!\d))/g,
      "$1,"
    );

    return formattedInteger + decimalPart;
  };

  return (
    <>
      <Drawer
        anchor={"right"}
        open={open}
        onClose={CloseDrawer}
        sx={{
          "@media (max-width: 1300px)": {
            "& .MuiDrawer-paper": {
              width: "92%",
            },
          },
          "@media (max-width: 480px)": {
            "& .MuiDrawer-paper": {
              width: "100%",
            },
          },
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <DrawerContainer
            className={!Token && sendQueryButtonActive ? "active" : ""}
          >
            <LoginModal className="Login-modal">
              <ZoomBox className="Zoom-box">
                {sendQueryButtonActive && (
                  <SupplierContainer
                    className="New-user"
                    sx={{
                      "@media screen and (max-width: 767px)": {
                        display: "block",
                      },
                    }}
                  >
                    {toggleSignUp ? (
                      <QuickSignup
                        text="Quick Signup"
                        setHideLogin={HandleClose}
                        display="block"
                        setToggleSignup={setToggleSignup}
                        SubmitQuotation={SubmitQuotation}
                        buttonName="Signup & Send Query"
                        type={"signup"}
                      />
                    ) : (
                      <Login
                        setToggleSignup={setToggleSignup}
                        setHideLogin={HandleClose}
                        SubmitQuotation={SubmitQuotation}
                        buttonName="Login & Send Query"
                      />
                    )}
                  </SupplierContainer>
                )}
              </ZoomBox>
            </LoginModal>
            <DrawerHeader>
              <RequestQuoteH
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <Typography>Request for Quote</Typography>
              </RequestQuoteH>
              <ClearOutlinedIcon onClick={CloseDrawer} />
            </DrawerHeader>
            <DrawerBody>
              <HeaderBreadcrumb>
                <Typography variant="h6">
                  You are about to submit a request for quotation{""}
                  <span>(RFQ)</span> for the following product listed under:
                </Typography>
                <Stack spacing={2}>
                  <Breadcrumbs separator="›" aria-label="breadcrumb">
                    {quotedetails?.breadcrumbs?.map((v, i) => (
                      <>
                        <Item
                          sx={{
                            color:
                              i === quotedetails?.breadcrumbs.length - 1
                                ? "#d7282f"
                                : "inherit",
                          }}
                        >
                          {v.name}
                        </Item>
                      </>
                    ))}
                  </Breadcrumbs>
                </Stack>
              </HeaderBreadcrumb>
              <ProductWImg>
                <FeatureProdImg>
                  <ProductID>{quotedetails?.unique_number}</ProductID>
                  <img
                    src={quotedetails?.main_image}
                    alt={quotedetails?.pre_title_name}
                  />
                </FeatureProdImg>
                <IdWName>
                  <ProdCompanyName>
                    {quotedetails?.pre_title_name}
                  </ProdCompanyName>
                  <QuoteDetail variant="h6">
                    {quotedetails?.name}
                    {quotedetails?.brand_name &&
                      ` | ${quotedetails?.brand_name}`}
                    {quotedetails?.seller_name &&
                      ` | ${quotedetails?.seller_name}`}
                  </QuoteDetail>
                </IdWName>
              </ProductWImg>
              <SubjectCol>
                <Grid container spacing={2}>
                  <Grid item xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                    <UserthumbImg>
                      <PlanBadge>
                        <Image
                          height={20}
                          width={20}
                          alt="vintage"
                          src="/assets/vinatage.png"
                        />
                      </PlanBadge>
                      <img src={quotedetails?.company_details?.logo} />
                    </UserthumbImg>
                  </Grid>
                  <Grid item xs={9} sm={4} lg={3} xl={3}>
                    <UserAddress>
                      <Typography variant="h6">To Seller</Typography>
                      <Typography variant="subtitle1">
                        {formik.values.to}
                      </Typography>
                      <Box sx={{ fontSize: "12px", color: "#4F4F4F" }}>
                        {quotedetails?.company_details?.company_name}
                      </Box>
                    </UserAddress>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={8} xl={8}>
                    <UserAddress>
                      {!editSubject ? (
                        <>
                          <Typography variant="h6">Subject</Typography>
                          <Typography variant="subtitle1">
                            {`${quotedetails?.unique_number} | 
                        ${formik.values.subject}`}
                            <Tooltip title="Edit" placement="top">
                              <EditIcon onClick={(e) => setEditSubject(true)} />
                            </Tooltip>
                          </Typography>
                        </>
                      ) : (
                        <Box display="flex" alignItems="center">
                          <TextField
                            size="small"
                            sx={{ width: "100%", marginRight: 1 }}
                            value={formik.values.subject}
                            onChange={(e) =>
                              formik.setFieldValue("subject", e.target.value)
                            }
                          />
                          <Tooltip title="Save" placement="top">
                            <CheckCircleOutlineOutlinedIcon
                              sx={{ cursor: "pointer" }}
                              onClick={() => {
                                setEditSubject(false);
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Cancel" placement="top">
                            <CancelOutlinedIcon
                              sx={{ cursor: "pointer" }}
                              onClick={() => {
                                setEditSubject(false);
                                formik.setFieldValue(
                                  "subject",
                                  quotedetails?.name
                                );
                              }}
                            />
                          </Tooltip>
                        </Box>
                      )}
                    </UserAddress>
                  </Grid>
                </Grid>
                <OverviewCol>
                  <Typography variant="h6">Overview</Typography>
                  <Grid container>
                    {OverviewOptions.map((overview) => {
                      if (overview?.value) {
                        return (
                          <Grid item xs={12} sm={6} md={2}>
                            <Box
                              sx={{
                                textAlign: "center",
                                paddingTop: "16px",
                                "& .MuiTypography-h5": {
                                  fontSize: "13px",
                                  color: "#000000",
                                },
                                "& .MuiTypography-body1": {
                                  fontSize: "14px",
                                  color: "#000000",
                                  fontWeight: "600",
                                },
                              }}
                            >
                              <Typography variant="h5">
                                {overview.name}
                              </Typography>
                              <Typography variant="body1">
                                {overview.value}
                              </Typography>
                            </Box>
                          </Grid>
                        );
                      }
                    })}
                    {quotedetails?.case_type == "case_1" &&
                      quotedetails?.caseData &&
                      optionList?.length == 1 && (
                        <>
                          {JSON?.parse(quotedetails?.caseData)?.selection
                            ? (JSON?.parse(quotedetails?.caseData)
                                ?.show_territory == 1 ||
                                JSON?.parse(quotedetails?.caseData)
                                  ?.show_countries == 1) && (
                                <Grid item xs={12} sm={6} md={3}>
                                  <Box
                                    sx={{
                                      textAlign: "center",
                                      paddingTop: "16px",
                                      "& .MuiTypography-h5": {
                                        fontSize: "13px",
                                        color: "#000000",
                                      },
                                      "& .MuiTypography-body1": {
                                        fontSize: "15px",
                                        color: "#000000",
                                        fontWeight: "600",
                                      },
                                    }}
                                  >
                                    <Typography variant="h5">
                                      Place of Origin
                                    </Typography>
                                    <Typography variant="body1">
                                      {GetCountryName(
                                        JSON?.parse(quotedetails?.caseData)
                                          ?.value
                                      )}
                                    </Typography>
                                  </Box>
                                </Grid>
                              )
                            : quotedetails?.case_label && (
                                <SelectedOrigin>
                                  <OriginShippingPayIconsInfo>
                                    <Box
                                      sx={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                      }}
                                    >
                                      Country of Origins
                                      {quotedetails?.case_label
                                        ?.split("@@@@")
                                        .map((label) => (
                                          <Typography
                                            variant="body1"
                                            sx={{ marginTop: "0" }}
                                            className="origincountrycolor"
                                          >
                                            <div
                                              dangerouslySetInnerHTML={{
                                                __html: `${label}`,
                                              }}
                                            ></div>{" "}
                                          </Typography>
                                        ))}
                                    </Box>
                                  </OriginShippingPayIconsInfo>
                                </SelectedOrigin>
                              )}
                        </>
                      )}

                    {quotedetails?.case_type == "case_2" &&
                      quotedetails?.caseData &&
                      optionList?.length == 1 && (
                        <>
                          {JSON?.parse(quotedetails?.caseData)?.selection
                            ? (JSON?.parse(quotedetails?.caseData)
                                ?.show_territory == 1 ||
                                JSON?.parse(quotedetails?.caseData)
                                  ?.show_countries == 1) && (
                                <Grid item xs={12} sm={6} md={3}>
                                  <Box
                                    sx={{
                                      textAlign: "center",
                                      paddingTop: "16px",
                                      "& .MuiTypography-h5": {
                                        fontSize: "13px",
                                        color: "#000000",
                                      },
                                      "& .MuiTypography-body1": {
                                        fontSize: "15px",
                                        color: "#000000",
                                        fontWeight: "600",
                                      },
                                    }}
                                  >
                                    <Typography variant="h5">
                                      Place of Origin
                                    </Typography>
                                    <Typography variant="body1">
                                      {GetCountryName(
                                        JSON?.parse(quotedetails?.caseData)
                                          ?.value
                                      )}
                                    </Typography>
                                  </Box>
                                </Grid>
                              )
                            : quotedetails?.case_label && (
                                <SelectedOrigin>
                                  <OriginShippingPayIconsInfo>
                                    <Box
                                      sx={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                      }}
                                    >
                                      Country of Origins
                                      {quotedetails?.case_label
                                        ?.split("@@@@")
                                        .map((label) => (
                                          <Typography
                                            variant="body1"
                                            sx={{ marginTop: "0" }}
                                            className="origincountrycolor"
                                          >
                                            <div
                                              dangerouslySetInnerHTML={{
                                                __html: `${label}`,
                                              }}
                                            ></div>{" "}
                                          </Typography>
                                        ))}
                                    </Box>
                                  </OriginShippingPayIconsInfo>
                                </SelectedOrigin>
                              )}
                        </>
                      )}
                    {quotedetails?.case_type == "case_3" &&
                      quotedetails?.caseData &&
                      optionList?.length == 1 && (
                        <>
                          {JSON?.parse(quotedetails?.caseData)?.selection
                            ? (JSON?.parse(quotedetails?.caseData)
                                ?.show_territory == 1 ||
                                JSON?.parse(quotedetails?.caseData)
                                  ?.show_countries == 1) && (
                                <Grid item xs={12} sm={6} md={3}>
                                  <Box
                                    sx={{
                                      textAlign: "center",
                                      paddingTop: "16px",
                                      "& .MuiTypography-h5": {
                                        fontSize: "13px",
                                        color: "#000000",
                                      },
                                      "& .MuiTypography-body1": {
                                        fontSize: "15px",
                                        color: "#000000",
                                        fontWeight: "600",
                                      },
                                    }}
                                  >
                                    <Typography variant="h5">
                                      Place of Origin
                                    </Typography>
                                    <Typography variant="body1">
                                      {GetCountryName(
                                        JSON?.parse(quotedetails?.caseData)
                                          ?.value
                                      )}
                                    </Typography>
                                  </Box>
                                </Grid>
                              )
                            : quotedetails?.case_label && (
                                <SelectedOrigin>
                                  <OriginShippingPayIconsInfo>
                                    <Box
                                      sx={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                      }}
                                    >
                                      Country of Origins
                                      {quotedetails?.case_label
                                        ?.split("@@@@")
                                        .map((label) => (
                                          <Typography
                                            variant="body1"
                                            sx={{ marginTop: "0" }}
                                            className="origincountrycolor"
                                          >
                                            <div
                                              dangerouslySetInnerHTML={{
                                                __html: `${label}`,
                                              }}
                                            ></div>{" "}
                                          </Typography>
                                        ))}
                                    </Box>
                                  </OriginShippingPayIconsInfo>
                                </SelectedOrigin>
                              )}
                        </>
                      )}
                  </Grid>
                </OverviewCol>
                {specificationsList?.length > 0 && (
                  <OverviewCol>
                    <Typography variant="h6">
                      Product features & Characteristics
                    </Typography>
                    <Grid container>
                      {specificationsList?.map((specs) => (
                        <Grid item xs={4} sm={3} md={3}>
                          <Box
                            sx={{
                              textAlign: "center",
                              paddingTop: "16px",
                              "& .MuiTypography-h5": {
                                fontSize: "13px",
                                color: "#000000",
                              },
                              "& .MuiTypography-body1": {
                                fontSize: "15px",
                                color: "#000000",
                                fontWeight: "600",
                              },
                            }}
                          >
                            <Typography variant="h5">{specs?.name}</Typography>
                            <Typography variant="body1">
                              {specs?.values}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                    {quotedetails?.specifications?.length > 4 && (
                      <Box
                        sx={{
                          position: "absolute",
                          right: "14px",
                          bottom: "-10px",
                          background: "#ffffff",
                          padding: "0px 8px",
                          "& .MuiLink-root": {
                            fontSize: "13px",
                            textDecoration: "none",
                            color: "#d7282f",
                            cursor: "pointer",
                            "&:hover": {
                              color: "#002ed1",
                            },
                          },
                        }}
                        onClick={() =>
                          setSpecificationViewMore((prev) => !prev)
                        }
                      >
                        <Link>
                          View {specificationsViewMore ? "Less" : "More"}
                        </Link>
                      </Box>
                    )}
                  </OverviewCol>
                )}
                <OverviewCol sx={{ display: "none" }}>
                  <Typography variant="h6">Configurations List</Typography>
                  <ConfigTableList>
                    {quotedetails?.product_type == "simple" ? (
                      <OverviewContainer>
                        <QtyContainer>
                          <Box
                            sx={{
                              backgroundColor: "#ffffff",
                              display: "flex",
                              alignItems: "center",
                              position: "absolute",
                              top: "-16px",
                              right: "10px",
                              padding: "0 8px",
                              gap: "8px",
                            }}
                          >
                            <Typography variant="body1">Qty</Typography>
                            <CountQty
                              display="flex"
                              alignItems="center"
                              gap={1}
                            >
                              <RemoveIcon
                                sx={{ cursor: "pointer" }}
                                onClick={(e) =>
                                  setQuantities((prev) => {
                                    let qty = prev > 0 ? prev - 1 : prev;
                                    SendQunatityQuery(
                                      qty,
                                      unique_session_id,
                                      id
                                    );
                                    return qty;
                                  })
                                }
                              />

                              <TextField
                                size="small"
                                value={quantities}
                                onChange={(e) => setQuantities(e.target.value)}
                              />

                              <AddIcon
                                sx={{ cursor: "pointer" }}
                                onClick={(e) =>
                                  setQuantities((prev) => {
                                    let qty = +prev + 1;
                                    SendQunatityQuery(
                                      qty,
                                      unique_session_id,
                                      id
                                    );
                                    return qty;
                                  })
                                }
                              />
                            </CountQty>
                            <UnitSelect quotedetails={quotedetails} />
                          </Box>
                        </QtyContainer>
                      </OverviewContainer>
                    ) : (
                      <EditableTable
                        setCheckConfigurationSelected={
                          setCheckConfigurationSelected
                        }
                        checkConfigurationSelected={checkConfigurationSelected}
                        details={quotedetails}
                        specification_options={
                          quotedetails?.variation_options ?? []
                        }
                        unique_session_id={unique_session_id}
                      />
                    )}
                  </ConfigTableList>
                  <RelatedProducts
                    quotedetails={quotedetails}
                    unique_session_id={unique_session_id}
                    customiseRequest={customize_request}
                    onProductIdsChange={handleSelectedProductIds}
                  />
                </OverviewCol>
              </SubjectCol>

              <TabsData>
                <Box sx={{ height: "38px" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    variant="scrollable"
                    TabIndicatorProps={{ style: { display: "none" } }}
                  >
                    <Tab
                      iconPosition="start"
                      label="Customize your Request"
                      disableRipple
                    />
                    <Tab
                      iconPosition="end"
                      label="More Information"
                      disableRipple
                    />
                    <Tab
                      iconPosition="end"
                      label="Related Products"
                      disableRipple
                    />
                  </Tabs>
                </Box>

                <Box
                  sx={{
                    display: value == 0 ? "block" : "none",
                    border: "1px solid #DDDDDD",
                    // padding: "16px",
                  }}
                >
                  <CustomizeRequest
                    priceTermList={priceTermList}
                    formik={formik}
                    type={"quote"}
                    id={quotedetails?.id}
                  />

                  <Grid item md={12}>
                    <Box
                      sx={{
                        padding: "0 16px 16px",
                        "& textarea": {
                          borderRadius: "4px",
                          border: "1px solid #BBBBBB",
                          outline: "none",
                          padding: "12px",
                          width: "100%",
                          margin: "4px 0 0 0",
                        },
                        "& label": {
                          fontSize: "13px",
                          fontWeight: "600",
                          marginBottom: "4px",
                          marginTop: "4px",
                        },
                      }}
                    >
                      <label style={{ fontWeight: "100px" }}>
                        If you have any relevant documents or files to share
                        with the supplier.
                      </label>
                      <UploadImgBox sx={{ margin: "4px 0 0 0" }}>
                        <FieldBorder
                          style={{
                            position: "relative",
                          }}
                        >
                          <FileUpload
                            fileType={".pdf,.doc,.docx,.xls,.xlsx"}
                            name="transaction_documents"
                            files={fileData}
                            error={(error) =>
                              formik.setFieldError("images", error)
                            }
                            updateFiles={(e) => {
                              if (e?.length > 3) {
                                toast.error("Please upload maximum 3 files");
                                return;
                              } else {
                                setFileData([...e]);
                              }
                            }}
                            removedFile={(deletedID) => setFileData(deletedID)}
                          />
                        </FieldBorder>
                      </UploadImgBox>
                      <Typography
                        sx={{ fontWeight: "100px", fontSize: "12px" }}
                        variant="body2"
                      >
                        {"Upload files in PDF,Excel or Doc format."}
                      </Typography>

                      <Box
                        display="flex"
                        alignItems="center"
                        pt={1.5}
                        gap="16px"
                      >
                        {attachment?.length > 0 &&
                          attachment?.map((v, index) => {
                            return (
                              <Box
                                sx={{
                                  position: "relative",
                                  display: "flex",
                                  "& .MuiSvgIcon-root": {
                                    position: "absolute",
                                    right: "-8px",
                                    top: "-8px",
                                    fontSize: "18px",
                                    background: "#ffffff",
                                    borderRadius: "100%",
                                    "&:hover": {
                                      color: "#DA020A",
                                    },
                                  },
                                }}
                                key={`${v?.id ?? `attachment${index + 1}`}`}
                              >
                                <CancelOutlinedIcon
                                  sx={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    setAttachments((prev) => {
                                      let list = [...prev];
                                      list.splice(index, 1);
                                      return list;
                                    });
                                  }}
                                />
                                <Box
                                  sx={{
                                    width: "50px",
                                    height: "50px",
                                    padding: "5px",
                                    border: "1px solid #ddd",
                                    borderRadius: "6px",
                                  }}
                                >
                                  <ImgContainer>
                                    <ImagesBox>
                                      <AttachmentsView
                                        imageUrl={
                                          v.id
                                            ? v.source
                                            : URL.createObjectURL(v)
                                        }
                                      />
                                    </ImagesBox>
                                  </ImgContainer>
                                </Box>
                              </Box>
                            );
                          })}
                      </Box>
                    </Box>
                  </Grid>
                </Box>
                <Box
                  sx={{
                    display: value == 1 ? "block" : "none",
                    border: "1px solid #DDDDDD",
                    padding: "16px",
                  }}
                >
                  <MoreInfomation formik={formik} />
                </Box>
                <Box
                  sx={{
                    display: value == 2 ? "block" : "none",
                    border: "1px solid #DDDDDD",
                    padding: "16px",
                  }}
                >
                  <RelatedProducts
                    quotedetails={quotedetails}
                    unique_session_id={unique_session_id}
                    customiseRequest={customize_request}
                    onProductIdsChange={handleSelectedProductIds}
                  />
                </Box>
              </TabsData>

              {customize_request?.total_price > 0 && (
                <SummaryOuter>
                  <Box
                    sx={{
                      width: "300px",
                      "@media screen and (max-width:600px)": {
                        width: "100%",
                      },
                      "& .MuiTypography-h5": {
                        fontSize: "15px",
                        fontWeight: "600",
                        marginBottom: "6px",
                      },
                    }}
                  >
                    <Typography variant="h5">Product Summary</Typography>
                    <SummaryBox>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "6px 0 4px",
                          "& .MuiTypography-h6": {
                            fontSize: "14px",
                            fontWeight: "600",
                            whiteSpace: "nowrap",
                          },
                          "& .MuiTypography-body1": {
                            fontSize: "14px",
                            fontWeight: "700",
                          },
                        }}
                      >
                        <Typography variant="h6">Total Price:</Typography>

                        <Typography variant="body1">
                          {formatCurrency(customize_request?.total_price)}
                        </Typography>
                      </Box>
                    </SummaryBox>
                  </Box>
                </SummaryOuter>
              )}
            </DrawerBody>
            <FooterBtn>
              <Button
                className="greyfooterbtn"
                variant="outlined"
                sx={{
                  marginRight: "10px",
                  color: "#a9a9a9",
                  border: "1px solid #a9a9a9",
                  "&:hover": {
                    color: "#707070",
                    border: "1px solid #707070",
                  },
                }}
                onClick={() => CloseDrawer()}
              >
                Cancel
              </Button>
              <Button
                className="redfooterbtn"
                variant="contained"
                color="error"
                type="submit"
                disabled={buttonLoader}
                data-tracking="getQuoteButton"
              >
                {buttonLoader ? (
                  <ThreeDots
                    height="35"
                    width="40"
                    radius="9"
                    color="#d7282f"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                ) : (
                  "Send a Query"
                )}
              </Button>
            </FooterBtn>
          </DrawerContainer>
        </form>
      </Drawer>
    </>
  );
};

export default QuoteConfiModal;
