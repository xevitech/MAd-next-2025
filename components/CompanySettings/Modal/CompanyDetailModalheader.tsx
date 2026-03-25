import { Box, Button, Skeleton, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  NoFollowers,
  Modalcontent,
  ImageNtext,
  Modaltext1,
  Subtext,
  FollowButton,
} from "../style";
import { apiClient } from "@/components/common/common";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { setHeaderData } from "@/hooks/miniSite";
import { useRouter } from "next/router";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    "@media screen and (max-width: 767px)": {
      width: "100%",
    },
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "@media screen and (max-width: 767px)": {
    "& .MuiDialog-paper": {
      width: "100%",
    },
  },
}));

const RedSaveButton: any = styled(Button)(({ breakPoints }: any) => ({
  backgroundColor: "#fff",
  color: "#DD484E",
  height: "30px",
  textTransform: "none",
  padding: breakPoints?.max600px
    ? "0px 15px 0px 15px"
    : breakPoints?.max1460px
    ? "0px 6px 0px 6px"
    : "0px 15px 0px 15px",
  border: "1px solid #DD484E",
  minWidth: "78px",
  transition: "all ease .3s",
  "&:hover": {
    backgroundColor: "#DD484E",
    color: "#fff",
    transition: "all ease .3s",
  },
  "@media screen and (max-width: 1600px)": { padding: "0px 6px 0px 6px" },
  "@media screen and (max-width: 1400px)": {
    minWidth: "55px",
    height: "25px",
    fontSize: "12px",
  },
}));

export default function FollowerListModal({
  handleClose,
  followerList,
  loadMoreData,
  followerCount,
  setFollowerList,
  open,
  buttonLoader,
  setFollowerCount,
  dataLoader = false,
}) {
  const [removeLoader, setRemoveLoader] = useState<number>(-1);
  const dispatch = useAppDispatch();
  const { userInfo, headerData } = useSelector(
    (state: any) => state.miniSite
  );

  const RemoveFollowers = async (item: any, index: number) => {
    setRemoveLoader(index);

    let post = {};
    if (router.pathname == "/companySettings/companyDetails") {
      let userData = JSON.parse(localStorage.userData);
      post = {
        shop_id: userData?.id,
        user_id: item?.id,
      };
    } else {
      post = {
        shop_id: userInfo?.basic_information?.user_id,
        user_id: item?.id,
      };
    }

    let response = await apiClient("front/shops/like_unlike", "post", {
      body: post,
    });
    if (response.status === 200) {
      const removedData = [...followerList];
      removedData.splice(index, 1);
      setFollowerList(removedData);
      setFollowerCount((prev) => prev - 1);
      if (router.pathname != "/companySettings/companyDetails") {
        dispatch(
          setHeaderData({
            ...headerData,
            basic_information: {
              ...headerData.basic_information,
              like_count: response.total_followers,
              user_liked: false,
            },
          })
        );
      }
    }

    setRemoveLoader(-1);
  };
  const userData = JSON.parse(localStorage.getItem("userData"));
  const router = useRouter();

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Followers({followerCount})
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 12,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon sx={{ color: "#d7282f" }} />
        </IconButton>
        <DialogContent
          dividers
          sx={{ width: "500px", padding: "8px 16px 16px 16px !important" }}
        >
          <>
            {dataLoader ? (
              <Box
                sx={{
                  padding: "16px",
                  border: "1px solid #E9EBEE",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <Box>
                    <Skeleton
                      variant="circular"
                      animation="wave"
                      height={40}
                      width={40}
                    />
                  </Box>
                  <Box sx={{}}>
                    <Skeleton variant="text" animation="wave" width={90} />
                    <Skeleton variant="text" animation="wave" width={90} />
                  </Box>
                </Box>
                <Box>
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    height={40}
                    width={60} 
                  />
                </Box>
              </Box>
            ) : followerCount == 0 ? (
              <>
                <NoFollowers>
                  <i className="icon-follower"></i>
                  <Typography variant="h4">No followers</Typography>
                  <Typography>You have not listed any followers</Typography>
                </NoFollowers>
              </>
            ) : (
              followerList?.map((item: any, index) => {
                return (
                  <Modalcontent key={item.followeID} 
                 >
                    {/* <ImageNtext  onClick={()=>{
                    window.open(`/mini-site/${item?.company_name}/home`, "_blank");
                  }
                  }> */}
                    <ImageNtext>
                    
                      <Box>
                        <img
                          src={
                            item?.file_name == ""
                              ? "/assets/companyDetailmodal.svg"
                              : item?.file_name
                          }
                          alt=""
                          style={{
                            border: "2px solid #E0E3E7",
                            borderRadius: "50px",
                            width: "42px",
                            height: "42px",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                      <Box sx={{ ml: 1.5, cursor: "pointer" }}> 
                        <Modaltext1>{item.name}</Modaltext1>
                        <Subtext>
                          {item.job_role !== null
                            ? item.job_role
                            : "independent"}
                        </Subtext>
                      </Box>
                    </ImageNtext>

                    {(router.pathname == "/companySettings/companyDetails" ||
                      userData?.id == userInfo?.basic_information?.user_id) && (
                      <Box>
                        <FollowButton
                          disabled={index == removeLoader}
                          onClick={() => RemoveFollowers(item, index)}
                        >
                          {index == removeLoader ? (
                            <ThreeDots
                              height="18"
                              width="40"
                              radius="9"
                              color="white"
                              ariaLabel="three-dots-loading"
                              wrapperStyle={{}}
                              visible={true}
                            />
                          ) : (
                            "Remove Follower"
                          )}
                        </FollowButton>
                      </Box>
                    )}
                  </Modalcontent>
                );
              })
            )}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {followerCount > followerList.length && (
                <>
                  <RedSaveButton
                    onClick={() => loadMoreData()}
                    disabled={buttonLoader}
                  >
                    {buttonLoader ? (
                      <ThreeDots
                        height="18"
                        width="40"
                        radius="9"
                        color="#d7282f"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                      />
                    ) : (
                      "Load More"
                    )}
                  </RedSaveButton>
                </>
              )}
            </Box>
          </>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
