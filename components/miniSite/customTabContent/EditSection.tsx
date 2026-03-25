import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { SaveBtn } from "@/components/subDomain/Subdomainstyle";
import { EDITOR_API_KEY } from "@/utils/staticValues";
import { Box } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const EditSection = (props) => {
  const editorRef = useRef(null);
  const {
    setTemplateCustomTab,
    templateCustomTab,
    isEditMode,
    setIsEditMode,
    setOpen,
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const { minisiteUserID } = useSelector((state: any) => state.miniSite);
  const { id: signedInUserId } = useSelector((state: any) => state.userData);

  const onChangeHandler = (value: string, field) => {
    if (field === "content") {
      setTemplateCustomTab((prev) => ({
        ...prev,
        content: value,
      }));
    }
  };

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      // Simulate a delay if needed (replace with actual fetching logic)
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    loadContent();
  }, []);

  return (
    <>
      {!isLoading ? (
        <>
          <Editor
            apiKey={EDITOR_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={templateCustomTab.content}
            onEditorChange={(content) => onChangeHandler(content, "content")}
            init={{
              init_instance_callback: function (editor) {
                const iframeElement = document.querySelector("iframe");
                const scripts = [
                  {
                    src: "https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js",
                    integrity:
                      "sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj",
                    crossorigin: "anonymous",
                  },
                  {
                    src: "https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js",
                    integrity:
                      "sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct",
                    crossorigin: "anonymous",
                  },
                ];

                const editorHeaderElement =
                  document.querySelector(".tox-editor-header");
                const editorStatusElement =
                  document.querySelector(".tox-statusbar");
                const editorBorderMainElement =
                  document.querySelector(".tox-tinymce");
                if (
                  !isEditMode &&
                  editorHeaderElement instanceof HTMLElement &&
                  editorStatusElement instanceof HTMLElement &&
                  editorBorderMainElement instanceof HTMLElement
                ) {
                  editorHeaderElement.style.display = "none";
                  editorStatusElement.style.display = "none";
                  editorBorderMainElement.style.border = "0px";
                }

                const head = editor.getDoc().getElementsByTagName("head")[0];
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.type = "text/css";
                link.href = "https://cdn.muicss.com/mui-0.10.3/css/mui.min.css";
                head.appendChild(link);

                if (iframeElement) {
                  const iframeDocument =
                    iframeElement.contentDocument ||
                    iframeElement.contentWindow.document;

                  scripts.forEach(({ src, integrity, crossorigin }) => {
                    const script = iframeDocument.createElement("script");
                    script.src = src;
                    script.integrity = integrity;
                    script.crossOrigin = crossorigin;
                    const head =
                      iframeDocument.head ||
                      iframeDocument.getElementsByTagName("head")[0];
                    head.appendChild(script);
                  });
                  // Create a script element

                  // Append the script to the head of the iframe
                } else {
                  console.error("Iframe not found");
                }

                var freeTiny: any = document.querySelector(
                  ".tox .tox-notification--in"
                );
                var heightStyle: any = document.querySelector(".tox-edit-area");
                if (freeTiny?.style) freeTiny.style.display = "none";
                if (heightStyle?.style) heightStyle.style.marginTop = "10px";
              },
              editable_root: isEditMode,
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
              content_style: `body {padding-top:${
                isEditMode ? "50px" : "0px"
              };position:relative;} /components/products/editProduct/SmartEditing/style.module.css; @import url(http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,700italic,300,400,700);`,

              content_css: [
                "https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css",
                "/components/products/editProduct/SmartEditing/style.module.css",
                "/style.css",
              ],
              setup: function (editor) {
                editor.on("GetContent", function (e) {
                  e.content = e.content.replace(/<br data-mce-bogus="1">/g, "");
                });
                editor.on("init", function () {
                  const iframeDocument = editor.getDoc();
                  iframeDocument
                    .querySelectorAll('br[data-mce-bogus="1"]')
                    .forEach((el) => el.remove());
                });
              },
            }}
          />
          {isEditMode && (
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
                    top: "155px",
                  },
                  "& .MuiSvgIcon-root": {
                    backgroundColor: "#d7282f",
                    borderRadius: "100%",
                    width: "26px",
                    height: "26px",
                    padding: "3px",
                    color: "#ffffff",
                    opacity: ".87",
                  },
                  "&:hover": {
                    color: "#d7282f",
                    "& .MuiSvgIcon-root": {
                      backgroundColor: "#d7282f",
                      opacity: "1",
                    },
                  },
                }}
                onClick={() => setOpen(true)}
              >
                Select Template
              </Box>
            </LightTooltip>
          )}
          {!isEditMode &&
            templateCustomTab?.content !== "" &&
            minisiteUserID === signedInUserId && (
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <SaveBtn onClick={() => setIsEditMode(true)}>Edit</SaveBtn>
              </Box>
            )}
        </>
      ) : (
        <>Loading skeleton </>
      )}
    </>
  );
};

export default EditSection;
