import React, { useEffect, useRef, useState } from "react";
import {
  CloseIconContainer,
  CloseIconStyle,
  FactorTextContainer,
} from "@/components/CompanySettings/CompanyDetail/commonStyles";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { Box, Modal, TextField } from "@mui/material";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { apiClient } from "@/components/common/common";
import Image from "next/image";
import { makeStyles } from "tss-react/mui";
import Carousel from "react-material-ui-carousel";
import { UploadedImageBox } from "../style";
const useStyles = makeStyles()((theme) => {
  return {
    previewimge: {
      width: "100%",
      objectFit: "contain",
      "@media (max-width: 800px)": {
        width: "100%",
      },
      "@media (max-width:480px)": {
        width: "100%",
      },
    },

    previewinput: { width: "100%", paddingTop: "4px", paddingBottom: "4px" },
  };
});
const PreviewImages = (props) => {
  const {
    source,
    index,
    images,
    setImages,
    imageType,
    editMode,
    title,
    setErrorMsg,
    errorText,
    id,
    formik,
  }: any = props;
  const previewInput = useRef<HTMLInputElement>();

  const { classes } = useStyles();
  const imageTitleRef = useRef<HTMLInputElement>();

  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [zoomImageModal, setZoomImageModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<any>([]);

  useEffect(() => {
    if (title === "") imageTitleRef?.current?.focus();
  }, [title]);

  const updateImage = (e) => {
    let fileSize = e.target.files[0]?.size;
    if (fileSize <= 2000000) {
      let allImages = [...images];
      allImages[index].file = e.target.files[0];
      setImages(imageType, allImages);
    } else {
      toast.error("Image size must be less than 2MB");
    }
  };

  const onChangeHandler = (e) => {
    let allImages = [...images];
    const updatedImage = allImages.find((item) => item.id === id);
    if (updatedImage) {
      updatedImage.file_original_name = e.target.value;
      setImages(imageType, allImages);
    } else {
      allImages[index].file_original_name = e.target.value;
    }
    let errorMessage = [...(formik?.errors?.[imageType] ?? [])];
    if (errorMessage[index]?.file_original_name) {
      errorMessage[index].file_original_name = "";
      formik.setFieldError(imageType, errorMessage);
    }
    setImages(imageType, allImages);
  };

  const DeleteOffice = async () => {
    let allImages = [...images];
    allImages.splice(index, 1);
    setImages(imageType, allImages);
    let response = await apiClient(
      "company_profile/factory_informations/delete",
      "post",
      {
        body: { label: imageType, image_ids: id },
      }
    );
    if (response.status == 200) {
      toast.success("Image Deleted Successfully");
      setDeleteConfirmation(false);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "auto",
    bgcolor: "background.paper",
    border: "0px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleSelectedImage = (image, index) => {
    let newImageArray = [...images];
    let firstItems = newImageArray.slice(0, index);
    let endItems = newImageArray.slice(index);
    newImageArray.unshift(image);
    setSelectedImage([...endItems, ...firstItems]);
  };
  return (
    <div>
      <Modal
        aria-labelledby="modal-modal-factory-photos"
        aria-describedby="modal-modal-factory-description"
        open={zoomImageModal}
        onClose={() => setZoomImageModal(false)}
      >
        <>
          <Box sx={style}>
            <Carousel
              navButtonsAlwaysInvisible={
                selectedImage?.length == 1 ? true : false
              }
              cycleNavigation={true}
              indicators={false}
              duration={500}
              swipe={true}
              animation="fade"
              navButtonsProps={{
                style: {
                  backgroundColor: "black",
                  borderRadius: 6,
                  color: "white",
                },
              }}
            >
              {selectedImage.map((v) => (
                <Image
                  key={v.id}
                  className={classes.previewimge}
                  src={v.source}
                  height={510}
                  width={510}
                  alt="Factory Image"
                />
              ))}
            </Carousel>
          </Box>
        </>
      </Modal>
      {deleteConfirmation && (
        <DeleteDialog
          open={deleteConfirmation}
          handleClose={setDeleteConfirmation}
          text="image"
          onClickAction={DeleteOffice}
        />
      )}
      <div style={{ position: "relative" }}>
        {editMode && (
          <CloseIconContainer>
            <CloseIcon
              style={CloseIconStyle}
              onClick={() => setDeleteConfirmation(true)}
            />
          </CloseIconContainer>
        )}
        <UploadedImageBox>
          <Image
            onClick={(e) => {
              if (!editMode && id) {
                setZoomImageModal(true);
                handleSelectedImage(source, index);
              }
            }}
            className={classes.previewimge}
            src={source}
            height={180}
            width={200}
            alt="Factory Image"
            style={{
              cursor: !editMode ? "pointer" : "",
            }}
          />
        </UploadedImageBox>

        <FactorTextContainer>
          {editMode ? (
            <TextField
              className={classes.previewinput}
              inputRef={imageTitleRef}
              variant="outlined"
              size="small"
              name="imageDescription"
              type="text"
              placeholder="Add Title here"
              onChange={(e) => {
                onChangeHandler(e);
              }}
              value={title}
              helperText={
                formik?.errors?.[imageType]?.[index]?.file_original_name
              }
              error={
                formik?.errors?.[imageType]?.[index]?.file_original_name
                  ? true
                  : false
              }
              inputProps={{
                autoComplete: "off",
              }}
            />
          ) : (
            title
          )}
        </FactorTextContainer>
      </div>
    </div>
  );
};

export default PreviewImages;
