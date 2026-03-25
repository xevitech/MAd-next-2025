import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Grid,
  Divider,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Button,
} from "@mui/material";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Box } from "@/components/dashboard/style";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { apiClient, formatFileName } from "@/components/common/common";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyProfile } from "@/hooks/company";
import RemoveIcon from "@mui/icons-material/Remove";
import { ThreeDots } from "react-loader-spinner";
import { VisuallyHiddenInput } from "@/components/common/uploadFile/styled";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { MyAppContext } from "@/contextApi/appContext";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  AstricksMark,
  ButtonModeHere,
  CancelTextWithIcon,
  CompanyFacilityData,
  CompanyFacilityInnContainerQAQCnRND,
  DataRowHere,
  DataRowTitle,
  DataRowValue,
  EditBrowseIcon,
  EditBrowseText,
  EditModeBoxContainer,
  EditSaveIcons,
  EditSaveIcons1,
  EditUpImagesStack,
  PlushIcon,
  PlushIconBox,
  QaqcandRndSeparation,
  SaveTextWithIcon,
  SelectedEditImg,
  SelectedEditSection,
  SubHeadingPage,
  TypographyTitle,
  UpImageName,
  UploadImageCol,
  UploadImagesRow,
  ViewMorLess,
} from "../style";
import HelperText from "../../Common/helperText";

const initialFormValues = {
  process_name: "",
  testing_certificate: [],
  process_description: "",
};

export const QualityControlPress = ({
  departmentData,
  handlCallBackFunction,
}) => {
  const [formBlocks, setFormBlocks] = useState([initialFormValues]);
  const { companyDetails }: any = useSelector(
    (state: any) => state.companyProfile
  );
  const [editMode, setEditMode] = useState(false);
  const [loader, setLoader] = useState(false);
  const manufactureData = companyDetails?.qaqc_rnd?.manufacture_qaqc;
  const [visibleCount, setVisibleCount] = useState(5);

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const handleViewLess = () => {
    setVisibleCount((prevCount) => (prevCount > 5 ? prevCount - 5 : 5));
  };
  useEffect(() => {
    const initialFormValues = {
      process_name: "",
      testing_certificate: [],
      process_description: "",
    };
    formik.setFieldError(initialFormValues);
  }, []);
  const removeFile = (indexToRemove: number, index: number) => {
    const formValues = formik.values.forms;
    const updatedValues = formValues.map((form, fieldIndex) => {
      if (fieldIndex === index) {
        return {
          ...form,
          testing_certificate: form.testing_certificate.filter(
            (_, fileIndex) => fileIndex !== indexToRemove
          ),
        };
      }
      return form;
    });

    formik.setFieldValue("forms", updatedValues);
  };

  let data = [];
  if (manufactureData) {
    try {
      const parsedData = JSON.parse(manufactureData);
      if (
        Array.isArray(parsedData?.QualityControlProcess) &&
        parsedData.QualityControlProcess.length > 0
      ) {
        parsedData.QualityControlProcess.forEach((equipmentEntry) => {
          if (Array.isArray(equipmentEntry.quality_control_press)) {
            data = equipmentEntry.quality_control_press;
          }
        });
      }
    } catch (error) {}
  }
  const manufactureQualityControl =
    companyDetails?.qaqc_rnd?.manufacture_qaqc || null;
  const [image, setImage] = useState<string>(
    manufactureQualityControl ? manufactureQualityControl : null
  );
  const [imagesByIndex, setImagesByIndex] = useState<{
    [key: number]: string[];
  }>({});
  const [imageIndex, setImagesIndex] = useState("");
  let testingImageUrl = "";
  try {
    if (manufactureQualityControl) {
      const qualityControlImage = JSON.parse(manufactureQualityControl);
      testingImageUrl =
        qualityControlImage?.QualityControlProcess.quality_control[0]
          .testing_certificate;
    }
  } catch (error) {}
  const { setCompleteScreenLoader } = useContext(MyAppContext);
  const [filesByIndex, setFilesByIndex] = React.useState<{
    [key: number]: File[];
  }>({});
  const dispatch = useDispatch();
  const addFiles = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e?.target?.files || []);
    const acceptedFileTypes = ["image/jpeg", "image/png"];
    const maxFileSize = 2 * 1024 * 1024;
    formik.setFieldError(`forms[${index}].testing_certificate`, "");

    const filteredFiles = files.filter((file: File) => {
      if (!acceptedFileTypes.includes(file.type)) {
        formik.setFieldError(
          `forms[${index}].testing_certificate`,
          "Only JPG and PNG formats are accepted."
        );
        return false;
      }
      if (file.size > maxFileSize) {
        formik.setFieldError(
          `forms[${index}].testing_certificate`,
          "File size must be less than 2MB."
        );
        return false;
      }
      return true;
    });

    if (filteredFiles.length === 0) {
      e.target.value = null;
      return;
    }

    const existingFiles = filesByIndex[index] || [];
    const updatedFiles = [...existingFiles, ...filteredFiles];

    if (updatedFiles.length > 3) {
      formik.setFieldError(
        `forms[${index}].testing_certificate`,
        "You can only upload up to 3 images."
      );
      e.target.value = null;
      return;
    }

    handleSaveImage(index, updatedFiles);

    e.target.value = null;
  };

  const handleSaveImage = async (index: number, files: File[]) => {
    let formData = new FormData();
    files.forEach((file) => {
      formData.append("company_photos[]", file);
    });

    try {
      setCompleteScreenLoader(true);
      const response = await apiClient(
        "company_profile/file_upload_qaqc_rnd",
        "post",
        { body: formData },
        true
      );

      if (response.status) {
        setCompleteScreenLoader(false);
        const responseData = response.data;
        const existingUrlsArray =
          formik.values.forms[index]?.testing_certificate || [];
        const newUrlsArray = [...existingUrlsArray, ...responseData];

        if (newUrlsArray.length > 3) {
          formik.setFieldError(
            `forms[${index}].testing_certificate`,
            "You can only upload up to 3 images."
          );
          return;
        }

        const updatedValues = formik.values.forms.map((form, i) => {
          if (i === index) {
            return {
              ...form,
              testing_certificate: newUrlsArray,
            };
          }
          return form;
        });

        formik.setFieldValue("forms", updatedValues);
      }
    } catch (error) {
      setCompleteScreenLoader(false);
    }
  };

  const handleRemove = (index) => {
    if (index !== 0) {
      const formList = formik.values.forms;
      const res = formList.filter((form, i) => {
        return i !== index;
      });

      formik.setFieldValue("forms", res);
    }
  };
  const removeFileDynamic = (index: number, imgIndex: number) => {
    const updatedImages = [...imagesByIndex[index]];
    updatedImages.splice(imgIndex, 1);

    setImagesByIndex((prev) => ({
      ...prev,
      [index]: updatedImages,
    }));
    formik.setFieldValue(`forms[${index}].testing_certificate`, updatedImages);
  };

  const validation = Yup.object().shape({
    forms: Yup.array().of(
      Yup.object().shape({
        process_name: Yup.string()
          .required("Please enter process name")
          .nullable(),
        testing_certificate: Yup.array()
          .nullable()
          .min(1, "Please upload at least one image")
          .max(3, "Please upload a maximum of 3 images")
          .required("Please upload an image"),
        process_description: Yup.string()
          .required("Please enter process description")
          .nullable(),
      })
    ),
  });

  const formik: any = useFormik({
    initialValues: {
      forms:
        data?.length > 0
          ? data.map((item) => ({
              ...item,
              testing_certificate:
                item.testing_certificate.flatMap((item) => item) || [],
            }))
          : [{ formBlocks }],
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: validation,
    onSubmit: async (values: any) => {
      setLoader(true);
      const value = values?.forms;
      const quality_control_press = value.map(
        ({ formBlocks, ...rest }, index) => ({
          ...rest,
          testing_certificate: values?.forms[index]?.testing_certificate || [],
        })
      );
      const combinedPayload = {
        shop_id: companyDetails.basic_information.shop_id,
        manufacture_qaqc: {
          Department: departmentData?.Department
            ? departmentData?.Department
            : [],
          QualityControlProcess: [
            {
              Show: editMode ? "yes" : "no",
              quality_control_press,
            },
          ],
          QualityTestEquipment: departmentData?.QualityTestEquipment
            ? departmentData?.QualityTestEquipment
            : [],
        },
      };

      let response = await apiClient(
        "company_profile/createRndManfctureQaqc",
        "POST",
        { body: combinedPayload }
      );
      if (response.status === 200 || response.status === 201) {
        setLoader(false);
        setSelectedValue("no");
        setEditMode(false);
        dispatch(getCompanyProfile());
        handlCallBackFunction();
      }
      setLoader(false);
    },
  });

  useEffect(() => {
    setImage(testingImageUrl);
  }, []);
  const handleSaveClick = () => {
    const touchedArray = formik.values.forms.map(() => ({
      process_name: true,
      testing_certificate: true,
      process_description: true,
    }));

    formik.setTouched({
      forms: touchedArray,
    });

    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        formik.handleSubmit();
      }
    });
  };

  const addFormBlock = () => {
    setFormBlocks((prevFormBlocks) => [...prevFormBlocks, initialFormValues]);
    const val = formik.values.forms;
    val?.push(initialFormValues);
  };

  const [selectedValue, setSelectedValue] = useState("no");
  const handleCancel = () => {
    setSelectedValue("no");
    setEditMode(false);

    formik.resetForm({
      values: {
        ...formik.values,
        forms: data,
      },
    });

    const formikValue = data;
    const storedDataLength = data?.length;

    const slicedValue = [
      formikValue[0],
      ...formikValue?.slice(1, storedDataLength),
    ];
    formik.setFieldValue("forms", slicedValue);
  };
  useEffect(() => {
    if (Array.isArray(formik.errors.forms)) {
      const updatedErrors = formik.errors.forms.map((form) => ({
        ...form,
        testing_certificate: "",
      }));

      formik.setErrors({
        ...formik.errors,
        forms: updatedErrors,
      });
    }
  }, []);

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (value == "yes") {
      setEditMode(true);
      if (Array.isArray(formik.errors.forms)) {
        const updatedErrors = formik.errors.forms.map((form) => ({
          ...form,
          testing_certificate: "",
        }));

        formik.setErrors({
          ...formik.errors,
          forms: updatedErrors,
        });
      }
    } else {
      setEditMode(false);
    }
  };

  return (
    <CompanyFacilityInnContainerQAQCnRND
      sx={{
        boxShadow: editMode ? "rgba(0, 0, 0, 0.16) 0px 1px 4px" : "",
        padding: editMode ? "16px" : "",
      }}
    >
      {!editMode && (
        <SubHeadingPage className="qaqcandrndHeading">
          <TypographyTitle>Quality Control Process Section</TypographyTitle>
          {data?.length > 0 && !editMode ? (
            <EditSaveIcons1 onClick={() => setEditMode(true)}>
              <img src="/assets/EditPencil.svg" alt="editImage" />
              <Typography>Edit</Typography>
            </EditSaveIcons1>
          ) : (
            <>
              {!editMode && (
                <ButtonModeHere>
                  <Box
                    sx={{
                      padding: "0px",
                      "& .MuiFormControlLabel-label": {
                        fontSize: "14px",
                        fontWeight: "400",
                      },
                    }}
                  >
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={selectedValue}
                        onChange={handleRadioChange}
                      >
                        <FormControlLabel
                          value="yes"
                          control={
                            <Radio
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: "19px",
                                },
                                "&.Mui-checked": {
                                  color: "#d7282f",
                                },
                              }}
                            />
                          }
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={
                            <Radio
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: "19px",
                                },
                                "&.Mui-checked": {
                                  color: "#d7282f",
                                },
                              }}
                            />
                          }
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </ButtonModeHere>
              )}
            </>
          )}
        </SubHeadingPage>
      )}
      <form onSubmit={() => formik.handleSubmit()}>
        <Box sx={{ position: "relative", p: 0 }}>
          {formik.values.forms?.map((form, index) => (
            <>
              {editMode && index === 0 ? (
                <TypographyTitle
                  sx={{
                    marginBottom: index === 0 ? "10px" : "10px !important",
                  }}
                >
                  Quality Control Process Section
                </TypographyTitle>
              ) : (
                <TypographyTitle
                  sx={{
                    marginBottom: index === 0 ? "10px" : "10px !important",
                  }}
                ></TypographyTitle>
              )}
              {editMode && (
                <CompanyFacilityData>
                  {editMode && (
                    <EditModeBoxContainer>
                      <form onSubmit={() => formik.onSubmit()}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <DataRowHere className="editview">
                              <Grid container spacing={1} alignItems={"center"}>
                                <Grid item xs={12} sm={12} md={2} lg={2}>
                                  <DataRowTitle>
                                    <Typography>
                                      Process Name
                                      <AstricksMark> *</AstricksMark>
                                    </Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid item xs={12} sm={12} md={10} lg={10}>
                                  <DataRowValue>
                                    <TextField
                                      style={{
                                        width: "100%",
                                        paddingTop: "4px",
                                        paddingBottom: "4px",
                                      }}
                                      id="outlined-basic"
                                      variant="outlined"
                                      size="small"
                                      placeholder="Enter process name"
                                      fullWidth
                                      name={`forms[${index}].process_name`}
                                      value={
                                        formik.values.forms[index]?.process_name
                                      }
                                      onChange={(e) => {
                                        const inputValue =
                                          e.target.value.trimStart();
                                        formik.setFieldError(
                                          `forms[${index}].process_name`,
                                          ""
                                        );

                                        if (inputValue.length > 100) {
                                          formik.setFieldError(
                                            `forms[${index}].process_name`,
                                            "Process name content is too long. Please limit it to 100 characters."
                                          );
                                        } else {
                                          formik.setFieldValue(
                                            `forms[${index}].process_name`,
                                            inputValue
                                          );
                                        }
                                        formik.setFieldTouched(
                                          `forms[${index}].process_name`,
                                          true,
                                          false
                                        );
                                      }}
                                      error={
                                        formik.touched.forms?.[index]
                                          ?.process_name &&
                                        Boolean(
                                          formik.errors.forms?.[index]
                                            ?.process_name
                                        )
                                      }
                                      helperText={
                                        formik.touched.forms?.[index]
                                          ?.process_name &&
                                        formik.errors.forms?.[index]
                                          ?.process_name
                                      }
                                    />
                                  </DataRowValue>
                                </Grid>
                              </Grid>
                            </DataRowHere>
                          </Grid>

                          <Grid item xs={12}>
                            <DataRowHere className="editview">
                              <Grid container spacing={1} alignItems={"center"}>
                                <Grid item xs={12} sm={12} md={2} lg={2}>
                                  <DataRowTitle>
                                    <Typography>
                                      Process Images
                                      <AstricksMark> *</AstricksMark>
                                    </Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid item xs={12} sm={12} md={10} lg={10}>
                                  <Box
                                    sx={{
                                      padding: "4px 6px",
                                      border: formik.errors.forms?.[index]
                                        ?.testing_certificate
                                        ? "1px solid #d7282f"
                                        : "1px solid #bdbdbd",
                                      width: "100%",
                                      borderRadius: "4px",
                                      "&:hover": {
                                        border: formik.errors.forms?.[index]
                                          ?.testing_certificate
                                          ? "1px solid #d7282f"
                                          : "1px solid #424242",
                                      },
                                    }}
                                  >
                                    <DataRowValue>
                                      <EditUpImagesStack>
                                        <EditBrowseIcon>
                                          <Button
                                            sx={{
                                              "&:hover": { boxShadow: "none" },
                                            }}
                                            component="label"
                                            variant="contained"
                                            startIcon={
                                              <img
                                                src="/assets/images/crm/browsefile_icon.svg"
                                                alt="Edit"
                                                width={35}
                                                height={30}
                                              />
                                            }
                                          >
                                            <EditBrowseIcon>
                                              <EditBrowseText>
                                                Upload an Image
                                              </EditBrowseText>
                                            </EditBrowseIcon>
                                            <VisuallyHiddenInput
                                              type="file"
                                              accept={"image/*"}
                                              multiple
                                              onChange={(e) => {
                                                addFiles(index, e);
                                                e.target.value = null;
                                                setImagesIndex(index);
                                              }}
                                            />
                                          </Button>
                                        </EditBrowseIcon>

                                        <SelectedEditSection>
                                          {form?.testing_certificate?.length >
                                          0 ? (
                                            form?.testing_certificate?.map(
                                              (file, fileIndex) => (
                                                <SelectedEditImg
                                                  key={fileIndex}
                                                >
                                                  <img
                                                    src={file?.source}
                                                    alt=""
                                                    height="24px"
                                                    style={{
                                                      objectFit: "contain",
                                                    }}
                                                  />
                                                  <CancelRoundedIcon
                                                    onClick={() =>
                                                      removeFile(
                                                        fileIndex,
                                                        index
                                                      )
                                                    }
                                                  />
                                                  <Typography className="imagename">
                                                    {formatFileName(
                                                      file.file_original_name ||
                                                        file.name,
                                                      5
                                                    )}
                                                  </Typography>
                                                </SelectedEditImg>
                                              )
                                            )
                                          ) : (
                                            <Typography></Typography>
                                          )}

                                          {Array.isArray(
                                            imagesByIndex[index]
                                          ) &&
                                            imagesByIndex[index].map(
                                              (item: any, imgIndex) => (
                                                <SelectedEditImg key={imgIndex}>
                                                  <img
                                                    src={item.source}
                                                    alt={
                                                      item.file_original_name
                                                    }
                                                    height="24px"
                                                  />
                                                  <CancelRoundedIcon
                                                    onClick={() =>
                                                      removeFileDynamic(
                                                        index,
                                                        imgIndex
                                                      )
                                                    }
                                                  />
                                                  <Typography className="imagename">
                                                    {formatFileName(
                                                      item.file_original_name,
                                                      5
                                                    )}
                                                  </Typography>
                                                </SelectedEditImg>
                                              )
                                            )}
                                        </SelectedEditSection>
                                      </EditUpImagesStack>
                                    </DataRowValue>
                                  </Box>
                                  {formik.errors.forms?.[index]
                                    ?.testing_certificate && (
                                    <HelperText
                                      errorText={
                                        formik.errors.forms[index]
                                          .testing_certificate
                                      }
                                    />
                                  )}
                                </Grid>

                                {/* <Grid item xs={12} sm={12} md={8} lg={6}></Grid> */}
                              </Grid>
                            </DataRowHere>
                          </Grid>

                          <Grid item xs={12}>
                            <DataRowHere className="editview">
                              <Grid container spacing={1} alignItems={"center"}>
                                <Grid item xs={12} sm={12} md={2} lg={2}>
                                  <DataRowTitle>
                                    <Typography>
                                      Process Description
                                      <AstricksMark>
                                        *
                                        <LightTooltip
                                          arrow
                                          disableInteractive
                                          placement="top"
                                          title="Provide an overview and workflow of your quality control procedures and methodologies."
                                        >
                                          <HelpOutlineOutlinedIcon />
                                        </LightTooltip>
                                      </AstricksMark>
                                    </Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid item xs={12} sm={12} md={10} lg={10}>
                                  <DataRowValue>
                                    <TextField
                                      id="outlined-multiline-static"
                                      multiline
                                      rows={4}
                                      variant="outlined"
                                      size="small"
                                      type="text"
                                      placeholder="Enter process description"
                                      fullWidth
                                      name={`forms[${index}].process_description`}
                                      value={
                                        formik.values.forms[index]
                                          ?.process_description
                                      }
                                      onChange={(e) => {
                                        const inputValue =
                                          e.target.value.trimStart();

                                        if (inputValue.length <= 256) {
                                          formik.setFieldValue(
                                            `forms[${index}].process_description`,
                                            inputValue
                                          );
                                          formik.setFieldError(
                                            `forms[${index}].process_description`,
                                            ""
                                          );
                                        } else {
                                          formik.setFieldError(
                                            `forms[${index}].process_description`,
                                            "Process description content is too long. Please limit it to 256 characters."
                                          );
                                        }
                                        formik.setFieldTouched(
                                          `forms[${index}].process_description`,
                                          true,
                                          false
                                        );
                                      }}
                                      error={
                                        formik.touched.forms?.[index]
                                          ?.process_description &&
                                        Boolean(
                                          formik.errors.forms?.[index]
                                            ?.process_description
                                        )
                                      }
                                      helperText={
                                        formik.touched.forms?.[index]
                                          ?.process_description &&
                                        formik.errors.forms?.[index]
                                          ?.process_description
                                      }
                                    />
                                  </DataRowValue>
                                </Grid>
                              </Grid>
                            </DataRowHere>
                          </Grid>
                        </Grid>
                        {index > 0 && (
                          <Box
                            sx={{
                              padding: "0px",
                              margin: "12px 0 0 0",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <LightTooltip
                              title="Remove Store"
                              arrow
                              placement="left"
                            >
                              <Box
                                sx={{
                                  padding: "0px",
                                  textAlign: "center",
                                  height: "40px",
                                  width: "40px",
                                  borderRadius: "50%",
                                  background: "#d7282f",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                onClick={() => handleRemove(index)}
                                className=""
                              >
                                <RemoveIcon
                                  sx={{ fontSize: "20px", color: "#fff" }}
                                />
                              </Box>
                            </LightTooltip>
                          </Box>
                        )}
                      </form>
                    </EditModeBoxContainer>
                  )}
                  <Divider
                    variant="middle"
                    sx={{ marginTop: "20px !important" }}
                  />
                </CompanyFacilityData>
              )}
            </>
          ))}
          {editMode && (
            <EditSaveIcons
              sx={{
                right: "0px",
                marginTop: "8px",
                position: "absolute",
                top: "0",
              }}
            >
              <CancelTextWithIcon
                onClick={() => {
                  handleCancel();
                }}
                className="cancelwithicon"
              >
                <CloseIcon />
                <Typography>Cancel</Typography>
              </CancelTextWithIcon>
              <SaveTextWithIcon
                className="savewithicon"
                onClick={() => handleSaveClick()}
              >
                {loader ? (
                  <ThreeDots
                    height="40"
                    width="40"
                    radius="9"
                    color="#D7282F"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                ) : (
                  <>
                    <SaveOutlinedIcon />
                    <Typography variant="body1">Save</Typography>
                  </>
                )}
              </SaveTextWithIcon>
            </EditSaveIcons>
          )}
        </Box>
      </form>

      <form>
        {formik.values.forms?.slice(0, visibleCount).map((form, index) => (
          <React.Fragment key={index}>
            {!editMode && (
              <>
                {data?.length > 0 && (
                  <Box sx={{ padding: "0px 0 16px 0" }} key={index}>
                    <QaqcandRndSeparation>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={12}>
                        <DataRowHere>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={2} lg={2}>
                              <DataRowTitle>
                                <Typography>Process Name</Typography>
                              </DataRowTitle>
                            </Grid>
                            <Grid item xs={12} sm={12} md={10} lg={10}>
                              <DataRowValue>
                                <Typography>{form?.process_name}</Typography>
                              </DataRowValue>
                            </Grid>
                          </Grid>
                        </DataRowHere>
                      </Grid>

                      <Grid item xs={12} sm={12} md={12}>
                        <DataRowHere>
                          <Grid container spacing={1} alignItems={"center"}>
                            <Grid item xs={12} sm={12} md={2} lg={2}>
                              <DataRowTitle>
                                <Typography>Process Image</Typography>
                              </DataRowTitle>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={10}
                              lg={10}
                              className=""
                            >
                              <DataRowValue>
                                <UploadImagesRow>
                                  {form?.testing_certificate?.length > 0 &&
                                    form?.testing_certificate.map(
                                      (item, certIndex) => (
                                        <UploadImageCol key={certIndex}>
                                          <img
                                            src={item?.source}
                                            alt=""
                                            height="24px"
                                            // width="30px"
                                          />
                                          <UpImageName>
                                            <LightTooltip
                                              arrow
                                              disableInteractive
                                              title={item.file_original_name}
                                              placement="top"
                                            >
                                              <Typography
                                                className="imagenname"
                                                sx={{
                                                  position: "relative",
                                                  padding: "0 8px 0 0",
                                                  "&::before": {
                                                    content: '""',
                                                    position: "absolute",
                                                    right: "0px",
                                                    borderLeft:
                                                      "1px solid #d2d2d2",
                                                    height: "17px",
                                                    top: "3px",
                                                  },
                                                }}
                                              >
                                                {formatFileName(
                                                  item.file_original_name,
                                                  10
                                                )}
                                              </Typography>
                                            </LightTooltip>
                                          </UpImageName>
                                          <VisibilityOutlinedIcon
                                            sx={{ cursor: "pointer" }}
                                            onClick={() =>
                                              window.open(
                                                item?.source,
                                                "_blank"
                                              )
                                            }
                                          />
                                        </UploadImageCol>
                                      )
                                    )}
                                </UploadImagesRow>
                              </DataRowValue>
                            </Grid>
                          </Grid>
                        </DataRowHere>
                      </Grid>

                      <Grid item xs={12} sm={12} md={12}>
                        <DataRowHere>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={2} lg={2}>
                              <DataRowTitle>
                                <Typography>Process Description</Typography>
                              </DataRowTitle>
                            </Grid>
                            <Grid item xs={12} sm={12} md={10} lg={10}>
                              <DataRowValue>
                                <Typography>
                                  {form?.process_description}
                                </Typography>
                              </DataRowValue>
                            </Grid>
                          </Grid>
                        </DataRowHere>
                      </Grid>
                    </Grid>
                    </QaqcandRndSeparation>
                  </Box>
                )}
              </>
            )}
          </React.Fragment>
        ))}
        {formik?.values?.forms?.length > 5 && !editMode && (
          <ViewMorLess>
            {visibleCount < formik?.values?.forms?.length ? (
              <text onClick={handleViewMore}>View More</text>
            ) : (
              <text onClick={handleViewLess}>View Less</text>
            )}
          </ViewMorLess>
        )}
      </form>
      {editMode && (
        <PlushIconBox>
          <LightTooltip
            title="Add Another Store Details"
            arrow
            placement="left"
          >
            <PlushIcon onClick={addFormBlock}>
              <AddOutlinedIcon />
            </PlushIcon>
          </LightTooltip>
        </PlushIconBox>
      )}
    </CompanyFacilityInnContainerQAQCnRND>
  );
};
