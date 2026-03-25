import { Box, Collapse, Stack, Typography } from "@mui/material";
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
import { apiClient } from "../common/common";
import { CategoryBox, MainPageFilterBox } from "./style";
import { debounce } from "lodash";
import { LightTooltip } from "../common/Tooltip/tooltip";
import { useAppDispatch } from "redux/store";

const Categorytitle = styled(Typography)(({ theme }) => ({
  textTransform: "capitalize",
  fontSize: "14px",
  fontWeight: 600,
  fontFamily: "Open sans",
}));

const ListItemStyledText = styled(ListItemText)(({ theme }) => ({
  fontSize: "13px !important",
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
  "& .MuiListItemButton-root": {
    paddingTop: "3px",
    paddingBottom: "3px",
  },
}));

type CategoryFilterProps = {
  onChange: (selectedFilters: any[]) => void;
  value: any[];
};

const CategoryFilter4: React.FC<CategoryFilterProps> = ({
  value,
  onChange,
}) => {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const [categoryData, setCategoryData] = React.useState<string[]>([]);
  const router: any = useRouter();

  const fetchSellerProducts = async () => {
    try {
      const response = await apiClient(
        "front/manufacture/seller_products",
        "get"
      );
      if (response.status === 200) {
        const uniqueCategoryNames: any[] = Array.from(
          new Set(response.data.map((item) => item.category_name))
        );
        setCategoryData(uniqueCategoryNames);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  React.useEffect(() => {
    fetchSellerProducts();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (
    e: React.MouseEvent<HTMLLIElement>,
    element: string
  ) => {
    e.stopPropagation();
    const newCheckedCategory = value.includes(element)
      ? value.filter((i) => i !== element) // Remove the category if it's already checked
      : [...value, element]; // Add the category if it's not checked

    onChange(newCheckedCategory); // Update the parent state
  };

  return (
    <>
      <MainPageFilterBox>
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
              Categories
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
            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
              <nav aria-label="main mailbox folders">
                <StyledList
                  sx={{
                    maxHeight: 200,
                    overflow: "auto",
                  }}
                >
                  {categoryData.length > 0
                    ? categoryData.map((element, index) => (
                        <ListItem
                          key={`data-${index}`}
                          disablePadding
                          onClick={(e) => handleChange(e, element)}
                        >
                          <LightTooltip
                            arrow
                            placement="top"
                            title={element}
                            disableInteractive
                            sx={{
                              "& .MuiTooltip-tooltip": {
                                textTransform: "capitalize",
                              },
                            }}
                          >
                            <ListItemButton>
                              <ListItemStyledText
                                style={{
                                  color: value.includes(element)
                                    ? "#d7282f"
                                    : "",
                                }}
                                className="category_value"
                                primary={element}
                              />
                            </ListItemButton>
                          </LightTooltip>
                        </ListItem>
                      ))
                    : null}
                </StyledList>
              </nav>
            </Box>
          </Collapse>
        </CategoryBox>
      </MainPageFilterBox>
    </>
  );
};

export default CategoryFilter4;
