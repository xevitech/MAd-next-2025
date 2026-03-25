import * as React from "react";
import Box from "@mui/material/Box";
import DesktopMenu from "./Desktopmenu";
import { Floatingmenu } from "../FloatingMenu";

const AppNavigationBar = ({ authenticate }) => {
  return (
    <Box>
      {authenticate && <Floatingmenu />}
      <Box display={{ md: "block", xs: "" }}>
        <DesktopMenu />
      </Box>
    </Box>
  );
};

export default AppNavigationBar;
