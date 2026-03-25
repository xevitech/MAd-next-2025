import DropZone from "@/components/common/dropZone";
import { setBannerImages, setbannerFiles } from "@/hooks/sellerSubaccount";
import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "redux/store";
import { Imageboxtext, Mainbox } from "../Subdomainstyle";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { convertSize } from "@/components/common/common";
import BannerImageCroper from "./BannerImageCroper";

export default function ImagefordragNdrop({
  setBannerImg,
  bannerImg,
  editImageContainerLength,
  showImageOnEditImages = [],
  setShowImageOnEdit = null,
}) {
  const dispatch = useAppDispatch();
  const { bannerImage } = useSelector((state: any) => state.subseller);
  const childRef = useRef(null);

  const onDrop = async (Files: any) => {
    const acceptedFilesData = [];
    const totalImagesLength = [...showImageOnEditImages, ...Files].length;
    if (totalImagesLength > 5) {
      toast.error("Only 5 images allowed");
      return;
    }
    if (Files[0]?.size > 2048 * 1024) {
      toast.error("Banner Image size 2MB only");
      return;
    } else if (convertSize(Files[0]?.size, "MB") <= 0) {
      toast.error("Currepted images are not allowed", {
        autoClose: 3500,
      });
      return;
    } else {
      acceptedFilesData.push(Files[0]);
    }
    if (childRef?.current) {
      childRef?.current?.importData(false, Files);
      return;
    }

    // Files.map((file, index) => {
    //   if (file.size > 204800) {
    //     toast.error("Banner Image size 200kb only");
    //     return;
    //   } else if (convertSize(file?.size, "MB") <= 0) {
    //     toast.error("Currepted images are not allowed", {
    //       autoClose: 3500,
    //     });
    //     return;
    //   } else {
    //     acceptedFilesData.push(file);
    //   }
    // });

    // for (let i = 0; i < acceptedFilesData.length; i++) {
    //   acceptedFilesData[i].indexValue = i;
    //   // count++;

    //   // Files.forEach((element) => {
    //   //   element;
    //   // });
    //   // if (count === Files.length) {

    //   let Images = {
    //     src: URL.createObjectURL(acceptedFilesData[i]),
    //     indexValue: i,
    //   };
    //   if (showImageOnEditImages?.length <= 4 && setShowImageOnEdit) {
    //     setBannerImg([...bannerImg, Images]);
    //   } else if (!setShowImageOnEdit) {
    //     setBannerImg([...bannerImg, Images]);
    //   }
    //   // else{
    //   //   toast.error("Only 5 images allowed");
    //   // }

    //   // setBannerImg([...bannerImg, ...Images]);
    //   // }
    // }
    // dispatch(setbannerFiles(acceptedFilesData));
    // if (editImageContainerLength >= 5 == false) {
    //   dispatch(setBannerImages(acceptedFilesData));
    // }
  };
  const onChangeHandle = async (e) => {
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setBannerImg(objectUrl);
  };

  const onChangeHandle1 = (e) => {
    dispatch(setbannerFiles([e]));
    dispatch(setBannerImages([e]));
    // setUploadedFiles((prev)=> [...prev, e])
  };

  return (
    <>
      <Mainbox>
        <BannerImageCroper
          deleteImages={null}
          type={"square"}
          endPoints={""}
          params={""}
          defaultImage={""}
          onChange={onChangeHandle1}
          setBannerImg={setBannerImg}
          ref={childRef}
        />
        <Box sx={{ my: 2 }}>
          <DropZone
            onDrop={(e) => {
              onDrop(e);
            }}
          />
        </Box>
        <Imageboxtext>
          We recommend using images{" "}
          <Box component={"span"} className="impInfo">
            {" "}
            1920px(w) x 421px(h){" "}
          </Box>
          . File size must be under{" "}
          <Box component={"span"} className="impInfo">
            {" "}
            2MB
          </Box>
          .
        </Imageboxtext>
      </Mainbox>
    </>
  );
}
