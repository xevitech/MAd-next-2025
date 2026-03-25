import { Divider, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  Deleteicon,
  FieldContainer,
  FormBox,
  IconText,
  LeadFieldBox,
} from "../../style";
import Image from "next/image";
import DragIndicatorSharpIcon from "@mui/icons-material/DragIndicatorSharp";
import { Draggable } from "react-beautiful-dnd";
import Crop169SharpIcon from "@mui/icons-material/Crop169Sharp";
import { useSelector } from "react-redux";
import { DeleteFormList, setRemovedUnusedItems } from "@/hooks/LeadsReducer";
import { useAppDispatch } from "redux/store";
const UnusedListDraggable = ({ columnId, index, data }) => {
  // let [id] = Object.keys(columnId);
  const dispatch = useAppDispatch();
  // let title: any = Object.values(columnId)[0];
  const handleDelete = (data, id) => {
    dispatch(setRemovedUnusedItems(data));
    dispatch(DeleteFormList(id));
  };

  return (
    <Draggable draggableId={columnId.name} index={index}>
      {(provided, snapshot) => (
        <FormBox
          component="form"
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Divider />
          <FieldContainer>
            <IconText>
              <Crop169SharpIcon />
              <Typography>{columnId.label}</Typography>
            </IconText>
            <Deleteicon onClick={() => handleDelete(index, columnId.id)} />
          </FieldContainer>
        </FormBox>
      )}
    </Draggable>
  );
};

export default UnusedListDraggable;
