import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  List,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { OuterContainer } from "@/components/SellerTools/styles";
import { ProfileHeader } from "@/components/common/profileheader";
import { CommonBlackOutineBtn, CommonRedOutineBtn, DataGridStyle, MaxLimitTxt, RedFilledButton, RuleArea, RuleDes, RuleMainHeading, SearchContainer, SmallHeading, WFCreateRuleContainer, WFFormControl, WorkFlowTableCoulmn, WorkflowBootstrapDialog, WorkflowSearchCommon, WorkflowWhiteContainer, WorkflowWrapper } from "./style";
import SearchIcon from "@mui/icons-material/Search";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const columns: any = [
  {
    field: "id",
    headerName: "Rule Name",
    minWidth: 100,
    flex: 1,
    headerAlign: 'left',
    align: 'left',
  },

  {
    field: "orderid",
    headerName: "All Module",
    minWidth: 100,
    flex: 1,
    editable: false,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: "productName",
    headerName: "Execute On",
    minWidth: 200,
    editable: false,
    headerAlign: 'left',
    align: 'left',
  },

  {
    field: "weight",
    headerName: "Actions",
    minWidth: 100,
    flex: 1,
    editable: false,
    headerAlign: 'left',
    align: 'left',
  },

  {
    field: "area",
    headerName: "Last Modified",
    minWidth: 100,
    flex: 1,
    headerAlign: 'left',
    align: 'left',
  },

  {
    field: "quantity",
    headerName: "Status",
    minWidth: 100,
    flex: 1,
    editable: false,
    headerAlign: 'left',
    align: 'left',
  },


];
const rows = [
  {
    id: "Updating Fielde",
    orderid: "Leads",
    productName: "Create",
    price: "Jun 14, 2024",
    weight: "1",
    area: "Jun 14, 2024",
    quantity: "Active",
  },
  {
    id: "Create a Tasgk",
    orderid: "Leads",
    productName: "Create",
    price: "Jun 14, 2024",
    weight: "2",
    area: "Jun 14, 2024",
    quantity: "Active",
  },
  {
    id: "Create a Task2",
    orderid: "Leads",
    productName: "Create",
    price: "Jun 14, 2024",
    weight: "3",
    area: "Jun 14, 2024",
    quantity: "Active",
  },
  {
    id: "Updating Fieldw",
    orderid: "Leads",
    productName: "Create",
    price: "Jun 14, 2024",
    weight: "4",
    area: "Jun 14, 2024",
    quantity: "Active",
  },
  {
    id: "Create a Task2",
    orderid: "Leads",
    productName: "Create",
    price: "Jun 14, 2024",
    weight: "5",
    area: "Jun 14, 2024",
    quantity: "Active",
  },
  {
    id: "Updating Field",
    orderid: "Leads",
    productName: "Create",
    price: "Jun 14, 2024",
    weight: "6",
    area: "Jun 14, 2024",
    quantity: "Active",
  },
  {
    id: "Create a Taskq",
    orderid: "Leads",
    productName: "Create",
    price: "Jun 14, 2024",
    weight: "7",
    area: "Jun 14, 2024",
    quantity: "Active",
  },
  {
    id: "Create a Task",
    orderid: "Leads",
    productName: "Create",
    price: "Jun 14, 2024",
    weight: "8",
    area: "Jun 14, 2024",
    quantity: "Active",
  },
  {
    id: "Updating Field2",
    orderid: "Leads",
    productName: "Create",
    price: "Jun 14, 2024",
    weight: "9",
    area: "Jun 14, 2024",
    quantity: "Active",
  },
  {
    id: "Updating Field3",
    orderid: "Leads",
    productName: "Create",
    price: "Jun 14, 2024",
    weight: "1",
    area: "Jun 14, 2024",
    quantity: "Active",
  },
  {
    id: "Updating Field4",
    orderid: "Leads",
    productName: "Create",
    price: "Jun 14, 2024",
    weight: "1",
    area: "Jun 14, 2024",
    quantity: "Active",
  },

];
const WorkFlowView = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <div className="full_page">
      <OuterContainer>
        <ProfileHeader text={"Workflows"} />
      </OuterContainer>
      <WorkflowWhiteContainer>
        <WorkflowWrapper>
          <SmallHeading>Rule</SmallHeading>
          <RuleArea>
            <RuleMainHeading>
              Workflow Rules
            </RuleMainHeading>
            <RuleDes>
              Workflow rules allow you to perform certain automatic actions on specific records based on filter criteria. Workflow automations can send emails, update fields, create records and much more.
            </RuleDes>
            <SearchContainer>
              <WorkflowSearchCommon>
                <TextField
                  fullWidth
                  id="standard-bare"
                  variant="outlined"
                  placeholder="Search..."
                  InputProps={{
                    endAdornment: (
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                />
              </WorkflowSearchCommon>
              <RedFilledButton variant="contained" size="small" onClick={handleClickOpen}>Create Rule</RedFilledButton>
            </SearchContainer>
            <WorkFlowTableCoulmn sx={{ height: 520, width: "100%" }}>
              <DataGridPro
                // onCellClick={handleCellClick}
                autoHeight
                rows={rows}
                columns={columns}
                loading={rows.length === 0}
                rowHeight={38}
                headerHeight={40}
                checkboxSelection
                sx={DataGridStyle}
              />
            </WorkFlowTableCoulmn>
          </RuleArea>
        </WorkflowWrapper>
        <WFCreateRuleContainer>
          <WorkflowBootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Create New Rule
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: "#d7282f"
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <WFFormControl fullWidth size="small">
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Rule Name"
                  required
                  id="outlined-size-small"
                  defaultValue="Small"
                  size="small"
                  placeholder="Enter Name"
                />
              </WFFormControl>
              <WFFormControl fullWidth size="small">
                <InputLabel shrink id="demo-simple-select-label">Select</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                  size="small"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </WFFormControl>
              <WFFormControl fullWidth size="small">
                <TextField
                  InputLabelProps={{ shrink: true }}
                  id="outlined-textarea"
                  label="Description"
                  placeholder="Write in multiple line"
                  multiline
                  maxRows={4}
                />
                <MaxLimitTxt>Maximum limit: 256 Characters.</MaxLimitTxt>
              </WFFormControl>
            </DialogContent>
            <DialogActions>
              <CommonRedOutineBtn autoFocus onClick={handleClose}>
                Cancel
              </CommonRedOutineBtn>
              <CommonRedOutineBtn autoFocus onClick={handleClose}>
                Next
              </CommonRedOutineBtn>
            </DialogActions>
          </WorkflowBootstrapDialog>
        </WFCreateRuleContainer>
      </WorkflowWhiteContainer>
    </div>
  );
};
export default WorkFlowView;
