import React, { useState, useEffect, useContext } from "react";
import { Box, Button, Chip, styled } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import Stepper from "@mui/material/Stepper";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { setRegistrationModal } from "@/hooks/appReducers";
import Auth from "@/auth/Auth";
import { MyAppContext } from "@/contextApi/appContext";
import { BASE_URL } from "@/utils/staticValues";
import { useRouter } from "next/router";
import Image from "next/image";
import onboarding from "./onboarding.module.css";
import { ThreeDots } from "react-loader-spinner";
import Confetti from "react-confetti";
import EmailForm from "./EmailForm";
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import {
  GridOneBuyerOptions,
  GridOneOptions,
  GridTwoBuyerOptions,
  GridTwoOptions,
} from "./onBoardingStepFormStyles";
interface EmailInviteTypes {
  id: number;
  email: string;
}

interface BusinessTypes {
  value: string;
  id: string;
  selected: boolean;
}
interface HeardFromUsOptions {
  value: string;
  id: string;
  selected: boolean;
}
interface PeopleWorkingOptions {
  value: string;
  id: string;
  selected: boolean;
}

const businessTypes: BusinessTypes[] = [
  { value: "Trader/Supplier", id: "Trading Company", selected: false },
  { value: "Manufacturer", id: "Manufacturer", selected: false },
  { value: "Consultant", id: "Consultant", selected: false },

  { value: "EPC Contractor", id: "EPC Contractor", selected: false },
  {
    value: "Governmental Entity",
    id: "Governmental Entity",
    selected: false,
  },
  { value: "Broker", id: "Broker", selected: false },
];

const heardFromUsOptions: HeardFromUsOptions[] = [
  { value: "Billboard", id: "billboard", selected: false },
  { value: "Friend/Colleague", id: "friend_colleague", selected: false },
  { value: "Facebook/Instagram", id: "facebook_instagram", selected: false },
  { value: "Youtube", id: "youtube", selected: false },
  { value: "Linkedin", id: "linkedin", selected: false },
  { value: "Podcast/Radio", id: "podcast_radio", selected: false },
  {
    value: "Search Engine (Google,Bing,etc)",
    id: "search_engine",
    selected: false,
  },
  { value: "Other", id: "other", selected: false },
];

const peopleWorkingOptions: PeopleWorkingOptions[] = [
  { value: "Fewer than 5", id: "1", selected: false },
  { value: "5 - 10", id: "5 - 10", selected: false },
  { value: "11 - 50", id: "11 - 50", selected: false },
  { value: "51 - 100", id: "51 - 100", selected: false },
  { value: "101 - 200", id: "101 - 200", selected: false },
  { value: "201 - 300", id: "201 - 300", selected: false },
  { value: "301 - 400", id: "301 - 400", selected: false },
  { value: "401 - 500", id: "401 - 500", selected: false },
  { value: "501 - 1000", id: "501 - 1000", selected: false },
  { value: "Above 1000", id: "Above 1000", selected: false },
];

export const Welcome = () => {
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const { user_info } = useSelector((state: any) => state.userData);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
  }, []);
  const { setCompleteScreenLoader } = useContext(MyAppContext);
  const dispatch = useAppDispatch();
  const [bizTypes, setBizTypes] = useState<any>([
    ...GridOneOptions,
    ...GridTwoOptions,
  ]);
  const [bizTypesBuyer, setBizTypesBuyer] = useState<any>([
    ...GridOneBuyerOptions,
    ...GridTwoBuyerOptions,
  ]);

  const [hearAboutUsFrom, setHearAboutUsFrom] =
    useState<HeardFromUsOptions[]>(heardFromUsOptions);
  const [peopleStrength, setPeopleStrength] =
    useState<PeopleWorkingOptions[]>(peopleWorkingOptions);
  const [activeStep, setActiveStep] = React.useState(-1);
  const [emailInvites, setEmailInvites] = useState<EmailInviteTypes[]>([]);
  const [currentActiveMail, setCurrentActiveMail] = useState<number>();
  const [progressValues, setProgressValues] = useState<number>(0);
  const [error, setError] = useState<any>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [detail, setDetail] = useState<any>({});
  const [onBoardingStepsData, setOnBoardingStepsData] = useState<any>({});

  useEffect(() => {
    setOnBoardingStepsData(
      localStorage?.onBoardingSteps
        ? JSON.parse(localStorage.getItem(`onBoardingSteps`))
        : null
    );
  }, []);

  useEffect(() => {
    try {
      const nameinfo = localStorage.getItem("userData");
      setDetail(JSON.parse(nameinfo));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const steps = ["", "", "", "", "", ""];

  const ModalContainer = styled("div")({
    width: "1000px",
    height: "480px",
    background: "white",
    position: "absolute",
    zIndex: 100,

    borderRadius: "6px",
    margin: "0 auto",
    alignItems: "center",
    boxShadow:
      "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
    display: "flex",
    justifyContent: "space-between",
    padding: "0 30px",
    "@media screen and (max-width: 1024px)": {
      width: "90%",
      height: "auto",
      padding: "20px",
    },
    "@media screen and (max-width:800px)": {
      padding: "20px",
    },
    "@media screen and (max-width: 767px)": {
      width: "90%",
      // padding: "10px 10px",
      padding: "30px 10px",
    },
    "@media screen and (max-width:600px)": {
      display: "block",
      height: "auto",
    },
  });

  const Overlay = styled("div")({
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 2,
    cursor: "pointer",

    background: "url('/assets/blurred.jpg') center",
  });

  const OuterMostContainer = styled("div")({
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(35, 31, 32, 0.5)",
    position: "absolute",
    top: "50%",
    left: "50%",
    fontSize: "50px",
    color: "white",
    transform: "translate(-50%,-50%)",
    "@media  (max-device-width: 900px) and (orientation: portrait)": {
      height: "100%",
      maxHeight: "100%",
    },
  });

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
      // padding: "0 10px",
      padding: "0",
      margin: "0",
    },
    "@media screen and (max-width: 600px)": {
      padding: "0",
    },
  });

  const StepContainer = styled("div")({
    display: "flex",
    width: "100%",
    gap: "10px",
    fontFamily: "open sans",
    minHeight: "240px",
    "@media screen and (max-width: 800px)": { minHeight: "auto", padding: 0 },
  });

  const StepContentContainer: any = styled("div")(({ activeStep }: any) => ({
    display: "flex",
    justifyContent: activeStep?.step1 ? "flex-end" : "center",
    alignItems: "flex-start",
    flexDirection: "column",
  }));

  const StepContentHeading: any = styled("div")(({ activeStep }: any) => ({
    fontWeight: 600,
    fontSize: "26px",
    color: "#231F20",
    width: "100%",
    textAlign: "start",
    "@media screen and (max-width: 1024px)": { fontSize: "20px" },
    "@media screen and (max-width:767px)": { fontSize: "15px" },
    "& img": {
      "@media screen and (max-width: 600px)": {
        width: "25px",
      },
    },
    "& .textspacing": {
      padding: "0 0 0 5px",
    },
    "& .forthstep": {
      "@media screen and (max-width:767px)": {
        margin: "7px 0 0 6px",
        padding: 0,
      },
    },
    "& .onlyimage": {
      margin: "-15px 0 0",
    },
  }));
  const StepContentHeadingFirst: any = styled("div")(({ activeStep }: any) => ({
    fontWeight: 600,
    fontSize: "26px",
    color: "#231F20",
    width: "100%",
    textAlign: "start",
    "@media screen and (max-width: 1024px)": { fontSize: "20px" },
    "@media screen and (max-width:600px)": {
      fontSize: "15px",
      textAlign: "center",
    },
    "& img": {
      "@media screen and (max-width: 600px)": { width: "25px" },
    },
  }));
  const StepContentSubHeading: any = styled("p")(({ activeStep }: any) => ({
    fontWeight: 300,
    fontSize: "16px",
    color: "rgba(35, 31, 32, 0.6)",
    "@media screen and (max-width: 1024px)": {
      margin: "0 auto",
      fontSize: "14px",
    },
  }));

  const StepContent: any = styled("div")(({ flexDir }: any) => ({
    color: "#9E9E9E",
    fontSize: "14px",
    paddingTop: "15px",
    maxWidth: "100%",
    flexDirection: flexDir?.column ? "column" : "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "@media screen and (max-width: 600px)": {
      textAlign: "center",
    },
  }));

  const StepContentFirst: any = styled("div")(({ flexDir }: any) => ({
    color: "#9E9E9E",
    fontSize: "14px",
    paddingTop: "15px",
    maxWidth: "100%",
    flexDirection: flexDir?.column ? "column" : "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "@media screen and (max-width: 600px)": {
      textAlign: "center",
    },
  }));
  const ErrorBox: any = styled("div")(({ flexDir }: any) => ({
    color: "#d7282f",
    fontSize: "12px",
    marginTop: "5px",
    //  position:"absolute"
    alignItems: "center",
  }));

  const LightTextHeading: any = styled("span")(({ activeStep }: any) => ({
    fontWeight: 300,
    padding: "0",
    "@media screen and (max-width: 800px)": {},
    "& br": {
      display: "none",
    },
  }));

  const LightTextHeadingssForth: any = styled("div")(({ activeStep }: any) => ({
    fontWeight: 300,
    padding: "0 0 0 15px",
    "@media screen and (max-width: 800px)": {
      padding: "0 0 10px 15px",
    },
    "& br": {
      display: "none",
    },
  }));

  const StepFooterButtonContainer: any = styled("div")(({ buttons }: any) => ({
    display: "flex",
    justifyContent: buttons?.two ? "space-between" : "flex-end",
    margin: "2rem 0 0",
    gap: "15px",
    "@media screen and (max-width: 1100px)": {
      margin: "0rem 0 2rem",
    },
    "@media screen and (max-width: 1024px)": {
      margin: "1rem 0 0",
    },
    "@media screen and (max-width: 767px)": {
      margin: "10px 0 0",
    },
    "@media (min-width:1025px) and (max-width:1100px)": {
      marginTop: "15px",
    },
  }));

  const CustomButton = styled(Button)({
    textTransform: "none",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "19px",
    minWidth: "82px",
    TextTransform: "capitalize",
    background: "#D7282F",
    color: "white",
    height: "37px !important",
    paddingLeft: "20px",
    paddingRight: "20px",

    "&:hover": {
      background: "#D7282F",
    },
    borderRadius: "6px",
    boxShadow:
      "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  });

  const EmailFormOuter = styled("div")({
    width: "100%",
  });
  const ChipOuterContainer = styled("div")({
    gap: "2px",
    marginTop: "10px",
    width: "100%",
    "& .MuiButtonBase-root": {
      margin: "2px",
    },
    "& .MuiChip-label": {
      fontSize: "12px",
    },
  });

  const ToggleButtonContainer = styled("div")({
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    marginTop: "15px",
    "@media screen and (max-width:1024px)": {
      gap: "5px",
      marginTop: 0,
    },
    "@media screen and (max-width:600px)": {
      height: "100px",
      overflowY: "scroll",
      gap: "5px",
      margin: 0,
    },
    "& .bg_colr": {
      background: "rgba(35, 31, 32, 0.2)",
      width: "40px",
      height: "34px",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      alignSelf: "center",
      padding: "8px",
      "@media screen and (max-width:1024px)": { height: "33px", width: "32px", padding:"5px 3px" },
      "@media screen and (max-width:767px)": { height: "26px" },
    },
    "& .bg_colr:hover": {
      color: "#fff",
    },
  });

  const CustomToggleButton: any = styled(ToggleButton)(({ value }: any) => ({
    padding: "0",
    textTransform: "none",
    background: "#fff",
    outline: "none",
    borderRadius: "6px",
    fontWeight: 400,
    fontSize: "13px",
    lineHeight: "121.9%",
    fontFamily: "open sans",
    border: value ? "2px solid #D7282F" : "2px solid #231F20",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "3px",
    height: "38px",
    color: "#231F20",
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "#000",
      background: "#fff",
    },
    "&.Mui-selected .bg_colr": {
      background: "#F7D4D5",
      borderRadius: "6px 0px 0 6px",
    },
    "&:hover": {
      background: "#D7282F",
      color: "#fff",
      borderColor: "#D7282F",
    },
    "@media screen and (max-width: 747px)": {
      fontSize: "10px",
      height: "30px",
    },
  }));

  const Step2Image = styled("img")({});

  const Step3Image = styled("img")({});

  const Step4Image = styled("img")({});

  const Step5Image = styled("img")({});
  const deleteEmail = (id: any) => {
    setEmailInvites((prev): any =>
      prev.filter((element) => element?.id !== id)
    );

    if (emailInvites?.length === 1) {
      setCurrentActiveMail(-1);
    }
  };

  const handleStep2Next = () => {
    let selectedBusiness;
    if (user_info?.type == "seller") {
      selectedBusiness = bizTypes?.filter(
        (element) => element?.selected === true
      );
    } else {
      selectedBusiness = bizTypesBuyer?.filter(
        (element) => element?.selected === true
      );
    }
    if (selectedBusiness?.length == 0) {
      setError("Please select at least one option");
    } else {
      if (selectedBusiness?.length <= 3) {
        setActiveStep((prev) => prev + 1);
        handleProgressChange("add");
        localStorage.setItem(
          `onBoardingSteps`,
          JSON.stringify({ ...onBoardingStepsData, bizTypes })
        );
        // if (router.pathname === '/onBoardingStepForm/Welcome') {
        // router.push(`/onBoardingStepForm/onboardingStepForm?step=${activeStep + 1}`);
        // }
        router.push(`/OnBoardingStepForm?Step-${activeStep + 1}`);
      } else {
        setError("You cannot select more than 3 business types");
      }
    }
    return;
  };

  const handleStep3Next = () => {
    if (hearAboutUsFrom.filter((element) => element?.selected)?.length > 0) {
      setActiveStep((prev) => prev + 1);
      handleProgressChange("add");
      localStorage.setItem(
        `onBoardingSteps`,
        JSON.stringify({ ...onBoardingStepsData, hearAboutUsFrom })
      );
      router.push(`/OnBoardingStepForm?Step-${activeStep + 1}`);
    } else {
      setError("Please select at least one option");
      return;
    }
  };

  const handleStep4Next = () => {
    if (
      peopleStrength?.filter((element) => element?.selected === true)?.length >
      0
    ) {
      setActiveStep((prev) => prev + 1);
      handleProgressChange("add");
      localStorage.setItem(
        `onBoardingSteps`,
        JSON.stringify({ ...onBoardingStepsData, peopleStrength })
      );
      router.push(`/OnBoardingStepForm?Step-${activeStep + 1}`);
    } else {
      setError("Please select at least one option");
      return;
    }
  };

  const handleBizSelection = (index: number, selected: boolean) => {
    setError("");
    if (user_info?.type == "seller") {
      const selectBizType = [...bizTypes];
      selectBizType[index].selected = !selected;
      setBizTypes(selectBizType);
    } else {
      const selectBizType = [...bizTypesBuyer];
      selectBizType[index].selected = !selected;
      setBizTypesBuyer(selectBizType);
    }
  };

  const handleHeardFromUs = (id: string) => {
    setHearAboutUsFrom((prev: any) =>
      prev?.map((element: any) => {
        if (element?.id === id) {
          if (!element?.selected)
            return {
              ...element,
              selected: true,
            };
          else if (element?.selected) {
            return {
              ...element,
              selected: false,
            };
          }
        } else {
          return {
            ...element,
          };
        }
      })
    );
  };

  const handlePeopleStrength = (id: string) => {
    setError("");
    setPeopleStrength((prev: any) =>
      prev?.map((element: any) => {
        if (element?.id === id) {
          return {
            ...element,
            selected: true,
          };
        } else {
          return {
            ...element,
            selected: false,
          };
        }
      })
    );
  };

  const handleProgressChange = (arg) => {
    if (arg === "add") setProgressValues((prev): any => prev + 25);
    if (arg === "subtract") setProgressValues((prev): any => prev - 25);
  };
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const step1 = () => {
    return (
      <OuterContainer>
        <StepContainer>
          <StepContentContainer className={onboarding.content_sec}>
            <StepContentHeadingFirst activeStep={{ step1: true }}>
              {" "}
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
              <span>POWER</span> <span style={{ color: "#D7282F" }}>COZMO</span>{" "}
              <br />
              <span>Industrial Leads</span>{" "}
              <span
                style={{
                  display: "inline-block",
                  transform: "translateX(-5px)",
                  color: "red",
                }}
              >
                ,
              </span>
              <span style={{ textTransform: "capitalize" }}>
                {detail?.name}
              </span>
            </StepContentHeadingFirst>
            <StepContentFirst className={onboarding.step_con}>
              The Merchant AD B2B platform will help you generate more leads,
              Increase sales and grow your business.
            </StepContentFirst>
          </StepContentContainer>
        </StepContainer>
        <StepFooterButtonContainer buttons={{ two: false }}>
          <CustomButton
            className={onboarding.outline_btn}
            onClick={() => {
              router.push({
                pathname: "/dashboard/",
              });
              dispatch(setRegistrationModal(true));
            }}
          >
            Skip to Dashboard
          </CustomButton>

          <CustomButton
            className={onboarding.next_btn}
            onClick={() => {
              setActiveStep((prev) => prev + 1);
              setError("");
              handleProgressChange("add");
              router.push(`/OnBoardingStepForm?Step-1`);
            }}
          >
            Let&apos;s go!
          </CustomButton>
        </StepFooterButtonContainer>
      </OuterContainer>
    );
  };

  const step2 = () => {
    return (
      <OuterContainer>
        <StepContainer>
          <StepContentContainer>
            <StepContentHeading activeStep={{ step1: false }}>
              <div className={onboarding.stepscontent}>
                <Image
                  className="onlyimage"
                  src="/assets/businesstype.svg"
                  height={33}
                  width={33}
                  alt="Business"
                />
                <div className="textspacing">
                  <LightTextHeading>What is your &nbsp;</LightTextHeading>
                  Business Types
                  <StepContentSubHeading>
                    {" "}
                    You can select maximum 3 business types
                  </StepContentSubHeading>
                </div>
              </div>
            </StepContentHeading>

            {user_info?.type == "seller" ? (
              <StepContent className="step2rightsection">
                <ToggleButtonContainer>
                  {bizTypes?.map((element, i) => (
                    <CustomToggleButton
                      value={element?.selected}
                      key={element?.id}
                      selected={element?.selected}
                      onChange={() => {
                        handleBizSelection(i, element?.selected);
                      }}
                    >
                      <span className="bg_colr">
                        <CheckCircleOutlineOutlinedIcon
                          style={{ padding: "2.4px" }}
                        />
                      </span>
                      <span className={onboarding.value_name}>
                        {element?.value}
                      </span>
                    </CustomToggleButton>
                  ))}
                </ToggleButtonContainer>
              </StepContent>
            ) : (
              <StepContent className="step2rightsection">
                <ToggleButtonContainer>
                  {bizTypesBuyer?.map((element, i) => (
                    <CustomToggleButton
                      value={element?.selected}
                      key={element?.id}
                      selected={element?.selected}
                      onChange={() => {
                        handleBizSelection(i, element?.selected);
                      }}
                    >
                      <span className="bg_colr">
                        <CheckCircleOutlineOutlinedIcon
                          style={{ padding: "2.4px" }}
                        />
                      </span>
                      <span className={onboarding.value_name}>
                        {element?.value}
                      </span>
                    </CustomToggleButton>
                  ))}
                </ToggleButtonContainer>
              </StepContent>
            )}
            {activeStep == 1 && error !== "" && <ErrorBox>{error}</ErrorBox>}
          </StepContentContainer>
        </StepContainer>

        <StepFooterButtonContainer buttons={{ two: true }}>
          <CustomButton
            className={onboarding.outline_btn}
            onClick={() => {
              setActiveStep((prev) => prev - 1);
              setError("");
              handleProgressChange("subtract");
              router.push(`/OnBoardingStepForm`);
            }}
          >
            Back
          </CustomButton>


          <CustomButton
            className={onboarding.next_btn}
            onClick={() => {
              handleStep2Next();
            }}
          >
            Next
          </CustomButton>
        </StepFooterButtonContainer>
      </OuterContainer>
    );
  };
  const step3 = () => {
    return (
      <OuterContainer>
        <StepContainer>
          <StepContentContainer>
            <StepContentHeading activeStep={{ step1: false }}>
              <div className={onboarding.stepscontent}>
                <Image
                  src="/assets/groupicon.svg"
                  height={33}
                  width={33}
                  alt="Group"
                />
                <LightTextHeadingssForth className="forthstep">
                  How did you hear&nbsp;
                  <b>About Us?</b>
                </LightTextHeadingssForth>
              </div>
            </StepContentHeading>

            <StepContent>
              <ToggleButtonContainer>
                {hearAboutUsFrom?.map((element) => {
                  return (
                    <CustomToggleButton
                      value={element?.selected}
                      key={element?.id}
                      selected={element?.selected}
                      onChange={() => {
                        setError("");
                        handleHeardFromUs(element?.id);
                      }}
                    >
                      <span className="bg_colr">
                        {" "}
                        {
                          <CheckCircleOutlineOutlinedIcon
                            style={{ padding: "2.4px" }}
                          />
                        }{" "}
                      </span>
                      <span className={onboarding.value_name}>
                        {element?.value}
                      </span>
                    </CustomToggleButton>
                  );
                })}
              </ToggleButtonContainer>
            </StepContent>
            {activeStep == 2 && error !== "" && <ErrorBox>{error}</ErrorBox>}
          </StepContentContainer>
        </StepContainer>
        <StepFooterButtonContainer buttons={{ two: true }}>

          <CustomButton
            className={onboarding.outline_btn}
            onClick={() => {
              setActiveStep((prev) => prev - 1);
              setError("");
              handleProgressChange("subtract");
              router.push(`/OnBoardingStepForm?Step-${activeStep - 1}`);
            }}
          >
            Back
          </CustomButton>


          <CustomButton
            className={onboarding.next_btn}
            onClick={() => {
              handleStep3Next();
            }}
          >
            Next
          </CustomButton>

        </StepFooterButtonContainer>
      </OuterContainer>
    );
  };
  const step4 = () => {
    return (
      <OuterContainer>
        <StepContainer>
          <StepContentContainer>
            <StepContentHeading activeStep={{ step1: false }}>
              <div className={onboarding.stepscontent}>
                <span>
                  <Image
                    src="/assets/groupicon.svg"
                    height={33}
                    width={33}
                    alt="Group"
                  />
                </span>
                <div>
                  <LightTextHeadingssForth className="forthstep">
                    How many people will you be <br />
                    <b>Working With?</b>{" "}
                  </LightTextHeadingssForth>
                </div>
              </div>
            </StepContentHeading>

            <StepContent>
              <ToggleButtonContainer>
                {peopleStrength?.map((element) => {
                  return (
                    <CustomToggleButton
                      value={element?.selected}
                      key={element?.id}
                      selected={element?.selected}
                      onChange={() => {
                        handlePeopleStrength(element?.id);
                      }}
                    >
                      <span className="bg_colr">
                        {" "}
                        {
                          <CheckCircleOutlineOutlinedIcon
                            style={{ padding: "2.4px" }}
                          />
                        }{" "}
                      </span>
                      <span className={onboarding.value_name}>
                        {" "}
                        {element?.value}
                      </span>
                    </CustomToggleButton>
                  );
                })}
              </ToggleButtonContainer>
            </StepContent>
            {activeStep == 3 && error !== "" && <ErrorBox>{error}</ErrorBox>}
          </StepContentContainer>
        </StepContainer>
        <StepFooterButtonContainer buttons={{ two: true }}>
          <Box>
            <CustomButton
              className={onboarding.outline_btn}
              onClick={() => {
                setActiveStep((prev) => prev - 1);
                setError("");
                handleProgressChange("subtract");
                router.push(`/OnBoardingStepForm?Step-${activeStep - 1}`);
              }}
            >
              Back
            </CustomButton>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <CustomButton
              className={onboarding.next_btn}
              onClick={() => {
                handleStep4Next();
              }}
            >
              Next
            </CustomButton>
          </Box>
        </StepFooterButtonContainer>
      </OuterContainer>
    );
  };
  const step5 = () => {
    return (
      <OuterContainer>
        <StepContainer>
          <StepContentContainer className={onboarding.container_up}>
            <StepContentHeading activeStep={{ step1: false }}>
              <div style={{ display: "flex" }}>
                <span>
                  <Image
                    src="/assets/people_addicon.svg"
                    height={33}
                    width={33}
                    alt="Add"
                  />
                </span>
                <LightTextHeadingssForth>
                  Invite People to your <b>Workspace?</b>{" "}
                  <StepContentSubHeading>
                    {" "}
                    Enter Email Address (Maximum 5 emails allowed)
                  </StepContentSubHeading>
                </LightTextHeadingssForth>
              </div>
            </StepContentHeading>
            <StepContent
              flexDir={{ column: true }}
              className={onboarding.step_five_con}
            >
              <EmailFormOuter>
                <EmailForm
                  onAddHandler={onAddHandler}
                  emailInvites={emailInvites}
                />
              </EmailFormOuter>
              <ChipOuterContainer>
                {emailInvites?.map((element, i) => (
                  <>
                    <Chip
                      size="small"
                      label={element?.email}
                      onClick={handleClick}
                      onDelete={() => {
                        deleteEmail(element.id);
                      }}
                      key={element.id}
                    />
                  </>
                ))}
              </ChipOuterContainer>
            </StepContent>
          </StepContentContainer>
        </StepContainer>
        <StepFooterButtonContainer buttons={{ two: true }}>
          <CustomButton
            className={onboarding.outline_btn}
            onClick={() => {
              setActiveStep((prev) => prev - 1);
              handleProgressChange("subtract");
              router.push(`/OnBoardingStepForm?Step-${activeStep - 1}`);
            }}
          >
            Back
          </CustomButton>
          <CustomButton
            className={onboarding.next_btn}
            onClick={() => {
              handleProgressChange("add");
              sendOnboardingData();
              dispatch(setRegistrationModal(true));
            }}
            disabled={loader}
          >
            {loader ? (
              <ThreeDots
                height="18"
                width="40"
                radius="9"
                color="white"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              />
            ) : (
              "Go to Dashboard"
            )}
          </CustomButton>
        </StepFooterButtonContainer>
      </OuterContainer>
    );
  };

  const stepReturner = () => {
    if (activeStep === 0) {
      return step1();
    } else if (activeStep === 1) {
      return step2();
    } else if (activeStep === 2) {
      return step3();
    } else if (activeStep === 3) {
      return step4();
    } else if (activeStep === 4) {
      return step5();
    }
  };

  const stepImage1 = "/assets/onboarding/onBoardingStep1.svg";
  const stepImage2 = "/assets/onboarding/onBoardingStep2.svg";
  const stepImage3 = "/assets/onboarding/onBoardingStep3.svg";
  const stepImage4 = "/assets/onboarding/onBoardingStep4.svg";
  const stepImage5 = "/assets/onboarding/onBoardingStep5.svg";

  const Step1Image = styled("img")({});

  const imageReturner = () => {
    if (activeStep === 0) {
      return (
        <Step1Image src={stepImage1} className={onboarding.onboarding_img} />
      );
    } else if (activeStep === 1) {
      return (
        <Step2Image src={stepImage2} className={onboarding.onboarding_img} />
      );
    } else if (activeStep === 2) {
      return (
        <Step3Image
          src={stepImage3}
          className={`${onboarding.onboarding_img} ${onboarding.step_2_img}`}
        />
      );
    } else if (activeStep === 3) {
      return (
        <Step4Image src={stepImage4} className={onboarding.onboarding_img} />
      );
    } else if (activeStep === 4) {
      return (
        <Step5Image
          src={stepImage5}
          className={`${onboarding.onboarding_img} ${onboarding.step_5_img}`}
        />
      );
    }
  };

  /* api for sending onboarding form data */

  const sendOnboardingData = async () => {
    let payload;
    if (user_info?.type === "buyer") {
      payload = {
        business_type_user: bizTypesBuyer
          ?.filter((element) => element?.selected === true)
          .map((element) => ({
            name: element.value,
            toggle: false,
            value: [],
          })),

        hear_about: hearAboutUsFrom
          ?.filter((element) => element?.selected === true)
          .map((element) => ({
            name: element.id,
            is_checked: element.selected,
            values: [],
          })),

        no_of_employee: peopleStrength?.filter(
          (element) => element?.selected === true
        )[0]?.id,
        email_invite: emailInvites,
      };
    } else {
      payload = {
        business_type: bizTypes
          ?.filter((element) => element?.selected === true)
          .map((element) => ({
            name: element.value,
            toggle: false,
            value: [],
          })),

        hear_about: hearAboutUsFrom
          ?.filter((element) => element?.selected === true)
          .map((element) => ({
            name: element.id,
            is_checked: element.selected,
            values: [],
          })),

        no_of_employee: peopleStrength?.filter(
          (element) => element?.selected === true
        )[0]?.id,
        email_invite: emailInvites,
      };
    }
    setCompleteScreenLoader(true);
    setLoader(true);

    try {
      const response = await fetch(`${BASE_URL}/profile/onboardinfo`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setCompleteScreenLoader(false);
      setLoader(false);
      if (data?.status === true) {
        localStorage.removeItem("onBoardingSteps");
        router.push({
          pathname: "/dashboard/",
        });
      }
    } catch (error) {
      setCompleteScreenLoader(false);
      setLoader(false);
    }
  };

  useEffect(() => {
    if (router.query.step) {
      if (`${activeStep}` != router.query.step) {
        setActiveStep(+router.query.step);
        if (onBoardingStepsData?.bizTypes) {
          setBizTypes(onBoardingStepsData?.bizTypes);
        }
        if (onBoardingStepsData?.hearAboutUsFrom) {
          setHearAboutUsFrom(onBoardingStepsData?.hearAboutUsFrom);
        }
        if (onBoardingStepsData?.peopleStrength) {
          setPeopleStrength(onBoardingStepsData?.peopleStrength);
        }
      }
    } else {
      setActiveStep(0);
    }
  }, [router.query.step]);

  const onAddHandler = (email) => {
    setEmailInvites((prev: any) => [...prev, { id: prev.length + 1, email }]);
  };

  return (
    <Overlay>
      <OuterMostContainer>
        <Confetti
          numberOfPieces={300}
          width={windowSize?.width}
          height={windowSize?.height}
        />
        <ModalContainer>
          <div
            className={
              activeStep === 1 || activeStep === 3
                ? onboarding.step_with_text
                : onboarding.step_two
            }
          >
            {imageReturner()}
            {activeStep === 1 && (
              <div className={onboarding.step_twocon}>
                <p
                  style={{
                    fontStyle: "normal",
                    fontWeight: 300,
                    fontSize: "22px",
                    color: "#231F20",
                  }}
                  className={onboarding.text}
                >
                  <span style={{ opacity: "0.7" }}>
                    Take your products to global markets with
                  </span>
                  <span
                    className="spaceremove"
                    style={{
                      display: "inline-block",
                      fontWeight: 600,
                      paddingLeft: "10px",
                    }}
                  >
                    {" "}
                    POWER&nbsp;{" "}
                  </span>
                  <span
                    style={{
                      display: "inline-block",
                      fontWeight: 600,
                      color: "#D7282F",
                    }}
                  >
                    COZMO!
                  </span>
                </p>
              </div>
            )}

            {activeStep === 3 && (
              <div className={onboarding.Maindiv}>
                <p
                  style={{
                    fontStyle: "normal",
                    fontWeight: 300,
                    fontSize: "22px",
                    color: "#231F20",
                  }}
                  className={onboarding.text}
                >
                  <span style={{ opacity: "0.7" }}>Lead the Market with</span>
                  <span
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {" "}
                    POWER&nbsp;{" "}
                  </span>
                  <span
                    style={{
                      fontWeight: 600,
                      color: "#D7282F",
                    }}
                  >
                    COZMO!
                  </span>
                  &nbsp;{" "}
                  <span style={{ opacity: "0.7" }}>Industrial Leads...</span>
                </p>
              </div>
            )}
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                return null;
              })}
            </Stepper>
          </div>
          <Box display={activeStep === 0 ? "block" : "none"}>{step1()}</Box>
          <Box display={activeStep === 1 ? "block" : "none"}>{step2()}</Box>
          <Box display={activeStep === 2 ? "block" : "none"}>{step3()}</Box>
          <Box display={activeStep === 3 ? "block" : "none"}>{step4()}</Box>
          <Box display={activeStep === 4 ? "block" : "none"}>{step5()}</Box>
          <Box
            sx={{
              position: "absolute",
              zIndex: 90,
              width: "100%",
              bottom: 0,
              right: 0,
              height: "6px",
            }}
          ></Box>
        </ModalContainer>
      </OuterMostContainer>
    </Overlay>
  );
};
