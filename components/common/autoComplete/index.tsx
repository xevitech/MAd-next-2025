import { CustomAutoCompleteProps } from "@/hooks/Interface";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";

/**
 * CustomAutoComplete Component
 *
 * @param options - An array of options to display in the autocomplete dropdown. Can be strings or objects.
 * @param labelForTextField - The label text for the input field. Defaults to "Select any option".
 * @param handleOptionChange - Callback function triggered when an option is selected. Receives the event and the selected value.
 * @param groupBy - Function to group options in the dropdown, allowing for categorized display.
 * @param id - Optional string for assigning an ID to the component, useful for accessibility.
 * @param value - Current selected value, used to control the selected state of the autocomplete.
 * @param defaultValue - Initial value before any selection is made.
 * @param typeOfValueToGet - Key of the property to extract from the selected object if options are objects.
 * @param error - Indicates whether there is an error in the input. Styles input accordingly when true.
 * @param helperText - Helper text displayed when there is an error, providing additional context.
 * @param placeholder - Placeholder text for the input field when empty.
 * @param size - Size of the autocomplete input field. Can be "small" or "medium".
 * @returns JSX.Element - The rendered component.
 */
const CustomAutoComplete: React.FC<CustomAutoCompleteProps> = ({
  options,
  labelForTextField = "Select any option",
  handleOptionChange,
  groupBy,
  id = "",
  value,
  defaultValue,
  typeOfValueToGet,
  error = false,
  helperText = "",
  placeholder = "",
  size = "small",
}) => {
  return (
    <div>
      <Autocomplete
        disablePortal
        size={size}
        options={options}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.title
        }
        placeholder={placeholder}
        groupBy={groupBy}
        id={id}
        renderInput={(params) => (
          <TextField
            {...params}
            label={labelForTextField}
            variant="outlined"
            error={error}
            helperText={error && helperText}
          />
        )}
        onChange={(e, newValue) => {
          const valueToGet =
            typeOfValueToGet && newValue && typeof newValue !== "string"
              ? newValue[typeOfValueToGet]
              : newValue;

          handleOptionChange(e, valueToGet);
        }}
        value={
          options.find((option) =>
            typeof option === "string"
              ? option === value
              : option[typeOfValueToGet] === value
          ) || null
        }
        defaultValue={value}
        // style={{ width: 300 }}
        ListboxProps={{
          sx: {
            height: "180px",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#acabab",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#6d6d6d",
            },
          },
        }}
      />
    </div>
  );
};

export default CustomAutoComplete;
