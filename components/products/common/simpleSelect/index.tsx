import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

interface SimpleSelectPropTypes {
  value: string | undefined | null | any;
  handleChange: (event: any) => void;
  options: Array<{ id: number; value: string; view: string }>;
  placeholder?: string;
  name?: string;
  size?: "small" | "medium";
  labelSize?: any;
  labelFontSize?: string | null | undefined;
  error: boolean;
  overlay?:boolean;
}

export const SimpleSelect = ({
  value = null,
  handleChange,
  options = [],
  placeholder = "",
  name = '',
  size = "medium",
  labelFontSize = '',
  labelSize = "",
  error = null,
  overlay,
}: SimpleSelectPropTypes) => {
  return (
    <>
      <FormControl fullWidth size="small">
        <InputLabel id={`demo-simple-select-label-search-${placeholder}`}>
          {placeholder}
        </InputLabel>
        <Select
          name={name}
          labelId={`demo-simple-select-label-search-${placeholder}`}
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
          label={placeholder}
          fullWidth
          size="small"
          error={error}
          // MenuProps={{ disableScrollLock: true, marginThreshold: null, PaperProps: { sx: { maxHeight: 200,zIndex:98},   }}}
          MenuProps={{
            style:{ zIndex:  98},
            disableScrollLock: true, marginThreshold: null, PaperProps: {
              sx: { maxHeight: 200}, 
            }
          }}
        >
          {options?.map((ele, index) => (
            <MenuItem key={index} value={ele?.value}>
              {ele?.view || ele?.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
