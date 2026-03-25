import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import {
  BrowsingOuterBox,
  MiniSiteContainer,
  ScrollHiddenDiv,
  TabContentBox,
  TabsStyle,
  TabStyle,
} from "./browingStyle";
import BrowsingHistory from "./BrowsingHistory";
import SuggestionForYou from "./SuggestionForYou";
import { Typography, Grid } from "@mui/material";
import Link from "next/link";
import { apiClient } from "../common/common";
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Browsinghistory() {
  const [value, setValue] = React.useState(0);
  const [highLight, setHighLight] = useState<any>("");
  const [loader, setLoader] = useState(true);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [scrollingDown, setScrollingDown] = useState(false);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [productslist, setProductslist] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [userId, setUserId] = useState("");
  const [ip, setIp] = useState("");

  const browsingHistoryFn = async () => {
    try {
      const curr = localStorage.getItem("currency");
      const userData = localStorage.getItem("userData");
      const ip = localStorage.getItem("ipAddress");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setUserId(parsedUserData.id);
      }
      setIp(ip);
      const response = await apiClient(
        `front/browsing_history/product/list?user_id=${userId}&ip=${ip}&currency=${curr}`,
        "get"
      );
      const { productslist, SuggestedProducts } = response;
      setSuggestedProducts(SuggestedProducts);
      setProductslist(productslist);
      setLoader(false);
      console.log("Products List:", productslist);
      console.log("Suggested Products:", SuggestedProducts);
    } catch (err) {
      console.error("Error fetching browsing history:", err);
    }
  };

  useEffect(() => {
    browsingHistoryFn();
    return () => {};
  }, []);

  const list = [
    {
      name: "Browsing History",
      link: "#BrowsingHistory",
      icon: "",
      id: "BrowsingHistory",
    },
    {
      name: "Suggestions For You",
      link: "#SuggestionForYou",
      icon: "",
      id: "SuggestionForYou",
    },
  ];

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setHighLight(entry.target.id);
        }
      });
    }, options);

    list.forEach((item) => {
      const section = sectionsRef.current[item.id];
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [list]);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollPosition = window.pageYOffset;
      setScrollingDown(currentScrollPosition > prevScrollPosition);
      setPrevScrollPosition(Math.max(currentScrollPosition, 0));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPosition]);
  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -240; // Adjust offset as needed
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  return (
    <>
      <MiniSiteContainer sx={{ padding: "20px 0  0 0" }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            display={{ xs: "none", lg: "block" }}
            sx={{
              position: "sticky",
              top: `${scrollingDown ? "86px" : "126px"}`,
              zIndex: "99",
            }}
          >
            <Box sx={{ borderRadius: "6px" }}>
              <Box
                sx={{
                  padding: "16px",
                  width: "100%",
                  background: "#fff",
                  borderRadius: "6px",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <Box className="scrollspy" display={"flex"}>
                  {list.map((v, i) => (
                    <Typography
                      component="li"
                      key={v.id}
                      sx={{ listStyle: "none", cursor: "pointer" }}
                    >
                      <Link
                      href={"/"}
                        // href={`#${v.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleScrollToSection(v.id);
                        }}
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: highLight === v.id ? "#d7282f" : "black",
                          cursor: "pointer",
                        }}
                      >
                        {v.name}
                      </Link>
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                background: "#fff",
                width: "100%",
                padding: "16px",
                borderRadius: "6px",
              }}
            >
              {list.map((item) => (
                <div
                  key={item.id}
                  ref={(el) => (sectionsRef.current[item.id] = el)}
                  id={item.id}
                  style={{ marginBottom: "24px" }}
                >
                  <>
                    {item.id === "BrowsingHistory" && (
                      <>
                        <BrowsingHistory list0={productslist} load={loader} />
                      </>
                    )}
                  </>
                  <>
                    {item.id === "SuggestionForYou" && (
                      <>
                        <SuggestionForYou
                          list1={suggestedProducts}
                          load={loader}
                        />
                      </>
                    )}
                  </>
                </div>
              ))}
            </Box>
          </Grid>
        </Grid>
      </MiniSiteContainer>
    </>
  );
}
