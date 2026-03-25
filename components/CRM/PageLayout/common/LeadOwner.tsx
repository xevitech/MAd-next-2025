import * as React from "react";
import { Avatar, Grid, InputLabel, Link, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useSelector } from "react-redux";
import Autocomplete from '@mui/material/Autocomplete';
import ListItemButton from '@mui/material/ListItemButton';
import { FormFieldContainer, TaskAvatarContainer, TaskAvatarLabel } from "../../style";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AutocompleteSoacingCommon } from "../../commonStyle";
const LeadOwner = (props) => {
    const options = props?.userLists;
    const defaultOwner = props?.defaultOwner;
    const setValues = props?.updateValue;
    const setNewValue = props?.onChange;
    const label = props?.label;
    const [owner, setOwner] = React.useState(defaultOwner);


    React.useEffect(() => {
        if (defaultOwner?.name !== undefined) {
            setOwner(defaultOwner)
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
                        <Typography variant="body2"><Link underline="hover" title={option.email}>{option.email}</Link></Typography>
                    </div>
                </TaskAvatarLabel>
            </TaskAvatarContainer>
        </ListItemButton>)
    };

    return (
        <Grid container>
            <Grid item xs={12} md={12}>
                <FormFieldContainer fullWidth className={label == 'Lead Owner' ? 'Createleadautocomplete' : 'CreateTask'}>
                    <AutocompleteSoacingCommon>
                        <Autocomplete
                            popupIcon={<KeyboardArrowDownIcon />}
                            // sx={{ width: 200 }}
                            componentsProps={{
                                paper: {
                                    sx: {
                                        width: 300
                                    }
                                }
                            }}
                            id="free-solo-demo"
                            defaultValue={owner}
                            disableClearable
                            freeSolo={false}
                            value={owner ? owner : []}
                            onChange={(event, newValue) => {
                                props?.updateValue(newValue?.email);

                            }}
                            onInputChange={(event, newInputValue) => {
                                setNewValue(newInputValue);
                                props?.onChange(newInputValue)
                            }}
                            options={options ? options : []}
                            getOptionLabel={(option) => option.name}
                            ListboxProps={{
                                className: "myCustomList"
                            }}
                            renderOption={renderOption}
                            renderInput={(params) =>
                                <>

                                    <TextField {...params} variant="outlined" label={""} />
                                </>
                            }
                        />
                    </AutocompleteSoacingCommon>
                </FormFieldContainer>
            </Grid>
        </Grid>

    );
};
export default LeadOwner;
