import React, { useEffect, useState } from "react";
import { Box, Checkbox, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputLabel, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { setPipeLinePopUp, setSubjectError, setTaskPopUp } from "@/hooks/UseCreateFormData";
import { useAppDispatch } from "redux/store";
import { ThreeDots } from "react-loader-spinner";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { ManagaDeleteDialog } from "../style";
import { CommonFormcontrol, StyledBootstrapDialog } from "../commonStyle";
import { CreatPipeLineForm, PipelineLabel, TextInfo } from "./style";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import Scheduler from "./Scheduler";

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}


const PipeLinePopUp = () => {
    const dispatch = useAppDispatch()
    const { pipeLinePopUp } = useSelector((state: any) => state.formList);
    const handleCloseColumn = () => {
        dispatch(setPipeLinePopUp(false))
    };
    const [age, setAge] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    return (
        <div>
            <StyledBootstrapDialog
                // onClose={handleCloseColumn}
                aria-labelledby="customized-dialog-title"
                open={pipeLinePopUp}
                sx={ManagaDeleteDialog}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleCloseColumn}
                >
                    Create Pipeline
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <CreatPipeLineForm>
                        <Grid container spacing={2}>
                            <Grid item md={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3} md={3}>
                                        <PipelineLabel id="">Pipeline Name</PipelineLabel></Grid>
                                    <Grid item xs={12} sm={9} md={9}>
                                        <CommonFormcontrol required fullWidth size="small">
                                            <TextField
                                                fullWidth
                                                required
                                                id="outlined-size-small"
                                                size="small"
                                                placeholder="Pipeline Name"
                                            />
                                        </CommonFormcontrol>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3} md={3}>
                                        <PipelineLabel id="">Layout</PipelineLabel></Grid>
                                    <Grid item xs={12} sm={9} md={9}>
                                        <CommonFormcontrol fullWidth size="small">
                                            <Select
                                                labelId="demo-simple-select-label"
                                                size="small"
                                                id="demo-simple-select"
                                                value={age}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={10}>Standred</MenuItem>
                                            </Select>
                                        </CommonFormcontrol>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3} md={3}>
                                        <PipelineLabel id="">Layout</PipelineLabel></Grid>
                                    <Grid item xs={12} sm={9} md={9}>
                                        <CommonFormcontrol fullWidth size="small">
                                            <Select
                                                labelId="demo-simple-select-label"
                                                size="small"
                                                id="demo-simple-select"
                                                value={age}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={10}>Standred</MenuItem>
                                                <MenuItem value={20}>Standred</MenuItem>
                                                <MenuItem value={30}>Standred</MenuItem>
                                                <MenuItem value={40}>Standred</MenuItem>
                                                <MenuItem value={50}>Standred</MenuItem>
                                                <MenuItem value={10}>Standred</MenuItem>
                                            </Select>
                                        </CommonFormcontrol>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3} md={3}>
                                        <PipelineLabel id="">Set as default</PipelineLabel></Grid>
                                    <Grid item xs={12} sm={9} md={9}>
                                        <Checkbox {...label} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CreatPipeLineForm>
                </DialogContent>
                {/* <DialogActions>                    
                </DialogActions> */}
            </StyledBootstrapDialog>
        </div>
    );
};

export default PipeLinePopUp;
