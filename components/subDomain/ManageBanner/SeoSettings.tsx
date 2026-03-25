import React, { useEffect, useRef, useState } from "react";
import { Box, Chip, Divider, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import SelectableAndEditableField from "@/components/common/SelectDropDownwithInput";
import SeoSkeleton from "./SeoSkeleton";
import subdomaincss from "../style.module.css";
import { getCompanyProfile } from "@/hooks/company";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";

const SeoSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newKeyword, setNewKeyword] = useState<any[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const dispatch = useDispatch();

  const { companyDetails } = useSelector((state: any) => state.companyProfile);
  const { meta_description, meta_keyword, meta_title } =
    companyDetails?.store_setting || {};

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  useEffect(() => {
    dispatch(getCompanyProfile());
  }, [dispatch]);

  useEffect(() => {
    if (companyDetails?.store_setting) {
      formik.setValues({
        meta_title: companyDetails.store_setting.meta_title || "",
        meta_description: companyDetails.store_setting.meta_description || "",
        meta_keyword:
          companyDetails.store_setting.meta_keyword
            ?.split(",")
            .map((keyword) => keyword.trim()) || [],
      });
      const keywords =
        companyDetails?.store_setting?.meta_keyword?.split(",") || [];
      setNewKeyword(keywords);
    }
  }, [companyDetails?.store_setting]);

  const formik = useFormik({
    initialValues: {
      meta_title: meta_title ?? "",
      meta_description: meta_description ?? "",
      meta_keyword: [],
    },
    validationSchema: Yup.object({
      meta_title: Yup.string()
        .required("Meta title is required")
        .max(60, "Maximum 60 character allowed"),
      meta_description: Yup.string()
        .required("Meta description is required")
        .max(160, "Maximum 160 character allowed"),
      meta_keyword: Yup.array()
        .of(Yup.string())
        .min(1, "At least one keyword is required"),
    }),
    onSubmit: async (values) => {
      const updatePayload = {
        meta_title: values.meta_title,
        meta_description: values.meta_description,
        meta_keyword: values.meta_keyword
          .map((keyword) => keyword.trim())
          .join(", "),
      };

      await updateProfile(updatePayload);
      setIsEditing(false);
      dispatch(getCompanyProfile());
    },
  });

  const updateProfile = async (payload: any) => {
    try {
      const response = await fetch(
        `${BASE_URL}/company_profile/updateProfile`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();

      if (data.status === true || data.status === 200) {
        setLoader(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    formik.resetForm({
      values: {
        meta_title: companyDetails.store_setting.meta_title || "",
        meta_description: companyDetails.store_setting.meta_description || "",
        meta_keyword:
          companyDetails.store_setting.meta_keyword
            ?.split(",")
            .map((keyword) => keyword.trim()) || [],
      }
    });
    formik.setFieldError("meta_keyword", "");
    // setError("");
  };

  const handleKeywordInputChange = (value: any[]) => {
    formik.setFieldError("meta_keyword", "");
    formik.setFieldValue("meta_keyword", value);
    setNewKeyword(value);
  };

  console.log(formik.errors);

  const scrollAndFocus = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        ref.current.focus();
      }, 100); 
    }
  };
  const titleInputRef=useRef(null);
  const decriptInputRef=useRef(null);
  const keyRef=useRef(null);

  const handleSave = () => {
    formik.handleSubmit();

    if (!formik.values.meta_title || formik.errors.meta_title) {
      scrollAndFocus(titleInputRef);
      return;
    }
    if (!formik.values.meta_description || formik.errors.meta_description) {
      scrollAndFocus(decriptInputRef);
      return;
    }
    if (!formik.values.meta_keyword || formik.errors.meta_keyword) {
      scrollAndFocus(keyRef);
      return;
    }
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {!loader ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography className={subdomaincss.MainSubHeading}>
                Meta Tags
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={isEditing ? handleCancelClick : handleEditClick}
                >
                  {isEditing ? (
                    <>
                      <CloseOutlinedIcon
                        sx={{
                          fontSize: "20px",
                          color: "#d7282f",
                        }}
                      />
                      <Box
                        component="span"
                        sx={{
                          fontSize: "13px",
                          fontWeight: "400",
                          color: "#d7282f",
                          marginLeft: "6px",
                        }}
                      >
                        Cancel
                      </Box>
                    </>
                  ) : (
                    <Box
                      sx={{
                        color: "#d7282f",
                        fontSize: "13px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={{ fontSize: "18px", margin: "0 6px 0 0" }}
                        src="/assets/EditPencil.svg"
                        width="14"
                        height="14"
                        alt="editImage"
                      />
                      Edit
                    </Box>
                  )}
                </Box>
                {isEditing && (
                  <Box
                    onClick={() => {
                      formik.submitForm();
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "pointer",
                    }}
                  >
                    <SaveOutlinedIcon
                      sx={{
                        fontSize: "20px",
                        color: "#231f20",
                      }}
                    />
                    <Box onClick={handleSave}
                      component="span"
                      sx={{
                        fontSize: "13px",
                        fontWeight: "400",
                        color: "#231f20",
                      }}
                    >
                      Save
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
            <Divider sx={{ mt: 1.5, mb: 1.5 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={2} md={1.7} lg={1.7}>
                <Box
                  className={`${subdomaincss.InputUsers} ${
                    isEditing ? subdomaincss.Border : ""
                  }`}
                >
                  <Typography>Meta Title:</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={9} md={9} lg={9}>
                {isEditing ? (
                  <TextField
                    size="small"
                    sx={{ width: "100%" }}
                    value={formik.values.meta_title}
                    onChange={formik.handleChange}
                    placeholder="Please enter meta title"
                    inputProps={{ maxLength: 60 }}
                    name="meta_title"
                    error={
                      formik.touched.meta_title &&
                      Boolean(formik.errors.meta_title)
                    }
                    helperText={
                      typeof formik.errors.meta_title === "string"
                        ? formik.touched.meta_title && formik.errors.meta_title
                        : null
                    }
                    inputRef={titleInputRef} 
                  />
                ) :formik.values.meta_title.trim() === "" ? (
                  <Typography className={subdomaincss.DisplayText}>
                    N/A
                  </Typography>
                ):(
                  <Typography className={subdomaincss.DisplayText}>
                  {formik.values.meta_title}
                </Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={2} md={1.7} lg={1.7}>
                <Box
                  className={`${subdomaincss.InputUsers} ${
                    isEditing ? subdomaincss.Border : ""
                  }`}
                >
                  <Typography>Meta Description:</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={9} md={9} lg={9}>
                {isEditing ? (
                  <TextField
                    sx={{ width: "100%" }}
                    value={formik.values.meta_description}
                    name="meta_description"
                    onChange={formik.handleChange}
                    inputProps={{ maxLength: 160 }}
                    placeholder="Enter a brief description of your store. This will appear in search engine results."
                    multiline
                    rows={4}
                    maxRows={6}
                    InputProps={{ readOnly: !isEditing }}
                    error={
                      formik.touched.meta_description &&
                      Boolean(formik.errors.meta_description)
                    }
                    helperText={
                      typeof formik.errors.meta_description === "string"
                        ? formik.touched.meta_description &&
                          formik.errors.meta_description
                        : null
                    }
                    inputRef={decriptInputRef}
                  />
                ) : formik.values.meta_description === "" ?(
                  <Typography className={subdomaincss.DisplayText}>
                    N/A
                  </Typography>
                ):(
                  <Typography className={subdomaincss.DisplayText}>
                  {formik.values.meta_description}
                </Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={2} md={1.7} lg={1.7}>
                <Box
                  className={`${subdomaincss.InputUsers} ${
                    isEditing ? subdomaincss.Border : ""
                  }`}
                >
                  <Typography>Meta Keywords:</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={9} md={9} lg={9}>
                <Box sx={{ width: "100%" }}>
                  {isEditing && (
                    <>
                    <SelectableAndEditableField
                      sx={{ marginTop: "0px !important" }}
                      size="small"
                      noOptions={true}
                      options={[]}
                      defaultValue={newKeyword}
                      placeholder="Enter keywords related to your store and products, separated by commas."
                      isEditable={isEditing}
                      setValues={(value) => handleKeywordInputChange(value)}
                      error={
                        formik.touched.meta_keyword &&
                        Boolean(formik.errors.meta_keyword)
                      }
                      errorText={
                        formik.touched.meta_keyword &&
                        formik.errors.meta_keyword
                      }
                            inputRef={keyRef}
                      />
                   <Typography
                          sx={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#4a4a4a",
                          opacity: ".8",
                          marginBottom: "8px" 
                            }}
                            >
                          Please press the enter key after typing each meta keyword
                  </Typography>
                    </>
                  )}
                  {/* {isEditing && (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {newKeyword?.map((data, index) => (
                        <Chip
                        key={index}
                        label={data}
                        sx={{
                          backgroundColor: "#E7E7E7",
                          fontSize: "12px",
                        }}
                        />
                      ))}
                    </Box>
                  )} */}
                  {formik.values.meta_keyword.length === 0 && !isEditing &&  (
            <Typography className={subdomaincss.DisplayText}>N/A</Typography>
                 )}
                </Box>
               
              </Grid>
            </Grid>
          </>
        ) : (
          <SeoSkeleton />
        )}
      </form>
    </div>
  );
};

export default SeoSettings;
