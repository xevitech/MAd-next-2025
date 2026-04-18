import {
  Box,
  styled,
  Typography,
  Grid,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  FormHelperText,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { SimpleCheckBox } from "@/components/common/commonStyle";
import { surveyPage } from "@/utils/constantImages";
import { apiClient } from "@/components/common/common";
import MobileInputCommon from "@/components/common/PhoneInput";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import {
  AttachmentBox,
  AttachmentName,
  AttachmentOuter,
} from "../landingPage/styles";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { AddAttachmntSec } from "@/components/ProductDetail/ProductComponents/Modal/style";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HelperText from "@/components/CompanySettings/CompanyDetail/Common/helperText";
import { useRouter } from "next/router";
import { BASE_URL } from "@/utils/staticValues";

export const OuterBox = styled(Box)(() => ({
  width: "70%",
  margin: "0 auto",
  borderRadius: "6px",
  boxShadow:
    "0px 9px 16px rgba(159, 162, 191, 0.18), 0px 2px 2px rgba(159, 162, 191, 0.32)",
  border: "1px solid #d2d2d2",
  padding: "40px",
  background: "#fff",
}));
export const LogoBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  margin: "0 0 30px 0",
  "& img": {
    height: "78px",
    "@media screen and (max-width:900px)": {
      height: "auto",
      width: "100%",
    },
  },
}));
export const HeadingBox = styled(Box)(() => ({
  borderBottom: "1px solid #ddd",
  textAlign: "center",
  padding: "0 0 40px 0",
}));
export const MainHeading = styled(Typography)(() => ({
  fontSize: "36px",
  color: "#231f20",
  fontWeight: "400",
  "& span": {
    fontWeight: "600",
  },
}));
export const SubHeading = styled(Typography)(() => ({
  fontSize: "24px",
  color: "#231f20",
  fontWeight: "400",
}));
export const ContentBox = styled(Box)(() => ({
  margin: "40px 0 0 0",
}));
export const FieldLabels = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "600",
  color: "#231f20",
}));
export const SubFieldLabels = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "400",
  color: "#231f20",
}));
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
export const UploadButton = styled("label")(() => ({
  background: "#fff",
  border: "1px solid #d7282f",
  color: "#d7282f",
  boxShadow: "none",
  textTransform: "capitalize",
  padding: "4px 12px",
  fontSize: "14px",
  fontWeight: "600",
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: "#d7282f",
    color: "#fff",
  },
}));
export const UploadText = styled("span")(() => ({
  fontSize: "14px",
  fontWeight: "400",
  color: "#838383",
  marginLeft: "16px",
}));
export const NoteBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
  backgroundColor: "#FFF2F2",
  gap: "20px",
  padding: "40px",
}));
export const ImpHeading = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "700",
  color: "#231f20",
}));
export const ContentText = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "400",
  color: "#231f20",
}));
export const SiteLink = styled("span")(() => ({
  fontSize: "16px",
  fontWeight: "600",
  color: "#d7282f",
}));
export const ButtonBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
}));
export const SubmitBTN = styled(Button)(() => ({
  backgroundColor: "#d7282f",
  border: "1px solid #d7282f",
  color: "#fff",
  fontSize: "14px",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#d7282f",
    border: "1px solid #d7282f",
  },
}));
export const CancelBTN = styled(Button)(() => ({
  backgroundColor: "#fff",
  border: "1px solid #d7282f",
  color: "#d7282f",
  fontSize: "14px",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#d7282f",
    color: "#fff",
    border: "1px solid #d7282f",
  },
}));
export const MandatoryFields = styled("span")(() => ({
  color: "#d7282f",
}));
export const UploadFileBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
}));
export const UploadFile = styled(Box)(() => ({
  border: "1px solid #858585",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  padding: "2px 6px",
  "& img": {
    height: "14px",
    width: "14px",
    margin: "0 4px 0 0 ",
  },
  "& .MuiDivider-root": {
    height: "18px",
    margin: "0 4px",
  },
  "& .filename": {
    fontSize: "13px",
    color: "#231f20",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "90px",
    whiteSpace: "nowrap",
  },
}));
export default function RecreateCompany() {
  const router = useRouter();
  const [companyData, setCompanyData] = useState<any>({
    company_name: "",
    phone: "",
    email: "",
    phone_code: "",
    description: "",
    // attatched_document: [],
    ownership_type: "",
  });
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<any>({});
  const phoneRef = React.useRef(null);
  const companyName = localStorage.getItem("companyName");

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked, files } = target;

    if (type === "file") {
      const file = files?.[0];
      if (file) {
        setDocumentFile(file);
        setCompanyData((prevData) => ({
          ...prevData,
          // attatched_document: file.name,
        }));
      }
      return;
    }

    setCompanyData((prevData) => {
      if (type === "checkbox" && name === "ownership_type") {
        return {
          ...prevData,
          ownership_type: checked ? value : "",
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });

    setErrors((prevErrors: any) => {
      const newErrors = { ...prevErrors };

      if (name === "ownership_type") {
        if (checked && newErrors.ownership_type) {
          delete newErrors.ownership_type;
        }
      } else if (value.trim() && newErrors[name]) {
        delete newErrors[name];
      }

      return newErrors;
    });
  };
  console.log(companyData, "errors");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<File[]>([]);
  const [attachmentError, setAttachmentError] = useState<string>("");

  const addFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const totalFiles = attachments.length + newFiles.length;

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
      setAttachmentError(message);
      setTimeout(() => {
        setAttachmentError("");
      }, 2000);
    };

    if (totalFiles > 3) {
      showError("Please upload a maximum of 3 files (images, docs, or files)");
      return;
    }

    const invalidFiles = newFiles.filter(
      (file) => ![...allowedImageTypes, ...allowedDocTypes].includes(file.type)
    );
    if (invalidFiles.length > 0) {
      showError("Allowed file types: JPG, JPEG, PNG, PDF, Word, Excel");
      return;
    }

    const oversizedFiles = newFiles.filter(
      (file) => convertSize(file.size) > maxFileSizeMB
    );
    if (oversizedFiles.length > 0) {
      showError(`File must be less than ${maxFileSizeMB} MB`);
      return;
    }

    const oversizedImages = newFiles.filter(
      (file) =>
        allowedImageTypes.includes(file.type) &&
        convertSize(file.size) > maxImageSizeMB
    );
    if (oversizedImages.length > 0) {
      showError(`Image must be less than ${maxImageSizeMB} MB`);
      return;
    }

    const updatedFiles = [...attachments, ...newFiles];
    setAttachments(updatedFiles);
    setFilePreviews(updatedFiles);
    setAttachmentError("");

    setCompanyData((prev: any) => {
      const existingDocs = prev.attatched_document || [];
      const updatedDocs = [...existingDocs, ...newFiles];
      return {
        ...prev,
        attatched_document: updatedDocs,
      };
    });
  };

  const handleRemoveAttachment = (index: number) => {
    const updatedPreviews = filePreviews.filter((_, i) => i !== index);
    const updatedAttachments = attachments.filter((_, i) => i !== index);
    setFilePreviews(updatedPreviews);
    setAttachments(updatedAttachments);
  };
  const [isEmailExisting, setIsEmailExisting] = useState(false);
  const [isPhoneExisting, setIsPhoneExisting] = useState(false);

  const checkEmailAndPhoneExists = async () => {
    try {
      const response = await apiClient("auth/isExistingUser", "post", {
        body: {
          email: companyData.email,
          phone: companyData.phone,
        },
      });

      const { email, phone, email_message, phone_message } = response || {};
      console.log(
        email,
        phone,
        email_message,
        phone_message,
        "email, phone, email_message, phone_message"
      );
      if (email) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: [email_message || "This email is already registered."],
        }));
        setIsEmailExisting(true);
      } else {
        setIsEmailExisting(false);
      }

      if (phone) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: [phone_message || "This phone number is already registered."],
        }));
        setIsPhoneExisting(true);
      } else {
        setIsPhoneExisting(false);
      }

      return email || phone;
    } catch (error) {
      console.error("Failed to check email and phone existence:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: ["Failed to verify email. Please try again."],
        phone: ["Failed to verify phone number. Please try again."],
      }));
      return true;
    }
  };

  const requestToRecreate = async () => {
    setAttachmentError("");

    const requiredFields = [
      "company_name",
      "phone",
      "email",
      "phone_code",
      "ownership_type",
      "description",
    ];

    const newErrors: any = {};
    requiredFields.forEach((field) => {
      if (!companyData[field] || companyData[field].trim?.() === "") {
        newErrors[field] = [
          `The ${field.replaceAll("_", " ")} field is required.`,
        ];
      }
    });

    let hasError = Object.keys(newErrors).length > 0;

    if (!attachments || attachments.length === 0) {
      setAttachmentError("Please upload a file.");
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    const isAlreadyExisting = await checkEmailAndPhoneExists();
    if (isAlreadyExisting) {
      return;
    }

    const formData = new FormData();

    Object.entries(companyData).forEach(([key, value]) => {
      if (key === "attatched_document") return;
      if (value !== undefined && value !== null) {
        if (!(value instanceof File) && !(value instanceof Blob)) {
          formData.append(key, String(value));
        }
      }
    });

    attachments.forEach((file, index) => {
      formData.append("attatched_document", file);
    });

    try {
      const response = await fetch(
        `${BASE_URL}/user_request`,
        {
          method: "POST",
          body: formData,
        }
      );

      const responseData = await response.json();

      if (response.status === 200) {
        console.log("Success:", responseData);
        router.push("user/signup");
        return responseData;
      }

      if (!response.ok) {
        if (responseData.errors) {
          setErrors(responseData.errors);
        } else {
          console.error(responseData.message || "Request failed");
        }
        return;
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <>
      <Box sx={{ paddingTop: "80px", background: "#f4f6fa" }}>
        <OuterBox>
          <LogoBox>
            <img src={surveyPage?.logo} alt="logo" />
          </LogoBox>
          <HeadingBox>
            <MainHeading>
              You are requesting to Recreate{" "}
              <Box component={"span"}>{companyName}</Box>{" "}
            </MainHeading>
            <SubHeading>Please fill the following details</SubHeading>
          </HeadingBox>
          <ContentBox>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <FieldLabels>
                  Name <MandatoryFields>*</MandatoryFields>
                </FieldLabels>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    placeholder="Name"
                    size="small"
                    fullWidth
                    name="company_name"
                    value={companyData.company_name}
                    onChange={handleOnChange}
                    error={Boolean(errors.company_name)}
                    helperText={errors.company_name?.[0]}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <FieldLabels>
                  Phone No. <MandatoryFields>*</MandatoryFields>
                </FieldLabels>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <Box
                    sx={{
                      "& .MuiInputBase-formControl": {
                        paddingLeft: "0",
                        border: errors.phone
                          ? "1px solid #d7282f"
                          : "1px solid rgba(0, 0, 0, 0.23)",
                        "&:hover": {
                          border: errors.phone
                            ? "1px solid #d7282f"
                            : "1px solid #000",
                        },
                        "&.Mui-focused": {
                          border: "1px solid #858585",
                        },
                      },

                      "& .MuiInputBase-root": {
                        paddingLeft: "6px",
                      },
                      "& .MuiInputBase-input": {
                        padding: "8.5px 14px 8.5px 0px",
                      },
                    }}
                  >
                    <MobileInputCommon
                      handleChange={(phone, mobile_code, isValid) => {
                        setCompanyData((prev) => ({
                          ...prev,
                          phone,
                          phone_code: mobile_code,
                        }));

                        if (phone) {
                          setErrors((prevErrors: any) => {
                            const newErrors = { ...prevErrors };
                            delete newErrors.phone;
                            return newErrors;
                          });
                        }
                      }}
                      mobileNumber={companyData.phone}
                      mobileCode={companyData.phone_code}
                      countryCode={companyData.country_code || ""}
                      placeholder="Phone"
                      inputRef={phoneRef}
                      error={errors.phone}
                      sx={{ width: "100%" }}
                    />
                  </Box>
                  {errors.phone && (
                    <FormHelperText error sx={{ ml: 1 }}>
                      {errors.phone[0]}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <FieldLabels>
                  Email ID <MandatoryFields>*</MandatoryFields>
                </FieldLabels>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    placeholder="Email ID"
                    size="small"
                    fullWidth
                    name="email"
                    value={companyData.email}
                    onChange={handleOnChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.[0]}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <FieldLabels>
                  Are you the original owner or a new representative?{" "}
                  <MandatoryFields>*</MandatoryFields>
                </FieldLabels>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="top"
                      control={
                        <Checkbox
                          sx={SimpleCheckBox}
                          name="ownership_type"
                          value="Original Owner"
                          checked={companyData.ownership_type.includes(
                            "Original Owner"
                          )}
                          onChange={handleOnChange}
                        />
                      }
                      label="Original Owner"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="top"
                      control={
                        <Checkbox
                          sx={SimpleCheckBox}
                          name="ownership_type"
                          value="New Representative"
                          checked={companyData.ownership_type.includes(
                            "New Representative"
                          )}
                          onChange={handleOnChange}
                        />
                      }
                      label="New Representative"
                      labelPlacement="end"
                    />
                  </FormGroup>
                  {errors.ownership_type && (
                    <FormHelperText>{errors.ownership_type[0]}</FormHelperText>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <FieldLabels>
                  Detailed Reason for Re-creation Request{" "}
                  <MandatoryFields>*</MandatoryFields>
                </FieldLabels>
                <SubFieldLabels>
                  (Explain why you are requesting to re-create this company.
                  Mention ownership, intent, or any issue that led to previous
                  deletion.)
                </SubFieldLabels>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    placeholder="Describe here..."
                    size="small"
                    fullWidth
                    multiline
                    rows={5}
                    maxRows={5}
                    name="description"
                    value={companyData.description}
                    onChange={handleOnChange}
                    error={Boolean(errors.description)}
                    helperText={errors.description?.[0]}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <FieldLabels>
                  Upload Supporting Document{" "}
                  <MandatoryFields>*</MandatoryFields>
                </FieldLabels>
                <SubFieldLabels>
                  (e.g Compnay registration, NOC, etc.)
                </SubFieldLabels>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box sx={{ margin: "0 0 10px 0" }}>
                  <UploadButton
                    role={undefined}
                    tabIndex={-1}
                    //   startIcon={<CloudUploadIcon />}
                  >
                    Choose file
                    <VisuallyHiddenInput
                      type="file"
                      multiple
                      onChange={(e) => {
                        addFiles(e);
                        e.target.value = null;
                      }}
                    />
                  </UploadButton>
                </Box>
                {filePreviews.length === 0 && (
                  <Box>
                    <Typography sx={{ fontSize: "12px", color: "#838383" }}>
                      Allowed file types: JPG, JPEG, PNG, PDF, Word, Excel
                    </Typography>
                  </Box>
                )}

                {attachmentError && <HelperText errorText={attachmentError} />}

                {filePreviews && filePreviews.length > 0 && (
                  <AttachmentOuter>
                    {filePreviews.map((file: string | File, index) => {
                      const fileName =
                        typeof file === "string" ? file : file.name;
                      return (
                        <AttachmentBox key={index} sx={{ padding: "3px" }}>
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
                                    state.styles.popper.zIndex = "10000";
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
                              onClick={() => handleRemoveAttachment(index)}
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
              </Grid>

              <Grid item xs={12}>
                <NoteBox>
                  <Box>
                    <ImpHeading>Important !</ImpHeading>
                    <ContentText>
                      Your request will be reviewed manually by Merchant AD
                      Admin. Re-creation is not guaranteed <br /> if previous
                      account was terminated due to fraud or policy violation.
                    </ContentText>
                  </Box>
                  <Box>
                    <ImpHeading>Contact Info</ImpHeading>
                    <ContentText>
                      Need Help? You can contact Merchant AD Core at{" "}
                      <SiteLink>enquiry@powercozmo.com</SiteLink>
                    </ContentText>
                  </Box>
                </NoteBox>
              </Grid>
              <Grid item xs={12}>
                <ButtonBox>
                  <SubmitBTN onClick={requestToRecreate}>
                    Submit Request
                  </SubmitBTN>
                  <CancelBTN onClick={() => router.push("user/signup")}>
                    Cancel
                  </CancelBTN>
                </ButtonBox>
              </Grid>
            </Grid>
          </ContentBox>
        </OuterBox>
      </Box>
    </>
  );
}
