import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  Alert,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import {
  ContentContainer,
  ModalHeader,
  Modalstyle,
  UploadFileBtn,
  useStyles,
} from "./styles";
import {
  apiClient,
  companyBuyerLicence,
  companysellerLicence,
} from "../common";
import { FileUpload } from "../uploadFile";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyProfile } from "@/hooks/company";
import { LightTooltip } from "../Tooltip/tooltip";
import InfoIcon from "@mui/icons-material/Info";
import moment from "moment";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
export const SingleFieldModal: any = ({
  open,
  closeModal,
  modalHeader,
  fieldValue,
  placeHolder,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [showError, setShowError] = useState(false);
  const [otpMessage, setOtpMessage] = useState<any>({
    status: "",
    message: "",
  });
  const { classes } = useStyles();
  const [selectedImage, setSelectedImage] = useState<any>([]);
  const { role } = useSelector((state: any) => state.userData);
  const { companyDetails } = useSelector((state: any) => state.companyProfile);
  const [value, setValue] = useState("");
  const [isFreeUser, setIsFreeUser] = useState<Boolean>(false);

  useEffect(() => {
    setValue(fieldValue);
    setErrorText("");
    getCompanyProfile();
    if (otpMessage.message !== "" && otpMessage.status === "error") {
      const timer = setTimeout(() => {
        setOtpMessage({ status: "", message: "" });
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [fieldValue, otpMessage, getCompanyProfile]);

  const onChangeHandler = (inputValue) => {
    const trimmedValue = inputValue.replace(/^\s+/, "");
    if (trimmedValue.length > 150) {
      setShowError(true);
      setErrorText(
        "Company name content is too long. Please limit it to 150 characters"
      );
      setValue(trimmedValue.substring(0, 150));
    } else {
      setShowError(false);
      setErrorText("");
      setValue(trimmedValue);
    }
  };
  const [open1, setOpen] = React.useState(false);

  const handleClose = () => {
    setIsFreeUser(false)
  };
  const dispatch = useDispatch();
  const handleuploadFile = (values) => {
    if (values.length > 1) {
      toast.error("Limit to 1 file may be PDF, Image, Docs");
      return;
    } else {
      setSelectedImage(values);
    }
  };

  const onSubmit = async () => {
    //  if (showError) return;
    if(companyDetails?.basic_information?.plan_status?.display_name == "Free"){
      setIsFreeUser(true)
      return;
    } else {
      setIsFreeUser(false)
    }
    if (value == "") {
      setShowError(true);
      setErrorText("Please enter company name");
      return;
    }
    if(value.length > 150) {
      setShowError(true); 
      setErrorText(errorText);
      return;
    }
    if (value === "Guest Company") {
      setErrorText("Please change new company name");
      setShowError(true);
      setLoading(false);
      return;
    }else{
      setErrorText("");
      setShowError(false);
    }

    if(companyDetails?.basic_information?.is_company_approved){
         if (companyDetails?.newLicence?.NewUploadedFileDateTime) {
        const isoDate = companyDetails?.newLicence?.NewUploadedFileDateTime;
        const startDate = moment(isoDate).format("DD-MMMM-YYYY");
        const targetDate = moment(isoDate).add(45, "days");
        const currentDate = moment();
        const daysLeft = targetDate.diff(currentDate, "days");

          setOtpMessage({
          status: "error",
          message: `You are unable to change your company name right now. Since you last changed it on ${startDate}, you must wait ${daysLeft} days before submitting another request.`,
        });

    } 
    }else {
      console.log()
           if (selectedImage.length === 0) {
        return toast.error("Business licence required!");
      }

      const formData = new FormData();
      for (let i = 0; i < selectedImage.length; i++) {
        if (selectedImage[i]?.name) {
          formData.append("registration_business_licence[]", selectedImage[i]);
        }
      }
      formData.append("name", value);

      if (value) {
        setLoading(true);

        let response = await apiClient(
          "company_profile/UpdateCompanyLicenceRequest",
          "post",
          { body: formData },
          true
        );

        if (response.status === 200 || response.status === true) {
          dispatch(getCompanyProfile());

          if (companyDetails?.basic_information?.company_approved_count === 0) {
            toast.success("Company Updated Successfully!");
            setLoading(false);
          } else {
            toast.success(
              "Request to change company name has been sent to Admin"
            );
            setLoading(false);
          }
          closeModal();
        } else {
          setShowError(true);
          setLoading(false);
          setErrorText(
            response?.message
          );
        }
      }
    }



    // if (!companyDetails?.basic_information?.companyLicenceRequestPending) {
    //   if (selectedImage.length === 0) {
    //     return toast.error("Business licence required!");
    //   }

    //   const formData = new FormData();
    //   for (let i = 0; i < selectedImage.length; i++) {
    //     if (selectedImage[i]?.name) {
    //       formData.append("registration_business_licence[]", selectedImage[i]);
    //     }
    //   }
    //   formData.append("name", value);

    //   if (value) {
    //     setLoading(true);

    //     let response = await apiClient(
    //       "company_profile/UpdateCompanyLicenceRequest",
    //       "post",
    //       { body: formData },
    //       true
    //     );

    //     if (response.status === 200 || response.status === true) {
    //       dispatch(getCompanyProfile());

    //       if (companyDetails?.basic_information?.company_approved_count === 0) {
    //         toast.success("Company Updated Successfully!");
    //         setLoading(false);
    //       } else {
    //         toast.success(
    //           "Request to change company name has been sent to Admin"
    //         );
    //         setLoading(false);
    //       }
    //       closeModal();
    //     } else {
    //       setShowError(true);
    //       setLoading(false);
    //       setErrorText(
    //         response?.message
    //       );
    //     }
    //   }
    // } else {
    //   if (companyDetails?.newLicence?.NewUploadedFileDateTime) {
    //     const isoDate = companyDetails?.newLicence?.NewUploadedFileDateTime;
    //     const startDate = moment(isoDate).format("DD-MMMM-YYYY");
    //     const targetDate = moment(isoDate).add(45, "days");
    //     const currentDate = moment();
    //     const daysLeft = targetDate.diff(currentDate, "days");
    //     if(companyDetails?.basic_information?.is_company_approved){
    //       setOtpMessage({
    //       status: "error",
    //       message: `You are unable to change your company name right now. Since you last changed it on ${startDate}, you must wait ${daysLeft} days before submitting another request.`,
    //     });
    //     } else {
    //     setOtpMessage({
    //       status: "error",
    //       message:
    //         "License approval request is pending from Merchant AD. Please contact the admin for approval before making changes to the request.",
    //     });
    //   }
    //   }
    // }


  };

  return (
    <>
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={Modalstyle}>
        <Button
          onClick={() => {
            setErrorText("");
            setValue(fieldValue);
            setShowError(false);
            closeModal();
          }}
          color="error"
          style={{
            minHeight: "46px",
            minWidth: "46px",
            borderRadius: "50%",
            position: "absolute",
            top: "9px",
            right: "11px",
          }}
        >
          <CloseOutlinedIcon style={{ cursor: "pointer" }} />
        </Button>
        <ContentContainer>
          <ModalHeader>
            <p style={{ width: "100%" }} className={classes.modalheading}>
              {modalHeader}
              <LightTooltip
                title={
                  role === "seller" ? companysellerLicence : companyBuyerLicence
                }
                arrow
              >
                <IconButton size="small">
                  <InfoIcon sx={{ height: "20px", width: "20px" }} />
                </IconButton>
              </LightTooltip>
            </p>
          </ModalHeader>
          {companyDetails?.basic_information?.companyLicenceRequestPending && (
            <Box
              sx={{
                padding: "6px 12px 6px 12px",
                backgroundColor: "#ffffcc",
                border: "1px solid #997404",
                borderRadius: "0.375rem",
                marginTop: "8px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "8px",
                  display: "inline",
                  margin: "0px",
                }}
              >
                Licence approval request is pending with{" "}
                {companyDetails?.newLicence?.NewUploadedFileName} and{" "}
                <a
                  style={{ color: "red" }}
                  href={companyDetails?.newLicence?.NewUploadedFile}
                  target="_blank"
                >
                  Click here{" "}
                </a>
                for preview
              </Typography>
            </Box>
          )}
          {companyDetails?.newLicence?.rejection_comment && (
            <Box
              sx={{
                padding: "6px 12px 6px 12px",
                backgroundColor: "#ffcecc",
                border: "1px solid #99040482",
                borderRadius: "0.375rem",
                marginTop: "8px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "8px",
                  display: "inline",
                  margin: "0px",
                }}
              >
                {companyDetails?.newLicence?.rejection_comment}
                {companyDetails?.newLicence?.NewUploadedFileName} and{" "}
                <a
                  style={{ color: "red" }}
                  href={companyDetails?.newLicence?.NewUploadedFile}
                  target="_blank"
                >
                  Click here{" "}
                </a>
                for preview
              </Typography>
            </Box>
          )}

          <Grid container style={{ marginTop: 20 }}>
            <Grid item md={12}>
              <TextField
                value={value}
                InputLabelProps={{ style: { fontSize: 14 } }}
                size="small"
                autoFocus
                fullWidth
                label="Company Name"
                required
                onChange={(e) => onChangeHandler(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? onSubmit() : null)}
              />
              {showError && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <WarningAmberOutlinedIcon
                    style={{
                      fontSize: "9px",
                      margin: "0px 4px 0 0",
                      color: "#d7282f",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "10px",
                      color: "#d7282f !important",
                    }}
                  >
                    {errorText}
                  </Typography>
                </Box>
              )}
              <Typography
                sx={{ fontSize: "12px", marginTop: "4px", lineHeight: "16px" }}
                variant="body1"
              >
                In order to change your company name, you need to submit your
                business license (scanned image) to get approved.
              </Typography>
            </Grid>

            <Grid item md={12}>
              <UploadFileBtn>
                <Box
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "8px",
                  }}
                >
                  Attaching Business License
                </Box>

                <FileUpload
                  mode={"edit"}
                  condition={true}
                  name="CompanyName"
                  error={(error) => toast.error(error)}
                  files={selectedImage}
                  updateFiles={handleuploadFile}
                />
                <Typography sx={{ fontSize: "11px", marginTop: "4px" }}>
                  Max. file size: 2 MB, pdf, jpg and png.
                </Typography>
              </UploadFileBtn>

              <FileUpload
                mode={"view"}
                files={[
                  companyDetails?.location_of_registration
                    ?.registration_business_licence[0],
                ]}
              />
            </Grid>
          </Grid>
        </ContentContainer>
        <Box
          sx={{
            alignItems: "center",
            marginTop: "12px",
          }}
        >
          {otpMessage?.message !== "" && otpMessage.status == "error" && (
            <Alert
              sx={{
                ".MuiAlert-icon": {
                  color: `${
                    otpMessage?.status == "success" ? "green" : "#D7282F"
                  }`,
                  fontSize: "20px",
                },
                fontSize: "12px",
                cursor: "pointer",
                alignItems: "center",
              }}
              onClose={() => {
                setOtpMessage("");
              }}
              severity={"error"}
            >
              {otpMessage?.message}
            </Alert>
          )}
        </Box>
        <Stack
          sx={{
            alignItems: "center",
            borderTop: "1px solid #d2d2d2",
            marginTop: "12px",
            paddingTop: "12px",
            gap: "8px",
          }}
        >
          <Button
            style={{
              fontWeight: "bold",
              textTransform: "none",
              height: "36px",
              backgroundColor: "rgba(216, 38, 47,0.9)",
            }}
            variant="contained"
            onClick={onSubmit}
          >
            {loading ? (
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
              "Submit"
            )}
          </Button>
        </Stack>
      </Box>
    </Modal>
    { isFreeUser && (     <BootstrapDialog
    //  onClose={handleClose}
     aria-labelledby="customized-dialog-title"
     open={open}
   >
     {/* <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
       Modal title
     </DialogTitle> */}
     {/* <IconButton
       aria-label="close"
       onClick={handleClose}
       sx={{
         position: 'absolute',
         right: 8,
         top: 8,
         color: (theme) => theme.palette.grey[500],
       }}
     >
       <CloseIcon />
     </IconButton> */}
     <DialogContent dividers>
       <Typography gutterBottom>
        <div>please buy some plans to get verifyed.</div>
       </Typography>
     </DialogContent>
     <DialogActions>
       <Button autoFocus
       onClick={handleClose} >
         OK
       </Button>
     </DialogActions>
   </BootstrapDialog>)
    }

   </>
  );
};
