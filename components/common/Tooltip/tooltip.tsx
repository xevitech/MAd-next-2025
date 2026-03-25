import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#fff',
    color: '#000',
    border: '1px solid rgb(225, 225, 225)',
    boxShadow: '0 1px 12px 0 rgba(25,27,35,.15)',
    fontSize: '13px',
    padding: "10px 12px",
    zIndex:"900",
    letterSpaceing: '0.2px',
    '& .MuiTooltip-arrow:before': {
      color: 'white',
      border: '1px solid rgb(225, 225, 225)',
    }
  },
}));