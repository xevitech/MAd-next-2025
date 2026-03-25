import {
  AboutCompanyImage,
  AboutIconButton,
} from "@/components/CompanySettings/CompanyDetail/style";
import ImageCropper from "@/components/common/ImageCropper";
// import { setBanner } from "@/hooks/sellerSubaccount";
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function BannerImage({ formik, role, editMode, inputRef }) {
  const [bannerImage, setBannerImage] = useState<any>("");
  const [bannerName, setBannerName] =useState<any>(formik.values?.minisite_footer_banner_name)
  const [mount, setMount] = useState<boolean>(false);

  

  useEffect(() => {
    if (formik.values.minisite_footer_banner && bannerImage == "" && !mount) {
      setBannerImage(formik.values.minisite_footer_banner);
      setMount(true);
    }
    formik.setFieldValue("minisite_footer_banner_name", bannerName);
  }, [formik.values.minisite_footer_banner, mount, bannerImage]);
  
  return (
    <Grid item xs={12} sm={8} md={8} lg={8} xl={8} sx={{ fontSize: "14px" }}>
      {role == "seller" ? (
        <AboutCompanyImage>
          {editMode && formik.values.minisite_footer_banner && (
            <Box>
              <img
                src={
                  editMode
                    ? bannerImage
                      ? typeof bannerImage == "string"
                        ? bannerImage
                        : URL.createObjectURL(bannerImage)
                      : bannerImage
                    : "assets/minisiteimages/dummy_image.svg"
                }
                alt="About Company"
              />
            </Box>
          )}

          {!formik.values.minisite_footer_banner && editMode && (
            <img src="/assets/minisiteimages/dummy_image.svg" />
          )}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              margin: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ margin: "auto" }}>
              <AboutIconButton>
                <Button
                  component="label"
                  variant="contained"
                  className="upbuttonabout"
                  ref={inputRef}
                >
                  <ImageCropper
                    deleteImages={null}
                    type={"square"}
                    endPoints={""}
                    params={""}
                    defaultImage={""}
                    setImageName={setBannerName}
                    onChange={(e) => {
                      setBannerImage(e);
                      formik.setFieldValue("minisite_footer_banner", e);
                    }}
                  />
                </Button>
              </AboutIconButton>
              <Typography
                variant="body1"
                sx={{
                  color: "#231f20",
                  fontSize: "13px",
                  marginTop: "4px",
                  textAlign: "center",
                  opacity:'.6'
                }}
              >
                Upload Image <span>400X400</span>
              </Typography>
            </Box>
          </Box>
        </AboutCompanyImage>
      ) : (
        ""
      )}
    </Grid>
  );
}

export default BannerImage;
