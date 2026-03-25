import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
/** Common file for these two components **/
import { OuterContainer } from "../../SellerTools/styles";
/** Common file for these two components **/
import { ProfileHeader } from "../../common/profileheader";
import Leads from "./Leads";
import { HelpIcon, LeadsOuterBox, TabsCustomStyle } from "../style";
import {
  CommonCreateButton,
  CommonMenuInner,
  CrmFullData,
  CrmOuterMenu,
  HelpIconPopover,
  HelpSvg,
  LeadMenuCommon,
  MenuIconHelp,
  MoreTabsButton,
  MoreTabsPopoverStyle,
  OutLinedButton,
  PopoverSerach,
  SearchCommon,
} from "../commonStyle";
import { useAppDispatch } from "redux/store";
import {
  fetchAllFields,
  setCommonTabs,
  setDataViewType,
  setFilters,
  setOpenCreateFrom,
  setRedirectedValue,
  setSelectedDataIds,
  setSelectedViewName,
  setShowButtonsAsperDataChecked,
  setShowFilters,
  setSingleActivity,
  setTypeId,
  setTypeName,
} from "@/hooks/UseCreateFormData";
import { useSelector } from "react-redux";
import ComposeEmail from "./ComposeEmail";
import { useRouter } from "next/router";
import CrmContacts from "../Contacts/CrmContacts";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchIcon from "@mui/icons-material/Search";
import CreateForm from "./CreateForm";
const CommonCRMTabs = ({ activeButton }) => {
  // const [activeButton, setActiveButton] = React.useState(0);
  const { CrmTabs, typeName, openCreateFrom } = useSelector(
    (state: any) => state.formList
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleChangeTabs = (value) => {
    dispatch(setCommonTabs(value));
  };
  const [openCreate, setOpenCreate] = useState(false);
  const { asPath, pathname } = useRouter();
  const [activeTab, setActiveTab] = useState("");

  const handleItemClick = (item) => {
    dispatch(setShowButtonsAsperDataChecked(false));
    router.push(`/crm/${item}`);
  };
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const ITEM_HEIGHT = 90;
  useEffect(() => {
    dispatch(setShowFilters([]));
    dispatch(setFilters([]));
    if (asPath.includes("leads")) {
      dispatch(setTypeId(1));
      dispatch(setTypeName("Leads"));
      dispatch(setSelectedViewName(`All Leads`));
    } else if (asPath.includes("contacts")) {
      dispatch(setTypeId(4));
      dispatch(setTypeName("Contacts"));
      dispatch(setSelectedViewName(`All Contacts`));
    } else if (asPath.includes("account")) {
      dispatch(setTypeId(3));
      dispatch(setTypeName("Accounts"));
      dispatch(setSelectedViewName(`All Accounts`));
    } else if (asPath.includes("deals")) {
      dispatch(setTypeId(2));
      dispatch(setTypeName("Deals"));
      dispatch(setSelectedViewName(`All Deals`));
    } else if (asPath.includes("tasks")) {
      dispatch(setTypeId(5));
      dispatch(setTypeName("Tasks"));
      dispatch(setSelectedViewName(`All Tasks`));
    } else if (asPath.includes("meetings")) {
      dispatch(setTypeId(6));
      dispatch(setTypeName("Meetings"));
      dispatch(setSelectedViewName(`All Meetings`));
    } else if (asPath.includes("calls")) {
      dispatch(setTypeId(7));
      dispatch(setTypeName("Calls"));
      dispatch(setSelectedViewName(`All Calls`));
    } else {
      dispatch(setTypeId(8));
      dispatch(setTypeName("Sales"));
      dispatch(setSelectedViewName(`All Sales`));
    }
  }, []);

  const renderComponent = () => {
    switch (CrmTabs) {
      case 0:
        return <Leads />;
      case 2:
        return <CrmContacts />;
      case 3:
        return <Box sx={{ p: 3 }}>Coming soon4....</Box>;
      default:
        return null;
    }
  };
  return (
    <CrmOuterMenu>
      {openCreateFrom && (
        <CreateForm
          open={true}
          setFormStatus={() => {
            setOpenCreate(false);
            dispatch(setOpenCreateFrom(false));
          }}
        />
      )}

      <LeadMenuCommon>
        <CommonMenuInner>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                dispatch(setSelectedDataIds([]));
                dispatch(setTypeId(1));
                dispatch(setTypeName("Leads"));
                dispatch(setSelectedViewName(`All Leads`));
                dispatch(setDataViewType(0));
                dispatch(setRedirectedValue(false));
                handleItemClick("leads");
              }}
              className={typeName == "Leads" ? "activemenu" : ""}
            >
              <ListItemIcon>
                <i className="icon-leads"></i>
              </ListItemIcon>
              <ListItemText>
                <span>Leads</span>
                <MenuIconHelp>
                  <HelpIcon />
                </MenuIconHelp>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                dispatch(setSelectedDataIds([]));
                dispatch(setTypeId(2));
                dispatch(setTypeName("Contacts"));
                dispatch(setSelectedViewName(`All Contacts`));
                dispatch(setDataViewType(0));
                dispatch(setRedirectedValue(false));
                handleItemClick("contacts");
              }}
              className={typeName == "Contacts" ? "activemenu" : ""}
            >
              <ListItemIcon>
                <i className="icon-contact"></i>
              </ListItemIcon>
              <ListItemText>
                <span>Contacts</span>
                <MenuIconHelp>
                  <HelpIcon />
                </MenuIconHelp>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                dispatch(setSelectedDataIds([]));
                dispatch(setTypeId(3));
                dispatch(setTypeName("Accounts"));
                dispatch(setSelectedViewName(`All Accounts`));
                dispatch(setDataViewType(0));
                dispatch(setRedirectedValue(false));
                handleItemClick("accounts");
              }}
              className={typeName == "Accounts" ? "activemenu" : ""}
            >
              <ListItemIcon>
                <i className="icon-account"></i>
              </ListItemIcon>
              <ListItemText>
                <span>Accounts</span>
                <MenuIconHelp>
                  <HelpIcon />
                </MenuIconHelp>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                dispatch(setSelectedDataIds([]));
                dispatch(setTypeId(4));
                dispatch(setTypeName("Deals"));
                dispatch(setSelectedViewName(`All Deals`));
                dispatch(setDataViewType(0));
                dispatch(setRedirectedValue(false));
                handleItemClick("deals");
              }}
              className={typeName == "Deals" ? "activemenu" : ""}
            >
              <ListItemIcon>
                <i className="icon-deal"></i>
              </ListItemIcon>
              <ListItemText>
                <span>Deals</span>
                <MenuIconHelp>
                  <HelpIcon />
                </MenuIconHelp>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                dispatch(setSelectedDataIds([]));
                dispatch(setTypeId(5));
                dispatch(setTypeName("Tasks"));
                dispatch(setSelectedViewName(`All Tasks`));
                dispatch(setDataViewType(0));
                dispatch(setRedirectedValue(false));
                handleItemClick("tasks");
              }}
              className={typeName == "Tasks" ? "activemenu" : ""}
            >
              <ListItemIcon>
                <i className="icon-main-task"></i>
              </ListItemIcon>
              <ListItemText>
                <span>Tasks</span>
                <MenuIconHelp>
                  <HelpIcon />
                </MenuIconHelp>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                dispatch(setSelectedDataIds([]));
                dispatch(setTypeId(6));
                dispatch(setTypeName("Meetings"));
                dispatch(setSingleActivity(""));
                dispatch(setSelectedViewName(`All Meetings`));
                dispatch(setDataViewType(0));
                dispatch(setRedirectedValue(false));
                handleItemClick("meetings");
              }}
              className={typeName == "Meetings" ? "activemenu" : ""}
            >
              <ListItemIcon>
                <i className="icon-main-meeting"></i>
              </ListItemIcon>
              <ListItemText>
                <span>Meetings</span>
                <MenuIconHelp>
                  <HelpIcon />
                </MenuIconHelp>
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                dispatch(setSelectedDataIds([]));
                dispatch(setTypeId(7));
                dispatch(setTypeName("Calls"));
                dispatch(setSingleActivity(""));
                dispatch(setSelectedViewName(`All Calls`));
                dispatch(setDataViewType(0));
                dispatch(setRedirectedValue(false));
                handleItemClick("calls");
              }}
              className={typeName == "Calls" ? "activemenu" : ""}
            >
              <ListItemIcon>
                <i className="icon-main-call"></i>
              </ListItemIcon>
              <ListItemText>
                <span>Calls</span>
                <MenuIconHelp>
                  <HelpIcon />
                </MenuIconHelp>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          {/* <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                dispatch(setTypeId(8));
                dispatch(setTypeName("salesSignal"));
                dispatch(setSelectedViewName(`All Sales Signal`));
                handleItemClick("salesSignal");
              }}
              className={typeName == "Sales" ? "activemenu" : ""}
            >
              <ListItemIcon>
                <i className="icon-signal"></i>
              </ListItemIcon>
              <ListItemText>
                <span>Sales Signal</span>
                <MenuIconHelp>
                  <HelpIcon />
                </MenuIconHelp>
              </ListItemText>
            </ListItemButton>
          </ListItem> */}
          <MoreTabsButton
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
          >
            <MoreHorizIcon fontSize="inherit" />
          </MoreTabsButton>
        </CommonMenuInner>
        <div>
          <MoreTabsPopoverStyle
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                width: "150px",
                overflow: "visible",
                filter: "drop-shadow(rgba(0, 0, 0, 0.05) 0px 0px 0px 1px)",
                // box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
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
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                  borderColor: "rgba(194, 225, 245, 0)",
                  borderBottomColor: "#c2e1f5",
                  borderWidth: "36px",
                  borderTop: "1px solid #EBEBEB",
                  borderLeft: "1px solid #EBEBEB",
                  "@media screen and (max-width: 767px)": {
                    right: 10,
                    left: "auto",
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "left", vertical: "top" }}
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          >
            <PopoverSerach>
              <SearchCommon>
                <TextField
                  fullWidth
                  id="standard-bare"
                  variant="outlined"
                  placeholder="Search..."
                  // onChange={(e) => handleFieldsFilters(e)}
                  InputProps={{
                    endAdornment: (
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                />
              </SearchCommon>
            </PopoverSerach>
            {/* <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            > */}
            {/* <MenuItem>
                <ListItemIcon>
                  <i className="icon-leads"></i>
                </ListItemIcon>
                Lead
                <HelpIconPopover>
                  <HelpSvg />
                </HelpIconPopover>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <i className="icon-contact"></i>
                </ListItemIcon>
                Contact
                <HelpIconPopover>
                  <HelpSvg />
                </HelpIconPopover>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <i className="icon-account"></i>
                </ListItemIcon>
                Accounts
                <HelpIconPopover>
                  <HelpSvg />
                </HelpIconPopover>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <i className="icon-deal"></i>
                </ListItemIcon>
                Deal
                <HelpIconPopover>
                  <HelpSvg />
                </HelpIconPopover>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <i className="icon-main-task"></i>
                </ListItemIcon>
                Tasks
                <HelpIconPopover>
                  <HelpSvg />
                </HelpIconPopover>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <i className="icon-main-meeting"></i>
                </ListItemIcon>
                Meetings
                <HelpIconPopover>
                  <HelpSvg />
                </HelpIconPopover>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <i className="icon-main-call"></i>
                </ListItemIcon>
                Calls
                <HelpIconPopover>
                  <HelpSvg />
                </HelpIconPopover>
              </MenuItem> */}
            {/* <MenuItem>
                <ListItemIcon>
                  <i className="icon-signal"></i>
                </ListItemIcon>
                Sales Signal
                <HelpIconPopover>
                  <HelpSvg />
                </HelpIconPopover>
              </MenuItem> */}
            <MenuItem>
              <ListItemIcon>
                <DescriptionOutlinedIcon />
              </ListItemIcon>
              Quotes
              <HelpIconPopover>
                <HelpSvg />
              </HelpIconPopover>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <RequestQuoteOutlinedIcon />
              </ListItemIcon>
              Invoice
              <HelpIconPopover>
                <HelpSvg />
              </HelpIconPopover>
            </MenuItem>
            {/* </Menu> */}
          </MoreTabsPopoverStyle>
          <CommonCreateButton>
            <OutLinedButton
              className="iconlead"
              variant="outlined"
              startIcon={<i className="icon-leads"></i>}
              onClick={async (e) => {
                dispatch(setOpenCreateFrom(true));
                // localStorage.removeItem("prefix");
                await dispatch(fetchAllFields());
                // handleCreate(e);
                // handleClickOpen();
                // await dispatch(fetchAllFields());
              }}
            >
              Create {typeName?.slice(0, -1)}
            </OutLinedButton>
          </CommonCreateButton>
        </div>
      </LeadMenuCommon>
    </CrmOuterMenu>
  );
};

export default CommonCRMTabs;
