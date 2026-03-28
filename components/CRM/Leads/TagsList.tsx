import {
  createListOfTags,
  deleteListOfTags,
  getAllListOfTags,
  setManageTags,
  updateListOfTags
} from "@/hooks/UseCreateFormData";
import CloseIcon from "@mui/icons-material/Close";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  DialogTitle,
  Divider,
  IconButton,
  TextField
} from "@mui/material";
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
  CrmFullData,
  CrmWhiteContainer,
  DataGridStyle,
  SearchCommon
} from "../commonStyle";
import {
  CustomChip,
  DesManagetag,
  HeadingManagetag,
  LabelChipStack,
  ManageTagContainer,
  ManageTagTable,
  PickerBox,
  Tagsearch
} from "../style";
/** Common file for these two components **/
import { OuterContainer } from "../../SellerTools/styles";
/** Common file for these two components **/
import SearchIcon from "@mui/icons-material/Search";
import { ProfileHeader } from "../../common/profileheader";
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
const TagListing = () => {
  const dispatch = useAppDispatch();
  const { createListResponse, userTags, deleteStatus, selectedDataIds, saveLoader } = useSelector(
    (state: any) => state.formList
  );
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const [manageUserTags, setManageUserTags] = useState([]);
  // const [manageType, setManageType] = useState(type);

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
    console.log(userTags, "userTags");

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
      let response = await dispatch(createListOfTags(!checked ? {
        unique_ids: selectedDataIds.join(','),
        tags: childData
      } : {
        unique_ids: selectedDataIds.join(','),
        tags: removeDuplicates
      }
      ));
      // checked && handleCloseColumn();
      // !checked && filteredUserTags?.length == 0 && handleCloseColumn();
      if (response?.payload?.status == 200) {
        handleCloseColumn()
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
    if (id == '' || id == null) {
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
      flex: 1,
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
              {/* <TwitterPicker
                className="pickerPanel"
                value={tag.background_color_code}
                onChange={handleColorChange}
                colors={[
                  "#FF6900",
                  "#FCB900",
                  "#7BDCB5",
                  "#00D084",
                  "#8ED1FC",
                  "#0693E3",
                  "#ABB8C3",
                  "#EB144C",
                  "#F78DA7",
                  "#9900EF",
                  "#D0021B",
                  "#F5A623",
                  "#F8E71C",
                  "#8B572A",
                  "#7ED321",
                  "#50E3C2",
                ]}
              /> */}
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
      flex: 1,
      align: "center",
      editable: true,
      headerAlign: "center",
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
        const handleNames = (e) => {
          console.log(e, "handleNames");
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
        return <DeleteTwoToneIcon style={{ color: '#D7282F' }} onClick={() => {
          handleRemove(cellValues?.row?.id)
        }} />
      },
    },
  ];
  const gridApiRef = useRef(null);


  return (
    <div className="full_page">
      <CrmFullData>
        <OuterContainer>
          <ProfileHeader text={"Lead Management Center"} />
        </OuterContainer>
        <CrmWhiteContainer>
            {/* <CommonCRMTabs activeButton={1} /> */}
          <HeadingManagetag variant="h4" gutterBottom>
            Manage Tags
          </HeadingManagetag>
          <DesManagetag variant="subtitle1" gutterBottom>
            Below is a list of every Tag related to leads. You have the ability to rename or remove Tags from the list.
          </DesManagetag>
          <Divider />
          <ManageTagContainer>
            <Tagsearch>
              <SearchCommon className="SearchManagetag">
                <TextField
                  fullWidth
                  id="standard-bare"
                  variant="outlined"
                  placeholder="Search or Add tag"
                  value={tagSearch}
                  onInput={(e) => handleSearch(e)}
                  InputProps={{
                    endAdornment: (
                      <IconButton>
                        <SearchIcon />
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
            </Tagsearch>
            <ManageTagTable style={{ height: 344, width: "100%" }}>
              <DataGridPro
                ref={gridApiRef}
                rows={manageUserTags.length > 0 ? manageUserTags : []}
                columns={columns}
                loading={saveLoader }
                rowHeight={40}
                sx={DataGridStyle}
                hideFooterRowCount
                hideFooterPagination
                hideFooterSelectedRowCount
                checkboxSelection
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
          </ManageTagContainer>
        </CrmWhiteContainer>
      </CrmFullData>
    </div>
  );
};

export default TagListing;
