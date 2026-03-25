import React, { useEffect, useState } from "react";
import initialData from "../../common/dummyData";
import { Droppable } from "react-beautiful-dnd";
import NewListDraggable from "./NewListDraggable";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";

const SideBarDragable = () => {
  const { sideBarListing } = useSelector((state: any) => state.LeadsData);

  useEffect(() => { }, []);
  const [sidebarItems, setSidebarItems] = useState<any[]>(
    initialData.sideBarItems
  );

  return (
    <>
        <Droppable droppableId="sidebar" type="DataList" direction="vertical">
          {(provided, _snapshot) => (
            <Grid container spacing={2} ref={provided.innerRef} {...provided.droppableProps}>
              {sideBarListing?.map((columnId: any, index) => {
                return (
                  <Grid item xs={12} md={6}>
                    <NewListDraggable
                      columnId={columnId}
                      index={index}
                      data={sideBarListing}
                    />
                  </Grid>
                );
              })}
              {provided.placeholder}
            </Grid>
          )}

        </Droppable>
    </>
  );
};

export default SideBarDragable;
