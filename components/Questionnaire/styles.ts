import { Box, Button, FormControl, styled, Typography } from "@mui/material";
export const QuestionnaireFormOuter = styled(Box)({});
export const QuestionnaireFormInner = styled(Box)({
  padding: "2rem",
  width: "60%",
  margin: "0 auto",
  "@media screen and (max-width: 1500px)": {
    width: "80%",
  },
  "@media screen and (max-width: 1024px)": {
    width: "100%",
    padding: "10px"
  },
  "& .Mui-checked": {
    color: "#d7282f !important"
  },
  "& .subdescription": {
    padding: "7px 0 12px"
  }
});
export const QuestionnaireContent = styled(Box)({});
export const TopHeadingInfo = styled(Box)({
  textAlign: "left",
  margin: "20px 0 30px",
  "& .headingTxt": {
    fontWeight: 700,
    padding: "5px 0px"
  }
});

export const PersonalInfoPart = styled(Box)({
  background: "#fff",
  padding: "20px",
  border: '1px solid #E0E3E7'
});
export const Heading = styled(Typography)({
  margin: "10px 0 0",
  padding: "4px 8px",
  fontWeight: 700
});
export const HeadingTop = styled(Typography)({
  padding: "0",
  fontWeight: 700
});
export const InfoContent = styled(Box)({
  padding: "1rem 0 0",

});
export const InfoContentInner = styled(Box)({
  margin: "10px 0 0",

});
export const InfoContentInner2 = styled(Box)({
  margin: "10px 0 0",
  "& .sucessbox": {
    background: "#EDF4F1",
    padding: "15px 24px",
    border: "1px solid #0EAC4D",
    margin: "0 0 20px",
    borderRadius: "4px",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      background:"#fff",
      border: "1px solid #00af6a",
      left: "-20px",
      width: "30px",
      height: "30px",
      top: "38%",
      borderRadius: "50px",
    },
    "& svg": {
      fontSize: "18px"
    },
    "& .icondone": {
      position: "absolute",
      left: "-13px",
      top: "46%",
      color: "#fff"
    },
    "& .MuiInputBase-input": {
      background: "#fff"
    }
  },

  "@media screen and (max-width: 1024px)": {
    padding: "0 20px"
  },

});
export const WebFormControl = styled(FormControl)({
});
export const QuestionWeb = styled(Typography)({
  color: "#000",
  fontSize: "15px",
  fontWeight: 600,
  lineHeight: "20px"
});
export const FillAnswerArea = styled(Box)({
  margin: "10px 0 16px",
  "& .myradiobutton": {
    padding: "0 0 0 10px",
    "& .MuiButtonBase-root": {
      padding: "5px"
    },
    "& .MuiTypography-root": {
      fontSize: "14px"
    }
  }
});
export const MyQueryBox = styled(Box)({
  background: "#fff",
  padding: "15px 24px",
  border: "1px solid #E0E3E7",
  margin: "0 0 20px",
  borderRadius: "4px",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    background: "#FFEEEF",
    border: "1px solid #FBDDDD",
    left: "-20px",
    width: "30px",
    height: "30px",
    top: "39%",
    borderRadius: "50px",
  },
  "& svg": {
    fontSize: "18px"
  },
  "& .iconques": {
    position: "absolute",
    left: "-13px",
    top: "44%",
    color: "#d7282f"
  },


});
export const MyQueryBoxSucess = styled(Box)({
});
export const ListRowwUp = styled(Box)({
  margin: "10px 0 0",
  borderRadius: "4px",
  "& .MuiTypography-root": {
    fontSize: "14px"
  }
});
export const ReviewSubmit = styled(Box)({
  textAlign: "right",
  "& button": {
    background: "#d7282f",
    boxShadow: "none",
    "&:hover": {
      background: "#d7282f",
    }
  }
});
/***** New  *****/

export const QuestionarryInfoLeft = styled(Box)({
  textAlign: "center",
  justifyContent: "center",
  border: '1px solid #E0E3E7',
  background: "#f7f7f7",
  position: "relative",
  height: "100%",
  padding: "1rem",
  borderRadius: "4px",
  "& .Qname": {
    fontWeight: 600,
    color: "#000 !important"
  },
  "& .MuiTypography-root": {
    fontSize: 14,
    color: "#4a4a4a"
  }
});
export const QuestionarryInfo = styled(Box)({
  margin: 0,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  "@media screen and (max-width: 767px)": {
    position: "relative",
    padding: "1rem"
  },
});


export const AvtarImg = styled(Box)({
  textAlign: "center",
  justifyContent: "center",
  width: "80px",
  height: "80px",
  display: "inline-block",
  "& img": {
    width: "100%",
    height: "100%",
    borderRadius: "50px",
    objectFit: "cover",
  },
});
export const MyQNameField = styled(Typography)({
  color: "#223354",
  opacity: "0.6",
  fontWeight: 600
});
export const MyQNameValue = styled(Typography)({
  color: "#000",
});
export const QuestionarryInfoRight = styled(Box)({
  height: "100%",
  background: "#f7f7f7",
  padding: "1rem",
  borderRadius: "4px",
  border: '1px solid #E0E3E7'
});
export const QFilledInfoItem = styled(Box)({
  padding: "6px 0px"
});

/***** No Data Found styling *****/
export const QuwstionnaryNoDataFound = styled(Box)({
  textAlign: "center",
  padding: "20px 0"
});
export const QuwstionnaryNoDataInner = styled(Box)({
  "& .MuiTypography-root": {
    fontWeight: 700,
    fontSize: "22px",
    padding: "15px 0"
  },
  "& img": {
    padding: "20px 0"
  }
});
export const QRedButton = styled(Button)({
  background: "#d7282f",
  boxShadow: "none",
  opacity: "85%",
  textTransform:"capitalize",
  "&:hover": {
    background: "#d7282f",
  }
});


