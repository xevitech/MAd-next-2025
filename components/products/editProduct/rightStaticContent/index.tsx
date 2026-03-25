import { CircularProgress, Button, Typography } from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";
import Image from "next/image";
// import useProductContext from "@/hooks/useProductContext";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import poststyle from "../style.module.css";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import {
  ButtonContainer,
  CircularContainer,
  DescriptionText,
  IconContainer,
  InnerCircle,
  InnerRightContainer,
  InnerRightContainerContent,
  InnerRightContentProfileCompletionBox,
  InnerRightMiddleContainer,
  ItemContent,
  TextContainer,
  HelpCard,
  HelpCardHeader,
  HelpCardContentText,
  HelpCardFooterContainer,
  HelpCardFooterButton,
  CategoryListing,
  PublishToggle,
  EditProductSwitchSection,
  // Mainbox,
  // Rightbox,
  // Alltext,
  // Redtext,
  // Buttonstyle,
  // useStyles,
  // Blackboldtext,
  // Mainbox1,
  // Floatbox,
  // Buttonstyle1,
} from "./styles";
import { useState } from "react";
import UploadProducts from "./UploadProducts";
import AddMetaKeyboard from "./addMetaKeyboard/AddMetaKeyboard";
import { ThreeDots } from "react-loader-spinner";
import { Id } from "../productInformation/activePassive/active/specMatrix/styles";
import { toast } from "react-toastify";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { LOCAL_URL } from "@/utils/staticValues";
import { apiClient } from "@/components/common/common";
import { useRouter } from "next/router";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

export const StaticRightContent = ({
  percentage,
  compeletedFields,
  setPublished,
  published,
  fetchList,
  setAccordianValue,
  placeHolder,
}) => {
  const [stick, setStick] = useState(false);
  const { productDetail } = useSelector((state: any) => state.editProduct);
  const { companyDetails } = useSelector((state: any) => state.companyProfile);
  const [loader, setLoader] = useState(false);
  const [featured, setFeatured] = useState(0);
  const [is_placeholder, setIsPlaceholder] = useState("");
  const [scrollTop, setScrollTop] = useState(0);
  const [toggle, setToggle] = useState<boolean>(true);
  const router = useRouter();
  const { query }: any = useRouter();
  const productId: string = query.Id;
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          background: "green",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));
  const { photos } = productDetail;
  
  useEffect(() => {
    function onScroll() {
      let currentPosition = window.pageYOffset;
      if (currentPosition > scrollTop) {
        setStick(true);
      } else {
        setStick(false);
      }
      setScrollTop(currentPosition <= 0 ? 0 : currentPosition);
    }
    window.addEventListener("scroll", () => onScroll());
    return window.removeEventListener("scroll", () => onScroll());
  }, []);

  const completedField =
    compeletedFields?.category &&
    compeletedFields?.information &&
    compeletedFields?.description &&
    compeletedFields?.commercial &&
    compeletedFields?.images &&
    compeletedFields?.editing &&
    compeletedFields?.specification;

  const PublishProduct = async () => {

    if(!companyDetails?.basic_information?.is_company_approved){
      toast.error("Company verification is mandatory to publish a product.");
      return;
    }
    if (percentageValue < 90 || !completedField) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "custom-btn cancel-button",
          cancelButton: "custom-btn remove-btn",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons.fire({
        title: "Warning?",
        text: "You cannot publish the product until you've added all the mandatory data to the product details. Please ensure that all required information, such as product name, description, images, and other essential fields, are filled out before attempting to publish.",
        icon: "warning",
        reverseButtons: true,
      });
      return;
    } else {
      const {
        category,
        information,
        description,
        specification,
        commercial,
        images,
        editing,
      } = compeletedFields;

      const featureProduct = featured == 1 ? 1 : 0;
      setLoader(true);
      let formData = new FormData();
      formData.append("id", productId);
      formData.append("featured", `${featureProduct}`);
      formData.append("is_placeholder", `${is_placeholder}`);
      formData.append("published", "1");

      try {
        let response = await apiClient(
          "product/view/single/update",
          "post",
          { body: formData },
          true
        );

        if (response.status === 200) {
          toast.success("Product submitted for admin approval");
          fetchList();
          setPublished("Published");
          setAccordianValue("");
        }
      } catch (error) {
        toast.error("Failed to publish the product");
      } finally {
        setLoader(false);
      }
    }
  };

  let percentageValueCal: number = percentage
    .map((v) => v.value)
    .reduce((a, b) => a + b);

  const percentageValue = Math.floor(percentageValueCal);

  useEffect(() => {
    if (productDetail) setFeatured(productDetail.featured);
    if (productDetail) setIsPlaceholder(productDetail.is_placeholder);
  }, [productDetail]);
  const getButtonProps = (
    published,
    loader,
    percentageValue,
    completedField
  ) => {
    let buttonText = "Publish Now";
    let buttonColor = "rgba(0,0,0,.25)";
    let buttonClass = "publishdisable";
    let buttonDisabled = loader;
    if (percentageValue >= 90 && completedField === true) {
      buttonClass = "publishbutton publishbutton-grey";
      buttonColor = "rgba(0,0,0,.25)";
      buttonText = "Publish Now";
      buttonDisabled = false;
    }

    if (published === 0) {
      // Published status 0 - Publish Now
      buttonText = "Publish Now";
      buttonColor = "rgba(0,0,0,.25)";
      buttonClass = "publishdisable publishbutton-grey";
      buttonDisabled = loader;
    } else if (published === 1) {
      // Published status 1 - Request for approval
      buttonText = "Pending Approval";
      buttonColor = "rgb(221, 72, 78)";
      buttonClass = "publishbutton white";
    } else if (published === 3) {
      // Published status 3 - Approved
      buttonText = "Published";
      buttonColor = "#008000";
      buttonClass = "publishbutton publishedBtn";
    }

    if (percentageValue > 90 && published === 1) {
      buttonClass = "publishbutton";
    }

    return {
      buttonText,
      buttonColor,
      buttonClass,
      buttonDisabled,
    };
  };
  const [placeholder, setPlaceholder] = useState(placeHolder);
  const handleToggleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIsPlaceholder = e.target.checked ? "yes" : "no";
    setPlaceholder(newIsPlaceholder);
    try {
      await statusChange(newIsPlaceholder);
    } catch (error) {}
    const targetUrl =
      newIsPlaceholder === "yes"
        ? `/products/placeholder/${productId}`
        : `/products/edit/${productId}`;
    router.replace(targetUrl);
  };
  const statusChange = async (newIsPlaceholder: string) => {
    const formData = new FormData();
    formData.append("is_placeholder", newIsPlaceholder);
    formData.append("id", productId);

    try {
      const response = await apiClient(
        "product/view/single/update",
        "post",
        { body: formData },
        true
      );
      if (response && response.data) {
      }
    } catch (error) {}
  };
  return (
    <>
      <InnerRightContainer value={{ stick, toggle }}>
        <PublishToggle>
          <PlaylistAddCheckIcon
            onClick={() => setToggle((prev) => !prev)}
          ></PlaylistAddCheckIcon>
        </PublishToggle>
        <InnerRightContainerContent>
          <InnerRightContentProfileCompletionBox>
            <CircularContainer>
              <CircularProgress
                // color={"#ffff"}
                style={{
                  color: percentageValue >= 100 ? "#008000" : "#DD484E",
                  transform: "rotate(-270deg)",
                }}
                size={"130px"}
                thickness={1.5}
                variant="determinate"
                value={percentageValue > 100 ? 100 : percentageValue}
              ></CircularProgress>
              <InnerCircle>
                <div style={{ textAlign: "center" }}>
                  <span
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontWeight: "600",
                      color: percentageValue >= 100 ? "#008000" : "#000",
                    }}
                  >
                    {percentageValue > 100 ? 100 : percentageValue}%
                  </span>
                  <span
                    style={{
                      display: "flex",
                      fontWeight: 600,
                      fontSize: "14px",
                      lineHeight: "15px",
                      color: "#525252",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Product
                  </span>
                  <span
                    style={{
                      display: "flex",
                      fontWeight: 600,
                      fontSize: "14px",
                      lineHeight: "15px",
                      color: "#525252",
                    }}
                  >
                    {" "}
                    Completion
                  </span>
                </div>
              </InnerCircle>
            </CircularContainer>
            <DescriptionText>
              Please fill in the required field before submitting.
            </DescriptionText>
            <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
              <Grid container>
                <Grid item xs={12} md={12}>
                  <CategoryListing
                    sx={{
                      "& .MuiListItemText-root": {
                        margin: "3px 0",
                        paddingLeft: "12px",
                        position: "relative",
                        "&:before": {
                          content: '" "',
                          position: "absolute",
                          display: "inline-block",
                          borderRadius: "100%",
                          width: "6px",
                          height: "6px",
                          backgroundColor:
                            percentageValue >= 100 ? "green" : "#DD484E",
                          left: "0",
                          top: "50%",
                          transform: "translate(0 , -50%)",
                        },
                      },
                    }}
                  >
                    <List>
                      <ListItem
                        sx={{
                          color: compeletedFields?.category ? "green" : "",
                          "& .MuiListItemText-root": {
                            "&:before": {
                              backgroundColor: compeletedFields?.category
                                ? "green"
                                : "",
                            },
                          },
                        }}
                      >
                        <ListItemText primary="Product Category" />
                      </ListItem>
                      <ListItem
                        sx={{
                          color: compeletedFields?.description ? "green" : "",
                          "& .MuiListItemText-root": {
                            "&:before": {
                              backgroundColor: compeletedFields?.description
                                ? "green"
                                : "",
                            },
                          },
                        }}
                      >
                        <ListItemText primary="Product Description" />
                      </ListItem>
                      <ListItem
                        sx={{
                          color: compeletedFields?.information ? "green" : "",
                          "& .MuiListItemText-root": {
                            "&:before": {
                              backgroundColor: compeletedFields?.information
                                ? "green"
                                : "",
                            },
                          },
                        }}
                      >
                        <ListItemText primary="Product Information" />
                      </ListItem>
                      <ListItem
                        sx={{
                          color: compeletedFields?.specification ? "green" : "",
                          "& .MuiListItemText-root": {
                            "&:before": {
                              backgroundColor: compeletedFields?.specification
                                ? "green"
                                : "",
                            },
                          },
                        }}
                      >
                        <ListItemText primary="Product features & Characteristics" />
                      </ListItem>
                      <ListItem
                        sx={{
                          color: compeletedFields?.commercial ? "green" : "",
                          "& .MuiListItemText-root": {
                            "&:before": {
                              backgroundColor: compeletedFields?.commercial
                                ? "green"
                                : "",
                            },
                          },
                        }}
                      >
                        <ListItemText primary="Commercial Information" />
                      </ListItem>
                      <ListItem
                        sx={{
                          color:
                            photos || compeletedFields?.images ? "green" : "",
                          "& .MuiListItemText-root": {
                            "&:before": {
                              backgroundColor:
                                photos || compeletedFields?.images
                                  ? "green"
                                  : "",
                            },
                          },
                        }}
                      >
                        <ListItemText primary="Upload Product Images" />
                      </ListItem>
                      <ListItem
                        sx={{
                          color: compeletedFields?.editing ? "green" : "",
                          "& .MuiListItemText-root": {
                            "&:before": {
                              backgroundColor: compeletedFields?.editing
                                ? "green"
                                : "",
                            },
                          },
                        }}
                      >
                        <ListItemText primary="Description" />
                      </ListItem>
                    </List>
                  </CategoryListing>
                </Grid>
              </Grid>
              {/* <EditProductSwitchSection>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LightTooltip
                    arrow
                    placement="top"
                    title="Featured product will appear in your mini store."
                    disableInteractive
                  >
                    <Box>
                      <AntSwitch
                        checked={featured == 1 ? true : false}
                        defaultChecked={featured == 1 ? true : false}
                        inputProps={{ "aria-label": "ant design" }}
                        onChange={(e) => setFeatured(e.target.checked ? 1 : 0)}
                      />
                    </Box>
                  </LightTooltip>
                  <Typography>Feature Product</Typography>
                </Stack>
              </EditProductSwitchSection> */}
              <EditProductSwitchSection>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LightTooltip
                    arrow
                    placement="top"
                    title="Placeholder products stand in for future offerings or customizable options. They act like teasers for exciting features to come, gauging customer interest and gathering early feedback.  For customizable products, they provide a starting point, highlighting the core functionalities while prompting users to contact sales for specific configurations and quotes.  Ultimately, these temporary products help bridge the gap between a static catalog and a dynamic B2B sales experience"
                    disableInteractive
                  >
                    <Box>
                      <AntSwitch
                        checked={placeholder === "yes"}
                        defaultChecked={placeholder === "yes"}
                        inputProps={{ "aria-label": "ant design" }}
                        onChange={handleToggleChange}
                      />
                    </Box>
                  </LightTooltip>
                  <Typography>Placeholder Product</Typography>
                </Stack>
              </EditProductSwitchSection>
            </Box>

            <ButtonContainer style={{ paddingTop: "0px" }} value={published}>
              <Button
                className={
                  getButtonProps(
                    published,
                    loader,
                    percentageValue,
                    completedField
                  ).buttonClass
                }
                // disabled={published === 1 || published === 3}
                sx={{
                  pointerEvents:
                    published === 1 || published === 3 ? "none" : "",
                }}
                color="error"
                type="submit"
                variant="contained"
                style={{
                  width: "200px",
                  textTransform: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "open sans",
                  lineHeight: "24px",
                  marginBottom: "10px",
                  height: "36px",
                  backgroundColor: getButtonProps(
                    published,
                    loader,
                    percentageValue,
                    completedField
                  ).buttonColor,
                }}
                fullWidth
                onClick={PublishProduct}
              >
                {loader ? (
                  <ThreeDots
                    height="30"
                    width="30"
                    radius="9"
                    color="white"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                ) : (
                  getButtonProps(
                    published,
                    loader,
                    percentageValue,
                    completedField
                  ).buttonText
                )}
              </Button>
            </ButtonContainer>
            {/* {percentageValue >= 90 && percentageValue < 100 && (
              <DescriptionText>
                {" "}
                Your product is published. Complete the remaining{" "}
                {100 - percentageValue}% for full optimization.{" "}
              </DescriptionText>
            )}
            {percentageValue == 100 && (
              <DescriptionText>
                {" "}
                Your product is now fully optimized.{" "}
              </DescriptionText>
            )} */}

            {/* {percentageValue < 90  && percentageValue < 100 && (
              <DescriptionText>
                {" "}
                Complete all the required fields to post this product, then
                submit it for approval.{" "}
              </DescriptionText>
            )} */}
            {productDetail?.published == 0 && (
              <DescriptionText>
                {" "}
                Complete all the required fields to post this product, then
                submit it for approval.{" "}
              </DescriptionText>
            )}

            {productDetail?.published == 1 && (
              <DescriptionText>
                {" "}
                Your product is currently being reviewed by Merchant AD staff.
                This process may take up to 48 hours.{" "}
              </DescriptionText>
            )}

            {productDetail?.published == 3 && (
              <DescriptionText>
                {" "}
                Your product has been approved by Merchant AD and is now visible
                to buyers.{" "}
              </DescriptionText>
            )}
          </InnerRightContentProfileCompletionBox>
        </InnerRightContainerContent>

        {/* <HelpCard>
        <HelpCardHeader>
          {" "}
          <div
            style={{
              width: "14px",
              height: "14px",
              position: "relative",

              display: "inline-block",
            }}
          >
            <Image src={"/assets/helpIcon.svg"} alt="help-icon" layout="fill" />
          </div>{" "}
          Help
        </HelpCardHeader>
        <HelpCardContentText>
          If you are experiencing technical issues with our website, please
          contact us.
        </HelpCardContentText>
        <HelpCardFooterContainer>
          <HelpCardFooterButton size="small" variant="contained">
            Ask for Help{" "}
            <div style={{}}>
              {
                // <Image
                //   src={'/assets/buttonrightarrow.svg'}
                //   width={6}
                //   height={6}
                //   alt='help-icon'
                // />
              }
            </div>
          </HelpCardFooterButton>
        </HelpCardFooterContainer>
      </HelpCard> */}
      </InnerRightContainer>
      {/* <Box mt={73}>
        <Mainbox>
          <Rightbox>
            <img src='/assets/adsimg.svg' alt='' className={classes.rightstaricon} />
          </Rightbox>
          <Box px={2} pt={1.5}>
            <Alltext>Add <Redtext>Quality</Redtext> And <Redtext>Assurance</Redtext> Tag To Your <Blackboldtext>Product</Blackboldtext></Alltext>
          </Box>
          <Box position='relative' mt={-1.5}>
            <img src='/assets/Adslaptop.svg' alt='' className={classes.imageone} />
            <img src='/assets/Adslaptopscreen.svg' alt='' className={classes.imagetwo} />
          </Box>
          <Box display='flex' justifyContent='center' mt={-1.5}>
            <Buttonstyle>Upgrade Now</Buttonstyle>
          </Box>
        </Mainbox>

        <Box mt={1}>
          <Mainbox1>
            <Floatbox>
              <img src='/assets/adsimg.svg' alt='' className={classes.bgimage} />
            </Floatbox>
            <Box pt={1} ml={1}>
              <Typography className={classes.alltext}>Get noticed first with <Typography component='span' className={classes.redtext}>enlarged</Typography>
                <Typography className={classes.redtext}>View <Typography component='span' className={classes.alltext}>and get edge</Typography> </Typography>
                <Typography className={classes.alltext}>Over <Typography component='span' className={classes.redtext}>Leads</Typography> </Typography>
              </Typography>
            </Box>
            <Box position='relative'>
              <img src='/assets/mapads2.svg' alt='' className={classes.map} />
              <img src='/assets/Ellipse 37.svg' alt='' className={classes.ellipse} />
              <img src='/assets/ellipseimage.svg' alt='' className={classes.ellipseimage} />
              <img src='/assets/adshexa.svg' alt='' className={classes.hexaimage} />
              <Typography sx={{ position: 'absolute', color: '#fff' }} className={classes.hexatext}>Only <Typography className={classes.hexatext2}> <sup>$</sup>125</Typography> </Typography>
            </Box>
            <Box display='flex' justifyContent='center' mt={18}>
              <Buttonstyle1>Upgrade Now</Buttonstyle1>
            </Box>
          </Mainbox1>
        </Box>

      </Box> */}
    </>
  );
};
