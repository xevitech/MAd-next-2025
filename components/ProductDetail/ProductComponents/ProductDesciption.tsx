import React, { useEffect, useState } from "react";
import {
  ProductDetails,
  ProductDetailTxt,
} from "@/components/ProductDetail/style";
import { Box, ButtonBase, Typography, Link } from "@mui/material";

import { NameFromUrl, GetFileExtension } from "@/components/common/common";
import { styled } from "@mui/material";
import { capitalizeFirstLetter } from "@/utils/commonFunctions/other";
import { makeStyles } from "tss-react/mui";
import { useSelector } from "react-redux";
import { ProductDetailHeadingArea } from "./Style";
const DownloadButton = styled(ButtonBase)(() => ({
  gap: 10,
  border: "1px solid #6C6C6C !important",
  color: "#6C6C6C !important",
  alignItems: "center !important",
  fontFamily: "Open Sans !important",
  fontSize: "14px !important",
  fontWeight: 600,
  padding: "3px 10px !important",
  borderRadius: "6px !important",
  "& .MuiTypography-root": {
    color: "#6C6C6C",
    fontFamily: "Open Sans",
    fontSize: 14,
    fontWeight: 400,
    position: "relative",
  },
}));
const useStyles = makeStyles()((theme) => {
  return {
    viewdestxt: { color: "#231f20", fontSize: "12px !important" },
    downloadbtn: {
      "&:hover": {
        background: "#231F20",
        color: "#fff !important",
      },
    },
  };
});
const ProductDesciption = () => {
  const [viewMoredetail, setViewMoreDetail] = useState<boolean>(false);
  const [advertisement, setAdvertise] = useState<any>([]);

  const {
    pre_title_name,
    news,
    description,
    upload_files,
    name,
    stock_keeping_unit,
  } = useSelector((state: any) => state.productDetail.detail.data);

  function downloadCatalogs() {
    let links = upload_files.map((v) => v.source);
    let name = NameFromUrl(links);
    let ext = GetFileExtension(links);
    for (let i = 0; i < links.length; i++) {
      fetch(links[i])
        .then((response) => response.blob())
        .then((blob) => {
          const link = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          link.href = url;
          link.download = `${name}.${ext}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => console.error("Error downloading image:", error));
    }
  }

  const AddingColor = () => {
    if (news?.length > 0) {
      let advertise = [...news];
      for (let i: any = 0; i < advertise.length; i++) {
        if (i === 0) {
          advertise[i] = {
            background: "#ECFBE6",
            color: "#3BB900",
            value: advertise[i],
          };
        } else if (i === 1) {
          advertise[i] = {
            color: "#D7282F",
            background: "#FFE8EC",
            value: advertise[i],
          };
        } else if (i === 2) {
          advertise[i] = {
            color: "#FFA31A",
            background: "#FFF6E8",
            value: advertise[i],
          };
        } else if (advertise[i - 1]?.color === "#FFA31A") {
          advertise[i] = {
            background: "#ECFBE6",
            color: "#3BB900",
            value: advertise[i],
          };
        } else if (advertise[i - 1]?.color === "#3BB900") {
          advertise[i] = {
            color: "#D7282F",
            background: "#FFE8EC",
            value: advertise[i],
          };
        } else {
          advertise[i] = {
            color: "#FFA31A",
            background: "#FFF6E8",
            value: advertise[i],
          };
        }
      }
      setAdvertise(advertise);
    }
  };

  useEffect(() => {
    AddingColor();
  }, []);

  const clickHandler = (e) => {
    const el = e.target.closest("B");
    if (el && e.currentTarget.contains(el)) {
      setViewMoreDetail((prev) => !prev);
    }
  };

  const findLastClosingTag = (htmlContent) => {
    const closingTagRegex = /<\/\w+>/g;
    const closingTags = htmlContent.match(closingTagRegex);
    if (closingTags && closingTags.length > 0) {
      const lastClosingTag = closingTags[closingTags.length - 1];
      return `${description?.substring(
        0,
        description.length - lastClosingTag.length
      )}<b>view less</b> ${lastClosingTag}`;
    } else {
      console.log("No closing tags found.");
    }
  };

  // Call the function with your HTML content

  return (
    <ProductDetails>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          "@media (max-width: 900px)": {
            flexDirection: "column",
            alignItems: "flex-start",
          },
        }}
      >
        <ProductDetailHeadingArea>
          <Typography variant="h1" className="mainpheading">
            {capitalizeFirstLetter(name)?.replace("_", " ")}
          </Typography>
          {pre_title_name !== "" && (
            <Typography variant="body1">
              {capitalizeFirstLetter(pre_title_name)}
            </Typography>
          )}
        </ProductDetailHeadingArea>
        {stock_keeping_unit && (
          <Box
            sx={{
              fontSize: "10px",
              color: "#333333",
              display: "flex",
              whiteSpace: "nowrap",
              gap: "4px",
              background: "#f1f1f1",
              padding: "0 6px",
              borderRadius: "3px",
              border: "1px solid #d2d2d2",
              "@media (max-width: 900px)": {
                marginTop: "6px",
              },
            }}
          >
            <span>SKU ID:</span> {stock_keeping_unit}
          </Box>
        )}
      </Box>
      <ProductDetailTxt>
        {description?.length > 200 ? (
          viewMoredetail ? (
            <>
              <span> {description.replace(/<[^>]+>|&nbsp;/g, "")}</span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setViewMoreDetail(false)}
              >
                <Typography
                  component="span"
                  sx={{
                    marginLeft: "4px",
                    color: "#231F20",
                    fontSize: "13px !important",
                    fontWeight: "600 !important",
                    "&:hover": {
                      color: "#d7282f",
                    },
                  }}
                >
                  View less
                </Typography>
              </span>
            </>
          ) : (
            <span>
              {" "}
              {description.replace(/<[^>]+>|&nbsp;/g, "").slice(0, 200) +
                "..."}{" "}
              {description?.length > 200 && (
                <Link
                  data-tracking="view-more-pdp"
                  underline="none"
                  onClick={(e) => {
                    // e.stopPropagation();
                    setViewMoreDetail(true);
                  }}
                >
                  View more
                </Link>
              )}
            </span>
          )
        ) : (
          <span> {description?.replace(/<[^>]+>|&nbsp;/g, "")}</span>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "8px",
          }}
        ></Box>
      </ProductDetailTxt>
    </ProductDetails>
  );
};
export default ProductDesciption;
