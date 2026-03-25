import {
  Box,
  Typography,
  Grid,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  AddsliderBtn,
  Bannersubimages,
  BoxforBanner,
  NameAndIcons,
  PreviewBtn,
  SaveBtn,
  SliderAbsoluteBox,
  SliderListBox,
  SliderListHeading,
  SliderName1,
  SliderRelativeBox,
} from "../Subdomainstyle";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BannerList,
  BannerSetting,
  setActivateBanner,
  setBannerImages,
  setBannerPage,
  setButtonInvisible,
  setButtonVisible,
  setCycleNav,
  setDefaultBanner,
  setFullHeightHover,
  setIndicators,
  setSwipe,
  setNewBannerSlider,
  setActiveEditPageIndex,
  setActiveEditPage,
  setBannerMode,
  setIsBannerPageSelected,
  setActiveEditPageData,
  setbannerFiles,
} from "@/hooks/sellerSubaccount";
import { apiClient } from "@/components/common/common";
import { toast } from "react-toastify";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import CreateEditBanner from "./CreateEditBanner";
import EditBanner from "./EditBanner";
const SliderListing = () => {
  const {
    bannerImage,
    bannerData,
    fullHeightHover,
    newBannerSlider,
    activeEditPageIndex,
    activeEditPage,
    isBannerPageSelected,
    bannerPage,
    activeEditPageData,
  } = useSelector((state: any) => state.subseller);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [bannerId, setBannerId] = useState("");
  const [addNewBanner, setNewBanner] = useState(false);
  const [mode, setMode] = useState<string>("create");
  const { role } = useSelector((state: any) => state.userData);

  const dispatch = useDispatch();
  const [id, setId] = useState("");

  useEffect(() => {
    dispatch(BannerList());
  }, [dispatch]);

  useEffect(() => {
    setNewBanner(newBannerSlider);
  }, [newBannerSlider]);

  useEffect(() => {
    dispatch(BannerList());
    if (newBannerSlider === false) {
      dispatch(setIsBannerPageSelected(false));
    }
  }, [addNewBanner]);

  useEffect(() => {
    if (!addNewBanner) {
      dispatch(
        BannerSetting({ data: bannerImage, isActive: isBannerPageSelected })
      );
      dispatch(
        setBannerImages({
          delete: 1,
          data: [],
        })
      );
      dispatch(setBannerPage([]));
      dispatch(setCycleNav(""));
      dispatch(setButtonVisible(""));
      dispatch(setButtonInvisible(""));
      dispatch(setIndicators(""));
      dispatch(setSwipe(""));
      dispatch(setActivateBanner(""));
      dispatch(setFullHeightHover(""));
    }
  }, [addNewBanner]);

  const handleChange = (event) => {
    dispatch(setDefaultBanner(event.target.checked));
  };
  const handleDelete = async () => {
    const response = await apiClient(
      "users/banner_setting/delete/0/" + bannerId,
      "get"
    );

    if (response.status == 200) {
      toast.success("Banner deleted sucessfully");
      dispatch(BannerList());
      setDeleteConfirmation(false);
    }
  };
  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  const permissions =
    storedSubSellerList && storedSubSellerList.length > 0
      ? storedSubSellerList[0]
      : null;
  return (
    <>
      {deleteConfirmation && (
        <DeleteDialog
          open={deleteConfirmation}
          handleClose={setDeleteConfirmation}
          text="Banner"
          onClickAction={handleDelete}
        />
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: `${
            addNewBanner && bannerData.length > 0 ? "flex-end" : "space-between"
          }`,
          borderBottom: "1px solid #ddd",
          padding: "12px 0 10px 0",
        }}
      >
        {addNewBanner
          ? ""
          : bannerData.length > 0 && (
              <SliderListHeading>List Of Sliders</SliderListHeading>
            )}

        {addNewBanner ? (
          <Box sx={{}}>
            <AddsliderBtn
              onClick={() => {
                dispatch(setbannerFiles({ change: true, data: [] }));
                setNewBanner(false);
                setMode("create");
                dispatch(setNewBannerSlider(false));
                dispatch(setIsBannerPageSelected(false));
              }}
            >
              Cancel Slider
            </AddsliderBtn>
          </Box>
        ) : (
          bannerData.length > 0 && (
            <Box>
              {(role == "seller" ||
                (role == "subuser" &&
                  permissions?.manage_banner?.add == true)) && (
                <AddsliderBtn
                  onClick={() => {
                    // setNewBanner(true);
                    setMode("create");
                    dispatch(setNewBannerSlider(true));
                    dispatch(setbannerFiles({ change: true, data: [] }));
                  }}
                >
                  Add New Slider
                </AddsliderBtn>
              )}
            </Box>
          )
        )}
      </Box>
      {!addNewBanner && bannerData.length > 0 ? (
        <SliderListBox>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          ></Box>
          <Box sx={{ margin: "12px 0 0 0" }}>
            <Grid container spacing={2}>
              {bannerData.map((banner, index) => (
                <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
                  <Box
                    sx={{
                      boxShadow: "0px 2px 2px 0px #9FA2BF52",
                      borderRadius: "6px",
                      background:'#'
                    }}
                  >
                    <SliderRelativeBox>
                      <Box sx={{ height: "205.7px", maxHeight: "205.7px",borderRadius:'4px',overflow:'hidden',background:'#f4f6fa' }}>
                        <img
                          src={banner.images[0]?.source}
                          alt=""
                          style={{
                            width: "100%",
                            objectFit: "contain",
                            height: "100%",
                          }}
                        />
                      </Box>
                    </SliderRelativeBox>
                    <SliderAbsoluteBox>
                      <NameAndIcons>
                        <Box>
                          <SliderName1>{banner.page}</SliderName1>
                        </Box>
                        <Box sx={{ display: "flex", gap: "8px" }}>
                          {(role == "seller" ||
                            (role == "subuser" &&
                              permissions?.manage_banner?.edit == true)) && (
                            <CreateOutlinedIcon
                              onClick={() => {
                                // setNewBanner(true);
                                setMode("edit");
                                dispatch(setBannerMode("edit"));
                                dispatch(setNewBannerSlider(true));
                                dispatch(setActiveEditPageIndex(index));
                                dispatch(setActiveEditPage(banner.page));
                              }}
                              sx={{
                                fontSize: "18px",
                                color: "#00AF6A",
                                cursor: "pointer",
                              }}
                            />
                          )}
                          <Box
                            sx={{
                              width: "1px",
                              height: "18px",
                              backgroundColor: "#CBCBCB",
                            }}
                          ></Box>
                          {(role == "seller" ||
                            (role == "subuser" &&
                              permissions?.manage_banner?.delete == true)) && (
                            <DeleteOutlineOutlinedIcon
                              onClick={() => {
                                setDeleteConfirmation(true);
                                setBannerId(banner.id);
                              }}
                              sx={{
                                fontSize: "18px",
                                color: "#D7282F",
                                cursor: "pointer",
                              }}
                            />
                          )}
                        </Box>
                      </NameAndIcons>
                    </SliderAbsoluteBox>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </SliderListBox>
      ) : mode === "create" ? (
        <CreateEditBanner mode={mode} />
      ) : (
        <EditBanner mode={mode} setMode={setMode} />
      )}
    </>
  );
};
export default SliderListing;
