import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import activitystyle from "./style.module.css";
import {
  NavigationHeaderText,
  ActivityNav,
  ActivityMenu,
  PaperTxt,
  ActivityList,
  ActivityNavbarInn,
  SmallActivitTxt,
  RecentActivitySubmenu,
  IconContent,
  SelectAllTxt,
} from "./styles";
import {
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Fade,
  IconButton,
  Menu,
  List,
  ListItemButton,
  Box,
} from "@mui/material";
import React, { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { MyAppContext } from "@/contextApi/appContext";
import useAppContext from "@/hooks/useAppContext";
import Image from "next/image";
import { ComNameLogoInfo } from "../category/style";

const NavigationData = ({ setSelectedItem, listItem, setListItem, selectItem }) => {
  const { role } = useContext(MyAppContext);
  const [active, setActive] = useState<any>(false);
  const [open, setOpen] = useState<any>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { breakPoints } = useAppContext();

  const handleDrawerOpen = () => {
    setOpen((pre) => !pre);
  };

  const handleSelectAll = (selectAllActive) => {
    setActive((pre) => !pre);
    if (!selectAllActive) {
      let data = [...listItem];
      data.map(itm => {
        if (itm?.parent?.length > 0) {
          itm?.parent?.map(ele => ele.expanded = true)
        }
        itm.expanded = true;
        return itm;
      })
      setSelectedItem(listItem.map((element) => element.type));
      setListItem(data)
    } else {
      let data = [...listItem];
      data.map(itm => {
        if (itm?.parent?.length > 0) {
          itm?.parent?.map(ele => ele.expanded = false)
        }
        itm.expanded = false;
        return itm;
      })
      setSelectedItem([]);
      setListItem(data)
    }
  };

  let selectAllActive =
    listItem.filter((v) => v.expanded).length == listItem.length;

  const handleCheckActivity = (index: any, item) => {
    // its logging index and item from the list of LIST that we mapped
    console.log("handleCheckActivityFunction index", index,item )
    const { type, expanded, parent } = item;
    let data = [...listItem];
    console.log("data in handleCheckActivityFunction",data)
    data[index].expanded = !expanded;
    let newData = data[index].parent.map((v) => ({
      ...v,
      expanded: !expanded,
    }));
    console.log("handleCheckActivityFunction newData",newData)
    data[index].parent = newData;
    if (!expanded) {
      if (type) {
        setSelectedItem((prev) => {
          console.log("prev",prev)
          let selectedItems = [...prev].filter((v) => v != type);
          return [...selectedItems, type];
        });
      } else {
        let parentType = parent.map((v) => v.type);
        if (parentType.length > 0) {
          setSelectedItem((prev) => {
            let selectedItems = [...prev]
              .flat()
              .filter((v) => !parentType.includes(v));
            return [...selectedItems, ...parentType];
          });
        }
      }
    } else {
      if (type) {
        setSelectedItem((prev) => {
          let selectedItems = [...prev].filter((v) => v != type);
          return [...selectedItems];
        });
      } else {
        let parentType = parent.map((v) => v.type);
        if (parentType.length > 0) {
          setSelectedItem((prev) => {
            let selectedItems = [...prev]
              .flat()
              .filter((v) => !parentType.includes(v));
            return [...selectedItems];
          });
        }
      }
    }
    setListItem(data);
  };

  const ParentCheckHandler = (index, subIndex, event, type) => {
    let data = [...listItem];
    data[index].parent[subIndex].expanded = !event;
    if (!event) {
      setSelectedItem((prev) => {
        let selectedItems = [...prev].flat().filter((v) => v != type);
        return [...selectedItems, type];
      });
    } else {
      setSelectedItem((prev) => {
        let selectedItems = [...prev].flat().filter((v) => v != type);
        return [...selectedItems];
      });
    }
    setListItem(data);
  };

  return (
    <>
                {/* no change ui */}

      <ActivityNav

        className={activitystyle.activity_left_nav}
        breakPoints={breakPoints}
      >
        <ActivityNavbarInn className={activitystyle.activity_btn}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            style={{
              display: !breakPoints.max768px ? "none" : "",
            }}
          >
            <MenuIcon />
            {/* no change ui */}
            <SmallActivitTxt className={activitystyle.small_act_txt}>
              Activities{" "}
            </SmallActivitTxt>
          </IconButton>


          {/* no change ui */}
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            sx={{
              "& .MuiPopover-root": {
                top: -1,
              },
            }}
            anchorOrigin={{
              vertical: 140,
              horizontal: "right",
            }}
            transformOrigin={{ vertical: "top", horizontal: 100 }}
            anchorPosition={{ left: 50, top: -1 }}
            style={{ paddingBottom: "50px" }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleDrawerOpen}
            TransitionComponent={Fade}
          >
            <MenuItem>
              <ListItemText
                className={activitystyle.act_nav}
                sx={{
                  "& .MuiTypography-root": {
                    "@media screen and (max-width: 600px)": {
                      fontSize: "13px",
                    },
                  },
                }}
              >
                Activities Navigations
              </ListItemText>
            </MenuItem>
            <Divider />
            <PaperTxt className={activitystyle.activity_value_sec} >
              {listItem.map((item: any, index: any) => {
                return (
                  <>
                    <MenuItem
                      className={item.expanded ? "activetab" : ""}
                      key={item.id}
                      onClick={(event) =>
                        handleCheckActivity(index, item)
                      }
                      disableRipple={item.parent?.length > 0 ? true : false}
                    >
                      <IconContent>
                        <ListItemIcon>
                          <Image
                            height={20}
                            width={20}
                            src={item.icon}
                            alt="image"
                          />
                        </ListItemIcon>
                        <ListItemText>
                          <ActivityList> {item.name}</ActivityList>
                        </ListItemText>

                        <Typography
                          variant="body2"
                          color={
                            item.expanded ? "#D7282F" : "text.secondary"
                          }
                        >
                          <CheckCircleOutlinedIcon fontSize="small" />
                        </Typography>
                      </IconContent>
                      <RecentActivitySubmenu>
                        {item.parent.map((value, subIndex) => (
                          <List
                            component="div"
                            disablePadding
                            key={value.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              ParentCheckHandler(
                                index,
                                subIndex,
                                value.expanded,
                                value.type
                              );
                            }}

                          >
                            <ListItemButton sx={{ pl: 4 }} >
                              <ListItemText primary={value.name} />
                              <ListItemIcon>
                                <CheckCircleOutlinedIcon
                                  fontSize="small"
                                  sx={{
                                    color: value.expanded
                                      ? "#D7282F"
                                      : "text.secondary",
                                  }}
                                />
                              </ListItemIcon>
                            </ListItemButton>
                          </List>
                        ))}
                      </RecentActivitySubmenu>
                    </MenuItem>
                  </>
                );
              })}
            </PaperTxt>
          </Menu>


{/* Main Code */}
          {role != "buyer" && (
            <ActivityMenu
              className={activitystyle.activity_menu}
              breakPoints={breakPoints}
            >
              <Paper sx={{ maxWidth: "100%", background: "none" }}>
                <MenuList style={{ display: breakPoints.max768px && "none" }}>
                  <MenuItem sx={{ padding: 0 }}
                    // className={activitystyle.activity_menu_item}
                    autoFocus
                  >
                    <ListItemText>
                      <Box sx={{ display: "flex", justifyContent: "space-between", color: "rgb(0, 63, 159)" }}>
                        <NavigationHeaderText
                          className={activitystyle.navigation}
                        >
                          Activities Navigation
                        </NavigationHeaderText>
                        {/* select all or unseect all */}
                        <SelectAllTxt onClick={() => handleSelectAll(selectAllActive)}> {selectAllActive ? "Unselect All" : "Select All"} </SelectAllTxt>
                      </Box>
                    </ListItemText>
                  </MenuItem>
                  <Divider />
                  <PaperTxt className={activitystyle.activity_value_sec} >

                    {/* here is the real game of showing everything inside ie from Account Logged-In till Last */}
                    {listItem.map((item: any, index: any) => {
                    {console.log("listItem in real game",listItem)}
                      return (
                        <>
                          <MenuItem
                            className={item.expanded ? "activetab" : ""}
                            key={item.id}
                            onClick={(event) =>
                              handleCheckActivity(index, item)
                            }
                            disableRipple={item.parent?.length > 0 ? true : false}
                          >
                            <IconContent>
                              <ListItemIcon>
                                <Image
                                  height={20}
                                  width={20}
                                  src={item.icon}
                                  alt="image"
                                />
                              </ListItemIcon>
                              <ListItemText>
                                <ActivityList> {item.name}</ActivityList>
                              </ListItemText>

                              <Typography
                                variant="body2"
                                color={
                                  item.expanded ? "#D7282F" : "text.secondary"
                                }
                              >
                                <CheckCircleOutlinedIcon fontSize="small" />
                              </Typography>
                            </IconContent>
                            <RecentActivitySubmenu>
                              {item.parent.map((value, subIndex) => (
                                <List
                                  component="div"
                                  disablePadding
                                  key={value.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    ParentCheckHandler(
                                      index,
                                      subIndex,
                                      value.expanded,
                                      value.type
                                    );
                                  }}

                                >
                                  <ListItemButton sx={{ pl: 4 }} >
                                    <ListItemText primary={value.name} />
                                    <ListItemIcon>
                                      <CheckCircleOutlinedIcon
                                        fontSize="small"
                                        sx={{
                                          color: value.expanded
                                            ? "#D7282F"
                                            : "text.secondary",
                                        }}
                                      />
                                    </ListItemIcon>
                                  </ListItemButton>
                                </List>
                              ))}
                            </RecentActivitySubmenu>
                          </MenuItem>
                        </>
                      );
                    })}
                  </PaperTxt>
                </MenuList>
              </Paper>
            </ActivityMenu>
          )}
        </ActivityNavbarInn>
      </ActivityNav>
    </>
  );
};
export default NavigationData;
