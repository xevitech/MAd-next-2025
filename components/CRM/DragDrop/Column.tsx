import React, { useEffect, useState } from "react";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Grid, List, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { CusTomSearchBox, StackHeading, TableGridBox } from "../style";
import { Search, SearchIconWrapper, StyledInputBase } from "../commonStyle";
import SearchIcon from "@mui/icons-material/Search";
const Column = ({ tasks, column, index, addRemoveSelectedField,snapshots }) => {
  const [duplicateTasks, setDuplicateTasks] = useState(tasks);
  const addRemoveSelected = async (id, location, type) => {
    addRemoveSelectedField(id, location, type);
  };
  // const filterKeys = async (e) => {
  //   let duplicateTasks = tasks.filter(i => i.content.toLowerCase().includes(e.target.value.toLowerCase()));
  //   setDuplicateTasks(duplicateTasks)
  // }

  // useEffect(() => {
  //   setDuplicateTasks(tasks)
  // },[duplicateTasks])

  return (
    <Grid item xs={12} sm={6} md={6}>
      <TableGridBox>
        <CusTomSearchBox>
          <StackHeading>{column.title}</StackHeading>
          {column?.id == "column-1" && (
            <Search>
              <TextField
                fullWidth
                id="standard-bare"
                variant="outlined"
                // onChange={e => filterKeys(e)}
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </Search>
          )}
        </CusTomSearchBox>
        <Draggable draggableId={column.id} index={index} type="column">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Droppable droppableId={column.id} type="task">
                {(provided, snapshot) => (
                  <List className="tabulerview"
                    isDraggingOver={snapshot.isDraggingOver}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {/* =========={tasks.length} */}
                    {tasks?.map((task, index) => (
                      <Task
                        key={task?.id}
                        task={task}
                        index={index}
                        column={column?.id}
                        addRemoveSelected={addRemoveSelected}
                        snapshots={snapshot}
                      />
                    ))}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </div>
          )}
        </Draggable>
      </TableGridBox>
    </Grid>
  );
};

export default Column;
