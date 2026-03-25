import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import initialData from "../common/dummyData";
import RowsList from "./RowsList";
import { useSelector } from "react-redux";
const DragDropConatiner = () => {
  const { rowListing } = useSelector((state: any) => state.LeadsData);

  useEffect(() => {}, [rowListing]);
  return (
    <Droppable droppableId="all-column" type="column" direction="vertical">
      {(provided, _snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {rowListing.columnOrder?.map((columnId, index) => {
            const column = rowListing[columnId];
            const tasks = column?.taskIds?.map(
              (taskId) => rowListing.tasks[taskId]
            );
            return (
              <RowsList
                index={index}
                key={columnId?.id}
                column={columnId}
                tasks={columnId?.form_fields}
              />
            );
          })}
        </div>
      )}
    </Droppable>
  );
};

export default DragDropConatiner;
