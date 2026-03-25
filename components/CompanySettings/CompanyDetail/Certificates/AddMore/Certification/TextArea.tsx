import { Grid, TextareaAutosize, Typography } from "@mui/material";
import React from "react";
import {
  DescriptionTextContainer,
  FullFieldContainer,
  FullFieldLabel,
  FullFieldValue,
} from "../../../commonStyles";

const TextArea = ({
  values,
  handleInputChange,
  errors,
  count,
  text = "",
  name,
  placeholder,
}) => {
  return (
    <>
      <Grid item xs={12} sm={12} md={12}>
        <FullFieldContainer>
          <FullFieldLabel className="certificatespacing">
            {name}{" "}
            {name == "Approved Goods" ? (
              ""
            ) : (
              <span className="detailastrics">*</span>
            )}
          </FullFieldLabel>
          <FullFieldValue>
            <TextareaAutosize
              style={{
                width: "100%",
                height: "77px",
                paddingLeft: 10,
                borderColor: `${errors ? "#d32f2f" : "rgba(0, 0, 0, 0.23)"}`,
                borderRadius: "6px",
                fontFamily: "Open Sans",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "23px",
                resize: "none",
                overflow: "auto",
                color: "#231F20",
                outline: "none",
              }}
              value={values}
              name="message"
              onChange={handleInputChange}
              placeholder={placeholder ? placeholder : ""}
            />
          </FullFieldValue>
          {errors && (
            <Typography
              style={{
                color: "#d32f2f",
                fontSize: "10px",
                fontWeight: "400",
                marginTop: "-2px",
              }}
            >
              <span style={{ marginRight: "3px" }}>
                <img
                  src="/assets/error-outline-red.svg"
                  alt=""
                  style={{ width: "8px", height: "8px" }}
                />
              </span>
              {errors}
            </Typography>
          )}
        </FullFieldContainer>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <div className="text_reamin">
          <DescriptionTextContainer sx={{ marginTop: "0px" }}>
            Maximum characters: {`${Number(values.length)}/${count}`}
          </DescriptionTextContainer>
          <DescriptionTextContainer>{text}</DescriptionTextContainer>
        </div>
      </Grid>
    </>
  );
};

export default TextArea;
