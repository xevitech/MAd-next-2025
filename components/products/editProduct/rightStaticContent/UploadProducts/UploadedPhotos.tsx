import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  ImagesGrid,
  ImageBox,
  DeleImage,
  EmptyGallaryData,
  GallaryEmptyText,
} from "./styles";
import Image from "next/image";
import poststyle from "components/products/editProduct/style.module.css";
// import useProductContext from "@/hooks/useProductContext";
import CancelIcon from "@mui/icons-material/Cancel";
const UploadedPhotos = (props: any) => {
  const { uploadedPhotos, deleteUploadedImage, showDelete, ImageHandler } =
    props;

  return (
    <>
      {uploadedPhotos.length > 0 ? (
        uploadedPhotos.map((file: any, index: any) => {
          return (
            <ImagesGrid item key={index}>
              <ImageBox key={index} className={poststyle.photo_gallery_box}>
                {showDelete && (
                  <DeleImage onClick={() => deleteUploadedImage(file.id)}>
                    <CancelIcon className={poststyle.cancel_icon} />
                  </DeleImage>
                )}
                <Image
                  src={file?.file_name}
                  alt="product"
                  height={60}
                  width={60}
                  onClick={() => ImageHandler(index)}
                />
              </ImageBox>
            </ImagesGrid>
          );
        })
      ) : (
        <EmptyGallaryData>
          <GallaryEmptyText>No images avaliable now</GallaryEmptyText>
        </EmptyGallaryData>
      )}
    </>
  );
};
export default UploadedPhotos;
