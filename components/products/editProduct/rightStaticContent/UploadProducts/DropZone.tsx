import React from "react";
import TerrainIcon from "@mui/icons-material/Terrain";
import poststyle from "components/products/editProduct/style.module.css";
import {
  BrowseContainer,
  DropZoneContainer,
  DropZoneBox,
  TerrainIconContainer,
  UpdateImageGallary,
} from "./styles";
import { useDropzone } from "react-dropzone";

const DropZone = (props: any) => {
  const { onDrop, acceptType } = props;

  acceptType === "image"
    ? { "image/jpeg": [], "image/png": [], "image/gif": [] }
    : { "video/mp4": [], "video/webm": [], "video/ogg": [] };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptType,
  });
  const {
    getRootProps: getVideoRootProps,
    getInputProps: getVideoInputProps,
    isDragActive: isVideoDragActive,
  } = useDropzone({
    onDrop,
    accept: acceptType,
  });
  return (
    <>
      <DropZoneBox {...getRootProps()}>
        <DropZoneContainer className={poststyle.drop_zone_content}>
          <TerrainIconContainer>
            <TerrainIcon className={poststyle.terrian_icon} />
          </TerrainIconContainer>
          {isDragActive ? (
            <p>Release to drop the files here</p>
          ) : (
            <p className={poststyle.drag_txt}>
              Drag and drop or{" "}
              <label htmlFor="fileSelect" className={poststyle.browse_txt}>
                Upload
                <input {...getInputProps()} multiple />
              </label>
            </p>
          )}
          <UpdateImageGallary></UpdateImageGallary>
          <BrowseContainer></BrowseContainer>
        </DropZoneContainer>
      </DropZoneBox>
    </>
  );
};
export default DropZone;
