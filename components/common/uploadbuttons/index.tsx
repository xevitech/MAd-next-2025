import {
  FieldContainer,
  FieldLabel,
} from "@/components/CompanySettings/CompanyDetail/style";
import {
  UploadButtonContainer,
  UploadButtonStyle,
} from "@/components/CompanySettings/Edit/style";
import React from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const UploadButton = () => {
  return (
    <div>
      {" "}
      <FieldContainer>
        <FieldLabel>Upload Business Licence</FieldLabel>
        <UploadButtonContainer>
          <UploadButtonStyle value>
            <FileUploadIcon sx={{ height: 25, width: 15 }} />
            Upload
          </UploadButtonStyle>
        </UploadButtonContainer>
      </FieldContainer>
    </div>
  );
};
export default UploadButton;
