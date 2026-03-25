import React from "react";
import {
  LeftCategorySide,
  MainSectorHeading,
  MoreSubCategoryListStyling,
  SubMenuText,
} from "../styles";
import {
  Divider,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";

export default function CategorySkeleton() {
  return (
    <>
      <LeftCategorySide>
          <MainSectorHeading>
            <Typography>
              <Skeleton
                animation="wave"
                variant="text"
                width={"50%"}
                sx={{
                  "&.MuiSkeleton-root": {
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    "::after": {
                      background:
                        "linear-gradient(90deg,transparent,rgba(0, 0, 0, 0.6),transparent)",
                    },
                  },
                }}
              />
            </Typography>
          </MainSectorHeading>
          <MoreSubCategoryListStyling>
            <div>
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href="#simple-list"
                  className="listItem"
                >
                  <Link
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      "&:hover": {
                        color: "inherit",
                        textDecoration: "none",
                      },
                    }}
                  >
                    <ListItemText>
                      <Skeleton animation="wave" variant="text" width={100} />
                    </ListItemText>
                  </Link>
                  <Divider />
                </ListItemButton>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href="#simple-list"
                  className="listItem"
                >
                  <Link
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      "&:hover": {
                        color: "inherit",
                        textDecoration: "none",
                      },
                    }}
                  >
                    <ListItemText>
                      <Skeleton animation="wave" variant="text" width={120} />
                    </ListItemText>
                  </Link>
                  <Divider />
                </ListItemButton>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href="#simple-list"
                  className="listItem"
                >
                  <Link
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      "&:hover": {
                        color: "inherit",
                        textDecoration: "none",
                      },
                    }}
                  >
                    <ListItemText>
                      <Skeleton animation="wave" variant="text" width={180} />
                    </ListItemText>
                  </Link>
                  <Divider />
                </ListItemButton>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href="#simple-list"
                  className="listItem"
                >
                  <Link
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      "&:hover": {
                        color: "inherit",
                        textDecoration: "none",
                      },
                    }}
                  >
                    <ListItemText>
                      <Skeleton animation="wave" variant="text" width={80} />
                    </ListItemText>
                  </Link>
                  <Divider />
                </ListItemButton>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href="#simple-list"
                  className="listItem"
                >
                  <Link
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      "&:hover": {
                        color: "inherit",
                        textDecoration: "none",
                      },
                    }}
                  >
                    <ListItemText>
                      <Skeleton animation="wave" variant="text" width={200} />
                    </ListItemText>
                  </Link>
                  <Divider />
                </ListItemButton>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href="#simple-list"
                  className="listItem"
                >
                  <Link
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      "&:hover": {
                        color: "inherit",
                        textDecoration: "none",
                      },
                    }}
                  >
                    <ListItemText>
                      <Skeleton animation="wave" variant="text" width={150} />
                    </ListItemText>
                  </Link>
                  <Divider />
                </ListItemButton>
              </ListItem>
            </div>
          </MoreSubCategoryListStyling>

      </LeftCategorySide>
    </>
  );
}
