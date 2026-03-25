import React from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { RelatedToBox } from "../style";

const CommonDropDownList = (props) => {
  const option = props?.option;
  return (
    <RelatedToBox>
      {props?.checkSelect == 1 && (
        <>
          <Box component="li" {...props?.newPro} style={{ display: "block" }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <div>
                    {" "}
                    <Avatar alt="Image" src={option.file_name} />
                  </div>
                  <ListItemText>
                    <div className="TaskUsername">
                      {" "}
                      {option?.First_Name} {option?.Last_Name}
                    </div>
                    {"  "} <div className="TaskUseremail">{option?.mail}</div>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </>
      )}
      {props?.checkSelect == 2 && (
        <Box component="li" {...props?.newPro}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>{option?.Deal_Name}</ListItemButton>
            </ListItem>
          </List>
        </Box>
      )}
      {props?.checkSelect == 3 && (
        <Box component="li" {...props?.newPro}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                {option?.Account_Name
                  ? option?.Account_Name
                  : option?.Account_Owner}
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      )}
      {props?.checkSelect == 4 && (
        <Box component="li" {...props?.newPro}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <div>
                  {" "}
                  <Avatar alt="Image" src={option?.file_name} />
                </div>
                <ListItemText>
                  <div className="TaskUsername">
                    {" "}
                    {option?.Full_Name} {option?.Last_Name}
                  </div>
                  {"  "}{" "}
                  <div className="TaskUseremail">
                    {option?.mail} {option?.Contact_Owner}
                  </div>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      )}
    </RelatedToBox>
  );
};

export default CommonDropDownList;
