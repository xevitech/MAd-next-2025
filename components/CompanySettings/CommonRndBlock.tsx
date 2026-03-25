import React, { useContext, useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import Auth from "@/auth/Auth";
import { BASE_URL } from "@/utils/staticValues";
import QaQcSkelton from "./CompanyDetail/FactoryDetails/wholesalar/wholesalarwarehouse/QaQcSkelton";
import RndSubTypeMainCommon from "./RndSubTypeMainCommon";
import ManufectureRndDepartment from "./CompanyDetail/FactoryDetails/ManufectureRndDepartment";
import { RndProcessSelection } from "./CompanyDetail/FactoryDetails/RndProcessSection";
const CommonRndBlock = () => {
  const [isLoading, setLoading] = useState(false);
  const { businessType }: any = useSelector(
    (state: any) => state.companyProfile
  );
  const [listData, setListingData] = useState("");
  useEffect(() => {
    document.body.classList.add("companyDetailScroll");
  }, []);

  useEffect(() => {
    getCompanyProfile();
  }, []);

  const getCompanyProfile = async () => {
    try {
      let response = await fetch(`${BASE_URL}/company_profile/view`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setListingData(data?.qaqc_rnd?.manufacture_rnd);
    } catch (error) {
   
    }
  };
  useEffect(() => {
    getCompanyProfile();
  }, []);

  const manufactureData = listData;
  let departmentData = {};
  if (manufactureData) {
    departmentData = JSON.parse(manufactureData);
  }
  const handlCallBackFunction = () => {
    getCompanyProfile();
  };

  return (
    <>
      <Stack sx={{}}>
        <Box>
     
          {isLoading ? (
            <Stack sx={{ gap: "18px" }}>
              <QaQcSkelton />
            </Stack>
          ) : !businessType ? (
            <Box sx={{ height: 300, width: "100%" }}>
              <Stack sx={{ gap: "18px" }}>
                <RndSubTypeMainCommon type={"Resellers"} />
              </Stack>
            </Box>
          ) : (
            <>
              {businessType?.name === "Manufacturers" && (
                <Stack sx={{ gap: "18px" }}>
                  <ManufectureRndDepartment departmentData={departmentData}
                  handlCallBackFunction={handlCallBackFunction} />
                  <RndProcessSelection departmentData={departmentData}
                  handlCallBackFunction={handlCallBackFunction} />
                </Stack>
              )}
              {businessType?.name === "Agents and Representatives" && (
                <Stack sx={{ gap: "18px" }}>
                  <RndSubTypeMainCommon type={"Agent"} />
                </Stack>
              )}
              {businessType?.name === "Distributors" && (
                <Stack sx={{ gap: "18px" }}>
                  <RndSubTypeMainCommon type={"Distributors"} />
                </Stack>
              )}
              {businessType?.name === "Retailers" && (
                <Stack sx={{ gap: "18px" }}>
                  <RndSubTypeMainCommon type={"Retailers"} />
                </Stack>
              )}
              {businessType?.name === "Wholesalers" && (
                <Stack sx={{ gap: "18px" }}>
                  <RndSubTypeMainCommon type={"Wholesalers"} />
                </Stack>
              )}
              {businessType?.name === "Resellers" && (
                <Stack sx={{ gap: "18px" }}>
                  <RndSubTypeMainCommon type={"Resellers"} />
                </Stack>
              )}
              {businessType?.name === "Others" && (
                <Stack sx={{ gap: "18px" }}>
                  <RndSubTypeMainCommon type={"Others"} />
                </Stack>
              )}
            </>
          )}
        </Box>
      </Stack>
    </>
  );
};
export default CommonRndBlock;
