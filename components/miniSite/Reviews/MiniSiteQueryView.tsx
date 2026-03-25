import { CertificateOuter } from "../CertificatesHome/Certificate.styled";
import {
  Grid,
  Box,
  Stack,
  Typography,
  TextField,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material";

import {
  EmailSubmitButton,
  PopoverList,
  ReviewHeadingsm,
} from "./Review.Styled";
import React, { useState } from "react";
import ReviewPopover, { HtmlTooltip } from "./ReviewPopover";
import { apiClient } from "@/components/common/common";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import Image from "next/image";

function MiniSiteQueryView({
  heading = true,
  handleClose = null,
  type = null,
}) {
  const [sameUserError, setSameUserError] = useState(false);
  const { headerData } = useSelector((state: any) => state.miniSite);
  let user_id = JSON.parse(localStorage.getItem("userData"))?.id;
  const validation = Yup.object().shape({
    message: Yup.string()
      .min(20, "Please enter minimum 20 characters")
      .max(2000, "Maximum limit reached!")
      .required("Please enter message"),
  });

  let formik = useFormik({
    validationSchema: validation,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      message: "",
      loader: false,
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    formik.setFieldValue("loader", true);
    const { message } = values;
    setSameUserError(false);
    const sendQuery = async () => {
      let response = await apiClient("front/getQueryMiniSite/submit", "post", {
        body: {
          message: message,
          seller_user_id: headerData?.user_id,
          subject: "minisite_query",
          user_id: user_id,
        },
      });
      if (response.status === 200) {
        if (type) {
          toast.success("Enquiry sent successfully");
        } else {
          toast.success(response.message);
        }
        if (!heading) handleClose(false);
      } else {
        toast.error(response.message);
      }
      formik.setFieldValue("loader", false);
    };
    sendQuery();
    //   }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (value.length <= 2000) {
      formik.setFieldValue("message", e.target.value);
      formik.setFieldError("message", "");
    } else {
      formik.setFieldError("message", "Maximum limit reached!");
      formik.setFieldValue("message", e.target.value);
    }
  };

  return (
    <CertificateOuter>
      <form onSubmit={formik.handleSubmit}>
        <CertificateOuter p={{ xs: 1.5 }}>
          {heading && (
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="baseline"
                  spacing={{ xs: 1 }}
                >
                  <ReviewHeadingsm variant="h2">
                    Email to this supplier{" "}
                  </ReviewHeadingsm>
                </Stack>
              </Stack>
            </Box>
          )}

          <Box sx={{ padding: "10px 0 10px" }}>
            <Grid container spacing={{ xs: 1, md: 1, lg: 1 }}>
              <Grid item xs={12} sm={12} md={12}>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <TextField
                      className="RequestTextField"
                      id="outlined-multiline-static"
                      placeholder="Enter Your Message"
                      label={
                        <Box>
                          <HtmlTooltip
                            placement="right"
                            title={
                              <Box>
                                <Box
                                  sx={{
                                    borderRadius: "11px 11px 0px 0px",
                                    backgroundColor: "#F0F3F8",
                                    padding: "0px 14px",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      padding: "4px",
                                      fontSize: "12px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    For Better Quotations include:
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    padding: "0px",
                                    backgroundColor: "#fff",
                                  }}
                                >
                                  <PopoverList>
                                    <ListItem>
                                      <ListItemText primary="> Special Requests" />
                                    </ListItem>
                                    <ListItem>
                                      <ListItemText primary="> A self introduction" />
                                    </ListItem>
                                  </PopoverList>
                                </Box>
                              </Box>
                            }
                          >
                            <p>
                              Detailed requirements
                              {
                                <span
                                  style={{
                                    display: "inline-block",
                                    position: "relative",
                                    width: "16px",
                                    height: "16px",
                                    marginLeft: "8px",
                                  }}
                                >
                                  <Image
                                    src={"/assets/helpIcon.svg"}
                                    layout="fill"
                                    alt="image"
                                  />{" "}
                                </span>
                              }
                            </p>
                          </HtmlTooltip>
                        </Box>
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      multiline
                      fullWidth
                      rows={5}
                      value={formik.values.message}
                      onChange={handleChange}
                      helperText={formik.errors.message}
                      error={formik.errors.message ? true : false}
                    />

                    <ReviewPopover />
                  </Grid>
                  <Typography
                    style={{
                      fontSize: "12px",
                      width: "100%",
                      marginTop: "5px",
                      color: "#6C6C6C",
                    }}
                  >
                    Maximum Characters: {formik.values.message.length}/2000
                  </Typography>
                </Grid>
              </Grid>

              {sameUserError && (
                <Grid item xs={8}>
                  <Alert severity="error">
                    You can't get enquiry of your products.
                  </Alert>
                </Grid>
              )}

              <Grid item xs={sameUserError ? 4 : 12}>
                <Box textAlign="right">
                  <EmailSubmitButton
                    type="submit"
                    sx={{ padding: "4px 12px !important" }}
                  >
                    {formik.values.loader ? (
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
                      "Send a Query"
                    )}
                  </EmailSubmitButton>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CertificateOuter>
      </form>
    </CertificateOuter>
  );
}

export default MiniSiteQueryView;
