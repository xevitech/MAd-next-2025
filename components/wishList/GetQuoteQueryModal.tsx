import {
  Avatar,
  Box,
  Grid,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import {
  ButtonRequest,
  SellerNameWithImage,
  SupplierTo,
  WishAttachmntArea,
} from "./styles";
import { CommonDialogHeader } from "../common/modal/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { apiClient } from "../common/common";
import { toast } from "react-toastify";
import { getTokenFromCookies } from "@/utils/cookieUtils";
import MenuItem from "@mui/material/MenuItem";
import {
  ManufacturerAttachmntArea,
  ManufacturerButtonRequest,
} from "../guestLayout/landingPage/manufactureProducts/ManufactureStyle";
import {
  AttachmentBox,
  AttachmentName,
  AttachmentOuter,
} from "../guestLayout/landingPage/styles";
import { LightTooltip } from "../common/Tooltip/tooltip";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
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

const GetQuoteQueryModal = ({
  opens,
  handleClose,
  setOpenModal,
  data,
}: any) => {
  // const validation = Yup.object({
  //   Product: Yup.string().required("Product name is required"),
  //   Quantity: Yup.number()
  //     .required("Quantity is required")
  //     .positive("Quantity must be positive")
  //     .integer("Quantity must be an integer"),
  //   Units: Yup.number()
  //     .required("Units/Sets is required")
  //     .positive("Units/Sets must be positive")
  //     .integer("Units/Sets must be an integer"),
  //   description: Yup.string()
  //     .required("Description is required")
  //     .min(10, "Description should be at least 10 characters"),
  // });
  // const formik = useFormik({
  //   initialValues: {
  //     Product: "",
  //     Quantity: "",
  //     Units: "",
  //     description: "",
  //   },
  //   validationSchema: validation,
  //   onSubmit: (values) => {
  //     handleSendQuery(values);
  //   },
  // });
  // const handleSendQuery = async (values) => {
  //   setOpenModal(false);
  //   const res = await fetch(`${BASE_URL}/front/contactUs`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${Auth.token()}`,
  //     },
  //   });
  // };
  console.log("data", data);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [filePreviews, setFilePreviews] = useState([]);

  const initialValues = {
    product_name: "",
    purchase_quantity: "",
    units: "",
    description: "",
    attachment: [],
  };
  const validationSchema = Yup.object().shape({
    product_name: Yup.string().required("Product name is required"),
    purchase_quantity: Yup.number().required("Purchase quantity is required"),
    units: Yup.string().required("Units/Sets is required"),
    description: Yup.string().required("Description is required"),
    // file: Yup.array().of(Yup.mixed().required('Attachments are required')),
  });

  const handleSubmit = (values) => {
    console.log(values);
    const token = getTokenFromCookies();
    if (!token) {
      toast.info("Please Login");
      return;
    }
    let formData = new FormData();
    formData.append("product_name", values.product_name);
    formData.append("purchase_quantity", values.purchase_quantity);
    formData.append("sets", values.units);
    formData.append("description", values.description);
    formData.append("seller_user_id", data?.shop_id);
    formData.append("enquiry_user_id", data?.u_id);
    if (values.attachment) {
      if (Array.isArray(values.attachment)) {
        values.attachment.forEach((file) =>
          formData.append("attachment[]", file)
        );
      } else {
        formData.append("attachment", values.attachment);
      }
    }
    try {
      const response = apiClient(
        "front/getQuery/contactSeller",
        "post",
        { body: formData },
        true
      );
      toast.success("query submitted");
      formik.resetForm();
      setFilePreviews([]);
      setIsSubmitted(false);
      handleClose();
    } catch (err) {
      toast.error("err", err);
    }
    console.log(values);
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const [unitsOptions, setUnitsOptions] = useState<any[]>([]);
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const { data } = await apiClient("unit", "get");
        console.log("data", data);
        setUnitsOptions(data);
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    };

    fetchUnits();
  }, []);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const updatedFiles = [
      ...(formik.values.attachment || []),
      ...selectedFiles,
    ];
    formik.setFieldValue("attachment", updatedFiles);
    const names = selectedFiles.map((file: any) => file.name);
    setFilePreviews((prev) => [...prev, ...names]);
  };
  const handleRemoveAttachment = (index) => {
    setFilePreviews((prev) => {
      const updatedPreviews = prev.filter((_, i) => i !== index);
      return updatedPreviews;
    });
    formik.setFieldValue(
      "attachment",
      formik.values.attachment.filter((_, i) => i !== index)
    );
  };

  return (
    <>
      <Box>
        <BootstrapDialog
          sx={CommonDialogHeader}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={opens}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Query
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <SupplierTo>
            <Typography>To:</Typography>
            <SellerNameWithImage>
              <Avatar
                alt="Remy Sharp"
                src="https://merchantad.xevitech.com/public/uploads/all/1725351518_blob"
              />
              <Typography variant="body2">{data?.name}</Typography>
            </SellerNameWithImage>
          </SupplierTo>
          <DialogContent dividers>
            {/* <form>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <TextField
                    name="Product"
                    fullWidth
                    label="Product Name"
                    variant="outlined"
                    size="small"
                    value={formik.values.Product}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.Product && Boolean(formik.errors.Product)
                    }
                    helperText={formik.touched.Product && formik.errors.Product}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="Quantity"
                    fullWidth
                    label="Purchase Quantity"
                    variant="outlined"
                    type="number"
                    size="small"
                    value={formik.values.Quantity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.Quantity && Boolean(formik.errors.Quantity)
                    }
                    helperText={
                      formik.touched.Quantity && formik.errors.Quantity
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="Units"
                    fullWidth
                    label="Units/Sets"
                    variant="outlined"
                    type="number"
                    size="small"
                    value={formik.values.Units}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.Units && Boolean(formik.errors.Units)}
                    helperText={formik.touched.Units && formik.errors.Units}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    name="description"
                    fullWidth
                    variant="outlined"
                    multiline
                    placeholder="Please describe your specific sourcing requirements for product attributes, desired quantity, and any additional services you expect from suppliers"
                    rows={3}
                    size="small"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <WishAttachmntArea>
                    <Button
                      component="label"
                      role={undefined}
                      tabIndex={-1}
                      startIcon={<i className="icon-attachment"></i>}
                    >
                      Add Attachment
                      <VisuallyHiddenInput type="file" multiple />
                    </Button>
                  </WishAttachmntArea>
                </Grid>
              </Grid>
            </form> */}
            <form
              onSubmit={(event) => {
                setIsSubmitted(true);
                formik.handleSubmit(event);
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="product_name"
                    fullWidth
                    label="Product Name"
                    variant="outlined"
                    size="small"
                    value={formik.values.product_name}
                    onChange={formik.handleChange}
                    error={isSubmitted && Boolean(formik.errors.product_name)}
                    helperText={isSubmitted && formik.errors.product_name}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="purchase_quantity"
                    fullWidth
                    label="Purchase Quantity"
                    variant="outlined"
                    size="small"
                    value={formik.values.purchase_quantity}
                    onChange={formik.handleChange}
                    error={
                      isSubmitted && Boolean(formik.errors.purchase_quantity)
                    }
                    helperText={isSubmitted && formik.errors.purchase_quantity}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Select
                    name="units"
                    fullWidth
                    // label="Units/Sets"
                    variant="outlined"
                    size="small"
                    value={formik.values.units}
                    onChange={formik.handleChange}
                    error={isSubmitted && Boolean(formik.errors.units)}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 200,
                        },
                      },
                    }}
                    displayEmpty
                    renderValue={(value) =>
                      value ? (
                        value
                      ) : (
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#A2A2A2",
                            fontWeight: "400",
                          }}
                        >
                          Select a unit
                        </Typography>
                      )
                    }
                  >
                    {unitsOptions.map((unit) => (
                      <MenuItem key={unit.name} value={unit.name}>
                        {unit.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={3}
                    placeholder="Please describe your specific sourcing requirements."
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={isSubmitted && Boolean(formik.errors.description)}
                    helperText={isSubmitted && formik.errors.description}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <ManufacturerAttachmntArea>
                    {filePreviews?.length > 0 && (
                      <AttachmentOuter>
                        {filePreviews.map((name, index) => (
                          <AttachmentBox key={index}>
                            <img
                              src="/assets/fileIcon.svg"
                              alt=""
                              height={18}
                              width={18}
                            />
                            <LightTooltip
                              arrow
                              disableInteractive
                              title={name}
                              placement="top"
                            >
                              <AttachmentName>{name}</AttachmentName>
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
                                  fontSize: "16px",
                                  cursor: "pointer",
                                }}
                              />
                            </LightTooltip>
                          </AttachmentBox>
                        ))}
                      </AttachmentOuter>
                    )}
                    {/* {filePreviews?.length > 0 &&   <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemoveAttachment0(setFieldValue)}
                  >
                    Remove Attachment
                  </Button>} */}
                    <Button
                      component="label"
                      role={undefined}
                      tabIndex={-1}
                      startIcon={<i className="icon-attachment"></i>}
                    >
                      Add Attachment
                      <VisuallyHiddenInput
                        type="file"
                        multiple
                        onChange={handleFileChange}
                      />
                    </Button>
                  </ManufacturerAttachmntArea>
                </Grid>
              </Grid>
              <DialogActions>
                <ManufacturerButtonRequest
                  // onClick={handleClose}
                  variant="outlined"
                  color="primary"
                  type="submit"
                  size="small"
                >
                  Send Query{" "}
                </ManufacturerButtonRequest>
              </DialogActions>
            </form>
          </DialogContent>
          {/* <DialogActions>
            <ButtonRequest
              onClick={() => {
                formik.handleSubmit();
              }}
              variant="outlined"
              color="primary"
              type="submit"
              size="small"
            >
              <>Send Query</>
            </ButtonRequest>
          </DialogActions> */}
        </BootstrapDialog>
      </Box>
    </>
  );
};
export default GetQuoteQueryModal;
