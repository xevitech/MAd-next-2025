import {
  TextField,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function UnitSelect({ quotedetails }) {
  const { unitList } = useSelector((state: any) => state.quoteDetails);
  let units = quotedetails?.qty_unit
    ? quotedetails?.qty_unit
    : quotedetails?.unit ?? "";

  return (
    <>
      {units && (
        <TextField
          size="small"
          sx={{ 
            width: "100px",
            '& .MuiInputBase-input':{
              height:'1.2rem',
              padding:'5px 14px',
            },
          }}
          value={unitList?.find((v) => v.id == units)?.name}
          InputProps={{
            readOnly: true,
          }}
        />
      )}
    </>
  );
}

export default UnitSelect;
