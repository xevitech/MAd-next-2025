import * as React from "react";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, styled, Button } from "@mui/material";
import Inquirycontent from "./Inquirycontent";
import Tradecontent from "./Tradecontent";
import Profilecontent from "./Profilecontent";
import Compantcontent from "./Compantcontent";
import Contactcontent from "./Contactcontent";
import { VTabs } from "./style";
import { Redoutlinebtn } from "../common/buttons/ButtonsVariations";
import { setOpenLogoutModal, setdeleteAccount } from "@/hooks/appReducers";
import { useAppDispatch } from "redux/store";

const CustomeTab = styled(Tab)(() => ({
  minHeight: "20px",
  fontWeight: 400,
  marginTop: "5px",
  textTransform: "none",
  whiteSpace: "unset",
  margin: "5px",
  "&.Mui-selected": {
    background: "#F1F1F1",
    borderRadius: "6px",
    color: "#D7282F",
  },
}));
const AllLogoutBtn = styled(Button)(() => ({
  background: "transparent",
  border: "1px solid #D7282F",
  borderRadius: "4px",
  textTransform: "none",
  minWidth: "90px",
  fontWeight: 600,
  fontSize: "13px",
  color: "#D7282F",
  boxShadow: "none",
  margin: "5px 0 0 -10px",
  "&:hover": {
    background: "#D7282F",
    color: "#fff",
    border: "1px solid #D7282F",
  },
}));

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
        <Box
          sx={{
            p: 3,
            "@media screen and (max-width:600px)": {
              padding: "8px 0px 8px 8px",
            },
          }}
        >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      display={{ xs: "block", sm: "flex" }}
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        borderRadius: "6px",
        height: "auto",
        pb: 3,
      }}
    >
      <Box
        sx={{
          borderRight: 1,
          borderColor: "divider",
          "@media screen and (max-width:600px)": {
            borderRight: 0,
          },
        }}
      >
        <VTabs
          orientation={isMobile ? "horizontal" : "vertical"}
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
        >
          <CustomeTab
            sx={{ justifyContent: "start" }}
            icon={<img src="/assets/inquiry_pref.svg" alt="" />}
            iconPosition="start"
            label="RFQ Settings"
            {...a11yProps(0)}
          />
          {/* <CustomeTab
            sx={{ justifyContent: "start" }}
            icon={<img src="/assets/trade_pref.svg" alt="" />}
            iconPosition="start"
            label="Trade Alerts"
            {...a11yProps(1)}
          /> */}
          <CustomeTab
            sx={{ justifyContent: "start" }}
            icon={<img src="/assets/profile_setting.svg" alt="" />}
            iconPosition="start"
            label="Profile Settings"
            {...a11yProps(2)}
          />
          <CustomeTab
            sx={{ justifyContent: "start" }}
            icon={<img src="/assets/company_info_pref.svg" alt="" />}
            iconPosition="start"
            label="Company Information"
            {...a11yProps(3)}
          />
          <CustomeTab
            sx={{ justifyContent: "start" }}
            icon={<img src="/assets/contact_pref.svg" alt="" />}
            iconPosition="start"
            label="Contact Information"
            {...a11yProps(4)}
          />
        </VTabs>

        <Box
          sx={{ textAlign: "center" }}
          onClick={() => dispatch(setdeleteAccount(true))}
        >
          {" "}
          <AllLogoutBtn variant="contained" size="small">
            Delete Your Account
          </AllLogoutBtn>
        </Box>
      </Box>

      <TabPanel value={value} index={0}>
        <Box>
          <Inquirycontent />
        </Box>
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
        <Box>
          {" "}
          <Tradecontent />{" "}
        </Box>
      </TabPanel> */}
      <TabPanel value={value} index={1}>
        <Box>
          <Profilecontent />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box>
          <Compantcontent />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Box>
          <Contactcontent />
        </Box>
      </TabPanel>
    </Box>
  );
}
