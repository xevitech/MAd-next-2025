import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { SpecificationCol } from "../../style";

function SelectComponent({
  index,
  quantities,
  val,
  onChangeHandler,
  setQuantityHandler,
  selectedOptions,
  i,
  v,
}) {
  return (
    <div>
      {" "}
      <SpecificationCol>
        {val.map((obj) => {
          let value =
            selectedOptions?.[i]?.[index]?.find(
              ({ option }) => option == obj.name
            )?.value ?? null;
          return (
            <>
              <FormControl fullWidth>
                <InputLabel size="small" id={val.id}>
                  {val.name}
                </InputLabel>
                <Select
                  size="small"
                  labelId={val.id}
                  id={val.id}
                  value={value ? value : ""}
                  label={val.name}
                  onChange={(e) => onChangeHandler(i, e, index, obj.name, v.id)}
                >
                  {obj.values.split(",").map((option) => {
                    if (option) {
                      return (
                        <MenuItem key={`${option}_opts`} value={option}>
                          {option}
                        </MenuItem>
                      );
                    }
                  })}
                </Select>
              </FormControl>
            </>
          );
        })}
        <TextField
          size="small"
          value={quantities[i][index]}
          onChange={(e) => setQuantityHandler(e.target.value, i, index)}
        />
      </SpecificationCol>
    </div>
  );
}

export default SelectComponent;
