import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  DescriptionTextContainer,
  ErrorMessage,
  SaveButtonContainer,
  FullFieldLabel,
  FullFieldValue,
  FullFieldContainer,
  FieldBorder,
} from "@/components/CompanySettings/CompanyDetail/commonStyles";
import {
  Box,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextareaAutosize,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import { FileUpload } from "@/components/common/uploadFile";
import {
  Blackoutlinebtn,
  Redoutlinebtn,
} from "@/components/common/buttons/ButtonsVariations";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  apiClient,
  convertDate,
  imageFormat,
} from "@/components/common/common";
import { MyAppContext } from "@/contextApi/appContext";
import { ThreeDots } from "react-loader-spinner";
import { TypographyAddHeading } from "../style";
import HelperText from "../Common/helperText";
import { UploadImgBox } from "../Certificates/style";
import { CustomDateTimePicker } from "@/components/common/datePicker/CustomDateTimePicker";
const AddNewsRoom = ({
  type,
  setAddMore,
  fetchNewsRoomList,
  editColumn,
  setEditColumn,
}) => {
  const { setCompleteScreenLoader } = useContext(MyAppContext);
  const [loading, setLoading] = useState(false);
  const validation = Yup.object().shape({
    title: Yup.string()
      .max(20, "The content is too long. Please limit it to 20 characters")
      .trim()
      .required("Please enter title"),
    description: Yup.string()
      .required("Please enter newsroom description")
      .trim()
      .max(256, "The content is too long. Please limit it to 256 characters"),
    image: Yup.array()
      .min(1, "Please upload services image")
      .max(3, "Please upload maximum 3 images")
      .nullable()
      .required("Please upload newsroom image"),
    start_date: Yup.date().required("Please select start date"),
    end_date: Yup.date()
      .required("Please select end date")
      .min(Yup.ref("start_date"), "End date can't be before Start date"),
  });

  const ValidateField = (field: string) => {
    if (formik.errors[field] && formik.touched[field]) return true;
    else return false;
  };
  const handleChangeStart = (value) => {
    formik.setFieldValue("start_date", value);
    formik.setFieldError("start_date", "");
  };
  const handleChangeEnd = (value) => {
    formik.setFieldValue("end_date", value);
    formik.setFieldError("end_date", "");
  };

  const formData = new FormData();
  let shop_id = localStorage?.shop_id;
  let formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: editColumn?.title ?? "",
      description: editColumn?.description ?? "",
      image: editColumn.image ? editColumn.image : [],
      type: "news",
      status: editColumn?.status ?? "enable",
      start_date: editColumn?.start_date ?? "",
      end_date: editColumn?.end_date ?? "",
      removed_images: [],
    },
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setLoading(true);

      let endPoint = type === "edit" ? "edit" : "create";

      if (type === "edit") {
        const {
          title,
          description,
          start_date,
          end_date,
          status,
          removed_images,
        } = values;

        const convertedStartDate = convertDate(start_date);
        const convertedEndDate = convertDate(end_date);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("shop_id", shop_id);
        formData.append("id", editColumn?.id);
        formData.append("start_date", convertedStartDate);
        formData.append("end_date", convertedEndDate);
        formData.append("status", status);
        values?.image.forEach((item) => formData.append("image[]", item));
        formData.append("removed_images", removed_images.join(","));
      } else {
        const {
          type,
          title,
          description,
          start_date,
          end_date,
          status,
          removed_images,
        } = values;
        const convertedStartDate = convertDate(start_date);
        const convertedEndDate = convertDate(end_date);
        formData.append("type", type);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("shop_id", shop_id);
        formData.append("start_date", convertedStartDate);
        formData.append("end_date", convertedEndDate);
        formData.append("status", status);
        values?.image.forEach((item) => formData.append("image[]", item));
        formData.append("removed_images", removed_images.join(","));
      }
      let response = await apiClient(
        `company_profile/services_news/${endPoint}`,
        "post",
        {
          body: formData,
        },
        true
      );

      if (response.status === 200) {
        if (type === "edit") setEditColumn({});
        setAddMore("");
        fetchNewsRoomList();
      } else if (response?.status === false) {
        const errorMessage =
          response.message?.[0] ?? "The title has already been taken";
        formik.setFieldError("title", errorMessage);
        setLoading(false);
      } else {
        setCompleteScreenLoader(false);
      }
    },
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    formik.setFieldValue("description", value);
    formik.setFieldError("description", "");
    if (value.length > 256) {
      formik.setFieldError(
        "description",
        "The content is too long. Please limit it to 256 characters"
      );
      return;
    }
  };

  let imageName = formik?.values?.image;
  if (typeof imageName === "string") {
    let extractedImageName = imageName?.split("_");
    imageName = extractedImageName[1];
  }

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;
    formik.setFieldValue("status", newValue);
  };

  const { values, errors }: any = formik;
  return (
    <>
      <Grid
        container
        sx={{
          padding: "12px 16px 0px 16px",
          "& .reducemargin": { margin: "10px 0px 5px " },
        }}
      >
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} className="addservice_label">
              <TypographyAddHeading variant="h6">
                {editColumn?.id == "" || editColumn?.id == undefined
                  ? "Add"
                  : "Update"}{" "}
                Newsroom
              </TypographyAddHeading>
              <FullFieldContainer>
                <FullFieldLabel>
                  Title <span className="detailastrics">*</span>
                </FullFieldLabel>
                <FullFieldValue>
                  <TextField
                    style={{ width: "100%" }}
                    variant="outlined"
                    size="small"
                    name="title"
                    type="title"
                    placeholder="Enter title"
                    value={formik.values.title}
                    onChange={(e: any) => {
                      if (e.target.value.length > 20) {
                        formik.setFieldError(
                          "title",
                          "The content is too long. Please limit it to 20 characters"
                        );
                      } else {
                        formik.setFieldError("title", "");
                        formik.handleChange(e);
                      }
                    }}
                    error={errors?.title ? true : false}
                  />
                  <Box sx={{ marginTop: "-5px" }}>
                    {errors?.title && <HelperText errorText={errors?.title} />}
                  </Box>
                </FullFieldValue>
              </FullFieldContainer>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              className="addservice_label service_imglable"
              sx={{ margin: "-3px 0 0 0" }}
            >
              <Box>
                <FullFieldLabel
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    "@media screen and (max-width:600px)": {
                      display: "block",
                    },
                  }}
                >
                  Newsroom Image <span className="detailastrics">*</span>
                  <Box>
                    <Typography
                      sx={{ fontSize: "10px", color: "#231f20", opacity: "1" }}
                    >
                      {imageFormat}
                    </Typography>
                  </Box>
                </FullFieldLabel>
                <UploadImgBox>
                  <FullFieldValue>
                    <FieldBorder
                      style={{
                        position: "relative",
                        border: `${errors?.image ? "1px solid #d32f2f" : ""}`,
                      }}
                    >
                      <div>
                        <FileUpload
                          fileType=""
                          name="Test/ReportFile"
                          files={formik.values.image}
                          single={false}
                          error={(error) =>
                            formik.setFieldError("image", error)
                          }
                          updateFiles={(e) => {
                            if (e?.length > 3) {
                              formik.setFieldError(
                                "image",
                                "Please can upload maximum 3 photos"
                              );
                              return;
                            } else {
                              formik.setFieldError("image", "");
                              formik.setFieldValue("image", [...e]);
                            }
                          }}
                          removedFile={(deletedID) => {
                            formik.setFieldValue("removed_images", deletedID);
                          }}
                        />
                      </div>
                    </FieldBorder>
                    <Box sx={{ marginTop: "-5px" }}>
                      {errors?.image && (
                        <HelperText errorText={errors?.image} />
                      )}
                    </Box>
                  </FullFieldValue>
                </UploadImgBox>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} sx={{ margin: "-3px 0 0 0" }}>
              <FullFieldContainer>
                <FullFieldLabel
                  className="reducemargin"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    "@media screen and (max-width:600px)": {
                      display: "block",
                    },
                  }}
                >
                  Start Date <span className="detailastrics">*</span>
                </FullFieldLabel>
                <CustomDateTimePicker
                  label={""}
                  value={formik.values.start_date}
                  handleChange={handleChangeStart}
                  error={ValidateField("start_date")}
                />
                <Box sx={{ marginTop: "-5px" }}>
                  {errors?.start_date && (
                    <HelperText errorText={errors?.start_date} />
                  )}
                </Box>
              </FullFieldContainer>
            </Grid>

            <Grid item xs={12} sm={12} md={6} sx={{ margin: "-3px 0 0 0" }}>
              <FullFieldContainer>
                <FullFieldLabel
                  className="reducemargin"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    "@media screen and (max-width:600px)": {
                      display: "block",
                    },
                  }}
                >
                  End Date <span className="detailastrics">*</span>
                </FullFieldLabel>

                <CustomDateTimePicker
                  label={""}
                  value={formik.values.end_date}
                  handleChange={handleChangeEnd}
                  error={ValidateField("end_date")}
                />
                <Box sx={{ marginTop: "-5px" }}>
                  {errors?.end_date && (
                    <HelperText errorText={errors?.end_date} />
                  )}
                </Box>
              </FullFieldContainer>
            </Grid>

            <Grid item xs={12} sm={12} md={12} mt={-1}>
              <FullFieldContainer>
                <FullFieldLabel
                  className="reducemargin"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    "@media screen and (max-width:600px)": {
                      display: "block",
                    },
                  }}
                >
                  Visible on Minisite
                </FullFieldLabel>
                <FullFieldValue>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      fullWidth
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
            <Grid item xs={12} sm={12} md={12} mt={-1}>
              <FullFieldContainer>
                <FullFieldLabel className="removemargin">
                  News Description <span className="detailastrics">*</span>
                </FullFieldLabel>
                <FullFieldValue>
                  <TextareaAutosize
                    style={{
                      width: "100%",
                      minHeight: "60px",
                      maxHeight: 200,
                      overflowY: "scroll",
                      borderColor: errors?.description
                        ? "#e74c3c"
                        : "rgba(0, 0, 0, 0.23)",
                      borderRadius: "6px",
                      fontFamily: "Open Sans",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "#000",
                      lineHeight: "23px",
                      padding: "8px",
                      outline: "none",
                      resize: "none",
                    }}
                    value={formik.values.description}
                    name="description"
                    onChange={(e: any) => {
                      if (e.target.value.length > 256) {
                        formik.setFieldError(
                          "description",
                          "The content is too long. Please limit it to 256 characters"
                        );
                        const newValue1 = e.target.value.slice(0, 256);
                        formik.setFieldValue("description", newValue1);
                      } else {
                        formik.setFieldError("description", "");
                        handleInputChange(e);
                      }
                    }}
                    placeholder="Enter news description"
                  />

                  <Box sx={{ marginTop: "-5px !important" }}>
                    <ErrorMessage
                      className={`${
                        formik.errors.description
                          ? "MuiFormHelperText-root"
                          : ""
                      }`}
                    >
                      {formik.errors?.description && (
                        <HelperText errorText={formik.errors?.description} />
                      )}
                    </ErrorMessage>
                  </Box>
                </FullFieldValue>
              </FullFieldContainer>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div className="addnews">
              <FullFieldContainer>
                <DescriptionTextContainer>
                  Maximum characters:{" "}
                  {`${Number(formik.values.description.length)}/256`}
                </DescriptionTextContainer>
              </FullFieldContainer>
              <FullFieldContainer>
                <DescriptionTextContainer>
                  Please Briefly describe your company&apos;s advantages.
                </DescriptionTextContainer>
              </FullFieldContainer>
            </div>
          </Grid>

          <Divider variant="middle" sx={{ margin: "10px 0" }} />
          <Grid item xs={12}>
            <Box>
              <SaveButtonContainer value={{ gap: 5 }}>
                <Blackoutlinebtn
                  borderRadius={"6px"}
                  height={"35px"}
                  onClick={() => setAddMore("")}
                >
                  Cancel
                </Blackoutlinebtn>
                <>
                  <Redoutlinebtn
                    type="submit"
                    borderRadius={"6px"}
                    height={"35px"}
                  >
                    {loading ? (
                      <ThreeDots
                        height="36px"
                        width="36px"
                        radius="9"
                        color="#d7282f"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                      />
                    ) : (
                      <>
                        {editColumn?.id == "" || editColumn?.id == undefined
                          ? "Add"
                          : "Update"}
                      </>
                    )}
                  </Redoutlinebtn>
                </>
              </SaveButtonContainer>
            </Box>
          </Grid>
        </form>
      </Grid>
    </>
  );
};
export default AddNewsRoom;
