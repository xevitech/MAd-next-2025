import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FieldContainer,
  ScrollCol,
  SelectContainer,
  SelectLbl,
  SelectproductFeature,
  SelectProductText,
  ItemSelectRow,
  SelectFormControl,
  StylingDatagrid,
  FlyoutBtn,
  FlyOutButtonArea,
  FlyOutTable,
  EnterQuantityBox,
  FlyoutCloseBtn,
  FlyOutTableButton,
  EmptyFlyout,
} from "@/components/ProductDetail/style";
import * as Yup from "yup";
import {
  MenuItem,
  Select,
  Typography,
  Button,
  Grid,
  TextField,
  Tabs,
  AvatarGroup,
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Breadcrumbs,
  styled,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setProductConfig } from "@/hooks/productDetailsReducer";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  DataGridPro,
  GridColumns,
  GridSelectionModel,
  useGridApiRef,
} from "@mui/x-data-grid-pro";
import { FooterBtn, HeaderBreadcrumb, TabsData } from "./style";
import ConfigueRelatedProducts from "./ConfigueRelatedProducts";
import Carousel from "react-material-ui-carousel";
import CloseIcon from "@mui/icons-material/Close";
import { apiClient, CheckOs } from "@/components/common/common";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import moment from "moment";
import { BASE_URL, BASE_URL_CRM, BASE_URL_V2 } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import MoreInfomation from "./NewQueryModal/MoreInfomation";
import { useFormik } from "formik";
import CustomizeConfigCase from "./NewQueryModal/CustomizeConfigCase";
import { DataGridStyle } from "@/components/common/commonStyle";
import { UploadImgBox } from "@/components/CompanySettings/CompanyDetail/Certificates/style";
import { FieldBorder } from "@/components/CompanySettings/CompanyDetail/commonStyles";
import { FileUpload } from "@/components/common/uploadFile";
import Swal from "sweetalert2";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import {
  getSessionFromCookies,
  getTokenFromCookies,
} from "@/utils/cookieUtils";
import { BootstrapDialog } from "@/components/Chat/style";
import { SupplierContainer } from "../Style";
import QuickSignup from "@/components/auth/quickSignup/QuickSignup";
import Login from "./Login";
import { isArray } from "lodash";
import { ImagesBox, ImgContainer } from "@/components/common/dropZone/style";
import AttachmentsView from "./NewQueryModal/AttachmentsView";
import EmptyPage from "@/components/common/EmptyPage";

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
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const ProductItemConfigGetQuote = (props) => {
  const { toggleFlyout, type } = props;
  const dispatch = useDispatch();
  const { productConfig }: any = useSelector(
    (state: any) => state.productDetail
  );
  const [options, setOptions] = useState<any>([]);
  const { breadcrumbs } = useSelector(
    (state: any) => state.productDetail.detail.data
  );
  const selectedData = props.selectedData ?? {};
  const { variation_options } = selectedData;

  const { id, user_id } = useSelector(
    (state: any) => state.productDetail.detail.data
  );

  const [searchData, setSearchData] = useState("");
  const [filterData, setFilterData] = useState<any>([]);
  const [value2, setValue2] = React.useState(0);
  const [loader, setLoader] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [skelton, setSkeltonData] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [selectedValue, setSelectedValue] = useState([]);
  const formattedPrice = isFinite(Number(totalPrice))
    ? Number(totalPrice).toFixed(2)
    : "";
  const [customiseRequest, setCustomiseRequestData] = useState<any>("");
  const ipAddress = localStorage.getItem("ipAddress");
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [relatedlist, setRelatedList] = useState([]);
  const [priceTermList, setPriceTermList] = useState<any>([]);
  const [attachments, setAttachments] = useState<any>([]);
  const [page, setPage] = React.useState(1);
  const [existingMatrixData, setExistingMatrixData] = React.useState([]);
  const [selectedSavedRowId, setSelectedSavedRowId] = React.useState([]);
  const [isProceedClicked, setIsProceedClicked] = React.useState(false);
  const importData = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setAttachments((prev) => [...prev, ...files]);
    }
  };
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    setFilterData([]);
    setValue2(0);
    // fetchSingleProductDetails();
  }, []);
  useEffect(() => {
    const selectedRowData = localStorage.getItem("rowSelection");
    if (selectedRowData) {
      const selectedDatas = JSON.parse(selectedRowData);
      if (selectedDatas?.length > 0) {
        const selectedRows =
          filterData.filter((data) => selectedDatas.includes(data?.id)) || [];
        const findedData = filterData.find((data) =>
          selectedDatas.includes(data?.id)
        );
        setRowSelection(selectedRows);
        setSelectedSavedRowId(selectedDatas);
      }
    }
  }, [filterData]);
  const handleTabChange = (event, newValue) => {
    setValue2(newValue);
  };
  useEffect(() => {
    setValue2(0);
  }, []);
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    filterData.map((item) => item.matrix_id);
  }, [filterData]);

  useEffect(() => {
    setOptions(variation_options);
  }, [variation_options]);
  useEffect(() => {
    handleSaveData();
  });
  const handleChange = (event: any, newValue: any) => setValue(newValue);

  const handleSaveData = () => {
    const dataToSave = {
      formattedPrice,
      filterData,
      relatedlist,
    };
    sessionStorage.setItem("tabData", JSON.stringify(dataToSave));
  };
  const DropDownHandler = (e, parent, index) => {
    const { name, value } = e.target;
    setSelectedValue((prev) => {
      const existingIndex = prev.findIndex((rev) => rev?.name === name);

      if (existingIndex !== -1) {
        return prev.map((rev, index) =>
          index === existingIndex ? { name: name, value: value } : rev
        );
      }

      return [...prev, { name: name, value: value }];
    });

    const [parentID, childID, itemName] = value.split("$=$");
    let configuration = productConfig.filter((v) => v.parentID !== `${parent}`);
    let data = [
      ...configuration,
      { value: childID, name, parentID, itemName, index },
    ];
    const itemNames = data.map((item) => item.itemName).join(",");

    setSearchData(itemNames);

    dispatch(setProductConfig(data));
  };
  const [fileData, setFileData] = useState<any>([]);
  const [matrixResponse, setResponse] = useState<any>("");
  const currencyId = localStorage.getItem("currency");

  const filterVariations = async () => {
    setSelectionModel(new Set());
    if (!quantity) {
      toast.error("Please enter Quantity");
      return;
    }
    try {
      setLoader(true);
      const sanitizedSearchData = searchData
        .replace(/^,+/, "")
        .replace(/,+$/, "")
        .replace(/,{2,}/g, ",");

      let response = await apiClient(
        `front/matrix/list?search=${sanitizedSearchData}&product_id=${selectedData?.id}&product_type=configured&currency=${currencyId}`,
        "GET"
      );

      if (response.status === 200) {
        setResponse(response);
        setTabData(false);
        const newQuantity = response?.data.map((da) => {
          return { ...da, quantity: quantity };
        });
        setPage(1);
        setFilterData(newQuantity);
        fetchRelatedProducts();
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);

      toast.error("Error fetching filtered variations");
    }
  };

  const fetchRelatedProducts = async () => {
    let response = await apiClient(
      `front/quote_related_product?category_list=${customiseRequest?.category_lists}&seller_id=${customiseRequest?.user_id}&product_id=${selectedData?.id}&product_type=${selectedData?.product_type}`,
      "get"
    );
    if (response.status === 200) {
      setRelatedList(response.data);
    }
  };

  const fetchSingleProductDetails = async () => {
    setSkeltonData(true);
    let response = await apiClient("front/single/view", "post", {
      body: { id: selectedData?.id },
    });
    // const currency = localStorage.getItem("currency");
    // let response = await apiClient("front/single/view", "post", {
    //   body: { id: selectedData?.id, currency: currency ?? 1 },
    // });
    if (response.status === 200) {
      setSkeltonData(true);

      setCustomiseRequestData(response?.data);
    }
  };
  const validation = Yup.object().shape({});
  let formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    validateOnChange: false,
    initialValues: {},
    onSubmit: (values) => {},
  });

  // useEffect(() => {
  //   handleQuote();
  // }, []);
  const handleQuote = useCallback(async () => {
    let response = await apiClient("front/single/view", "post", {
      body: { id: id },
    });
    if (response.status === 200) {
      setCustomiseRequestData(response?.data);
    }
  }, []);
  const [unique_session_id, setUniqueID] = useState<string>("");
  const staticColumns = [
    {
      field: "sno",
      headerName: "Matrix ID",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "attribute",
      headerName: "Selected Variations",
      minWidth: 130,
      flex: 1,
      editable: false,
      // headerAlign: "center",
      // align: "center",
      renderCell: (params) => (
        <Box sx={{ display: "flex", width: "100%" }}>
          <LightTooltip
            arrow
            disableInteractive
            placement="top"
            title={params.value}
          >
            <Box
              component={"span"}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {params.value}
            </Box>
          </LightTooltip>
        </Box>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 100,
      flex: 1,
      editable: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => <>{params.row.quantity}</>,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      minWidth: 100,
      flex: 1,
      editable: true,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "images",
      headerName: "Images",
      minWidth: 100,
      flex: 1,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => <ImagesColumn params={params} />,
    },
  ];
  const HandleClose = () => {
    setHideLogin(true);
    setSendQueryButtonActive(false);
  };
  const columnsData: any = [...staticColumns];
  const rows = useMemo(() => {
    return filterData?.map((item, index) => {
      const numericPrice = parseFloat(item.price.replace(/[^\d.-]/g, "")) || 0;

      return {
        sno: item?.matrix_id,
        indexValue: index,
        id: item.matrix_id,
        matrix_id: item?.matrix_id,
        price: item?.symbol + numericPrice,
        quantity: item.quantity,
        images: item.images,
        attribute: item.value,
        totalPrice:
          item?.symbol +
            parseFloat(item.price.replace(/,/g, "")) *
              parseInt(item.quantity) || 0,
      };
    });
  }, [filterData, page]);
  useEffect(() => {
    const { priceSum, quantitySum } = filterData?.reduce(
      (acc, item) => {
        const price = parseFloat(item.price?.replace(/,/g, "")) || 0;
        const quantity = item.quantity || 0;
        acc.priceSum += price;
        acc.quantitySum += quantity;

        return acc;
      },
      { priceSum: 0, quantitySum: 0 }
    ) || { priceSum: 0, quantitySum: 0 };

    const total = priceSum * quantitySum;

    if (total > 0) {
      setTotalPrice(total);
    } else {
      setTotalPrice(null);
    }
  }, [filterData]);
  const handleRelatedProductData = (data) => {
    setRelatedProduct(data);
  };
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [rowSelection, setRowSelection] = useState([]);
  const { quotedetails, getQuoteAtachment } = useSelector(
    (state: any) => state.quoteDetails
  );
  const [toggleSignUp, setToggleSignup] = useState<boolean>(true);
  const [hideLogin, setHideLogin] = useState<boolean>(false);
  const [sendQueryButtonActive, setSendQueryButtonActive] =
    useState<boolean>(false);
  useEffect(() => {
    if (unique_session_id == "") setUniqueID(getSessionFromCookies());
  }, [unique_session_id]);
  const [tabData, setTabData] = useState(false);
  const apiRef = useGridApiRef();
  const [selectionModel, setSelectionModel] = React.useState<Set<number>>(
    new Set()
  );
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const prevResultRef = useRef([]);
  let idArray;
  let result;
  let prevResult;
  useEffect(() => {
    idArray = [...selectionModel];
    result = idArray
      .map((id) => filterData.find((item) => item.id === id))
      .filter((item) => item !== undefined);

    prevResult = prevResultRef.current;

    const isNewItemAdded = result.some(
      (item) => !prevResult.find((prev) => prev?.id === item?.id)
    );

    if (isNewItemAdded) {
      setIsButtonEnabled(true);
    }
    prevResultRef.current = result;
  }, [selectionModel, filterData]);
  const temp_ids = selectionModel;
  const [data, setData] = useState([]);
  const dataFilter = (updatedData) => {
    setData(updatedData);
  };

  const [currentPage, setCurrentPage] = React.useState(0);
  const pageSize = 5;
  interface UserData {
    id: number;
    type: string;
    name: string;
    email: string;
  }

  const userDataStr = localStorage.getItem("userData");

  let userData: UserData | null = null;

  if (userDataStr) {
    try {
      userData = JSON.parse(userDataStr);
    } catch (e) {
      console.error("Failed to parse userData:", e);
    }
  }
  const [filteredVariations, setFilteredVariations] = useState([]);

  useEffect(() => {
   /// getVariationList();
  }, []);
  const tempQuoteMatrixIds = filteredVariations.map(
    (item) => item.temp_quote_matrix_id
  );
  const [skeltonGetData, setGetSkeltonData] = useState(true);
  const getVariationList = useCallback(async () => {
    setGetSkeltonData(true);
    try {
      const response = await fetch(
        `${BASE_URL}/front/temp_quote/matrix/list?product_id=${selectedData?.id}&currency=${currencyId}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
        }
      );
      if (response?.status == 200) {
        setGetSkeltonData(false);
        const data = await response.json();
        setExistingMatrixData(data?.data);
        setFilteredVariations(data?.data);
      }
    } catch (error) {}
  },[]);
  const matchedItems = [...selectionModel]
    .map((id) => filterData.find((item) => item.id === id))
    .filter((item) => item !== undefined);
  const clearTempData = async () => {
    try {
      const response: any = apiClient(`front/temp_quote/matrix/clean`, "post", {
        body: {
          ids: tempQuoteMatrixIds,
        },
      });
      if (response?.status) {
      }
    } catch (error) {}
  };
  const handleMatrixDeleted = (deletedMatrixId: number) => {
    setFilterData((prev) =>
      prev.filter((row) => row.matrix_id !== deletedMatrixId)
    );

    const updatedData = filterData.filter(
      (row) => row.matrix_id !== deletedMatrixId
    );

    const matchedRow = updatedData.find(
      (row) => row.matrix_id === deletedMatrixId
    );

    if (matchedRow) {
      setSelectionModel(new Set([matchedRow.id]));
    } else {
      setSelectionModel(new Set());
    }
  };

  const getQuote = async (newVariation) => {
    setGetSkeltonData(true);
    const matchedItems = [...selectionModel]
      .map((id) => filterData.find((item) => item.id === id))
      .filter((item) => item !== undefined);
    const formData = new FormData();
    matchedItems?.forEach((item) => {
      formData.append("matrix_id[]", item.matrix_id.toString());
      formData.append("price[]", parseFloat(item.price).toString());
      formData.append("quantity[]", parseInt(item.quantity).toString());
    });

    formData.append("product_id", selectedData?.id?.toString());
    formData.append("session_id", unique_session_id?.toString());
    formData.append("unique_id", unique_session_id?.toString());

    try {
      const res: any = await fetch(
        `${BASE_URL}/front/temp_quote/matrix/store`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: formData,
        }
      );

      if (res?.status) {
        getVariationList();
        const response = await res.json();
      }
    } catch (error) {}
  };

  const SubmitQuotation = async () => {
    let quick_user_id;
    quick_user_id = localStorage?.userData
      ? JSON.parse(localStorage?.userData).id
      : "";
    if (customiseRequest?.user_id === quick_user_id) {
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
    const token = getTokenFromCookies();
    const { customize_request, more_information }: any = formik.values;

    if (!customize_request?.countryName) {
      toast.error("Please select origin");
      return;
    }

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
    } else if (
      !["FCA", "FAS", "FOB", "EXW"].includes(
        customize_request?.userPriceTerms
      ) &&
      customize_request?.destination_port.trim() === ""
    ) {
      if (customize_request?.shipingMethod == "road") {
        toast.error("Please enter destination port");
      } else {
        toast.error("Please select destination port");
      }
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

    if (!token) {
      setSendQueryButtonActive(true);
      return;
    }
    const formData = new FormData();
    formData.append(
      "message",
      `${customiseRequest?.seller_name}, We are interested in ( ${customiseRequest?.category})`
    );
    formData.append("country_name", customize_request?.countryName);
    formData.append("price_term", customize_request?.userPriceTerms ?? "");
    formData.append("name", customiseRequest?.category);
    formData.append("industry", customiseRequest?.target_industry ?? "");
    formData.append("enquiry_type", "query");
    const filteredProductsIds = relatedProduct.map(
      (product) => product?.product_id
    );
    formData.append("related_product_ids", JSON.stringify(filteredProductsIds));
    formData.append("enquiry_user_id", quick_user_id);
    formData.append("product_id", customiseRequest?.id);
    formData.append("seller_user_id", customiseRequest?.user_id);
    formData.append("unique_session_id", unique_session_id ?? "");
    formData.append("ip", ipAddress ?? "");
    formData.append("quantity", quantity);
    formData.append("selectedOrigin", customize_request?.countryName ?? "");
    formData.append("attachment", fileData);
    formData.append("currency", customiseRequest?.currency_id);
    formData.append("price", customize_request?.total_price);
    formData.append("user_price_terms", customize_request?.userPriceTerms);
    formData.append("shiping_method", customize_request?.shipingMethod ?? "");
    formData.append("port_country_id", customize_request?.portCountry);
    formData.append("user_message", customize_request?.userMessage);
    formData.append(
      "destination_port_id",
      customize_request?.destination_port ?? ""
    );
    formData.append(
      "purpose_of_inquiry",
      more_information?.purposeOfInquiry ?? ""
    );
    formData.append("project_name", more_information?.projectName ?? "");
    formData.append(
      "project_location",
      more_information?.projectLocation ?? ""
    );
    const cleanedCompetitor =
      String(more_information?.competitor || "")
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item)
        .join(", ") || "";
    formData.append("competitor", cleanedCompetitor ?? "");
    formData.append(
      "product_application",
      more_information?.productApplications ?? ""
    );
    formData.append(
      "statement_one",
      JSON.stringify(more_information?.statementOne)
    );
    formData.append(
      "statement_two",
      JSON.stringify(more_information?.statementTwo)
    );
    formData.append("system_info", CheckOs());
    formData.append("product_features", JSON.stringify(rowSelection));
    formData.append("final_price", `${formattedPrice}`);
    formData.append("product_datetime", moment().format("YYYY-MM-DD hh:mm:ss"));
    formData.append("product_name", customiseRequest?.slug ?? "");
    formData.append("product_image", customiseRequest?.main_image ?? "");
    formData.append("pre_title_name", more_information?.projectName ?? "");
    formData.append("type", "configured");
    formData.append("matrix", JSON.stringify(existingMatrixData));
    formData.append(
      "json_data",
      JSON.stringify({
        seperate: [
          {
            price: formattedPrice,
            total: formattedPrice,
            matrix: filterData,
            quantity: quantity,
            product_name: customiseRequest?.slug ?? "",
            product_id: id,
            type: "configured",
            combinations: null,
          },
        ],
        product_id: id,
        total: formattedPrice,
        unit: "",
        unique_session_id: customiseRequest?.unique_session_id ?? "",
      })
    );
    formData.append(
      "related_products",
      JSON.stringify([
        {
          price: formattedPrice,
          total: formattedPrice,
          matrix: filterData,
          quantity: quantity,
          product_name: customiseRequest?.slug ?? "",
          product_id: id,
          type: "configured",
          combinations: null,
        },
      ])
    );
    setSubmitLoader(true);

    try {
      const fetchData = await fetch(`${BASE_URL_CRM}quotation/config-submit`, {
        method: "post",
        body: formData,
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
      });
      const response = await fetchData?.json();
      if (response?.status == true) {
        clearTempData();
        setSubmitLoader(false);
        toast.success("Quotation sent successfully");
        setFilterData([]);
        setSearchData("");
        toggleFlyout();
        setIsProceedClicked(false);
        setSelectedValue([]);
        setAttachments([]);
        setFilteredVariations([]);
        setTabData(false);
        setQuantity("1");
        setValue2(0);
      }
    } catch (error) {}
  };

  useEffect(() => {}, [filterData]);

  const handlePaginatonChange = async (
    event: React.ChangeEvent<unknown>,
    value: number,
    callPrevPage = false
  ) => {
    const sanitizedSearchData = searchData
      .replace(/^,+/, "")
      .replace(/,+$/, "")
      .replace(/,{2,}/g, ",");
    let response = await apiClient(
      `front/matrix/list?search=${sanitizedSearchData}&product_id=${selectedData?.id}&product_type=${selectedData?.product_type}&page=${value}`,
      "GET"
    );
    if (response.status === 200) {
      const newQuantity = response?.data.map((da) => {
        return { ...da, quantity: quantity };
      });
      setFilterData(newQuantity);
      fetchRelatedProducts();
      setTabData(false);
    }
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    setIsProceedClicked(true);
    setShowButton(false);
    setIsLoading(true);
    setTabData(true);
    await fetchSingleProductDetails();
    setIsLoading(false);
  };
  const ImagesColumn = ({ params }: any) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setFilterData([]);
      setSearchData("");
      toggleFlyout();
      setSelectedValue([]);
      setTabData(false);
      setQuantity("1");
      setValue2(0);
      setOpen(false);
    };

    const imageList = params.value;

    return (
      <>
        {imageList && imageList.length > 0 ? (
          <AvatarGroup
            max={3}
            sx={{
              cursor: "pointer",
              "& .MuiAvatar-circular": {
                width: "30px",
                height: "30px",
              },
            }}
          >
            {imageList.map((image: any, index: number) => (
              <Avatar
                key={index}
                src={image.source}
                onClick={handleOpen}
                // alt={image.alt_tag || `Image ${index}`}
              />
            ))}
          </AvatarGroup>
        ) : (
          "N/A"
        )}

        <Dialog open={open} maxWidth="sm" fullWidth>
          <DialogTitle>
            <IconButton
              aria-label="close"
              onClick={() => setOpen(!open)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
                padding: 0,
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <Carousel>
              {imageList?.map((image: any, index: number) => (
                <div key={index}>
                  <img
                    src={image.source}
                    alt={`Image ${index}`}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const handleDelete = (selectedIndex) => {
    setFilterData((prevData) => {
      const data = prevData.filter((item, index) => index !== selectedIndex);
      if (data.length === 0) {
        handlePaginatonChange(null, 1);
      }

      return data;
    });
  };
  const [open3, setOpen3] = React.useState(false);

  const handleClose3 = () => {
    setOpen3(false);
  };

  const currentPageRows = rows.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );
  const currentPageRowIds = new Set(currentPageRows.map((row) => row.id));

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const [quoteButton, setIsQuoteButtonEnabled] = useState(false);
  const handleSelectionModelChange = (newSelection: GridSelectionModel) => {
    if (newSelection.length > 0) {
      setIsQuoteButtonEnabled(true);
    } else {
      setIsQuoteButtonEnabled(false);
    }

    const selectedIds = new Set(newSelection.map(Number));
    const updatedSelection = new Set<number>();

    rows.forEach((row) => {
      if (selectedIds.has(row.id)) {
        updatedSelection.add(row.id);
      }
    });

    setSelectionModel(updatedSelection);
  };

  const currentRows = rows.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );
  return (
    <>
      {sendQueryButtonActive && (
        <React.Fragment>
          <BootstrapDialog
            onClose={handleClose3}
            aria-labelledby="customized-dialog-title"
            open={toggleFlyout}
          >
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
          </BootstrapDialog>
        </React.Fragment>
      )}
      {options?.length > 0 && (
        <FieldContainer>
          {
            <>
              <SelectproductFeature>
                <ItemSelectRow className="flyouthederr">
                  <SelectProductText>
                    Select Product Features:{" "}
                    {filterData?.length > 0 && (
                      <span className="totalvariation">
                        Total variations:{" "}
                        <span className="itemcount">
                          {matrixResponse?.data?.length}
                        </span>
                      </span>
                    )}
                  </SelectProductText>
                  <CancelOutlinedIcon
                    sx={{ cursor: "pointer", "&:hover": { color: "#d7282f" } }}
                    onClick={() => {
                      clearTempData();
                      toggleFlyout();
                      setFilterData([]);
                      setSelectedValue([]);
                      setAttachments([]);
                      setTabData(false);
                      setQuantity("1");
                      setPage(1);
                      setValue(0);
                      setAttachments([]);
                      setIsProceedClicked(false);
                      setFilteredVariations([]);
                      setPage(1);
                    }}
                  />
                </ItemSelectRow>
                {type != "select" && (
                  <HeaderBreadcrumb sx={{ margin: "16px 16px 0" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        padding: "0 !important",
                        margin: "6px 0px 0 !important",
                      }}
                    >
                      You are about to submit a request for quotation{""}
                      <span>(RFQ)</span> for the following product listed under:
                    </Typography>
                    <Stack spacing={2}>
                      <Breadcrumbs separator="›" aria-label="breadcrumb">
                        {breadcrumbs?.map((v, i) => (
                          <>
                            <Item
                              sx={{
                                color:
                                  i === breadcrumbs.length - 1
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
                )}
                <Box sx={{ padding: "1rem" }}>
                  <ScrollCol>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#d7282f",
                        margin: "0px 0 16px 0",
                        fontWeight: "500",
                      }}
                    >
                      Select Options/Terms for specifications
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} md={10} lg={10}>
                        <Grid container spacing={1}>
                          {options?.map((val, i) => {
                            let index = productConfig.findIndex(
                              (v) => v.parentID == val.id
                            );
                            let value = index >= 0 ? productConfig[index] : "";
                            return (
                              <>
                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                  <SelectContainer
                                    className={value ? "active" : ""}
                                  >
                                    <SelectLbl>{val.name}</SelectLbl>
                                    <SelectFormControl size="small" fullWidth>
                                      <Select
                                        displayEmpty
                                        id="demo-simple-configure"
                                        size="small"
                                        value={
                                          selectedValue?.find(
                                            (item) => item.name === val.name
                                          )?.value || "All"
                                        }
                                        name={val.name}
                                        onChange={(e) =>
                                          DropDownHandler(e, val.id, i)
                                        }
                                        inputProps={{
                                          "aria-label": "Without label",
                                        }}
                                        IconComponent={
                                          KeyboardArrowDownOutlinedIcon
                                        }
                                      >
                                        <MenuItem
                                          value="All"
                                          sx={{ fontWeight: "600" }}
                                        >
                                          All
                                        </MenuItem>
                                        {val.parents.map((item) => (
                                          <MenuItem
                                            key={item.id}
                                            value={`${val.id}$=$${item.id}$=$${item.name}`}
                                          >
                                            {item.name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </SelectFormControl>
                                  </SelectContainer>
                                </Grid>
                              </>
                            );
                          })}
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2}>
                        <SelectLbl>Quantity</SelectLbl>
                        <EnterQuantityBox>
                          <TextField
                            id="outlined-size-small"
                            size="small"
                            type="number"
                            fullWidth
                            placeholder="Enter Quantity"
                            value={quantity}
                            onChange={(e) => {
                              let newValue = e.target.value;

                              if (
                                newValue.startsWith("0") &&
                                newValue.length > 1
                              ) {
                                newValue = newValue.slice(1);
                              }

                              if (newValue === "" || Number(newValue) < 1) {
                                setQuantity("");
                              } else if (Number(newValue) > 100000000) {
                                setQuantity("100000000");
                              } else {
                                setQuantity(newValue);
                              }
                            }}
                            inputProps={{
                              inputMode: "numeric",
                              pattern: "[1-9]*",
                            }}
                          />
                        </EnterQuantityBox>
                      </Grid>
                    </Grid>
                    <FlyOutButtonArea>
                      <FlyoutBtn
                        onClick={() => {
                          localStorage.removeItem("rowSelection");
                          setRowSelection([]);
                          setSelectedRowIds([]);
                          filterVariations();
                        }}
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: "123.38px", minHeight: "30.75px" }}
                      >
                        {loader ? (
                          <ThreeDots
                            height="18"
                            width="40"
                            radius="9"
                            color="white"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            visible={true}
                          />
                        ) : (
                          "Filter Variations"
                        )}
                      </FlyoutBtn>
                    </FlyOutButtonArea>
                  </ScrollCol>

                  {type === "select" && filterData?.length === 0 ? (
                    <EmptyFlyout>
                      <img src="/assets/images/pdpflyout.png" alt="" />
                      <Box className="Textarea">
                        <Typography className="emptyHeading">
                          Select Product Features
                        </Typography>
                        <Typography className="emptySubHeading">
                          Select the desired specifications for the product and
                          you can view the price or images related to the
                          particular configuration.
                        </Typography>
                      </Box>
                    </EmptyFlyout>
                  ) : (
                    <>
                      <FlyOutTable
                        sx={{
                          width: "100%",
                          "& .MuiDataGrid-selectedRowCount": {
                            visibility: "hidden",
                          },
                          height: filterData?.length === 0 ? "400px" : "",
                        }}
                        className="getQuote"
                      >
                        <Typography variant="h3">
                          Selected Variations
                          {selectionModel?.size > 0 && (
                            <Typography
                              variant="h3"
                              component={"span"}
                              sx={{ marginLeft: "6px" }}
                            >
                              ({selectionModel?.size})
                            </Typography>
                          )}
                        </Typography>
                        <DataGridPro
                          apiRef={apiRef}
                          rows={rows}
                          columns={columnsData}
                          checkboxSelection
                          pagination={rows.length > 5}
                          sx={DataGridStyle}
                          autoHeight
                          pageSize={pageSize}
                          onPageChange={handlePageChange}
                          onSelectionModelChange={handleSelectionModelChange}
                          selectionModel={Array.from(selectionModel)}
                          disableSelectionOnClick
                          isRowSelectable={(params) =>
                            currentPageRowIds.has(Number(params.id))
                          }
                          components={{
                            NoRowsOverlay: () => (
                              <EmptyPage
                                text="product"
                                logo="/assets/No Selected Variation.svg"
                                actiontext={false}
                                customMessage={{
                                  boldText: "No selected variation",
                                  smallText: "",
                                }}
                              />
                            ),
                          }}
                        />
                        {/* <DataGridPro
                          apiRef={apiRef}
                          rows={rows}
                          columns={columnsData}
                          checkboxSelection
                          pagination={rows.length > 5}
                          sx={DataGridStyle}
                          autoHeight
                          pageSize={pageSize}
                          onPageChange={handlePageChange}
                          onSelectionModelChange={handleSelectionModelChange}
                          selectionModel={Array.from(selectionModel)}
                          disableSelectionOnClick
                          isRowSelectable={(params) =>
                            currentPageRowIds.has(Number(params.id))
                          }
                          components={{
                                                      NoRowsOverlay: () => (
                                                        <EmptyPage
                                                          text="product"
                                                          logo="/assets/No Selected Variation.svg"
                                                          actiontext={false}
                                                          customMessage={{
                                                            boldText: "No selected variation",
                                                            smallText: "",
                                                          }}
                                                        />
                                                      ),
                                                    }}
                        /> */}
                      </FlyOutTable>
                      {isButtonEnabled && (
                        <>
                          {result?.length === 0 && (
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                margin: "0px 0",
                              }}
                            >
                              <Typography
                                sx={{ fontSize: "11px", color: "#d7282f" }}
                              >
                                Please select a product variation to proceed to
                                Get a Quote
                              </Typography>
                            </Box>
                          )}
                          <FlyOutTableButton className="configFlyout">
                            <FlyoutCloseBtn
                              onClick={() => {
                                if (tabData) {
                                  setTabData(false);
                                } else {
                                  setFilterData([]);
                                  setSearchData("");
                                  toggleFlyout();
                                  // setSelectedValue([]);
                                  setTabData(false);
                                  setQuantity("1");
                                  setValue2(0);
                                  setResponse([]);
                                  setPage(1);
                                }
                              }}
                              variant="outlined"
                              size="small"
                            >
                              Close
                            </FlyoutCloseBtn>

                            <FlyoutBtn
                              className={
                                result?.length === 0 ? "ConfigQuote" : ""
                              }
                              disabled={
                                result?.length === 0 || !isButtonEnabled
                              }
                              onClick={() => {
                                setIsButtonEnabled(false);
                                let id = localStorage?.userData
                                  ? JSON.parse(localStorage?.userData).id
                                  : "";

                                getQuote(result);
                                if (id === user_id) {
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
                                    imageUrl:
                                      "/assets/minisiteimages/blockquote.webp",
                                    imageWidth: 80,
                                    imageAlt: "alt",
                                  });
                                  return;
                                }

                                handleClick();
                              }}
                              variant="outlined"
                              size="small"
                            >
                              {isLoading ? (
                                <ThreeDots
                                  height="18"
                                  width="40"
                                  radius="9"
                                  color="white"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  visible={true}
                                />
                              ) : !isProceedClicked ? (
                                "Proceed To Get A Quote "
                              ) : (
                                "Add to Quote"
                              )}
                            </FlyoutBtn>
                          </FlyOutTableButton>
                        </>
                      )}
                    </>
                  )}

                  {isProceedClicked && (
                    <>
                      <TabsData
                        sx={{
                          margin: "2rem 0 0 0",
                          "@media screen and (max-width:767px)": {
                            margin: "5rem 0 0 0",
                          },
                        }}
                      >
                        {type == "select" && (
                          <HeaderBreadcrumb sx={{ margin: "0 0 12px 0" }}>
                            <Typography
                              variant="h6"
                              sx={{
                                padding: "0 !important",
                                margin: "6px 0px 0 !important",
                              }}
                            >
                              You are about to submit a request for quotation
                              {""}
                              <span>(RFQ)</span> for the following product
                              listed under:
                            </Typography>
                            <Stack spacing={2}>
                              <Breadcrumbs
                                separator="›"
                                aria-label="breadcrumb"
                              >
                                {breadcrumbs?.map((v, i) => (
                                  <>
                                    <Item
                                      sx={{
                                        color:
                                          i === breadcrumbs.length - 1
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
                        )}
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
                          <CustomizeConfigCase
                            data={selectedData}
                            formik={formik}
                            customiseRequest={customiseRequest}
                            rowSelection={filteredVariations}
                            updateDelete={getVariationList}
                            result={result}
                            skeltonGetData={skeltonGetData}
                            onMatrixDelete={handleMatrixDeleted}
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
                                If you have any relevant documents or files to
                                share with the supplier.
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
                                      const findType =
                                        e[e.length - 1]?.name.indexOf(".");
                                      if (
                                        e[e.length - 1]?.name.slice(
                                          findType + 1
                                        ) != "pdf" &&
                                        e[e.length - 1]?.name.slice(
                                          findType + 1
                                        ) != "doc" &&
                                        e[e.length - 1]?.name.slice(
                                          findType + 1
                                        ) != "xls" &&
                                        e[e.length - 1]?.name.slice(
                                          findType + 1
                                        ) != "docx" &&
                                        e[e.length - 1]?.name.slice(
                                          findType + 1
                                        ) != "xlsx"
                                      ) {
                                        toast.error(
                                          "Please upload PDF, DOC, or XLS files."
                                        );
                                        return;
                                      }
                                      if (e?.length > 3) {
                                        toast.error(
                                          "Please upload maximum 3 files"
                                        );
                                        return;
                                      } else {
                                        setFileData([...e]);
                                      }
                                    }}
                                    removedFile={(deletedID) =>
                                      setFileData(deletedID)
                                    }
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
                                {attachments?.length > 0 &&
                                  attachments?.map((v, index) => {
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
                                        key={`${
                                          v?.id ?? `attachment${index + 1}`
                                        }`}
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
                          {/* <Grid item md={12}>
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
                              <label>
                                If you have any relevant documents or files to
                                share with the supplier.
                              </label>
                              <UploadImgBox sx={{ margin: "4px 0 0 0" }}>
                                <FieldBorder
                                  style={{
                                    position: "relative",
                                  }}
                                >
                                  <FileUpload
                                    fileType={
                                      ".pdf,.doc,.docx,.xls,.xlsx"
                                    }
                                    name="transaction_documents"
                                    files={fileData}
                                    error={(error) =>
                                      formik.setFieldError("images", error)
                                    }
                                    updateFiles={(e) => {
                                      if (e?.length > 3) {
                                        toast.error(
                                          "Please upload maximum 3 files"
                                        );
                                        return;
                                      } else {
                                        setFileData([...e]);
                                      }
                                    }}
                                    removedFile={(deletedID) =>
                                      setFileData(deletedID)
                                    }
                                  />
                                </FieldBorder>
                              </UploadImgBox>
                            </Box>
                          </Grid> */}
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
                          <ConfigueRelatedProducts
                            totalPrice={formattedPrice}
                            id={selectedData?.id}
                            onSendRelatedData={handleRelatedProductData}
                            relatedlist={relatedlist}
                            fetchRelatedProducts={fetchRelatedProducts}
                          />
                        </Box>
                      </TabsData>
                    </>
                  )}
                </Box>
              </SelectproductFeature>

              {tabData && (
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
                    onClick={() => {
                      toggleFlyout(), setFilterData([]);
                      setSearchData("");
                      toggleFlyout();
                      setAttachments([]);
                      setSelectedValue([]);
                      setTabData(false);
                      setQuantity("");
                      setValue(0);
                      setValue2(0),
                        setFilterData([]),
                        setTabData(false),
                        setQuantity("1");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="redfooterbtn"
                    variant="contained"
                    color="error"
                    onClick={SubmitQuotation}
                    type="submit"
                    disabled={submitLoader}
                  >
                    {submitLoader ? (
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
                      "Submit"
                    )}
                  </Button>
                </FooterBtn>
              )}
            </>
          }
        </FieldContainer>
      )}
    </>
  );
};
export default ProductItemConfigGetQuote;
