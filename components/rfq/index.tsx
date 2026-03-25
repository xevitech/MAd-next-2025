import React from "react";
import { RfQInnerContent, RfqFullData, RfqOuterBox } from "./style";
import { ListRfq } from "./ListRfq";
import { CrmMainHeadingFullArea } from "../CRM/commonStyle";
import { Grid } from "@mui/material";
import { ProfileHeader } from "../common/profileheader";

export const RFQList = () => {
  return (
    <>
      <div className="full_page crm_pagelayout">
        <RfqFullData>
          <CrmMainHeadingFullArea>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={7} lg={5} className="Crmtophead">
                <ProfileHeader
                  classname="crm_main_heading"
                  text={"RFQ Management Center"}
                />
              </Grid>
            </Grid>
          </CrmMainHeadingFullArea>
          <RfQInnerContent>
            <RfqOuterBox>
              <ListRfq />
            </RfqOuterBox>
          </RfQInnerContent>
        </RfqFullData>
      </div>
    </>
  );
};
