import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Stack, Tooltip } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { ChipContainer } from "./styled";

export const BusinessSelectableAndEditableField = (props) => {
  const options = props?.options;
  const defaultValue = props?.defaultValue;
  const setValues = props?.updateValue;
  const noOptions = props?.noOptions;
  const fetch = props?.fetch ?? false;


  const FetchValue = (values: any ) => {
    if (fetch) setValues(values);
  };

  return (
    <Stack className="addBusinesstype">
      <Autocomplete
        style={{ width: "100%" }}
        className={"autoComplete-container"}
        multiple
        id="tags-filled"
        onClose={() => {}}
        options={options.map((option: string) => option)}
        filterSelectedOptions
        onChange={(e: any) => {
          if (e.key == "Backspace") {
            let keyword = [...defaultValue];
            keyword.pop();
            setValues(keyword);
          }
          if (e.target.dataset.testid === "CloseIcon") {
            if (fetch) {
              FetchValue([]);
            } else {
              setValues([]);
            }
          }

          if (e.target.textContent) {
            if (fetch) {
              FetchValue([...defaultValue, e.target.textContent]);
            } else {
              setValues((prev) => {
                if (prev?.length) {
                  return [...prev, e.target.textContent];
                } else {
                  return [e.target.textContent];
                }
              });
            }
          }
        }}
        onInputChange={(event: any) => {
          if (event.key === "Enter") {
            if (fetch) {
              FetchValue([...defaultValue, event.target.value]);
            } else {
              setValues((prev) => {
                if (prev?.length) {
                  return [...prev, event.target.value];
                } else {
                  return [event.target.value];
                }
              });
            }
          }
        }}
        value={defaultValue}
        freeSolo
        renderTags={(value: readonly string[], getTagProps) => {
          return (
            <ChipContainer>
              {value.map((option: string, index: number) => (
                <Tooltip title={option}>
                  <Chip
                    key={index}
                    size="small"
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                    onDelete={(e) => {
                      if (fetch) {
                        FetchValue(
                          defaultValue.filter((element: any ) => element !== option)
                        );
                      } else {
                        setValues((prev) =>
                          prev.filter((element: any) => element !== option)
                        );
                      }
                    }}
                  />
                </Tooltip>
              ))}
            </ChipContainer>
          );
        }}
        renderInput={(params) => (
          <TextField
            style={{ textTransform: "capitalize" }}
            {...params}
            variant="outlined"
            placeholder={
              noOptions ? "Enter Business Type" : "select or add new"
            }
            size="small"
            InputProps={{
              ...params.InputProps,
              endAdornment:
                defaultValue.length <= 0 ? (
                  <CloseOutlinedIcon
                    style={{ fontSize: "18px", cursor: "pointer" }}
                    onClick={props?.onClose}
                  />
                ) : (
                  <DeleteOutlinedIcon
                    style={{ fontSize: "18px", cursor: "pointer" }}
                    onClick={() => setValues([])}
                  />
                ),
            }}
          />
        )}
      />
    </Stack>
  );
};
