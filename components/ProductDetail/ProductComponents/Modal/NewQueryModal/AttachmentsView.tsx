import { Image } from "@/components/category/style";
import { ImagesBox, ImgContainer } from "@/components/common/dropZone/style";
import { Box } from "@mui/material";
import React, { useEffect, useMemo } from "react";

const AttachmentsView = React.memo(({imageUrl}:any) => {
  // Memoize the image element to prevent re-creation on each render
  const imageElement = useMemo(() => <img src={imageUrl} />, [imageUrl]);

  return (
    <div>
      {imageElement}
    </div>
  );
});

export default AttachmentsView;
