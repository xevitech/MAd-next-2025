import { Box, Breadcrumbs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SubCategoryDetail from "./SubCategoryDetail";
import { useSelector } from "react-redux";
import { setSubCategoryDetail } from "@/hooks/CategoryReducer";
import { useAppDispatch } from "redux/store";
import { apiClient } from "../common/common";
const CategoryPage = ({ list }) => {

  const router = useRouter();
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const [categoryData, setCategoryData] = useState<any>([]);
  const categoryList =
    useSelector((state: any) => state.header)?.categoryList ?? [];
  const TabIndex = categoryList?.findIndex((v) => v.slug == query?.category);
  const categoryBreadCrumbs = categoryList?.[TabIndex];
  const subCategoryBreadCrumbs = categoryList?.[TabIndex]?.sub_category?.find(
    (v) => v?.slug == query?.id?.[0]
  );
  useEffect(() => {
    if (query?.id?.length == 1) {
      dispatch(setSubCategoryDetail([]));
    }
  }, [query?.id]);

  useEffect(() => {
    (async () => {
      let categoryResponse: any = await apiClient(
        `menu/SubCategoryList?slug=${query?.id[1]}`,
        "get"
      );
      setCategoryData(categoryResponse.data);
    })();
  }, [query?.id]);

  return (
    <Box sx={{ border: "1px solid transparent", backgroundColor: "#fff" }}>
      <Box sx={{ padding: "16px" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography
            fontWeight={600}
            sx={{ fontSize: "12px", cursor: "pointer" }}
            color="#d7282f"
            onClick={() => router.push(`/`)}
          >
            Home
          </Typography>
          <Typography
            fontWeight={600}
            color="#d7282f"
            sx={{ cursor: "pointer", fontSize: "12px" }}
            onClick={() =>
              router.push(`/category/${categoryBreadCrumbs?.slug}`)
            }
          >
            {categoryBreadCrumbs?.name}
          </Typography>
          <Typography
            fontWeight={600}
            sx={{
              cursor: "pointer",
              fontSize: "12px",
              "&:hover": { color: "#d7282f" },
            }}
            onClick={() =>
              router.push(
                `/category/${categoryBreadCrumbs?.slug}/${subCategoryBreadCrumbs?.slug}`
              )
            }
          >
            {subCategoryBreadCrumbs?.name}
          </Typography>
          <Typography
            fontWeight={600}
            sx={{
              cursor: "pointer",
              fontSize: "12px",
              "&:hover": { color: "#d7282f" },
            }}
            onClick={() =>
              router.push(
                `/category/${categoryBreadCrumbs?.slug}/${subCategoryBreadCrumbs?.slug}`
              )
            }
          >
            {categoryData?.[0]?.name}
          </Typography>

          <Typography
            fontWeight={600}
            color="#d7282f"
            sx={{ fontSize: "12px" }}
          >
            {list?.categoryList?.[0]?.name}
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box>
        <SubCategoryDetail list={list} categoryData={categoryData} />
      </Box>
    </Box>
  );
};

export default CategoryPage;
