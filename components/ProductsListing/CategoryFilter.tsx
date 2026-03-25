import { Box, Collapse, Skeleton, Stack, Typography } from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ProductModule from "./product.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { apiClient } from "../common/common";
import { CategoryBox, MainPageFilterBox } from "./style";
import {
  setCategoryIds,
  setKeywordData,
  setKeywordName,
} from "@/hooks/UseProductListContext";
import { useAppDispatch } from "redux/store";
import { LightTooltip } from "../common/Tooltip/tooltip";
import CategoryTreeView from "./CategoryFilterNew";

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

const CategoryFilter = ({ data }: any) => {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = React.useState(true);
  const [loader, setLoader] = React.useState(true);
  const [categoryData, setCategoryData] = React.useState([]);
  const [checkedCategory, setCheckedCategory] = React.useState([]);
  const router: any = useRouter();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const { filterCategory }: any = useSelector(
    (state: any) => state.productList
  );
  const addQueryParams = (id) => {
    if (id?.length === 0) {
      setCheckedCategory([]);
      delete router.query.category;
      router.push(router);
      return;
    }
    router.query.category = id;
    router.push(router);
  };

  const filterValue: any = router?.query?.category
    ? [router.query.category]
    : [];

  React.useEffect(() => {
    if (checkedCategory.length === 0 && filterValue.length > 0) {
      setCheckedCategory(filterValue);
    }
    if (filterValue.length === 0 && checkedCategory.length > 0) {
      setCheckedCategory(filterValue);
    }
  }, [filterValue]);

  React.useEffect(() => {
    FetchCategoryList();
  }, []);

  const FetchCategoryList = async () => {
    let response = await apiClient("categoryList", "post", {
      body: { user_id: "", parent: "", sub: 2 },
    });
    if (response?.status == 200) {
      setCategoryData(response.data);
      // dispatch(setKeywordData(response.data));
    }
    setLoader(false);
  };

  return (
    <>
      {filterCategory?.categories && (
        <MainPageFilterBox>
          <CategoryBox>
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
              <MainPageFilterBox>
                {data?.map((sector, index) => (
                  <CategoryTreeView
                    key={sector.id}
                    item={sector}
                    level={index}
                  />
                ))}
              </MainPageFilterBox>
            </Collapse>
          </CategoryBox>
        </MainPageFilterBox>
      )}
    </>
  );
};

export default CategoryFilter;
