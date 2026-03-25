import { Autocomplete, Chip, Stack, TextField } from "@mui/material";
import React from "react";

export const EquationField = ({ options, defaultValue, setValues,calType, specifications, allGroups, selectedGroupData, setFirst= null }) => {

  return (
    <Stack style={{ width: "100%" }}>
      <Autocomplete
        style={{ width: "100%" }}
        className={"calculator-pricing-equation-autocomplete"}
        multiple
        id="tags-filled"
        onClose={(e) => { }}
        options={options}
        getOptionLabel={(option) => option.view}
        filterSelectedOptions
        disableClearable
        onKeyDown={(e) => {e.preventDefault();}}
        onChange={(e: any, newValue) => {
          if (e.target.dataset.testid === "CloseIcon") {
            setValues([]);
          }

          if (e.target.textContent)
          setFirst(true)
            setValues((prev) => {
              if (prev?.length)
                return [
                  ...prev,
                  {
                    value: e.target.textContent?.includes("#")
                      ? e.target.textContent?.slice(-3)
                      : e.target.textContent,

                    view: e.target.textContent?.includes("#")
                      ? e.target.textContent?.slice(-3)
                      : e.target.textContent,

                    type: "tagInput",
                  },
                ];
              else
                return [
                  {
                    value: e.target.textContent?.includes("#")
                      ? e.target.textContent?.slice(-3)
                      : e.target.textContent,
                    view: e.target.textContent?.includes("#")
                      ? e.target.textContent?.slice(-3)
                      : e.target.textContent,
                    type: "tagInput",
                  },
                ];
            });
        }}
        onInputChange={(event: any, newInputValue) => {
          if (event.key === "Enter") {
            return;
            setValues((prev) => [
              ...prev,
              {
                value: event.target.value?.includes("#")
                  ? event.target.value?.slice(-3)
                  : event.target.value,
                view: event.target.value?.includes("#")
                  ? event.target.value?.slice(-3)
                  : event.target.value,
                type: "tagInput",
              },
            ]);
          }
        }}
        value={defaultValue}
        freeSolo
        renderTags={(value: readonly object[], getTagProps) =>
          value.map(
            (
              option: { value: string; view: string; type: string },
              index: number
            ) =>
              option?.type == "tagInput" ? (
                <Chip
                  key={index}
                  size="small"
                  variant="outlined"
                  label={option?.view}
                  {...getTagProps({ index })}
                  onDelete={(e) => {
                    setValues((prev) =>
                      prev.filter((element) => element !== option)
                    );
                  }}
                />
              ) : option?.type == "numeric" ? (
                <span
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "16px",
                  }}
                >
                  {option?.value}
                </span>
              ) : (
                <span style={{ fontWeight: "bold" }}>{option?.value}</span>
              )
          )
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            size="small"
          />
        )}
      />
    </Stack>
  );
};
