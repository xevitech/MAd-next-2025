import React from "react";
import {
  ContentInnerContainer,
  ContainerHeader,
  ContainerHeaderText,
  ContainerHeaderDescription,
  FloatingEditIcon,
  PencilIcon,
  FieldOuterContainer,
  LabelContainer,
  FieldValueContainer,
  CancelLink,
  SaveLink,
} from "@/components/profile/common";
import Image from "next/image";
import { Box, FormControl, Grid } from "@mui/material";
import useAppContext from "@/hooks/useAppContext";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { convertUnderscoreToSpaceAndCapitalize } from "@/utils/commonFunctions/other";
import { apiClient } from "@/components/common/common";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Language_List, TimeZone_List } from "./List";

export const LocationInformation = ({ defaultValues }: any) => {
  const { breakPoints } = useAppContext();

  const validation = Yup.object().shape({
    time_zone: Yup.string().required("Please select time zone"),
    region_language: Yup.string().required("Please select language"),
  });

  let formik: any = useFormik({
    initialValues: {
      time_zone: defaultValues?.time_zone ?? "",
      region_language: defaultValues?.region_language ?? "",
      editMode: false,
    },
    enableReinitialize: true,
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const { time_zone, region_language } = values;
      let response = await apiClient("profile/updateProfile", "patch", {
        body: {
          time_zone,
          region_language,
        },
      });
      if (response.status == 200) {
        formik.setFieldValue("editMode", false);
      }
    },
  });

  const { time_zone, region_language, editMode } = formik.values;

  const CancelEditing = () => {
    if (editMode) {
      formik.resetForm();
      formik.setFieldValue("editMode", false);
    } else {
      formik.setFieldValue("time_zone", defaultValues?.time_zone ?? "");
      formik.setFieldValue(
        "region_language",
        defaultValues?.region_language ?? ""
      );
    }
  };

  console.log("time_zone=======================", time_zone);

  return (
    <ContentInnerContainer breakPoints={breakPoints}>
      <ContainerHeader breakPoints={breakPoints}>
        <ContainerHeaderText>Location Information</ContainerHeaderText>
        <ContainerHeaderDescription>
          Manage information related to your Timezone
        </ContainerHeaderDescription>
        {!editMode ? (
          <FloatingEditIcon
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              formik.setFieldValue("editMode", true);
            }}
          >
            <PencilIcon>
              <Image
                src={"/assets/EditPencil.svg"}
                layout="fill"
                alt="editImage"
              />
            </PencilIcon>{" "}
            Edit
          </FloatingEditIcon>
        ) : (
          <FloatingEditIcon
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <CancelLink
              onClick={() => {
                CancelEditing();
              }}
            >
              <CloseIcon />
              Cancel
            </CancelLink>
            <SaveLink onClick={formik.handleSubmit}>
              <SaveOutlinedIcon />
              Save
            </SaveLink>
          </FloatingEditIcon>
        )}
      </ContainerHeader>
      <Grid container>
        <Grid item md={6} xl={6}>
          <FormControl sx={{ width: "100%" }}>
            <FieldOuterContainer breakPoints={breakPoints}>
              {editMode ? (
                <LabelContainer breakPoints={breakPoints}>
                  Language<div style={{ color: "red" }}>*</div>
                </LabelContainer>
              ) : (
                <LabelContainer breakPoints={breakPoints}>
                  Language
                </LabelContainer>
              )}
              <FieldValueContainer breakPoints={breakPoints}>
                {!editMode ? (
                  <p>
                    {convertUnderscoreToSpaceAndCapitalize(region_language)}
                  </p>
                ) : (
                  <Stack spacing={2} sx={{ width: "100%" }}>
                    <Autocomplete
                      size="small"
                      onChange={(event: any, newValue) => {
                        formik.setFieldValue("region_language", newValue.value);
                        formik.setFieldError("region_language", "");
                      }}
                      value={TimeZone_List.find(
                        (v) => v.tzCode == region_language
                      )}
                      defaultValue={TimeZone_List.find(
                        (v) => v.tzCode == region_language
                      )}
                      id="free-solo-demo-language-zone"
                      options={Language_List}
                      getOptionLabel={(option: any) => ` ${option.view}`}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          {option.view}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <>
                          <TextField
                            size="medium"
                            placeholder="Please select time zone"
                            {...params}
                            error={formik.errors.region_language ? true : false}
                            helperText={formik.errors.region_language}
                          />
                        </>
                      )}
                    />
                  </Stack>
                )}
              </FieldValueContainer>
            </FieldOuterContainer>
          </FormControl>
        </Grid>
        <Grid item md={6} xl={6}>
          <FormControl sx={{ width: "100%" }}>
            <FieldOuterContainer breakPoints={breakPoints}>
              {editMode ? (
                <LabelContainer breakPoints={breakPoints}>
                  Time Zone<div style={{ color: "red" }}>*</div>
                </LabelContainer>
              ) : (
                <LabelContainer breakPoints={breakPoints}>
                  Time Zone
                </LabelContainer>
              )}
              <FieldValueContainer breakPoints={breakPoints}>
                {!editMode ? (
                  <p>
                    {TimeZone_List.find((v) => v.tzCode == time_zone)?.tzCode}
                  </p>
                ) : (
                  <Stack spacing={2} sx={{ width: "100%" }}>
                    <Autocomplete
                      size="small"
                      onChange={(event: any, newValue) => {
                        formik.setFieldValue("time_zone1", newValue.tzCode);
                        formik.setFieldError("time_zone1", "");
                      }}
                      value={TimeZone_List.find((v) => v.tzCode == time_zone)}
                      defaultValue={TimeZone_List.find(
                        (v) => v.tzCode == time_zone
                      )}
                      id="free-solo-demo-time-zone"
                      options={TimeZone_List}
                      getOptionLabel={(option: any) => `${option?.value}`}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          {option.view}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <>
                          <TextField
                            size="medium"
                            placeholder="Please select time zone"
                            {...params}
                            error={formik.errors.time_zone1 ? true : false}
                            helperText={formik.errors.time_zone1}
                          />
                        </>
                      )}
                    />
                  </Stack>
                )}
              </FieldValueContainer>
            </FieldOuterContainer>
          </FormControl>
        </Grid>
      </Grid>
    </ContentInnerContainer>
  );
};
