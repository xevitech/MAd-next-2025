import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { apiClient } from "@/components/common/common";
import {
  BannerList,
  BannerSetting,
  setBannerPage,
  setDefaultBanner,
  setBannarImagePreview,
  setNewBannerSlider,
  setBannerImages,
  setIsBannerPageSelected,
  setbannerFiles,
} from "@/hooks/sellerSubaccount";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BannerspacewithSelect from "./BannerspacewithSelect";
import {
  Bannersubimages,
  BoxforBanner,
  PreviewBtn,
  SaveBtn,
} from "../Subdomainstyle";
import ImagefordragNdrop from "./ImagefordragNdrop";
import EmptyPage from "@/components/common/EmptyPage";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BannerOptions from "./BannerOptions";
import SavePreviewbuttons from "./SavePreviewbuttons";
import PreviewModal from "./PreviewModal";
import { ThreeDots } from "react-loader-spinner";
import FormControl from "@mui/material/FormControl";
import { setMenuItem } from "@/hooks/LeadsReducer";

const CreateEditBanner = (mode) => {
  const dispatch = useDispatch();
  const [id, setId] = useState<any>("");
  const [bannerImg, setBannerImg] = useState<any>([]);
  const {
    bannerImage,
    defaultBanner,
    page,
    bannerData,
    addBanner,
    threeDotLoader,
    newBannerSlider,
    isBannerPageSelected,
    bannerFiles,
  } = useSelector((state: any) => state.subseller);
  const [bannerData1, setBannerData] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteImage, setDeleteImage] = useState<any>({});
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [deletingIndex, setDeletingIndex] = useState(null);

  const closeModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (mode === "create") {
      dispatch(BannerList());
      setBannerData(null);
      setMenuItem("");
      dispatch(setDefaultBanner(false));
    }
  }, []);
  const handleImageSelect = (image) => {
    setBannerImg(image);
  };

  useEffect(() => {
    dispatch(setBannarImagePreview(bannerData1));
  }, [bannerData1]);

  const [menu, menuData] = React.useState("");

  if (menu !== "") {
    dispatch(setIsBannerPageSelected(true));
  }

  const handleDeleteImage = (index) => {
    const updatedBannerData = [...bannerData1];
    updatedBannerData.splice(deleteImage?.index, 1);
    const deleteBannerImage = Array.isArray(bannerImage)
      ? bannerImage?.filter((items, index) => deleteImage?.index !== index)
      : [];
    dispatch(
      setBannerImages({
        delete: 1,
        data: deleteBannerImage,
      })
    );
    // if (deleteImage?.fileIndex) {
    const updatedFiles = bannerFiles?.filter(
      (bannerFile, indexValue) => deletingIndex !== indexValue
    );
    dispatch(setbannerFiles({ change: true, data: updatedFiles }));
    // }
    setBannerData(updatedBannerData);
    setDeleteConfirmation(false);
  };

  const handlePageChange = (event: SelectChangeEvent) => {
    menuData(event.target.value);
    dispatch(setBannerPage(event.target.value));
    setError("");
  };
  const handleSaveSetting = () => {
    if (!menu) {
      setError("Please select banner page");
      toast.error("Please select banner page");
      return;
    }
    if (!bannerData1.length) {
      toast.error("Please upload images");
      return;
    }
    dispatch(
      setBannerImages({
        delete: 1,
        data: [],
      })
    );
    dispatch(
      BannerSetting({
        data: bannerData1,
        isActive: isBannerPageSelected,
      })
    );
    setTimeout(() => {
      dispatch(setbannerFiles({ change: true, data: [] }));
      dispatch(setNewBannerSlider(false));
      dispatch(BannerList());
    }, 3000);
  };
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (isCheckedValue) => {
    setIsChecked((prevChecked) => !prevChecked);
    dispatch(setDefaultBanner(isCheckedValue));
  };
  return (
    <>
      {mode == "create" ? (
        ""
      ) : (
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
            {bannerData1.length > 0 && (
              <div>
                <Box>
                  <FormControl sx={{ width: "20%", mt: 3 }} error={!!error}>
                    <Select
                      size="small"
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={menu}
                      onChange={handlePageChange}
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <p style={{ color: "#bcbcbc", fontSize: "14px" }}>
                              Select Page
                            </p>
                          );
                        }
                        return selected;
                      }}
                    >
                      <MenuItem
                        value={"Home"}
                        disabled={
                          bannerData &&
                          bannerData?.some((item) => item.page === "Home")
                        }
                      >
                        Home
                      </MenuItem>
                      <MenuItem
                        value={"Products"}
                        disabled={
                          bannerData &&
                          bannerData?.some((item) => item.page === "Products")
                        }
                      >
                        Products
                      </MenuItem>
                      <MenuItem
                        value={"Review"}
                        disabled={
                          bannerData &&
                          bannerData?.some((item) => item.page === "Review")
                        }
                      >
                        Review
                      </MenuItem>
                      <MenuItem
                        value={"Company Profile"}
                        disabled={
                          bannerData &&
                          bannerData?.some(
                            (item) => item.page === "Company Profile"
                          )
                        }
                      >
                        Company Profile
                      </MenuItem>
                      <MenuItem
                        value={"Certificates"}
                        disabled={
                          bannerData &&
                          bannerData?.some(
                            (item) => item.page === "Certificates"
                          )
                        }
                      >
                        Certificates
                      </MenuItem>
                      <MenuItem
                        value={"Factory Tour"}
                        disabled={
                          bannerData &&
                          bannerData?.some(
                            (item) => item.page === "Factory Tour"
                          )
                        }
                      >
                        Factory Tour
                      </MenuItem>
                      <MenuItem
                        value={"R&D Management"}
                        disabled={
                          bannerData &&
                          bannerData?.some(
                            (item) => item.page === "R&D Management"
                          )
                        }
                      >
                        R&D Management
                      </MenuItem>
                    </Select>
                    {error && <FormHelperText>{error}</FormHelperText>}
                  </FormControl>
                </Box>
              </div>
            )}
            <BoxforBanner>
              <ImagefordragNdrop
                setBannerImg={(image) => {
                  setBannerData((prev) => {
                    return [...prev, { id: prev.length + 1, source: image }];
                  });
                }}
                bannerImg={""}
                editImageContainerLength={0}
                showImageOnEditImages={bannerData1}
                setShowImageOnEdit={setBannerData}
              />
            </BoxforBanner>
          </>
          <Box
            sx={{
              marginTop: "35px",
              border: "1px solid #EAEAEA",
              borderRadius: "5px",
              width: "100%",

              padding: "15px 15px 10px 15px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box>
                  <Grid container spacing={2}>
                    {bannerData1?.map((item, index) => (
                      <Grid item xs={12} sm={12} md={3} lg={3} key={index}>
                        <div style={{ position: "relative", height: "200px" }}>
                          <img
                            src={
                              item?.source[0]?.src
                                ? item?.source[0]?.src
                                : URL.createObjectURL(item)
                            }
                            alt=""
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            onClick={() =>
                              handleImageSelect(item.source[0].src)
                            }
                          />
                          <Box
                            onClick={() => {
                              setDeleteConfirmation(true),
                                setDeletingIndex(index);
                              setDeleteImage({
                                fileIndex: item?.source[0]?.indexValue,
                                index,
                              });
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
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                fontWeight: "400",
                color: "#231F20",
              }}
            >
              <Box>Click and drag to change slide order</Box>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="checkbox"
                      checked={isChecked}
                      onChange={(e) => handleChange(e.target.checked)}
                    />
                  }
                  label="Use Powercozmo default Rolling Banner"
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
          </Box>
          <Bannersubimages>
            {bannerData1.length > 0 && (
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
                  <Box></Box>
                </Box>
                <BannerOptions mode={mode} />
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
                      <> {"Save"}</>
                    )}
                  </SaveBtn>
                </Box>
              </>
            )}
          </Bannersubimages>
        </div>
      )}
    </>
  );
};
export default CreateEditBanner;
