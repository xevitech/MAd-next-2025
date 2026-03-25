import {
  Box,
  Checkbox,
  Collapse,
  FormControlLabel,
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
import ProductModule from "./product.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { CategoryBox } from "./style";

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

// **********************************************

const ProductAvailabeFilter = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [checkedAvailability, setCheckedAvailability] = React.useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // ************************************
  const availability = ["in_stock", "by_order"];
  const { filterCategory } = useSelector((state: any) => state.productList);

  const router: any = useRouter();
  const addQueryParams = (id) => {
    if (id.length === 0) {
      setCheckedAvailability([]);
      delete router.query.availability;
      router.push(router);
      return;
    }
    setCheckedAvailability(id);
    router.query.availability = id.join(",");
    router.push(router);
  };

  const filterValue: any = router?.query?.availability
    ? router.query.availability.split(",")
    : [];

  React.useEffect(() => {
    if (checkedAvailability.length === 0 && filterValue.length > 0) {
      setCheckedAvailability(filterValue);
    }
    if (filterValue.length === 0 && checkedAvailability.length > 0) {
      setCheckedAvailability(filterValue);
    }
  }, [filterValue]);

  return (
    <>
      {filterCategory.product_availability && (
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
                Product availability
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
                <List
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
                  {availability?.map((element, i) => {
                    const labelId = `checkbox-list-label-avail-${element}`;

                    return (
                      <MylistItem
                        key={`availability-${labelId}`}
                        disablePadding
                      >
                        <ListItemButton role={undefined} dense>
                          <FormControlLabel
                            key={`availability1-${labelId}`}
                            control={<Checkbox />}
                            label={
                              <ListItemText
                                id={labelId}
                                primary={element?.replaceAll("_", " ")}
                              />
                            }
                            name={element}
                            checked={checkedAvailability.includes(`${element}`)}
                            onChange={(e: any) => {
                              if (e.target.checked) {
                                addQueryParams([...filterValue, element]);
                              } else {
                                let filter = filterValue.filter(
                                  (item) => item != element
                                );
                                addQueryParams(filter);
                              }
                            }}
                          />
                        </ListItemButton>
                      </MylistItem>
                    );
                  })}
                </List>
              </Box>
            </Collapse>
          </CategoryBox>
        </Box>
      )}
    </>
  );
};

export default ProductAvailabeFilter;
