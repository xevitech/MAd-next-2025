import { Box, Button, Chip, Collapse, Stack, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ProductModule from "./product.module.css";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSelector } from "react-redux";
import {
  SelectFilters,
  FilterChip,
  CategoryShowLessSpan,
  CategoryBox,
} from "./style";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  fetchAllProductsList,
  resetAllFilters,
  resetToggleHandler,
  setEmptyData,
  setFilterCategory,
  setTerritory,
} from "@/hooks/UseProductListContext";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { AntSwitch } from "../CRM/PageLayout/style";
import { TerritoryList } from "@/utils/countriesphp";
import { countries } from "../common/countrydropdown/countries";
import { LightTooltip } from "../common/Tooltip/tooltip";
import { removeLastIndexValue } from "../Helper";

// Start switches code //
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" />
))(({ theme }) => ({
  width: "35px",
  height: "18px !important",
  padding: "0px !important",
  marginLeft: "12px !important",
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: "3px",
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#9B9B9B" : "#D7282F",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
}));
const Categorymainheading = styled(Typography)(({ theme }) => ({
  color: "#231F20",
  textTransform: "capitalize",
  fontSize: "15px !important",
  fontWeight: "600 !important",
  fontFamily: "Open sans !important",
}));
const Categorytitle = styled(Typography)(({ theme }) => ({
  textTransform: "capitalize",
  fontSize: "14px",
  fontWeight: 600,
  fontFamily: "Open sans",
}));

const FiletrLabel = styled(Typography)(({ theme }) => ({
  textTransform: "capitalize",
  fontSize: "13px",
  fontWeight: 400,
  fontFamily: "Open sans",
  color: "#231F20",
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

const StyledList = styled(List)(({ theme }) => ({
  "&::-webkit-scrollbar": { width: "4px" },
  "&::-webkit-scrollbar-track": { background: "#EEEEEE" },
  "&::-webkit-scrollbar-thumb": { background: "#D9D9D9", borderRadius: "6px" },
}));

const AllFilters = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [expandedMore, setExpandedMore] = React.useState(false);
  const dispatch = useDispatch<any>();
  const { query }: any = useRouter();
  const handleDelete = (key) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete(key);
    router.push({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  const toggleExpanded = () => {
    setExpandedMore(!expandedMore);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const State = useSelector((state: any) => state.productList);
  const { filterCategory } = State;
  const router = useRouter();

  const HandleFilterCategoryList = (name, value) => {
    dispatch(setFilterCategory({ [name]: value }));
  };
  const handleReset = async () => {
    dispatch(resetToggleHandler(true));
    await dispatch(fetchAllProductsList());
    dispatch(resetAllFilters());
    dispatch(setEmptyData(false));
    router.push("/productlist");
  };

  React.useEffect(() => {
    FetchTerritoryData();
  }, []);
  React.useEffect(() => {}, []);

  const FetchTerritoryData = async () => {
    dispatch(
      setTerritory(
        TerritoryList.map((element) => ({
          value: element?.id + "t",
          view: element?.name,
          type: "Territory",
        }))
      )
    );
  };

  const {
    categories,
    price_range,
    brand,
    business_type,
    annual_revenue,
    condition,
    price_type,
    product_availability,
    manufacturer_year,
    member_type,
    plan_type,
  } = filterCategory;

  const { keywordData, KeyName }: any = useSelector(
    (state: any) => state.productList
  );

  const getCountryName = (country) => {
    let countryNames = [];
    country &&
      country?.split(",")?.map((ele) => {
        countryNames.push(
          countries?.find((v) => v.code == ele?.toUpperCase())?.name
        );
      });
    return countryNames?.join(", ");
  };

  const getBrandNames = (values) => {
    const parts = values.split(",");
    const brandNames = parts.map((item) => item.split("-")[0]);
    const result = brandNames.join(",");
    return result;
  };

  return (
    <Box className="filtercoulmn">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Categorymainheading variant="h6">Filter</Categorymainheading>
        <Box
          onClick={handleReset}
          className={ProductModule.reset}
          sx={{
            padding: "5px 0px !important",
            cursor: "pointer",
          }}
        >
          {Object.keys(query).length > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                textTransform: "capitalize",
                color: "#231F20",
                fontSize: "14px",
                "&:hover": {
                  color: "#D7282F",
                },
              }}
            >
              <RefreshIcon style={{ fontSize: "18px" }} /> Clear All
            </Box>
          )}
        </Box>{" "}
      </Stack>
      {expandedMore && Object.keys(query).length > 0 && (
        <SelectFilters>
          {Object.keys(query).map((key, index) => {
            let name = key;
            let value = query[key];
            return (
              <FilterChip direction="row" spacing={1} key={index}>
                <Chip
                  sx={{ textTransform: "capitalize" }}
                  label={
                    <>
                      <span style={{ fontWeight: "bold" }}>
                        {name == "member"
                          ? "Member Type"
                          : name == "business_type"
                          ? "Bussiness Type"
                          : name == "priceType"
                          ? "Price Type"
                          : name == "available"
                          ? "Product Availability"
                          : name == "manufacturer_year"
                          ? "Manufactured Year"
                          : name == "yearly_revenu"
                          ? "Annual Revenue"
                          : name == "range"
                          ? "Price Range"
                          : name == "name"
                          ? "Keywords"
                          : name == "display_name"
                          ? "Plan Type"
                          : name}
                      </span>
                      :
                      <span>
                        {" "}
                        {name == "range"
                          ? `${value
                              ?.replaceAll("-", " ")
                              ?.replaceAll("_", " ")
                              ?.replaceAll(",", " - ")}`
                          : name == "country"
                          ? countries?.find(
                              (v) => v.code == value?.toUpperCase()
                            )?.name
                          : value?.replaceAll("-", " ")?.replaceAll("_", " ")}
                      </span>
                    </>
                  }
                  onDelete={() => {
                    handleDelete(key);
                  }}
                />
              </FilterChip>
            );
          })}
          {query && Object.keys(query).length > 4 && (
            <Button onClick={toggleExpanded} disableRipple>
              {expandedMore ? (
                <CategoryShowLessSpan>
                  View Less <KeyboardArrowUpIcon />
                </CategoryShowLessSpan>
              ) : (
                <CategoryShowLessSpan>
                  View All <KeyboardArrowDownIcon />
                </CategoryShowLessSpan>
              )}
            </Button>
          )}
        </SelectFilters>
      )}

      {query && !expandedMore && Object.keys(query).length > 0 && (
        <SelectFilters>
          {Object.keys(query)
            ?.slice(0, 4)
            .map((key, index) => {
              let name = key;
              let value;
              if (name === "catogery") {
                value = removeLastIndexValue(query[key]);
              } else {
                value = query[key];
              }
              if (value) {
                return (
                  <FilterChip direction="row" spacing={1} key={index}>
                    <LightTooltip
                      placement="top"
                      title={
                        name == "range"
                          ? `${value
                              ?.replaceAll("-", " ")
                              ?.replaceAll("_", " ")
                              ?.replaceAll(",", " - ")}`
                          : name === "brand"
                          ? getBrandNames(value)
                          : name == "country"
                          ? getCountryName(value)
                          : value &&
                            value?.replaceAll("-", " ")?.replaceAll("_", " ")
                      }
                      arrow
                      disableInteractive
                      sx={{ textTransform: "capitalize" }}
                    >
                      <Chip
                        sx={{ textTransform: "capitalize" }}
                        label={
                          <>
                            <span style={{ fontWeight: "bold" }}>
                              {name == "member_type"
                                ? "Member Type"
                                : name == "business_type"
                                ? "Bussiness Type"
                                : name == "price_type"
                                ? "Price Type"
                                : name == "available"
                                ? "Product Availability"
                                : name == "manufacturer_year"
                                ? "Manufacturer Year"
                                : name == "yearly_revenu"
                                ? "Annual Revenue"
                                : name == "price_range"
                                ? "Price Range"
                                : name == "name"
                                ? "Keywords"
                                : name == "display_name"
                                ? "Plan Type"
                                : name === "brand_id"
                                ? "Brand"
                                : name}
                            </span>
                            :
                            <span>
                              {" "}
                              {name == "range"
                                ? `${value
                                    ?.replaceAll("-", " ")
                                    ?.replaceAll("_", " ")
                                    ?.replaceAll(",", " - ")}`
                                : name === "brand_id"
                                ? getBrandNames(value)
                                : name == "country"
                                ? getCountryName(value)
                                : value &&
                                  value
                                    ?.replaceAll("-", " ")
                                    ?.replaceAll("_", " ")}
                            </span>
                          </>
                        }
                        onDelete={() => {
                          handleDelete(key);
                        }}
                      />
                    </LightTooltip>
                  </FilterChip>
                );
              }
            })}
          {query && Object.keys(query).length > 4 && (
            <Button onClick={toggleExpanded} disableRipple>
              {expandedMore ? (
                <CategoryShowLessSpan>
                  View Less <KeyboardArrowUpIcon />
                </CategoryShowLessSpan>
              ) : (
                <CategoryShowLessSpan>
                  View All <KeyboardArrowDownIcon />
                </CategoryShowLessSpan>
              )}
            </Button>
          )}
        </SelectFilters>
      )}
      <CategoryBox mt={{ xs: 2 }}>
        <Stack
          direction="row"
          onClick={handleExpandClick}
          alignItems="center"
          justifyContent="space-between"
          padding="2px 0px 2px 12px"
          borderRadius="8px 8px 0 0"
          // bgcolor={expanded ? grey[300] : grey[100]}
        >
          <Categorytitle variant="h6" className={ProductModule.filter_head}>
            Filter Column
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
          <Box pl={{ xs: 1 }} sx={{ width: "100%", paddingBottom: "12px" }}>
            <nav aria-label="main mailbox folders">
              <StyledList
                sx={{
                  maxHeight: 400,
                  overflow: "auto",
                  padding: "0 0 0 5px",
                }}
              >
                <ListItem key={1} disablePadding>
                  <FormGroup
                    sx={{
                      gap: "8px",
                      "& .MuiFormControlLabel-root": {
                        margin: "0",
                        gap: "6px",

                        "& .MuiSwitch-root": {
                          "& .Mui-checked ~ .MuiSwitch-track": {
                            backgroundColor: "#D7282F",
                            border: "0",
                          },
                          "& .Mui-checked": {
                            color: "#ffffff",
                            border: "0",
                          },
                        },
                      },
                    }}
                  >
                    <FormControlLabel
                      sx={{ p: 0.07, pl: 0 }}
                      control={<AntSwitch size="small" sx={{ m: 1 }} />}
                      label={
                        <FiletrLabel variant="body1">Categories</FiletrLabel>
                      }
                      onChange={(e: any) =>
                        HandleFilterCategoryList("categories", e.target.checked)
                      }
                      name="Categories"
                      checked={categories}
                    />
                    <FormControlLabel
                      sx={{ p: 0.07, pl: 0 }}
                      control={<AntSwitch size="small" sx={{ m: 1 }} />}
                      label={
                        <FiletrLabel variant="body1">Member Type </FiletrLabel>
                      }
                      onChange={(e: any) =>
                        HandleFilterCategoryList(
                          "member_type",
                          e.target.checked
                        )
                      }
                      name="MemberType"
                      checked={member_type}
                    />
                    <FormControlLabel
                      sx={{ p: 0.07, pl: 0 }}
                      control={<AntSwitch size="small" sx={{ m: 1 }} />}
                      label={
                        <FiletrLabel variant="body1">Plan Type </FiletrLabel>
                      }
                      onChange={(e: any) =>
                        HandleFilterCategoryList("plan_type", e.target.checked)
                      }
                      name="PlanTyoe"
                      checked={plan_type}
                    />

                    <FormControlLabel
                      sx={{ p: 0.07, pl: 0 }}
                      control={<AntSwitch size="small" sx={{ m: 1 }} />}
                      label={
                        <FiletrLabel variant="body1">Price Range </FiletrLabel>
                      }
                      onChange={(e: any) =>
                        HandleFilterCategoryList(
                          "price_range",
                          e.target.checked
                        )
                      }
                      name="Price Range"
                      checked={price_range}
                    />
                    <FormControlLabel
                      sx={{ p: 0.07, pl: 0 }}
                      control={<AntSwitch size="small" sx={{ m: 1 }} />}
                      label={<FiletrLabel variant="body1">Brand </FiletrLabel>}
                      onChange={(e: any) =>
                        HandleFilterCategoryList("brand", e.target.checked)
                      }
                      checked={brand}
                      name="Brand"
                    />
                    <FormControlLabel
                      sx={{ p: 0.07, pl: 0 }}
                      control={<AntSwitch size="small" sx={{ m: 1 }} />}
                      label={
                        <FiletrLabel variant="body1">
                          Business Type{" "}
                        </FiletrLabel>
                      }
                      onChange={(e: any) =>
                        HandleFilterCategoryList(
                          "business_type",
                          e.target.checked
                        )
                      }
                      name="BusinessType"
                      checked={business_type}
                    />
                    <FormControlLabel
                      sx={{ p: 0.07, pl: 0 }}
                      control={<AntSwitch size="small" sx={{ m: 1 }} />}
                      label={
                        <FiletrLabel variant="body1">Condition </FiletrLabel>
                      }
                      checked={condition}
                      onChange={(e: any) =>
                        HandleFilterCategoryList("condition", e.target.checked)
                      }
                      name="Condition"
                    />
                    <FormControlLabel
                      sx={{ p: 0.07, pl: 0 }}
                      control={<AntSwitch size="small" sx={{ m: 1 }} />}
                      label={
                        <FiletrLabel variant="body1">Price Type </FiletrLabel>
                      }
                      checked={price_type}
                      name="PriceType"
                      onChange={(e: any) =>
                        HandleFilterCategoryList("price_type", e.target.checked)
                      }
                    />
                    <FormControlLabel
                      sx={{ p: 0.07, pl: 0 }}
                      control={<AntSwitch size="small" sx={{ m: 1 }} />}
                      label={
                        <FiletrLabel variant="body1">
                          Product Availability{" "}
                        </FiletrLabel>
                      }
                      checked={product_availability}
                      name="Product Availability"
                      onChange={(e: any) =>
                        HandleFilterCategoryList(
                          "product_availability",
                          e.target.checked
                        )
                      }
                    />
                    <FormControlLabel
                      sx={{ p: 0.07, pl: 0 }}
                      control={<AntSwitch size="small" sx={{ m: 1 }} />}
                      label={
                        <FiletrLabel variant="body1">
                          Manufacturer Year{" "}
                        </FiletrLabel>
                      }
                      checked={manufacturer_year}
                      name="Manufacturer Year"
                      onChange={(e: any) =>
                        HandleFilterCategoryList(
                          "manufacturer_year",
                          e.target.checked
                        )
                      }
                    />
                    {/* <FormControlLabel
                      sx={{ p: 0.07, pl: 0 }}
                      control={<AntSwitch size="small" sx={{ m: 1 }} />}
                      label={
                        <FiletrLabel variant="body1">
                          Annual Revenue{" "}
                        </FiletrLabel>
                      }
                      checked={annual_revenue}
                      name="Annual Revenue"
                      onChange={(e: any) =>
                        HandleFilterCategoryList(
                          "annual_revenue",
                          e.target.checked
                        )
                      }
                    /> */}
                  </FormGroup>
                </ListItem>
              </StyledList>
            </nav>
          </Box>
        </Collapse>
      </CategoryBox>
    </Box>
  );
};

export default AllFilters;
