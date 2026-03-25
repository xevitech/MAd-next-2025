import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  List,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
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
  StyledTextarea,
  StyledLabel,
  TypographyHeading,
  ActiveBtn,
  SelectEditOption,
  StackCreatList,
  CreatListHeading,
  LeadAccordion,
  DropDownSearch,
  NewCustomView,
  AllLadsBtn,
  StyledSwipeableDrawer,
  NoContentButton,
  CusTomSearchBox,
  ListTopBarFilter,
  ManageColumnContainer,
  ManagaDeleteDialog,
  ManageColumnList,
  CreatViewType,
  ManageColumnContainerError,
  TotalRecords,
  TotalRecordsFilter,
  ListRecords,
  FilterByColumn,
  FilterRecordList,
  FilterAction,
  FavoriteInnerData,
  ViewTypeChange,
  SMDrawerFilter,
  TagInnerDiv,
  TagStylePopover,
  ButtonManageColmnBox,
  LeadListAutocomplate,
  TaskAvatarContainer,
  TaskAvatarLabel,
  CommonAvatarContainer,
  CommonAvatarLabel,
  ManageColumnButton,
} from "../style";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import { LicenseInfo } from "@mui/x-license-pro";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Link from "@mui/material/Link";
import { alpha } from "@mui/material/styles";
import {
  BtnFilledLeads,
  SearchCommon,
  SmallOutineBtn,
  StyledBootstrapDialog,
  FilterActionButton,
  SDCheckboxStyle,
  SmallRedOutineBtn,
  SmallBlackOutineBtn,
  CommonCustomScrollbar,
  SkeletonBox,
  SideBox,
  MainBox,
  SecondSkeletonBox,
  CreatedLeades,
  Allleads,
} from "../commonStyle";
import Menu, { MenuProps } from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import KanbanView from "../View/KanbanView";
import ListView from "../View/ListView";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);
import {
  fetchAllFields,
  getAllFieldData,
  getAllSavedViews,
  setCustomViewId,
  setSelectedViewName,
  setSaveLoader,
  getSingleCustomViews,
  setOpenCustomView,
  saveCustomViewData,
  setFilters,
  setShowFilters,
  setCustomFilterId,
  setCurrentFilterId,
  setFilterPopUp,
  setTaskPopUp,
  setComposeEmailPopUp,
  setManageTags,
  deleteLeadSavedData,
  getListOfUsersAndSubUsers,
  getAllListOfTags,
  setDraftData,
  getKanbanList,
  setDataViewType,
  setCurrentCustomView,
  setShowButtonsAsperDataChecked,
  setTypeId,
  setMeetingPopUp,
  setCallsPopUp,
  getAllType,
  setKanbanStatus,
  setMassCovrtPop,
  setOpenCreateFrom,
} from "@/hooks/UseCreateFormData";
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import _debounce from "lodash/debounce";
import { toast } from "react-toastify";
import RightDrawer from "./RightDrawer";
import KanbanSettingView from "./KanbanSettingView";
import FiltersColumn from "./FiltersColumn";
import ManageMass from "./ManageMass";
import SaveFilter from "./SaveFilter";
import TaskPopUp from "./TaskPopUp";
import ComposeEmailPopUp from "./ComposeEmailPopUp";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import ManageTags from "./ManageTags";
import MassConvert from "./MassConvert";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import KanbanPopUp from "../PageLayout/common/kanbanPopUp";
import ListItemIcon from "@mui/material/ListItemIcon";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Image from "next/image";
import CreateForm from "./CreateForm";
import TagsInput from "./TagsInput";
import LeadOwner from "../PageLayout/common/LeadOwner";
import { apiClient } from "@/components/common/common";
import Avatar from "@mui/material/Avatar";
import { stubTrue } from "lodash";
import MeetingPopup from "./MeetingPopup";
import CallPopup from "./CallPopup";
import EditIcon from "@mui/icons-material/Edit";
import { DownArrowIconn, StyledMenu3 } from "../View/style";
import Check from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import KanbanViewDeal from "../View/KanbanViewDeal";
import MainSkeleton from "../Skeletons/MainSkeleton";
import LeadIndexSkeleton from "../Skeletons/LeadIndexSkeleton";
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "10px",
    minWidth: 70,
    border: "1px solid #D2D2D2",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
    margin: "8px",
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],

    "& .MuiMenuItem-root": {
      padding: "6px",
      fontSize: "12px",
      color: "#333333",
    },
  },
}));

const StyledMenu2 = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    // minWidth: "280",
    minWidth: "280",
    minHeight: 70,
    maxWidth: "280px",
    maxHeight: 300,
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#dedede",
      borderRadius: "4px",
    },
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
  },
}));

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: "none",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
}));
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const ManageColumnStyleMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    maxWidth: 280,
    padding: "10px 0 0 0",

    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "0",
    },
    "& .MuiTypography-root": {
      fontSize: "13px",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ".MuiCheckbox-root": {
      "& .MuiSvgIcon-root": {
        display: "none",
      },
      "&:before": {
        content: '" "',
        display: "block",
        // width: "1rem",
        // height: "1rem",
        width: "14px",
        height: "14px",
        border: "1px solid #d2d2d2",
        borderRadius: "4px",
        padding: 0,
      },
      "&:after": {
        content: '" "',
        display: "inline-block",
        transform: "rotate(45deg)",
        width: "4px",
        height: "8px",
        borderBottom: "1px solid #D7282F",
        borderRight: "1px solid #D7282F",
        position: "absolute",
        top: "7px",
        opacity: "0",
      },
      "&:hover": {
        "&:before": {
          borderColor: "#b1b0b0",
        },
      },
      "&.Mui-checked": {
        "&:after": {
          opacity: "1",
        },
        "&:before": {
          borderColor: "#D7282F",
        },
      },
      "&.MuiCheckbox-root": {
        padding: "5px 10px",
      },
    },
    ".MuiButtonBase-root": {
      padding: "5px 10px 5px 15px !important",
    },
  },
}));

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

type Anchor = "right";
const Leads = () => {
  const { userName, userType, parent_user } = useSelector(
    (state: any) => state.userData
  );
  const subAccount = localStorage.getItem("subAccount");
  const [open, setOpen] = useState(false);
  const [kanbanPopUp, setKanbanPop] = useState(false);
  const [manageColumnError, setManageColumnError] = useState(false);
  const [mainFilters, setMainFilters] = useState(false);
  const [tags, setTags] = useState("Tags");
  const [action, setAction] = useState<any>();
  const [assign, setAssign] = useState<any>();
  const [customStateSetting, setCustomStateSetting] = useState({
    right: false,
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorDataView, setAnchorDataView] =
    React.useState<null | HTMLElement>(null);
  const [expanded, setExpanded] = useState<string | false>("panel1");
  // const [dataViewType, setDataViewType] = React.useState(0);
  const [checkData, setCheckData] = useState(false);
  const [checkBoxData, setCheckBoxData] = useState([]);
  const [openKanbanSetting, setOpenKanbanSetting] = useState(false);
  const [opencolumn, setOpenColumn] = React.useState(false);
  const [defaultColumn, setDefaultColumn] = useState([]);
  const [duplicateColumns, setDuplicateColumns] = useState([]);
  const [favouriteView, setFavouriteView] = useState([]);
  const [myViews, setMyViews] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [viewType, setViewType] = useState("List View");
  const [tagType, setTagType] = useState(0);
  const [defaultUser, setDefaultUser] = useState([]);
  const [leadView, setLeadView] = useState<string>();

  const {
    user_info,
    userprofileImage,
    profileInfos,
    userEmail,
    mobileverified,
    emailVerified,
    default_role,
    subSellerList,
  } = useSelector((state: any) => state.userData);
  const permissions = subSellerList[0];

  const [toHandleSideEffects, setToHandleSideEffects] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {
    dataViewType,
    kanbanLists,
    formList,
    loader,
    createKanbanStatus,
    saveLoader,
    mainPageLoader,
    formData,
    savedFieldData,
    savedViews,
    savedViewLoader,
    showButtonsAsperDataChecked,
    selectedViewName,
    customViewId,
    customFilterId,
    openCustomView,
    filters,
    currentFilterId,
    filterPopUp,
    taskPopUp,
    meetingPopUp,
    callsPopUp,
    composeEmailPopUp,
    manageTags,
    selectedDataEmails,
    userLists,
    savedFiltersData,
    typeName,
    typeId,
    massConvertPopUp,
    openCreateFrom,
  } = useSelector((state: any) => state.formList);

  useEffect(() => {
    savedFieldData?.data?.data?.length > 0 && setCheckData(true);
    const checkedFields = formList?.data?.form_data?.flatMap((ele: any) => {
      return ele?.form_fields?.filter(
        (item) => item.section_id == ele?.id && item.field_type == "checkbox"
      );
    });
    setCheckBoxData(checkedFields);
  }, [savedFieldData, formList]);



  // useEffect(() => {
  //   dispatch(getKanbanList());
  // }, []);

  const handleClickOpenColumn = () => {
    setOpenColumn(true);
    // setDefaultColumn(Object.keys(savedFieldData?.data?.data?.[0]));
    setDefaultColumn(
      savedFieldData?.data?.form_fields_data?.map((ele) => {
        return ele.name;
      })
    );
    setDuplicateColumns(savedFieldData?.data?.filter_fields);
  };

  const handleCloseColumn = () => {
    setOpenColumn(false);
    setAnchorElMC(null);
  };

  const handleColumnFilters = (e) => {
    if (e.target.value != "" || e.target.value != null) {
      const filteredData = savedFieldData?.data?.filter_fields.filter((item) =>
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
    if (defaultColumn.length >= 1) {
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
        // name: selectedViewName,
        name: selectedView?.name ? selectedView?.name : selectedViewName,
        selected_fields: selectedFields.join(","),
        form_unique_id: savedFieldData?.data?.user_form_listing.unique_id,
        is_default: "1",
      };

      let response = await dispatch(saveCustomViewData(postData));
      if (response?.payload?.status == 200) {
        toast.success(response?.payload?.message);
        setOpenColumn(false);
        setAnchorElMC(null);
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
    dispatch(setOpenCreateFrom(false));
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
    } else if (event == 4) {
      dispatch(setComposeEmailPopUp(true));
    } else if (event == 5) {
      setTagType(event);
      dispatch(setManageTags(true));
    }
  };

  useEffect(() => {
    dispatch(getAllFieldData());
    dispatch(getAllSavedViews());
    dispatch(getListOfUsersAndSubUsers());
    dispatch(getAllType());
    // dispatch(getKanbanList());
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
    localStorage.removeItem("view");
    localStorage.removeItem("kanbanViewFields");
    localStorage.removeItem("localViewType");
    dispatch(setSelectedViewName(`All ${typeName}`));
    dispatch(setOpenCustomView(true));
    await dispatch(setCustomViewId(""));
    await dispatch(getAllFieldData());
    await dispatch(getSingleCustomViews(""));
  };

  const toggleDrawerKanbanSetting = (isOpen) => () => {
    setOpenKanbanSetting(isOpen);
  };

  const handleCloseSidebar = () => {
    dispatch(setOpenCustomView(false));
  };
  const leadToggleDrawerSetting =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === "keydown" &&
          ((event as React.KeyboardEvent).key === "Tab" ||
            (event as React.KeyboardEvent).key === "Shift")
        ) {
          return;
        }

        setCustomStateSetting({ ...customStateSetting, [anchor]: open });
        handleCloseAllleads();
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
      if (
        createKanbanStatus?.kanban_view_name === "" ||
        createKanbanStatus?.kanban_view_name === null
      ) {
        setKanbanPop(true);
        setAnchorDataView(null);
      } else {
        setAnchorDataView(null);
        dispatch(setDataViewType(data));
      }
    } else {
      setAnchorDataView(null);
      dispatch(setDataViewType(0));
      dispatch(setSaveLoader(false));
      setViewType("List View");
      localStorage.setItem("localViewType", "List View");
    }
    // data === 1 ? setViewType('Kanban View') : setViewType('List View')
  };
  const handleViewKanabn: any = async (view) => {
    const fixedFileds = [];
    const filteredList = savedFieldData?.data?.filter_fields.filter(
      (item) => item.name !== "Lead_Owner"
    );
    filteredList?.forEach((item, index) => {
      if (
        item.name == "First_Name" ||
        item.name === "Last_Name" ||
        item.name === "Account" ||
        item.name === "mail" ||
        item.name == "tag" ||
        item?.name == "Country" ||
        item?.name == "Annual_Revenue"
      ) {
        fixedFileds.push(item.id);
      }
    });

    let body: any = localStorage.getItem("kanbanViewFields")
      ? JSON.parse(localStorage.getItem("kanbanViewFields"))
      : {
        crm_user_form_unique_id:
          savedFieldData?.data?.user_form_listing?.unique_id,
        type_id: typeId,
        kanban_view_name: "leads ghgh",
        kanbon_category_by: savedFieldData?.data?.filter_fields?.find(
          (item) => item.name == "Lead_status"
        )?.id,
        kanbon_header_style: "Multi Color",
        kanban_aggergate: savedFieldData?.data?.filter_fields?.find(
          (item) => item?.name == "Annual_Revenue"
        )?.id,
        kanbon_selected_fields: fixedFileds.join(","),
      };

    localStorage.setItem("kanbanViewFields", JSON.stringify(body));

    let response = await apiClient(`crm/store_kanbon_view`, "post", {
      body,
    });
    if (response.status == true || response.status == 200) {
      dispatch(setSaveLoader(false));
      dispatch(setKanbanStatus(""));
      dispatch(getAllFieldData());
      dispatch(getKanbanList());
      dispatch(setDataViewType(1));
      dispatch(setDataViewType(view));
      setAnchorDataView(null);
    }
  };

  useEffect(() => {
    if (
      localStorage?.getItem("localViewType") === "Kanban View" &&
      typeId == 1
    ) {
      handleViewKanabn(1);
    } else {
      localStorage.removeItem("kanbanViewFields");
      handleViewClose(0);
    }
  }, [viewType]);

  const handleCloseAllleads = () => {
    setAnchorEl(null);
  };
  const [anchorElTag, setAnchorElTag] = React.useState<null | HTMLElement>(
    null
  );

  const handleClickTag = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTag(event.currentTarget);
  };

  useEffect(() => {
    setAnchorElTag(null);
  }, [toHandleSideEffects, mainPageLoader]);

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

  const [anchorElAssign, setAnchorElAssign] =
    React.useState<null | HTMLElement>(null);
  const openassign = Boolean(anchorElAssign);
  const handleClickAssign = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAssign(event.currentTarget);
  };
  const handleCloseAssign = () => {
    setAnchorElAssign(null);
  };

  const handleChangeAssign = async (event) => {
    setAssign(event?.email);
    setAnchorElAssign(null);
    const body = {
      crm_user_form_unique_id: selectedDataEmails?.[0]?.crm_user_form_unique_id,
      type_id: typeId,
      unique_id:
        selectedDataEmails?.length > 0 &&
        selectedDataEmails?.map((ele) => ele.unique_id)?.join(","),
      section_form_id: savedFieldData?.data?.form_fields_data?.filter(
        (ele) => ele?.name == "Lead_Owner"
      )?.[0]?.id,
      value: event?.email,
    };
    let response = await apiClient("crm/assign_lead", "post", {
      body: body,
    });
    if (response.status === true || response.status == 200) {
      await dispatch(getAllFieldData());
    }
  };

  const handleChangeCollapse =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  useEffect(() => {
    setFavouriteView(savedViews.filter((fill) => fill.is_favourite == 1));
    setMyViews(savedViews.filter((fill) => fill.is_favourite != 1));
  }, [savedViews]);

  const fetchViewData = async (id, name) => {
    localStorage.setItem("view", id);
    dispatch(setCustomFilterId([]));
    setFavouriteView(savedViews.filter((fill) => fill.is_favourite == 1));
    setMyViews(savedViews.filter((fill) => fill.is_favourite != 1));
    dispatch(setSaveLoader(true));
    dispatch(setSelectedViewName(name));
    dispatch(setCustomViewId(id));
    dispatch(getAllFieldData());
    dispatch(setShowFilters([]));
    dispatch(setFilters([]));
    setAnchorEl(null);
    if (dataViewType === 1) {
      dispatch(getKanbanList())
    }

  };


  const handleFavourite = async (data) => {
    dispatch(setCustomViewId(data?.id));
    let postData = {
      name: data?.name,
      is_favourite: data?.is_favourite == "1" ? "0" : "1",
      form_unique_id: savedFieldData?.data?.user_form_listing.unique_id,
      id: data?.id,
    };
    let response = await dispatch(saveCustomViewData(postData));
    if (response?.payload?.status == 200) {
      dispatch(setOpenCustomView(false));
      toast.success(response?.payload?.message);
    }
  };

  const handleCustomViewFilters = async (event) => {
    let duplcateSavedViews = savedViews;
    let filteredData = duplcateSavedViews.filter((item) =>
      item.name.toLowerCase().includes(event.target.value)
    );
    setFavouriteView(filteredData.filter((fill) => fill.is_favourite == 1));
    setMyViews(filteredData.filter((fill) => fill.is_favourite != 1));
  };

  const handleActivitPopUp = (type) => {
    if (type == 2) {
      dispatch(setTaskPopUp(true));
    } else {
      dispatch(setComposeEmailPopUp(true));
    }
  };

  const deleteLeads = async () => {
    let body = {
      unique_id: selectedDataEmails?.map((ele) => ele?.id)?.join(","),
      crm_user_form_unique_id: selectedDataEmails?.[0]?.crm_user_form_unique_id,
    };
    let response = await dispatch(deleteLeadSavedData(body));
    if (response?.payload?.status == 200) {
      toast.success(response?.payload?.message);
      dispatch(getAllFieldData());
      dispatch(getKanbanList());
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
    dispatch(setFilters([]));
    dispatch(setShowFilters([]));
    if (dataViewType == 0) {
      dispatch(getAllFieldData());
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
    dispatch(setOpenCreateFrom(true));
    await dispatch(fetchAllFields());
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
          <FiltersColumn />
        </div>
      </List>
      <Divider />
    </SMDrawerFilter>
  );

  const openTagPopOver = Boolean(anchorElTag);
  const idTagPopOver = openTagPopOver ? "simple-popover" : undefined;
  const [anchorElPipeline, setAnchorElPipeline] =
    React.useState<null | HTMLElement>(null);
  const openPipeline = Boolean(anchorElPipeline);
  const handleClickPipeline = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElPipeline(event.currentTarget);
  };
  const handleClosePipeline = () => {
    setAnchorElPipeline(null);
  };

  const selectedView = savedViews.find((view) => view.id == selectedViewName);

  /*** Start Manage Column ***/
  const [anchorElMC, setAnchorElMC] = React.useState<null | HTMLElement>(null);
  const openmc = Boolean(anchorElMC);
  const handleClickMC = (event: React.MouseEvent<HTMLElement>) => {
    setDefaultColumn(
      savedFieldData?.data?.form_fields_data?.map((ele) => {
        return ele.name;
      })
    );
    setDuplicateColumns(savedFieldData?.data?.filter_fields);
    setAnchorElMC(event.currentTarget);
  };
  const handleCloseMC = () => {
    setAnchorElMC(null);
  };
  /*** End Manage Column ***/

  useEffect(() => {
    if (typeId == 1 || typeId == 2) {
      dispatch(setCustomViewId(selectedView?.id));
    } else {
      localStorage.removeItem("view");
    }

    if (selectedView) {
      setLeadView(selectedView?.name);
    } else {
      setLeadView("All " + typeName);
    }
  }, [savedViews, selectedView]);


  ///////////////////// Add skeletion untill list data load
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      setIsLoading(true);
      // Replace this with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {" "}
      {/* { */}
      {/* // mainPageLoader ? (
      //   <Box sx={{ padding: "12px" }}>
      //     <MainSkeleton />
      //   </Box>
      // ) : ( */}
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
              onClickAction={deleteLeads}
            />
          )}

          {/* {openCreateFrom && (
              <CreateForm
                open={true}
                setFormStatus={() => {
                  setOpen(false);
                  dispatch(setOpenCreateFrom(false));
                }}
              />
            )} */}
        </div>
        {savedFieldData?.data?.data?.length == 0 &&
          (customViewId == "" ||
            customViewId == 0 ||
            customViewId == undefined) &&
          (customFilterId == 0 ||
            customFilterId == "" ||
            customFilterId == undefined) &&
          (filters == 0 || filters == "" || filters == undefined) ? (
          <LeadNoContent>
            <Box>
              <PageHeading>
                Take your {typeName?.toLowerCase()} to the next level
              </PageHeading>
              <PageDescription>
                Start by adding your first {typeName?.toLowerCase()} find <br />
                new business opportunities for you
              </PageDescription>
              <NoImage
                src={
                  typeName == "Leads"
                    ? "/assets/images/crm/no_lead_new.svg"
                    : typeName == "Contacts"
                      ? "/assets/images/crm/no_contact_image.svg"
                      : typeName == "Accounts"
                        ? "/assets/images/crm/no_company.svg"
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
            {!showButtonsAsperDataChecked && (
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
                        {dataViewType == 0 && <AllLadsBtn
                          id="demo-customized-button"
                          aria-controls={
                            open ? "demo-customized-menu" : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          variant="contained"
                          disableElevation
                          onClick={handleClick}
                          endIcon={<KeyboardArrowDownIcon />}
                        >
                          {selectedView
                            ? selectedView?.name
                            : "All " + typeName}
                        </AllLadsBtn>}
                        <StyledMenu
                          id="demo-customized-menu"
                          MenuListProps={{
                            "aria-labelledby": "demo-customized-button",
                          }}
                          anchorEl={anchorEl}
                          open={openleads}
                          onClose={handleCloseAllleads}
                          PaperProps={{
                            elevation: 0,
                            sx: {
                              overflow: "visible",
                              width: "290px",
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
                                left: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                borderTop: "1px solid #D2D2D2",
                                borderLeft: "1px solid #D2D2D2",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                              },
                            },
                          }}
                        >
                          <DropDownSearch>
                            <SearchCommon>
                              <TextField
                                fullWidth
                                id="standard-bare"
                                variant="outlined"
                                placeholder="Search..."
                                onChange={(e) => handleCustomViewFilters(e)}
                                InputProps={{
                                  endAdornment: (
                                    <IconButton>
                                      <SearchIcon />
                                    </IconButton>
                                  ),
                                }}
                              />
                            </SearchCommon>
                          </DropDownSearch>
                          {favouriteView?.length > 0 && (
                            <StackCreatList>
                              <CreatListHeading>
                                <Typography>Favorites </Typography>
                              </CreatListHeading>
                              <FavoriteInnerData>
                                {favouriteView.map((views, index) => (
                                  <CreatViewType>
                                    <StarIcon
                                      style={{ color: "#d7282f" }}
                                      onClick={() => handleFavourite(views)}
                                    />
                                    <MenuItem
                                      //disableRipple
                                      key={index}
                                      onClick={() => {
                                        fetchViewData(views.id, views.name);
                                      }}
                                    >
                                      {views.name}
                                    </MenuItem>
                                  </CreatViewType>
                                ))}
                              </FavoriteInnerData>
                            </StackCreatList>
                          )}

                          <LeadAccordion>
                            {myViews?.length > 0 && (
                              <Accordion
                                expanded={expanded == "panel1"}
                                onChange={handleChangeCollapse("panel1")}
                              >
                                <AccordionSummary
                                  aria-controls="panel1d-content"
                                  id="panel1d-header"
                                >
                                  <Typography>Created By Me</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <FavoriteInnerData>
                                    {myViews.map((views, index) => (
                                      <CreatViewType>
                                        <StarIcon
                                          style={{ color: "#ccc" }}
                                          onClick={() => handleFavourite(views)}
                                        />
                                        <MenuItem
                                          //disableRipple
                                          key={index}
                                          onClick={() => {
                                            fetchViewData(views.id, views.name);
                                          }}
                                        >
                                          {views.name}
                                        </MenuItem>
                                      </CreatViewType>
                                    ))}
                                  </FavoriteInnerData>
                                </AccordionDetails>
                              </Accordion>
                            )}

                            <Accordion
                              expanded={expanded === "panel2"}
                              onChange={handleChangeCollapse("panel2")}
                            >
                              <AccordionSummary
                                aria-controls="panel2d-content"
                                id="panel2d-header"
                              >
                                <Typography>Public View</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <FavoriteInnerData>
                                  <MenuItem
                                    className="fromleft"
                                    //disableRipple
                                    key={Math.random().toString(16).slice(2)}
                                    onClick={() =>
                                      fetchViewData(0, `All ${typeName}`)
                                    }
                                  >
                                    {/* <StarIcon style={{ color: '#ccc' }} /> */}
                                    All {typeName}
                                  </MenuItem>
                                </FavoriteInnerData>
                              </AccordionDetails>
                            </Accordion>

                            <Divider />
                            <Link underline="none">
                              <NewCustomView onClick={handleCustomNew}>
                                New Custom View
                              </NewCustomView>
                            </Link>
                          </LeadAccordion>
                        </StyledMenu>
                      </div>
                      {customViewId ? (
                        <img
                          height={12}
                          width={12}
                          src={"/assets/EditPencil.svg"}
                          alt="editImage"
                          title="Edit"
                          onClick={toggleDrawerCustomView(true, customViewId)}
                        />
                      ) : null}
                    </SelectEditOption>
                  </FilterRowContainerLeft>
                  <FilterRowContainerLeft className="kanbanbuttons">
                    {typeName == "Deals" || typeName == "Leads" ? (
                      <>
                        <OutLinedButton
                          className="Viewchange"
                          startIcon={
                            localStorage?.getItem("localViewType") ==
                              "List View" ? (
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
                        ></OutLinedButton>
                        <StyledMenu3
                          id="basic-menu"
                          anchorEl={anchorDataView}
                          open={openView}
                          onClose={() => setAnchorDataView(null)}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                          sx={ViewTypeChange}
                          // PaperProps={{
                          //   elevation: 0,
                          //   sx: {
                          //     overflow: "visible",
                          //     filter:
                          //       "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          //     // mt: 1.6,
                          //     "& .MuiAvatar-root": {
                          //       width: 32,
                          //       height: 32,
                          //       ml: -0.5,
                          //       mr: 1,
                          //     },
                          //     "&:before": {
                          //       content: '""',
                          //       display: "block",
                          //       position: "absolute",
                          //       top: 0,
                          //       right: "45%",
                          //       width: 10,
                          //       height: 10,
                          //       bgcolor: "background.paper",
                          //       transform: "translateY(-50%) rotate(45deg)",
                          //       zIndex: 0,
                          //     },
                          //   },
                          // }}
                          // transformOrigin={{
                          //   horizontal: "center",
                          //   vertical: "top",
                          // }}
                          // anchorOrigin={{
                          //   horizontal: "center",
                          //   vertical: "bottom",
                          // }}
                          PaperProps={{
                            elevation: 0,
                            sx: {
                              overflow: "visible",
                              width: "290px",
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
                                left: 0,
                                right: 0,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                borderTop: "1px solid #D2D2D2",
                                borderLeft: "1px solid #D2D2D2",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                                margin: "0 auto",
                              },
                            },
                          }}
                          transformOrigin={{
                            horizontal: "center",
                            vertical: "top",
                          }}
                          anchorOrigin={{
                            horizontal: "right",
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
                          {parent_user == null && (
                            <MenuItem
                              onClick={() => {
                                if (typeId !== 1) {
                                  handleViewClose(1);
                                } else {
                                  setViewType("Kanban View");
                                  localStorage.setItem(
                                    "localViewType",
                                    "Kanban View"
                                  );
                                  handleViewKanabn(1);
                                }
                              }}
                            >
                              <ListItemIcon>
                                <i className="icon-kanban_view"></i>
                              </ListItemIcon>
                              Kanban View
                            </MenuItem>
                          )}
                        </StyledMenu3>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* <OutLinedButton
                      className="iconlead"
                      variant="outlined"
                      startIcon={<i className="icon-leads"></i>}
                      onClick={async (e) => {
                        handleCreate(e);
                        // handleClickOpen();
                        // await dispatch(fetchAllFields());
                      }}
                    >
                      Create {typeName}
                    </OutLinedButton> */}
                    {/* <OutLinedButton
                      variant="outlined"
                      startIcon={<ForumOutlinedIcon/>}
                    >
                      Chat Now
                    </OutLinedButton> */}
                    {dataViewType != 0 && typeName == "Deals" && (
                      <>
                        {/* <OutLinedButton
                            variant="outlined"
                            startIcon={<ModeEditOutlineOutlinedIcon />}
                          >
                            Pipeline
                          </OutLinedButton> */}
                        <div>
                          <OutLinedButton
                            id="demo-customized-button"
                            startIcon={
                              <Image
                                src="/assets/images/crm/pipeline-icon.svg"
                                alt="Edit"
                                width={16}
                                height={16}
                              />
                            }
                            aria-controls={
                              open ? "demo-customized-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            variant="contained"
                            disableElevation
                            onClick={handleClickPipeline}
                            // endIcon={<KeyboardArrowDownIcon />}
                            endIcon={<ModeEditOutlineOutlinedIcon />}
                          >
                            Pipeline{" "}
                            <DownArrowIconn>
                              <KeyboardArrowDownIcon />
                            </DownArrowIconn>
                          </OutLinedButton>
                          <StyledMenu3
                            id="demo-customized-menu"
                            MenuListProps={{
                              "aria-labelledby": "demo-customized-button",
                            }}
                            anchorEl={anchorElPipeline}
                            open={openPipeline}
                            onClose={handleClosePipeline}
                            PaperProps={{
                              elevation: 0,
                              sx: {
                                overflow: "visible",
                                width: "290px",
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
                                  left: 14,
                                  width: 10,
                                  height: 10,
                                  bgcolor: "background.paper",
                                  borderTop: "1px solid #D2D2D2",
                                  borderLeft: "1px solid #D2D2D2",
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
                            <Link
                              href="pipeline"
                              color="inherit"
                              underline="none"
                            >
                              <MenuItem>
                                Pipeline
                                <ListItemIcon className="rightcheckicon">
                                  <ModeEditOutlineOutlinedIcon />
                                </ListItemIcon>
                              </MenuItem>
                            </Link>
                            <Divider sx={{ margin: "0 !important" }} />
                            <Link
                              href="pipeline"
                              color="inherit"
                              underline="none"
                            >
                              <MenuItem
                                onClick={handleClosePipeline}
                                disableRipple
                              >
                                <ListItemIcon>
                                  <AddIcon />
                                </ListItemIcon>
                                New Pipeline
                              </MenuItem>
                            </Link>
                          </StyledMenu3>
                        </div>
                        <NoContentButton
                          variant="outlined"
                          onClick={() => setKanbanPop(true)}
                          startIcon={<SettingsOutlinedIcon />}
                        ></NoContentButton>
                      </>
                    )}
                    <ListTopBarFilter>
                      {/* {localStorage?.getItem("localViewType") !==
                          "Kanban View" &&
                          (customViewId != "0" || customViewId != "") && ( */}

                      {leadView !== "All Leads" ? (
                        <Tooltip title="Manage Columns" arrow>
                          <IconButton
                            sx={{
                              padding: 0,
                            }}
                            aria-label="Manage Columns"
                            // onClick={handleClickOpenColumn}
                            onClick={handleClickMC}
                          >
                            <TuneIcon sx={{ fontSize: "20px" }} />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        ""
                      )}
                      {/* )} */}
                      <div>
                        <ManageColumnStyleMenu
                          id="demo-customized-menu"
                          MenuListProps={{
                            "aria-labelledby": "demo-customized-button",
                          }}
                          anchorEl={anchorElMC}
                          open={openmc}
                          onClose={handleCloseMC}
                        >
                          <CusTomSearchBox>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: "600",
                                fontSize: "14px !important",
                              }}
                            >
                              {" "}
                              Manage Columns
                            </Typography>
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
                          <ManageColumnList sx={CommonCustomScrollbar}>
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
                                      {duplicateColumns?.length > 0 &&
                                        duplicateColumns?.map(
                                          (filters, filtersIndex) => {
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
                                                          defaultColumn.includes(
                                                            filters.name
                                                          )
                                                            ? true
                                                            : false
                                                        }
                                                        onClick={() =>
                                                          handleManageColumn(
                                                            filters
                                                          )
                                                        }
                                                      />
                                                    }
                                                    label={
                                                      filters.name == "mail"
                                                        ? "Email"
                                                        : filters.name
                                                          .replaceAll(
                                                            "_",
                                                            " "
                                                          )
                                                          .replaceAll(".", "")
                                                    }
                                                  />
                                                )}
                                              </Draggable>
                                            );
                                          }
                                        )}
                                      {provided.placeholder}
                                    </div>
                                  )}
                                </Droppable>
                              </DragDropContext>
                              {/* {
                    duplicateColumns?.length > 0 ? duplicateColumns.map((filters, filtersIndex) => {
                      return <FormControlLabel key={filtersIndex}
                        control={
                          <Checkbox
                            checked={
                              defaultColumn.includes(filters.name) ? true : false
                            }
                            onClick={() => handleManageColumn(filters)}
                          />}
                        label={filters.name.replaceAll('_', ' ')}
                      />
                    })
                      :
                      <Typography>No column found!</Typography>
                  } */}
                            </FormGroup>
                          </ManageColumnList>
                          <ManageColumnButton>
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
                                  color="#fff"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  visible={true}
                                />
                              ) : (
                                "Save"
                              )}
                            </SmallRedOutineBtn>
                            <SmallBlackOutineBtn
                              variant="outlined"
                              onClick={handleCloseColumn}
                            >
                              Cancel
                            </SmallBlackOutineBtn>
                          </ManageColumnButton>
                        </ManageColumnStyleMenu>
                      </div>
                    </ListTopBarFilter>
                  </FilterRowContainerLeft>
                </FilterRowContainer>
              </>
            )}

            <ActionButtonContainer>
              {/* <TypographyHeading variant="h5">
                {typeName} List
              </TypographyHeading> */}
              <ButtonManageColmnBox>
                {showButtonsAsperDataChecked ? (
                  <>
                    <div>
                      {typeName != "Accounts" && (
                        <OutLinedButton
                          variant="outlined"
                          startIcon={<ForwardToInboxOutlinedIcon />}
                          onClick={() => {
                            handleActivitPopUp(1);
                            dispatch(setDraftData(""));
                          }}
                        >
                          Send Email
                        </OutLinedButton>
                      )}
                      <OutLinedButton
                        variant="outlined"
                        startIcon={
                          <Image
                            src="/assets/images/crm/opentask.svg"
                            alt="Edit"
                            width={16}
                            height={16}
                          />
                        }
                        onClick={() => {
                          handleActivitPopUp(2);
                        }}
                      >
                        Create Task
                      </OutLinedButton>

                      <ActionFieldStyle>
                        <div>
                          <OutLinedButton
                            id="demo-customized-button"
                            aria-controls={
                              open ? "demo-customized-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : "false"}
                            variant="contained"
                            value={tags}
                            onChange={handleTagsChange}
                            disableElevation
                            onClick={handleClickTag}
                            endIcon={<KeyboardArrowDownIcon />}
                            disableRipple
                          >
                            Tags
                          </OutLinedButton>
                          <TagStylePopover
                            id={idTagPopOver}
                            open={openTagPopOver}
                            anchorEl={anchorElTag}
                            onClose={() => {
                              setToHandleSideEffects(!toHandleSideEffects);
                            }}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                          >
                            <TagInnerDiv>
                              <TagsInput type={0} sendData={[]} />
                            </TagInnerDiv>
                          </TagStylePopover>

                          {/* <StyledMenu2
                              id="demo-customized-menu"
                              MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                              }}
                              anchorEl={anchorElTag}
                              open={opentag}
                              onClose={handleCloseTag}
                            >
                              <TagInnerDiv>
                                <TagsInput type={0} sendData={[]} />

                              </TagInnerDiv>
                            </StyledMenu2> */}
                        </div>
                      </ActionFieldStyle>
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
                            disableElevation
                            onClick={handleClickAction}
                            endIcon={<KeyboardArrowDownIcon />}
                            value={action}
                          >
                            Action
                          </OutLinedButton>
                          <StyledMenu2
                            id="demo-customized-menu"
                            MenuListProps={{
                              "aria-labelledby": "demo-customized-button",
                            }}
                            anchorEl={anchorElAction}
                            open={openaction}
                            onClose={handleCloseAction}
                          >
                            <MenuItem
                              value={1}
                              onClick={(e) => handleChangeAction(1)}
                            >
                              Delete
                            </MenuItem>
                            <MenuItem
                              value={2}
                              onClick={(e) => handleChangeAction(2)}
                            >
                              Mass Update
                            </MenuItem>
                            {typeName == "Leads" && (
                              <MenuItem
                                value={3}
                                onClick={(e) => {
                                  handleChangeAction(3),
                                    dispatch(setTypeId(2)),
                                    dispatch(setMassCovrtPop(true));
                                }}
                              >
                                Mass Convert
                              </MenuItem>
                            )}
                            {typeName != "Accounts" && (
                              <MenuItem
                                value={4}
                                onClick={(e) => handleChangeAction(4)}
                              >
                                Mass Email
                              </MenuItem>
                            )}
                          </StyledMenu2>
                        </div>
                      </ActionFieldStyle>

                      {typeName == "Leads" && (
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
                              disableElevation
                              onClick={handleClickAssign}
                              endIcon={<KeyboardArrowDownIcon />}
                              value={assign}
                            >
                              Assign {typeName}
                            </OutLinedButton>
                            <StyledMenu2
                              id="demo-customized-menu"
                              MenuListProps={{
                                "aria-labelledby": "demo-customized-button",
                              }}
                              anchorEl={anchorElAssign}
                              open={openassign}
                              onClose={handleCloseAssign}
                            >
                              {userLists?.length > 0 &&
                                userLists?.map((ele, userIndex) => (
                                  <MenuItem
                                    value={userIndex}
                                    key={userIndex}
                                    onClick={(e) => handleChangeAssign(ele)}
                                  >
                                    <CommonAvatarContainer>
                                      <CommonAvatarLabel>
                                        <Avatar
                                          alt="Image"
                                          src={ele.file_name}
                                        />
                                        <div>
                                          <Typography
                                            variant="body2"
                                            className="TaskUsername"
                                          >
                                            {" "}
                                            {ele.name}
                                          </Typography>
                                          <Typography variant="body2">
                                            <Link
                                              underline="hover"
                                              title={ele.email}
                                            >
                                              {ele.email}
                                            </Link>
                                          </Typography>
                                        </div>
                                      </CommonAvatarLabel>
                                    </CommonAvatarContainer>
                                  </MenuItem>
                                ))}
                            </StyledMenu2>
                          </div>
                        </ActionFieldStyle>
                      )}
                    </div>
                  </>
                ) : null}
              </ButtonManageColmnBox>
            </ActionButtonContainer>

            <LeadListData>
              {filters?.length > 0 && (
                <ListRecords>
                  {/* <TotalRecords>
      Total Records : {savedFieldData?.data?.data?.length}{" "}
    </TotalRecords> */}
                  <FilterByColumn>
                    {filters?.length > 0 && (
                      <Typography className="Totalrecordtxt">
                        {" "}
                        Filter By{" "}
                      </Typography>
                    )}
                    <FilterRecordList>
                      {filters?.length > 0 &&
                        filters.map((ele, index) => {
                          return (
                            <TotalRecordsFilter>
                              {/* {ele.name.replaceAll('_', ' ')} {ele.condition} {ele.value} */}
                              {ele.name == "mail"
                                ? "Email"
                                : ele.name == "tag"
                                  ? "Tag"
                                  : ele.name.replaceAll("_", " ")}
                            </TotalRecordsFilter>
                          );
                        })}
                      {filters?.length > 0 && (
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
              {customFilterId.id !== undefined && <ListRecords>
                <FilterActionButton
                  variant="outlined"
                  onClick={() => {
                    fetchViewData(0, `All ${typeName}`)
                  }}
                >
                  Clear Filter
                </FilterActionButton>
              </ListRecords>}
              <Grid
                container
                spacing={1.5}
                style={{
                  display: "flex",
                  alignItems: "stretch",
                  // minHeight: "400px",
                  // height: "100%",
                  // height: "75vh",
                }}
              >
                {!mainFilters && (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={3}
                    xl={2.2}
                  // style={{ height: "100%" }}
                  >
                    <div className="filterdesktop">
                      <FiltersColumn />
                    </div>
                  </Grid>
                )}
                {/* <Grid
                  item
                  xs={12}
                  sm={12}
                  md={!mainFilters ? 9 : 12}
                  xl={!mainFilters ? 9.8 : 12}
                >
                  {dataViewType == 0 ? (
                    <ListView />
                  ) : typeName == "Deals" ? (
                    <KanbanViewDeal />
                  ) : (
                    <KanbanView />
                  )}
                </Grid> */}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={!mainFilters ? 9 : 12}
                  xl={!mainFilters ? 9.8 : 12}
                >
                  {dataViewType === 0 ? (
                    isLoading ? (
                      <LeadIndexSkeleton/>
                    ) : (
                      // Render ListView once data is loaded
                      <ListView />
                    )
                  ) : typeName === "Deals" ? (
                    <KanbanViewDeal />
                  ) : (
                    <KanbanView />
                  )}
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
              <RightDrawer callCloseCustomView={handleCloseSidebar} />
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
                          {duplicateColumns?.length > 0 &&
                            duplicateColumns.map((filters, filtersIndex) => {
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
                  {/* {
                    duplicateColumns?.length > 0 ? duplicateColumns.map((filters, filtersIndex) => {
                      return <FormControlLabel key={filtersIndex}
                        control={
                          <Checkbox
                            checked={
                              defaultColumn.includes(filters.name) ? true : false
                            }
                            onClick={() => handleManageColumn(filters)}
                          />}
                        label={filters.name.replaceAll('_', ' ')}
                      />
                    })
                      :
                      <Typography>No column found!</Typography>
                  } */}
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
                    color="#fff"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                ) : (
                  "Save"
                )}
              </SmallRedOutineBtn>
              <SmallBlackOutineBtn
                variant="outlined"
                onClick={handleCloseColumn}
              >
                Cancel
              </SmallBlackOutineBtn>
            </DialogActions>
          </StyledBootstrapDialog>

          {action == 2 && <ManageMass openPopUp={true} setAction={setAction} />}
          {filterPopUp && <SaveFilter openPopUp={true} />}
          {taskPopUp && <TaskPopUp openPopUp={true} />}
          {meetingPopUp && <MeetingPopup openPopUp={true} />}
          {callsPopUp && <CallPopup openPopUp={true} />}
          {composeEmailPopUp && <ComposeEmailPopUp openPopUp={true} />}
          {manageTags && <ManageTags openPopUp={true} type={tagType} />}
          {massConvertPopUp == true && (
            <MassConvert
              openPopUp={massConvertPopUp}
              setAction={setAction}
            // dealData={formData.filter(
            //   (item) => item?.required == "1" || item?.label == "Amount"
            // )}
            />
          )}
        </div>
        {/* /***** End Manage Column Popup ***** */}
        <React.Fragment key={"left"}>
          {/* <Button onClick={toggleDrawer('left', true)}>{'Click'}</Button> */}
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
export default Leads;
