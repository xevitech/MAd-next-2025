import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  styled,
} from "@mui/material";
import React from "react";
export const ListBox = styled(ListItem)({
  paddingLeft: "0px",
  paddingBottom: "10px",
  paddingTop: "0px",
});
export const ListBTN = styled(ListItemButton)({
  paddingLeft: "6px",
  paddingBottom: "0px",
  paddingTop: "0px",
});
export const ListIcon = styled(ListItemIcon)({
  minWidth: "30px",
});
export default function SidebarSkeleton({ links }) {
  const itemCount = links?.type === "seller" ? 9 : 5;
  const items = Array.from({ length: itemCount }, () => null);
  return (
    <>
      <List sx={{ width: "100%" }}>
        <ListBox>
          <ListBTN>
            <ListIcon>
              <Skeleton
                animation="wave"
                variant="rounded"
                height={"20px"}
                width={"20px"}
              />
            </ListIcon>
            <ListItemText>
              <Skeleton
                animation="wave"
                variant="text"
                width={"60%"}
                height={"23px"}
              ></Skeleton>
            </ListItemText>
          </ListBTN>
        </ListBox>
        <ListBox>
          <ListBTN>
            <ListIcon>
              <Skeleton
                animation="wave"
                variant="rounded"
                height={"20px"}
                width={"20px"}
              />
            </ListIcon>
            <ListItemText>
              <Skeleton
                animation="wave"
                variant="text"
                width={"80%"}
                height={"23px"}
              ></Skeleton>
            </ListItemText>
          </ListBTN>
        </ListBox>
        <ListBox>
          <ListBTN>
            <ListIcon>
              <Skeleton
                animation="wave"
                variant="rounded"
                height={"20px"}
                width={"20px"}
              />
            </ListIcon>
            <ListItemText>
              <Skeleton
                animation="wave"
                variant="text"
                width={"75%"}
                height={"23px"}
              ></Skeleton>
            </ListItemText>
          </ListBTN>
        </ListBox>
        <ListBox
          sx={{
            margin: "10px 0 18px 0",
            borderBottom: "1px solid rgba(34, 51, 84, 0.1)",
          }}
        >
          <ListBTN>
            <ListItemText>
              <Skeleton
                animation="wave"
                variant="text"
                width={"35%"}
                height={"23px"}
              ></Skeleton>
            </ListItemText>
          </ListBTN>
        </ListBox>
        {items.map((_, index) => (
          <ListBox key={index}>
            <ListBTN>
              <ListIcon>
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  height={"20px"}
                  width={"20px"}
                />
              </ListIcon>
              <ListItemText>
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={"60%"}
                  height={"23px"}
                ></Skeleton>
              </ListItemText>
            </ListBTN>
          </ListBox>
        ))}
      </List>
    </>
  );
}
