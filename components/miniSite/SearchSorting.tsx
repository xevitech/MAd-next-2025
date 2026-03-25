import { Box, Grid, Menu, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { styled } from "@mui/material";
import Listingheading from "./Listingheading";
import {
  CategoryMenuItem,
  SearchButton,
  useStyles,
  CloseButton,
  SelectStack,
} from "./styled";
import { toast } from "react-toastify";

const SearchInput = styled("input")(({ theme }) => ({
  backgroundColor: `${theme.palette.common.white}`,
  fontSize: ".9rem",
  padding: "10px 10px",
  border: "none",
  width: "100%",
  color: `${theme.palette.common.black}`,
  outline: "none",
}));

export default function SearchSorting({
  productList,
  categoryList,
  searchname,
  setSearchName,
  searchCategory,
  setSearchCategory,
  searchProduct,
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [resetFilter, setResetFilter] = useState<boolean>(false);
  const open = Boolean(anchorEl);

  const resetFilters = async () => {
    setSearchName("");
    setSearchCategory("");
    setResetFilter(true);
  };

  useEffect(() => {
    if (resetFilter) {
      setResetFilter(false);
    }
  }, [resetFilter]);

  const { classes } = useStyles();
  const inputRef: any = useRef();

  const handleCategoryFilter = (val) => {
    if (val !== "" || val != null) {
      setSearchCategory(val);
    } else {
      setSearchCategory("all");
    }
    inputRef.current.focus();
    document.getElementById("search-procuct-minisite-home").focus();
    setAnchorEl(null);
  };

  let categoryName =
    categoryList?.find((v) => v.id == searchCategory)?.name ?? "";

  return (
    <>
      <Grid
        container
        sx={{
          padding: "14px 24px",
          "@media (max-width: 767px)": {
            padding: "14px",
          },
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          xl={7}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Listingheading productList={productList} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={7}
          lg={7}
          xl={5}
          className={classes.searchbarright}
        >
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            disableScrollLock={true}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            PaperProps={{
              elevation: 0,
              sx: {
                p: 0,
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
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
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {categoryList?.length > 0 && (
              <CategoryMenuItem onClick={() => handleCategoryFilter("all")}>
                All Categories
              </CategoryMenuItem>
            )}
            {categoryList?.map((item, i) => (
              <CategoryMenuItem
                key={i}
                onClick={() => handleCategoryFilter(item)}
              >
                {item.name}
              </CategoryMenuItem>
            ))}
          </Menu>
          <Stack
            alignItems="center"
            display="flex"
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key == "Enter") {
              }
            }}
          >
            <SelectStack
              overflow="hidden"
              border={{ xs: "1px solid #CCCEDD" }}
              bgcolor="white"
              borderRadius="100px"
              width="100%"
              display="flex"
              flexDirection="row"
              alignItems="center"
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key == "Enter") {
                }
              }}
            >
              <Box width="100%" sx={{ display: "flex", alignItems: "center" }}>
                <SearchInput
                  id="search-procuct-minisite-home"
                  ref={inputRef}
                  value={searchname}
                  onChange={(e) => {
                    const inputValue = e.target.value.trimStart();
                    setSearchName(inputValue);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (searchname) {
                        searchProduct();
                      } else {
                        toast.error("Please enter store name");
                      }
                    } else if (e.key === "Backspace" && searchname === "") {
                      e.preventDefault();
                    }
                  }}
                  type="text"
                  placeholder="Search in this Store"
                />

                {searchname != "" || categoryName != "" ? (
                  <CloseButton onClick={resetFilters}>
                    <CloseOutlinedIcon />
                  </CloseButton>
                ) : null}

                <SearchButton onClick={searchProduct}>
                  <SearchOutlinedIcon aria-label="search" />
                </SearchButton>
              </Box>
            </SelectStack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
