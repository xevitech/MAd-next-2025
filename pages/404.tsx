import FooterPage from "@/components/common/include/footerPart";
import HeaderPage from "@/components/common/include/headerPart";
import { purple } from "@mui/material/colors";
import { Box, Button, Typography } from "@mui/material";
const primary = purple[500];
const Custom500 = () => (
  <>
    <HeaderPage />
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "50vh",
        backgroundColor: "",
      }}
    >
      <Typography variant="h1" style={{ color: "black" }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: "black" }}>
        The page you’re looking for doesn’t exist.
      </Typography>
    </Box>
    <FooterPage />
  </>
);

export default Custom500;
