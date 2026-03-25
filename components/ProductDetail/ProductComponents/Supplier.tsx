import React, { useEffect, useState } from "react";
import { FontContainer } from "@/components/ProductDetail/style";

import { BtnFilled } from "@/components/common/buttons/ButtonsVariations";
import { Alert, Stack, Typography } from "@mui/material";
import useAppContext from "@/hooks/useAppContext";
import {
  SupplierMessageContainer,
  SupplierContainer,
  LiveChat,
} from "@/components/ProductDetail/ProductComponents/Style";
import { apiClient } from "@/components/common/common";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Textarea from "@mui/joy/Textarea";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getTokenFromCookies } from "@/utils/cookieUtils";
import { showAlert } from "@/components/common/sweetAlert";
const Supplier = ({ handleClose = null }) => {
  const {
    id,
    seller_name,
    seller_image,
    seller_job_role,
    user_id,
    is_saved,
    user_id: userID,
    online,
  }: any = useSelector((state: any) => state.productDetail.detail.data);
  const [loading, setLoading] = useState<boolean>(false);
  const [saveSeller, setSaveSeller] = useState<boolean>(is_saved);
  const [showSaveButton, setShowSaveButton] = useState<boolean>(true);
  const [messageLoader, setMessageLoader] = useState<boolean>(false);
  const { breakPoints } = useAppContext();
  const router = useRouter();
  const {
    profileInfos,
    user_info: { id: currentlyLoggedInUserId },
  } = useSelector((state: any) => state.userData);
  useEffect(() => {
    setSaveSeller(is_saved);
  }, [is_saved]);
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string().required("Please enter a short description."),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (userID === currentlyLoggedInUserId) {
          const textToShow =
            "You can’t send messages to yourself ! <br> This view simulates how others see your store.";
          showAlert({
            userID: currentlyLoggedInUserId,
            minisiteUserID: userID,
            textContent: "",
            iconToShow: false,
            imageWidth: 80,
            styledTextHtml: `<span style="color: #231f20; font-size:18px;font-weight:500;">${
              textToShow ?? ""
            }</span>`,
          });
          return;
        }

        let response = await apiClient("front/getQuote/submit", "post", {
          body: {
            desc: values.message,
            seller_user_id: user_id,
            user_id: userID,
            product_id: id,
            enquiry_type: "quote",
            price_terms: "",
          },
        });

        if (response.status === 200) {
          resetForm({
            values: {
              message: "",
            },
          });
          toast.success("Message sent successfully");
        } else {
          toast.error(response.message);
        }

        if (handleClose) handleClose();
        setMessageLoader(false);
      } catch (error) {
        toast.error("An error occurred while submitting the form.");
      } finally {
        setSubmitting(false);
      }
    },
  });
  useEffect(() => {
    let id = JSON.parse(localStorage.getItem("userData"))?.id;
    if (id == user_id) {
      setShowSaveButton(false);
    }
  }, [user_id]);
  const SaveSupplier = async () => {
    try {
      let token = getTokenFromCookies();
      if (token) {
        setLoading(true);
        let response = await apiClient("front/save_seller_contact", "post", {
          body: { seller_id: user_id },
        });
        if (response.status === 200) {
          toast.success("contact saved successfully");
          setSaveSeller(true);
        } else {
          toast.error("something went wrong");
          setSaveSeller(false);
        }
        setLoading(false);
      } else {
        toast.error("Please Login");
      }
    } catch (err) {
      toast.error("Please Login");
    }
  };

  const renderAvailableStatus = () => {
    // const status =
    //   online === "inactive"
    //     ? "Not-Available"
    //     : online === "active"
    //     ? "Available"
    //     : "Busy";
    // const status =
    //   online === "inactive"
    //     ? "Not-Available"
    //     : online === "active"
    //     ? "Available"
    //     : "Busy";

    return (
      <>
        {online === "online" && <span></span>}
        Available
      </>
    );
  };

  return (
    <>
      <>
        <SupplierContainer className="Border">
          <Stack
            direction={{ xs: "row" }}
            justifyContent={{ xs: "flex-start" }}
            alignItems={{ xs: "center" }}
            spacing={{ xs: 1 }}
            className="Imageoutercontainer"
          >
            <Box className="hover-fx">
              <img
                src={seller_image}
                style={{ height: "30px", width: "30px", borderRadius: "50%" }}
              />
            </Box>
            <Stack justifyContent={{ xs: "flex-start" }}>
              <FontContainer
                sx={{
                  fontSize: "15px !important",
                  fontWeight: "600 !important",
                  color: "#000000 !important",
                  wordBreak: "break-all",
                  "@media screen and (max-width:380px)": {
                    fontSize: "12px",
                    fontWeight: "600",
                  },
                }}
              >
                {seller_name}
                {profileInfos?.jobDetails?.job_role}
              </FontContainer>
              <FontContainer
                sx={{
                  textTransform: "capitalize",
                  fontSize: "13px !important",
                  fontWeight: "500 !important",
                  color: "#223354",
                  "@media screen and (max-width:380px)": {
                    fontSize: "10px !important",
                    fontWeight: "600",
                  },
                }}
              >
                {seller_job_role}
              </FontContainer>
            </Stack>
          </Stack>

          <form onSubmit={formik.handleSubmit}>
            <Textarea
              placeholder="Write post short description here..."
              name="message"
              value={formik.values.message}
              maxRows={2}
              minRows={2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{
                width: "100%",
                mt: 1,
                border: "1px solid #d2d2d2",
                "&:hover": {
                  borderColor: "#000000",
                },
                "&:focus-within::before": {
                  boxShadow: "none",
                },
              }}
            />
            {formik.touched.message && formik.errors.message && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {formik.errors.message}
              </Alert>
            )}
            <SupplierMessageContainer>
              <BtnFilled
                className="pdpredbtn"
                disabled={messageLoader}
                height="32px"
                width="100%"
                type="submit"
              >
                {messageLoader ? (
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
                  "Send Message"
                )}
              </BtnFilled>
            </SupplierMessageContainer>
          </form>

          <LiveChat>
            <i className="icon-livechat">
              <span className="path1"></span>
              <span className="path2"></span>
            </i>
            <Box>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  lineHeight: "22px",
                  "& span": {
                    color: "#D82E34",
                  },
                }}
              >
                <span>Live</span> Chat
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  "& span": {
                    display: "block",
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#0AA133",
                    borderRadius: "100px",
                  },
                }}
              >
                {renderAvailableStatus()}
              </Typography>
            </Box>
          </LiveChat>
        </SupplierContainer>
      </>
    </>
  );
};
export default Supplier;
