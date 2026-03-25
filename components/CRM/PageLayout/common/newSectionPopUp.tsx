import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import {
  saveEditedProperty,
  setEditProperty,
  setRowListing,
} from "@/hooks/LeadsReducer";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { EditPropCheck, TextFieldRow } from "../style";
import { useAppDispatch } from "redux/store";
import {
  CommonFormcontrol,
  SmallBlackOutineBtn,
  SmallFilledBtn,
  SmallOutineBtn,
  SmallRedOutineBtn,
  StyledBootstrapDialog,
  TitleDialog,
} from "../../commonStyle";
import { toast } from "react-toastify";
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return <TitleDialog {...other}>{children}</TitleDialog>;
}

const AddNewSection = ({ open, handleClose, loading }: any) => {
  const [disableButton, setDisable] = useState<boolean>(false);
  const [title, setTitle] = useState<any>("");
  const { editItems, rowListing, checkMenu, copyFormData } = useSelector(
    (state: any) => state.LeadsData
  );
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    setDisable(true);
    const newCoulmn = [...rowListing?.columnOrder];
    const uniqueid = uuid();
    const newData = {
      id: "",
      name: title,
      section_id: "",
      dummy_section_id: uniqueid,
      type_name: "Leads",
      tab_columns: "double",
      sorting: rowListing?.columnOrder.length,
      type_id: copyFormData.type_id,
      user_id: copyFormData.user_id,
      form_fields: [],
      is_delete: 1,
    };
    newCoulmn.unshift(newData);

    const checkName = [...rowListing?.columnOrder];
    let errorState: any;
    checkName.map((item, index) => {
      if (item.name == title) {
        errorState = true;

      }
    })
    if (errorState) {
      setDisable(false);
      toast.error("name already exists");
    } else {
      setDisable(false);
      dispatch(
        setRowListing({
          ...rowListing,
          columnOrder: newCoulmn,
        })
      );
      handleClose();
    }



  };

  return (
    <StyledBootstrapDialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <DialogContentText id="alert-dialog-description1">
          Add Label
        </DialogContentText>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <CommonFormcontrol fullWidth size="small">
          <TextField
            id="outlined-multiline-static"
            //  label="Textarea"
            multiline
            rows={2}
            placeholder="Add Title here.."
            onChange={(e) => setTitle(e.target.value)}
          />
        </CommonFormcontrol>
      </DialogContent>
      <DialogActions>
        <SmallRedOutineBtn
          disabled={disableButton}
          type="submit"
          onClick={() => {
            handleAdd();
          }}
        >
          {disableButton ? (
            <ThreeDots
              height="40"
              width="40"
              radius="9"
              color="white"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              visible={true}
            />
          ) : (
            "Add Section"
          )}
        </SmallRedOutineBtn>
        <SmallBlackOutineBtn onClick={() => handleClose()}>
          Cancel
        </SmallBlackOutineBtn>
      </DialogActions>
    </StyledBootstrapDialog>
  );
};

export default AddNewSection;
