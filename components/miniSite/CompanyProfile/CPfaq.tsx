import CPheader from "./CPheaderComponent";
import React, { useEffect, useRef, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Skeleton,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { apiClient } from "@/components/common/common";
import EmptyPage from "@/components/miniSite/EmptyPages/index";
import router from "next/router";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AnswerContainer,
  QuestionContainer,
} from "@/components/CompanySettings/CompanyDetail/commonStyles";
import Button from "@mui/material/Button";

const CustomizedAccordion = styled(Accordion)(() => ({
  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  "& .MuiPaper-root": {
    boxShadow: "none",
  },
  boxShadow: "none",
  margin: "0 !important",
  "&.Mui-expanded": {
    "& .MuiCollapse-root": {},
  },
}));

export default function CPfaq() {
  const [loading, setLoading] = useState<boolean>(false);
  const [faqData, setFaqData] = useState<any>([]);
  const [expandFaq, setExpandFaq] = useState<any>([]);
  const [expand, setExpand] = useState<number>(0);
  const arr = [1, 1, 1, 1];
  const refs = useRef<any>([]);
  const [height, setHeight] = useState<any>(null);
  const { minisiteUserID } = useSelector((state: any) => state.miniSite);
  let userid = JSON.parse(localStorage.getItem("userData"))?.id;
  async function fetchFaqData() {
    setLoading(true);
    let response = await apiClient("front/mini-site/faq/list", "post", {
      body: { user_id: minisiteUserID },
    });
    if (response.status === 200) {
      setLoading(false);
      setFaqData(response.data);
      setExpandFaq(response.data?.slice(0, 3));
    }
    setLoading(false);
  }

  useEffect(() => {
    if (minisiteUserID) fetchFaqData();
  }, [minisiteUserID]);

  useEffect(() => {
    if (!loading) {
      if (faqData?.length < 2) return;
      const heights = refs.current?.map((element, i) =>
        i < 2 ? element.offsetHeight + 20 : 0
      );
      const sum = heights.reduce(function (a, b) {
        return a + b;
      }, 0);
      setHeight(sum);
    }
  }, [loading]);
  const NavigateHandler = (route) => router.push(route);
  const enabledFaqsData = faqData?.filter((item) => item.status === "enable");

  return (
    <Box>
      <Box mb={{ xs: 1, sm: 1 }}>
        <CPheader icon="icon-faqs" title="FAQs" />
      </Box>
      <Box>
        <Stack direction="column">
          {loading &&
            arr.map((item, i) => (
              <Box key={i}>
                <Box mb={{ xs: 1.5, sm: 2.5 }}>
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{ fontSize: "2rem" }}
                  />
                </Box>
                <Box>
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                  />
                </Box>
              </Box>
            ))}
          {!loading &&
            expandFaq
              .filter((item) => item.status === "enable")
              .map((item, i) => (
                <CustomizedAccordion
                  key={i}
                  expanded={expand === i}
                  onClick={() => setExpand(i)}
                >
                  <AccordionSummary
                    sx={{
                      margin: "0px",
                      backgroundColor: "transparent !important",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                      "& .MuiAccordionSummary-content": {
                        backgroundColor: "transparent",
                      },
                      "&.Mui-expanded": {
                        "& .MuiAccordionSummary-content": {
                          margin: "0px !important",
                        },
                        margin: "0px !important",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      },
                    }}
                    className="faq_col"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <QuestionContainer
                      style={{ paddingRight: "35px", width: "100%" }}
                    >
                      {item.faq_title}
                    </QuestionContainer>
                  </AccordionSummary>

                  <AccordionDetails
                    sx={{
                      "&.MuiAccordionDetails-root": {
                        padding: "0px",
                      },
                    }}
                  >
                    <AnswerContainer>{item.faq_answer}</AnswerContainer>
                  </AccordionDetails>
                </CustomizedAccordion>
              ))}
        </Stack>
        {!loading && faqData?.length > 3 && (
          <Button
            variant="outlined"
            onClick={() => {
              if (expandFaq?.length == 3) {
                setExpandFaq((prev) => [...prev, ...faqData.slice(3)]);
              } else {
                setExpandFaq(faqData?.slice(0, 3));
              }
            }}
            sx={{
              fontSize: "14px",
              borderRadius: "6px",
              color: "#d7282f",
              border: "1px solid #d7282f",
              margin: "12px 0 0 0",
              padding: "3px 8px",
              textTransform: "capitalize",
              transition: "all ease 0.3s",
              "&:hover": {
                border: "1px solid #d7282f",
              },
            }}
          >
            {" "}
            {expandFaq?.length > 3 ? "Expand less" : "Expand more"}
          </Button>
        )}
        {enabledFaqsData?.length === 0 && (
          <EmptyPage
            text={"FAQ's"}
            onClickHandler={() =>
              NavigateHandler("/companySettings/companyDetails?tab=faq")
            }
            logo="/assets/faq.svg"
            actiontext={userid !== minisiteUserID ? false : true}
          />
        )}
      </Box>
    </Box>
  );
}
