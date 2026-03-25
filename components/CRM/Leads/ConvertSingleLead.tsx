import React, { useEffect, useState } from "react";
import { Checkbox, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography } from "@mui/material";
import { CommonCheckboxStyling, SmallBlackOutineBtn, SmallFilledBtn, SmallOutineBtn, SmallRedOutineBtn, StyledBootstrapDialog, TitleDialog } from "../commonStyle";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import CloseIcon from "@mui/icons-material/Close";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { ConvertLeadData, CustomActionButon, LeadOwnerName, MassConvertBox } from "../style";
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

const ConvertSingleLead = ({ openLead, setOpen }) => {
    const handleCloseLead = () => { setOpen(false); };
    return (
        <div>
            <StyledBootstrapDialog
                onClose={handleCloseLead}
                aria-labelledby="customized-dialog-title"
                open={openLead}
            >
                <TitleDialog sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <i className="icon-leadsblack"></i>
                    Convert Lead
                </TitleDialog>
                <DialogContent dividers>
                    <MassConvertBox>
                        <Typography gutterBottom>
                            Create New Contact (Lead Name Here)
                        </Typography>
                        <Divider />
                        <ConvertLeadData>
                            <FormControl component="fieldset">
                                <CommonCheckboxStyling>
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Create a New Deal for this Contact" />
                                </CommonCheckboxStyling>
                            </FormControl>
                            <LeadOwnerName>Owner of the  New Records</LeadOwnerName>
                            <LeadOwnerName fontWeight={600}> Ibrahim Sameeh</LeadOwnerName>
                        </ConvertLeadData>
                    </MassConvertBox>
                </DialogContent>
                <DialogActions>
                    <CustomActionButon>
                        <SmallRedOutineBtn variant="outlined">Convert</SmallRedOutineBtn>
                        <SmallBlackOutineBtn variant="outlined" onClick={handleCloseLead}>Cancel</SmallBlackOutineBtn>
                    </CustomActionButon>
                </DialogActions>
            </StyledBootstrapDialog>
        </div>
    );
};
export default ConvertSingleLead;
