import { OuterContainer } from "@/components/SellerTools/styles";
import { Tabs, Tab, Grid, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import TestReport from "./Certification/TestReport";
import HonorAndAward from "./Certification/HonorAndAward";
import Patent from "./Certification/Patent";
import Trademarks from "./Certification/Trademarks";
import {
  CompantDetailTb,
  OuterAddCertificate,
} from "../style";
import { FirstletterCapital } from "@/components/common/common";
import { makeStyles } from "tss-react/mui";
import companydetail from "../../companydetail.module.css";

const AddMoreCertificates = ({ editData, onClose, name }) => {
  const [activeButton, setActiveButton] = useState<number>(0);

  const useStyles = makeStyles()((theme) => {
    return {
      tabscroll: {
        "@media (max-width:600px)": {
          maxWidth: "98%",
          margin: "0 auto",
        },
      },
      companydetaildes: {
        "@media (max-width:600px)": {
        },
      },
      tabs: {
        "& .MuiTabs-indicator": {
          backgroundColor: "#D7282F !important",
          height: "36px !important",
          minHeight: "36px !important",
          borderRadius: "6px !important",
          top: 7,
          border: "1px solid #D7282F",
        },
      },
    };
  });

  const GetTabsComponent = (name) => {
    if (!name) {
      switch (activeButton) {
        case 0:
          return <TestReport editData={editData} onClose={onClose} />;
        case 1:
          return <HonorAndAward editData={editData} onClose={onClose} />;
        case 2:
          return <Patent editData={editData} onClose={onClose} />;
        case 3:
          return <Trademarks editData={editData} onClose={onClose} />;
        default:
          return <div> Coming soon....</div>;
      }
    }
    if (name) {
      switch (name) {
        case "certificate":
          return <TestReport editData={editData} onClose={onClose} />;
        case "honor":
          return <HonorAndAward editData={editData} onClose={onClose} />;
        case "patent":
          return <Patent editData={editData} onClose={onClose} />;
        case "trademark":
          return <Trademarks editData={editData} onClose={onClose} />;
        default:
          return <div> Coming soon....</div>;
      }
    }
  };
  const classes: any = useStyles();
  return (
    <>
      <OuterContainer>
        <OuterAddCertificate
          style={{
            justifyContent: "space-between",
            padding: "16px",
            background: "#FFFFFF",
          }}
        >
          <Grid container>
            <Grid item xs={12} className={classes.tabscroll}>
              {name ? (
                <Typography
                  style={{
                    background: "#f5f7fa",
                    padding: "8px",
                    fontWeight: 600,
                    fontSize: "16px",
                    borderRadius: "6px",
                  }}
                >{`Edit ${FirstletterCapital(name)}`}</Typography>
              ) : (
                <Box
                  className="tabsContainer"
                  style={{
                    backgroundColor: "white",
                    minWidth: "100%",
                    borderRadius: "6px",
                  }}
                >
                  <Tabs
                    value={activeButton}
                    onChange={(e, value) => {
                      e.stopPropagation();
                      setActiveButton(value);
                    }}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    className={companydetail.company_detail_tab}
                    sx={CompantDetailTb}
                    style={{ background: "#f5f7fa" }}
                  >
                    <Tab
                      className={classes.tabs}
                      label="Certification/ Test Report"
                    />
                    <Tab
                      className={classes.tabs}
                      label="Honor & Award Certifications"
                    />
                    <Tab className={classes.tabs} label="Patent" />
                    <Tab className={classes.tabs} label="Trademarks" />
                  </Tabs>
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <div>{GetTabsComponent(name)}</div>
            </Grid>
          </Grid>
        </OuterAddCertificate>
      </OuterContainer>
    </>
  );
};
export default AddMoreCertificates;
