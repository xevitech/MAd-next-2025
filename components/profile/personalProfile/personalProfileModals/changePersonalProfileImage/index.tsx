import React, { useState, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  ButtonContainer,
  ImageName,
  ImageSize,
  ModalHeading,
  OuterContainer,
  ProfileProgress,
  ProgressImage,
  UpAvatar,
  style,
} from "./styles";
import RemoveProfileImg from "@/components/common/removeProfileImage";
import resizeAndUploadImage from "@/components/common/resizeImage";
import { useAppDispatch } from "redux/store";
import { profileData } from "@/hooks/appReducers";
import LinearProgressWithLabel from "@/components/common/progressLoader";
import { makeStyles } from "tss-react/mui";
import Cropper from "react-easy-crop";
import getCroppedImg from "./CropImage";
import { LOCAL_PUBLIC_URL } from "@/utils/staticValues";
const useStyles = makeStyles()((theme) => {
  return {
    upbtn: {
      textTransform: "none",
      margin: "auto",
      minWidth: "80px !Important",
      color: "#d7282f !important",
      border: " 1px solid #d7282f !important",
      height: "36px !important",
      display: "inline-flex !important",
      boxShadow: "none !important",
      fontWeight: "bold !important",
      backgroundColor: "#fff !important",
      "&:hover": {
        background: "rgba(216, 38, 47,0.9)",
      },
    },

    imgcontainer: { height: "250px", margin: "10px 4px  0!important" },
    imginner: { height: "100%" },
  };
});
export const ChangeProfileImage = (props) => {
  const { open, closeModal, profileImageLink } = props;
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState<any>();
  const [preview, setPreview] = useState<any>();
  const [loading, setLoading] = useState<any>(false);
  const [dragActive, setDragActive] = React.useState(true);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const refContainer = useRef();
  const { classes } = useStyles();
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const uploadImage = async (img) => {
    if (!selectedImage) {
      toast.error("please select image");
      return;
    }
    try {
      const message = await resizeAndUploadImage(img);
      setLoading(false);
      dispatch(profileData());
      setSelectedImage(undefined);
      closeModal();
      toast.success(message);
    } catch (error) {
      setLoading(false);
      closeModal();
    }
  };

  const handleImageChange = async (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      return;
    }
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (area, pixels) => setCroppedAreaPixels(pixels);
  const showCroppedImage = React.useCallback(async () => {
    try {
      setLoading(true);
      const croppedImage: any = await getCroppedImg(
        selectedImage,
        croppedAreaPixels,
        0
      );
      uploadImage(croppedImage);
    } catch (e) {}
  }, [croppedAreaPixels]);

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalHeading>
            <p style={{ textAlign: "center", width: "100%" }}>
              Update Profile{" "}
            </p>
          </ModalHeading>
          <Button
            onClick={closeModal}
            color="error"
            style={{
              minHeight: "46px",
              minWidth: "46px",
              borderRadius: "50%",
              position: "absolute",
              top: "9px",
              right: "11px",
            }}
          >
            <CloseOutlinedIcon style={{ cursor: "pointer" }} />
          </Button>
          <OuterContainer>
            <label
              htmlFor="profile-change"
              style={{
                background: "#fff",
                border: "1px dashed rgba(34, 51, 84, 0.3)",
                borderRadius: "6px",
                width: "100%",
                height: "100px",
                display: "flex",
                justifyContent: "center",
                paddingBottom: "20px",
                position: "relative",
              }}
            >
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignSelf: "center",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <UploadOutlinedIcon />
                </span>
                <span
                  style={{
                    textAlign: "center",
                    display: "block",
                    fontSize: "13px",
                    opacity: 0.6,
                  }}
                >
                  drag & drop or browse to choose a file here
                </span>
              </span>
            </label>
            <input
              ref={refContainer}
              accept="image/*"
              id="profile-change"
              style={{
                padding: "5px",
                fontSize: "14px",
                lineHeight: "16px",
                color: "#223354",
              }}
              type="file"
              onChange={handleImageChange}
            ></input>
            {dragActive && (
              <div
                id="drag-file-element"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
              ></div>
            )}

            <ProfileProgress>
              {selectedImage && (
                <>
                  <LinearProgressWithLabel />

                  <ProgressImage>
                    <UpAvatar src={preview} />
                    <div>
                      <ImageName>{selectedImage?.name}</ImageName>
                      <ImageSize>
                        {Math.round(selectedImage?.size / 1000)}KB
                      </ImageSize>
                    </div>
                    <CancelOutlinedIcon
                      sx={{
                        position: "absolute",
                        right: "10px",
                        top: "14px",
                        fontSize: "19px",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedImage(null)}
                    />
                  </ProgressImage>
                </>
              )}
            </ProfileProgress>
          </OuterContainer>
          {selectedImage && (
            <Cropper
              image={selectedImage}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropShape={"round"}
              showGrid={false}
            />
          )}
          <ButtonContainer>
            {
              <Button
                disabled={selectedImage ? false : true}
                className={selectedImage ? classes.upbtn : ""}
                style={{
                  fontWeight: "bold",
                  textTransform: "none",
                  height: "36px",
                  display: "inline-flex",
                  margin: "auto",
                }}
                variant="contained"
                onClick={() => {
                  showCroppedImage();
                }}
              >
                {loading ? (
                  <ThreeDots
                    height="40"
                    width="40"
                    radius="9"
                    color="#d7282f"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                ) : (
                  "Update"
                )}
              </Button>
            }
            {profileImageLink !==
              `${LOCAL_PUBLIC_URL}/assets/img/avatar-place.png` && (
              <div
                style={{
                  fontWeight: "bold",
                  textTransform: "none",
                  display: "inline-flex",
                  margin: "auto",
                }}
              >
                <RemoveProfileImg
                  profileImgType={"profile"}
                  closeModal={closeModal}
                  id=""
                />
              </div>
            )}
          </ButtonContainer>
        </Box>
      </Modal>
    </>
  );
};
