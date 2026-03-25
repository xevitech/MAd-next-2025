import React from "react";
import { MenuItem, styled, TextField } from "@mui/material";

const OuterContainer = styled("div")({
    display: "flex",
    width: "100%",
});



export const TextFieldAndDropdown1 = ({
    textFieldValue,
    textFieldLabel,
    dropdownLabel,
    dropdownValue,
    dropdownOptions,
    handleChange,
    textFieldName,
    dropdownName,
    dropDownErrorText = "",
    textFieldErrorText = "",
    dropDownError = false,
    textFieldError = false,
    menuHeight,
    turnoverRef = null,
    currencyRef = null,
    onBlur = null, 
}) => {

    return (
        <OuterContainer>
            <TextField
                label={textFieldLabel}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            borderRight: 0,
                            borderLeftRadius: 0,
                            color:"red"
                        },
                    },
                }}
                className="custom-field"
                style={{ width: "50%" }}
                value={textFieldValue}
                name={textFieldName}
                onChange={handleChange}
                size="small"
                error={textFieldError}
                helperText={textFieldErrorText}
                inputProps={{
                    autoComplete: "off",
                }}
                onBlur={onBlur}
                inputRef={turnoverRef}
            />
            <TextField
                fullWidth
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                        },
                    },
                }}
                SelectProps={{
                    MenuProps: {
                        PaperProps: {
                            sx: {
                                // maxHeight: 250,
                                maxHeight: menuHeight, // Use the prop value here
                                '&::-webkit-scrollbar': {
                                    width: '6px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    backgroundColor: '#f1f1f1'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#acabab'
                                },
                                '&::-webkit-scrollbar-thumb:hover': {
                                    backgroundColor: '#6d6d6d',
                                },
                            },
                        },
                    },
                }}
                className="custom-select"
                select
                style={{ width: "50%" }}
                label={dropdownLabel}
                name={dropdownName}
                onChange={handleChange}
                size="small"
                error={dropDownError}
                helperText={dropDownErrorText}
                value={dropdownValue}
                inputRef={currencyRef}
                onBlur={onBlur}
            >
                {dropdownOptions?.map((ele) => (
                    <MenuItem key={ele?.id} value={ele?.value}>
                        {ele?.value}- {ele?.view}
                    </MenuItem>
                ))}
            </TextField>
        </OuterContainer>
    );
};
