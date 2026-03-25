import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { WelcomeModalOuter } from "./style";
export default function WelcomeModal({ open, onClose }) {
  const OuterContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    minHeight: "140px",
    position: "relative",
    zIndex: 1,
    padding: "0 10px 0 30px",
    background: "white",
    borderRadius: "6px",
    paddingLeft: "0px",
    justifyContent: "space-around",
    margin: "0 0 0 40px",
    alignSelf: "center",
    "@media screen and (max-width: 800px)": {
      padding: "0 10px 0 0px",
      margin: "0",
    },
  });
  const StepContentContainer: any = styled("div")(({ activeStep }: any) => ({
    display: "flex",
    justifyContent: activeStep?.step1 ? "flex-end" : "center",
    alignItems: "flex-start",
    flexDirection: "column",
  }));
  const StepContainer = styled("div")({
    display: "flex",
    width: "100%",
    gap: "10px",
    fontFamily: "open sans",
    minHeight: "240px",
    "@media screen and (max-width: 800px)": { minHeight: "auto" },
  });
  const StepContentHeading: any = styled("div")(({ activeStep }: any) => ({
    fontWeight: 600,
    fontSize: "26px",
    color: "#231F20",
    width: "100%",
    textAlign: "start",
    "@media screen and (max-width: 800px)": { fontSize: "20px" },
  }));
  const StepContent: any = styled("div")(({ flexDir }: any) => ({
    color: "#9E9E9E",
    fontSize: "14px",
    paddingTop: "10px",
    maxWidth: "100%",
    flexDirection: flexDir?.column ? "column" : "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "@media screen and (max-width: 600px)": {
      padding: "0px",
      textAlign: "center",
    },
  }));
  let userData = localStorage?.userData
    ? JSON.parse(localStorage?.userData)
    : {};
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <OuterContainer>
          <StepContainer>          
            <StepContentContainer>
              <StepContentHeading activeStep={{ step1: true }}>
                {" "}

               <WelcomeModalOuter><CancelOutlinedIcon onClick={onClose}/>
               </WelcomeModalOuter> 
                <span
                  style={{
                    opacity: "0.8",
                    fontWeight: "300",
                    lineHeight: "30px",
                  }}
                >
                  {" "}
                  Welcome to
                </span>{" "}
                <span>POWER</span>{" "}
                <span style={{ color: "#D7282F" }}>COZMO</span> <br />
                <span>Industrial Leads</span>{" "}
                <span
                  style={{
                    display: "inline-block",
                    transform: "translateX(-5px)",
                    color: "red",
                  }}
                >
                </span>
                <span style={{ textTransform: "capitalize" }}>
                  {userData?.name}
                </span>
              </StepContentHeading>
              <StepContent>
                The Merchant AD B2B platform will help you generate more leads,
                Increase sales and grow your business.
              </StepContent>
            </StepContentContainer>
          </StepContainer>
        </OuterContainer>
      </Dialog>
    </div>
  );
}
