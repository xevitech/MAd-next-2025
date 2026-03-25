import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Categorybtn,
  Hello,
  Listext,
  Menuhover,
  Menutext,
  SubChildLink,
} from "./sidebarstyle";
import { Box, Divider, Link } from "@mui/material";
import router from "next/router";
export default function SidebarAndMenu({
  subCategoryList,
  setSelectedItem,
  setSubCategoryList,
}: any) {
  return (
    <>
      <SubChildLink>
        <Menuhover
          onClick={() => {
            setSubCategoryList([]);
            setSelectedItem(-1);
          }}
        >
          <ChevronLeftIcon sx={{ color: "#D7282F" }} />
          <Menutext>Main Menu</Menutext>
        </Menuhover>
        <Divider />
        <Hello>
          {subCategoryList.map((user) => (
            <Listext>
              <Link underline="none">{user.name}</Link>
            </Listext>
          ))}
        </Hello>
        <Box sx={{ position: 'sticky', bottom: '0px', backgroundColor: '#fff', padding: '10px 10px 10px 6px' }}>
          <Categorybtn onClick={() => {
            router.push("/Category/category2");
          }}>See All Categories</Categorybtn>
        </Box>
      </SubChildLink>

    </>
  );
}
