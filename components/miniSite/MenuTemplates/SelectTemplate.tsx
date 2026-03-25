import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FlexContents, Library, Tabheading, Tabssetting } from "./MenuStyle";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { MiniTemplate } from "./Minisitemplate";
import Drawer from "@mui/material/Drawer";
import TemplateMasonryView from "./TemplateMasonryView";
import { DefaultTemplates } from "./DefaultTemplatesComponents/DefaultTemplates";
import { PageTemplate } from "./PageTemplate";

type Anchor = "top" | "left" | "bottom" | "right";

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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
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
export default function SelectTemplate(props) {
  const { selectTemplate, open, setOpen, defaultTemplateBlocks } = props;
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 900 }}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box sx={{ width: "100%", padding: "0px 12px 12px 12px" }}>
        <FlexContents>
          <Box>
            <Library>Library</Library>
          </Box>
          <Box sx={{}}>
            <Tabssetting
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="scrollable"
              scrollButtons
            >
              <Tabheading
                label="Default minisite blocks"
                {...a11yProps(0)}
                disableRipple
              />
              <Tabheading label="Blocks" {...a11yProps(1)} disableRipple />
              <Tabheading label="Pages" {...a11yProps(2)} disableRipple />
              {/* <Tabheading
                label="My Templates"
                {...a11yProps(3)}
                disableRipple
              /> */}
            </Tabssetting>
          </Box>
          <Box>
            <CloseOutlinedIcon
              sx={{ cursor: "pointer" }}
              onClick={handleClose}
            />
          </Box>
        </FlexContents>
        <CustomTabPanel value={value} index={0}>
          <TemplateMasonryView
            selectTemplate={selectTemplate}
            templates={defaultTemplateBlocks}
            templatetype="default"
            setOpen={setOpen}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TemplateMasonryView
            selectTemplate={selectTemplate}
            templatetype="block"
            templates={MiniTemplate}
            setOpen={setOpen}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <TemplateMasonryView
            selectTemplate={selectTemplate}
            templatetype="pages"
            templates={PageTemplate}
            setOpen={setOpen}
          />
        </CustomTabPanel>
        {/* <CustomTabPanel value={value} index={3}>
          Item Four
        </CustomTabPanel> */}
      </Box>
    </Box>
  );
  return (
    <>
      <Box sx={{ textAlign: "center" }}></Box>
      <Drawer
        anchor={"right"}
        open={open}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </>
  );
}
