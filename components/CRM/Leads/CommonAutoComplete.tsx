import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Chip, Tooltip } from '@mui/material';
const CommonAutoComplete = (props) => {
    const [selectedTags, setSelectedTags] = useState([]);
    const setValues = props?.setLanguage;

    const setData = () => {
        if (selectedTags?.length > 0) {
            setValues(selectedTags.join(','), props.id);
        } else {
            setValues('', props.id);
        }
    };

    useEffect(() => {
        setData()
    }, [selectedTags])

    return (
        <Autocomplete
            style={{ width: "100%" }}
            componentsProps={{
                paper: {
                  sx: {
                    width: 300
                  }
                }
              }}
            className={"autoComplete-container"}
            multiple
            id="tags-filled"
            onClose={(e) => { }}
            options={[]}
            filterSelectedOptions
            onChange={(e: any, newValue) => {
                if (e.target.dataset.testid === "CloseIcon") {
                    setSelectedTags([]);
                }
            }}
            onInputChange={(event: any, newInputValue) => {
                if (event.key === "Enter") {
                    setSelectedTags((prev) => {
                        if (prev?.length) {
                            return [...prev, event.target.value];
                        } else {
                            return [event.target.value];
                        }
                    });
                    setData()
                }
            }}
            freeSolo
            renderTags={(value: readonly string[], getTagProps) => {
                return (
                    <>
                        {selectedTags.map((option: string, index: number) => (
                            <Tooltip title={option}>
                                <Chip
                                    key={index}
                                    size="small"
                                    variant="outlined"
                                    label={option}
                                    {...getTagProps({ index })}
                                    onDelete={(e) => {
                                        setSelectedTags(selectedTags?.filter((ele) => ele != option))
                                    }}
                                />
                            </Tooltip>
                        ))}
                    </>
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    placeholder={"Add language"}
                    size="small"
                    label={props.label}
                />
            )}
        />
    );
};

export default CommonAutoComplete;