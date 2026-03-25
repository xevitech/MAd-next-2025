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
  LinkTopSection,
  LinksAddColumn,
  LinksButtons,
  LinksList,
  LinksListInner,
  LinksListRow,
  ProgressBarArea,
  ProgressBarAreaInner,
  ProgressBarRow,
  ProgressUpload,
  TaskLinkdOuter,
  UpFileHeading,
  UploadItem,
  UploadOuterContainer,
  UrlLabel,
} from "../style";
import Image from "next/image";
// import { Button, Grid, LinearProgress, Typography } from "@mui/material";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { FileUpload } from "@/components/common/uploadFile";
import { toast } from "react-toastify";
import { isArray } from "lodash";
import { useSelector } from "react-redux";
import {
  createHistory,
  createTaskMeetingCallsHistory,
  deleteFilesForCRM,
  getAllListOfCRMFiles,
  uploadFilesForCRM,
} from "@/hooks/UseCreateFormData";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
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
import { CommonFormcontrol, OutLinedButton } from "../commonStyle";
import { apiClient } from "@/components/common/common";
import { useRouter } from "next/router";
import NotesSkeleton from "../Skeletons/NotesSkeleton";
import { ThreeDots } from "react-loader-spinner";
import UrlSkeleton from "../Skeletons/UrlSkeleton";
const LeadLinks = () => {
  const [label, setLabel] = useState("");
  const [labelError, setLabelError] = useState(false);
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState(false);
  const dispatch = useAppDispatch();
  const [editId, setEditId] = useState("");
  const [urlList, setUrlList] = useState([]);
  const [urlLoader, setUrlLoader] = useState(false);
  const router = useRouter();
  const { typeId } = useSelector((state: any) => state.formList);

  const getAllListOfCRMURL = async () => {
    setUrlLoader(true);
    let response = await apiClient(`crm/crm_links?type_id=${typeId}`, "GET");
    setUrlLoader(false);
    if (response.status == 200 || response.status == true) {
      setUrlList(response?.data);
    }
  };

  useEffect(() => {
    getAllListOfCRMURL();
  }, [dispatch]);

  const saveURL = async () => {
    if (label == "" || label == undefined) {
      setLabelError(true);
    } else if (url == "" || url == undefined) {
      setUrlError(true);
    } else {
      setLabelError(false);
      setUrlError(false);
      let response = await apiClient("crm/crm_links", "post", {
        body: {
          unique_id: router?.query?.id,
          label: label,
          urls: url,
          type_id: typeId,
        },
      });
      if (response?.status == 200 || response?.status == true) {
        dispatch(
          createTaskMeetingCallsHistory({
            lead_id: router?.query?.id,
            name: "Links",
            type: "links",
            message: `<span>Link Created - </span><b><a href="${url}" target="blank">${url}</a></b> `,
          })
        );
        setLabel("");
        setUrl("");
        await getAllListOfCRMURL();
        toast.success(response?.payload?.message);
      }
    }
  };

  const deleteURL = async (id, url) => {
    let response = await apiClient(`crm/crm_links/${id}`, "delete");
    if (response?.status == 200) {
      dispatch(
        createTaskMeetingCallsHistory({
          lead_id: router?.query?.id,
          name: "Links",
          type: "links",
          message: `<span>Link Deleted - </span><b><a href="${url}" target="blank">${url}</a></b> `,
        })
      );
      setLabelError(false);
      setUrlError(false);
      setLabel("");
      setUrl("");
      await getAllListOfCRMURL();
      toast.success(response?.payload?.message);
    }
  };

  return (
    <>
      <TaskLinkdOuter>
        <LinkTopSection>
          <Typography variant="h6">Links</Typography>
        </LinkTopSection>
        <Divider />

        <LinksAddColumn>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6}>
              <CommonFormcontrol required fullWidth size="small">
                <TextField
                  fullWidth
                  required
                  label="Label"
                  id="outlined-size-small"
                  size="small"
                  placeholder="Enter Name"
                  onChange={(e) => {
                    setLabel(e.target?.value);
                    setLabelError(false);
                  }}
                  value={label}
                  error={labelError}
                  helperText={labelError&&"Please enter note!"}
                />
                
              </CommonFormcontrol>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <CommonFormcontrol required fullWidth size="small">
                <TextField
                  fullWidth
                  required
                  label="Url"
                  id="outlined-size-small"
                  size="small"
                  placeholder="Build Your Link"
                  onChange={(e) => {
                    setUrl(e.target?.value);
                    setUrlError(false);
                  }}
                  value={url}
                  error={urlError}
                  helperText={urlError&&"Please enter url!"}
                />
              </CommonFormcontrol>
            </Grid>
            <Grid item xs={12}>
              <LinksButtons>
                <OutLinedButton
                  variant="outlined"
                  startIcon={<SaveOutlinedIcon />}
                  onClick={() => {
                    saveURL();
                  }}
                >
                  {urlLoader ? (
                    <ThreeDots
                      height="40"
                      width="40"
                      radius="9"
                      color="#D7282F"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      visible={true}
                    />
                  ) : (
                    "Save"
                  )}
                </OutLinedButton>
                <OutLinedButton
                  variant="outlined"
                  startIcon={<RestartAltOutlinedIcon />}
                  onClick={() => {
                    setUrl("");
                    setEditId("");
                    setUrlError(false);
                    setLabel("");
                    setLabelError(false);
                  }}
                >
                  Reset
                </OutLinedButton>
              </LinksButtons>
            </Grid>
          </Grid>
        </LinksAddColumn>

        <LinksList>
          <Grid container spacing={1}>
            {urlLoader ? (
              <UrlSkeleton />
            ) : urlList?.length > 0 ? (
              urlList.map((list, index) => (
                <Grid item xs={12} sm={6} md={6} key={index}>
                  <LinksListRow>
                    <Avatar>
                      <Link
                        underline="none"
                        sx={{ textTransform: "capitalize" }}
                        onClick={() => {
                          window.open(list?.urls, "_blank", "noreferrer");
                        }}
                      >
                        {list?.label[0]}
                      </Link>
                    </Avatar>
                    <LinksListInner>
                      <Typography
                        onClick={() => {
                          window.open(list?.urls, "_blank", "noreferrer");
                        }}
                      >
                        {list?.label}
                      </Typography>
                      <div className="linksicons">
                        <IconButton aria-label="delete">
                          <Link>
                            <DeleteOutlineRoundedIcon
                              onClick={() => deleteURL(list.id, list?.urls)}
                            />
                          </Link>
                        </IconButton>
                      </div>
                    </LinksListInner>
                  </LinksListRow>
                </Grid>
              ))
            ) : (
              <LinksListRow>
                <Typography>No Link added yet</Typography>
              </LinksListRow>
            )}
          </Grid>
        </LinksList>
      </TaskLinkdOuter>
    </>
  );
};
export default LeadLinks;
