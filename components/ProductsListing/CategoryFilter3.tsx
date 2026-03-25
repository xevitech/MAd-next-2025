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
import { debounce } from 'lodash';
import {
  setCategoryIds,
  setKeywordData,
  setKeywordName,
} from "@/hooks/UseProductListContext";
import { RootState, store, useAppDispatch } from "redux/store";
import { LightTooltip } from "../common/Tooltip/tooltip";
import { fetchFilteredProducts, fetchManufactureProductsData } from "@/hooks/reducers/manufactureProductsReducer";
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
    onChange: (selectedFilters: string[]) => void;
  };

const CategoryFilter3: React.FC<CategoryFilterProps> = ({ onChange }) => {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = React.useState(true);
//   const [loader, setLoader] = React.useState(false);
  const [categoryData, setCategoryData] = React.useState([]);
  const [checkedCategory, setCheckedCategory] = React.useState([]);
  const [realCategoryData,setRealCategoryData]=React.useState([])
  const router: any = useRouter();
  const [permanentProductData, setpermanentProductData] = React.useState([])


  const fetchSellerProducts = async () => {
    try {
      const response = await apiClient("front/manufacture/seller_products", "get");
      if (response.status === 200) {
        console.log("category Products:", response.data);
        const uniqueCategoryNames = Array.from(new Set(response.data.map(item => item.category_name)));
        console.log("uniqueCategoryNames",uniqueCategoryNames)
        setCategoryData(uniqueCategoryNames)
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  React.useEffect(() => {
    fetchSellerProducts()
    return () => {
      
    }
  }, [])
  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const debouncedAddQueryParams = debounce((checkedCategoryArray) => {
    addQueryParams(checkedCategoryArray);
}, 3000); 
  
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const { filterCategory }: any = useSelector(
    (state: any) => state.productList
  );


  const addQueryParams = (cf) => {
    onChange(cf);
};

const handleChange=(e,element)=>{
  e.stopPropagation();
  setCheckedCategory(prevChecked => {
    let newCheckedCategory;
  
    if (prevChecked.includes(element)) {
      // If element is already in prevChecked, remove it
      newCheckedCategory = prevChecked.filter(i => i !== element);
      debouncedAddQueryParams(newCheckedCategory);
      return newCheckedCategory;
    } else {
      // If element is not in prevChecked, add it
      newCheckedCategory = [...prevChecked, element];
      debouncedAddQueryParams(newCheckedCategory);
      return newCheckedCategory;
    }
  
  });}
 
  return (
    <>
     { (
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
              <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                <nav aria-label="main mailbox folders">
                  <StyledList
                    sx={{
                      maxHeight: 200,
                      overflow: "auto",
                    }}
                  >
              

                    { categoryData?.length > 0
                      ? categoryData.map((element, index) => (
                        <ListItem
                          key={`data-${index}`}
                   
                          disablePadding
                          onClick={(e) =>{handleChange(e,element)}}
                          className={""
                         
                          }
                        >
                          <LightTooltip arrow placement="top" title={element} disableInteractive sx={{
                            '& .MuiTooltip-tooltip': {
                              textTransform:'capitalize'
                            }
                          }}>
                            <ListItemButton>
                           
                              <ListItemStyledText
                                style={{
                                  color: checkedCategory.includes(
                                    `${element}`
                                  )
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
      )}
    </>
  );
};

export default CategoryFilter3
