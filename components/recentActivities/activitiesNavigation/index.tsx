import { Box } from "@mui/system";
import React from "react";
import { LeftContentText, HeadTTxt, HeadDes, ScrollCol } from "../styles";
import { ActivityDetails } from "./activityDetails";
const ActivitiesNavigation = ({
  listItem,
  selectItem,
  activitydata,
  setActivityData,
}) => {
 
  return (
    <>
      <LeftContentText>
        <HeadTTxt>Only you can see your Activity log.</HeadTTxt>
        <HeadDes>
          Now you can review and see everything -from today back when you first
          started using <strong>{"Merchant AD"}</strong>
        </HeadDes>
      </LeftContentText>

      <Box sx={{ width: "100%" }}>
        <ScrollCol>
          <Box
            sx={{
              "@media (max-width: 720px)": {
                width: "620px",
                paddingBottom: "16px",
              },
              "@media (max-width: 700px)": {
                width: "100%",
              },
            }}
          >
            <ActivityDetails
              listItem={listItem}
              selectItem={selectItem}
              activitydata={activitydata}
              setActivityData={setActivityData}
            />
          </Box>
        </ScrollCol>
      </Box>
    </>
  );
};
export default ActivitiesNavigation;
