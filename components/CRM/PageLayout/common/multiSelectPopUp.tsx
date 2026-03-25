import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Checkbox,
  InputAdornment,
  Grid,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {

  setMultiSelectPopUp,
  setRowListing,
} from "@/hooks/LeadsReducer";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { MultiSelectCheck, TooltipValueBox } from "../style";
import { useAppDispatch } from "redux/store";
import {
  CommonFormcontrol,
  SmallFilledBtn,
  SmallOutineBtn,
  StyledBootstrapDialog,
  TitleDialog,
} from "../../commonStyle";
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  // onClose: () => void;
}
function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, ...other } = props;

  return <TitleDialog {...other}>{children}</TitleDialog>;
}

const MultiSelectPopUp = ({ open, data }: any) => {
  const { rowListing } = useSelector((state: any) => state.LeadsData);
  const [optionList, setOptionList] = useState([]);
  useEffect(() => {}, [rowListing]);

  const [stateRow, setStateRow] = useState({
    name: "Enter Name",
    defaultValue: "option 1",
    optionList: ["option 1"],
    checked: false,
    tooltip: false,
    tooltipValue: "Enter ToolTip value",
  });
  const [disableButton, setDisable] = useState<boolean>(false);
  const [optionError, setOptionError] = useState<boolean>(false);
  const handleToolTip = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateRow((prev) => ({ ...prev, tooltip: event.target.checked }));
  };
  const handleToolTipValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateRow((prev) => ({ ...prev, tooltipValue: event.target.value }));
  };
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateRow((prev) => ({ ...prev, name: event.target.value }));
  };
  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateRow((prev) => ({ ...prev, checked: event.target.checked }));
  };
  const updateOptionList = (newOptionList) => {
        setStateRow((prevState) => ({
      ...prevState,
      optionList: newOptionList,
    }));
  };
  const dispatch = useAppDispatch();
  const handleMultiSelectPopUpClose = (prop) => {


    setDisable(false);
    if(optionList?.length!==0){
      if (prop == 1) {
        const updatedArray = data.updatedArray.map((element, index) => {
          if (index === 0) { 
            return {
              ...element,
              name: stateRow.name,
              label: stateRow.name,
              tooltip: stateRow.tooltipValue,
              option_list: optionList,
              is_required: stateRow?.checked ? "1" : "0",
            };
          }
          return element;
        });
        data.updatednew.splice(data.destination.index, 0, updatedArray[0]);
           
        const newColumn = rowListing?.columnOrder.map((column) => {
          if (data.destination.droppableId === column.name) {
            return {
              ...column,
              form_fields: data?.updatednew,
            };
          }
          return column;
        });
  
        dispatch(
          setRowListing({
            ...rowListing,
            columnOrder: newColumn,
          })
        );
      }
      dispatch(setMultiSelectPopUp(false));
    }else{
      setOptionError(true)
    }
  };
  const handleChangeOption = (v,i) => {
    setOptionError(false)
      setOptionList((prevOptionList) => {
        const updatedOptionList = [...prevOptionList];
        const previousValue = updatedOptionList[i];
        updatedOptionList[i] = v.target.value;
        return updatedOptionList;
      });
  };

  return (
    <StyledBootstrapDialog
      open={open}
      onClose={() => {
        dispatch(setMultiSelectPopUp(false));
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <BootstrapDialogTitle id="customized-dialog-title">
        Multi Pick List Properties
      </BootstrapDialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CommonFormcontrol fullWidth size="small">
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Field Label*"
                onChange={handleName}
                defaultValue={stateRow.name}
              />
            </CommonFormcontrol>
          </Grid>
          <Grid item xs={12}>
            <CommonFormcontrol fullWidth size="small">
              {stateRow.optionList?.map((v, i) => (
                <>
                  <TextField
                    value={optionList[i]}
                    label="Multi Pick List Option"
                    name={`registration_website${i}`}
                    variant="outlined"
                    style={{ width: "100%" }}
                    size="small"
                    onChange={(e) => handleChangeOption(e,i)}
                    error={optionError?true:false}
                    helperText={optionError?"Please add any option":""}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          sx={{ cursor: "pointer" }}
                        >
                          {stateRow.optionList.length < 6 && (
                            <AddCircleOutlineIcon
                              style={{
                                color: "#D7282F",
                                height: "20px",
                                width: "27px",
                              }}
                              onClick={() => {
                                updateOptionList([
                                  ...stateRow.optionList,
                                  `option ${stateRow.optionList.length + 1}`,
                                ]);
                              }}
                            />
                          )}
                          {i > 0 ? (
                            <RemoveCircleOutlineIcon
                              style={{
                                color: "#231F20",
                                height: "20px",
                                width: "27px",
                              }}
                              onClick={() => {
                                let updatedList = [...stateRow.optionList];
                                updatedList.splice(i, 1);
                                updateOptionList(updatedList);
                              }}
                            />
                          ) : null}
                        </InputAdornment>
                      ),
                    }}
                  />
                  <br />
                </>
              ))}
            </CommonFormcontrol>
          </Grid>
          <Grid item xs={12} style={{ paddingTop: 0 }}>
            <MultiSelectCheck className="MainCheckbox">
              <Checkbox
                color="success"
                checked={stateRow.checked}
                onChange={handleChecked}
                inputProps={{ "aria-label": "controlled" }}
              />
              Required
              <br />
              <Checkbox
                color="success"
                checked={stateRow.tooltip}
                onChange={handleToolTip}
                inputProps={{ "aria-label": "controlled" }}
              />
              Show ToolTip
              {stateRow.tooltip && (
                <TooltipValueBox>
                  <CommonFormcontrol fullWidth size="small">
                    <TextField
                      value={stateRow.tooltipValue}
                      onChange={handleToolTipValue}
                    ></TextField>
                  </CommonFormcontrol>
                </TooltipValueBox>
              )}
            </MultiSelectCheck>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <SmallFilledBtn
          disabled={disableButton}
          type="submit"
          onClick={() => {
            setDisable(true);
            handleMultiSelectPopUpClose(1);
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
            "Done"
          )}
        </SmallFilledBtn>
        <SmallOutineBtn
          disabled={disableButton}
          onClick={() => {
            dispatch(setMultiSelectPopUp(false));
          }}
        >
          Cancel
        </SmallOutineBtn>
      </DialogActions>
    </StyledBootstrapDialog>
  );
};

export default MultiSelectPopUp;
