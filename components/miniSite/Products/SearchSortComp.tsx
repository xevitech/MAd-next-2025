import { Box, Skeleton, Stack } from "@mui/material";
import { MenuSearchButton, Search, StyledInputBase } from "../styled";
import SearchIcon from "@mui/icons-material/Search";
import { MiniSortStack } from "./Products.styled";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import React, { useEffect, useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import _debounce from "lodash/debounce";
import { useRouter } from "next/router";
import { userInfo } from "node:os";
import { useSelector } from "react-redux";
export default function SearchSortComp({
  skeleton,
  searchname,
  setSearchName,
  selctedsorting,
  setSelctedsorting,
  FetchProductList,
  setSearchCategory,
  productList,
}) {
  const [name, setName] = useState<string>("");
  const [search, setSearch] = useState<boolean>(false);
  const { userInfo } = useSelector((state: any) => state.miniSite);
  useEffect(() => {
    if (search) {
      FetchProductList(false, "");
      setSearch(false);
    }
  }, [search]);

  const searchBlurHandler = (val) => {
    if (!val) setSearchName("");
  };

  function sortList() {
    setSelctedsorting((prev) => (prev == "ASC" ? "DESC" : "ASC"));
    setSearch(true);
  }

  const router = useRouter();

  useEffect(() => {
    if (router.query?.s) {
      setSearchName(router.query?.s);
    }
  }, [router?.query?.s]);

  const resetFilters = async () => {
    if (router.query.category) {
      router.push(router.asPath.split("?")[0]);
    }
    setName("");
    setSearchName("");
    FetchProductList(true);
    setSearchCategory({});
    const urlWithoutQueryParam = window.location.href.split("?")[0];
    router.push(`${userInfo?.basic_information?.slug}/products`);
  };

  const delayedQuery = React.useRef(
    _debounce((q) => {
      setSearchName(q), setSearch(true);
    }, 500)
  ).current;

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ "@media screen and (max-width:600px)": { display: "block" } }}
    >
      <MiniSortStack direction="row">
        {skeleton ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Skeleton
              animation="wave"
              variant="text"
              width={"100px"}
              height={"28px"}
            />
            <Skeleton
              sx={{ padding: "0px 12px" }}
              animation="wave"
              variant="text"
              width={"80px"}
            />
            <Skeleton
              sx={{ padding: "0px 12px" }}
              animation="wave"
              variant="text"
              width={"40px"}
            />
          </Box>
        ) : (
          <>
            {productList?.length > 0 && (
              <>
                <Typography
                  variant="h5"
                  sx={{
                    "@media screen and (max-width:320px)": {
                      fontSize: "16px !important",
                    },
                  }}
                >
                  Sort By :
                </Typography>
                <ButtonBase
                  onClick={() => {
                    // router.push("/mini-site/developer/products");
                    resetFilters();
                  }}
                >
                  All Products
                </ButtonBase>
                <ButtonBase onClick={sortList}>
                  {selctedsorting == "ASC" ? "New" : "Old"}
                  <img src="/assets/sortingicon.svg" alt="icon" />
                </ButtonBase>
              </>
            )}
          </>
        )}
      </MiniSortStack>
      <Search
        pr={1.6}
        sx={{
          "@media screen and (max-width:600px)": {
            marginTop: "12px",
            paddingRight: "4px",
          },
        }}
      >
        <StyledInputBase
          sx={{
            "& .MuiInputBase-input": {
              padding: "8px 16px !important",
            },
          }}
          value={searchname}
          onChange={(e) => {
            if (e.target.value.trim() !== "") {
              setSearchName(e.target.value);
            } else {
              setSearchName("");
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchname.trim() !== "") {
              FetchProductList();
            }
          }}
          placeholder="Search in this store"
          inputProps={{ "aria-label": "search" }}
          onBlur={(e) => searchBlurHandler(e.target.value)}
        />

        {searchname && (
          <MenuSearchButton onClick={resetFilters}>
            <CloseOutlinedIcon sx={{ fontSize: "20px" }} />
          </MenuSearchButton>
        )}
        <MenuSearchButton
          onClick={() => FetchProductList()}
          sx={{ fontSize: "28px !important", padding: "0px 8px !important" }}
        >
          <SearchIcon />
        </MenuSearchButton>
      </Search>
    </Stack>
  );
}
