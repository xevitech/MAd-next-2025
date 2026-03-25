import React from "react";

import {
  Box,
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
import {
  LeftCategorySide,
  MainSectorHeading,
  MoreSubCategoryListStyling,
} from "../style";

export default function CategroyListSkeleton() {
  return (
    <>
      <Box
        sx={{
          height: "100%",
          filter: "drop-shadow(rgb(0, 0, 0, 0.05) -4px -3px 5px)",
          position: "relative",
          zIndex: "10",
        }}
      >
        <Box
          sx={{
            background: "#d7282f",
            borderRadius: "10px 0 0",
            "& .MuiTypography-root": {
              fontSize: "18px",
              color: "#fff",
              fontWeight: 600,
              padding: "9px",
              "@media screen and (max-width:1200px)": {
                fontSize: "14px",
              },
            },
          }}
        >
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
        </Box>
        <List
          sx={{
            height: "92%",
            width: "100%",
            background: "#fff",
          }}
        >
          <ListItem>
              <ListItemText>
                <Skeleton animation='wave' variant="text" width={'60%'} />
              </ListItemText>
          </ListItem>
          <ListItem>
              <ListItemText>
                <Skeleton animation='wave' variant="text" width={'90%'} />
              </ListItemText>
          </ListItem>
          <ListItem>
              <ListItemText>
                <Skeleton animation='wave' variant="text" width={'100%'} />
              </ListItemText>
          </ListItem>
          <ListItem>
              <ListItemText>
                <Skeleton animation='wave' variant="text" width={'50%'} />
              </ListItemText>
          </ListItem>
          <ListItem>
              <ListItemText>
                <Skeleton animation='wave' variant="text" width={'70%'} />
              </ListItemText>
          </ListItem>
          <ListItem>
              <ListItemText>
                <Skeleton animation='wave' variant="text" width={'40%'} />
              </ListItemText>
          </ListItem>
          <ListItem>
              <ListItemText>
                <Skeleton animation='wave' variant="text" width={'90%'} />
              </ListItemText>
          </ListItem>
          <ListItem>
              <ListItemText>
                <Skeleton animation='wave' variant="text" width={'100%'} />
              </ListItemText>
          </ListItem>
        </List>
      </Box>
    </>
  );
}
