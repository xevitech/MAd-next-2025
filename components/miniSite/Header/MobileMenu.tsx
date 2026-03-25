import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material";
import { ButtonBase, Divider, Drawer } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Stack } from "@mui/system";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import Image from "next/image";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

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


const MobileMenu = () => {
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

  return (
    <AppBar position="static" style={{ background: "white" }} elevation={0}>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          "@media (max-width: 799px)": {
            padding: "0 16px",
          },
          "@media (max-width: 280px)": {
            padding: "0",
            justifyContent: "center",
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Cozmomobilemenu onClick={() => toggleDrawer()}>
            <MenuTwoToneIcon color="action" width="30px" />
          </Cozmomobilemenu>
          <Box pt={{ xs: 0.6 }}>
            <Image
              width={180}
              height={60}
              src="/assets/minisitepowercozmologo.svg"
              alt="logo"
            />
          </Box>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          divider={<Divider orientation="vertical" flexItem />}
          sx={{
            "@media screen and (max-width:280px)": {
              marginLeft: "-15px",
            },
          }}
        >
          <IconButton
            sx={{ color: "#d7282f" }}
            size="small"
            aria-label="search"
            color="secondary"
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            sx={{ color: "#d7282f" }}
            size="small"
            color="secondary"
            aria-label="notification"
          >
            <NotificationsIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Drawer anchor={"left"} open={open} onClose={() => toggleDrawer()}>
        {list()}
      </Drawer>
    </AppBar>
  );
};

export default MobileMenu;
