import React, { useState, useEffect, useRef } from "react";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { Box, Typography, styled } from "@mui/material";
import { TypographyProps } from "@mui/material/Typography";

export const LightTooltip2 = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    // backgroundColor: "#fdf3f4",
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid rgb(225, 225, 225)",
    boxShadow: "0 1px 12px 0 rgba(25,27,35,.15)",
    fontSize: "13px",
    padding: "10px 12px",
    letterSpaceing: "0.2px",
    "& .MuiTooltip-arrow:before": {
      color: "white",
      border: "1px solid rgb(225, 225, 225)",
    },
  },
}));

interface props {
  title?: string;
  description?: any;
  StyledTypography?: React.ComponentType<TypographyProps>;
  styles?: React.CSSProperties;
  secondText?: string;
}

const TooltipComponent = ({
  title,
  description,
  StyledTypography,
  styles,
  secondText,
}: props) => {
  const [open, setOpen] = useState(false);
  const tooltipRef = useRef(null);

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const TypographyComponent = StyledTypography || Typography;
  return (
    <>
      <Box>
        <div className="tooltip-container" ref={tooltipRef}>
          <LightTooltip2
            open={open}
            arrow
            title={description}
            placement="top"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <TypographyComponent
              sx={styles}
              id="tooltip-target"
              onMouseEnter={handleMouseEnter}
              // onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            >
              {title}
              {secondText && (
                <Typography sx={{ fontSize: "12px !important" }}>
                  {secondText}
                </Typography>
              )}
            </TypographyComponent>
          </LightTooltip2>
        </div>
      </Box>
    </>
  );
};

export default TooltipComponent;
