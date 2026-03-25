import React, { useCallback, useEffect, useState } from "react";
// import useProductContext from "@/hooks/useProductContext";
import poststyle from "../style.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import {
  Autocomplete,
  Box,
  Breadcrumbs,
  InputAdornment,
  TextField,
} from "@mui/material";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSelector } from "react-redux";
import { setToggleNavbar } from "@/hooks/HeaderHooks";
import { useAppDispatch } from "redux/store";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import EditProductFormik from "@/hooks/useEditProductFormik";
import {
  getCurrencyList,
  getPriceTerms,
  getUnitsTerms,
  setProductDetail,
} from "@/hooks/ProductReducers";
import { getProductId } from "@/components/common/common";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  AccordionHeading,
  BreadcrumbArrow,
  CategoryBoxSmall,
  CategoryContainerSmall,
  CategorySelector,
  CategorySelectorSearch,
  EditPostAccordion,
  Heading,
  HideOnScrollContentt,
  InnerLeftContainer,
  OuterContainer,
  PreHeaderText,
  ProductSectionHeaderContainer,
  RightContent,
  SearchForCommonCateory,
  SearchHere,
  SelectCategory,
  SelectCategoryText,
  StickyHeaderStyle,
  SubHeading,
} from "../styles";
import EditPostSkelton from "../EditPostSkeleton";
import { ProductCategories } from "../productCategories";
import { ProductDescription } from "../productDescription";
import { ProductInfo } from "../productInformation";
import { ActivePassiveTab } from "../productInformation/activePassive";
import UploadProducts from "../rightStaticContent/UploadProducts";
import { StaticRightContent } from "../rightStaticContent";
import { ProductCategoriesPlaceholder } from "./ProductCategoriesPlaceholder";
import { ProductInfoPlaceholder } from "./ProductInfoPlaceholder";
import { ActivePassiveTabPlaceholder } from "./ActivePassiveTabPlaceholder";
import { CommercialInformationPlaceholder } from "./CommercialInformationPlaceholder";
import UploadProductsPlaceholder from "./UploadProductsPlaceholder";
import EditingPlaceholder from "./EditingPlaceholder";
import { StaticRightContentPlaceholder } from "./StaticRightContentPlaceholder";
import { ProductDescriptionPlaceholder } from "./ProductDescriptionPlaceholder";
const categories = [
  {
    label: "Power Generation",
    items: ["Solar", "Wind", "Hydroelectric", "Geothermal", "Nuclear", "Coal"],
  },
  { label: "Energy", items: ["Solar Energy", "Wind Energy", "Nuclear Energy"] },
  { label: "Solar Energy", items: ["Solar Panels", "Solar Trackers"] },
];

//  debounce function
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const EditProductPlaceholder = (props) => {
  const { formik, getBrands } = EditProductFormik();
  const { query }: any = useRouter();
  const [category_lists, setCategories] = useState<any>([]);

  const [productApplicationOptions, setProductApplicationOptions] =
    useState<any>([]);
  const [productUseCaseOptions, setProductUseCaseOptions] = useState<any>([]);
  const [published, setPublished] = useState("");
  const [placeholder, setIsPlaceholder] = useState("");
  const { productDetail } = useSelector((state: any) => state.editProduct);
  const { photos, payment_methods, caseData } = productDetail;
  const [compeletedFields, setCompletedFields] = useState<any>({
    category: false,
    information: false,
    description: false,
    specification: false,
    commercial: false,
    images: false,
    editing: false,
  });
  const [accordionValue, setAccordianValue] = useState<string>("category");
  const [loader, setLoader] = useState<boolean>(true);
  const [descriptionBlock, setDescriptionBlock] = useState<any>({
    disable: true,
    expanded: false,
  });
  const [information, setInformationBlock] = useState<any>({
    disable: true,
    expanded: false,
  });
  const [specification, setSpecificationBlock] = useState<any>({
    disable: true,
    expanded: false,
  });
  const [commercial_information, setCommercialBlock] = useState<any>({
    disable: true,
    expanded: false,
  });
  const [images, setImagesBlock] = useState<any>({
    disable: true,
    expanded: false,
  });
  const [smart_editing, setSmartBlock] = useState<any>({
    disable: true,
    expanded: false,
  });
  useEffect(() => {
    if (photos?.length > 0) {
      setImagesBlock({ disable: false, expanded: true });
    } else {
      setImagesBlock({ disable: true, expanded: false });
    }
  }, [photos]);
  useEffect(() => {
    if (caseData && payment_methods) {
      setCommercialBlock({ disable: false, expanded: true });
    } 
    // else {
    //   setCommercialBlock({ disable: true, expanded: false });
    // }
  }, [payment_methods, caseData]);
  const [availability, setProductAvailability] = useState<string>("");
  const [percentage, setPercentage] = useState<any>([
    { name: "empty", value: 0 },
  ]);
  const dispatch = useAppDispatch();
  const HandlePercentage = (name, value) => {
    let finalValue;

    if (name === "category_sector") {
      finalValue = 8.976660682;
    } else if (name === "category_parent_category") {
      finalValue = 5.642728905;
    } else if (name === "") {
      // finalValue = 6.642728905;
    } else {
      finalValue = parseFloat(value);
      if (isNaN(finalValue)) {
        finalValue = 0;
      }
    }
    finalValue = Math.round(finalValue * 100) / 100;
    setPercentage((prev) => {
      const index = prev.findIndex((v) => v.title === name);
      if (index >= 0) {
        return prev.map((item, idx) =>
          idx === index ? { ...item, value: finalValue } : item
        );
      } else {
        return [...prev, { title: name, value: finalValue }];
      }
    });
  };

  const HandleAccordian = (name) => {
    setAccordianValue((prev) => {
      if (prev === name) {
        return "";
      }
      return name;
    });
  };

  const [showPadding, setShowPadding] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setShowPadding(true);
    } else {
      setShowPadding(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    dispatch(setToggleNavbar(true));
    dispatch(getCurrencyList());
    dispatch(getPriceTerms());
    dispatch(getUnitsTerms());
    getBrands();
  }, []);

  useEffect(() => {
    if (availability === "" && productDetail?.availability) {
      setProductAvailability(productDetail?.availability);
    }
  }, [productDetail?.availability]);

  const product_id = getProductId();

  const getUniqueByName = (data) => {
    const map = new Map();
    return data.filter((item) => {
      if (!map.has(item.name)) {
        map.set(item.name, true);
        return true;
      }
      return false;
    });
  };

  const fetchProductApplicationAndCasesList = async () => {
    if (category_lists?.length == 0) {
      return;
    }
    let category_id = category_lists?.map((ele) => ele?.id);
    if (category_id?.length == 0) {
      return;
    }
    try {
      const response = await fetch(
        `${BASE_URL}/product-application/suggested-product-application-usecase?id=${category_id?.join(
          ","
        )}&category_id=${category_id?.join(",")}`,
        {
          method: "GET",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${Auth?.token()}`,
          },
        }
      );
      if (response.status == 200) {
        const { product_application, product_use_case } = await response.json();
        // setProductApplicationOptions(product_application);
        // setProductUseCaseOptions(product_use_case);

        const uniqueProductApplication = getUniqueByName(product_application);
        const uniqueProductUseCase = getUniqueByName(product_use_case);

        setProductApplicationOptions(uniqueProductApplication);
        setProductUseCaseOptions(uniqueProductUseCase);
      }
    } catch (error) {
      throw new Error(error ?? "Something went wrong while fetching the data");
    }
  };

  const FetchProductDetail = async () => {
    let formData = new FormData();
    formData.append("id", query?.Id);
    const { data } = await axios.post(
      `${BASE_URL}/product/view/single/list`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Auth.token()}`,
        },
      }
    );
    if (data.data?.length > 0) {
      // await fetchProductApplicationAndCasesList();
      dispatch(setProductDetail(data.data[0]));
      setLoader(false);
      setPublished(data.data[0]?.published);
      setIsPlaceholder(data.data[0]?.is_placeholder);
      setCategories(
        data?.data[0]?.category_lists.map((v, i) => ({
          ...v,
          level: i + 1,
        }))
      );
      formik.setFieldValue("availability", data?.data[0]?.availability ?? "");
    }
  };
  useEffect(() => {
    if (query?.Id) {
      FetchProductDetail();
    }
    return () => {
      setProductDetail({});
    };
  }, [query]);

  const HeaderWithToolTip = (name, tooltip = null) => {
    return (
      <Heading>
        {name}
        <LightTooltip title="Required" arrow placement="top">
          <span style={{ color: "#d32f2f" }}> * </span>
        </LightTooltip>
        {tooltip && (
          <LightTooltip placement={"top"} title={tooltip} arrow>
            {
              <span
                style={{
                  display: "inline-block",
                  position: "relative",
                  width: "16px",
                  height: "16px",
                }}
              >
                <Image src={"/assets/helpIcon.svg"} layout="fill" alt="image" />{" "}
              </span>
            }
          </LightTooltip>
        )}
      </Heading>
    );
  };
  const HeaderWithToolTip1 = (name, tooltip = null) => {
    return (
      <Heading>
        {name}
        <LightTooltip title="Required" arrow placement="top">
          <span style={{ color: "#d32f2f" }}> </span>
        </LightTooltip>
        {tooltip && (
          <LightTooltip placement={"top"} title={tooltip} arrow>
            {
              <span
                style={{
                  display: "inline-block",
                  position: "relative",
                  width: "16px",
                  height: "16px",
                }}
              >
                <Image src={"/assets/helpIcon.svg"} layout="fill" alt="image" />{" "}
              </span>
            }
          </LightTooltip>
        )}
      </Heading>
    );
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollTop);
    return () => {
      window.removeEventListener("scroll", handleScrollTop);
    };
  }, []);

  const handleScrollTop = () => {
    const scrollTop = window.pageYOffset;
    if (scrollTop > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  ////// Common search
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<string[]>([]);
  const [showOptions, setShowOptions] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<{
    category: string;
    item: string;
  } | null>(null);

  const handleSearchClick = () => {
    setShowOptions(false);
  };

  React.useEffect(() => {
    if (inputValue) {
      const filteredOptions = categories
        .map((category) =>
          category.items.filter((item) =>
            item.toLowerCase().includes(inputValue.toLowerCase())
          )
        )
        .flat();

      setOptions(filteredOptions);
    } else {
      setOptions([]);
    }
  }, [inputValue]);

  const handleItemSelect = (item: string) => {
    const selectedCategory = categories.find((category) =>
      category.items.includes(item)
    );
    if (selectedCategory) {
      setSelectedItem({ category: selectedCategory.label, item });
      setShowOptions(false);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchOptions, setSearchOptions] = useState<any>([]);
  const [refetchlist, setRefetchlist] = useState<any>(false);
  const [optionsNotFound, setOptionsNotFound] = useState(false);

  const fetchSearchData = async (query: string) => {
    if (!query.trim() || query.includes(">")) {
      setOptionsNotFound(false);
      setSearchOptions([]);
      return;
    }
    setOptionsNotFound(false);

    try {
      const fetchResponse = await fetch(
        `${BASE_URL}/category/categoryTree?search=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.token()}`,
          },
        }
      );

      if (fetchResponse.ok) {
        const response = await fetchResponse.json();
        if (response?.data?.length == 0) {
          setOptionsNotFound(true);
          return;
        }
        const updatedSearchData = createAutocompleteOptions(response?.data);
        setSearchOptions(updatedSearchData);
      } else {
        setOptionsNotFound(true);
      }
    } catch (error) { }
  };

  const debouncedFetchResults = useCallback(
    debounce((query) => fetchSearchData(query), 1000),
    []
  );

  const handleInputChange = (newInputValue: string) => {
    setOptionsNotFound(false);
    setInputValue(newInputValue);
    if (!newInputValue.trim()) {
      setShowOptions(false);
      setSearchOptions([]);
      return;
    }
    setShowOptions(true);
    setSearchQuery(newInputValue);
    debouncedFetchResults(newInputValue);
  };

  const createAutocompleteOptions = (categories) => {
    if (categories?.lenght == 0) {
      return [];
    }

    const result = [];

    const traverse = (node, path = [], data = []) => {
      if (!node) return;

      // Update path and data arrays
      const newPath = [...path, node.name];
      const newData = [
        ...data,
        {
          id: node.id,
          parent_id: node.parent_id,
          level: node.level,
          name: node.name,
        },
      ];

      // If the node has no further subcategories, push to result
      if (!node.sub_category) {
        result.push({
          view: newPath.join(" > "),
          data: newData,
        });
      }

      // Traverse sub_category if it exists
      if (node.sub_category) {
        traverse(node.sub_category, newPath, newData);
      }
    };

    // Start traversal for each top-level category
    categories?.forEach((category) => traverse(category));

    return result;
  };

  return (
    <Box
      sx={{
        ".MuiCheckbox-root": {
          position: "relative",
          "& .MuiSvgIcon-root": {
            display: "none",
          },
          "&:before": {
            content: '" "',
            display: "block",
            width: "1rem",
            height: "1rem",
            border: "1px solid #d2d2d2",
            borderRadius: "4px",
          },
          "&:after": {
            content: '" "',
            display: "inline-block",
            transform: "rotate(45deg)",
            width: "4px",
            height: "8px",
            borderBottom: "2px solid #D7282F",
            borderRight: "2px solid #D7282F",
            position: "absolute",
            // top: "11px",
            opacity: "0",
            margin: "-4px 0 0 0",
          },
          "&:hover": {
            "&:before": {
              borderColor: "#b1b0b0",
            },
          },
          "&.Mui-checked": {
            "&:after": {
              opacity: "1",
            },
            "&:before": {
              borderColor: "#D7282F",
            },
          },
        },
      }}
    >
      <StickyHeaderStyle className="top_header">
        <div className={`editfixed-header ${isScrolled ? "show" : "hide"}`}>
          <PreHeaderText>
            <Box>
              <Typography 
                sx={{ fontSize: "19px", fontWeight: "600", color: "#000","&::first-letter": { textTransform: "uppercase" } }}
              >
                {" "}
                {productDetail?.name ? `${productDetail.name}` : ""}
              </Typography>

              <HideOnScrollContentt>
                <SelectCategoryText
                  sx={{
                    "& .firstChild:nth-of-type(1)": {
                      color: "#d7282f",
                    },
                  }}
                >
                  {category_lists[0]?.icon && (
                    <Image
                      src={category_lists[0]?.icon}
                      height={15}
                      width={15}
                      alt="Category"
                    />
                  )}
                  {category_lists?.map((element, index) => (
                    <>
                      <CategoryBoxSmall
                        className="firstChild"
                        sx={{
                          margin: "0 4px 0 0",
                          background: "none",
                          border: "none",
                          "&:first-child": {
                            color: "#d7282f",
                            fontWeight: "500",
                          },
                        }}
                        key={element?.id || index}
                        style={{}}
                      >
                        {element?.name
                          .split(" ")
                          .map(
                            (w) =>
                              w.substring(0, 1).toUpperCase() + w.substring(1)
                          )
                          .join(" ")}
                      </CategoryBoxSmall>
                      {category_lists?.length - 1 != index && (
                        <BreadcrumbArrow sx={{ margin: "-8px 8px 0 4px" }}>
                          <i className="icon-arrowRight"></i>
                        </BreadcrumbArrow>
                      )}
                    </>
                  ))}
                </SelectCategoryText>
              </HideOnScrollContentt>
            </Box>
            {productDetail?.product_type == "configured" && (
              <text className={poststyle.productType}>Configuration</text>
            )}
          </PreHeaderText>
        </div>
      </StickyHeaderStyle>

      <OuterContainer className={poststyle.creat_post_page}>
        {loader ? (
          <EditPostSkelton />
        ) : (
          <>
            <InnerLeftContainer className={poststyle.creat_post_left}>
              <div className={poststyle.create_post_inn}>
                <EditPostAccordion>
                  <PreHeaderText>
                    <Typography className="editproductt" sx={{"&::first-letter": { textTransform: "uppercase" }}}>
                      {" "}
                      {productDetail?.name ? `${productDetail.name}` : ""}
                    </Typography>
                    {productDetail?.product_type == "configured" && (
                      <text className={poststyle.productType}>
                        Configuration
                      </text>
                    )}
                  </PreHeaderText>
                  {loader ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "80vh",
                        width: "100%",
                      }}
                    >
                      <Image
                        src="/assets/Loader/Power-Logo-Loader.gif"
                        height={100}
                        width={100}
                        alt={""}
                      />
                    </Box>
                  ) : (
                    <>
                      <Accordion
                        expanded={accordionValue === "category"}
                        onChange={() => HandleAccordian("category")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <AccordionHeading>
                            {HeaderWithToolTip(
                              " Product Category",
                              "Choose from a predefined list or introduce a new category to enhance product discovery and categorization."
                            )}
                            <SubHeading>
                              Identify the category that most accurately
                              characterizes your product's primary function.
                            </SubHeading>
                            {category_lists?.length > 0 &&
                              accordionValue !== "category" && (
                                <CategorySelector>
                                  <RightContent>
                                    <SelectCategory>
                                      Selected Categories:
                                    </SelectCategory>
                                    <SelectCategoryText>
                                      {category_lists?.map((element, index) => (
                                        <>
                                          <CategoryContainerSmall
                                            key={element?.id || index}
                                            style={{}}
                                          >
                                            {element?.name
                                              .split(" ")
                                              .map(
                                                (w) =>
                                                  w
                                                    .substring(0, 1)
                                                    .toUpperCase() +
                                                  w.substring(1)
                                              )
                                              .join(" ")}
                                          </CategoryContainerSmall>
                                        </>
                                      ))}
                                    </SelectCategoryText>
                                  </RightContent>
                                </CategorySelector>
                              )}
                          </AccordionHeading>
                        </AccordionSummary>

                        <AccordionDetails>
                          <SearchForCommonCateory>
                            <Box>
                              <Autocomplete
                                size="small"
                                value={null}
                                inputValue={inputValue}
                                options={searchOptions || []}
                                getOptionLabel={(option: any) =>
                                  option.view || ""
                                }
                                noOptionsText={
                                  optionsNotFound
                                    ? "No categories available with this name. Please try some different category."
                                    : "Loading..."
                                }
                                open={showOptions}
                                onInputChange={(event, newInputValue) =>
                                  handleInputChange(newInputValue)
                                }
                                onChange={(event: any, newValue: any) => {
                                  if (newValue) {
                                    if (newValue?.data?.length > 0) {
                                      setCategories(newValue.data);
                                    }
                                    setRefetchlist(true);

                                    setInputValue("");
                                    setShowOptions(false);
                                    setSearchOptions([]);
                                  }
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Search Categories"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                      ...params.InputProps,
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <SearchHere
                                            variant="contained"
                                            onClick={() => {
                                              if (!searchQuery.trim()) return;
                                              debouncedFetchResults(
                                                searchQuery
                                              );
                                            }}
                                            startIcon={<SearchRoundedIcon />}
                                          />
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                )}
                                renderOption={(props, option) => (
                                  <li {...props}>{option.view}</li>
                                )}
                              />
                              {selectedItem && (
                                <CategorySelectorSearch>
                                  <Breadcrumbs
                                    aria-label="breadcrumb"
                                    separator={
                                      <i className="icon-arrowRight"></i>
                                    }
                                  >
                                    {/* Main Category in Red */}
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        fontWeight: "600",
                                        color: "#d7282f !important",
                                      }}
                                    >
                                      {selectedItem.category}
                                    </Typography>
                                    <Box>
                                      <Typography variant="body2">
                                        {selectedItem.item}
                                      </Typography>
                                    </Box>
                                  </Breadcrumbs>
                                </CategorySelectorSearch>
                              )}
                            </Box>
                          </SearchForCommonCateory>
                          <ProductCategoriesPlaceholder
                            setRetchList={setRefetchlist}
                            refetchlist={refetchlist}
                            setDescriptionBlock={setDescriptionBlock}
                            setCompletedFields={setCompletedFields}
                            setAccordianValue={setAccordianValue}
                            category_lists={category_lists}
                            setLoader={setLoader}
                            loader={loader}
                            FetchProductDetail={FetchProductDetail}
                            setPublished={setPublished}
                            setCategories={setCategories}
                            productDetail={productDetail}
                            setProductDetail={setProductDetail}
                            percentage={percentage}
                            HandlePercentage={HandlePercentage}
                          />
                        </AccordionDetails>
                      </Accordion>

                      <Accordion
                        disabled={descriptionBlock.disable}
                        expanded={accordionValue === "description"}
                        onChange={(e) => {
                          e.stopPropagation();
                          HandleAccordian("description");
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <ProductSectionHeaderContainer>
                            {HeaderWithToolTip("Product Description")}
                            <SubHeading>
                              Provide product Description with a short
                              description and file upload capability.
                            </SubHeading>
                          </ProductSectionHeaderContainer>
                        </AccordionSummary>
                        <AccordionDetails>
                          <ProductDescriptionPlaceholder
                          accordionValue={accordionValue}
                            FetchProductDetail={FetchProductDetail}
                            productApplicationOptions={
                              productApplicationOptions
                            }
                            setProductApplicationOptions={
                              setProductApplicationOptions
                            }
                            fetchProductApplicationAndCasesList={
                              fetchProductApplicationAndCasesList
                            }
                            productUseCaseOptions={productUseCaseOptions}
                            setProductUseCaseOptions={setProductUseCaseOptions}
                            // fetchKeywords={fetchKeywords}
                            category_lists={category_lists}
                            setInformationBlock={setInformationBlock}
                            HandlePercentage={HandlePercentage}
                            setCompletedFields={setCompletedFields}
                            setAccordianValue={setAccordianValue}
                            // productDetail={productDetail}
                            setPublished={setPublished}
                            setProductDetail={setProductDetail}
                            percentage={percentage}
                          // selectedKeywords={selectedKeywords}
                          // setSelectedKeywords={setSelectedKeywords}
                          // suggestedKeywords={suggestedKeywords}
                          // setSuggestedKeywords={suggestedKeywords}
                          // percentage={percentage}
                          />
                        </AccordionDetails>
                      </Accordion>

                      <Accordion
                        disabled={information.disable}
                        expanded={accordionValue === "information"}
                        onChange={() => HandleAccordian("information")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel3a-content"
                          id="panel3a-header"
                        >
                          <AccordionHeading>
                            {HeaderWithToolTip(
                              "Product Information",
                              availability == "in_stock"
                                ? `In Stock are generally warehouse/inventory goods.`
                                : '"By Order" are yet to be manufactured.'
                            )}
                            <SubHeading>
                              Please choose if the product is in stock or to be
                              manufactured against order.
                            </SubHeading>
                          </AccordionHeading>
                        </AccordionSummary>
                        <AccordionDetails>
                          <ProductInfoPlaceholder
                            accordionValue={accordionValue}
                            availability={availability}
                            setPublished={setPublished}
                            setProductAvailability={setProductAvailability}
                            setSpecificationBlock={setSpecificationBlock}
                            HandlePercentage={HandlePercentage}
                            setCompletedFields={setCompletedFields}
                            setAccordianValue={setAccordianValue}
                            productDetail={productDetail}
                            FetchProductDetail={FetchProductDetail}
                            // percentage={percentage}
                            category_lists={category_lists}
                          />
                        </AccordionDetails>
                      </Accordion>

                      <Accordion
                        // disabled={specification.disable}
                        expanded={accordionValue === "specification"}
                        onChange={() => HandleAccordian("specification")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel6a-content"
                          id="panel6a-header"
                        >
                          <ProductSectionHeaderContainer>
                            {HeaderWithToolTip1(
                              "Product features & Characteristics"
                            )}
                            <SubHeading>
                              Detail your product with their general technical
                              specifications and available ranges.
                            </SubHeading>
                          </ProductSectionHeaderContainer>
                        </AccordionSummary>
                        <AccordionDetails>
                          <ActivePassiveTabPlaceholder
                            FetchProductDetail={FetchProductDetail}
                            setCommercialBlock={setCommercialBlock}
                            HandlePercentage={HandlePercentage}
                            setPublished={setPublished}
                            setCompletedFields={setCompletedFields}
                            setAccordianValue={setAccordianValue}
                            category_lists={category_lists}
                            productDetail={productDetail}
                            setProductDetail={setProductDetail}
                            percentage={percentage}
                          />
                        </AccordionDetails>
                      </Accordion>

                      <Accordion
                        disabled={commercial_information.disable}
                        expanded={accordionValue === "commercial"}
                        onChange={() => HandleAccordian("commercial")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel4a-content"
                          id="panel4a-header"
                        >
                          <ProductSectionHeaderContainer>
                            {HeaderWithToolTip("Commercial Information")}
                            <SubHeading>
                              Ensure all commercial details filled are accurate
                              and truthful so that your product is reliable and
                              attractive to potential buyers.
                            </SubHeading>
                          </ProductSectionHeaderContainer>
                        </AccordionSummary>
                        <AccordionDetails>
                          <CommercialInformationPlaceholder
                          accordionValue={accordionValue}
                            setImagesBlock={setImagesBlock}
                            setPublished={setPublished}
                            HandlePercentage={HandlePercentage}
                            setCompletedFields={setCompletedFields}
                            setAccordianValue={setAccordianValue}
                            productDetail={productDetail}
                            FetchProductDetail={FetchProductDetail}
                            percentage={percentage}
                          />
                        </AccordionDetails>
                      </Accordion>

                      <Accordion
                        disabled={images.disable}
                        // disabled={
                        //   photos?.length > 0
                        //     ? images.disable == true
                        //     : images.disable == false
                        // }
                        expanded={accordionValue === "image"}
                        onChange={() => HandleAccordian("image")}
                        sx={{
                          "&.MuiButtonBase-root.MuiAccordionSummary-root.Mui-focusVisible":
                          {
                            backgroundColor: "#fff !important",
                          },
                        }}
                      >
                        <AccordionSummary
                          sx={{
                            "&.MuiButtonBase-root.MuiAccordionSummary-root.Mui-focusVisible":
                            {
                              backgroundColor: "#fff !important",
                            },
                          }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel7a-content"
                          id="panel7a-header"
                        >
                          <ProductSectionHeaderContainer>
                            {HeaderWithToolTip(
                              "Upload Product Images",
                              "Upload high-resolution images with white or transparent background that clearly showcase your product from different angles and in various conditions. This helps buyers get a comprehensive view of the product and its features."
                            )}
                            <SubHeading>
                              Enrich the product's visual presentation by
                              including uploaded images.
                            </SubHeading>
                          </ProductSectionHeaderContainer>
                        </AccordionSummary>
                        <AccordionDetails>
                          <UploadProductsPlaceholder
                            setSmartBlock={setSmartBlock}
                            setPublished={setPublished}
                            setCompletedFields={setCompletedFields}
                            setAccordianValue={setAccordianValue}
                            productDetail={productDetail}
                            HandlePercentage={HandlePercentage}
                            percentage={setPercentage}
                          />
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        // disabled={smart_editing.disable}
                        expanded={accordionValue === "smart_editing"}
                        onChange={() => HandleAccordian("smart_editing")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel5a-content"
                          id="panel5a-header"
                        >
                          <ProductSectionHeaderContainer>
                            {HeaderWithToolTip1(
                              "Description",
                              "Choose readymade template blocks to add the description of the productProvide a clear and detailed description of your product, highlighting key features, technical specifications, benefits, and any relevant information to help buyers understand its value and suitability."
                            )}
                            <SubHeading>
                              Find in-depth product descriptions and related
                              information in the Description tab.
                            </SubHeading>
                          </ProductSectionHeaderContainer>
                        </AccordionSummary>
                        <AccordionDetails>
                          <EditingPlaceholder
                            FetchProductDetail={FetchProductDetail}
                            setPublished={setPublished}
                            setAccordianValue={setAccordianValue}
                            HandlePercentage={HandlePercentage}
                            setCompletedFields={setCompletedFields}
                            productDetail={productDetail}
                          />
                        </AccordionDetails>
                      </Accordion>
                    </>
                  )}
                </EditPostAccordion>
              </div>
            </InnerLeftContainer>
            <div className={poststyle.creat_post_right}>
              <StaticRightContentPlaceholder
                percentage={percentage}
                compeletedFields={compeletedFields}
                productDetail={productDetail}
                setPublished={setPublished}
                published={published}
                fetchList={FetchProductDetail}
                setAccordianValue={setAccordianValue}
              />
            </div>
          </>
        )}
      </OuterContainer>
    </Box>
  );
};

export default EditProductPlaceholder;
