import React from "react";
import Grid from "@mui/material/Grid";
import { ButtonBase, Typography, Modal, styled } from "@mui/material";
import { Box } from "@mui/system";
import registraionstyle from "./registration.module.css";
import router from "next/router";
import { Divider } from "@mui/material";
import { CompleteProfile, ContentArea, WelcomeScrolleble } from "./style";

export const Heading = styled(Typography)(() => ({
  fontSize: "24px",
  fontWeight: "700",
  color: " #D7282F",
  textAlign: "center",
  fontFamily: "Open Sans !important",
}));

export const SubHeading = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: "600",
  color: " #231F20",
  textAlign: "center",
  fontFamily: "Open Sans !important",
}));

export const Img = styled("img")(() => ({
  textAlign: "center",
  marginBottom: "15px",
}));

export const Email = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: "15px",
  "@media (max-width: 600px)": {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));
export const Mailname = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "14px",
  color: "#000000",
}));

export const Mailid = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "14px",
  color: "#34A853",
  marginLeft: "3px",
  "@media (max-width: 600px)": {
    wordBreak: 'break-all',
    textAlign: 'center',
  },
}));

export const Paragraph = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "13px",
  color: "#4A4A4A",
  textAlign: "center",
  marginBottom: "25px",
}));

export const Thirdheading = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "18px",
  color: "#D7282F",
  textAlign: "center",
  marginBottom: "25px",
  "@media (max-width: 480px)": {
    fontSize: "14px",
  },
}));

export const Grid4 = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "14px",
  color: "#231F20",
  textAlign: "left",
  marginBottom: "25px",
}));

export const Butn1 = styled(ButtonBase)(() => ({
  fontWeight: "600",
  fontSize: "13px",
  color: "#FFFFFF",
  borderRadius: "6px",
  height: "38px",
  padding: "22px",
  marginTop: "20px",
  textTransform: "capitalize",
  border: "1px solid #34A853",
  backgroundImage: "linear-gradient(#34A853, #4EBC6B)",
  "&:hover": {
    backgroundImage: "linear-gradient(#409f59, #15782f)",
  },
  "@media (max-width:1024px)": {
    marginTop: '0',
    padding: '16px',
    fontSize: "12px",
  },
  "@media (max-width:899px)": {
    padding: '6px',
    height: "32px"
  },
}));

export const Butn2 = styled(ButtonBase)(() => ({
  fontWeight: "600",
  fontSize: "13px",
  color: "#FFFFFF",
  padding: "22px",
  borderRadius: "6px",
  height: "38px",
  marginTop: "20px",
  textTransform: "capitalize",
  border: "1px solid #D7282F",
  backgroundImage: "linear-gradient(#D7282F, #FA4B52)",
  "&:hover": {
    backgroundImage: "linear-gradient(#a71b21, #cf4247)",
  },
  "@media (max-width: 1024px)": {
    marginTop: '0',
    padding: '16px',
    fontSize: "12px",
  },
  "@media (max-width:899px)": {
    padding: '6px',
    height: "32px"
  },
}));

export const Butn0 = styled(ButtonBase)(() => ({
  float: "right",
}));

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  height: "auto",
  outline: "none",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "6px",
  p: 2,
  "@media (max-width: 899px)": {
    width: '90%',
  },
};


export default function Popup(props) {
  const { open, closeModal, email } = props;
  const NavigateHandler = (route) => {
    router.push(route);
  };

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Butn0
                onClick={() => closeModal()}
                sx={{
                  position: "absolute", top: "10px", right: "10px", "@media screen and (max-width:320px)": {
                    top: '4px', right: '4px'
                  }
                }}
              >
                <img src="/assets/crossimg.svg" alt="" />
              </Butn0>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Box margin="3px 8px 0 0px">
                  <img src="/assets/thumb-up.svg" alt="" />
                </Box>
                <Box>
                  <Heading>Congratulations</Heading>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <SubHeading className={registraionstyle.done_message}>
              Your Registration is Done.
            </SubHeading>
          </Grid>

          <ContentArea>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box display="flex" justifyContent="center">
                <img src="/assets/registeration.svg" alt="" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Email>
                <Mailname sx={{ whiteSpace: 'nowrap' }}>Sign In Account:</Mailname>
                <Mailid>{email}</Mailid>
              </Email>
            </Grid>
            <WelcomeScrolleble>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Paragraph style={{ color: "#4A4A4A" }}>
                  {" "}
                  Your profile is a major identity of business to stand in the market and sell your services to
                  potential buyers. In order to set yourself up for success, be sure
                  to complete your profile.
                </Paragraph>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Thirdheading> Complete Your Profile To: </Thirdheading>
              </Grid>
              <Grid container spacing={1}>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                >
                  <CompleteProfile>
                    <Box marginRight="5px">
                      <img src="/assets/register1.svg" alt="" />
                    </Box>
                    <Box>
                      <Typography className={registraionstyle.completepro_txt}>
                        Get higher support from us
                      </Typography>
                    </Box>
                  </CompleteProfile>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                >
                  <CompleteProfile>
                    <Box marginRight="5px">
                      <img src="/assets/register2.svg" alt="" />
                    </Box>
                    <Box>
                      <Typography className={registraionstyle.completepro_txt}>
                        Your post get seen more
                      </Typography>
                    </Box>
                  </CompleteProfile>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                >
                  <CompleteProfile sx={{ marginBottom: '16px !important' }}>
                    <Box marginRight="5px">
                      <img src="/assets/register3.svg" alt="" />
                    </Box>
                    <Box >
                      <Typography
                        className={registraionstyle.completepro_txt}
                        style={{ border: "none" }}
                      >
                        You will get higher response rate
                      </Typography>
                    </Box>
                  </CompleteProfile>
                </Grid>
              </Grid>
            </WelcomeScrolleble>
          </ContentArea>
          <Divider style={{ borderTop: "1px dashed #7B7979" }} />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className={registraionstyle.btn_outer}>
                <Box
                  sx={{
                    display: "flex", gap: "20px",
                    "@media (max-width: 400px)": {
                      flexDirection: 'column',
                      gap: '12px',
                    },
                  }}
                >
                  <Butn1 onClick={(e) => closeModal()}>
                    Go To Your DashBoard
                  </Butn1>
                  <Butn2 onClick={(e) => { closeModal(), NavigateHandler("/profile/") }}>
                    Complete Your Profile
                  </Butn2>
                </Box>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
