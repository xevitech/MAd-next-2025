import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { capitalizeFirstLetter } from "@/utils/commonFunctions/other";
import Image from "next/image";
import { BtnFilled } from "@/components/common/buttons/ButtonsVariations";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import {
  CalculatorTable,
  AllGroupsCol,
  GroupHeading,
  AccordionBox,
  useStyles,
  CalculatorTab,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductCalculator,
  setAllSpecs,
  setFinalGroup,
  setSelectedGroupData,
  updateProductCalculator,
} from "@/hooks/PricingCalculatorReducer";
import GroupSingleTable from "./GroupSingleTable";
import { getProductId } from "@/components/common/common";
import { ThreeDots } from "react-loader-spinner";
import { Box, Tabs } from "@mui/material";
import { BASE_URL_V2 } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import { toast } from "react-toastify";

export default function GroupTableWrapper({
  updateData,
  selectedTab,
  setNewGrpId,
  updateEquationsData, //not from context
  setSelectedTab, //not from context
}) {
  const productId = getProductId();

  const {
    // updateLoader,
    productCalculatorInfo,
    productCalculatorHeader,
    emptyFieldsError,
    selectedGroupData,
  } = useSelector((state: any) => state?.PricingCalculator);

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [currentGrpId, setCurrentGrpId] = React.useState<any>(null);
  const [value, setValue] = React.useState<any>(0);
  const [updateLoader, setUpdateLoader] = React.useState(false);
  const dispatch = useDispatch();
  const handleChangeTab = (event, newValue) => {
    if (newValue == productCalculatorInfo?.length + 1) {
      setSelectedTab("Group");
    } else {
      setSelectedTab("other");
    }
    setValue(newValue);
    dispatch(setFinalGroup(false));
    if (newValue == productCalculatorInfo.length + 1)
      dispatch(setFinalGroup(true));
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const setGropuData = async (data) => {
    dispatch(setSelectedGroupData(data?.group_id));
    setCurrentGrpId(data?.group_id);
    setNewGrpId(data?.group_id);
  };
  // React.useEffect(() => {
  //   // dispatch(productCalculatorInfo?.[0]?.id);

  //   dispatch(setSelectedGroupData(productCalculatorInfo?.[0]?.group_id));
  //   setCurrentGrpId(productCalculatorInfo?.[0]?.group_id);
  //   setNewGrpId(productCalculatorInfo?.[0]?.group_id);
  // }, []);

  // React.useEffect(() => {
  //   dispatch(setSelectedGroupData(currentGrpId));
  // }, [currentGrpId]);

  const handleUpdateCalculatorData = async () => {
    for (const item of productCalculatorInfo ?? []) {
      if (item?.group_id === selectedGroupData) {
        const isValid = item?.levels?.every((level) => {
          return level?.terms?.every((term) => {
            return term?.price_matrix?.every((priceValue) => {
              if (!priceValue?.value) {
                toast.error("Please fill all fields.");
                return false;
              }
              return true;
            });
          });
        });
        if (!isValid) {
          return;
        }
      }
    }

    // const extractedData = productCalculatorInfo.flatMap((group) =>
    //   group.levels.flatMap((level) =>
    //     level.terms.flatMap((term) =>
    //       term.price_matrix
    //         .filter((priceMatrix) => priceMatrix.value !== null)
    //         .map(({ price_matrix_id, value }) => ({ price_matrix_id, price: value }))
    //     )
    //   )
    // );

    const extractedData = productCalculatorInfo
      .filter((group) => group.group_id == selectedGroupData) // Filter based on currentGrpId
      .flatMap((group) =>
        group.levels.flatMap((level) =>
          level.terms.flatMap((term) =>
            term.price_matrix
              .filter((priceMatrix) => priceMatrix.value !== null) // Only extract where value is not null
              .map(({ price_matrix_id, value }) => ({
                price_matrix_id,
                price: value,
              }))
          )
        )
      );
    setUpdateLoader(true);

    const response = await fetch(
      `${BASE_URL_V2}/product/calculator/pricematrix-update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: JSON.stringify({
          product_id: productId,
          update_matrix_price: extractedData,
        }),
      }
    );
    const parsedData = await response?.json();
    await dispatch(getProductCalculator({ productId: productId }));
    setUpdateLoader(false);
  };

  const hanleFinalCalculation = () => {
    dispatch(setSelectedGroupData(""));
    // setCurrentGrpId("");
    // setNewGrpId("");
    let allArray = [];
    productCalculatorInfo?.forEach((info) => {
      info?.levels?.forEach((element) => {
        allArray.push({
          id: element?.id,
          name: element?.name,
          tag: element?.tag,
        });

        const extractedObjects = [];

        element?.terms?.forEach((term) => {
          term?.price_matrix?.forEach((item) => {
            if (item?.is_parameter) {
              const isParentAlreadyAdded = extractedObjects?.some(
                (obj) => obj.parent_id === item.parent_id
              );
              if (!isParentAlreadyAdded) {
                extractedObjects.push(item);
              }
            }
          });
        });

        if (extractedObjects?.length) {
          allArray = allArray.concat(
            extractedObjects.map((newEle) => ({
              id: newEle?.price_matrix_id,
              name: newEle?.name,
              tag: newEle?.tag,
              attribute_id: newEle?.attribute_id??"",
              is_parameter: newEle?.is_parameter??"",
            }))
          );
        }
      });
    });

    const uniqueArray = Array.from(
      new Map(allArray.map((item) => [item.id, item])).values()
    );

    // setGropuData({});
    dispatch(setAllSpecs(uniqueArray));
  };

  const { classes } = useStyles();
  return (
    <>
      <TabContext value={value}>
        <CalculatorTab>
          <Tabs
            value={value}
            onChange={handleChangeTab}
            aria-label="lab API tabs example"
            variant="scrollable"
          >
            {productCalculatorInfo?.map((element, index) => (
              <Tab
                key={element.id}
                label={element.name}
                value={index}
                onClick={() => {
                  setGropuData(element);
                }}
              />
            ))}
            {/* {(productCalculatorInfo?.[0]?.message == "similar" ||
              productCalculatorInfo?.[0]?.message == "multilevel") && ( */}
            {productCalculatorHeader == "Group" && (
              <Tab
                label="= Final Group Calculation"
                value={productCalculatorInfo?.length + 1}
                onClick={hanleFinalCalculation}
              />
            )}
            {/* // )} */}
          </Tabs>
        </CalculatorTab>
        {productCalculatorInfo?.map((element, groupIndex) => {
          return (
            <TabPanel key={element.id} value={groupIndex}>
              {
                <AllGroupsCol>
                  <GroupHeading>
                    {capitalizeFirstLetter(element?.message)} Group{" "}
                  </GroupHeading>
                  {element?.levels?.map((ele, specificationIndex) => {
                    return (
                      <AccordionBox key={specificationIndex}>
                        <Accordion
                          key={specificationIndex}
                          style={{
                            borderRadius: "6px",
                            marginTop: "12px",
                          }}
                          expanded={expanded === ele?.name}
                          onChange={handleChange(ele?.name)}
                        >
                          <AccordionSummary
                            expandIcon={
                              expanded === ele?.name ? (
                                <Image
                                  src={"/assets/minusIcon.svg"}
                                  height={14}
                                  width={15}
                                  alt="minus-icon"
                                />
                              ) : (
                                <Image
                                  src={"/assets/plus_Sign.svg"}
                                  height={14}
                                  width={14}
                                  alt="plus_sign"
                                />
                              )
                            }
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography
                              sx={{ width: "90%", flexShrink: 0 }}
                              style={{ fontSize: "14px" }}
                            >
                              {ele?.name?.replaceAll("_", " ")}{" "}
                              {/* <span>(#{ele?.tag}) </span> */}
                            </Typography>
                            <Typography style={{ fontSize: "14px" }}>
                              <span>({ele?.unit ? ele?.unit : "unit"})</span>
                            </Typography>
                          </AccordionSummary>
                          <CalculatorTable
                            className={
                              element?.message == "multilevel" &&
                              specificationIndex != 0 &&
                              classes.noParameterLink
                            }
                            sx={{
                              "&:after": {
                                height: `${
                                  ele?.specification_type == "MULTILEVEL"
                                    ? "28px"
                                    : "67px"
                                }`,
                              },
                            }}
                          >
                            <GroupSingleTable
                              headerName={productCalculatorHeader}
                              data={ele}
                              allData={element}
                              allGroups={productCalculatorInfo}
                              expanded={expanded == element?.name}
                              updateData={updateData}
                              groupIndex={groupIndex}
                              specificationIndex={specificationIndex}
                              updateEquationsData={updateEquationsData}
                            />
                          </CalculatorTable>
                        </Accordion>
                      </AccordionBox>
                    );
                  })}

                  {updateLoader && (
                    <span
                      style={{
                        color: "#D7282F",
                        fontSize: "12px",
                        margin: "20px 0 5px 10px",
                        display: "flex",
                      }}
                    >
                      Please be patient till we update product varations, this
                      process will take couple of minutes.
                    </span>
                  )}
                  <BtnFilled
                    className={classes.updateBtn}
                    background="#d7282f"
                    onClick={() => {
                      // hande
                      handleUpdateCalculatorData();
                      // return;
                      // dispatch(
                      //   updateProductCalculator({
                      //     type: value,
                      //     groupIndex,
                      //     groupLength: productCalculatorInfo?.length,
                      //     productId,
                      //   })
                      // );
                    }}
                    disabled={updateLoader ? true : false}
                  >
                    {updateLoader ? (
                      <ThreeDots
                        height="36"
                        width="36"
                        radius="9"
                        color="white"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                      />
                    ) : (
                      " Update "
                    )}
                  </BtnFilled>
                  {emptyFieldsError && !updateLoader && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "4px",
                      }}
                    >
                      <WarningAmberOutlinedIcon
                        style={{
                          fontSize: "9px",
                          margin: "0px 4px 0 0",
                          color: "#d7282f",
                        }}
                      />
                      <Typography
                        sx={{
                          color: "#D7282F",
                          fontSize: "12px",
                        }}
                      >
                        Please fill all the fields!
                      </Typography>
                    </Box>
                  )}
                </AllGroupsCol>
              }
            </TabPanel>
          );
        })}
      </TabContext>
    </>
  );
}
