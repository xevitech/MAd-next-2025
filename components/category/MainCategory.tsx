import { Box, Grid } from "@mui/material";
import React from "react";
import {
  CustomeTab,
  Verticaltabimg,
  TabRightContent,
  CategoryTabs,
} from "./style";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListIcon from "@mui/icons-material/List";
import { useTheme } from "@mui/material";
import Banner from "./Banner";
import SubCategoryList from "./SubCategoryList";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ flexGrow: 1 }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <TabRightContent>
          <Typography>{children}</Typography>
        </TabRightContent>
      )}
    </div>
  );
}

function MainCategory() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const categoryList =
    useSelector((state: any) => state.categoryDetail)?.categoryList ?? [];
  const subCategoryList =
    useSelector((state: any) => state.categoryDetail)?.categoryDetail ?? [];

  const handleChange = async (event: any, newValue: number) => {
    router.push(`/category/${categoryList[newValue].slug}`);
  };

  return (
    <Box className='fixed-header'>
      <Box>
        <Grid container spacing={2}>
          <Grid
            item
            md={4}
            lg={3}
            xl={2}
            sx={{
              position: "relative",
              borderRight: "1px solid #d2d2d2",
              paddingRight: "16px",
              marginTop: "16px",
              paddingTop: "0 !important",
              "@media (max-width: 900px)": {
                display: "none",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                fontWeight: "600",
                marginBottom: "12px",
                "& .MuiSvgIcon-root": {
                  fontSize: "22px",
                  marginRight: "6px",
                },
              }}
            >
              <ListIcon /> All Categories
            </Box>
            <CategoryTabs
              orientation={isMobile ? "horizontal" : "vertical"}
              value={categoryList.findIndex(
                (v: any) => v.id == subCategoryList[0]?.id
              )}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{
                "& .MuiTabs-indicator": { display: "none" },
                height: "100vh",
                "& .MuiTabs-scroller": {
                  overflowY: "auto !important",
                  paddingRight: "6px ",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },

                  "&::-webkit-scrollbar-track": {
                    background: "#f1f1f1",
                    borderRadius: "10px",
                  },

                  "&::-webkit-scrollbar-thumb": {
                    background: "#d2d2d2",
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "#6d6d6d !important",
                  },
                },
                "@media screen and (max-width:900px)": {
                  height: "auto",
                },
              }}
            >
              {categoryList.map((v: any) => (
                <CustomeTab
                  key={v.id}
                  iconPosition="start"
                  icon={<Verticaltabimg src={v.icon} alt={v.name} />}
                  label={v.name}
                  {...a11yProps(v.id)}
                  sx={{ justifyContent: "start" }}
                />
              ))}
            </CategoryTabs>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={9} xl={10}>
            <TabPanel value={0} index={0}>
              <Banner
                categoryName={subCategoryList?.[0]}
              />
              <Typography
                variant="h6"
                sx={{
                  fontSize: "13px",
                  marginBottom: "16px",
                }}
              >
                {subCategoryList?.[0]?.description}
              </Typography>
              <Box>
                <Grid container spacing={3}>
                  {subCategoryList?.[0]?.sub_category?.map((v) => (
                    <SubCategoryList v={v} />
                  ))}
                </Grid>
              </Box>
            </TabPanel>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default MainCategory;
