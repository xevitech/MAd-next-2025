import React, { useEffect, useRef, useState } from "react";
import { Box, TextField, Tooltip } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import _debounce from "lodash/debounce";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import TemplateList from "@/components/products/editProduct/SmartEditing/TemplateList";
import { Templates } from "./Template";
import parse from "html-react-parser";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "tss-react/mui";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { EDITOR_API_KEY } from "@/utils/staticValues";
const useStyles = makeStyles()((theme) => {
  return {
    root: {
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          border: "1px solid red",
        },
      },
      "& .Mui-focused": {
        color: "#212529",
      },
    },
  };
});

const EditFields = ({ ActiveTab, tabFormik, index }) => {
  const [tabName, setTabName] = useState<string>("");
  const [toggleDrawer, setToggleDrawer] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number>(0);
  const editorRef = useRef(null);

  useEffect(() => {
  }, [selectedTemplate]);

  const TabHamdler = (tempID) => {
    if (tempID > 0) {
      let { html, name } = Templates.find((v) => v.id == tempID);
      const { tabs } = tabFormik.values;
      let values = [...tabs];
      let collectiveHtml = values[index]["content"]
        ? `${JSON.parse(values[index]["content"])} ${html}`
        : html;
      values[index]["content"] = JSON.stringify(collectiveHtml);
      if (values[index]["title"] === "") {
        values[index]["title"] = name;
      }
      tabFormik.setFieldValue("tabs", values);
    }
  };

  const delayedQuery = React.useRef(
    _debounce((q) => tabFormik.setFieldValue("tabs", q), 10)
  ).current;
  const delayedQueryFortitle = React.useRef(
    _debounce((q) => tabFormik.setFieldValue("tabs", q), 10)
  ).current;

  const onChangeHandler = (value: string, field) => {
    if (index >= 0) {
      const { tabs } = tabFormik.values;
      let values = [...tabs];
      values[index][field] =
        field === "content" ? JSON.stringify(value) : value;
      if (field === "title") {
        setError();
        delayedQueryFortitle(values);
        setTabName(value);
      }
      if (field == "content") {
        delayedQuery(values);
      }
      if (field == "editingType") {
        tabFormik.setFieldValue("tabs", values);
      }
    }
  };


  const Validate = () => {
    if (tabFormik?.errors?.tabs?.[index]?.title) return true;
    else return false;
  };

  const setError = () => {
    if (Object.values(tabFormik.errors).length > 0) {
      if (tabFormik?.errors?.tabs?.length > 0) {
        let errors = [...tabFormik?.errors?.tabs];
        errors[index].title = "";
        tabFormik.setFieldError("tabs", errors);
      }
    }
  };

  const { classes } = useStyles();

  return (
    <>
      <SwipeableDrawer
        anchor="right"
        open={toggleDrawer}
        onClose={() => setToggleDrawer(false)}
        onOpen={() => setToggleDrawer(true)}
      >
        <TemplateList
          onClose={setToggleDrawer}
          selectTemplate={(e) => {
            TabHamdler(e);
            setSelectedTemplate(e);
          }}
          selected={selectedTemplate}
        />
      </SwipeableDrawer>
      {/* */}
      <Box component="div" display="flex" flexDirection="column" gap={2}>
        <Box component="div" display="flex" flexDirection="column" gap={4}>
          <TextField
            classes={{ root: classes.root }}
            {...tabFormik.getFieldProps(`title${index}`)}
            sx={{ width: "100%" }}
            size="small"
            label={
              <div>
                <span
                  style={{
                    paddingRight: "5px",
                    fontWeight: 600,
                    letterSpacing: "0.4px",
                    color: "#1C1C1C",

                    fontFamily: "open sans",
                  }}
                >
                  {"Tab title"}
                </span>

                <LightTooltip
                  placement={"right"}
                  title={`Include a title for the description below.	Description heading`}
                  arrow
                >
                  {
                    <span
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: "16px",
                        height: "16px",
                      }}
                    >
                      <Image
                        src={"/assets/helpIcon.svg"}
                        layout="fill"
                        alt="image"
                      />{" "}
                    </span>
                  }
                </LightTooltip>
              </div>
            }
            placeholder="Enter Tab title"
            value={tabName ? tabName : ActiveTab.title}
            onChange={(e) => onChangeHandler(e.target.value, "title")}
            error={Validate() ? `${tabFormik?.errors?.tabs[index]?.title}` : ""}
            helperText={
              Validate() ? `${tabFormik?.errors?.tabs[index]?.title}` : ""
            }
          />
          <Box
            component="div"
            sx={{
              position: "relative",
            }}
          >
            <Editor
              apiKey={EDITOR_API_KEY}
              onInit={(evt, editor) => (editorRef.current = editor)}
              value={ActiveTab.content ? JSON.parse(ActiveTab.content) : ""}
              onEditorChange={(e, q) =>
                onChangeHandler(q.getContent(), "content")
              }
              init={{
                init_instance_callback: function (editor) {
                  var freeTiny: any = document.querySelector(
                    ".tox .tox-notification--in"
                  );
                  var heightStyle: any =
                    document.querySelector(".tox-edit-area");
                  if (freeTiny?.style) freeTiny.style.display = "none";
                  if (heightStyle?.style) heightStyle.style.marginTop = "10px";
                },
                autoresize_overflow_padding: 10,
                ui_mode: "split",
                min_height: 500,
                automatic_uploads: false,
                images_upload_url: "postAcceptor.php",
                image_uploadtab: true,
                branding: false,
                height: 500,
                menubar: true,
                 font_family_formats: "Open Sans=open-sans,",
                block_formats:
                  "Paragraph=p; div=div; Blockquote=blockquote; Pre=pre",
                style_formats: [
                  {
                    title: "Headers",
                    items: [
                      { title: "Heading 2", block: "h2" },
                      { title: "Heading 3", block: "h3" },
                      { title: "Heading 4", block: "h4" },
                      { title: "Heading 5", block: "h5" },
                      { title: "Heading 6", block: "h6" },
                    ],
                  },
                ],
                plugins: [
                  "autoresize",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "wordcount",
                  "video",
                  "image code",
                  "duplicate",
                ],
                autoresize_max_height: 300,
                toolbar:
                  "undo redo | image code | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat",
                content_style:
                  "body {padding-top:50px;position:relative;} /components/products/editProduct/SmartEditing/style.module.css; @import url(http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,700italic,300,400,700); ",

                content_css: [
                  "https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css",
                  "/components/products/editProduct/SmartEditing/style.module.css",
                  "/style.css",
                ],
              }}
            />
            <LightTooltip
              title="Please Select Template Blocks"
              arrow
              placement="top"
            >
              <Box
                sx={{
                  border: "1px solid #d7282f",
                  cursor: "pointer",
                  position: "absolute",
                  top: "115px",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: "2",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "14px",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  "@media screen and (max-width:440px)": {
                    top: '155px'
                  },
                  "& .MuiSvgIcon-root": {
                    backgroundColor: "#d7282f",
                    borderRadius: "100%",
                    width: "26px",
                    height: "26px",
                    padding: "3px",
                    color: "#ffffff",
                    opacity: '.87'
                  },
                  "&:hover": {
                    color: "#d7282f",
                    "& .MuiSvgIcon-root": {
                      backgroundColor: "#d7282f",
                      opacity: '1'
                    },
                  },
                }}
                onClick={() => setToggleDrawer(true)}
              >
                <AddIcon />
                Select Template
              </Box>
            </LightTooltip>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EditFields;
