import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import poststyle from "components/products/editProduct/style.module.css";
import Image from "next/image";
import { Templates } from "./Template";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Masonry } from "@mui/lab";

const TemplateList = ({ onClose, selectTemplate, selected }) => {
  const [templateType, setTemplateType] = useState<string>("all");
  const [templateName, setTemplateName] = useState<string>("");
  const [list, setList] = useState<any>(Templates);

  useEffect(() => {
    setList(Templates);
  }, [Templates]);

  useEffect(() => {
    if (templateType) {
      if (templateType == "all") {
        setList(Templates);
      } else {
        setList((prev) => Templates.filter((v) => v.type === templateType));
      }
    }
  }, [templateType]);

  const FilterTemplate = (e) => {
    const { value } = e.target;
    setTemplateName(value);
    if (value === "") {
      setTemplateType("");
      setList(Templates);
      return;
    }
    let results = Templates.filter((val) => {
      return val.type.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setList(results);
  };

  // <Grid container spacing={2}>
  //   {list.map((v, i) => (
  //     <Grid
  //       item
  //       xs={3}
  //       alignItems="center"
  //       key={i}
  //       mt={0}
  //       onClick={() => {
  //         selectTemplate(v.id);
  //         onClose(false);
  //       }}
  //     >
  //       <div className={poststyle.contentse}>
  //         <div className={poststyle.content_overlay}></div>
  //         <Box
  //           className={poststyle.coulmn_img_box}
  //           height="150px"
  //           overflow="hidden"
  //           style={{ cursor: "pointer" }}
  //         >
  //           <img
  //             height={200}
  //             width={200}
  //             alt="Template"
  //             src={v.thumbnail}
  //             style={{ width: "100%", cursor: "pointer" }}
  //           />
  //         </Box>
  //         <div
  //           className={`${poststyle.content_details} ${poststyle.fadeInbottom}`}
  //         >
  //           <h3 className={poststyle.contenttitle}>
  //             Insert <FileDownloadIcon className={poststyle.downloadIco} />
  //           </h3>
  //         </div>
  //       </div>
  //     </Grid>
  //   ))}
  // </Grid>;

  return (
    <Box p={2} width={{ xs: "300px", sm: "500px", lg: "800px", xl: "1200px" }}>
      <Box
        pb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography className={poststyle.headingup}>Smart Editing</Typography>
        <CloseIcon
          style={{ cursor: "pointer" }}
          onClick={() => onClose(false)}
        />
      </Box>
      <Divider />
      <Grid container paddingY={2} justifyContent="space-between" gap={"10px"}>
        <Grid item>
          <FormControl sx={{ width: "200px" }} size="small">
            <InputLabel id="demo-simple-select-label" size="small">
              Select Block
            </InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={templateType}
              label="Select Template"
              onChange={(e) => setTemplateType(e.target.value)}
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"about"}>About Us</MenuItem>
              <MenuItem value={"technical specification"}>Technical Specification</MenuItem>
              <MenuItem value={"faq"}>Faq's</MenuItem>
              <MenuItem value={"feature"}>Feature</MenuItem>
              <MenuItem value={"work-gallery"}>Work Gallery</MenuItem>
              <MenuItem value={"feature-post"}>Feature Post</MenuItem>
              <MenuItem value={"return-policy"}>Return Policy</MenuItem>
              <MenuItem value={"packing-details"}>Packing Details</MenuItem>
              <MenuItem value={"shipping-options"}>Shipping Options</MenuItem>
              <MenuItem value={"warranty-information"}>Warranty Information</MenuItem>
              <MenuItem value={"certificate-compliance"}>Certification and Compliance</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={{ width: "200px" }} size="small">
            <TextField
              size="small"
              placeholder="Search"
              value={templateName}
              onChange={FilterTemplate}
              label="Search Block"
            />
          </FormControl>
        </Grid>
      </Grid>

      <Masonry columns={{ xs: 1, sm: 1, md: 3, lg: 5, xl: 5 }} spacing={3}>
        {list.map((item, index) => (
          <div className={poststyle.contentse}>
            <Box
              // className={poststyle.coulmn_img_box}
              onClick={() => {
                console.log('iyem---------------------------', item)
                selectTemplate(item.id);
                onClose(false);
              }}
              overflow="hidden"
              style={{ cursor: "pointer" }}
            >
              <img
                src={`${item.thumbnail}?w=162&auto=format`}
                srcSet={`${item.thumbnail}?w=162&auto=format&dpr=2 2x`}
                alt={"Template"}
                loading="lazy"
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: "block",
                  width: "100%",
                }}
              />
              <div
                className={`${poststyle.content_details} ${poststyle.fadeInbottom}`}
              >
                <h3
                  className={poststyle.contenttitle}
                  style={{ color: "black" }}
                >
                  Insert{" "}
                  <FileDownloadIcon
                    className={poststyle.downloadIco}
                    // style={{ color: "black" }}
                  />
                </h3>
              </div>
            </Box>
          </div>
        ))}
      </Masonry>
    </Box>
  );
};

export default TemplateList;
