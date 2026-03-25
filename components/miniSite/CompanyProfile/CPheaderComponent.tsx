import { Box, Stack, IconButton } from "@mui/material";
import Image from "next/image";
import { CertificateHeadText } from "../styled";
import { CPCustomeChip, CPtext } from "./CompanyProfile.styled";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

export default function CPheader({ icon, title, subtitle, controls }: any) {
  const isImagePath =
    typeof icon === "string" &&
    (icon.endsWith(".png") ||
      icon.endsWith(".jpg") ||
      icon.endsWith(".jpeg") ||
      icon.endsWith(".svg"));
  return (
    <Stack
      pb={{ xs: 1, width: "100%" }}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px solid rgba(34, 51, 84, .1)"
    >
      <Stack>
        <Stack
          direction="row"
          justifyContent="start"
          spacing={1.5}
          alignItems="center"
        >
          {icon && (
            <CPCustomeChip component="span">
              {isImagePath ? (
                <Image width={16} height={16} src={icon} alt="icon" />
              ) : (
                <i className={icon}>
                  <span className="path1"></span>
                  <span className="path2"></span>
                  <span className="path3"></span>
                  <span className="path4"></span>
                  <span className="path5"></span>
                  <span className="path6"></span>
                  <span className="path7"></span>
                  <span className="path8"></span>
                </i>
              )}
            </CPCustomeChip>
          )}
          <CertificateHeadText variant="h4">{title} </CertificateHeadText>
        </Stack>
        {subtitle && (
          <Box>
            <CPtext>{subtitle}</CPtext>
          </Box>
        )}
      </Stack>
      {controls && (
        <Stack
          direction="row"
          justifyContent="start"
          spacing={1}
          alignItems="center"
        >
          <IconButton size="medium">
            <KeyboardArrowLeftOutlinedIcon />
          </IconButton>
          <IconButton size="medium">
            <KeyboardArrowRightOutlinedIcon />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
}
