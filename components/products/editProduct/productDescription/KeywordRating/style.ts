import { Box, Chip, styled, Typography } from "@mui/material";
export const KeywordRatingSection = styled(Box)({
  padding: "0",
});
export const EmptyKeywordRating = styled(Box)({
  textAlign: "center",
  padding: "1rem",
  minHeight: "200px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
export const StyledBox = styled(Box)(({ theme }) => ({
  position: "relative",
  border: "1px solid #ccc",
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(2),
}));
export const EmptyHeading = styled(Typography)({
  fontSize: "20px",
  fontWeight: 700,
  color: "#393939",
  padding: "10px 0",
});

export const ManualKeywordChip = styled(Chip)({
  background: "#fff",
  color: "#000",
  margin: "0",
  height: "24px",
});

/** Custom Add Keyword styling **/
export const CustomAddKeywordBox = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  padding: "28px 16px 16px",
  "@media screen and (max-width:767px)": {
    padding: "28px 6px 6px",
  },
});
export const CustomCheckChipBox = styled(Box)({
  border: "1px solid #B3B1B1",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "24px",
  display: "flex",
  paddingRight: "6px",
  borderRadius: "25px",
  cursor: "pointer",
  height: "100%",
  margin: "0 6px 6px 0px",
  alignItems: "center",
  "&:hover": {
    border: "1px solid #d7282f",
    "& svg": {
      color: "#d7282f !Important",
    },
  },
  "& img": {
    borderRadius: "12px 0 0px 12px",
  },
  "& svg": {
    color: "rgba(0, 0, 0, 0.4) !important",
    fontSize: "16px !important",
  },
});
export const RedCheck = styled(Box)({
  position: "relative",
  display: "inline-block",
  width: "22px",
  height: "24px",
  borderTopLeftRadius: "6px",
  borderBottomLeftRadius: "6px",
  border: "none`",
});
export const SuggestedKeywordBox = styled(Box)({
  margin: "0 0 1rem",
  borderTop: "1px solid #ddd",
  padding: "16px",
  "@media screen and (max-width:767px)": {
    padding: "16px 6px",
  },
  "& .MuiTypography-subtitle2": {
    fontSize: "15px",
    fontWeight: 600,
    color: "#393939",
    margin: "0 0 12px",
    "& span": {
      fontSize: "12px",
      fontWeight: 400,
      color: "#9199AA",
    },
    "@media screen and (max-width:767px)": {
      display: "grid",
    },
  },
});
export const SuggestedKeywordChip = styled(Chip)({
  background: "#fff",
  color: "#000",
  margin: "0",
  height: "24px",
  "&:hover": {
    background: "#fff",
  },
});
export const RatingBox = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
});
export const TooltipBox = styled(Box)({
  "& svg": {
    cursor: "pointer",
  },
  "& .redstar": {
    color: "#d7282f",
    opacity: "0.2",
    "&:hover": {
      opacity: 1,
    },
  },
  "& .orangestar": {
    color: "#FFA700",
    opacity: "0.2",
    "&:hover": {
      opacity: 1,
    },
  },
  "& .yellowstar": {
    color: "#F2E803",
    opacity: "0.2",
    "&:hover": {
      opacity: 1,
    },
  },
  "& .lightgreenstar": {
    color: "#92E203",
    opacity: "0.2",
    "&:hover": {
      opacity: 1,
    },
  },
  "& .greenstar": {
    color: "#2CBA00",
    opacity: "0.2",
    "&:hover": {
      opacity: 1,
    },
  },
  "& .opacityONE": {
    opacity: 1,
  },
});
export const RatingValue = styled(Typography)({
  color: "#2CBA00",
  fontSize: "12px",
  fontWeight: "600",
});
export const KRatingButton = styled(Typography)({
  display: "flex",
  justifyContent: "space-between",
  padding: "7px 0 0",
  gap: "15px",
  "& .MuiTypography-body2": {
    color: "#5C5C5C",
    fontSize: "12px",
  },
  "& button": {
    background: "#d7282f",
    padding: "0 27px",
    textTransform: "capitalize",
    height: "32px",
    "&:hover": {
      background: "#c2373c",
    },
  },
});
