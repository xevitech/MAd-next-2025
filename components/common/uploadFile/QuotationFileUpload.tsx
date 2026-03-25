import React, { useEffect, useRef, useState } from "react";
import { Box, Button, ButtonBase, styled } from "@mui/material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  GetFileExtension,
  NameFromUrl,
  imageSizeMessage,
  imageTypeMessage,
  isArrayofObjects,
  isImageFile,
} from "../common";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { isArray } from "lodash";
import { PatentLblBox } from "./styled";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useSelector } from "react-redux";
import { LightTooltip } from "../Tooltip/tooltip";
import ViewFile from "./ViewFile";
const DownloadButton = styled(ButtonBase)(() => ({
  gap: 5,
  border: "1px solid #6C6C6C",
  color: "#6C6C6C",
  alignItems: "center",
  fontFamily: "Open Sans",
  fontSize: 14,
  fontWeight: 400,
  padding: "5px 10px",
  borderRadius: 6,
  "& .MuiTypography-root": {
    color: "#6C6C6C",
    fontFamily: "Open Sans",
    fontSize: 14,
    fontWeight: 400,
    position: "relative",
  },
}));
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export const QuotationFileUpload = (props: any) => {
  let {
    files,
    updateFiles,
    error,
    mode = "edit",
    name,
    removedFile,
    single,
    alignItem,
    fileType,
    condition,
  } = props;

  const [Files, setFiles] = useState(files);
  const [deletedFiles, setDeletedFiles] = useState([]);
  const { companyDetails } = useSelector((state: any) => state.companyProfile);
  const refContainer = useRef();

  useEffect(() => {
    if (props?.files?.length !== Files?.length) setFiles(files);
  }, [props?.files, Files]);

  const removeFile = (id: number, index: number) => {
    if (id) {
      setFiles((prev: any) => {
        let file = prev.filter((element: any) => element?.id !== id);
        updateFiles(file);
        return file;
      });
      setDeletedFiles((prev) => {
        removedFile([...prev, id]);
        return [...prev, id];
      });
      // if (deletedFiles?.length > 0) {
      //   setDeletedFiles((prev) => {
      //     removedFile([...prev, id]);
      //     return [...prev, id];
      //   });
      // }
      // else {
      //   setDeletedFiles([id]);
      //   removedFile([id]);
      // }
    } else {
      setFiles((prev) => {
        prev.splice(index, 1);
        updateFiles([...prev]);
        return [...prev];
      });
    }
  };

  const downloadCatalogs = () => {
    let links = Files.map((v: any) => v.file_name);
    let name = NameFromUrl(links);
    let ext = GetFileExtension(links);
    fetch(links[0]).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = `${name}.${ext}`;
        alink.click();
      });
    });
  };
  const addFiles = (e: any) => {
    // const files = e.target.files;
    // let fileSize = e.target.files[0]?.size;
    // if (fileSize > 2000000) {
    //   toast.error(imageSizeMessage);
    //   return;
    // }
    // if (fileSize <= 0) {
    //   toast.error("file size must be greater than 0MB");
    //   return;
    // }
    const files = e.target.files;
    const file = files[0];

    if (!file) return;

    const fileSize = file.size;
    const fileType = file.type;

    const allowedImageTypes = [".pdf,.doc,.docx,.xls,.xlsx"];
    const allowedDocTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    const maxImageSize = 2 * 1024 * 1024;
    const maxDocSize = 10 * 1024 * 1024;

    if (fileSize <= 0) {
      toast.error("File size must be greater than 0MB");
      return;
    }

    const isImage = allowedImageTypes.includes(fileType);
    const isDoc = allowedDocTypes.includes(fileType);

    if (isImage) {
      if (fileSize > maxImageSize) {
        toast.error("Image size must be 2MB or less.");
        return;
      }
    } else if (isDoc) {
      if (fileSize > maxDocSize) {
        toast.error("File size must be 10MB or less.");
        return;
      }
    } else {
      toast.error("Please upload PDF, DOC, or XLS files.");
      return;
    }
    if (single) {
      setFiles([files[0]]);
      updateFiles([files[0]]);
    } else {
      if (
        name === "CompanyName" &&
        (e.target.files[0]?.type == "image/jpeg" ||
          e.target.files[0]?.type == "image/jpg" ||
          e.target.files[0]?.type == "image/png" ||
          e.target.files[0].type == "application/pdf")
      ) {
        setFiles((prev) => {
          updateFiles([...prev, ...files]);
          return [...prev, ...files];
        });
      } else if (name === "transaction_documents") {
        setFiles((prev) => {
          updateFiles([...prev, ...files]);
          return [...prev, ...files];
        });
      } else if (
        e.target.files[0]?.type == "image/jpeg" ||
        e.target.files[0]?.type == "image/jpg" ||
        e.target.files[0]?.type == "image/png" 
        // e.target.files[0]?.type == "image/gif"
      ) {
        setFiles((prev) => {
          updateFiles([...prev, ...files]);
          return [...prev, ...files];
        });
      } else {
        // toast.error("Only JPG ,GIF and PNG files are allowed.");
        name === "CompanyName"
          ? error("Please upload only PDF, PNG and JPG")
          : error(imageTypeMessage);
      }
    }
    e.target.value = "";
  };

  if (mode == "edit")
    return (
      <>
        {name == "CompanyName" && (
          <Box
            sx={{
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              flexWrap: `${name == "companyName" ? "" : "wrap"}`,
              gap: "6px",

              "@media screen and (max-width:320px)": {
                display: "block",
                alignItems: "left",
              },
            }}
          >
            <Button
              ref={refContainer}
              sx={{
                marginRight: "8px",
                color: "#d8262f",
                border: "1px solid #d8262f",
                fontSize: "13px",
                padding: "4px 12px",
                "&:hover": {
                  border: "1px solid #b10e16",
                  color: "#b10e16",
                },
              }}
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
            >
              Choose File
              <VisuallyHiddenInput
                type="file"
                accept={fileType || "image/*"}
                onChange={(e) => {
                  addFiles(e);
                  e.target.value = null;
                }}
              />
            </Button>
            {files?.length == 0 &&
            companyDetails?.location_of_registration
              ?.registration_business_licence?.length == 0 ? (
              ""
            ) : (
              <Box
                sx={{
                  display: "flex",
                  gap: "6px",
                  flexWrap: "wrap",
                  "@media screen and (max-width:600px)": {},
                }}
              >
                {Files &&
                  isArray(Files) &&
                  Files?.length > 0 &&
                  Files?.map((ele, index) => {
                    return (
                      <>
                        <span
                          key={index}
                          style={{
                            border: "1px solid #C5C5C5",
                            fontWeight: 400,
                            fontSize: "13px",
                            letterSpacing: "0.09px",
                            color: "#444444",
                            borderRadius: "4px",
                            gap: "5px",
                            alignItems: "center",
                            padding: "7px 3px",
                            display: "flex",
                            width: "135px",
                          }}
                        >
                          <Image
                            style={{ margin: "auto" }}
                            src={"/assets/fileIcon.svg"}
                            width={18}
                            height={18}
                            alt="edit"
                          />
                          <LightTooltip
                            placement="top"
                            title={ele?.file_original_name || ele?.name}
                            arrow
                            disableInteractive
                          >
                            <span
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "inline-block",
                                maxWidth: "100px",
                              }}
                            >
                              {ele?.file_original_name || ele?.name}
                            </span>
                          </LightTooltip>
                          <Box
                            component={"span"}
                            sx={{
                              display: "flex",
                              borderLeft: "1px solid #C5C5C5",
                              paddingLeft: "5px",
                              paddingRight: "5px",
                              cursor: "pointer",
                              position: "relative",
                              margin: "auto",
                              "& svg": {
                                fontSize: "16px",
                              },
                            }}
                          >
                            <CloseOutlinedIcon
                              onClick={() => removeFile(ele?.id, index)}
                            />
                          </Box>
                        </span>
                      </>
                    );
                  })}
              </Box>
            )}
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: alignItem || "center",
            "@media screen and (max-width:767px)": {
              flexDirection: "column-reverse",
              display: "grid",
              justifyContent: "flex-start",
            },
          }}
        >
          {name !== "CompanyName" && (
            <label htmlFor={name}>
              <Box
                sx={{
                  background: "#DD484E",
                  width: "74px",
                  height: "26px",
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                  justifyContent: "center",
                  borderRadius: "6px",
                  fontFamily: "open sans",
                  fontWeight: "600",
                  fontSize: "13px",
                  lineHeight: "19px",
                  minWidth: "80px",
                  color: "#FFFFFF",
                  border: "1px solid",
                  marginRight: "6px",
                  "@media screen and (max-width:767px)": {
                    margin: "0px 0 6px",
                  },
                }}
              >
                {" "}
                <Image
                  src={"/assets/uploadInnerIcon.svg"}
                  height={13}
                  width={9}
                  style={{ marginRight: "5px" }}
                  alt="upload"
                />
                Upload
              </Box>
            </label>
          )}
          {name !== "CompanyName" && (
            <input
              id={name}
              name={name}
              type="file"
              multiple={!single}
              style={{ display: "none" }}
              // accept={fileType || "image/*"}
              accept={name === "transaction_documents" ? "" : "image/*"}
              onChange={(e) => {
                addFiles(e);
                e.target.value = null;
              }}
            ></input>
          )}
          {name !== "CompanyName" && (
            <Box
              sx={{
                display: "flex",
                gap: "6px",
                flexWrap: "wrap",
                "@media screen and (max-width:600px)": {},
              }}
            >
              {Files &&
                isArrayofObjects(Files) &&
                Files?.length > 0 &&
                Files?.map((ele, index) => {
                  return (
                    <>
                      <span
                        key={index}
                        style={{
                          height: "25px",
                          border: "1px solid #C5C5C5",
                          fontWeight: 400,
                          fontSize: "13px",
                          lineHeight: "24px",
                          letterSpacing: "0.09px",
                          color: "#444444",
                          borderRadius: "4px",
                          paddingLeft: "5px",
                          display: "flex",
                          gap: "5px",
                          paddingRight: "5px",
                          alignItems: "center",
                        }}
                      >
                        <span>
                          {" "}
                          {isImageFile(
                            ele?.file_original_name || ele?.name
                          ) && (
                            <ViewFile
                              fileName={ele?.file_original_name}
                              files={Files}
                              fileOriginalName={ele}
                              index={index}
                            />
                          )}
                        </span>
                        {!isImageFile(ele?.file_original_name || ele?.name) && (
                          <Image
                            style={{ margin: "auto" }}
                            src={"/assets/fileIcon.svg"}
                            width={18}
                            height={18}
                            alt="edit"
                          />
                        )}
                        <LightTooltip
                          title={ele?.file_original_name || ele?.name}
                          arrow
                          placement="top"
                          disableInteractive
                        >
                          <span
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "inline-block",
                              maxWidth: "100px",
                            }}
                          >
                            {ele?.file_original_name || ele?.name}
                          </span>
                        </LightTooltip>
                        <span
                          style={{
                            display: "inline-block",
                            borderLeft: "1px solid #C5C5C5",
                            paddingLeft: "5px",
                            paddingRight: "5px",
                            cursor: "pointer",
                            position: "relative",
                            height: "10px",
                            width: "15px",
                            margin: "auto",
                          }}
                        >
                          <Image
                            src={"/assets/crossIcon.svg"}
                            alt="img"
                            layout="fill"
                            onClick={() => removeFile(ele?.id, index)}
                          />
                        </span>
                        {/* {name !== "transaction_documents" && (
                          <span>
                            {" "}
                            <ViewFile
                              fileName={ele?.file_original_name}
                              files={Files}
                              fileOriginalName={ele}
                              index={index}
                            />
                          </span>
                        )} */}
                      </span>
                    </>
                  );
                })}
            </Box>
          )}
        </Box>
      </>
    );
  else if (mode == "view")
    return (
      <Box
        className="PatentProduction"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          alignItems: "center",
          "@media screen and (max-width:767px)": {
            justifyContent: "flex-start", //flex-end
          },
          "@media screen and (max-width:480px)": {
            justifyContent: "flex-start",
          },
        }}
      >
        {Files?.map((element, index) => {
          let extension = element?.source?.split(".");
          const source = element?.id
            ? element?.source
            : element
            ? URL?.createObjectURL(element)
            : "";
          return (
            source && (
              <PatentLblBox key={index}>
                {condition ? (
                  <>
                    {" "}
                    <a
                      target={"blank"}
                      href={element?.source}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img
                        src={source}
                        alt="patent"
                        style={{ width: "18px", height: "18px" }}
                      />
                    </a>
                  </>
                ) : (
                  <Image
                    style={{
                      margin: "auto",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "inline-block",
                      maxWidth: "10px",
                    }}
                    src={"/assets/fileIcon.svg"}
                    width={18}
                    height={18}
                    alt="edit"
                  />
                )}{" "}
                <LightTooltip
                  title={element?.file_original_name || element?.name}
                  arrow
                  placement="top"
                  disableInteractive
                >
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
                    {element?.file_original_name || element?.name}{" "}
                  </span>
                </LightTooltip>
                <a target={"blank"} href={source}>
                  {condition ? (
                    <DownloadButton
                      className="downloadIcon"
                      onClick={downloadCatalogs}
                    >
                      <DownloadOutlinedIcon fontSize="small" />
                    </DownloadButton>
                  ) : (
                    <VisibilityRoundedIcon aria-label="View Image"></VisibilityRoundedIcon>
                  )}
                </a>
              </PatentLblBox>
            )
          );
        })}
      </Box>
    );
};
