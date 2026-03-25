import React, { useEffect, useState } from "react";
import {  DialogActions, DialogContent, DialogTitle, FormGroup, IconButton, TextField } from "@mui/material";
import {
    ManageColumnList,
    ActionFieldStyle,
    ManagaDeleteDialog,
} from "../style";

import {
    Divider,
    Grid,
} from "@mui/material";
import { CommonFormcontrol, SearchCommon, SmallOutineBtn, StyledBootstrapDialog } from "../commonStyle";
import { useSelector } from "react-redux";
import { getAllFieldData, getKanbanList, saveFilterData, setFilterPopUp, setFilters, setShowFilters } from "@/hooks/UseCreateFormData";
import { useAppDispatch } from "redux/store";
import { ThreeDots } from "react-loader-spinner";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

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


const SaveFilter = ({ openPopUp }) => {
    const dispatch = useAppDispatch()
    const { savedFieldData, saveLoader, currentFilterId,dataViewType } = useSelector((state: any) => state.formList);
    const [fieldName, setFieldName] = useState('')
    const [error, setError] = useState(false)
    const handleCloseColumn = () => {
        dispatch(setFilterPopUp(false))
    };

    const handleChangeFields = (event, type) => {
        setFieldName(event.target.value)
    }

    useEffect(() => {
        setFieldName(currentFilterId && currentFilterId?.name)
    }, [currentFilterId])

    
    const handleSaveFilterData = async () => {
        if (fieldName == '' || fieldName == null) {
            setError(true)
        } else {
            setError(false)
            let body = {
                name: fieldName,
                total: savedFieldData?.data?.data?.length
            }
            let response = await dispatch(saveFilterData(body))
            if (response?.payload?.status == 200) {
                dispatch(setFilterPopUp(false))
                toast.success(response?.payload?.message);
                dispatch(setShowFilters([]))
                dispatch(setFilters([]))
                if (dataViewType == 0) {
                    dispatch(getAllFieldData());
                  } else {
                    dispatch(getKanbanList());
                    dispatch(getAllFieldData());
                  }
                dispatch(setFilters([]));
                dispatch(setShowFilters([]));
                
            }
        }
    }
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
                   {
                    currentFilterId?.id ? 'Update ' : 'Save '
                   }  
                   Filter
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <ManageColumnList>
                            <CommonFormcontrol fullWidth size="small">
                                <TextField
                                    size="small"
                                    id="standard-bare"
                                    value={fieldName}
                                    variant="outlined"
                                    label="Filter Name"
                                    error={error && true}
                                    helperText={error && 'Please enter filter name'}
                                    onChange={e => handleChangeFields(e, 'value')}
                                    onKeyDown={(e) => (e.key == "Enter" ? handleSaveFilterData() : "")}
                                />
                            </CommonFormcontrol>
                    </ManageColumnList>
                </DialogContent>
                <DialogActions>

                    <SmallOutineBtn
                        variant="outlined"
                        autoFocus
                        onClick={handleSaveFilterData}
                    >
                        {saveLoader ? (
                            <ThreeDots
                                height="40"
                                width="40"
                                radius="9"
                                color="#D7282F"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                visible={true}
                            />
                        ) :                             
                        currentFilterId?.id ? 'Update' : 'Save'                               
                        }
                    </SmallOutineBtn>
                    <SmallOutineBtn variant="outlined" onClick={handleCloseColumn}>
                        Cancel
                    </SmallOutineBtn>
                </DialogActions>
            </StyledBootstrapDialog>
        </div>
    );
};

export default SaveFilter;
