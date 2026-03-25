import { styled, TextField } from "@mui/material";

export const TextFieldContainer = styled(TextField)({
  root: {
    "& .MuiInputBase-root.Mui-disabled": {
      color: "red",
    },
  },
});
