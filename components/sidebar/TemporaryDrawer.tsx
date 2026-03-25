import * as React from "react";
import Box from "@mui/material/Box";
import Sidebar from "./sidebar";
import {
  GlobalNav,
  CategoryList,
  OurCategory,
  CategoryIco,
} from "./sidebarstyle";
import { apiClient } from "../common/common";
import { Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const MainBox = styled(Box)(({ theme }) => ({
  color: "#000",
  cursor: "pointer",
  "&:hover": {
    "& .HoverBox": {
      maxHeight: "800px",
    },
  },
}));

const HoverBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  backgroundColor: "#fff",
  boxShadow: "0px 3px 6px #cccccc",
  color: "#fff",
  transition: "max-height .4s",

  overflowY: "scroll",
  width: "100%",
  borderRadius: "8px,",
}));

type Anchor = "top" | "left" | "bottom" | "right";
export default function TemporaryDrawer() {
  const [state, setState] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<number>(-1);
  const [subCategoryList, setSubCategoryList] = React.useState<any>([]);
  const categoryList =
    useSelector((state: any) => state.header)?.categoryList ?? [];

  const FetchCategoryList = async (id) => {
    let response = await apiClient("categoryList", "post", {
      body: { parent: id, user_id: "" },
    });
    if (response.status === 200) {
      setSubCategoryList(response.data);
    }
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      if (categoryList.length > 0) {
        setState(open);
        setSelectedItem(-1);
      }
    };

  const list = (anchor: Anchor) => (
    <GlobalNav display={"flex"} className={selectedItem >= 0 ? "show" : "hide"}>
      <CategoryList className="CategoryList" role="presentation">
        <Sidebar
          setState={setState}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          FetchSubCategoryList={FetchCategoryList}
        />
      </CategoryList>
    </GlobalNav>
  );

  const router = useRouter();
  return (
    <div>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <MainBox>
            <OurCategory onClick={() => router.push(`/category/list`)}>
              <CategoryIco>
                <img
                  src="/assets/OurcategoryiconRB.svg"
                  alt="OurCategoryIcon"
                />
              </CategoryIco>
              <Typography>Our Categories</Typography>
            </OurCategory>
          </MainBox>
        </React.Fragment>
      ))}
    </div>
  );
}
