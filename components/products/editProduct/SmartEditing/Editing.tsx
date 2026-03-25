import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ProductContentContainer,
  TabsContainer,
} from "@/components/products/editProduct/productInformation/activePassive/styles";
import { Box, Button, Tab, Tooltip, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { styled } from "@mui/styles";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditFields from "./EditFields";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import {
  apiClient,
  configProductScoreValues,
  productScoreValues,
} from "@/components/common/common";
import { ThreeDots } from "react-loader-spinner";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import ReorderModal from "./RedorderModal";
import { toast } from "react-toastify";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { Templates } from "./Template";
import { useRouter } from "next/router";
import {
  ProductDescriptionTabStyle,
  ProductInfoTabStyle,
} from "../productInformation/styles";
import { BorderBottom } from "@mui/icons-material";

const Editing = ({
  FetchProductDetail,
  setAccordianValue,
  HandlePercentage,
  setCompletedFields,
  productDetail,
  setPublished,
  percentage,
}) => {
  const [informationType, setInformationType] = useState<string>("1");
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [isMount, setIsMount] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const query: any = useRouter();
  const productId: string = query.query.Id;
  let percentageValueCal: number = percentage
    .map((v) => v.value)
    .reduce((a, b) => a + b);

  const percentageValue: any = Math.round(percentageValueCal);
  const ButtonCol = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    paddingTop: "14px",
  });

  let tabValidationSchema = Yup.object().shape({
    tabs: Yup.array().of(
      Yup.object().shape({
        title: Yup.string()
          .max(300, "Title must be of 300 characters")
          .required("Please enter title for tab"),
      })
    ),
  });

  const defaultTabs = [
    {
      value: 1,
      content: `${JSON.stringify(Templates.find((v) => v.id == 6)?.html)}`,
      type: "custom",
      title: "Product Description",
      tooltip:
        "Provide a clear and detailed description of your product, highlighting key features, technical specifications, benefits, and any relevant information to help buyers understand its value and suitability.",
    },
    {
      value: 2,
      // content: `${JSON.stringify(.find(v => v.id == 9)?.html)}`,
      content: "",
      type: "custom",
      title: "Technical Specifications",
      tooltip:
        "Provide detailed technical specifications for your product, including dimensions, weight, materials, operating parameters, and any other relevant technical information. This helps buyers assess compatibility and suitability for their specific needs.",
    },
    {
      value: 3,
      // content: `${JSON.stringify(Templates.find(v => v.id == 41)?.html)}`,
      content: "",
      type: "custom",
      title: "Packaging Details",
      tooltip:
        "It is essential to provide comprehensive details about the packaging type. This may include specifics such as the material used for packaging, dimensions, weight, and any additional protective measures taken to safeguard the integrity of the industrial materials during transit.",
    },
    {
      value: 4,
      // content: `${JSON.stringify(Templates.find(v => v.id == 42)?.html)}`,
      content: "",
      type: "custom",
      title: "Shipping option",
      tooltip:
        "Utilize this area to provide more specifics about shipping, including carriers, estimated costs, and delivery timeframes. For sellers offering international shipping, it is important to clearly outline the available options and any associated fee.",
    },
    {
      value: 5,
      // content: `${JSON.stringify(Templates.find(v => v.id == 43)?.html)}`,
      content: "",
      type: "custom",
      title: "Warranty Information",
      tooltip:
        "Clearly outline your warranty terms, including duration, coverage details, and any specific conditions or limitations. This helps buyers understand their rights and the level of support offered.",
    },
    {
      value: 6,
      // content: `${JSON.stringify(Templates.find(v => v.id == 44)?.html)}`,
      content: "",
      type: "custom",
      title: "Certifications and Compliance",
      tooltip:
        "Indicate any relevant certifications or compliance standards your product adheres to, such as ISO, CE, RoHS, or industry-specific certifications. This helps buyers verify the product's safety, quality, and adherence to regulations.",
    },
    {
      value: 7,
      content: `${JSON.stringify(Templates.find((v) => v.id == 37)?.html)}`,
      type: "custom",
      title: "Return Policy",
      tooltip:
        "Clearly outline your return policy, including the timeframe for returns, acceptable conditions for return, and any applicable restocking fees. This helps buyers understand their options and build trust in your business.",
    },
  ];

  const setDefault = (value) => {
    try {
      return JSON.parse(value);
    } catch (err) {
      return defaultTabs;
    }
  };

  let tabFormik: any = useFormik({
    enableReinitialize: true,
    validationSchema: tabValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      tabs: defaultTabs,
    },
    onSubmit: async ({ tabs }) => {
      setPublished("");
      let contentIndex = tabs.findIndex(
        (v) => v.content == "" || !v.content || v.content.length <= 2
      );
      if (contentIndex >= 0) {
        toast.error(`Please enter Tab ${contentIndex + 1} content`);
        return;
      }

      setButtonLoader(true);
      let formData = new FormData();
      formData.append("published", "0");
      formData.append("id", productId);
      formData.append("tabs", JSON.stringify(tabs));
      formData.append("last_update", "Description");
      formData.append("percentage", percentageValue);
      let response = await apiClient(
        "product/view/single/update",
        "post",
        { body: formData },
        true
      );
      if (response.status == 200) {
        setButtonLoader(false);
        setCompletedFields((prev) => ({ ...prev, editing: true }));
        setAccordianValue("");
        await FetchProductDetail();
      }
    },
  });
  const { tabs } = tabFormik.values;

  useEffect(() => {
    let tabContent = tabs.filter((v) => v.content !== "");
    let contentIndex = tabs?.findIndex(
      (v) => v.content == "" || !v.content || v.content.length <= 2
    );
    if (tabs?.length <= 10 && isMount && contentIndex != -1) {
      setCompletedFields((prev) => ({ ...prev, editing: false }));
      setIsMount(false);
    }
  }, [tabs, isMount]);

  useEffect(() => {
    const { tabs } = productDetail;
    if (tabs?.length > 0 && !isMount) {
      setCompletedFields((prev) => ({ ...prev, editing: true }));
      setIsMount(true);
    }
  }, [productDetail]);
  const product_type = productDetail?.product_type;
  useEffect(() => {
    let descriptionData;

    if (product_type === "simple") {
      descriptionData = productScoreValues?.description;
    } else if (product_type === "configured") {
      descriptionData = configProductScoreValues?.description;
    }
    if (!descriptionData) return;
    const scoreValuesMap = {
      1: descriptionData.productDescription,
      2: descriptionData.technicalSpecifications,
      3: descriptionData.packagingDetails,
      4: descriptionData.shippingOptions,
      5: descriptionData.warrantyInformation,
      6: descriptionData.certificationsAndCompliance,
      7: descriptionData.returnPolicy,
    };
    tabs?.forEach((tab) => {
      if (tab?.value !== undefined) {
        const tabScoreValue = scoreValuesMap[tab?.value];
        if (tab?.content !== "" && tabScoreValue !== undefined) {
          const tabId =
            product_type === "simple"
              ? `description_tab_${tab?.value}`
              : `config_description_tab_${tab?.value}`;

          HandlePercentage(tabId, tabScoreValue);
        } else if (tab?.content === "") {
          const tabId =
            product_type === "simple"
              ? `description_tab_${tab?.value}`
              : `config_description_tab_${tab?.value}`;

          HandlePercentage(tabId, 0);
        }
      }
    });
  }, [tabs, product_type, productScoreValues, configProductScoreValues]);

  useEffect(() => {
    if (productDetail?.tabs) {
      const updatedTabs = [
        ...defaultTabs.map((tab) => {
          const updatedTab = setDefault(productDetail?.tabs ?? [])?.find(
            (v) => v.value === tab.value
          );
          return updatedTab || tab;
        }),
        ...setDefault(productDetail?.tabs ?? [])?.filter(
          (v) => !defaultTabs.some((tab) => tab.value === v.value)
        ),
      ];
      tabFormik.setFieldValue("tabs", updatedTabs);
    }
  }, [productDetail]);

  const onClickHandler = (e) => {
    e.preventDefault();
    scrollToDirection("right");
    setInformationType(`${tabs.length + 1}`);
    tabFormik.setFieldValue("tabs", [
      ...tabs,
      {
        value: tabs[tabs.length - 1].value + 1,
        type: "smart",
        content: "",
        title: "",
      },
    ]);
  };

  const RemoveTab = (value) => {
    const updatedTab = tabs.filter((v) => v.value != value);
    let firstItem =
      Array.isArray(updatedTab) && updatedTab[updatedTab?.length - 1]?.value;
    tabFormik.setFieldValue("tabs", updatedTab);
    setTimeout(() => {
      setInformationType(`${firstItem}`);
    });
  };

  const errorHandler = () => {
    let titleIndex = tabFormik.values.tabs.findIndex((v) => v.title == "");
    if (informationType == titleIndex + 1) {
      return;
    }
    if (titleIndex >= 0)
      toast.error(`Please enter Tab ${titleIndex + 1} title`);
  };

  const scrollToDirection = (direction) => {
    if (tabListRef?.current) {
      const muiScrollerContainer = tabListRef.current.querySelector(
        ".description .MuiTabs-scroller"
      );
      if (muiScrollerContainer) {
        const { scrollWidth, clientWidth, scrollLeft } = muiScrollerContainer;
        const scrollAmount = clientWidth / 2;
        setTimeout(() => {
          muiScrollerContainer.scrollTo({
            left:
              direction === "right"
                ? Math.max(scrollLeft + scrollAmount, scrollWidth - clientWidth)
                : 0,
            behavior: "smooth",
          });
        }, 1000);
      }
    }
  };

  return (
    <>
      {open && (
        <ReorderModal
          open={open}
          setOpen={setOpen}
          tabs={tabs}
          formik={tabFormik}
          setInformationType={setInformationType}
        />
      )}
      <form onSubmit={tabFormik.handleSubmit}>
        <ProductContentContainer>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabsContainer>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={informationType}>
                  <Box
                    sx={{
                      ...ProductDescriptionTabStyle,
                      borderBottom: 1,
                      borderColor: "divider",
                      fontFamily: "open sans",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding:"0 0 12px 0",
                      "@media (max-width: 900px)": {
                        flexDirection: "column-reverse",
                      },
                    }}
                  >
                    <TabList
                      sx={{
                        "@media (max-width: 600px)": {
                          width: "100%",
                        },
                      }}
                      onChange={(e, value) => setInformationType(value)}
                      aria-label="lab API tabs example"
                      variant="scrollable"
                    >
                      {tabs.map((val, index) => {
                        const { value, title, type } = val;
                        return (
                          <LightTooltip
                            arrow
                            disableInteractive
                            title={val?.tooltip}
                            placement="top-start"
                            slotProps={{
                              popper: {
                                modifiers: [
                                  {
                                    name: "offset",
                                    options: {
                                      offset: [0, -4],
                                    },
                                  },
                                ],
                              },
                            }}
                          >
                            <Tab
                              disableRipple
                              icon={
                                tabs.length > 1 &&
                                type !== "custom" &&
                                informationType == value && (
                                  <DeleteOutlinedIcon
                                    onClick={() => {
                                      RemoveTab(value);
                                      scrollToDirection("right");
                                    }}
                                  />
                                )
                              }
                              iconPosition="end"
                              style={{
                                textTransform: "none",
                                color:
                                  informationType == value
                                    ? "#DD484E"
                                    : "#231f20",
                              }}
                              label={title ? title : `Tab`}
                              value={`${value}`}
                              key={index}
                            />
                          </LightTooltip>
                        );
                      })}
                    </TabList>
                    <Box
                      display="flex"
                      gap={1}
                      sx={{
                        justifyContent: "right",
                        width: "auto",
                        minWidth: "245px",
                      }}
                    >
                      {tabs.length < 10 && (
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography
                            color="#DD484E"
                            fontFamily="open sans"
                            style={{ cursor: "pointer" }}
                            fontSize="13px"
                            fontWeight={600}
                            onClick={onClickHandler}
                          >
                            + Add New Tab
                          </Typography>
                          <LightTooltip
                            placement={"top"}
                            title={`Add more information by including additional desired tabs, then publish your product.`}
                            arrow
                          >
                            {
                              <span
                                style={{
                                  display: "inline-block",
                                  position: "relative",
                                  width: "16px",
                                  height: "16px",
                                }}
                              >
                                <Image
                                  src={"/assets/helpIcon.svg"}
                                  layout="fill"
                                  alt="image"
                                />{" "}
                              </span>
                            }
                          </LightTooltip>
                        </Box>
                      )}
                      <Button
                        color="error"
                        variant="outlined"
                        size="small"
                        style={{
                          textTransform: "none",
                          minWidth: "90px",
                        }}
                        onClick={() => setOpen(true)}
                      >
                        Reorder
                      </Button>
                    </Box>
                  </Box>
                  {tabs.map((val, index) => {
                    return (
                      <TabPanel
                        style={{
                          textTransform: "none",
                          padding: "0px",
                          paddingTop: "30px",
                        }}
                        value={`${val.value}`}
                      >
                        <EditFields
                          ActiveTab={val}
                          tabFormik={tabFormik}
                          index={index}
                        />
                      </TabPanel>
                    );
                  })}
                </TabContext>
              </Box>
            </TabsContainer>
          </Box>
          <ButtonCol>
            <Button
              color="error"
              variant="outlined"
              size="small"
              sx={{
                textTransform: "none",
                minWidth: "90px",
                // marginLeft: "auto",
                height: "30.75px",
              }}
              type="submit"
              onClick={errorHandler}
            >
              {buttonLoader ? (
                <ThreeDots
                  height="14"
                  width="107"
                  radius="5"
                  color="#d32f2f"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              ) : (
                " Save & Continue"
              )}
              <ArrowForwardIosIcon
                style={{ fontSize: "15px", marginLeft: "4px" }}
              ></ArrowForwardIosIcon>
            </Button>
          </ButtonCol>
        </ProductContentContainer>
      </form>
    </>
  );
};

export default Editing;
