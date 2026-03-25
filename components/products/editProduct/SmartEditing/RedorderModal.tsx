import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragHandleIcon from "@mui/icons-material/DragHandle";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function ReorderModal({
  setOpen,
  open,
  tabs,
  formik,
  setInformationType,
}) {
  const [items, setItems] = React.useState<any>([]);
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (items.length === 0) {
      setItems(
        tabs.map((v, i) => {
          if (v.title) {
            return { ...v, id: `${v.title}+${v.value}` };
          } else {
            return {
              ...v,
              id: `tab ${i + 1}+${v.value}`,
              title: `Tab`,
            };
          }
        })
      );
    }
  }, [tabs]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    let item = reorder(items, result.source.index, result.destination.index);
    setItems(item);
  };

  const handleSave = () => {
    setInformationType(`${items[0].value}`);
    formik.setFieldValue("tabs", items);
    setOpen(false);
  };

  const ButtonCol = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    paddingTop: "14px",
  });

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Reorder Tabs
        </BootstrapDialogTitle>
        <DialogContent dividers style={{ height: "100%", width: "500px" }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {items.map((value, index) => {
                    return (
                      <>
                        <Draggable
                          key={value.id}
                          draggableId={value.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Box
                                display="flex"
                                justifyContent="space-between"
                                p={1}
                                gap={2}
                              >
                                <Typography key={index} gutterBottom>
                                  {value.title}
                                </Typography>
                                <DragHandleIcon />
                              </Box>
                            </div>
                          )}
                        </Draggable>
                        <Divider />
                      </>
                    );
                  })}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <ButtonCol>
            <Button
              color="error"
              variant="outlined"
              size="small"
              style={{
                textTransform: "none",
                minWidth: "90px",
              }}
              onClick={handleSave}
            >
              Save
            </Button>
          </ButtonCol>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
