import React, { useEffect } from "react";
import { Box, Typography, styled } from "@mui/material";
import {
  HistoryDataContainer,
  HistoryDes,
  Historycontainer,
  CustomTabContent,
  HistoryTabsStyle,
  CustomTabBox,
  CrmHistoryData,
} from "../style";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useAppDispatch } from "redux/store";
import { TaskMeetingCallsActivity } from "@/hooks/UseCreateFormData";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import HistoryListOthers from "./HistoryListOthers";
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
const HistoryOthers = () => {
  const { taskMeetingCallHistory } = useSelector((state: any) => state.formList);
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState(0);

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

  const router = useRouter()
  useEffect(() => {
    dispatch(TaskMeetingCallsActivity(router?.query?.id));
  }, [dispatch]);
  
  return (
    <>
      <CrmHistoryData>
        {taskMeetingCallHistory?.length > 0 && (
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
                      <Tab label="Info" {...a11yProps(1)} />
                      <Tab label="Notes" {...a11yProps(2)} />
                      <Tab label="Files" {...a11yProps(3)} />
                      <Tab label="Links" {...a11yProps(4)} />
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
                        <HistoryListOthers leadHistory={taskMeetingCallHistory} type={"all"} />
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
                        <HistoryListOthers leadHistory={taskMeetingCallHistory} type={"info"} />
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
                        <HistoryListOthers leadHistory={taskMeetingCallHistory} type={"notes"} />
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
                        <HistoryListOthers
                          leadHistory={taskMeetingCallHistory}
                          type={"files"}
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
                        <HistoryListOthers
                          leadHistory={taskMeetingCallHistory}
                          type={"links"}
                        />
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
export default HistoryOthers;
