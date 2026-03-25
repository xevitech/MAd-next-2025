import { FileUpload } from "@/components/common/uploadFile";
import Grid from "@mui/material/Grid";
import {
  Box,
  Divider,
  FormControl,
  TextField,
  MenuItem,
  Select
} from "@mui/material";
import React, { useState } from "react";
import {
  Blackoutlinebtn,
  Redoutlinebtn,
} from "@/components/common/buttons/ButtonsVariations";
import {
  SaveButtonContainer,
  FullFieldLabel,
  FullFieldValue,
  FullFieldContainer,
  FieldBorder,
  ImageFormatSpan,
} from "../../../commonStyles";
import { ThreeDots } from "react-loader-spinner";
import { useFormik } from "formik";
import {
  apiClient,
  descriptionLimit,
  imageFormatDocs,
  urlWithHttp,
} from "@/components/common/common";
import * as Yup from "yup";
import { toast } from "react-toastify";
import TextArea from "./TextArea";
import { UploadImgBox } from "../../style";

const HonorAndAward = ({ editData, onClose }) => {
  const [loader, setLoader] = useState<boolean>(false);
   let editMode = Object.keys(editData).length > 0 ? true : false;
  const validation: any = Yup.object().shape({
    reference_no: Yup.string().required("Please enter certificate no"),
    name: Yup.string().required("Please enter certificate name "),
    issued_by: Yup.string().required("Please select certificate issuer"),
   
     certificate_url: Yup.string().url('Please enter a valid URL (http:// or https://)').nullable(),
   message: Yup.string()
      // .min(300, "Please enter at least 300 character")
      .max(350, descriptionLimit)
      .required("Please enter certificate description"),

    images: Yup.array().min(1, "Please select certificate image"),
  });
  const formik: any = useFormik({
    validateOnChange: false,
    validationSchema: validation,
    enableReinitialize: true,
    initialValues: {
      type_of_certificate: editData?.type_of_certificate ?? "",
      reference_no: editData?.reference_no ?? "",
      name: editData?.name ?? "",
      issued_by: editData?.issued_by ?? "",
      start_date: editData?.start_date ?? "",
      end_date: editData?.end_date ?? "",
      certificate_url: editData?.certificate_url ?? "",
      message: editData?.message ?? "",
      images: editData?.images ?? [],
      type: "honor",
      deleted_images_ids: [],
      status:  editData?.status ??"enable"
    },
    onSubmit: async (values) => {
      setLoader(true);
      let endPoints = editMode ? "edit" : "create";
      let formData = new FormData();
      formData.append("reference_no", values?.reference_no);
      formData.append("name", values?.name);
      formData.append("issued_by", values?.issued_by);
      formData.append("start_date", values?.start_date);
      formData.append("end_date", values?.end_date);
      formData.append("status",values?.status);
      formData.append("certificate_url", values?.certificate_url);
      formData.append("message", values?.message);
      for (let i = 0; i < values.images.length; i++) {
        if (!values?.images[i].id)
          formData.append("images[]", values?.images[i]);
      }
      formData.append("type", values?.type);
      if (endPoints == "edit") {
        if (values.deleted_images_ids.length > 0) {
          formData.append(
            "deleted_images_ids",
            values?.deleted_images_ids.join(",")
          );
        }
        formData.append("id", editData?.id);
      }
      let response = await apiClient(
        `company_profile/certificate/${endPoints}`,
        "post",
        {
          body: formData,
        },
        true
      );
      if (!response.status) {
        toast.error("Something went wrong!");
      }
      formik.resetForm();
      setLoader(false);
      onClose(false, true);
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
    formik.setFieldError(name, "");
  };
  const handleCertificateChange = (event) => {
    const { name, value } = event.target;
    const sanitizedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    formik.setFieldValue(name, sanitizedValue);
    formik.setFieldError(name, "");
  };
   const handleInputChange = (e: any) => {
     const { value } = e.target;
     formik.setFieldError("message", "");
     if (value.length <= 350) {
       formik.setFieldValue("message", value);
     }
     if (value.length > 350) {
       formik.setFieldError("message", descriptionLimit);
     }
   };

  const { values, errors } = formik;

  return (
    <>
      <Grid container p={2} pt={1} className="companydetail_addservice">
        <Grid item xs={12} lg={12}>
          <form
            onSubmit={formik.handleSubmit}
            className="test_report_tab addservice_label newadd_form"
          >
            <FormControl>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <FullFieldContainer>
                     <FullFieldLabel className="certificatespacing">
                      Certificate Name <span className="detailastrics">*</span>
                    </FullFieldLabel>
                    <FullFieldValue position={"relative"}>
                      <TextField
                        inputProps={{
                          autoComplete: "off",
                        }}
                        variant="outlined"
                        size="small"
                        name="name"
                        type="text"
                        value={values?.name}
                        placeholder="Enter Certificate Name"
                        onChange={handleChange}
                        error={errors.name ? true : false}
                      />
                      {errors?.name && (
                        <span
                          style={{
                            position: "absolute",
                            bottom: "-18px",
                            left: "0px",
                          }}
                        >
                          <img
                            src="/assets/error-outline-red.svg"
                            alt=""
                            style={{ width: "8px", height: "8px" }}
                          />
                          <span
                            style={{
                              marginLeft: "3px",
                              fontSize: "10px",
                              color: "#d7282f",
                            }}
                          >
                            {errors?.name}
                          </span>
                        </span>
                      )}
                    </FullFieldValue>
                  </FullFieldContainer>
                </Grid>



                <Grid item xs={12} sm={6} md={6}>
                  <FullFieldContainer>
                     <FullFieldLabel className="certificatespacing">
                      Certificate Issuer{" "}
                      <span className="detailastrics">*</span>
                    </FullFieldLabel>
                    <FullFieldValue position={"relative"}>
                      <TextField
                        inputProps={{
                          autoComplete: "off",
                        }}
                        variant="outlined"
                        size="small"
                        name="issued_by"
                        type="text"
                        value={values?.issued_by}
                        placeholder="Enter Certificate Issuer"
                        onChange={handleChange}
                        error={errors.issued_by ? true : false}
                      />
                      {errors?.issued_by && (
                        <span
                          style={{
                            position: "absolute",
                            bottom: "-18px",
                            left: "0px",
                          }}
                        >
                          <img
                            src="/assets/error-outline-red.svg"
                            alt=""
                            style={{ width: "8px", height: "8px" }}
                          />
                          <span
                            style={{
                              marginLeft: "3px",
                              fontSize: "10px",
                              color: "#d7282f",
                            }}
                          >
                            {errors?.issued_by}
                          </span>
                        </span>
                      )}
                    </FullFieldValue>
                  </FullFieldContainer>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FullFieldContainer>
                     <FullFieldLabel className="certificatespacing">Certificate URL/LINK</FullFieldLabel>
                    <FullFieldValue>
                      <TextField
                        inputProps={{
                          autoComplete: "off",
                        }}
                        variant="outlined"
                        size="small"
                        name="certificate_url"
                        type="text"
                        value={values.certificate_url}
                        placeholder="https://example.com"
                        onChange={handleChange}
                        error={Boolean(errors?.certificate_url)}
                        helperText={
                          errors?.certificate_url && (
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                color: "#d7282f",
                              }}
                            >
                              <img
                                src="/assets/error-outline-red.svg"
                                alt=""
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  marginRight: "4px",
                                }}
                              />
                              <div>
                                {errors?.certificate_url?.toString() ?? ""}
                              </div>
                            </span>
                          )
                        }
                      />
                    </FullFieldValue>
                  </FullFieldContainer>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FullFieldContainer>
                     <FullFieldLabel className="certificatespacing">
                      Certificate No. <span className="detailastrics">*</span>
                    </FullFieldLabel>
                    <FullFieldValue position={"relative"}>
                      <TextField
                        inputProps={{
                          autoComplete: "off",
                        }}
                        variant="outlined"
                        size="small"
                        name="reference_no"
                        type="text"
                        value={values.reference_no}
                        placeholder="Enter Certificate No."
                        onChange={handleCertificateChange}
                        error={errors?.reference_no ? true : false}
                      />
                      {errors?.reference_no && (
                        <span
                          style={{
                            position: "absolute",
                            bottom: "-18px",
                            left: "0px",
                          }}
                        >
                          <img
                            src="/assets/error-outline-red.svg"
                            alt=""
                            style={{ width: "8px", height: "8px" }}
                          />
                          <span
                            style={{
                              marginLeft: "3px",
                              fontSize: "10px",
                              color: "#d7282f",
                            }}
                          >
                            {errors?.reference_no}
                          </span>
                        </span>
                      )}
                    </FullFieldValue>
                  </FullFieldContainer>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FullFieldContainer>
                     <FullFieldLabel className="certificatespacing">
                      Certificate Image <span className="detailastrics">*</span>{" "}
                      <ImageFormatSpan> {imageFormatDocs}</ImageFormatSpan>
                    </FullFieldLabel>
                    <UploadImgBox>
                      <FieldBorder
                        style={{
                          position: "relative",
                          border: `${errors.images ? "1px solid #d32f2f" : ""}`,
                        }}
                      >
                        <FileUpload
                          fileType={".pdf,.doc,.docx,.png,.jpeg,.jpg,.xls,.xlsx"}
                          name="transaction_documents"
                          files={values.images}
                          error={(error) =>
                            formik.setFieldError("images", error)
                          }
                          updateFiles={(e) => {
                            if (e?.length > 3) {
                              formik.setFieldError(
                                "images",
                                "Please upload maximum 3 photos"
                              );
                              return;
                            } else {
                            formik.setFieldError("images", "");
                            formik.setFieldValue("images", [...e]);
                            }
                          }}
                          removedFile={(deletedID) =>
                            formik.setFieldValue(
                              "deleted_images_ids",
                              deletedID
                            )
                          }
                        />
                        {errors.images ? (
                          <span
                            style={{
                              color: "#d7282f",
                              position: "absolute",
                              bottom: "-16px",
                              fontSize: "10px",
                              marginLeft: "-3px",
                            }}
                          >
                            <span>
                              <img
                                src="/assets/error-outline-red.svg"
                                alt=""
                                style={{ width: "8px", height: "8px" }}
                              />
                            </span>{" "}
                            {errors.images}
                          </span>
                        ) : (
                          ""
                        )}
                      </FieldBorder>
                    </UploadImgBox>
                  </FullFieldContainer>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                <FullFieldContainer>
                   <FullFieldLabel className="certificatespacing">Status</FullFieldLabel>
                  <FullFieldValue className="lala">
                    <FormControl sx={{ width: "100%" }}>
                      <Select
                        name="status"
                        size="small"
                        value={formik.values.status}
                        onChange={handleChange}
                      displayEmpty
                      >
                        <MenuItem value={"enable"}>Enable</MenuItem>
                        <MenuItem value={"disable"}>Disable</MenuItem>
                      </Select>
                    </FormControl>
                  </FullFieldValue>
                </FullFieldContainer>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <FullFieldContainer>
                    <TextArea
                      values={values.message}
                      handleInputChange={handleInputChange}
                      errors={errors.message}
                      count={350}
                      placeholder={"Enter Description"}
                      name="Certificate Description"
                    />
                  </FullFieldContainer>
                </Grid>
              </Grid>
            </FormControl>
            <Divider variant="middle" style={{ margin: "10px 0" }} />
            <Grid container>
              <Grid item xs={12} p={2}>
                <SaveButtonContainer>
                  <Blackoutlinebtn
                    onClick={() => {
                      onClose(false), formik.resetForm();
                    }}
                  >
                    Cancel
                  </Blackoutlinebtn>
                  <Redoutlinebtn style={{ height: "36px" }} type="submit">
                    {loader ? (
                      <ThreeDots
                        height="36"
                        width="40"
                        radius="9"
                        color="#d7282e"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                      />
                    ) : editMode ? (
                      "Update"
                    ) : (
                      "Save "
                    )}
                  </Redoutlinebtn>
                </SaveButtonContainer>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
export default HonorAndAward;
