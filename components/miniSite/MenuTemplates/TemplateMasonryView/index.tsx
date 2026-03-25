import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { Masonry } from "@mui/lab";
import poststyle from "components/products/editProduct/style.module.css";
import { TemplateMasonryViewProps } from "@/hooks/Interface";

const TemplateMasonryView: React.FC<TemplateMasonryViewProps> = (props) => {
  const { templates, selectTemplate, setOpen, templatetype } = props;
  const [templateType, setTemplateType] = useState<string>("all");
  const [listt, setList] = useState<any>([]);
  const [templateName, setTemplateName] = useState<string>("");

  useEffect(() => {
    setList(templates);
  }, [templates]);

  const filterTemplate = (e) => {
    const { value } = e.target;
    setTemplateName(value);
    if (value === "") {
      setTemplateType("");
      setList(templates);
      return;
    }
    let results = templates?.filter((val) => {
      const result = val?.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
      if (result) {
        return result;
      }
    });
    setList(results);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <FormControl sx={{ width: "200px" }} size="small">
            <InputLabel id="demo-simple-select-label" size="small">
              Select Block
            </InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select Template"
              value={templateType}
              onChange={(e) => {
                setTemplateType(e.target.value);
                if (e.target.value === "all") {
                  setList(templates);
                } else {
                  let results = templates?.filter((val) => {
                    const result = val?.name
                      ?.toLowerCase()
                      .includes(e.target.value?.toLowerCase());
                    if (result) {
                      return result;
                    }
                  });
                  setList(results);
                }
              }}
            >
              <MenuItem value="all">All</MenuItem>
              {templates.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl sx={{ width: "200px" }} size="small">
            <TextField
              size="small"
              placeholder="Search"
              label="Search Block"
              value={templateName}
              onChange={filterTemplate}
            />
          </FormControl>
        </Box>
      </Box>
      <Box sx={{}}>
        <Box sx={{ height: "750px", overflow: "auto", margin: "20px 0 0 0" }}>
          <Masonry columns={{ xs: 1, sm: 1, md: 3, lg: 5, xl: 5 }} spacing={3}>
            {listt.map((item, index) => (
              <Box className={poststyle.contentse}>
                <Box
                  overflow="hidden"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    selectTemplate(item?.id || item?.name, templatetype);
                    setOpen(false);
                  }}
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
                  <Box
                    className={`${poststyle.content_details} ${poststyle.fadeInbottom}`}
                  >
                    <h3 style={{ color: "black" }}>Insert</h3>
                  </Box>
                </Box>
              </Box>
            ))}
          </Masonry>
        </Box>
      </Box>
    </>
  );
};

export default TemplateMasonryView;
