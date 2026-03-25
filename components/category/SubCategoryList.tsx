import { Box, Grid } from "@mui/material";
import React from "react";
import {
  AllHeadings,
  ArrowNtext,
  Items,
  Liststyle,
  CateDescription,
  ChildCateThumb,
} from "./style";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/router";
function SubCategoryList({ v }) {
  const router = useRouter();
  const NavigateHandler = (slug: any ) => {
    window.open(`/productlist?category=${slug}`, "_blank", "noreferrer");
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
        <Box
          sx={{
            borderBottom: "1px solid #dddddd",
            paddingBottom: "12px",
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
              <ChildCateThumb>
                <img src={v.icon} alt={v.name} />
              </ChildCateThumb>
            </Grid>
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
              <Box>
                <AllHeadings
                  sx={{ cursor: "pointer" }}
                  onClick={() => NavigateHandler(v.slug)}
                >
                  {v.name}
                </AllHeadings>
                <CateDescription>{v.description}</CateDescription>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Liststyle>
              {v?.sub_category?.slice(0, 5)?.map((sub) => (
                <Items
                  key={sub.id}
                  onClick={() => {
                    router.push(`${router.asPath}/${v.slug}/${sub.slug}`);
                  }}
                >
                  {sub.name}
                </Items>
              ))}
            </Liststyle>
          </Grid>
        </Grid>
        {v?.sub_category?.length >= 5 && (
          <Box sx={{ marginBottom: "16px" }}>
            <ArrowNtext
              onClick={(e) =>
                router.push(
                  `${router.asPath}/${v.slug}/${
                    v?.sub_category?.[0]?.slug ?? ""
                  }`
                )
              }
            >
              More Categories <ArrowForwardIosIcon />
            </ArrowNtext>
          </Box>
        )}
      </Grid>
    </>
  );
}

export default SubCategoryList;
