import React, { useEffect, useState } from "react";
import { DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import {
    ManagaDeleteDialog,
} from "../style";

import { SmallOutineBtn, StyledBootstrapDialog } from "../commonStyle";
import { useSelector } from "react-redux";
import { setSubjectError, setTaskPopUp } from "@/hooks/UseCreateFormData";
import { useAppDispatch } from "redux/store";
import { ThreeDots } from "react-loader-spinner";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import Scheduler from "./Scheduler";

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


const TaskPopUp = ({ openPopUp }) => {
    const dispatch = useAppDispatch()
    const { saveLoader, taskForm,formList } = useSelector((state: any) => state.formList);
    const handleCloseColumn = () => {
        dispatch(setTaskPopUp(false))
    };

    
    return (
        <div>
            <StyledBootstrapDialog
                // onClose={handleCloseColumn}
                aria-labelledby="customized-dialog-title"
                open={openPopUp}
                sx={ManagaDeleteDialog}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleCloseColumn}
                >
                   Create Task
                </BootstrapDialogTitle>

                <DialogContent dividers>
                <Scheduler />
                    {/* {formList?.data?.form_data?.map(item=><Scheduler TaskData={item}/>)} */}
                    
                </DialogContent>
                {/* <DialogActions>                    
                </DialogActions> */}
            </StyledBootstrapDialog>
        </div>
    );
};

export default TaskPopUp;
