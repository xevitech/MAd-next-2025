import React, { useState, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import Auth from "@/auth/Auth";
import {
  Button,
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
  style,
} from "./styles";
import Image from "next/image";
import RemoveProfileImg from "../removeProfileImage";
import { dataURLtoBlob } from "../resizeImage";
import { makeStyles } from "tss-react/mui";
import { getCompanyProfile } from "@/hooks/company";
import { useAppDispatch } from "redux/store";
import Cropper from "react-easy-crop";
import getCroppedImg from "./CropImage";
const UploadImageModal = ({
  open,
  closeModal,
  endPoint,
  companyDetails,
  name,
}) => {
  const [selectedImage, setSelectedImage] = useState<any>("");
  const [preview, setPreview] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const dispatch = useAppDispatch();
  const refContainer = useRef();
  const onCropComplete = (area: any, pixels: any) => setCroppedAreaPixels(pixels);

  const upoloadImage = async (image: string) => {
    if (!selectedImage) return;
    setLoading(true);
    const blobResizedImage = dataURLtoBlob(image) as Blob;
    let formData = new FormData();
    formData.append("profile_image", blobResizedImage);

    let url = `${BASE_URL}/${endPoint}`;
    try {
      let { status, data } = await axios.post(url, formData, {
        headers: { Authorization: `Bearer ${Auth.token()}` },
      });

      if (status == 200) {
        setLoading(false);
        setSelectedImage((prev: any) => null);
        closeModal();
        toast.success(data?.message);
        dispatch(getCompanyProfile());
      }
    } catch (error) {
      toast.error("something went wrong!");
      setLoading(false);
      closeModal();
    }
  };
  const useStyles = makeStyles()((theme) => {
    return {
      uploadimg: {
        objectFit: "cover",
        width: "100%",
      },
      updatebtn: {
        fontWeight: "bold !important",
        height: "36px !important",
        display: "inline-flex !important",
        margin: "auto !important",
        backgroundColor: "#fff !important",
        border: "1px solid #d7282f !important",
        color: "#d7282f !important",
        boxShadow: "none !important",
        minWidth: "85px !important",
        "&:hover": {
          background: "#DD484E !important",
          color: "#fff !important",
        },
      },
      updategreycon: {
        "@media screen and (max-width: 500px)": {
          height: "70px !important",
        },
      },
    };
  });
  const { classes } = useStyles();
  const handleImageChange = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      return;
    }
    e;
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  const showCroppedImage = React.useCallback(async () => {
    try {
      setLoading(true);
      const croppedImage: any = await getCroppedImg(
        selectedImage,
        croppedAreaPixels,
        0
      );
      upoloadImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  return (
    <>
      <Modal
        open={open}
        onClose={() => closeModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalHeading>
            <p style={{ textAlign: "center", width: "100%" }}>Update Profile</p>
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
          <OuterContainer className={classes.updategreycon}>
            <label
              htmlFor={name}
              style={{
                background: "fff",
                border: "1px dashed rgba(34, 51, 84, 0.3)",
                borderRadius: "6px",
                width: "100%",
                height: "118px",
                display: "flex",
                justifyContent: "center",
                paddingBottom: "20px",
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
                <ImageStyles>
                  <Image
                    height={180}
                    width={"360"}
                    src={preview}
                    alt="img"
                    className={classes.uploadimg}
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
                className={selectedImage ? classes.updatebtn : ""}
                style={{
                  textTransform: "capitalize",
                }}
                variant="contained"
                onClick={showCroppedImage}
              >
                {loading ? (
                  <ThreeDots
                    height="40"
                    width="40"
                    radius="9"
                    color="white"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                ) : (
                  "Update"
                )}
              </Button>
            }
            {companyDetails?.contact_profile?.profile_image !==
              "https://merchantad.xevitech.com/public/assets/img/logo_default.svg" && (
              <div
                style={{
                  fontWeight: "bold",
                  textTransform: "none",
                  display: "inline-flex",
                  margin: "auto",
                }}
              >
                <RemoveProfileImg
                  profileImgType={"contact_list"}
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

export default UploadImageModal;
