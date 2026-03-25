import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  DialogActions,
  DialogContent,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  List,
  Typography,
} from "@mui/material";
import {
  ActionButtonContainer,
  BottomTxt,
  FilterRowContainer,
  FilterRowContainerLeft,
  LeadNoContent,
  LeadsDataContainer,
  NoImage,
  OutLinedButton,
  PageDescription,
  PageHeading,
  ActionFieldStyle,
  LeadListData,
  ActiveBtn,
  SelectEditOption,
  AllLadsBtn,
  StyledSwipeableDrawer,
  ManageColumnContainer,
  ManagaDeleteDialog,
  ManageColumnList,
  ManageColumnContainerError,
  TotalRecordsFilter,
  ListRecords,
  FilterByColumn,
  FilterRecordList,
  FilterAction,
  ViewTypeChange,
  SMDrawerFilter,
  TagInnerDiv,
  TagStylePopover,
  ButtonManageColmnBox,
  CusTomSearchBox,
} from "../style";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { LicenseInfo } from "@mui/x-license-pro";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {
  BtnFilledLeads,
  SearchCommon,
  SmallOutineBtn,
  StyledBootstrapDialog,
  FilterActionButton,
  SDCheckboxStyle,
  SmallRedOutineBtn,
  SmallBlackOutineBtn,
} from "../commonStyle";
import Menu, { MenuProps } from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);
import {
  setCustomViewId,
  setSelectedViewName,
  setSaveLoader,
  getSingleCustomViews,
  setOpenCustomView,
  saveCustomViewData,
  setCustomFilterId,
  setCurrentFilterId,
  setFilterPopUp,
  setTaskPopUp,
  setManageTags,
  getKanbanList,
  setDataViewType,
  setShowButtonsAsperDataChecked,
  setMeetingPopUp,
  setCallsPopUp,
  informationTaskMeetingCalls,
  deleteTasks,
  setFilterOthers,
  setFilterShowOthers,
  setSelectedActvityIds,
} from "@/hooks/UseCreateFormData";
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import _debounce from "lodash/debounce";
import { toast } from "react-toastify";
import KanbanSettingView from "./KanbanSettingView";
import TaskPopUp from "./TaskPopUp";
import ComposeEmailPopUp from "./ComposeEmailPopUp";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import ManageTags from "./ManageTags";
import MassConvert from "./MassConvert";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import KanbanPopUp from "../PageLayout/common/kanbanPopUp";
import ListItemIcon from "@mui/material/ListItemIcon";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CreateForm from "./CreateForm";
import { taskFields } from "@/components/common/common";
import MeetingPopup from "./MeetingPopup";
import FiltersColumnOtherModules from "./FiltersColumnOtherModules";
import ListViewOther from "../View/ListViewOther";
import OtherRightDrawer from "./OtherRightDrawer";
import ManageMassOther from "./ManageMassOther";
import SaveFilterOther from "./SaveFilterOther";
import TagsInputOther from "./TagsInputOther";
import KanbanViewOther from "../View/KanbanViewOther";
import CallPopup from "./CallPopup";
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
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

const OtherModuels = () => {
  const subAccount = localStorage.getItem("subAccount");
  const [open, setOpen] = useState(false);
  const [kanbanPopUp, setKanbanPop] = useState(false);
  const [manageColumnError, setManageColumnError] = useState(false);
  const [mainFilters, setMainFilters] = useState(false);
  const [tags, setTags] = useState("Tags");
  const [action, setAction] = useState<any>();
  const [customStateSetting, setCustomStateSetting] = useState({
    right: false,
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorDataView, setAnchorDataView] =
    React.useState<null | HTMLElement>(null);
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const [openKanbanSetting, setOpenKanbanSetting] = useState(false);
  const [opencolumn, setOpenColumn] = React.useState(false);
  const [defaultColumn, setDefaultColumn] = useState([]);
  const [duplicateColumns, setDuplicateColumns] = useState([]);
  const [favouriteView, setFavouriteView] = useState([]);
  const [myViews, setMyViews] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [viewType, setViewType] = useState("List View");
  const [tagType, setTagType] = useState(0);

  const dispatch = useAppDispatch();
  const {
    dataViewType,
    createKanbanStatus,
    saveLoader,
    savedFieldData,
    savedViews,
    selectedViewName,
    openCustomView,
    filterPopUp,
    taskPopUp,
    meetingPopUp,
    callsPopUp,
    composeEmailPopUp,
    manageTags,
    typeName,
    taskMeetingCalls,
    dataLoader,
    selectedActvityIds,
    filterOthers,
  } = useSelector((state: any) => state.formList);



  const handleCloseColumn = () => {
    setOpenColumn(false);
  };

  const handleColumnFilters = (e) => {
    if (e.target.value != "" || e.target.value != null) {
      const filteredData = taskFields.filter((item) =>
        item.name.toLowerCase().includes(e.target.value)
      );
      setDuplicateColumns(filteredData);
    }
  };

  const handleManageColumn = async (data) => {
    let filters = [...defaultColumn];
    let filteredColumn = defaultColumn.filter((ele) => ele == data.name);
    if (filteredColumn.length > 0) {
      setDefaultColumn(defaultColumn.filter((ele) => ele != data.name));
    } else {
      filters.push(data.name);
      setDefaultColumn(filters);
    }
  };

  const handleSaveManageColumn = async () => {
    if (defaultColumn.length > 2) {
      setManageColumnError(false);
      let selectedFields = [];
      let filteredColumn = defaultColumn.filter(
        (item) => item !== "id" && item !== "unique_id"
      );
      let result = filteredColumn.map((value) => {
        let found = savedFieldData?.data?.filter_fields.find(
          (item) => item.name === value
        );
        if (found) {
          return { id: found.id };
        } else {
          return null;
        }
      });

      result?.length > 0 &&
        result.map((ele) => {
          ele?.id && selectedFields.push(ele.id);
        });

      let postData = {
        name: selectedViewName,
        selected_fields: selectedFields.join(","),
        form_unique_id: savedFieldData?.data?.user_form_listing.unique_id,
        is_default: "1",
      };

      let response = await dispatch(saveCustomViewData(postData));
      if (response?.payload?.status == 200) {
        toast.success(response?.payload?.message);
        setOpenColumn(false);
      }
    } else {
      setManageColumnError(true);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleChangeAction = (event) => {
    setAction(event);
    setAnchorElAction(null);
    if (event == 1) {
      setDeleteConfirmation(true);
    }
  };

  useEffect(() => {
    dispatch(informationTaskMeetingCalls());
    dispatch(setSelectedActvityIds([]));
  }, [dispatch]);

  const toggleDrawerCustomView =
    (isOpen, id = 0) =>
      () => {
        setAnchorEl(null);
        dispatch(setOpenCustomView(isOpen));
        dispatch(setCustomViewId(id));
        dispatch(getSingleCustomViews(id));
      };

  const handleCustomNew = async () => {
    setAnchorEl(null);
    dispatch(setSelectedViewName(`All ${typeName}`));
    dispatch(setOpenCustomView(true));
    await dispatch(setCustomViewId(''));
    // await dispatch(getAllFieldData());
    // await dispatch(getSingleCustomViews(0));
  };

  const toggleDrawerKanbanSetting = (isOpen) => () => {
    setOpenKanbanSetting(isOpen);
  };

  const handleCloseSidebar = () => {
    dispatch(setOpenCustomView(false));
  };

  const mainFiltersFunction = async () => {
    setMainFilters(!mainFilters);
  };

  const openleads = Boolean(anchorEl);
  const openView = Boolean(anchorDataView);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleViewClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorDataView(event.currentTarget);
  };

  const handleViewClose = (data) => {
    dispatch(setShowButtonsAsperDataChecked(false));
    if (data === 1) {
      setViewType("Kanban View");
      setAnchorDataView(null);
      dispatch(setDataViewType(data));
    } else {
      setAnchorDataView(null);
      dispatch(setDataViewType(0));
      dispatch(setSaveLoader(false));
      setViewType("List View");
    }
  };

  const handleCloseAllleads = () => {
    setAnchorEl(null);
  };
  const [anchorElTag, setAnchorElTag] = React.useState<null | HTMLElement>(
    null
  );
  const opentag = Boolean(anchorElTag);
  const handleClickTag = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTag(event.currentTarget);
  };
  const handleCloseTag = () => {
    setAnchorElTag(null);
  };

  const [anchorElAction, setAnchorElAction] =
    React.useState<null | HTMLElement>(null);
  const openaction = Boolean(anchorElAction);
  const handleClickAction = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAction(event.currentTarget);
  };
  const handleCloseAction = () => {
    setAnchorElAction(null);
  };

  const handleChangeCollapse =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const deleteActivity = async () => {
    let response = await dispatch(
      deleteTasks({ id: selectedActvityIds.join(","), type: typeName == 'Tasks' ? "task" : typeName == 'Calls' ? 'calls' : 'meetings' })
    );
    if (response?.payload?.status == 200) {
      toast.success(response?.payload?.message);
      dispatch(informationTaskMeetingCalls());
    }
    setDeleteConfirmation(false);
  };

  const handleAddNewTag = async (id) => {
    setTagType(id);
    setAnchorElTag(null);
    dispatch(setManageTags(true));
  };
  const handleCloseModal = () => {
    setKanbanPop(false);
  };

  const handleClearFilters = () => {
    dispatch(setFilterOthers([]));
    dispatch(setFilterShowOthers([]));
    if (dataViewType == 0) {
      dispatch(informationTaskMeetingCalls());
    } else {
      dispatch(getKanbanList());
    }
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(duplicateColumns);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setDuplicateColumns(items);
  }
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer =
    (anchor: "left", open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === "keydown" &&
          ((event as React.KeyboardEvent).key === "Tab" ||
            (event as React.KeyboardEvent).key === "Shift")
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  const handleCreate = async (e) => {
    if (typeName == "Tasks") {
      dispatch(setTaskPopUp(true));
    } else if (typeName == "Meetings") {
      dispatch(setMeetingPopUp(true));
    } else {
      dispatch(setCallsPopUp(true));
    }
  };

  const list = (anchor: "left") => (
    <SMDrawerFilter
      sx={SDCheckboxStyle}
      role="presentation"
      onClick={toggleDrawer("left", false)}
      onKeyDown={toggleDrawer("left", false)}
    >
      <List>
        <div className="filtershowmob">
          <FiltersColumnOtherModules />
        </div>
      </List>
      <Divider />
    </SMDrawerFilter>
  );

  const openTagPopOver = Boolean(anchorElTag);
  const idTagPopOver = openTagPopOver ? "simple-popover" : undefined;
  return (
    <>
      <Box>
        <KanbanPopUp
          open={kanbanPopUp}
          data={createKanbanStatus}
          handleClose={() => handleCloseModal()}
          //  onClickAction={() => router.push("/plancards")}
          loading={false}
        />
        <div>
          {deleteConfirmation && (
            <DeleteDialog
              open={deleteConfirmation}
              handleClose={setDeleteConfirmation}
              text={typeName}
              onClickAction={deleteActivity}
            />
          )}

          {open && <CreateForm open={true} setFormStatus={handleClose} />}
        </div>
        {taskMeetingCalls?.data?.data?.length == 0 &&
          !dataLoader &&
          filterOthers == 0 ? (
          <LeadNoContent>
            <Box>
              <PageHeading>Take your {typeName?.toLowerCase()}</PageHeading>
              <PageDescription>
                Start by adding your first {typeName?.toLowerCase()} find <br />
                new business opportunities for you
              </PageDescription>
              <NoImage
                src={
                  typeName == "Tasks"
                    ? "/assets/images/crm/task-image.svg"
                    : typeName == "Meetings"
                      ? "/assets/images/crm/no-meeting-image.svg"
                      : typeName == "Calls"
                        ? "/assets/images/crm/no-call-image.svg"
                        : "/assets/images/crm/no_deal.svg"
                }
                alt="Edit"
                width={400}
                height={300}
              />
              <BottomTxt>
                <PageHeading>No {typeName?.toLowerCase()} added</PageHeading>
                <PageDescription>
                  Create new {typeName?.toLowerCase()} manually or import your
                  existing
                  <br /> {typeName?.toLowerCase()} from a spreadsheet
                </PageDescription>
                <BtnFilledLeads
                  onClick={(e) => {
                    handleCreate(e);
                  }}
                >
                  Add New {typeName}
                </BtnFilledLeads>
              </BottomTxt>
            </Box>
          </LeadNoContent>
        ) : (
          <LeadsDataContainer>
            {selectedActvityIds?.length == 0 && (
              <>
                <FilterRowContainer>
                  <FilterRowContainerLeft>
                    <OutLinedButton
                      className="filterdesktop"
                      variant="outlined"
                      startIcon={<FilterAltOutlinedIcon />}
                      onClick={() => {
                        mainFiltersFunction();
                      }}
                      sx={mainFilters && ActiveBtn}
                    >
                      Filter
                    </OutLinedButton>
                    <OutLinedButton
                      className="filtermobile"
                      variant="outlined"
                      startIcon={<FilterAltOutlinedIcon />}
                      onClick={toggleDrawer("left", true)}
                      sx={mainFilters && ActiveBtn}
                    >
                      Filter
                    </OutLinedButton>

                    <SelectEditOption>
                      <div>
                        <AllLadsBtn
                          id="demo-customized-button"
                          aria-controls={
                            open ? "demo-customized-menu" : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          variant="contained"
                          disableElevation
                          onClick={() => {
                            dispatch(setCustomFilterId([]));
                            dispatch(informationTaskMeetingCalls());
                          }}
                        //  endIcon={<KeyboardArrowDownIcon />}
                        >
                          {selectedViewName}
                        </AllLadsBtn>
                      </div>
                    </SelectEditOption>
                  </FilterRowContainerLeft>
                  <FilterRowContainerLeft className="kanbanbuttons">
                    <OutLinedButton
                      className="Viewchange"
                      startIcon={
                        viewType == "List View" ? (
                          <i className="icon-listView"></i>
                        ) : (
                          <i className="icon-kanban_view"></i>
                        )
                      }
                      id="basic-button"
                      aria-controls={openView ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openView ? "true" : undefined}
                      onClick={handleViewClick}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      {/* {viewType}-- */}
                    </OutLinedButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorDataView}
                      open={openView}
                      onClose={() => setAnchorDataView(null)}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                      sx={ViewTypeChange}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          // mt: 1.6,
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
                            right: "45%",
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{
                        horizontal: "center",
                        vertical: "top",
                      }}
                      anchorOrigin={{
                        horizontal: "center",
                        vertical: "bottom",
                      }}
                    >
                      <MenuItem onClick={() => handleViewClose(0)}>
                        <ListItemIcon>
                          <i
                            className="icon-listView"
                            style={{ fontSize: "9px" }}
                          ></i>
                        </ListItemIcon>
                        List View
                      </MenuItem>
                      <Divider style={{ margin: 0 }} />
                      {subAccount !== "subuser" && (
                        <MenuItem onClick={() => handleViewClose(1)}>
                          <ListItemIcon>
                            <i className="icon-kanban_view"></i>
                          </ListItemIcon>
                          Kanban View
                        </MenuItem>
                      )}
                    </Menu>
                    {/* </div> */}
                    <OutLinedButton
                      variant="outlined"
                      startIcon={<i className="icon-leadsblack leadsgrey"></i>}
                      onClick={async (e) => {
                        handleCreate(e);
                      }}
                    >
                      Create {typeName}
                    </OutLinedButton>

                    {/* <ListTopBarFilter>
                      {selectedViewName != `All ${typeName}` ||
                        ((typeName == "Tasks" ||
                          typeName == "Meetings" ||
                          typeName == "Calls") && (
                          <Tooltip title="Manage Columns" arrow>
                            <IconButton
                              aria-label="Manage Columns"
                              onClick={handleClickOpenColumn}
                            >
                              <TuneIcon />
                            </IconButton>
                          </Tooltip>
                        ))}
                    </ListTopBarFilter> */}
                  </FilterRowContainerLeft>
                </FilterRowContainer>
              </>
            )}

            <ActionButtonContainer>
              <ButtonManageColmnBox>
                {selectedActvityIds?.length > 0 ? (
                  <>
                    <div>
                      <ActionFieldStyle>
                        <div>
                          <OutLinedButton
                            id="demo-customized-button"
                            aria-controls={
                              open ? "demo-customized-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            variant="contained"
                            value={tags}
                            onChange={handleTagsChange}
                            disableElevation
                            onClick={handleClickTag}
                            endIcon={<KeyboardArrowDownIcon />}
                          >
                            Tags
                          </OutLinedButton>

                          <TagStylePopover
                            id={idTagPopOver}
                            open={openTagPopOver}
                            anchorEl={anchorElTag}
                            onClose={() => {
                              setAnchorElTag(null);
                            }}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                          >
                            <TagInnerDiv>
                              <TagsInputOther type={0} sendData={[]} />
                            </TagInnerDiv>
                          </TagStylePopover>
                        </div>
                      </ActionFieldStyle>

                      {/* <ActionFieldStyle>
                        <OutLinedButton
                          variant="outlined"
                          startIcon={<CachedOutlinedIcon />}
                          onClick={(e) => handleChangeAction(2)}
                        >
                          Mass Update
                        </OutLinedButton>
                      </ActionFieldStyle> */}
                      <ActionFieldStyle>
                        <OutLinedButton
                          variant="outlined"
                          startIcon={<DeleteOutlinedIcon />}
                          onClick={(e) => handleChangeAction(1)}
                        >
                          Delete
                        </OutLinedButton>
                      </ActionFieldStyle>
                    </div>
                  </>
                ) : null}
              </ButtonManageColmnBox>
            </ActionButtonContainer>

            <LeadListData>
              {filterOthers?.length > 0 && (
                <ListRecords>
                  <FilterByColumn>
                    {filterOthers?.length > 0 && (
                      <Typography className="Totalrecordtxt">
                        {" "}
                        Filter By{" "}
                      </Typography>
                    )}
                    <FilterRecordList>
                      {filterOthers?.length > 0 &&
                        filterOthers.map((ele, index) => {
                          return (
                            <TotalRecordsFilter>
                              {ele.name == "task_date"
                                ? "Due Date"
                                : ele.name.replaceAll("_", " ")}
                            </TotalRecordsFilter>
                          );
                        })}
                      {filterOthers?.length > 0 && (
                        <FilterAction>
                          <FilterActionButton
                            variant="outlined"
                            onClick={() => {
                              dispatch(setCurrentFilterId([]));
                              dispatch(setFilterPopUp(true));
                            }}
                          >
                            Save Filter
                          </FilterActionButton>
                          <FilterActionButton
                            variant="outlined"
                            onClick={() => {
                              handleClearFilters();
                            }}
                          >
                            Clear Filter
                          </FilterActionButton>
                        </FilterAction>
                      )}
                    </FilterRecordList>
                  </FilterByColumn>
                </ListRecords>
              )}

              <Grid
                container
                spacing={1.5}
                style={{
                  display: "flex",
                  alignItems: "stretch",
                  minHeight: "400px",
                  height:"78vh"
                }}
              >
                {!mainFilters && (
                  <Grid item xs={12} sm={12} md={3} xl={2.2} style={{height:"100%",}}>
                    <div className="filterdesktop">
                      <FiltersColumnOtherModules />
                    </div>
                  </Grid>
                )}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={!mainFilters ? 9 : 12}
                  xl={!mainFilters ? 9.8 : 12}
                >
                  {dataViewType == 0 ? <ListViewOther /> : <KanbanViewOther data={taskMeetingCalls} />}
                </Grid>
              </Grid>
            </LeadListData>
          </LeadsDataContainer>
        )}

        <div>
          <React.Fragment key={"view12"}>
            <StyledSwipeableDrawer
              anchor="right"
              open={openCustomView}
              onClose={toggleDrawerCustomView} // You can remove this line
              onOpen={toggleDrawerCustomView(true)}
            // variant="persistent"
            >
              <OtherRightDrawer callCloseCustomView={handleCloseSidebar} />
            </StyledSwipeableDrawer>
          </React.Fragment>
          <React.Fragment key={"setting32"}>
            <StyledSwipeableDrawer
              anchor={"right"}
              open={openKanbanSetting}
              onClose={toggleDrawerKanbanSetting}
              onOpen={toggleDrawerKanbanSetting(true)}
            >
              <KanbanSettingView />
            </StyledSwipeableDrawer>
          </React.Fragment>
        </div>

        {/* /***** Manage Column Popup ***** */}
        <div>
          <StyledBootstrapDialog
            onClose={handleCloseColumn}
            aria-labelledby="customized-dialog-title"
            open={opencolumn}
            sx={ManagaDeleteDialog}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleCloseColumn}
            >
              Manage Columns
            </BootstrapDialogTitle>
            <ManageColumnContainer>
              <CusTomSearchBox>
                <SearchCommon>
                  <TextField
                    fullWidth
                    id="standard-bare"
                    variant="outlined"
                    placeholder="Search"
                    InputProps={{
                      endAdornment: (
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      ),
                    }}
                    onChange={(e) => handleColumnFilters(e)}
                  />
                </SearchCommon>
              </CusTomSearchBox>
            </ManageColumnContainer>

            <DialogContent dividers>
              <ManageColumnList>
                {manageColumnError && (
                  <ManageColumnContainerError>
                    Please select at least one value from the list
                  </ManageColumnContainerError>
                )}
                <FormGroup>
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="characters">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {duplicateColumns.map((filters, filtersIndex) => {
                            return (
                              <Draggable
                                key={filters.id}
                                draggableId={filters.id.toString()}
                                index={filtersIndex}
                              >
                                {(provided) => (
                                  <FormControlLabel
                                    key={filtersIndex}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    sx={{ display: "flex" }}
                                    control={
                                      <Checkbox
                                        checked={
                                          defaultColumn.includes(filters.name)
                                            ? true
                                            : false
                                        }
                                        onClick={() =>
                                          handleManageColumn(filters)
                                        }
                                      />
                                    }
                                    label={
                                      filters.name == "mail"
                                        ? "Email"
                                        : filters.name
                                          .replaceAll("_", " ")
                                          .replaceAll(".", "")
                                    }
                                  />
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </FormGroup>
              </ManageColumnList>
            </DialogContent>
            <DialogActions>
              <SmallRedOutineBtn
                variant="outlined"
                autoFocus
                onClick={handleSaveManageColumn}
              >
                {saveLoader ? (
                  <ThreeDots
                    height="40"
                    width="40"
                    radius="9"
                    color="#D7282F"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                ) : (
                  "Save"
                )}
              </SmallRedOutineBtn>
              <SmallBlackOutineBtn variant="outlined" onClick={handleCloseColumn}>
                Cancel
              </SmallBlackOutineBtn>
            </DialogActions>
          </StyledBootstrapDialog>

          {action == 2 && (
            <ManageMassOther openPopUp={true} setAction={setAction} />
          )}
          {filterPopUp && <SaveFilterOther openPopUp={true} />}
          {taskPopUp && <TaskPopUp openPopUp={true} />}
          {meetingPopUp && <MeetingPopup openPopUp={true} />}
          {callsPopUp && <CallPopup openPopUp={true} />}
          {composeEmailPopUp && <ComposeEmailPopUp openPopUp={true} />}
          {manageTags && <ManageTags openPopUp={true} type={tagType} />}
          {action == 3 && (
            <MassConvert openPopUp={true} setAction={setAction} />
          )}
        </div>

        <React.Fragment key={"left"}>
          <SwipeableDrawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {list("left")}
          </SwipeableDrawer>
        </React.Fragment>
      </Box>
    </>
  );
};
export default OtherModuels;
