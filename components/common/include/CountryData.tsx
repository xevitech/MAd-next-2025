import React from "react";
import { SelectFormButton, SelectFormData, SelectPopOverOuter } from "./style";
import { FormControl, InputLabel, MenuItem, Typography } from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function CountryData(props) {
  const { setAnchorMenuMessage } = props;

  const [country, setCountry] = React.useState<string>("india");
  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };
  return (
    <div
      onMouseLeave={() => {
        setAnchorMenuMessage(null);
      }}
    >
      <SelectPopOverOuter>
        <Typography variant="h4">Country</Typography>
        <Typography variant="body2">
          A country is a distinct part of the world, such as a state, nation, or
          other political entity.
        </Typography>
        <SelectFormData>
          <FormControl fullWidth>
            <InputLabel shrink id="demo-simple-select-label">
              Country
            </InputLabel>
            <Select
              size="small"
              IconComponent={KeyboardArrowDownOutlinedIcon}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label="Language"
              onChange={handleChange}
            >
              <MenuItem className="popover_options" value={"india"}>
                India
              </MenuItem>
              <MenuItem value={"jordan"}>Jordan</MenuItem>
              <MenuItem value={"america"}>America</MenuItem>
              <MenuItem value={"china"}>China</MenuItem>
            </Select>
          </FormControl>
          <SelectFormButton fullWidth variant="contained">
            Save
          </SelectFormButton>
        </SelectFormData>
      </SelectPopOverOuter>
    </div>
  );
}

export default CountryData;
