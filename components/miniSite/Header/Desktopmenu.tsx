import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import { Stack } from "@mui/system";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LoginIcon from "@mui/icons-material/Login";
import {
  AppBarStyle,
  BoxForMobile,
  BoxMiniSiteinnerL,
  BoxMiniUserInfo,
  CozmoToolbar,
  MenuSearchButton,
  MenuStyle,
  MiniSiteContainer,
  MiniSiteLogo,
  Search,
  SearchBoxForMobile,
  StyledInputBase,
  TypographyMiniUserName,
  UserNameMini,
} from "../styled";
import Image from "next/image";
import { MyAppContext } from "@/contextApi/appContext";
import { useRouter } from "next/router";
import {
  ButtonBase,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
} from "@mui/material";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { logOut, profileData, setOpenLogoutModal } from "@/hooks/appReducers";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { getTokenFromCookies } from "@/utils/cookieUtils";
const Cozmomobilemenu = styled(ButtonBase)(({ theme }) => ({
  display: "none",
  background: theme.palette.common.white,
  borderRadius: "2px",
  border: `1px solid ${theme.palette.divider}`,
  width: "30px",
  height: "30px",
  padding: "2px",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));
const pages = ["Source", "Pricing", "Blog"];

const DesktopMenu = () => {
  const router = useRouter();
  let contextValue = React.useContext(MyAppContext);
  const { userprofileImage, userName } = useSelector(
    (state: any) => state.userData
  );
  let token = getTokenFromCookies();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [searchItem, setSearchItem] = React.useState<string>("");
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (token) {
      if (!userName) dispatch(profileData());
    }
  }, [dispatch]);
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const NavigateHandler = (route) => router.push(route);

  const SearchHandler = () => {
    router.push(`/productlist?name=${searchItem}`);
  };

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer()}
      onKeyDown={() => toggleDrawer()}
    >
      <List>
        {pages.map((page, index) => (
          <ListItem key={index}>
            <ListItemButton>
              <ListItemText primary={page} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      SearchHandler();
    }
  };
  const ellipsis = userName.length > 20 ? "..." : "";
  const truncatedText = userName.slice(0, 20) + ellipsis;
  return (
    <AppBar
      position="static"
      style={{ background: "white" }}
      elevation={0}
      sx={AppBarStyle}
    >
      <MiniSiteContainer>
        <BoxMiniSiteinnerL
          paddingY={{ xs: 0.3, sm: 0.5 }}
          paddingX={{ xs: 0.5, sm: 1.5, md: 0 }}
        >
          <CozmoToolbar>
            <Cozmomobilemenu onClick={() => toggleDrawer()}>
              <MenuTwoToneIcon color="action" width="30px" />
            </Cozmomobilemenu>
            <MiniSiteLogo>
              <Image
                style={{ cursor: "pointer" }}
                onClick={() => NavigateHandler("/")}
                src="/assets/merchantad-logo.png"
                width={228}
                height={50}
                alt="logo"
              />
            </MiniSiteLogo>
            <Box
              sx={{ flexGrow: 1, flexWrap: { sm: "nowrap" } }}
              display={{ xs: "none", md: "flex" }}
            ></Box>
            <BoxForMobile>
              <Search flexGrow={{}} pr={1.6} className="Minisearchbox">
                <StyledInputBase
                  placeholder="Search in Powercozmo"
                  inputProps={{ "aria-label": "search" }}
                  value={searchItem}
                  onChange={(e) => {
                    if (e.target.value.trim() !== "") {
                      setSearchItem(e.target.value);
                    } else {
                      setSearchItem("");
                    }
                  }}
                  onKeyDown={(e) => handleKeyPress(e)}
                />
                <MenuSearchButton
                  onClick={(e) => {
                    searchItem !== "" && SearchHandler();
                  }}
                >
                  <SearchIcon />
                </MenuSearchButton>
              </Search>
              <BoxMiniUserInfo sx={{ flexGrow: 0 }} ml={{ md: 1.5, xl: 2.5 }}>
                <Stack
                  justifyContent="space-between"
                  alignItems="center"
                  direction="row"
                  spacing={{ md: 1, xl: 2 }}
                >
                  <Stack
                    justifyContent="space-between"
                    alignItems="center"
                    direction="row"
                    spacing={1}
                  >
                    <Avatar
                      style={{ borderRadius: "100%" }}
                      sx={{
                        width: { xl: 40, lg: 40, xs: 30 },
                        height: { xl: 40, lg: 40, xs: 30 },
                        cursor: "default",
                      }}
                      variant="rounded"
                      alt={truncatedText}
                      src={userprofileImage}
                    />
                    <Tooltip
                      placement="top"
                      title={userName}
                      arrow
                      componentsProps={{
                        tooltip: {
                          sx: {
                            backgroundColor: "#fff",
                            color: "#000",
                            border: "1px solid rgb(225, 225, 225)",
                            boxShadow: "0 1px 12px 0 rgba(25,27,35,.15)",
                            fontSize: "14px",
                            padding: "5px",
                            letterSpaceing: "0.2px",
                            "& .MuiTooltip-arrow:before": {
                              color: "white",
                              border: "1px solid rgb(225, 225, 225)",
                            },
                          },
                        },
                      }}
                    >
                      <TypographyMiniUserName>
                        {truncatedText}
                      </TypographyMiniUserName>
                    </Tooltip>
                    <LightTooltip
                      title="Your profile and settings"
                      arrow
                      disableInteractive
                    >
                      <IconButton size="small" onClick={handleOpenUserMenu}>
                        <KeyboardArrowDownIcon />
                      </IconButton>
                    </LightTooltip>
                  </Stack>
                </Stack>
                <Menu
                  style={{ marginTop: "45px" }}
                  sx={MenuStyle}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  // disableScrollLock
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
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Typography>
                    <UserNameMini>{userName}</UserNameMini>
                  </Typography>
                  {getTokenFromCookies() ? (
                    <>
                      <MenuItem onClick={(e) => NavigateHandler("/profile")}>
                        <ListItemIcon>
                          <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        <Typography textAlign="center">My Profile</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={(e) => NavigateHandler("/notifications")}
                      >
                        <ListItemIcon>
                          <NotificationsOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography textAlign="center">
                          Notifications
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={(e) => NavigateHandler("/preferences")}
                      >
                        <ListItemIcon>
                          <Settings fontSize="small" />
                        </ListItemIcon>
                        <Typography textAlign="center">Settings</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={(e) => {
                          // localStorage.clear();
                          dispatch(logOut());
                          // NavigateHandler("/");
                        }}
                      >
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        <Typography textAlign="center">Logout</Typography>
                      </MenuItem>
                    </>
                  ) : (
                    <MenuItem
                      onClick={(e) =>
                        NavigateHandler(
                          `/user/signin?minisite=${router?.query?.id?.[0]}`
                        )
                      }
                    >
                      <ListItemIcon>
                        <LoginIcon fontSize="small" />
                      </ListItemIcon>
                      <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                  )}
                </Menu>
              </BoxMiniUserInfo>
            </BoxForMobile>
          </CozmoToolbar>
        </BoxMiniSiteinnerL>
      </MiniSiteContainer>
      <SearchBoxForMobile>
        <Search
          flexGrow={{}}
          sx={{
            pr: 1.6,
            "@media (max-width: 699px)": {
              paddingRight: "4px",
            },
          }}
        >
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />
          <MenuSearchButton onClick={SearchHandler}>
            <SearchIcon />
          </MenuSearchButton>
        </Search>
      </SearchBoxForMobile>
    </AppBar>
  );
};

export default DesktopMenu;
