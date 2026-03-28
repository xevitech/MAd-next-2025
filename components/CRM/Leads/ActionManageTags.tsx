import { Grid, IconButton, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  AddButton,
  CustomChip,
  LabelChipStack,
  ManageTagSearch,
  ManageTagSearchOuter,
  ManageTagTable,
  PickerBox,
} from "../style";

import {
  createListOfTags,
  deleteListOfTags,
  getAllListOfTags,
  setManageTags,
  updateListOfTags,
} from "@/hooks/UseCreateFormData";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import moment from "moment";
import { MuiColorInput } from "mui-color-input";
import randomColor from "randomcolor";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { DataGridStyle, SearchCommon } from "../commonStyle";
import ManageTags from "./ManageTags";
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const ActionManageTags = () => {
  const dispatch = useAppDispatch();
  const { userTags, deleteStatus, manageTags } = useSelector(
    (state: any) => state.formList
  );

  const [manageUserTags, setManageUserTags] = useState([]);

  const [tagSearch, setTagSearch] = useState();
  const [manageSearchQuery, setManageSearchQuery] = useState("");
  const handleAddNewTag = async (id) => {
    dispatch(getAllListOfTags())
    dispatch(setManageTags(true))
  }

  useEffect(() => {
    dispatch(getAllListOfTags());
  }, []);

  useEffect(() => {

    setManageUserTags(
      userTags.map((tag) => ({
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

  const handleManageAdd = async () => {
    const data = [
      {
        name: manageSearchQuery,
        background_color_code: randomColor({
          count: 1,
          luminosity: "light",
          format: "hex",
        })?.[0],
        type_id: 1,
        text_code: "#111",
      },
    ];

    await dispatch(createListOfTags(data));
    handleCloseColumn();
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
                hideTextfield
                disableAlpha
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

        return (
          <>
            <LabelChipStack>
              <CustomChip
                style={{ backgroundColor: tag.background_color_code }}
              >
                {tag.name}
              </CustomChip>
            </LabelChipStack>
          </>
        );
      },
    },

    {
      field: "created_at",
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

        return <IconButton onClick={() => dispatch(deleteListOfTags(cellValues?.value))}>Delete</IconButton>;
      },
    },
  ];
  const gridApiRef = useRef(null);
  return (
    <div>
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
                  />
                </SearchCommon>
              </ManageTagSearch>
            </Grid>
            <Grid item md={2.5}>
              <AddButton onClick={handleAddNewTag}>New Tag</AddButton>
            </Grid>
          </Grid>
        </ManageTagSearchOuter>
        {/* <Grid  md={2.5}>
              <AddButton sx={{backgroundColor:"black"}} onClick={handleAddNewTag}>New Tag</AddButton>
            </Grid> */}
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
                  t.id === params.row.id ? { ...t, name: params.value } : t
                );
                const data = updatedTags.filter((t) => t.id == params.row.id);
                dispatch(updateListOfTags(data));
                setManageUserTags(updatedTags);
              }}
            />
          </ManageTagTable>
        )}
        {manageTags && <ManageTags openPopUp={true} type={0} />}
      </>
    </div>
  );
};

export default ActionManageTags;
