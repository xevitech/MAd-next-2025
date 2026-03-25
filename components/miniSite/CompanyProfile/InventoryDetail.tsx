import CPheader from "./CPheaderComponent";
import { Box, Collapse, Grid, Typography } from "@mui/material";
import { CPTextViewBox } from "./CompanyProfile.styled";
import { apiClient } from "@/components/common/common";
import { useContext, useEffect, useRef, useState } from "react";
import RnDSkeleton from "@/components/CompanySettings/CompanyDetail/CompanySkeletons/R&DSkeleton";
import EmptyPage from "@/components/miniSite/EmptyPages/index";
import router from "next/router";
import { useSelector } from "react-redux";
import {
  ComFacilitySubComponent,
  ImagesShowBox,
  MiniComFacilityInnerData,
  SectionsHeading,
  SectionsInnerBox,
  SubComponentData,
} from "../styled";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import InverntoryDetailSkeleton from "./InverntoryDetailSkeleton";
import {
  getParsedValue,
  removeUnderscoreFromString,
} from "@/components/Helper";
import { MyAppContext } from "@/contextApi/appContext";
import {
  Blackoutlinebtn,
  Redoutlinebtn,
} from "@/components/common/buttons/ButtonsVariations";
import { InventoryDetailProps } from "@/hooks/Interface";
import {
  annualProductionCapacity,
  factoryData,
  production_process,
  productionEquipmentTitleDatas,
  productionLine,
  storeData,
  warehouseData,
} from "./common/commonData";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { Button } from "@mui/base";
import { ComFPatentLblBox } from "@/components/common/uploadFile/styled";
import { getBussinessType } from "@/utils/commonFunctions/getDatas";
import ImageTitleShow from "./common/ImageTitleShow";
import { formatString, formatTitleAndValue } from "../common/commonFunctions";

interface Item {
  [key: string]: any; // Allow any additional properties
}

interface FilteredParsedData {
  [key: string]: Item[];
}

export default function InventoryDetail({
  loader,
  factorydetails,
  fecilityTypeToShow,
}: InventoryDetailProps) {
  const contentRef = useRef(null);
  const [showCollapseButton, setShowCollapseButton] = useState(false);
  const { company_facility = {} } = factorydetails || {};
  const { selected_value = "" } = company_facility || {};
  const NavigateHandler = (route) => router.push(route);
  const [units, setUnits] = useState<any>([]);
  let userid = JSON.parse(localStorage.getItem("userData"))?.id;
  const { minisiteUserID } = useSelector((state: any) => state.miniSite);
  const [loading, setLoader] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { breakPoints } = useContext(MyAppContext);

  useEffect(() => {
    const checkHeight = () => {
      if (contentRef?.current) {
        setShowCollapseButton(contentRef.current.scrollHeight > 270);
      }
    };
    checkHeight();
  }, []);
  const fetchUnits = async () => {
    setLoader(true);
    try {
      let response = await apiClient("unit", "get");
      if (response?.data) setUnits(response?.data);
      setLoader(false);
    } catch {}
  };

  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };

  const bussinessType = getBussinessType(factorydetails?.business_type);

  const getHeading = (name) => {
    switch (name) {
      case "Agents and Representatives":
        return "Store";
      default:
        "none";
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);
  if (loading) {
    return (
      <>
        <InverntoryDetailSkeleton />
      </>
    );
  }

  let dataToRender = [];
  let arrayToGetTitle = [];

  const facilityDataMappings = {
    store: { data: storeData, key: "store" },
    warehouse: { data: warehouseData, key: "warehouse" },
    factory: { data: factoryData, key: "factory" },
    annual_production_capacity: {
      data: annualProductionCapacity,
      key: "annual_production_capacity",
    },
    production_process: { data: production_process, key: "production_process" },
    production_line: { data: productionLine, key: "production_line" },
    production_equipment: {
      data: productionEquipmentTitleDatas,
      key: "production_equipment",
    },
  };

  const changedString = bussinessType
    .toLowerCase()
    .slice(0, -1)
    .replaceAll(" ", "_");
  let filteredParsedData: FilteredParsedData = {};
  const selectedFacilityType =
    fecilityTypeToShow ?? selected_value?.replace(/^"(.*)"$/, "$1");
  const result = {};
  const businessData = company_facility?.[changedString];
  if (businessData) {
    const parsedData = getParsedValue(businessData);
    const filterData = (data: any): FilteredParsedData => {
      for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
          const filtered = value.filter(
            (item) => item.selected_value === "yes"
          );
          if (filtered.length > 0) {
            // formatTitleAndValue(filtered[0]?.productionData, key);
            const datas =
              filtered[0]?.facility_data ||
              filtered[0]?.store_data ||
              filtered[0]?.factoryData ||
              filtered[0]?.annualData ||
              filtered[0]?.productionData ||
              filtered[0]?.productionEquipment ||
              filtered[0]?.production_data ||
              filtered[0]?.warehouseData ||
              filtered[0]?.agent_data ||
              [];

            const facilityMapping = facilityDataMappings[key];

            const datasss = formatTitleAndValue(datas, facilityMapping?.data);

            result[key] = formatTitleAndValue(datas, facilityMapping?.data);
          }
        }
      }
      return result;
    };

    filteredParsedData = filterData(parsedData);

    const facilityMapping = facilityDataMappings[selectedFacilityType];
    if (facilityMapping) {
      const facilityData = parsedData[facilityMapping.key];
      if (facilityData && facilityData.length > 0) {
        dataToRender =
          facilityData[0]?.facility_data ||
          facilityData[0]?.store_data ||
          facilityData[0]?.factoryData ||
          facilityData[0]?.annualData ||
          facilityData[0]?.productionData ||
          facilityData[0]?.productionEquipment ||
          facilityData[0]?.production_data ||
          facilityData[0]?.agent_data ||
          [];
        arrayToGetTitle = facilityMapping.data;
      } else {
        dataToRender = [];
        arrayToGetTitle = [];
      }
    }
  }

  const List = [1];
  const CheckNewUser = () => {
    return (
      factorydetails &&
      Object?.values(factorydetails)?.every((value: any) => {
        if (value === null || value === "" || value?.length <= 0) {
          return true;
        } else return false;
      })
    );
  };

  const hasData = Object.entries(filteredParsedData).length === 0;

  return (
    <Box>
      <Box mb={{ xs: 1 }}>
        <CPheader
          // icon="/assets/cpicon3.svg"
          icon="icon-company_facilities"
          title="Company Facilities"
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
          {hasData ? (
            <EmptyPage
              text={"company facilities"}
              onClickHandler={() =>
                NavigateHandler("/companySettings/companyDetails?tab=factory")
              }
              actiontext={userid !== minisiteUserID ? false : true}
              logo="/assets/companyfacilities.svg"
            />
          ) : (
            <>
              {Object.keys(filteredParsedData).length !== 0 && (
                <>
                  <MiniComFacilityInnerData>
                    <ComFacilitySubComponent sx={{ paddingBottom: "1rem" }}>
                      {/* <Collapse
                        in={expanded}
                        collapsedSize={
                          breakPoints.max600px
                            ? 500
                            : filteredParsedData
                            ? 275
                            : 200
                        }
                      > */}
                        <SubComponentData ref={contentRef}>
                          {Object.entries(filteredParsedData).map(
                            ([key, value]) => (
                              <>
                                <Box sx={{ padding: "0 1rem 1rem 1rem" }}>
                                  {value?.map((val, i) => (
                                    <Grid
                                      mb={{ xs: 1 }}
                                      container
                                      columnSpacing={{ md: 2 }}
                                      key={i}
                                      sx={{
                                        margin: `${
                                          i == 1 ? "24px 0 0px 0" : ""
                                        }`,
                                        borderRadius: "10px",
                                        border: "1px solid #ddd",
                                      }}
                                    >
                                      <Grid
                                        item
                                        xs={12}
                                        sx={{ paddingLeft: "0px !important" }}
                                      >
                                        <SectionsHeading>
                                          {`${formatString(key)} ${
                                            value?.length > 1 ? i + 1 : ""
                                          }`}
                                        </SectionsHeading>
                                      </Grid>
                                      {val.map((vale, j) => {
                                        const isImageFileAvailable =
                                          vale?.title === "Factory Images" ||
                                          vale?.title ===
                                            "Testing Certificate" ||
                                          vale?.title === "Process Image";
                                        return (
                                          <>
                                            {vale && (
                                              <Grid item xs={12} sm={4} key={j}>
                                                <CPTextViewBox
                                                  pb={{ xs: 1.8, lg: "24px" }}
                                                  wid="100%"
                                                  height={"100%"}
                                                >
                                                  <Typography component="label">
                                                    {vale?.title}:
                                                  </Typography>
                                                  <Typography>
                                                    {isImageFileAvailable ? (
                                                      <>
                                                        {" "}
                                                        {vale?.value?.length > 0
                                                          ? vale?.value?.map(
                                                              (imageData) => (
                                                                <ImageTitleShow
                                                                  src={
                                                                    imageData?.source
                                                                  }
                                                                  alt={
                                                                    imageData?.file_original_name
                                                                  }
                                                                />
                                                              )
                                                            )
                                                          : "N/A"}
                                                      </>
                                                    ) : (
                                                      <>
                                                        {vale?.title ===
                                                        "AdditionalAddresses"
                                                          ? vale?.value.map(
                                                              (val, i) => i
                                                            )
                                                          : vale?.value ||
                                                            "N/A"}{" "}
                                                      </>
                                                    )}
                                                  </Typography>
                                                </CPTextViewBox>
                                              </Grid>
                                            )}
                                          </>
                                        );
                                      })}
                                    </Grid>
                                  ))}
                                </Box>
                              </>
                            )
                          )}
                        </SubComponentData>
                      {/* </Collapse> */}
                    </ComFacilitySubComponent>
                  </MiniComFacilityInnerData>
                </>
              )}
            </>
          )}
        </>
      )}

      <>
        {/* {filteredParsedData && showCollapseButton && (
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
        )} */}
      </>
    </Box>
  );
}
