import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createStyles } from "@mui/styles";
import { makeStyles } from "tss-react/mui";
import React, { useState, useEffect } from "react";
// import useProductContext from "@/hooks/useProductContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner";
import SelectableAndEditableField from "@/components/common/SelectDropDownwithInput";
import poststyle from "components/products/editProduct/style.module.css";
import {
  AddMetaTextContainer,
  AddMetaText,
  CrossIcon,
  TextDivider,
  InputBox,
  ButtonContainer,
  Buttons,
  Boxborder,
  AbsoluteBox,
  KeywordHeading,
} from "./style";
import { useFormik } from "formik";
import { EditableTextField } from "@/components/products/common/editableTextField";
import { apiClient } from "@/components/common/common";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { fetchData } from "next-auth/client/_utils";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "12px 0px",
  gap: "12px",
  position: "relative",
  width: "100%",
  background: "#FFFFFF",
  borderRadius: "6px",
  margin: "0 auto",
  minHeight: "auto",
};

const AutocompleteStyles = makeStyles()((theme) => {
  return {
    endAdornment: {
      display: "none",
    },
    input: {
      padding: "10px",
    },
    inputRoot: {
      height: "80px",
      overflowY: "auto",
      borderColor: "none",
    },
  };
});

const AddMetaKeyboard = ({ formik, HandlePercentage }) => {
  const { meta_keyword } = formik.values;

  useEffect(() => {
    HandlePercentage("keyword", meta_keyword?.length > 0 ? 3 : 0);
  }, [meta_keyword]);

  const flattenedData = meta_keyword
    ?.map((item) => item?.replace(/[()]/g, ""))
    .flat()
    .flatMap((item) => item?.split(","));

  const uniqueData = [
    ...new Set(
      flattenedData
        ?.filter((item) => !item?.includes("&"))
        ?.map((a) => a?.charAt(0).toUpperCase() + a?.substr(1))
    ),
  ];

  return (
    <>
      <div className={poststyle.add_meta}>
        <div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "6px",
            }}
          >
            <Boxborder>
              <AbsoluteBox>
                <KeywordHeading>
                  Product Keyword
                  <LightTooltip
                    arrow
                    disableInteractive
                    placement="top"
                    title="Required"
                  >
                    <Box
                      component={"span"}
                      sx={{ color: "#d7282f", margin: "0 0 0 6px" }}
                    >
                      *
                    </Box>
                  </LightTooltip>
                </KeywordHeading>
              </AbsoluteBox>
              <SelectableAndEditableField
                placeholder="Please Press Enter After Each Keyword"
                required={true}
                // className={poststyle.metaKeyword}
                // label="Product Keyword"
                name="metaKeyword"
                noOptions={"Enter Keyword"}
                options={[]}
                defaultValue={uniqueData}
                setValues={(value) => {
                  formik.setFieldError("meta_keyword", "");
                  formik.setFieldValue("meta_keyword", value);
                }}
                error={formik.errors.meta_keyword ? true : false}
                errorText={
                  formik.errors.meta_keyword
                    ? `${formik.errors.meta_keyword}`
                    : ""
                }
              />
              {/* <Box sx={{  }}>
                <Select
                  sx={{ width: '150px' }}
                  id="demo-simple-select"
                  size="small"
                >
                  <MenuItem value="Orange">
                    <Box sx={{ backgroundColor: 'Orange', padding: '6px', width: '100%',display:'flex',justifyContent:'center' }}>1</Box>
                  </MenuItem>
                  <MenuItem value="red">
                    <Box sx={{ backgroundColor: 'red', padding: '6px', width: '100%',display:'flex',justifyContent:'center' }}>2</Box>
                  </MenuItem>
                  <MenuItem value="green">
                    <Box sx={{ backgroundColor: 'green', padding: '6px', width: '100%',display:'flex',justifyContent:'center' }}>3</Box>
                  </MenuItem>
                  <MenuItem value="lavender">
                    <Box sx={{ backgroundColor: 'lavender', padding: '6px', width: '100%',display:'flex',justifyContent:'center' }}>4</Box>
                  </MenuItem>
                  <MenuItem value="pink">
                    <Box sx={{ backgroundColor: 'pink', padding: '6px', width: '100%',display:'flex',justifyContent:'center' }}>5</Box>
                  </MenuItem>
                </Select>
              </Box> */}
            </Boxborder>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: "600",
                color: "#4a4a4a",
                opacity: ".8",
                margin: "-6px 0 0 0",
              }}
            >
              Please press the Enter key after listing each product keywords.
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              sx={{ margin: "-6px 0 0 0" }}
            >
              <Typography
                component="span"
                style={{
                  fontFamily: "open sans",
                  fontWeight: "400",
                  fontSize: "12px",
                }}
              >
                Highlight your most important keywords by giving them a higher
                ranking and give lower rankings to less important ones (5 rank
                for most relevant ,1 rank for less relevant). This approach not
                only boosts how easily people can find your product but also
                makes sure that the keywords accurately showcase its features
              </Typography>
              <Typography
                component="span"
                style={{
                  fontFamily: "open sans",
                  fontWeight: "600",
                  fontSize: "12px",
                }}
              >
                Product Keyword is using as an Search Keyword
              </Typography>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};
export default AddMetaKeyboard;
