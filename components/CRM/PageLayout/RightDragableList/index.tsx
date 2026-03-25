import React, { use, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  Button,
  Grid,
  Menu,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  FormFieldContainer,
  TextFieldRow,
  TextFieldRowLeft,
  StyledTextarea,
} from "../style";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { CrmStyledMenu } from "../../commonStyle";
import { Draggable } from "react-beautiful-dnd";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
  setEditName,
  setMenuItem,
  setEditProperty,
  setCheckMenu,
  setEditItems,
} from "@/hooks/LeadsReducer";
import { useAppDispatch } from "redux/store";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector } from "react-redux";
const DraggableList = ({ column, items, index }) => {
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const { rowListing, showImage, GridLayout } = useSelector(
    (state: any) => state.LeadsData
  );

  const open2 = Boolean(anchorEl2);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose: any = async (ele, items) => {
    if (ele == "remove") {
      // const payload = { ele, items: { column, items } };
      // dispatch(setMenuItem(payload));
      await dispatch(setEditItems({ column, items }));
      dispatch(setCheckMenu({ type: "remove", status: true }));
    } else if (ele == "properties") {
      const EditPayload = { status: true, editFields: items };
      await dispatch(setEditProperty(EditPayload));
      dispatch(setCheckMenu({ type: "properties", status: true }));
    } else if (ele == "duplicate") {
      const payload = { ele, items };
      dispatch(setMenuItem(payload));
    } else {
      if (items?.is_required == "0") {
        const payload = { ele, items };
        dispatch(setMenuItem(payload));
      } else {
        const payload = { ele, items };
        dispatch(setMenuItem(payload));
      }
    }
    setAnchorEl2(null);
  };

  const handleClosePopUp = () => {
    setAnchorEl2(null);
  };

  const handleInputChange = (e, items) => {
    const payload = { value: e.target.value, items: items };
    dispatch(setEditName(payload));
  };

  return (
    <>
      <Draggable
        draggableId={
          items?.id == ""
            ? items?.uniqueidForDrag.toString()
            : items?.id.toString()
        }
        index={index}
        key={items?.id == "" ? items?.uniqueidForDrag : items?.id}
      >
        {(provided, _snapshot) => (
          <Grid
            item
            md={
              column.tab_columns == "single"
                ? 12
                : column.tab_columns == "triple"
                ? 4
                : 6
            }
            sm={12}
            xs={12}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            key={
              !items?.uniqueidForDrag
                ? items?.id.toString()
                : items?.uniqueidForDrag
            }
          >
            <TextFieldRow
              style={{
                backgroundColor: `${
                  items?.readOnly == false ? "#338cf024" : ""
                }`,
                borderLeft: `${
                  items?.is_required === "1" ? "2px" : "1px"
                } solid ${items?.is_required === "1" ? "#d7282f" : ""}`,
                // border: `${items.readOnly == false ? "1px solid #338cf0" : ""}`,
              }}
            >
              <TextFieldRowLeft style={{}}>
                {/* {items?.field_type == "text" && ( */}
                <TextField
                  id="standard-basic"
                  variant="standard"
                  onInputCapture={(e) => {
                    handleInputChange(e, items);
                  }}
                  // defaultValue={items?.label}
                  focused={true}
                  // value={itemName}
                  defaultValue={
                    items?.name == undefined || items?.name == ""
                      ? items?.label
                      : items?.name == "mail"
                      ? "Email"
                      : items?.name.replaceAll("_", " ").replaceAll(".", "")
                  }
                  InputProps={{
                    disableUnderline: true,
                    readOnly: items?.readOnly == false ? items?.readOnly : true,
                  }}
                />
                {/* )} */}
                {items?.field_type == "select" &&
                  items?.label !== "Lead Owner" && (
                    <FormFieldContainer>
                      {items?.option_list.length > 0 && (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={items?.label}
                          // label="Age"
                          onChange={(e) => handleInputChange(e, items)}
                          defaultValue={items?.label}
                          IconComponent={KeyboardArrowDownOutlinedIcon}
                        >
                          {items?.option_list.map((list) => (
                            <MenuItem value={list}>{list}</MenuItem>
                          ))}
                        </Select>
                      )}
                    </FormFieldContainer>
                  )}
                {items?.field_type == "file" && (
                  <>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="raised-button-file"
                      multiple
                      onChange={(e) => handleInputChange(e, items)}
                      type="file"
                    />
                    <label htmlFor="raised-button-file">
                      <Button component="span">Upload</Button>
                    </label>
                  </>
                )}
                {items?.field_type == "date" && (
                  <>
                    <input
                      style={{ display: "none" }}
                      id="raised-button-file"
                      // value={items.label}
                      onChange={(e) => handleInputChange(e, items)}
                      type="date"
                    />
                  </>
                )}
                <Typography>
                  {" "}
                  {items?.name !== "mail" &&
                    items?.name !== "Mobile_No." &&
                    items?.name !== "Last_Name" &&
                    items?.name !== "First_Name" &&
                    items?.name !== "Lead_Owner" &&
                    items?.name !== "Account" &&
                    items?.label}
                </Typography>
              </TextFieldRowLeft>

              <span
                onClick={handleClick}
                aria-controls={open2 ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open2 ? "true" : undefined}
              >
                <MoreHorizOutlinedIcon />
              </span>
              <Menu
                sx={CrmStyledMenu}
                anchorEl={anchorEl2}
                id="account-menu"
                open={open2}
                onClose={handleClosePopUp}
                onClick={handleClosePopUp}
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
                {(items.name != "Lead_Owner" &&
                  items.name != "Contact_Owner" &&
                  items.name != "Account_Owner" &&
                  items.name != "Deal_Owner" &&
                  items.name != "Lead_status"
                  ) && (
                  <MenuItem onClick={() => handleClose("required", items)}>
                    {items?.is_required == "1" && <CheckIcon />}Mark as required
                  </MenuItem>
                )}
                <MenuItem onClick={() => handleClose("properties", items)}>
                  Edit Properties
                </MenuItem>
                {(items?.name === "mail" || items?.name === "Mobile_No.") && (
                  <MenuItem onClick={() => handleClose("duplicate", items)}>
                    {items?.unique == 1 && <CheckIcon />} Do not allow duplicate
                    value
                  </MenuItem>
                )}

                <MenuItem
                  disabled={items?.is_delete == 0 ? true : false}
                  onClick={() => handleClose("remove", items)}
                >
                  Remove Field
                </MenuItem>
              </Menu>
            </TextFieldRow>
            <p style={{ color: "#D7282F" }}></p>
          </Grid>
        )}
      </Draggable>
    </>
  );
};

export default DraggableList;
