import React from "react";
import { ImagesShowBox } from "../../styled";
import { ComFPatentLblBox } from "@/components/common/uploadFile/styled";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { Button } from "@mui/base";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

const ImageTitleShow = (props) => {
  const { src = "", alt = "alt" } = props;

  return (
    <>
      <ImagesShowBox>
        <ComFPatentLblBox>
          <img
            style={{
              margin: "auto",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "inline-block",
              // maxWidth: "10px",
            }}
            src={src}
            width={30}
            height={30}
            alt={alt}
          />

          <LightTooltip title={alt} arrow placement="top" disableInteractive>
            <span
              style={{
                margin: "auto",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "inline-block",
                maxWidth: "70px",
              }}
            >
              {alt}
            </span>
          </LightTooltip>
          {/* <Button
            style={{ backgroundColor: "#fff" }}
            className="downloadIcon"
           
          > */}
          <VisibilityRoundedIcon
            aria-label="View Image"
            onClick={() => window.open(src, "_blank", "noopener,noreferrer")}
            sx={{ cursor: "pointer" }}
          ></VisibilityRoundedIcon>
          {/* </Button> */}
        </ComFPatentLblBox>
      </ImagesShowBox>
    </>
  );
};

export default ImageTitleShow;
