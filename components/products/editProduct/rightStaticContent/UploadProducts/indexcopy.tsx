import React, { useState, useRef, useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, Grid, Button, TextField } from "@mui/material";
import Image from "next/image";
import poststyle from "components/products/editProduct/style.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  DragDropText,
  DragDropContainer,
  ProductImageContainerup,
  ImageBoxup,
  ImagesBox,
  DeleImage,
  UploadImages,
  FeaturedImg,
  DelallImg,
  ImgContainer,
} from "./styles";
import DropZone from "./DropZone";
import { ThreeDots } from "react-loader-spinner";
// import useProductContext from "@/hooks/useProductContext";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { apiClient } from "@/components/common/common";
import CheckIcon from "@mui/icons-material/Check";
import { ButtonCol } from "../../productCategories/styles";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import Resizer from "react-image-file-resizer";
import { debounce } from "lodash";
import { useRouter } from "next/router";

const UploadProducts = ({
  setSmartBlock,
  setCompletedFields,
  setAccordianValue,
  productDetail,
}) => {
  // const { productId } = useProductContext();
  const query: any = useRouter();
  const productId: string = query.query.Id;
   
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [isMount, setIsMount] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<any>(-1);
  const [imageDetail, setImageDetail] = useState<any>({});
  const uploadInput = useRef<HTMLInputElement>();

  const Validation = () => {
    return Yup.object().shape({
      uploadImages: Yup.array().min(1, "Please upload product images"),
    });
  };

  const resizeImage = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        480,
        480,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file",
        480,
        480
      );
    });

  const localFormik = useFormik({
    validationSchema: Validation,
    initialValues: {
      alt_text: "",
      role: "",
      featured_image: "",
      photos: [],
      deletedImages: [],
      uploadImages: [],
      newImages: [],
    },
    onSubmit: () => {},
  });

  let file: any;
  const onDrop = async (Files: any) => {
    let acceptedFiles = [];
    let count = 0;
    for (let i = 0; i < Files.length; i++) {
      count++;
      let file = await resizeImage(Files[i]);
      acceptedFiles = [...acceptedFiles, file];
      if (count === Files.length) {
        const { uploadImages } = localFormik.values;
        file = acceptedFiles;
        let Images = acceptedFiles.map((e, i) => ({
          src: e,
          id: `local-${Math.random()}`,
          is_featured: false,
          alt: "",
        }));
        setShowError(false);
        localFormik.setFieldValue("uploadImages", [...uploadImages, ...Images]);
        localFormik.setFieldValue("newImages", Images);
      }
    }
  };
  const deleteImage = (id: any) => {
    const { uploadImages } = localFormik.values;
    const { deletedImages } = localFormik.values;
    const deleted = uploadImages.filter((item: any) => item.id !== id);
    if (typeof id == "number") {
      localFormik.setFieldValue("deletedImages", [...deletedImages, id]);
    }
    localFormik.setFieldValue("uploadImages", deleted);
  };
  const handleImageChange = debounce((e) => {
    featuredImage.length > 0
      ? ImageHandler({
          name: "alt",
          value: e.target.value,
          id: "",
          index: "",
        })
      : "";
  }, 300); 
  
  const handleSaveImages = async () => {
    const { deletedImages, uploadImages, newImages }: any = localFormik.values;
    if (uploadImages.length === 0) {
      setShowError(true);
      return;
    }
    setButtonLoader(true);
    const formData = new FormData();
    formData.append("last_update", "Product Images");
    formData.append("published", "0");
    formData.append("product_id", productId);
    if (deletedImages.length > 0) {
      formData.append("image_ids", deletedImages);
      formData.append("remove_all", "bulk");
    }
    if (newImages.length > 0) {
      for (let i = 0; i < newImages.length; i++) {
        if (newImages[i]?.src) {
          let source: any = await resizeImage(newImages[i]?.src);
          formData.append("images[]", source);
        }
      }
    }
    const newFiles = uploadImages.filter((v) => v.src);
    let alt = newFiles.map((v) => (v.alt ? v.alt : ""));
    let featured = newFiles.map((v) => (v.is_featured ? "1" : "0"));
    if (alt.length > 0) formData.append("alt", alt.toString());
    if (featured.length > 0)
      formData.append("is_featured", featured.toString());
    let response = await apiClient(
      "product/gallery/upload",
      "post",
      { body: formData },
      true
    );
    if (response.status === 200) {
      // localFormik.setFieldValue("uploadImages", response.files);
      localFormik.setFieldValue("newImages", []);
      localFormik.setFieldValue("deletedImages", []);
      setIsDeleted(false);
      setAccordianValue("smart_editing");
      setCompletedFields((prev) => ({ ...prev, images: true }));
      setSmartBlock({ disable: false, expanded: true });
      if (uploadImages.length > 0) AddAltToImage();
    }
    setButtonLoader(false);
  };

  const AddAltToImage = async () => {
    const { uploadImages } = localFormik.values;
    let response = await apiClient("product/gallery/update", "post", {
      body: {
        last_update: "Product Images",
        product_id: productId,
        gallery: uploadImages
          .filter((v) => v.file_name)
          .map((v) => ({
            alt: v.alt,
            id: v.id,
            is_featured: v.is_featured ? "1" : "0",
          })),
      },
    });
    if (response.status === 200) {
    }
  };

  const { uploadImages } = localFormik.values;

  const onChangeHandle = (e) => {
    // localFormik.setFieldValue("featured_image", e.target.files[0]);
  };

  useEffect(() => {
    const { photos }: any = productDetail;
    let images = photos?.map((v) => ({
      ...v,
      alt: v.alt_tag,
      is_featured: v.is_featured == "1" ? true : false,
    }));

    const featureIndex = photos?.findIndex((v) => v.is_featured == 1);
    setImageIndex(featureIndex);
    localFormik.setFieldValue("uploadImages", images);
  }, [productDetail?.photos]);

  const ImageHandler = ({ name, value, id, index }) => {
    if (imageIndex >= 0) {
      const { values, setFieldValue } = localFormik;
      let images = [...values.uploadImages];
      let updated = [];
      setImageDetail({ ...imageDetail, [name]: value });
      if (name === "is_featured") {
        updated = images.map((v) => {
          if (v.id == id && value) {
            return { ...v, is_featured: true };
          } else {
            return { ...v, is_featured: false };
          }
        });
        setFieldValue("uploadImages", updated);
      } else {
        images[imageIndex].alt = value;
        setFieldValue("uploadImages", images);
      }
    }
  };

  useEffect(() => {
    if (imageIndex >= 0) {
      const { uploadImages } = localFormik.values;
      setImageDetail({
        alt: uploadImages[imageIndex]?.alt_tag ?? "",
        is_featured: uploadImages[imageIndex]?.isfeatured ?? false,
        image_src: uploadImages[imageIndex]?.file_name ?? "",
      });
    }
  }, [imageIndex]);

  const file_name = uploadImages?.find((v) => v.is_featured);

  useEffect(() => {
    if (uploadImages?.length === 0 && isDeleted) setIsDeleted(false);
  }, [uploadImages]);

  useEffect(() => {
    const { uploadImages } = localFormik.values;
    if (uploadImages?.length > 0 && !isMount) {
      setIsMount(true);
      setSmartBlock({ disable: false, expanded: true });
      return;
    }
  }, [localFormik, isMount]);

  useEffect(() => {
    if (uploadImages?.length <= 0 && isMount) {
      setCompletedFields((prev) => ({ ...prev, images: false }));
      setIsMount(false);
    }
  }, [uploadImages, isMount]);

  useEffect(() => {
    const { photos } = productDetail;
    if (photos?.length > 0 && !isMount) {
      setSmartBlock({ disable: false, expanded: true });
      setCompletedFields((prev) => ({ ...prev, images: true }));
      setIsMount(true);
    }
  }, [productDetail]);

  let featuredImage = uploadImages?.filter((v) => v.is_featured);

  return (
    <>
      <Box mt={2}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={7}
            lg={9}
            xl={9}
            style={{ position: "relative" }}
          >
            <DelallImg>
              {uploadImages?.length > 0 && (
                <Button
                  size="small"
                  variant="text"
                  onClick={() => setIsDeleted((pre) => !pre)}
                >
                  <DeleteOutlineIcon></DeleteOutlineIcon>
                  {isDeleted ? "Cancel" : "Delete Images"}
                </Button>
              )}
            </DelallImg>
            <UploadImages component="div" width={"100%"}>
              <DragDropContainer>
                <ProductImageContainerup>
                  {uploadImages?.length > 0 ? (
                    uploadImages?.map((file: any, index: any) => {
                      return (
                        <ImageBoxup key={index}>
                          {isDeleted ? (
                            <DeleImage
                              onClick={() => {
                                deleteImage(file.id);
                              }}
                            >
                              <CancelIcon className={poststyle.cancel_icon} />
                            </DeleImage>
                          ) : file.is_featured ? (
                            <DeleImage className={poststyle.checkFeature_icon}>
                              <CheckIcon className={poststyle.cancel_icon} />
                            </DeleImage>
                          ) : (
                            ""
                          )}
                          <ImgContainer>
                            <ImagesBox
                              onClick={() => {
                                setImageIndex(index);
                                ImageHandler({
                                  name: "is_featured",
                                  index,
                                  value: !file.is_featured,
                                  id: file.id,
                                });
                              }}
                            >
                              <Image
                                src={
                                  file.src
                                    ? URL.createObjectURL(file.src)
                                    : file.file_name
                                }
                                alt="product"
                                height={60}
                                width={60}
                              />
                            </ImagesBox>
                          </ImgContainer>
                        </ImageBoxup>
                      );
                    })
                  ) : (
                    <>
                      {showError && (
                        <WarningAmberOutlinedIcon
                          style={{ color: showError ? "#d32f2f" : "" }}
                        />
                      )}
                      <h4
                        className={poststyle.no_upload_txt}
                        style={{ color: showError ? "#d32f2f" : "" }}
                      >
                        {showError
                          ? "Please upload images"
                          : "No Images uploaded"}
                      </h4>
                    </>
                  )}
                </ProductImageContainerup>
                <DropZone
                  onDrop={(e) => {
                    // e.prevenDefault();
                    onDrop(e);
                  }}
                />
              </DragDropContainer>
            </UploadImages>
          </Grid>

          <Grid item xs={12} sm={12} md={5} lg={3} xl={3}>
            <Box component="div">
              <DragDropContainer>
                <DragDropText> Selected Feature Image</DragDropText>
                <FeaturedImg>
                  <Image
                    src={
                      file_name?.src
                        ? URL.createObjectURL(file_name?.src)
                        : file_name?.file_name ?? "/assets/no-featured-img.png"
                    }
                    alt="Feature Image"
                    height={100}
                    width={300}
                  />
                  <input
                    id="uploadFeatureInput"
                    type="file"
                    ref={uploadInput}
                    style={{ display: "none" }}
                    onChange={
                      Object.keys(imageDetail).length > 0
                        ? AddAltToImage
                        : onChangeHandle
                    }
                    accept="image/png, image/jpeg"
                  />
                </FeaturedImg>
              </DragDropContainer>

              <DragDropContainer>
                <TextField
                  style={{ width: "100%" }}
                  label={"Alt Text"}
                  name="alt_text"
                  value={
                    featuredImage?.length > 0
                      ? uploadImages[imageIndex]?.alt ?? ""
                      : ""
                  }
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleImageChange}
                  // onChange={(e) => 
                    // featuredImage.length > 0
                    //   ? ImageHandler({
                    //       name: "alt",
                    //       value: e.target.value,
                    //       id: "",
                    //       index: "",
                    //     })
                    //   : "";
                  // }
                />
              </DragDropContainer>
            </Box>
          </Grid>
          <ButtonCol>
            <Button
              color="error"
              variant="outlined"
              size="small"
              style={{
                textTransform: "none",
                minWidth: "90px",
              }}
              onClick={handleSaveImages}
            >
              {buttonLoader ? (
                <ThreeDots
                  height="30"
                  width="60"
                  radius="5"
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
      </Box>
    </>
  );
};
export default UploadProducts;
