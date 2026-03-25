import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, styled } from "@mui/material";
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
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
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
  borderTop: "1px solid rgba(0, 0, 0, .125)",
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
const HistoryListOthers = (props) => {
  const leadHistory = props?.leadHistory;

  return (
    <>
      {leadHistory?.map((history, historyIndex) => (
        <HistoryStack key={historyIndex}>
          <HistoryDate>
            {moment(history?.date).format("dddd, MMMM Do YYYY")}
          </HistoryDate>
          {history?.history?.length > 0 &&
            history?.history.map((subhistory, subIndex) => {
              if (subhistory?.type == props?.type || props?.type == "all") {
                return (
                  <HistoryStackInn key={subIndex}>
                    <HistoryHeader>
                      <Iconcontainer
                        sx={
                          subhistory?.type == "info"
                            ? { backgroundColor: "#0077BA" }
                            : subhistory?.type == "notes"
                            ? { backgroundColor: "#828282" }
                            : subhistory?.type == "files"
                            ? { backgroundColor: "#A26B02" }
                            : subhistory?.type == "links"
                            ? { backgroundColor: "#6E8F44" }
                            : { backgroundColor: "#6E8F44" }
                        }
                      >
                        {subhistory?.type == "info" ? (
                          <i className="icon-leads whiteleadicon"></i>
                        ) : subhistory?.type == "activity" ? (
                          <CalendarMonthOutlinedIcon />
                        ) : subhistory?.type == "notes" ? (
                          <AssignmentOutlinedIcon />
                        ) : subhistory?.type == "files" ? (
                          <FileCopyOutlinedIcon />
                        ) : subhistory?.type == "links" ? (
                          <LinkOutlinedIcon />
                        ) : (
                          <></>
                        )}
                      </Iconcontainer>
                      <HistoryLabel>
                        <Typography className="Infolabel">
                          {subhistory?.name}
                        </Typography>
                      </HistoryLabel>
                    </HistoryHeader>
                    <HistoryContentContainer>
                      <div className="LeftLine">
                        {subhistory?.changes?.length > 0 &&
                          subhistory?.changes?.map((rows, rowsIndex) => (
                            <RowItem key={rowsIndex}>
                              <HistoryContent>
                                <ContentLine></ContentLine>
                                <DotItem
                                  value={"1"}
                                  sx={
                                    subhistory?.type == "info"
                                      ? {
                                          backgroundColor: "#0077BA",
                                        }
                                      : subhistory?.type == "notes"
                                      ? {
                                          backgroundColor: "#828282",
                                        }
                                      : subhistory?.type == "files"
                                      ? {
                                          backgroundColor: "#A26B02",
                                        }
                                      : subhistory?.type == "link"
                                      ? {
                                          backgroundColor: "#6E8F44",
                                        }
                                      : {
                                          backgroundColor: "#6E8F44",
                                        }
                                  }
                                ></DotItem>
                                <InnInfo className="innerhistorycon">
                                  <HighlightTxt
                                    dangerouslySetInnerHTML={{
                                      __html: rows?.message,
                                    }}
                                  ></HighlightTxt>
                                  <AuthorCreator>
                                    <UserName>
                                      <b>
                                        &nbsp;
                                        {`by ${rows?.name}`}
                                      </b>
                                    </UserName>{" "}
                                    <span>
                                      <TimerOutlinedIcon />
                                      {moment(rows?.created_at).format(
                                        "h:mm A"
                                      )}
                                    </span>
                                  </AuthorCreator>
                                </InnInfo>
                              </HistoryContent>
                            </RowItem>
                          ))}
                      </div>
                    </HistoryContentContainer>
                  </HistoryStackInn>
                );
              }
            })}
        </HistoryStack>
      ))}
    </>
  );
};
export default HistoryListOthers;
