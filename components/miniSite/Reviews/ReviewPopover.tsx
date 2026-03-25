import * as React from 'react';
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from '@mui/material';

export const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    borderRadius: "13px 13px 0px 0px",
    overFlow: "hidden",
    padding: "0px",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 500,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    "& .MuiTooltip-arrow": {
      display: 'none',
    },
    "&::before": {
      content: "''",
      position: 'absolute',
      left: '14px',
      top: '40%',
      width: '20px',
      height: '20px',
      background: `url('/assets/pop-tip.svg') top center no-repeat`,
      transform: 'translate(-50%, 0%)',
    },
  },
}));
export default function InteractiveList() {
  return (
    <>
    </>
  );
}
