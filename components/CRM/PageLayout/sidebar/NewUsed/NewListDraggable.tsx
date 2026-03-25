import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { IconText, LeadFieldBox } from "../../style";
import Image from "next/image";
import DragIndicatorSharpIcon from "@mui/icons-material/DragIndicatorSharp";
import { Draggable } from "react-beautiful-dnd";

const NewListDraggable = ({ columnId, index, data }) => {
  // let [id] = Object.keys(columnId);
  // let title: any = Object.values(columnId)[0];
 

  return (
    <Draggable draggableId={ columnId?.label=="Multi Select"?columnId?.label :columnId?.uid} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          
              <LeadFieldBox>
                <IconText>
                  {/* Attach dragHandleProps to this icon */}
                  <Image
                    src={columnId?.icon}
                    alt="Edit"
                    width={17}
                    height={18}
                    style={{ color: "#231F20" }}
                  />
                  <Typography>{columnId?.label=="Multi Select"?"Select" :columnId?.label}</Typography>
                </IconText>
                <DragIndicatorSharpIcon />
              </LeadFieldBox>
        </div>
      )}
    </Draggable>
  );
};

export default NewListDraggable;
