import React, { useRef, useState } from "react";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import {
  VideoPlayerContainer,
} from "@/components/common/videoplayer/style";

const VideoPlayer = ({
  src,
  videoType = "video/mp4",
  height = "500px",
  width = "700px",
}) => {
  let videoPlayerRef = useRef<any>(null);
  const [controls, setControls] = useState<boolean>(false);

  return (
    <VideoPlayerContainer>
      <video
        id="videoTag"
        ref={videoPlayerRef}
        width={width}
        height={height}
        controls={controls}
        style={{ borderRadius: "6px" }}
      >
        <source src={src} type={videoType} />
      </video>
      {!controls && (
        <PlayCircleOutlinedIcon
          onClick={() => {
            setControls(true);
            videoPlayerRef?.current?.play();
          }}
        />
      )}
    </VideoPlayerContainer>
  );
};

export default VideoPlayer;
