import { Box } from "@mui/material";
import HeaderStrip from "./HeaderStrip";
const MiniHeader = ({ strip = true }) => {
  return <Box>{strip && <HeaderStrip />}
  </Box>;
};

export default MiniHeader;
