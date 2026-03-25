import { Box, Typography } from "@mui/material";
import React from "react";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

const CommonErrorMessage = (props) => {
  const { message } = props;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        // marginLeft: "4px",
    
      }}
    >
      <WarningAmberOutlinedIcon
        style={{
          fontSize: "9px",
          margin: "0px 4px 0 0",
          color: "#d7282f",
        }}
      />
      <Typography
        sx={{
          color: "#D7282F",
          fontSize: "12px",
          lineHeight:"normal"
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default CommonErrorMessage;
