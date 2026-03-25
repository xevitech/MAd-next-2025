import React from "react";
import TextField from "@mui/material/TextField";

export const TextArea = (props) => {
  const { value, handleChange, name, exceededLimit } = props;

  const handleTextAreaChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 999) {
      handleChange(e, name);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    navigator.clipboard.readText().then((pastedData) => {
      let newValue = value + pastedData;
      if (newValue.length > 999) {
        newValue = newValue.substring(0, 999);
      }

      handleChange({ target: { name, value: newValue } }, name);
    });
  };

  return (
    <>
      <TextField
        value={value}
        fullWidth
        multiline
        size="small"
        minRows={3}
        placeholder="Enter about your company"
        name={name}
        onChange={handleTextAreaChange}
        onPaste={handlePaste}
        disabled={exceededLimit}
      />
    </>
  );
};
