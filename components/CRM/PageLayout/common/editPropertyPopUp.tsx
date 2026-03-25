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
  InputAdornment,
  Grid,
  Box,
} from "@mui/material";
import {
  saveEditedProperty,
  setEditProperty,
  setMenuItem,
} from "@/hooks/LeadsReducer";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { CustomLeadsEditBox, EditPropCheck, TextFieldRow } from "../style";
import { useAppDispatch } from "redux/store";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  CommonFormcontrol,
  SmallBlackOutineBtn,
  SmallFilledBtn,
  SmallOutineBtn,
  SmallRedOutineBtn,
  StyledBootstrapDialog,
  TitleDialog,
} from "../../commonStyle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return <TitleDialog {...other}>{children}</TitleDialog>;
}

const EditPropertyPopUp = ({ open, handleClose, loading }: any) => {
  const [disableButton, setDisable] = useState<boolean>(false);
  const [requiredCheck, setRequiredCheck] = useState<boolean>(false);
  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  const [requiredProperty, setrequiredProperty] = useState<any>("");
  const [tooltipProperty, setTooltipProperty] = useState<any>("");
  const { editItems, rowListing, checkMenu, editColumn } = useSelector(
    (state: any) => state.LeadsData
  );
  const [optionList, setOptionList] = useState<any>();

  useEffect(() => {
    setOptionList(editItems?.option_list);
    setTooltipProperty(editItems?.tooltip);
  }, [editItems])
  const dispatch = useAppDispatch();


  const updateOptionList = (i) => {
    const newOptionList = [...optionList];
    newOptionList.splice(i + 1, 0, ''); // Insert an empty string at the next index
    setOptionList(newOptionList);
  };

  const removeOptionList = (newOptionList) => {
    setOptionList(newOptionList);
  }
  const handleChangeOption = (e, i) => {
    const updatedOptionList = [...optionList];
    updatedOptionList[i] = e.target.value;
    setOptionList(updatedOptionList);

  };

  const handleChecked: any = (e, items, ele) => {
    if (e.target.checked) {
      if (ele == "required") {
        setRequiredCheck(true);
        setrequiredProperty(ele);
      } else {
        setShowToolTip(true);
        if (tooltipProperty == null) {
          setTooltipProperty(editItems?.label);
        }
        // setTooltipProperty(editItems?.label);
      }
    } else {
      if (ele == "required") {
        setRequiredCheck(false);
        setrequiredProperty(ele);
      } else {
        setShowToolTip(false);
        setTooltipProperty("");
      }
    }
  };

  const handleEditSave = () => {
    if (checkMenu.type === "properties") {
      const payload = {
        required: { requiredProperty, requiredCheck },
        toolTip: { tooltipProperty, showToolTip },
        editFields: editItems,
        options: optionList
      };
      dispatch(saveEditedProperty(payload));
    } else if (checkMenu.type === "remove") {
      const RemovePayload = { status: true, editFields: editItems };
           const payload = {
        ele: "remove",
        items: { column: editColumn, items: editItems },
      };
            dispatch(setMenuItem(payload));
      dispatch(setEditProperty(RemovePayload));
    }
    setDisable(false);
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
    setShowToolTip(false);
    setTooltipProperty("");
  }

  return (
    <StyledBootstrapDialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <DialogContentText id="alert-dialog-description1">
          {checkMenu.type == "remove" ? "Remove Field" : "Properties"} -{" "}
          {editItems?.label}
        </DialogContentText>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        {checkMenu.type !== "remove" && (
          <>
            <CustomLeadsEditBox option={optionList?.length > 0 ? true : false}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CommonFormcontrol required fullWidth size="small">
                    <TextField
                      id="outlined-disabled"
                      // label="Field Label *"
                      // variant="standard"
                      fullWidth
                      disabled
                      defaultValue={editItems?.label}
                      InputProps={{
                        disableUnderline: true,
                        readOnly: true,
                      }}
                    />
                  </CommonFormcontrol>
                </Grid>
                {optionList?.length > 0 && optionList?.map((v, i) => (
                  <Grid item xs={12}>
                    <CommonFormcontrol fullWidth size="small">
                      <TextField
                        value={v}
                        label={v == "" ? "Add new option" : ""}
                        variant="outlined"
                        style={{ width: "100%" }}
                        size="small"
                        onChange={(e) => handleChangeOption(e, i)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ cursor: "pointer" }}
                            >
                              {/* {editItems?.option_list?.length < 6 && ( */}
                              <AddCircleOutlineIcon
                                style={{
                                  color: "#D7282F",
                                  height: "20px",
                                  width: "27px",
                                }}
                                onClick={() => {
                                  updateOptionList(i);
                                }}
                              />
                              {/* )} */}

                              <RemoveCircleOutlineIcon
                                style={{
                                  color: "#231F20",
                                  height: "20px",
                                  width: "27px",
                                }}
                                onClick={() => {
                                  let updatedList = [...optionList];
                                  updatedList.splice(i, 1);
                                  removeOptionList(updatedList);
                                }}
                              />

                            </InputAdornment>
                          ),
                        }}
                      />
                      <br />
                    </CommonFormcontrol>
                  </Grid>
                ))}
              </Grid>
            </CustomLeadsEditBox>
            <EditPropCheck className="MainCheckbox">
              <FormGroup>
                <FormControlLabel
                  required
                  control={
                    <Checkbox
                      value={requiredCheck}
                      defaultChecked={
                        editItems?.is_required == "1" ? true : false
                      }
                      onChange={(e) => handleChecked(e, editItems, "required")}
                    />
                  }
                  label="Required"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value={showToolTip}
                      onChange={(e) => handleChecked(e, "tooltip")}
                    />
                  }
                  label="Show Tooltip"
                />
              </FormGroup>
              <>
                {showToolTip && (
                  <CommonFormcontrol fullWidth size="small">
                    <TextField
                      id="outlined-multiline-static"
                      // label="Textarea"
                      multiline
                      value={tooltipProperty}
                      onChange={(e) => setTooltipProperty(e.target.value)}
                      rows={2}
                      placeholder="Description here.."
                    />
                  </CommonFormcontrol>
                )}
              </>
            </EditPropCheck>
          </>
        )}
        {checkMenu.type == "remove" && (
          <>
            The field you are about to remove from this layout will be moved to
            the Unused Items section in the left panel. Are you sure you want to
            remove the field?
          </>
        )}
      </DialogContent>
      <DialogActions>
        <SmallRedOutineBtn
          disabled={disableButton}
          type="submit"
          onClick={() => {
            setDisable(true);
            handleEditSave();
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
            <>
              {checkMenu.type === "remove" ? "Yes, Remove the Field" : "Done"}
            </>
          )}
        </SmallRedOutineBtn>
        <SmallBlackOutineBtn disabled={disableButton} onClick={() => handleCancel()}>
          Cancel
        </SmallBlackOutineBtn>
      </DialogActions>
    </StyledBootstrapDialog>
  );
};

export default EditPropertyPopUp;
