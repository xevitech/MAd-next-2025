import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Autocomplete,
  Chip,
  FormHelperText,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Skeleton,
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
  SpecifiCriteriaInn,
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
  getUniqueListBy,
} from "@/components/common/common";
import Column from "../DragDrop/Column";
import { toast } from "react-toastify";
import {
  deleteCustomViews,
  getAllSavedViews,
  getSingleCustomViews,
  saveCustomViewData,
  setCurrentCustomView,
  setCustomViewId,
  setSaveLoader,
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
import Swal from "sweetalert2";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { MobileCodes } from "@/components/common/PhoneInput/MobileCodesList";
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
const RightDrawer = ({ callCloseCustomView }) => {
  const {
    savedFieldData,
    customViewId,
    saveLoader,
    currentCustomView,
    deleteLoader,
    userLists,
    userTags,
    drawerLoader,
  } = useSelector((state: any) => state.formList);

  const [customState, setCustomState] = useState({ right: false });
  const [filterTags, setFilterTags] = useState<any>([]);
  const [showCriteria, setShowCriteria] = useState([]);
  const [filterType, setFilterType] = useState<any>([]);
  const [viewName, setViewName] = useState("");
  const [viewNameError, setViewNameError] = useState(false);
  const [criteriaError, setCriteriaError] = useState(false);
  const [viewFieldError, setViewFieldError] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isMandatory, setIsMandatory] = useState(false);
  const [mount, setMount] = useState<any>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [defaultCountryCode, setDefaultCountryCode] = useState<any>("");
  const [inputList, setInputList] = useState([
    {
      id: "",
      condition: "",
      value: "",
      opertaor: "And",
      userID: "",
    },
  ]);
  const [targetedInputList, setTargetedInputList] = useState([
    {
      isValueEmpty: false,
    },
  ]);
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
  const [criteriaTextFieldError, setCriteriaTextFieldError] =
    useState<boolean>(false);
  const [criteriaTextFieldHandler, setCriteriaTextFieldHandler] =
    useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const getGeoLocation = async () => {
    try {
      const response = await fetch("https://geolocation-db.com/json/");
      const data = await response.json();
      setDefaultCountryCode(data.country_code);
    } catch (error) {
      return error?.message;
    }
  };

  useEffect(() => {
    setMount(true);
    if (!defaultCountryCode) {
      getGeoLocation();
    }
    if (!defaultCountryCode) {
      let code =
        MobileCodes.find((v) => v.dial_code == `+${defaultCountryCode}`)
          ?.code ?? "";
      setDefaultCountryCode(code);
    }
  }, [defaultCountryCode]);



  useEffect(() => {
    const outputObject = {};
    const ids = [];

    if (currentCustomView?.id && currentCustomView?.id != undefined) {
      let splitSelectedFields = currentCustomView?.selected_fields
        ?.split(",")
        .map(function (x) {
          return parseInt(x, 10);
        });
      const filteredArray = savedFieldData?.data?.filter_fields
        .filter((value) => splitSelectedFields?.includes(value.id))
        ?.map((obj) => obj.id);

      savedFieldData?.data?.filter_fields.forEach((item, index) => {
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

      let savedJson = JSON.parse(currentCustomView?.criteria);

      setInputList(savedJson);
      let filterTypes = savedFieldData?.data?.filter_fields.filter(
        (item) =>
          savedJson?.length > 0 &&
          savedJson?.map((ele) => ele.id).includes(item.id)
      );

      setShowCriteria(filterTypes?.map((ele) => ele?.field_type));
      let tags = filterTypes?.find((item) => item.field_type === "tag");
      setFilterType(filterTypes);
      setFilterTags(
        userTags?.filter((item) =>
          savedJson
            .find((item) => item.id === tags?.id)
            ?.value.includes(item.id)
        )
      );
      setStarter(formattedData);
      setViewName(currentCustomView?.name);
      setIsFavourite(currentCustomView?.is_favourite == "1" ? true : false);
    } else {
      savedFieldData?.data?.form_fields_data.forEach((item, index) => {
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
  }, [currentCustomView, savedFieldData]);

  //   function strToBool(str) {
  //     const truthyValues = ['true', 'yes', '1'];
  //     const falsyValues = ['false', 'no', '0'];
  //     str = str.toLowerCase();
  //     if (truthyValues.includes(str)) {
  //         return true;
  //     } else if (falsyValues.includes(str)) {
  //         return false;
  //     } else {
  //         return str !== '';
  //     }
  // }

  const handleViewName = (e) => {
    setViewName(e.target.value);
    setViewNameError(false);
  };

  const autocompleteRef = useRef(null);
  const handleChangeCriteria = async (type, e, inputIndex, inputType) => {
    setIsMandatory(false);
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
      } else if (inputType == "integer") {
        // const { name, value } = e.target;
        const list = [...inputList];
        const toCheckValue = [...targetedInputList];
        list[inputIndex]["value"] = e;
        setInputList(list);
        toCheckValue[inputIndex]["isValueEmpty"] = e;
        setTargetedInputList(toCheckValue);
      } else {
        const list = [...inputList];
        const toCheckValue = [...targetedInputList];
        list[inputIndex][e?.target?.name] = e?.target?.mainId;
        list[inputIndex]["value"] = e?.target?.value;

        setInputList(list);
        toCheckValue[inputIndex]["isValueEmpty"] = e?.target?.value;
        setTargetedInputList(toCheckValue);
      }
    }
  };

  const handleAddNewInput = () => {
    const list = [...inputList];
    list.push({
      id: "",
      condition: "1",
      value: "",
      opertaor: "And",
      userID: "",
    });
    setInputList(list);
    const line = [...targetedInputList];
    line.push({
      isValueEmpty: false,
    });
    setTargetedInputList(line);
  };

  const handleRemoveNewInput = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    const line = [...targetedInputList];
    line.splice(index, 1);
    setTargetedInputList(line);
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

  useEffect(() => {
    inputList.forEach((value, index) => {
      if (value.id !== "" || value.value == "") {
        setCriteriaError(false);
        setCriteriaTextFieldError(false);
      }
    });
  }, [inputList]);

  useEffect(() => {
    if (starter?.columns["column-2"].taskIds.length >= 1) {
      setViewFieldError(false);
    }
  }, [starter]);

  const saveCustomView = async () => {
    if (
      inputList?.some(
        (item: any) =>
          (item.value == "" || item.value == null) &&
          item.condition !== "7" &&
          item.condition !== "8"
      )
    ) {
      setIsMandatory(true);
    } else {
      setIsMandatory(false);
    }
    let textFieldCheck = [];
    let dataToPost = null;
    inputList.forEach(async (value, index) => {
      if (
        viewName == "" ||
        starter?.columns["column-2"]["taskIds"]?.length == 0 ||
        inputList[index].id == ""
      ) {
        viewName == "" ? setViewNameError(true) : setViewNameError(false);
        starter?.columns["column-2"]["taskIds"]?.length == 0
          ? setViewFieldError(true)
          : setViewFieldError(false);
        inputList[index].id == ""
          ? setCriteriaError(true)
          : setCriteriaError(false);
        return false;
      }
      let criteria: any = [];
      let querryNew = "";
      if (
        inputList[index].id == "" ||
        inputList[index].condition == "" ||
        inputList[index].value == "" ||
        inputList[index].value == undefined
      ) {
        criteria = [];
        setCriteriaTextFieldError(true);
        textFieldCheck.push(false);

        let list = [...targetedInputList];
        list[index]["isValueEmpty"] = true;
        setTargetedInputList(list);
      } else {
        setCriteriaTextFieldError(false);
        setLoader(true);
        textFieldCheck.push(true);
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
        let userData = localStorage?.getItem("userData") ?? "";
        let user = userData ? JSON.parse(userData) : "";
        let postData = {
          name: viewName,
          form_unique_id: savedFieldData?.data?.user_form_listing.unique_id,
          selected_fields: starter?.columns["column-2"]["taskIds"]?.join(","),
          criteria: criteria,
          created_by: user?.id,
          type_id: savedFieldData?.data?.user_form_listing.type_id,
          is_default: "1",
          is_favourite: isFavourite ? "1" : "0",
          query: querryNew,
        };
        let list = [...targetedInputList];
        list[index]["isValueEmpty"] = false;
        setTargetedInputList(list);
        dataToPost = postData;
      }
    });
    let valueCheck = textFieldCheck.some((elem) => elem === false);
    if (valueCheck !== true && criteriaError !== true) {
      let response = await dispatch(saveCustomViewData(dataToPost));
      if (response?.payload?.status == 200) {
        
        setViewNameError(false);
        setViewName("");
        setViewFieldError(false);
        toast.success(
          `Custom view successfully ${customViewId ? "updated" : "saved"}`
        );
        callCloseCustomView();
        setLoader(false);
      } else {
        setLoader(false);
      }
    }
  };

  const deleteCustomView = () => {
    setViewName("");
    setIsFavourite(false);
    setCurrentCustomView([]);
    localStorage?.removeItem("view");
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
    <>
      {saveLoader || drawerLoader ? (
        <Box sx={{ width: "100%", padding: "8px" }}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} lg={6} xl={6}>
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={"40%"}
                  sx={{ height: 60 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={6} xl={6}>
                <Box
                  sx={{
                    display: "flex",
                    // flexDirection: "column",
                    gap: "10px",
                    marginLeft: "10px",
                    justifyContent: "end",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width={"20%"}
                    sx={{ height: 40 }}
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width={"20%"}
                    sx={{ height: 40 }}
                  />
                </Box>
              </Grid>
            </Grid>{" "}
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={4}>
              <Skeleton
                animation="wave"
                variant="rounded"
                width={"100%"}
                height={"20px"}
                sx={{ marginTop: "10px", marginBottom: "10px" }}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Skeleton
                animation="wave"
                variant="rounded"
                width={"100%"}
                height={"20px"}
                sx={{ marginTop: "10px", marginBottom: "10px" }}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Skeleton
                animation="wave"
                variant="rounded"
                width={"100%"}
                height={"20px"}
                sx={{ marginTop: "10px", marginBottom: "10px" }}
              />
            </Grid>
          </Grid>

          <Box>
            <Skeleton
              animation="wave"
              variant="text"
              width={"20%"}
              sx={{ margin: "18px 0 10px" }}
            />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} lg={6} xl={6}>
              <Box sx={{ padding: "9px 12px", border: "1px solid #d2d2d2" }}>
                <Skeleton animation="wave" variant="text" width={"52%"} />
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={"100%"}
                  height={"29px"}
                  sx={{ marginTop: "20px", marginBottom: "10px" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginLeft: "10px",
                  }}
                >
                  <Skeleton animation="wave" variant="text" width={"27%"} />
                  <Skeleton animation="wave" variant="text" width={"42%"} />
                  <Skeleton animation="wave" variant="text" width={"30%"} />
                  <Skeleton animation="wave" variant="text" width={"25%"} />
                  <Skeleton animation="wave" variant="text" width={"19%"} />
                  <Skeleton animation="wave" variant="text" width={"19%"} />
                  <Skeleton animation="wave" variant="text" width={"29%"} />
                  <Skeleton animation="wave" variant="text" width={"25%"} />
                  <Skeleton animation="wave" variant="text" width={"19%"} />
                  <Skeleton animation="wave" variant="text" width={"19%"} />
                  <Skeleton animation="wave" variant="text" width={"29%"} />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6} xl={6}>
              <Box sx={{ padding: "9px 12px", border: "1px solid #d2d2d2" }}>
                <Skeleton animation="wave" variant="text" width={"52%"} />
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={"100%"}
                  height={"29px"}
                  sx={{ marginTop: "20px", marginBottom: "10px" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginLeft: "10px",
                  }}
                >
                  <Skeleton animation="wave" variant="text" width={"27%"} />
                  <Skeleton animation="wave" variant="text" width={"42%"} />
                  <Skeleton animation="wave" variant="text" width={"30%"} />
                  <Skeleton animation="wave" variant="text" width={"25%"} />
                  <Skeleton animation="wave" variant="text" width={"19%"} />
                  <Skeleton animation="wave" variant="text" width={"19%"} />
                  <Skeleton animation="wave" variant="text" width={"29%"} />
                  <Skeleton animation="wave" variant="text" width={"25%"} />
                  <Skeleton animation="wave" variant="text" width={"19%"} />
                  <Skeleton animation="wave" variant="text" width={"19%"} />
                  <Skeleton animation="wave" variant="text" width={"29%"} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <CustomViewDrawer role="presentation">
          <CustomViewOuter>
            <CustomViewInner>
              <CustomTopBar>
                <FormControl
                  fullWidth
                  sx={{
                    m: 1,
                    "@media screen and (max-width: 767px)": {
                      margin: "0 0 8px",
                    },
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    // label="Untitled View"
                    variant="outlined"
                    placeholder={"Untitled View"}
                    onChange={(e) => handleViewName(e)}
                    onKeyDown={(e) =>
                      e.key === "Enter" ? saveCustomView() : ""
                    }
                    value={viewName}
                    error={viewNameError && true}
                    helperText={
                      viewNameError == true && "Please enter view name"
                    }
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
                    {loader ? (
                      <SmallOutineBtn variant="outlined">
                        <ThreeDots
                          height="40"
                          width="40"
                          radius="9"
                          color="#D7282F"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          visible={true}
                        />
                      </SmallOutineBtn>
                    ) : (
                      <SmallOutineBtn
                        variant="outlined"
                        onClick={saveCustomView}
                        disabled={isMandatory ? true : false}
                      >
                        Update
                      </SmallOutineBtn>
                    )}
                    {deleteLoader ? (
                      <CircularProgress
                        style={{
                          color: "#D7282F",
                          height: "25px",
                          width: "25px",
                        }}
                      />
                    ) : (
                      <SmallOutineBtn
                        variant="outlined"
                        onClick={deleteCustomView}
                      >
                        Delete
                      </SmallOutineBtn>
                    )}
                  </>
                ) : loader ? (
                  <SmallBlackOutineBtn variant="outlined">
                    <ThreeDots
                      height="40"
                      width="40"
                      radius="9"
                      color="#D7282F"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      visible={true}
                    />
                  </SmallBlackOutineBtn>
                ) : (
                  <SmallBlackOutineBtn
                    variant="outlined"
                    onClick={saveCustomView}
                  >
                    Save
                  </SmallBlackOutineBtn>
                )}

                <SmallRedOutineBtn
                  variant="outlined"
                  onClick={handelCancelView}
                >
                  Cancel
                </SmallRedOutineBtn>
              </CustomActionButon>
            </CustomViewInner>
            <CustomViewWrapper>
              <SpecifiCriteria>
                <StackHeading>Specify Criteria</StackHeading>
                <CustolFieldData>
                  {inputList.map((element: any, inputIndex) => {
                    return (
                      <Grid container spacing={2} key={inputIndex}>
                        <Grid item xs={12} sm={12} md={12}>
                          <SpecifiCriteriaInn>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={12} md={0.5}>
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
                              <Grid item xs={12} sm={12} md={3}>
                                <CustomFieldControl
                                  variant="standard"
                                  fullWidth
                                >
                                  <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={element.id}
                                    name="id"
                                    sx={{ textTransform: "capitalize" }}
                                    onChange={(e) =>
                                      handleChangeCriteria(
                                        0,
                                        e,
                                        inputIndex,
                                        "select"
                                      )
                                    }
                                    IconComponent={
                                      KeyboardArrowDownOutlinedIcon
                                    }
                                    MenuProps={MenuProps}
                                  >
                                    {savedFieldData?.data?.filter_fields.map(
                                      (item, index) => {
                                        if (item?.name != "id") {
                                          return (
                                            <MenuItem
                                              value={item.id}
                                              onClick={() => {
                                                const criteria = [
                                                  ...showCriteria,
                                                ];
                                                criteria[inputIndex] =
                                                  item.field_type;
                                                setShowCriteria(criteria);
                                                const oldFilter = [
                                                  ...filterType,
                                                ];
                                                oldFilter[inputIndex] = item;
                                                setFilterType(oldFilter);
                                              }}
                                              sx={{
                                                textTransform: "capitalize",
                                              }}
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
                                      }
                                    )}
                                  </Select>
                                </CustomFieldControl>
                              </Grid>
                              <Grid item xs={12} sm={12} md={3}>
                                <CustomFieldControl
                                  variant="standard"
                                  fullWidth
                                >
                                  <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard2"
                                    value={inputList[inputIndex]?.condition}
                                    name="condition"
                                    onChange={(e) =>
                                      handleChangeCriteria(
                                        0,
                                        e,
                                        inputIndex,
                                        "select"
                                      )
                                    }
                                    IconComponent={
                                      KeyboardArrowDownOutlinedIcon
                                    }
                                    MenuProps={MenuProps}
                                  >
                                    {showCriteria?.[inputIndex] == "select"
                                      ? DropDownFilter.map((element) => (
                                          <MenuItem value={element.values}>
                                            {element.name}
                                          </MenuItem>
                                        ))
                                      : showCriteria?.[inputIndex] ==
                                          "textarea" ||
                                        showCriteria?.[inputIndex] == "email" ||
                                        showCriteria?.[inputIndex] == "text" ||
                                        showCriteria?.[inputIndex] == "phone" ||
                                        showCriteria?.[inputIndex] ==
                                          "mobile" ||
                                        showCriteria?.[inputIndex] == "tag" ||
                                        showCriteria?.[inputIndex] == "url" ||
                                        showCriteria?.[inputIndex] == "country"
                                      ? StringFilter.map((element) => (
                                          <MenuItem value={element.values}>
                                            {element.name}
                                          </MenuItem>
                                        ))
                                      : showCriteria?.[inputIndex] == "float" ||
                                        showCriteria?.[inputIndex] == "integer"
                                      ? NumberFilter.map((element) => (
                                          <MenuItem value={element.values}>
                                            {element.name}
                                          </MenuItem>
                                        ))
                                      : showCriteria?.[inputIndex] == "checkbox"
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
                              {/******************************************code of text field area*********************************/}
                              <Grid item xs={12} sm={12} md={4}>
                                {filterType?.[inputIndex]?.field_type ==
                                  "select" &&
                                filterType?.[inputIndex]?.name ==
                                  "Lead_Owner" ? (
                                  <CommonOwner
                                    defaultOwner={userLists?.find(
                                      (ele) =>
                                        ele.id == inputList[inputIndex]?.userID
                                    )}
                                    disabled={
                                      element?.condition == "7" ||
                                      element?.condition == "8"
                                        ? true
                                        : false
                                    }
                                    updateValue={(newValue) => {
                                      const list = [...inputList];
                                      list[inputIndex]["value"] =
                                        newValue?.email;
                                      list[inputIndex]["userID"] = newValue?.id;
                                      setInputList(list);
                                    }}
                                    label={""}
                                    userLists={userLists}
                                    error={
                                      targetedInputList[inputIndex]
                                        ?.isValueEmpty &&
                                      element?.condition !== "8" &&
                                      element?.condition !== "7"
                                        ? true
                                        : false
                                    }
                                    errorText={
                                      targetedInputList[inputIndex]
                                        ?.isValueEmpty &&
                                      element?.condition !== "8" &&
                                      element?.condition !== "7"
                                        ? "Please select value"
                                        : ""
                                    }
                                  />
                                ) : filterType?.[inputIndex]?.field_type ===
                                    "phone" ||
                                  filterType?.field_type === "mobile" ? (
                                  <>
                                    <MuiTelInput
                                      fullWidth
                                      size="small"
                                      sx={{
                                        "& .MuiButtonBase-root": {
                                          paddingLeft: "0",
                                          paddingRight: "0",
                                          "& img": {
                            borderRadius: "2px",
                          },
                                          "&:hover": {
                                            backgroundColor: "transparent",
                                          },
                                          "& .MuiTouchRipple-root": {
                                            display: "none",
                                          },
                                        },
                                      }}
                                      // fullWidth
                                      forceCallingCode
                                      autoComplete="off"
                                      disabled={
                                        element?.condition == 7 ||
                                        element?.condition == 8
                                          ? true
                                          : false
                                      }
                                      style={
                                        element?.condition == 7 ||
                                        element?.condition == 8
                                          ? { background: "#f5f3f3" }
                                          : null
                                      }
                                      defaultCountry={defaultCountryCode}
                                      value={element?.value}
                                      // error={errorText ? true : false}
                                      error={
                                        errorText
                                          ? true
                                          : targetedInputList[inputIndex]
                                              ?.isValueEmpty &&
                                            element?.condition !== "8" &&
                                            element?.condition !== "7"
                                          ? true
                                          : false
                                      }
                                      helperText={
                                        targetedInputList[inputIndex]
                                          ?.isValueEmpty &&
                                        element?.condition !== "8" &&
                                        element?.condition !== "7"
                                          ? "Please enter value"
                                          : ""
                                      }
                                      onChange={(value, info) => {
                                        if (
                                          info.nationalNumber &&
                                          matchIsValidTel(value)
                                        ) {
                                          setErrorText("");
                                          handleChangeCriteria(
                                            0,
                                            value,
                                            inputIndex,
                                            "integer"
                                          );
                                        } else {
                                          setErrorText("Invalid Mobile!");
                                          handleChangeCriteria(
                                            0,
                                            value,
                                            inputIndex,
                                            "integer"
                                          );
                                        }
                                      }}
                                    />

                                    {/* <MobileInputCommon
                                      mobileNumber={
                                        inputList[inputIndex]?.value
                                      }
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
                                    /> */}
                                  </>
                                ) : filterType?.[inputIndex]?.field_type ==
                                    "float" ||
                                  filterType?.[inputIndex]?.field_type ===
                                    "integer" ? (
                                  <TextField
                                    size="small"
                                    fullWidth
                                    id="outlined-number"
                                    type="number"
                                    onChange={(e) => {
                                      handleChangeCriteria(
                                        0,
                                        e,
                                        inputIndex,
                                        "integer"
                                      );
                                    }}
                                    error={
                                      targetedInputList[inputIndex]
                                        ?.isValueEmpty &&
                                      element?.condition !== "8" &&
                                      element?.condition !== "7"
                                        ? true
                                        : false
                                    }
                                    helperText={
                                      targetedInputList[inputIndex]
                                        ?.isValueEmpty &&
                                      element?.condition !== "8" &&
                                      element?.condition !== "7"
                                        ? "Please enter value"
                                        : ""
                                    }
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
                                filterType?.[inputIndex]?.field_type ==
                                  "select" ? (
                                  <CommonFormcontrol
                                    required
                                    fullWidth
                                    size="small"
                                  >
                                    <Select
                                      size="small"
                                      fullWidth
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      disabled={
                                        element?.condition == "7" ||
                                        element?.condition == "8"
                                          ? true
                                          : false
                                      }
                                      sx={
                                        element?.condition == "7" ||
                                        element?.condition == "8"
                                          ? { background: "#f5f3f3" }
                                          : null
                                      }
                                      onChange={(e) => {
                                        handleChangeCriteria(
                                          0,
                                          e,
                                          inputIndex,
                                          "select"
                                        );
                                      }}
                                      name="value"
                                      IconComponent={
                                        KeyboardArrowDownOutlinedIcon
                                      }
                                      error={
                                        targetedInputList[inputIndex]
                                          ?.isValueEmpty &&
                                        element?.condition !== "8" &&
                                        element?.condition !== "7"
                                          ? true
                                          : false
                                      }
                                    >
                                      {filterType?.[
                                        inputIndex
                                      ]?.option_list?.map((element) => (
                                        <MenuItem value={element}>
                                          {element}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                    {targetedInputList[inputIndex]
                                      ?.isValueEmpty &&
                                    element?.condition !== "8" &&
                                    element?.condition !== "7" ? (
                                      <FormHelperText>
                                        Please select value
                                      </FormHelperText>
                                    ) : null}
                                  </CommonFormcontrol>
                                ) : filterType?.[inputIndex]?.field_type ==
                                  "date" ? (
                                  <CommonFormcontrol fullWidth size="small">
                                    <CustomDatePicker
                                      fullWidth
                                      size="small"
                                      handleChange={(e) => {
                                        handleChangeCriteria(
                                          0,
                                          e,
                                          inputIndex,
                                          "date"
                                        );
                                      }}
                                      name="value"
                                      value={filterType?.[inputIndex]?.value}
                                      // defaultDate={new Date()}
                                    />
                                  </CommonFormcontrol>
                                ) : filterType?.[inputIndex]?.field_type ==
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
                                ) : filterType?.[inputIndex]?.field_type ==
                                  "checkbox" ? (
                                  <>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      // value={filteredValue?.condition}
                                      defaultValue={0}
                                      onChange={(e) => {
                                        handleChangeCriteria(
                                          0,
                                          e,
                                          "input",
                                          "checkbox"
                                        );
                                      }}
                                      IconComponent={
                                        KeyboardArrowDownOutlinedIcon
                                      }
                                      error={
                                        targetedInputList[inputIndex]
                                          ?.isValueEmpty &&
                                        element?.condition !== "8" &&
                                        element?.condition !== "7"
                                          ? true
                                          : false
                                      }
                                    >
                                      <MenuItem value={0}>Select</MenuItem>
                                      <MenuItem value={1}>Selected</MenuItem>
                                      <MenuItem value={2}>
                                        Not Selected
                                      </MenuItem>
                                    </Select>
                                    {targetedInputList[inputIndex]
                                      ?.isValueEmpty &&
                                    element?.condition !== "8" &&
                                    element?.condition !== "7" ? (
                                      <FormHelperText>
                                        Please select value
                                      </FormHelperText>
                                    ) : null}
                                  </>
                                ) : filterType?.[inputIndex]?.field_type ==
                                  "tag" ? (
                                  <Autocomplete
                                    popupIcon={
                                      <KeyboardArrowDownOutlinedIcon />
                                    }
                                    ref={autocompleteRef}
                                    fullWidth
                                    multiple
                                    id="participants"
                                    freeSolo={false}
                                    disabled={
                                      element?.condition == "7" ||
                                      element?.condition == "8"
                                        ? true
                                        : false
                                    }
                                    sx={
                                      element?.condition == "7" ||
                                      element?.condition == "8"
                                        ? { background: "#f5f3f3" }
                                        : null
                                    }
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
                                          mainId: filterType?.[inputIndex]?.id,
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
                                        error={
                                          targetedInputList[inputIndex]
                                            ?.isValueEmpty &&
                                          element?.condition !== "8" &&
                                          element?.condition !== "7"
                                            ? true
                                            : false
                                        }
                                        helperText={
                                          targetedInputList[inputIndex]
                                            ?.isValueEmpty &&
                                          element?.condition !== "8" &&
                                          element?.condition !== "7"
                                            ? `Please select value`
                                            : ""
                                        }
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
                                    disabled={
                                      element?.condition == "7" ||
                                      element?.condition == "8"
                                        ? true
                                        : false
                                    }
                                    sx={
                                      element?.condition == "7" ||
                                      element?.condition == "8"
                                        ? { background: "#f5f3f3" }
                                        : null
                                    }
                                    error={
                                      targetedInputList[inputIndex]
                                        ?.isValueEmpty &&
                                      element?.condition !== "8" &&
                                      element?.condition !== "7"
                                        ? true
                                        : false
                                    }
                                    helperText={
                                      targetedInputList[inputIndex]
                                        ?.isValueEmpty &&
                                      element?.condition !== "8" &&
                                      element?.condition !== "7"
                                        ? `Please enter value`
                                        : ""
                                    }
                                    name="value"
                                    onChange={(e) => {
                                      handleChangeCriteria(
                                        0,
                                        e,
                                        inputIndex,
                                        "text"
                                      );
                                    }}
                                  />
                                )}
                              </Grid>
                              {/******************************************code of text field area*********************************/}
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={1}
                                className="specifycountnum"
                              >
                                <ActionIcons>
                                  {inputList.length !== 1 && (
                                    <IconButtonRemove
                                      aria-label="Remove"
                                      onClick={() =>
                                        handleRemoveNewInput(inputIndex)
                                      }
                                    >
                                      <RemoveIcon />
                                    </IconButtonRemove>
                                  )}

                                  {/* {inputList.length !=1 && <Divider
                                    orientation="vertical"
                                    variant="middle"
                                    flexItem
                                  />} */}

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
                          </SpecifiCriteriaInn>
                        </Grid>
                      </Grid>
                    );
                  })}
                  {criteriaError && (
                    <StackHeading
                      style={{ color: "#d32f2f", fontSize: "10px" }}
                    >
                      Please select at least one field
                    </StackHeading>
                  )}
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

                            // if (tasks.length !== 0 || tasks.length == 32) {
                            //   setViewFieldError(false);
                            // } else {
                            //   setViewFieldError(true);
                            // }

                            return (
                              <Column
                                index={index}
                                key={column.id}
                                column={column}
                                tasks={tasks}
                                addRemoveSelectedField={addRemoveSelectedField}
                                snapshots={snapshot}
                              />
                            );
                          })}
                          {provided.placeholder}
                        </Grid>
                      )}
                    </Droppable>
                  </DragDropContext>
                  {viewFieldError && (
                    <StackHeading
                      style={{ color: "#d32f2f", fontSize: "10px" }}
                    >
                      Please choose at least one field
                    </StackHeading>
                  )}
                </Box>
              </ChooseCoulmnView>
            </CustomViewWrapper>
          </CustomViewOuter>
        </CustomViewDrawer>
      )}
    </>
  );
};

export default RightDrawer;
