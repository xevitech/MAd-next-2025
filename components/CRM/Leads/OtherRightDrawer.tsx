import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Autocomplete,
  Chip,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CircularProgress from "@mui/material/CircularProgress";
import {
  CustomViewOuter,
  CustomTopBar,
  CustomActionButon,
  SpecifiCriteria,
  CustomViewInner,
  NumCircle,
  NumCircleOuter,
  MiddleText,
  StackHeading,
  CustolFieldData,
  ChooseCoulmnView,
  CustomViewWrapper,
  CustomFieldControl,
  CustomViewDrawer,
  FilterField,
} from "../style";

import { Box, Divider, FormControl, Grid, Typography } from "@mui/material";
import {
  ActionIcons,
  CommonFormcontrol,
  IconButtonAdd,
  IconButtonRemove,
  SmallBlackOutineBtn,
  SmallOutineBtn,
  SmallRedOutineBtn,
} from "../commonStyle";
import { useSelector } from "react-redux";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
  CheckBoxFilter,
  DateFilter,
  DropDownFilter,
  NumberFilter,
  StringFilter,
  convertQuery,
  taskFields,
} from "@/components/common/common";
import Column from "../DragDrop/Column";
import { toast } from "react-toastify";
import {
  deleteCustomViews,
  getAllSavedViews,
  getSingleCustomViews,
  saveCustomViewData,
  //   setCurrentCustomView,
  //   setOtherCurrentCustomView
} from "@/hooks/UseCreateFormData";
import { useAppDispatch } from "redux/store";
import { ThreeDots } from "react-loader-spinner";
import CommonOwner from "./CommonOwner";
import { CustomDatePicker } from "@/components/common/datePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";
import { CustomDateTimePicker } from "@/components/common/datePicker/CustomDateTimePicker";
import dynamic from "next/dynamic";
const MobileInputCommon = dynamic(
  async () => import("@/components/common/PhoneInput"),
  {
    ssr: false,
  }
);
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      "&::-webkit-scrollbar": {
        width: "3px",
        height: "4px",
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#dedede",
        borderRadius: "4px",
      },
    },
  },
};
const OtherRightDrawer = ({ callCloseCustomView }) => {
  const {
    savedFieldData,
    customViewId,
    saveLoader,
    currentCustomView,
    otherCurrentCustomView,
    deleteLoader,
    userLists,
    userTags,
  } = useSelector((state: any) => state.formList);
  const [customState, setCustomState] = useState({ right: false });
  const [filterTags, setFilterTags] = useState<any>([]);
  const [showCriteria, setShowCriteria] = useState([]);
  const [filterType, setFilterType]: any = useState([]);
  const [viewName, setViewName] = useState("");
  const [viewNameError, setViewNameError] = useState(false);
  const [viewFieldError, setViewFieldError] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const dispatch = useAppDispatch();
  const [starter, setStarter] = useState({
    defaultFields: {
      1: { id: "1", content: "" },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "Available",
        taskIds: [1],
      },
      "column-2": {
        id: "column-2",
        title: "Selected",
        taskIds: [],
      },
    },
    columnOrder: ["column-1", "column-2"],
  });

  const [inputList, setInputList] = useState([
    {
      id: "",
      condition: "",
      value: "",
      opertaor: "And",
      userID: "",
    },
  ]);

  useEffect(() => {
    const outputObject = {};
    const ids = [];

    if (otherCurrentCustomView?.id && otherCurrentCustomView?.id != undefined) {
      let splitSelectedFields = otherCurrentCustomView?.selected_fields
        ?.split(",")
        .map(function (x) {
          return parseInt(x, 10);
        });
      const filteredArray = savedFieldData?.data?.filter_fields
        .filter((value) => splitSelectedFields?.includes(value.id))
        ?.map((obj) => obj.id);

      taskFields?.forEach((item, index) => {
        const itemId = item.id;
        const { id, name } = item;
        if (!splitSelectedFields?.includes(id)) {
          ids.push(itemId);
        }
        outputObject[itemId] = {
          id: String(id),
          content: name,
        };
      });
      let formattedData: any = {
        defaultFields: outputObject,
        columns: {
          "column-1": {
            id: "column-1",
            title: "Available",
            taskIds: ids,
          },
          "column-2": {
            id: "column-2",
            title: "Selected",
            taskIds: filteredArray,
          },
        },
        columnOrder: ["column-1", "column-2"],
      };

      let savedJson = JSON.parse(otherCurrentCustomView?.criteria);
      setInputList(savedJson);
      let filterTypes = savedFieldData?.data?.filter_fields.filter(
        (item) =>
          savedJson?.length > 0 &&
          savedJson?.map((ele) => ele.id).includes(item.id)
      );
      let tags = filterTypes?.find((item) => item.field_type === "tag");
      setFilterType(filterTypes);
      setFilterTags(
        userTags.filter((item) =>
          savedJson
            .find((item) => item.id === tags?.id)
            ?.value.includes(item.id)
        )
      );
      setStarter(formattedData);
      setViewName(otherCurrentCustomView?.name);
      setIsFavourite(
        otherCurrentCustomView?.is_favourite == "1" ? true : false
      );
    } else {
      taskFields.forEach((item, index) => {
        if (item?.name != "id") {
          const itemId = item.id;
          ids.push(itemId);
          const { id, name } = item;

          outputObject[itemId] = {
            id: String(id),
            content: name,
          };
        }
      });

      let formattedData: any = {
        defaultFields: outputObject,
        columns: {
          "column-1": {
            id: "column-1",
            title: "Available",
            taskIds: ids,
          },
          "column-2": {
            id: "column-2",
            title: "Selected",
            taskIds: [],
          },
        },
        columnOrder: ["column-1", "column-2"],
      };
      setStarter(formattedData);
      setIsFavourite(false);
      setViewName("");
      setInputList([
        {
          id: "",
          condition: "",
          value: "",
          opertaor: "And",
          userID: "",
        },
      ]);
      setFilterType([]);
    }
  }, [otherCurrentCustomView, savedFieldData]);

  const handleViewName = (e) => {
    setViewName(e.target.value);
    setViewNameError(false);
  };

  const autocompleteRef = useRef(null);
  const handleChangeCriteria = async (type, e, inputIndex, inputType) => {
    if (type == 1) {
      const list = [...inputList];
      list[inputIndex]["opertaor"] = e == "Or" ? "And" : "Or";
      setInputList(list);
    } else {
      if (inputType != "tag" && inputType != "integer") {
        const { name, value } = e.target;
        const list = [...inputList];
        list[inputIndex][name] = value;
        setInputList(list);
      } else if ((inputType = "integer")) {
        // const { name, value } = e.target;
        const list = [...inputList];
        list[inputIndex]["value"] = e;
        setInputList(list);
      } else {
        const list = [...inputList];
        list[inputIndex][e?.target?.name] = e?.target?.mainId;
        list[inputIndex]["value"] = e?.target?.value;
        setInputList(list);
      }
    }
  };

  const handleAddNewInput = () => {
    const list = [...inputList];
    list.push({
      id: "",
      condition: "",
      value: "",
      opertaor: "And",
      userID: "",
    });
    setInputList(list);
  };

  const handleRemoveNewInput = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const onDragEnd = ({ destination, source, draggableId, type }) => {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = starter.columns[source.droppableId];
    const end = starter.columns[destination.droppableId];

    if (type === "column") {
      const newOrder = [...starter.columnOrder];
      newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, draggableId);

      setStarter({
        ...starter,
        columnOrder: newOrder,
      });
      return;
    }

    if (start === end) {
      const column = starter.columns[source.droppableId];
      const taskIds = [...column.taskIds];
      taskIds.splice(source.index, 1);
      taskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...column,
        taskIds,
      };
      setStarter({
        ...starter,
        columns: {
          ...starter.columns,
          [column.id]: newColumn,
        },
      });
      return;
    }

    const startTaskIds = [...start.taskIds];
    const endTaskIds = [...end.taskIds];

    startTaskIds.splice(source.index, 1);
    endTaskIds.splice(destination.index, 0, draggableId);

    const newStartColumn = {
      ...start,
      taskIds: startTaskIds,
    };
    const endTaskColumn = {
      ...end,
      taskIds: endTaskIds,
    };

    setStarter({
      ...starter,
      columns: {
        ...starter.columns,
        [start.id]: newStartColumn,
        [end.id]: endTaskColumn,
      },
    });
  };

  const addRemoveSelectedField = async (id, location, type) => {
    let column1 = starter?.columns["column-1"]?.taskIds;
    let column2 = starter?.columns["column-2"]?.taskIds;
    if (type == "remove") {
      var index = column2?.indexOf(id);
      // if (index !== -1) {
      //     column2.splice(index, 1);
      //     column1.push(id);
      // }
      column2.splice(location, 1);
      column1.push(Number(id));
    } else {
      column1.splice(location, 1);
      column2.push(id);
    }
    setStarter((prev) => ({
      ...prev,
      ["column-2"]: column2,
      ["column-1"]: column1,
    }));
  };

  const saveCustomView = async () => {
    if (
      viewName == "" ||
      starter?.columns["column-2"]["taskIds"]?.length == 0
    ) {
      viewName == "" && setViewNameError(true);
      starter?.columns["column-2"]["taskIds"]?.length == 0 &&
        setViewFieldError(true);
      return false;
    }

    let criteria: any = [];
    let querryNew = "";
    if (inputList.length == 0) {
      if (
        inputList[0].id == "" ||
        inputList[0].condition == "" ||
        inputList[0].value == ""
      ) {
        criteria = [];
      }
    } else {
      inputList.map((ele, index) => {
        if (ele.id != "" && ele.condition != "") {
          criteria.push({
            id: ele.id,
            condition: ele.condition,
            value: ele.value,
            opertaor: ele.opertaor,
            userID: ele.userID,
          });
          // let operator = inputList?.[index - 1]?.opertaor ? inputList[index - 1]?.opertaor : 'AND'
          let operator = inputList?.[index - 1]?.opertaor ? "OR" : "AND";
          // querryNew = querryNew + `${operator} (form_input_list_id = ${ele.id} AND value ${ele.condition} ${ele.value})`;
          // querryNew = querryNew + ' '+operator+' (`form_input_list_id` = '+'`'+ele.id+ '` AND `value` ' +ele.condition+' `'+ele.value+'`)';
          // querryNew = querryNew + " "+operator+ " (`form_input_list_id` = "+"'" +ele.id+ "' AND `value` " + convertQuery(ele.condition, ele.value)+ "' )";
          querryNew =
            querryNew +
            " " +
            operator +
            " (`section_form_id` = " +
            "'" +
            ele.id +
            "' And " +
            convertQuery(ele.condition, ele.value);
        }
      });
    }

    let userData = localStorage?.getItem("userData") ?? "";
    let user = userData ? JSON.parse(userData) : "";
    let postData = {
      name: viewName,
      form_unique_id: savedFieldData?.data?.user_form_listing.unique_id,
      selected_fields: starter?.columns["column-2"]["taskIds"].join(","),
      criteria: criteria,
      created_by: user?.id,
      type_id: savedFieldData?.data?.user_form_listing.type_id,
      is_default: "1",
      is_favourite: isFavourite ? "1" : "0",
      query: querryNew,
    };
    let response = await dispatch(saveCustomViewData(postData));
    if (response?.payload?.status == 200) {
      setViewNameError(false);
      setViewName("");
      setViewFieldError(false);
      toast.success(response?.payload?.message);
      callCloseCustomView();
    }
  };

  const deleteCustomView = () => {
    setViewName("");
    setIsFavourite(false);
    // setOtherCurrentCustomView([]);
    dispatch(deleteCustomViews());
    callCloseCustomView();
  };

  const handelCancelView = () => {
    setViewNameError(false);
    setViewName("");
    setViewFieldError(false);
    setInputList([
      {
        id: "",
        condition: "",
        value: "",
        opertaor: "And",
        userID: "",
      },
    ]);
    callCloseCustomView();
  };

  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  return (
    <CustomViewDrawer role="presentation">
      <CustomViewOuter>
        <CustomViewInner>
          <CustomTopBar>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="outlined-basic"
                // label="Untitled View"
                variant="outlined"
                placeholder={"Untitled View"}
                onChange={(e) => handleViewName(e)}
                onKeyDown={(e) => (e.key === "Enter" ? saveCustomView() : "")}
                value={viewName}
                error={viewNameError && true}
                helperText={viewNameError == true && "Please enter view name"}
              />
            </FormControl>
            <StarIcon
              onClick={handleFavourite}
              style={{ color: isFavourite === true ? "#d7282f" : "#ccc" }}
            />
          </CustomTopBar>

          <CustomActionButon>
            {customViewId ? (
              <>
                <SmallRedOutineBtn variant="outlined" onClick={saveCustomView}>
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
                  ) : (
                    "Update"
                  )}
                </SmallRedOutineBtn>
                {deleteLoader ? (
                  <CircularProgress
                    style={{
                      color: "#D7282F",
                      height: "25px",
                      width: "25px",
                    }}
                  />
                ) : (
                  <SmallBlackOutineBtn
                    variant="outlined"
                    onClick={deleteCustomView}
                  >
                    Delete
                  </SmallBlackOutineBtn>
                )}
              </>
            ) : (
              <SmallRedOutineBtn variant="outlined" onClick={saveCustomView}>
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
                ) : (
                  "Save"
                )}
              </SmallRedOutineBtn>
            )}

            <SmallBlackOutineBtn variant="outlined" onClick={handelCancelView}>
              Cancel
            </SmallBlackOutineBtn>
          </CustomActionButon>
        </CustomViewInner>
        <CustomViewWrapper>
          <SpecifiCriteria>
            <StackHeading>Specify Criteria</StackHeading>
            <CustolFieldData>
              {inputList.map((element, inputIndex) => {
                return (
                  <Grid container spacing={2} key={inputIndex}>
                    <Grid item md={12}>
                      <Grid container spacing={2}>
                        <Grid item md={0.5}>
                          <NumCircleOuter>
                            <NumCircle>{inputIndex + 1}</NumCircle>
                            {inputList.length !== 1 &&
                              inputList.length !== inputIndex + 1 && (
                                <MiddleText>
                                  <Typography
                                    onClick={(e) =>
                                      handleChangeCriteria(
                                        1,
                                        element.opertaor,
                                        inputIndex,
                                        "operator"
                                      )
                                    }
                                  >
                                    {element.opertaor}
                                  </Typography>
                                </MiddleText>
                              )}
                          </NumCircleOuter>
                        </Grid>
                        <Grid item md={3}>
                          <CustomFieldControl variant="standard" fullWidth>
                            <Select
                              labelId="demo-simple-select-standard-label"
                              id="demo-simple-select-standard"
                              value={element.id}
                              name="id"
                              onChange={(e) =>
                                handleChangeCriteria(0, e, inputIndex, "select")
                              }
                              IconComponent={KeyboardArrowDownOutlinedIcon}
                              MenuProps={MenuProps}
                            >
                              {taskFields?.map((item, index) => {
                                if (item?.name != "id") {
                                  return (
                                    <MenuItem
                                      value={item.id}
                                      onClick={() => {
                                        const criteria = [...showCriteria];
                                        criteria[inputIndex] = item.id;
                                        setShowCriteria(criteria);
                                        const oldFilter = [...filterType];
                                        oldFilter[inputIndex] = item;
                                        setFilterType(oldFilter);
                                      }}
                                      sx={{ textTransform: "capitalize" }}
                                    >
                                      {" "}
                                      {item.name == "mail"
                                        ? "Email"
                                        : item.name
                                            .replaceAll("_", " ")
                                            .replaceAll(".", " ")}
                                    </MenuItem>
                                  );
                                }
                              })}
                            </Select>
                          </CustomFieldControl>
                        </Grid>
                        <Grid item md={3}>
                          <CustomFieldControl variant="standard" fullWidth>
                            <Select
                              labelId="demo-simple-select-standard-label"
                              id="demo-simple-select-standard2"
                              value={inputList[inputIndex]?.condition}
                              name="condition"
                              onChange={(e) =>
                                handleChangeCriteria(0, e, inputIndex, "select")
                              }
                              IconComponent={KeyboardArrowDownOutlinedIcon}
                              MenuProps={MenuProps}
                            >
                              {showCriteria[inputIndex] == "select"
                                ? DropDownFilter.map((element) => (
                                    <MenuItem value={element.values}>
                                      {element.name}
                                    </MenuItem>
                                  ))
                                : showCriteria[inputIndex] == "textarea" ||
                                  showCriteria[inputIndex] == "email" ||
                                  showCriteria[inputIndex] == "text" ||
                                  showCriteria[inputIndex] == "phone" ||
                                  showCriteria[inputIndex] == "mobile" ||
                                  showCriteria[inputIndex] == "tag" ||
                                  showCriteria[inputIndex] == "url" ||
                                  showCriteria[inputIndex] == "country"
                                ? StringFilter.map((element) => (
                                    <MenuItem value={element.values}>
                                      {element.name}
                                    </MenuItem>
                                  ))
                                : showCriteria[inputIndex] == "float" ||
                                  showCriteria[inputIndex] == "integer"
                                ? NumberFilter.map((element) => (
                                    <MenuItem value={element.values}>
                                      {element.name}
                                    </MenuItem>
                                  ))
                                : showCriteria[inputIndex] == "checkbox"
                                ? CheckBoxFilter.map((element) => (
                                    <MenuItem value={element.values}>
                                      {element.name}
                                    </MenuItem>
                                  ))
                                : DateFilter.map((element) => (
                                    <MenuItem value={element.values}>
                                      {element.name}
                                    </MenuItem>
                                  ))}
                            </Select>
                          </CustomFieldControl>
                        </Grid>
                        <Grid item md={4}>
                          {filterType[inputIndex]?.field_type == "select" &&
                          filterType[inputIndex]?.name == "Lead_Owner" ? (
                            <CommonOwner
                              defaultOwner={userLists?.find(
                                (ele) => ele.id == inputList[inputIndex]?.userID
                              )}
                              updateValue={(newValue) => {
                                const list = [...inputList];
                                list[inputIndex]["value"] = newValue?.email;
                                list[inputIndex]["userID"] = newValue?.id;
                                setInputList(list);
                              }}
                              label={""}
                              userLists={userLists}
                            />
                          ) : filterType[inputIndex]?.field_type === "phone" ||
                            filterType?.field_type === "integer" ? (
                            <MobileInputCommon
                              mobileNumber={inputList[inputIndex]?.value}
                              countryCode={""}
                              handleChange={(e) => {
                                handleChangeCriteria(
                                  0,
                                  e,
                                  inputIndex,
                                  "integer"
                                );
                              }}
                              helperText={""}
                              placeholder={"90 2327 7211"}
                            />
                          ) : // <TextField
                          //   id="outlined-number"
                          //   type="number"
                          //   name="value"
                          //   size="small"
                          //   onChange={(e) => {
                          //     handleChangeCriteria(
                          //       0,
                          //       e,
                          //       inputIndex,
                          //       "integer"
                          //     );
                          //   }}
                          // />
                          filterType[inputIndex]?.field_type == "select" ? (
                            <CommonFormcontrol fullWidth>
                              <Select
                                size="small"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={(e) => {
                                  handleChangeCriteria(
                                    0,
                                    e,
                                    inputIndex,
                                    "select"
                                  );
                                }}
                                name="value"
                                IconComponent={KeyboardArrowDownOutlinedIcon}
                              >
                                {filterType[inputIndex]?.option_list?.map(
                                  (element) => (
                                    <MenuItem value={element}>
                                      {element}
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            </CommonFormcontrol>
                          ) : filterType[inputIndex]?.field_type == "date" ? (
                            <CommonFormcontrol fullWidth>
                              <CustomDatePicker
                                handleChange={(e) => {
                                  handleChangeCriteria(
                                    0,
                                    e,
                                    inputIndex,
                                    "date"
                                  );
                                }}
                                name="value"
                                value={filterType[inputIndex]?.value}
                                // defaultDate={new Date()}
                              />
                            </CommonFormcontrol>
                          ) : filterType[inputIndex]?.field_type ==
                            "timestamp" ? (
                            <CustomDateTimePicker
                              label={""}
                              value={""}
                              name="value"
                              handleChange={(e) => {
                                handleChangeCriteria(
                                  0,
                                  e,
                                  inputIndex,
                                  "timestamp"
                                );
                              }}
                            />
                          ) : filterType[inputIndex]?.field_type ==
                            "checkbox" ? (
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              // value={filteredValue?.condition}
                              defaultValue={0}
                              onChange={(e) => {
                                handleChangeCriteria(0, e, "input", "checkbox");
                              }}
                              IconComponent={KeyboardArrowDownOutlinedIcon}
                            >
                              <MenuItem value={0}>Select</MenuItem>
                              <MenuItem value={1}>Selected</MenuItem>
                              <MenuItem value={2}>Not Selected</MenuItem>
                            </Select>
                          ) : filterType[inputIndex]?.field_type == "tag" ? (
                            <Autocomplete
                              popupIcon={<KeyboardArrowDownOutlinedIcon />}
                              ref={autocompleteRef}
                              fullWidth
                              multiple
                              id="participants"
                              freeSolo={false}
                              options={userTags ? userTags : []}
                              value={filterTags}
                              noOptionsText={""}
                              limitTags={10}
                              onChange={(event, newValue) => {
                                autocompleteRef.current = newValue;
                                setFilterTags(newValue);
                                let tagData = {
                                  target: {
                                    name: "id",
                                    mainId: filterType[inputIndex]?.id,
                                    value:
                                      newValue?.length > 0 &&
                                      newValue?.map((ele) => ele.id),
                                  },
                                };
                                handleChangeCriteria(
                                  0,
                                  tagData,
                                  inputIndex,
                                  "tag"
                                );
                              }}
                              getOptionLabel={(option) => option.name} // Define how options are displayed
                              renderTags={(value, getTagProps) =>
                                value.map((tag, index) => (
                                  <Chip
                                    key={tag.id} // Use unique key
                                    label={tag.name}
                                    size="small"
                                    {...getTagProps({ index })}
                                  />
                                ))
                              }
                              renderInput={(params) => (
                                <TextField
                                  fullWidth
                                  {...params}
                                  placeholder="Select multiple tags"
                                  variant="outlined"
                                />
                              )}
                            />
                          ) : (
                            <TextField
                              style={{ width: "100%" }}
                              id="outlined-required"
                              size="small"
                              placeholder="Textfield"
                              value={inputList[inputIndex]?.value}
                              name="value"
                              onChange={(e) => {
                                handleChangeCriteria(0, e, inputIndex, "text");
                              }}
                            />
                          )}
                        </Grid>
                        <Grid item md={1}>
                          <ActionIcons>
                            {inputList.length !== 1 && (
                              <IconButtonRemove
                                aria-label="Remove"
                                onClick={() => handleRemoveNewInput(inputIndex)}
                              >
                                <RemoveIcon />
                              </IconButtonRemove>
                            )}

                            <Divider
                              orientation="vertical"
                              variant="middle"
                              flexItem
                            />
                            {inputList.length - 1 === inputIndex && (
                              <IconButtonAdd
                                aria-label="Add"
                                onClick={handleAddNewInput}
                              >
                                <AddIcon />
                              </IconButtonAdd>
                            )}
                          </ActionIcons>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}

              {/* {
                                JSON.stringify(inputList, null, 2)
                            } */}
            </CustolFieldData>
          </SpecifiCriteria>
          <ChooseCoulmnView>
            <StackHeading>Choose Columns - Tabular View</StackHeading>
            <Box mt={1}>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="all-column" direction="horizontal">
                  {(provided, snapshot) => (
                    <Grid
                      container
                      spacing={2}
                      isDraggingOver={snapshot.isDraggingOver}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {starter.columnOrder.map((columnId, index) => {
                        const column = starter.columns[columnId];
                        const tasks = column.taskIds.map(
                          (taskId) => starter.defaultFields[taskId]
                        );
                        return (
                          <Column
                            snapshots={snapshot}
                            index={index}
                            key={column.id}
                            column={column}
                            tasks={tasks}
                            addRemoveSelectedField={addRemoveSelectedField}
                          />
                        );
                      })}
                      {provided.placeholder}
                    </Grid>
                  )}
                </Droppable>
              </DragDropContext>
              {viewFieldError && (
                <StackHeading style={{ color: "#d32f2f", fontSize: "10px" }}>
                  Please choose at least one field
                </StackHeading>
              )}
            </Box>
          </ChooseCoulmnView>
        </CustomViewWrapper>
      </CustomViewOuter>
    </CustomViewDrawer>
  );
};

export default OtherRightDrawer;
