import React from "react";

const ViewTempletData = ({ viewHtml }) => {
  return <div dangerouslySetInnerHTML={{ __html: viewHtml?.content || "" }} />;
};

export default ViewTempletData;
