import React, { useRef } from "react";
import { FactoryButtonContainer } from "@/components/CompanySettings/CompanyDetail/commonStyles";
import { UpdateCoverButton } from "@/components/profile/companyProfile/styles";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Box } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';

/**
 * UploadImageWithPreview Component
 * This component allows the user to upload an image and preview it before final upload.
 * @param 
 * @returns {JSX.Element} - Rendered component with upload functionality and preview.
 */
const UploadImageWithPreview = ({
  imageType,
  setImage,
  images,
  checkTitle,
  imageHeight = null,
  previewImage = null,
}) => {
  const uploadInput = useRef<HTMLInputElement>();

  const onClickHandler = () => {
    if (!checkTitle(imageType)) return;
    uploadInput?.current?.click();
  };

  function importData() {
    let input = document.createElement("input");
    input.accept = "image/*";
    input.type = "file";
    input.onchange = (_) => {
      let files = Array.from(input.files);
      setImage(imageType, [
        ...images,
        { file: files[0], file_original_name: "" },
      ]);
    };
    input.click();
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundImage: `url(${previewImage ? previewImage : ""})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: `${imageHeight ? imageHeight : "190px"}`,
          position: "relative",
          backgroundColor: "#00000059",
          margin: "0x 16px 0",
          "& .companyandfactory": {
            height: "120px",
          },
        }}
      >
        <FactoryButtonContainer value={{ top: "50%" }}>
          <UpdateCoverButton onClick={importData}>
            {/* <CameraAltIcon /> */}
            <FileUploadIcon />
          </UpdateCoverButton>
        </FactoryButtonContainer>
      </Box>
    </Box>
  );
};

export default UploadImageWithPreview;
