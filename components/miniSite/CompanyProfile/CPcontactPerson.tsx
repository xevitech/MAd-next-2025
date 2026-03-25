import CPheader from "./CPheaderComponent";
import {
  Box,
  Grid,
  Stack,
  Avatar,
  Skeleton,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { CPsurface, CPtext, CPtextHeadings } from "./CompanyProfile.styled";
import { FirstletterCapital } from "@/components/common/common";
import { useContext, useEffect, useState } from "react";
import { Collapse } from "@mui/material";
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
import { useStyles } from "./CompanyProfile.styled";
import { MyAppContext } from "@/contextApi/appContext";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import { useSelector } from "react-redux";
import CPcontactPersonSkelton from "./CPcontactPersonSkelton";
function ContactPersone({ data }) {
  const { breakPoints } = useContext(MyAppContext);
  const { headerData } = useSelector((state: any) => state.miniSite);
  return (
    <CPsurface>
      <Stack direction="column">
        <Box p={{ xs: 1, md: 2 }} borderBottom="1px solid rgba(34, 51, 84, .1)">
          <Stack justifyContent="center" alignItems="center">
            <Box marginY={{ xs: 2, md: 3 }} textAlign="center">
              <Avatar
                alt={data.name}
                src={data.image}
                sx={{ width: 65, height: 65 }}
                variant="rounded"
              />
            </Box>
            <CPtextHeadings
              sx={{ fontSize: "14px !important", fontWeight: "600 !important" }}
            >
              {data.name}
            </CPtextHeadings>
            <CPtext txtColour="#D7282F" sz="15px">
              ({FirstletterCapital(data.designation)})
            </CPtext>
          </Stack>
        </Box>
        <Box p={{ xs: 1, md: 2 }}>
          <Stack
            justifyContent="space-between"
            alignItems={{
              xs: "flex-start",
              sm: "flex-start",
              md: "flex-start",
              lg: "flex-start",
            }}
            direction={{
              xs: "column",
              sm: "column",
              md: "column",
              lg: "column",
            }}
            gap={{ xs: 1 }}
          >
            <Box>
              <CPtext>
                <MailOutlineIcon></MailOutlineIcon>
                {headerData?.basic_information?.plan_status?.is_true
                  ? data.email
                  : data?.email?.substring(0, 6) +
                    "*".repeat(data?.email?.length - 6)}
              </CPtext>
            </Box>
            <Box>
              <CPtext>
                <PhoneIcon></PhoneIcon>+
                {headerData?.basic_information?.plan_status?.is_true
                  ? `${data.code}-${data.mobile}`
                  : `${data.code}-${
                      data?.mobile?.substring(0, 4) +
                      "*".repeat(data?.mobile?.length - 4)
                    }`}
              </CPtext>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </CPsurface>
  );
}

export default function CPcontactPersone({ contacts, contactLoader }) {
  const { breakPoints } = useContext(MyAppContext);
  const { minisiteUserID } = useSelector((state: any) => state.miniSite);
  const [loader, setLoader] = useState(false);

  // useEffect(() => {
  //   if (minisiteUserID) getContactsList();
  // }, [minisiteUserID]);
  const NavigateHandler = (route) => router.push(route);
  let userid = JSON.parse(localStorage.getItem("userData"))?.id;
  const [checked, setChecked] = useState<boolean>(false);
  const { classes } = useStyles();
  if (contactLoader) {
    return <CPcontactPersonSkelton />;
  }

  return (
    <>
    {contacts?.length > 0 ? (
    <Box>
      <Box mb={{ xs: 2 }}>
        <CPheader
          // icon="/assets/cpicon13.svg"
          icon="icon-contactperson"
          title="Contact Person Details"
          subtitle={null}
          controls={null}
        />
      </Box>

      <Collapse
        in={checked}
        collapsedSize={
           breakPoints.max600px
            ? 230
            : contacts.length > 1
            ? 290
            : breakPoints.max900px
            ? 230
            : 270
        }
      >
        <Grid mb={{ xs: 2 }} container spacing={{ xs: 1, sm: 2 }}>
          {contacts?.length > 0 ? (
            contacts?.map((item) => (
              <Grid item xs={12} sm={4} className={classes.RegionalBox}>
                <ContactPersone data={item} key={item?.id} />
              </Grid>
            ))
          ) : (
            <Grid mb={{ xs: 2 }} container spacing={{ xs: 1, sm: 2 }}>
              <EmptyPage
                logo="/assets/contactperson.svg"
                onClickHandler={() =>
                  NavigateHandler("/companySettings/companyDetails?tab=contact")
                }
                text={"contact person details"}
                actiontext={userid !== minisiteUserID ? false : true}
              />
            </Grid>
          )}
        </Grid>
      </Collapse>

      {(contacts?.length > 3 ||
        (breakPoints.max600px && contacts?.length > 1)) && (
        <>
          <Box
            alignItems="center"
            display="flex"
            justifyContent="center"
            sx={{ marginTop: "10px" }}
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
            {"     "}
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
    ) : (
      []
    )}
    </>
  );
}
