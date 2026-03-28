import {
  createListOfTags,
  deleteListOfTags,
  getAllListOfTags,
  setManageTags,
  updateListOfTags
} from "@/hooks/UseCreateFormData";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Typography
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import moment from "moment";
import { MuiColorInput } from "mui-color-input";
import randomColor from "randomcolor";
import React, { useEffect, useRef, useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAppDispatch } from "redux/store";
import {
  DataGridStyle,
  SearchCommon,
  SmallFilledBtn,
  SmallOutineBtn,
  StyledBootstrapDialog,
} from "../commonStyle";
import {
  AddTagFooter,
  AddTagsBox,
  AddTagsFullwidth,
  CustomActionButon,
  CustomChip,
  LabelChipStack,
  ManagaTagDialog,
  ManageTagSearch,
  ManageTagSearchOuter,
  ManageTagTable,
  ManageTagText,
  PickerBox,
  TagFooterButton,
  TagRow
} from "../style";
import TagsInput from "./TagsInput";
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
const ManageTags = ({ openPopUp, type }) => {
  const dispatch = useAppDispatch();
  const { createListResponse, userTags, deleteStatus, selectedDataIds } =
    useSelector((state: any) => state.formList);
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const [manageUserTags, setManageUserTags] = useState([]);
  const [manageType, setManageType] = useState(type);

  const [childData, setChildData] = useState(null);
  const [tagSearch, setTagSearch] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [manageSearchQuery, setManageSearchQuery] = useState("");
  const receiveDataFromChild = (data) => {
    setChildData(data);
  };

  useEffect(() => {
    dispatch(getAllListOfTags());
  }, []);
  useEffect(() => {
    setManageUserTags(
      userTags?.map((tag) => ({
        ...tag,
        isEditing: false,
      }))
    );
  }, [deleteStatus]);

  const handleSearch = (event) => {
    setManageSearchQuery(event.target.value);
    var query = event.target.value;
    var updatedList = [...userTags];
    updatedList = updatedList.filter(
      (item) => item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
    setManageUserTags(updatedList);
  };
  const handleAdd = async () => {
    const filteredUserTags = userTags?.filter((item) => {
      return childData?.some((element) => element?.name === item.name);
    });
    const removeDuplicates = childData?.filter((element) => {
      return !filteredUserTags?.some((item) => item.name === element?.name);
    });
    if (childData.length >= 1) {
      let response = await dispatch(
        createListOfTags(
          !checked
            ? {
                unique_ids: selectedDataIds.join(","),
                tags: childData,
              }
            : {
                unique_ids: selectedDataIds.join(","),
                tags: removeDuplicates,
              }
        )
      );
      // checked && handleCloseColumn();
      // !checked && filteredUserTags?.length == 0 && handleCloseColumn();
      if (response?.payload?.status == 200) {
        handleCloseColumn();
      }
    } else {
      toast.error("Nothing Added");
    }
  };
  const handleManageAdd = async () => {
    const data = [
      {
        name: manageSearchQuery,
        background_color_code: randomColor({
          count: 1,
          luminosity: "light", // You can change this to 'dark' for darker colors
          format: "hex", // You can change this to 'rgb' or 'rgba' as needed
        })?.[0],
        type_id: 1,
        text_code: "#111",
      },
    ];

    await dispatch(createListOfTags(data));
    handleCloseColumn();
  };
  const handleRemove = async (id = null) => {
    if (id == "" || id == null) {
      const data = childData.map((item) => item.id);
      await dispatch(deleteListOfTags(data.toString()));
    } else {
      await dispatch(deleteListOfTags(id.toString()));
    }
    await dispatch(getAllListOfTags());
    // handleCloseColumn()
  };
  const handleCloseColumn = () => {
    dispatch(setManageTags(false));
  };

  const columns: GridColDef[] = [
    {
      field: "background_color_code",
      headerName: "Tag Color",
      minWidth: 50,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      renderCell: (cellValues) => {
        var tag = cellValues.row;
        const handleColorChange = (newColor) => {
          const updatedManageUserTags = manageUserTags.map((tag) => {
            if (tag.id === cellValues.row.id) {
              return { ...tag, background_color_code: `#${newColor.hex}` };
            }
            return tag;
          });

          setManageUserTags(updatedManageUserTags);
        };
        return (
          <>
            <PickerBox>
              <MuiColorInput
                format="hex"
                value={tag.background_color_code}
                onChange={handleColorChange}
              />
              <KeyboardArrowDownIcon />
            </PickerBox>
          </>
        );
      },
    },
    {
      field: "name",
      headerName: "Tag Name",
      minWidth: 100,
      flex: 0.8,
      align: "right",
      editable: true,
      headerAlign: "right",
      renderCell: (cellValues) => {
        var tag = cellValues.row;
        const handleName = (newName) => {
          const updatedManageUserTags = manageUserTags.map((tag) => {
            if (tag.id === cellValues.row.id) {
              return { ...tag, name: newName };
            }
            return tag;
          });
          setManageUserTags(updatedManageUserTags);
        };

        return (
          <>
            <LabelChipStack>
              <CustomChip
                style={{ backgroundColor: tag.background_color_code }}
              >
                {tag.name}
              </CustomChip>
              {/* )} */}
            </LabelChipStack>
          </>
        );
      },
    },
    {
      field: "updated_at",
      headerName: "Last Modified",
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (cellValues) => {
        return <> {moment(cellValues.value).format("MM/DD/YYYY")}</>;
      },
    },
    {
      field: "id",
      headerName: "Action",
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <DeleteTwoToneIcon
            style={{ color: "#D7282F" }}
            onClick={() => {
              handleRemove(cellValues?.row?.id);
            }}
          />
        );
      },
    },
  ];
  const gridApiRef = useRef(null);

  return (
    <div>
      <StyledBootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={openPopUp}
        sx={ManagaTagDialog}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseColumn}
        >
          {manageType == 5
            ? "Manage Tags"
            : manageType == 0
            ? "Add Tags"
            : "Remove Tags"}
          <ManageTagText variant="subtitle1" gutterBottom>
            {manageType == 5
              ? "Below is a list of every Tag related to leads. You have the ability to rename or remove Tags from the list."
              : manageType == 0
              ? "Ability to add tags here"
              : "Ability to remove tags"}
          </ManageTagText>
        </BootstrapDialogTitle>

        <DialogContent dividers>
          {manageType == 5 ? (
            <>
              <ManageTagSearchOuter>
                <Grid container spacing={2}>
                  <Grid item md={7.5}>
                    <ManageTagSearch>
                      <SearchCommon className="SearchManagetag">
                        <TextField
                          fullWidth
                          id="standard-bare"
                          variant="outlined"
                          placeholder="Search"
                          value={tagSearch}
                          onInput={(e) => handleSearch(e)}
                          InputProps={{
                            endAdornment: (
                              <IconButton>
                                {manageUserTags.length == 0 && (
                                  <BsPlusCircleFill
                                    onClick={(e) => {
                                      handleManageAdd();
                                    }}
                                  />
                                )}
                              </IconButton>
                            ),
                          }}
                        />
                      </SearchCommon>
                    </ManageTagSearch>
                  </Grid>
                </Grid>
              </ManageTagSearchOuter>
              {manageUserTags.length >= 1 && (
                <ManageTagTable style={{ height: 344, width: "100%" }}>
                  <DataGridPro
                    ref={gridApiRef}
                    rows={manageUserTags}
                    columns={columns}
                    loading={manageUserTags.length === 0}
                    rowHeight={40}
                    sx={DataGridStyle}
                    hideFooterRowCount
                    hideFooterPagination
                    hideFooterSelectedRowCount
                    onCellEditCommit={(params: any, event) => {
                      const updatedTags = manageUserTags.map((t) =>
                        t.id === params.row.id
                          ? { ...t, name: params.value }
                          : t
                      );
                      const data = updatedTags.filter(
                        (t) => t.id == params.row.id
                      );
                      dispatch(updateListOfTags(data));
                      setManageUserTags(updatedTags);
                    }}
                  />
                </ManageTagTable>
              )}
            </>
          ) : manageType == 0 ? (
            <>
              <AddTagsFullwidth>
                <TagRow>
                  <TagsInput type={type} sendData={receiveDataFromChild} />
                </TagRow>
              </AddTagsFullwidth>
              {/* <SmallFilledBtn
                  variant="outlined"
                  startIcon={<AddCircleOutlineOutlinedIcon />}
                  onClick={() => handleAdd()}
                >
                  Add Tags
                </SmallFilledBtn> */}
              <AddTagFooter>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Overwrite any existing Tags in the selected records with the above Tag(s)."
                />
                <TagFooterButton>
                  <Typography>Separate Tags using commas</Typography>
                  <CustomActionButon>
                    <SmallFilledBtn
                      variant="outlined"
                      onClick={() => handleAdd()}
                    >
                      Save
                    </SmallFilledBtn>
                    <SmallOutineBtn
                      variant="outlined"
                      onClick={() => {
                        setChildData(null);
                        handleCloseColumn();
                      }}
                    >
                      Cancel
                    </SmallOutineBtn>
                  </CustomActionButon>
                </TagFooterButton>
              </AddTagFooter>
            </>
          ) : (
            <>
              <AddTagsBox>
                <Grid container spacing={2}>
                  <Grid item sm={9} md={9}>
                    <TagRow>
                      <TagsInput type={type} sendData={receiveDataFromChild} />
                    </TagRow>
                  </Grid>
                  <Grid item sm={3} md={3}>
                    <SmallFilledBtn
                      variant="outlined"
                      startIcon={<AddCircleOutlineOutlinedIcon />}
                      onClick={() => handleRemove()}
                    >
                      Remove Tags
                    </SmallFilledBtn>
                  </Grid>
                </Grid>
              </AddTagsBox>
            </>
          )}
        </DialogContent>
      </StyledBootstrapDialog>
    </div>
  );
};

export default ManageTags;
