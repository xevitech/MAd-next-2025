import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import {
  createListOfTags,
  deleteListOfTags,
  getAllFieldData,
  getAllListOfTags,
  getKanbanList,
  setAddedTags,
  setCreateIndividualTag,
} from "@/hooks/UseCreateFormData";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ColorizeOutlinedIcon from "@mui/icons-material/ColorizeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import {
  Autocomplete,
  Chip,
  Paper,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { useRouter } from "next/router";
import randomColor from "randomcolor";
import React, { useEffect, useState } from "react";
import {
  SketchPicker,
  TwitterPicker,
} from "react-color";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import {
  NoTagsCreated,
  SavedTagsArea,
  SearchAddTag,
  TagAutocompleteOptions
} from "../style";
const TagsInput = (props) => {
  const dispatch = useAppDispatch();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  // const [addedTags, setAddedTags] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deletedData, setDeletedData] = useState<any>("");
  const [editId, setEditId] = useState(0);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showChildColorPicker, setShowChildColorPicker] = useState(false);
  const router = useRouter();
  const [colorCode, setColorCode] = useState("");
  const { userTags, typeId, selectedDataIds, savedFieldData, individualTag, details, addedTags } = useSelector(
    (state: any) => state.formList
  );

  useEffect(() => {
    dispatch(getAllListOfTags());
    // if (individualTag?.length > 0 && router?.query?.id == details?.unique_id) setAddedTags(individualTag)
  }, [dispatch]);

  const handleTagInputChange = (event, newValue) => {
    if (newValue) setTagInput(newValue);
    if (tagInput.length == 1 && newValue == "") setTagInput(newValue);
  };

  const handleOption = async (option) => {
    setAnchorEl(0);
    const data = userTags.filter((item) => option?.name == item.name);
    data.map((item) =>
      setTags([
        ...tags,
        {
          id: item.id,
          name: item.name,
          background_color_code: item?.background_color_code,
          //  randomColor({
          //     count: 1,
          //     luminosity: "light", // You can change this to 'dark' for darker colors
          //     format: "hex", // You can change this to 'rgb' or 'rgba' as needed
          //   })?.[0],
          type_id: typeId ?? typeId,
          // text_code: "#111",
        },
      ])
    );
    let body = {
      tags: [
        {
          name: data?.[0]?.name.trim(),
          background_color_code: data?.[0]?.background_color_code,
          type_id: typeId ?? typeId,
          text_code: data?.[0]?.text_code,
        },
      ],
      unique_ids: Array.isArray(selectedDataIds)==false||selectedDataIds?.length==0 ? router?.query?.id[0] : selectedDataIds?.join(","),
    };

    let response = await dispatch(createListOfTags(body));
    if (response?.payload?.status == true || response?.payload?.status == 200) {
      setTags([]);
      setTagInput("");
    }
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" && tagInput.trim() !== "") {
      var backColor = randomColor({
        count: 1,
        luminosity: "light", // You can change this to 'dark' for darker colors
        format: "hexa", // You can change this to 'rgb' or 'rgba' as needed
      })?.[0];
      var frontColor = randomColor({
        count: 1,
        luminosity: "dark", // You can change this to 'dark' for darker colors
        format: "hexa", // You can change this to 'rgb' or 'rgba' as needed
      })?.[0];

      if (tagInput.trim() !== "") {
        setEditId(0);
        setAnchorEl(0);
        let body = {};
        if (editId != 0) {
          body = {
            name: tagInput.trim(),
            id: editId,
            type_id: typeId,
          };
        } else {
          body = {
            tags: [
              {
                name: tagInput.trim(),
                background_color_code: backColor,
                type_id: typeId,
                text_code: "#fff",
              },
            ],
            unique_ids:  Array.isArray(selectedDataIds)==false||selectedDataIds?.length==0 ? router?.query?.id[0] : selectedDataIds?.join(","),
          };

        }
        let response = await dispatch(createListOfTags(body));
        if (response.payload?.status == true || response.payload?.status == 200) {
        
          // setAddedTags([...addedTags,{
          //   name: tagInput.trim(),
          //   background_color_code: backColor,
          //   type_id: typeId,
          //   text_code: "#fff",
          // }])
          if(individualTag?.length>0){
            dispatch(setCreateIndividualTag([...individualTag,{ name: tagInput.trim(),
              background_color_code: backColor,
              type_id: typeId,
              text_code: "#fff",}]))
            setTags([]);
            setTagInput("");
            dispatch(getKanbanList());
          }else{
            dispatch(setCreateIndividualTag([{ name: tagInput.trim(),
              background_color_code: backColor,
              type_id: typeId,
              text_code: "#fff",}]))
            setTags([]);
            setTagInput("");
            dispatch(getKanbanList());
          }
         
        }
      }
    }
  };

  const handleDeleteTag = async (tagToDelete) => {
    setShowColorPicker(false);
    setDeleteConfirmation(true);
    setDeletedData(tagToDelete);
  };

  const [anchorEl, setAnchorEl] = React.useState(0);
  const open = Boolean(anchorEl);
  const handleClick = (id) => {
    setAnchorEl(id);
    setShowColorPicker(false);
  };

  const handleClose = () => {
    setAnchorEl(0);
    setShowColorPicker(false);
  };

  const getAllAreadyAddedTags = () => {
    let filteredArray = savedFieldData?.data?.data.filter((item) =>
      selectedDataIds.includes(item.id)
    );
    if (filteredArray?.length > 0) {
       // const uniqueTagsSet = new Set(addedTags);
      const uniqueTagsSet = new Set([]);
      filteredArray.forEach((newTags) => {
        if (newTags?.tag) {
          newTags.tag.forEach((tag) => {
            uniqueTagsSet.add(tag);
          });
        }
      });
      const updatedTags = Array.from(uniqueTagsSet);
      dispatch(setAddedTags(
        Array.from(new Set(updatedTags?.map((item) => item.id)))?.map((id) => {
          return updatedTags?.find((item) => item.id === id);
        })
      ));
    }
  };
  useEffect(() => {
    getAllAreadyAddedTags();
    dispatch(getAllFieldData());
  }, [savedFieldData,userTags]);

  const DeleteTags = async () => {
    await dispatch(deleteListOfTags(deletedData?.id?.toString()));
    let filterTags = addedTags?.filter((ele) => ele.id !== deletedData?.id);
    dispatch(setAddedTags(filterTags));
    await dispatch(getAllFieldData());
    setDeleteConfirmation(false);
    dispatch(getKanbanList());
    };

  const handleColorChange = async (newColor) => {
    setColorCode(newColor?.hex);
    // handleDebouncedSearch(newColor)
  };

  const handleColorSelect = async () => {
    let body = {
      background_color_code: `${colorCode}`,
      id: editId,
      type_id: typeId,
    };
    let response = await dispatch(createListOfTags(body));
    if (response.payload.status == true || response.payload.status == 200) {
      setShowColorPicker(false);
      setShowChildColorPicker(false);
      setEditId(0);
      dispatch(getKanbanList());
    }
  };

  const handleChangeComplete = (color) => {
    setColorCode(color?.hex);
    // setShowChildColorPicker(false)
  };
  const handleChangeBgColor = () => {
    return (
      <span>
        <TwitterPicker
          className="pickerPanel"
          value={colorCode}
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
        />
        <div className="tagbuttonsouter">
          <div className="tagbuttons">
            <span
              className="tagpickericon"
              onClick={() => {
                setShowChildColorPicker(true);
              }}
              style={{
                color: colorCode,
              }}
            >
              <Tooltip title="Color Picker" arrow>
                <IconButton className="pickerbutton">
                  <ColorizeOutlinedIcon />
                </IconButton>
              </Tooltip>
            </span>
            {/* <Button className="pickerbutton" onClick={handleColorSelect} variant="contained" size="small"><SaveOutlinedIcon /></Button> */}
            {/* <Button className="pickerbutton" onClick={() => {
              setShowColorPicker(false)
              setEditId(0)
            }} variant="contained" size="small"><ClearOutlinedIcon /></Button> */}
            <Tooltip title="save" arrow>
              <IconButton className="pickerbutton" onClick={handleColorSelect}>
                <SaveOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Clear" arrow>
              <IconButton
                className="pickerbutton"
                onClick={() => {
                  setShowColorPicker(false);
                  setEditId(0);
                }}
              >
                <ClearOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </span>
    );
  };
  const listOfTags =
    userTags?.length > 0
      ? userTags.filter(
        (item2) => !addedTags?.some((item1) => item1.id === item2.id)
      )
      : [];

      return (
        <div className="colorpicbox">
          {deleteConfirmation && (
            <DeleteDialog
              open={deleteConfirmation}
              handleClose={() => setDeleteConfirmation(false)}
              text="tag"
              onClickAction={DeleteTags}
            />
          )}

      <SavedTagsArea>
        {addedTags?.map((tag, childIndex) => (
          <>
            <Chip
              className="tagchip"
              key={childIndex}
              size="small"
              label={
                <>
                  <span className="labelName">{tag?.name}</span>
                  <span
                    className="chipActions"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Tooltip title="Rename Tag" arrow>
                      <DriveFileRenameOutlineOutlinedIcon
                        fontSize="small"
                        sx={{ color: tag?.background_color_code }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setAnchorEl(null);
                          setTagInput(tag.name);
                          // setTags(tag.name);
                          setEditId(tag.id);
                          // e.stopPropagation();
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Change Color" arrow>
                      <WaterDropOutlinedIcon
                        fontSize="small"
                        sx={{ color: tag?.background_color_code }}
                        onClick={(e) => {
                          setColorCode(tag?.background_color_code);
                          setEditId(tag?.id);
                          setShowColorPicker(true);
                          e.stopPropagation();
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete Tag" arrow>
                      <DeleteOutlineOutlinedIcon
                        fontSize="small"
                        sx={{ color: tag?.background_color_code }}
                        onClick={() => {
                          handleDeleteTag(tag);
                        }}
                      />
                    </Tooltip>
                  </span>
                </>
              }
              sx={{
                color: tag.color_code,
                backgroundColor: tag.background_color_code,
              }}
            />
          </>
        ))}
      </SavedTagsArea>

      {showColorPicker && handleChangeBgColor()}
      {showChildColorPicker && (
        <SketchPicker
          color={colorCode}
          openAtStart
          onChange={handleChangeComplete}
        />
      )}
      <Autocomplete
        sx={{ boxShadow: "none" }}
        ListboxProps={{
          className: "myCustomListtag",
        }}
        popupIcon={<KeyboardArrowDownOutlinedIcon />}
        fullWidth
        multiple
        id="tags"
        disableClearable
        forcePopupIcon={false}
        PaperComponent={({ children }) => (
          <Paper
            style={{
              // boxShadow:
              //   "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
              boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
              borderRadius: "0 0 4px 4px",
              margin: "-1px 0 0",
            }}
          >
            {children}
          </Paper>
        )}
        // options={userTags.map((item) => item)} // Make sure userTags contains the expected data
        options={listOfTags}
        value={tags}
        limitTags={10}
        onChange={(event, newValue) => {
          setTags(newValue);
        }}
        inputValue={tagInput}
        onInputChange={handleTagInputChange}
        renderTags={(value, getTagProps) =>
          value?.map((tag, index) => (
            <Chip
              key={index}
              size="small"
              label={tag.name} // Render the 'name' property
              sx={{
                color: tag.text_code,
                backgroundColor: tag.background_color_code,
              }} // Apply the 'color' property to the background
              onDelete={() => handleDeleteTag(tag)}
              {...getTagProps({ index })}
            />
          ))
        }
        filterOptions={(userTags, params) => {
          const filtered = userTags.filter((option) =>
            option.name.toLowerCase().includes(params.inputValue.toLowerCase())
          );
          return filtered;
        }}
        renderOption={(props, option, state) => (
          <TagAutocompleteOptions>
            <nav
              aria-label="main mailbox folders"
              className="autocompleteouter"
            >
              <List>
                <ListItem disablePadding onClick={() => handleClose()}>
                  <ListItemButton disableRipple>
                    <span
                      {...props}
                      style={{
                        color: `${option?.background_color_code}`,
                      }}
                      onClick={() => handleOption(option)}
                    >
                      {option?.name}
                    </span>
                    <div>
                      <div
                        className="iconButtonds"
                        onClick={() => {
                          handleClick(option.id);
                        }}
                      >
                        <Tooltip title="Rename Tag" arrow>
                          <DriveFileRenameOutlineOutlinedIcon
                            fontSize="small"
                            sx={{ color: option?.background_color_code }}
                            onClick={() => {
                              setAnchorEl(null);
                              setTagInput(option.name);
                              setEditId(option.id);
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Change Color" arrow>
                          <WaterDropOutlinedIcon
                            fontSize="small"
                            sx={{ color: option?.background_color_code }}
                            onClick={(e) => {
                              setColorCode(option?.background_color_code);
                              setEditId(option?.id);
                              setShowColorPicker(true);
                              e.stopPropagation();
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Delete Tag" arrow>
                          <DeleteOutlineOutlinedIcon
                            fontSize="small"
                            sx={{ color: option?.background_color_code }}
                            onClick={() => {
                              handleDeleteTag(option);
                            }}
                          />
                        </Tooltip>
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </TagAutocompleteOptions>
        )}
        renderInput={(params) => (
          <SearchAddTag>
            {/* {
              !showColorPicker && ( */}
            <TextField
              style={{ boxShadow: "none" }}
              fullWidth
              {...params}
              placeholder={
                props.type == 2 ? "Remove Tags" : "Search or Create New"
              }
              variant="outlined"
              onKeyDown={handleKeyDown}
            />
            {/* )
            } */}
          </SearchAddTag>
        )}
      />
      {userTags?.length == 0 && (
        <NoTagsCreated>
          <Typography>No Tags Created</Typography>
        </NoTagsCreated>
      )}
    </div>
  );
};

export default TagsInput;
