import React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import logoimage from "../../assets/images/power-cozmo-icon 1.svg";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineMobile } from "react-icons/ai";
import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()(() => {
  return {
    inputfield: {
      width: "100% !important",
    },
  };
});
import {
  Wrapper,
  OuterWrapper,
  InputFieldsContainer,
  InputItemContainer,
  UserIconContainer,
  StepHeading,
  StepContainer,
  HeaderContainer,
  SimpleText,
  HeaderHighlightText,
  HeaderTextContainer,
  LogoImage,
  LogoContainer,
  StepFooter,
  Step1FooterBtnContainer,
} from "./styles";

export const QuickSignUp = () => {
  const { classes } = useStyles();
  return (
    <>
      <OuterWrapper>
        <Wrapper>
          <>
            <HeaderContainer>
              <LogoContainer>
                <LogoImage src={logoimage} alt="logo-image"></LogoImage>
              </LogoContainer>
              <HeaderTextContainer>
                <HeaderHighlightText>Quick Signup </HeaderHighlightText>
                <SimpleText>
                  In less than 15 seconds fill your information below...
                </SimpleText>
              </HeaderTextContainer>
            </HeaderContainer>
            <StepContainer>
              <StepHeading>{"Let's start with quick basic info.."}</StepHeading>
              <InputItemContainer>
                <UserIconContainer>
                  <AiOutlineUser />
                </UserIconContainer>
                <TextField
                  className={classes.inputfield}
                  variant="standard"
                  required
                  fullWidth
                  label="Full Name"
                  id="fullName"
                />
              </InputItemContainer>
              <InputFieldsContainer>
                <InputItemContainer>
                  <UserIconContainer>
                    <AiOutlineMail />
                  </UserIconContainer>
                  <TextField
                    className={classes.inputfield}
                    variant="standard"
                    required
                    fullWidth
                    label="Email"
                    id="email"
                  />
                </InputItemContainer>
                <InputItemContainer>
                  <UserIconContainer>
                    <AiOutlineMobile />
                  </UserIconContainer>{" "}
                </InputItemContainer>
              </InputFieldsContainer>
            </StepContainer>
            <StepFooter>
              <Step1FooterBtnContainer>
                <Button
                  style={{
                    fontWeight: "bold",
                    textTransform: "none",
                    backgroundColor: "#1A75FF",
                  }}
                  variant="contained"
                  onClick={() => {}}
                >
                  Sign Up Now
                </Button>
              </Step1FooterBtnContainer>
            </StepFooter>
          </>
        </Wrapper>
      </OuterWrapper>
    </>
  );
};
