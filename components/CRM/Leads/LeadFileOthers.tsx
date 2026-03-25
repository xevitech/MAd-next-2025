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
// import { Button, Grid, LinearProgress, Typography } from "@mui/material";
import { Button, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import { FileUpload } from "@/components/common/uploadFile";
import { toast } from "react-toastify";
import { isArray } from "lodash";
import { useSelector } from "react-redux";
import {
  createTaskMeetingCallsHistory,
  deleteFilesForCRM,
  uploadFilesForCRM,
} from "@/hooks/UseCreateFormData";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
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
import { apiClient } from "@/components/common/common";
import { useRouter } from "next/router";
import FilesSkeleton from "../Skeletons/FilesSkeleton";
const LeadFileOthers = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [Files, setFiles] = useState([]);
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  const [crmFilesData, setCrmFilesData] = React.useState([]);
  const [crmFilesLoader, setCrmFilesLoader] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { typeId } = useSelector((state: any) => state.formList);
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

  const getAllListOfCRMFiles = async () => {
    setCrmFilesLoader(true);
    let response = await apiClient(
      `crm/show_crm_images/${router?.query?.id}/${typeId}`,
      "get"
    );
    setCrmFilesLoader(false);
    if (response.status == 200 || response.status == true) {
      setCrmFilesData(response?.data);
    }
  };

  useEffect(() => {
    getAllListOfCRMFiles();
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
      const formData = new FormData();
      formData.append("unique_id", `${router?.query?.id}`);
      formData.append("associated_for", `crm,${typeId}`);
      for (let i = 0; i < files?.length; i++) {
        if (files[i]?.name) {
          formData.append("images[]", files[i]);
        }
      }
      let response = await apiClient(
        "crm/crm_save_file",
        "post",
        { body: formData },
        true
      );
      if (response?.status == 200) {
        dispatch(
          createTaskMeetingCallsHistory({
            lead_id: router?.query?.id,
            name: "Files",
            type: "files",
            message: `<span>File Uploaded - </span> with name <b>${files[0]?.name}</b> `,
          })
        );
        setFiles([]);
        await getAllListOfCRMFiles();
        toast.success(response?.payload?.message);
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
      let response = await apiClient(`crm/delete_crm_images`, "post", {
        body: { id: id, type_id: typeId },
      });
      if (response?.status == 200) {
        await getAllListOfCRMFiles();
        dispatch(
          createTaskMeetingCallsHistory({
            lead_id: router?.query?.id,
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
            {Files &&
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
            {crmFilesData && crmFilesData?.length > 0 && (
              <UpFileHeading variant="h6">All Uploaded Files</UpFileHeading>
            )}
            {crmFilesLoader ? (
              <FilesSkeleton />
            ) : (
              !crmFilesLoader &&crmFilesData &&
              crmFilesData?.length > 0 &&
              crmFilesData?.map((ele, index) => (
                <ProgressBarRow>
                  <Typography className="FilenameNew" variant="body1">
                    {ele?.file_original_name || ele?.name}
                  </Typography>
                  <ProgressUpload>
                    <Typography className="Filesize" variant="body1">
                      {ele?.file_size} KB
                    </Typography>
                  </ProgressUpload>
                  <FileActions>
                  <IconButton
                      aria-label="download"
                      onClick={() => {
                        window.open(ele?.source, "_blank", "noreferrer");
                      }}
                    >
                      <DownloadOutlinedIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => removeFile(ele?.id, index)}
                    >
                      <DeleteOutlineRoundedIcon />
                    </IconButton>
                  </FileActions>
                </ProgressBarRow>
              ))
            )}
          </ProgressBarAreaInner>
        </ProgressBarArea>
      </UploadOuterContainer>
    </>
  );
};

export default LeadFileOthers;
