import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React from "react";
import { Btn3 } from "../style";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";

export default function Adsinput() {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const [anchorEl1, setAnchorEl1] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const open1 = Boolean(anchorEl1);
  const id1 = open1 ? "simple-popover" : undefined;
  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        <FormControl sx={{ mt: 2, minWidth: "314px" }} size="small">
          <InputLabel id="demo-select-small-label">
            Select under title add Tool
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={age}
            label="Age"
            onChange={handleChange}
            sx={{
              "& .MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root": {
              },
              "& .MuiOutlinedInput-notchedOutline": {
                fontSize: "105px !important",
              },
            }}
          >
            <MenuItem value={10}>Under title</MenuItem>
          </Select>
        </FormControl>
        <Box>
          <Btn3 aria-describedby={id1} onClick={handleClick1}>
            <ContactSupportOutlinedIcon sx={{ mt: 2.3, ml: 1.5 }} />
          </Btn3>
          <Popover
            id={id1}
            open={open1}
            anchorEl={anchorEl1}
            onClose={handleClose1}
            anchorOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Box sx={{ height: "200px", width: "400px" }}></Box>
          </Popover>
        </Box>
      </Box>
      <Box display="flex" mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <TextField
              helperText="Your text must be between 20-30 characters"
              size="small"
              label="Title 1"
              defaultValue="certified premium quality products!!"
              focused
              sx={{
                "& label.Mui-focused": {
                  color: "#D7282F",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#D7282F !important",
                    width: "315px",
                  },
                },
                input: { color: "#D7282F" },
                "& .MuiFormHelperText-root": {
                  color: "#6C6C6C !important",
                  fontWeight: "400",
                  fontSize: "12px",
                  marginLeft: "4px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <TextField
              size="small"
              label="Title 2"
              defaultValue="Get best price with us!!"
              focused
              sx={{
                "& label.Mui-focused": {
                  color: "#51C11C",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#51C11C !important",
                    width: "315px",
                  },
                },
                input: { color: "#51C11C" },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <TextField
              size="small"
              label="Title 1"
              defaultValue="Get fast delivery"
              focused
              sx={{
                "& label.Mui-focused": {
                  color: "#FFA319",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#FFA319 !important",
                    width: "315px",
                  },
                },
                input: { color: "#FFA319" },
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
