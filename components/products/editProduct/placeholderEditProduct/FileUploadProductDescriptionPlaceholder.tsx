import React from "react";
import { Box, Tooltip, styled } from "@mui/material";
import Image from "next/image";
import poststyle from "components/products/editProduct/style.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { apiClient, convertSize, NameFromUrl } from "@/components/common/common";
import { useRouter } from "next/router";
import { isArray } from "lodash";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { toast } from "react-toastify";
import { FileUploaderContent, FileUploaderHeading, ProductDescriptionFileUploader } from "../productDescription/fileUploader/styles";

export const FileUploadProductDescriptionPlaceholder = (props) => {
  const { query }: any = useRouter();
  const { removeFile, file, updateFile } = props;
  const onChangeHandler = (e: any) => {
    const value = e.target.files;
    for (let item of value) {
      if(convertSize(item?.size, "MB") > 15){
        toast.error("File size must not exceed than 15MB");
        return;
      }
    }
    let filed = Object.values(e.target.files);
    updateFile([...file, ...filed]);
    e.target.value = "";
  };

  const RemoveFile = async (id, index) => {
    let formdata = new FormData();
    formdata.append("file_id", id);
    formdata.append("product_id", query.Id);
    let response = await apiClient(
      "product/datasheets/delete",
      "post",
      {
        body: formdata,
      },
      true
    );
    if (response.status === 200) {
      let removedFiles = [...file];
      removedFiles.splice(index, 1);
      updateFile(removedFiles);
    }
  };

  const removefile = (index, id = null) => {
    if (id) {
      RemoveFile(id, index);
    } else {
      let removedFiles = [...file];
      removedFiles.splice(index, 1);
      updateFile(removedFiles);
    }
  };

  return (
    <div>
      <ProductDescriptionFileUploader>
        <FileUploaderHeading>
          <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <p
              style={{
                display: "inline",
              }}
            >
              Upload Datasheet, Drawing, Catalog
            </p>
            {/* <p style={{ color: "#D7282F", paddingRight: "4px" }}>*</p> */}
            <p>
              <LightTooltip
                placement={"top"}
                title={
                  "Provide additional resources for buyers to understand your product details."
                }
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
            </p>
          </div>
        </FileUploaderHeading>
        <FileUploaderContent>
          <div
            style={{
              display: "flex",
              margin: "10px 0px 10px 20px",
              paddingRight: "20px",
              whiteSpace: "nowrap",
              alignItems: "center",
            }}
          >
            <label htmlFor="fileUpload">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <span style={{ position: "absolute", left: 0 }}>
                  <span
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: "32px",
                      height: "32px",
                    }}
                  >
                    <Image
                      height={32}
                      width={32}
                      src={"/assets/uploadIcon.svg"}
                      alt="img"
                    />{" "}
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-block",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "24px",
                    letterSpacing: "0.09px",
                    color: "#444444",
                    paddingLeft: "42px",
                  }}
                >
                  Browse File
                </span>
              </div>
            </label>
            <input
              type="file"
              id="fileUpload"
              multiple
              accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={(e) => onChangeHandler(e)}
            ></input>
          </div>
          <div
            style={{
              width: "100%",
              borderLeft: "1px solid #BBBBBB",
              padding: "2px 0 2px 12px",
            }}
          >
            {Array.isArray(file) &&
              file?.map((v, i) => {
                const source = v?.id
                  ? v?.source
                  : v
                  ? typeof v === "object"
                    ? URL?.createObjectURL(v)
                    : ""
                  : "";
                return (
                  <div
                    key={i}
                    style={{
                      display: "block",
                      margin: "3px",
                      float: "left",
                    }}
                  >
                    {v && (
                      <LightTooltip
                        title={
                          v?.name ??
                          v?.file_original_name ??
                          NameFromUrl(v?.file_name)
                        }
                        placement="top"
                        arrow
                      >
                        <span
                          style={{
                            display: "flex",
                            height: "28px",
                            border: "1px solid #C5C5C5",
                            fontWeight: 400,
                            fontSize: "13px",
                            lineHeight: "24px",
                            letterSpacing: "0.09px",
                            color: "#444444",
                            borderRadius: "4px",
                            paddingLeft: "5px",
                            alignItems: "Center",
                            // paddingRight: "5px",
                          }}
                        >
                          <Image
                            height={16}
                            width={16}
                            src={"/assets/files.svg"}
                            alt="img"
                          />
                          <span
                            className={poststyle.upload_data}
                            style={
                              {
                                // maxWidth: "50px",
                                // textOverflow: "ellipsis",
                                // overflow: "hidden",
                              }
                            }
                          >
                            {/* <Tooltip
                            title={
                              v?.name ??
                              v?.file_original_name ??
                              NameFromUrl(v?.file_name)
                            }
                            placement="top"
                            arrow
                          > */}
                            {v?.name ??
                              v?.file_original_name ??
                              NameFromUrl(v?.file_name)}
                            {/* </Tooltip> */}
                          </span>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              "& .MuiSvgIcon-root": {
                                fontSize: "18px",
                                cursor: "pointer",
                                "&:hover": {
                                  color: "#DD484E",
                                },
                              },
                            }}
                          >
                            {" "}
                            <a
                              target={"blank"}
                              href={source}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <VisibilityIcon />
                            </a>
                          </Box>
                          <span
                            style={{
                              display: "flex",
                              borderLeft: "1px solid #C5C5C5",
                              cursor: "pointer",
                              position: "relative",
                              height: "16px",
                              width: "30px",
                              margin: "0 0 0 6px",
                              padding: "0px 0 0 9px",
                              alignItems: "center",
                            }}
                            onClick={() => removefile(i, v?.id)}
                          >
                            <Image
                              height={12}
                              width={12}
                              src={"/assets/crossIcon.svg"}
                              alt="img"
                            />
                          </span>
                        </span>
                      </LightTooltip>
                    )}
                  </div>
                );
              })}
          </div>
        </FileUploaderContent>
      </ProductDescriptionFileUploader>
    </div>
  );
};
