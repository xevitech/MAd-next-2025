import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Divider, FormControl, MenuItem, Select, TextField } from "@mui/material";
import {
  SaveButtonContainer,
  FullFieldLabel,
  FullFieldValue,
  FullFieldContainer,
  FieldBorder,
  ImageFormatSpan,
} from "../../../commonStyles";
import {
  Blackoutlinebtn,
  Redoutlinebtn,
} from "@/components/common/buttons/ButtonsVariations";
import { CustomDropdown } from "@/components/common/customDropdown";
import { FileUpload } from "@/components/common/uploadFile";
import { CustomDatePicker } from "@/components/common/datePicker";
import { ThreeDots } from "react-loader-spinner";
import { useFormik } from "formik";
import { apiClient, imageFormatDocs, urlWithHttp } from "@/components/common/common";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { UploadImgBox } from "../../style";
const Patent = ({ editData, onClose }) => {
  const [loader, setLoader] = useState<boolean>(false);
  let editMode = Object.keys(editData).length > 0 ? true : false;
  const PatentTypes = [
    "Patent Invention",
    "Practical Patents",
    "Apperance design",
  ];
  const validation: any = Yup.object().shape({
    type_of_patent: Yup.string().required("Please select type of patent"),
    name: Yup.string().required("Please enter patent name"),
    start_date: Yup.date().required("Please select start date"),
    end_date: Yup.date()
      .required("Please select date of expiration")
      .min(
        Yup.ref("start_date"),
        "date of expiration can't be before Start date"
      ),
    certificate_url: Yup.string().url('Please enter a valid URL (http:// or https://)').nullable(),

    images: Yup.array().min(1, "Please select patent image"),
  });
  const formik: any = useFormik({
    validateOnChange: false,
    validationSchema: validation,
    enableReinitialize: true,
    initialValues: {
      type_of_patent: editData?.type_of_patent ?? "",
      name: editData?.name ?? "",
      start_date: editData?.start_date ?? "",
      end_date: editData?.end_date ?? "",
      certificate_url: editData?.certificate_url ?? "",
      no_of_patent: editData?.no_of_patent ?? "",
      images: editData?.images ?? [],
      type: "patent",
      deleted_images_ids: [],
      status: editData?.status??"enable",
    },
    onSubmit: async (values) => {
     if (loader) return;
      let endPoints = editMode ? "edit" : "create";
      let formData = new FormData();
      formData.append("name", values?.name);
      formData.append("status",values?.status);
      formData.append("type_of_patent", values?.type_of_patent);
      formData.append("start_date", values?.start_date);
      formData.append("end_date", values?.end_date);
      formData.append("certificate_url", values?.certificate_url);
      formData.append("no_of_patent", values?.no_of_patent);
      for (let i = 0; i < values.images.length; i++) {
        if (!values?.images[i].id)
          formData.append("images[]", values?.images[i]);
      }
      formData.append("type", values?.type);
      if (endPoints == "edit") {
        if (values.deleted_images_ids) {
          formData.append(
            "deleted_images_ids",
            values?.deleted_images_ids.join(",")
          );
        }
        formData.append("id", editData?.id);
      }
       setLoader(true);
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
      }else{
      setLoader(true);
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

  const { values, errors } = formik;

  return (
    <>
      <Grid container p={2} pt={1} className="companydetail_addservice">
        <Grid item xs={12} lg={12}>
          <form className="test_report_tab" onSubmit={formik.handleSubmit}>
            <FormControl>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <FullFieldContainer>
                     <FullFieldLabel className="certificatespacing">
                      Patent Name <span className="detailastrics">*</span>
                    </FullFieldLabel>
                    <FullFieldValue position={"relative"}>
                      <TextField
                        inputProps={{
                          autoComplete: "off",
                        }}
                        sx={{ width: "100%" }}
                        variant="outlined"
                        size="small"
                        name="name"
                        type="text"
                        value={values.name}
                        placeholder="Enter patent name"
                        onChange={handleChange}
                        error={errors?.name ? true : false}
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
                      Type of Patent <span className="detailastrics">*</span>
                    </FullFieldLabel>
                    <FullFieldValue>
                      <CustomDropdown
                        name="type_of_patent"
                        value={values.type_of_patent}
                        options={PatentTypes?.map((ele, index) => ({
                          value: ele,
                          id: index,
                        }))}
                        placeholder={"Select type of patent"}
                        handleChange={handleChange}
                        errorText={errors?.type_of_patent ?? ""}
                        error={errors?.type_of_patent ? true : false}
                        overlay={true}
                      />
                    </FullFieldValue>
                  </FullFieldContainer>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FullFieldContainer>
                     <FullFieldLabel className="certificatespacing">No. of Patent</FullFieldLabel>
                    <FullFieldValue>
                      <TextField
                        inputProps={{
                          autoComplete: "off",
                        }}
                        style={{
                          width: "100%",
                          paddingBottom: "4px",
                        }}
                        variant="outlined"
                        size="small"
                        name="no_of_patent"
                        type="text"
                        value={values?.no_of_patent}
                        placeholder="Enter no. of patent"
                        onChange={(e) => {
                          const regex = /^[0-9\b]+$/;
                          if (
                            e.target.value === "" ||
                            regex.test(e.target.value)
                          ) {
                            handleChange(e);
                          }
                        }}
                        helperText={errors?.no_of_patent ?? ""}
                        error={errors?.no_of_patent ? true : false}
                      />
                    </FullFieldValue>
                  </FullFieldContainer>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FullFieldContainer>
                     <FullFieldLabel className="certificatespacing">URL/LINK</FullFieldLabel>
                    <FullFieldValue>
                      <TextField
                        inputProps={{
                          autoComplete: "off",
                        }}
                        sx={{ width: "100%" }}
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
                          
                        <Box component={"span"}
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
                            </Box>
                          )
                        }
                      />
                    </FullFieldValue>
                  </FullFieldContainer>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FullFieldContainer>
                     <FullFieldLabel className="certificatespacing">
                      Start Date <span className="detailastrics">*</span>
                    </FullFieldLabel>
                    <FullFieldValue>
                      <FormControl style={{ width: "100%", height: "50%" }}>
                        <CustomDatePicker
                          name={"start_date"}
                          value={values?.start_date || "0000-00-00"}
                          handleChange={handleChange}
                          error={errors?.start_date ? true : false}
                          errorText={errors?.start_date ?? ""}
                        />
                      </FormControl>
                    </FullFieldValue>
                  </FullFieldContainer>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FullFieldContainer>
                     <FullFieldLabel className="certificatespacing">
                      Date of Expiration{" "}
                      <span className="detailastrics">*</span>
                    </FullFieldLabel>
                    <FullFieldValue>
                      <FormControl style={{ width: "100%", height: "50%" }}>
                        <CustomDatePicker
                          name={"end_date"}
                          value={values?.end_date || "0000-00-00"}
                          handleChange={handleChange}
                          error={errors?.end_date ? true : false}
                          errorText={errors?.end_date ?? ""}
                        />
                      </FormControl>
                    </FullFieldValue>
                  </FullFieldContainer>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FullFieldContainer>
                     <FullFieldLabel className="certificatespacing">
                      Patent Image <span className="detailastrics">*</span>
                      <ImageFormatSpan> {imageFormatDocs}</ImageFormatSpan>
                    </FullFieldLabel>
                    <UploadImgBox>
                      <FullFieldValue>
                        <FieldBorder
                          style={{
                            position: "relative",
                            border: `${
                              errors.images ? "1px solid #d32f2f" : ""
                            }`,
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
                                color: "#d32f2f",
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
                      </FullFieldValue>
                    </UploadImgBox>
                  </FullFieldContainer>
                </Grid>
                <Grid item xs={6} sm={4} md={6}><FullFieldContainer>
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
                </FullFieldContainer></Grid>
              </Grid>
            </FormControl>
            <Divider variant="middle" style={{ margin: "20px 0" }} />
            <Grid item xs={12}>
              <SaveButtonContainer>
                <Blackoutlinebtn
                  onClick={() => {
                    onClose(false), formik.resetForm();
                  }}
                >
                  Cancel
                </Blackoutlinebtn>
                <Redoutlinebtn type="submit" disabled={loader}>
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
                    "Save"
                  )}
                </Redoutlinebtn>
              </SaveButtonContainer>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
export default Patent;
