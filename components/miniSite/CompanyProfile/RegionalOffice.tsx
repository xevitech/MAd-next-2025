import CPheader from "./CPheaderComponent";
import { Box, Grid, Stack, Collapse, Skeleton } from "@mui/material";
import {
  CPsurface,
  CPtext,
  CPtextHeadings,
  useStyles,
} from "./CompanyProfile.styled";
import { countryDetail } from "@/components/common/common";
import { useContext, useEffect, useState } from "react";
import CountrySelect from "@/components/common/countrydropdown/Index";
import {
  Blackoutlinebtn,
  Redoutlinebtn,
} from "@/components/common/buttons/ButtonsVariations";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import EmptyPage from "@/components/miniSite/EmptyPages/index";
import router from "next/router";
import { MyAppContext } from "@/contextApi/appContext";
import { useSelector } from "react-redux";
import RegionalOfficeSkelton from "./RegionalOfficeSkelton";
function ContactOffice({ data }) {
  return (
    <CPsurface bg="#FAFAFA" border="1px solid #E8E8E8" height="100%">
      <Stack
        direction="row"
        borderBottom="1px solid #E8E8E8"
        justifyContent="start"
        alignItems="center"
        spacing={1}
        p={{ xs: 1 }}
      >
        <CPtextHeadings style={{ width: "100%", fontSize: "17px," }}>
          <CountrySelect
            style={{ color: "#000" }}
            country={data.country}
            mode={"view"}
          />
        </CPtextHeadings>
      </Stack>
      <Grid container p={{ xs: 1 }} spacing={{ xs: 1 }}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CPtext txtColour="#000">Registered Office Name:</CPtext>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CPtext>{data.officename}</CPtext>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CPtext txtColour="#000">Country/City:</CPtext>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CPtext>
                {countryDetail({
                  key: "name",
                  country_code: data.country,
                  mobile_code: "",
                  country_name: "",
                })}
                /{data.city}
              </CPtext>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CPtext txtColour="#000">Email:</CPtext>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CPtext sx={{ wordBreak: "break-word" }}>{data.email}</CPtext>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CPtext txtColour="#000">Mobile:</CPtext>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CPtext>
                {data.code}-{data.mobile}
              </CPtext>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CPtext txtColour="#000">Full Address:</CPtext>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CPtext>{data.address}</CPtext>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CPsurface>
  );
}

export default function RegionalOffice() {
  const { breakPoints } = useContext(MyAppContext);
  const { classes } = useStyles();
  const [officelist, setofficelist] = useState<any>([]);
  const [checked, setChecked] = useState<boolean>(true);
  const { minisiteUserID } = useSelector((state: any) => state.miniSite);
  const [loader, setLoader] = useState(false);
  const getRegionalOfficeList = async () => {
    setLoader(true);
    try {
      const response = await fetch(
        `${BASE_URL}/mini-site/company_profile/regional_offices/view?user_id=${minisiteUserID}`,
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
        setofficelist(responseJson.data);
      }
      setLoader(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (minisiteUserID) getRegionalOfficeList();
    setChecked(false);
  }, [minisiteUserID]);

  const NavigateHandler = (route) => router.push(route);
  let userid = JSON.parse(localStorage.getItem("userData"))?.id;

  const setBreakPoints = () => {
    const {
      max600px,
      max768px,
      max980px,
      max1024min600px,
      max1024px,
      max1200px,
      max1440px,
      max1460px,
      max1920px,
    } = breakPoints;
    if (max600px) return "280px";
    if (max768px) return "380px";
    if (max980px) return "380px";
    if (max1024px) return "360px";
    if (max1024min600px) return "335px";
    if (max1200px) return "375px";
    if (max1440px) return "335px";
    if (max1460px) return "335px";
    if (max1920px) return "240px";
  };

  if (loader) {
    return <RegionalOfficeSkelton />;
  }

  return (
    <Box>
      <Box mb={{ xs: 2 }}>
        <CPheader
          // icon="/assets/cpicon14.svg"
          icon="icon-regional_offices"
          title="Regional Offices"
          subtitle={null}
          controls={null}
        />
      </Box>

      <Collapse
        in={checked}
        collapsedSize={
          breakPoints.max600px ? 290: officelist?.length > 2 ? 275 : 270
        }
      >
        <Grid mb={{ xs: 2 }} container spacing={{ xs: 1, sm: 2 }}>
          {officelist?.length > 0 ? (
            officelist?.map((item) => (
              <Grid
                item
                xs={12}
                lg={6}
                xl={4}
                md={6}
                className={classes.RegionalBox}
              >
                <ContactOffice data={item} />
              </Grid>
            ))
          ) : (
            <Grid mb={{ xs: 2 }} container spacing={{ xs: 1, sm: 2 }}>
              <EmptyPage
                logo="/assets/rgionaloffice1.svg"
                onClickHandler={() =>
                  NavigateHandler(
                    "/companySettings/companyDetails?tab=regional"
                  )
                }
                text={"regional offices"}
                actiontext={userid !== minisiteUserID ? false : true}
              />
            </Grid>
          )}
        </Grid>
      </Collapse>

      {(officelist?.length >= 3  ||
        (breakPoints.max600px && officelist?.length > 1 )) && (
        <>
          <Box
            alignItems="center"
            display="flex"
            justifyContent="center"
            paddingTop="12px"
          >
            {!checked && (
              <Redoutlinebtn
                height={"25px"}
                onClick={() => setChecked(true)}
                style={{ padding: "16px", marginRight: "12px" }}
              >
                Expand
                <ExpandMoreIcon />
              </Redoutlinebtn>
            )}
            {checked && (
              <Blackoutlinebtn
                height={"25px"}
                onClick={() => setChecked(false)}
                style={{ padding: "16px" }}
              >
                Close
                <ExpandLessIcon />
              </Blackoutlinebtn>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
