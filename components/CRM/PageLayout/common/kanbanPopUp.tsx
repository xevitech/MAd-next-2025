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
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import {
  CommonFormcontrol,
  SearchCommon,
  SmallFilledBtn,
  SmallOutineBtn,
  StyledBootstrapDialog,
  TitleDialog,
} from "../../commonStyle";
import { KanbanHeading, KanbanSettingForm } from "../../View/style";
import { CusTomSearchBox, TableGridBox } from "../../style";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Column from "../../DragDrop/Column";
import { apiClient } from "@/components/common/common";
import {
  setKanbanStatus,
  getKanbanList,
  getAllFieldData,
  setSaveLoader,
  setDataViewType,
} from "@/hooks/UseCreateFormData";
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return <TitleDialog {...other}>{children}</TitleDialog>;
}

const KanbanPopUp = ({ open, handleClose, loading, data }: any) => {
  const {
    kanbanLists,
    createKanbanStatus,
    savedFieldData,
    typeId,
    saveLoader,
    filterDataKeys,
  } = useSelector((state: any) => state.formList);
  const [categoryList, setCategoryList] = useState<any>([]);
  let selectedids = [];
  const defaultCategory = filterDataKeys?.find(
    (item) => item.id == data?.kanbon_category_by
  );
  const [category, setCategory] = useState<any>("");
  const [headerColor, setColor] = useState<any>("");
  const [aggregate, setAggregate] = useState<any>("Annual Revenue");
  const [kanbanName, setKanban] = useState<any>("");
  const [KanbanError, setKanbanError] = useState<any>({
    error: false,
    field: "",
  });
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

  const dispatch = useAppDispatch();

  const handleAdd = async () => {
    if (kanbanName == "" || kanbanName == null) {
      setKanbanError({ error: true, field: "kanbanName" });
    } else if (aggregate == "" || aggregate == null) {
      setKanbanError({ error: true, field: "aggregate" });
    } else if (category == "" || category == null) {
      setKanbanError({ error: true, field: "category" });
    } else if (
      (kanbanName !== "" || kanbanName !== null) &&
      (aggregate !== "" || kanbanName == null) &&
      (category !== "" || category !== null)
    ) {
      const filteredData = savedFieldData?.data?.form_fields_data;
      filteredData.forEach((item) => {
        if (
          item.name == "First_Name" ||
          item.name == "Last_Name" ||
          item.name == "mail" ||
          item.name == "Country" ||
          item.name == "Annual_Revenue"
        ) {
          selectedids.push(item.id);
        }
      });
      let body = {
        crm_user_form_unique_id:
          savedFieldData?.data?.user_form_listing?.unique_id,
        type_id: typeId,
        kanban_view_name: kanbanName,
        kanbon_category_by: category?.id,
        kanbon_header_style: headerColor ? headerColor : "Mono Color",
        kanban_aggergate: savedFieldData?.data?.form_fields_data?.find(
          (item) => item?.name == "annual_Revenue"
        )?.id,
        // kanbon_selected_fields: selectedids.join(","),
        // ------selected draggable fields data to post  -------

        kanbon_selected_fields:
          starter?.columns?.["column-2"]?.taskIds.join(","),
      };

      dispatch(setSaveLoader(true));
      let response = await apiClient(`crm/store_kanbon_view`, "post", {
        body,
      });
      if (response.status == true || response.status == 200) {
        toast.success(response.message);
        handleClose();
        dispatch(setSaveLoader(false));
        dispatch(setKanbanStatus(""));
        dispatch(getAllFieldData());
        dispatch(getKanbanList());
        dispatch(setDataViewType(1));
      } else {
        dispatch(setSaveLoader(false));
      }
    }
  };

  useEffect(() => {
    setKanban(data?.kanban_view_name);
    setCategory(defaultCategory);
    setColor(data?.kanbon_header_style ? data?.kanbon_header_style : "");
    const getupdatedDrag = data?.kanbon_selected_fields?.split(",").map(Number);
    const outputObject = {};
    const ids = [];
    const fixedFileds = [];
    const filteredList = savedFieldData?.data?.filter_fields.filter(
      (item) => item.name !== "lead_Owner"
    );
    filteredList?.forEach((item, index) => {
      const itemId = item.id;
      ids.push(itemId);
      if (
        item.name == "first_Name" ||
        item.name === "last_Name" ||
        item.name === "account" ||
        item.name === "mail"
      ) {
        fixedFileds.push(item.id);
      }
      const { id, name } = item;
      outputObject[itemId] = {
        id: String(id),
        content: name,
      };
    });

    if (getupdatedDrag?.length == 0 || getupdatedDrag == undefined) {
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
            taskIds: fixedFileds,
          },
        },
        columnOrder: ["column-1", "column-2"],
      };
      setStarter(formattedData);
    } else {
      let formattedData: any = {
        defaultFields: outputObject,
        columns: {
          "column-1": {
            id: "column-1",
            title: "Available",
            taskIds: ids.filter(
              (obj) => !getupdatedDrag.some((id) => obj === id)
            ),
          },
          "column-2": {
            id: "column-2",
            title: "Selected",
            taskIds: getupdatedDrag,
          },
        },
        columnOrder: ["column-1", "column-2"],
      };
      setStarter(formattedData);
    }
  }, [savedFieldData]);

  useEffect(() => {
    const filteredData = filterDataKeys?.filter(
      (item) => item.field_type === "select" || item.field_type === "country"
    );
    const removedLeadOwner = filteredData?.filter(
      (item) => item.name !== "lead_Owner"
    );
    setCategoryList(removedLeadOwner);
  }, [savedFieldData]);

  const handleChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    setKanbanError({ error: false, field: "" });
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

  return (
    <StyledBootstrapDialog
      open={open}
      // onClose={() => handleClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <DialogContentText id="alert-dialog-description1">
          <KanbanHeading variant="h4">Kanban View - Settings</KanbanHeading>
        </DialogContentText>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <KanbanSettingForm>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} sx={{ pt: 0 }}>
              <CommonFormcontrol required fullWidth size="small">
                <TextField
                  fullWidth
                  required
                  value={kanbanName}
                  onChange={(e) => {
                    setKanban(e.target.value),
                      setKanbanError({ error: false, field: "" });
                  }}
                  label="Kanban View Name"
                  id="outlined-size-small"
                  size="small"
                  placeholder="Enter Name"
                  error={KanbanError.field == "kanbanName" ? true : false}
                  helperText={
                    KanbanError.field == "kanbanName" && "kanban name required"
                  }
                />
              </CommonFormcontrol>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <CommonFormcontrol required fullWidth size="small">
                <InputLabel id="demo-select-small-label">
                  Aggregate By
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={aggregate}
                  label="Aggregate By"
                  error={KanbanError.field == "aggregate" ? true : false}
                  onChange={(e) => {
                    setAggregate(e.target.value),
                      setKanbanError({ error: false, field: "" });
                  }}
                  IconComponent={KeyboardArrowDownOutlinedIcon}
                >
                  <MenuItem value={"Annual Revenue"}>Annual Revenue</MenuItem>
                </Select>
                <p style={{ color: "#d32f2f", fontWeight: 400 }}>
                  {KanbanError.field == "aggregate"
                    ? " aggregate required"
                    : ""}{" "}
                </p>
              </CommonFormcontrol>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <CommonFormcontrol required fullWidth size="small">
                <InputLabel id="demo-select-small-label">
                  Categorize By
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={category}
                  // defaultValue={defaultCategory}
                  label="Categorize By *"
                  error={KanbanError.field == "category" ? true : false}
                  onChange={(e) => handleChange(e)}
                  IconComponent={KeyboardArrowDownOutlinedIcon}
                >
                  {categoryList?.map((ele, index) => (
                    <MenuItem key={index} value={ele}>
                      {ele?.name.replace("_", " ")}
                    </MenuItem>
                  ))}
                </Select>
                <p style={{ color: "#d32f2f", fontWeight: 400 }}>
                  {KanbanError.field == "category" ? "category required" : ""}
                </p>
              </CommonFormcontrol>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <CommonFormcontrol fullWidth size="small">
                <InputLabel id="demo-select-small-label">
                  Header Style
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={headerColor}
                  label="Header Style"
                  onChange={(e) => setColor(e.target.value)}
                  IconComponent={KeyboardArrowDownOutlinedIcon}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Mono Color"}>Mono Color</MenuItem>
                  <MenuItem value={"Multi Color"}>Multi Color</MenuItem>
                </Select>
              </CommonFormcontrol>
            </Grid>
          </Grid>
        </KanbanSettingForm>
        {/*---------------------------------- draggable fileds----------------------- */}
        <TableGridBox>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-column" direction="horizontal">
              {(provided, snapshot) => (
                <Box mt={1}>
                  <Grid
                    container
                    spacing={1.5}
                    isDraggingOver={snapshot.isDraggingOver}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {starter.columnOrder.map((columnId, index) => {
                      const column = starter.columns[columnId];
                      const tasks = column?.taskIds?.map(
                        (taskId) => starter.defaultFields[taskId]
                      );
                      return (
                        <Column
                          index={index}
                          snapshots={snapshot}
                          key={column.id}
                          column={column}
                          tasks={tasks}
                          addRemoveSelectedField={addRemoveSelectedField}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </Grid>
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </TableGridBox>
      </DialogContent>
      <DialogActions>
        <SmallFilledBtn
          disabled={saveLoader}
          type="submit"
          onClick={() => {
            handleAdd();
          }}
        >
          {saveLoader ? (
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
              {data?.kanban_view_name == null || ""
                ? "Create Kanban"
                : "Update Kanban"}
            </>
          )}
        </SmallFilledBtn>
        <SmallOutineBtn disabled={saveLoader} onClick={() => handleClose()}>
          Cancel
        </SmallOutineBtn>
      </DialogActions>
    </StyledBootstrapDialog>
  );
};

export default KanbanPopUp;
