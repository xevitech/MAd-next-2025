import { Checkbox, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Box, Button, Link, Typography, styled } from "@mui/material";
import {
  CardHeading,
  KanbanItemGreen,
  PriceBoxV,
  KanbanItem,
  ItemInfo,
  CardLayout,
  CardStyle,
  CardInfo,
  CardMail,
  CompanyInfo,
  ComanyIcon,
  AnnualRevenue,
  PriceValue,
  LeadNameValue,
  RevenueStack,
  EmailStack,
  KanbanItemHeader,
  LeadNumber,
  KanbanScroll,
} from "../style";
import KanbanList from "./KanbanList";
import {
  getKanbanList,
  setShowButtonsAsperDataChecked,
  setKanbanList,
  setSelectedDataIds,
  setCheckedKanban,
  setSelectedDataEmail,
} from "@/hooks/UseCreateFormData";
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import { apiClient } from "@/components/common/common";
import { ThreeDots } from "react-loader-spinner";
import KanbanView from "../../Skeletons/KanbanView";

const KanbanLayout = () => {
  const {
    kanbanLists,
    savedFieldData,
    typeId,
    saveLoader,
    selectedDataIds,
    selectedDataEmails,
  } = useSelector((state: any) => state.formList);
  const dispatch = useAppDispatch();
  const [selectedChecked, setSelectedChecked] = useState<any>([]);
  const [selectAll, setselectAll] = useState<any>();
  useEffect(() => {
    dispatch(getKanbanList());
  }, [dispatch]);

  const onDragEnd = async ({ source, destination, type, draggableId }) => {
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      const updateKanban = { ...kanbanLists };

      const sourceColumn = updateKanban[source.droppableId];
      const destColumn = updateKanban[destination.droppableId];
      const sourceItems = [...sourceColumn.data];
      const destItems = [...destColumn.data];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      const updatedKanbanLists = {
        ...updateKanban,
        [source.droppableId]: {
          ...sourceColumn,
          data: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          data: destItems,
        },
      };
     
      dispatch(setKanbanList(updatedKanbanLists));


      
      const droppedData = kanbanLists[source.droppableId]?.data[source.index];
      let body = {
        crm_user_form_unique_id:
          savedFieldData?.data?.user_form_listing.unique_id,
        type_id: typeId,
        unique_id: droppedData?.unique_id,
        form_input_value: [
          {
            id: droppedData?.id,
            section_form_id: droppedData?.section_form_id,
            form_input_list_id: droppedData?.form_input_list_id,
            value: destination?.droppableId,
            unique:false
          },
        ],
      };

      let response = await apiClient(`crm/save_input_form`, "post", {
        body,
      });
      if (response.status == true || response.status == 200) {
        dispatch(getKanbanList());
      }
    }
  };


  const handleCheckKanabn = (e, column, columnId) => {
    dispatch(setCheckedKanban([column]));
    if (e.target.checked) {
      dispatch(
        setSelectedDataIds(
          column?.data?.map((item) => parseInt(item.unique_id))
        )
      );

      const updatedSelectedChecked = column?.data?.map((item) => {
        return {
          id: item?.unique_id,
          crm_user_form_unique_id: item?.crm_user_form_unique_id,
          mail: item?.mail,
        };
      });

      dispatch(setSelectedDataEmail(updatedSelectedChecked));
      setSelectedChecked(updatedSelectedChecked);
      setselectAll({ columnId: columnId });
      dispatch(setShowButtonsAsperDataChecked(true));
    } else {
      setselectAll({});
      dispatch(setSelectedDataIds([]));
      dispatch(setSelectedDataEmail([]));
      dispatch(setShowButtonsAsperDataChecked(false));
      setSelectedChecked([]);
    }
  };

  const totalRevenue = (data) => {
    let sum = 0;
    data.forEach((x) => {
      if (!Number.isNaN(x?.Annual_Revenue) && x?.Annual_Revenue) {
        // if(x?.Annual_Revenue){
        sum += Number(x.Annual_Revenue);
      } else {
        sum = 0;
      }
    });
    return sum;
  };
  return (
    <>
      {saveLoader && <KanbanView />}
      <Grid container spacing={1} wrap="nowrap" style={{ height: "100%" }}>
        {!saveLoader && (
          <DragDropContext onDragEnd={onDragEnd}>
            {kanbanLists !== undefined &&
              Object.entries(kanbanLists)?.map(
                ([columnId, column], index): any => {
                  return (
                    <Droppable
                      droppableId={columnId}
                      type="COLUMN"
                      // direction="horizontal"
                      //   ignoreContainerClipping={Boolean(containerHeight)}
                      //   isCombineEnabled={isCombineEnabled}
                    >
                      {(provided, _snapshot) => (
                        <Grid
                          item
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          
                          // {...provided.dragHandleProps}
                        >
                          <KanbanItem>
                            <KanbanItemGreen
                              value={column?.["color_code"].split("_")[1]}
                            >
                              <KanbanItemHeader
                                value={column?.["color_code"].split("_")[0]}
                                text={column?.["color_code"].split("_")[1]}
                              >
                                <ItemInfo>
                                  <CardHeading
                                    text={column?.["color_code"].split("_")[1]}
                                    variant="h5"
                                  >
                                    {columnId}
                                  </CardHeading>
                                  <Checkbox
                                    // checked={selectedChecked?.length === column?.['data']?.length ? true : false }
                                    checked={
                                      selectAll?.columnId == columnId
                                        ? true
                                        : false
                                    }
                                    size="small"
                                    onChange={(e) =>
                                      handleCheckKanabn(e, column, columnId)
                                    }
                                  />
                                </ItemInfo>
                                <PriceBoxV>
                                  <PriceValue>
                                    $ {totalRevenue(column?.["data"])}
                                  </PriceValue>
                                  <LeadNumber>
                                    {" "}
                                    {column?.["data"]?.length} Lead
                                  </LeadNumber>
                                </PriceBoxV>
                              </KanbanItemHeader>
                              <KanbanScroll>
                                <KanbanList
                                  columnId={columnId}
                                  column={column}
                                  selectedChecked={selectedChecked}
                                  setSelectedChecked={setSelectedChecked}
                                  snapshot={ _snapshot }
                                  // index={index}
                                />
                              </KanbanScroll>
                            </KanbanItemGreen>
                          </KanbanItem>
                        </Grid>
                      )}
                    </Droppable>
                  );
                }
              )}
          </DragDropContext>
        )}
      </Grid>
    </>
  );
};

export default KanbanLayout;
