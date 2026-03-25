import {
  BannerList,
  BannerSetting,
  BannerSetting_Update,
} from "@/hooks/sellerSubaccount";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { PreviewBtn, SaveBtn } from "../Subdomainstyle";
import PreviewModal from "./PreviewModal";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
export default function SavePreviewbuttons() {
  const [open, setOpen] = useState<boolean>(false);
  const {
    bannerImage,
    threeDotLoader,
    Id,
    page,
    bannerPage,
    bannerMode,
    isBannerPageSelected,
  } = useSelector((state: any) => state.subseller);
  const dispatch = useAppDispatch();
  const closeModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(BannerList());
  }, []);

  const handleSaveSetting = () => {
    if (!bannerPage) {
      toast.error("Please select banner page");
      return;
    }
    if (!bannerImage) {
      toast.error("Please upload images");
      return;
    }
    // if (Id || !Id == undefined) {
    //   dispatch(BannerSetting_Update(bannerImage));
    // } else {
    dispatch(
      BannerSetting({ data: bannerImage, isActive: isBannerPageSelected })
    );
    // }
  };
  return (
    <>
      <PreviewModal open={open} closeModal={closeModal} mode={bannerMode} />

      <Box
        pb={2}
        mt={3}
        sx={{
          display: "flex",
          gap: "16px",
          justifyContent: "center",
        }}
      >
        <PreviewBtn onClick={() => setOpen(true)}>Preview</PreviewBtn>
        <SaveBtn
          onClick={() => handleSaveSetting()}
          style={{ height: "42px", width: "91.4px" }}
        >
          {threeDotLoader ? (
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
            // <> {Id ? "Update" : "Save"}</>
            <> {"Save"}</>
          )}
        </SaveBtn>
      </Box>
    </>
  );
}
