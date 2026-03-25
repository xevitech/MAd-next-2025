import { Typography } from "@mui/material";
import { AboutLinkCol, AboutUsHeading } from "./Products.styled";
import Divider from "@mui/material/Divider";
export default function AboutLinks() {
  return (
    <>
      {
        <AboutLinkCol>
          <AboutUsHeading pb={"10px"}>
            <Typography variant="h4">About Us</Typography>
          </AboutUsHeading>
          <Divider orientation="horizontal" />
        </AboutLinkCol>
      }
    </>
  );
}
