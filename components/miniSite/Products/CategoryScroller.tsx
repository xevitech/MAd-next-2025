import Tab from "@mui/material/Tab";
import React, { useEffect } from "react";
import { CategoryTabs } from "./Products.styled";
import { useRouter } from "next/router";
import { TargetInnerSection } from "../styled";
import { Box, Stack, Skeleton } from "@mui/material";

export default function CategoryScroller({
  skeleton,
  categoryList,
  FetchProductList,
  setSearchCategory,
  searchCategory = null,
}) {
  const [value, setValue] = React.useState(-1);
  const [search, setSearch] = React.useState(false);
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (search) {
      FetchProductList();
      setSearch(false);
    }
  }, [search]);

  useEffect(() => {
    if (searchCategory && value == -1) {
      let index = categoryList.findIndex((v) => v.id == searchCategory?.id);
      setValue(index);
    }
  }, [searchCategory]);
  let List = [1, 2, 3, 4];
  return (
    <TargetInnerSection>
      {skeleton ? (
        <>
          <Box sx={{ display: "flex", alignItems: "center",flexWrap:'wrap' }}>
            {List.map((v, i) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  padding: "20px",
                }}
              >
                <Box sx={{ height: "36px", width: "36px", minWidth: "36px" }}>
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    height={"100%"}
                    width={"100%"}
                  />
                </Box>
                <Box>
                  <Skeleton animation="wave" variant="text" width={"100px"} />
                </Box>
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <Box>
          {categoryList?.length > 0 && (
            <CategoryTabs
              value={searchCategory?.id && value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              TabIndicatorProps={{
                style: { display: "none" },
              }}
            >
              {categoryList?.map((item, i) => (
                <Tab
                  onClick={() => {
                    if (router.query.category) {
                      router.push(router.asPath.split("?")[0]);
                    }
                    setSearchCategory(item);
                    setSearch(true);
                  }}
                  label={item.name}
                  icon={<img src={item.icon} alt="icon" />}
                />
              ))}
            </CategoryTabs>
          )}
        </Box>
      )}
    </TargetInnerSection>
  );
}
