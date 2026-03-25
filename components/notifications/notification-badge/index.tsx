import { Box } from "@mui/material";
import React from "react";
import { NotificationInnerBadge } from "../style";

const NotificationBadge = (props) => {
  const { type = "", count = 0 } = props;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {type}
      <NotificationInnerBadge className="badgeselected">
        {count}
      </NotificationInnerBadge>
    </Box>
  );
};

export default NotificationBadge;
