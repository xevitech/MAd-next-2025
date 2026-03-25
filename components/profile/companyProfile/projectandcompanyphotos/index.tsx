import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  AddBtn,
  AddBtnBox,
  CenterOuterBox,
  EditSave,
  PhotoName,
  ProjectCompanyImage,
  ProjectCompanyImageBox,
  ProjectCompanyImageDeleteBox,
  ProjectCompanyImageView,
  ProjectCompanyTab,
  ProjectCompanyTabs,
} from "./style";
import { ContentInnerContainer } from "@/components/profile/common";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { PencilIcon1 } from "@/components/CompanySettings/CompanyDetail/style";
import Image from "next/image";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { apiClient, convertSize } from "@/components/common/common";
import UploadImageWithPreview from "@/components/CompanySettings/CompanyDetail/FactoryDetails/UploadImageWithPreview";
import { OneFilledButton } from "@/components/Chat/style";
import { ThreeDots } from "react-loader-spinner";
import ProjectandCompanySkeleton from "./skeleton/ProjectandCompanySkeleton";
import { toast } from "react-toastify";
import EmptyPage from "@/components/common/EmptyPage";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            padding: "24px",
            "@media screen and (max-width:767px)": { padding: "16px 0" },
            "@media screen and (max-width:480px)": { padding: "18px 0 " },
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CompanyandProjectPhotos() {
  const [value, setValue] = React.useState(0);
  const [edit, setEdit] = useState<boolean>(false);
  const [photos, setPhotos] = useState([]);
  const [files, setFiles] = useState([]);
  const [data, setData] = useState([]);
  const [uploadedData, setUploadedData] = useState([]);
  const [newlyUploadedData, setNewlyUploadedData] = useState([]);
  const [uploadingType, setUploadingType] = useState("factory_photos");
  const [previewImage, setPreviewImage] = useState("");
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(false);

  const handlImageChange = (imageType, newImages) => {
    const fileSize = convertSize(newImages[0]?.file?.size, "MB");
    const fileType = newImages[0]?.file?.type;


    if( fileType !== "image/png" && fileType !== "image/jpg" && fileType !== "image/jpeg"){
      toast.error("Upload JPG, JPEG, or PNG images", {
        autoClose: 3500,   
      });
      return;
    }

    if (fileSize > 5) {
      toast.error("upload less that 5 MB", {
        autoClose: 3500,
      });
      return;
    }
    // setUploadingType(imageType + "[]");
    const blobs = newImages.map((file) => URL.createObjectURL(file?.file));
    setPreviewImage(blobs);
    setFiles(newImages);
  };

  const getFactoryDetails = async () => {
    if (edit) setEdit(false);
    try {
      let response = await apiClient(
        "company_profile/factory_informations/view",
        "get"
      );
      if (response.status === 200) {
        const { data } = response;
        if (value === 0) {
          setData(data?.factory_photos);
          setUploadedData(data?.factory_photos);
        } else {
          setData(data?.project_photos);
          setUploadedData(data?.project_photos);
        }
      }
    } catch (error) {
      console.error("Error fetching factory details:", error);
    } finally {
      setLoader(false);
    }
  };
  const fetchData = async () => {
    setLoader(true);
    await getFactoryDetails();
    setLoader(false);
  };

  const setAllStates = () => {
    setTitle("");
    setNewlyUploadedData([]);
    setPreviewImage(null);
    setEdit(false);
    setIsSubmitting(false);
  };

  useEffect(() => {
    fetchData();
  }, [value]);

  const handleAddImageAndTitle = async () => {
    if (!previewImage || !title) {
      const titleToShow = !previewImage ? "Image" : !title ? "Title" : "";
      toast.error(`Please add ${titleToShow}`);
      return;
    }
    setUploadedData((prev) => {
      const lastItem = prev[prev.length - 1];

      const newIndexValue =
        lastItem?.indexValue && lastItem?.indexValue !== 0
          ? lastItem.indexValue + 1
          : 0;

      return [
        ...prev,
        {
          src: files[0],
          file_original_name: title,
          blobSrc: previewImage,
          indexValue: newIndexValue,
        },
      ];
    });
    setNewlyUploadedData((prev) => [
      ...prev,
      { src: files[0], file_original_name: title, blobSrc: previewImage },
    ]);

    setPreviewImage(null);
    setTitle("");
  };

  const saveImagesAndTitle = async (type = "") => {
    setIsSubmitting(true);
    let formData = new FormData();
    const updatedDatas = uploadedData.filter(
      (data) => data?.indexValue !== undefined && data?.indexValue !== null
    );
    updatedDatas.forEach((file) => {
      console.log(file, "file");

      formData.append(uploadingType + "[]", file?.src?.file);
    });
    updatedDatas.forEach((title) => {
      if (uploadingType === "project_photos") {
        formData.append("project_title[]", title?.file_original_name);
      } else {
        formData.append("factory_title[]", title?.file_original_name);
      }
    });
    if (updatedDatas?.length > 0) {
      try {
        let response = await apiClient(
          "company_profile/factory_informations/uploads",
          "post",
          {
            body: formData,
          },
          true
        );
      } catch (err) {
        console.log(err, "error while saving");
      }
    }
    setAllStates();
    fetchData();
  };
  const handleCancel = () => {
    setTitle("");
    setEdit(false);
    setUploadedData(data);
    setPreviewImage(null);
    setNewlyUploadedData([]);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      setUploadingType("factory_photos");
      setAllStates();
    } else {
      setAllStates();
      setUploadingType("project_photos");
    }
  };

  const handleRemove = async (
    idToRemove,
    indexToRemove,
    newlyUploadedDataIndex
  ) => {
    setLoading(true);
    let formData = new FormData();
    if (idToRemove) {
      formData.append("image_ids", idToRemove);
      formData.append("label", uploadingType);
      let response = await apiClient(
        "company_profile/factory_informations/delete",
        "post",
        {
          body: formData,
        },
        true
      );
      const updatedImage = uploadedData.filter(
        (data, index) => data?.id !== idToRemove
      );
      setUploadedData(updatedImage);
      setData(updatedImage);
      setLoading(false);
    } else {
      const updatedImage = uploadedData.filter(
        (data, index) => index !== indexToRemove
      );
      const updatedNewlyUpdatedData = newlyUploadedData.filter(
        (_, index) => index !== newlyUploadedDataIndex
      );
      setNewlyUploadedData(updatedNewlyUpdatedData);
      setData(updatedImage);
      setUploadedData(updatedImage);
      setLoading(false);
    }
  };

  return (
    <>
      <ContentInnerContainer>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <ProjectCompanyTabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <ProjectCompanyTab label="Company Tour" {...a11yProps(0)} />
              <ProjectCompanyTab label="Project Photos" {...a11yProps(1)} />
            </ProjectCompanyTabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            {edit ? (
              loading ? (
                <Box>
                  <ProjectandCompanySkeleton />
                </Box>
              ) : (
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} mt={-1} mb={1}>
                      <EditSave>
                        <Box
                          onClick={() => setEdit(false)}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <CloseOutlinedIcon
                            sx={{ color: "#d7282f", fontSize: "18px" }}
                          />

                          <Typography
                            sx={{
                              fontSize: "13px",
                              fontWeight: "400",
                              color: "#d7282f",
                            }}
                            onClick={() => handleCancel()}
                          >
                            Cancel
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: "1px",
                            height: "16px",
                            backgroundColor: "#d2d2d2",
                          }}
                        ></Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                          onClick={() => saveImagesAndTitle("factory_photos")}
                        >
                          <SaveOutlinedIcon
                            sx={{ color: "#231f20", fontSize: "18px" }}
                          />
                          <Typography
                            sx={{
                              fontSize: "13px",
                              fontWeight: "400",
                              color: "#231f20",
                            }}
                          >
                            {isSubmitting ? (
                              <ThreeDots
                                height="20"
                                width="40"
                                radius="9"
                                color="#D7282F"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                visible={true}
                              />
                            ) : (
                              "Save"
                            )}
                          </Typography>
                        </Box>
                      </EditSave>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} lg={9} mt={-1}>
                      <Grid container spacing={2}>
                        {uploadedData.map((imagesDetails, index) => {
                          return (
                            <>
                              <Grid item xs={12} sm={6} md={3} key={index}>
                                <ProjectCompanyImageBox>
                                  <ProjectCompanyImage
                                    src={
                                      imagesDetails?.blobSrc ??
                                      imagesDetails?.source ??
                                      ""
                                    }
                                    alt=""
                                  />
                                  <ProjectCompanyImageDeleteBox
                                    onClick={() => {
                                      const newlyAddedIndex =
                                        imagesDetails?.indexValue ?? null;
                                      handleRemove(
                                        imagesDetails?.id,
                                        index,
                                        newlyAddedIndex
                                      );
                                    }}
                                  >
                                    <CloseOutlinedIcon
                                      sx={{
                                        color: "#d7282f",
                                        fontSize: "18px",
                                      }}
                                    />
                                  </ProjectCompanyImageDeleteBox>
                                </ProjectCompanyImageBox>
                                <CenterOuterBox>
                                  <PhotoName>
                                    {imagesDetails?.file_original_name ?? ""}
                                  </PhotoName>
                                </CenterOuterBox>
                              </Grid>
                            </>
                          );
                        })}
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} mt={-1}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={12} lg={12}>
                          <Box sx={{}}>
                            <UploadImageWithPreview
                              // companyandfactory
                              imageHeight="120px"
                              imageType="factory_photos"
                              setImage={handlImageChange}
                              images={photos}
                              checkTitle={undefined}
                              previewImage={previewImage}
                            />
                            <CenterOuterBox>
                              <TextField
                                placeholder="Add image title"
                                size="small"
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                              ></TextField>
                            </CenterOuterBox>
                            <AddBtnBox>
                              <AddBtn onClick={handleAddImageAndTitle}>
                                Add
                              </AddBtn>
                            </AddBtnBox>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              )
            ) : (
              <Box>
                <Grid container spacing={2}>
                  {uploadedData?.length > 0 && (
                    <Grid item xs={12} mt={-1} mb={1}>
                      <EditSave onClick={() => setEdit(true)}>
                        <PencilIcon1>
                          <Image
                            style={{ cursor: "pointer" }}
                            src={"/assets/EditPencil.svg"}
                            layout="fill"
                            alt="editImage"
                          />
                        </PencilIcon1>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: "400",
                            color: "#d7282f",
                          }}
                        >
                          Edit
                        </Typography>
                      </EditSave>
                    </Grid>
                  )}
                  {loader ? (
                    <ProjectandCompanySkeleton />
                  ) : uploadedData?.length > 0 ? (
                    uploadedData?.map((datas, index) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={3}
                          lg={2.4}
                          mt={-1}
                          key={index}
                        >
                          <ProjectCompanyImageView>
                            <ProjectCompanyImage
                              src={datas?.blobSrc || datas?.source}
                              alt=""
                            />
                          </ProjectCompanyImageView>
                          <CenterOuterBox>
                            <PhotoName>{datas?.file_original_name}</PhotoName>
                          </CenterOuterBox>
                        </Grid>
                      );
                    })
                  ) : (
                    <>
                      <EmptyPage
                        // companyTour
                        logo="/assets/companyprojectPhotos.svg"
                        onClickHandler={() => setEdit(true)}
                        type="other"
                        customeTitle=" "
                        customdescription="You have not added any Company photos"
                      />
                    </>
                  )}
                </Grid>
              </Box>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {edit ? (
              loading ? (
                <Box>
                  <ProjectandCompanySkeleton />
                </Box>
              ) : (
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} mt={-1} mb={1}>
                      <EditSave>
                        <Box
                          onClick={() => setEdit(false)}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <CloseOutlinedIcon
                            sx={{ color: "#d7282f", fontSize: "18px" }}
                          />

                          <Typography
                            sx={{
                              fontSize: "13px",
                              fontWeight: "400",
                              color: "#d7282f",
                            }}
                            onClick={() => handleCancel()}
                          >
                            Cancel
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: "1px",
                            height: "16px",
                            backgroundColor: "#d2d2d2",
                          }}
                        ></Box>
                        {isSubmitting ? (
                          <ThreeDots
                            height="20"
                            width="40"
                            radius="9"
                            color="#D7282F"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            visible={true}
                          />
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                            onClick={() => saveImagesAndTitle("project_photos")}
                          >
                            <SaveOutlinedIcon
                              sx={{ color: "#231f20", fontSize: "18px" }}
                            />
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: "400",
                                color: "#231f20",
                              }}
                            >
                              Save
                            </Typography>
                          </Box>
                        )}
                      </EditSave>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} lg={9} mt={-1}>
                      <Grid container spacing={2}>
                        {uploadedData.map((imagesDetails, index) => {
                          console.log(imagesDetails, "images");
                          return (
                            <>
                              <Grid item xs={12} sm={6} md={3}>
                                <ProjectCompanyImageBox>
                                  <ProjectCompanyImage
                                    src={
                                      imagesDetails?.blobSrc ??
                                      imagesDetails?.source ??
                                      ""
                                    }
                                    alt=""
                                  />
                                  <ProjectCompanyImageDeleteBox
                                    onClick={() => {
                                      const newlyAddedIndex =
                                        imagesDetails?.indexValue ?? null;
                                      handleRemove(
                                        imagesDetails?.id,
                                        index,
                                        newlyAddedIndex
                                      );
                                    }}
                                  >
                                    <CloseOutlinedIcon
                                      sx={{
                                        color: "#d7282f",
                                        fontSize: "18px",
                                      }}
                                    />
                                  </ProjectCompanyImageDeleteBox>
                                </ProjectCompanyImageBox>
                                <CenterOuterBox>
                                  <PhotoName>
                                    {imagesDetails?.file_original_name ?? ""}
                                  </PhotoName>
                                </CenterOuterBox>
                              </Grid>
                            </>
                          );
                        })}
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} mt={-1}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={12} lg={12}>
                          <Box sx={{ height: "100%" }}>
                            <UploadImageWithPreview
                              // companyandfactory
                              imageHeight="120px"
                              imageType="project_photos"
                              setImage={handlImageChange}
                              images={photos}
                              checkTitle={undefined}
                              previewImage={previewImage}
                            />
                            <CenterOuterBox>
                              <TextField
                                placeholder="Add image title"
                                size="small"
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                              ></TextField>
                            </CenterOuterBox>
                            <AddBtnBox>
                              <AddBtn onClick={handleAddImageAndTitle}>
                                Add
                              </AddBtn>
                            </AddBtnBox>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              )
            ) : (
              <Box>
                <Grid container spacing={2}>
                  {uploadedData?.length > 0 && (
                    <Grid item xs={12} mt={-1} mb={1}>
                      <EditSave onClick={() => setEdit(true)}>
                        <PencilIcon1>
                          <Image
                            style={{ cursor: "pointer" }}
                            src={"/assets/EditPencil.svg"}
                            layout="fill"
                            alt="editImage"
                          />
                        </PencilIcon1>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: "400",
                            color: "#d7282f",
                          }}
                        >
                          Edit
                        </Typography>
                      </EditSave>
                    </Grid>
                  )}
                  {loader ? (
                    <ProjectandCompanySkeleton />
                  ) : uploadedData?.length > 0 ? (
                    uploadedData?.map((datas, index) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={3}
                          lg={2.4}
                          mt={-1}
                          key={index}
                        >
                          <ProjectCompanyImageView>
                            <ProjectCompanyImage
                              src={datas?.blobSrc || datas?.source}
                              alt=""
                            />
                          </ProjectCompanyImageView>
                          <CenterOuterBox>
                            <PhotoName>{datas?.file_original_name}</PhotoName>
                          </CenterOuterBox>
                        </Grid>
                      );
                    })
                  ) : (
                    <EmptyPage
                      logo="/assets/companyprojectPhotos.svg"
                      onClickHandler={() => setEdit(true)}
                      type="other"
                      customeTitle=" "
                      customdescription="You have not added any project photos"
                    />
                  )}
                </Grid>
              </Box>
            )}
          </CustomTabPanel>
        </Box>
      </ContentInnerContainer>
    </>
  );
}
