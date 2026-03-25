import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
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
  TableGridBox,
  CusTomSearchBox,
} from "../style";

import { Box, Divider, FormControl, Grid, Typography } from "@mui/material";
import {
  ActionIcons,
  CommonFormcontrol,
  IconButtonAdd,
  IconButtonRemove,
  SearchCommon,
  SmallOutineBtn,
} from "../commonStyle";
import { useSelector } from "react-redux";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
  DateFilter,
  NumberFilter,
  StringFilter,
} from "@/components/common/common";
import Column from "../DragDrop/Column";
import {
  KanbanHeading,
  KanbanSettingButton,
  KanbanSettingForm,
  KanbanSettingPopup,
} from "../View/style";
import { Searchicon } from "@/components/sidebar/sidebarstyle";
const KanbanSettingView = () => {
  const { savedFieldData } = useSelector((state: any) => state.formList);
  const [showCriteria, setShowCriteria] = useState();
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
      if (index !== -1) {
        column2.splice(index, 1);
        column1.push(id);
      }
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
    <CustomViewDrawer role="presentation">
      <CustomViewOuter>
        <KanbanSettingPopup>
          <KanbanHeading variant="h4">Kanban View - Settings</KanbanHeading>
          <KanbanSettingForm>
            <Grid container spacing={2}>
              <Grid item md={12} sx={{ pt: 0 }}>
                <CommonFormcontrol required fullWidth size="small">
                  <TextField
                    fullWidth
                    required
                    label="Kanban View Name"
                    id="outlined-size-small"
                    size="small"
                    placeholder="Enter Name"
                  />
                </CommonFormcontrol>
              </Grid>
              <Grid item md={12}>
                <CommonFormcontrol required fullWidth size="small">
                  <InputLabel id="demo-select-small-label">
                    Aggregate By
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={12}
                    label="Aggregate By"
                    // onChange={handleChange}
                    IconComponent={KeyboardArrowDownOutlinedIcon}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </CommonFormcontrol>
              </Grid>
              <Grid item md={12}>
                <CommonFormcontrol required fullWidth size="small">
                  <InputLabel id="demo-select-small-label">
                    Categorize By
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={12}
                    label="Categorize By"
                    // onChange={handleChange}
                    IconComponent={KeyboardArrowDownOutlinedIcon}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </CommonFormcontrol>
              </Grid>
              <Grid item md={12}>
                <CommonFormcontrol fullWidth size="small">
                  <InputLabel id="demo-select-small-label">
                    Header Style
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={534}
                    label="Header Style"
                    // onChange={handleChange}
                    IconComponent={KeyboardArrowDownOutlinedIcon}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </CommonFormcontrol>
              </Grid>
            </Grid>
          </KanbanSettingForm>
          <Box mt={1}>
            <Grid container spacing={2}>
              <Grid item sm={6} md={6}>
                <KanbanHeading variant="h5">
                  Select Fields <span>(Available)</span>
                </KanbanHeading>
                <TableGridBox>
                  <CusTomSearchBox>
                    <SearchCommon>
                      <TextField
                        fullWidth
                        id="standard-bare"
                        variant="outlined"
                        placeholder="Search..."
                        InputProps={{
                          endAdornment: (
                            <IconButton>
                              <Searchicon />
                            </IconButton>
                          ),
                        }}
                      />
                    </SearchCommon>
                  </CusTomSearchBox>
                  <nav aria-label="secondary mailbox folders">
                    <List>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary="Full Name" />
                          <AddIcon />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list">
                          <ListItemText primary="Account Name" />
                          <AddIcon />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list">
                          <ListItemText primary="Phone" />
                          <AddIcon />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list">
                          <ListItemText primary="Email" />
                          <AddIcon />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list">
                          <ListItemText primary="Lead Source" />
                          <AddIcon />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list">
                          <ListItemText primary="Lead Status" />
                          <AddIcon />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list">
                          <ListItemText primary="Lead Owner" />
                          <AddIcon />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </nav>
                </TableGridBox>
              </Grid>
              <Grid item sm={6} md={6}>
                <KanbanHeading variant="h5">Selected</KanbanHeading>
                <TableGridBox>
                  <nav aria-label="secondary mailbox folders">
                    <List>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary="Full Name" />
                          <RemoveIcon />
                          <img
                            height={15}
                            width={15}
                            src={"/assets/images/crm/pined.svg"}
                            alt="Pin"
                            title="Pin"
                          />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list">
                          <ListItemText primary="Account Name" />
                          <RemoveIcon />
                          <img
                            height={15}
                            width={15}
                            src={"/assets/images/crm/pined.svg"}
                            alt="Pin"
                            title="Pin"
                          />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list">
                          <ListItemText primary="Phone" />
                          <RemoveIcon />
                          <img
                            height={15}
                            width={15}
                            src={"/assets/images/crm/pined.svg"}
                            alt="Pin"
                            title="Pin"
                          />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list">
                          <ListItemText primary="Email" />
                          <RemoveIcon />
                          <img
                            height={15}
                            width={15}
                            src={"/assets/images/crm/pined.svg"}
                            alt="Pin"
                            title="Pin"
                          />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </nav>
                </TableGridBox>
              </Grid>
            </Grid>
          </Box>
          <KanbanSettingButton>
            <SmallOutineBtn variant="outlined">Save</SmallOutineBtn>
            <SmallOutineBtn variant="outlined">Cancel</SmallOutineBtn>
          </KanbanSettingButton>
        </KanbanSettingPopup>
      </CustomViewOuter>
    </CustomViewDrawer>
  );
};

export default KanbanSettingView;
