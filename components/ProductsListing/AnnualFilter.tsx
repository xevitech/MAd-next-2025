import {
  Box,
  Checkbox,
  Collapse,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import ProductModule from "./product.module.css";
import * as React from "react";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import { CategoryBox } from "./style";
const Categorytitle = styled(Typography)(({ theme }) => ({
  textTransform: "capitalize",
  fontSize: "14px",
  fontWeight: 600,
  fontFamily: "Open sans",
}));
const StyledList = styled(List)(({ theme }) => ({
  "&::-webkit-scrollbar": { width: "4px" },
  "&::-webkit-scrollbar-track": { background: "#EEEEEE" },
  "&::-webkit-scrollbar-thumb": { background: "#D9D9D9", borderRadius: "6px" },
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
const AnnualFilter = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [checkedRevenue, setCheckedRevenue] = React.useState([]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { filtersData, filterCategory }: any = useSelector(
    (state: any) => state.productList
  );

  const router: any = useRouter();

  const filterValue: any = router?.query?.yearly_revenu
    ? router.query.yearly_revenu.split(",")
    : [];

  const addQueryParams = (id) => {
    if (id.length === 0) {
      delete router.query.yearly_revenu;
      router.push(router);
      return;
    }
    router.query.yearly_revenu = id.join(",");
    router.push(router);
  };

  React.useEffect(() => {
    if (checkedRevenue.length === 0 && filterValue.length > 0) {
      setCheckedRevenue(filterValue);
    }
    if (filterValue.length === 0 && checkedRevenue.length > 0) {
      setCheckedRevenue(filterValue);
    }
    if (filterValue.join(",") !== checkedRevenue.join(",")) {
      setCheckedRevenue(filterValue);
    }
  }, [filterValue]);
  let AnnualRevenue = filtersData?.annual_revenue?.map((v) => ({
    name: v.name,
    id: v.name,
  }));

  return (
    <>
      {filterCategory?.annual_revenue && (
        <Box className="productnavcheck">
          <CategoryBox>
            <Stack
              direction="row"
              onClick={handleExpandClick}
              alignItems="center"
              justifyContent="space-between"
              padding="2px 0px 2px 12px"
              borderRadius="8px 8px 0 0"
            >
              <Categorytitle variant="h6" className={ProductModule.filter_head}>
                Annual Revenue
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
                <StyledList
                  sx={{
                    width: "100%",
                    maxHeight: 200,
                    overflow: "auto",
                    bgcolor: "background.paper",
                    padding: "0",
                    "& .MuiFormControlLabel-root": {
                      margin: "0",
                    },
                  }}
                >
                  {AnnualRevenue?.map((element, i) => {
                    const labelId = `checkbox-annual-list-label-${element.id}`;

                    return (
                      <MylistItem key={labelId} disablePadding>
                        <ListItemButton role={undefined} dense>
                          <FormControlLabel
                            key={`annual-${element.id}`}
                            control={<Checkbox />}
                            label={
                              <ListItemText
                                id={labelId}
                                primary={element.name}
                              />
                            }
                            name={element?.name}
                            checked={checkedRevenue.includes(`${element.id}`)}
                            onChange={(e: any) => {
                              if (e.target.checked) {
                                setCheckedRevenue([
                                  ...checkedRevenue,
                                  `${element.id}`,
                                ]);
                                addQueryParams([`${element.id}`]);
                              } else {
                                let filter = checkedRevenue.filter(
                                  (item) => item != element.id
                                );
                                addQueryParams(filter);
                              }
                            }}
                          />
                        </ListItemButton>
                      </MylistItem>
                    );
                  })}
                </StyledList>
              </Box>
            </Collapse>
          </CategoryBox>
        </Box>
      )}
    </>
  );
};

export default AnnualFilter;
