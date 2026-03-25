import { Box, Breadcrumbs, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  DescriptionOfCate,
  HeadingCategory,
  MyBannerImage,
  Textoverimage,
} from "./style";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { apiClient } from "../common/common";

function Banner(props) {
  const { breadcrumbs: breadCrumbsDatas = [], categoryName } = props;
  const { asPath } = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBreadcrumbData = async () => {
      const pathBlock = asPath
        .split("/")
        .filter((segment) => segment !== "" && segment !== "category");
      let breadcrumbData = [{ name: "Home", href: "/", slugKeyword: "" }];
      const regex = /-[a-zA-Z0-9]{5}$/;

      // Iterate through the pathBlock array
      for (let i = 0; i < pathBlock.length; i++) {
        const slug = pathBlock[i];

        // Check if the segment matches the regex pattern

        if (regex.test(slug)) {
          // Remove the trailing alphanumeric suffix

          // Fetch the name from the API using the cleanedSlug
          try {
            const categoryData = await apiClient(
              `menu/SubCategoryList?slug=${slug}`,
              "get"
            );
            const name = categoryData?.data[0]?.name || slug;
            const slugKeyword = categoryData?.data[0].slug;

            // Build the breadcrumb path for this segment
            const href = pathBlock.slice(0, i + 1).join("/");
            // pathBlock[i].name = name
            breadcrumbData.push({ name, href, slugKeyword });
          } catch (error) {
            console.error("Error fetching category data:", error);
          }
        } else {
          // If there's no match, just add the cleaned slug
          const href = `/${pathBlock.slice(1, i + 1).join("/")}`;
          breadcrumbData.push({ name: slug, href, slugKeyword: slug });
        }
      }
      setBreadcrumbs(breadcrumbData);
    };
    if (breadCrumbsDatas?.length < 0) {
      fetchBreadcrumbData();
    } else {
      setBreadcrumbs(breadCrumbsDatas);
    }
  }, [asPath]);

  const getUrlToRedirect = useCallback(
    (targetSlug) => {
      let baseUrl = "/category";
      const slugs = breadcrumbs
        .slice(0, breadcrumbs.findIndex((b) => b.slug === targetSlug) + 1)
        .map((b) => b.slug);
      return `${baseUrl}/${slugs.join("/")}`;
    },
    [breadcrumbs]
  );

  return (
    <MyBannerImage sx={{ marginBottom: "28px", cursor: "pointer" }}>
      <Box position={"relative"}>
        <div className="bannerlayer"></div>
        <img
          src={categoryName?.banner}
          alt={categoryName?.name}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
          }}
        />
        <Textoverimage>
          <HeadingCategory>{categoryName?.name}</HeadingCategory>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{
              padding: "10px 0 10px",
              "& .MuiBreadcrumbs-ol": {
                display: "flex",
                justifyContent: "center",
              },
            }}
          >
            {breadcrumbs?.map((breadcrumb) => (
              <Typography
                sx={{
                  fontWeight: "600 !important",
                  textTransform: "capitalize",
                }}
                onClick={(slug) => {
                  const urlToRedirect = getUrlToRedirect(breadcrumb?.slug);
                  router.push(urlToRedirect);
                }}
              >
                {breadcrumb.name}
              </Typography>
            ))}
          </Breadcrumbs>
        </Textoverimage>
      </Box>
    </MyBannerImage>
  );
}

export default Banner;
