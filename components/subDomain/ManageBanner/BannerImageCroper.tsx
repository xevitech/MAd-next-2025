import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Cropper from "react-easy-crop";
import { getOrientation } from "get-orientation/browser";

import {
  Box,
  Button,
  Divider,
  Slider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FloatingUpdateIconContainer } from "@/components/profile/personalProfile/styles";
import Image from "next/image";
import Modal from "@mui/material/Modal";

import { UpdateCoverButton } from "@/components/profile/companyProfile/styles";
import { useAppDispatch } from "redux/store";
import { profileData } from "@/hooks/appReducers";
import { getCompanyProfile } from "@/hooks/company";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import Avatar from "@mui/material/Avatar";
import theme from "styles/theme";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import UploadIcon from "@mui/icons-material/Upload";
import { apiClient } from "@/components/common/common";
import {
  Controls,
  CropContainer,
  SliderContainer,
} from "@/components/common/ImageCropper/style";
import {
  getCroppedImg,
  getRotatedImage,
} from "@/components/common/ImageCropper/CanvsUtlis";
import { setbannerFiles } from "@/hooks/sellerSubaccount";
import { LOCAL_PUBLIC_URL } from "@/utils/staticValues";

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
};



const BannerImageCroper = forwardRef(({ 
  type = '',
  endPoints = '',
  params = {},
  defaultImage = '',
  deleteImages = false,
  onChange = () => {},
  sx = {},
  setImageName = () => {},
  icon = '',
  showImageCropper = false,
  setBannerImg = () => {},
  onDrop = () => {},
}: any, ref) => {

  const [imageSrc, setImageSrc] = React.useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [editDefaultImage, setEditDefaultImage] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [deleteLoader, setDeleteLoader] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<any>([]);
  const dispatch = useAppDispatch();

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  useEffect(() => {
    showImageCropper && importData(true);
  }, [showImageCropper]);

  const showCroppedImage = async () => {
    setLoader(true);
    try {
      const croppedImage: any = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      console.log(croppedImage, "croppedImage");

      fetch(croppedImage, {
        headers: { "access-control-allow-origin": "*" },
      })
        .then((res) => res.blob())
        .then((res) => SaveImage(res));
    } catch (e) {
      toast.error("Something went wrong!");
      setLoader(false);
    }
  };

  const onFileChange = async (files) => {
    if (files && files.length > 0) {
      const file = files[0];

      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should not exceed 2MB");
        return;
      }
      if (setImageName != (() => {})) setImageName(file?.name);
      let imageDataUrl = await readFile(file);
      let imageDataUrlString = (await readFile(file)) as string;
      const img = document.createElement("img") as HTMLImageElement;
      img.src = imageDataUrlString;

      // const isValidImage =
      //   type === "profile" || "banner"
      //     ? await new Promise<boolean>((resolve) => {
      //         img.onload = () => {
      //           const width = img.naturalWidth;
      //           const height = img.naturalHeight;
      //           if (width < 200 || height < 200) {
      //             toast.error(
      //               "Please upload an image with a minimum dimension of 200x200 pixels."
      //             );
      //             resolve(false);
      //           } else {
      //             resolve(true);
      //           }
      //         };
      //       })
      //     : true;

      // if (!isValidImage) {
      //   return;
      // }
      try {
        const orientation = await getOrientation(file);
        const rotation = ORIENTATION_TO_ANGLE[orientation];
        if (rotation) {
          imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
        }
      } catch (e) {}

      setImageSrc(imageDataUrl);
    }
    setEditDefaultImage(false);
  };

  function importData(edit = false, fileData = null) {
    if(fileData){
      setCrop({ x: 0, y: 0 });
      setRotation(0);
      setZoom(1);
      onFileChange(fileData);
      return
    }
    if (defaultImage && !edit) {
      setImageSrc(defaultImage);
      setEditDefaultImage(true);
      return;
    }
    let input = document.createElement("input");
    input.type = "file";
    (input.accept = "image/png, image/jpeg"),
      (input.onchange = (_) => {
        let files = Array.from(input.files);
        setCrop({ x: 0, y: 0 });
        setRotation(0);
        setZoom(1);
        onFileChange(files);
      });
    input.click();
  }

  useImperativeHandle(ref, () => ({
    importData,
  }));

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "auto",
    bgcolor: "background.paper",
    border: "0px solid #000",
    padding: "40px 0px 0px 0px",
    "@media screen and (max-width:899px) and (orientation:landscape)": {
      width: "70%",
    },
    "@media screen and (max-width:767px)": {
      width: "90%",
      height: "auto",
    },
  };

  const SaveImage = async (Image: any) => {
    onChange(Image);
    // dispatch(setbannerFiles1(Image));
    const blobImage = URL.createObjectURL(Image);
    let Images = {
      src: blobImage,
    };
    // setUploadedImage(Images)
    setBannerImg([Images]);
    closeModal();
    setLoader(false);
  };

  const closeModal = () => {
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setRotation(0);
    setZoom(1);
  };

  const DeleteHandler = async (type: any) => {
    setDeleteLoader(true);
    await deleteImages(type);
    dispatch(profileData());
    dispatch(getCompanyProfile());
    setDeleteLoader(false);
    closeModal();
  };
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const isLandscape = useMediaQuery("(orientation: landscape)");
  const cropSize = {
    width: isPortrait ? 200 : isLandscape ? 200 : 400,
    height: isPortrait ? 200 : isLandscape ? 200 : 400,
  };

  return (
    <>
      {imageSrc && (
        <Modal
          open={true}
          onClose={closeModal}
          aria-labelledby="modal-modal-title1"
          aria-describedby="modal-modal-description1"
        >
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ marginTop: "-30px", padding: "0px 0px 10px 20px" }}>
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "600", color: "#231f20" }}
                >
                  {defaultImage ===
                  `${LOCAL_PUBLIC_URL}/assets/img/avatar-place.png`
                    ? "Add Photo"
                    : "Change Photo"}
                </Typography>
              </Box>
              <Box sx={{ marginTop: "-30px", padding: "0px 20px 0px 20px" }}>
                <CloseOutlinedIcon
                  sx={{ fontSize: "20px", cursor: "pointer" }}
                  onClick={() => closeModal()}
                />
              </Box>
            </Box>
            <CropContainer>
              {editDefaultImage ? (
                <img
                  src={defaultImage}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                    padding: "10px",
                  }}
                />
              ) : (
                <>
                  <Cropper
                    cropShape={"rect"}
                    aspect={1920 / 421}
                    restrictPosition={true}
                    image={imageSrc}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    onCropChange={setCrop}
                    showGrid={false}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    // cropSize={{ width: 400, height: 400 }}
                    // cropSize={
                    //   type !== "profile"
                    //     ? {
                    //         width: isMobile ? 200 : 400,
                    //         height: isMobile ? 200 : 400,
                    //       }
                    //     : undefined // or some other default size if needed
                    // }
                    // cropSize={cropSize}
                  />
                </>
              )}
            </CropContainer>
            {!editDefaultImage && (
              <Controls>
                <SliderContainer>
                  <Typography
                    variant="overline"
                    sx={{
                      "@media screen and (max-width:480px)": {
                        minWidth: 65,
                      },
                    }}
                  >
                    Zoom
                  </Typography>

                  <RemoveOutlinedIcon
                    onClick={() =>
                      setZoom((prev) => (prev <= 1 ? prev : prev - 0.1))
                    }
                  />
                  <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.2}
                    aria-labelledby="Zoom"
                    onChange={(e, zoom: any) => setZoom(zoom)}
                    sx={{
                      padding: "22px 0px",
                      color: "#545454",
                      "@media screen and (max-width:600px)": {
                        flexDirection: "row",
                        alignItems: "center",
                      },
                    }}
                  />
                  <AddOutlinedIcon
                    onClick={() =>
                      setZoom((prev) => (prev < 3 ? prev + 0.1 : prev))
                    }
                  />
                </SliderContainer>
                <SliderContainer>
                  <Typography
                    variant="overline"
                    sx={{
                      "@media screen and (max-width:480px)": {
                        minWidth: 65,
                      },
                    }}
                  >
                    Rotation
                  </Typography>
                  <RemoveOutlinedIcon
                    onClick={() =>
                      setRotation((prev) => (prev <= 10 ? 0 : prev - 10))
                    }
                  />
                  <Slider
                    value={rotation}
                    min={0}
                    max={360}
                    step={1}
                    aria-labelledby="Rotation"
                    onChange={(e, rotation: any) => setRotation(rotation)}
                    sx={{
                      padding: "22px 0px",
                      color: "#545454",
                      "@media screen and (max-width:600px)": {
                        flexDirection: "row",
                        alignItems: "center",
                      },
                    }}
                  />
                  <AddOutlinedIcon
                    onClick={() =>
                      setRotation((prev) => (prev >= 350 ? 360 : prev + 10))
                    }
                  />
                </SliderContainer>
              </Controls>
            )}
            <Divider />
            {!editDefaultImage && (
              <Box
                display="flex"
                justifyContent="space-between"
                padding={"8px 16px"}
                sx={{
                  "@media screen and (max-width:360px)": {
                    // display: "grid",
                    // justifyContent: "center",
                  },
                }}
              >
                <input type="file" accept="image/*" />
                <Button
                  onClick={() => {
                    importData(true);
                  }}
                  sx={{
                    fontSize: "11px",
                    height: "30px",
                    color: "#d7282f",
                    border: "1px solid #d7282f",
                    transition: "all ease 0.5s",
                    "&:hover": {
                      backgroundColor: "#d7282f",
                      color: "#fff",
                      transition: "all ease 0.5s",
                    },
                  }}
                >
                  {defaultImage ==
                  `${LOCAL_PUBLIC_URL}/assets/img/logo_default.png`
                    ? "Change Photo"
                    : "Change Photo"}
                </Button>

                <Button
                  onClick={showCroppedImage}
                  sx={{
                    fontSize: "11px",
                    height: "30px",
                    backgroundColor: "#d7282f",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#d7282f",
                      color: "#fff",
                    },
                    "@media screen and (max-width:360px)": {
                      // marginTop: "12px",
                    },
                  }}
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
                    "Save"
                  )}
                </Button>
              </Box>
            )}
            {editDefaultImage && (
              <Box
                display="flex"
                justifyContent="space-between"
                padding={"8px 16px"}
                sx={{
                  "@media screen and (max-width:360px)": {
                    // justifyContent: "center",
                    // display: "grid",
                  },
                }}
              >
                <Button
                  onClick={() => {
                    importData(true);
                  }}
                  sx={{
                    color: "#d7282f",
                    border: "1px solid #d7282f",
                    transition: "all ease 0.5s",
                    fontSize: "11px",
                    height: "30px",
                    "&:hover": {
                      backgroundColor: "#d7282f",
                      color: "#fff",
                      transition: "all ease 0.5s",
                    },
                  }}
                >
                  {defaultImage ===
                  `${LOCAL_PUBLIC_URL}/assets/img/avatar-place.png`
                    ? "Add Photo"
                    : "Change Photo"}
                </Button>
                {defaultImage ===
                `${LOCAL_PUBLIC_URL}/assets/img/avatar-place.png` ? (
                  ""
                ) : (
                  <Button
                    onClick={() => DeleteHandler(type)}
                    sx={{
                      backgroundColor: "#d7282f",
                      color: "#fff",
                      fontSize: "11px",
                      height: "30px",
                      "&:hover": {
                        backgroundColor: "#d7282f",
                        color: "#fff",
                      },
                      "@media screen and (max-width:360px)": {
                        // marginTop: "12px",
                      },
                    }}
                  >
                    {deleteLoader ? (
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
                      "Delete"
                    )}
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Modal>
      )}

      {icon ? (
        <Avatar
          alt="Remy Sharp"
          src="assets/SubSellerUpload.svg"
          onClick={() => importData(false)}
          style={{ cursor: "pointer", width: 22, height: 22 }}
        />
      ) : type == "banner" || type == "square" ? (
        <div>
          <UpdateCoverButton onClick={() => importData(false)}>
            {/* <CameraAltIcon /> */}
            {/* <UploadOutlinedIcon /> */}
            {/* <UploadIcon /> */}
          </UpdateCoverButton>
        </div>
      ) : (
        <FloatingUpdateIconContainer
          style={sx}
          onClick={(e) => {
            importData(false);
          }}
        >
          <Image
            height={16}
            width={20}
            src={"/assets/uploadInnerIcon.svg"}
            alt="image"
            style={{}}
          />
        </FloatingUpdateIconContainer>
      )}
    </>
  );
});

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export default BannerImageCroper;
