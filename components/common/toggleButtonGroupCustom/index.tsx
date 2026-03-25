import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ColorToggleButton({
  value,
  setValue,
  options,
  error,
  errorText,
  disableRole = false,
  onEnterEvent = null,
}) {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    if (newValue) setValue(newValue);
  };

  return (
    <div
      className={`${error ? "buttongroup-outer buttongroup-selected" : "buttongroup-outer"
        }`}
    >
      <ToggleButtonGroup
        color="primary"
        value={value}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        onKeyDown={(e) => {
          if (onEnterEvent && e.key == "Enter") {
            onEnterEvent();
          }
        }}
        disabled={disableRole}
      >
        {options?.map((element: any, i: number) => (
          <ToggleButton key={i} value={element} sx={{ border: "none !important" }}>
            {element}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {errorText && (
        <div className="helper-text MuiFormHelperText-root">{errorText}</div>
      )}
    </div>
  );
}
