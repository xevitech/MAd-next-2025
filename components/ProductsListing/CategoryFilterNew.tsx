import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { CategoryBox, MainPageFilterBox, StyledList } from "./style";
import { redirectToPageWithQuery } from "@/utils/commonFunctions/other";
function CategoryTreeView({ item, level }) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleSubCategoryClick = (child) => {
    const { slug = "", id = "" } = child;
    redirectToPageWithQuery("catogery", `${slug + "-" + id}`);
  };

  if (!item) {
    console.error("Item is undefined or null:", item);
    return null;
  }
  return (
    <>
      {item.sub_category?.length > 0 && (
        <ListItem
          onClick={handleClick}
          sx={{
            padding: "0px 5px 0 25px",
            "& svg": {
              color: "#818181",
            },
          }}
        >
          <ListItemText
            primary={item.name}
            sx={{
              "& .MuiTypography-root": {
                fontWeight: 600,
                fontSize: "13px !important",
                color: "#d7282f",
                // padding:"0 10px"
              },
            }}
          />
          {item.sub_category.length > 0 ? (
            open ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : null}
        </ListItem>
      )}
      {item.sub_category && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <StyledList
            sx={{
              width: "100%",
              maxHeight: 360,
              overflow: "auto",
              paddingTop: "0",
              bgcolor: "background.paper",
              "& .MuiListItem-root": {
                padding: "0px 5px 0 22px",
              },
            }}
            disablePadding
          >
            {item.sub_category.map((child, level) => (
              // <CategoryTreeView key={child.id} item={child} level={level}/>
              <ListItem
                onClick={() => handleSubCategoryClick(child)}
                sx={{
                  padding: "0px 5px 0 25px",
                  "& svg": {
                    color: "#818181",
                  },
                }}
              >
                <ListItemText
                  primary={child.name}
                  sx={{
                    "& .MuiTypography-root": {
                      fontWeight: 600,
                      fontSize: "13px !important",
                      color: "#d7282f",
                      // padding:"0 10px"
                    },
                  }}
                />
                {/* {child.sub_category.length > 0 ? (open ? <ExpandLess /> : <ExpandMore />) : null} */}
              </ListItem>
            ))}
          </StyledList>
        </Collapse>
      )}
    </>
  );
}
export default CategoryTreeView;
