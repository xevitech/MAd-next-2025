import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { alpha } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProductModule from "./product.module.css";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { useRouter } from "next/router";
import { MoreLessButton } from "./style";

const Categorytitle = styled(Typography)(({ theme }) => ({
  textTransform: "capitalize",
  fontSize: "16px",
  fontWeight: 600,
  fontFamily: "Open sans",
}));

const CategoryBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  overflow: "hidden",
  background: theme.palette.common.white,
  border: "1px solid #e9e9e9",
  position: "relative",
}));

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Borderbox = styled(Stack)(({ theme }) => ({
  border: "1px solid #CCCEDD",
  borderRadius: 100,
  position: "absolute",
  backgroundColor: "#E4E4E4",
  zIndex: "1",
  right: "30px",
  overflow: "hidden",
  width: "26px",
  height: "26px",
  justifyContent: "center",
  transition: "all ease .5s",
  top: "5px",
  "&:hover": {
    width: "calc(100% - 40px)",
    backgroundColor: "#ffffff",
  },
}));

// **********************************************

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  transition: "all ease .5s",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {},
  "& .css-1iz4iln": {
    color: "#D7282F",
    padding: "0 8px",
    right: "0px",
    cursor: "pointer",
    pointerEvents: "inherit",
    zIndex: "1",
  },
  ".css-1v4rvp9-MuiInputBase-root": {
    width: "100%",
    "& .MuiInputBase-input": {
      width: "100%",
      paddingLeft: "0",
      paddingRight: "calc(1em + 22px)",
      fontSize: "13px",
    },
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: "0px 4px",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  top: "50%",
  transform: "translate(0 , -50%)",
  cursor: "pointer",
  zIndex: "2",
  "& .MuiSvgIcon-root": {
    color: "#231F20",
  },
  "&:hover": {
    "& .MuiSvgIcon-root": {
      color: "#D7282F",
    },
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: "6px 0 7px 24px",
    transition: theme.transitions.create("width"),
    width: "100%",
    fontSize: "12px",
    "&::placeholder": {
      fontSize: "12px",
    },
  },
}));

const MylistItem = styled(ListItem)(() => ({
  "& .MuiButtonBase-root-MuiListItemButton-root": {
    padding: "0 12px",
  },
  "& .MuiFormControlLabel-root": {
    marginRight: "0",
  },
  "& .MuiSvgIcon-root": {
    display: "none",
  },
  ".MuiCheckbox-root": {
    padding: "7px",
    "&:before": {
      content: '" "',
      display: "block",
      width: "13px",
      height: "13px",
      border: "1px solid #d2d2d2",
      borderRadius: "4px",
    },
    "&:after": {
      content: '" "',
      display: "inline-block",
      transform: "rotate(45deg)",
      width: "3px",
      height: "8px",
      borderBottom: "1px solid #D7282F",
      borderRight: "1px solid #D7282F",
      position: "absolute",
      top: "9px",
      opacity: "0",
    },
    "&:hover": {
      "&:before": {
        borderColor: "#b1b0b0",
      },
    },
    "&.Mui-checked": {
      "&:after": {
        opacity: "1",
      },
      "&:before": {
        borderColor: "#D7282F",
      },
    },
  },
}));

const StyledList = styled(List)(({ theme }) => ({
  "&::-webkit-scrollbar": { width: "4px" },
  "&::-webkit-scrollbar-track": { background: "#EEEEEE" },
  "&::-webkit-scrollbar-thumb": { background: "#D9D9D9", borderRadius: "6px" },
}));

// **********************************************

const BrandFilter = () => {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useAppDispatch();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // ************************************

  const { filtersData, brandIds, filterCategory } = useSelector(
    (state: any) => state.productList
  );
  const [brandName, setBrandName] = React.useState<any>("");
  const [brandList, setBrandList] = React.useState<any>([]);
  const [checkedBrands, setCheckedBrand] = React.useState<any>([]);
  const [viewMore, setViewMore] = React.useState<boolean>(false);
  const [hideViewMore, setHideViewMore] = React.useState<boolean>(false);
  const router: any = useRouter();
  const filterValue: any = router?.query?.brand_id
    ? router.query.brand_id.split(",")
    : [];

  const addQueryParams = (id) => {
    if (id.length === 0) {
      delete router.query.brand_id;
      router.push(router);
      setCheckedBrand([]);
      return;
    }
    router.query.brand_id = id.join(",");
    router.push(router);
  };

  React.useEffect(() => {
    if (filtersData?.brands?.length > 0 && brandList?.length <= 0) {
      setBrandList(filtersData?.brands?.slice(0, 5));
    }
  }, [filtersData?.brands]);

  const handleBrand = (event) => {
    let allBrands = filtersData?.brands;
    setBrandName(event);
    if (event === "") {
      setHideViewMore(false);
      setBrandList(allBrands.slice(0, 5));
      return;
    }
    var filterData = allBrands?.filter((element) =>
      element.name.toLowerCase().includes(event.toLowerCase())
    );
    setHideViewMore(true);
    setBrandList(filterData);
  };

  const handleBrandSearch = () => {
    if (brandName < 0) return;
  };

  React.useEffect(() => {
    if (checkedBrands.length === 0 && filterValue.length > 0) {
      setCheckedBrand(filterValue);
    }
    if (filterValue.length === 0 && checkedBrands.length > 0) {
      setCheckedBrand(filterValue);
    }
    if (filterValue.join(",") !== checkedBrands.join(",")) {
      setCheckedBrand(filterValue);
    }
  }, [filterValue]);

  React.useEffect(() => {
    if (viewMore && !hideViewMore) {
      setBrandList(filtersData?.brands);
    }
    if (!viewMore && brandList.length > 0 && !hideViewMore) {
      setBrandList(filtersData?.brands?.slice(0, 5));
    }
  }, [viewMore, hideViewMore]);

  return (
    <>
      {filterCategory?.brand && (
        <Box className="productnavcheck">
          <CategoryBox mt={{ xs: 1 }}>
            {expanded && (
              <Borderbox
                justifyContent="space-between"
                direction="row"
                alignItems="center"
              >
                <Search>
                  <SearchIconWrapper onClick={handleBrandSearch}>
                    <SearchIcon style={{ fontSize: "16px" }} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search Brands here..."
                    inputProps={{ "aria-label": "search" }}
                    onChange={(event) => {
                      handleBrand(event.target.value);
                    }}
                    value={brandName}
                  />
                </Search>
              </Borderbox>
            )}
            <Stack
              direction="row"
              onClick={handleExpandClick}
              alignItems="center"
              justifyContent="space-between"
              padding="2px 0px 2px 12px"
              borderRadius="8px 8px 0 0"
              position="relative"
            >
              <Categorytitle variant="h6" className={ProductModule.filter_head}>
                Brands
              </Categorytitle>
              <ExpandMore
                expand={expanded}
                aria-expanded={expanded}
                aria-label="show more"
                style={{ padding: "4px" }}
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </Stack>
            <Collapse in={expanded}>
              <Box p={{ xs: 1 }}>
                <Box>
                  <StyledList
                    sx={{
                      width: "100%",
                      maxHeight: 500,
                      overflow: "auto",
                      bgcolor: "background.paper",
                      padding: "0",
                      "& .MuiFormControlLabel-root": {
                        margin: "0",
                      },
                    }}
                  >
                    {brandList?.map((element, i) => {
                      const labelId = `checkbox-brand-list-label-${element.id}`;
                      return (
                        <MylistItem key={`brand-${labelId}`} disablePadding>
                          <ListItemButton role={undefined} dense>
                            <FormControlLabel
                              key={`brand-${element.id}`}
                              control={<Checkbox />}
                              label={
                                <ListItemText
                                  id={labelId}
                                  primary={element.name}
                                />
                              }
                              name={element?.name}
                              checked={checkedBrands.includes(
                                `${element.name}-${element?.id}`
                              )}
                              onChange={(e: any) => {
                                if (e.target.checked) {
                                  setCheckedBrand([
                                    ...checkedBrands,
                                    `${element.name}-${element?.id}`,
                                  ]);
                                  addQueryParams([
                                    ...checkedBrands,
                                    `${element.name}-${element?.id}`,
                                  ]);
                                } else {
                                  // remove from list
                                  let filter = checkedBrands.filter(
                                    (item) =>
                                      item !== `${element.name}-${element?.id}`
                                  );
                                  setCheckedBrand(filter);
                                  addQueryParams(filter);
                                }
                                setBrandName("");
                                setBrandList(filtersData?.brands);
                              }}
                            />
                          </ListItemButton>
                        </MylistItem>
                      );
                    })}
                  </StyledList>
                  {!hideViewMore && (
                    <MoreLessButton>
                      <Button
                        onClick={() => {
                          setViewMore((prev) => !prev);
                        }}
                      >
                        {viewMore ? "Less" : "More"}
                      </Button>
                    </MoreLessButton>
                  )}
                </Box>
              </Box>
            </Collapse>
          </CategoryBox>
        </Box>
      )}
    </>
  );
};

export default BrandFilter;
