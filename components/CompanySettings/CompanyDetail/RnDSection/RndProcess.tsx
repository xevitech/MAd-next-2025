import React, { useState } from "react";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import * as Yup from "yup";
import { apiClient } from "@/components/common/common";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "react-redux";
import HelperText from "../Common/helperText";
import {
  TypographyTitle,
  AdditionAddress,
  AstricksMark,
  ButtonModeHere,
  CancelTextWithIcon,
  CompanyFacilityData,
  CompanyFacilityInnContainer,
  DataRowHere,
  DataRowTitle,
  DataRowValue,
  EditBrowseIcon,
  EditBrowseText,
  EditModeBoxContainer,
  EditSaveIcons,
  EditSaveIcons1,
  EditUpImagesStack,
  FooterDiv,
  PlushIcon,
  PlushIconBox,
  Radiomain,
  SavebtnBox,
  SaveTextWithIcon,
  SelectedEditImg,
  SelectedEditSection,
  SubHeadingPage,
} from "../FactoryDetails/style";
import { toast } from "react-toastify";
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

export default function RndProcess({ process_formik }) {
  const [editMode, setEditMode] = useState(false);
  const [Files, setFiles] = useState<any>([]);
  const handleRadioChange = (event) => {};
  const getFileNameAndExtension = (file) => {
    const dotIndex = file.lastIndexOf(".");
    if (dotIndex === -1) return { name: file, extension: "" };
    return {
      name: file.substring(0, dotIndex),
      extension: file.substring(dotIndex),
    };
  };
  const {
    setFieldValue,
    values,
    handleSubmit,
    errors,
    setFieldError,
    setFieldTouched,
    touched,
  } = process_formik;
  const dispatch = useDispatch();

  const addFiles = async (e: React.ChangeEvent<HTMLInputElement>, id: any) => {
    const files = Array.from(e.target.files || []);
    const acceptedFileTypes = ["image/jpeg", "image/png"];
    const maxFileSize = 2 * 1024 * 1024;
    const filteredFiles = files.filter((file: File) => {
      if (!acceptedFileTypes.includes(file.type)) {
        process_formik.setFieldError(
          "process_image",
          "Only JPG and PNG formats are accepted."
        );
        return false;
      }
      if (file.size > maxFileSize) {
        process_formik.setFieldError(
          "image",
          "File size must be less than 2MB."
        );
        return false;
      }
      return file;
    });

    if (filteredFiles.length === 0) {
      return;
    }
    const processDetail = process_formik?.values?.process_details?.find(
      (processDetail) => processDetail?.id === id
    );
    if (processDetail?.process_image?.length >= 3) {
      process_formik.setFieldError(
        `process_details[${id}].process_image`,
        "Maximum 3 images are allowed"
      );
      return;
    }

    if (processDetail?.process_image?.length <= 3) {
      let formData = new FormData();
      filteredFiles.forEach((v: any) => {
        formData.append("company_photos[]", v);
      });
      let response = await apiClient(
        "company_profile/file_upload_qaqc_rnd",
        "post",
        {
          body: formData,
        },
        true
      );

      if (response?.status == true || response?.status == 200) {
        const updatedProcessDetails =
          process_formik?.values?.process_details?.map(
            (processDetail, index) => {
              if (processDetail?.id === id) {
                return {
                  ...processDetail,
                  process_image: [
                    ...processDetail?.process_image,
                    response?.data?.length > 0
                      ? response?.data?.split(",")
                      : "",
                  ],
                };
              }
              return processDetail;
            }
          );
        const updloadedFiles = [...Files, response?.data];
        setFiles(updloadedFiles);
        process_formik.setFieldValue("process_details", updatedProcessDetails);
        process_formik.setFieldError(
          `process_details[${id}].process_image`,
          ""
        );
      } else {
        toast.error("something went wrong");
      }
    } else {
      process_formik.setFieldError(
        `process_details[${id}].process_image`,
        "Maximum 3 images are allowed"
      );
    }
  };

  const removeFile = (id: any, index: number) => {
    const updatedProcessDetails = process_formik?.values?.process_details?.map(
      (processDetail) => {
        if (processDetail?.id === id) {
          const updatedImages = [...(processDetail?.process_image || [])];
          if (updatedImages.length > 0) {
            updatedImages.splice(index, 1);
          }
          return {
            ...processDetail,
            process_image: updatedImages,
          };
        }
        return processDetail;
      }
    );

    process_formik.setFieldValue("process_details", updatedProcessDetails);
  };
  console.log(
    process_formik?.errors?.process_details,
    process_formik?.values?.process_details,
    "detailsList----"
  );

  //   const removeFile = (id: number, index: number) => {
  //     if (id) {
  //       setFiles((prev: any) => {
  //         let file = prev.filter((element: any) => element?.id !== id);
  //         return file;
  //       });
  //       formik.setFieldValue("image", Files);
  //       formik.setFieldError("image", "");
  //     } else {
  //       setFiles((prev) => {
  //         prev.splice(index, 1);
  //         return [...prev];
  //       });
  //       formik.setFieldValue("image", Files);
  //       formik.setFieldError("image", "");
  //     }
  //   };
  //   const handleCancel = () => {
  //     setEditMode(false);
  //     dispatch(getCompanyProfile());
  //   };
  //   let formik = useFormik({
  //     enableReinitialize: true,
  //     initialValues: {
  //       process_name: "",
  //       process_description: "",
  //       image: [],
  //     },

  //     validationSchema: validation,
  //     validateOnChange: false,
  //     validateOnBlur: false,
  //     onSubmit: async (values) => {
  //       let response = await apiClient("company_profile/updateProfile", "patch", {
  //         body: { values },
  //       });
  //       if (response.status === 200 || response.status === 201) {
  //         dispatch(getCompanyProfile());
  //         setEditMode(false);
  //       }
  //     },
  //   });

  const handleAddProcessDetail = () => {
    process_formik.setFieldValue("process_details", [
      ...process_formik.values.process_details,
      {
        process_name: "",
        process_image: [],
        process_description: "",
        id: process_formik.values.process_details.length + 1,
      },
    ]);
  };

  const removeBlock = (id) => {
    process_formik?.setFieldValue(
      "process_details",
      process_formik?.values?.process_details?.filter((item) => item.id !== id)
    );
  };

  const handleCustomChange = (e) => {
    const { name, value } = e.target;
    setFieldTouched(name, false, false);
    setFieldError(name, "");
    setFieldValue(name, value);
  };

  return (
    <CompanyFacilityInnContainer
      sx={{
        boxShadow: editMode ? "0px 2px 2px 0px #9FA2BF52" : "",
        padding: editMode ? "16px" : "",
      }}
    >
      {" "}
      <Box
        sx={{
          border: "1px solid #e2e2e2",
          borderRadius: "5px",
          padding: "16px 10px 0px 15px",
          gap: "18px",
        }}
      >
        <SubHeadingPage>
          <TypographyTitle>R&D Control Process</TypographyTitle>
          <ButtonModeHere>
            {!editMode && (
              <EditSaveIcons1 onClick={() => setEditMode(true)}>
                <img src={"/assets/EditPencil.svg"} alt="editImage" />
                <Typography>Edit</Typography>
              </EditSaveIcons1>
            )}
            {editMode && (
              <Box
                sx={{
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
            )}
          </ButtonModeHere>
        </SubHeadingPage>
        <CompanyFacilityData>
          {editMode ? (
            <>
              {process_formik.values.process_details.map((detail, index) => (
                <EditModeBoxContainer>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <DataRowHere className="editview">
                        <Grid container spacing={1} alignItems={"center"}>
                          <Grid item xs={12} sm={12} md={4} lg={2}>
                            <DataRowTitle>
                              <Typography>
                                Process Name <AstricksMark> *</AstricksMark>
                              </Typography>
                            </DataRowTitle>
                          </Grid>
                          <Grid item xs={12} sm={12} md={7} lg={6}>
                            <DataRowValue>
                              <TextField
                                style={{
                                  width: "100%",
                                  paddingTop: "4px",
                                  paddingBottom: "4px",
                                }}
                                name={`process_details[${index}].process_name`}
                                placeholder="Enter process name"
                                value={
                                  process_formik.values.process_details[index]
                                    .process_name
                                }
                                onChange={handleCustomChange}
                                error={
                                  process_formik.errors.process_details?.[index]
                                    ?.process_name
                                    ? true
                                    : false
                                }
                                helperText={
                                  process_formik.errors.process_details?.[index]
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
                          <Grid item xs={12} sm={12} md={4} lg={2}>
                            <DataRowTitle>
                              <Typography>
                                Process Images
                                <AstricksMark> *</AstricksMark>
                              </Typography>
                            </DataRowTitle>
                          </Grid>
                          <Grid item xs={12} sm={12} md={8} lg={6}>
                            <DataRowValue>
                              <EditUpImagesStack>
                                <EditBrowseIcon>
                                  <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
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
                                        addFiles(e, detail?.id);
                                        e.target.value = null;
                                      }}
                                    />
                                  </Button>
                                </EditBrowseIcon>
                                <SelectedEditSection>
                                  {process_formik?.values?.process_details?.[
                                    index
                                  ]?.process_image?.length > 0 ? (
                                    process_formik?.values?.process_details?.[
                                      index
                                    ]?.process_image?.map((ele, ind) => (
                                      <SelectedEditImg key={ind}>
                                        <img
                                          src={ele}
                                          // src={URL.createObjectURL(ele)}
                                          alt=""
                                          height="24px"
                                        />
                                        <CancelRoundedIcon
                                          onClick={() =>
                                            removeFile(ele?.id, ind)
                                          }
                                        />
                                        <Typography className="imagename">
                                          {ele.file_original_name || ele.name}
                                        </Typography>
                                      </SelectedEditImg>
                                    ))
                                  ) : (
                                    <Typography>No files uploaded</Typography>
                                  )}
                                </SelectedEditSection>
                              </EditUpImagesStack>
                            </DataRowValue>
                            {process_formik.errors.process_details?.[index]
                              ?.process_image && (
                              <HelperText
                                errorText={
                                  process_formik.errors.process_details?.[index]
                                    ?.process_image
                                }
                              />
                            )}
                          </Grid>
                        </Grid>
                      </DataRowHere>
                    </Grid>
                    <Grid item xs={12}>
                      <DataRowHere className="editview">
                        <Grid container spacing={1} alignItems={"center"}>
                          <Grid item xs={12} sm={12} md={4} lg={2}>
                            <DataRowTitle>
                              <Typography>
                                Process Description{" "}
                                <AstricksMark>
                                  {" "}
                                  *
                                  <HelpOutlineOutlinedIcon />
                                </AstricksMark>
                              </Typography>
                            </DataRowTitle>
                          </Grid>
                          <Grid item xs={12} sm={12} md={8} lg={6}>
                            <DataRowValue>
                              <TextField
                                fullWidth
                                id="outlined-multiline-static"
                                multiline
                                rows={4}
                                name={`process_details[${index}].process_description`}
                                placeholder="Enter process description"
                                value={
                                  process_formik.values.process_details[index]
                                    .process_description
                                }
                                onChange={handleCustomChange}
                                error={
                                  process_formik.errors.process_details?.[index]
                                    ?.process_description
                                    ? true
                                    : false
                                }
                                helperText={
                                  process_formik.errors.process_details?.[index]
                                    ?.process_description
                                }
                              />
                            </DataRowValue>
                          </Grid>
                        </Grid>
                      </DataRowHere>
                    </Grid>
                  </Grid>
                  <>
                    <FooterDiv>
                      <Divider variant="middle" />
                    </FooterDiv>
                    <Radiomain>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <SavebtnBox>
                            {editMode && (
                              <EditSaveIcons>
                                <CancelTextWithIcon
                                  //   onClick={() => handleCancel()}
                                  className="cancelwithicon"
                                >
                                  <CloseIcon />
                                  <Typography>Cancel</Typography>
                                </CancelTextWithIcon>
                                <SaveTextWithIcon
                                  className="savewithicon"
                                  onClick={() => process_formik.handleSubmit()}
                                >
                                  <SaveOutlinedIcon />
                                  <Typography variant="body1">Save</Typography>
                                </SaveTextWithIcon>
                              </EditSaveIcons>
                            )}
                          </SavebtnBox>
                          <PlushIconBox>
                            <LightTooltip
                              title="Add Another Store Details"
                              arrow
                              placement="left"
                            >
                              <PlushIcon>
                                <AddOutlinedIcon
                                  onClick={() => handleAddProcessDetail()}
                                />
                              </PlushIcon>
                            </LightTooltip>
                            <LightTooltip
                              title="Remove Store Details"
                              arrow
                              placement="top"
                            >
                              {index !== 0 && (
                                <span style={{ marginLeft: "5px" }}>
                                  <PlushIcon
                                    onClick={() => removeBlock(detail?.id)}
                                  >
                                    {" "}
                                    <DeleteOutlineIcon />
                                  </PlushIcon>
                                </span>
                              )}
                            </LightTooltip>
                          </PlushIconBox>
                        </Grid>
                      </Grid>
                    </Radiomain>{" "}
                  </>
                </EditModeBoxContainer>
              ))}
            </>
          ) : (
            <Box>
              {/* <Grid container spacing={2}>
                <Grid item xs={12}>
                  <DataRowHere>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} md={4} lg={2}>
                        <DataRowTitle>
                          <Typography>Process Name</Typography>
                        </DataRowTitle>
                      </Grid>
                      <Grid item xs={12} sm={12} md={8} lg={9}>
                        <DataRowValue>
                          <Typography>Factory Name Goes Here</Typography>
                        </DataRowValue>
                      </Grid>
                    </Grid>
                  </DataRowHere>
                </Grid>
                <Grid item xs={12}>
                  <DataRowHere>
                    <Grid container spacing={1} alignItems={"center"}>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={2}
                        sx={{}}
                        className="SpacingforImages"
                      >
                        <DataRowTitle>
                          <Typography>Process Images</Typography>
                        </DataRowTitle>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={8}
                        lg={9}
                        className="SpacingforImages"
                      >
                        <DataRowValue>
                          <UploadImagesRow>
                            <UploadImageCol>
                              <img
                                src="https://merchantad.xevitech.com/public/uploads/product/gallery/domestic-wind-turbine.png"
                                alt=""
                                height="24px"
                              />
                              <UpImageName>
                                <Typography className="imagenname">
                                  {name}
                                </Typography>
                                <Typography variant="body2">
                                  {extension}
                                </Typography>
                              </UpImageName>
                              <VisibilityOutlinedIcon />
                            </UploadImageCol>
                            <UploadImageCol>
                              <img
                                src="https://merchantad.xevitech.com/public/uploads/product/gallery/domestic-wind-turbine.png"
                                alt=""
                                height="24px"
                              />
                              <UpImageName>
                                <Typography className="imagenname">
                                  {name}
                                </Typography>
                                <Typography variant="body2">
                                  {extension}
                                </Typography>
                              </UpImageName>
                              <VisibilityOutlinedIcon />
                            </UploadImageCol>
                            <UploadImageCol>
                              <img
                                src="https://merchantad.xevitech.com/public/uploads/product/gallery/domestic-wind-turbine.png"
                                alt=""
                                height="24px"
                              />
                              <UpImageName>
                                <Typography className="imagenname">
                                  {name}
                                </Typography>
                                <Typography variant="body2">
                                  {extension}
                                </Typography>
                              </UpImageName>
                              <VisibilityOutlinedIcon />
                            </UploadImageCol>
                          </UploadImagesRow>
                        </DataRowValue>
                      </Grid>
                    </Grid>
                  </DataRowHere>
                </Grid>
                <Grid item xs={12}>
                  <DataRowHere>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} md={4} lg={2}>
                        <DataRowTitle>
                          <Typography>Product Description </Typography>
                        </DataRowTitle>
                      </Grid>
                      <Grid item xs={12} sm={12} md={8} lg={9}>
                        <DataRowValue>
                          <Typography>abc@twitter</Typography>
                        </DataRowValue>
                      </Grid>
                    </Grid>
                  </DataRowHere>
                </Grid>
              </Grid> */}
            </Box>
          )}
        </CompanyFacilityData>
      </Box>
    </CompanyFacilityInnContainer>
  );
}
