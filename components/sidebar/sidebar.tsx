import { Box, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Icon,
  Listtext,
  SearchBar,
  Searchicon,
  Span,
  StyledInputBase,
  Unorderdlist,
  LinkContainer,
  SearchContainer,
  Categorybtn,
} from "./sidebarstyle";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Sidebar({
  setState,
  selectedItem,
  setSelectedItem,
  FetchSubCategoryList,
}: any) {
  const [mouseHover, setMouseHover] = useState<number>(0);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [cloneCategoryList, setCloneCategoryList] = useState<any>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const list = useSelector((state: any) => state.header)?.categoryList ?? [];
  useEffect(() => {
    setCategoryList(list);
    setCloneCategoryList(list);
  }, []);

  const filterCategoryList = (value) => {
    setCategoryName(value);
    if (value === "") {
      setCategoryList(cloneCategoryList);
    }
    let results = cloneCategoryList.filter((val) => {
      return val.name.toLowerCase().includes(value.toLowerCase());
    });
    setCategoryList(results);
  };
  const router = useRouter();
  return (
    <>
      <LinkContainer
        className="LinkContainer"
        sx={{
          width: "100%",
        }}
      >
        <SearchContainer className="SearchContainer">
          <SearchBar>
            <Searchicon>
              <Icon></Icon>
              <StyledInputBase
                placeholder="Search Category"
                inputProps={{ "aria-label": "search" }}
                value={categoryName}
                onChange={(e) => filterCategoryList(e.target.value)}
              />
            </Searchicon>
          </SearchBar>
        </SearchContainer>
        <Unorderdlist>
          {categoryList.map((item, index) => {
            return (
              <Listtext
                key={index}
                onClick={() => {
                  FetchSubCategoryList(item.id);
                  setSelectedItem(index);
                  setState(false);
                }}
              >
                <Link
                  style={{ cursor: "pointer" }}
                  onClick={() => router.push(`/category/${item.slug}`)}
                  underline="none"
                  onMouseEnter={(e) => setMouseHover(index)}
                  onMouseLeave={(e) => setMouseHover(-1)}
                >
                  <i>
                    <img
                      src={index === mouseHover ? item.hover_icon : item.icon}
                      alt={"icons"}
                      style={{ height: 30, width: 30 }}
                    />
                  </i>
                  <Span>{item.name}</Span>
                </Link>
              </Listtext>
            );
          })}
        </Unorderdlist>
      </LinkContainer>
      <Box
        sx={{
          position: "sticky",
          bottom: "0px",
          backgroundColor: "#fff",
          padding: "10px 10px 10px 6px",
          boxShadow: "0 -7px 11px -7px #dddddd",
        }}
      >
        {selectedItem < 0 && (
          <Categorybtn
            onClick={() => {
              router.push("/Category/category2");
            }}
          >
            See All Categories
          </Categorybtn>
        )}
      </Box>
    </>
  );
}
