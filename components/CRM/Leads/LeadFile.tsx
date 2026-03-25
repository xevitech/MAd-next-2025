import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "redux/store";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import {
  BrowseIcon,
  BrowseText,
  DragDropBox,
  FileActions,
  Input,
  LabelAfterUploading,
  LinerProgrssBar,
  ProgressBarArea,
  ProgressBarAreaInner,
  ProgressBarRow,
  ProgressUpload,
  UpFileHeading,
  UploadItem,
  UploadOuterContainer,
  UrlLabel,
} from "../style";
import Image from "next/image";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import { Button, Grid, LinearProgress, Typography } from "@mui/material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { FileUpload } from "@/components/common/uploadFile";
import { toast } from "react-toastify";
import { isArray } from "lodash";
import { useSelector } from "react-redux";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import {
  createHistory,
  deleteFilesForCRM,
  getAllListOfCRMFiles,
  setCrmFilesLoader,
  uploadFilesForCRM,
} from "@/hooks/UseCreateFormData";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

import Box from "@mui/material/Box";
import FilesSkeleton from "../Skeletons/FilesSkeleton";
const LeadFile = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [Files, setFiles] = useState([]);
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const dispatch = useAppDispatch();
  const { crmFilesData, crmFilesLoader, details, typeId } = useSelector(
    (state: any) => state.formList
  );
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    dispatch(getAllListOfCRMFiles());
  }, [dispatch]);

  const addFiles = async (e) => {
    const files = e.target.files;
    let fileSize = e.target.files[0]?.size;
    if (fileSize > 2000000) {
      toast.error("file size must be less than 2MB");
      return;
    }
    if (files?.length == 0) {
      setFiles([files[0]]);
    } else {
      setFiles((prev) => [...prev, ...files]);
    }
    if (files?.length > 0) {
      // return
      // setProgress(100)
      let response = await dispatch(uploadFilesForCRM(files));
      if (response?.payload?.status == 200) {
        dispatch(
          createHistory({
            lead_id: details.unique_id,
            type_id: typeId,
            name: "Files",
            type: "files",
            message: `<span>File Uploaded - </span> with name <b>${files[0]?.name}</b> `,
          })
        );
        setFiles([]);
        toast.success(response?.payload?.message);
      } else {
        setFiles([]);
        dispatch(setCrmFilesLoader(false))
        toast.error('Please select JPG, PNG, PDF format')
      }
    }
  };

  const removeFile = async (id, index) => {
    if (id) {
      setFiles((prev) => {
        let file = prev.filter((element) => element?.id !== id);
        return file;
      });
      if (deletedFiles?.length > 0) {
        setDeletedFiles((prev) => {
          return [...prev, id];
        });
      } else {
        setDeletedFiles([id]);
      }
      let response = await dispatch(deleteFilesForCRM(id));
      if (response?.payload?.status == 200) {
        dispatch(
          createHistory({
            lead_id: details.unique_id,
            type_id: typeId,
            name: "Files",
            type: "files",
            message: `<span>File Deleted </span>`,
          })
        );
        setFiles([]);
        toast.success(response?.payload?.message);
      }
    } else {
      setFiles((prev) => {
        prev.splice(index, 1);
        return [...prev];
      });
    }
  };

  return (
    <>
      <UploadOuterContainer>
        {/* {crmFilesLoader && <LinearProgress variant="determinate" value={progress} />} */}
        <UploadItem>
          <DragDropBox>
            <label htmlFor={"crmFiles"}>
              <BrowseIcon>
                <Image
                  src="/assets/images/crm/browsefile_icon.svg"
                  alt="Edit"
                  width={50}
                  height={30}
                  style={{ color: "#231F20" }}
                />
                <BrowseText>Browse File</BrowseText>
              </BrowseIcon>
            </label>

            <input
              id={"crmFiles"}
              name={"crmFiles"}
              type="file"
              multiple
              style={{ display: "none" }}
              accept={
                "application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
              }
              onChange={(e) => {
                addFiles(e);
              }}
            ></input>
          </DragDropBox>
        </UploadItem>

        <ProgressBarArea>
          <ProgressBarAreaInner>
            {/* <ProgressBarRow>
              <Typography className="FilenameNew" variant="body1">JavaScript Succintly.pdf</Typography>
              <ProgressUpload>
                <Typography className="Filesize" variant="body1">2.8 MB</Typography>
                <LinerProgrssBar>
                  <LinearProgressWithLabel value={progress} />
                </LinerProgrssBar>
              </ProgressUpload>
              <FileActions>
                <IconButton aria-label="delete">
                  <DeleteOutlineRoundedIcon />
                </IconButton>
              </FileActions>
            </ProgressBarRow>
            <ProgressBarRow>
              <Typography className="FilenameNew" variant="body1">JavaScript Succintly.pdf</Typography>
              <ProgressUpload>
                <Typography className="Filesize" variant="body1">2.8 MB</Typography>
                <LinerProgrssBar>
                  <Typography className="sucess_msgg" variant="body1">File Uploaded Successfully</Typography>
                </LinerProgrssBar>
              </ProgressUpload>
              <FileActions>
                <IconButton aria-label="Cancel">
                  <ClearRoundedIcon />
                </IconButton>
              </FileActions>
            </ProgressBarRow>
            <ProgressBarRow>
              <Typography className="FilenameNew" variant="body1">JavaScript Succintly.pdf</Typography>
              <ProgressUpload>
                <Typography className="Filesize" variant="body1">2.8 MB</Typography>
                <LinerProgrssBar>
                  <Typography className="sucess_msgg" variant="body1">File Uploaded Successfully</Typography>
                </LinerProgrssBar>
              </ProgressUpload>
              <FileActions>
                <IconButton aria-label="Cancel">
                  <ClearRoundedIcon />
                </IconButton>
              </FileActions>
            </ProgressBarRow> */}
            {crmFilesLoader && <FilesSkeleton />}
            {!crmFilesLoader &&
              Files &&
              isArray(Files) &&
              Files?.length > 0 &&
              Files?.map((ele, index) => (
                <>
                  <UpFileHeading variant="h6">Uploading</UpFileHeading>
                  <ProgressBarRow>
                    <Typography className="FilenameNew" variant="body1">
                      {ele?.file_original_name || ele?.name}
                    </Typography>
                    <ProgressUpload>
                      <Typography className="Filesize" variant="body1">
                        {ele?.size} KB
                      </Typography>
                      <LinerProgrssBar>
                        <LinearProgressWithLabel value={progress} />
                      </LinerProgrssBar>
                    </ProgressUpload>
                    <FileActions>
                      <IconButton aria-label="delete">
                        <DeleteOutlineRoundedIcon />
                      </IconButton>
                    </FileActions>
                  </ProgressBarRow>
                </>
              ))}
          </ProgressBarAreaInner>

          <ProgressBarAreaInner>
            {/* {!crmFilesLoader && crmFilesData && crmFilesData?.length > 0 && (
              <UpFileHeading variant="h6">All Uploaded Files</UpFileHeading>
            )} */}
            {!crmFilesLoader &&
              crmFilesData &&
              crmFilesData?.length > 0 &&
              crmFilesData?.map((ele, index) => (
                <>
                  <UpFileHeading variant="h6"><span className="upfileDate"><CalendarMonthOutlinedIcon />{ele?.date}</span></UpFileHeading>
                  {ele?.files?.length > 0 && ele?.files?.map((newElement, eleIndex) => (
                    <ProgressBarRow>
                      <Typography className="FilenameNew" variant="body1">
                        {newElement?.file_original_name || newElement?.name}
                      </Typography>
                      <ProgressUpload>
                        <Typography className="Filesize" variant="body1">
                          {newElement?.file_size} KB
                        </Typography>
                      </ProgressUpload>
                      <FileActions>
                        <IconButton
                          aria-label="download"
                          onClick={() => {
                            window.open(newElement?.source, "_blank", "noreferrer");
                          }}
                        >
                          <DownloadOutlinedIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => removeFile(newElement?.id, index)}
                        >
                          <DeleteOutlineRoundedIcon />
                        </IconButton>
                      </FileActions>
                    </ProgressBarRow>
                  ))}
                </>
              ))}
          </ProgressBarAreaInner>
        </ProgressBarArea>
      </UploadOuterContainer>
    </>
  );
};

export default LeadFile;
