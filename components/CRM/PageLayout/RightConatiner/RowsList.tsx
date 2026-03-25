import React from "react";
import {
  EditLeadHead,
  GridBox,
  HeadingOption,
  LeadsContentContainer,
  LeadsContentInner,
} from "../style";
import { Box, Divider, Grid, Menu, MenuItem } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { CrmStyledMenu } from "../../commonStyle";
import { useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import DraggableList from "../RightDragableList";
import { setGridColumn, setRowListing, setSkeleton } from "@/hooks/LeadsReducer";
import { useAppDispatch } from "redux/store";
const RowsList = ({ tasks, column, index }) => {
  const [anchorEl3, setAnchorEl3] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const { rowListing, showImage, GridLayout } = useSelector(
    (state: any) => state.LeadsData
  );
  const open3 = Boolean(anchorEl3);
  const handleClick3 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl3(event.currentTarget);
  };

  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  const handleColumn = (columnId, type) => {   
    dispatch(setSkeleton([type]));
    const updateColumn = [...rowListing?.columnOrder];
    if (columnId.tab_columns == type) {
      return;
    }

    const updatedItems = updateColumn.map((item: any) => {
      if (
        item.section_id === columnId.section_id &&
        item.tab_columns !== undefined
      ) {
        return { ...item, tab_columns: type };
      }
      return item; // Return unchanged item for other cases
    });
    dispatch(
      setRowListing({
        ...rowListing,
        columnOrder: updatedItems,
      })
    );
  };
  const handleDelete = (columnId) => {
    const updateColumn = [...rowListing?.columnOrder];
    if (columnId.dummy_section_id !== undefined) {
      const sectionIndex = updateColumn.findIndex(
        (item: any) => item.name === columnId?.name
      );
      updateColumn.splice(sectionIndex, 1);
    } else {
      const sectionIndex = updateColumn.findIndex(
        (item: any) => item.section_id === columnId.section_id
      );
      updateColumn.splice(sectionIndex, 1);
    }
    dispatch(
      setRowListing({
        ...rowListing,
        columnOrder: updateColumn,
      })
    );
  };

  return (
    <>
      <Draggable
        draggableId={
          column?.dragged_id !== ""
            ? column?.dragged_id
            : column?.dragged_id?.toString()
        }
        index={index}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <LeadsContentContainer key={column?.id}>
              <LeadsContentInner>
                <Grid container>
                  <HeadingOption>
                    <EditLeadHead variant="h6"> {column?.name}</EditLeadHead>
                    <Box>
                      <Menu
                        sx={CrmStyledMenu}
                        anchorEl={anchorEl3}
                        id="account-menu3"
                        open={open3}
                        onClose={handleClose3}
                        onClick={handleClose3}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            "&:before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{
                          horizontal: "right",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "right",
                          vertical: "bottom",
                        }}
                      >
                        <MenuItem
                          onClick={() => handleColumn(column, "single")}
                        >
                          Single Column
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleColumn(column, "double")}
                        >
                          Double Column
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleColumn(column, "triple")}
                        >
                          Triple Column
                        </MenuItem>
                        {column?.is_delete != 0 && (
                          <MenuItem onClick={() => handleDelete(column)}>
                            Delete Section
                          </MenuItem>
                        )}
                      </Menu>
                      <span
                        onClick={handleClick3}
                        aria-controls={open3 ? "account-menu3" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open3 ? "true" : undefined}
                      >
                        <SettingsOutlinedIcon />
                      </span>
                    </Box>
                  </HeadingOption>
                </Grid>
                <Divider />
                <Droppable droppableId={column?.name} type="DataList">
                  {(provided, _snapshot) => (
                    <div ref={provided.innerRef}>
                      <GridBox container spacing={2}>
                        {tasks?.filter(item=>item?.field_type!=="tag").map((item, index) => {
                          return (
                            <DraggableList
                              column={column}
                              items={item}
                              index={index}
                            />
                          );
                        })}
                        {provided.placeholder}
                      </GridBox>
                    </div>
                  )}
                </Droppable>
                {/* {<DragDropConatiner/>} */}
              </LeadsContentInner>
            </LeadsContentContainer>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default RowsList;
