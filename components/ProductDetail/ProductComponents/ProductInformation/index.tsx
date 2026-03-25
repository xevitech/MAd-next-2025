import React, { useEffect, useRef, useState } from "react";
import {
  ProductItemContainer,
  // TabContainer,
} from "@/components/ProductDetail/style";
import { Tab, Box, styled } from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import parse from "html-react-parser";
import "bootstrap/dist/css/bootstrap.css";
import customtab from "./customtab.module.css";
import { useSelector } from "react-redux";

const ProductInformation = ({ marginTop = "4px" }) => {
  const [tabValue, setTabValue] = useState<any>(1);
  const [scrollY, SetScroolY] = useState<any>(0);
  const { tabs, specifications }: any = useSelector(
    (state: any) => state.productDetail.detail.data
  );
  const [tabList, setTabList] = useState<any>([]);
  const tabPanelRef = useRef([]);
  const TabContainer = styled(Box)(({ theme }) => ({
    fontFamily: "Open Sans",
    "& .MuiTabPanel-root": {
      // maxHeight: "890px",
      // height: "890px",
      // overflowY: "auto",
    },
  }));

  useEffect(() => {
    if (specifications.length == 0 && tabValue == "specs") {
      setTabValue(1);
    }
  }, [specifications]);

  useEffect(() => {
    if (tabs) {
      let list = JSON.parse(tabs);
      setTabList(list);
    }
  }, [tabs]);

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const HandleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleScroll = (index, value) => (event) => {
    if (tabPanelRef.current[index]) {
      const height = tabPanelRef.current[index].clientHeight;
      if (event.target.scrollHeight - event.target.scrollTop == height) {
        if (value.value !== tabList?.[tabList.length - 1]?.value) {
          setTabValue(value.value + 1);
        }
      }
    }
  };

  return (
    <>
      <ProductItemContainer
        style={{
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          boxShadow: "none",
        }}
      >
        <Box
          sx={{
            width: "100%",
            typography: "body1",
            "& .MuiTabs-root": {
              minHeight: "36px",
              "& .MuiTab-root": {
                fontSize: "13px",
              },
            },
          }}
          // className={customtab.productdetail_tab}
          className="productdetail_tab"
        >
          <TabContext value={`${tabValue}`}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                // padding: "16px 0px 0px",
                position: "sticky",
                background: "white",
                // top: "60px",
                // top: "90px",
                top: "102px",
                zIndex: "1",
                borderRadius: "10px 10px 0 0",
                "@media (max-width: 899px)": {
                  padding: "5px 0px 0px",
                },
              }}
            >
              <TabList
                onChange={HandleChange}
                aria-label="lab API tabs example"
                variant="scrollable"
                scrollButtons="auto"
                TabIndicatorProps={{
                  sx: { backgroundColor: "#D7282F" },
                }}
                sx={{
                  "& button": {
                    // backgroundColor: "#EDEDED",
                    color: "#231F20",
                    marginRight: "3px",
                    fontWeight: 500,
                    fontSize: "16px",
                    textTransform: "capitalize",
                    border: "none",
                    padding: "6px 20px",
                    minHeight: "36px",
                  },

                  "& button:hover": {
                    // backgroundColor: "#d9d8d8",
                    borderBottom: "transparent",
                    backgroundColor: "#FFE5E7",
                    color: "#d7282f",
                  },
                  "& button:active": {
                    // backgroundColor: "#d9d8d8",
                    backgroundColor: "#FFE5E7",
                  },
                  "& button:focus": {
                    // backgroundColor: "#d9d8d8",
                    backgroundColor: "#FFE5E7",
                  },
                  "& button.Mui-selected": {
                    // backgroundColor: "#2A2A2A",
                    // color: "#ffffff",
                    backgroundColor: "#FFE5E7",
                    color: "#d7282f",
                    fontWeight: "600",
                  },
                }}
              >
                {tabList.map((v, i) => (
                  <Tab
                    data-tracking={`${v.title}-product-specifciation-Tab`}
                    key={i}
                    label={`${v.title || Object.keys(v)}`}
                    value={`${v.value || Object.keys(v)}`}
                    className={customtab.tab_button}
                    sx={{
                      "& button": {
                        backgroundColor: "#ECECEC",
                        color: "#231F20",
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                        marginRight: "3px",
                        borderTopLeftRadius: "6px",
                        borderTopRightRadius: "6px",
                        fontWeight: 400,
                        fontSize: "15px",
                        textTransform: "capitalize",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                      },
                      "& button:hover": {
                        backgroundColor: "rgba(215, 40, 47, 0.85);",
                        color: "white",
                      },
                      "& button:active": {
                        backgroundColor: "rgba(215, 40, 47, 0.85);",
                        color: "white",
                      },
                      "& button:focus": {
                        backgroundColor: "rgba(215, 40, 47, 0.85);",
                        color: "white",
                      },
                      "& button.Mui-selected": {
                        backgroundColor: "rgba(215, 40, 47, 0.85);",
                        color: "white",
                      },
                    }}
                  />
                ))}
              </TabList>
            </Box>
            <TabContainer>
              {tabList.map((v, i) => (
                <TabPanel
                  value={`${v.value}`}
                  key={i}
                  ref={(el) => (tabPanelRef.current[i] = el)}
                  className="ProductInfoCol"
                  id={v.value}
                  onScroll={handleScroll(i, v)}
                >
                  {v.content ? parse(`${JSON.parse(v.content)}`) : ""}
                </TabPanel>
              ))}
            </TabContainer>
          </TabContext>
        </Box>
      </ProductItemContainer>
    </>
  );
};
export default ProductInformation;
