import React, { useContext, useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { CompanyFacilityContainer, MainHeading } from "./FactoryDetails/style";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencyList } from "@/hooks/ProductReducers";
import {
  FactorySmallTextContainer,
  HeaderContainer,
  HeaderTextContainer,
} from "./commonStyles";
import { MyAppContext } from "@/contextApi/appContext";
import CommonRndBlock from "../CommonRndBlock";
const ResearchAndDevelop = (props: any) => {
  const { businessType }: any = useSelector(
    (state: any) => state.companyProfile
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrencyList());
    document.body.classList.add("companyDetailScroll");
  }, []);
  const { breakPoints } = useContext(MyAppContext);
  return (
    <>
      <Stack sx={{ padding: "0px" }}>
        <CompanyFacilityContainer>
          <HeaderContainer breakPoints={breakPoints}>
            <Box>
              <HeaderTextContainer breakPoints={breakPoints}>
                R&D Management
              </HeaderTextContainer>
              <FactorySmallTextContainer>
                Manage Information related to R&D management
              </FactorySmallTextContainer>
            </Box>
          </HeaderContainer>
          <hr className="hair-line" style={{ margin: "0px ", padding: "0" }} />


          <CommonRndBlock />
        </CompanyFacilityContainer>
      </Stack>
    </>
  );
};
export default ResearchAndDevelop;
