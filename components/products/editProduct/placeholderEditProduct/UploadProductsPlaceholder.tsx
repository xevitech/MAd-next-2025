import React, { useState, useRef, useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { Box, Grid, Button, TextField, Typography } from "@mui/material";

import poststyle from "components/products/editProduct/style.module.css";
import { ThreeDots } from "react-loader-spinner";
// import useProductContext from "@/hooks/useProductContext";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import {
  apiClient,
  configProductScoreValues,
  convertSize,
  getUniqueListBy,
  productScoreValues,
} from "@/components/common/common";
import CheckIcon from "@mui/icons-material/Check";

import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import AttachmentsView from "@/components/ProductDetail/ProductComponents/Modal/NewQueryModal/AttachmentsView";
import { useRouter } from "next/router";
import CommonErrorMessage from "@/components/common/CommonErrorMessage";
import * as Yup from "yup";
import axios from "axios";
import { BASE_URL } from "@/utils/staticValues";
import { useDispatch } from "react-redux";
import { setProductDetail } from "@/hooks/ProductReducers";
import Auth from "@/auth/Auth";
import {
  DragDropContainer,
  ImageBoxup,
  ProductImageContainerup,
  UploadImages,
} from "@/components/common/dropZone/style";
import {
  ImagesBox,
  ImgContainer,
  RedStripBox,
  RedStripBoxLabel,
  UploadOuterDiv,
} from "../rightStaticContent/UploadProducts/styles";
import { ButtonCol } from "../productCategories/styles";
import DropZone from "../rightStaticContent/UploadProducts/DropZone";

const UploadProductsPlaceholder = ({
  setSmartBlock,
  setCompletedFields,
  setAccordianValue,
  productDetail,
  setPublished,
  HandlePercentage,
  percentage,
}) => {
  const query: any = useRouter();
  const productId: string = query.query.Id;

  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [isMount, setIsMount] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const inputRef: any = useRef("");
  const dispatch = useDispatch();
  const videoUrlsRef = useRef<Record<string, string>>({});

  const validation = Yup.object().shape({
    ad_type: Yup.string().required("Please enter value."),
  });

  const localFormik = useFormik({
    initialValues: {
      product_images: [],
      delete_image_id: [],
      product_vidoes: [],
      delete_videos_id: [],
    },
    validationSchema: validation,
    onSubmit: () => {},
  });
  const { product_images, delete_image_id, product_vidoes, delete_videos_id } =
    localFormik.values;
  // useEffect(() => {
  //   if (productDetail?.photos?.length > 0) {
  //     localFormik.setFieldValue("alt_text", productDetail?.photos[0]?.alt_tag);
  //     return;
  //   }
  // }, [productDetail]);

  /********************************NEW****************************************/
  const [isDeleted, setIsDeleted] = useState<boolean>(true);
  const [defaultImage, setDefaultImage] = useState<boolean>(false);
  const [featuredImageIndex, setFeatureImageIndex] = useState<number>(-1);

  useEffect(() => {
    const { photos } = productDetail;

    if (photos?.length > 0 && !isMount) {
      setSmartBlock({ disable: false, expanded: true });
      setCompletedFields((prev) => ({ ...prev, images: true }));
      if (product_type === "simple") {
        HandlePercentage("product_images_upload", 4);
        HandlePercentage("product_images_featured", 4);
      } else if (product_type === "configured") {
        HandlePercentage("config_product_images_upload", 4.282655246);
        HandlePercentage("config_product_images_featured", 4.282655246);
      }
      setIsMount(true);
    } else {
      const isFeatured = product_images?.filter((image) => image?.is_featured);

      if (photos?.length > 0) {
        setCompletedFields((prev) => ({ ...prev, images: true }));
      } else {
        setCompletedFields((prev) => ({ ...prev, images: false }));
      }
      setSmartBlock({ disable: true, expanded: false });
      setIsMount(false);
    }
  }, [productDetail]);

  // const percentageValue: any = Math.round(percentageValueCal);
  useEffect(() => {
    const { photos } = productDetail;
    if (photos?.length > 0 && !isMount) {
      setIsMount(true);
      setSmartBlock({ disable: false, expanded: true });
      return;
    }
  }, [isMount, productDetail]);

  const FeatureImageToggle = (index, toggle) => {
    // if (product_type == "simple") {
    //   HandlePercentage("config_product_images_featured", 0);
    //   HandlePercentage("config_product_images_upload", 0);
    //   if (toggle) {
    //     setFeatureImageIndex(-1);
    //     // HandlePercentage("product_images_upload", 0);
    //     HandlePercentage("product_images_featured", 0);
    //     HandlePercentage("product_images_upload", 0);
    //   } else {
    //     // inputRef.current.focus();
    //     setFeatureImageIndex(index);
    //     HandlePercentage("product_images_featured", 3);
    //     HandlePercentage("product_images_upload", 3);
    //   }
    // } else if(product_type === "configured"){
    //   HandlePercentage("product_images_featured", 0);
    //   HandlePercentage("product_images_upload", 0);
    //   if (toggle) {
    //     setFeatureImageIndex(-1);
    //     // HandlePercentage("product_images_upload", 0);
    //     HandlePercentage("config_product_images_featured", 0);
    //     HandlePercentage("config_product_images_upload", 0);
    //   } else {
    //     // inputRef.current.focus();
    //     setFeatureImageIndex(index);
    //     HandlePercentage("config_product_images_featured", 4.282655246);
    //     HandlePercentage("config_product_images_upload", 4.282655246);
    //   }
    // }

    let featureImage = [...product_images];
    featureImage.splice(index, 1);
    let restImageList = [...featureImage].map((v) => ({
      ...v,
      is_featured: false,
    }));
    restImageList.splice(index, 0, {
      ...product_images[index],
      is_featured: !toggle,
    });
    localFormik.setFieldValue("product_images", restImageList);
  };

  const onDropVideo = (acceptedFiles: any, rejectedFiles: any) => {
    if (acceptedFiles[0]?.type !== "video/mp4") {
      toast.error("Only MP4 files are allowed.");
      return;
    }

    if (acceptedFiles[0]?.type == "video/mp4") {
      if (convertSize(acceptedFiles[0]?.size, "MB") > 20) {
        toast.error("File size exceeds 20MB. Please upload a smaller file.");
        return;
      }
      const uploadLimit = acceptedFiles.length + product_vidoes?.length;
      if (uploadLimit > 1) {
        toast.error("Maximum upload limit is one video.");
        return;
      }
      if (product_vidoes?.length == 0) {
        localFormik.setFieldValue("product_vidoes", [
          ...acceptedFiles.map((file) => {
            return file;
          }),
        ]);
      }
      return;
    }
  };

  const onDrop = async (acceptedFiles: any, rejectedFiles: any) => {
    const totalImages =
      localFormik.values.product_images.length + acceptedFiles.length;
    if (totalImages > 6) {
      toast.error("Maximum upload limit is six images.");
      return;
    }
    // if (acceptedFiles.length === 0) {
    //   toast.error("Only JPG,GIF and PNG files are allowed.");
    //   return;
    // }
    const acceptedFormats = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg",
    ];
    const filteredFiles = acceptedFiles.filter((file) => {
      return acceptedFormats.includes(file.type);
    });

    if (filteredFiles.length !== acceptedFiles.length) {
      toast.error("Only JPG, JPEG, GIF and PNG files are allowed.");
      return;
    }

    if (filteredFiles[0]?.size > 3145728) {
      toast.error("File size exceeds 3MB. Please upload a smaller file.");
      return;
    }

    if (filteredFiles[0]?.size <= 0) {
      toast.error("This Image is corrupted");
      return;
    }

    if (product_images?.length == 0) {
      localFormik.setFieldValue("product_images", [
        ...filteredFiles.map((v) => ({
          src: v,
          is_featured: false,
          alt_tag: "",
        })),
      ]);
    }

    const toCheckImage = product_images.filter((item, idx) => {
      return typeof item.src === "object"
        ? item.src.name === acceptedFiles[0].name
        : item.file_original_name === acceptedFiles[0].name;
    });

    if (toCheckImage.length < 1) {
      localFormik.setFieldValue("product_images", [
        ...product_images,
        ...filteredFiles.map((v) => ({
          src: v,
          is_featured: false,
          alt_tag: "",
        })),
      ]);
    } else {
      toast.error("Duplicate Images not allowed");
    }
  };

  const deleteImage = (index: number, id: any) => {
    let image_list = [...product_images];
    if (image_list[index]?.id) {
      image_list.splice(index, 1);
      let ids = [...delete_image_id, id];
      localFormik.setFieldValue("delete_image_id", getUniqueListBy(ids));
      localFormik.setFieldValue("product_images", image_list);
    } else {
      image_list.splice(index, 1);
      localFormik.setFieldValue("product_images", image_list);
    }
  };

  const deleteVideo = (index: number, id: any) => {
    let video_list = [...product_vidoes];
    if (video_list[index]?.id) {
      video_list.splice(index, 1);
      let ids = [...delete_videos_id, id];
      localFormik.setFieldValue("delete_videos_id", getUniqueListBy(ids));
      localFormik.setFieldValue("product_vidoes", video_list);
    } else {
      video_list.splice(index, 1);
      localFormik.setFieldValue("product_vidoes", video_list);
    }
  };

  const FetchProductDetail = async () => {
    let formData = new FormData();
    formData.append("id", productId);
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
      // setLoader(false);
      // setPublished(data.data[0]?.published);
      // setIsPlaceholder(data.data[0]?.is_placeholder);
      // setCategories(
      //   data?.data[0]?.category_lists.map((v, i) => ({
      //     ...v,
      //     level: i + 1,
      //   }))
      // );
      // formik.setFieldValue("availability", data?.data[0]?.availability ?? "");
    }
  };

  const SelectedFeaturedImage = product_images.find(
    (v) => v.is_featured == "1"
  );
  const altTags = product_images.find((v) => v.alt_tag && v.is_featured == "1");

  const HandleSaveImageAndVideo = async () => {
    setPublished("");
    const formDataVideo = new FormData();
    formDataVideo.append("published", "0");
    if (product_images?.length == 0) {
      setShowError(true);
      return;
    }
    if (!SelectedFeaturedImage) {
      toast.error("Please select featured image");
      return;
    }
    if (!altTags) {
      toast.error("Alt text is required for featured image.");
      return;
    }
    // const missingAltTag = product_images.some(
    //   (image) => !image.alt_tag || image.alt_tag.trim() === ""
    // );
    // if (missingAltTag) {
    //   toast.error("Please enter alt text for all images");
    //   return;
    // }
    // for (let image of product_images) {
    //   if (!image.alt_tag || image.alt_tag.trim() === "") {
    //     toast.error("Please enter alt text for all images");
    //     return;
    //   }
    // }

    setButtonLoader(true);

    if (delete_videos_id.length > 0) {
      formDataVideo.append("product_id", productId);
      formDataVideo.append("image_ids", delete_videos_id.join(","));
      formDataVideo.append("remove_all", "bulk");
      let response = await apiClient(
        "product/gallery/video/upload",
        "post",
        { body: formDataVideo },
        true
      );
      // if (response.status == 200) {
      //   setButtonLoader(false);
      //   setAccordianValue("smart_editing");
      //   setCompletedFields((prev) => ({ ...prev, images: true }));
      //   setSmartBlock({ disable: false, expanded: true });
      // }
    }
    if (product_vidoes.length > 0) {
      let allNewVideos = product_vidoes.filter((v) => !v.id);
      if (allNewVideos.length > 0) {
        formDataVideo.append("product_id", productId);
        // if (delete_videos_id.length > 0) {
        //   formData.append("image_ids", delete_videos_id.join(","));
        //   formData.append("remove_all", "bulk");
        // }
        if (allNewVideos.length > 0) {
          for (let i = 0; i < allNewVideos.length; i++) {
            if (allNewVideos[i]) {
              formDataVideo.append("images[]", allNewVideos[i]);
            }
          }
        }
      }

      if (allNewVideos.length > 0) {
        let response = await apiClient(
          "product/gallery/video/upload",
          "post",
          { body: formDataVideo },
          true
        );
        if (response.status == 200 && !showError) {
          // setButtonLoader(false);
          // setAccordianValue("smart_editing");
          // setCompletedFields((prev) => ({ ...prev, images: true }));
          // setSmartBlock({ disable: false, expanded: true });
        }
      }
    }
    const formDataImage = new FormData();
    formDataImage.append("published", "0");
    let allNewImages = product_images.filter((v) => !v.id);
    let allOldImages = product_images.filter((v) => v.id);
    // if (delete_image_id.length == 0 && allNewImages.length == 0) {
    //   setAccordianValue("smart_editing");
    //   setButtonLoader(false);
    //   return;
    // }
    if (allNewImages.length > 0) {
      let featured = allNewImages.map((v) => (v.is_featured ? "1" : "0"));
      formDataImage.append("last_update", "Product Images");
      formDataImage.append("product_id", productId);
      // formDataImage.append("percentage", percentageValue);
      // formData.append("alt", alt_text);
      if (featured.length > 0) {
        formDataImage.append("is_featured", featured.toString());
      }
      if (delete_image_id.length > 0) {
        formDataImage.append("image_ids", delete_image_id.join(","));
        formDataImage.append("remove_all", "bulk");
      }
      const altTags = allNewImages.map((file) => file?.alt_tag?.trim());
      if (allNewImages.length > 0) {
        for (let i = 0; i < allNewImages.length; i++) {
          if (allNewImages[i]?.src) {
            formDataImage.append("images[]", allNewImages[i]?.src);
          }
        }
        formDataImage.append("alt", altTags.join(","));
      }
    }
    if (allNewImages.length == 0 && delete_image_id.length > 0) {
      formDataImage.append("last_update", "Product Images");

      // formDataImage.append("percentage", percentageValue);
      formDataImage.append("product_id", productId);
      formDataImage.append("image_ids", delete_image_id.join(","));
      formDataImage.append("remove_all", "bulk");
    }

    if (delete_image_id.length > 0 || allNewImages.length > 0) {
      let response = await apiClient(
        "product/gallery/upload",
        "post",
        { body: formDataImage },
        true
      );

      if (response.status == 200 || response.status == true) {
        // setButtonLoader(false);
        // setAccordianValue("smart_editing");
        // setCompletedFields((prev) => ({ ...prev, images: true }));
        // setSmartBlock({ disable: false, expanded: true });
        // localFormik.setFieldValue("product_images", response?.files);
      }
    }

    if (allOldImages.length > 0) {
      await apiClient("product/gallery/update", "post", {
        body: {
          published: "0",
          last_update: "Product Images",
          product_id: productId,
          // percentage: percentageValue,
          gallery: allOldImages.map((v) => ({
            ...v,
            alt: v.alt_tag,
            id: v.id,
            is_featured: v.is_featured == "1" ? "1" : "0",
          })),
        },
      });
      // setAccordianValue("smart_editing");
      // setButtonLoader(false);
      // setCompletedFields((prev) => ({ ...prev, images: true }));
      // setSmartBlock({ disable: false, expanded: true });
    }
    await FetchProductDetail();
    setAccordianValue("smart_editing");
    setCompletedFields((prev) => ({ ...prev, images: true }));
    setSmartBlock({ disable: false, expanded: true });
    setButtonLoader(false);
  };

  useEffect(() => {
    setButtonLoader(false);
    setCompletedFields((prev) => ({ ...prev, images: true }));
    setSmartBlock({ disable: false, expanded: true });
  }, []);
  useEffect(() => {
    if (
      product_images.length === 0 &&
      productDetail?.photos?.length > 0 &&
      !defaultImage
    ) {
      let index = productDetail?.photos?.findIndex((v) => v.is_featured == "1");
      let defaultImage = productDetail?.photos?.map((v) => ({
        ...v,
        src: v.source,
        alt_tag: v.alt_tag,
        is_featured: v.is_featured == "1" ? "1" : "0",
      }));
      localFormik.setFieldValue("product_images", defaultImage);
      // if (productDetail?.video?.length > 0) {
      //   localFormik.setFieldValue("product_vidoes", productDetail?.video);
      // }

      if (inputRef.current) {
        inputRef.current.focus();
      }
      setFeatureImageIndex(index);
      setDefaultImage(true);
    }
  }, [productDetail?.product_images, productDetail?.video]);

  useEffect(() => {
    if (productDetail?.video?.length > 0) {
      localFormik.setFieldValue("product_vidoes", productDetail?.video);
    }

    if (productDetail?.photos?.length > 0) {
      let index = productDetail?.photos?.findIndex((v) => v.is_featured == "1");
      let defaultImage = productDetail?.photos?.map((v) => ({
        ...v,
        src: v.source,
        alt_tag: v.alt_tag,
        is_featured: v.is_featured == "1" ? "1" : "0",
      }));
      localFormik.setFieldValue("product_images", defaultImage);

      if (inputRef.current) {
        inputRef.current.focus();
      }
      setFeatureImageIndex(index);
      setDefaultImage(true);
    }
  }, [productDetail]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    let item = reorder(
      product_images,
      result.source.index,
      result.destination.index
    );

    localFormik.setFieldValue("product_images", item);
  };
  const grid = 8;

  const getListStyle = (isDraggingOver, itemsLength) => ({
    display: "flex",
    padding: grid,
    width: itemsLength * 68.44 + 16,
  });

  const product_type = productDetail?.product_type;

  useEffect(() => {
    if (product_type === "simple") {
      //clearing config data
      // HandlePercentage("config_product_images_upload", 0);
      // HandlePercentage("config_product_images_featured", 0);
      //--------------end here-------------------
      const { browseUploadImage, featuredImageAltText } =
        productScoreValues?.uploadProductImages;
      // HandlePercentage(
      //   "product_images_upload",
      //   product_images?.length > 0 ? 3 : 0
      // );

      const isFeatured = product_images?.filter((image) => image?.is_featured);
      // HandlePercentage(
      //   "product_images_featured",
      //   isFeatured?.length > 0 ? 3 : 0
      // );
    } else if (product_type === "configured") {
      // const { browseUploadImage, featuredImageAltText } =
      //   configProductScoreValues?.uploadProductImages;
      // HandlePercentage(
      //   "config_product_images_upload",
      //   product_images?.length > 0 ? 4.282655246 : 0
      // );
      // const isFeatured = product_images?.filter((image) => image?.is_featured);
      // HandlePercentage(
      //   "config_product_images_featured",
      //   isFeatured?.length > 0 ? 4.282655246 : 0
      // );
    }
  }, [localFormik.values?.product_images, productDetail?.photos]);
  const handleAddTag = (value, id = null, fileName = "") => {
    const fileClone = [...product_images];
    const updatedProductImages = fileClone.map((file) => {
      if (id) {
        if (file?.id == id) {
          return { ...file, alt_tag: value };
        }
      } else {
        if (file?.src?.name == fileName) {
          return { ...file, alt_tag: value };
        }
      }
      return file;
    });
    localFormik.setFieldValue("product_images", updatedProductImages);
    localFormik.setFieldError("product_images", "");
  };
  return (
    <>
      <UploadOuterDiv>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={9}
            lg={9}
            xl={9}
            style={{ position: "relative" }}
            mt={-1}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  margin: "0 0 6px 0",
                  color: "#000",
                }}
              >
                Upload Image
              </Typography>
            </Box>
            <UploadImages component="div" width={"100%"}>
              <DragDropContainer>
                <ProductImageContainerup
                  sx={{
                    overflowX: "auto",
                    "&::-webkit-scrollbar": {
                      width: "6px",
                      height: "6px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "#f1f1f1",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#d2d2d2",
                      borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      background: "#888888",
                    },
                  }}
                >
                  {product_images?.length > 0 ? (
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="droppable" direction="horizontal">
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            style={getListStyle(
                              snapshot.isDraggingOver,
                              product_images.length
                            )}
                            {...provided.droppableProps}
                          >
                            {product_images.map((file, index) => {
                              return (
                                <>
                                  <Draggable
                                    key={`${file.id}`}
                                    draggableId={`${file.id}`}
                                    index={index}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <ImageBoxup key={index}>
                                          {isDeleted && (
                                            <LightTooltip
                                              title="Delete Image"
                                              arrow
                                              placement="top"
                                            >
                                              <Box
                                                component={"span"}
                                                onClick={() => {
                                                  deleteImage(index, file.id);
                                                }}
                                                sx={{
                                                  cursor: "pointer",
                                                  width: "24px",
                                                  position: "absolute",
                                                  top: "-10px",
                                                  right: "-10px",
                                                  zIndex: 100,
                                                  height: "24px",
                                                  borderRadius: "50px",
                                                  backgroundColor: "#ffffff",
                                                  border: "1px solid #d7282f",
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                }}
                                              >
                                                <DeleteOutlineOutlinedIcon
                                                  sx={{
                                                    color:
                                                      "##d7282f !important",
                                                    fontSize: "16px",
                                                  }}
                                                  className={
                                                    poststyle.cancel_icon
                                                  }
                                                />
                                              </Box>
                                            </LightTooltip>
                                          )}{" "}
                                          {file?.is_featured &&
                                          file?.is_featured == "1" ? (
                                            <LightTooltip
                                              title="Featured Image"
                                              arrow
                                              placement="top"
                                            >
                                              <RedStripBox>
                                                <img
                                                  src="/assets/createproduct/ribbonleftstrip.svg"
                                                  alt=""
                                                  style={{
                                                    height: "100%",
                                                    width: "100%",
                                                  }}
                                                />
                                                <RedStripBoxLabel>
                                                  Feature
                                                </RedStripBoxLabel>
                                              </RedStripBox>
                                            </LightTooltip>
                                          ) : (
                                            ""
                                          )}
                                          <ImgContainer>
                                            <ImagesBox
                                              onClick={() => {
                                                FeatureImageToggle(
                                                  index,
                                                  file.is_featured
                                                );
                                              }}
                                            >
                                              <AttachmentsView
                                                imageUrl={
                                                  file.id
                                                    ? file.file_name
                                                    : URL.createObjectURL(
                                                        file.src
                                                      )
                                                }
                                              />
                                            </ImagesBox>
                                          </ImgContainer>
                                        </ImageBoxup>
                                        <TextField
                                          inputRef={inputRef}
                                          style={{ width: "110px" }}
                                          label={"Alt Text"}
                                          name="alt_text"
                                          value={file?.alt_tag ?? ""}
                                          size="small"
                                          InputLabelProps={{ shrink: true }}
                                          onChange={(e) => {
                                            const { value } = e?.target;
                                            if (file?.id) {
                                              handleAddTag(value, file?.id, "");
                                            } else {
                                              handleAddTag(
                                                value,
                                                "",
                                                file?.src?.name
                                              );
                                            }
                                            // return;
                                            // localFormik.setFieldValue(
                                            //   "alt_text",
                                            //   value
                                            // );
                                            // localFormik.setFieldError(
                                            //   "alt_text",
                                            //   ""
                                            // );
                                          }}
                                        />
                                        {/* {localFormik.errors.alt_text && (
                                          <CommonErrorMessage
                                            SX={{ fontSize: "10px" }}
                                            message={
                                              localFormik.errors.alt_text
                                            }
                                          />
                                        )} */}
                                      </div>
                                    )}
                                  </Draggable>
                                </>
                              );
                            })}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  ) : (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          gap: "6px",
                        }}
                      >
                        {showError && (
                          <WarningAmberOutlinedIcon
                            style={{ color: showError ? "#d32f2f" : "" }}
                          />
                        )}
                        <h4
                          className={poststyle.no_upload_txt1}
                          style={{
                            color: showError ? "#d32f2f" : "",
                            fontSize: "14px",
                          }}
                        >
                          {showError && product_images.length == 0
                            ? "Please upload images"
                            : "No Images uploaded"}
                        </h4>
                      </Box>
                    </>
                  )}
                </ProductImageContainerup>
                <DropZone
                  onDrop={(e) => {
                    onDrop(e, e);
                  }}
                  // acceptType="image"
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#000",
                      fontWeight: "500",
                      textAlign: "center",
                      "@media screen and (max-width:600px)": {
                        fontSize: "12px",
                      },
                    }}
                  >
                    Please upload an image in GIF, PNG, JPEG or JPG format, and
                    ensure it is no larger than 3 MB.
                  </Typography>
                </Box>
              </DragDropContainer>
            </UploadImages>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            className="marginforresponsive"
            mt={-1}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  margin: "0 0 6px 0",
                  color: "#000",
                }}
              >
                Upload Video
              </Typography>
            </Box>
            <UploadImages>
              <DragDropContainer>
                <ProductImageContainerup>
                  {product_vidoes?.length > 0 ? (
                    product_vidoes.map((file, index) => {
                      let videoSrc;
                      if (file?.source) {
                        videoSrc = file?.source;
                      } else {
                        if (!videoUrlsRef.current[file?.name]) {
                          videoUrlsRef.current[file?.name] =
                            URL.createObjectURL(file);
                        }
                        videoSrc = videoUrlsRef.current[file?.name];
                      }
                      return (
                        <ImageBoxup
                          sx={{
                            marginBottom: "0",
                            minWidth: "100%",
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            "@media screen and (max-width:600px)": {
                              width: "90%",
                              minWidth: "90%",
                              justifyContent: "center",
                            },
                          }}
                          key={index}
                        >
                          <LightTooltip
                            title="Delete Image"
                            arrow
                            placement="top"
                          >
                            <Box
                              component={"span"}
                              sx={{
                                cursor: "pointer",
                                width: "24px",
                                position: "absolute",
                                top: "-10px",
                                right: "-10px",
                                zIndex: 100,
                                height: "24px",
                                borderRadius: "50px",
                                backgroundColor: "#ffffff",
                                border: "1px solid #d7282f",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <DeleteOutlineOutlinedIcon
                                sx={{
                                  color: "##d7282f !important",
                                  fontSize: "16px",
                                }}
                                className={poststyle.cancel_icon}
                                onClick={() => deleteVideo(index, file?.id)}
                              />
                            </Box>
                          </LightTooltip>
                          <ImgContainer sx={{ height: "100%", width: "100%" }}>
                            <ImagesBox>
                              <video
                                width="100%"
                                height="100%"
                                style={{
                                  maxHeight : "165px" 
                                }}
                                controls
                                src={videoSrc}
                              />
                              {/* <img src="" alt="" /> */}
                            </ImagesBox>
                          </ImgContainer>
                        </ImageBoxup>
                      );
                    })
                  ) : (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          gap: "6px",
                        }}
                      >
                        {showError && (
                          <WarningAmberOutlinedIcon
                            style={{ color: showError ? "#d32f2f" : "" }}
                          />
                        )}
                        <h4
                          className={poststyle.no_upload_txt1}
                          style={{
                            color: showError ? "#d32f2f" : "",
                            fontSize: "14px",
                          }}
                        >
                          {showError && product_vidoes.length == 0
                            ? "Please upload video"
                            : "No video uploaded"}
                        </h4>
                      </Box>
                    </>
                  )}
                </ProductImageContainerup>
                <Box
                  sx={{ display: "grid", placeSelf: "center", width: "100%" }}
                >
                  <DropZone
                    onDrop={(e) => {
                      onDropVideo(e, e);
                    }}
                    // acceptType='video'
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#000",
                        fontWeight: "500",
                        textAlign: "center",
                        "@media screen and (max-width:600px)": {
                          fontSize: "12px",
                        },
                      }}
                    >
                      You can upload just one video in MP4 format.
                    </Typography>
                  </Box>
                </Box>
              </DragDropContainer>
            </UploadImages>
          </Grid>
          <Grid item xs={12} mt={3}>
            <ButtonCol
              sx={{
                "& .MuiButtonBase-root": {
                  border: "1px solid rgba(211, 47, 47, 0.5)",
                  color: "#d32f2f",
                },
              }}
            >
              <Button
                color="error"
                variant="outlined"
                size="small"
                disabled={buttonLoader}
                style={{
                  textTransform: "none",
                  minWidth: "90px",
                  height: "30.75px",
                }}
                onClick={HandleSaveImageAndVideo}
              >
                {buttonLoader ? (
                  <ThreeDots
                    height="14"
                    width="107"
                    radius="5"
                    color="#d32f2f"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                ) : (
                  "Save & Continue"
                )}
                <ArrowForwardIosIcon
                  style={{ fontSize: "15px", marginLeft: "4px" }}
                ></ArrowForwardIosIcon>
              </Button>
            </ButtonCol>
          </Grid>
        </Grid>
      </UploadOuterDiv>
    </>
  );
};
export default UploadProductsPlaceholder;
