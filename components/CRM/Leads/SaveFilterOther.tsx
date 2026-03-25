import React, { useEffect, useState } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { ManageColumnList, ManagaDeleteDialog } from "../style";
import {
  CommonFormcontrol,
  SmallBlackOutineBtn,
  SmallOutineBtn,
  SmallRedOutineBtn,
  StyledBootstrapDialog,
} from "../commonStyle";
import { useSelector } from "react-redux";
import {
  informationTaskMeetingCalls,
  setCurrentFilterId,
  setFilterOthers,
  setFilterPopUp,
  setFilterShowOthers,
} from "@/hooks/UseCreateFormData";
import { useAppDispatch } from "redux/store";
import { ThreeDots } from "react-loader-spinner";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { apiClient } from "@/components/common/common";

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

const SaveFilterOther = ({ openPopUp }) => {
  const dispatch = useAppDispatch();
  const {
    taskMeetingCalls,
    saveLoader,
    currentFilterId,
    typeName,
    typeId,
    filterOthers,
  } = useSelector((state: any) => state.formList);
  const [fieldName, setFieldName] = useState("");
  const [error, setError] = useState(false);
  const handleCloseColumn = () => {
    dispatch(setFilterPopUp(false));
  };

  const handleChangeFields = (event, type) => {
    setFieldName(event.target.value);
  };

  useEffect(() => {
    setFieldName(currentFilterId && currentFilterId?.name);
  }, [currentFilterId]);

  const handleSaveFilterData = async () => {
    if (fieldName == "" || fieldName == null) {
      setError(true);
    } else {
      setError(false);
      let query = {
        fields:
          filterOthers?.length > 0
            ? filterOthers?.map((item) => item.name)
            : [],
        operators:
          filterOthers?.length > 0
            ? filterOthers?.map((item) => item.condition)
            : [],
        search_terms:
          filterOthers?.length > 0
            ? filterOthers?.map((item) => item.value)
            : [],
        logical_operators:
          filterOthers?.length > 0
            ? filterOthers
                ?.map((item, index) => (index !== 0 ? "or" : ""))
                ?.filter(Boolean)
            : [],
        type: typeName,
      };
      let body = {};
      if (currentFilterId?.id) {
        body = {
          name: fieldName,
          filter_id: currentFilterId?.id,
        };
      } else {
        body = {
          name: fieldName,
          total_results: taskMeetingCalls?.data?.total,
          type_name: typeName,
          type_id: typeId,
          filters: JSON.stringify(filterOthers),
          query: JSON.stringify(query),
        };
      }

      let response = await apiClient(`crm/saveFilterRequest`, "post", { body });
      if (response?.status == 200) {
        dispatch(setFilterPopUp(false));
        toast.success(response?.message);
        dispatch(setFilterShowOthers([]));
        dispatch(setFilterOthers([]));
        dispatch(setCurrentFilterId([]));
        dispatch(informationTaskMeetingCalls());
      }
    }
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
          {currentFilterId?.id ? "Update " : "Save "}
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
                helperText={error && "Please enter filter name"}
                onChange={(e) => handleChangeFields(e, "value")}
                onKeyDown={(e) =>
                  e.key == "Enter" ? handleSaveFilterData() : ""
                }
              />
            </CommonFormcontrol>
          </ManageColumnList>
        </DialogContent>
        <DialogActions>
          <SmallRedOutineBtn
            variant="outlined"
            autoFocus
            onClick={() => {
              handleSaveFilterData();
            }}
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
            ) : currentFilterId?.id ? (
              "Update"
            ) : (
              "Save"
            )}
          </SmallRedOutineBtn>
          <SmallBlackOutineBtn variant="outlined" onClick={handleCloseColumn}>
            Cancel
          </SmallBlackOutineBtn>
        </DialogActions>
      </StyledBootstrapDialog>
    </div>
  );
};

export default SaveFilterOther;
