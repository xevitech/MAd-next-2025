import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const Task = ({ task, index, column, addRemoveSelected,snapshots }) => {
  const performClick = async (id, index, type) => {
    addRemoveSelected(id, index, type);
  };

  return (
    <Draggable draggableId={task.id} index={index} type="task">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
          // style={{backgroundColor: snapshot.draggingFromThisWith ?"red" : '#fff',}}
        >
          <ListItem disablePadding style={{backgroundColor: snapshot.isDragging  ?"rgba(0, 0, 0, 0.06)" : '#fff',}}>
            <ListItemButton>
              <ListItemText primary={
                task.content == 'mail' ? 'Email' : task.content.charAt(0).toUpperCase() + task.content.slice(1).replaceAll('_', ' ').replaceAll('.', '')} />
              {column == "column-1" ? (
                <AddIcon onClick={() => performClick(task.id, index, "add")} />
              ) : (
                <>
                  <RemoveIcon
                    onClick={() => performClick(task.id, index, "remove")}
                  />
                  <img
                    height={15}
                    width={15}
                    src={"/assets/images/crm/pined.svg"}
                    alt="Pin"
                    title="Pin"
                  />
                </>
              )}
            </ListItemButton>
          </ListItem>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
