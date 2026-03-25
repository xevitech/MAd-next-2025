import CPheader from "./CPheaderComponent";
import { Box, Collapse, Grid, Typography } from "@mui/material";
import { CPTextViewBox } from "./CompanyProfile.styled";
import { useContext, useEffect, useState } from "react";
import { apiClient } from "@/components/common/common";
import EmptyPage from "@/components/miniSite/EmptyPages/index";
import router from "next/router";
import RnDSkeleton from "@/components/CompanySettings/CompanyDetail/CompanySkeletons/R&DSkeleton";
import { BASE_URL } from "@/utils/staticValues";
import { useSelector } from "react-redux";
import { MyAppContext } from "@/contextApi/appContext";
import Auth from "@/auth/Auth";
import RNDmanagmentSkeleton from "./RNDmanagmentSkeleton";
import { getParsedValue } from "@/components/Helper";
import { formatString, getBusinessType } from "../common/commonFunctions";
import { SectionsHeading, SectionsInnerBox, SectionsOuterBox } from "../styled";
import {
  Blackoutlinebtn,
  Redoutlinebtn,
} from "@/components/common/buttons/ButtonsVariations";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ImageTitleShow from "./common/ImageTitleShow";

export default function RNDmanagment(props) {
  const NavigateHandler = (route) => router.push(route);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [details, setDetails] = useState<any>({});
  const { setCompleteScreenLoader, completeScreenLoader, breakPoints } =
    useContext(MyAppContext);
  const [currencyList, setCurrencyList] = useState<any>([]);
  const [rndDetail, setRndDetail] = useState<any>({});
  let userid = JSON.parse(localStorage.getItem("userData"))?.id;
  const [expanded, setExpanded] = useState(false);
  const { minisiteUserID, headerData } = useSelector(
    (state: any) => state.miniSite
  );
  const { basic_information, business_type, qaqc_rnd } = headerData || {};
  const {
    agent_respresent_rnd = "",
    distributor_rnd = "",
    manufacture_rnd = "",
    other_rnd = "",
    reseller_rnd = "",
    retailer_rnd = "",
    wholesalers_rnd = "",
  } = qaqc_rnd || {};

  const { slug } = basic_information;

  const { callFunction, showExpand = false } = props;

  const bussinessType = getBusinessType(business_type);

  let parsedManufacturersQCP = [];

  const parseDataByBusinessType = (type) => {
    const parsers = {
      "Agents and Representatives": () =>
        parseSimpleObject(getParsedValue(agent_respresent_rnd).Agent, true),
      Distributors: () =>
        parseSimpleObject(getParsedValue(distributor_rnd).Distributors),
      Manufacturers: () => {
        const { Department = [], QualityControlProcess = [] } =
          getParsedValue(manufacture_rnd);
        const departmentData = parseSimpleObject(Department[0]?.values || {});
        parsedManufacturersQCP =
          QualityControlProcess.length !== 0
            ? QualityControlProcess[0].quality_control_press
            : [];

        parsedManufacturersQCP = parsedManufacturersQCP.map((item) => [
          { title: "Process Name", value: item.process_name },
          { title: "Process Description", value: item.process_description },
          {
            title: "Process Images",
            value: item?.testing_certificate?.map((cert) => cert),
          },
        ]);
        return departmentData;
      },
      Retailers: () =>
        parseSimpleObject(getParsedValue(retailer_rnd).Retailers),
      Wholesalers: () =>
        parseSimpleObject(getParsedValue(wholesalers_rnd)?.Wholesalers),
      Resellers: () =>
        parseSimpleObject(getParsedValue(reseller_rnd)?.Resellers),
      Others: () => parseSimpleObject(getParsedValue(other_rnd)?.Others),
    };
    useEffect(() => {
      getCurrency();
    }, []);
    const [commercialInfo, setCommercialInfo] = useState([]);
    const getCurrency = async () => {
      try {
        let response = await apiClient("currency", "get");
        setCommercialInfo(response?.data);
        return response;
      } catch (error) {}
    };
    function getSymbolById(id) {
      const currency = commercialInfo.find((currency) => currency.id === id);
      if (currency) {
        return currency.symbol;
      } else {
        return "";
      }
    }

    const parseSimpleObject = (obj, includeRnDCurrency = false) => {
      if (!obj) return [];
      return Object.entries(obj)
        .map(([key, value]) => {
          let title;
          if (["RnD_unit", "spending_no"].includes(key)) {
            return null;
          }
          if (["RnD_unit", "spending_no", "patent_production"].includes(key)) {
            if (value || value === 0) {
              title = formatString(key);
              return {
                title: title,
                value: value ?? "N/A",
              };
            }
            return null;
          }
          if (key === "RnD_currency") {
            title = "R&D Spending";
            const currency = getSymbolById(obj["RnD_currency"]);
            const spendingNo = obj.spending_no;
            const unit = obj["RnD_unit"];
            value = `${currency}${spendingNo ? spendingNo : "N/A"} ${
              unit ? unit : ""
            }`;
          } else if (key == "vitality_index") {
            title = "Vitality index";
            value = `${value}%`;
          } else if (key == "certification_level") {
            title = "Certification Level of R&D Head";
          } else {
            title = formatString(key);
          }
          return {
            title: title,
            value: value ?? "N/A",
          };
        })
        .filter((item) => item !== null);
    };
    return parsers[type]?.() || [{ title: "No data available", value: "N/A" }];
  };

  const dataToRender = parseDataByBusinessType(bussinessType);
  useEffect(() => {
    setLoader(true);
    if (minisiteUserID) fetchRNDmanagement();
  }, [minisiteUserID]);
  const fetchCurrencyList = async () => {
    let response = await apiClient("currency", "get");
    if (response.status === 200) {
      const { data } = response;
      setCurrencyList(data);
    }
    setLoader(false);
    setCompleteScreenLoader(false);
  };
  useEffect(() => {
    setLoader(true);

    fetchCurrencyList();
  }, []);
  if (loader) {
    return (
      <>
        <RNDmanagmentSkeleton />
      </>
    );
  }
  const fetchRNDmanagement = async () => {
    setLoader(true);
    let response = await apiClient(
      `mini-site/company_profile/r_and_d/view?shop_slug=${slug}&type=${encodeURIComponent(
        "R&D Management"
      )}`,
      "get"
    );

    const getResearchDetail = async () => {
      if (edit) setEdit(false);
      const userid = JSON.parse(localStorage.getItem("userData"))?.id;
      try {
        const response = await fetch(
          `${BASE_URL}/company_profile/r_and_d/view?user_id=${userid}`,
          {
            headers: {
              Authorization: `Bearer ${Auth.token()}`,
              "Content-Type": "application/json",
            },
            method: "GET",
          }
        );
        const responseJson = await response.json();
        if (response.status === 200) {
          const { data } = responseJson;
          setLoading(false);
          setDetails(data);
          setLoader(false);
        } else {
          setLoading(false);
        }
      } catch (error) {}
    };
    if (response.status == 200) {
      if (callFunction && response?.data?.banner_list?.length > 0)
        callFunction(response?.data?.banner_list);
      setRndDetail(response.data);
    }
    setLoader(false);
  };

  const List = [1];

  const CurrencyData = currencyList.find(
    (v) => v.code == rndDetail.currency_id
  );

  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };

  const CheckNewUser = () => {
    return Object.values(rndDetail).every((value: any) => {
      const patent =
        rndDetail?.patent_production.filter((v) => v.id).length > 0;
      if (value === null || value === "" || value?.length <= 0 || !patent) {
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
  const shouldShowEmptyPage = !(
    parsedManufacturersQCP?.length || dataToRender?.length
  );

  return (
    <Box>
      <Box mb={{ xs: 1 }}>
        <CPheader
          icon="icon-RD_management"
          title="R&D Management"
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
          {shouldShowEmptyPage || dataToRender?.length < 0 ? (
            <EmptyPage
              text={"R&D Management"}
              onClickHandler={() =>
                NavigateHandler(
                  "/companySettings/companyDetails?tab=research&management"
                )
              }
              actiontext={userid !== minisiteUserID ? false : true}
              logo="/assets/management.svg"
            />
          ) : (
            <SectionsOuterBox>
              <Collapse
                in={expanded}
                collapsedSize={
                  !showExpand
                    ? "auto"
                    : parsedManufacturersQCP.flat()?.length >= 1
                    ? 275
                    : 235
                }
                style={{
                  height: !showExpand ? "auto" : undefined,
                }}
              >
                <>
                  {/* <SectionsOuterBox> */}
                  {dataToRender?.length > 0 && (
                    <SectionsInnerBox>
                      <SectionsHeading>R&D Department</SectionsHeading>
                      <Grid
                        mb={{ xs: 1 }}
                        container
                        spacing={{ xs: 1 }}
                        sx={{ padding: "0 15px 15px 15px" }}
                      >
                        <>
                          {dataToRender.map((item: any, i) => (
                            <Grid
                              item
                              xs={12}
                              sm={4}
                              key={i}
                              md={4}
                              sx={{ display: "flex", alignItems: "stretch" }}
                            >
                              {item && (
                                <CPTextViewBox pb={{ xs: 1.8 }} wid="100%">
                                  <Typography
                                    component="label"
                                    sx={{ textTransform: "capitalize" }}
                                  >
                                    {item?.title}
                                  </Typography>
                                  <Typography>
                                    {item.value ? item.value : "N/A"}
                                    {""}
                                    {item.currency && item.currency}
                                  </Typography>
                                </CPTextViewBox>
                              )}
                            </Grid>
                          ))}
                          <Grid
                            item
                            xs={12}
                            sm={8}
                            md={8}
                            sx={{ display: "flex", alignItems: "stretch" }}
                          ></Grid>
                        </>
                      </Grid>
                    </SectionsInnerBox>
                  )}
                  {parsedManufacturersQCP?.length > 0 && (
                    <Box
                      sx={{
                        margin: "0 0 24px 0",
                        border: "1px solid #e2e2e2",
                        borderRadius: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          textTransform: "capitalize",
                          background: "#fff1f1",
                          fontSize: "16px",
                          padding: "0.3rem 1rem",
                          fontWeight: "600",
                          borderRadius: "10px 10px 0 0",
                          margin: "0 0 16px 0",
                        }}
                      >
                        R&D Process Section
                      </Typography>
                      <Grid
                        mb={{ xs: 1 }}
                        container
                        spacing={{ xs: 1 }}
                        sx={{ padding: "0 15px 15px 15px" }}
                        className="parent-section"
                      >
                        {parsedManufacturersQCP.map((itemArray: any, i) =>
                          itemArray?.map((el, j) => (
                            <Grid
                              item
                              xs={12}
                              sm={4}
                              key={`${i}-${j}`}
                              md={4}
                              sx={{ display: "flex", alignItems: "stretch" }}
                              className={`common-section section-${i}`}
                            >
                              <CPTextViewBox pb={{ xs: 1.8 }} wid="100%">
                                <Typography
                                  component="label"
                                  sx={{ textTransform: "capitalize" }}
                                >
                                  {el?.title}
                                </Typography>
                                {el.title === "Process Images" ? (
                                  el.value.map((imageSrc, k) => (
                                    <Box>
                                      <ImageTitleShow
                                        src={imageSrc?.source}
                                        alt={imageSrc?.file_original_name}
                                      />
                                    </Box>
                                  ))
                                ) : (
                                  <Typography>
                                    {el.value ? el.value : "N/A"}
                                    {""}
                                    {el.currency && el.currency}
                                  </Typography>
                                )}
                              </CPTextViewBox>
                            </Grid>
                          ))
                        )}
                      </Grid>
                    </Box>
                  )}
                </>
              </Collapse>
            </SectionsOuterBox>
          )}
        </>
      )}
      <>
        {showExpand &&
          ((dataToRender?.length > 1 && parsedManufacturersQCP?.length >= 1) ||
            (dataToRender?.length === 0 &&
              parsedManufacturersQCP?.length >= 2)) && (
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
