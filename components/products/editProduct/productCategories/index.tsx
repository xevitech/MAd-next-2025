import {
  TextField,
  InputAdornment,
  styled,
  Chip,
  Button,
  FormControl,
  Typography,
  Grid,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
// import useProductContext from "hooks/useProductContext";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import poststyle from "../style.module.css";
import {
  CategoriesInnerLeftContainer,
  CategoriesListInnerContainer,
  CategoriesListOuterRightContainer,
  CategoriesOuterContainer,
  CategoryContainerSmall,
  CategoryHeader,
  CategoryHeaderButton,
  CategoryList,
  CategoryListItem,
  CategorySelector,
  Heading,
  ProductCategoryContainer,
  RightContent,
  SubHeading,
  useStyles,
  ButtonCol,
  CategoryName,
  RightSectorCategory,
  RejectedCategory,
  PendingCategory,
  ApprovedCategory,
} from "./styles";
import { Autocomplete, Box } from "@mui/material";
import {
  apiClient,
  configProductScoreValues,
  getUniqueListBy,
  productScoreValues,
} from "@/components/common/common";
import Auth from "@/auth/Auth";
import { toast } from "react-toastify";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { useRouter } from "next/router";
import MiniLoading from "../../common/Loader";
import Image from "next/image";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { BASE_URL } from "@/utils/staticValues";
import AddMetaKeyboard from "../rightStaticContent/addMetaKeyboard/AddMetaKeyboard";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import ProductSkeleton from "./Skeleton";
import { BreadcrumbArrow } from "../styles";
import { useAppDispatch } from "redux/store";
import { setCategoryMetaData, setNewParent } from "@/hooks/CategoryReducer";
import EditProductFormik from "@/hooks/useEditProductFormik";
import VerifiedIcon from "@mui/icons-material/Verified";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CancelIcon from "@mui/icons-material/Cancel";
import { setMultispecData } from "@/hooks/quoteHooks";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
export const ProductCategories = ({
  refetchlist,
  setRetchList,
  setDescriptionBlock,
  setCompletedFields,
  setAccordianValue,
  category_lists,
  setCategories,
  productDetail,
  setPublished,
  setProductDetail,
  setLoader,
  loader,
  HandlePercentage,
  FetchProductDetail,
  percentage,
}) => {
  const { fetchProductDetails } = EditProductFormik();
  const { classes } = useStyles();
  const [categoryList, setCategoryList] = useState<any>([]);
  const [newCategory, setNewCategory] = useState<any>([]);
  const [CategoryErrorText, setCategoryErrorText] = useState<any>([]);
  const [cloneCategoryList, setCloneCategoryList] = useState<any>([]);
  const [count, setCount] = useState<any>(0);
  const { query }: any = useRouter();
  const productId: string = query.Id;
  const [showError, setShowError] = useState<boolean>(false);
  const [showParrentError, setShowParentError] = useState<boolean>(false);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [isMount, setIsMount] = useState<boolean>(false);
  const { meta_data } = useSelector((state: any) => state.categoryDetail);
  const dispatch = useAppDispatch();

  const parentRef = useRef(null);

  const userData = localStorage.getItem("userData");
  const userId = JSON.parse(userData)?.id;

  useEffect(() => {
    if (productId !== undefined) {
      fetchProductDetails(productId, setCategories);
    }
  }, [productId]);

  function handleScrollToFirstCat() {
    parentRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  useEffect(() => {
    handleScrollToFirstCat();
  }, [categoryList]);

  // category**********************************

  const SignupSchema = Yup.object().shape({
    meta_keyword: Yup.array()
      .min(1, "Please enter at least one keyword")
      .max(80, "Maximum 80 words allowed !")
      .required("Please enter at least one keyword"),
  });
  let percentageValueCal: number = percentage
    .map((v) => v.value)
    .reduce((a, b) => a + b);

  const percentageValue: any = Math.round(percentageValueCal);
  const descriptionFormik = useFormik({
    validationSchema: SignupSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      meta_keyword: productDetail?.meta_keyword
        ? getUniqueListBy([
          // ...productDetail?.meta_keyword?.split(",").filter((v) => v)?.map(value => value.toLowerCase()),
          ...meta_data
            ?.split(",")
            .filter((v) => v)
            ?.map((value) => value.toLowerCase()),
        ])
        : getUniqueListBy([
          ...meta_data
            ?.split(",")
            .filter((v) => v)
            ?.map((value) => value.toLowerCase()),
        ]),
    },
    onSubmit: async (values: any) => {
      setPublished("");
      let formData = new FormData();
      formData.append("published", "0");
      formData.append("percentage", percentageValue);
      formData.append("last_update", "Product Category");
      formData.append("id", productId);
      formData.append("category_id", category_lists?.[0]?.id);
      formData.append(
        "category_lists",
        category_lists?.map((element) => element?.id).join(",")
      );
      // formData.append("meta_keyword", values.meta_keyword);
      setButtonLoader(true);
      let response = await apiClient(
        "product/view/single/update",
        "post",
        { body: formData },
        true
      );
      if (response.status === 200) {
        FetchProductDetail();
        // fetchSpecificationData(category_lists);
        setAccordianValue("description");
        setDescriptionBlock({ disable: false, expanded: true });
        setCompletedFields((prev) => ({ ...prev, category: true }));
      }
      setButtonLoader(false);
    },
  });

  const getCategoryList = async (parentId = 0, level = 0, type = "new") => {
    let response = await apiClient("categoryList", "post", {
      body: { parent: parentId, user_id: Auth?.userData()?.id },
    });
    if (response.status) {
      if (type === "update") {
        let index = cloneCategoryList.findIndex((v) => v.level === level);
        let list = [...cloneCategoryList];
        if (index >= 0) {
          list[index] = { level, data: response.data };
        } else {
          list[level - 1] = { level, data: response.data };
        }
        setCategoryList([...list]);
        setCloneCategoryList([...list]);
        let selectedValue = response.data.find(
          (v) => v.name === newCategory[level - 1]
        );
        SelectedOptionHandler(
          selectedValue.id,
          level,
          selectedValue.name,
          "update",
          selectedValue?.parent_id
        );
        setNewCategory([]);
        return;
      } else {
        let listExist = cloneCategoryList.filter((v) => v.level <= level);
        let updateList = [
          ...listExist,
          { level: level + 1, data: response.data },
        ];
        setCategoryList(updateList);
        setCloneCategoryList(updateList);
      }
      return response;
    }
  };

  useEffect(() => {
    (async () => {
      if (category_lists?.length <= 0) {
        await getCategoryList();
        if (productDetail?.category_lists?.length == 0) setLoader(false);
      }
    })();

    (async () => {
      if (category_lists?.length == 0) {
        return;
      }
      let category_id = category_lists?.map((ele) => ele?.id);
      if (category_id?.length > 0) {
        let formData = new FormData();
        formData.append("category_id", category_id?.join(","));
        let response = await apiClient(
          "product/suggested/by_category ",
          "post",
          {
            body: formData,
          },
          true
        );
        dispatch(setCategoryMetaData(response?.meta));
      }
    })();
  }, [category_lists]);



  useEffect(() => {
    if (isMount && category_lists?.length <= 0) {
      setIsMount(false);
      setCompletedFields((prev) => ({ ...prev, category: false }));
    }
  }, [isMount, category_lists]);

  useEffect(() => {
    (async () => {
      if (count < productDetail?.category_lists?.length) {
        if (category_lists.length > 0) {
          setDescriptionBlock({ disable: false, expanded: true });
          FetchMultipleData(category_lists);
        } else {
          setDescriptionBlock({ disable: false, expanded: true });
          await getCategoryList();
          setLoader(false);
        }
      }
    })();
  }, [productDetail?.category_lists, category_lists]);

  useEffect(() => {
    if (category_lists?.length > 0 && refetchlist) {
      setDescriptionBlock({ disable: false, expanded: true });
      FetchMultipleData(category_lists);
      setRetchList(false);
    }
  }, [category_lists, refetchlist]);



  const FetchMultipleData = async (category_lists) => {
    try {
      const data = [];
      let count = 0;

      for (let i = 0; i < category_lists.length; i++) {
        count += 1;

        const response = await apiClient("categoryList", "post", {
          body: {
            parent: category_lists[i].parent_id,
            user_id: Auth?.userData()?.id,
          },
        });
        data.push({ level: i + 1, data: response.data });
      }

      const categoryData = [...data, { level: data.length + 1, data: [] }];

      setCount((prev) => prev + count);
      setCategoryList(categoryData);
      setCloneCategoryList(categoryData);
      setCompletedFields((prev) => ({ ...prev, category: true }));
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  const SelectedOptionHandler = (id, level, name, type = "new", parent_id) => {
    if (!isMount) setIsMount(true);
    let index = category_lists.findIndex(
      (v) => v.id === id && v.level === level
    );
    if (index >= 0) {
      let filterValue = category_lists.filter((v) => v.level < level);
      setCategories([...filterValue, { id, level, name, parent_id }]);
      if (type === "update") {
        setCategoryList((prev) => {
          let parent = prev.filter((v) => v.level <= level);
          let child = { level: level + 1, data: [] };
          return [...parent, child];
        });
      } else {
        setCategoryList((prev) => prev.filter((v) => v.level <= level));
      }
      setCloneCategoryList((prev) => prev.filter((v) => v.level <= level));
    }
    if (index < 0) {
      let filterValue = category_lists.filter((v) => v.level < level);
      if (type === "update") {
        setCategoryList((prev) => {
          let parent = prev.filter((v) => v.level <= level);
          let child = { level: level + 1, data: [] };
          return [...parent, child];
        });
      } else {
        setCategoryList((prev) => prev.filter((v) => v.level <= level));
      }
      if (filterValue.length === 0) {
        setCategories([{ id, level, name, parent_id }]);
      } else {
        setCategories([...filterValue, { id, level, name, parent_id }]);
      }
    }
  };

  const SelectedStyle = (level, id) => {
    let style = category_lists?.filter(
      (v, i) => i + 1 === level && v.id === id
    );

    if (style?.length > 0) return true;
    if (style?.length === 0) return false;
  };
  
  const [isDisabled, setIsDisabled] = useState(false);
  const CreateNewCategory = async (id, index, level) => {
    let name = newCategory[index];
    let error = [...CategoryErrorText];
    let parent_id = id;
    if (name === "" || name === undefined) {
      error[index] = `Please enter ${level > 2 ? "sub" : "parent"
        } category name`;
      setCategoryErrorText(error);
      return;
    }

    setIsDisabled(true);
    let response = await apiClient("category/create", "post", {
      body: {
        parent_id,
        name,
        user_id: `${Auth?.userData()?.id}`,
      },
    });
    if (response.status === 200) {
      let categoryName = [...newCategory];
      categoryName[index] = "";
      setNewCategory(categoryName);
      if (index == 0) {
        setCategories([
          { id: response?.data, name: response?.name, parent_id: 0, level: 1 },
        ]);
        let filterlist = cloneCategoryList.find((c) => c.level == 1);
        let list = filterlist ? filterlist.data : [];
        let data = [
          {
            level: 1,
            data: [
              ...list,
              {
                hover_icon: response.hover_icon,
                icon: response.icon,
                id: response.data,
                name: response.name,
                parent_name: null,
              },
            ],
          },
          { level: 2, data: [] },
        ];

        setCategoryList(data);
        setCloneCategoryList(data);
        setNewCategory([]);
      } else {
        // dispatch(setNewParent(""))
        getCategoryList(id, level, "update");
      }
      // dispatch(setNewParent("new"))
      setIsDisabled(false);
      toast.success("Category created successfully");
    } else {
      if (response.message) {
        error[index] = response.message;
        setCategoryErrorText(error);
      }
      setIsDisabled(false);
    }
  };

  const NewCategoryOnChangeHandler = (value, index) => {
    SearchValues(value, index);
    let error = [...CategoryErrorText];
    let newCategoryArray = [...newCategory];
    newCategoryArray[index] = value ? value : "";
    error[index] = "";
    setCategoryErrorText(error);
    setNewCategory(newCategoryArray);
  };

  const SearchValues = (value, index) => {
    if (!value) {
      setCategoryList(cloneCategoryList);
    } else {
      let arr1 = [...cloneCategoryList];
      let data = arr1[index]?.data?.filter((val) => {
        return val.name.toLowerCase().includes(value.toLowerCase());
      });
      let state = [...categoryList];
      state[index] = { level: index + 1, data };
      setCategoryList(state);
    }
  };

  const SaveCategories = async () => {
    if (category_lists.length === 0) {
      setShowError(true);
      return;
    } else if (category_lists.length < 2) {
      setShowParentError(true);
      return;
    }
    descriptionFormik.handleSubmit();
  };

  useEffect(() => {
    if (showError && category_lists.length > 0) {
      setShowError(false);
    } else if (showParrentError && category_lists.length > 2) {
      setShowParentError(false);
    }
  }, [category_lists, showError, showParrentError]);

  useEffect(() => {
    if (productDetail?.product_type === "simple") {
      let value;
      if (category_lists?.length > 0) {
        if (category_lists[0]) {
          HandlePercentage("category_sector", 5);
          value = 5;
        }
        if (category_lists[1] || newCategory?.length > 0) {
          HandlePercentage("category_parent_category", 3.7);
          value = 15;
        }
      }
    } else if (productDetail?.product_type === "configured") {
      const { sector, parentCategory } =
        configProductScoreValues?.productCategory;

      if (category_lists?.length > 0) {
        if (category_lists[0]) {
          HandlePercentage("config_category_sector", 10.70663812);
        }

        if (category_lists[1] || newCategory?.length > 0) {
          HandlePercentage("config_category_parent_category", 7.922912206);
        }
      }
    }
  }, [newCategory, category_lists, productDetail]);

  return (
    <ProductCategoryContainer className={poststyle.product_catgory}>
      <>
        {category_lists?.length > 0 && (
          <CategorySelector>
            <RightContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  flexWrap: "wrap",
                  "@media screen and (max-width:600px)": {
                    gap: "0px",
                  },
                }}
              >
                {category_lists?.map((element, index) => (
                  <>
                    <CategoryContainerSmall
                      key={element?.id || index}
                      sx={{
                        "&:first-child": {
                          color: "#d7282f",
                        },
                      }}
                    >
                      {element?.name
                        .split(" ")
                        .map(
                          (w) =>
                            w.substring(0, 1).toUpperCase() + w.substring(1)
                        )
                        .join(" ")}
                    </CategoryContainerSmall>
                    {category_lists?.length - 1 != index && (
                      <BreadcrumbArrow>
                        <i className="icon-arrowRight"></i>
                      </BreadcrumbArrow>
                    )}
                  </>
                ))}
              </Box>
            </RightContent>
          </CategorySelector>
        )}
        {categoryList?.length == 0 ? (
          <ProductSkeleton />
        ) : (
          <>
            {" "}
            <CategoriesOuterContainer>
              <>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <CategoriesInnerLeftContainer>
                    {categoryList.map((elem, parentIndex) => {
                      if (elem.level === 1 && parentIndex === 0) {
                        return (
                          <CategoriesListInnerContainer
                            key={parentIndex}
                            sx={{
                              height: "308px",
                              minWidth: "252px",
                              border: "1px solid #dd9191 ",
                              borderRadius: "6px",
                              overflowY: "auto",
                              paddingTop: "5px",
                              paddingLeft: "5px",
                              paddingRight: "5px",
                              "&::-webkit-scrollbar": {
                                width: "0.4em",
                              },
                              "&::-webkit-scrollbar-track": {
                                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                                webkitBoxShadow:
                                  "inset 0 0 6px rgba(0,0,0,0.00)",
                                borderRadius: "6px",
                              },
                              "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "rgba(0,0,0,.1)",
                                borderRadius: "6px",
                              },
                            }}
                          >
                            {/**
                             * working of this code is to search or add the category to list.
                             * commented this section because in story as additional point it is mentioned that riht now we dont need search bar if in the future it is needed just uncomment this code
                             * story no. for reference: PCLRP-1152
                             */}
                            {/* <CategoryHeader sx={{ marginBottom: "8px" }}>
                              <TextField
                                classes={{ root: classes.customTextField }}
                                size="small"
                                placeholder={
                                  elem?.level === 1
                                    ? `Search Sectors`
                                    : "Add Sub Category"
                                }
                                onChange={(e) => {
                                  NewCategoryOnChangeHandler(e.target.value, 0);
                                }}
                                // onKeyDown={(e) =>
                                //   e.key === "Enter"
                                //     ? CreateNewCategory(0, 0, 1)
                                //     : null
                                // }
                                value={newCategory[0] ? newCategory[0] : ""}
                                error={CategoryErrorText[0] ? true : false}
                                helperText={CategoryErrorText?.[0] ?? ""}
                                // InputProps={{
                                //   endAdornment: (
                                //     <InputAdornment position="end">
                                //       <CategoryHeaderButton
                                //         onClick={() => {
                                //           CreateNewCategory(0, 0, 1);
                                //         }}
                                //       >
                                //         <AddIcon />
                                //       </CategoryHeaderButton>
                                //     </InputAdornment>
                                //   ),
                                // }}
                              ></TextField>
                            </CategoryHeader> */}
                            <CategoryList sx={{}}>
                              {getUniqueListBy(elem?.data, "name")?.map(
                                (element: any, index) => {
                                  return (
                                    element?.name && (
                                      // <LightTooltip
                                      //   title={element?.name}
                                      //   placement="top"
                                      //   key={index}
                                      //   arrow
                                      //   disableInteractive
                                      //   sx={{
                                      //     "& .MuiTooltip-tooltip": {
                                      //       textTransform: "capitalize",
                                      //     },
                                      //   }}
                                      // >
                                      <CategoryListItem
                                        style={{
                                          background: SelectedStyle(
                                            elem.level,
                                            element.id
                                          )
                                            ? "#FFECEC"
                                            : "transparent",
                                          color: SelectedStyle(
                                            elem.level,
                                            element.id
                                          )
                                            ? "#231f20"
                                            : "#7B7979",
                                        }}
                                        className={`${SelectedStyle(
                                          elem.level,
                                          element.id
                                        )
                                            ? elem?.parentId == 0
                                              ? "selected-list-parent"
                                              : "selected-list-children"
                                            : ""
                                          }`}
                                        key={index}
                                        onClick={(e) => {
                                          setNewCategory([]);
                                          setCategoryErrorText([]);
                                          e.preventDefault();
                                          e.stopPropagation();
                                          // HandlePercentage("category", 3);
                                          getCategoryList(
                                            element.id,
                                            elem.level
                                          );
                                          SelectedOptionHandler(
                                            element.id,
                                            elem.level,
                                            element?.name,
                                            "new",
                                            element?.parent_id
                                          );
                                          // if (
                                          //   !SelectedStyle(
                                          //     elem.level,
                                          //     element.id
                                          //   )
                                          // ) {
                                          // SelectedOptionHandler(
                                          //   element.id,
                                          //   elem.level,
                                          //   element?.name,
                                          //   "new",
                                          //   element?.parent_id
                                          // );
                                          // }
                                        }}
                                      >
                                        <Box
                                          component="div"
                                          display="flex"
                                          alignItems="center"
                                          gap={1}
                                        >
                                          <Image
                                            src={element.icon}
                                            height={18}
                                            width={18}
                                            alt="Category"
                                          />

                                          <CategoryName title={element?.name}>
                                            {element?.name}
                                          </CategoryName>
                                        </Box>
                                      </CategoryListItem>
                                      // </LightTooltip>
                                    )
                                  );
                                }
                              )}
                            </CategoryList>
                          </CategoriesListInnerContainer>
                        );
                      }
                    })}
                  </CategoriesInnerLeftContainer>
                  <CategoriesListOuterRightContainer>
                    {categoryList.map((elem, childIndex) => {
                      if (elem.level > 1) {
                        return (
                          <CategoriesListInnerContainer
                            key={childIndex}
                            sx={{
                              minWidth: "252px",
                              height: "308px",
                              border: "1px solid #ABAAAA",
                              borderRadius: "6px",
                              overflowY: "auto",
                              paddingTop: "5px",
                              paddingLeft: "5px",
                              paddingRight: "5px",
                              "&::-webkit-scrollbar": {
                                width: "0.4em",
                              },
                              "&::-webkit-scrollbar-track": {
                                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                                webkitBoxShadow:
                                  "inset 0 0 6px rgba(0,0,0,0.00)",
                                borderRadius: "6px",
                              },
                              "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "rgba(0,0,0,.1)",
                                borderRadius: "6px",
                              },
                            }}
                          >
                            <CategoryHeader sx={{ marginBottom: "8px" }}>
                              <TextField
                                disabled={isDisabled}
                                classes={{ root: classes.customTextField }}
                                size="small"
                                placeholder={
                                  elem?.level === 2
                                    ? `Add Parent Category`
                                    : "Add Sub Category"
                                }
                                onChange={(e) => {
                                  let value = e.target.value;
                                  const invalidChars = /[^a-zA-Z0-9 _-]/g;
                                  value = value.replace(invalidChars, "");
                                  if (e?.target?.value.length > 60) {
                                    return;
                                  } else {
                                    NewCategoryOnChangeHandler(
                                      value,
                                      childIndex
                                    );
                                  }
                                }}
                                onKeyDown={(e) =>
                                  e.key === "Enter"
                                    ? CreateNewCategory(
                                      category_lists[childIndex - 1].id,
                                      childIndex,
                                      elem.level
                                    )
                                    : null
                                }
                                value={newCategory[elem.level - 1]}
                                error={
                                  CategoryErrorText[elem.level - 1]
                                    ? true
                                    : false
                                }
                                helperText={
                                  CategoryErrorText?.[elem.level - 1] ?? ""
                                }
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <CategoryHeaderButton
                                        onClick={() => {
                                          if(isDisabled){
                                            return;
                                          }
                                          let id =
                                            category_lists[childIndex - 1].id;
                                          CreateNewCategory(
                                            id,
                                            childIndex,
                                            elem.level
                                          );
                                        }}
                                      >
                                        <AddIcon />
                                      </CategoryHeaderButton>
                                    </InputAdornment>
                                  ),
                                }}
                              ></TextField>
                            </CategoryHeader>
                            <CategoryList>
                              {getUniqueListBy(elem?.data, "name")?.map(
                                (element: any, index) => {
                                  return (
                                    element?.name && (
                                      // <LightTooltip
                                      //   arrow
                                      //   title={element?.name}
                                      //   placement="top"
                                      //   key={index}
                                      //   disableInteractive
                                      //   sx={{
                                      //     "& .MuiTooltip-tooltip": {
                                      //       textTransform: "capitalize",
                                      //     },
                                      //   }}
                                      // >
                                      <CategoryListItem
                                        style={{
                                          background: SelectedStyle(
                                            elem.level,
                                            element.id
                                          )
                                            ? "#FFECEC"
                                            : "transparent",
                                          color: SelectedStyle(
                                            elem.level,
                                            element.id
                                          )
                                            ? "#231f20"
                                            : "#7B7979",
                                        }}
                                        ref={
                                          SelectedStyle(
                                            elem.level,
                                            element.id
                                          )
                                            ? parentRef
                                            : null
                                        }
                                        className={`${SelectedStyle(
                                          elem.level,
                                          element.id
                                        )
                                            ? elem?.parentId == 0
                                              ? "selected-list-parent"
                                              : "selected-list-children"
                                            : ""
                                          }`}
                                        key={index}
                                        onClick={(e) => {
                                          setNewCategory([]);
                                          setCategoryErrorText([]);
                                          e.preventDefault();
                                          e.stopPropagation();

                                          getCategoryList(
                                            element?.id,
                                            elem?.level
                                          );

                                          SelectedOptionHandler(
                                            element.id,
                                            elem.level,
                                            element?.name,
                                            "new",
                                            element?.parent_id
                                          );

                                          // if (
                                          //   !SelectedStyle(
                                          //     elem.level,
                                          //     element.id
                                          //   )
                                          // ) {
                                          //   SelectedOptionHandler(
                                          //     element.id,
                                          //     elem.level,
                                          //     element?.name,
                                          //     "new",
                                          //     element?.parent_id
                                          //   );
                                          // }
                                          // if (
                                          //   SelectedStyle(elem.level, element.id)
                                          // ) {
                                          //   setCategories((prev) =>
                                          //     prev.filter(
                                          //       (v) => v.level < elem.level
                                          //     )
                                          //   );
                                          //   setCategoryList((prev) =>
                                          //     prev.filter(
                                          //       (v) => v.level <= elem.level
                                          //     )
                                          //   );
                                          // }
                                        }}
                                      >
                                        <Box
                                          component="div"
                                          display="flex"
                                          alignItems="center"
                                          gap={1}
                                        >
                                          {elem?.level == 2 && (
                                            <Image
                                              src={
                                                element.icon
                                                  ? element.icon
                                                  : ""
                                              }
                                              height={18}
                                              width={18}
                                              alt="Category"
                                            />
                                          )}
                                          <CategoryName title={element?.name}>
                                            <span>{element?.name}{" "}</span>
                                            {userId &&
                                              element?.approval_status !==
                                              null &&
                                              // userId === element?.user_id &&
                                              (() => {
                                                switch (
                                                element?.approval_status
                                                ) {
                                                  case 0:
                                                    return <PendingCategory><CancelRoundedIcon titleAccess="Unapproved" /></PendingCategory>;
                                                  case 1:
                                                    return <ApprovedCategory><CheckCircleRoundedIcon titleAccess="Approved" /></ApprovedCategory>;
                                                  case 2:
                                                    return <RejectedCategory>(Rejected)</RejectedCategory>;
                                                  case 3:
                                                    return <PendingCategory><CancelRoundedIcon titleAccess="Unapproved" /></PendingCategory>;
                                                  default:
                                                    return null;
                                                }
                                              })()}
                                          </CategoryName>
                                        </Box>
                                      </CategoryListItem>
                                      // </LightTooltip>
                                    )
                                  );
                                }
                              )}
                            </CategoryList>
                          </CategoriesListInnerContainer>
                        );
                      }
                    })}
                  </CategoriesListOuterRightContainer>
                </Box>
                {categoryList.length != 0 && categoryList.length < 3 && (
                  <div className={poststyle.category_txt}>
                    {showError ? (
                      <div>
                        <WarningAmberOutlinedIcon
                          style={{ color: "#D7282F", fontSize: "46px" }}
                        />
                        <p style={{ color: "#D7282F" }}>
                          Please select at least one Category
                        </p>
                      </div>
                    ) : showParrentError ? (
                      <div>
                        <WarningAmberOutlinedIcon
                          style={{ color: "#D7282F", fontSize: "46px" }}
                        />
                        <p style={{ color: "#D7282F" }}>
                          Please select Parent Category
                        </p>
                      </div>
                    ) : (
                      <p>Choose the best category for your product.</p>
                    )}
                  </div>
                )}
              </>
            </CategoriesOuterContainer>
            <FormControl sx={{ width: "100%" }} className={poststyle.input_box}>
              {/* <AddMetaKeyboard
                formik={descriptionFormik}
                HandlePercentage={HandlePercentage}
              /> */}
            </FormControl>{" "}
          </>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8.5} lg={9.5}>
            <RightSectorCategory>
              <Typography variant="body1">
                Please select the right SECTOR and CATEGORY for your product.
              </Typography>
              <Typography variant="body2">
                By accurately categorizing your product, you increase its
                visibility to potential customers, improve your search engine
                ranking, and enhance the overall performance of your product.
                It's all about putting your product in front of the right people
                and helping them find it easily.
              </Typography>
            </RightSectorCategory>
          </Grid>
          <Grid item xs={12} sm={12} md={3.5} lg={2.5}>
            <ButtonCol>
              <Button
                color="error"
                variant="outlined"
                size="small"
                style={{
                  textTransform: "none",
                  minWidth: "90px",
                  height: "30.75px",
                }}
                onClick={SaveCategories}
              >
                {buttonLoader ? (
                  <ThreeDots
                    height="14"
                    width="90"
                    radius="7"
                    color="#d32f2f"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                ) : (
                  " Save & Continue"
                )}
                <ArrowForwardIosIcon
                  style={{ fontSize: "15px", marginLeft: "4px" }}
                ></ArrowForwardIosIcon>
              </Button>
            </ButtonCol>
          </Grid>
        </Grid>
      </>
      {/* )} */}
    </ProductCategoryContainer>
  );
};
