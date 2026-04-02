import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { apiClient, convertSize } from "@/components/common/common";
import {
  BannerList,
  setActiveEditPageData,
  setBannarImagePreview,
  setbannerFiles,
  setBannerImages,
  setBannerPage,
  setDefaultBanner,
  setId,
  setNewBannerSlider
} from "@/hooks/sellerSubaccount";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  SelectChangeEvent,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { isArray } from "lodash";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Bannersubimages,
  BoxforBanner,
  PreviewBtn,
  SaveBtn,
} from "../Subdomainstyle";
import BannerOptionEditBanner from "./BannerOptionEditBanner";
import ImagefordragNdrop from "./ImagefordragNdrop";
import PreviewModal from "./PreviewModal";

const EditBanner = (props) => {
  const { mode, setMode } = props;
  const [toUpdate, setToUpdate] = useState<boolean>(false);
  const [bannerImg, setBannerImg] = useState<any>([]);
  const [bannerData1, setBannerData] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteImage, setDeleteImage] = useState<number>();
  const [deleteImageId, setDeleteImageId] = useState<number>();
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [showImageOnEdit, setShowImageOnEdit] = useState<any>([]);
  const [activeSettings, setActiveSettings] = useState([]);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [toastShown, setToastShown] = useState(false);

  const dispatch = useDispatch();
  const {
    bannerImage,
    defaultBanner,
    page,
    bannerData,
    addBanner,
    newBannerSlider,
    activeEditPageIndex,
    activeEditPage,
    activeEditPageData,
    bannarImagePreview,
    banner_list,
    background_color,
    Id,
  } = useSelector((state: any) => state.subseller);

  const activeItems = bannerData.filter(
    (items, index) => index === activeEditPageIndex
  );

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
    backgroundColor: "red",
  });
  useEffect(() => {
    dispatch(setActiveEditPageData(activeItems));
    setBannerData(activeItems[0].images);
    setActiveSettings(activeItems);
  }, []);

  const closeModal = () => {
    setOpen(false);
  };
  const handleImageSelect = (image) => {
    setBannerImg(image);
  };

  useEffect(() => {
    dispatch(setBannarImagePreview(bannerData1));
  }, [bannerData1]);

  const [menu, menuData] = React.useState("");

  const handleDeleteImage = async () => {
    const updatedBannerData = bannerData1.filter(
      (item, idx) => deleteImage !== idx
    );
    setShowImageOnEdit(updatedBannerData);
    setBannerData(updatedBannerData);
    setDeleteConfirmation(false);

    const response = await apiClient(
      `users/banner_setting/delete/${deleteImageId}/${activeItems[0]?.id}`,
      "get"
    );
    if (response.status == 200) {
      dispatch(BannerList());
      setDeleteConfirmation(false);
    }
  };

  const handlePageChange = (event: SelectChangeEvent) => {
    menuData(event.target.value);
    dispatch(setBannerPage(event.target.value));
  };

  const handleEditChange = (value, booleanValue) => {
    const val = booleanValue ? "on" : "off";
    setActiveSettings((prev) =>
      prev.map(
        (item) =>
          item.hasOwnProperty(value)
            ? { ...item, [value]: val } // Update the value if key exists
            : item // Otherwise, keep the item unchanged
      )
    );
  };

  const handleSaveSetting = async () => {
    if (buttonLoader) return;
    setButtonLoader(true);
    const formData = new FormData();
    bannerImage?.data
      ? bannerImage?.data
      : bannerImage.forEach((v: any) => {
        formData.append("images[]", v);
      });
    formData?.append("default_banner", isChecked == false ? "off" : "on");
    formData?.append("active_banner", activeSettings[0]?.active_banner);
    formData?.append("swap_banner", activeSettings[0]?.swap_banner);
    formData?.append("indicator_banner", activeSettings[0]?.indicator_banner);

    formData?.append("navigation_button", activeSettings[0]?.navigation_button);
    formData?.append(
      "nav_button_visible",
      activeSettings[0]?.nav_button_visible
    );
    formData?.append("full_height_hover", activeSettings[0]?.full_height_hover);
    formData?.append("page", activeEditPage);
    formData?.append("background_color", background_color);
    formData?.append("alt_tag", "");
    formData?.append("_method", "patch");
    try {
      let response = await apiClient(
        "users/banner_setting/update/" + Id,
        "post",
        {
          body: formData,
        },
        true
      );

      if (!bannerData1.length) {
        toast.error("Please upload images");
        setButtonLoader(false);
        return;
      }
      if (!toastShown && (response.status == 200 || response.status == true)) {
        toast.success("Banner data updated successfully");
        setToastShown(true);
      }

      dispatch(setBannerPage(activeEditPage));
      setTimeout(() => {
        dispatch(setNewBannerSlider(false));
        setMode("create");
        setToastShown(false);
        setButtonLoader(false);
      }, 3000);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      setButtonLoader(false);
    }
  };

  const [isChecked, setIsChecked] = useState(
    activeItems[0]?.default_banner === "on"
  );

  useEffect(() => {
    // activeItems[0]?.default_banner === "on"
    //   ? setIsChecked(true)
    //   : setIsChecked(false);
    dispatch(setId(activeItems[0]?.id));
  }, []);

  const handleChange = (e) => {
    dispatch(setDefaultBanner(!e));
    setIsChecked(e);
  };

  // useEffect(() => {
  //   bannerData1.forEach((value) => {
  //     setShowImageOnEdit((prevArray) => [...prevArray, value]);
  //   });
  // }, [bannerData1]);

  const handleUpload = async (values: any) => {
    const files = values?.target.files;
    if (files?.size > 204800) {
      toast.error("Banner Image size 200kb only");
      return;
    }
    //  else if (bannerImage?.length >= 5 || files.length > 5) {
    //   toast.error("Only 5 images allowed");
    //   return;
    // }
    else {
      let acceptedFiles = [];

      let count = 0;
      for (let i = 0; i < files.length; i++) {
        count++;
        acceptedFiles = [...files];
        if (convertSize(files[i]?.size, "MB") <= 0) {
          toast.error("Currepted images are not allowed", {
            autoClose: 3500,
          });
          return;
        }

        // files.forEach((element) => {
        //   element;
        // });
        if (count === files.length) {
          let Images = acceptedFiles.map((e, i) => ({
            src: URL.createObjectURL(e),
          }));
          if (bannerData1?.length <= 4) {
            setShowImageOnEdit((prev) => [...prev, { source: Images[0].src }]);
            setBannerImg([...bannerImg, ...Images]);
          } else {
            toast.error("Only 5 images allowed");
          }

          dispatch(setbannerFiles(acceptedFiles));
          if (bannerData1.length >= 5 == false) {
            dispatch(setBannerImages(acceptedFiles));
          }
        }
      }
    }
  };
  return (
    <>
      <div>
        {deleteConfirmation && (
          <DeleteDialog
            open={deleteConfirmation}
            handleClose={setDeleteConfirmation}
            text="Banner Image"
            onClickAction={handleDeleteImage}
          />
        )}
        <>
          <div>
            <Box sx={{ margin: "12px 0 0 12px" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#231f20",
                  fontWeight: "600",
                }}
              >
                {activeEditPage}
              </Typography>
            </Box>
          </div>
          <BoxforBanner>
            <ImagefordragNdrop
              setBannerImg={(image) => {
                setBannerData((prev) => {
                  return [...prev, { id: prev.length + 1, source: image }];
                });
              }}
              bannerImg={""}
              editImageContainerLength={bannerData1.length}
              showImageOnEditImages={bannerData1}
              setShowImageOnEdit={setBannerData}
            />
          </BoxforBanner>
        </>
        <Bannersubimages>
          {/* <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <Box> */}
          <Grid container spacing={2}>
            {bannerData1.map((item, index) => (
              <Grid item xs={12} sm={12} md={3} lg={3} key={index}>
                <div
                  style={{
                    position: "relative",
                    border: "1px solid #e0e0e0",
                    height: "200px",
                    backgroundColor: '#f4f6fa',
                  }}
                >
                  <img
                    src={
                      isArray(item.source) ? item.source[0].src : item.source
                    }
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    onClick={() =>
                      handleImageSelect(
                        isArray(item.source) ? item.source[0].src : item.source
                      )
                    }
                  />
                  <Box
                    onClick={() => {
                      setDeleteConfirmation(true), setDeleteImage(index);
                      setDeleteImageId(item.id);
                    }}
                    sx={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #d7282f",
                      cursor: "pointer",
                    }}
                  >
                    <DeleteOutlineOutlinedIcon
                      sx={{ color: "#d7282f", fontSize: "16px" }}
                    />
                  </Box>
                </div>
              </Grid>
            ))}
          </Grid>
          {/* </Box>
            </Grid> */}
          {/* <Grid item xs={12} md={3}>
              <Box
                sx={{
                  height: "200px",
                  backgroundColor: "#e0e0e0",
                  position: "relative",
                }}
              >
                <Button
                  component="label"
                  role="button"
                  variant="contained"
                  tabIndex={-1}
                  sx={{
                    backgroundColor: "#D7282F",
                    "&:hover": {
                      backgroundColor: "#D7282F",
                    },
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    minHeight: "50px",
                    minWidth: "50px",
                    borderRadius: "40px",
                    // "@media screen and (max-width: 768px)": {
                    //   height: "38px !important",
                    //   width: "94%",
                    // },
                  }}
                >
                  <CloudUploadIcon sx={{ fontSize: "20px" }} />
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => handleUpload(e)}
                  />
                </Button>
              </Box>
            </Grid> */}
          {/* </Grid> */}
        </Bannersubimages>
        <Bannersubimages>
          <>
            {" "}
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box display={"flex"} alignItems={"center"}>
                {/* {bannerImage?.length > 0 ? (
                  ""
                ) : (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "400",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <img src="/assets/images/clickicon.svg" alt="" />
                    Click and drag to change slide order
                  </Typography>
                )} */}
              </Box>
              {activeEditPageData.length > 0 ? (
                <Box>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="checkbox"
                          defaultChecked={isChecked}
                          checked={isChecked}
                          onChange={(e) => {
                            handleChange(e.target.checked);
                          }}
                        />
                      }
                      label="Use Merchant AD default Rolling Banner"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: "12px",
                          fontWeight: "400",
                        },
                        "& .Mui-checked": { color: "#D7282F !important" },
                      }}
                    />
                  </FormGroup>
                </Box>
              ) : (
                ""
              )}
            </Box>
            <BannerOptionEditBanner
              mode={mode}
              activeItems={activeSettings}
              handleEditChange={handleEditChange}
            />
            <PreviewModal open={open} closeModal={closeModal} mode={mode} />
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
                disabled={buttonLoader}
              >
                {buttonLoader ? (
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
                  <> {"Update"} </>
                )}
              </SaveBtn>
            </Box>
          </>
        </Bannersubimages>
      </div>
    </>
  );
};
export default EditBanner;
