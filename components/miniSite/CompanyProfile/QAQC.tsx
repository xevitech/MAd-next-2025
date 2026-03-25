import CPheader from "./CPheaderComponent";
import { Box, Collapse, Grid, Typography } from "@mui/material";
import { CPTextViewBox } from "./CompanyProfile.styled";
import { lazy, useContext, useEffect, useState } from "react";
import { apiClient } from "@/components/common/common";
import EmptyPage from "@/components/miniSite/EmptyPages/index";
import router from "next/router";
import RnDSkeleton from "@/components/CompanySettings/CompanyDetail/CompanySkeletons/R&DSkeleton";
import { useSelector } from "react-redux";
import { getBussinessType } from "@/utils/commonFunctions/getDatas";
import { getParsedValue } from "@/components/Helper";
import ImageTitleShow from "./common/ImageTitleShow";
import {
  departmentData,
  qualityControlProcessData,
  qualityTestEquipmentData,
} from "./common/commonData";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import dynamic from "next/dynamic";
import { MyAppContext } from "@/contextApi/appContext";
import {
  Blackoutlinebtn,
  Redoutlinebtn,
} from "@/components/common/buttons/ButtonsVariations";
import {
  CloneBoxSectionMini,
  SectionsHeading,
  SectionsInnerBox,
  SectionsOuterBox,
} from "../styled";
import {
  formatTitleAndValue,
  formatTitleAndValueQAQC,
} from "../common/commonFunctions";
const QCDataView = dynamic(() => import("./common/QCDataView"));

export default function QAQC() {
  let userid = JSON.parse(localStorage.getItem("userData"))?.id;
  const { minisiteUserID, headerData } = useSelector(
    (state: any) => state.miniSite
  );
  const [loader, setLoader] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [rndDetail, setDetails] = useState<any>({});
  const [expanded, setExpanded] = useState(false);
  const NavigateHandler = (route) => router.push(route);
  const { breakPoints } = useContext(MyAppContext);
  const { qaqc_rnd } = headerData;
  const {
    manufacture_qaqc,
    distributor_qaqc,
    agent_respresent_qaqc,
    other_qaqc,
    reseller_qaqc,
    retailer_qaqc,
    wholesalers_qaqc,
  } = qaqc_rnd || {};

  useEffect(() => {
    if (minisiteUserID) FecthQAQCDetail();
  }, [minisiteUserID]);

  const FecthQAQCDetail = async () => {
    setLoader(true);
    setLoading(true);
    let response = await apiClient(`front/mini-site/qaqc`, "post", {
      body: {
        user_id: minisiteUserID,
      },
    });
    if (response.status == 200) {
      setDetails(response.data);
    }
    setLoader(false);
    setLoading(false);
  };

  const List = [1];

  const CheckNewUser = () => {
    return Object.values(headerData).every((value: any) => {
      if (value === null || value === "" || value?.length <= 0) {
        return true;
      } else return false;
    });
  };
  if (loading) {
    return (
      <>
        {" "}
        <RnDSkeleton />
      </>
    );
  }

  let departmentDataToRender;
  let qualityControlProcessDataToRender;
  let qualityTestEquipmentDataToRender;

  const getFirstValue = (dataArray, key) => {
    return Array.isArray(dataArray) && dataArray.length > 0
      ? dataArray[0]?.[key]
      : [];
  };

  const bussinessType = getBussinessType(headerData?.business_type);

  if (bussinessType === "Manufacturers") {
    const manufacturersData = getParsedValue(manufacture_qaqc);

    const department = getFirstValue(manufacturersData?.Department, "values");
    const qualityControlProcess = getFirstValue(
      manufacturersData?.QualityControlProcess,
      "quality_control_press"
    );
    const qualityTestEquipment = getFirstValue(
      manufacturersData?.QualityTestEquipment,
      "quality_test_equipment"
    );

    departmentDataToRender = formatTitleAndValueQAQC(
      department,
      departmentData
    );
    qualityControlProcessDataToRender = formatTitleAndValueQAQC(
      qualityControlProcess,
      qualityControlProcessData
    );
    qualityTestEquipmentDataToRender = formatTitleAndValueQAQC(
      qualityTestEquipment,
      qualityTestEquipmentData
    );
  } else if (bussinessType === "Distributors") {
    const distributedData =
      getParsedValue(distributor_qaqc)?.Distributor?.values;
    departmentDataToRender = formatTitleAndValueQAQC(
      distributedData,
      departmentData
    );
  } else if (bussinessType === "Agents and Representatives") {
    const distributedData = getParsedValue(agent_respresent_qaqc)?.Agent
      ?.values;
    departmentDataToRender = formatTitleAndValueQAQC(
      distributedData,
      departmentData
    );
  } else if (bussinessType === "Others") {
    const distributedData = getParsedValue(other_qaqc)?.Other?.values;
    departmentDataToRender = formatTitleAndValueQAQC(
      distributedData,
      departmentData
    );
  } else if (bussinessType === "Resellers") {
    const distributedData = getParsedValue(reseller_qaqc)?.Reseller?.values;
    departmentDataToRender = formatTitleAndValueQAQC(
      distributedData,
      departmentData
    );
  } else if (bussinessType === "Retailers") {
    const distributedData = getParsedValue(retailer_qaqc)?.Retailer?.values;
    departmentDataToRender = formatTitleAndValueQAQC(
      distributedData,
      departmentData
    );
  } else if (bussinessType === "Wholesalers") {
    const distributedData = getParsedValue(wholesalers_qaqc)?.Wholesalers;
    departmentDataToRender = formatTitleAndValueQAQC(
      distributedData,
      departmentData
    );
  }
  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };

  const hasNoData = !(
    departmentDataToRender?.length ||
    qualityControlProcessDataToRender?.length ||
    qualityTestEquipmentDataToRender?.length
  );

  return (
    <Box>
      <Box mb={{ xs: 1 }}>
        <CPheader
          // icon="/assets/cpicon15.svg"
          icon="icon-QA_QC"
          title="QA/QC"
          subtitle={null}
          controls={null}
        />
      </Box>

      {loader ? (
        <>
          {List.map((v, i) => (
            <RnDSkeleton key={i} />
          ))}
        </>
      ) : (
        <>
          {hasNoData ? (
            <EmptyPage
              text={"QA/QC"}
              onClickHandler={() =>
                NavigateHandler("/companySettings/companyDetails?tab=QAQC")
              }
              actiontext={userid !== minisiteUserID ? false : true}
              logo="/assets/qc.svg"
            />
          ) : (
            <SectionsOuterBox>
              <Collapse
                in={expanded}
                collapsedSize={
                  breakPoints.max600px
                    ? 500
                    : qualityTestEquipmentDataToRender?.length > 2 &&
                      qualityTestEquipmentDataToRender?.length > 2
                    ? 275
                    : 200
                }
              >
                <>
                  {/* <SectionsOuterBox> */}
                  <CloneBoxSectionMini>
                    <SectionsInnerBox>
                      <SectionsHeading>Department</SectionsHeading>
                      <Box sx={{ padding: "0 15px 15px 15px" }}>
                        <Grid mb={{ xs: 1 }} container spacing={{ xs: 1 }}>
                          {/* Department */}
                          {departmentDataToRender?.map((item, i) => {
                            return (
                              <Grid item xs={12} sm={4} key={i} md={4}>
                                <CPTextViewBox
                                  pb={{ xs: 1.8 }}
                                  wid="100%"
                                  height="100%"
                                >
                                  <Typography component="label">
                                    {item.title && item.title}
                                  </Typography>
                                  {item.title === "Testing Certificate" ? (
                                    <Box>
                                      {item.value.map((image, k) => (
                                        <ImageTitleShow
                                          src={image?.source}
                                          alt={image?.file_original_name}
                                        />
                                      ))}
                                    </Box>
                                  ) : (
                                    <Typography>
                                      {item.value && item.value}{" "}
                                    </Typography>
                                  )}
                                </CPTextViewBox>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Box>
                    </SectionsInnerBox>
                  </CloneBoxSectionMini>
                  {/* </SectionsOuterBox> */}
                  {qualityControlProcessDataToRender?.length > 0 && (
                    <QCDataView
                      title="Quality Control Process"
                      data={qualityControlProcessDataToRender}
                    />
                  )}
                  {qualityTestEquipmentDataToRender?.length > 0 && (
                    <QCDataView
                      title="Quality Test Equipements"
                      data={qualityTestEquipmentDataToRender}
                    />
                  )}
                </>
              </Collapse>
            </SectionsOuterBox>
          )}
        </>
      )}
      <>
        {!hasNoData && (
          <Box
            alignItems="center"
            display="flex"
            justifyContent="center"
            paddingTop="12px"
          >
            {!expanded ? (
              <Redoutlinebtn
                height={"25px"}
                onClick={() => handleExpandClick()}
                style={{ padding: "16px", marginRight: "12px" }}
              >
                Expand
                <ExpandMoreIcon />
              </Redoutlinebtn>
            ) : (
              <Blackoutlinebtn
                height={"25px"}
                onClick={() => handleExpandClick()}
                style={{ padding: "16px" }}
              >
                Close
                <ExpandLessIcon />
              </Blackoutlinebtn>
            )}
          </Box>
        )}
      </>
    </Box>
  );
}
