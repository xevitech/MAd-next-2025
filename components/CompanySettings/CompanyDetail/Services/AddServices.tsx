import React, { useContext, useState } from "react";
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
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextareaAutosize,
  TextField,
  Typography,
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
  convertSize,
  imageFormat,
  imageSize,
  imageSizeMessage,
  imageType,
  imageTypeMessage,
} from "@/components/common/common";
import { MyAppContext } from "@/contextApi/appContext";
import { ThreeDots } from "react-loader-spinner";
import { ServiceAddText } from "../style";
import HelperText from "../Common/helperText";
import { UploadImgBox } from "../Certificates/style";
const AddServices = ({
  type,
  setAddMore,
  fetchServicesList,
  editColumn,
  setEditColumn,
}) => {
  const { setCompleteScreenLoader } = useContext(MyAppContext);
  const [loading, setLoading] = useState(false);
  const validation = Yup.object().shape({
    title: Yup.string().required("Please enter title").trim(),
    description: Yup.string()
      .required("Please enter description")
      .max(256, "Max Characters Limit Reached!")
      .trim(),
    image: Yup.array()
      .min(1, "Please upload service image")
      .max(3, "Please upload maximum 3 images")
      .nullable()
      .test("fileFormat", imageTypeMessage, (value) => {
        if (value) {
          return value.every((file) => {
            if (file.type) {
              return imageType.includes(file.type);
            }
            return /\.(jpeg|jpg|png|gif)$/.test(file.source);
          });
        }
        return true;
      })
      .test("fileSize", imageSizeMessage, (value) => {
        if (value) {
          return value.every((file) => {
            if (file.size) {
              return convertSize(file.size, "MB") <= imageSize;
            }
            return true;
          });
        }
        return true;
      }),
  });
  const formData = new FormData();

  const viewData = JSON.parse(localStorage.getItem("userData1"));
  const shopid = viewData?.basic_information?.shop_id;
  let shop_id = localStorage?.shop_id ?? shopid;
  let formik = useFormik({
    initialValues: {
      title: editColumn?.title ?? "",
      description: editColumn?.description ?? "",
      image: editColumn.image ? editColumn?.image : [],
      type: "service",
      status: editColumn.status ? editColumn?.status : "enable",
      removed_images: [],
    },
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setLoading(true);
      let dataToSend;
      let endPoint = type === "edit" ? "edit" : "create";
      if (type === "edit") {
        if (typeof values?.image == "string") {
          const { type, title, description, status, removed_images } = values;
          formData.append("type", type);
          formData.append("title", title);
          formData.append("status", status);
          formData.append("description", description);
          formData.append("shop_id", shop_id);
          formData.append("id", editColumn?.id);
          formData.append("removed_images", removed_images.join(","));
        } else {
          const { title, description, status, removed_images } = values;
          formData.append("title", title);
          formData.append("status", status);
          formData.append("description", description);
          values?.image.forEach((item) => formData.append("image[]", item));
          formData.append("shop_id", shop_id);
          formData.append("id", editColumn?.id);
          formData.append("removed_images", removed_images.join(","));
        }
      } else {
        const { type, title, description, status } = values;
        formData.append("type", type);
        formData.append("title", title);
        formData.append("status", status);
        formData.append("description", description);
        values?.image.forEach((item) => formData.append("image[]", item));
        formData.append("shop_id", shop_id);
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
        fetchServicesList();
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
  const maxCharacters = 256;

  const handleInputChange = (e) => {
    const value = e.target.value;
    formik.setFieldValue("description", value);
    formik.setFieldError("description", "");
    if (value.length > 256) {
      formik.setFieldError(
        "description",
        `Max Characters Limit ${maxCharacters} Reached!`
      );
      return;
    }
  };
  const { errors } = formik;

  let imageName = formik?.values?.image;
  if (typeof imageName === "string") {
    let extractedImageName = imageName?.split("_");
    imageName = extractedImageName[1];
  }

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;
    formik.setFieldValue("status", newValue);
  };
  return (
    <>
      <Grid container sx={{ padding: "12px 16px 0px 16px" }}>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Grid container className="addservice_label">
            <Grid item xs={12} md={12}>
              <ServiceAddText variant="h6">
                {type == "add-more" ? "Add New " : "Update "} Services
              </ServiceAddText>
              <FullFieldContainer>
                <FullFieldLabel>
                  Title <span className="detailastrics">*</span>
                </FullFieldLabel>

                <FullFieldValue position={"relative"}>
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
                  Services Image <span className="detailastrics">*</span>
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
                          fileType="image/*"
                          single={false}
                          name="certificate"
                          mode={"edit"}
                          files={formik.values.image}
                          error={(error) =>
                            formik.setFieldError("image", error)
                          }
                          updateFiles={(e) => {
                            if (e.length > 3) {
                              formik.setFieldError(
                                "image",
                                "You can only Upload 3 Image"
                              );
                              return;
                            }

                            formik.setFieldValue("image", e);
                            formik.setFieldError("image", "");
                          }}
                          removedFile={(imageId) => {
                            formik.setFieldValue("removed_images", imageId);
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
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs={12} md={12}>
              <FullFieldContainer>
                <FullFieldLabel>Status</FullFieldLabel>
                <FullFieldValue className="lala">
                  <FormControl sx={{ width: "100%" }}>
                    <Select
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
          </Grid>
          <Grid container>
            <Grid item xs={12} md={12}>
              <FullFieldContainer>
                <FullFieldLabel className="removemargin">
                  Service Description <span className="detailastrics">*</span>
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
                    placeholder="Enter service description"
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

          <Grid container className="add_ser_remaining">
            <Grid item xs={12}>
              <FullFieldContainer>
                <DescriptionTextContainer>
                  Maximum characters:{" "}
                  {`${Number(formik.values.description.length)}/256`}
                </DescriptionTextContainer>
              </FullFieldContainer>

              <FullFieldContainer>
                <DescriptionTextContainer>
                  Briefly describe the features of your services
                </DescriptionTextContainer>
              </FullFieldContainer>
            </Grid>
          </Grid>

          <Divider variant="middle" sx={{ margin: "10px 0" }} />
          <Grid container pt={2}>
            <Grid item xs={12}>
              <Box>
                <SaveButtonContainer>
                  <>
                    <Blackoutlinebtn
                      borderRadius={"6px"}
                      height={"35px"}
                      onClick={() => setAddMore("")}
                    >
                      Cancel
                    </Blackoutlinebtn>
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
                          color="#D7282F"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          visible={true}
                        />
                      ) : (
                        <>{type == "add-more" ? "Save" : "Update"}</>
                      )}
                    </Redoutlinebtn>
                  </>
                </SaveButtonContainer>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default AddServices;
