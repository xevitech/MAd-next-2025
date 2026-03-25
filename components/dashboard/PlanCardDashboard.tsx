import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import { calculateDays, formatDate } from "../common/common";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  ButtonBox,
  Closeicon,
  DaysLeft,
  DividerForSmall,
  EndDate,
  FlexBox,
  InnerBox,
  InnerBoxText,
  LeftArrow,
  Planicon,
  PlansCardCrossbtn,
  PlansCardOuterBox,
  StartDate,
  UpgradeButton,
} from "./style";
function PlanCardDashboard() {
  const { profileInfos } = useSelector((state: any) => state.userData);
  const { display_name, end_date, icon, start_date } =
    profileInfos?.plan_status;

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);

  const daysDifference = calculateDays(formattedDate, end_date);

  const router = useRouter();
  const NavigateHandler = (route: any) => {
    router.push(`${route}`);
  };
  const [isOpen, setIsOpen] = useState(true);

  const handleCloseDialog = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <PlansCardOuterBox
        sx={{
          transition: "all ease 2s",
          transform: `${isOpen ? "translateX(0)" : "translateX(100%)"}`,
        }}
      >
        <PlansCardCrossbtn>
          {isOpen ? (
            <Closeicon onClick={handleCloseDialog} />
          ) : (
            <LeftArrow onClick={handleCloseDialog} />
          )}
        </PlansCardCrossbtn>

        <InnerBox>
          <Box>
            <InnerBoxText>
              {display_name}
              <Planicon src={icon} alt="Plan Icon" />
            </InnerBoxText>
            <StartDate>
              Start Date <strong>{formatDate(start_date)}</strong>
            </StartDate>
          </Box>
          <Divider orientation="vertical" flexItem />
          <DividerForSmall />
          <FlexBox>
            {daysDifference === 0 ? (
              <DaysLeft>Plan Expired</DaysLeft>
            ) : (
              <DaysLeft>{daysDifference} days left</DaysLeft>
            )}
            <EndDate>
              End Date <strong>{formatDate(end_date)}</strong>
            </EndDate>
          </FlexBox>
        </InnerBox>
        <Divider />
        <ButtonBox>
          <UpgradeButton
            onClick={() => {
              NavigateHandler("/plancards");
            }}
            disableRipple
            disabled={display_name === "Enterprise" && daysDifference > 7}
            sx={{
              border:
                display_name === "Enterprise" && daysDifference > 7
                  ? "1px solid #ddd"
                  : "",
              backgroundColor:
                display_name === "Enterprise" && daysDifference > 7
                  ? "#ddd"
                  : "",
            }}
          >
            {display_name === "Enterprise" ? (
              daysDifference < 7 ? (
                "Upgrade Now"
              ) : (
                <>Your {display_name} Plan Is Active</>
              )
            ) : daysDifference > 7 ? (
              "Upgrade to Higher Plan"
            ) : (
              "Upgrade Now"
            )}
          </UpgradeButton>
        </ButtonBox>
      </PlansCardOuterBox>
    </>
  );
}

export default PlanCardDashboard;
