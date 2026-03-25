import { Box, Button, Typography } from "@mui/material";
import React from "react";
import {
  Addicon,
  AddiconBox,
  Buttonbox,
  CustomizeStoreSubText,
  CustomizeStoreText,
  Foldericon,
} from "../MenuTemplates/MenuStyle";

const TemplateLoadingButton = (props) => {
  const { openTemplateDrawer } = props;
  return (
    <>
      <Box>
        <CustomizeStoreText>Customize Your Store</CustomizeStoreText>
        <CustomizeStoreSubText>
          Customizing your online store with templates enhances user experience
          by aligning with your brand identity, offering responsive designs, and
          enabling easy navigation and clear calls-to-action.
        </CustomizeStoreSubText>
        <Box
          sx={{
            padding: "20px 0 50px 0px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Buttonbox>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <AddiconBox>
                <Button onClick={() => openTemplateDrawer(true)} disableRipple>
                  <img
                    src="/assets/minisiteimages/SelectTemplate.svg"
                    alt="select-img"
                    width={80}
                  />
                  <Typography>Choose Your Ideal Template</Typography>
                </Button>
                <Typography className="btnhelpertext">
                  Elevate your store’s appeal by selecting from a curated
                  collection of stylish templates that perfectly reflect your
                  brand identity.
                </Typography>
              </AddiconBox>
            </Box>
          </Buttonbox>
        </Box>
      </Box>
    </>
  );
};

export default TemplateLoadingButton;
