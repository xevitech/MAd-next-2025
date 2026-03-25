import React, { useCallback, useEffect, useState } from "react";
import { Box, Skeleton, Typography, styled } from "@mui/material";
import {
  InnInfo,
  ContentLine,
  DotItem,
  HistoryContent,
  HistoryContentContainer,
  HistoryDataContainer,
  HistoryDate,
  HistoryDes,
  HistoryHeader,
  HistoryLabel,
  HistoryTopBar,
  Historycontainer,
  Iconcontainer,
  UserName,
  RowItem,
  HighlightTxt,
  HistoryStack,
  HistoryStackInn,
  CustomTabContent,
  HistoryTabsStyle,
  CustomTabBox,
  AuthorCreator,
  CrmHistoryData,
} from "../style";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Image from "next/image";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useAppDispatch } from "redux/store";
import { leadActivity } from "@/hooks/UseCreateFormData";
import { useSelector } from "react-redux";
import moment from "moment";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import HistoryList from "./HistoryList";
import { useRouter } from "next/router";
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,
  // "&:not(:last-child)": {
  //   borderBottom: 0,
  // },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#FFECEC",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(270deg)",
  },
  "& .MuiAccordionSummary-content": {
    margin: 0,
    // marginLeft: theme.spacing(1),
  },
  "&.MuiAccordionSummary-root": {
    minHeight: "38px",
    borderRadius:"8px 8px 0 0",
   
    "& .MuiTypography-root": {
      fontWeight: 600,
      color: "#d7282f",
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
      position: "absolute",
      right: "10px",
    },
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
  // borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
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
      {value === index && (
        <CustomTabBox>
          <Typography>{children}</Typography>
        </CustomTabBox>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const History = () => {
  const { leadHistory, leadHistoryLoader ,details} = useSelector(
    (state: any) => state.formList
  );
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  const handleChangeHistory = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValue(newValue);
  };
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  useEffect(() => {
    if(router?.query?.id?.[0]==undefined){
      dispatch(leadActivity(details.unique_id));
    }else{
      dispatch(leadActivity(router?.query?.id?.[0]));
    }
   
  }, [dispatch]);

  return (
    <>
      {leadHistoryLoader && (
        <Box sx={{ padding: "0 1rem" }}>
          <Box
            sx={{
              padding: "10px 0 10px 0",
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              display: "flex",
              alignItems: "center",
              gap: "32px",
            }}
          >
            <Box>
              <Skeleton animation="wave" variant="text" width={50} />
            </Box>
            <Box>
              <Skeleton animation="wave" variant="text" width={50} />
            </Box>
            <Box>
              <Skeleton animation="wave" variant="text" width={50} />
            </Box>
            <Box
              sx={{
                "@media screen and (max-width:767px)": { display: "none" },
              }}
            >
              <Skeleton animation="wave" variant="text" width={50} />
            </Box>
            <Box
              sx={{
                "@media screen and (max-width:767px)": { display: "none" },
              }}
            >
              <Skeleton animation="wave" variant="text" width={50} />
            </Box>
            <Box
              sx={{
                "@media screen and (max-width:767px)": { display: "none" },
              }}
            >
              <Skeleton animation="wave" variant="text" width={50} />
            </Box>
            <Box
              sx={{
                "@media screen and (max-width:767px)": { display: "none" },
              }}
            >
              <Skeleton animation="wave" variant="text" width={50} />
            </Box>
            <Box
              sx={{
                "@media screen and (max-width:767px)": { display: "none" },
              }}
            >
              <Skeleton animation="wave" variant="text" width={50} />
            </Box>
          </Box>
          <Box sx={{ marginTop: "1rem" }}>
            <Box sx={{ padding: "0 0 10px 0" }}>
              <Skeleton
                animation="wave"
                variant="text"
                sx={{
                  width: "12%",
                  "@media screen and (max-width:767px)": { width: "80px" },
                }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                sx={{
                  width: "20%",
                  "@media screen and (max-width:767px)": { width: "150px" },
                }}
              />
            </Box>
            <Box>
              <Box>
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{
                    width: "4%",
                    "@media screen and (max-width:767px)": { width: "70px" },
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <Skeleton
                  animation="wave"
                  variant="circular"
                  height={30}
                  width={30}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{
                    margin: "0 0 0 12px",
                    width: "5%",
                    "@media screen and (max-width:767px)": {
                      width: "60px",
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 0 0 12px",
                }}
              >
                <Skeleton
                  animation="wave"
                  variant="text"
                  height={8}
                  width={"2%"}
                  sx={{
                    "@media screen and (max-width:767px)": { display: "none" },
                  }}
                />{" "}
                <Skeleton
                  variant="circular"
                  animation="wave"
                  height={12}
                  width={12}
                />{" "}
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={"100%"}
                  height={30}
                  sx={{ marginLeft: "7px" }}
                />
              </Box>
            </Box>
            <Box sx={{ marginTop: "12px" }}>
              <Box>
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{
                    width: "4%",
                    "@media screen and (max-width:767px)": { width: "70px" },
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <Skeleton
                  animation="wave"
                  variant="circular"
                  height={30}
                  width={30}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{
                    margin: "0 0 0 12px",
                    width: "5%",
                    "@media screen and (max-width:767px)": {
                      width: "60px",
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 0 0 12px",
                }}
              >
                <Skeleton
                  animation="wave"
                  variant="text"
                  height={8}
                  width={"2%"}
                  sx={{
                    "@media screen and (max-width:767px)": { display: "none" },
                  }}
                />{" "}
                <Skeleton
                  variant="circular"
                  animation="wave"
                  height={12}
                  width={12}
                />{" "}
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={"100%"}
                  height={30}
                  sx={{ marginLeft: "7px" }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      <CrmHistoryData>
        {!leadHistoryLoader && leadHistory?.length > 0 && (
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>History</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <HistoryDataContainer>
                <Box sx={{ width: "100%", p: "0 1rem 1rem" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChangeHistory}
                      variant="scrollable"
                      scrollButtons="auto"
                      aria-label="scrollable auto tabs example"
                      sx={HistoryTabsStyle}
                    >
                      <Tab label="All" {...a11yProps(0)} />
                      <Tab label="Notes" {...a11yProps(1)} />
                      <Tab label="Files" {...a11yProps(2)} />
                      <Tab label="Activity" {...a11yProps(3)} />
                      <Tab label="Invited Meetings" {...a11yProps(4)} />
                      <Tab label="Emails" {...a11yProps(5)} />
                      <Tab label="Enquiry Details" {...a11yProps(6)} />
                      <Tab label="Quotes" {...a11yProps(7)} />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={value} index={0}>
                    <CustomTabContent>
                      <Typography className="Mainheading" variant="h6">
                        Only you can see your Activity log.
                      </Typography>
                      <HistoryDes>
                        Now you can review and see everything- from today back
                        when you first started using "Merchant AD"
                      </HistoryDes>
                      <Historycontainer>
                        <HistoryList leadHistory={leadHistory} type={"all"} />
                      </Historycontainer>
                    </CustomTabContent>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    <CustomTabContent>
                      <Typography className="Mainheading" variant="h6">
                        Only you can see your Activity log.
                      </Typography>
                      <HistoryDes>
                        Now you can review and see everything- from today back
                        when you first started using "Merchant AD"
                      </HistoryDes>
                      <Historycontainer>
                        <HistoryList leadHistory={leadHistory} type={"notes"} />
                      </Historycontainer>
                    </CustomTabContent>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={2}>
                    <CustomTabContent>
                      <Typography className="Mainheading" variant="h6">
                        Only you can see your Activity log.
                      </Typography>
                      <HistoryDes>
                        Now you can review and see everything- from today back
                        when you first started using "Merchant AD"
                      </HistoryDes>
                      <Historycontainer>
                        <HistoryList leadHistory={leadHistory} type={"files"} />
                      </Historycontainer>
                    </CustomTabContent>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={3}>
                    <CustomTabContent>
                      <Typography className="Mainheading" variant="h6">
                        Only you can see your Activity log.
                      </Typography>
                      <HistoryDes>
                        Now you can review and see everything- from today back
                        when you first started using "Merchant AD"
                      </HistoryDes>
                      <Historycontainer>
                        <HistoryList
                          leadHistory={leadHistory}
                          type={"activity"}
                        />
                      </Historycontainer>
                    </CustomTabContent>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={4}>
                    <CustomTabContent>
                      <Typography className="Mainheading" variant="h6">
                        Only you can see your Activity log.
                      </Typography>
                      <HistoryDes>
                        Now you can review and see everything- from today back
                        when you first started using "Merchant AD"
                      </HistoryDes>
                      <Historycontainer>
                        <HistoryList
                          leadHistory={leadHistory}
                          type={"activity"}
                        />
                      </Historycontainer>
                    </CustomTabContent>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={5}>
                    <CustomTabContent>
                      <Typography className="Mainheading" variant="h6">
                        Only you can see your Activity log.
                      </Typography>
                      <HistoryDes>
                        Now you can review and see everything- from today back
                        when you first started using "Merchant AD"
                      </HistoryDes>
                      <Historycontainer>
                        <HistoryList leadHistory={leadHistory} type={"email"} />
                      </Historycontainer>
                    </CustomTabContent>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={6}>
                    <CustomTabContent>
                      <Typography className="Mainheading" variant="h6">
                        Only you can see your Activity log.
                      </Typography>
                      <HistoryDes>
                        Now you can review and see everything- from today back
                        when you first started using "Merchant AD"
                      </HistoryDes>
                      <Historycontainer>
                        <HistoryList
                          leadHistory={leadHistory}
                          type={"enquiry"}
                        />
                      </Historycontainer>
                    </CustomTabContent>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={7}>
                    <CustomTabContent>
                      <Typography className="Mainheading" variant="h6">
                        Only you can see your Activity log.
                      </Typography>
                      <HistoryDes>
                        Now you can review and see everything- from today back
                        when you first started using "Merchant AD"
                      </HistoryDes>
                      <Historycontainer>
                        <HistoryList leadHistory={leadHistory} type={"all"} />
                      </Historycontainer>
                    </CustomTabContent>
                  </CustomTabPanel>
                </Box>
              </HistoryDataContainer>
            </AccordionDetails>
          </Accordion>
        )}
      </CrmHistoryData>
    </>
  );
};
export default History;
