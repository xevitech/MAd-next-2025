import React, { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { capitalizeFirstLetter } from "@/utils/commonFunctions/other";

export default function CustomToggleSelect({
  options,
  value,
  handleChange,
  name,
  error,
  errorText,
  inputRef=null,
}) {
  const [selected, setSelected] = useState("");

  const handleEventChange = (
    event: any,
    newValue: string
  ) => {
    if (newValue == null) {
      // setSelected("");
      // handleChange("");
    } else {
      setSelected(newValue);
      handleChange(event.target.value);
    }
  };

  useEffect(() => {
    if (selected !== null) {
      setSelected(value);
    } else {
      setSelected("");
    }
  }, [value]);

  return (
    <div className="toggleBtnContainer">
      <ToggleButtonGroup
        color="primary"
        value={selected}
        exclusive={true}
        onChange={handleEventChange}   
        aria-label="Platform"
        style={error ? { border: '1px solid #d32f2f' } : {}}
        >
        {options?.map((element: any, i: number) => (
          <ToggleButton
          key={i}
          selected={element === selected}
          name={name}
          value={element}
            ref={inputRef} 
          >
            {capitalizeFirstLetter(element)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {error && <div className="error">{error}</div>}
      {errorText && <div className="helper-text MuiFormHelperText-root">{errorText}</div>}
    </div>
  );
}
