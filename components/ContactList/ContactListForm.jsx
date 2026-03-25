import React from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import { makeStyles } from "tss-react/mui";
import { Typography, Box, Tooltip, Grid } from "@mui/material";
import { fetchContactDetails, setContactId } from "@/hooks/UseContactList";
import ClearIcon from "@mui/icons-material/Clear";
import Image from "next/image";
import { returnCountryFromCode } from "@/utils/commonFunctions/other";
import { useAppDispatch } from "redux/store";
import {
  BorderAndPadding,
  HeadingText,
  Headings,
  MainHeadings,
  MainSubHeadings,
} from "./style";
import { useSelector } from "react-redux";
const useStyles = makeStyles()((theme) => {
  return {
    head: {
      fontFamily: "auto",
    },
    addressclass: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "10px 10px 10px 0px",
      paddingBottom: 15,
    },
    crossbtn: {
      cursor: "pointer",
      fontSize: 8,
      padding: 8,
      position: "absolute",
      left: "-39px",
      top: "8px",
      backgroundColor: "#fff",
      borderRadius: "6px 0px 0 6px",
      boxShadow: "-3px 1px 5px rgba(0, 0, 0, 0.1)",
      "@media screen and (max-width:320px)": {
        left: "210px",
        boxShadow: "none",
      },
    },
    header2: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },

    title: {
      color: "#494949",
      fontWeight: 600,
      fontSize: 12,
    },
    subtitle: {
      color: "#494949",
      fontWeight: 400,
      fontSize: 12,
    },
    subheader: {
      fontSize: 13,
      fontWeight: 600,
      paddingBottom: 9,
    },
    icons: {
      display: "flex",
      flexDirection: "row",
      border: "1px solid grey",
      borderRadius: 50,
      justifyContent: "center",
      width: 120,
      margin: "10px 0px 10px 0px",
    },
    icon: {
      margin: 5,
      paddingRight: 4,
      paddingLeft: 4,
      cursor: "pointer",
    },
    cancelbtn: {
      marginRight: 10,
      color: "grey",
      border: "1px solid grey",
      marginTop: 18,
    },
    submitbtn: {
      color: "white",
      backgroundColor: "#D7282F",
      marginTop: 18,
      float: "right",
      paddingLeft: 15,
      paddingRight: 15,
    },
    infoheader: {
      fontSize: "16px",
      fontWeight: 600,
      paddingBottom: 15,
    },
  };
});

function ContactListForm({ toggleDrawer1, editValues, setEditValue }) {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const { role } = useSelector((state) => state.userData);

  return (
    <>
      <Card
        sx={{
          width: 487,
          height: 936,
          px: 1,
          "&.MuiPaper-root.MuiPaper-root.MuiDrawer-paper": {
            boxShadow: "none !important",
          },
          boxShadow: "none !important",
          "@media screen and (max-width:600px)": {
            width: "285px",
          },
          "@media screen and (max-width:350px)": {
            width: "280px",
            boxShadow: "none !important",
          },
        }}
        style={{ boxShadow: "none !important" }}
      >
        <div
          className={classes.crossbtn}
          onClick={(e) => {
            toggleDrawer1(false);
          }}
        >
          <ClearIcon
            sx={{
              color: "#D7282F",
              backgroundColor: "white",
              overflowY: "scroll",
            }}
          />
        </div>
        <Box
          sx={{
            padding: "8px 20px 0px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            "@media screen and (max-width:600px)": {
              display: "block",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Box>
              <Avatar
                alt="Remy Sharp"
                src={editValues.profile_link}
                sx={{ width: 60, height: 60 }}
              />
            </Box>
            <Box>
              <Typography>{editValues.name}</Typography>
              <Typography>{editValues.job_role}</Typography>
            </Box>
          </Box>
          {(role === "seller" ||
            (role === "subuser" &&
              permissions.my_contacts.block_unblock == true)) && (
            <Box>
              <Box className={classes.icons}>
                <Tooltip title="Add Contact">
                  <div
                    className={classes.icon}
                    onClick={() => {
                      setContactId(editValues?.id);
                      dispatch(fetchContactDetails(2));
                      toggleDrawer1(false);
                    }}
                  >
                    <Image
                      height={20}
                      width={20}
                      alt="Add user"
                      src="/assets/formicon1.svg"
                    />
                  </div>
                </Tooltip>
                <Box
                  sx={{
                    border: "1px solid #d2d2d2",
                    height: "20px",
                    marginTop: "7px",
                  }}
                ></Box>
                <Tooltip title="Block">
                  <div
                    className={classes.icon}
                    onClick={() => {
                      dispatch(setContactId(editValues?.id));
                      dispatch(fetchContactDetails(1));
                      toggleDrawer1(false);
                    }}
                  >
                    <Image
                      height={20}
                      width={20}
                      alt="Chat"
                      src="/assets/formicon3.svg"
                    />
                  </div>
                </Tooltip>
              </Box>
            </Box>
          )}
        </Box>
        <CardContent
          sx={{
            "&.MuiCardContent-root": {
              padding: "10px",
              height: "600px !important",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "6px",
                height: "4px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#f1f1f1",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#d2d2d2",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#888888",
              },
              "@media only screen and (max-width:400px)": {
                height: "400px !important",
              },

              "@media only screen and (max-width:1024px) and (orientation:landscape)":
                {
                  height: "350px !important",
                },
              "@media only screen and (min-width: 400px) and (max-device-width: 900px) and (orientation: landscape)":
                {
                  height: "200px !important",
                },
            },
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <BorderAndPadding>
                <MainHeadings variant="h6">Contact Information</MainHeadings>
              </BorderAndPadding>
            </Grid>
          </Grid>

          <BorderAndPadding>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "59px",
                    "@media screen and (max-width:600px)": {
                      display: "block",
                    },
                  }}
                >
                  <Box>
                    <Headings>Address:</Headings>
                  </Box>
                  <Box sx={{}}>
                    <HeadingText
                      className={classes.subtitle}
                      sx={{ wordBreak: "break-word" }}
                    >
                      {editValues.address === null ? "---" : editValues.address}
                    </HeadingText>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </BorderAndPadding>

          <BorderAndPadding>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                <Box>
                  <Headings className={classes.title}>Country/region:</Headings>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                <Box>
                  <HeadingText className={classes.subtitle} sx={{ ml: 1 }}>
                    {editValues.registration_country_id?.length > 0
                      ? returnCountryFromCode(
                          editValues.registration_country_id
                        )
                          .charAt(0)
                          .toUpperCase() +
                        returnCountryFromCode(
                          editValues.registration_country_id
                        ).slice(1)
                      : "--"}
                  </HeadingText>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                <Box>
                  <Headings className={classes.title}>Member Since:</Headings>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                <Box>
                  <HeadingText className={classes.subtitle} sx={{ ml: 1 }}>
                    {editValues.member_since}
                  </HeadingText>
                </Box>
              </Grid>
            </Grid>
          </BorderAndPadding>

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <BorderAndPadding>
                <MainHeadings variant="h6">Company Information</MainHeadings>
              </BorderAndPadding>
            </Grid>
          </Grid>

          <BorderAndPadding>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <Box>
                  <Headings className={classes.title}>Company Name</Headings>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                <Box>
                  <HeadingText className={classes.subtitle}>
                    {editValues.company_name?.length > 0
                      ? editValues.company_name.charAt(0).toUpperCase() +
                        editValues.company_name.slice(1)
                      : "--"}
                  </HeadingText>
                </Box>
              </Grid>
            </Grid>
          </BorderAndPadding>

          <BorderAndPadding>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <Box>
                  <Headings className={classes.title}>Main Products</Headings>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                <Box>
                  <HeadingText className={classes.subtitle}>
                    {editValues.company_products === null
                      ? "---"
                      : editValues.company_products}
                  </HeadingText>
                </Box>
              </Grid>
            </Grid>
          </BorderAndPadding>

          <BorderAndPadding>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <Box>
                  <Headings sx={{ width: "100%" }}>Business Type</Headings>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                <Box>
                  <HeadingText>
                    {editValues?.business_type
                      ?.map((v) => v.name)
                      ?.toString() ?? "---"}
                  </HeadingText>
                </Box>
              </Grid>
            </Grid>
          </BorderAndPadding>

          <BorderAndPadding>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <Box>
                  <Headings className={classes.title}>
                    Company Certification
                  </Headings>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                <Box>
                  <HeadingText className={classes.subtitle}>
                    {editValues.certification === null
                      ? "---"
                      : editValues.certification}
                  </HeadingText>
                </Box>
              </Grid>
            </Grid>
          </BorderAndPadding>

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <BorderAndPadding>
                <MainHeadings variant="h6">
                  Key Activity Information
                </MainHeadings>
                <MainSubHeadings className={classes.subheader}>
                  Visit (Last {editValues.visit})
                </MainSubHeadings>
              </BorderAndPadding>
            </Grid>
          </Grid>

          <BorderAndPadding>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                <Box>
                  <Headings className={classes.title}>Day Visited:</Headings>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                <Box>
                  <HeadingText className={classes.subtitle} sx={{ ml: 1 }}>
                    {editValues.day_visited}
                  </HeadingText>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <Box>
                  <Headings className={classes.title}>
                    Listed as a Contact:
                  </Headings>
                </Box>
              </Grid>
              <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                <Box>
                  <HeadingText className={classes.subtitle} sx={{ ml: 1 }}>
                    {editValues.listed_as_contact}
                  </HeadingText>
                </Box>
              </Grid>
            </Grid>
          </BorderAndPadding>

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <BorderAndPadding>
                <MainSubHeadings>
                  RFQ (Last {editValues.rfq}Days)
                </MainSubHeadings>
              </BorderAndPadding>
            </Grid>
          </Grid>

          <BorderAndPadding>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                <Box>
                  <Headings className={classes.title}>
                    Valid RFQ Submitted:
                  </Headings>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                <Box>
                  <HeadingText className={classes.subtitle} sx={{ ml: 1 }}>
                    {editValues.valid_rfq_submitted}
                  </HeadingText>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <Box>
                  <Headings className={classes.title}>Quotations:</Headings>
                </Box>
              </Grid>
              <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                <Box>
                  <HeadingText className={classes.subtitle} sx={{ ml: 1 }}>
                    {editValues.quotation}
                  </HeadingText>
                </Box>
              </Grid>
            </Grid>
          </BorderAndPadding>
          <BorderAndPadding>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "59px",
                    "@media screen and (max-width:600px)": {
                      display: "block",
                    },
                  }}
                >
                  <Box>
                    <Headings className={classes.title}>
                      No of suppliers received:
                    </Headings>
                  </Box>
                  <Box>
                    <HeadingText className={classes.subtitle}>
                      {editValues.supplier_response_rate}
                    </HeadingText>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </BorderAndPadding>
          <BorderAndPadding>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Box>
                  <MainSubHeadings className={classes.subheader}>
                    Inquiry (Last {editValues.inquiry_days} Days)
                  </MainSubHeadings>
                </Box>
              </Grid>
            </Grid>
          </BorderAndPadding>

          <BorderAndPadding>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "59px",
                    "@media screen and (max-width:600px)": {
                      display: "block",
                    },
                  }}
                >
                  <Box>
                    <Headings className={classes.title}>
                      Suppliers Response Rate:
                    </Headings>
                  </Box>
                  <Box>
                    <HeadingText className={classes.subtitle}>
                      {editValues.inquiry}
                    </HeadingText>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </BorderAndPadding>
        </CardContent>
      </Card>
    </>
  );
}
export default ContactListForm;
