import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import Auth from "@/auth/Auth";
import { makeStyles } from "tss-react/mui";
import {
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import { BASE_URL } from "@/utils/staticValues";
import axios from "axios";
import {
  ButtonContainer,
  ImageStyles,
  ModalHeading,
  OuterContainer,
} from "./styles";
import Image from "next/image";
import RemoveProfileImg from "../removeProfileImage";
import { dataURLtoBlob } from "../resizeImage";
import { useAppDispatch } from "redux/store";
import { getCompanyProfile } from "@/hooks/company";
import Cropper from "react-easy-crop";
import getCroppedImg from "./CropImage";

const useStyles = makeStyles()(() => {
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

const UploadCoverModal = ({
  open,
  closeModal,
  keyValue,
  endPoint,
  name,
  company_detail,
}) => {
  const [selectedImage, setSelectedImage] = useState<any>("");
  const [preview, setPreview] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = (area, pixels) => setCroppedAreaPixels(pixels);
  const dispatch = useAppDispatch();
  const refContainer = useRef();
  const { classes } = useStyles();

  const uploadImage = async (image) => {
    if (!selectedImage) return;
    const blobResizedImage = dataURLtoBlob(image) as Blob;
    let formData = new FormData();
    formData.append(keyValue, blobResizedImage);
    let url = `${BASE_URL}/${endPoint}`;
    try {
      let { status, data } = await axios.post(url, formData, {
        headers: { Authorization: `Bearer ${Auth.token()}` },
      });

      if (status === 200) {
        setLoading(false);
        setSelectedImage((prev: any) => null);
        closeModal();
        toast.success(data?.message);
        dispatch(getCompanyProfile());
      }
    } catch (error) {
      toast.error("something went wrong!");
      setSelectedImage((prev: any) => null);
      setLoading(false);
      closeModal();
    }
  };

  const showCroppedImage = React.useCallback(async () => {
    try {
      setLoading(true);
      const croppedImage: any = await getCroppedImg(
        selectedImage,
        croppedAreaPixels,
        0
      );
      uploadImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  const handleImageChange = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      return;
    }
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={() => closeModal(false)}
      >
        <DialogContent>
          <Box>
            <ModalHeading>
              <p style={{ textAlign: "center", width: "100%" }}>Update Cover</p>
            </ModalHeading>
            <Button
              onClick={() => {
                closeModal(false);
                setLoading(false);
                setSelectedImage(null);
              }}
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
                htmlFor={name}
                style={{
                  background: "#fff",
                  border: "1px dashed rgba(34, 51, 84, 0.3)",
                  borderRadius: "6px",
                  width: "100%",
                  height: "118px",
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: "20px",
                  margin: "0 auto",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
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
                      fontFamily: "Roboto",
                      textAlign: "center",
                      display: "block",
                      fontSize: "13px",
                    }}
                  >
                    drag & drop or browse to choose a file here
                  </span>
                </span>
              </label>
              <input
                ref={refContainer}
                accept="image/*"
                id={name}
                style={{
                  padding: "5px",
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#223354",
                }}
                type="file"
                onChange={handleImageChange}
              ></input>
              {selectedImage && (
                <>
                  <ImageStyles className={classes.imgcontainer}>
                    <Image
                      className={classes.imginner}
                      height={250}
                      width={550}
                      src={preview}
                      alt="img"
                      style={{
                        objectFit: "cover",
                        overflow: "hidden",
                        width: "100%",
                      }}
                    />
                  </ImageStyles>
                </>
              )}
            </OuterContainer>
            {selectedImage && (
              <Cropper
                image={selectedImage}
                crop={crop}
                zoom={zoom}
                aspect={9 / 2}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                cropShape={"rect"}
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
                  onClick={showCroppedImage}
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
              {company_detail?.contact_profile?.profile_banner &&(
                <span
                  style={{
                    fontWeight: "bold",
                    textTransform: "none",
                    display: "inline-flex",
                    margin: "auto",
                  }}
                >
                  <RemoveProfileImg
                    profileImgType={"company"}
                    closeModal={closeModal}
                    id=""
                  />
                </span>
              )}
            </ButtonContainer>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadCoverModal;
