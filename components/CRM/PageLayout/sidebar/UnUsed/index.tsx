import React, { useEffect, useState } from "react";
import initialData from "../../common/dummyData";
import { Droppable } from "react-beautiful-dnd";
import UnusedListDraggable from "./UnusedListDraggable";
import { useSelector } from "react-redux";
import { FieldTitle, OuterBox } from "../../style";

const UnusedSideBarDragable = () => {
  const { removedListItems } = useSelector((state: any) => state.LeadsData);

  useEffect(() => {}, []);
  const [sidebarItems, setSidebarItems] = useState<any[]>(
    initialData.sideBarItems
  );

  return (
    <>
      <Droppable
        droppableId="Unusedsidebar"
        type="DataList"
        direction="vertical"
      >
        {(provided, _snapshot) => (
          <OuterBox ref={provided.innerRef} {...provided.droppableProps}>
            <FieldTitle variant="h6">
              {removedListItems.length > 0 ? "Fields" : ""}
            </FieldTitle>
            {removedListItems?.map((columnId: any, index) => {
              return (
                <UnusedListDraggable
                  columnId={columnId}
                  index={index}
                  data={removedListItems}
                />
              );
            })}
            {provided.placeholder}
          </OuterBox>
        )}
      </Droppable>
    </>
  );
};

export default UnusedSideBarDragable;
