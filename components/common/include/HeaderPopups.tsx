// import { Box, Menu, styled } from "@mui/material";
// import React, { useState, useRef, useEffect } from "react";
// import { CommonListMenu } from "./style";
// import { Popper, Paper, Typography, Button } from "@mui/material";

// export const StyledPaper = styled(Paper)({
//   maxWidth: "300px",
//   minWidth: "300px",
//   padding: "12px",
//   boxShadow:
//     "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
//   top: "10px",
//   position: "relative",
// });
// const Arrow = styled("div")(({ theme }) => ({
//   width: 0,
//   height: 0,
//   position: 'absolute',
//   top: -12,
//   right: '-10px',

//   '&::before': {
//     content: '""',
//     position: 'absolute',
//     top: 0,
//     right: '0px',
//     transform: 'translateX(-50%)',
//     width: 0,
//     height: 0,
//     borderLeft: '12px solid transparent',
//     borderRight: '12px solid transparent',
//     borderBottom: `12px solid #ddd`,
//   },
//   '&::after': {
//     content: '""',
//     position: 'absolute',
//     top: 2,
//     right: '4px',
//     transform: 'translateX(-50%)',
//     width: 0,
//     height: 0,
//     borderLeft: '10px solid transparent',
//     borderRight: '10px solid transparent',
//     borderBottom: `10px solid #fff`,
//   },
// }));

// function HeaderPopups(props) {
//   const {
//     showPopover,
//     anchorRef,
//     children,
//     headerType
//   } = props;

//   const popperRef = useRef(null);

//   return (
// <>
//   <Box sx={{ position: "relative" }}>
//     <Popper
//       open={showPopover}
//       anchorEl={anchorRef}
//       // placement="top-end"
//       placement="bottom-end"
//       disablePortal
//       modifiers={[
//         {
//           name: 'computeStyles',
//           options: {
//             adaptive: true,
//             gpuAcceleration: true, // Ensures smoother positioning
//           },
//         },
//         // {
//         //   name: 'offset',
//         //   options: {
//         //     offset: [0, 12], // Adjust as needed for your design
//         //   },
//         // },
//       ]}

//       className={`header_popover ${headerType === 'welcome' ? 'user-welcome-popup' : ''}`}
//       sx={{
//         zIndex: 1101,
//       }}
//     >
//       <StyledPaper
//         ref={popperRef}
//       >
//         <Arrow />
//         <Box>{children}</Box>
//       </StyledPaper>
//     </Popper>
//   </Box>
// </>
//   );
// }
// export default HeaderPopups;




// // import { Box, Popper, Paper, styled } from "@mui/material";
// // import React, { useState, useRef, useEffect } from "react";

// // const StyledPaper = styled(Paper)({
// //   maxWidth: "300px",
// //   minWidth: "300px",
// //   padding: "12px",
// //   boxShadow:
// //     "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
// //   top: "10px",
// //   position: "relative",
// // });

// // const Arrow = styled("div")(({ theme }) => ({
// //   width: 0,
// //   height: 0,
// //   position: "absolute",
// //   top: -12,
// //   right: "-10px",
// //   "&::before": {
// //     content: '""',
// //     position: "absolute",
// //     top: 0,
// //     right: "0px",
// //     transform: "translateX(-50%)",
// //     width: 0,
// //     height: 0,
// //     borderLeft: "12px solid transparent",
// //     borderRight: "12px solid transparent",
// //     borderBottom: `12px solid #ddd`,
// //   },
// //   "&::after": {
// //     content: '""',
// //     position: "absolute",
// //     top: 2,
// //     right: "4px",
// //     transform: "translateX(-50%)",
// //     width: 0,
// //     height: 0,
// //     borderLeft: "10px solid transparent",
// //     borderRight: "10px solid transparent",
// //     borderBottom: `10px solid #fff`,
// //   },
// // }));

// // function HeaderPopups(props) {
// //   const { showPopover, anchorRef, children, headerType,  setAnchor } = props;
// //   const [open, setOpen] = useState(showPopover); // Track popper open/close state
// //   const popperRef = useRef(null);

// //   // Handle screen resize event
// //   useEffect(() => {
// //     const handleResize = () => {
// //       if (open) {
// //         setOpen(false); // Close popper on resize
// //       }
// //     };

// //     window.addEventListener("resize", handleResize);

// //     return () => {
// //       window.removeEventListener("resize", handleResize);
// //     };
// //   }, [open]);

// //   // Reposition popper when it's open
// //   useEffect(() => {
// //     setOpen(showPopover); // Update state based on prop change
// //   }, [showPopover]);

// //   return (
// //     <Box sx={{ position: "relative" }}>
// //       <Popper
// //         open={open}
// //         anchorEl={anchorRef}
// //         placement="bottom-end"
// //         disablePortal
// //         className={`header_popover ${headerType === 'welcome' ? 'user-welcome-popup' : ''}`}
// //         sx={{
// //           zIndex: 1101,
// //         }}
// //       >
// //         <StyledPaper ref={popperRef}>
// //           <Arrow />
// //           <Box>{children}</Box>
// //         </StyledPaper>
// //       </Popper>
// //     </Box>
// //   );
// // }

// // export default HeaderPopups;


import { Box, Popper, Paper, styled } from "@mui/material";
import React, { useEffect, useRef } from "react";

export const StyledPaper = styled(Paper)({
  maxWidth: "300px",
  minWidth: "300px",
  padding: "12px",
  boxShadow:
    "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
  top: "10px",
  position: "relative",
});

const Arrow = styled("div")(({ theme }) => ({
  width: 0,
  height: 0,
  position: "absolute",
  top: -12,
  right: "-10px",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: "0px",
    transform: "translateX(-50%)",
    width: 0,
    height: 0,
    borderLeft: "12px solid transparent",
    borderRight: "12px solid transparent",
    borderBottom: `12px solid #ddd`,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 2,
    right: "4px",
    transform: "translateX(-50%)",
    width: 0,
    height: 0,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderBottom: `10px solid #fff`,
  },
}));

function HeaderPopups({ showPopover, setShowPopup, anchorRef, children, headerType }) {
  const popperRef = useRef(null);

  // Close Popper on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (showPopover) {
        setShowPopup(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showPopover, setShowPopup]);

  return (
    <>
      <Box sx={{ position: "relative" }} onMouseLeave={()=> setShowPopup(false)}>
        <Popper
          open={showPopover}
          anchorEl={anchorRef}
          // placement="top-end"
          placement="bottom-end"
          disablePortal
          modifiers={[
            {
              name: 'computeStyles',
              options: {
                adaptive: true,
                gpuAcceleration: true, // Ensures smoother positioning
              },
            },
          ]}

          className={`header_popover ${headerType === 'welcome' ? 'user-welcome-popup' : ''}`}
          sx={{
            zIndex: 1101,
          }}
        >
          <StyledPaper
            ref={popperRef}
          >
            <Arrow />
            <Box>{children}</Box>
          </StyledPaper>
        </Popper>
      </Box>
    </>
  );
}
export default HeaderPopups;



