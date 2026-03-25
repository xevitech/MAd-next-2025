import { CertificateOuter } from "../CertificatesHome/Certificate.styled";
import {
  Grid,
  Box,
  Stack,
  Typography,
  TextField,
  ListItem,
  ListItemText,
  Avatar,
  Alert,
  styled,
  Button,
} from "@mui/material";
import {
  EmailSubmitButton,
  PopoverList,
  ReviewHeadingsm,
} from "./Review.Styled";
import React, { useState } from "react";
import ReviewPopover, { HtmlTooltip } from "./ReviewPopover";
import { apiClient, randomStr } from "@/components/common/common";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import Image from "next/image";
import {
  AddAttachmntSec,
  ProductQuoteProfileInfo,
  QuoteuantityBox,
  QuoteuantityBoxInn,
} from "@/components/ProductDetail/ProductComponents/Modal/style";
import { createHistory } from "@/hooks/UseCreateFormData";
import { useAppDispatch } from "redux/store";
import {
  AttachmentBox,
  AttachmentName,
  AttachmentOuter,
} from "@/components/guestLayout/landingPage/styles";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { values } from "lodash";
import HelperText from "@/components/CompanySettings/CompanyDetail/Common/helperText";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
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
});
const QuoteProfileImage = styled(Box)({
  border: "1px solid #ddd",
  padding: "5px",
});

function ReviewEmailSupplier({
  heading = true,
  handleClose = null,
  type = null,
}) {
  const { userInfo } = useSelector((state: any) => state.miniSite);
  const { query }: any = useRouter();
  const productId: string = query?.id ? query?.id : query?.Id;
  const { minisiteUserID } = useSelector((state: any) => state.miniSite);
  const { ipAddress } = useSelector((state: any) => state.userData);
  const data: any = useSelector(
    (state: any) => state.productDetail.detail.data
  );
  const [sameUserError, setSameUserError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [filePreviews, setFilePreviews] = useState([]);

  const validation = Yup.object().shape({
    quantity: Yup.number()
      .min(1, "Quantity must be at least 1")
      .max(9999, "Quantity cannot exceed 9999")
      .required("Quantity is required"),
    product: Yup.string().required("Product is required"),
    message: Yup.string()
      // .min(20, "Please enter minimum 20 characters")
      .max(2000, "Maximum limit reached!")
      .required("Please enter message"),
    attachment: Yup.array()
      .min(1, "Please upload atleast one image/file")
      .max(3, "Please upload maximum 3 images")
      .required("Please upload a image"),
  });

  let formik = useFormik({
    validationSchema: validation,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      message: "",
      subject: "",
      quantity: "",
      product: "",
      loader: false,
      attachment: [],
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<any>("");

  const QuantityHandler = (e) => {
    const input = e.target.value.replace(/\D/g, "");

    if (input.length > 4) {
      return;
    }

    if (input === "") {
      formik.setFieldValue("quantity", "");
      formik.setFieldError("quantity", "Quantity is required");
      setQuantity("");
      return;
    }

    if (/^\d+$/.test(input) && parseInt(input) > 0) {
      formik.setFieldValue("quantity", input);
      formik.setFieldError("quantity", "");
      setQuantity(input);
    } else {
      formik.setFieldValue("quantity", input);
      formik.setFieldError("quantity", "Invalid quantity");
      setQuantity(input);
    }
  };

  const handleSubmit = async (values) => {
    const { message, subject, quantity } = values;

    formik.setFieldValue("loader", true);

    let id = localStorage?.userData
      ? JSON.parse(localStorage?.userData).id
      : "";
    if (!quantity) {
      formik.setFieldError("quantity", "Please enter quantity");
      return;
    }
    if (data?.user_id == id) {
      setSameUserError(true);
      formik.setFieldValue("loader", false);
      return;
    }
    setSameUserError(false);

    const sendQuery = async () => {
      let formData = new FormData();
      formData.append("message", message);
      formData.append("price_term", data?.price_term || "");
      formData.append("product_id", data.id || "");
      formData.append("enquiry_user_id", id || "");
      formData.append("seller_user_id", data?.user_id || "");
      formData.append("unique_session_id", randomStr());
      formData.append("product_name", values?.product || "");
      formData.append(
        "total_price",
        String(+data.unit_price ? +data.unit_price * quantity : 0)
      );
      formData.append("ip", ipAddress || "");
      formData.append("quantity", quantity);
      formData.append("type", data.product_type || "");
      formData.append("price", data.unit_price || "");

      if (values.attachment) {
        if (Array.isArray(values.attachment)) {
          values.attachment.forEach((file) =>
            formData.append("attachment[]", file)
          );
        }
      }
      try {
        let response = await apiClient(
          "front/getQuery/submit",
          "post",
          {
            body: formData,
          },
          true
        );
        if (response.status === 200) {
          if (type) {
            toast.success("Enquiry sent successfully");
            dispatch(
              createHistory({
                lead_id: response?.lead_id,
                type_id: 1,
                name: "Lead",
                type: "info",
                message: `<span>Lead Created</span>`,
              })
            );
          } else {
            toast.error(response.message);
          }
          if (!heading) handleClose(false);
        } else if (response.status == false) {
          setLoginError(true);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error", error);
      } finally {
        formik.setFieldValue("loader", false);
      }
    };
    sendQuery();
  };

  const addFiles = (e: any) => {
    const newFiles = Array.from(e.target.files);
    const currentFiles = formik.values.attachment || [];
    const totalFiles = currentFiles.length + newFiles.length;

    const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png"];
    const allowedDocTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    const maxFileSizeMB = 10;
    const maxImageSizeMB = 2;

    const convertSize = (size: number) => size / (1024 * 1024);

    const showError = (message: string) => {
      formik.setFieldError("attachment", message);
      formik.setFieldTouched("attachment", true);
      setTimeout(() => {
        formik.setFieldError("attachment", "");
      }, 2000);
    };

    if (totalFiles > 3) {
      showError("Please upload a maximum of 3 files (images, docs, or videos)");
      return;
    }

    const invalidFiles = newFiles.filter(
      (file: File) =>
        ![...allowedImageTypes, ...allowedDocTypes].includes(file.type)
    );
    if (invalidFiles.length > 0) {
      showError("Allowed file types: JPG, JPEG, PNG, PDF, Word, Excel");
      return;
    }

    const oversizedFiles = newFiles.filter(
      (file: File) => convertSize(file.size) > maxFileSizeMB
    );
    if (oversizedFiles.length > 0) {
      showError(`File must be less than ${maxFileSizeMB} MB`);
      return;
    }

    const oversizedImages = newFiles.filter(
      (file: File) =>
        allowedImageTypes.includes(file.type) &&
        convertSize(file.size) > maxImageSizeMB
    );
    if (oversizedImages.length > 0) {
      showError(`Image must be less than ${maxImageSizeMB} MB`);
      return;
    }

    const updatedFiles = [...currentFiles, ...newFiles];
    formik.setFieldValue("attachment", updatedFiles);
    if (updatedFiles.length > 0) {
      formik.setFieldError("attachment", "");
    }
    setFilePreviews(updatedFiles);
  };

  const handleRemoveAttachment = (index) => {
    setFilePreviews((prev) => {
      const updatedPreviews = prev.filter((_, i) => i !== index);
      return updatedPreviews;
    });
    const filterAttachment = formik.values.attachment.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("attachment", filterAttachment || []);
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

  const Units = useSelector((state: any) => state.productDetail.unit);

  const checkUnit = () => {
    if (data?.is_placeholder === "yes") {
      return (
        data?.product_type === "simple" &&
        data?.availability === "in_stock" &&
        data?.price_type === "quantity"
      );
    } else {
      return (
        data?.product_type === "simple" &&
        data?.availability === "in_stock" &&
        data?.price_type === "quantity"
      );
    }
  };
  return (
    <CertificateOuter>
      <form onSubmit={formik.handleSubmit}>
        <CertificateOuter p={{ xs: 2 }}>
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
          <Box
            sx={{
              height: "350px",
              overflowY: "auto",
              padding:'0 10px 0 0',
              "&::-webkit-scrollbar": {
                width: "0.2em",
                height: "0.2em",
              },
              "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#dedede",
                borderRadius: "4px",
              },
            }}
          >
            <Grid container spacing={2} alignItems={"center"}>
              <Grid item xs={12}>
                <ProductQuoteProfileInfo>
                  <QuoteProfileImage>
                    <Avatar
                      alt={data?.name}
                      src={
                        data?.photos?.[0]?.file_name
                          ? data?.photos?.[0]?.file_name
                          : data?.main_image
                      }
                    />
                  </QuoteProfileImage>
                  <Typography>{data?.name}</Typography>
                </ProductQuoteProfileInfo>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <QuoteuantityBox sx={{ display: "block", width: "100%" }}>
                  <Typography>Required Product</Typography>
                  <QuoteuantityBoxInn>
                    <TextField
                      placeholder="Enter Product Name"
                      id="outlined-size-small"
                      size="small"
                      sx={{ width: "100% !important" }}
                      value={formik.values.product}
                      onChange={(e) => {
                        formik.setFieldValue("product", e.target.value);
                        formik.setFieldError("product", "");
                      }}
                      error={formik.errors.product ? true : false}
                      helperText={
                        formik?.errors?.product ? formik?.errors?.product : " "
                      }
                    />
                  </QuoteuantityBoxInn>
                </QuoteuantityBox>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <QuoteuantityBox sx={{ display: "block", width: "100%" }}>
                  <Typography>Quantity</Typography>
                  <QuoteuantityBoxInn
                    sx={{
                      alignItems: `${
                        formik.errors.quantity ? "baseline" : "center"
                      }`,
                      width: "100%",
                    }}
                  >
                    <TextField
                      placeholder="Enter Quantity"
                      id="outlined-size-small"
                      size="small"
                      sx={{ width: "100% !important" }}
                      // type="number"
                      InputProps={{
                        inputProps: {
                          min: 0,
                        },
                      }}
                      value={quantity}
                      onChange={(e) => {
                        QuantityHandler(e);
                      }}
                      error={formik.errors.quantity ? true : false}
                      helperText={
                        formik?.errors?.quantity
                          ? formik?.errors?.quantity
                          : " "
                      }
                    />
                    <Typography sx={{ margin: "-18px 0 0 0" }}>
                      {formik?.values?.quantity && checkUnit()
                        ? data?.qty_unit_name
                        : data?.unit_name}
                    </Typography>
                  </QuoteuantityBoxInn>
                </QuoteuantityBox>
              </Grid>
            </Grid>
            <Box sx={{ padding: "10px 0 10px" }}>
              <Grid container spacing={{ xs: 2, md: 2, lg: 2 }}>
                <Grid item xs={12} sm={12} md={12}></Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <TextField
                        className="RequestTextField"
                        id="outlined-multiline-static"
                        placeholder="Please describe your specific sourcing requirements for product attributes, desired quantity, and any additional services you expect from suppliers"
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
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <AddAttachmntSec>
                        <Button
                          component="label"
                          role={undefined}
                          tabIndex={-1}
                          startIcon={<i className="icon-attachment"></i>}
                        >
                          Add Attachment
                          <VisuallyHiddenInput
                            type="file"
                            // accept={"image/*"}
                            multiple
                            onChange={(e) => {
                              addFiles(e);
                              e.target.value = null;
                            }}
                          />
                        </Button>
                        <LightTooltip
                          arrow
                          disableInteractive
                          placement="top"
                          title="Allowed file types: JPG, JPEG, PNG, PDF, Word, Excel"
                          PopperProps={{
                            modifiers: [
                              {
                                name: "zIndex",
                                enabled: true,
                                phase: "beforeWrite",
                                fn: ({ state }) => {
                                  state.styles.popper.zIndex = "10000";
                                },
                              },
                            ],
                          }}
                        >
                          <InfoOutlinedIcon
                            sx={{ fontSize: "18px !important", color: "#34a853",margin:'0 6px 0 0 ' }}
                          />
                        </LightTooltip>
                        {formik.touched.attachment &&
                          formik.errors.attachment && (
                            <HelperText errorText={formik.errors.attachment} />
                          )}
                        {filePreviews && filePreviews.length > 0 && (
                          <AttachmentOuter>
                            {filePreviews.map((file: string | File, index) => {
                              const fileName =
                                typeof file === "string" ? file : file.name;
                              return (
                                <AttachmentBox
                                  key={index}
                                  sx={{ padding: "3px" }}
                                >
                                  <img
                                    src="/assets/fileIcon.svg"
                                    alt=""
                                    height={14}
                                    width={14}
                                  />
                                  <LightTooltip
                                    arrow
                                    disableInteractive
                                    title={fileName}
                                    placement="top-start"
                                    PopperProps={{
                                      modifiers: [
                                        {
                                          name: "zIndex",
                                          enabled: true,
                                          phase: "beforeWrite",
                                          fn: ({ state }) => {
                                            state.styles.popper.zIndex =
                                              "10000";
                                          },
                                        },
                                      ],
                                    }}
                                  >
                                    <AttachmentName>{fileName}</AttachmentName>
                                  </LightTooltip>
                                  <LightTooltip
                                    arrow
                                    disableInteractive
                                    title="cancel"
                                    placement="top"
                                  >
                                    <CloseOutlinedIcon
                                      onClick={() =>
                                        handleRemoveAttachment(index)
                                      }
                                      sx={{
                                        fontSize: "16px !important",
                                        cursor: "pointer",
                                      }}
                                    />
                                  </LightTooltip>
                                </AttachmentBox>
                              );
                            })}
                          </AttachmentOuter>
                        )}
                        
                      </AddAttachmntSec>
                    </Grid>
                  </Grid>
                </Grid>

                {sameUserError && (
                  <Grid item xs={8}>
                    <Alert severity="error">
                      You can't get enquiry of your products.
                    </Alert>
                  </Grid>
                )}
                {loginError && (
                  <Grid item xs={8}>
                    <Alert severity="error">
                      Please login/signup to sent enquiry.
                    </Alert>
                  </Grid>
                )}
                {/* <Grid item xs={sameUserError ? 4 : 12}>
                  <Box textAlign="right">
                    <EmailSubmitButton
                      disabled={loginError}
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
                </Grid> */}
              </Grid>
            </Box>
          </Box>
          <Box textAlign="right">
            <EmailSubmitButton
              disabled={loginError}
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
        </CertificateOuter>
      </form>
    </CertificateOuter>
  );
}

export default ReviewEmailSupplier;
