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
import { handleProductFilter } from "@/hooks/UseProductListContext";
import { alpha } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProductModule from "./product.module.css";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { useRouter } from "next/router";
import { countries } from "@/utils/countries";
import _debounce from "lodash/debounce";
import {
  CategoryBox,
  CategoryShowLessSpanFilter,
  MoreLessButton,
  ProductListWithCheckBox,
} from "./style";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  fetchFilteredProducts,
  handleManufactureFilter,
} from "@/hooks/reducers/manufactureProductsReducer";
import { debounce } from "lodash";
import { RootState, store } from "redux/store";
const Categorytitle = styled(Typography)(({ theme }) => ({
  textTransform: "capitalize",
  fontSize: "16px",
  fontWeight: 600,
  fontFamily: "Open sans",
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
type CountryFilterProps = {
  onChange: (selectedFilters: string[]) => void; // Adjust the type depending on the expected value
};

const CountryFilter3: React.FC<CountryFilterProps> = ({ onChange }) => {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useAppDispatch();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // ************************************

  const { filterCategory } = useSelector((state: any) => state.productList);
  const [countryName, setCountryName] = React.useState<any>("");
  const [countryList, setCountryList] = React.useState<any>([]);
  const [checkedCountry, setCheckedCountry] = React.useState<any>([]);
  const [check, setCheck] = React.useState<boolean>(false);
  const [viewMore, setViewMore] = React.useState<boolean>(false);
  const [hideViewMore, setHideViewMore] = React.useState<boolean>(false);
  const router: any = useRouter();
  const [filterValue, setFilterValue] = React.useState([]);

  const addQueryParams = (c) => {
    onChange(c);
  };

  const debouncedAddQueryParams = debounce((checkedCategoryArray) => {
    addQueryParams(checkedCategoryArray);
  }, 3000);

  React.useEffect(() => {
    if (countryList.length <= 0) {
      setCountryList(countries.slice(0, 5));
    }
  }, [countries]);

  const handleCountry = async (event) => {
    if (event === "") {
      setHideViewMore(false);
      setCountryList(countries.slice(0, 5));
      return;
    }
    setHideViewMore(true);
    const filtersData = countries.filter((element) =>
      element.name.toLowerCase().includes(event.toLowerCase())
    );
    setCountryList(filtersData);
  };

  React.useEffect(() => {
    if (viewMore) setCountryList(countries);
    if (!viewMore) setCountryList(countries.slice(0, 5));
  }, [viewMore]);

  return (
    <>
      {filterCategory?.brand && (
        <Box className="productnavcheck">
          <CategoryBox sx={{ position: "relative" }}>
            {expanded && (
              <Borderbox
                justifyContent="space-between"
                direction="row"
                alignItems="center"
              >
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon style={{ fontSize: "16px" }} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search Country here..."
                    inputProps={{ "aria-label": "search" }}
                    onChange={(event) => {
                      event.stopPropagation();
                      setCountryName(event.target.value);
                      handleCountry(event.target.value);
                    }}
                    value={countryName}
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
                Country-OLD
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
                <ProductListWithCheckBox>
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
                    {countryList?.map((element, i) => {
                      const labelId = `checkbox-country-list-label-${element.id}`;
                      return (
                        <MylistItem key={`${element.name}+${i}`} disablePadding>
                          <ListItemButton role={undefined} dense>
                            <FormControlLabel
                              key={`${element.name}+${i}`}
                              control={<Checkbox />}
                              label={
                                <ListItemText
                                  id={labelId}
                                  primary={element.name}
                                />
                              }
                              checked={checkedCountry.includes(element.name)}
                              name={element.name}
                              onChange={(e: any) => {
                                if (e.target.checked) {
                                  setCheckedCountry((prev) => {
                                    const nc = [...prev, element.name];
                                    debouncedAddQueryParams(nc);
                                    return nc;
                                  });
                                } else {
                                  setCheckedCountry((prev) => {
                                    const nc = prev.filter(
                                      (item) => item !== element.name
                                    );
                                    debouncedAddQueryParams(nc);
                                    return nc;
                                  });
                                }
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
                        {viewMore ? (
                          <CategoryShowLessSpanFilter>
                            Less <KeyboardArrowUpIcon />
                          </CategoryShowLessSpanFilter>
                        ) : (
                          <CategoryShowLessSpanFilter>
                            More <KeyboardArrowDownIcon />
                          </CategoryShowLessSpanFilter>
                        )}
                      </Button>
                    </MoreLessButton>
                  )}
                </ProductListWithCheckBox>
              </Box>
            </Collapse>
          </CategoryBox>
        </Box>
      )}
    </>
  );
};

export default CountryFilter3;
