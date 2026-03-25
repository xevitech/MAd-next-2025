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

const CategoryFilter2 = () => {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = React.useState(true);
  const [loader, setLoader] = React.useState(true);
  const [categoryData, setCategoryData] = React.useState([]);
  const [checkedCategory, setCheckedCategory] = React.useState([]);
  const [realCategoryData,setRealCategoryData]=React.useState([])
  const router: any = useRouter();
  
  const { filteredData,data, loadingg, error,permanentProductData } = useSelector((state: RootState) => state.manufactureProduct);
//   const [uniqueCategoryNames, setUniqueCategoryNames] = React.useState([])
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const debouncedAddQueryParams = debounce((checkedCategoryArray) => {
    // console.log("Adding Query Params for:", checkedCategoryArray); 
    addQueryParams(checkedCategoryArray);
}, 3000); //  time

  
// console.log("datainCategoryLists2",data)
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const { filterCategory }: any = useSelector(
    (state: any) => state.productList
  );


  const addQueryParams = (cf) => {
    // Log the incoming id array
    // console.log("Incoming ID array:", cf);

    if (cf.length === 0) {
      setCheckedCategory([]);
        delete router.query.category_name;
        router.push(router);
      
        dispatch(fetchFilteredProducts({cf:[]}));
        return;
    }

    // Log the updated checked business state
    setCheckedCategory(cf);
    // console.log("Updated Checked category:", cf);

    router.query.category_name = cf.join(",");
    // console.log("Router Query Business:", router.query.category_name); // Log the router query
    router.push(router);
    dispatch(fetchFilteredProducts({ cf }));};

    React.useEffect(() => {
      const filterValue = router.query.category_name ? router.query.category_name.split(",") : []; // Get current businesses from router
      if (Array.isArray(filterValue)) {
        setCheckedCategory(filterValue); // Set checked businesses from router query
      }
    }, [router.query.category_name]); // Run when query parameters change
  

// const filterValue: any = router?.query?.category
//   ? [router.query.category]
//   : [];



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
 

  React.useEffect(() => {
    FetchCategoryList();
  }, []);


const FetchCategoryList = () => {

    const uniqueCategoryNames = Array.from(new Set(permanentProductData.map(item => item.category_name)));
  
    // Set category data with unique names
    setCategoryData(uniqueCategoryNames)

  
    setLoader(false);
  };

  React.useEffect(() => {
    // console.log("Current checkedCategory:", checkedCategory);
  }, [checkedCategory]);
  
//   {console.log("categssssssoryData",data)}
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
              <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                <nav aria-label="main mailbox folders">
                  <StyledList
                    sx={{
                      maxHeight: 200,
                      overflow: "auto",
                    }}
                  >
                    {loader &&
                      arr.map((item, index) => (
                        <ListItem key={`loader-${index}`} disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <Skeleton
                                variant="circular"
                                width={25}
                                height={25}
                              />
                            </ListItemIcon>
                            <Skeleton
                              animation="wave"
                              width={180}
                              sx={{ marginLeft: "-20px" }}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}

                    {!loader && categoryData?.length > 0
                      ? categoryData.filter(element => element).map((element, index) => (
                        // {console.log(categoryData)}
                        <ListItem
                          key={`data-${index}`}
                          

                          
                          disablePadding
                          onClick={(e) =>{handleChange(e,element)}}
//                         
//                           }}
                          className={""
                            // checkedCategory == element.slug &&
                            // "selected-filter-main-page"
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
                              // title={element.name}
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

export default CategoryFilter2
