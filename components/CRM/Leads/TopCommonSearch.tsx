import * as React from "react";
import { FormControlstyle, FormFieldContainer, TaskAvatarContainer, TaskAvatarLabel } from "../style";
import { Avatar, Grid, IconButton, InputAdornment, InputLabel, Link, TextField, Typography } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import ListItemButton from '@mui/material/ListItemButton';
import SearchIcon from "@mui/icons-material/Search";
const TopCommonSearch = (props) => {
    const options = props?.userLists;
    const defaultOwner = props?.defaultOwner;
    const setValues = props?.updateValue;
    const label = props?.label;
    const [owner, setOwner] = React.useState({ name: '' });
    React.useEffect(() => {
        if (defaultOwner?.name !== undefined) {
            setOwner({ name: defaultOwner.name })
        }

    }, [defaultOwner])


    const renderOption = (props, option) => {
        return (<ListItemButton {...props}>
            <TaskAvatarContainer>
                <TaskAvatarLabel>
                    <Avatar
                        alt="Image"
                        src={option.file_name}
                    />
                    <div>
                        <Typography variant="body2" className="TaskUsername"> {option.name}</Typography>
                        <Typography variant="body2" className="TaskUseremail" title={option.email}><Link underline="hover">{option.email}</Link></Typography>
                    </div>
                </TaskAvatarLabel>
            </TaskAvatarContainer>
        </ListItemButton>)
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <FormFieldContainer fullWidth>
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        defaultValue={owner ? owner : {}}
                        value={owner ? owner : {}}
                        onChange={(event, newValue) => {
                            // props?.updateValue(newValue);
                        }}
                        options={options}
                        getOptionLabel={(option) => option.name}
                        ListboxProps={{
                            className: "myCustomList"
                        }}
                        renderOption={renderOption}
                        renderInput={(params) =>
                            <>
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Search"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton>
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </>
                        }
                    />
                </FormFieldContainer>
            </Grid>
        </Grid>
    );
};
export default TopCommonSearch;
